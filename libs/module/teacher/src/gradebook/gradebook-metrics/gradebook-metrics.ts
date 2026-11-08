import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GradebookMetric } from '../../data/teacher-gradebook.data';

@Component({
  selector: 'school-hub-gradebook-metrics',
  imports: [],
  templateUrl: './gradebook-metrics.html',
  styleUrl: './gradebook-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookMetricsComponent {
  readonly metrics = input.required<GradebookMetric[]>();
}
