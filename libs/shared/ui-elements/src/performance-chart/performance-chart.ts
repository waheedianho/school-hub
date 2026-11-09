import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';

export interface PerformancePoint {
  label: string;
  value?: number;
}
interface ChartSlot extends PerformancePoint {
  x: number;
  y?: number;
}
interface ChartPoint extends ChartSlot {
  value: number;
  y: number;
}

@Component({
  selector: 'school-hub-performance-chart',
  templateUrl: './performance-chart.html',
  styleUrl: './performance-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceChartComponent {
  private readonly scroll =
    viewChild<ElementRef<HTMLDivElement>>('chartScroll');
  private readonly injector = inject(Injector);
  readonly points = input.required<readonly PerformancePoint[]>();
  readonly label = input('Performance over recent attempts');
  readonly appearance = input<'line' | 'area'>('line');
  readonly showPointValues = input(false);
  readonly emptyMessage = input(
    'Complete an assessment to see your performance.',
  );
  protected readonly ticks = [0, 25, 50, 75, 100];
  protected readonly height = computed(() =>
    this.appearance() === 'area' ? 180 : 160,
  );
  protected readonly baseline = computed(() =>
    this.appearance() === 'area' ? 156 : 144,
  );
  protected readonly canvasWidth = computed(() =>
    this.appearance() === 'area'
      ? Math.max(400, this.points().length * 92 + 44)
      : 0,
  );
  protected readonly description = computed(
    () =>
      `${this.label()}. ${this.points()
        .map(
          (point) =>
            `${point.label}: ${point.value === undefined ? 'no recorded result' : point.value + '%'}`,
        )
        .join(', ')}.`,
  );
  protected readonly plotted = computed<readonly ChartSlot[]>(() =>
    this.points().map((point, index, points) => ({
      ...point,
      x:
        points.length === 1
          ? 204
          : this.appearance() === 'area'
            ? 32 + (index * 344) / (points.length - 1)
            : 16 + (index * 376) / (points.length - 1),
      y:
        point.value === undefined || !Number.isFinite(point.value)
          ? undefined
          : this.tickY(point.value),
    })),
  );
  protected readonly segments = computed(() => {
    const segments: ChartPoint[][] = [];
    let current: ChartPoint[] = [];
    for (const point of this.plotted()) {
      if (point.y === undefined || point.value === undefined) {
        if (current.length) segments.push(current);
        current = [];
      } else current.push({ ...point, value: point.value, y: point.y });
    }
    if (current.length) segments.push(current);
    return segments.map((points) => ({
      line: points.map((point) => `${point.x},${point.y}`).join(' '),
      polygon: `polygon(${(points[0].x / 408) * 100}% ${(this.baseline() / this.height()) * 100}%, ${points.map((point) => `${(point.x / 408) * 100}% ${(point.y / this.height()) * 100}%`).join(', ')}, ${(points[points.length - 1].x / 408) * 100}% ${(this.baseline() / this.height()) * 100}%)`,
    }));
  });
  protected tickY(value: number): number {
    return this.baseline() - Math.min(100, Math.max(0, value)) * 1.28;
  }
  constructor() {
    effect(() => {
      if (this.appearance() === 'area' && this.points().length)
        afterNextRender(
          () => {
            const element = this.scroll()?.nativeElement;
            if (element)
              element.scrollLeft = element.scrollWidth - element.clientWidth;
          },
          { injector: this.injector },
        );
    });
  }
}
