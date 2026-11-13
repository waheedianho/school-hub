import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AssessmentActivity,
  AssessmentHealthOverview,
  AssessmentReviewQueueSummary,
} from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-sidebar.html',
  styleUrls: ['./assessment-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentSidebarComponent {
  readonly assessmentHealth = input.required<AssessmentHealthOverview>();
  readonly reviewSummary = input.required<AssessmentReviewQueueSummary>();
  readonly activities = input.required<AssessmentActivity[]>();
  readonly standardsCoverage = input<number>(92);

  readonly viewAllActivities = output<void>();
  readonly openReviewQueue = output<void>();
}
