import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradingPreferences } from '../../data/teacher-settings.data';

@Component({
  selector: 'school-hub-grading-preferences-card',
  imports: [FormsModule],
  templateUrl: './grading-preferences-card.html',
  styleUrl: './grading-preferences-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradingPreferencesCardComponent {
  readonly preferences = input.required<GradingPreferences>();
  readonly preferencesUpdated = output<GradingPreferences>();

  readonly gradingScaleOptions: string[] = [
    'Percentage (%)',
    'Letter Grade (A-F)',
    'Point-based (0-100)',
    'GPA Scale (4.0)',
  ];

  readonly rubricOptions: string[] = [
    'Use Rubrics (Recommended)',
    'Optional Rubrics',
    'Do Not Use Rubrics',
  ];

  readonly lateSubmissionOptions: string[] = [
    'Deduct points automatically',
    'Accept with late flag',
    'Reject late submissions',
    'No penalty',
  ];

  onScaleChange(scale: string): void {
    const updated: GradingPreferences = {
      ...this.preferences(),
      gradingScale: scale,
    };
    this.preferencesUpdated.emit(updated);
  }

  onToggle(
    key: 'autoSyncScores' | 'requireConfirmation' | 'showAuditTrail',
    checked: boolean,
  ): void {
    const updated: GradingPreferences = {
      ...this.preferences(),
      [key]: checked,
    };
    this.preferencesUpdated.emit(updated);
  }

  onRubricChange(rubric: string): void {
    const updated: GradingPreferences = {
      ...this.preferences(),
      rubricPreference: rubric,
    };
    this.preferencesUpdated.emit(updated);
  }

  onLateSubmissionChange(handling: string): void {
    const updated: GradingPreferences = {
      ...this.preferences(),
      lateSubmissionHandling: handling,
    };
    this.preferencesUpdated.emit(updated);
  }
}
