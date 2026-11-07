import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  TransferState,
  afterNextRender,
  computed,
  effect,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  AchievementCardComponent,
  ActivityWeekComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  MonthCalendarComponent,
  PreferenceListComponent,
  PreferenceListItem,
  ProfileCardComponent,
  ProfileCardData,
  ProgressListComponent,
  SummaryStatComponent,
  shiftCalendarMonth,
} from '@school-hub/ui-elements';
import { LearnerProfileStore } from '../data/learner-profile-store';
import { LEARNER_PROFILE } from '../data/learning-context.data';
import {
  LEARNER_GOAL_METRICS,
  validateIdentity,
} from '../data/learner-profile-engine';
import {
  IdentityErrors,
  LearnerGoal,
  LearnerIdentity,
} from '../data/learner-profile.model';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { ProgressStore } from '../progress/progress-store';
import { progressSummary } from '../progress/progress-engine';
import {
  learningDay,
  learningStreak,
  profileAchievements,
  profileDate,
  profileEvidence,
  profileGoals,
  profileSubjectRows,
  profileTime,
  recordedPracticeSeconds,
} from './profile-engine';

@Component({
  selector: 'school-hub-student-profile',
  imports: [
    RouterLink,
    AchievementCardComponent,
    ActivityWeekComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    MonthCalendarComponent,
    PreferenceListComponent,
    ProfileCardComponent,
    ProgressListComponent,
    SummaryStatComponent,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss', './profile-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProfileComponent {
  protected readonly profile = inject(LearnerProfileStore);
  protected readonly learning = inject(ProgressStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly transfer = inject(TransferState);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  private readonly now = signal(
    this.transfer.get(makeStateKey<number>('profile-clock'), Date.now()),
  );
  protected readonly date = profileDate;
  protected readonly metricOptions = LEARNER_GOAL_METRICS;
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly summary = computed(() =>
    progressSummary(this.learning.source()),
  );
  protected readonly evidence = computed(() =>
    profileEvidence(this.learning.source(), this.now()),
  );
  protected readonly streak = computed(() =>
    learningStreak(this.evidence(), this.now()),
  );
  protected readonly achievements = computed(() =>
    profileAchievements(this.learning.source(), this.now()),
  );
  protected readonly goalRows = computed(() =>
    profileGoals(this.profile.goals(), this.learning.source()),
  );
  protected readonly subjectRows = computed(() =>
    profileSubjectRows(this.learning.source()),
  );
  protected readonly today = computed(() => learningDay(this.now()));
  protected readonly identityCard = computed<ProfileCardData>(() => ({
    name: this.profile.identity().fullName,
    avatar: LEARNER_PROFILE.avatarUrl,
    badge: LEARNER_PROFILE.className,
    contacts: [
      { icon: 'ri-mail-line', text: this.profile.identity().email },
      {
        icon: 'ri-phone-line',
        text: this.profile.identity().phone || 'Phone not provided',
      },
      {
        icon: 'ri-map-pin-line',
        text: this.profile.identity().location || 'Location not provided',
      },
    ],
    memberSince: profileDate(LEARNER_PROFILE.memberSince),
    accountType: 'Student',
    status: 'Sample profile',
  }));
  protected readonly snapshot = computed(() => [
    {
      title: 'Lessons Completed',
      value: this.summary().completedLessons,
      icon: 'ri-book-open-line',
      tone: 'purple' as const,
    },
    {
      title: 'Average Quiz Score',
      value:
        this.summary().quizAverage === undefined
          ? '—'
          : this.summary().quizAverage + '%',
      icon: 'ri-clipboard-line',
      tone: 'green' as const,
    },
    {
      title: 'Practice Time',
      value: profileTime(recordedPracticeSeconds(this.learning.source())),
      icon: 'ri-time-line',
      tone: 'blue' as const,
    },
    {
      title: 'Badges Earned',
      value: this.achievements().filter((badge) => badge.earned).length,
      icon: 'ri-trophy-line',
      tone: 'orange' as const,
    },
  ]);
  protected readonly preferences = computed<readonly PreferenceListItem[]>(
    () => [
      {
        id: 'language',
        label: 'Preferred Language',
        icon: 'ri-translate-2',
        value: 'English',
        route: '/student/settings',
        queryParams: { section: 'learning' },
      },
      {
        id: 'quality',
        label: 'Video Quality',
        icon: 'ri-video-line',
        value: '720p sample clips',
        route: '/student/settings',
        queryParams: { section: 'learning' },
      },
      {
        id: 'notifications',
        label: 'Notification Settings',
        icon: 'ri-notification-3-line',
        value: 'Not configured',
        route: '/student/settings',
        queryParams: { section: 'notifications' },
      },
      {
        id: 'wifi',
        label: 'Download Over Wi-Fi Only',
        icon: 'ri-wifi-line',
        checked: this.profile.preferences().wifiOnly,
        disabled: !this.profile.ready(),
      },
    ],
  );
  protected readonly security = computed<readonly PreferenceListItem[]>(() => [
    {
      id: 'password',
      label: 'Change Password',
      icon: 'ri-lock-line',
      route: '/student/settings',
      queryParams: { section: 'security' },
    },
    {
      id: 'email',
      label: 'Sign-in Email',
      icon: 'ri-mail-line',
      value: 'Not connected',
      route: '/student/settings',
      queryParams: { section: 'account' },
    },
    {
      id: 'phone',
      label: 'Profile Phone',
      icon: 'ri-smartphone-line',
      value: this.profile.identity().phone || 'Not provided',
      route: '/student/profile',
      queryParams: { view: 'edit' },
    },
    {
      id: 'two-factor',
      label: 'Two-Factor Authentication',
      icon: 'ri-shield-keyhole-line',
      value: 'Not configured',
      route: '/student/settings',
      queryParams: { section: 'security' },
    },
  ]);
  protected readonly view = computed(() =>
    ['edit', 'goals', 'achievements', 'calendar', 'snapshot'].includes(
      this.query().get('view') ?? '',
    )
      ? (this.query().get('view') ?? '')
      : '',
  );
  protected readonly selectedBadge = computed(() =>
    this.achievements().find((badge) => badge.id === this.query().get('badge')),
  );
  protected readonly dialogTitle = computed(
    () =>
      this.selectedBadge()?.title ??
      {
        edit: 'Edit Profile',
        goals: 'Edit Learning Goals',
        achievements: 'My Achievements',
        calendar: 'Learning Activity Calendar',
        snapshot: 'About Your Learning Snapshot',
      }[this.view()] ??
      'Profile',
  );
  protected readonly dialogOpen = computed(
    () => !!this.view() || !!this.selectedBadge(),
  );
  protected readonly draft = signal<LearnerIdentity>({
    ...this.profile.identity(),
  });
  protected readonly errors = signal<IdentityErrors>({});
  protected readonly goalDraft = signal<readonly LearnerGoal[]>([]);
  protected readonly goalError = signal('');
  protected readonly notice = signal('');
  protected readonly month = computed(() =>
    /^20\d{2}-(0[1-9]|1[0-2])$/.test(this.query().get('month') ?? '')
      ? (this.query().get('month') ?? '')
      : this.today().slice(0, 7),
  );
  protected readonly day = computed(() => {
    const day = this.query().get('date') ?? '';
    return /^\d{4}-\d{2}-\d{2}$/.test(day) &&
      day.startsWith(this.month()) &&
      Number.isFinite(Date.parse(day)) &&
      new Date(day).toISOString().slice(0, 10) === day
      ? day
      : this.today().startsWith(this.month())
        ? this.today()
        : this.month() + '-01';
  });
  protected readonly calendarMarkers = computed(() =>
    this.evidence().map((item) => ({ date: item.date, label: item.title })),
  );
  protected readonly dayActivities = computed(() =>
    this.evidence().filter((item) => item.date === this.day()),
  );
  private prepared = '';
  constructor() {
    this.transfer.set(makeStateKey<number>('profile-clock'), this.now());
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.now.set(Date.now());
      const timer = setInterval(() => this.now.set(Date.now()), 60000);
      destroy.onDestroy(() => clearInterval(timer));
    });
    // Initialise each editor after local data loads, including direct links.
    effect(() => {
      const view = this.view();
      if (!this.profile.ready()) return;
      if (this.prepared !== view) {
        this.prepared = view;
        if (view === 'edit') {
          this.draft.set({ ...this.profile.identity() });
          this.errors.set({});
        }
        if (view === 'goals') {
          this.goalDraft.set(this.profile.goals().map((goal) => ({ ...goal })));
          this.goalError.set('');
        }
      }
    });
  }
  protected open(view: string): void {
    if (view === 'edit') {
      this.draft.set({ ...this.profile.identity() });
      this.errors.set({});
    }
    if (view === 'goals') {
      this.goalDraft.set(this.profile.goals().map((goal) => ({ ...goal })));
      this.goalError.set('');
    }
    this.prepared = view;
    this.set({ view, badge: null });
  }
  protected set(queryParams: Params): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  protected close(): void {
    this.prepared = '';
    this.set({ view: null, badge: null, month: null, date: null });
  }
  protected editField(key: keyof LearnerIdentity, event: Event): void {
    this.draft.update((draft) => ({
      ...draft,
      [key]: (event.target as HTMLInputElement).value,
    }));
    this.errors.update((errors) => ({ ...errors, [key]: undefined }));
  }
  protected saveProfile(event: Event): void {
    event.preventDefault();
    this.errors.set(validateIdentity(this.draft()));
    if (this.profile.saveIdentity(this.draft())) {
      this.notice.set(
        'Profile updated on this device. Sign-in details have not been changed.',
      );
      this.close();
    }
  }
  protected editGoal(
    index: number,
    key: 'metric' | 'subjectId' | 'target',
    event: Event,
  ): void {
    const value = (event.target as HTMLInputElement).value;
    this.goalDraft.update((goals) =>
      goals.map((goal, position) =>
        position === index
          ? ({
              ...goal,
              [key]: key === 'target' ? Number(value) : value,
            } as LearnerGoal)
          : goal,
      ),
    );
    this.goalError.set('');
  }
  protected saveGoals(event: Event): void {
    event.preventDefault();
    if (this.profile.saveGoals(this.goalDraft())) {
      this.notice.set('Learning goals saved on this device.');
      this.close();
    } else
      this.goalError.set(
        'Use three valid goals. Score targets must be 1–100%; other targets must be whole numbers from 1 to 500.',
      );
  }
  protected wifi(value: boolean): void {
    this.profile.wifiOnly(value);
    this.notice.set(
      value
        ? 'Resources will use Wi-Fi or wired connections. Unknown connection types require confirmation.'
        : 'Resources may download on any connection.',
    );
  }
  protected calendar(date = this.today()): void {
    this.set({ view: 'calendar', date, month: date.slice(0, 7), badge: null });
  }
  protected changeMonth(amount: number): void {
    const month = shiftCalendarMonth(this.month(), amount);
    this.set({ month, date: month + '-01' });
  }
}
