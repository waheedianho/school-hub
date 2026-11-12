import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformUsageDataPoint } from '../../data/super-admin.models';

export interface ChartPoint {
  x: number;
  y: number;
  label: string;
  value: string;
  activeLearners: number;
}

@Component({
  selector: 'school-hub-usage-trend-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usage-trend-chart.html',
  styleUrl: './usage-trend-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageTrendChartComponent {
  readonly data = input.required<PlatformUsageDataPoint[]>();
  readonly period = input<string>('Last 6 Months');
  readonly periodChange = output<string>();

  readonly hoveredPoint = signal<ChartPoint | null>(null);

  readonly width = 560;
  readonly height = 200;
  readonly padding = { top: 20, right: 25, bottom: 35, left: 55 };

  readonly yAxisLabels = [
    { label: '1.5M', value: 1500000 },
    { label: '1.25M', value: 1250000 },
    { label: '1.0M', value: 1000000 },
    { label: '750K', value: 750000 },
    { label: '500K', value: 500000 },
    { label: '250K', value: 250000 },
    { label: '0', value: 0 },
  ];

  readonly points = computed<ChartPoint[]>(() => {
    const items = this.data();
    if (!items || items.length === 0) return [];

    const plotW = this.width - this.padding.left - this.padding.right;
    const plotH = this.height - this.padding.top - this.padding.bottom;
    const maxVal = 1500000;

    return items.map((item, idx) => {
      const x =
        this.padding.left + (idx / Math.max(1, items.length - 1)) * plotW;
      const y =
        this.padding.top +
        plotH -
        Math.min(1, Math.max(0, item.activeLearners / maxVal)) * plotH;
      return {
        x: Math.round(x),
        y: Math.round(y),
        label: item.period,
        value: item.formattedValue,
        activeLearners: item.activeLearners,
      };
    });
  });

  readonly polylinePoints = computed(() => {
    return this.points()
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
  });

  readonly areaPath = computed(() => {
    const pts = this.points();
    if (pts.length === 0) return '';
    const bottomY = this.height - this.padding.bottom;
    const firstX = pts[0].x;
    const lastX = pts[pts.length - 1].x;

    let path = `M ${firstX} ${bottomY}`;
    for (const p of pts) {
      path += ` L ${p.x} ${p.y}`;
    }
    path += ` L ${lastX} ${bottomY} Z`;
    return path;
  });

  getYPosition(value: number): number {
    const plotH = this.height - this.padding.top - this.padding.bottom;
    return Math.round(this.padding.top + plotH - (value / 1500000) * plotH);
  }

  onPeriodSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.periodChange.emit(target.value);
    }
  }

  onPointHover(point: ChartPoint | null): void {
    this.hoveredPoint.set(point);
  }
}
