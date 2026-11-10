import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SchoolAdminStore } from '../data/school-admin.store';
import { TeachersSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { TeacherDirectoryComponent } from './teacher-directory/teacher-directory';
import { StaffOverviewSidebarComponent } from './staff-overview-sidebar/staff-overview-sidebar';
import { StaffQuickActionsComponent } from './quick-actions/quick-actions';

@Component({
  selector: 'school-hub-teachers-staff',
  standalone: true,
  imports: [
    CommonModule,
    TeachersSummaryMetricsComponent,
    TeacherDirectoryComponent,
    StaffOverviewSidebarComponent,
    StaffQuickActionsComponent,
  ],
  templateUrl: './teachers-staff.html',
  styleUrls: ['./teachers-staff.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersStaffComponent {
  readonly store = inject(SchoolAdminStore);
  private readonly router = inject(Router);

  readonly tabs: Array<'teachers' | 'support' | 'assignments' | 'permissions'> =
    ['teachers', 'support', 'assignments', 'permissions'];

  setTab(tab: 'teachers' | 'support' | 'assignments' | 'permissions'): void {
    this.store.setActiveStaffTab(tab);
  }

  navigateToAddStaff(): void {
    this.router.navigate(['/school-admin/teachers-staff/add']);
  }

  onBulkImport(): void {
    this.store.setupSaveStatus.set(
      'Bulk Staff Import wizard opened. Download CSV template to begin.',
    );
  }

  dismissNotification(): void {
    this.store.setupSaveStatus.set(null);
  }
}
