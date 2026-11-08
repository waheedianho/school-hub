import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ResourceQuickAction } from '../../data/teacher-resources.data';

@Component({
  selector: 'school-hub-resources-quick-actions',
  imports: [],
  templateUrl: './resources-quick-actions.html',
  styleUrl: './resources-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesQuickActionsComponent {
  readonly actions = input.required<ResourceQuickAction[]>();
  readonly actionSelected = output<string>();

  onActionClick(actionId: string): void {
    this.actionSelected.emit(actionId);
  }
}
