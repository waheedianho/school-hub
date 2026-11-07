import { progressReturn } from '../../data/progress-context';
import { feedbackReturn } from '../../data/feedback-context';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CalculatorComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  IconBadgeComponent,
  ProgressRingComponent,
  QuestionNavigatorComponent,
  StatusBadgeComponent,
  UnitConverterComponent,
  WrittenAnswerComponent,
  ReturnLinkComponent,
} from '@school-hub/ui-elements';
import { WorksheetStore } from '../worksheet-store';
import {
  WORKSHEET_STATUS,
  worksheetDate,
  worksheetTime,
} from '../worksheets.data';
import { isWrittenAnswerCorrect, worksheetSections } from '../worksheet-engine';
import { worksheetBackQuery } from '../worksheet-navigation';

type Tool =
  | 'calculator'
  | 'scratch'
  | 'notes'
  | 'converter'
  | 'submit'
  | 'print';
@Component({
  selector: 'school-hub-worksheet-workspace',
  imports: [
    ReturnLinkComponent,
    RouterLink,
    CalculatorComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    IconBadgeComponent,
    ProgressRingComponent,
    QuestionNavigatorComponent,
    StatusBadgeComponent,
    UnitConverterComponent,
    WrittenAnswerComponent,
  ],
  templateUrl: './workspace.html',
  styleUrls: [
    './workspace.scss',
    './workspace-tools.scss',
    '../worksheet-actions.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksheetWorkspaceComponent {
  protected readonly store = inject(WorksheetStore);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
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
  protected readonly record = computed(() =>
    this.store.record(this.params().get('worksheetId') ?? ''),
  );
  protected readonly feedbackReturn = computed(() =>
    feedbackReturn(this.query()),
  );
  protected readonly backQuery = computed(() =>
    worksheetBackQuery(this.query(), this.record()?.id ?? ''),
  );
  protected readonly sections = computed(() => {
    const record = this.record();
    return record ? worksheetSections(record) : [];
  });
  protected readonly answered = computed(
    () =>
      this.record()?.answers.flatMap((answer, index) =>
        answer.trim() ? [index] : [],
      ) ?? [],
  );
  protected readonly completed = computed(
    () => this.record()?.status === 'completed',
  );
  protected readonly editable = computed(
    () => this.store.ready() && !!this.record()?.available && !this.completed(),
  );
  private readonly reviewIndex = signal(0);
  protected readonly currentIndex = computed(() =>
    this.completed() ? this.reviewIndex() : (this.record()?.currentIndex ?? 0),
  );
  protected readonly statuses = WORKSHEET_STATUS;
  protected readonly time = worksheetTime;
  protected readonly date = worksheetDate;
  protected readonly correct = isWrittenAnswerCorrect;
  protected readonly tool = signal<Tool | null>(null);
  protected readonly zoom = signal(100);
  protected readonly includeAnswers = signal(false);
  protected readonly printBlank = signal(false);
  protected readonly savedMessage = signal('');
  protected readonly toolTitle = computed(
    () =>
      ({
        calculator: 'Worksheet Calculator',
        scratch: 'Scratch Pad',
        notes:
          this.record()?.subjectId === 'mathematics'
            ? 'Formula Sheet'
            : 'Study Notes',
        converter: 'Unit Converter',
        submit: 'Submit worksheet?',
        print: 'Download or Print Worksheet',
      })[this.tool() ?? 'calculator'],
  );
  private openedId: string | undefined;

  constructor() {
    effect(() => {
      const record = this.record();
      if (!this.store.ready()) return;
      if (this.openedId !== record?.id) {
        if (this.openedId) this.store.pause(this.openedId);
        this.openedId = record?.id;
        this.reviewIndex.set(0);
      }
      if (record?.available && record.status !== 'completed')
        this.store.open(record.id);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.openedId) this.store.pause(this.openedId);
    });
  }
  protected answer(index: number, value: string): void {
    const record = this.record();
    if (record) this.store.answer(record.id, index, value);
  }
  protected selectQuestion(index: number): void {
    const record = this.record();
    if (!record) return;
    if (this.completed()) this.reviewIndex.set(index);
    else this.store.navigate(record.id, index);
    const element = this.document.getElementById(`worksheet-question-${index}`);
    element?.scrollIntoView({ block: 'center', behavior: 'instant' });
    element
      ?.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
      ?.focus({ preventScroll: true });
  }
  protected focusQuestion(index: number): void {
    const record = this.record();
    if (this.completed()) this.reviewIndex.set(index);
    else if (record && index !== record.currentIndex)
      this.store.navigate(record.id, index);
  }
  protected mark(index: number): void {
    const record = this.record();
    if (record) this.store.mark(record.id, index);
  }
  protected scratch(event: Event): void {
    const record = this.record();
    if (record)
      this.store.scratch(
        record.id,
        (event.target as HTMLTextAreaElement).value,
      );
  }
  protected resize(event: Event): void {
    const zoom = Number((event.target as HTMLSelectElement).value);
    if ([100, 125, 150].includes(zoom)) this.zoom.set(zoom);
  }
  protected save(): void {
    this.store.save();
    this.savedMessage.set(
      this.store.persistent()
        ? 'Your worksheet is saved in this browser tab.'
        : 'Your answers are kept while this page is open. Browser storage is unavailable.',
    );
  }
  protected exit(): void {
    const record = this.record();
    if (record) this.store.pause(record.id);
    void this.router.navigate(['/student/worksheets'], {
      queryParams: this.backQuery(),
    });
  }
  protected continue(): void {
    this.save();
    const record = this.record();
    if (!record) return;
    if (record.answered === record.questionCount) {
      this.tool.set('submit');
      return;
    }
    const positions = [...record.answers.keys()];
    const next =
      positions.find(
        (index) => index > record.currentIndex && !record.answers[index].trim(),
      ) ?? positions.find((index) => !record.answers[index].trim());
    if (next !== undefined) this.selectQuestion(next);
  }
  protected submit(): void {
    const record = this.record();
    if (!record) return;
    this.store.submit(record.id);
    this.tool.set(null);
    this.savedMessage.set(
      'Worksheet submitted. Review your score and answer explanations below.',
    );
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'instant' });
  }
  protected toggleAnswers(event: Event): void {
    this.includeAnswers.set((event.target as HTMLInputElement).checked);
  }
  protected download(): void {
    const record = this.record();
    const view = this.document.defaultView;
    if (!record?.questions.length || !view) return;
    const text = [
      record.title,
      `${record.subject} · Week ${record.week} · ${record.totalMarks} marks`,
      '',
      'Read each question carefully. Show your working on paper or in your scratch pad.',
      '',
      ...this.sections().flatMap((section) => [
        section.title,
        ...section.questions.map(
          ({ question, index }) =>
            `${index + 1}. ${question.prompt}\nAnswer: ${this.includeAnswers() ? record.answers[index] || 'Not answered' : '________________________'}${this.includeAnswers() && this.completed() ? `\nCorrect answer: ${question.answer}\n${question.explanation}` : ''}\n`,
        ),
      ]),
    ].join('\n');
    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/plain;charset=utf-8' }),
    );
    const anchor = this.document.createElement('a');
    anchor.href = url;
    anchor.download = `${record.id}.txt`;
    anchor.click();
    view.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  protected print(): void {
    if (!this.record()?.questions.length) return;
    this.printBlank.set(!this.includeAnswers());
    this.tool.set(null);
    afterNextRender(
      () => {
        this.document.defaultView?.print();
        this.printBlank.set(false);
      },
      { injector: this.injector },
    );
  }
}
