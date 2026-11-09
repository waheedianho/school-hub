import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  RECENT_FEEDBACK_ACTIVITY,
  RecentFeedbackItem,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-recent-feedback-activity',
  templateUrl: './recent-feedback-activity.html',
  styleUrl: './recent-feedback-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentFeedbackActivityComponent {
  readonly feedbackList = input<RecentFeedbackItem[]>(RECENT_FEEDBACK_ACTIVITY);
}
