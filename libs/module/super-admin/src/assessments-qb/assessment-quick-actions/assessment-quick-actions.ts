import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-hub-assessment-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-quick-actions.html',
  styleUrls: ['./assessment-quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentQuickActionsComponent {
  readonly pendingReviewCount = input<number>(84);
  readonly flaggedQuestionsCount = input<number>(27);

  readonly createAssessment = output<void>();
  readonly importQuestions = output<void>();
  readonly reviewQueue = output<void>();
  readonly moderationRules = output<void>();
}
