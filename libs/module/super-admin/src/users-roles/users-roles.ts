import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  CreateUserData,
  PermissionTemplate,
  PlatformUser,
  UserStatus,
  UserTab,
} from '../data/super-admin-users.models';
import { UsersMetricsComponent } from './users-metrics/users-metrics';
import { UsersQuickActionsComponent } from './users-quick-actions/users-quick-actions';
import { UsersTableComponent } from './users-table/users-table';
import { UsersSidebarComponent } from './users-sidebar/users-sidebar';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal';
import { AddUserModalComponent } from './add-user-modal/add-user-modal';
import { RolesPermissionsViewComponent } from './roles-permissions-view/roles-permissions-view';
import { AccessLogsViewComponent } from './access-logs-view/access-logs-view';
import { PlatformHealthBarComponent } from '../dashboard/platform-health-bar/platform-health-bar';

@Component({
  selector: 'school-hub-users-roles',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UsersMetricsComponent,
    UsersQuickActionsComponent,
    UsersTableComponent,
    UsersSidebarComponent,
    UserDetailModalComponent,
    AddUserModalComponent,
    RolesPermissionsViewComponent,
    AccessLogsViewComponent,
    PlatformHealthBarComponent,
  ],
  templateUrl: './users-roles.html',
  styleUrl: './users-roles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersRolesComponent {
  readonly store = inject(SuperAdminStore);

  // Store Signals
  readonly metrics = this.store.usersMetrics;
  readonly filteredUsers = this.store.filteredUsers;
  readonly roleDistribution = this.store.roleDistribution;
  readonly permissionTemplates = this.store.permissionTemplates;
  readonly recentActivities = this.store.recentAccessActivities;
  readonly permissionMatrix = this.store.permissionMatrix;
  readonly accessLogs = this.store.accessLogs;
  readonly platformHealth = this.store.platformHealth;

  readonly selectedTab = this.store.selectedUserTab;
  readonly searchQuery = this.store.userSearchQuery;
  readonly roleFilter = this.store.selectedUserRoleFilter;
  readonly institutionFilter = this.store.selectedUserInstitutionFilter;
  readonly statusFilter = this.store.selectedUserStatusFilter;
  readonly mfaFilter = this.store.selectedUserMfaFilter;
  readonly regionFilter = this.store.selectedUserRegionFilter;
  readonly pendingInvitesCount = this.store.pendingInvitesCount;

  // Local Modal & UI Signals
  readonly selectedUserForModal = signal<PlatformUser | null>(null);
  readonly isAddUserModalOpen = signal<boolean>(false);
  readonly isExportOpen = signal<boolean>(false);
  readonly notificationMessage = signal<string | null>(null);

  setTab(tab: UserTab): void {
    this.store.setUserTab(tab);
  }

  onSearch(query: string): void {
    this.store.setUserSearchQuery(query);
  }

  onRoleFilter(role: string): void {
    this.store.setUserRoleFilter(role);
  }

  onInstitutionFilter(inst: string): void {
    this.store.setUserInstitutionFilter(inst);
  }

  onStatusFilter(status: string): void {
    this.store.setUserStatusFilter(status);
  }

  onMfaFilter(mfa: string): void {
    this.store.setUserMfaFilter(mfa);
  }

  onRegionFilter(region: string): void {
    this.store.setUserRegionFilter(region);
  }

  onQuickAction(actionId: string): void {
    switch (actionId) {
      case 'add-user':
        this.openAddUserModal();
        break;
      case 'create-role':
        this.setTab('roles');
        break;
      case 'bulk-import':
        this.showNotification(
          'Bulk user import wizard ready. Select CSV or Excel file.',
        );
        break;
      case 'reset-access':
        this.showNotification(
          'Access revocation panel initialized for flagged accounts.',
        );
        break;
    }
  }

  openAddUserModal(): void {
    this.isAddUserModalOpen.set(true);
  }

  closeAddUserModal(): void {
    this.isAddUserModalOpen.set(false);
  }

  onCreateUser(userData: CreateUserData): void {
    const newUser = this.store.createUser(userData);
    this.closeAddUserModal();
    this.showNotification(
      `User ${newUser.name} created and assigned to ${newUser.role}.`,
    );
  }

  onViewUser(user: PlatformUser): void {
    this.selectedUserForModal.set(user);
  }

  closeDetailModal(): void {
    this.selectedUserForModal.set(null);
  }

  onEditUser(user: PlatformUser): void {
    this.closeDetailModal();
    this.showNotification(`Editing configuration for ${user.name}.`);
  }

  onResetPassword(user: PlatformUser): void {
    this.showNotification(`Password reset link dispatched to ${user.email}.`);
  }

  onResendInvite(user: PlatformUser): void {
    this.store.resendInvite(user.id);
    this.showNotification(`Invitation resent to ${user.email}.`);
  }

  onToggleMfa(user: PlatformUser): void {
    this.store.toggleUserMfa(user.id);
    const state = !user.mfaEnabled ? 'enabled' : 'disabled';
    this.showNotification(`MFA ${state} for ${user.name}.`);
  }

  onUpdateUserStatus(payload: {
    user: PlatformUser;
    status: UserStatus;
  }): void {
    this.store.updateUserStatus(payload.user.id, payload.status);
    this.showNotification(
      `${payload.user.name} status updated to ${payload.status}.`,
    );
  }

  onDeleteUser(user: PlatformUser): void {
    this.store.deleteUser(user.id);
    this.closeDetailModal();
    this.showNotification(`User ${user.name} removed from platform.`);
  }

  onManageRolePermissions(): void {
    this.setTab('roles');
  }

  onTemplateSelected(tpl: PermissionTemplate): void {
    this.setTab('all');
    this.onRoleFilter(tpl.role);
    this.showNotification(
      `Filtered directory to ${tpl.role}s with ${tpl.accessLevel}.`,
    );
  }

  toggleExport(): void {
    this.isExportOpen.update((v) => !v);
  }

  exportData(format: 'csv' | 'xlsx' | 'pdf'): void {
    this.isExportOpen.set(false);
    this.showNotification(
      `Platform users export generated in ${format.toUpperCase()} format.`,
    );
  }

  showNotification(msg: string): void {
    this.notificationMessage.set(msg);
    setTimeout(() => {
      this.notificationMessage.set(null);
    }, 4000);
  }
}
