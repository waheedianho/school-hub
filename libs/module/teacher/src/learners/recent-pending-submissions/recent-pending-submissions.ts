import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { PendingSubmissionReviewItem } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-recent-pending-submissions',
  imports: [],
  templateUrl: './recent-pending-submissions.html',
  styleUrl: './recent-pending-submissions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentPendingSubmissionsComponent {
  readonly submissions = input.required<PendingSubmissionReviewItem[]>();
  readonly viewAll = output<void>();
}
