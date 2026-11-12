import { computed, Injectable, signal } from '@angular/core';
import {
  ContentReadinessSummary,
  PlatformHealthStatus,
  PlatformUsageDataPoint,
  QuickActionItem,
  RevenueSummary,
  SafeguardingAlert,
  SchoolAttentionItem,
  SubscriptionStatusBreakdown,
  SuperAdminMetric,
  SupportTicketSummary,
} from './super-admin.models';
import {
  CONTENT_READINESS_DATA,
  PLATFORM_HEALTH_DATA,
  PLATFORM_USAGE_TREND,
  RECENT_SUPPORT_TICKETS,
  REVENUE_SUMMARY_DATA,
  SAFEGUARDING_ALERTS,
  SCHOOLS_ATTENTION_DATA,
  SUBSCRIPTION_STATUS_DATA,
  SUPER_ADMIN_METRICS,
  SUPER_ADMIN_QUICK_ACTIONS,
} from './super-admin-dashboard.data';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminStore {
  readonly metrics = signal<SuperAdminMetric[]>(SUPER_ADMIN_METRICS);
  readonly usageTrend = signal<PlatformUsageDataPoint[]>(PLATFORM_USAGE_TREND);
  readonly subscriptionStatus = signal<SubscriptionStatusBreakdown>(
    SUBSCRIPTION_STATUS_DATA,
  );
  readonly contentReadiness = signal<ContentReadinessSummary>(
    CONTENT_READINESS_DATA,
  );
  readonly revenueSummary = signal<RevenueSummary>(REVENUE_SUMMARY_DATA);
  readonly schoolsAttention = signal<SchoolAttentionItem[]>(
    SCHOOLS_ATTENTION_DATA,
  );
  readonly supportTickets = signal<SupportTicketSummary[]>(
    RECENT_SUPPORT_TICKETS,
  );
  readonly safeguardingAlerts =
    signal<SafeguardingAlert[]>(SAFEGUARDING_ALERTS);
  readonly quickActions = signal<QuickActionItem[]>(SUPER_ADMIN_QUICK_ACTIONS);
  readonly platformHealth = signal<PlatformHealthStatus>(PLATFORM_HEALTH_DATA);

  readonly selectedDateRange = signal<string>('May 1 – May 31, 2025');
  readonly selectedUsagePeriod = signal<string>('Last 6 Months');
  readonly selectedRevenuePeriod = signal<string>('This Month');
  readonly lastRefreshed = signal<Date>(new Date());

  readonly attentionSchoolsCount = computed(
    () => this.schoolsAttention().length,
  );

  readonly openTicketsCount = computed(
    () => this.supportTickets().filter((t) => t.status === 'Open').length,
  );

  readonly highAlertsCount = computed(
    () =>
      this.safeguardingAlerts().filter(
        (a) => a.severity === 'High' || a.severity === 'Critical',
      ).length,
  );

  setDateRange(range: string): void {
    this.selectedDateRange.set(range);
  }

  setUsagePeriod(period: string): void {
    this.selectedUsagePeriod.set(period);
  }

  setRevenuePeriod(period: string): void {
    this.selectedRevenuePeriod.set(period);
  }

  dismissAlert(alertId: string): void {
    this.safeguardingAlerts.update((alerts) =>
      alerts.filter((a) => a.id !== alertId),
    );
  }

  resolveTicket(ticketId: string): void {
    this.supportTickets.update((tickets) =>
      tickets.map((t) =>
        t.id === ticketId ? { ...t, status: 'Resolved' as const } : t,
      ),
    );
  }

  refreshMetrics(): void {
    this.lastRefreshed.set(new Date());
  }
}
