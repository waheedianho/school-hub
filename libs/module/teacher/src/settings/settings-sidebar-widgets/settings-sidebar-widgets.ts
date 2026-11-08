import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import {
  RecentSettingChange,
  SETTINGS_TIPS,
  RECENT_SETTINGS_CHANGES,
} from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-settings-sidebar-widgets',
  imports: [],
  templateUrl: './settings-sidebar-widgets.html',
  styleUrl: './settings-sidebar-widgets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSidebarWidgetsComponent {
  readonly tips = input<string[]>(SETTINGS_TIPS);
  readonly recentChanges = input<RecentSettingChange[]>(
    RECENT_SETTINGS_CHANGES,
  );

  readonly saveRequested = output<void>();
  readonly resetRequested = output<void>();
  readonly auditLogsRequested = output<void>();

  readonly showAuditModal = signal<boolean>(false);

  onSave(): void {
    this.saveRequested.emit();
  }

  onReset(): void {
    this.resetRequested.emit();
  }

  onOpenAuditLogs(): void {
    this.showAuditModal.set(true);
    this.auditLogsRequested.emit();
  }

  onCloseAuditLogs(): void {
    this.showAuditModal.set(false);
  }
}
