import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssessmentMetric } from '../../data/teacher-assessments.data';

@Component({
  selector: 'school-hub-assessments-metrics',
  imports: [],
  templateUrl: './assessments-metrics.html',
  styleUrl: './assessments-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsMetricsComponent {
  readonly metrics = input.required<AssessmentMetric[]>();
}
