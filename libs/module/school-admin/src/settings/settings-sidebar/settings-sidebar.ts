import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import {
  GeneralSettingsSummaryItem,
  PermissionSidebarSummary,
  SettingsAttentionItem,
  SettingsTab,
} from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-settings-sidebar',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './settings-sidebar.html',
  styleUrls: ['./settings-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSidebarComponent {
  readonly activeTab = input.required<SettingsTab>();
  readonly generalSummary = input.required<GeneralSettingsSummaryItem[]>();
  readonly generalAttentionItems = input.required<SettingsAttentionItem[]>();
  readonly permissionSummary = input.required<PermissionSidebarSummary>();
  readonly permissionAttentionItems = input.required<SettingsAttentionItem[]>();
  readonly selectedAttentionItem = input<SettingsAttentionItem | null>(null);

  readonly attentionItemSelect = output<SettingsAttentionItem>();
  readonly createRole = output<void>();
  readonly exportReport = output<void>();
  readonly switchTab = output<SettingsTab>();
  readonly quickActionClick = output<string>();

  onSelectAttentionItem(item: SettingsAttentionItem): void {
    this.attentionItemSelect.emit(item);
  }

  onCreateRole(): void {
    this.createRole.emit();
  }

  onExportReport(): void {
    this.exportReport.emit();
  }

  onSwitchTab(tab: SettingsTab): void {
    this.switchTab.emit(tab);
  }

  onQuickAction(action: string): void {
    this.quickActionClick.emit(action);
  }
}
