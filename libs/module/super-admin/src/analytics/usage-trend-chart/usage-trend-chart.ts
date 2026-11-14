import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformUsagePoint } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-usage-trend-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usage-trend-chart.html',
  styleUrls: ['./usage-trend-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageTrendChartComponent {
  readonly points = input.required<PlatformUsagePoint[]>();
  readonly period = input<string>('Last 30 Days');
  readonly periodChange = output<string>();

  readonly periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Academic Year',
  ];

  // Default active tooltip index: Wed, May 7 (index 7 in our data)
  readonly activeIndex = signal<number>(7);

  readonly activePoint = computed(() => {
    const list = this.points();
    const idx = this.activeIndex();
    if (idx >= 0 && idx < list.length) {
      return list[idx];
    }
    return list[list.length - 1] ?? null;
  });

  // SVG coordinate calculations for 500x200 canvas
  readonly chartCoords = computed(() => {
    const list = this.points();
    if (!list || list.length === 0) return [];
    const width = 500;
    const height = 160;
    const paddingLeft = 35;
    const paddingRight = 15;
    const paddingTop = 20;
    const paddingBottom = 25;

    const availableWidth = width - paddingLeft - paddingRight;
    const availableHeight = height - paddingTop - paddingBottom;
    const maxVal = 10000;

    return list.map((item, idx) => {
      const x = paddingLeft + (idx / (list.length - 1)) * availableWidth;
      const y =
        paddingTop + availableHeight - (item.dau / maxVal) * availableHeight;
      return { x, y, item, idx };
    });
  });

  readonly pathD = computed(() => {
    const coords = this.chartCoords();
    if (coords.length === 0) return '';
    return coords.reduce((acc, curr, idx) => {
      return idx === 0
        ? `M ${curr.x} ${curr.y}`
        : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  });

  readonly areaD = computed(() => {
    const coords = this.chartCoords();
    if (coords.length === 0) return '';
    const first = coords[0];
    const last = coords[coords.length - 1];
    const baseline = 155;
    return `${this.pathD()} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
  });

  onPeriodChange(val: string): void {
    this.periodChange.emit(val);
  }

  setActiveIndex(idx: number): void {
    this.activeIndex.set(idx);
  }
}
