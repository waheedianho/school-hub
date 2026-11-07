import { Component, input } from '@angular/core';
import { TeacherClassMetric } from '../../data/teacher-classes.data';

@Component({
  selector: 'school-hub-classes-metrics',
  standalone: true,
  templateUrl: './classes-metrics.html',
  styleUrl: './classes-metrics.scss',
})
export class ClassesMetricsComponent {
  readonly metrics = input.required<TeacherClassMetric[]>();
}
