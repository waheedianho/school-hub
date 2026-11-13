import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumMetric } from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-curriculum-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-metrics.html',
  styleUrls: ['./curriculum-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumMetricsComponent {
  readonly metrics = input.required<CurriculumMetric[]>();
}
