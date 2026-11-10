import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { StaffMember } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-teacher-directory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-directory.html',
  styleUrls: ['./teacher-directory.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherDirectoryComponent {
  readonly store = inject(SchoolAdminStore);

  readonly departments = [
    'All Departments',
    'English Department',
    'Mathematics Department',
    'Science Department',
    'Social Sciences',
    'Arts & Humanities',
    'Vocational Studies',
  ];

  readonly roles = [
    'All Roles',
    'Senior Teacher',
    'Subject Teacher',
    'Class Teacher',
    'Teacher I',
    'Teacher II',
  ];

  readonly statuses = [
    'All Statuses',
    'Active',
    'On Leave',
    'Pending Assignment',
  ];

  readonly pageSizes = [7, 10, 20];

  readonly selectedAll = signal<boolean>(false);
  readonly selectedStaffIds = signal<Set<string>>(new Set(['staff-001']));
  readonly activeActionStaffId = signal<string | null>(null);

  onSearch(query: string): void {
    this.store.setStaffSearchQuery(query);
  }

  onDepartmentChange(dept: string): void {
    this.store.setStaffDepartmentFilter(dept);
  }

  onRoleChange(role: string): void {
    this.store.setStaffRoleFilter(role);
  }

  onStatusChange(status: string): void {
    this.store.setStaffStatusFilter(status);
  }

  clearFilters(): void {
    this.store.setStaffSearchQuery('');
    this.store.setStaffDepartmentFilter('All Departments');
    this.store.setStaffRoleFilter('All Roles');
    this.store.setStaffStatusFilter('All Statuses');
  }

  onSelectStaff(staff: StaffMember): void {
    this.store.selectStaff(staff.id);
  }

  toggleSelectAll(): void {
    const newState = !this.selectedAll();
    this.selectedAll.set(newState);

    if (newState) {
      const allIds = new Set(this.store.paginatedStaff().map((s) => s.id));
      this.selectedStaffIds.set(allIds);
    } else {
      this.selectedStaffIds.set(new Set());
    }
  }

  toggleRowSelection(staffId: string, event: Event): void {
    event.stopPropagation();
    const current = new Set(this.selectedStaffIds());
    if (current.has(staffId)) {
      current.delete(staffId);
    } else {
      current.add(staffId);
    }
    this.selectedStaffIds.set(current);
    this.store.selectStaff(staffId);
  }

  onPageChange(page: number): void {
    this.store.setStaffPage(page);
  }

  onPageSizeChange(size: number): void {
    this.store.setStaffPageSize(size);
  }

  toggleActionMenu(staffId: string, event: Event): void {
    event.stopPropagation();
    if (this.activeActionStaffId() === staffId) {
      this.activeActionStaffId.set(null);
    } else {
      this.activeActionStaffId.set(staffId);
    }
  }

  closeActionMenu(): void {
    this.activeActionStaffId.set(null);
  }

  exportStaffList(): void {
    this.store.setupSaveStatus.set(
      'Exporting staff directory as CSV template...',
    );
  }
}
