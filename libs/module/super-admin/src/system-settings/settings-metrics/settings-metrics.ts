import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsTopMetric } from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-settings-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-metrics.html',
  styleUrl: './settings-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMetricsComponent {
  readonly metrics = input.required<SettingsTopMetric[]>();
  readonly maintenanceToggled = output<void>();

  onMetricAction(metric: SettingsTopMetric): void {
    if (metric.id === 'maintenance-mode') {
      this.maintenanceToggled.emit();
    }
  }
}
