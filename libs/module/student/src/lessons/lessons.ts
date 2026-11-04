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
  LearningStepsComponent,
  PaginationComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  StatusBadgeComponent,
  SubjectIconComponent,
  TaskListComponent,
} from '@school-hub/ui-elements';
import {
  COMMON_LEARNING_MISTAKE,
  LEARNER_TUTOR_NOTE,
  PENDING_LESSON_TASKS,
} from '../data/learning-context.data';
import {
  LearnerLesson,
  LEARNER_LESSONS,
  LESSON_ACTIVITY_LABELS,
  LESSON_ACTIVITY_ROUTES,
  LESSON_FLOW,
  LESSON_STATUS,
  LESSON_SUBJECTS,
  LESSON_TABS,
  LESSON_TERMS,
  LessonActivityKind,
  lessonActivityQuery,
} from './lessons.data';
import { LessonTableComponent } from './lesson-table/lesson-table';

type FilterKey = 'q' | 'subject' | 'term' | 'status';

@Component({
  selector: 'school-hub-student-lessons',
  imports: [
    RouterLink,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    LearningStepsComponent,
    PaginationComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    StatusBadgeComponent,
    SubjectIconComponent,
    TaskListComponent,
    LessonTableComponent,
  ],
  templateUrl: './lessons.html',
  styleUrls: ['./lessons.scss', './lessons-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentLessonsComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly lessons = LEARNER_LESSONS;
  protected readonly subjects = LESSON_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly tabs = LESSON_TABS;
  protected readonly statusLabels = LESSON_STATUS;
  protected readonly steps = LESSON_FLOW;
  protected readonly tasks = PENDING_LESSON_TASKS;
  protected readonly tutorNote = LEARNER_TUTOR_NOTE;
  protected readonly commonMistake = COMMON_LEARNING_MISTAKE;
  protected readonly activityKinds: LessonActivityKind[] = [
    'quiz',
    'worksheet',
    'portfolio',
  ];
  protected readonly activityLabels = LESSON_ACTIVITY_LABELS;
  protected readonly activityRoutes = LESSON_ACTIVITY_ROUTES;
  protected readonly activityQuery = lessonActivityQuery;
  protected readonly pageSize = 5;
  protected readonly currentLesson =
    LEARNER_LESSONS.find((lesson) => lesson.status === 'in-progress') ??
    LEARNER_LESSONS[0];
  protected readonly recommendedLesson =
    LEARNER_LESSONS.find(
      (lesson) => lesson.status === 'upcoming' && lesson.available,
    ) ?? LEARNER_LESSONS[0];
  protected readonly stats = [
    {
      label: 'Total Lessons',
      value: LEARNER_LESSONS.length,
      icon: 'ri-book-open-line',
      tone: 'purple',
    },
    {
      label: 'Completed',
      value: LEARNER_LESSONS.filter((lesson) => lesson.status === 'completed')
        .length,
      icon: 'ri-checkbox-circle-line',
      tone: 'green',
    },
    {
      label: 'In Progress',
      value: LEARNER_LESSONS.filter((lesson) => lesson.status === 'in-progress')
        .length,
      icon: 'ri-time-line',
      tone: 'orange',
    },
    {
      label: 'Upcoming',
      value: LEARNER_LESSONS.filter((lesson) => lesson.status === 'upcoming')
        .length,
      icon: 'ri-calendar-line',
      tone: 'purple',
    },
  ] as const;
  protected readonly recentlyCompleted = [...LEARNER_LESSONS]
    .filter((lesson) => lesson.status === 'completed')
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
    .slice(0, 3);

  protected readonly search = computed(() => this.query().get('q') ?? '');
  protected readonly subject = computed(() =>
    this.subjects.some((item) => item.id === this.query().get('subject'))
      ? (this.query().get('subject') ?? '')
      : '',
  );
  protected readonly term = computed(() =>
    this.terms.some((item) => item.id === this.query().get('term'))
      ? (this.query().get('term') ?? '')
      : '',
  );
  protected readonly status = computed(() =>
    this.tabs.some((tab) => tab.id === this.query().get('status'))
      ? (this.query().get('status') ?? 'all')
      : 'all',
  );
  protected readonly filtered = computed(() => {
    const search = this.search().trim().toLowerCase();
    return this.lessons.filter(
      (lesson) =>
        (!search ||
          `${lesson.title} ${lesson.subject}`.toLowerCase().includes(search)) &&
        (!this.subject() || lesson.subjectId === this.subject()) &&
        (!this.term() || lesson.term === this.term()) &&
        (this.status() === 'all' || lesson.status === this.status()),
    );
  });
  protected readonly page = computed(() => {
    const requested = Number(this.query().get('page') ?? 1);
    const count = Math.max(
      1,
      Math.ceil(this.filtered().length / this.pageSize),
    );
    return Number.isFinite(requested)
      ? Math.min(count, Math.max(1, Math.floor(requested)))
      : 1;
  });
  protected readonly visibleLessons = computed(() =>
    this.filtered().slice(
      (this.page() - 1) * this.pageSize,
      this.page() * this.pageSize,
    ),
  );
  protected readonly hasFilters = computed(
    () =>
      !!(
        this.search() ||
        this.subject() ||
        this.term() ||
        this.status() !== 'all'
      ),
  );
  protected readonly selectedLesson = computed(() =>
    this.lessons.find((lesson) => lesson.id === this.query().get('lessonId')),
  );
  protected readonly missingLesson = computed(
    () => this.query().has('lessonId') && !this.selectedLesson(),
  );
  protected readonly tasksOpen = computed(
    () => this.query().get('tab') === 'tasks',
  );
  protected readonly actionsOpen = computed(
    () => this.query().get('panel') === 'actions',
  );
  protected readonly dialogOpen = computed(
    () => !!this.selectedLesson() || this.tasksOpen(),
  );
  protected readonly dialogTitle = computed(() =>
    this.tasksOpen()
      ? 'Pending lesson tasks'
      : `${this.selectedLesson()?.title ?? 'Lesson'}${this.actionsOpen() ? ' actions' : ''}`,
  );

  protected filterChanged(key: FilterKey, event: Event): void {
    this.setFilter(key, (event.target as HTMLInputElement).value);
  }

  protected setFilter(key: FilterKey, value: string): void {
    this.navigate(
      {
        [key]: !value || value === 'all' ? null : value,
        page: null,
        lessonId: null,
        panel: null,
        tab: null,
      },
      key === 'q',
    );
  }

  protected clearFilters(): void {
    this.navigate({
      q: null,
      subject: null,
      term: null,
      status: null,
      page: null,
    });
  }

  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page });
  }
  protected openLesson(lesson: LearnerLesson, actions = false): void {
    this.navigate({
      lessonId: lesson.id,
      panel: actions ? 'actions' : null,
      tab: null,
    });
  }
  protected openTasks(): void {
    this.navigate({ lessonId: null, panel: null, tab: 'tasks' });
  }
  protected closeDialog(): void {
    this.navigate({ lessonId: null, panel: null, tab: null }, true);
  }

  protected followStep(step: string): void {
    if (step === 'learn' || step === 'practice') {
      this.openLesson(this.currentLesson);
      return;
    }
    if (step === 'feedback') {
      void this.router.navigate(['/student/feedback'], {
        queryParams: {
          feedbackId: this.tutorNote.id,
          lessonId: this.currentLesson.id,
        },
      });
      return;
    }
    const kind = step as LessonActivityKind;
    void this.router.navigate([this.activityRoutes[kind]], {
      queryParams: this.activityQuery(this.currentLesson, kind),
    });
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
