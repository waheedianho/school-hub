import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesOverviewMetrics } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-classes-summary-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-metrics.html',
  styleUrls: ['./summary-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesSummaryMetricsComponent {
  readonly metrics = input.required<ClassesOverviewMetrics>();
}
