import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  ActivityListComponent,
  ActivityListItem,
  DashboardCardComponent,
  DialogPanelComponent,
  FeedbackNoteComponent,
  FilterTabsComponent,
  IconBadgeComponent,
  PaginationComponent,
  PerformanceChartComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  ProgressStatComponent,
  ScoreTableComponent,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LESSON_TERMS } from '../lessons/lessons.data';
import { LEARNER_PROFILE } from '../data/learning-context.data';
import { portfolioScore } from '../portfolio/portfolio-engine';
import { ProgressStore } from './progress-store';
import {
  performanceHistory,
  progressActivities,
  progressDate,
  progressSkills,
  progressSubjects,
  progressSummary,
  progressTopics,
  scopeProgress,
} from './progress-engine';
import { ProgressArea } from './progress.model';
import { ProgressSubjectTableComponent } from './subject-table/subject-table';

const AREAS = [
  { id: 'all', label: 'All Progress', icon: 'ri-dashboard-line' },
  { id: 'lessons', label: 'Lessons', icon: 'ri-book-open-line' },
  { id: 'quizzes', label: 'Quizzes', icon: 'ri-question-answer-line' },
  { id: 'worksheets', label: 'Worksheets', icon: 'ri-file-text-line' },
  { id: 'portfolio', label: 'Portfolio', icon: 'ri-folder-open-line' },
];
@Component({
  selector: 'school-hub-student-progress',
  imports: [
    RouterLink,
    ActivityListComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FeedbackNoteComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    PaginationComponent,
    PerformanceChartComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    ProgressStatComponent,
    ScoreTableComponent,
    ProgressSubjectTableComponent,
  ],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProgressComponent {
  protected readonly store = inject(ProgressStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  private readonly now = signal(Date.now());
  protected readonly learner = LEARNER_PROFILE;
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly areas = AREAS;
  protected readonly term = computed(() =>
    this.terms.some((item) => item.id === this.query().get('term'))
      ? (this.query().get('term') ?? 'all')
      : 'all',
  );
  protected readonly subject = computed(() =>
    this.subjects.some((item) => item.id === this.query().get('subjectId'))
      ? (this.query().get('subjectId') ?? '')
      : '',
  );
  protected readonly area = computed<ProgressArea>(() =>
    AREAS.some((item) => item.id === this.query().get('area'))
      ? (this.query().get('area') as ProgressArea)
      : 'all',
  );
  protected readonly range = computed<'4' | '8' | 'all'>(() =>
    this.query().get('range') === '4'
      ? '4'
      : this.query().get('range') === 'all'
        ? 'all'
        : '8',
  );
  protected readonly scoped = computed(() =>
    scopeProgress(this.store.source(), this.term(), this.subject()),
  );
  protected readonly summary = computed(() => progressSummary(this.scoped()));
  protected readonly subjectRows = computed(() =>
    progressSubjects(this.scoped()),
  );
  protected readonly topics = computed(() =>
    progressTopics(this.scoped()).map((topic) => ({
      ...topic,
      queryParams: { ...topic.queryParams, progressReturn: this.returnUrl() },
    })),
  );
  protected readonly skills = computed(() => progressSkills(this.scoped()));
  protected readonly history = computed(() =>
    performanceHistory(this.scoped(), this.range(), this.now()),
  );
  protected readonly historySubtitle = computed(() =>
    this.range() === 'all'
      ? 'Your academic performance across recorded weeks.'
      : `Your academic performance over the past ${this.range()} weeks.`,
  );
  protected readonly activities = computed(() =>
    progressActivities(this.scoped())
      .filter((item) => this.area() === 'all' || item.area === this.area())
      .map((item) => this.contextual(item)),
  );
  protected readonly recommendations = computed(() =>
    this.store
      .recommendations(this.scoped())
      .filter((item) => this.area() === 'all' || item.area === this.area())
      .map((item) => this.contextual(item)),
  );
  protected readonly evidence = computed<ActivityListItem[]>(() =>
    this.scoped().portfolios.flatMap((record) =>
      record.feedback
        ? [
            {
              id: record.id,
              title: record.title,
              description: `${portfolioScore(record.feedback.scores)}% · ${record.status === 'submitted' ? 'Earlier feedback; revision awaiting review' : 'Tutor rubric assessment'}`,
              icon: record.icon,
              tone: record.tone,
              meta: progressDate(record.feedback.date),
              route: ['/student/portfolio-tasks', record.id],
              queryParams: {
                tab: 'feedback',
                progressReturn: this.returnUrl(),
              },
            },
          ]
        : [],
    ),
  );
  protected readonly strengths = computed(() => {
    const summary = this.summary();
    const top = [...this.topics()]
      .filter((topic) => topic.value !== undefined)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0];
    return [
      ...(summary.completedLessons
        ? [
            `You have completed ${summary.completedLessons} of ${summary.lessonCount} lessons.`,
          ]
        : []),
      ...(summary.completedWorksheets
        ? [`You have completed ${summary.completedWorksheets} worksheets.`]
        : []),
      ...(top
        ? [`Your highest topic score is ${top.label} (${top.value}%).`]
        : []),
    ];
  });
  protected readonly focus = computed(() => {
    const lowest = this.topics()
      .filter((topic) => topic.value !== undefined && topic.value < 70)
      .slice(0, 2);
    const revisions = this.scoped().portfolios.filter(
      (record) => record.status === 'needs-revision',
    ).length;
    const needsReview = this.summary().needsReview;
    return [
      ...lowest.map(
        (topic) =>
          `Review ${topic.label} (${topic.value}% across ${topic.evidenceCount} scored activities).`,
      ),
      ...(revisions
        ? [
            `${revisions} portfolio ${revisions === 1 ? 'task needs' : 'tasks need'} revision before resubmitting.`,
          ]
        : []),
      ...(needsReview
        ? [
            `${needsReview} feedback ${needsReview === 1 ? 'item still needs' : 'items still need'} your review.`,
          ]
        : []),
    ].slice(0, 3);
  });
  protected readonly filterQuery = computed<Params>(() => ({
    term: this.term() === 'all' ? null : this.term(),
    subjectId: this.subject() || null,
    area: this.area() === 'all' ? null : this.area(),
    range: this.range() === '8' ? null : this.range(),
  }));
  protected readonly returnUrl = computed(() =>
    this.router.serializeUrl(
      this.router.createUrlTree(['/student/progress'], {
        queryParams: this.filterQuery(),
      }),
    ),
  );
  protected readonly feedbackQuery = computed<Params>(() => ({
    progressReturn: this.returnUrl(),
    term: this.term() === 'all' ? null : this.term(),
    subjectId: this.subject() || null,
    tab: this.summary().needsReview ? 'needs-action' : null,
  }));
  protected readonly tutorQuery = computed<Params>(() => ({
    contextType: 'progress',
    subjectId: this.subject() || null,
    term: this.term() === 'all' ? null : this.term(),
    area: this.area() === 'all' ? null : this.area(),
  }));
  protected readonly metrics = computed(() => {
    const summary = this.summary();
    return [
      {
        id: 'lessons',
        title: 'Overall Academic Progress',
        value: summary.lessonCount ? `${summary.academic}%` : '—',
        percentage: summary.academic,
        detail: `${summary.completedLessons} / ${summary.lessonCount} lessons completed`,
        icon: 'ri-graduation-cap-line',
        tone: 'purple' as const,
      },
      {
        id: 'quizzes',
        title: 'Average Quiz Score',
        value:
          summary.quizAverage === undefined ? '—' : `${summary.quizAverage}%`,
        percentage: summary.quizAverage ?? 0,
        detail: `${summary.quizResults} recorded quiz results`,
        icon: 'ri-checkbox-circle-line',
        tone: 'green' as const,
      },
      {
        id: 'worksheets',
        title: 'Worksheet Completion',
        value: summary.worksheetCount ? `${summary.worksheetCompletion}%` : '—',
        percentage: summary.worksheetCompletion,
        detail: `${summary.completedWorksheets} / ${summary.worksheetCount} completed`,
        icon: 'ri-file-text-line',
        tone: 'orange' as const,
      },
      {
        id: 'portfolio',
        title: 'Portfolio Completion',
        value: summary.portfolioCount ? `${summary.portfolioCompletion}%` : '—',
        percentage: summary.portfolioCompletion,
        detail: `${summary.handedIn} / ${summary.portfolioCount} handed in`,
        icon: 'ri-folder-open-line',
        tone: 'blue' as const,
      },
    ];
  });
  protected readonly view = computed(() =>
    [
      'topics',
      'skills',
      'achievements',
      'recommendations',
      'calculation',
    ].includes(this.query().get('view') ?? '')
      ? (this.query().get('view') ?? '')
      : '',
  );
  protected readonly titles: Partial<Record<string, string>> = {
    topics: 'All Topic Scores',
    skills: 'Portfolio Skill Evidence',
    achievements: 'Your Achievements',
    recommendations: 'Recommended Next Steps',
    calculation: 'How Your Progress Is Calculated',
  };
  protected readonly activityPage = computed(() => {
    const requested = Number(this.query().get('page') ?? 1);
    return Number.isFinite(requested)
      ? Math.max(
          1,
          Math.min(
            Math.max(1, Math.ceil(this.activities().length / 10)),
            Math.floor(requested),
          ),
        )
      : 1;
  });
  protected readonly visibleActivities = computed(() =>
    this.activities().slice(
      (this.activityPage() - 1) * 10,
      this.activityPage() * 10,
    ),
  );
  constructor() {
    afterNextRender(() => this.now.set(Date.now()));
  }
  protected metricQuery(area: string): Params {
    return { ...this.filterQuery(), area };
  }
  protected change(key: 'subjectId' | 'term' | 'range', event: Event): void {
    this.navigate({
      [key]: (event.target as HTMLSelectElement).value || null,
      view: null,
      page: null,
    });
  }
  protected setArea(area: string): void {
    this.navigate({
      area: area === 'all' ? null : area,
      view: null,
      page: null,
    });
  }
  protected openView(view: string): void {
    this.navigate({ view, page: null });
  }
  protected closeView(): void {
    this.navigate({ view: null, page: null }, true);
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page });
  }
  protected clear(): void {
    void this.router.navigate(['/student/progress']);
  }
  private contextual<T extends ActivityListItem>(item: T): T {
    return {
      ...item,
      queryParams: { ...item.queryParams, progressReturn: this.returnUrl() },
    };
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
