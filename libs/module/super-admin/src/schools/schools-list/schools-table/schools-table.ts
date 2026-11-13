import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SchoolInstitution,
  SchoolStatus,
  SchoolType,
} from '../../../data/super-admin-schools.models';

@Component({
  selector: 'school-hub-schools-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schools-table.html',
  styleUrl: './schools-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsTableComponent {
  readonly schools = input.required<SchoolInstitution[]>();
  readonly searchQuery = input<string>('');
  readonly statusFilter = input<string>('All');
  readonly planFilter = input<string>('All');
  readonly regionFilter = input<string>('All');
  readonly onboardingFilter = input<string>('All');
  readonly totalCount = input<number>(0);

  readonly searchChange = output<string>();
  readonly statusChange = output<string>();
  readonly planChange = output<string>();
  readonly regionChange = output<string>();
  readonly onboardingChange = output<string>();
  readonly viewSchool = output<SchoolInstitution>();
  readonly editSchool = output<SchoolInstitution>();
  readonly manageSubscription = output<SchoolInstitution>();
  readonly manageUsers = output<SchoolInstitution>();
  readonly updateStatus = output<{
    school: SchoolInstitution;
    status: SchoolStatus;
  }>();
  readonly deleteSchool = output<SchoolInstitution>();

  // Pagination state
  readonly currentPage = signal<number>(1);
  readonly itemsPerPage = signal<number>(10);
  readonly activeMenuSchoolId = signal<string | null>(null);

  readonly statusOptions = [
    'All',
    'Active',
    'Trial',
    'Expiring Soon',
    'Setup Incomplete',
    'Suspended',
  ];

  readonly planOptions = ['All', 'Enterprise', 'Pro', 'Basic', 'Trial'];

  readonly regionOptions = [
    'All',
    'London',
    'Mumbai',
    'Toronto',
    'Sydney',
    'Bengaluru',
    'Melbourne',
    'Auckland',
    'Singapore',
    'Dubai',
    'Vancouver',
  ];

  readonly onboardingOptions = [
    'All',
    'Completed',
    'In Progress',
    'Pending Verification',
    'Incomplete',
  ];

  readonly paginatedSchools = computed(() => {
    const list = this.schools();
    const page = this.currentPage();
    const perPage = this.itemsPerPage();
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.schools().length / this.itemsPerPage()));
  });

  readonly displayedPages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (current < total - 2) pages.push('...');
      if (!pages.includes(total)) pages.push(total);
    }
    return pages;
  });

  readonly rangeStart = computed(() => {
    if (this.schools().length === 0) return 0;
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });

  readonly rangeEnd = computed(() => {
    return Math.min(
      this.currentPage() * this.itemsPerPage(),
      this.schools().length,
    );
  });

  onSearchInput(val: string): void {
    this.currentPage.set(1);
    this.searchChange.emit(val);
  }

  onStatusSelect(val: string): void {
    this.currentPage.set(1);
    this.statusChange.emit(val);
  }

  onPlanSelect(val: string): void {
    this.currentPage.set(1);
    this.planChange.emit(val);
  }

  onRegionSelect(val: string): void {
    this.currentPage.set(1);
    this.regionChange.emit(val);
  }

  onOnboardingSelect(val: string): void {
    this.currentPage.set(1);
    this.onboardingChange.emit(val);
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onItemsPerPageChange(perPage: number): void {
    this.itemsPerPage.set(perPage);
    this.currentPage.set(1);
  }

  toggleActionsMenu(schoolId: string): void {
    if (this.activeMenuSchoolId() === schoolId) {
      this.activeMenuSchoolId.set(null);
    } else {
      this.activeMenuSchoolId.set(schoolId);
    }
  }

  closeActionsMenu(): void {
    this.activeMenuSchoolId.set(null);
  }

  onView(school: SchoolInstitution): void {
    this.closeActionsMenu();
    this.viewSchool.emit(school);
  }

  onEdit(school: SchoolInstitution): void {
    this.closeActionsMenu();
    this.editSchool.emit(school);
  }

  onManageSubscription(school: SchoolInstitution): void {
    this.closeActionsMenu();
    this.manageSubscription.emit(school);
  }

  onManageUsers(school: SchoolInstitution): void {
    this.closeActionsMenu();
    this.manageUsers.emit(school);
  }

  onStatusChange(school: SchoolInstitution, status: SchoolStatus): void {
    this.closeActionsMenu();
    this.updateStatus.emit({ school, status });
  }

  onDelete(school: SchoolInstitution): void {
    this.closeActionsMenu();
    this.deleteSchool.emit(school);
  }

  getTypeBadgeClass(type: SchoolType): string {
    switch (type) {
      case 'International':
        return 'type-international';
      case 'Public':
        return 'type-public';
      case 'Private':
        return 'type-private';
      default:
        return 'type-default';
    }
  }

  getStatusBadgeClass(status: SchoolStatus): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Trial':
        return 'status-trial';
      case 'Expiring Soon':
        return 'status-expiring';
      case 'Setup Incomplete':
        return 'status-incomplete';
      case 'Suspended':
        return 'status-suspended';
      default:
        return 'status-default';
    }
  }
}
