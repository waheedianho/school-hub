import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMetric } from '../../data/super-admin-users.models';

@Component({
  selector: 'school-hub-users-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-metrics.html',
  styleUrl: './users-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMetricsComponent {
  readonly metrics = input.required<UsersMetric[]>();

  getToneBg(tone: string): string {
    switch (tone) {
      case 'primary':
        return 'bg-blue-50 text-blue-600';
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'success':
        return 'bg-emerald-50 text-emerald-600';
      case 'pink':
        return 'bg-rose-50 text-rose-500';
      case 'danger':
        return 'bg-rose-50 text-rose-600';
      case 'info':
      default:
        return 'bg-slate-100 text-slate-600';
    }
  }
}
