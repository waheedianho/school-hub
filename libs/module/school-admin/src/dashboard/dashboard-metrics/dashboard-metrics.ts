import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminMetric } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-admin-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-metrics.html',
  styleUrl: './dashboard-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMetricsComponent {
  readonly metrics = input.required<SchoolAdminMetric[]>();

  getSparklinePoints(points: number[], width = 110, height = 28): string {
    if (!points || points.length < 2) return '';
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const step = width / (points.length - 1);
    return points
      .map((val, idx) => {
        const x = idx * step;
        const y = height - ((val - min) / range) * (height - 10) - 5;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  getToneStroke(tone: SchoolAdminMetric['tone']): string {
    switch (tone) {
      case 'purple':
        return '#8b5cf6';
      case 'green':
        return '#10b981';
      case 'blue':
        return '#3b82f6';
      case 'yellow':
        return '#f59e0b';
      case 'pink':
        return '#ec4899';
      case 'teal':
        return '#14b8a6';
      default:
        return '#6366f1';
    }
  }
}
