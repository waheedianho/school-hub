import { Component, input } from '@angular/core';
import { TeacherCurriculumMetric } from '../../data/teacher-curriculum.data';

@Component({
  selector: 'school-hub-curriculum-metrics',
  standalone: true,
  templateUrl: './curriculum-metrics.html',
  styleUrl: './curriculum-metrics.scss',
})
export class CurriculumMetricsComponent {
  readonly metrics = input.required<TeacherCurriculumMetric[]>();
}
