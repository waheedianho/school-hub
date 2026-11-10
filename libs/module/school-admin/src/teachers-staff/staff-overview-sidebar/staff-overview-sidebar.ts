import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { StaffOperationalAlert } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-staff-overview-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-overview-sidebar.html',
  styleUrls: ['./staff-overview-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffOverviewSidebarComponent {
  readonly store = inject(SchoolAdminStore);

  onAlertAction(alert: StaffOperationalAlert): void {
    if (alert.id === 'alert-unassigned') {
      this.store.setStaffStatusFilter('Pending Assignment');
    } else if (alert.id === 'alert-overdue-reviews') {
      this.store.setupSaveStatus.set(
        'Opening overdue review tracker for pending submissions.',
      );
    } else if (alert.id === 'alert-admin-followup') {
      this.store.setupSaveStatus.set('Opening administrative follow-up queue.');
    }
  }
}
