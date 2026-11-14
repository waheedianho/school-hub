import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceBottomMetric } from '../../data/super-admin-resources.models';

@Component({
  selector: 'school-hub-resources-bottom-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources-bottom-metrics.html',
  styleUrl: './resources-bottom-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesBottomMetricsComponent {
  readonly bottomMetrics = input.required<ResourceBottomMetric[]>();
}
