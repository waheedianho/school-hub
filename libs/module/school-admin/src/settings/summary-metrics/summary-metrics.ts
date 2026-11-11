import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SettingsSummaryMetrics } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-settings-summary-metrics',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './summary-metrics.html',
  styleUrls: ['./summary-metrics.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSummaryMetricsComponent {
  readonly metrics = input.required<SettingsSummaryMetrics>();
}
