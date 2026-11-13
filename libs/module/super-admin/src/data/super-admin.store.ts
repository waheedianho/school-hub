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
import {
  InstitutionActivity,
  OnboardingBreakdown,
  OnboardSchoolFormData,
  SchoolInstitution,
  SchoolNeedingAttention,
  SchoolsMetric,
  SchoolStatus,
} from './super-admin-schools.models';
import {
  ONBOARDING_BREAKDOWN_DATA,
  RECENT_INSTITUTION_ACTIVITIES,
  SAMPLE_SCHOOLS_DIRECTORY,
  SCHOOLS_ATTENTION_STATS,
  SCHOOLS_METRICS,
} from './super-admin-schools.data';

export type SchoolTab = 'all' | 'onboarding' | 'pending' | 'archived';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminStore {
  // Dashboard Signals
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

  // Schools Directory Signals
  readonly schools = signal<SchoolInstitution[]>(SAMPLE_SCHOOLS_DIRECTORY);
  readonly schoolsMetrics = signal<SchoolsMetric[]>(SCHOOLS_METRICS);
  readonly onboardingBreakdown = signal<OnboardingBreakdown>(
    ONBOARDING_BREAKDOWN_DATA,
  );
  readonly recentActivities = signal<InstitutionActivity[]>(
    RECENT_INSTITUTION_ACTIVITIES,
  );
  readonly attentionStats = signal<SchoolNeedingAttention[]>(
    SCHOOLS_ATTENTION_STATS,
  );

  readonly selectedSchoolTab = signal<SchoolTab>('all');
  readonly schoolSearchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<string>('All');
  readonly selectedPlanFilter = signal<string>('All');
  readonly selectedRegionFilter = signal<string>('All');
  readonly selectedOnboardingStatusFilter = signal<string>('All');

  // Computeds
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

  readonly allSchoolsCount = computed(() => this.schools().length);

  readonly newOnboardingCount = computed(
    () =>
      this.schools().filter(
        (s) =>
          s.onboardingStatus === 'In Progress' ||
          s.onboardingStatus === 'Incomplete',
      ).length,
  );

  readonly pendingVerificationCount = computed(
    () =>
      this.schools().filter(
        (s) => s.onboardingStatus === 'Pending Verification',
      ).length,
  );

  readonly archivedCount = signal<number>(43);

  readonly filteredSchools = computed(() => {
    const list = this.schools();
    const query = this.schoolSearchQuery().toLowerCase().trim();
    const tab = this.selectedSchoolTab();
    const status = this.selectedStatusFilter();
    const plan = this.selectedPlanFilter();
    const region = this.selectedRegionFilter();
    const onboarding = this.selectedOnboardingStatusFilter();

    return list.filter((school) => {
      // Tab filter
      if (tab === 'onboarding') {
        if (
          school.onboardingStatus !== 'In Progress' &&
          school.onboardingStatus !== 'Incomplete'
        ) {
          return false;
        }
      } else if (tab === 'pending') {
        if (school.onboardingStatus !== 'Pending Verification') {
          return false;
        }
      }

      // Status dropdown
      if (status !== 'All' && school.status !== status) {
        return false;
      }

      // Plan dropdown
      if (plan !== 'All' && school.plan !== plan) {
        return false;
      }

      // Region dropdown
      if (region !== 'All' && !school.location.includes(region)) {
        return false;
      }

      // Onboarding dropdown
      if (onboarding !== 'All' && school.onboardingStatus !== onboarding) {
        return false;
      }

      // Search query
      if (query) {
        const matchesName = school.name.toLowerCase().includes(query);
        const matchesDomain = school.domain.toLowerCase().includes(query);
        const matchesAdmin =
          school.adminEmail.toLowerCase().includes(query) ||
          school.adminName.toLowerCase().includes(query);
        const matchesLocation = school.location.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesDomain &&
          !matchesAdmin &&
          !matchesLocation
        ) {
          return false;
        }
      }

      return true;
    });
  });

  // Actions
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

  // School actions
  setSchoolSearchQuery(query: string): void {
    this.schoolSearchQuery.set(query);
  }

  setSchoolTab(tab: SchoolTab): void {
    this.selectedSchoolTab.set(tab);
  }

  setStatusFilter(status: string): void {
    this.selectedStatusFilter.set(status);
  }

  setPlanFilter(plan: string): void {
    this.selectedPlanFilter.set(plan);
  }

  setRegionFilter(region: string): void {
    this.selectedRegionFilter.set(region);
  }

  setOnboardingStatusFilter(status: string): void {
    this.selectedOnboardingStatusFilter.set(status);
  }

  updateSchoolStatus(id: string, status: SchoolStatus): void {
    this.schools.update((list) =>
      list.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  }

  deleteSchool(id: string): void {
    this.schools.update((list) => list.filter((s) => s.id !== id));
  }

  onboardSchool(formData: OnboardSchoolFormData): SchoolInstitution {
    const initials =
      formData.schoolName
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() || '')
        .join('') || 'SC';

    const newSchool: SchoolInstitution = {
      id: `sch-${Date.now().toString().slice(-4)}`,
      name: formData.schoolName,
      code: formData.schoolCode || `SCH-${Date.now().toString().slice(-3)}`,
      domain:
        formData.schoolEmail.split('@')[1] ||
        `${formData.schoolName.toLowerCase().replace(/\s+/g, '')}.edu`,
      initials,
      type: formData.schoolType,
      adminName: `${formData.adminFirstName} ${formData.adminLastName}`.trim(),
      adminEmail: formData.adminEmail,
      adminPhone: formData.adminPhone,
      location: `${formData.stateRegion}, ${formData.country}`,
      country: formData.country,
      stateRegion: formData.stateRegion,
      learnersCount: 0,
      teachersCount: 0,
      plan: formData.plan,
      status: 'Active',
      onboardingStatus: 'Completed',
      lastActivity: 'Just now',
      createdAt: new Date().toISOString().split('T')[0],
      brandColor: formData.primaryBrandColor || '#2563EB',
      academicSession: formData.academicSession,
      currentTerm: formData.currentTerm,
      curriculumType: formData.curriculumType,
      parentConsentRequired: formData.parentConsentRequired,
      tutorVerificationRequired: formData.tutorVerificationRequired,
      enabledModules: formData.enabledModules || [],
    };

    this.schools.update((prev) => [newSchool, ...prev]);

    // Also append an activity log
    const newActivity: InstitutionActivity = {
      id: `act-${Date.now()}`,
      schoolName: newSchool.name,
      action: `New school onboarded (${newSchool.plan} Plan)`,
      timeAgo: 'Just now',
      icon: 'domain_add',
    };
    this.recentActivities.update((prev) => [newActivity, ...prev]);

    return newSchool;
  }
}
