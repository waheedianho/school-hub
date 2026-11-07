import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherUpcomingTopic } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-upcoming-topics',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './upcoming-topics.html',
  styleUrl: './upcoming-topics.scss',
})
export class UpcomingTopicsComponent {
  readonly topics = input.required<TeacherUpcomingTopic[]>();
}
