import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsTab,
  SettingsTabId,
} from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-settings-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-tabs.html',
  styleUrl: './settings-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTabsComponent {
  readonly tabs = input.required<SettingsTab[]>();
  readonly activeTab = input.required<SettingsTabId>();
  readonly tabChange = output<SettingsTabId>();

  selectTab(id: SettingsTabId): void {
    this.tabChange.emit(id);
  }
}
