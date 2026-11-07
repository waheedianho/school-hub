import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ChatPanelComponent,
  ClassroomAction,
  ClassroomToolbarComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  FilterTabsComponent,
  LessonBoardComponent,
  ParticipantStripComponent,
  ParticipantTile,
  ResourceListComponent,
  StatusBadgeComponent,
  WrittenAnswerComponent,
} from '@school-hub/ui-elements';
import { LearnerProfileStore } from '../../data/learner-profile-store';
import { ClassMedia } from '../class-media';
import { downloadClassFile } from '../class-download';
import {
  classBackQuery,
  classDate,
  classJoinIssue,
  classNotes,
  classTime,
  formatClassTimer,
  practiceCorrect,
} from '../live-class-engine';
import { LiveClassStore } from '../live-class-store';
import { SAMPLE_CLASS_PEOPLE } from '../live-classes.data';
import { classroomMessages, classroomResources } from './room-data';

@Component({
  selector: 'school-hub-live-classroom',
  imports: [
    RouterLink,
    ChatPanelComponent,
    ClassroomToolbarComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    LessonBoardComponent,
    ParticipantStripComponent,
    ResourceListComponent,
    StatusBadgeComponent,
    WrittenAnswerComponent,
  ],
  templateUrl: './room.html',
  styleUrls: ['./room.scss', './room-content.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassroomComponent {
  private readonly profile = inject(LearnerProfileStore);
  protected readonly store = inject(LiveClassStore);
  protected readonly media = inject(ClassMedia);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly session = computed(() =>
    this.store.session(this.params().get('classId') ?? ''),
  );
  protected readonly draft = computed(() =>
    this.store.draft(this.params().get('classId') ?? ''),
  );
  protected readonly joined = computed(
    () => this.store.ready() && !!this.draft()?.sessionOpen,
  );
  protected readonly issue = computed(() => {
    const session = this.session();
    return session ? classJoinIssue(session, this.store.now()) : undefined;
  });
  protected readonly backQuery = computed(() => classBackQuery(this.query()));
  protected readonly timer = computed(() =>
    formatClassTimer(this.store.elapsed(this.session()?.id ?? '')),
  );
  protected readonly people = computed<readonly ParticipantTile[]>(() => [
    {
      id: 'you',
      name: this.profile.firstName(),
      initials: this.profile.initials(),
      tone: 'purple' as const,
      self: true,
    },
    ...SAMPLE_CLASS_PEOPLE,
  ]);
  protected readonly sideVisible = signal(true);
  protected readonly dialog = signal('');
  protected readonly message = signal('');
  protected readonly lastReaction = signal('');
  protected readonly tabs = [
    { id: 'chat', label: 'Class Chat' },
    { id: 'notes', label: 'Lesson Notes' },
    { id: 'resources', label: 'Resources' },
  ];
  protected readonly panel = computed(() =>
    ['notes', 'resources'].includes(this.query().get('panel') ?? '')
      ? (this.query().get('panel') ?? 'chat')
      : 'chat',
  );
  protected readonly messages = computed(() => {
    const session = this.session(),
      draft = this.draft();
    return session && draft
      ? classroomMessages(
          session,
          draft,
          this.profile.firstName(),
          this.profile.initials(),
        )
      : [];
  });
  protected readonly resources = computed(() => {
    const session = this.session();
    return session ? classroomResources(session) : [];
  });
  protected readonly date = classDate;
  protected readonly time = classTime;
  protected readonly correct = practiceCorrect;
  protected readonly score = computed(() => {
    const session = this.session(),
      draft = this.draft();
    return session && draft
      ? session.practice.filter((question, index) =>
          practiceCorrect(question.answer, draft.answers[index] ?? ''),
        ).length
      : 0;
  });
  protected readonly dialogTitles: Partial<Record<string, string>> = {
    leave: 'Leave this practice class?',
    participants: 'Practice Participants',
    reactions: 'Choose a Reaction',
    more: 'Classroom Options',
    vocabulary: 'Key Vocabulary',
    activity: 'In-Class Activity',
    recording: 'Recording & Materials',
  };
  private openedId?: string;
  private leaveRequest?: {
    promise: Promise<boolean>;
    resolve: (leave: boolean) => void;
  };
  constructor() {
    effect(() => {
      if (!this.store.ready()) return;
      const session = this.session(),
        draft = this.draft();
      if (this.openedId !== session?.id) {
        if (this.openedId) this.store.leave(this.openedId);
        this.media.stop();
        this.openedId = session?.id;
        if (
          session &&
          draft?.sessionOpen &&
          !classJoinIssue(session, this.store.now())
        )
          this.store.join(session.id);
      }
      if (
        session &&
        draft?.sessionOpen &&
        classJoinIssue(session, this.store.now())
      ) {
        this.store.leave(session.id);
        this.media.stop();
        this.message.set(
          'The scheduled class is no longer available. Your notes and practice are saved for review.',
        );
      }
    });
    inject(DestroyRef).onDestroy(() => {
      this.store.pause();
      this.media.stop();
      this.leaveRequest?.resolve(false);
    });
  }
  canLeave(): boolean | Promise<boolean> {
    if (!this.joined()) return true;
    if (this.leaveRequest) return this.leaveRequest.promise;
    let resolveLeave: (leave: boolean) => void = () => undefined;
    const promise = new Promise<boolean>((resolve) => {
      resolveLeave = resolve;
    });
    this.leaveRequest = { promise, resolve: resolveLeave };
    this.dialog.set('leave');
    return promise;
  }
  protected enter(): void {
    const session = this.session();
    if (session && this.store.join(session.id))
      this.message.set(
        'You joined the practice room. Camera and microphone are off. Your session is local to this browser tab.',
      );
  }
  protected setPanel(panel: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { panel: panel === 'chat' ? null : panel },
      queryParamsHandling: 'merge',
    });
  }
  protected editNotes(value: string): void {
    const session = this.session();
    if (session) this.store.edit(session.id, 'notes', value);
  }
  protected editChat(value: string): void {
    const session = this.session();
    if (session) this.store.edit(session.id, 'chatDraft', value);
  }
  protected send(value: string): void {
    const session = this.session();
    if (session && this.store.send(session.id, value))
      this.message.set(
        'Message added to your local practice chat. It has not been sent to a tutor or classmates.',
      );
  }
  protected react(value: { id: string; reaction: 'heart' | 'like' }): void {
    const session = this.session();
    if (session) this.store.react(session.id, value.id, value.reaction);
  }
  protected slide(index: number): void {
    const session = this.session();
    if (session) this.store.slide(session.id, index);
  }
  protected answer(index: number, value: string): void {
    const session = this.session();
    if (session) this.store.answer(session.id, index, value);
  }
  protected check(): void {
    const session = this.session();
    if (session) this.store.check(session.id);
  }
  protected async action(action: ClassroomAction): Promise<void> {
    const session = this.session();
    if (!session) return;
    if (action === 'mic' || action === 'camera') {
      if (this.joined())
        await this.media.toggle(action === 'mic' ? 'audio' : 'video');
    } else if (action === 'hand') {
      if (this.joined()) {
        this.store.toggle(session.id, 'handRaised');
        this.message.set(
          this.draft()?.handRaised
            ? 'Your hand is raised in this local practice room.'
            : 'Your hand is lowered.',
        );
      }
    } else if (action === 'chat') this.sideVisible.update((value) => !value);
    else if (action === 'leave')
      void this.router.navigate(['/student/live-classes'], {
        queryParams: this.backQuery(),
      });
    else this.dialog.set(action);
  }
  protected closeDialog(): void {
    if (this.dialog() === 'leave') {
      this.leaveRequest?.resolve(false);
      this.leaveRequest = undefined;
    }
    this.dialog.set('');
  }
  protected confirmLeave(): void {
    const session = this.session();
    this.media.stop();
    if (session) this.store.leave(session.id);
    const request = this.leaveRequest;
    this.leaveRequest = undefined;
    this.dialog.set('');
    request?.resolve(true);
  }
  protected reaction(emoji: string): void {
    this.lastReaction.set(emoji);
    this.message.set(`Your local reaction: ${emoji}`);
    this.dialog.set('');
  }
  protected download(id: string): void {
    const session = this.session();
    if (!session) return;
    const content =
      id === 'personal-notes'
        ? (this.draft()?.notes ?? '')
        : id === 'activity-sheet'
          ? [
              session.title,
              '',
              'PRACTICE QUESTIONS',
              ...session.practice.map(
                (question, index) => `${index + 1}. ${question.prompt}`,
              ),
              '',
              'ANSWER EXPLANATIONS',
              ...session.practice.map(
                (question, index) =>
                  `${index + 1}. ${question.answer} — ${question.explanation}`,
              ),
            ].join('\n')
          : classNotes(session);
    downloadClassFile(this.document, `${session.id}-${id}.txt`, content);
  }
}
