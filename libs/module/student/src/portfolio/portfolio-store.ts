import {
  DestroyRef,
  Injectable,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LEARNER_PORTFOLIO_TASKS } from './portfolio.data';
import {
  portfolioProgress,
  portfolioScore,
  portfolioSubmissionErrors,
  readPortfolioDrafts,
  validatePortfolioUploads,
} from './portfolio-engine';
import {
  PortfolioDraft,
  PortfolioRecord,
  PortfolioWork,
} from './portfolio.model';
import {
  loadPortfolioDrafts,
  openPortfolioDatabase,
  savePortfolioDrafts,
} from './portfolio-storage';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly drafts = signal<PortfolioDraft[]>([]);
  private readonly active = signal<{ id: string; since: number } | null>(null);
  private readonly now = signal(Date.now());
  private database?: IDBDatabase;
  private pending = new Set<string>();
  private queue: Promise<void> = Promise.resolve();
  private saveTimer?: ReturnType<typeof setTimeout>;
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly saving = signal(false);
  readonly records = computed<readonly PortfolioRecord[]>(() =>
    LEARNER_PORTFOLIO_TASKS.map((task) => {
      const draft = this.drafts().find((item) => item.taskId === task.id);
      const work = draft ?? task.initialWork;
      const status = draft?.submission ? 'submitted' : task.status;
      const handedIn = ['completed', 'submitted'].includes(status);
      return {
        ...task,
        ...work,
        files: draft?.files ?? [],
        note: draft?.note ?? '',
        status,
        updatedAt: draft?.updatedAt ?? task.updatedAt,
        startedAt: draft?.startedAt ?? task.startedAt,
        secondsSpent: this.elapsed(task.id),
        submission: draft?.submission ?? task.submission,
        score: ['completed', 'needs-revision'].includes(status)
          ? portfolioScore(task.feedback?.scores)
          : undefined,
        progress: !task.available
          ? 0
          : portfolioProgress(work, draft?.files ?? [], handedIn),
      };
    }),
  );
  readonly handedInCount = computed(
    () =>
      this.records().filter((record) =>
        ['submitted', 'completed'].includes(record.status),
      ).length,
  );
  readonly completion = computed(() =>
    Math.round((this.handedInCount() / this.records().length) * 100),
  );

  constructor() {
    afterNextRender(async () => {
      try {
        this.database = await openPortfolioDatabase();
        this.drafts.set(
          readPortfolioDrafts(
            await loadPortfolioDrafts(this.database),
            LEARNER_PORTFOLIO_TASKS,
          ),
        );
      } catch {
        this.persistent.set(false);
      }
      this.ready.set(true);
    });
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      let ticks = 0;
      const timer = setInterval(() => {
        this.now.set(Date.now());
        if (this.active() && ++ticks % 5 === 0) {
          this.pending.add(this.active()?.id ?? '');
          void this.save();
        }
      }, 1000);
      destroy.onDestroy(() => clearInterval(timer));
    });
    destroy.onDestroy(() => {
      if (this.saveTimer) clearTimeout(this.saveTimer);
      this.database?.close();
    });
  }
  record(id: string): PortfolioRecord | undefined {
    return this.records().find((item) => item.id === id);
  }
  source(id: string) {
    return LEARNER_PORTFOLIO_TASKS.find((item) => item.id === id);
  }
  editable(id: string): boolean {
    const record = this.record(id);
    return (
      this.ready() &&
      !!record?.available &&
      ['in-progress', 'needs-revision', 'not-started'].includes(record.status)
    );
  }
  elapsed(id: string): number {
    const seconds =
      this.drafts().find((item) => item.taskId === id)?.secondsSpent ??
      this.source(id)?.secondsSpent ??
      0;
    const active = this.active();
    return (
      seconds +
      (active?.id === id
        ? Math.max(0, Math.floor((this.now() - active.since) / 1000))
        : 0)
    );
  }
  open(id: string): void {
    if (!this.editable(id) || this.active()?.id === id) return;
    this.pause();
    this.now.set(Date.now());
    this.active.set({ id, since: Date.now() });
  }
  pause(id?: string): void {
    const active = this.active();
    if (!active || (id && active.id !== id)) return;
    this.now.set(Date.now());
    const record = this.record(active.id);
    const seconds = this.elapsed(active.id);
    this.active.set(null);
    if (record && this.editable(record.id))
      this.replace({ ...this.draft(record.id), secondsSpent: seconds });
  }
  update(
    id: string,
    key: keyof PortfolioWork | 'note',
    value: string | boolean,
  ): void {
    if (!this.editable(id)) return;
    const limits: Record<string, number> = {
      planning: 10000,
      work: 20000,
      reflection: 5000,
      note: 2000,
    };
    if (key === 'readBrief' || key === 'reviewed') {
      if (typeof value !== 'boolean') return;
    } else {
      if (typeof value !== 'string') return;
      value = value.slice(0, limits[key]);
    }
    this.replace({ ...this.draft(id), [key]: value });
  }
  attach(id: string, files: readonly File[]): string[] {
    const record = this.record(id);
    if (!record || !this.editable(id)) return ['This task is read-only.'];
    const { accepted, errors } = validatePortfolioUploads(record.files, files);
    if (accepted.length)
      this.replace({
        ...this.draft(id),
        files: [
          ...record.files,
          ...accepted.map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            addedAt: new Date().toISOString(),
            blob: file,
          })),
        ],
      });
    return errors;
  }
  remove(id: string, fileId: string): void {
    if (this.editable(id))
      this.replace({
        ...this.draft(id),
        files: this.draft(id).files.filter((file) => file.id !== fileId),
      });
  }
  async submit(id: string): Promise<string[]> {
    const record = this.record(id);
    if (!record || !this.editable(id))
      return ['This task cannot be submitted.'];
    const errors = portfolioSubmissionErrors(record);
    if (errors.length) return errors;
    this.pause(id);
    const draft = this.draft(id);
    this.replace({
      ...draft,
      readBrief: true,
      reviewed: true,
      submission: {
        id: `portfolio-${crypto.randomUUID()}`,
        submittedAt: new Date().toISOString(),
        version: (record.submission?.version ?? 0) + 1,
        note: draft.note,
        snapshot: {
          planning: draft.planning,
          work: draft.work,
          reflection: draft.reflection,
          fileNames: draft.files.map((file) => file.name),
        },
      },
    });
    await this.save();
    return [];
  }
  async save(): Promise<void> {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = undefined;
    }
    const ids = new Set(this.pending);
    this.pending.clear();
    const snapshots = this.drafts()
      .filter((draft) => ids.has(draft.taskId))
      .map((draft) => ({ ...draft, secondsSpent: this.elapsed(draft.taskId) }));
    if (!snapshots.length) return this.queue;
    if (!this.database) {
      this.persistent.set(false);
      this.saving.set(false);
      return;
    }
    const database = this.database;
    this.saving.set(true);
    const write = this.queue
      .then(() => savePortfolioDrafts(database, snapshots))
      .then(() => {
        this.persistent.set(true);
      })
      .catch(() => {
        this.persistent.set(false);
      });
    this.queue = write;
    await write;
    if (this.queue === write && !this.pending.size) this.saving.set(false);
  }
  private draft(id: string): PortfolioDraft {
    const saved = this.drafts().find((draft) => draft.taskId === id);
    if (saved) return saved;
    const task = this.source(id);
    if (!task) throw new Error('Portfolio task not found');
    return {
      taskId: task.id,
      ...task.initialWork,
      files: [],
      note: '',
      startedAt: task.startedAt,
      updatedAt: task.updatedAt,
      secondsSpent: task.secondsSpent,
    };
  }
  private replace(draft: PortfolioDraft): void {
    this.drafts.update((items) => [
      ...items.filter((item) => item.taskId !== draft.taskId),
      { ...draft, updatedAt: new Date().toISOString() },
    ]);
    this.pending.add(draft.taskId);
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saving.set(true);
    this.saveTimer = setTimeout(() => {
      void this.save();
    }, 300);
  }
}
