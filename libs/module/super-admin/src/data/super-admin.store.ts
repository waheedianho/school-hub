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
import {
  AccessActivity,
  AccessLogEntry,
  CreateUserData,
  PermissionTemplate,
  PlatformUser,
  RoleDistribution,
  RolePermissionMatrixItem,
  UserRole,
  UsersMetric,
  UserStatus,
  UserTab,
} from './super-admin-users.models';
import {
  PERMISSION_TEMPLATES_DATA,
  RECENT_ACCESS_ACTIVITIES,
  ROLE_DISTRIBUTION_DATA,
  ROLE_PERMISSION_MATRIX,
  SAMPLE_ACCESS_LOGS,
  SAMPLE_PLATFORM_USERS,
  USERS_METRICS,
} from './super-admin-users.data';

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

  // Users & Roles Signals
  readonly users = signal<PlatformUser[]>(SAMPLE_PLATFORM_USERS);
  readonly usersMetrics = signal<UsersMetric[]>(USERS_METRICS);
  readonly roleDistribution = signal<RoleDistribution>(ROLE_DISTRIBUTION_DATA);
  readonly permissionTemplates = signal<PermissionTemplate[]>(
    PERMISSION_TEMPLATES_DATA,
  );
  readonly recentAccessActivities = signal<AccessActivity[]>(
    RECENT_ACCESS_ACTIVITIES,
  );
  readonly permissionMatrix = signal<RolePermissionMatrixItem[]>(
    ROLE_PERMISSION_MATRIX,
  );
  readonly accessLogs = signal<AccessLogEntry[]>(SAMPLE_ACCESS_LOGS);

  readonly selectedUserTab = signal<UserTab>('all');
  readonly userSearchQuery = signal<string>('');
  readonly selectedUserRoleFilter = signal<string>('All');
  readonly selectedUserInstitutionFilter = signal<string>('All');
  readonly selectedUserStatusFilter = signal<string>('All');
  readonly selectedUserMfaFilter = signal<string>('All');
  readonly selectedUserRegionFilter = signal<string>('All');

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

  // Users Computeds
  readonly totalUsersCount = computed(() => this.users().length);
  readonly pendingInvitesCount = computed(
    () =>
      this.users().filter(
        (u) => u.status === 'Invited' || u.status === 'Pending',
      ).length,
  );
  readonly activeUsersCount = computed(
    () => this.users().filter((u) => u.status === 'Active').length,
  );
  readonly suspendedUsersCount = computed(
    () => this.users().filter((u) => u.status === 'Suspended').length,
  );

  readonly filteredUsers = computed(() => {
    const list = this.users();
    const query = this.userSearchQuery().toLowerCase().trim();
    const tab = this.selectedUserTab();
    const role = this.selectedUserRoleFilter();
    const institution = this.selectedUserInstitutionFilter();
    const status = this.selectedUserStatusFilter();
    const mfa = this.selectedUserMfaFilter();
    const region = this.selectedUserRegionFilter();

    return list.filter((user) => {
      // Tab filter
      if (tab === 'pending') {
        if (user.status !== 'Invited' && user.status !== 'Pending') {
          return false;
        }
      }

      // Role filter
      if (role !== 'All' && user.role !== role) {
        return false;
      }

      // Institution filter
      if (institution !== 'All' && user.institution !== institution) {
        return false;
      }

      // Status filter
      if (status !== 'All' && user.status !== status) {
        return false;
      }

      // MFA filter
      if (mfa === 'Enabled' && !user.mfaEnabled) {
        return false;
      }
      if (mfa === 'Not Enabled' && user.mfaEnabled) {
        return false;
      }

      // Region filter
      if (region !== 'All' && user.region !== region) {
        return false;
      }

      // Search query
      if (query) {
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesInst = user.institution.toLowerCase().includes(query);
        const matchesId = user.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesInst && !matchesId) {
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

  // User Actions
  setUserTab(tab: UserTab): void {
    this.selectedUserTab.set(tab);
  }

  setUserSearchQuery(query: string): void {
    this.userSearchQuery.set(query);
  }

  setUserRoleFilter(role: string): void {
    this.selectedUserRoleFilter.set(role);
  }

  setUserInstitutionFilter(institution: string): void {
    this.selectedUserInstitutionFilter.set(institution);
  }

  setUserStatusFilter(status: string): void {
    this.selectedUserStatusFilter.set(status);
  }

  setUserMfaFilter(mfa: string): void {
    this.selectedUserMfaFilter.set(mfa);
  }

  setUserRegionFilter(region: string): void {
    this.selectedUserRegionFilter.set(region);
  }

  createUser(userData: CreateUserData): PlatformUser {
    const initials =
      userData.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() || '')
        .join('') || 'U';

    const newUser: PlatformUser = {
      id: `USR-${(this.users().length + 1).toString().padStart(4, '0')}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      institution: userData.institution,
      status: userData.sendInvite ? 'Invited' : 'Active',
      mfaEnabled: userData.requireMfa,
      lastActive: '—',
      initials,
      avatarColor: '#2563EB',
      phone: userData.phone || '+44 20 7946 0000',
      createdAt: new Date().toISOString().split('T')[0],
      region: 'UK',
      sessionsCount: 0,
    };

    this.users.update((prev) => [newUser, ...prev]);

    // Add activity
    const activity: AccessActivity = {
      id: `act-${Date.now()}`,
      userName: newUser.name,
      action: `created new ${newUser.role} user`,
      timeAgo: 'Just now',
      avatarInitials: initials,
      avatarColor: newUser.avatarColor,
      ipAddress: '127.0.0.1',
    };
    this.recentAccessActivities.update((prev) => [activity, ...prev]);

    return newUser;
  }

  updateUserStatus(id: string, status: UserStatus): void {
    this.users.update((list) =>
      list.map((u) => (u.id === id ? { ...u, status } : u)),
    );
  }

  updateUserRole(id: string, role: UserRole): void {
    this.users.update((list) =>
      list.map((u) => (u.id === id ? { ...u, role } : u)),
    );
  }

  toggleUserMfa(id: string): void {
    this.users.update((list) =>
      list.map((u) => (u.id === id ? { ...u, mfaEnabled: !u.mfaEnabled } : u)),
    );
  }

  deleteUser(id: string): void {
    this.users.update((list) => list.filter((u) => u.id !== id));
  }

  resendInvite(id: string): void {
    this.users.update((list) =>
      list.map((u) =>
        u.id === id
          ? {
              ...u,
              status: 'Invited' as const,
              lastActive: 'Invite resent just now',
            }
          : u,
      ),
    );
  }
}
