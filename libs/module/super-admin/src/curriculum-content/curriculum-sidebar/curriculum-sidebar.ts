import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ContentActivity,
  ContentHealthOverview,
  ReviewQueueSummary,
} from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-curriculum-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-sidebar.html',
  styleUrls: ['./curriculum-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumSidebarComponent {
  readonly contentHealth = input.required<ContentHealthOverview>();
  readonly reviewSummary = input.required<ReviewQueueSummary>();
  readonly activities = input.required<ContentActivity[]>();
  readonly standardsCoverage = input<number>(81);

  readonly viewAllActivities = output<void>();
  readonly openReviewQueue = output<void>();
}
