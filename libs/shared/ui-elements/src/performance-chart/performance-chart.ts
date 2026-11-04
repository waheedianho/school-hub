import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export interface PerformancePoint {
  label: string;
  value: number;
}

@Component({
  selector: 'school-hub-performance-chart',
  templateUrl: './performance-chart.html',
  styleUrl: './performance-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceChartComponent {
  readonly points = input.required<readonly PerformancePoint[]>();
  readonly label = input('Performance over recent attempts');
  protected readonly ticks = [0, 25, 50, 75, 100];
  protected readonly plotted = computed(() =>
    this.points().map((point, index, points) => ({
      ...point,
      x: points.length === 1 ? 214 : 42 + (index * 342) / (points.length - 1),
      y: 142 - Math.min(100, Math.max(0, point.value)) * 1.16,
    })),
  );
  protected readonly line = computed(() =>
    this.plotted()
      .map((point) => `${point.x},${point.y}`)
      .join(' '),
  );
}
