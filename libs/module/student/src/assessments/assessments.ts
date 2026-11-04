import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  DialogPanelComponent,
  FilterTabsComponent,
  IconBadgeComponent,
  PaginationComponent,
  PerformanceChartComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  StatusBadgeComponent,
  SummaryStatComponent,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LESSON_TERMS } from '../lessons/lessons.data';
import { AssessmentResult, LearnerAssessment } from './assessment.model';
import { AssessmentStore } from './assessment-store';
import {
  ASSESSMENT_KINDS,
  ASSESSMENT_TABS,
  LEARNER_ASSESSMENTS,
  assessmentDate,
  resultPerformance,
} from './assessments.data';

@Component({
  selector: 'school-hub-student-assessments',
  imports: [
    RouterLink,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    PaginationComponent,
    PerformanceChartComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    StatusBadgeComponent,
    SummaryStatComponent,
  ],
  templateUrl: './assessments.html',
  styleUrls: ['./assessments.scss', './assessments-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentAssessmentsComponent {
  protected readonly store = inject(AssessmentStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly tabs = ASSESSMENT_TABS;
  protected readonly kinds = ASSESSMENT_KINDS;
  protected readonly formatDate = assessmentDate;
  protected readonly performance = resultPerformance;
  protected readonly search = computed(() => this.query().get('q') ?? '');
  protected readonly subject = computed(() =>
    this.subjects.some(
      (subject) => subject.id === this.query().get('subjectId'),
    )
      ? (this.query().get('subjectId') ?? '')
      : '',
  );
  protected readonly term = computed(() =>
    this.query().get('term') === 'all'
      ? 'all'
      : this.terms.some((term) => term.id === this.query().get('term'))
        ? (this.query().get('term') ?? 'first')
        : 'first',
  );
  protected readonly type = computed(() =>
    this.tabs.some((tab) => tab.id === this.query().get('type'))
      ? (this.query().get('type') ?? 'all')
      : 'all',
  );
  protected readonly resultsOnly = computed(
    () => this.query().get('tab') === 'results',
  );
  protected readonly baseResults = computed(() =>
    this.store.results().flatMap((result) => {
      const assessment = this.store.assessment(result.assessmentId);
      return assessment && this.inScope(assessment)
        ? [{ ...result, assessment }]
        : [];
    }),
  );
  protected readonly filteredResults = computed(() =>
    this.baseResults().filter((result) => this.matches(result.assessment)),
  );
  protected readonly upcoming = computed(() =>
    LEARNER_ASSESSMENTS.filter(
      (assessment) =>
        assessment.scheduled &&
        this.inScope(assessment) &&
        this.matches(assessment),
    ),
  );
  protected readonly page = computed(() => {
    const value = Number(this.query().get('page') ?? 1);
    return Number.isFinite(value)
      ? Math.min(
          Math.max(1, Math.ceil(this.filteredResults().length / 5)),
          Math.max(1, Math.floor(value)),
        )
      : 1;
  });
  protected readonly visibleResults = computed(() =>
    this.filteredResults().slice((this.page() - 1) * 5, this.page() * 5),
  );
  protected readonly quizResults = computed(() =>
    this.baseResults().filter((result) => result.assessment.kind === 'quiz'),
  );
  protected readonly average = computed(() =>
    this.quizResults().length
      ? Math.round(
          this.quizResults().reduce(
            (sum, result) => sum + result.percentage,
            0,
          ) / this.quizResults().length,
        )
      : 0,
  );
  protected readonly assessmentCount = computed(
    () =>
      this.baseResults().filter((result) => result.assessment.kind !== 'quiz')
        .length,
  );
  protected readonly bestScore = computed(() =>
    this.baseResults().length
      ? Math.max(...this.baseResults().map((result) => result.percentage))
      : undefined,
  );
  protected readonly topicStats = computed(() => {
    const groups = new Map<
      string,
      { id: string; title: string; subjectId: string; scores: number[] }
    >();
    for (const result of this.filteredResults()) {
      const key = `${result.assessment.subjectId}:${result.assessment.topicId}`;
      const group = groups.get(key) ?? {
        id: result.assessment.topicId,
        title: result.assessment.topic,
        subjectId: result.assessment.subjectId,
        scores: [],
      };
      group.scores.push(result.percentage);
      groups.set(key, group);
    }
    return [...groups.values()]
      .map((group) => ({
        ...group,
        percentage: Math.round(
          group.scores.reduce((sum, value) => sum + value, 0) /
            group.scores.length,
        ),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  });
  protected readonly weakTopics = computed(() =>
    this.topicStats().filter((topic) => topic.percentage < 70),
  );
  protected readonly trend = computed(() =>
    [...this.filteredResults().slice(0, 5)].reverse().map((result, index) => ({
      label: `Attempt ${index + 1}`,
      value: result.percentage,
    })),
  );
  protected readonly selected = computed(() =>
    this.store.assessment(this.query().get('assessmentId') ?? ''),
  );
  protected readonly selectedResult = computed(() =>
    this.resultsOnly() && this.selected()
      ? this.store.latestResult(this.selected()?.id ?? '')
      : undefined,
  );
  protected readonly missingAssessment = computed(
    () => this.query().has('assessmentId') && !this.selected(),
  );
  protected readonly calendarOpen = computed(
    () => this.query().get('view') === 'calendar',
  );
  protected readonly topicsOpen = computed(
    () => this.query().get('view') === 'topics',
  );
  protected readonly dialogOpen = computed(
    () => !!this.selected() || this.calendarOpen() || this.topicsOpen(),
  );
  protected readonly dialogTitle = computed(() =>
    this.calendarOpen()
      ? 'Assessment Calendar'
      : this.topicsOpen()
        ? 'Topic Performance'
        : this.selectedResult()
          ? 'Quiz Results'
          : (this.selected()?.title ?? 'Assessment'),
  );
  protected readonly filterQuery = computed<Params>(() => ({
    term: this.term() === 'first' ? null : this.term(),
    subjectId: this.subject() || null,
    type: this.type() === 'all' ? null : this.type(),
    q: this.search() || null,
    tab: this.resultsOnly() ? 'results' : null,
    page: this.resultsOnly() && this.page() > 1 ? this.page() : null,
  }));

  protected selectionQuery(assessment: LearnerAssessment): Params {
    return { ...this.filterQuery(), assessmentId: assessment.id };
  }
  protected resultLink(result: AssessmentResult): string[] {
    return ['/student/assessments', result.assessmentId, 'results', result.id];
  }
  protected filterChanged(key: 'q' | 'subjectId' | 'term', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.navigate(
      { [key]: value || null, page: null, assessmentId: null },
      key === 'q',
    );
  }
  protected setType(type: string): void {
    this.navigate({
      type: type === 'all' ? null : type,
      page: null,
      assessmentId: null,
    });
  }
  protected showResults(): void {
    this.navigate({ tab: 'results', page: null, assessmentId: null });
  }
  protected showUpcoming(): void {
    this.navigate({ tab: null, page: null });
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page });
  }
  protected openView(view: string): void {
    this.navigate({ view, assessmentId: null, tab: null });
  }
  protected closeDialog(): void {
    this.navigate({ assessmentId: null, view: null, tab: null }, true);
  }
  protected showInstructions(): void {
    this.navigate({ tab: null });
  }
  protected canStart(assessment: LearnerAssessment): boolean {
    return (
      this.store.ready() &&
      assessment.available &&
      !!assessment.questions.length &&
      (!!this.store.draft(assessment.id) ||
        this.store.usedAttempts(assessment.id) < assessment.maxAttempts)
    );
  }
  protected startLabel(assessment: LearnerAssessment): string {
    return this.store.draft(assessment.id)
      ? 'Resume practice'
      : this.store.usedAttempts(assessment.id) >= assessment.maxAttempts
        ? 'Attempt limit reached'
        : !assessment.available || !assessment.questions.length
          ? 'Not available yet'
          : 'Start practice';
  }
  protected startSelected(): void {
    const assessment = this.selected();
    if (assessment && this.store.start(assessment))
      void this.router.navigate(
        ['/student/assessments', assessment.id, 'attempt'],
        { queryParams: this.filterQuery() },
      );
  }

  private inScope(assessment: LearnerAssessment): boolean {
    return (
      (this.term() === 'all' || assessment.term === this.term()) &&
      (!this.subject() || assessment.subjectId === this.subject())
    );
  }
  private matches(assessment: LearnerAssessment): boolean {
    return (
      (this.type() === 'all' || assessment.kind === this.type()) &&
      (!this.search().trim() ||
        `${assessment.title} ${assessment.subject} ${assessment.topic}`
          .toLowerCase()
          .includes(this.search().trim().toLowerCase()))
    );
  }
  private navigate(queryParams: Params, replaceUrl = false): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl,
    });
  }
}
