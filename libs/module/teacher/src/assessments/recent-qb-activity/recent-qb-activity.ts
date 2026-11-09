import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RecentQBActivityItem } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-recent-qb-activity',
  imports: [],
  templateUrl: './recent-qb-activity.html',
  styleUrl: './recent-qb-activity.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentQBActivityComponent {
  readonly activities = input.required<RecentQBActivityItem[]>();
}
