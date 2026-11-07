import {
  DestroyRef,
  Injectable,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { LearnerSubjectId } from '../data/subject-catalog.data';
import { TUTOR_SAMPLES } from './tutor.data';
import {
  initialTutorState,
  readTutorState,
  tutorBytes,
  tutorUploadError,
  TUTOR_MAX_TEXT,
} from './tutor-engine';
import { TutorContextRef, TutorDraft, TutorState } from './tutor.model';
import {
  loadTutorState,
  openTutorDatabase,
  saveTutorState,
} from './tutor-storage';

@Injectable({ providedIn: 'root' })
export class TutorStore {
  readonly state = signal<TutorState>(initialTutorState());
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly uploadErrors = signal<readonly string[]>([]);
  private database?: IDBDatabase;
  private queue: Promise<void> = Promise.resolve();
  private revision = 0;
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(async () => {
      try {
        this.database = await openTutorDatabase();
        this.database.onversionchange = () => {
          this.database?.close();
          this.database = undefined;
          this.persistent.set(false);
        };
        this.state.set(readTutorState(await loadTutorState(this.database)));
      } catch {
        this.persistent.set(false);
      }
      this.ready.set(true);
    });
    destroy.onDestroy(() => {
      void this.queue.finally(() => this.database?.close());
    });
  }
  draft(key: string): TutorDraft {
    return (
      this.state().drafts.find((item) => item.key === key) ?? {
        key,
        text: '',
        files: [],
      }
    );
  }
  question(id: string) {
    return this.state().questions.find((item) => item.id === id);
  }
  edit(key: string, text: string): void {
    this.updateDraft({
      ...this.draft(key),
      text: text.slice(0, TUTOR_MAX_TEXT),
    });
  }
  attach(key: string, files: readonly File[]): void {
    if (!this.ready()) return;
    const draft = this.draft(key),
      accepted = [...draft.files],
      errors: string[] = [];
    let bytes = tutorBytes(this.state());
    for (const file of files) {
      const error =
        file.name.length > 200
          ? 'Use file names of at most 200 characters.'
          : tutorUploadError(accepted, file, bytes);
      if (error) {
        errors.push(error);
        continue;
      }
      accepted.push({
        id: 'file-' + crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        blob: file,
      });
      bytes += file.size;
    }
    this.uploadErrors.set(errors);
    if (accepted.length !== draft.files.length)
      this.updateDraft({ ...draft, files: accepted });
  }
  removeFile(key: string, id: string): void {
    this.updateDraft({
      ...this.draft(key),
      files: this.draft(key).files.filter((file) => file.id !== id),
    });
    this.uploadErrors.set([]);
  }
  saveQuestion(
    key: string,
    subjectId: LearnerSubjectId,
    context?: TutorContextRef,
    existingId?: string,
    sampleId?: string,
  ): string | undefined {
    if (!this.ready()) return undefined;
    const draft = this.draft(key),
      existing = existingId ? this.question(existingId) : undefined;
    if (!draft.text.trim() && !draft.files.length) return undefined;
    if (
      (!existing && this.state().questions.length >= 20) ||
      (existing && existing.messages.length >= 40)
    ) {
      this.error.set(
        'Local question limit reached. Download and delete an old local question, or start a new conversation when this one has 40 messages.',
      );
      return undefined;
    }
    const sample = TUTOR_SAMPLES.find(
      (item) => item.id === sampleId && item.subjectId === subjectId,
    );
    const at = Date.now(),
      id = existing?.id ?? 'local-' + crypto.randomUUID();
    const message = {
      id: 'message-' + crypto.randomUUID(),
      text: draft.text.trim(),
      at,
      files: draft.files,
    };
    const question = existing
      ? { ...existing, messages: [...existing.messages, message] }
      : {
          id,
          subjectId,
          title:
            sample?.title ??
            (message.text || 'Question with attachments').slice(0, 120),
          createdAt: at,
          context,
          ...(sample ? { sampleId: sample.id } : {}),
          messages: [message],
        };
    this.state.update((state) => ({
      ...state,
      questions: [
        ...state.questions.filter((item) => item.id !== id),
        question,
      ],
      drafts: state.drafts.filter((item) => item.key !== key),
    }));
    this.error.set('');
    this.save();
    return id;
  }
  rate(id: string, rating: 'helpful' | 'unhelpful'): void {
    if (!this.ready() || !TUTOR_SAMPLES.some((sample) => sample.id === id))
      return;
    this.state.update((state) => {
      const ratings = { ...state.ratings };
      if (ratings[id] === rating) delete ratings[id];
      else ratings[id] = rating;
      return { ...state, ratings };
    });
    this.save();
  }
  deleteQuestion(id: string): void {
    if (!this.ready() || !this.question(id)) return;
    this.state.update((state) => ({
      ...state,
      questions: state.questions.filter((item) => item.id !== id),
      drafts: state.drafts.filter((item) => item.key !== 'reply:' + id),
    }));
    this.save();
  }
  private updateDraft(draft: TutorDraft): void {
    if (!this.ready()) return;
    if (
      !this.state().drafts.some((item) => item.key === draft.key) &&
      this.state().drafts.length >= 50
    ) {
      this.error.set(
        'The local draft limit is reached. Save an existing draft as a question before starting another.',
      );
      return;
    }
    this.state.update((state) => ({
      ...state,
      drafts: [
        ...state.drafts.filter((item) => item.key !== draft.key),
        draft,
      ].filter((item) => item.text || item.files.length),
    }));
    this.error.set('');
    this.save();
  }
  private save(): void {
    if (!this.database) {
      this.persistent.set(false);
      return;
    }
    const database = this.database,
      snapshot = { version: 1, ...this.state() },
      revision = ++this.revision;
    this.saving.set(true);
    this.queue = this.queue
      .then(() => saveTutorState(database, snapshot))
      .then(() => this.persistent.set(true))
      .catch(() => this.persistent.set(false))
      .finally(() => {
        if (revision === this.revision) this.saving.set(false);
      });
  }
}
