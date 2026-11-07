import { NextClassComponent } from './next-class/next-class';
import { ClassRecapCardComponent } from './recap-card/recap-card';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  DialogPanelComponent,
  FilterTabsComponent,
  IconBadgeComponent,
  MonthCalendarComponent,
  PaginationComponent,
  ResourceListComponent,
  ResourceListItem,
  SessionCardComponent,
  SessionCardData,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { ClassMedia } from './class-media';
import { ClassConnectionCheckComponent } from './connection-check/connection-check';
import { downloadClassFile } from './class-download';
import {
  classCalendar,
  classCode,
  classDate,
  classDay,
  classJoinIssue,
  classNotes,
  classStatus,
  classTime,
  shiftCalendarMonth,
} from './live-class-engine';
import { LiveClassStore } from './live-class-store';
import { LiveClass } from './live-class.model';
import { CLASS_RULES } from './live-classes.data';

@Component({
  selector: 'school-hub-student-live-classes',
  imports: [
    RouterLink,
    NextClassComponent,
    ClassRecapCardComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    IconBadgeComponent,
    MonthCalendarComponent,
    PaginationComponent,
    ResourceListComponent,
    SessionCardComponent,
    StatusBadgeComponent,
    ClassConnectionCheckComponent,
  ],
  templateUrl: './live-classes.html',
  styleUrls: ['./live-classes.scss', './live-classes-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentLiveClassesComponent {
  protected readonly store = inject(LiveClassStore);
  protected readonly media = inject(ClassMedia);
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly rules = CLASS_RULES;
  protected readonly date = classDate;
  protected readonly time = classTime;
  protected readonly status = classStatus;
  protected readonly code = signal('');
  protected readonly codeError = signal('');
  protected readonly notice = signal('');
  protected readonly search = computed(() => this.query().get('q') ?? '');
  protected readonly subject = computed(() =>
    this.subjects.some((item) => item.id === this.query().get('subjectId'))
      ? (this.query().get('subjectId') ?? '')
      : '',
  );
  protected readonly tab = computed(() =>
    this.query().get('tab') === 'past' ? 'past' : 'upcoming',
  );
  protected readonly scoped = computed(() =>
    this.store.classes.filter(
      (item) =>
        (!this.subject() || item.subjectId === this.subject()) &&
        `${item.title} ${item.description} ${item.tutor}`
          .toLowerCase()
          .includes(this.search().trim().toLowerCase()),
    ),
  );
  protected readonly upcoming = computed(() =>
    this.scoped()
      .filter((item) => classStatus(item, this.store.now()) !== 'ended')
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
  );
  protected readonly past = computed(() =>
    this.scoped()
      .filter((item) => classStatus(item, this.store.now()) === 'ended')
      .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt)),
  );
  protected readonly next = computed(() =>
    this.upcoming().find((item) => !classJoinIssue(item, this.store.now())),
  );
  protected readonly remaining = computed(() =>
    this.upcoming().filter((item) => item.id !== this.next()?.id),
  );
  protected readonly expanded = computed(
    () => this.query().get('expanded') === '1',
  );
  protected readonly page = computed(() => {
    const page = Number(this.query().get('page') ?? 1);
    const total =
      this.tab() === 'past' ? this.past().length : this.remaining().length;
    return Number.isFinite(page)
      ? Math.max(
          1,
          Math.min(
            Math.max(1, Math.ceil(total / (this.tab() === 'past' ? 3 : 4))),
            Math.floor(page),
          ),
        )
      : 1;
  });
  protected readonly visible = computed(() =>
    this.remaining().slice((this.page() - 1) * 4, this.page() * 4),
  );
  protected readonly pastVisible = computed(() =>
    this.tab() === 'past'
      ? this.past().slice((this.page() - 1) * 3, this.page() * 3)
      : this.past().slice(0, 3),
  );
  protected readonly today = computed(() => classDay(this.store.now()));
  protected readonly todayLabel = computed(() =>
    classDate(this.today() + 'T12:00:00+01:00'),
  );
  protected readonly todayClasses = computed(() =>
    this.scoped()
      .filter((item) => classDay(item.startsAt) === this.today())
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
  );
  protected readonly tabs = computed(() => [
    {
      id: 'upcoming',
      label: 'Upcoming Classes',
      count: this.upcoming().length,
    },
    { id: 'past', label: 'Past Classes', count: this.past().length },
  ]);
  protected readonly selected = computed(() =>
    this.store.session(this.query().get('classId') ?? ''),
  );
  protected readonly missing = computed(
    () => this.query().has('classId') && !this.selected(),
  );
  protected readonly view = computed(() =>
    ['code', 'connection', 'calendar', 'rules', 'help', 'details'].includes(
      this.query().get('view') ?? '',
    )
      ? (this.query().get('view') ?? '')
      : '',
  );
  protected readonly dialogOpen = computed(
    () => !!this.view() || !!this.selected(),
  );
  protected readonly dialogTitle = computed(() =>
    this.view() === 'code'
      ? 'Join with Class Code'
      : this.view() === 'connection'
        ? 'Test My Connection'
        : this.view() === 'calendar'
          ? 'Class Calendar'
          : this.view() === 'rules'
            ? 'Class Rules'
            : this.view() === 'help'
              ? 'Joining a Live Class'
              : this.selected() &&
                  classStatus(
                    this.selected() as LiveClass,
                    this.store.now(),
                  ) === 'ended'
                ? 'Class Recap'
                : this.view() === 'details' || this.joinIssue()
                  ? 'Class Details'
                  : 'Join Class',
  );
  protected readonly joinIssue = computed(() => {
    const selected = this.selected();
    return selected ? classJoinIssue(selected, this.store.now()) : undefined;
  });
  protected readonly filterQuery = computed<Params>(() => ({
    tab: this.tab() === 'past' ? 'past' : null,
    subjectId: this.subject() || null,
    q: this.search() || null,
    page: this.page() === 1 ? null : this.page(),
    expanded: this.expanded() ? '1' : null,
  }));
  protected readonly month = computed(() => {
    const month = this.query().get('month') ?? '';
    return /^(20\d{2})-(0[1-9]|1[0-2])$/.test(month)
      ? month
      : this.today().slice(0, 7);
  });
  protected readonly day = computed(() => {
    const value = this.query().get('date') ?? '';
    return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      value.startsWith(this.month()) &&
      !Number.isNaN(Date.parse(value)) &&
      new Date(value).toISOString().slice(0, 10) === value
      ? value
      : this.today().startsWith(this.month())
        ? this.today()
        : this.month() + '-01';
  });
  protected readonly calendarMarkers = computed(() =>
    this.scoped().map((item) => ({
      date: classDay(item.startsAt),
      label: item.title,
    })),
  );
  protected readonly dayClasses = computed(() =>
    this.scoped()
      .filter((item) => classDay(item.startsAt) === this.day())
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
  );
  protected readonly recapResources = computed<readonly ResourceListItem[]>(
    () => {
      const session = this.selected();
      return session
        ? [
            {
              id: 'notes',
              title: 'Lesson Notes & Class Recap',
              meta: 'TXT · Download the lesson content',
              icon: 'ri-file-text-line',
            },
            {
              id: 'lesson',
              title: 'Review Related Lesson',
              meta: session.subject,
              icon: 'ri-book-open-line',
              route: '/student/lessons',
              queryParams: {
                lessonId: session.lessonId,
                subject: session.subjectId,
              },
            },
          ]
        : [];
    },
  );
  constructor() {
    inject(DestroyRef).onDestroy(() => this.media.stop());
  }
  protected row(session: LiveClass): SessionCardData {
    const status = classStatus(session, this.store.now());
    return {
      id: session.id,
      title: session.title,
      description: session.description,
      date: classDate(session.startsAt),
      time: classTime(session),
      host: session.tutor,
      icon: session.icon,
      tone: session.tone,
      availability: !session.accessible
        ? 'Enrolment Required'
        : status === 'live'
          ? 'Live Now'
          : `${Math.max(0, session.capacity - session.enrolled)} Seats Left`,
      action: classJoinIssue(session, this.store.now()) ? 'Details' : 'Join',
    };
  }
  protected seats(session: LiveClass): number {
    return Math.max(0, session.capacity - session.enrolled);
  }
  protected timestamp(value: string): number {
    return Date.parse(value);
  }
  protected openClass(id: string): void {
    this.media.stop();
    this.codeError.set('');
    this.navigate({ classId: id, view: null, month: null, date: null });
  }
  protected more(id: string): void {
    this.navigate({ classId: id, view: 'details' });
  }
  protected openView(view: string): void {
    this.media.stop();
    this.codeError.set('');
    this.navigate({ view, classId: null });
  }
  protected closeView(): void {
    this.media.stop();
    this.codeError.set('');
    this.navigate({ view: null, classId: null, month: null, date: null }, true);
  }
  protected setTab(tab: string): void {
    this.navigate({
      tab: tab === 'past' ? 'past' : null,
      page: null,
      classId: null,
      view: null,
    });
  }
  protected change(key: 'q' | 'subjectId', event: Event): void {
    this.navigate(
      { [key]: (event.target as HTMLInputElement).value || null, page: null },
      key === 'q',
    );
  }
  protected changePage(page: number): void {
    this.navigate({ page: page === 1 ? null : page });
  }
  protected expand(): void {
    this.navigate({ expanded: '1', page: null });
  }
  protected selectDay(date: string): void {
    this.navigate({ date });
  }
  protected changeMonth(amount: number): void {
    const month = shiftCalendarMonth(this.month(), amount);
    this.navigate({ month, date: month + '-01' });
  }
  protected joinCode(event: Event): void {
    event.preventDefault();
    const code = classCode(this.code());
    const session = this.store.classes.find(
      (item) => classCode(item.code) === code,
    );
    if (!session) {
      this.codeError.set(
        'That class code could not be found. Check the code and try again.',
      );
      return;
    }
    this.openClass(session.id);
  }
  protected enter(): void {
    const session = this.selected();
    if (session && this.store.join(session.id))
      void this.router.navigate(['/student/live-classes', session.id], {
        queryParams: this.filterQuery(),
      });
  }
  protected saveClass(): void {
    const session = this.selected();
    if (session) {
      this.store.toggle(session.id, 'saved');
      this.notice.set(
        this.store.draft(session.id)?.saved
          ? 'Class saved in this browser tab. Download the calendar event to add a reminder to your calendar.'
          : 'Class removed from your saved classes.',
      );
    }
  }
  protected calendarFile(session?: LiveClass): void {
    const sessions = session ? [session] : this.scoped();
    downloadClassFile(
      this.document,
      session ? `${session.id}.ics` : 'school-hub-class-calendar.ics',
      classCalendar(sessions, this.store.now()),
      'text/calendar',
    );
  }
  protected downloadRecap(): void {
    const session = this.selected();
    if (session)
      downloadClassFile(
        this.document,
        `${session.id}-lesson-notes.txt`,
        classNotes(session),
      );
  }
  protected clear(): void {
    void this.router.navigate(['/student/live-classes']);
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
