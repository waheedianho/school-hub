import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationSafeguardingSettings } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-communication-safeguarding-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication-safeguarding-card.html',
  styleUrls: ['./communication-safeguarding-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationSafeguardingCardComponent {
  readonly settings = input.required<CommunicationSafeguardingSettings>();
  readonly settingsChange =
    output<Partial<CommunicationSafeguardingSettings>>();

  readonly communicationPreferences: string[] = [
    'Email & SMS',
    'Email Only',
    'SMS Only',
    'App Notifications Only',
  ];

  onFieldChange(
    field: keyof CommunicationSafeguardingSettings,
    value: unknown,
  ): void {
    this.settingsChange.emit({ [field]: value });
  }

  toggleField(field: keyof CommunicationSafeguardingSettings): void {
    const current = !!this.settings()[field];
    this.settingsChange.emit({ [field]: !current });
  }
}
