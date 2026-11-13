import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsMetric } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-analytics-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-metrics.html',
  styleUrls: ['./analytics-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsMetricsComponent {
  readonly metrics = input.required<AnalyticsMetric[]>();

  getSparklinePoints(data: number[]): string {
    if (!data || data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }
}
