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
import {
  ContentActivity,
  ContentComponentItem,
  ContentHealthOverview,
  ContentLibraryAsset,
  CreateCurriculumPackData,
  CurriculumMetric,
  CurriculumPack,
  CurriculumStatus,
  CurriculumTab,
  CurriculumTemplate,
  ReviewQueueItem,
  ReviewQueueSummary,
  WeeklyTopicPlan,
} from './super-admin-curriculum.models';
import {
  CONTENT_COMPONENTS_LIST,
  CONTENT_HEALTH_DATA,
  CURRICULUM_METRICS,
  RECENT_CONTENT_ACTIVITIES,
  REVIEW_QUEUE_SUMMARY,
  SAMPLE_CONTENT_LIBRARY_ASSETS,
  SAMPLE_CURRICULUM_PACKS,
  SAMPLE_CURRICULUM_TEMPLATES,
  SAMPLE_REVIEW_QUEUE_ITEMS,
  SAMPLE_WEEKLY_TOPICS,
} from './super-admin-curriculum.data';

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

  // Curriculum & Content Signals
  readonly curriculumPacks = signal<CurriculumPack[]>(SAMPLE_CURRICULUM_PACKS);
  readonly curriculumMetrics = signal<CurriculumMetric[]>(CURRICULUM_METRICS);
  readonly contentHealth = signal<ContentHealthOverview>(CONTENT_HEALTH_DATA);
  readonly reviewQueueSummary =
    signal<ReviewQueueSummary>(REVIEW_QUEUE_SUMMARY);
  readonly recentContentActivities = signal<ContentActivity[]>(
    RECENT_CONTENT_ACTIVITIES,
  );
  readonly weeklyTopics = signal<WeeklyTopicPlan[]>(SAMPLE_WEEKLY_TOPICS);
  readonly contentComponents = signal<ContentComponentItem[]>(
    CONTENT_COMPONENTS_LIST,
  );
  readonly reviewQueueItems = signal<ReviewQueueItem[]>(
    SAMPLE_REVIEW_QUEUE_ITEMS,
  );
  readonly contentLibraryAssets = signal<ContentLibraryAsset[]>(
    SAMPLE_CONTENT_LIBRARY_ASSETS,
  );
  readonly curriculumTemplates = signal<CurriculumTemplate[]>(
    SAMPLE_CURRICULUM_TEMPLATES,
  );

  readonly selectedCurriculumTab = signal<CurriculumTab>('packs');
  readonly curriculumSearchQuery = signal<string>('');
  readonly selectedCurriculumTypeFilter = signal<string>('All');
  readonly selectedClassLevelFilter = signal<string>('All');
  readonly selectedCurriculumTermFilter = signal<string>('All');
  readonly selectedCurriculumStatusFilter = signal<string>('All');
  readonly standardsCoverage = signal<number>(81);

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

  // Curriculum Computeds
  readonly totalCurriculumPacksCount = computed(
    () => this.curriculumPacks().length,
  );
  readonly approvedPacksCount = computed(
    () => this.curriculumPacks().filter((p) => p.status === 'Approved').length,
  );
  readonly pendingReviewPacksCount = computed(
    () =>
      this.curriculumPacks().filter((p) => p.status === 'Pending Review')
        .length,
  );
  readonly draftPacksCount = computed(
    () => this.curriculumPacks().filter((p) => p.status === 'Draft').length,
  );
  readonly needsUpdatePacksCount = computed(
    () =>
      this.curriculumPacks().filter((p) => p.status === 'Needs Update').length,
  );

  readonly filteredCurriculumPacks = computed(() => {
    const list = this.curriculumPacks();
    const query = this.curriculumSearchQuery().toLowerCase().trim();
    const type = this.selectedCurriculumTypeFilter();
    const classLevel = this.selectedClassLevelFilter();
    const term = this.selectedCurriculumTermFilter();
    const status = this.selectedCurriculumStatusFilter();

    return list.filter((pack) => {
      // Type
      if (type !== 'All' && pack.curriculumType !== type) {
        return false;
      }
      // Class Level
      if (classLevel !== 'All' && pack.classLevel !== classLevel) {
        return false;
      }
      // Term
      if (term !== 'All' && pack.term !== term) {
        return false;
      }
      // Status
      if (status !== 'All' && pack.status !== status) {
        return false;
      }
      // Search
      if (query) {
        const matchesName = pack.name.toLowerCase().includes(query);
        const matchesSubject = pack.subject.toLowerCase().includes(query);
        const matchesClass = pack.classLevel.toLowerCase().includes(query);
        const matchesAuthor = pack.author.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesSubject &&
          !matchesClass &&
          !matchesAuthor
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

  // Curriculum Methods
  setCurriculumTab(tab: CurriculumTab): void {
    this.selectedCurriculumTab.set(tab);
  }

  setCurriculumSearch(query: string): void {
    this.curriculumSearchQuery.set(query);
  }

  setCurriculumTypeFilter(type: string): void {
    this.selectedCurriculumTypeFilter.set(type);
  }

  setClassLevelFilter(level: string): void {
    this.selectedClassLevelFilter.set(level);
  }

  setCurriculumTermFilter(term: string): void {
    this.selectedCurriculumTermFilter.set(term);
  }

  setCurriculumStatusFilter(status: string): void {
    this.selectedCurriculumStatusFilter.set(status);
  }

  resetCurriculumFilters(): void {
    this.curriculumSearchQuery.set('');
    this.selectedCurriculumTypeFilter.set('All');
    this.selectedClassLevelFilter.set('All');
    this.selectedCurriculumTermFilter.set('All');
    this.selectedCurriculumStatusFilter.set('All');
  }

  createCurriculumPack(packData: CreateCurriculumPackData): CurriculumPack {
    const newPack: CurriculumPack = {
      id: `CP-${(this.curriculumPacks().length + 1001).toString()}`,
      name: packData.packName,
      classLevel: packData.classLevel,
      subject: packData.subject,
      term: packData.term,
      topicsCount: packData.weeklyTopics.length,
      completionPercentage: 92,
      status: (packData.publishStatus.includes('Draft')
        ? 'Draft'
        : 'Pending Review') as CurriculumStatus,
      version: packData.version || 'v1.0',
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      author: 'Super Admin',
      curriculumType: packData.curriculumType,
      academicSession: packData.academicSession,
      description: packData.description,
      includedAssetsCount: 132,
      componentsCount: `${packData.contentComponents.length} of 10`,
      standardsCoverage: 92,
    };

    this.curriculumPacks.update((prev) => [newPack, ...prev]);

    // Add activity
    const activity: ContentActivity = {
      id: `act-${Date.now()}`,
      packName: newPack.name,
      action: 'Curriculum pack created',
      timeAgo: 'Just now',
      type: 'uploaded',
      icon: 'add_circle',
    };
    this.recentContentActivities.update((prev) => [activity, ...prev]);

    return newPack;
  }

  updateCurriculumPackStatus(id: string, status: CurriculumStatus): void {
    this.curriculumPacks.update((list) =>
      list.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  }

  deleteCurriculumPack(id: string): void {
    this.curriculumPacks.update((list) => list.filter((p) => p.id !== id));
  }

  addWeeklyTopic(topic: Omit<WeeklyTopicPlan, 'id'>): WeeklyTopicPlan {
    const newTopic: WeeklyTopicPlan = {
      ...topic,
      id: `wt-${Date.now()}`,
    };
    this.weeklyTopics.update((prev) => [...prev, newTopic]);
    return newTopic;
  }

  updateWeeklyTopic(id: string, updates: Partial<WeeklyTopicPlan>): void {
    this.weeklyTopics.update((list) =>
      list.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }

  deleteWeeklyTopic(id: string): void {
    this.weeklyTopics.update((list) => list.filter((t) => t.id !== id));
  }

  toggleContentComponent(id: string): void {
    this.contentComponents.update((list) =>
      list.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)),
    );
  }

  approveReviewQueueItem(id: string): void {
    this.reviewQueueItems.update((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Under Review' as const,
            }
          : item,
      ),
    );
  }

  requestChangesReviewQueueItem(id: string): void {
    this.reviewQueueItems.update((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Revision Requested' as const,
            }
          : item,
      ),
    );
  }
}
