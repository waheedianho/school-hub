import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionMetric } from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-subscriptions-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions-metrics.html',
  styleUrls: ['./subscriptions-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsMetricsComponent {
  readonly metrics = input.required<SubscriptionMetric[]>();
}
