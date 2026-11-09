import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {
  ActivityListComponent,
  ActivityListItem,
  ChatMessage,
  ChatPanelComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  FileUploadComponent,
  FilterTabsComponent,
  IconBadgeComponent,
  downloadBlob,
  downloadTextFile,
} from '@school-hub/ui-elements';
import { LearnerProfileStore } from '../data/learner-profile-store';
import {
  LEARNER_SUBJECTS,
  LearnerSubjectId,
} from '../data/subject-catalog.data';
import { ProgressStore } from '../progress/progress-store';
import {
  contextFromQuery,
  contextRef,
  resolveTutorContext,
  tutorDraftKey,
  tutorSubject,
} from './tutor-context';
import { SUBJECT_TUTORS, TUTOR_SAMPLES } from './tutor.data';
import { tutorDate, TUTOR_MAX_TEXT } from './tutor-engine';
import { TutorStore } from './tutor-store';

@Component({
  selector: 'school-hub-student-ask-tutor',
  imports: [
    RouterLink,
    ActivityListComponent,
    ChatPanelComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FileUploadComponent,
    FilterTabsComponent,
    IconBadgeComponent,
  ],
  templateUrl: './ask-tutor.html',
  styleUrls: [
    './ask-tutor.scss',
    './tutor-conversation.scss',
    './tutor-dialog.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentAskTutorComponent {
  protected readonly store = inject(TutorStore);
  protected readonly profile = inject(LearnerProfileStore);
  protected readonly learning = inject(ProgressStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly maxText = TUTOR_MAX_TEXT;
  protected readonly tutors = SUBJECT_TUTORS;
  protected readonly date = tutorDate;
  protected readonly subjects = [
    LEARNER_SUBJECTS[1],
    LEARNER_SUBJECTS[0],
    LEARNER_SUBJECTS[2],
  ].map((item) => ({ id: item.id, label: item.name }));
  private readonly requestedSubject = computed(
    () => tutorSubject(this.query().get('subjectId')) ?? 'english-language',
  );
  private readonly incoming = computed(() =>
    resolveTutorContext(
      contextFromQuery(this.query()),
      this.requestedSubject(),
      this.learning.source(),
    ),
  );
  protected readonly selectedId = computed(
    () =>
      this.query().get('conversationId') ??
      (!this.query().get('contextType') && this.query().get('new') !== '1'
        ? (TUTOR_SAMPLES.find(
            (item) => item.subjectId === this.requestedSubject(),
          )?.id ?? '')
        : ''),
  );
  protected readonly question = computed(() =>
    this.store.question(this.selectedId()),
  );
  protected readonly sample = computed(() =>
    TUTOR_SAMPLES.find(
      (item) => item.id === (this.question()?.sampleId ?? this.selectedId()),
    ),
  );
  protected readonly subject = computed<LearnerSubjectId>(
    () =>
      this.question()?.subjectId ??
      this.sample()?.subjectId ??
      this.incoming()?.subjectId ??
      this.requestedSubject(),
  );
  protected readonly tutor = computed(
    () =>
      SUBJECT_TUTORS.find((item) => item.id === this.subject()) ??
      SUBJECT_TUTORS[0],
  );
  protected readonly context = computed(() =>
    this.question()
      ? resolveTutorContext(
          this.question()?.context,
          this.subject(),
          this.learning.source(),
        )
      : this.sample()
        ? resolveTutorContext(
            this.sample()?.context,
            this.subject(),
            this.learning.source(),
          )
        : this.incoming(),
  );
  protected readonly key = computed(() =>
    tutorDraftKey(
      this.subject(),
      this.question()?.id ?? this.sample()?.id,
      contextRef(this.context()),
    ),
  );
  protected readonly draft = computed(() => this.store.draft(this.key()));
  protected readonly enabled = computed(
    () => this.store.ready() && this.learning.ready(),
  );
  protected readonly rating = computed(
    () => this.store.state().ratings[this.sample()?.id ?? ''],
  );
  protected readonly messages = computed<readonly ChatMessage[]>(() => [
    ...(this.sample()?.messages ?? []).map((message) => ({
      ...message,
      name:
        message.role === 'you'
          ? this.profile.identity().fullName
          : this.tutor().name,
      initials:
        message.role === 'you'
          ? this.profile.initials()
          : this.tutor().initials,
      image:
        message.role === 'you'
          ? this.profile.learner().avatarUrl
          : this.tutor().image,
      time:
        'Sample · ' +
        tutorDate(message.at) +
        ' · ' +
        tutorDate(message.at, true),
      reactions: [],
    })),
    ...(this.question()?.messages ?? []).map((message) => ({
      id: message.id,
      text: message.text,
      role: 'you' as const,
      name: this.profile.identity().fullName,
      initials: this.profile.initials(),
      image: this.profile.learner().avatarUrl,
      time:
        'Not sent · ' +
        tutorDate(message.at) +
        ' · ' +
        tutorDate(message.at, true),
      reactions: [],
      attachments: message.files.map((file) => ({
        id: file.id,
        name: file.name,
        detail: this.fileSize(file.size),
      })),
    })),
  ]);
  protected readonly history = computed<ActivityListItem[]>(() =>
    [
      ...TUTOR_SAMPLES.map((item) => ({
        id: item.id,
        title: item.title,
        subjectId: item.subjectId,
        at: item.messages[0].at,
        sample: true,
      })),
      ...this.store.state().questions.map((item) => ({
        ...item,
        at: item.createdAt,
        sample: false,
      })),
    ]
      .filter((item) => item.subjectId === this.subject())
      .sort((a, b) => b.at - a.at)
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: tutorDate(item.at),
        icon: 'ri-question-answer-line',
        tone: 'purple',
        route: '/student/ask-tutor',
        queryParams: { subjectId: item.subjectId, conversationId: item.id },
        meta: item.sample ? 'Sample answer' : 'Not sent',
      })),
  );
  protected readonly historySearch = signal('');
  protected readonly filteredHistory = computed(() =>
    this.history().filter((item) =>
      item.title
        .toLowerCase()
        .includes(this.historySearch().trim().toLowerCase()),
    ),
  );
  protected readonly topics = computed<ActivityListItem[]>(() =>
    this.learning
      .source()
      .lessons.filter((item) => item.subjectId === this.subject())
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.available
          ? 'Ask about this lesson'
          : 'Ask about lesson availability',
        icon: 'ri-book-open-line',
        tone: 'purple',
        route: '/student/ask-tutor',
        queryParams: {
          subjectId: item.subjectId,
          contextType: 'lesson',
          contextId: item.id,
          new: '1',
          message: `Can you help me understand ${item.title}?`,
        },
      })),
  );
  protected readonly contextError = computed(() => {
    if (!this.enabled()) return '';
    if (
      this.query().get('conversationId') &&
      !this.question() &&
      !this.sample()
    )
      return 'That conversation could not be found. You can start a new question below.';
    if (this.query().get('contextType') && !this.incoming())
      return 'The linked activity could not be found. No activity has been attached to this question.';
    if (
      this.query().get('questionId') &&
      this.incoming()?.type === 'worksheet' &&
      !this.incoming()?.questionId
    )
      return 'The worksheet is attached, but that question is unavailable.';
    return '';
  });
  protected readonly view = computed(() =>
    ['tutors', 'topics', 'history', 'attachments', 'file', 'delete'].includes(
      this.query().get('view') ?? '',
    )
      ? (this.query().get('view') ?? '')
      : '',
  );
  protected readonly dialogTitle = computed(
    () =>
      ({
        tutors: 'Your Subject Tutors',
        topics: 'Popular Topics',
        history: 'Your Past Questions',
        attachments: 'Attach Files to Your Question',
        file: 'Question Attachment',
        delete: 'Delete Local Question',
      })[this.view()] ?? 'Ask Tutor',
  );
  private readonly currentFiles = computed(() => [
    ...this.draft().files,
    ...(this.question()?.messages.flatMap((message) => message.files) ?? []),
  ]);
  protected readonly file = computed(() =>
    this.currentFiles().find((file) => file.id === this.query().get('fileId')),
  );
  protected readonly preview = signal<{
    image?: string;
    text?: string;
    error?: string;
  }>({});
  protected readonly notice = signal('');
  protected readonly storageStatus = computed(() =>
    !this.store.ready()
      ? 'Loading your local questions…'
      : this.store.saving()
        ? 'Saving on this device…'
        : !this.store.persistent()
          ? 'Available for this visit. This browser could not save your questions for later.'
          : 'Saved on this device. New messages have not been sent.',
  );
  constructor() {
    const applied = new Set<string>();
    effect(() => {
      const message = this.query().get('message')?.slice(0, TUTOR_MAX_TEXT),
        key = this.key();
      if (
        !this.enabled() ||
        !message ||
        this.question() ||
        this.sample() ||
        applied.has(key + message)
      )
        return;
      applied.add(key + message);
      if (!this.draft().text) this.store.edit(key, message);
    });
    effect((onCleanup) => {
      const file = this.view() === 'file' ? this.file() : undefined;
      this.preview.set({});
      if (!file) return;
      let active = true;
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file.blob);
        this.preview.set({ image: url });
        onCleanup(() => {
          active = false;
          URL.revokeObjectURL(url);
        });
      } else {
        onCleanup(() => {
          active = false;
        });
        if (/\.txt$/i.test(file.name))
          void file.blob
            .text()
            .then((text) => {
              if (active) this.preview.set({ text: text.slice(0, 10000) });
            })
            .catch(() => {
              if (active)
                this.preview.set({
                  error:
                    'The file could not be previewed. You can try downloading it.',
                });
            });
      }
    });
  }
  protected set(queryParams: Params): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  protected open(view: string): void {
    this.store.uploadErrors.set([]);
    this.set({ view, fileId: null });
  }
  protected close(): void {
    this.set({ view: null, fileId: null });
  }
  protected newQuestion(subject = this.subject()): void {
    this.notice.set('');
    this.store.error.set('');
    this.store.uploadErrors.set([]);
    void this.router.navigate(['/student/ask-tutor'], {
      queryParams: { subjectId: subject, new: '1' },
    });
  }
  protected selectSubject(id: string): void {
    const subject = tutorSubject(id);
    if (subject) this.newQuestion(subject);
  }
  protected saveQuestion(): void {
    const id = this.store.saveQuestion(
      this.key(),
      this.subject(),
      contextRef(this.context()),
      this.question()?.id,
      this.sample()?.id,
    );
    if (id) {
      this.notice.set(
        'Question saved locally. It has not been sent to a tutor.',
      );
      void this.router.navigate(['/student/ask-tutor'], {
        queryParams: { subjectId: this.subject(), conversationId: id },
      });
    }
  }
  protected rate(value: 'helpful' | 'unhelpful'): void {
    const sample = this.sample();
    if (sample) this.store.rate(sample.id, value);
  }
  protected openFile(id: string): void {
    this.set({ view: 'file', fileId: id });
  }
  protected downloadFile(id: string): void {
    const file = this.currentFiles().find((file) => file.id === id);
    if (file && !downloadBlob(this.document, file.name, file.blob))
      this.notice.set('This browser could not start the file download.');
  }
  protected exportConversation(): void {
    const body = [
      'SCHOOLHUB — LOCAL TUTOR CONVERSATION',
      'New questions and follow-ups have not been sent to a tutor. Replies marked Sample are examples.',
      '',
      `Subject: ${this.tutor().description}`,
      `Activity: ${this.context()?.title ?? 'General question'}`,
      '',
      ...this.messages().map(
        (message) =>
          `${message.name} (${message.time})\n${message.text}${message.attachments?.length ? '\nAttachments: ' + message.attachments.map((file) => file.name).join(', ') : ''}`,
      ),
      ...(this.draft().text || this.draft().files.length
        ? [
            'UNSENT DRAFT\n' +
              this.draft().text +
              '\nAttachments: ' +
              this.draft()
                .files.map((file) => file.name)
                .join(', '),
          ]
        : []),
    ].join('\n\n');
    downloadTextFile(this.document, 'tutor-conversation.txt', body);
  }
  protected deleteQuestion(): void {
    const question = this.question();
    if (question) {
      this.store.deleteQuestion(question.id);
      this.newQuestion(question.subjectId);
      this.notice.set('Local question and its attachments deleted.');
    }
  }
  protected fileSize(value: number): string {
    return value < 1024
      ? value + ' B'
      : value < 1048576
        ? (value / 1024).toFixed(1) + ' KB'
        : (value / 1048576).toFixed(1) + ' MB';
  }
}
