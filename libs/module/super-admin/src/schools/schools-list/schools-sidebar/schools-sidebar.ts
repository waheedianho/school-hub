import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InstitutionActivity,
  OnboardingBreakdown,
  SchoolNeedingAttention,
} from '../../../data/super-admin-schools.models';

@Component({
  selector: 'school-hub-schools-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schools-sidebar.html',
  styleUrl: './schools-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsSidebarComponent {
  readonly onboardingBreakdown = input.required<OnboardingBreakdown>();
  readonly recentActivities = input.required<InstitutionActivity[]>();
  readonly attentionStats = input.required<SchoolNeedingAttention[]>();

  readonly viewAllActivity = output<void>();
  readonly viewAllAttention = output<void>();
  readonly filterByAttention = output<string>();

  onAttentionClick(id: string): void {
    this.filterByAttention.emit(id);
  }

  getAttentionBg(tone: string): string {
    switch (tone) {
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'info':
        return 'bg-blue-50 text-blue-600';
      case 'danger':
        return 'bg-rose-50 text-rose-600';
      case 'primary':
      default:
        return 'bg-purple-50 text-purple-600';
    }
  }

  getAttentionIcon(id: string): string {
    switch (id) {
      case 'att-1':
      case 'expiring':
        return 'schedule';
      case 'att-2':
      case 'setup-incomplete':
        return 'assignment_late';
      case 'att-3':
      case 'suspended':
        return 'block';
      case 'att-4':
      case 'pending-verification':
        return 'verified_user';
      default:
        return 'error';
    }
  }
}
