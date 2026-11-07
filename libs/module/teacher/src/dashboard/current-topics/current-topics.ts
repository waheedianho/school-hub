import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  ProgressBarComponent,
  StatusBadgeComponent,
  UiTone,
} from '@school-hub/ui-elements';
import { TeacherClassTopic } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-current-topics',
  standalone: true,
  imports: [
    RouterLink,
    DashboardCardComponent,
    ProgressBarComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './current-topics.html',
  styleUrl: './current-topics.scss',
})
export class CurrentTopicsComponent {
  readonly topics = input.required<TeacherClassTopic[]>();

  getScoreTone(score: number): UiTone {
    if (score >= 70) return 'green';
    if (score >= 65) return 'blue';
    return 'orange';
  }
}
