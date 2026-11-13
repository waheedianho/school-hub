import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentMetric } from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-metrics.html',
  styleUrls: ['./assessment-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentMetricsComponent {
  readonly metrics = input.required<AssessmentMetric[]>();
}
