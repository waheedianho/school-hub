import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RecentScoreActivityItem } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-recent-score-activity',
  imports: [],
  templateUrl: './recent-score-activity.html',
  styleUrl: './recent-score-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentScoreActivityComponent {
  readonly activities = input.required<RecentScoreActivityItem[]>();
  readonly viewAll = output<void>();

  getActivityIcon(type: string): string {
    switch (type) {
      case 'approved':
      case 'auto-synced':
        return 'check_circle';
      case 'pending':
        return 'schedule';
      case 'review-required':
        return 'error';
      default:
        return 'info';
    }
  }

  getActivityTone(type: string): string {
    switch (type) {
      case 'approved':
      case 'auto-synced':
        return 'tone-green';
      case 'pending':
        return 'tone-orange';
      case 'review-required':
        return 'tone-red';
      default:
        return 'tone-blue';
    }
  }
}
