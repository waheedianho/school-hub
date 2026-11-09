import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentReportingSettings } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-assessment-settings-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment-settings-card.html',
  styleUrls: ['./assessment-settings-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentSettingsCardComponent {
  readonly settings = input.required<AssessmentReportingSettings>();
  readonly settingsChange = output<Partial<AssessmentReportingSettings>>();

  readonly gradingScales: string[] = [
    'A - F (5.0 Scale)',
    'Percentage (0 - 100%)',
    'WAEC / NECO (A1 - F9)',
    'IGCSE Standard (A* - G)',
  ];

  readonly reportFormats: string[] = [
    'Standard (With GPA)',
    'Detailed Competency & Skills',
    'Summary Breakdown Only',
  ];

  readonly reportFrequencies: string[] = [
    'End of Term',
    'Mid-Term & End of Term',
    'Monthly Progress Snapshots',
  ];

  onFieldChange(
    field: keyof AssessmentReportingSettings,
    value: unknown,
  ): void {
    this.settingsChange.emit({ [field]: value });
  }

  toggleScoreApproval(): void {
    this.settingsChange.emit({
      scoreApprovalWorkflow: !this.settings().scoreApprovalWorkflow,
    });
  }
}
