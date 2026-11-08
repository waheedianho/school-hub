import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerformanceTrendPoint } from '../../data/teacher-reports.data';

@Component({
  selector: 'school-hub-reports-trend-chart',
  imports: [FormsModule],
  templateUrl: './reports-trend-chart.html',
  styleUrl: './reports-trend-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsTrendChartComponent {
  readonly points = input.required<PerformanceTrendPoint[]>();
  readonly timeFrame = signal('Weekly');
}
