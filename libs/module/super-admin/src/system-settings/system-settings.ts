import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  ExportConfigOptions,
  SettingsTabId,
  SystemSettingsState,
} from '../data/super-admin-settings.models';
import { SettingsMetricsComponent } from './settings-metrics/settings-metrics';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs';
import { SettingsGridComponent } from './settings-grid/settings-grid';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar';
import { SettingsBottomMetricsComponent } from './settings-bottom-metrics/settings-bottom-metrics';
import { ExportConfigModalComponent } from './export-config-modal/export-config-modal';
import { RestoreDefaultsModalComponent } from './restore-defaults-modal/restore-defaults-modal';
import { SystemHealthModalComponent } from './system-health-modal/system-health-modal';

@Component({
  selector: 'school-hub-system-settings',
  standalone: true,
  imports: [
    CommonModule,
    SettingsMetricsComponent,
    SettingsTabsComponent,
    SettingsGridComponent,
    SettingsSidebarComponent,
    SettingsBottomMetricsComponent,
    ExportConfigModalComponent,
    RestoreDefaultsModalComponent,
    SystemHealthModalComponent,
  ],
  templateUrl: './system-settings.html',
  styleUrl: './system-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSettingsComponent {
  private readonly store = inject(SuperAdminStore);
  private readonly router = inject(Router);

  // Store signals
  readonly topMetrics = this.store.settingsTopMetrics;
  readonly tabs = this.store.settingsTabs;
  readonly activeTab = this.store.activeSettingsTab;
  readonly settings = this.store.systemSettings;
  readonly healthItems = this.store.systemHealthItems;
  readonly recentChanges = this.store.recentConfigChanges;
  readonly bottomMetrics = this.store.settingsBottomMetrics;
  readonly isSaving = this.store.isSettingsSaving;
  readonly lastSavedTimestamp = this.store.lastSavedTimestamp;

  // Local modal states
  readonly isExportModalOpen = signal<boolean>(false);
  readonly isRestoreModalOpen = signal<boolean>(false);
  readonly isHealthModalOpen = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  onTabChange(tabId: SettingsTabId): void {
    this.store.setActiveSettingsTab(tabId);
  }

  onSettingsChange(updated: SystemSettingsState): void {
    this.store.updateSystemSettings(updated);
  }

  onSaveSettings(): void {
    this.store.saveSystemSettings('Updated platform system configuration');
    this.showToast('Platform settings saved and broadcast successfully.');
  }

  onExportConfig(): void {
    this.isExportModalOpen.set(true);
  }

  onCloseExportModal(): void {
    this.isExportModalOpen.set(false);
  }

  onExportExecuted(opts: ExportConfigOptions): void {
    this.showToast(
      `Configuration exported successfully in ${opts.format.toUpperCase()} format.`,
    );
  }

  onRestoreDefaults(): void {
    this.isRestoreModalOpen.set(true);
  }

  onCloseRestoreModal(): void {
    this.isRestoreModalOpen.set(false);
  }

  onRestoreConfirmed(): void {
    this.store.restoreDefaultSettings();
    this.showToast(
      'System configuration restored to initial factory defaults.',
    );
  }

  onViewHealthDetails(): void {
    this.isHealthModalOpen.set(true);
  }

  onCloseHealthModal(): void {
    this.isHealthModalOpen.set(false);
  }

  onViewAuditHistory(): void {
    this.router.navigate(['/super-admin/audit-logs']);
  }

  onToggleMaintenance(): void {
    this.store.toggleMaintenanceMode();
    const mode = this.store.maintenanceModeEnabled() ? 'enabled' : 'disabled';
    this.showToast(`Maintenance mode has been ${mode}.`);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }
}
