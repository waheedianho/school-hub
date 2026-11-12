import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import { TopMetricsComponent } from './top-metrics/top-metrics';
import { UsageTrendChartComponent } from './usage-trend-chart/usage-trend-chart';
import { SubscriptionStatusCardComponent } from './subscription-status-card/subscription-status-card';
import { ContentReadinessCardComponent } from './content-readiness-card/content-readiness-card';
import { RevenueSummaryCardComponent } from './revenue-summary-card/revenue-summary-card';
import { SchoolsAttentionTableComponent } from './schools-attention-table/schools-attention-table';
import { SupportTicketsCardComponent } from './support-tickets-card/support-tickets-card';
import { SafeguardingAlertsCardComponent } from './safeguarding-alerts-card/safeguarding-alerts-card';
import { QuickActionsCardComponent } from './quick-actions-card/quick-actions-card';
import { PlatformHealthBarComponent } from './platform-health-bar/platform-health-bar';

@Component({
  selector: 'school-hub-super-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopMetricsComponent,
    UsageTrendChartComponent,
    SubscriptionStatusCardComponent,
    ContentReadinessCardComponent,
    RevenueSummaryCardComponent,
    SchoolsAttentionTableComponent,
    SupportTicketsCardComponent,
    SafeguardingAlertsCardComponent,
    QuickActionsCardComponent,
    PlatformHealthBarComponent,
  ],
  templateUrl: './super-admin-dashboard.html',
  styleUrl: './super-admin-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperAdminDashboardComponent {
  readonly store = inject(SuperAdminStore);

  readonly metrics = this.store.metrics;
  readonly usageTrend = this.store.usageTrend;
  readonly subscriptionStatus = this.store.subscriptionStatus;
  readonly contentReadiness = this.store.contentReadiness;
  readonly revenueSummary = this.store.revenueSummary;
  readonly schoolsAttention = this.store.schoolsAttention;
  readonly supportTickets = this.store.supportTickets;
  readonly safeguardingAlerts = this.store.safeguardingAlerts;
  readonly quickActions = this.store.quickActions;
  readonly platformHealth = this.store.platformHealth;
  readonly selectedDateRange = this.store.selectedDateRange;
  readonly selectedUsagePeriod = this.store.selectedUsagePeriod;
  readonly attentionSchoolsCount = this.store.attentionSchoolsCount;

  readonly isDatePickerOpen = signal(false);

  readonly dateRanges = [
    'Today',
    'Last 7 Days',
    'May 1 – May 31, 2025',
    'This Quarter',
    'Year to Date',
  ];

  toggleDatePicker(): void {
    this.isDatePickerOpen.update((v) => !v);
  }

  selectDateRange(range: string): void {
    this.store.setDateRange(range);
    this.isDatePickerOpen.set(false);
  }

  onUsagePeriodChange(period: string): void {
    this.store.setUsagePeriod(period);
  }

  onDismissAlert(id: string): void {
    this.store.dismissAlert(id);
  }

  onResolveTicket(id: string): void {
    this.store.resolveTicket(id);
  }

  refresh(): void {
    this.store.refreshMetrics();
  }
}
