import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DashboardCardComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { TeacherWeeklyFocusItem } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-weekly-curriculum-focus',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent, StatusBadgeComponent],
  templateUrl: './weekly-curriculum-focus.html',
  styleUrl: './weekly-curriculum-focus.scss',
})
export class WeeklyCurriculumFocusComponent {
  readonly items = input.required<TeacherWeeklyFocusItem[]>();
}
