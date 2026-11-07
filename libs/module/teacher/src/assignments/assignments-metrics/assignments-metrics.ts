import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  AssignmentMetric,
  TEACHER_ASSIGNMENTS_METRICS,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-assignments-metrics',
  templateUrl: './assignments-metrics.html',
  styleUrl: './assignments-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsMetricsComponent {
  readonly metrics = input<AssignmentMetric[]>(TEACHER_ASSIGNMENTS_METRICS);
}
