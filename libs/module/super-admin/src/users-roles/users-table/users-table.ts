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
  PlatformUser,
  UserRole,
  UserStatus,
} from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-users-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  readonly users = input.required<PlatformUser[]>();
  readonly searchQuery = input<string>('');
  readonly roleFilter = input<string>('All');
  readonly institutionFilter = input<string>('All');
  readonly statusFilter = input<string>('All');
  readonly mfaFilter = input<string>('All');
  readonly regionFilter = input<string>('All');
  readonly totalCount = input<number>(0);

  readonly searchChange = output<string>();
  readonly roleChange = output<string>();
  readonly institutionChange = output<string>();
  readonly statusChange = output<string>();
  readonly mfaChange = output<string>();
  readonly regionChange = output<string>();

  readonly viewUser = output<PlatformUser>();
  readonly editUser = output<PlatformUser>();
  readonly updateUserStatus = output<{
    user: PlatformUser;
    status: UserStatus;
  }>();
  readonly resetPassword = output<PlatformUser>();
  readonly resendInvite = output<PlatformUser>();
  readonly toggleMfa = output<PlatformUser>();
  readonly deleteUser = output<PlatformUser>();

  // Pagination state
  readonly currentPage = signal<number>(1);
  readonly itemsPerPage = signal<number>(10);
  readonly activeMenuUserId = signal<string | null>(null);

  readonly roleOptions = [
    'All',
    'Super Admin',
    'School Admin',
    'Teacher',
    'Learner',
    'Parent',
  ];

  readonly institutionOptions = [
    'All',
    'Greenfield International',
    'Sunrise Public School',
    'Northview Academy',
    'Oakridge High School',
    'Bright Future School',
    'Westfield Secondary',
    'Lakeside Montessori',
    'Harmony Prep School',
    'City Central School',
    'Maple Leaf Academy',
  ];

  readonly statusOptions = ['All', 'Active', 'Invited', 'Pending', 'Suspended'];

  readonly mfaOptions = ['All', 'Enabled', 'Not Enabled'];

  readonly regionOptions = [
    'All',
    'UK',
    'India',
    'Canada',
    'Australia',
    'New Zealand',
    'Singapore',
    'UAE',
  ];

  readonly paginatedUsers = computed(() => {
    const list = this.users();
    const page = this.currentPage();
    const perPage = this.itemsPerPage();
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.users().length / this.itemsPerPage()));
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
    if (this.users().length === 0) return 0;
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });

  readonly rangeEnd = computed(() => {
    return Math.min(
      this.currentPage() * this.itemsPerPage(),
      this.users().length,
    );
  });

  onSearchInput(val: string): void {
    this.currentPage.set(1);
    this.searchChange.emit(val);
  }

  onRoleSelect(val: string): void {
    this.currentPage.set(1);
    this.roleChange.emit(val);
  }

  onInstitutionSelect(val: string): void {
    this.currentPage.set(1);
    this.institutionChange.emit(val);
  }

  onStatusSelect(val: string): void {
    this.currentPage.set(1);
    this.statusChange.emit(val);
  }

  onMfaSelect(val: string): void {
    this.currentPage.set(1);
    this.mfaChange.emit(val);
  }

  onRegionSelect(val: string): void {
    this.currentPage.set(1);
    this.regionChange.emit(val);
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

  toggleActionsMenu(userId: string): void {
    if (this.activeMenuUserId() === userId) {
      this.activeMenuUserId.set(null);
    } else {
      this.activeMenuUserId.set(userId);
    }
  }

  closeActionsMenu(): void {
    this.activeMenuUserId.set(null);
  }

  onView(user: PlatformUser): void {
    this.closeActionsMenu();
    this.viewUser.emit(user);
  }

  onEdit(user: PlatformUser): void {
    this.closeActionsMenu();
    this.editUser.emit(user);
  }

  onResetPassword(user: PlatformUser): void {
    this.closeActionsMenu();
    this.resetPassword.emit(user);
  }

  onResendInvite(user: PlatformUser): void {
    this.closeActionsMenu();
    this.resendInvite.emit(user);
  }

  onToggleMfa(user: PlatformUser): void {
    this.closeActionsMenu();
    this.toggleMfa.emit(user);
  }

  onStatusChange(user: PlatformUser, status: UserStatus): void {
    this.closeActionsMenu();
    this.updateUserStatus.emit({ user, status });
  }

  onDelete(user: PlatformUser): void {
    this.closeActionsMenu();
    this.deleteUser.emit(user);
  }

  getRoleBadgeClass(role: UserRole): string {
    switch (role) {
      case 'Super Admin':
        return 'role-super-admin';
      case 'School Admin':
        return 'role-school-admin';
      case 'Teacher':
        return 'role-teacher';
      case 'Learner':
        return 'role-learner';
      case 'Parent':
        return 'role-parent';
      default:
        return 'role-default';
    }
  }

  getStatusBadgeClass(status: UserStatus): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Invited':
        return 'status-invited';
      case 'Pending':
        return 'status-pending';
      case 'Suspended':
        return 'status-suspended';
      default:
        return 'status-default';
    }
  }
}
