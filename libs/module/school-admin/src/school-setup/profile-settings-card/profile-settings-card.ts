import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolProfile } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-profile-settings-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-settings-card.html',
  styleUrls: ['./profile-settings-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsCardComponent {
  readonly profile = input.required<SchoolProfile>();
  readonly profileChange = output<Partial<SchoolProfile>>();

  readonly colorOptions: string[] = [
    '#6366f1',
    '#3b82f6',
    '#10b981',
    '#06b6d4',
    '#f59e0b',
    '#ef4444',
  ];

  readonly schoolTypes: string[] = [
    'Secondary School',
    'Primary School',
    'Comprehensive / K-12',
    'Technical College',
  ];

  onFieldChange(field: keyof SchoolProfile, value: string): void {
    this.profileChange.emit({ [field]: value });
  }

  selectColor(color: string): void {
    this.profileChange.emit({ primaryColor: color });
  }
}
