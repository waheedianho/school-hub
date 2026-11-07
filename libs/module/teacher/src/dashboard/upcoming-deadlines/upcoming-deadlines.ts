import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherUpcomingDeadline } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-upcoming-deadlines',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './upcoming-deadlines.html',
  styleUrl: './upcoming-deadlines.scss',
})
export class UpcomingDeadlinesComponent {
  readonly deadlines = input.required<TeacherUpcomingDeadline[]>();
}
