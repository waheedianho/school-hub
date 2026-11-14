import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionBottomMetric } from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-subscriptions-bottom-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions-bottom-metrics.html',
  styleUrls: ['./subscriptions-bottom-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsBottomMetricsComponent {
  readonly metrics = input.required<SubscriptionBottomMetric[]>();

  getSparklinePoints(data?: number[]): string {
    if (!data || data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }
}
