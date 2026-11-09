import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeacherMetricItem } from '../../data/teacher-dashboard.data';

@Component({
  selector: 'school-hub-dashboard-metrics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-metrics.html',
  styleUrl: './dashboard-metrics.scss',
})
export class DashboardMetricsComponent {
  readonly metrics = input.required<TeacherMetricItem[]>();
}
