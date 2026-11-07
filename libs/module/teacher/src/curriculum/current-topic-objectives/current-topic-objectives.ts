import { Component, input } from '@angular/core';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherTopicObjective } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-current-topic-objectives',
  standalone: true,
  imports: [DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './current-topic-objectives.html',
  styleUrl: './current-topic-objectives.scss',
})
export class CurrentTopicObjectivesComponent {
  readonly objective = input.required<TeacherTopicObjective>();
}
