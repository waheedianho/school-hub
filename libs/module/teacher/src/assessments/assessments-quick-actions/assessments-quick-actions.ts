import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AssessmentQuickAction } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-assessments-quick-actions',
  imports: [],
  templateUrl: './assessments-quick-actions.html',
  styleUrl: './assessments-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsQuickActionsComponent {
  readonly actions = input.required<AssessmentQuickAction[]>();
  readonly actionTriggered = output<string>();

  onActionClick(actionId: string): void {
    this.actionTriggered.emit(actionId);
  }
}
