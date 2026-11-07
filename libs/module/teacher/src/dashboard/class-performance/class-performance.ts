import { Component, computed, input } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherClassPerformance } from '../../data/teacher-dashboard.data';

interface DonutSegment {
  className: string;
  averageScore: number;
  color: string;
  strokeDasharray: string;
  strokeDashoffset: number;
}

@Component({
  selector: 'school-hub-class-performance',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './class-performance.html',
  styleUrl: './class-performance.scss',
})
export class ClassPerformanceComponent {
  readonly performance = input.required<TeacherClassPerformance[]>();

  protected readonly radius = 54;
  protected readonly circumference = 2 * Math.PI * this.radius; // ~339.29

  protected readonly donutSegments = computed<DonutSegment[]>(() => {
    const list = this.performance();
    const total = list.reduce((sum, item) => sum + item.averageScore, 0);
    if (total === 0) return [];

    let currentOffset = 0;
    return list.map((item) => {
      const share = item.averageScore / total;
      const strokeLength = share * this.circumference;
      const segment: DonutSegment = {
        className: item.className,
        averageScore: item.averageScore,
        color: item.color,
        strokeDasharray: `${strokeLength} ${this.circumference}`,
        strokeDashoffset: -currentOffset,
      };
      currentOffset += strokeLength;
      return segment;
    });
  });
}
