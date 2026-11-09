import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LearnersMetric } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-learners-metrics',
  imports: [],
  templateUrl: './learners-metrics.html',
  styleUrl: './learners-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnersMetricsComponent {
  readonly metrics = input.required<LearnersMetric[]>();
}
