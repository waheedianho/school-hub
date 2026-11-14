import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleUsageBreakdown } from '../../data/super-admin-analytics.models';

@Component({
  selector: 'school-hub-usage-role-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usage-role-chart.html',
  styleUrls: ['./usage-role-chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageRoleChartComponent {
  readonly roles = input.required<RoleUsageBreakdown[]>();

  readonly totalUsers = computed(() => {
    return this.roles().reduce((sum, r) => sum + r.count, 0);
  });
}
