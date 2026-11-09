import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LIVE_CLASSES_QUICK_ACTIONS,
  LiveClassQuickAction,
} from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-live-classes-quick-actions',
  templateUrl: './live-classes-quick-actions.html',
  styleUrl: './live-classes-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesQuickActionsComponent {
  private readonly router = inject(Router);

  readonly actions = input<LiveClassQuickAction[]>(LIVE_CLASSES_QUICK_ACTIONS);
  readonly actionSelected = output<LiveClassQuickAction>();

  onSelectAction(action: LiveClassQuickAction): void {
    this.actionSelected.emit(action);
    if (action.id === 'start-class') {
      void this.router.navigate(['/teacher/live-classes/session']);
    }
  }
}
