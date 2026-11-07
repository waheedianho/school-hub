import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ASSIGNMENTS_QUICK_ACTIONS,
  AssignmentQuickAction,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-assignments-quick-actions',
  templateUrl: './assignments-quick-actions.html',
  styleUrl: './assignments-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsQuickActionsComponent {
  private readonly router = inject(Router);

  readonly actions = input<AssignmentQuickAction[]>(ASSIGNMENTS_QUICK_ACTIONS);
  readonly actionSelected = output<AssignmentQuickAction>();

  onSelectAction(action: AssignmentQuickAction): void {
    this.actionSelected.emit(action);
    if (action.id === 'review-next') {
      void this.router.navigate(['/teacher/assignments/review']);
    }
  }
}
