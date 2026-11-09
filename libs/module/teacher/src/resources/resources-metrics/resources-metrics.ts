import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResourceMetric } from '../../data/teacher-resources.data';

@Component({
  selector: 'school-hub-resources-metrics',
  imports: [],
  templateUrl: './resources-metrics.html',
  styleUrl: './resources-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMetricsComponent {
  readonly metrics = input.required<ResourceMetric[]>();
}
