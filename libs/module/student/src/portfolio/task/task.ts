import { progressReturn } from '../../data/progress-context';
import { feedbackReturn } from '../../data/feedback-context';
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
  ChecklistComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  FileUploadComponent,
  FilterTabsComponent,
  LearningStepsComponent,
  ProgressBarComponent,
  ProgressRingComponent,
  RatingStarsComponent,
  RubricTableComponent,
  StatusBadgeComponent,
  WrittenAnswerComponent,
  ReturnLinkComponent,
} from '@school-hub/ui-elements';
import { PortfolioStore } from '../portfolio-store';
import {
  PORTFOLIO_RUBRIC,
  PORTFOLIO_STATUS,
  PORTFOLIO_TABS,
  portfolioDate,
  portfolioTime,
} from '../portfolio.data';
import {
  PORTFOLIO_ACCEPT,
  portfolioChecklist,
  portfolioExtension,
  portfolioScore,
  portfolioSubmissionErrors,
} from '../portfolio-engine';
import { PortfolioFile, PortfolioWork } from '../portfolio.model';
import { portfolioBackQuery } from '../portfolio-navigation';

@Component({
  selector: 'school-hub-portfolio-task',
  imports: [
    ReturnLinkComponent,
    RouterLink,
    ChecklistComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FileUploadComponent,
    FilterTabsComponent,
    LearningStepsComponent,
    ProgressBarComponent,
    ProgressRingComponent,
    RatingStarsComponent,
    RubricTableComponent,
    StatusBadgeComponent,
    WrittenAnswerComponent,
  ],
  templateUrl: './task.html',
  styleUrls: [
    './task.scss',
    './task-content.scss',
    '../portfolio-actions.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioTaskComponent {
  protected readonly store = inject(PortfolioStore);
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly progressReturn = computed(() =>
    progressReturn(this.query()),
  );
  protected readonly task = computed(() =>
    this.store.record(this.params().get('taskId') ?? ''),
  );
  protected readonly editable = computed(() =>
    this.store.editable(this.task()?.id ?? ''),
  );
  protected readonly tab = computed(() =>
    PORTFOLIO_TABS.some((tab) => tab.id === this.query().get('tab'))
      ? (this.query().get('tab') ?? 'overview')
      : 'overview',
  );
  protected readonly feedbackReturn = computed(() =>
    feedbackReturn(this.query()),
  );
  protected readonly backQuery = computed(() =>
    portfolioBackQuery(this.query()),
  );
  protected readonly statuses = PORTFOLIO_STATUS;
  protected readonly tabs = PORTFOLIO_TABS;
  protected readonly rubric = PORTFOLIO_RUBRIC;
  protected readonly date = portfolioDate;
  protected readonly time = portfolioTime;
  protected readonly accept = PORTFOLIO_ACCEPT;
  protected readonly uploadHelp =
    'PDF, DOCX, XLSX, PNG, JPG, TXT, or CSV · up to 5 files · 10 MB each, 20 MB total.';
  protected readonly uploadErrors = signal<readonly string[]>([]);
  protected readonly submissionErrors = signal<readonly string[]>([]);
  protected readonly message = signal('');
  protected readonly dialog = signal<
    'submit' | 'actions' | 'example' | 'preview' | null
  >(null);
  protected readonly submitting = signal(false);
  protected readonly previewFile = signal<PortfolioFile | undefined>(undefined);
  protected readonly previewUrl = signal('');
  protected readonly previewText = signal('');
  protected readonly previewIsImage = computed(() =>
    ['.png', '.jpg', '.jpeg'].includes(
      portfolioExtension(this.previewFile()?.name ?? ''),
    ),
  );
  protected readonly dialogTitle = computed(() =>
    this.dialog() === 'submit'
      ? 'Submit portfolio task?'
      : this.dialog() === 'preview'
        ? (this.previewFile()?.name ?? 'File Preview')
        : this.dialog() === 'example'
          ? 'Example Work Structure'
          : 'Task Actions',
  );
  protected readonly checklist = computed(() => {
    const task = this.task();
    return task
      ? portfolioChecklist(
          task,
          task.files,
          ['completed', 'submitted'].includes(task.status),
        ).map((item) => ({
          ...item,
          disabled: item.automatic || !this.editable(),
        }))
      : [];
  });
  protected readonly submission = computed(() => this.task()?.submission);
  protected readonly submittedWork = computed(() => {
    const task = this.task();
    if (!task?.submission) return undefined;
    return (
      task.submission.snapshot ?? {
        ...this.store.source(task.id)?.initialWork,
        fileNames: [],
      }
    );
  });
  protected readonly earlierFeedback = computed(
    () => !!this.task()?.feedback && this.task()?.status === 'submitted',
  );
  protected readonly feedbackScore = computed(
    () => portfolioScore(this.task()?.feedback?.scores) ?? 0,
  );
  protected readonly journey = [
    { id: 'work', label: 'Complete Your Work', icon: 'ri-pencil-line' },
    { id: 'submission', label: 'Submit Your Work', icon: 'ri-upload-2-line' },
    { id: 'feedback', label: 'Get Feedback', icon: 'ri-chat-1-line' },
  ];
  private openedId?: string;

  constructor() {
    effect(() => {
      const task = this.task();
      if (!this.store.ready()) return;
      if (this.openedId !== task?.id) {
        if (this.openedId) {
          this.store.pause(this.openedId);
          void this.store.save();
        }
        this.openedId = task?.id;
        this.uploadErrors.set([]);
        this.submissionErrors.set([]);
        this.closeDialog();
      }
      if (task && this.editable()) this.store.open(task.id);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.openedId) this.store.pause(this.openedId);
      void this.store.save();
      this.revokePreview();
    });
  }
  protected setTab(tab: string): void {
    if (!this.tabs.some((item) => item.id === tab)) return;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab === 'overview' ? null : tab },
      queryParamsHandling: 'merge',
    });
  }
  protected edit(
    key: keyof PortfolioWork | 'note',
    value: string | boolean,
  ): void {
    const task = this.task();
    if (task) this.store.update(task.id, key, value);
  }
  protected check(item: { id: string; checked: boolean }): void {
    if (item.id === 'readBrief' || item.id === 'reviewed')
      this.edit(item.id, item.checked);
  }
  protected attach(files: readonly File[]): void {
    const task = this.task();
    if (task) this.uploadErrors.set(this.store.attach(task.id, files));
  }
  protected removeFile(id: string): void {
    const task = this.task();
    if (task) {
      this.store.remove(task.id, id);
      this.uploadErrors.set([]);
    }
  }
  protected async save(): Promise<void> {
    await this.store.save();
    this.message.set(
      this.store.persistent()
        ? 'Your work and files are saved on this device.'
        : 'Storage is unavailable. Keep this page open to retain your work.',
    );
  }
  protected async exit(): Promise<void> {
    const task = this.task();
    if (task) this.store.pause(task.id);
    await this.store.save();
    void this.router.navigate(['/student/portfolio-tasks'], {
      queryParams: this.backQuery(),
    });
  }
  protected confirmSubmission(): void {
    const task = this.task();
    if (!task || !this.editable()) return;
    const errors = portfolioSubmissionErrors(task);
    this.submissionErrors.set(errors);
    if (!errors.length) this.dialog.set('submit');
  }
  protected async submit(): Promise<void> {
    const task = this.task();
    if (!task || this.submitting()) return;
    this.submitting.set(true);
    try {
      const errors = await this.store.submit(task.id);
      this.submissionErrors.set(errors);
      if (!errors.length) {
        this.closeDialog();
        this.setTab('submission');
        this.message.set(
          this.store.persistent()
            ? 'Your practice submission is saved on this device. Tutor delivery is not connected.'
            : 'Your practice submission is kept for this visit. Keep this page open; device storage is unavailable.',
        );
        this.document.defaultView?.scrollTo({ top: 0, behavior: 'instant' });
      }
    } finally {
      this.submitting.set(false);
    }
  }
  protected async preview(id: string): Promise<void> {
    const file = this.task()?.files.find((file) => file.id === id);
    if (!file) return;
    this.revokePreview();
    this.previewFile.set(file);
    if (['.png', '.jpg', '.jpeg'].includes(portfolioExtension(file.name)))
      this.previewUrl.set(URL.createObjectURL(file.blob));
    else if (['.txt', '.csv'].includes(portfolioExtension(file.name)))
      this.previewText.set((await file.blob.text()).slice(0, 50000));
    if (this.previewFile()?.id !== file.id) return;
    this.dialog.set('preview');
  }
  protected downloadFile(id: string): void {
    const file = this.task()?.files.find((file) => file.id === id);
    if (file) this.downloadBlob(file.blob, file.name);
  }
  protected closeDialog(): void {
    this.dialog.set(null);
    this.revokePreview();
    this.previewFile.set(undefined);
    this.previewText.set('');
  }
  protected downloadBrief(): void {
    const task = this.task();
    if (!task) return;
    const text = [
      task.title,
      `${task.subject} · Week ${task.week}`,
      `Due: ${this.date(task.dueAt)}`,
      '',
      task.brief,
      '',
      'YOUR TASKS',
      ...task.steps.map((step, index) => `${index + 1}. ${step}`),
      '',
      'SUCCESS CRITERIA',
      ...task.successCriteria,
      '',
      'RUBRIC (100 MARKS)',
      ...this.rubric.map(
        (criterion) =>
          `${criterion.title}: ${criterion.max} marks. ${criterion.description}`,
      ),
    ].join('\n');
    this.downloadBlob(
      new Blob([text], { type: 'text/plain;charset=utf-8' }),
      `${task.id}-brief.txt`,
    );
  }
  protected downloadTemplate(): void {
    const task = this.task();
    if (!task?.available) return;
    const market = task.id === 'market-price-comparison';
    const text = market
      ? 'Item,Shop A price (NGN),Shop B price (NGN),Quantity,Chosen unit price,Total cost,Selling price,Expected income,Profit\nBananas,,,,,,,,\nOranges,,,,,,,,\nApples,,,,,,,,\nPineapples,,,,,,,,\nMangoes,,,,,,,,\nTOTAL,,,,,,,,\n'
      : `${task.title}\n\nMY PLAN AND SOURCES\n\n\nMY FINDINGS AND EVIDENCE\n\n\nWHAT I LEARNED\n\n\nWHAT I WOULD IMPROVE\n`;
    this.downloadBlob(
      new Blob([text], {
        type: market ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8',
      }),
      `${task.id}-template.${market ? 'csv' : 'txt'}`,
    );
  }
  private downloadBlob(blob: Blob, name: string): void {
    const view = this.document.defaultView;
    if (!view) return;
    const url = URL.createObjectURL(blob);
    const anchor = this.document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    view.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  private revokePreview(): void {
    const url = this.previewUrl();
    if (url) URL.revokeObjectURL(url);
    this.previewUrl.set('');
  }
}
