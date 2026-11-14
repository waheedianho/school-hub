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
import {
  AssessmentActivity,
  AssessmentHealthOverview,
  AssessmentMetric,
  AssessmentPack,
  AssessmentReviewQueueItem,
  AssessmentReviewQueueSummary,
  AssessmentStatus,
  AssessmentTab,
  AssessmentTemplate,
  CreateAssessmentData,
  QuestionBankItem,
  QuestionCompositionItem,
} from './super-admin-assessments.models';
import {
  ASSESSMENT_HEALTH_DATA,
  ASSESSMENT_METRICS,
  ASSESSMENT_REVIEW_SUMMARY,
  RECENT_ASSESSMENT_ACTIVITIES,
  SAMPLE_ASSESSMENT_PACKS,
  SAMPLE_ASSESSMENT_REVIEW_ITEMS,
  SAMPLE_ASSESSMENT_TEMPLATES,
  SAMPLE_QUESTION_BANK_ITEMS,
  SAMPLE_QUESTION_COMPOSITIONS,
} from './super-admin-assessments.data';
import {
  ActiveInstitution,
  AdoptionInsight,
  AnalyticsMetric,
  AnalyticsPerformanceSummary,
  AssessmentCompletionPoint,
  AttentionSchool,
  HeatmapCell,
  PlatformActivityItem,
  PlatformUsagePoint,
  RegionSpread,
  RoleUsageBreakdown,
  SubjectConsumption,
} from './super-admin-analytics.models';
import {
  ADOPTION_INSIGHTS_DATA,
  ANALYTICS_METRICS,
  ASSESSMENT_COMPLETION_TREND_DATA,
  ATTENTION_SCHOOLS_DATA,
  ENGAGEMENT_HEATMAP_DATA,
  PERFORMANCE_SUMMARY_DATA,
  PLATFORM_USAGE_TREND_DATA,
  RECENT_PLATFORM_ACTIVITIES,
  REGION_SPREAD_DATA,
  ROLE_USAGE_DATA,
  SUBJECT_CONSUMPTION_DATA,
  TOP_ACTIVE_INSTITUTIONS,
} from './super-admin-analytics.data';
import {
  BillingHealth,
  PlanDistributionItem,
  RecentBillingActivity,
  RenewalQueueItem,
  RevenueOverviewCategory,
  SchoolSubscription,
  SubscriptionBottomMetric,
  SubscriptionInvoice,
  SubscriptionMetric,
  SubscriptionPlanDefinition,
  SubscriptionStatus,
} from './super-admin-subscriptions.models';
import {
  INITIAL_BILLING_HEALTH,
  INITIAL_BOTTOM_METRICS,
  INITIAL_PLAN_DISTRIBUTION,
  INITIAL_RECENT_BILLING_ACTIVITY,
  INITIAL_RENEWAL_QUEUE,
  INITIAL_REVENUE_OVERVIEW,
  INITIAL_SCHOOL_SUBSCRIPTIONS,
  INITIAL_SUBSCRIPTION_INVOICES,
  INITIAL_SUBSCRIPTION_METRICS,
  INITIAL_SUBSCRIPTION_PLANS,
} from './super-admin-subscriptions.data';
import {
  CreateReportFormData,
  PlatformReport,
  QuickReportTemplate,
  RecentReportActivity,
  ReportBottomMetric,
  ReportHealthCategory,
  ReportMetric,
  ScheduleReportFormData,
  ScheduledReportQueueItem,
} from './super-admin-reports.models';
import {
  INITIAL_PLATFORM_REPORTS,
  INITIAL_QUICK_REPORT_TEMPLATES,
  INITIAL_RECENT_REPORT_ACTIVITIES,
  INITIAL_REPORT_BOTTOM_METRICS,
  INITIAL_REPORT_HEALTH_CATEGORIES,
  INITIAL_REPORT_METRICS,
  INITIAL_SCHEDULED_REPORT_QUEUE,
} from './super-admin-reports.data';
import {
  ComplianceHealthCategory,
  ConsentQueueBreakdown,
  CreateSafeguardingCaseFormData,
  PolicyChecklistItem,
  RecentSafeguardingActivity,
  SafeguardingBottomMetric,
  SafeguardingCase,
  SafeguardingCaseStatus,
  SafeguardingMetric,
  SafeguardingTab,
  UrgentEscalation,
} from './super-admin-safeguarding.models';
import {
  INITIAL_COMPLIANCE_HEALTH_CATEGORIES,
  INITIAL_CONSENT_BREAKDOWN,
  INITIAL_POLICY_CHECKLIST,
  INITIAL_RECENT_SAFEGUARDING_ACTIVITIES,
  INITIAL_SAFEGUARDING_BOTTOM_METRICS,
  INITIAL_SAFEGUARDING_CASES,
  INITIAL_SAFEGUARDING_METRICS,
  INITIAL_URGENT_ESCALATIONS,
} from './super-admin-safeguarding.data';
import {
  CreateTicketFormData,
  RecentSupportActivity,
  SLAQueueBreakdown,
  SupportBottomMetric,
  SupportHealthCategory,
  SupportMetric,
  SupportTab,
  SupportTicket,
  SupportUrgentEscalation,
  TicketStatus,
  TimelineEntry,
} from './super-admin-support.models';
import {
  INITIAL_RECENT_SUPPORT_ACTIVITIES,
  INITIAL_SLA_QUEUE_BREAKDOWN,
  INITIAL_SUPPORT_BOTTOM_METRICS,
  INITIAL_SUPPORT_HEALTH_CATEGORIES,
  INITIAL_SUPPORT_METRICS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_SUPPORT_URGENT_ESCALATIONS,
} from './super-admin-support.data';
import {
  ApprovalQueueItem,
  CreateResourceFormData,
  MostUsedResourceType,
  RecentUploadActivity,
  ResourceBottomMetric,
  ResourceCategoryTab,
  ResourceHealthCategory,
  ResourceItem,
  ResourceMetric,
  ResourceStatus,
} from './super-admin-resources.models';
import {
  INITIAL_APPROVAL_QUEUE,
  INITIAL_MOST_USED_TYPES,
  INITIAL_RECENT_UPLOAD_ACTIVITIES,
  INITIAL_RESOURCE_BOTTOM_METRICS,
  INITIAL_RESOURCE_HEALTH,
  INITIAL_RESOURCE_METRICS,
  INITIAL_RESOURCES,
  INITIAL_UPLOAD_BOTTOM_METRICS,
} from './super-admin-resources.data';

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

  // Assessments & Question Bank Signals
  readonly assessmentPacks = signal<AssessmentPack[]>(SAMPLE_ASSESSMENT_PACKS);
  readonly assessmentMetrics = signal<AssessmentMetric[]>(ASSESSMENT_METRICS);
  readonly assessmentHealth = signal<AssessmentHealthOverview>(
    ASSESSMENT_HEALTH_DATA,
  );
  readonly assessmentReviewSummary = signal<AssessmentReviewQueueSummary>(
    ASSESSMENT_REVIEW_SUMMARY,
  );
  readonly recentAssessmentActivities = signal<AssessmentActivity[]>(
    RECENT_ASSESSMENT_ACTIVITIES,
  );
  readonly questionBank = signal<QuestionBankItem[]>(
    SAMPLE_QUESTION_BANK_ITEMS,
  );
  readonly assessmentReviewQueue = signal<AssessmentReviewQueueItem[]>(
    SAMPLE_ASSESSMENT_REVIEW_ITEMS,
  );
  readonly assessmentTemplates = signal<AssessmentTemplate[]>(
    SAMPLE_ASSESSMENT_TEMPLATES,
  );
  readonly questionCompositions = signal<QuestionCompositionItem[]>(
    SAMPLE_QUESTION_COMPOSITIONS,
  );

  readonly selectedAssessmentTab = signal<AssessmentTab>('packs');
  readonly assessmentSearchQuery = signal<string>('');
  readonly selectedAssessmentSubjectFilter = signal<string>('All');
  readonly selectedAssessmentClassFilter = signal<string>('All');
  readonly selectedAssessmentTermFilter = signal<string>('All');
  readonly selectedAssessmentTypeFilter = signal<string>('All');
  readonly selectedAssessmentStatusFilter = signal<string>('All');
  readonly assessmentStandardsCoverage = signal<number>(92);

  // Platform Analytics Signals
  readonly analyticsMetrics = signal<AnalyticsMetric[]>(ANALYTICS_METRICS);
  readonly platformUsageTrendPoints = signal<PlatformUsagePoint[]>(
    PLATFORM_USAGE_TREND_DATA,
  );
  readonly topActiveInstitutions = signal<ActiveInstitution[]>(
    TOP_ACTIVE_INSTITUTIONS,
  );
  readonly roleUsage = signal<RoleUsageBreakdown[]>(ROLE_USAGE_DATA);
  readonly assessmentCompletionTrend = signal<AssessmentCompletionPoint[]>(
    ASSESSMENT_COMPLETION_TREND_DATA,
  );
  readonly subjectConsumption = signal<SubjectConsumption[]>(
    SUBJECT_CONSUMPTION_DATA,
  );
  readonly regionSpread = signal<RegionSpread[]>(REGION_SPREAD_DATA);
  readonly engagementHeatmap = signal<HeatmapCell[]>(ENGAGEMENT_HEATMAP_DATA);
  readonly attentionSchoolsList = signal<AttentionSchool[]>(
    ATTENTION_SCHOOLS_DATA,
  );
  readonly adoptionInsights = signal<AdoptionInsight[]>(ADOPTION_INSIGHTS_DATA);
  readonly recentPlatformActivityItems = signal<PlatformActivityItem[]>(
    RECENT_PLATFORM_ACTIVITIES,
  );
  readonly performanceSummary = signal<AnalyticsPerformanceSummary>(
    PERFORMANCE_SUMMARY_DATA,
  );
  readonly selectedAnalyticsDateRange = signal<string>('May 12 – May 18, 2025');
  readonly selectedUsageTrendPeriod = signal<string>('Last 30 Days');
  readonly selectedActiveInstitutionsPeriod = signal<string>('Last 30 Days');
  readonly selectedAssessmentTrendPeriod = signal<string>('Last 30 Days');
  readonly selectedSubjectConsumptionPeriod = signal<string>('Last 30 Days');
  readonly selectedHeatmapPeriod = signal<string>('Last 30 Days');

  // Subscriptions & Billing Signals
  readonly subscriptionMetrics = signal<SubscriptionMetric[]>(
    INITIAL_SUBSCRIPTION_METRICS,
  );
  readonly schoolSubscriptions = signal<SchoolSubscription[]>(
    INITIAL_SCHOOL_SUBSCRIPTIONS,
  );
  readonly subscriptionPlans = signal<SubscriptionPlanDefinition[]>(
    INITIAL_SUBSCRIPTION_PLANS,
  );
  readonly subscriptionInvoices = signal<SubscriptionInvoice[]>(
    INITIAL_SUBSCRIPTION_INVOICES,
  );
  readonly subscriptionBottomMetrics = signal<SubscriptionBottomMetric[]>(
    INITIAL_BOTTOM_METRICS,
  );
  readonly revenueOverview = signal<RevenueOverviewCategory[]>(
    INITIAL_REVENUE_OVERVIEW,
  );
  readonly renewalQueue = signal<RenewalQueueItem[]>(INITIAL_RENEWAL_QUEUE);
  readonly recentBillingActivity = signal<RecentBillingActivity[]>(
    INITIAL_RECENT_BILLING_ACTIVITY,
  );
  readonly planDistribution = signal<PlanDistributionItem[]>(
    INITIAL_PLAN_DISTRIBUTION,
  );
  readonly billingHealth = signal<BillingHealth>(INITIAL_BILLING_HEALTH);

  readonly selectedSubscriptionTab = signal<string>('Subscription Plans');
  readonly subscriptionsSearch = signal<string>('');
  readonly selectedSubscriptionPlanFilter = signal<string>('All Plans');
  readonly selectedSubscriptionStatusFilter = signal<string>(
    'All Billing Statuses',
  );
  readonly selectedRenewalDateSort = signal<'asc' | 'desc' | 'none'>('asc');
  readonly subscriptionsCurrentPage = signal<number>(1);
  readonly subscriptionsPageSize = signal<number>(7);
  readonly selectedSubscriptionsDateRange = signal<string>(
    'May 12 – May 18, 2025',
  );

  // Reports Signals
  readonly reportMetrics = signal<ReportMetric[]>(INITIAL_REPORT_METRICS);
  readonly platformReports = signal<PlatformReport[]>(INITIAL_PLATFORM_REPORTS);
  readonly reportBottomMetrics = signal<ReportBottomMetric[]>(
    INITIAL_REPORT_BOTTOM_METRICS,
  );
  readonly reportHealthCategories = signal<ReportHealthCategory[]>(
    INITIAL_REPORT_HEALTH_CATEGORIES,
  );
  readonly scheduledReportQueue = signal<ScheduledReportQueueItem[]>(
    INITIAL_SCHEDULED_REPORT_QUEUE,
  );
  readonly recentReportActivities = signal<RecentReportActivity[]>(
    INITIAL_RECENT_REPORT_ACTIVITIES,
  );
  readonly quickReportTemplates = signal<QuickReportTemplate[]>(
    INITIAL_QUICK_REPORT_TEMPLATES,
  );

  readonly selectedReportTab = signal<string>('Academic Reports');
  readonly reportsSearchQuery = signal<string>('');
  readonly selectedReportsSchoolFilter = signal<string>('All Schools');
  readonly selectedReportsTypeFilter = signal<string>('All Report Types');
  readonly selectedReportsDateRange = signal<string>('May 1 – May 31, 2025');
  readonly selectedReportsStatusFilter = signal<string>('All Statuses');
  readonly selectedReportHealthPeriod = signal<string>('This Month');
  readonly reportsCurrentPage = signal<number>(1);
  readonly reportsPageSize = signal<number>(7);

  // Safeguarding & Compliance Signals
  readonly safeguardingMetrics = signal<SafeguardingMetric[]>(
    INITIAL_SAFEGUARDING_METRICS,
  );
  readonly safeguardingCases = signal<SafeguardingCase[]>(
    INITIAL_SAFEGUARDING_CASES,
  );
  readonly safeguardingBottomMetrics = signal<SafeguardingBottomMetric[]>(
    INITIAL_SAFEGUARDING_BOTTOM_METRICS,
  );
  readonly complianceHealthCategories = signal<ComplianceHealthCategory[]>(
    INITIAL_COMPLIANCE_HEALTH_CATEGORIES,
  );
  readonly urgentEscalations = signal<UrgentEscalation[]>(
    INITIAL_URGENT_ESCALATIONS,
  );
  readonly consentQueueBreakdown = signal<ConsentQueueBreakdown>(
    INITIAL_CONSENT_BREAKDOWN,
  );
  readonly recentSafeguardingActivities = signal<RecentSafeguardingActivity[]>(
    INITIAL_RECENT_SAFEGUARDING_ACTIVITIES,
  );
  readonly policyChecklist = signal<PolicyChecklistItem[]>(
    INITIAL_POLICY_CHECKLIST,
  );

  readonly selectedSafeguardingTab = signal<SafeguardingTab>('Incident Queue');
  readonly safeguardingSearchQuery = signal<string>('');
  readonly selectedSafeguardingSchoolFilter = signal<string>('All Schools');
  readonly selectedSafeguardingSeverityFilter =
    signal<string>('All Severities');
  readonly selectedSafeguardingStatusFilter = signal<string>('All Statuses');
  readonly selectedSafeguardingDateRange = signal<string>(
    'May 1 – May 31, 2025',
  );
  readonly selectedCompliancePeriod = signal<string>('This Month');
  readonly safeguardingCurrentPage = signal<number>(1);
  readonly safeguardingPageSize = signal<number>(8);

  // Support Centre Signals
  readonly supportMetrics = signal<SupportMetric[]>(INITIAL_SUPPORT_METRICS);
  readonly allSupportTickets = signal<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);
  readonly supportBottomMetrics = signal<SupportBottomMetric[]>(
    INITIAL_SUPPORT_BOTTOM_METRICS,
  );
  readonly supportHealthCategories = signal<SupportHealthCategory[]>(
    INITIAL_SUPPORT_HEALTH_CATEGORIES,
  );
  readonly supportUrgentEscalations = signal<SupportUrgentEscalation[]>(
    INITIAL_SUPPORT_URGENT_ESCALATIONS,
  );
  readonly slaQueueBreakdown = signal<SLAQueueBreakdown>(
    INITIAL_SLA_QUEUE_BREAKDOWN,
  );
  readonly recentSupportActivities = signal<RecentSupportActivity[]>(
    INITIAL_RECENT_SUPPORT_ACTIVITIES,
  );

  readonly selectedSupportTab = signal<SupportTab>('All Tickets');
  readonly supportSearchQuery = signal<string>('');
  readonly selectedSupportSchoolFilter = signal<string>('All Schools');
  readonly selectedSupportCategoryFilter = signal<string>('All Categories');
  readonly selectedSupportPriorityFilter = signal<string>('All Priorities');
  readonly selectedSupportStatusFilter = signal<string>('All Statuses');
  readonly selectedSupportDateRange = signal<string>('May 1 – May 31, 2025');
  readonly supportCurrentPage = signal<number>(1);
  readonly supportPageSize = signal<number>(10);

  // Resources Library Signals
  readonly resourceMetrics = signal<ResourceMetric[]>(INITIAL_RESOURCE_METRICS);
  readonly allResources = signal<ResourceItem[]>(INITIAL_RESOURCES);
  readonly resourceBottomMetrics = signal<ResourceBottomMetric[]>(
    INITIAL_RESOURCE_BOTTOM_METRICS,
  );
  readonly uploadBottomMetrics = signal<ResourceBottomMetric[]>(
    INITIAL_UPLOAD_BOTTOM_METRICS,
  );
  readonly resourceHealthCategories = signal<ResourceHealthCategory[]>(
    INITIAL_RESOURCE_HEALTH,
  );
  readonly approvalQueue = signal<ApprovalQueueItem[]>(INITIAL_APPROVAL_QUEUE);
  readonly mostUsedResourceTypes = signal<MostUsedResourceType[]>(
    INITIAL_MOST_USED_TYPES,
  );
  readonly recentUploadActivities = signal<RecentUploadActivity[]>(
    INITIAL_RECENT_UPLOAD_ACTIVITIES,
  );

  readonly selectedResourceTab = signal<ResourceCategoryTab>('All Resources');
  readonly resourceSearchQuery = signal<string>('');
  readonly selectedResourceSchoolFilter = signal<string>('All Schools');
  readonly selectedResourceSubjectFilter = signal<string>('All Subjects');
  readonly selectedResourceClassFilter = signal<string>('All Class Levels');
  readonly selectedResourceTypeFilter = signal<string>('All Resource Types');
  readonly selectedResourceStatusFilter = signal<string>('All Statuses');
  readonly selectedResourceDateRange = signal<string>('May 1 – May 31, 2025');
  readonly resourceCurrentPage = signal<number>(1);
  readonly resourcePageSize = signal<number>(10);

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

  // Assessments & Question Bank Computeds
  readonly totalAssessmentPacksCount = computed(
    () => this.assessmentPacks().length,
  );
  readonly approvedAssessmentPacksCount = computed(
    () => this.assessmentPacks().filter((p) => p.status === 'Approved').length,
  );
  readonly pendingReviewAssessmentPacksCount = computed(
    () =>
      this.assessmentPacks().filter((p) => p.status === 'Pending Review')
        .length,
  );
  readonly draftAssessmentPacksCount = computed(
    () => this.assessmentPacks().filter((p) => p.status === 'Draft').length,
  );
  readonly needsUpdateAssessmentPacksCount = computed(
    () =>
      this.assessmentPacks().filter((p) => p.status === 'Needs Update').length,
  );

  readonly filteredAssessmentPacks = computed(() => {
    const list = this.assessmentPacks();
    const query = this.assessmentSearchQuery().toLowerCase().trim();
    const subject = this.selectedAssessmentSubjectFilter();
    const classLevel = this.selectedAssessmentClassFilter();
    const term = this.selectedAssessmentTermFilter();
    const type = this.selectedAssessmentTypeFilter();
    const status = this.selectedAssessmentStatusFilter();

    return list.filter((pack) => {
      // Subject
      if (subject !== 'All' && pack.subject !== subject) {
        return false;
      }
      // Class Level
      if (classLevel !== 'All' && pack.classLevel !== classLevel) {
        return false;
      }
      // Term
      if (term !== 'All' && pack.term && pack.term !== term) {
        return false;
      }
      // Type
      if (type !== 'All' && pack.type !== type) {
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
        const matchesCode = pack.code?.toLowerCase().includes(query) ?? false;
        if (
          !matchesName &&
          !matchesSubject &&
          !matchesClass &&
          !matchesAuthor &&
          !matchesCode
        ) {
          return false;
        }
      }
      return true;
    });
  });

  readonly filteredQuestionBank = computed(() => {
    const list = this.questionBank();
    const query = this.assessmentSearchQuery().toLowerCase().trim();
    const subject = this.selectedAssessmentSubjectFilter();
    const classLevel = this.selectedAssessmentClassFilter();

    return list.filter((item) => {
      if (subject !== 'All' && item.subject !== subject) {
        return false;
      }
      if (classLevel !== 'All' && item.classLevel !== classLevel) {
        return false;
      }
      if (query) {
        const matchesText = item.questionText.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        const matchesTag =
          item.misconceptionTag?.toLowerCase().includes(query) ?? false;
        if (!matchesText && !matchesCode && !matchesTopic && !matchesTag) {
          return false;
        }
      }
      return true;
    });
  });

  // Platform Analytics Computeds
  readonly totalActiveLearnersCount = computed(() => {
    return this.roleUsage().find((r) => r.role === 'Learners')?.count ?? 12935;
  });
  readonly totalActiveSchoolsCount = computed(() => {
    return (
      this.regionSpread().find((r) => r.region === 'Total')?.institutions ?? 248
    );
  });

  // Subscriptions & Billing Computeds
  readonly filteredSubscriptions = computed(() => {
    const list = this.schoolSubscriptions();
    const tab = this.selectedSubscriptionTab();
    const search = this.subscriptionsSearch().trim().toLowerCase();
    const planFilter = this.selectedSubscriptionPlanFilter();
    const statusFilter = this.selectedSubscriptionStatusFilter();
    const sort = this.selectedRenewalDateSort();

    let result = list.filter((sub) => {
      // Tab filter
      if (tab === 'Active Billing' && sub.status !== 'Active') {
        return false;
      }
      if (
        tab === 'Renewals' &&
        sub.status !== 'Expiring Soon' &&
        sub.renewalRemainingDays > 45
      ) {
        return false;
      }
      if (
        tab === 'Payment Issues' &&
        sub.status !== 'Payment Failed' &&
        sub.status !== 'Suspended'
      ) {
        return false;
      }

      // Plan filter
      if (planFilter !== 'All Plans' && sub.plan !== planFilter) {
        return false;
      }

      // Status filter
      if (
        statusFilter !== 'All Billing Statuses' &&
        sub.status !== statusFilter
      ) {
        return false;
      }

      // Search
      if (search) {
        const matchesName = sub.schoolName.toLowerCase().includes(search);
        const matchesDomain = sub.domain.toLowerCase().includes(search);
        const matchesPlan = sub.plan.toLowerCase().includes(search);
        if (!matchesName && !matchesDomain && !matchesPlan) {
          return false;
        }
      }

      return true;
    });

    if (sort !== 'none') {
      result = [...result].sort((a, b) => {
        const aVal = a.isExpired ? -1 : a.renewalRemainingDays;
        const bVal = b.isExpired ? -1 : b.renewalRemainingDays;
        return sort === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  });

  readonly totalSubscriptionsCount = computed(
    () => this.filteredSubscriptions().length,
  );

  readonly paginatedSubscriptions = computed(() => {
    const list = this.filteredSubscriptions();
    const page = this.subscriptionsCurrentPage();
    const size = this.subscriptionsPageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalSubscriptionsPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        this.filteredSubscriptions().length / this.subscriptionsPageSize(),
      ),
    );
  });

  // Reports Computeds
  readonly filteredPlatformReports = computed(() => {
    const list = this.platformReports();
    const tab = this.selectedReportTab();
    const search = this.reportsSearchQuery().trim().toLowerCase();
    const schoolFilter = this.selectedReportsSchoolFilter();
    const typeFilter = this.selectedReportsTypeFilter();
    const statusFilter = this.selectedReportsStatusFilter();

    return list.filter((rep) => {
      // Tab category filter
      if (
        tab === 'School Performance' &&
        rep.category !== 'School Performance'
      ) {
        return false;
      }
      if (
        tab === 'Subscription Reports' &&
        rep.category !== 'Subscription Reports'
      ) {
        return false;
      }
      if (tab === 'Usage Reports' && rep.category !== 'Usage Reports') {
        return false;
      }
      if (
        tab === 'Safeguarding Reports' &&
        rep.category !== 'Safeguarding Reports'
      ) {
        return false;
      }
      if (tab === 'Custom Reports' && rep.category !== 'Custom Reports') {
        return false;
      }

      // School filter
      if (schoolFilter !== 'All Schools' && rep.scope !== schoolFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'All Report Types') {
        const matchesCategory = rep.category === typeFilter;
        const matchesFormat = rep.format.includes(typeFilter);
        if (!matchesCategory && !matchesFormat) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'All Statuses' && rep.status !== statusFilter) {
        return false;
      }

      // Search
      if (search) {
        const matchesName = rep.name.toLowerCase().includes(search);
        const matchesDesc = rep.description.toLowerCase().includes(search);
        const matchesOwner = rep.ownerName.toLowerCase().includes(search);
        if (!matchesName && !matchesDesc && !matchesOwner) {
          return false;
        }
      }

      return true;
    });
  });

  readonly totalPlatformReportsCount = computed(
    () => this.filteredPlatformReports().length,
  );

  readonly paginatedPlatformReports = computed(() => {
    const list = this.filteredPlatformReports();
    const page = this.reportsCurrentPage();
    const size = this.reportsPageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalPlatformReportsPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(this.filteredPlatformReports().length / this.reportsPageSize()),
    );
  });

  // Safeguarding & Compliance Computeds
  readonly filteredSafeguardingCases = computed(() => {
    const list = this.safeguardingCases();
    const tab = this.selectedSafeguardingTab();
    const search = this.safeguardingSearchQuery().trim().toLowerCase();
    const schoolFilter = this.selectedSafeguardingSchoolFilter();
    const severityFilter = this.selectedSafeguardingSeverityFilter();
    const statusFilter = this.selectedSafeguardingStatusFilter();

    return list.filter((item) => {
      // Tab filter
      if (
        tab === 'Flagged Communications' &&
        item.category !== 'Inappropriate Communication'
      ) {
        return false;
      }
      if (
        tab === 'Consent & Permissions' &&
        item.category !== 'Consent Pending' &&
        item.category !== 'Consent Withdrawal'
      ) {
        return false;
      }
      if (
        tab === 'Policy Compliance' &&
        item.category !== 'Policy Breach' &&
        item.category !== 'Data Privacy Concern'
      ) {
        return false;
      }
      if (
        tab === 'Escalations' &&
        item.status !== 'Escalated' &&
        item.severity !== 'Critical'
      ) {
        return false;
      }
      if (
        tab === 'Audit Reviews' &&
        item.status !== 'Resolved' &&
        item.status !== 'Under Review'
      ) {
        return false;
      }

      // School filter
      if (schoolFilter !== 'All Schools' && item.institution !== schoolFilter) {
        return false;
      }

      // Severity filter
      if (
        severityFilter !== 'All Severities' &&
        item.severity !== severityFilter
      ) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'All Statuses' && item.status !== statusFilter) {
        return false;
      }

      // Search keyword
      if (search) {
        const matchesId = item.id.toLowerCase().includes(search);
        const matchesInst = item.institution.toLowerCase().includes(search);
        const matchesCat = item.category.toLowerCase().includes(search);
        const matchesReporter = item.reportedBy.name
          .toLowerCase()
          .includes(search);
        const matchesAssignee = item.assignedTo.name
          .toLowerCase()
          .includes(search);
        const matchesDetails =
          item.details?.toLowerCase().includes(search) ?? false;
        if (
          !matchesId &&
          !matchesInst &&
          !matchesCat &&
          !matchesReporter &&
          !matchesAssignee &&
          !matchesDetails
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly totalSafeguardingCasesCount = computed(
    () => this.filteredSafeguardingCases().length,
  );

  readonly paginatedSafeguardingCases = computed(() => {
    const list = this.filteredSafeguardingCases();
    const page = this.safeguardingCurrentPage();
    const size = this.safeguardingPageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalSafeguardingPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        this.filteredSafeguardingCases().length / this.safeguardingPageSize(),
      ),
    );
  });

  // Support Centre Computeds
  readonly filteredSupportTickets = computed(() => {
    const list = this.allSupportTickets();
    const tab = this.selectedSupportTab();
    const search = this.supportSearchQuery().trim().toLowerCase();
    const schoolFilter = this.selectedSupportSchoolFilter();
    const categoryFilter = this.selectedSupportCategoryFilter();
    const priorityFilter = this.selectedSupportPriorityFilter();
    const statusFilter = this.selectedSupportStatusFilter();

    return list.filter((ticket) => {
      // Tab filter
      if (
        tab === 'Escalations' &&
        ticket.status !== 'Escalated' &&
        ticket.priority !== 'Critical'
      ) {
        return false;
      }
      if (tab === 'Onboarding' && ticket.issueType !== 'Onboarding Support') {
        return false;
      }
      if (
        tab === 'Billing Issues' &&
        ticket.issueType !== 'Billing Issue' &&
        ticket.issueType !== 'Billing Invoice Error'
      ) {
        return false;
      }
      if (
        tab === 'Bugs & Technical' &&
        ticket.issueType !== 'Login Problem' &&
        ticket.issueType !== 'Content Upload Error' &&
        ticket.issueType !== 'Report Generation Bug' &&
        ticket.issueType !== 'Live Class Failure'
      ) {
        return false;
      }
      if (
        tab === 'Feature Requests' &&
        ticket.issueType !== 'Feature Request'
      ) {
        return false;
      }
      if (
        tab === 'Resolved' &&
        ticket.status !== 'Resolved' &&
        ticket.status !== 'Closed'
      ) {
        return false;
      }

      // School filter
      if (schoolFilter !== 'All Schools' && ticket.school !== schoolFilter) {
        return false;
      }

      // Category filter
      if (
        categoryFilter !== 'All Categories' &&
        ticket.issueType !== categoryFilter
      ) {
        return false;
      }

      // Priority filter
      if (
        priorityFilter !== 'All Priorities' &&
        ticket.priority !== priorityFilter
      ) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'All Statuses' && ticket.status !== statusFilter) {
        return false;
      }

      // Search keyword
      if (search) {
        const matchesId = ticket.id.toLowerCase().includes(search);
        const matchesTitle = ticket.title.toLowerCase().includes(search);
        const matchesSchool = ticket.school.toLowerCase().includes(search);
        const matchesIssue = ticket.issueType.toLowerCase().includes(search);
        const matchesRaised = ticket.raisedBy.name
          .toLowerCase()
          .includes(search);
        const matchesAssigned = ticket.assignedTo.name
          .toLowerCase()
          .includes(search);
        if (
          !matchesId &&
          !matchesTitle &&
          !matchesSchool &&
          !matchesIssue &&
          !matchesRaised &&
          !matchesAssigned
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly totalSupportTicketsCount = computed(
    () => this.filteredSupportTickets().length,
  );

  readonly paginatedSupportTickets = computed(() => {
    const list = this.filteredSupportTickets();
    const page = this.supportCurrentPage();
    const size = this.supportPageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalSupportPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(this.filteredSupportTickets().length / this.supportPageSize()),
    );
  });

  // Resources Library Computeds
  readonly filteredResources = computed(() => {
    const tab = this.selectedResourceTab();
    const query = this.resourceSearchQuery().trim().toLowerCase();
    const schoolFilter = this.selectedResourceSchoolFilter();
    const subjectFilter = this.selectedResourceSubjectFilter();
    const classFilter = this.selectedResourceClassFilter();
    const typeFilter = this.selectedResourceTypeFilter();
    const statusFilter = this.selectedResourceStatusFilter();

    return this.allResources().filter((res) => {
      // Category Tab
      if (tab !== 'All Resources' && res.category !== tab) {
        return false;
      }

      // School Filter
      if (schoolFilter !== 'All Schools') {
        const matchesSchool =
          res.source.toLowerCase().includes(schoolFilter.toLowerCase()) ||
          (res.owner &&
            res.owner.toLowerCase().includes(schoolFilter.toLowerCase()));
        if (!matchesSchool) return false;
      }

      // Subject Filter
      if (
        subjectFilter !== 'All Subjects' &&
        res.subject.toLowerCase() !== subjectFilter.toLowerCase()
      ) {
        return false;
      }

      // Class Filter
      if (
        classFilter !== 'All Class Levels' &&
        res.classLevel.toLowerCase() !== classFilter.toLowerCase()
      ) {
        return false;
      }

      // Resource Type Filter
      if (
        typeFilter !== 'All Resource Types' &&
        res.category.toLowerCase() !== typeFilter.toLowerCase()
      ) {
        return false;
      }

      // Status Filter
      if (
        statusFilter !== 'All Statuses' &&
        res.status.toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }

      // Search Query
      if (query) {
        const matchesTitle = res.title.toLowerCase().includes(query);
        const matchesDesc = res.description.toLowerCase().includes(query);
        const matchesTopic = res.linkedTopic.toLowerCase().includes(query);
        const matchesPack = res.linkedPack.toLowerCase().includes(query);
        const matchesOwner = res.owner.toLowerCase().includes(query);
        const matchesSource = res.source.toLowerCase().includes(query);
        const matchesTags = res.tags
          ? res.tags.some((t) => t.toLowerCase().includes(query))
          : false;

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesTopic &&
          !matchesPack &&
          !matchesOwner &&
          !matchesSource &&
          !matchesTags
        ) {
          return false;
        }
      }

      return true;
    });
  });

  readonly totalResourcesCount = computed(
    () => this.filteredResources().length,
  );

  readonly paginatedResources = computed(() => {
    const list = this.filteredResources();
    const page = this.resourceCurrentPage();
    const size = this.resourcePageSize();
    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  readonly totalResourcePages = computed(() => {
    return Math.max(
      1,
      Math.ceil(this.filteredResources().length / this.resourcePageSize()),
    );
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

  // Assessments Actions
  setAssessmentTab(tab: AssessmentTab): void {
    this.selectedAssessmentTab.set(tab);
  }

  setAssessmentSearch(query: string): void {
    this.assessmentSearchQuery.set(query);
  }

  setAssessmentSubjectFilter(subject: string): void {
    this.selectedAssessmentSubjectFilter.set(subject);
  }

  setAssessmentClassFilter(classLevel: string): void {
    this.selectedAssessmentClassFilter.set(classLevel);
  }

  setAssessmentTermFilter(term: string): void {
    this.selectedAssessmentTermFilter.set(term);
  }

  setAssessmentTypeFilter(type: string): void {
    this.selectedAssessmentTypeFilter.set(type);
  }

  setAssessmentStatusFilter(status: string): void {
    this.selectedAssessmentStatusFilter.set(status);
  }

  resetAssessmentFilters(): void {
    this.assessmentSearchQuery.set('');
    this.selectedAssessmentSubjectFilter.set('All');
    this.selectedAssessmentClassFilter.set('All');
    this.selectedAssessmentTermFilter.set('All');
    this.selectedAssessmentTypeFilter.set('All');
    this.selectedAssessmentStatusFilter.set('All');
  }

  createAssessmentPack(data: CreateAssessmentData): AssessmentPack {
    const newPack: AssessmentPack = {
      id: 'AP-' + Date.now().toString().slice(-4),
      name: data.assessmentName,
      classLevel: data.classLevel,
      subject: data.subject,
      type: data.assessmentType,
      questionsCount: data.numberOfQuestions,
      totalMarks: data.totalMarks,
      completionPercentage: data.publishStatus === 'Publish' ? 100 : 72,
      status:
        data.publishStatus === 'Publish'
          ? 'Approved'
          : data.publishStatus === 'Submit for Review'
            ? 'Pending Review'
            : 'Draft',
      version: data.version || 'v1.0',
      lastUpdated: 'Just now',
      author: 'Super Admin',
      term: data.term,
      academicSession: data.academicSession,
      code: data.assessmentCode,
      durationMins: data.durationMins,
      deliveryMode: data.deliveryMode,
      description: data.description,
    };
    this.assessmentPacks.update((prev) => [newPack, ...prev]);
    return newPack;
  }

  updateAssessmentStatus(id: string, status: AssessmentStatus): void {
    this.assessmentPacks.update((list) =>
      list.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  }

  deleteAssessmentPack(id: string): void {
    this.assessmentPacks.update((list) => list.filter((p) => p.id !== id));
  }

  addQuestionBankItem(
    item: Omit<QuestionBankItem, 'id' | 'code' | 'usageCount' | 'lastModified'>,
  ): QuestionBankItem {
    const newItem: QuestionBankItem = {
      ...item,
      id: 'qb-' + Date.now(),
      code: 'QB-' + Math.floor(1000 + Math.random() * 9000),
      usageCount: 0,
      lastModified: 'Just now',
    };
    this.questionBank.update((prev) => [newItem, ...prev]);
    return newItem;
  }

  flagQuestionBankItem(id: string): void {
    this.questionBank.update((list) =>
      list.map((q) => (q.id === id ? { ...q, status: 'Flagged' as const } : q)),
    );
  }

  approveQuestionBankItem(id: string): void {
    this.questionBank.update((list) =>
      list.map((q) =>
        q.id === id ? { ...q, status: 'Approved' as const } : q,
      ),
    );
  }

  approveAssessmentReviewItem(id: string): void {
    this.assessmentReviewQueue.update((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Awaiting Approval' as const,
            }
          : item,
      ),
    );
  }

  requestRevisionAssessmentReviewItem(id: string): void {
    this.assessmentReviewQueue.update((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Revisions Requested' as const,
            }
          : item,
      ),
    );
  }

  // Platform Analytics Actions
  setAnalyticsDateRange(range: string): void {
    this.selectedAnalyticsDateRange.set(range);
  }

  setUsageTrendPeriod(period: string): void {
    this.selectedUsageTrendPeriod.set(period);
  }

  setActiveInstitutionsPeriod(period: string): void {
    this.selectedActiveInstitutionsPeriod.set(period);
  }

  setAssessmentTrendPeriod(period: string): void {
    this.selectedAssessmentTrendPeriod.set(period);
  }

  setSubjectConsumptionPeriod(period: string): void {
    this.selectedSubjectConsumptionPeriod.set(period);
  }

  setHeatmapPeriod(period: string): void {
    this.selectedHeatmapPeriod.set(period);
  }

  dismissAttentionSchool(id: string): void {
    this.attentionSchoolsList.update((list) => list.filter((s) => s.id !== id));
  }

  // Subscriptions & Billing Actions
  setSubscriptionTab(tab: string): void {
    this.selectedSubscriptionTab.set(tab);
    this.subscriptionsCurrentPage.set(1);
  }

  setSubscriptionsSearch(term: string): void {
    this.subscriptionsSearch.set(term);
    this.subscriptionsCurrentPage.set(1);
  }

  setSubscriptionPlanFilter(plan: string): void {
    this.selectedSubscriptionPlanFilter.set(plan);
    this.subscriptionsCurrentPage.set(1);
  }

  setSubscriptionStatusFilter(status: string): void {
    this.selectedSubscriptionStatusFilter.set(status);
    this.subscriptionsCurrentPage.set(1);
  }

  setSubscriptionsPage(page: number): void {
    this.subscriptionsCurrentPage.set(page);
  }

  setSubscriptionsDateRange(range: string): void {
    this.selectedSubscriptionsDateRange.set(range);
  }

  toggleRenewalDateSort(): void {
    const current = this.selectedRenewalDateSort();
    if (current === 'asc') {
      this.selectedRenewalDateSort.set('desc');
    } else if (current === 'desc') {
      this.selectedRenewalDateSort.set('none');
    } else {
      this.selectedRenewalDateSort.set('asc');
    }
  }

  updateSubscriptionStatus(id: string, status: SubscriptionStatus): void {
    this.schoolSubscriptions.update((list) =>
      list.map((sub) => (sub.id === id ? { ...sub, status } : sub)),
    );
  }

  createSubscriptionPlan(plan: SubscriptionPlanDefinition): void {
    this.subscriptionPlans.update((list) => [...list, plan]);
  }

  generateInvoice(
    invoiceData: Omit<SubscriptionInvoice, 'id'>,
  ): SubscriptionInvoice {
    const newInvoice: SubscriptionInvoice = {
      ...invoiceData,
      id: `inv-${Date.now().toString(36)}`,
    };
    this.subscriptionInvoices.update((list) => [newInvoice, ...list]);
    return newInvoice;
  }

  // Reports Actions
  setReportTab(tab: string): void {
    this.selectedReportTab.set(tab);
    this.reportsCurrentPage.set(1);
  }

  setReportsSearch(query: string): void {
    this.reportsSearchQuery.set(query);
    this.reportsCurrentPage.set(1);
  }

  setReportsSchoolFilter(school: string): void {
    this.selectedReportsSchoolFilter.set(school);
    this.reportsCurrentPage.set(1);
  }

  setReportsTypeFilter(type: string): void {
    this.selectedReportsTypeFilter.set(type);
    this.reportsCurrentPage.set(1);
  }

  setReportsDateRange(range: string): void {
    this.selectedReportsDateRange.set(range);
  }

  setReportsStatusFilter(status: string): void {
    this.selectedReportsStatusFilter.set(status);
    this.reportsCurrentPage.set(1);
  }

  setReportHealthPeriod(period: string): void {
    this.selectedReportHealthPeriod.set(period);
  }

  setReportsPage(page: number): void {
    this.reportsCurrentPage.set(page);
  }

  createCustomReport(formData: CreateReportFormData): PlatformReport {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newReport: PlatformReport = {
      id: `rep-${Date.now().toString(36)}`,
      name: formData.reportName,
      description: formData.description,
      category: formData.category,
      icon: 'description',
      iconTone: 'primary',
      scope: formData.scope,
      scopeSchoolsCount: 1186,
      frequency: formData.frequency,
      lastGeneratedDate: dateStr,
      lastGeneratedTime: timeStr,
      status: 'Ready',
      format: formData.format,
      ownerName: 'Super Admin',
      ownerInitials: 'SA',
      ownerRole: 'Super Admin',
      fileSizeBytes: '1.5 MB',
      downloadCount: 0,
    };

    this.platformReports.update((list) => [newReport, ...list]);

    // Add to recent activity
    const activity: RecentReportActivity = {
      id: `act-${Date.now().toString(36)}`,
      title: `${newReport.name} generated`,
      actorAndTimestamp: `${dateStr}, ${timeStr} by Super Admin`,
      icon: 'check_circle',
      iconTone: 'success',
    };
    this.recentReportActivities.update((list) => [activity, ...list]);

    return newReport;
  }

  scheduleReport(scheduleData: ScheduleReportFormData): void {
    const report = this.platformReports().find(
      (r) => r.id === scheduleData.reportId,
    );
    if (!report) return;

    const queueItem: ScheduledReportQueueItem = {
      id: `sq-${Date.now().toString(36)}`,
      title: report.name,
      scheduledTime: `${scheduleData.scheduleTime} • ${scheduleData.frequency}`,
      icon: 'calendar_month',
      iconTone: 'purple',
      badge: 'Upcoming',
    };

    this.scheduledReportQueue.update((list) => [queueItem, ...list]);

    this.platformReports.update((list) =>
      list.map((r) =>
        r.id === scheduleData.reportId
          ? {
              ...r,
              status: 'Scheduled' as const,
              scheduledDate: scheduleData.scheduleTime,
            }
          : r,
      ),
    );
  }

  triggerReportGeneration(id: string): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    this.platformReports.update((list) =>
      list.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Ready' as const,
              lastGeneratedDate: dateStr,
              lastGeneratedTime: timeStr,
              downloadCount: (r.downloadCount ?? 0) + 1,
            }
          : r,
      ),
    );
  }

  // Safeguarding Actions
  setSafeguardingTab(tab: SafeguardingTab): void {
    this.selectedSafeguardingTab.set(tab);
    this.safeguardingCurrentPage.set(1);
  }

  setSafeguardingSearch(query: string): void {
    this.safeguardingSearchQuery.set(query);
    this.safeguardingCurrentPage.set(1);
  }

  setSafeguardingSchoolFilter(school: string): void {
    this.selectedSafeguardingSchoolFilter.set(school);
    this.safeguardingCurrentPage.set(1);
  }

  setSafeguardingSeverityFilter(severity: string): void {
    this.selectedSafeguardingSeverityFilter.set(severity);
    this.safeguardingCurrentPage.set(1);
  }

  setSafeguardingStatusFilter(status: string): void {
    this.selectedSafeguardingStatusFilter.set(status);
    this.safeguardingCurrentPage.set(1);
  }

  setSafeguardingDateRange(range: string): void {
    this.selectedSafeguardingDateRange.set(range);
  }

  setCompliancePeriod(period: string): void {
    this.selectedCompliancePeriod.set(period);
  }

  setSafeguardingPage(page: number): void {
    if (page >= 1 && page <= this.totalSafeguardingPages()) {
      this.safeguardingCurrentPage.set(page);
    }
  }

  createSafeguardingCase(
    formData: CreateSafeguardingCaseFormData,
  ): SafeguardingCase {
    const caseNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CASE-2025-${caseNum}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newCase: SafeguardingCase = {
      id: newId,
      institution: formData.institution,
      location: 'Regional Campus',
      category: formData.category,
      severity: formData.severity,
      reportedBy: {
        name: formData.reportedBy || 'Super Admin',
        role: 'Admin',
        type: 'Platform Staff',
      },
      assignedTo: {
        name: formData.assignedReviewer || 'Rahul Mehta',
        role: 'Safeguarding Lead',
      },
      status: 'Under Review',
      lastUpdated: dateStr,
      lastUpdatedTime: timeStr,
      details: formData.description,
      learnerName: formData.learnerName,
      staffName: formData.staffName,
      additionalUsers: formData.additionalUsers,
      gradeClass: formData.gradeClass,
      parentLinked: formData.parentLinked,
      evidenceFilesCount: formData.sensitiveEvidence ? 1 : 0,
      slaDeadline: formData.responseDeadline,
      dateCreated: dateStr,
    };

    this.safeguardingCases.update((cases) => [newCase, ...cases]);

    // Add activity log
    const newActivity: RecentSafeguardingActivity = {
      id: `act-${Date.now()}`,
      action: `New Case ${newId} logged`,
      meta: 'by Super Admin',
      timestamp: 'Just now',
      icon: 'shield',
      iconClass: 'act-info',
    };
    this.recentSafeguardingActivities.update((list) => [
      newActivity,
      ...list.slice(0, 4),
    ]);

    return newCase;
  }

  assignSafeguardingReviewer(
    caseId: string,
    reviewerName: string,
    reviewerRole: string,
  ): void {
    this.safeguardingCases.update((cases) =>
      cases.map((c) =>
        c.id === caseId
          ? {
              ...c,
              assignedTo: { name: reviewerName, role: reviewerRole },
              status: c.status === 'Pending Review' ? 'Under Review' : c.status,
              lastUpdated: 'Just now',
            }
          : c,
      ),
    );
  }

  updateSafeguardingCaseStatus(
    caseId: string,
    status: SafeguardingCaseStatus,
  ): void {
    this.safeguardingCases.update((cases) =>
      cases.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status,
              lastUpdated: 'Just now',
            }
          : c,
      ),
    );
  }

  // Support Centre Actions
  setSupportTab(tab: SupportTab): void {
    this.selectedSupportTab.set(tab);
    this.supportCurrentPage.set(1);
  }

  setSupportSearch(query: string): void {
    this.supportSearchQuery.set(query);
    this.supportCurrentPage.set(1);
  }

  setSupportSchoolFilter(school: string): void {
    this.selectedSupportSchoolFilter.set(school);
    this.supportCurrentPage.set(1);
  }

  setSupportCategoryFilter(category: string): void {
    this.selectedSupportCategoryFilter.set(category);
    this.supportCurrentPage.set(1);
  }

  setSupportPriorityFilter(priority: string): void {
    this.selectedSupportPriorityFilter.set(priority);
    this.supportCurrentPage.set(1);
  }

  setSupportStatusFilter(status: string): void {
    this.selectedSupportStatusFilter.set(status);
    this.supportCurrentPage.set(1);
  }

  setSupportDateRange(range: string): void {
    this.selectedSupportDateRange.set(range);
  }

  setSupportPage(page: number): void {
    if (page >= 1 && page <= this.totalSupportPages()) {
      this.supportCurrentPage.set(page);
    }
  }

  setSupportPageSize(size: number): void {
    this.supportPageSize.set(size);
    this.supportCurrentPage.set(1);
  }

  createSupportTicket(formData: CreateTicketFormData): SupportTicket {
    const ticketNum = Math.floor(5100 + Math.random() * 900);
    const newId = `TKT-2025-${ticketNum}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newTicket: SupportTicket = {
      id: newId,
      school: formData.school,
      title: formData.title,
      issueType: formData.issueType,
      priority: formData.priority,
      raisedBy: {
        name: formData.raisedBy || 'Priya Sharma',
        role: 'School Admin',
        avatar: 'PS',
      },
      assignedTo: {
        name: formData.assignedAgent || 'Neha Verma',
        role: 'Support Agent',
        avatar: 'NV',
      },
      status: 'Open',
      lastUpdated: dateStr,
      lastUpdatedTime: timeStr,
      slaStatus: '4h 00m Remaining',
      slaLevel: 'on-track',
      createdAt: `${dateStr} ${timeStr}`,
      summary: formData.description,
      affectedUsers: formData.affectedUsers || 'All School Users',
      impact: 'Standard Operational Impact',
      occurrence: `Reported on ${dateStr}`,
      probableCause: 'Under Investigation',
      affectedModule: formData.issueType,
      environment: 'Web',
      affectedRoles: ['School Admin', 'Teachers'],
      schoolContact: {
        name: formData.raisedBy || 'Priya Sharma',
        role: 'School Admin',
        schoolName: formData.school,
        email: `admin@${formData.school.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`,
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
      },
      attachments: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          type: 'message',
          authorName: formData.raisedBy || 'Priya Sharma',
          authorRole: 'School Admin',
          authorAvatar: 'PS',
          content: formData.description,
          timestamp: `${dateStr} ${timeStr}`,
        },
      ],
      resolutionChecklist: [
        { label: 'Root cause identified', completed: false },
        { label: 'Fix deployed', completed: false },
        { label: 'Verified with school', completed: false },
        { label: 'Ticket resolved & communicated', completed: false },
      ],
    };

    this.allSupportTickets.update((tickets) => [newTicket, ...tickets]);

    // Update recent activity
    const activity: RecentSupportActivity = {
      id: `act-${Date.now()}`,
      title: `Ticket ${newId} created: ${newTicket.title}`,
      timestamp: 'Just now',
      icon: 'confirmation_number',
      iconClass: 'act-primary',
    };
    this.recentSupportActivities.update((list) => [
      activity,
      ...list.slice(0, 4),
    ]);

    return newTicket;
  }

  updateTicketStatus(ticketId: string, status: TicketStatus): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    this.allSupportTickets.update((tickets) =>
      tickets.map((t) => {
        if (t.id !== ticketId) return t;

        const updatedTimeline = [
          ...(t.timeline || []),
          {
            id: `tl-${Date.now()}`,
            type: 'status_change' as const,
            authorName: 'Super Admin',
            authorRole: 'Super Admin',
            authorAvatar: 'SA',
            content: `Status updated to ${status} by Super Admin`,
            timestamp: `Today ${timeStr}`,
          },
        ];

        return {
          ...t,
          status,
          lastUpdated: 'Today',
          lastUpdatedTime: timeStr,
          timeline: updatedTimeline,
        };
      }),
    );
  }

  assignTicketAgent(
    ticketId: string,
    agentName: string,
    agentRole: string,
  ): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const initials = agentName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    this.allSupportTickets.update((tickets) =>
      tickets.map((t) => {
        if (t.id !== ticketId) return t;

        const updatedTimeline = [
          ...(t.timeline || []),
          {
            id: `tl-${Date.now()}`,
            type: 'status_change' as const,
            authorName: 'Super Admin',
            authorRole: 'Super Admin',
            authorAvatar: 'SA',
            content: `Assigned to ${agentName} (${agentRole})`,
            timestamp: `Today ${timeStr}`,
          },
        ];

        return {
          ...t,
          assignedTo: {
            name: agentName,
            role: agentRole,
            avatar: initials,
          },
          lastUpdated: 'Today',
          lastUpdatedTime: timeStr,
          timeline: updatedTimeline,
        };
      }),
    );
  }

  addTicketTimelineEntry(
    ticketId: string,
    entry: Omit<TimelineEntry, 'id'>,
  ): void {
    this.allSupportTickets.update((tickets) =>
      tickets.map((t) => {
        if (t.id !== ticketId) return t;

        const newEntry: TimelineEntry = {
          ...entry,
          id: `tl-${Date.now()}`,
        };

        return {
          ...t,
          timeline: [...(t.timeline || []), newEntry],
          lastUpdated: 'Today',
          lastUpdatedTime: 'Just now',
        };
      }),
    );
  }

  toggleResolutionChecklistItem(ticketId: string, index: number): void {
    this.allSupportTickets.update((tickets) =>
      tickets.map((t) => {
        if (t.id !== ticketId || !t.resolutionChecklist) return t;

        const updatedChecklist = t.resolutionChecklist.map((item, i) =>
          i === index ? { ...item, completed: !item.completed } : item,
        );

        return {
          ...t,
          resolutionChecklist: updatedChecklist,
        };
      }),
    );
  }

  // Resources Library Actions
  setResourceTab(tab: ResourceCategoryTab): void {
    this.selectedResourceTab.set(tab);
    this.resourceCurrentPage.set(1);
  }

  setResourceSearch(query: string): void {
    this.resourceSearchQuery.set(query);
    this.resourceCurrentPage.set(1);
  }

  setResourceSchoolFilter(school: string): void {
    this.selectedResourceSchoolFilter.set(school);
    this.resourceCurrentPage.set(1);
  }

  setResourceSubjectFilter(subject: string): void {
    this.selectedResourceSubjectFilter.set(subject);
    this.resourceCurrentPage.set(1);
  }

  setResourceClassFilter(cls: string): void {
    this.selectedResourceClassFilter.set(cls);
    this.resourceCurrentPage.set(1);
  }

  setResourceTypeFilter(type: string): void {
    this.selectedResourceTypeFilter.set(type);
    this.resourceCurrentPage.set(1);
  }

  setResourceStatusFilter(status: string): void {
    this.selectedResourceStatusFilter.set(status);
    this.resourceCurrentPage.set(1);
  }

  setResourceDateRange(range: string): void {
    this.selectedResourceDateRange.set(range);
  }

  setResourcePage(page: number): void {
    this.resourceCurrentPage.set(page);
  }

  setResourcePageSize(size: number): void {
    this.resourcePageSize.set(size);
    this.resourceCurrentPage.set(1);
  }

  createResource(form: CreateResourceFormData): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newResource: ResourceItem = {
      id: `RES-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      title: form.title,
      description: form.description,
      category: form.resourceType,
      fileFormat: form.fileFormat || 'PDF',
      fileSize: form.fileSize || '2.4 MB',
      linkedPack: form.linkedPack,
      linkedTopic: form.linkedTopic,
      classLevel: form.classLevel,
      subject: form.linkedSubject,
      termWeek: form.termWeek || 'Term 1, Week 1',
      source: 'Learno Content Team',
      owner: form.author || 'Super Admin',
      status: form.approvalStatus,
      lastUpdated: dateStr,
      lastUpdatedTime: timeStr,
      usageCount: 0,
      downloadsCount: 0,
      audience: form.audience,
      visibility: form.visibility,
      downloadPermission: form.downloadPermission,
      lowDataVersion: form.lowDataVersion,
      language: form.language,
      estimatedStudyTime: form.estimatedStudyTime,
      version: form.version,
      tags: form.tags,
      author: form.author,
      license: form.license,
      publishDate: form.publishDate || dateStr,
      reviewNotes: form.reviewNotes,
    };

    this.allResources.update((res) => [newResource, ...res]);
  }

  updateResourceStatus(resourceId: string, status: ResourceStatus): void {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    this.allResources.update((resources) =>
      resources.map((r) =>
        r.id === resourceId
          ? {
              ...r,
              status,
              lastUpdated: dateStr,
              lastUpdatedTime: timeStr,
            }
          : r,
      ),
    );
  }

  deleteResource(resourceId: string): void {
    this.allResources.update((resources) =>
      resources.filter((r) => r.id !== resourceId),
    );
  }
}
