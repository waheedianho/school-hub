import { progressReturn } from '../data/progress-context';
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
import { WorksheetStore } from './worksheet-store';
import { WorksheetRecord } from './worksheet.model';
import {
  WORKSHEET_STATUS,
  worksheetDate,
  worksheetTime,
} from './worksheets.data';
import { worksheetSections } from './worksheet-engine';

@Component({
  selector: 'school-hub-student-worksheets',
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
  ],
  templateUrl: './worksheets.html',
  styleUrls: [
    './worksheets.scss',
    './worksheet-details.scss',
    './worksheet-actions.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentWorksheetsComponent {
  protected readonly store = inject(WorksheetStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly progressReturn = computed(() =>
    progressReturn(this.query()),
  );
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly terms = LESSON_TERMS;
  protected readonly statuses = WORKSHEET_STATUS;
  protected readonly date = worksheetDate;
  protected readonly time = worksheetTime;
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
  protected readonly topic = computed(() => this.query().get('topicId') ?? '');
  protected readonly printable = computed(
    () => this.query().get('printable') === '1',
  );
  protected readonly status = computed(() =>
    ['assigned', 'completed', 'in-progress', 'not-started'].includes(
      this.query().get('status') ?? '',
    )
      ? (this.query().get('status') ?? 'all')
      : 'all',
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
  protected readonly searched = computed(() => {
    const search = this.search().trim().toLowerCase();
    return this.scoped().filter(
      (record) =>
        (!this.topic() ||
          record.topicId === this.topic() ||
          record.lessonId === this.topic()) &&
        (!this.printable() || !!record.questions.length) &&
        (!search ||
          `${record.title} ${record.topic} ${record.subject}`
            .toLowerCase()
            .includes(search)),
    );
  });
  protected readonly filtered = computed(() =>
    this.searched().filter(
      (record) =>
        this.status() === 'all' ||
        (this.status() === 'assigned'
          ? record.assigned && record.status !== 'completed'
          : record.status === this.status()),
    ),
  );
  protected readonly tabs = computed(() => [
    { id: 'all', label: 'All Worksheets', count: this.searched().length },
    {
      id: 'assigned',
      label: 'Assigned to Me',
      count: this.searched().filter(
        (record) => record.assigned && record.status !== 'completed',
      ).length,
    },
    ...(['completed', 'in-progress', 'not-started'] as const).map((status) => ({
      id: status,
      label: this.statuses[status].label,
      count: this.searched().filter((record) => record.status === status)
        .length,
    })),
  ]);
  protected readonly page = computed(() => {
    const value = Number(this.query().get('page') ?? 1);
    return Number.isFinite(value)
      ? Math.min(
          Math.max(1, Math.ceil(this.filtered().length / 5)),
          Math.max(1, Math.floor(value)),
        )
      : 1;
  });
  protected readonly visible = computed(() =>
    this.filtered().slice((this.page() - 1) * 5, this.page() * 5),
  );
  protected readonly selected = computed(() =>
    this.query().has('worksheetId')
      ? this.store.record(this.query().get('worksheetId') ?? '')
      : (this.filtered().find((record) => record.status === 'in-progress') ??
        this.visible()[0]),
  );
  protected readonly missing = computed(
    () => this.query().has('worksheetId') && !this.selected(),
  );
  protected readonly outsideFilters = computed(
    () =>
      !!this.selected() &&
      !this.filtered().some((record) => record.id === this.selected()?.id),
  );
  protected readonly sections = computed(() => {
    const selected = this.selected();
    return selected ? worksheetSections(selected) : [];
  });
  protected readonly completed = computed(() =>
    this.scoped().filter((record) => record.status === 'completed'),
  );
  protected readonly average = computed(() =>
    this.completed().length
      ? Math.round(
          this.completed().reduce(
            (sum, record) => sum + (record.percentage ?? 0),
            0,
          ) / this.completed().length,
        )
      : 0,
  );
  protected readonly best = computed<WorksheetRecord | undefined>(
    () =>
      [...this.completed()].sort(
        (a, b) => (b.percentage ?? 0) - (a.percentage ?? 0),
      )[0],
  );
  protected readonly spent = computed(() =>
    this.scoped().reduce((sum, record) => sum + record.elapsedSeconds, 0),
  );
  protected readonly completion = computed(() =>
    this.scoped().length
      ? Math.round((this.completed().length / this.scoped().length) * 100)
      : 0,
  );
  protected readonly strengths = computed(() =>
    this.completed()
      .filter((record) => (record.percentage ?? 0) >= 80)
      .slice(0, 3),
  );
  protected readonly improve = computed(() =>
    this.completed()
      .filter((record) => (record.percentage ?? 0) < 70)
      .slice(0, 3),
  );
  protected readonly filterQuery = computed<Params>(() => ({
    progressReturn: progressReturn(this.query()) ?? null,
    term: this.term() === 'first' ? null : this.term(),
    subjectId: this.subject() || null,
    topicId: this.topic() || null,
    q: this.search() || null,
    status: this.status() === 'all' ? null : this.status(),
    page: this.page() === 1 ? null : this.page(),
    printable: this.printable() ? '1' : null,
  }));
  protected actionLabel(record: WorksheetRecord): string {
    return record.status === 'completed'
      ? record.questions.length
        ? 'Review Worksheet'
        : 'View Summary'
      : !record.available
        ? 'Locked'
        : record.status === 'in-progress'
          ? 'Continue Worksheet'
          : 'Start Worksheet';
  }
  protected count(status: string): number {
    return this.scoped().filter((record) => record.status === status).length;
  }
  protected select(record: WorksheetRecord): void {
    this.navigate({ worksheetId: record.id });
  }
  protected changeFilter(key: 'q' | 'term' | 'subjectId', event: Event): void {
    this.navigate(
      {
        [key]: (event.target as HTMLInputElement).value || null,
        worksheetId: null,
        page: null,
      },
      key === 'q',
    );
  }
  protected setStatus(status: string): void {
    this.navigate({
      status: status === 'all' ? null : status,
      worksheetId: null,
      page: null,
    });
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page, worksheetId: null });
  }
  protected dismiss(): void {
    this.navigate({ worksheetId: null }, true);
  }
  protected clearFilters(): void {
    this.navigate({
      q: null,
      term: null,
      subjectId: null,
      topicId: null,
      status: null,
      page: null,
      printable: null,
      worksheetId: null,
    });
  }
  protected browsePrintable(): void {
    this.navigate({
      printable: '1',
      worksheetId: null,
      status: null,
      page: null,
      topicId: null,
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
