import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupQuickAction } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-setup-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup-quick-actions.html',
  styleUrls: ['./setup-quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupQuickActionsComponent {
  readonly actions = input.required<SetupQuickAction[]>();
  readonly actionClick = output<string>();

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
