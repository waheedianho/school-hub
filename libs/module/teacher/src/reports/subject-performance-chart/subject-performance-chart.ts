import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SubjectPerformanceItem } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-subject-performance-chart',
  imports: [],
  templateUrl: './subject-performance-chart.html',
  styleUrl: './subject-performance-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectPerformanceChartComponent {
  readonly items = input.required<SubjectPerformanceItem[]>();
}
