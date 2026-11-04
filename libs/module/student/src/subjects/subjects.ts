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
  FilterTab,
  FilterTabsComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  StatusBadgeComponent,
  SubjectCardComponent,
  SubjectCardSummary,
  SubjectIconComponent,
  SummaryStatComponent,
  UiTone,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import {
  SubjectLearningStatus,
  SubjectOverview,
  subjectOverview,
} from '../data/subject-progress.data';
import {
  LearnerLesson,
  LESSON_STATUS,
  LESSON_TERMS,
} from '../lessons/lessons.data';

const SUBJECT_STATUS: Record<
  SubjectLearningStatus,
  { label: string; tone: UiTone }
> = {
  'in-progress': { label: 'In Progress', tone: 'blue' },
  completed: { label: 'Completed', tone: 'green' },
  'not-started': { label: 'Not Started', tone: 'purple' },
};

const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'name', label: 'Name: A–Z' },
  { id: 'progress-desc', label: 'Progress: High to Low' },
  { id: 'progress-asc', label: 'Progress: Low to High' },
];

@Component({
  selector: 'school-hub-student-subjects',
  imports: [
    RouterLink,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    StatusBadgeComponent,
    SubjectCardComponent,
    SubjectIconComponent,
    SummaryStatComponent,
  ],
  templateUrl: './subjects.html',
  styleUrls: ['./subjects.scss', './subjects-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentSubjectsComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly terms = LESSON_TERMS;
  protected readonly sortOptions = SORT_OPTIONS;
  protected readonly statusLabels = SUBJECT_STATUS;
  protected readonly lessonStatus = LESSON_STATUS;
  protected readonly search = computed(() => this.query().get('q') ?? '');
  protected readonly term = computed(() =>
    this.terms.some((term) => term.id === this.query().get('term'))
      ? (this.query().get('term') ?? '')
      : '',
  );
  protected readonly termLabel = computed(
    () =>
      this.terms.find((term) => term.id === this.term())?.label ?? 'All Terms',
  );
  protected readonly status = computed(() =>
    ['in-progress', 'completed', 'not-started'].includes(
      this.query().get('status') ?? '',
    )
      ? (this.query().get('status') ?? 'all')
      : 'all',
  );
  protected readonly sort = computed(() =>
    this.sortOptions.some((option) => option.id === this.query().get('sort'))
      ? (this.query().get('sort') ?? 'recommended')
      : 'recommended',
  );
  protected readonly termSubjects = computed(() =>
    LEARNER_SUBJECTS.map((subject) =>
      subjectOverview(subject, this.term()),
    ).filter((overview) => overview.lessons.length > 0),
  );
  protected readonly baseSubjects = computed(() => {
    const search = this.search().trim().toLowerCase();
    return this.termSubjects().filter(
      (overview) =>
        !search ||
        `${overview.subject.name} ${overview.subject.description}`
          .toLowerCase()
          .includes(search),
    );
  });
  protected readonly tabs = computed<FilterTab[]>(() => [
    {
      id: 'all',
      label: 'All Subjects',
      icon: 'ri-book-open-line',
      count: this.baseSubjects().length,
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      icon: 'ri-time-line',
      count: this.baseSubjects().filter(
        (subject) => subject.status === 'in-progress',
      ).length,
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'ri-checkbox-circle-line',
      count: this.baseSubjects().filter(
        (subject) => subject.status === 'completed',
      ).length,
    },
    {
      id: 'not-started',
      label: 'Not Started',
      icon: 'ri-play-circle-line',
      count: this.baseSubjects().filter(
        (subject) => subject.status === 'not-started',
      ).length,
    },
  ]);
  protected readonly visibleSubjects = computed(() => {
    const subjects = this.baseSubjects().filter(
      (overview) =>
        this.status() === 'all' || overview.status === this.status(),
    );
    return [...subjects].sort((a, b) => {
      if (this.sort() === 'name')
        return a.subject.name.localeCompare(b.subject.name);
      if (this.sort() === 'progress-desc') return b.progress - a.progress;
      if (this.sort() === 'progress-asc') return a.progress - b.progress;
      return (
        Number(b.nextLesson?.status === 'in-progress') -
          Number(a.nextLesson?.status === 'in-progress') ||
        Number(b.status !== 'completed') - Number(a.status !== 'completed')
      );
    });
  });
  protected readonly termLessons = computed(() =>
    this.termSubjects().flatMap((overview) => overview.lessons),
  );
  protected readonly completedLessons = computed(
    () =>
      this.termLessons().filter((lesson) => lesson.status === 'completed')
        .length,
  );
  protected readonly overallProgress = computed(() =>
    this.termLessons().length
      ? Math.round(
          this.termLessons().reduce((sum, lesson) => sum + lesson.progress, 0) /
            this.termLessons().length,
        )
      : 0,
  );
  protected readonly completedSubjects = computed(
    () =>
      this.termSubjects().filter((overview) => overview.status === 'completed')
        .length,
  );
  protected readonly hasFilters = computed(
    () =>
      !!(
        this.search() ||
        this.term() ||
        this.status() !== 'all' ||
        this.sort() !== 'recommended'
      ),
  );
  protected readonly selectedSubject = computed(() => {
    const subject = LEARNER_SUBJECTS.find(
      (subject) => subject.id === this.query().get('subjectId'),
    );
    return subject ? subjectOverview(subject, this.term()) : undefined;
  });
  protected readonly missingSubject = computed(
    () => this.query().has('subjectId') && !this.selectedSubject(),
  );
  protected readonly recommendedSubject = computed(
    () =>
      this.termSubjects().find((overview) => overview.nextLesson?.available) ??
      this.termSubjects()[0],
  );

  protected cardSummary(overview: SubjectOverview): SubjectCardSummary {
    return {
      description: overview.subject.description,
      completedLessons: overview.completed,
      totalLessons: overview.lessons.length,
      nextLesson: overview.nextLesson
        ? `Next: ${overview.nextLesson.title}`
        : 'All lessons completed. Keep practising!',
      statusLabel: this.statusLabels[overview.status].label,
      statusTone: this.statusLabels[overview.status].tone,
    };
  }

  protected subjectQuery(overview: SubjectOverview): Params {
    return {
      q: this.search() || null,
      term: this.term() || null,
      status: this.status() === 'all' ? null : this.status(),
      sort: this.sort() === 'recommended' ? null : this.sort(),
      subjectId: overview.subject.id,
    };
  }

  protected lessonQuery(
    overview: SubjectOverview,
    lesson?: LearnerLesson,
  ): Params {
    return {
      subject: overview.subject.id,
      term: this.term() || null,
      lessonId: lesson?.id ?? null,
    };
  }

  protected primaryQuery(overview: SubjectOverview): Params {
    return overview.status === 'completed'
      ? { ...this.lessonQuery(overview), status: 'completed' }
      : this.lessonQuery(overview, overview.nextLesson);
  }

  protected primaryLabel(overview: SubjectOverview): string {
    if (overview.status === 'completed') return 'Review lessons';
    if (overview.nextLesson?.status === 'in-progress')
      return 'Continue learning';
    return overview.nextLesson?.available
      ? 'Start next lesson'
      : 'Preview next lesson';
  }

  protected filterChanged(key: 'q' | 'term' | 'sort', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.navigate(
      {
        [key]: !value || value === 'recommended' ? null : value,
        subjectId: null,
      },
      key === 'q',
    );
  }

  protected setStatus(status: string): void {
    this.navigate({
      status: status === 'all' ? null : status,
      subjectId: null,
    });
  }
  protected clearFilters(): void {
    this.navigate({ q: null, term: null, status: null, sort: null });
  }
  protected closeSubject(): void {
    this.navigate({ subjectId: null }, true);
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
