import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceMetric } from '../../data/super-admin-resources.models';

@Component({
  selector: 'school-hub-resources-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources-metrics.html',
  styleUrl: './resources-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesMetricsComponent {
  readonly metrics = input.required<ResourceMetric[]>();
}
