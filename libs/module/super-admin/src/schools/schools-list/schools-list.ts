import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SchoolTab, SuperAdminStore } from '../../data/super-admin.store';
import {
  SchoolInstitution,
  SchoolStatus,
} from '../../data/super-admin-schools.models';
import { SchoolsMetricsComponent } from './schools-metrics/schools-metrics';
import { SchoolsQuickActionsComponent } from './schools-quick-actions/schools-quick-actions';
import { SchoolsTableComponent } from './schools-table/schools-table';
import { SchoolsSidebarComponent } from './schools-sidebar/schools-sidebar';
import { SchoolDetailModalComponent } from './school-detail-modal/school-detail-modal';
import { PlatformHealthBarComponent } from '../../dashboard/platform-health-bar/platform-health-bar';

@Component({
  selector: 'school-hub-schools-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SchoolsMetricsComponent,
    SchoolsQuickActionsComponent,
    SchoolsTableComponent,
    SchoolsSidebarComponent,
    SchoolDetailModalComponent,
    PlatformHealthBarComponent,
  ],
  templateUrl: './schools-list.html',
  styleUrl: './schools-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsListComponent {
  readonly store = inject(SuperAdminStore);
  private readonly router = inject(Router);

  // Store Signals
  readonly metrics = this.store.schoolsMetrics;
  readonly filteredSchools = this.store.filteredSchools;
  readonly allCount = this.store.allSchoolsCount;
  readonly onboardingCount = this.store.newOnboardingCount;
  readonly pendingCount = this.store.pendingVerificationCount;
  readonly archivedCount = this.store.archivedCount;
  readonly selectedTab = this.store.selectedSchoolTab;
  readonly searchQuery = this.store.schoolSearchQuery;
  readonly statusFilter = this.store.selectedStatusFilter;
  readonly planFilter = this.store.selectedPlanFilter;
  readonly regionFilter = this.store.selectedRegionFilter;
  readonly onboardingStatusFilter = this.store.selectedOnboardingStatusFilter;
  readonly onboardingBreakdown = this.store.onboardingBreakdown;
  readonly recentActivities = this.store.recentActivities;
  readonly attentionStats = this.store.attentionStats;
  readonly platformHealth = this.store.platformHealth;

  // Local UI Signals
  readonly selectedSchoolForModal = signal<SchoolInstitution | null>(null);
  readonly isExportOpen = signal<boolean>(false);
  readonly actionNotification = signal<string | null>(null);

  setTab(tab: SchoolTab): void {
    this.store.setSchoolTab(tab);
  }

  onSearch(query: string): void {
    this.store.setSchoolSearchQuery(query);
  }

  onStatusFilter(status: string): void {
    this.store.setStatusFilter(status);
  }

  onPlanFilter(plan: string): void {
    this.store.setPlanFilter(plan);
  }

  onRegionFilter(region: string): void {
    this.store.setRegionFilter(region);
  }

  onOnboardingFilter(status: string): void {
    this.store.setOnboardingStatusFilter(status);
  }

  onViewSchool(school: SchoolInstitution): void {
    this.selectedSchoolForModal.set(school);
  }

  closeModal(): void {
    this.selectedSchoolForModal.set(null);
  }

  onEditSchool(school: SchoolInstitution): void {
    this.closeModal();
    this.showNotification(`Editing ${school.name} configuration.`);
  }

  onManageSubscription(school: SchoolInstitution): void {
    this.closeModal();
    this.router.navigate(['/super-admin/subscriptions'], {
      queryParams: { schoolId: school.id },
    });
  }

  onManageUsers(school: SchoolInstitution): void {
    this.closeModal();
    this.router.navigate(['/super-admin/users-roles'], {
      queryParams: { schoolId: school.id },
    });
  }

  onUpdateSchoolStatus(payload: {
    school: SchoolInstitution;
    status: SchoolStatus;
  }): void {
    this.store.updateSchoolStatus(payload.school.id, payload.status);
    this.showNotification(
      `${payload.school.name} status updated to ${payload.status}.`,
    );
  }

  onDeleteSchool(school: SchoolInstitution): void {
    this.store.deleteSchool(school.id);
    this.showNotification(`${school.name} has been removed from directory.`);
  }

  onQuickAction(actionId: string): void {
    switch (actionId) {
      case 'assign-plan':
        this.router.navigate(['/super-admin/subscriptions']);
        break;
      case 'verify-setup':
        this.setTab('pending');
        break;
      case 'send-reminder':
        this.showNotification(
          'Onboarding reminders sent to all pending schools.',
        );
        break;
      case 'suspend-access':
        this.store.setStatusFilter('Suspended');
        break;
    }
  }

  onFilterByAttention(attentionId: string): void {
    switch (attentionId) {
      case 'att-1':
      case 'expiring':
        this.store.setStatusFilter('Expiring Soon');
        break;
      case 'att-2':
      case 'setup-incomplete':
        this.store.setStatusFilter('Setup Incomplete');
        break;
      case 'att-3':
      case 'suspended':
        this.store.setStatusFilter('Suspended');
        break;
      case 'att-4':
      case 'pending-verification':
        this.setTab('pending');
        break;
    }
  }

  toggleExport(): void {
    this.isExportOpen.update((v) => !v);
  }

  closeExport(): void {
    this.isExportOpen.set(false);
  }

  exportData(format: 'csv' | 'xlsx' | 'pdf'): void {
    this.closeExport();
    this.showNotification(
      `Schools directory exported in ${format.toUpperCase()} format.`,
    );
  }

  onImportInstitutions(): void {
    this.showNotification(
      'Bulk institution import dialog opened. CSV/Excel template ready.',
    );
  }

  showNotification(message: string): void {
    this.actionNotification.set(message);
    setTimeout(() => {
      this.actionNotification.set(null);
    }, 4000);
  }
}
