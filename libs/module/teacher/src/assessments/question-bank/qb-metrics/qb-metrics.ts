import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssessmentMetric } from '../../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-qb-metrics',
  imports: [],
  templateUrl: './qb-metrics.html',
  styleUrl: './qb-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QBMetricsComponent {
  readonly metrics = input.required<AssessmentMetric[]>();
}
