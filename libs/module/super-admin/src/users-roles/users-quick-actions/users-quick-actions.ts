import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserQuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

@Component({
  selector: 'school-hub-users-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-quick-actions.html',
  styleUrl: './users-quick-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersQuickActionsComponent {
  readonly actionTriggered = output<string>();

  readonly actions: UserQuickAction[] = [
    {
      id: 'add-user',
      title: 'Add User',
      subtitle: 'Create a new user',
      icon: 'person_add',
    },
    {
      id: 'create-role',
      title: 'Create Role',
      subtitle: 'Define role & permissions',
      icon: 'security',
    },
    {
      id: 'bulk-import',
      title: 'Bulk Import',
      subtitle: 'Import users via CSV',
      icon: 'cloud_upload',
    },
    {
      id: 'reset-access',
      title: 'Reset Access',
      subtitle: 'Revoke & reset access',
      icon: 'lock_reset',
    },
  ];

  triggerAction(id: string): void {
    this.actionTriggered.emit(id);
  }
}
