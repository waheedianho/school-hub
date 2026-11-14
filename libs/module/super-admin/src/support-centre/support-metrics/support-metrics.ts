import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportMetric } from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-support-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-metrics.html',
  styleUrl: './support-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportMetricsComponent {
  readonly metrics = input.required<SupportMetric[]>();
}
