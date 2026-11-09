import { progressReturn } from '../../data/progress-context';
import { feedbackReturn } from '../../data/feedback-context';
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
  CalculatorComponent,
  ChoiceListComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  ProgressBarComponent,
  QuestionNavigatorComponent,
  StatusBadgeComponent,
  ReturnLinkComponent,
} from '@school-hub/ui-elements';
import { AssessmentStore } from '../assessment-store';
import { ASSESSMENT_KINDS } from '../assessments.data';
import { assessmentBackQuery } from '../assessment-navigation';

@Component({
  selector: 'school-hub-assessment-attempt',
  imports: [
    ReturnLinkComponent,
    RouterLink,
    CalculatorComponent,
    ChoiceListComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    ProgressBarComponent,
    QuestionNavigatorComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './attempt.html',
  styleUrls: ['./attempt.scss', '../assessment-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentAttemptComponent {
  protected readonly store = inject(AssessmentStore);
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
  private readonly attemptId = signal<string | null>(null);
  protected readonly kinds = ASSESSMENT_KINDS;
  protected readonly assessment = computed(() =>
    this.store.assessment(this.params().get('assessmentId') ?? ''),
  );
  protected readonly attempt = computed(() =>
    this.store.attempt(this.attemptId() ?? ''),
  );
  protected readonly question = computed(
    () => this.assessment()?.questions[this.attempt()?.currentIndex ?? 0],
  );
  protected readonly answered = computed(
    () =>
      this.attempt()?.answers.flatMap((answer, index) =>
        answer === null ? [] : [index],
      ) ?? [],
  );
  protected readonly seconds = computed(() => {
    const attempt = this.attempt();
    return attempt ? this.store.timeLeft(attempt) : 0;
  });
  protected readonly time = computed(
    () =>
      `${Math.floor(this.seconds() / 60)
        .toString()
        .padStart(
          2,
          '0',
        )}:${(this.seconds() % 60).toString().padStart(2, '0')}`,
  );
  protected readonly feedbackReturn = computed(() =>
    feedbackReturn(this.query()),
  );
  protected readonly backQuery = computed(() =>
    assessmentBackQuery(this.query()),
  );
  protected readonly dialog = signal<'submit' | 'calculator' | null>(null);
  protected readonly canStart = computed(() => {
    const assessment = this.assessment();
    return (
      !!assessment &&
      this.store.ready() &&
      assessment.available &&
      !!assessment.questions.length &&
      (!!this.store.draft(assessment.id) ||
        this.store.usedAttempts(assessment.id) < assessment.maxAttempts)
    );
  });

  constructor() {
    effect(() => {
      const assessment = this.assessment();
      const old = this.store.attempt(this.attemptId() ?? '');
      if (old && old.assessmentId !== assessment?.id) {
        this.store.pause(old.id);
        this.attemptId.set(null);
      }
      if (!assessment) return;
      const draft = this.store.draft(assessment.id);
      if (draft && this.attemptId() !== draft.id) this.attemptId.set(draft.id);
      const attempt = this.store.attempt(this.attemptId() ?? '');
      const result =
        attempt?.status === 'submitted'
          ? this.store.result(attempt.id)
          : !draft &&
              this.store.ready() &&
              this.store.latestResult(assessment.id)?.expired
            ? this.store.latestResult(assessment.id)
            : undefined;
      if (result)
        void this.router.navigate(
          ['/student/assessments', assessment.id, 'results', result.id],
          { queryParams: this.backQuery(), replaceUrl: true },
        );
    });
    inject(DestroyRef).onDestroy(() => {
      const id = this.attemptId();
      if (id) this.store.pause(id);
    });
  }

  protected start(): void {
    const assessment = this.assessment();
    if (assessment) {
      const attempt = this.store.start(assessment);
      if (attempt) this.attemptId.set(attempt.id);
    }
  }
  protected selectQuestion(index: number): void {
    const attempt = this.attempt();
    if (attempt) this.store.navigate(attempt.id, index);
  }
  protected choose(answer: number | null): void {
    const attempt = this.attempt();
    if (attempt) this.store.choose(attempt.id, attempt.currentIndex, answer);
  }
  protected mark(): void {
    const attempt = this.attempt();
    if (attempt) this.store.mark(attempt.id, attempt.currentIndex);
  }
  protected togglePause(): void {
    const attempt = this.attempt();
    if (attempt?.status === 'active') this.store.pause(attempt.id);
    else if (attempt?.status === 'paused') this.store.resume(attempt.id);
  }
  protected next(): void {
    const attempt = this.attempt();
    if (!attempt) return;
    if (attempt.currentIndex < attempt.answers.length - 1)
      this.selectQuestion(attempt.currentIndex + 1);
    else this.dialog.set('submit');
  }
  protected submit(): void {
    const attempt = this.attempt();
    if (attempt) {
      this.dialog.set(null);
      this.store.submit(attempt.id);
    }
  }
}
