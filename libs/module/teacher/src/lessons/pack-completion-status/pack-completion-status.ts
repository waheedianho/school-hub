import { Component, computed, input } from '@angular/core';
import { DashboardCardComponent } from '@school-hub/ui-elements';
import { TeacherPackCompletionTier } from '../../data/teacher-lessons.data';

interface DonutSlice extends TeacherPackCompletionTier {
  dashArray: string;
  dashOffset: number;
}

@Component({
  selector: 'school-hub-pack-completion-status',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './pack-completion-status.html',
  styleUrl: './pack-completion-status.scss',
})
export class PackCompletionStatusComponent {
  readonly tiers = input.required<TeacherPackCompletionTier[]>();
  readonly totalPacks = input<number>(128);

  readonly radius = 40;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly slices = computed<DonutSlice[]>(() => {
    const list = this.tiers();
    let accumulated = 0;

    return list.map((tier) => {
      const sliceLength = (tier.percentage / 100) * this.circumference;
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
