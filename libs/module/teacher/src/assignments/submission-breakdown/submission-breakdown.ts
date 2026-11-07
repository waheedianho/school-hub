import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  SUBMISSION_BREAKDOWN_DATA,
  SubmissionBreakdownItem,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-submission-breakdown',
  templateUrl: './submission-breakdown.html',
  styleUrl: './submission-breakdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionBreakdownComponent {
  readonly breakdownData = input<SubmissionBreakdownItem[]>(
    SUBMISSION_BREAKDOWN_DATA,
  );
  readonly totalSubmissions = input<number>(60);
}
