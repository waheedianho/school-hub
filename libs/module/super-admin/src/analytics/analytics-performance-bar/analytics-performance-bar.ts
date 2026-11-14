import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsPerformanceSummary } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-analytics-performance-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-performance-bar.html',
  styleUrls: ['./analytics-performance-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsPerformanceBarComponent {
  readonly summary = input.required<AnalyticsPerformanceSummary>();
}
