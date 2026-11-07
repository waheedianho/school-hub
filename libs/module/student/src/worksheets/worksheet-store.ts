import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LEARNER_WORKSHEETS } from './worksheets.data';
import { WorksheetDraft, WorksheetRecord } from './worksheet.model';
import { gradeWorksheet, readWorksheetDrafts } from './worksheet-engine';

export const WORKSHEET_STORAGE_KEY = 'school-hub:worksheets:v1';

@Injectable({ providedIn: 'root' })
export class WorksheetStore {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroy = inject(DestroyRef);
  private readonly drafts = signal<WorksheetDraft[]>([]);
  private readonly active = signal<{ id: string; since: number } | null>(null);
  private readonly now = signal(Date.now());
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly records = computed<readonly WorksheetRecord[]>(() =>
    LEARNER_WORKSHEETS.map((worksheet) => {
      const draft = this.drafts().find(
        (item) => item.worksheetId === worksheet.id,
      );
      const answers = draft?.answers ?? worksheet.initialAnswers;
      const completed =
        !!draft?.submittedAt || worksheet.status === 'completed';
      const score = gradeWorksheet(worksheet, answers);
      const answered =
        completed && !worksheet.questions.length
          ? worksheet.questionCount
          : score.answered;
      const percentage = completed
        ? worksheet.questions.length
          ? score.percentage
          : worksheet.samplePercentage
        : undefined;
      return {
        ...worksheet,
        status: completed
          ? 'completed'
          : draft
            ? 'in-progress'
            : worksheet.status,
        answers,
        marked: draft?.marked ?? [],
        currentIndex:
          draft?.currentIndex ??
          Math.min(answered, Math.max(0, worksheet.questions.length - 1)),
        scratch: draft?.scratch ?? '',
        elapsedSeconds: this.elapsed(worksheet.id),
        answered,
        progress: Math.round((answered / worksheet.questionCount) * 100),
        percentage,
        marks:
          percentage === undefined
            ? undefined
            : worksheet.questions.length
              ? score.marks
              : (worksheet.totalMarks * percentage) / 100,
        correct:
          completed && worksheet.questions.length ? score.correct : undefined,
        submittedAt: draft?.submittedAt ?? worksheet.submittedAt,
      };
    }),
  );
  readonly completedCount = computed(
    () => this.records().filter((item) => item.status === 'completed').length,
  );
  readonly completion = computed(() =>
    Math.round((this.completedCount() / LEARNER_WORKSHEETS.length) * 100),
  );

  constructor() {
    afterNextRender(() => {
      try {
        this.drafts.set(
          readWorksheetDrafts(
            sessionStorage.getItem(WORKSHEET_STORAGE_KEY),
            LEARNER_WORKSHEETS,
          ),
        );
      } catch {
        this.persistent.set(false);
      }
      this.ready.set(true);
      let ticks = 0;
      const timer = setInterval(() => {
        this.now.set(Date.now());
        if (this.active() && ++ticks % 5 === 0) this.save();
      }, 1000);
      this.destroy.onDestroy(() => clearInterval(timer));
    });
  }
  record(id: string): WorksheetRecord | undefined {
    return this.records().find((item) => item.id === id);
  }
  elapsed(id: string): number {
    const base =
      this.drafts().find((item) => item.worksheetId === id)?.elapsedSeconds ??
      LEARNER_WORKSHEETS.find((item) => item.id === id)?.initialSeconds ??
      0;
    const active = this.active();
    return (
      base +
      (active?.id === id
        ? Math.max(0, Math.floor((this.now() - active.since) / 1000))
        : 0)
    );
  }
  open(id: string): void {
    const record = this.record(id);
    if (
      !this.browser ||
      !this.ready() ||
      !record?.available ||
      record.status === 'completed'
    )
      return;
    if (!this.drafts().some((item) => item.worksheetId === id))
      this.replace(this.initial(record));
    if (this.active()?.id === id) return;
    this.pause();
    this.now.set(Date.now());
    this.active.set({ id, since: Date.now() });
    this.save();
  }
  answer(id: string, index: number, value: string): void {
    this.update(id, (draft) =>
      index >= 0 && index < draft.answers.length
        ? {
            ...draft,
            currentIndex: index,
            answers: draft.answers.map((answer, position) =>
              position === index ? value.slice(0, 500) : answer,
            ),
          }
        : draft,
    );
  }
  navigate(id: string, index: number): void {
    this.update(id, (draft) =>
      Number.isInteger(index) && index >= 0 && index < draft.answers.length
        ? { ...draft, currentIndex: index }
        : draft,
    );
  }
  mark(id: string, index: number): void {
    this.update(id, (draft) =>
      index >= 0 && index < draft.answers.length
        ? {
            ...draft,
            marked: draft.marked.includes(index)
              ? draft.marked.filter((value) => value !== index)
              : [...draft.marked, index],
          }
        : draft,
    );
  }
  scratch(id: string, value: string): void {
    this.update(id, (draft) => ({ ...draft, scratch: value.slice(0, 10000) }));
  }
  pause(id?: string): void {
    const active = this.active();
    if (!active || (id && active.id !== id)) return;
    this.now.set(Date.now());
    const draft = this.drafts().find((item) => item.worksheetId === active.id);
    const seconds = this.elapsed(active.id);
    this.active.set(null);
    if (draft) this.replace({ ...draft, elapsedSeconds: seconds });
    this.save();
  }
  submit(id: string): void {
    const record = this.record(id);
    if (!this.ready() || !record?.available || record.status === 'completed')
      return;
    this.pause(id);
    const draft =
      this.drafts().find((item) => item.worksheetId === id) ??
      this.initial(record);
    this.replace({ ...draft, submittedAt: new Date().toISOString() });
    this.save();
  }
  save(): void {
    if (!this.browser || !this.ready()) return;
    try {
      sessionStorage.setItem(
        WORKSHEET_STORAGE_KEY,
        JSON.stringify({
          version: 1,
          drafts: this.drafts().map((draft) => ({
            ...draft,
            elapsedSeconds: this.elapsed(draft.worksheetId),
          })),
        }),
      );
    } catch {
      this.persistent.set(false);
    }
  }
  private initial(record: WorksheetRecord): WorksheetDraft {
    return {
      worksheetId: record.id,
      answers: [...record.answers],
      marked: [...record.marked],
      currentIndex: record.currentIndex,
      elapsedSeconds: record.elapsedSeconds,
      scratch: record.scratch,
    };
  }
  private update(
    id: string,
    transform: (draft: WorksheetDraft) => WorksheetDraft,
  ): void {
    const record = this.record(id);
    if (!this.ready() || !record?.available || record.status === 'completed')
      return;
    const draft =
      this.drafts().find((item) => item.worksheetId === id) ??
      this.initial(record);
    this.replace(transform(draft));
    this.save();
  }
  private replace(draft: WorksheetDraft): void {
    this.drafts.update((items) => [
      ...items.filter((item) => item.worksheetId !== draft.worksheetId),
      draft,
    ]);
  }
}
