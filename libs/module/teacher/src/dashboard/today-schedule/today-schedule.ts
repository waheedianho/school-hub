import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherScheduleItem } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-today-schedule',
  standalone: true,
  imports: [RouterLink, DashboardCardComponent],
  templateUrl: './today-schedule.html',
  styleUrl: './today-schedule.scss',
})
export class TodayScheduleComponent {
  readonly items = input.required<TeacherScheduleItem[]>();
}
