import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import {
  GeneralSettingsForm,
  SchoolRole,
  SettingsAttentionItem,
  SettingsTab,
} from '../data/school-admin.models';
import { SettingsSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { GeneralSettingsComponent } from './general-settings/general-settings';
import { RolesPermissionsComponent } from './roles-permissions/roles-permissions';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar';
import { CreateRoleModalComponent } from './create-role-modal/create-role-modal';
import { RoleDetailsModalComponent } from './role-details-modal/role-details-modal';
import { ExportPermissionModalComponent } from './export-permission-modal/export-permission-modal';
import { ConfirmDiscardModalComponent } from './confirm-discard-modal/confirm-discard-modal';

@Component({
  selector: 'school-hub-settings',
  standalone: true,
  imports: [
    CommonModule,
    SettingsSummaryMetricsComponent,
    GeneralSettingsComponent,
    RolesPermissionsComponent,
    SettingsSidebarComponent,
    CreateRoleModalComponent,
    RoleDetailsModalComponent,
    ExportPermissionModalComponent,
    ConfirmDiscardModalComponent,
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly store = inject(SchoolAdminStore);

  readonly pageSubtitle = computed(() => {
    switch (this.store.activeSettingsTab()) {
      case 'general':
        return 'Manage institution profile, academic cycle preferences, and system defaults';
      case 'roles-permissions':
        return 'Configure role-based access control, privilege sets, and security policies';
      case 'academic-policies':
        return 'Define grading scales, attendance thresholds, and assessment rules';
      case 'notifications':
        return 'Manage automated communication channels, triggers, and templates';
      case 'privacy-security':
        return 'Configure data retention policies, consent forms, and access restrictions';
      case 'audit-logs':
      default:
        return 'Review comprehensive system activity, security events, and audit logs';
    }
  });

  readonly auxiliaryTitle = computed(() => {
    switch (this.store.activeSettingsTab()) {
      case 'academic-policies':
        return 'Academic Policies & Standards';
      case 'notifications':
        return 'Notification Templates & Automation';
      case 'privacy-security':
        return 'Privacy, Safeguarding & Access Restrictions';
      case 'audit-logs':
      default:
        return 'System Activity & Security Audit Logs';
    }
  });

  onTabChange(tab: SettingsTab): void {
    this.store.setActiveSettingsTab(tab);
  }

  onUpdateGeneralSettings(partial: Partial<GeneralSettingsForm>): void {
    this.store.updateGeneralSettings(partial);
  }

  onSaveGeneralSettings(): void {
    this.store.saveGeneralSettings();
  }

  onDiscardGeneralSettings(): void {
    this.store.openDiscardConfirmModal();
  }

  onSearchRoles(query: string): void {
    this.store.setRoleSearchQuery(query);
  }

  onScopeFilter(scope: string): void {
    this.store.setRoleAccessScopeFilter(scope);
  }

  onLevelFilter(level: string): void {
    this.store.setRolePermissionLevelFilter(level);
  }

  onStatusFilter(status: string): void {
    this.store.setRoleStatusFilter(status);
  }

  onPageSelect(page: number): void {
    this.store.setRolePage(page);
  }

  onPageSizeSelect(size: number): void {
    this.store.setRolePageSize(size);
  }

  onViewRole(role: SchoolRole): void {
    this.store.openRoleDetails(role);
  }

  onOpenCreateRoleModal(): void {
    this.store.openCreateRoleModal();
  }

  onOpenExportPermissionModal(): void {
    this.store.openExportPermissionModal();
  }

  onSelectAttentionItem(item: SettingsAttentionItem): void {
    this.store.selectSettingsAttentionItem(item);
  }

  onTriggerCard(cardType: string): void {
    if (cardType === 'grading-policy') {
      this.store.setActiveSettingsTab('academic-policies');
    } else if (cardType === 'notification-rules') {
      this.store.setActiveSettingsTab('notifications');
    } else if (cardType === 'privacy-settings') {
      this.store.setActiveSettingsTab('privacy-security');
    } else if (cardType === 'audit-log') {
      this.store.setActiveSettingsTab('audit-logs');
    }
  }

  onDismissStatus(): void {
    this.store.setupSaveStatus.set(null);
  }
}
