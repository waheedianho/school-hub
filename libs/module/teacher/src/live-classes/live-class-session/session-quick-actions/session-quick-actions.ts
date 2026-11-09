import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'school-hub-session-quick-actions',
  templateUrl: './session-quick-actions.html',
  styleUrl: './session-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionQuickActionsComponent {
  readonly actionSelected = output<string>();

  onAction(actionId: string): void {
    this.actionSelected.emit(actionId);
  }
}
