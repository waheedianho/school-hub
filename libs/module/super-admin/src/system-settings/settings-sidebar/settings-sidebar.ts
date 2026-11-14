import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  RecentConfigChange,
  SystemHealthItem,
} from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-settings-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-sidebar.html',
  styleUrl: './settings-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSidebarComponent {
  readonly healthItems = input.required<SystemHealthItem[]>();
  readonly recentChanges = input.required<RecentConfigChange[]>();
  readonly isSaving = input<boolean>(false);

  readonly saveSettings = output<void>();
  readonly exportConfig = output<void>();
  readonly restoreDefaults = output<void>();
  readonly viewHealthDetails = output<void>();
  readonly viewAuditHistory = output<void>();

  onSave(): void {
    this.saveSettings.emit();
  }

  onExport(): void {
    this.exportConfig.emit();
  }

  onRestore(): void {
    this.restoreDefaults.emit();
  }

  onHealthDetails(): void {
    this.viewHealthDetails.emit();
  }

  onAuditHistory(): void {
    this.viewAuditHistory.emit();
  }
}
