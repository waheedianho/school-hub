import { Component, computed, input } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherPerformanceTier } from '../../data/teacher-classes.data';

interface DonutSlice extends TeacherPerformanceTier {
  dashArray: string;
  dashOffset: number;
}

@Component({
  selector: 'school-hub-classes-performance-overview',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './classes-performance-overview.html',
  styleUrl: './classes-performance-overview.scss',
})
export class ClassesPerformanceOverviewComponent {
  readonly tiers = input.required<TeacherPerformanceTier[]>();
  readonly overallAverage = input<number>(72);

  // Circumference for r=40 is 2 * PI * 40 ≈ 251.327
  readonly radius = 40;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly slices = computed<DonutSlice[]>(() => {
    const list = this.tiers();
    let accumulated = 0;

    return list.map((tier) => {
      const sliceLength = (tier.percentage / 100) * this.circumference;
      // SVG stroke-dashoffset starts from top (-circumference / 4)
      const offset = -accumulated;
      accumulated += sliceLength;

      return {
        ...tier,
        dashArray: `${sliceLength} ${this.circumference}`,
        dashOffset: offset,
      };
    });
  });
}
