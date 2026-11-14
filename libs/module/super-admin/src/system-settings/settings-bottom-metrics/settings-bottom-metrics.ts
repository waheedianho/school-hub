import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsBottomMetric } from '../../data/super-admin-settings.models';

@Component({
  selector: 'school-hub-settings-bottom-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-bottom-metrics.html',
  styleUrl: './settings-bottom-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsBottomMetricsComponent {
  readonly metrics = input.required<SettingsBottomMetric[]>();

  getSparklinePath(data: number[]): string {
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 36;
    const step = width / (data.length - 1);

    return data
      .map((val, idx) => {
        const x = idx * step;
        const y = height - ((val - min) / range) * (height - 8) - 4;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  getSparklinePoints(data: number[]): Array<{ x: number; y: number }> {
    if (!data || data.length < 2) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 36;
    const step = width / (data.length - 1);

    return data.map((val, idx) => ({
      x: Number((idx * step).toFixed(1)),
      y: Number((height - ((val - min) / range) * (height - 8) - 4).toFixed(1)),
    }));
  }
}
