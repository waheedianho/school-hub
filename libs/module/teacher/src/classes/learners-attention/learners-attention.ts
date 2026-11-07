import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherLearnerAttentionItem } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-learners-attention',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './learners-attention.html',
  styleUrl: './learners-attention.scss',
})
export class LearnersAttentionComponent {
  readonly items = input.required<TeacherLearnerAttentionItem[]>();
}
