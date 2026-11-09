import { progressReturn } from '../../data/progress-context';
import { feedbackReturn } from '../../data/feedback-context';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ChoiceListComponent,
  ProgressRingComponent,
  StatusBadgeComponent,
  SummaryStatComponent,
  ReturnLinkComponent,
} from '@school-hub/ui-elements';
import { AssessmentStore } from '../assessment-store';
import { assessmentBackQuery } from '../assessment-navigation';
import {
  ASSESSMENT_KINDS,
  assessmentDate,
  resultPerformance,
} from '../assessments.data';

@Component({
  selector: 'school-hub-assessment-result',
  imports: [
    ReturnLinkComponent,
    RouterLink,
    ChoiceListComponent,
    ProgressRingComponent,
    StatusBadgeComponent,
    SummaryStatComponent,
  ],
  templateUrl: './result.html',
  styleUrls: ['./result.scss', '../assessment-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentResultComponent {
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
  protected readonly assessment = computed(() =>
    this.store.assessment(this.params().get('assessmentId') ?? ''),
  );
  protected readonly result = computed(() => {
    const result = this.store.result(this.params().get('attemptId') ?? '');
    return result?.assessmentId === this.assessment()?.id ? result : undefined;
  });
  protected readonly kinds = ASSESSMENT_KINDS;
  protected readonly performance = resultPerformance;
  protected readonly formatDate = assessmentDate;
  protected readonly feedbackReturn = computed(() =>
    feedbackReturn(this.query()),
  );
  protected readonly backQuery = computed(() =>
    assessmentBackQuery(this.query()),
  );
  protected readonly canRetry = computed(() => {
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
  protected readonly reviewAvailable = computed(
    () =>
      !!this.assessment()?.questions.length &&
      this.result()?.answers?.length === this.assessment()?.questions.length,
  );
  protected retry(): void {
    const assessment = this.assessment();
    if (assessment && this.store.start(assessment))
      void this.router.navigate(
        ['/student/assessments', assessment.id, 'attempt'],
        { queryParams: this.backQuery() },
      );
  }
}
