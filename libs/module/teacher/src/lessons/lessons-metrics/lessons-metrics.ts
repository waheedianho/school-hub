import { Component, input } from '@angular/core';
import { TeacherLessonMetric } from '../../data/teacher-lessons.data';

@Component({
  selector: 'school-hub-lessons-metrics',
  standalone: true,
  templateUrl: './lessons-metrics.html',
  styleUrl: './lessons-metrics.scss',
})
export class LessonsMetricsComponent {
  readonly metrics = input.required<TeacherLessonMetric[]>();
}
