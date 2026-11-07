import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherPendingReviewItem } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-classes-pending-review',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './classes-pending-review.html',
  styleUrl: './classes-pending-review.scss',
})
export class ClassesPendingReviewComponent {
  readonly items = input.required<TeacherPendingReviewItem[]>();
}
