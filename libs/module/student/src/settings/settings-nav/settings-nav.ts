import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SettingsSection, SettingsSectionItem } from '../settings-engine';

@Component({
  selector: 'school-hub-settings-nav',
  templateUrl: './settings-nav.html',
  styleUrl: './settings-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNavComponent {
  readonly sections = input.required<readonly SettingsSectionItem[]>();
  readonly activeSection = input<SettingsSection>('account');
  readonly sectionSelected = output<SettingsSection>();
}
