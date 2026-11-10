import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

export interface StaffQuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: 'purple' | 'blue' | 'green' | 'violet';
}

@Component({
  selector: 'school-hub-staff-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffQuickActionsComponent {
  readonly store = inject(SchoolAdminStore);

  @Output() actionClick = new EventEmitter<string>();

  readonly actions: StaffQuickActionItem[] = [
    {
      id: 'assign-subject',
      title: 'Assign Subject',
      description: 'Assign or update subjects for teachers.',
      icon: 'ri-user-add-line',
      tone: 'purple',
    },
    {
      id: 'full-profile',
      title: 'View Full Staff Profile',
      description: 'View detailed profile, history, and performance.',
      icon: 'ri-user-line',
      tone: 'blue',
    },
    {
      id: 'manage-permissions',
      title: 'Manage Permissions',
      description: 'Set roles, permissions, and access levels.',
      icon: 'ri-shield-keyhole-line',
      tone: 'green',
    },
    {
      id: 'staff-report',
      title: 'Generate Staff Report',
      description: 'Generate and download staff performance reports.',
      icon: 'ri-file-chart-line',
      tone: 'violet',
    },
  ];

  triggerAction(id: string): void {
    this.actionClick.emit(id);
    if (id === 'assign-subject') {
      this.store.setupSaveStatus.set(
        'Assign Subject wizard opened. Select teacher and subject curriculum.',
      );
    } else if (id === 'full-profile') {
      this.store.setupSaveStatus.set(
        `Viewing complete dossier for ${this.store.selectedStaff().name}.`,
      );
    } else if (id === 'manage-permissions') {
      this.store.setActiveStaffTab('permissions');
      this.store.setupSaveStatus.set(
        'Navigated to Permissions & Access configuration tab.',
      );
    } else if (id === 'staff-report') {
      this.store.setupSaveStatus.set(
        'Staff Performance and Workload Report PDF generated.',
      );
    }
  }
}
