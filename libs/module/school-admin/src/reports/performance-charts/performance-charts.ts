import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { TermPerformanceTrendPoint } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-reports-performance-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-charts.html',
  styleUrls: ['./performance-charts.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsPerformanceChartsComponent {
  readonly store = inject(SchoolAdminStore);
  readonly trend = this.store.termPerformanceTrend;
  readonly classPerformance = this.store.classPerformanceOverview;

  readonly hoveredTrendPoint = signal<TermPerformanceTrendPoint | null>(null);
  readonly hoveredBar = signal<{
    subject: string;
    grade: string;
    score: number;
  } | null>(null);

  setHoveredTrend(point: TermPerformanceTrendPoint | null): void {
    this.hoveredTrendPoint.set(point);
  }

  setHoveredBar(subject: string, grade: string, score: number): void {
    this.hoveredBar.set({ subject, grade, score });
  }

  clearHoveredBar(): void {
    this.hoveredBar.set(null);
  }

  getBarHeight(score: number): number {
    return Math.max(10, Math.min(100, Math.round(score)));
  }

  getTrendCoordinates(): { pointsStr: string; areaStr: string } {
    // 3 points mapped onto SVG viewBox 0 0 500 200
    // Scores: 64.1% -> Y: 200 - (64.1 / 100 * 180) = 200 - 115.38 = 84.6
    // Score range 50% to 90% normalized:
    const data = this.trend();
    if (data.length === 0) return { pointsStr: '', areaStr: '' };

    const minScore = 50;
    const maxScore = 90;
    const width = 500;
    const height = 180;
    const paddingX = 60;
    const usableW = width - paddingX * 2;

    const coords = data.map((d, index) => {
      const x = paddingX + (index / (data.length - 1)) * usableW;
      const normalized = (d.averageScore - minScore) / (maxScore - minScore);
      const y = height - normalized * (height - 30) - 15;
      return { x, y };
    });

    const pointsStr = coords.map((c) => `${c.x},${c.y}`).join(' ');
    const first = coords[0];
    const last = coords[coords.length - 1];
    const areaStr = `M ${first.x},${height} L ${pointsStr} L ${last.x},${height} Z`;

    return { pointsStr, areaStr };
  }

  getPointPosition(index: number): { x: number; y: number } {
    const data = this.trend();
    const minScore = 50;
    const maxScore = 90;
    const width = 500;
    const height = 180;
    const paddingX = 60;
    const usableW = width - paddingX * 2;

    const x = paddingX + (index / (data.length - 1)) * usableW;
    const normalized =
      (data[index].averageScore - minScore) / (maxScore - minScore);
    const y = height - normalized * (height - 30) - 15;
    return { x, y };
  }
}
