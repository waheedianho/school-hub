import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherPendingSubmission } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-pending-reviews',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './pending-reviews.html',
  styleUrl: './pending-reviews.scss',
})
export class PendingReviewsComponent {
  readonly submissions = input.required<TeacherPendingSubmission[]>();
}
