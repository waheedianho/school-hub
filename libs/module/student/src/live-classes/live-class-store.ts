import {
  DestroyRef,
  Injectable,
  afterNextRender,
  inject,
  signal,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { LIVE_CLASSES } from './live-classes.data';
import { LiveClassDraft } from './live-class.model';
import {
  classJoinIssue,
  initialClassDraft,
  readClassDrafts,
} from './live-class-engine';

export const LIVE_CLASS_STORAGE_KEY = 'school-hub:live-class-practice:v1';
@Injectable({ providedIn: 'root' })
export class LiveClassStore {
  private readonly transfer = inject(TransferState);
  readonly classes = LIVE_CLASSES;
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly now = signal(
    this.transfer.get(makeStateKey<number>('live-class-time'), Date.now()),
  );
  private readonly drafts = signal<readonly LiveClassDraft[]>([]);
  private readonly active = signal<{ id: string; since: number } | null>(null);
  private readonly destroy = inject(DestroyRef);
  constructor() {
    this.transfer.set(makeStateKey<number>('live-class-time'), this.now());
    afterNextRender(() => {
      try {
        this.drafts.set(
          readClassDrafts(
            sessionStorage.getItem(LIVE_CLASS_STORAGE_KEY),
            this.classes,
          ),
        );
      } catch {
        this.persistent.set(false);
      }
      this.now.set(Date.now());
      this.ready.set(true);
      let ticks = 0;
      const timer = setInterval(() => {
        this.now.set(Date.now());
        if (this.active() && ++ticks % 5 === 0) this.save();
      }, 1000);
      const hide = () => this.pause();
      window.addEventListener('pagehide', hide);
      this.destroy.onDestroy(() => {
        clearInterval(timer);
        window.removeEventListener('pagehide', hide);
      });
    });
  }
  session(id: string) {
    return this.classes.find((session) => session.id === id);
  }
  draft(id: string): LiveClassDraft | undefined {
    const session = this.session(id);
    return session
      ? (this.drafts().find((draft) => draft.classId === id) ??
          initialClassDraft(session))
      : undefined;
  }
  elapsed(id: string): number {
    const base =
      this.drafts().find((draft) => draft.classId === id)?.elapsedSeconds ?? 0;
    const active = this.active();
    return (
      base +
      (active?.id === id
        ? Math.max(0, Math.floor((this.now() - active.since) / 1000))
        : 0)
    );
  }
  join(id: string): boolean {
    const session = this.session(id);
    if (!this.ready() || !session || classJoinIssue(session, this.now()))
      return false;
    if (this.active()?.id !== id) {
      this.pause();
      this.now.set(Date.now());
      this.active.set({ id, since: this.now() });
    }
    this.update(id, (draft) => ({
      ...draft,
      sessionOpen: true,
      joinedAt: draft.joinedAt ?? this.now(),
    }));
    return true;
  }
  pause(): void {
    const active = this.active();
    if (!active) return;
    this.now.set(Date.now());
    const elapsedSeconds = this.elapsed(active.id);
    this.active.set(null);
    this.update(active.id, (draft) => ({ ...draft, elapsedSeconds }));
  }
  leave(id: string): void {
    if (this.active()?.id === id) this.pause();
    this.update(id, (draft) => ({
      ...draft,
      sessionOpen: false,
      handRaised: false,
    }));
  }
  edit(id: string, key: 'notes' | 'chatDraft', value: string): void {
    this.update(id, (draft) => ({
      ...draft,
      [key]: value.slice(0, key === 'notes' ? 10000 : 1000),
    }));
  }
  slide(id: string, slide: number): void {
    const session = this.session(id);
    if (
      session &&
      Number.isInteger(slide) &&
      slide >= 0 &&
      slide < session.slides.length
    )
      this.update(id, (draft) => ({ ...draft, slide }));
  }
  answer(id: string, index: number, answer: string): void {
    this.update(id, (draft) => ({
      ...draft,
      checked: false,
      answers: draft.answers.map((value, position) =>
        index === position ? answer.slice(0, 500) : value,
      ),
    }));
  }
  check(id: string): void {
    if (this.draft(id)?.sessionOpen)
      this.update(id, (draft) => ({ ...draft, checked: true }));
  }
  toggle(id: string, key: 'saved' | 'handRaised'): void {
    this.update(id, (draft) => ({ ...draft, [key]: !draft[key] }));
  }
  send(id: string, text: string): boolean {
    if (
      !this.draft(id)?.sessionOpen ||
      !text.trim() ||
      text.trim().length > 1000
    )
      return false;
    this.update(id, (draft) => ({
      ...draft,
      messages: [
        ...draft.messages,
        {
          id: `local-${crypto.randomUUID()}`,
          text: text.trim(),
          at: this.now(),
        },
      ].slice(-100),
      chatDraft: '',
    }));
    return true;
  }
  react(id: string, messageId: string, reaction: 'heart' | 'like'): void {
    const key = `${messageId}:${reaction}`;
    if (this.draft(id)?.sessionOpen)
      this.update(id, (draft) => ({
        ...draft,
        reactions: draft.reactions.includes(key)
          ? draft.reactions.filter((value) => value !== key)
          : [...draft.reactions, key].slice(-500),
      }));
  }
  private update(
    id: string,
    change: (draft: LiveClassDraft) => LiveClassDraft,
  ): void {
    const draft = this.draft(id);
    if (!this.ready() || !draft) return;
    const next = change(draft);
    this.drafts.update((drafts) => [
      ...drafts.filter((item) => item.classId !== id),
      next,
    ]);
    this.save();
  }
  private save(): void {
    if (!this.ready()) return;
    try {
      const active = this.active();
      const drafts = this.drafts().map((draft) =>
        active?.id === draft.classId
          ? { ...draft, elapsedSeconds: this.elapsed(draft.classId) }
          : draft,
      );
      sessionStorage.setItem(
        LIVE_CLASS_STORAGE_KEY,
        JSON.stringify({ version: 1, drafts }),
      );
      this.persistent.set(true);
    } catch {
      this.persistent.set(false);
    }
  }
}
