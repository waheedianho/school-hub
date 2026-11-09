import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LearnerGradeRecord } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-records-table',
  imports: [],
  templateUrl: './gradebook-records-table.html',
  styleUrl: './gradebook-records-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookRecordsTableComponent {
  readonly records = input.required<LearnerGradeRecord[]>();
  readonly viewRecord = output<LearnerGradeRecord>();
  readonly openMenu = output<LearnerGradeRecord>();

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Pending':
        return 'status-pending';
      case 'Mixed':
        return 'status-mixed';
      default:
        return 'status-default';
    }
  }

  getGradeClass(grade: string): string {
    switch (grade) {
      case 'A':
      case 'B':
        return 'grade-good';
      case 'C':
        return 'grade-average';
      case 'D':
      case 'F':
        return 'grade-poor';
      default:
        return '';
    }
  }

  getScoreClass(score: number, max: number): string {
    const ratio = score / max;
    if (ratio >= 0.75) return 'score-good';
    if (ratio >= 0.5) return 'score-average';
    return 'score-poor';
  }
}
