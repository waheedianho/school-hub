import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReportsMetric } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-reports-metrics',
  imports: [],
  templateUrl: './reports-metrics.html',
  styleUrl: './reports-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsMetricsComponent {
  readonly metrics = input.required<ReportsMetric[]>();
}
