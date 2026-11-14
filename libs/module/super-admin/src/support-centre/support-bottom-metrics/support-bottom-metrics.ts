import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportBottomMetric } from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-support-bottom-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-bottom-metrics.html',
  styleUrl: './support-bottom-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportBottomMetricsComponent {
  readonly bottomMetrics = input.required<SupportBottomMetric[]>();
}
