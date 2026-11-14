import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeguardingBottomMetric } from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-safeguarding-bottom-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safeguarding-bottom-metrics.html',
  styleUrl: './safeguarding-bottom-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingBottomMetricsComponent {
  readonly bottomMetrics = input.required<SafeguardingBottomMetric[]>();
}
