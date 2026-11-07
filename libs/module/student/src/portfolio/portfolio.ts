import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
  ProgressBarComponent,
  ProgressRingComponent,
  RatingStarsComponent,
  RubricTableComponent,
  StatusBadgeComponent,
  SummaryStatComponent,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LESSON_TERMS } from '../lessons/lessons.data';
import { PortfolioStore } from './portfolio-store';
import {
  PORTFOLIO_RUBRIC,
  PORTFOLIO_SKILLS,
  PORTFOLIO_STATUS,
  portfolioDate,
} from './portfolio.data';
import { PortfolioRecord } from './portfolio.model';

@Component({
  selector: 'school-hub-student-portfolio',
  imports: [
    RouterLink,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    PaginationComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    RatingStarsComponent,
    RubricTableComponent,
    StatusBadgeComponent,
    SummaryStatComponent,
  ],
  templateUrl: './portfolio.html',
  styleUrls: [
    './portfolio.scss',
    './portfolio-insights.scss',
    './portfolio-actions.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentPortfolioComponent {
  protected readonly store = inject(PortfolioStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly statuses = PORTFOLIO_STATUS;
  protected readonly rubric = PORTFOLIO_RUBRIC;
  protected readonly date = portfolioDate;
  protected readonly sortOptions = [
    { id: 'due', label: 'Due Date' },
    { id: 'updated', label: 'Recently Updated' },
    { id: 'title', label: 'Task Title' },
    { id: 'progress', label: 'Progress' },
  ];
  protected readonly search = computed(() => this.query().get('q') ?? '');
  protected readonly term = computed(() =>
    this.query().get('term') === 'all'
      ? 'all'
      : this.terms.some((term) => term.id === this.query().get('term'))
        ? (this.query().get('term') ?? 'first')
        : 'first',
  );
  protected readonly subject = computed(() =>
    this.subjects.some(
      (subject) => subject.id === this.query().get('subjectId'),
    )
      ? (this.query().get('subjectId') ?? '')
      : '',
  );
  protected readonly status = computed(() =>
    Object.keys(this.statuses).includes(this.query().get('status') ?? '')
      ? (this.query().get('status') ?? 'all')
      : 'all',
  );
  protected readonly sort = computed(() =>
    this.sortOptions.some((sort) => sort.id === this.query().get('sort'))
      ? (this.query().get('sort') ?? 'due')
      : 'due',
  );
  protected readonly scoped = computed(() =>
    this.store
      .records()
      .filter(
        (record) =>
          (this.term() === 'all' || record.term === this.term()) &&
          (!this.subject() || record.subjectId === this.subject()),
      ),
  );
  protected readonly searched = computed(() =>
    this.scoped().filter((record) =>
      `${record.title} ${record.description} ${record.subject}`
        .toLowerCase()
        .includes(this.search().trim().toLowerCase()),
    ),
  );
  protected readonly filtered = computed(() =>
    this.searched()
      .filter(
        (record) => this.status() === 'all' || record.status === this.status(),
      )
      .sort((a, b) =>
        this.sort() === 'title'
          ? a.title.localeCompare(b.title)
          : this.sort() === 'progress'
            ? b.progress - a.progress
            : this.sort() === 'updated'
              ? Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
              : Date.parse(a.dueAt) - Date.parse(b.dueAt),
      ),
  );
  protected readonly page = computed(() => {
    const page = Number(this.query().get('page') ?? 1);
    return Number.isFinite(page)
      ? Math.min(
          Math.max(1, Math.ceil(this.filtered().length / 5)),
          Math.max(1, Math.floor(page)),
        )
      : 1;
  });
  protected readonly visible = computed(() =>
    this.filtered().slice((this.page() - 1) * 5, this.page() * 5),
  );
  protected readonly tabs = computed(() => [
    { id: 'all', label: 'All Tasks', count: this.searched().length },
    ...(
      [
        'in-progress',
        'submitted',
        'completed',
        'needs-revision',
        'not-started',
      ] as const
    ).map((status) => ({
      id: status,
      label: this.statuses[status].label,
      count: this.searched().filter((record) => record.status === status)
        .length,
    })),
  ]);
  protected readonly counts = computed(() =>
    (
      [
        'completed',
        'submitted',
        'in-progress',
        'needs-revision',
        'not-started',
      ] as const
    ).map((status) => ({
      id: status,
      ...this.statuses[status],
      count: this.scoped().filter((record) => record.status === status).length,
    })),
  );
  protected readonly completed = computed(() =>
    this.scoped().filter((record) => record.status === 'completed'),
  );
  protected readonly average = computed(() =>
    this.completed().length
      ? Math.round(
          this.completed().reduce(
            (sum, record) => sum + (record.score ?? 0),
            0,
          ) / this.completed().length,
        )
      : undefined,
  );
  protected readonly handedIn = computed(
    () =>
      this.scoped().filter((record) =>
        ['submitted', 'completed'].includes(record.status),
      ).length,
  );
  protected readonly progress = computed(() =>
    this.scoped().length
      ? Math.round((this.handedIn() / this.scoped().length) * 100)
      : 0,
  );
  protected readonly skills = computed(() =>
    PORTFOLIO_SKILLS.map((skill) => {
      const records = this.completed().filter((record) =>
        record.skills.includes(skill.id),
      );
      return {
        ...skill,
        score: records.length
          ? Math.round(
              records.reduce((sum, record) => sum + (record.score ?? 0), 0) /
                records.length,
            )
          : 0,
      };
    }),
  );
  protected readonly editableTasks = computed(() =>
    this.scoped().filter(
      (record) =>
        record.available &&
        ['in-progress', 'needs-revision', 'not-started'].includes(
          record.status,
        ),
    ),
  );
  protected readonly view = computed(() =>
    ['guide', 'upload', 'rubric'].includes(this.query().get('view') ?? '')
      ? (this.query().get('view') ?? '')
      : '',
  );
  protected readonly dialogTitle = computed(() =>
    this.view() === 'upload'
      ? 'Choose a task for your work'
      : this.view() === 'rubric'
        ? 'Portfolio Rubric'
        : 'Portfolio Task Guide',
  );
  protected readonly missing = computed(
    () =>
      this.query().has('taskId') &&
      !this.store.source(this.query().get('taskId') ?? ''),
  );
  protected readonly filterQuery = computed<Params>(() => ({
    term: this.term() === 'first' ? null : this.term(),
    subjectId: this.subject() || null,
    status: this.status() === 'all' ? null : this.status(),
    q: this.search() || null,
    sort: this.sort() === 'due' ? null : this.sort(),
    page: this.page() === 1 ? null : this.page(),
  }));
  constructor() {
    effect(() => {
      const id = this.query().get('taskId');
      if (id && this.store.source(id))
        void this.router.navigate(['/student/portfolio-tasks', id], {
          queryParams: {
            ...this.filterQuery(),
            tab: this.query().get('tab') ?? null,
          },
          replaceUrl: true,
        });
    });
  }
  protected count(status: string): number {
    return this.scoped().filter((record) => record.status === status).length;
  }
  protected action(record: PortfolioRecord): string {
    return !record.available
      ? 'Preview Task'
      : record.status === 'completed'
        ? 'View Feedback'
        : record.status === 'submitted'
          ? 'View Submission'
          : record.status === 'needs-revision'
            ? 'Revise Task'
            : 'Continue Task';
  }
  protected taskQuery(record: PortfolioRecord): Params {
    return {
      ...this.filterQuery(),
      tab:
        record.status === 'completed'
          ? 'feedback'
          : record.status === 'submitted'
            ? 'submission'
            : record.status === 'needs-revision'
              ? 'feedback'
              : null,
    };
  }
  protected change(
    key: 'q' | 'term' | 'subjectId' | 'sort',
    event: Event,
  ): void {
    this.navigate(
      {
        [key]: (event.target as HTMLInputElement).value || null,
        page: null,
        taskId: null,
      },
      key === 'q',
    );
  }
  protected setStatus(status: string): void {
    this.navigate({
      status: status === 'all' ? null : status,
      page: null,
      taskId: null,
    });
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page });
  }
  protected openView(view: string): void {
    this.navigate({ view, taskId: null });
  }
  protected closeView(): void {
    this.navigate({ view: null, taskId: null }, true);
  }
  protected clear(): void {
    this.navigate({
      q: null,
      term: null,
      subjectId: null,
      status: null,
      sort: null,
      page: null,
      taskId: null,
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
