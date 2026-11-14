import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComplianceHealthCategory,
  ConsentQueueBreakdown,
  PolicyChecklistItem,
  RecentSafeguardingActivity,
  UrgentEscalation,
} from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-safeguarding-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safeguarding-sidebar.html',
  styleUrl: './safeguarding-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingSidebarComponent {
  readonly healthCategories = input.required<ComplianceHealthCategory[]>();
  readonly urgentEscalations = input.required<UrgentEscalation[]>();
  readonly consentBreakdown = input.required<ConsentQueueBreakdown>();
  readonly recentActivities = input.required<RecentSafeguardingActivity[]>();
  readonly policyChecklist = input.required<PolicyChecklistItem[]>();
  readonly selectedPeriod = input<string>('This Month');

  readonly periodChange = output<string>();
  readonly viewEscalations = output<void>();
  readonly viewConsentQueue = output<void>();
  readonly viewActivities = output<void>();
  readonly viewPolicies = output<void>();
  readonly selectCase = output<string>();

  onPeriodSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.periodChange.emit(value);
  }
}
