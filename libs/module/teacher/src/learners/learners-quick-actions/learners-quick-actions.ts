import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LearnersQuickAction } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-learners-quick-actions',
  imports: [],
  templateUrl: './learners-quick-actions.html',
  styleUrl: './learners-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnersQuickActionsComponent {
  readonly actions = input.required<LearnersQuickAction[]>();
  readonly actionTriggered = output<string>();

  onActionClick(actionId: string): void {
    this.actionTriggered.emit(actionId);
  }
}
