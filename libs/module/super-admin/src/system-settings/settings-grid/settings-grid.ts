import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SettingsTabId,
  SystemSettingsState,
} from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-settings-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-grid.html',
  styleUrl: './settings-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsGridComponent {
  readonly settings = input.required<SystemSettingsState>();
  readonly activeTab = input<SettingsTabId>('general');

  readonly settingsChange = output<SystemSettingsState>();
  readonly tabRequested = output<SettingsTabId>();
  readonly viewHistoryRequested = output<void>();

  onSettingChange(): void {
    // Clone and emit new state
    this.settingsChange.emit(this.settings());
  }

  onTabRequest(tabId: SettingsTabId): void {
    this.tabRequested.emit(tabId);
  }

  onViewHistory(): void {
    this.viewHistoryRequested.emit();
  }
}
