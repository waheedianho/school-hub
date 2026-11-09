import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { GradebookQuickAction } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-quick-actions',
  imports: [],
  templateUrl: './gradebook-quick-actions.html',
  styleUrl: './gradebook-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookQuickActionsComponent {
  readonly actions = input.required<GradebookQuickAction[]>();
  readonly actionTriggered = output<string>();

  onActionClick(actionId: string): void {
    this.actionTriggered.emit(actionId);
  }
}
