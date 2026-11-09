import { progressReturn } from '../data/progress-context';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  FilterTabsComponent,
  IconBadgeComponent,
  PaginationComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  StatusBadgeComponent,
  SummaryStatComponent,
  ReturnLinkComponent,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LESSON_TERMS } from '../lessons/lessons.data';
import { FeedbackDetailComponent } from './detail/detail';
import {
  feedbackAverage,
  feedbackFocusAreas,
  reviewedPercentage,
} from './feedback-engine';
import { FeedbackLink, FeedbackRecord } from './feedback.model';
import { FEEDBACK_KINDS, feedbackDate } from './feedback-presentation';
import { FeedbackStore } from './feedback-store';

@Component({
  selector: 'school-hub-student-feedback',
  imports: [
    ReturnLinkComponent,
    RouterLink,
    DashboardCardComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    PaginationComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    StatusBadgeComponent,
    SummaryStatComponent,
    FeedbackDetailComponent,
  ],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFeedbackComponent {
  protected readonly store = inject(FeedbackStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);
  private readonly injector = inject(Injector);
  private readonly fragment = toSignal(this.route.fragment, {
    requireSync: true,
  });
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly progressReturn = computed(() =>
    progressReturn(this.query()),
  );
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly kinds = FEEDBACK_KINDS;
  protected readonly date = feedbackDate;
  protected readonly sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'score', label: 'Lowest Score' },
    { id: 'action', label: 'Needs Action First' },
  ];
  protected readonly search = computed(() => this.query().get('q') ?? '');
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
  protected readonly tab = computed(() =>
    ['quiz', 'worksheet', 'portfolio', 'reviewed', 'needs-action'].includes(
      this.query().get('tab') ?? '',
    )
      ? (this.query().get('tab') ?? 'all')
      : 'all',
  );
  protected readonly sort = computed(() =>
    this.sortOptions.some((item) => item.id === this.query().get('sort'))
      ? (this.query().get('sort') ?? 'recent')
      : 'recent',
  );
  protected readonly scoped = computed(() =>
    this.store
      .records()
      .filter(
        (entry) =>
          (this.term() === 'all' || entry.term === this.term()) &&
          (!this.subject() || entry.subjectId === this.subject()),
      ),
  );
  protected readonly searched = computed(() =>
    this.scoped().filter((entry) =>
      `${entry.title} ${entry.subject} ${entry.topic} ${entry.author}`
        .toLowerCase()
        .includes(this.search().trim().toLowerCase()),
    ),
  );
  protected readonly filtered = computed(() =>
    this.searched()
      .filter((entry) => this.matches(entry, this.tab()))
      .sort((a, b) =>
        this.sort() === 'oldest'
          ? Date.parse(a.date) - Date.parse(b.date)
          : this.sort() === 'score'
            ? (a.score ?? 101) - (b.score ?? 101)
            : this.sort() === 'action'
              ? Number(a.reviewed) - Number(b.reviewed) ||
                Date.parse(b.date) - Date.parse(a.date)
              : Date.parse(b.date) - Date.parse(a.date),
      ),
  );
  protected readonly page = computed(() => {
    const requested = Number(this.query().get('page') ?? 1);
    return Number.isFinite(requested)
      ? Math.min(
          Math.max(1, Math.ceil(this.filtered().length / 5)),
          Math.max(1, Math.floor(requested)),
        )
      : 1;
  });
  protected readonly visible = computed(() =>
    this.filtered().slice((this.page() - 1) * 5, this.page() * 5),
  );
  protected readonly tabs = computed(() =>
    [
      { id: 'all', label: 'All Feedback' },
      ...Object.entries(this.kinds).map(([id, kind]) => ({
        id,
        label: kind.label,
      })),
      { id: 'reviewed', label: 'Reviewed' },
      { id: 'needs-action', label: 'Needs Action' },
    ].map((tab) => ({
      ...tab,
      count: this.searched().filter((entry) => this.matches(entry, tab.id))
        .length,
    })),
  );
  protected readonly selected = computed<FeedbackRecord | undefined>(
    () =>
      this.store.record(this.query().get('feedbackId') ?? '') ??
      this.visible()[0],
  );
  protected readonly missing = computed(
    () =>
      this.store.ready() &&
      this.query().has('feedbackId') &&
      !this.store.record(this.query().get('feedbackId') ?? ''),
  );
  protected readonly outside = computed(
    () =>
      !!this.selected() &&
      !this.visible().some((entry) => entry.id === this.selected()?.id),
  );
  protected readonly reviewed = computed(
    () => this.scoped().filter((entry) => entry.reviewed).length,
  );
  protected readonly progress = computed(() =>
    reviewedPercentage(this.scoped()),
  );
  protected readonly average = computed(() => {
    const score = feedbackAverage(this.scoped());
    return score === undefined ? '—' : `${(score / 20).toFixed(1)} / 5.0`;
  });
  protected readonly focusAreas = computed(() =>
    feedbackFocusAreas(this.scoped()),
  );
  protected readonly practice = computed(() => {
    const entry = this.selected();
    return entry ? this.store.practice(entry) : undefined;
  });
  protected readonly followUp = computed(() => {
    const entry = this.selected();
    return entry ? this.store.followUp(entry) : undefined;
  });
  protected readonly filterQuery = computed<Params>(() => ({
    progressReturn: progressReturn(this.query()) ?? null,
    term: this.term() === 'all' ? null : this.term(),
    subjectId: this.subject() || null,
    q: this.search() || null,
    tab: this.tab() === 'all' ? null : this.tab(),
    sort: this.sort() === 'recent' ? null : this.sort(),
    page: this.page() === 1 ? null : this.page(),
  }));
  protected readonly returnUrl = computed(() =>
    this.router.serializeUrl(
      this.router.createUrlTree(['/student/feedback'], {
        queryParams: { ...this.filterQuery(), feedbackId: this.selected()?.id },
        fragment: 'feedback-detail',
      }),
    ),
  );
  protected readonly tutorQuery = computed<Params>(() => ({
    contextType: 'feedback',
    contextId: this.selected()?.id,
    activityType: this.selected()?.kind,
    activityId: this.selected()?.activityId,
    subjectId: this.selected()?.subjectId,
  }));
  constructor() {
    effect(() => {
      if (this.store.ready() && this.fragment() === 'feedback-detail') {
        afterNextRender(() => this.viewport.scrollToAnchor('feedback-detail'), {
          injector: this.injector,
        });
      }
    });
  }
  protected selectionQuery(entry: FeedbackRecord): Params {
    return { ...this.filterQuery(), feedbackId: entry.id };
  }
  protected actionQuery(link: FeedbackLink): Params {
    return { ...link.query, feedbackReturn: this.returnUrl() };
  }
  protected markReviewed(reviewed: boolean): void {
    const entry = this.selected();
    if (!entry) return;
    // Keep the reviewed item open even when it leaves the active status filter.
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.filterQuery(), feedbackId: entry.id },
      fragment: 'feedback-detail',
      replaceUrl: true,
    });
    this.store.setReviewed(entry.id, reviewed);
  }
  protected change(
    key: 'q' | 'term' | 'subjectId' | 'sort',
    event: Event,
  ): void {
    this.navigate(
      {
        [key]: (event.target as HTMLInputElement).value || null,
        page: null,
        feedbackId: null,
      },
      key === 'q',
    );
  }
  protected setTab(tab: string): void {
    this.navigate({
      tab: tab === 'all' ? null : tab,
      page: null,
      feedbackId: null,
    });
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page, feedbackId: null });
  }
  protected dismiss(): void {
    this.navigate({ feedbackId: null });
  }
  protected clear(): void {
    void this.router.navigate(['/student/feedback']);
  }
  private matches(entry: FeedbackRecord, tab: string): boolean {
    return (
      tab === 'all' ||
      entry.kind === tab ||
      (tab === 'reviewed' && entry.reviewed) ||
      (tab === 'needs-action' && !entry.reviewed)
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
