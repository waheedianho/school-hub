import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import {
  AcademicStructure,
  AssessmentReportingSettings,
  CommunicationSafeguardingSettings,
  RolePermissionRow,
  SchoolProfile,
} from '../data/school-admin.models';
import { ProfileSettingsCardComponent } from './profile-settings-card/profile-settings-card';
import { AcademicStructureCardComponent } from './academic-structure-card/academic-structure-card';
import { SetupSummaryCardComponent } from './setup-summary-card/setup-summary-card';
import { AssessmentSettingsCardComponent } from './assessment-settings-card/assessment-settings-card';
import { RolePermissionsCardComponent } from './role-permissions-card/role-permissions-card';
import { CommunicationSafeguardingCardComponent } from './communication-safeguarding-card/communication-safeguarding-card';
import { SetupChecklistCardComponent } from './setup-checklist-card/setup-checklist-card';
import { SetupQuickActionsComponent } from './setup-quick-actions/setup-quick-actions';

@Component({
  selector: 'school-hub-school-setup',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSettingsCardComponent,
    AcademicStructureCardComponent,
    SetupSummaryCardComponent,
    AssessmentSettingsCardComponent,
    RolePermissionsCardComponent,
    CommunicationSafeguardingCardComponent,
    SetupChecklistCardComponent,
    SetupQuickActionsComponent,
  ],
  templateUrl: './school-setup.html',
  styleUrls: ['./school-setup.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolSetupComponent {
  readonly store = inject(SchoolAdminStore);

  onProfileChange(partial: Partial<SchoolProfile>): void {
    this.store.updateSchoolProfile(partial);
  }

  onStructureChange(partial: Partial<AcademicStructure>): void {
    this.store.updateAcademicStructure(partial);
  }

  onAssessmentChange(partial: Partial<AssessmentReportingSettings>): void {
    this.store.updateAssessmentSettings(partial);
  }

  onTogglePermission(event: {
    role: string;
    field: keyof Omit<RolePermissionRow, 'role'>;
  }): void {
    this.store.toggleRolePermission(event.role, event.field);
  }

  onCommunicationChange(
    partial: Partial<CommunicationSafeguardingSettings>,
  ): void {
    this.store.updateCommunicationSafeguarding(partial);
  }

  onToggleChecklistItem(id: string): void {
    this.store.toggleChecklistItem(id);
  }

  onSave(): void {
    this.store.saveSetupChanges();
  }

  onPublish(): void {
    this.store.publishSettings();
  }

  onQuickAction(actionId: string): void {
    if (actionId === 'import-data') {
      this.store.setupSaveStatus.set('Import School Data wizard opened');
    } else if (actionId === 'download-template') {
      this.store.setupSaveStatus.set(
        'Downloading bulk setup template (Excel/CSV)...',
      );
    } else if (actionId === 'view-audit') {
      this.store.setupSaveStatus.set('Navigating to Audit Trail...');
    }
  }

  dismissNotification(): void {
    this.store.setupSaveStatus.set(null);
  }
}
