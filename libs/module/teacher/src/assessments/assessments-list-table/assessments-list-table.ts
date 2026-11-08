import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AssessmentItem } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-assessments-list-table',
  imports: [],
  templateUrl: './assessments-list-table.html',
  styleUrl: './assessments-list-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsListTableComponent {
  readonly assessments = input.required<AssessmentItem[]>();
  readonly openAssessment = output<AssessmentItem>();
  readonly reviewAssessment = output<AssessmentItem>();

  onActionClick(item: AssessmentItem): void {
    if (item.status === 'Pending Review') {
      this.reviewAssessment.emit(item);
    } else {
      this.openAssessment.emit(item);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'status-scheduled';
      case 'Open':
        return 'status-open';
      case 'Pending Review':
        return 'status-pending';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-default';
    }
  }

  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'Quiz':
        return 'type-quiz';
      case 'Test':
        return 'type-test';
      case 'Essay':
        return 'type-essay';
      case 'Mixed':
        return 'type-mixed';
      default:
        return 'type-default';
    }
  }
}
