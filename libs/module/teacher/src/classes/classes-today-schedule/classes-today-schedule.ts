import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherClassScheduleItem } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-classes-today-schedule',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './classes-today-schedule.html',
  styleUrl: './classes-today-schedule.scss',
})
export class ClassesTodayScheduleComponent {
  readonly items = input.required<TeacherClassScheduleItem[]>();
}
