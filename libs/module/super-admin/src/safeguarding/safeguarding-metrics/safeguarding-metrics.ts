import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeguardingMetric } from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-safeguarding-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safeguarding-metrics.html',
  styleUrl: './safeguarding-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingMetricsComponent {
  readonly metrics = input.required<SafeguardingMetric[]>();
}
