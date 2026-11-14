import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportMetric } from '../../data/super-admin-reports.models';

@Component({
  selector: 'school-hub-reports-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-metrics.html',
  styleUrls: ['./reports-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsMetricsComponent {
  readonly metrics = input.required<ReportMetric[]>();
}
