import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentCompletionPoint } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-assessment-trend-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment-trend-chart.html',
  styleUrls: ['./assessment-trend-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentTrendChartComponent {
  readonly points = input.required<AssessmentCompletionPoint[]>();
  readonly period = input<string>('Last 30 Days');
  readonly periodChange = output<string>();

  readonly periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Term',
  ];

  onPeriodChange(val: string): void {
    this.periodChange.emit(val);
  }

  getBarHeights(point: AssessmentCompletionPoint): {
    completedH: number;
    inProgressH: number;
    notStartedH: number;
  } {
    const maxVal = 9000;
    const maxHeight = 120; // px
    return {
      completedH: (point.completed / maxVal) * maxHeight,
      inProgressH: (point.inProgress / maxVal) * maxHeight,
      notStartedH: (point.notStarted / maxVal) * maxHeight,
    };
  }
}
