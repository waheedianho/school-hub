import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricTone, SuperAdminMetric } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-top-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-metrics.html',
  styleUrl: './top-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMetricsComponent {
  readonly metrics = input.required<SuperAdminMetric[]>();

  getToneBg(tone: MetricTone): string {
    switch (tone) {
      case 'primary':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'success':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'purple':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'warning':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'info':
        return 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400';
      case 'danger':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400';
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  }
}
