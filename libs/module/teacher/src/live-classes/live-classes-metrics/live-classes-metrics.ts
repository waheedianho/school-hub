import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LiveClassMetric,
  TEACHER_LIVE_CLASSES_METRICS,
} from '../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-live-classes-metrics',
  templateUrl: './live-classes-metrics.html',
  styleUrl: './live-classes-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassesMetricsComponent {
  readonly metrics = input<LiveClassMetric[]>(TEACHER_LIVE_CLASSES_METRICS);
}
