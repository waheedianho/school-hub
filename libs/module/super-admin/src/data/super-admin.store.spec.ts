import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SuperAdminStore } from './super-admin.store';

describe('SuperAdminStore', () => {
  let store: SuperAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminStore],
    });
    store = TestBed.inject(SuperAdminStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial dashboard metrics loaded', () => {
    expect(store.metrics().length).toBe(6);
    expect(store.metrics()[0].label).toBe('Total Schools');
    expect(store.metrics()[0].value).toBe('1,248');
  });

  it('should compute attention schools count correctly', () => {
    expect(store.attentionSchoolsCount()).toBe(5);
  });

  it('should compute open tickets count correctly', () => {
    expect(store.openTicketsCount()).toBe(2);
  });

  it('should dismiss safeguarding alerts', () => {
    const initialCount = store.safeguardingAlerts().length;
    store.dismissAlert('alert-1');
    expect(store.safeguardingAlerts().length).toBe(initialCount - 1);
  });

  it('should resolve support tickets', () => {
    store.resolveTicket('ticket-1');
    const ticket = store.supportTickets().find((t) => t.id === 'ticket-1');
    expect(ticket?.status).toBe('Resolved');
  });

  it('should update date range and period filters', () => {
    store.setDateRange('Last 7 Days');
    expect(store.selectedDateRange()).toBe('Last 7 Days');

    store.setUsagePeriod('Last 30 Days');
    expect(store.selectedUsagePeriod()).toBe('Last 30 Days');

    store.setRevenuePeriod('This Quarter');
    expect(store.selectedRevenuePeriod()).toBe('This Quarter');
  });

  it('should initialize curriculum metrics and packs', () => {
    expect(store.curriculumMetrics().length).toBe(6);
    expect(store.curriculumPacks().length).toBeGreaterThan(0);
    expect(store.curriculumPacks()[0].name).toContain('JSS 1 Mathematics');
    expect(store.totalCurriculumPacksCount()).toBe(
      store.curriculumPacks().length,
    );
    expect(store.approvedPacksCount()).toBeGreaterThan(0);
  });

  it('should filter curriculum packs by search, type, and status', () => {
    store.setCurriculumSearch('Mathematics');
    expect(
      store
        .filteredCurriculumPacks()
        .every(
          (p) =>
            p.name.includes('Mathematics') || p.subject.includes('Mathematics'),
        ),
    ).toBe(true);

    store.setCurriculumSearch('');
    store.setCurriculumStatusFilter('Pending Review');
    expect(
      store
        .filteredCurriculumPacks()
        .every((p) => p.status === 'Pending Review'),
    ).toBe(true);

    store.resetCurriculumFilters();
    expect(store.selectedCurriculumStatusFilter()).toBe('All');
    expect(store.curriculumSearchQuery()).toBe('');
  });

  it('should create new curriculum pack and log activity', () => {
    const initialCount = store.curriculumPacks().length;
    const initialActivityCount = store.recentContentActivities().length;

    const newPack = store.createCurriculumPack({
      packName: 'JSS 1 Social Studies – First Term',
      curriculumType: 'Core Curriculum',
      classLevel: 'JSS 1',
      subject: 'Social Studies',
      term: 'First Term',
      academicSession: '2024/2025',
      version: 'v1.0',
      curriculumSource: 'Learno Master Curriculum',
      description: 'Test curriculum description',
      weeklyTopics: store.weeklyTopics(),
      contentComponents: ['comp-1', 'comp-2'],
      approvalWorkflow: 'Standard',
      assignedTemplate: 'Template 1',
      schoolsAccess: 'All Schools',
      subscriptionTier: 'Standard',
      publishStatus: 'Draft (Not Visible)',
    });

    expect(store.curriculumPacks().length).toBe(initialCount + 1);
    expect(newPack.status).toBe('Draft');
    expect(store.recentContentActivities().length).toBe(
      initialActivityCount + 1,
    );
  });

  it('should manage weekly topic plans and content components', () => {
    const initialTopics = store.weeklyTopics().length;
    const added = store.addWeeklyTopic({
      week: 13,
      weekLabel: 'Week 13',
      topic: 'Extended Project Work',
      learningObjective: 'Hands on project application',
      status: 'Draft',
    });
    expect(store.weeklyTopics().length).toBe(initialTopics + 1);

    store.updateWeeklyTopic(added.id, { topic: 'Updated Project Work' });
    const found = store.weeklyTopics().find((t) => t.id === added.id);
    expect(found?.topic).toBe('Updated Project Work');

    store.deleteWeeklyTopic(added.id);
    expect(store.weeklyTopics().length).toBe(initialTopics);

    const comp = store.contentComponents()[0];
    const initialChecked = comp.checked;
    store.toggleContentComponent(comp.id);
    expect(store.contentComponents()[0].checked).toBe(!initialChecked);
  });

  it('should manage review queue items', () => {
    const firstItem = store.reviewQueueItems()[0];
    store.approveReviewQueueItem(firstItem.id);
    expect(
      store.reviewQueueItems().find((i) => i.id === firstItem.id)?.status,
    ).toBe('Under Review');

    store.requestChangesReviewQueueItem(firstItem.id);
    expect(
      store.reviewQueueItems().find((i) => i.id === firstItem.id)?.status,
    ).toBe('Revision Requested');
  });

  it('should initialize assessment metrics, packs, and question bank', () => {
    expect(store.assessmentMetrics().length).toBe(6);
    expect(store.assessmentPacks().length).toBeGreaterThan(0);
    expect(store.totalAssessmentPacksCount()).toBe(
      store.assessmentPacks().length,
    );
    expect(store.approvedAssessmentPacksCount()).toBeGreaterThan(0);
    expect(store.questionBank().length).toBeGreaterThan(0);
    expect(store.assessmentReviewQueue().length).toBeGreaterThan(0);
    expect(store.assessmentTemplates().length).toBeGreaterThan(0);
  });

  it('should filter assessment packs by search, subject, type, and status', () => {
    store.setAssessmentSearch('Mathematics');
    expect(
      store
        .filteredAssessmentPacks()
        .every(
          (p) =>
            p.name.includes('Mathematics') || p.subject.includes('Mathematics'),
        ),
    ).toBe(true);

    store.setAssessmentSearch('');
    store.setAssessmentStatusFilter('Approved');
    expect(
      store.filteredAssessmentPacks().every((p) => p.status === 'Approved'),
    ).toBe(true);

    store.setAssessmentTypeFilter('Quiz');
    expect(
      store.filteredAssessmentPacks().every((p) => p.type === 'Quiz'),
    ).toBe(true);

    store.resetAssessmentFilters();
    expect(store.selectedAssessmentStatusFilter()).toBe('All');
    expect(store.selectedAssessmentTypeFilter()).toBe('All');
    expect(store.assessmentSearchQuery()).toBe('');
  });

  it('should filter question bank items', () => {
    store.setAssessmentSearch('algebra');
    const filtered = store.filteredQuestionBank();
    expect(
      filtered.every(
        (q) =>
          q.questionText.toLowerCase().includes('algebra') ||
          q.topic.toLowerCase().includes('algebra') ||
          (q.misconceptionTag?.toLowerCase().includes('algebra') ?? false),
      ),
    ).toBe(true);
    store.setAssessmentSearch('');
  });

  it('should create new assessment pack', () => {
    const initialCount = store.assessmentPacks().length;
    const newPack = store.createAssessmentPack({
      assessmentName: 'JSS 1 Computer Studies Weekly Quiz',
      assessmentType: 'Quiz',
      classLevel: 'JSS 1',
      subject: 'Computer Studies',
      term: 'First Term',
      academicSession: '2024/2025',
      version: 'v1.0',
      assessmentCode: 'CS-J1-Q1',
      description: 'Introductory test on computing hardware',
      targetInstitutions: 'All Schools',
      durationMins: 30,
      totalMarks: 25,
      numberOfQuestions: 25,
      deliveryMode: 'Online CBT',
      attemptLimit: 'Single Attempt (1)',
      randomizeQuestions: true,
      randomizeOptions: true,
      availabilityDate: '2024-10-15',
      dueDate: '2024-10-22',
      compositions: store.questionCompositions(),
      passingThreshold: 60,
      gradeScaleTemplate: 'Standard WAEC / BECE Grade Scale',
      reviewSla: '48 Hours',
      moderationRequired: true,
      feedbackRelease: 'Instant after submission',
      publishStatus: 'Draft',
    });

    expect(store.assessmentPacks().length).toBe(initialCount + 1);
    expect(newPack.status).toBe('Draft');
    expect(newPack.name).toBe('JSS 1 Computer Studies Weekly Quiz');
  });

  it('should update and delete assessment pack', () => {
    const pack = store.assessmentPacks()[0];
    store.updateAssessmentStatus(pack.id, 'Needs Update');
    expect(store.assessmentPacks().find((p) => p.id === pack.id)?.status).toBe(
      'Needs Update',
    );

    const countBefore = store.assessmentPacks().length;
    store.deleteAssessmentPack(pack.id);
    expect(store.assessmentPacks().length).toBe(countBefore - 1);
  });

  it('should manage question bank items and review queue', () => {
    const initialQbCount = store.questionBank().length;
    const addedItem = store.addQuestionBankItem({
      questionText: 'What is the primary organ of photosynthesis in plants?',
      subject: 'Basic Science',
      classLevel: 'JSS 1',
      topic: 'Plant Nutrition',
      type: 'Multiple Choice (MCQ)',
      difficulty: 'Easy',
      marks: 2,
      autoMarkable: true,
      status: 'In Review',
    });
    expect(store.questionBank().length).toBe(initialQbCount + 1);

    store.flagQuestionBankItem(addedItem.id);
    expect(
      store.questionBank().find((q) => q.id === addedItem.id)?.status,
    ).toBe('Flagged');

    store.approveQuestionBankItem(addedItem.id);
    expect(
      store.questionBank().find((q) => q.id === addedItem.id)?.status,
    ).toBe('Approved');

    const firstReview = store.assessmentReviewQueue()[0];
    store.approveAssessmentReviewItem(firstReview.id);
    expect(
      store.assessmentReviewQueue().find((r) => r.id === firstReview.id)
        ?.status,
    ).toBe('Awaiting Approval');

    store.requestRevisionAssessmentReviewItem(firstReview.id);
    expect(
      store.assessmentReviewQueue().find((r) => r.id === firstReview.id)
        ?.status,
    ).toBe('Revisions Requested');
  });

  it('should initialize platform analytics state and computeds', () => {
    expect(store.analyticsMetrics().length).toBe(6);
    expect(store.platformUsageTrendPoints().length).toBeGreaterThan(0);
    expect(store.topActiveInstitutions().length).toBe(5);
    expect(store.roleUsage().length).toBe(4);
    expect(store.totalActiveLearnersCount()).toBe(12935);
    expect(store.totalActiveSchoolsCount()).toBe(248);
    expect(store.attentionSchoolsList().length).toBe(3);
    expect(store.recentPlatformActivityItems().length).toBe(5);
    expect(store.performanceSummary().avgSessionDuration).toBe('24m 36s');
  });

  it('should update analytics periods and date range', () => {
    store.setAnalyticsDateRange('May 19 – May 25, 2025');
    expect(store.selectedAnalyticsDateRange()).toBe('May 19 – May 25, 2025');

    store.setUsageTrendPeriod('Last 7 Days');
    expect(store.selectedUsageTrendPeriod()).toBe('Last 7 Days');

    store.setActiveInstitutionsPeriod('This Term');
    expect(store.selectedActiveInstitutionsPeriod()).toBe('This Term');

    store.setAssessmentTrendPeriod('This Month');
    expect(store.selectedAssessmentTrendPeriod()).toBe('This Month');

    store.setSubjectConsumptionPeriod('This Year');
    expect(store.selectedSubjectConsumptionPeriod()).toBe('This Year');

    store.setHeatmapPeriod('Last 60 Days');
    expect(store.selectedHeatmapPeriod()).toBe('Last 60 Days');
  });

  it('should dismiss attention school', () => {
    const initialCount = store.attentionSchoolsList().length;
    const firstId = store.attentionSchoolsList()[0].id;
    store.dismissAttentionSchool(firstId);
    expect(store.attentionSchoolsList().length).toBe(initialCount - 1);
    expect(store.attentionSchoolsList().some((s) => s.id === firstId)).toBe(
      false,
    );
  });

  it('should initialize with subscription and billing data', () => {
    expect(store.subscriptionMetrics().length).toBe(6);
    expect(store.schoolSubscriptions().length).toBe(7);
    expect(store.subscriptionPlans().length).toBe(4);
    expect(store.subscriptionInvoices().length).toBe(5);
    expect(store.subscriptionBottomMetrics().length).toBe(5);
    expect(store.revenueOverview().length).toBe(4);
    expect(store.renewalQueue().length).toBe(4);
    expect(store.recentBillingActivity().length).toBe(4);
    expect(store.planDistribution().length).toBe(4);
    expect(store.billingHealth().percentage).toBe(92);
  });

  it('should filter subscriptions by tab, search, and dropdowns', () => {
    // Initial filtered count
    expect(store.filteredSubscriptions().length).toBe(7);
    expect(store.totalSubscriptionsCount()).toBe(7);

    // Filter by Active Billing tab
    store.setSubscriptionTab('Active Billing');
    expect(
      store.filteredSubscriptions().every((s) => s.status === 'Active'),
    ).toBe(true);

    // Reset tab and filter by search
    store.setSubscriptionTab('Subscription Plans');
    store.setSubscriptionsSearch('Greenfield');
    expect(store.filteredSubscriptions().length).toBe(1);
    expect(store.filteredSubscriptions()[0].schoolName).toContain('Greenfield');

    // Filter by plan
    store.setSubscriptionsSearch('');
    store.setSubscriptionPlanFilter('Enterprise');
    expect(
      store.filteredSubscriptions().every((s) => s.plan === 'Enterprise'),
    ).toBe(true);

    // Filter by status
    store.setSubscriptionPlanFilter('All Plans');
    store.setSubscriptionStatusFilter('Suspended');
    expect(
      store.filteredSubscriptions().every((s) => s.status === 'Suspended'),
    ).toBe(true);
  });

  it('should paginate subscriptions and update status', () => {
    store.setSubscriptionStatusFilter('All Billing Statuses');
    store.setSubscriptionsPage(1);
    expect(store.paginatedSubscriptions().length).toBeLessThanOrEqual(7);

    // Update subscription status
    const firstSub = store.schoolSubscriptions()[0];
    store.updateSubscriptionStatus(firstSub.id, 'Suspended');
    const updated = store
      .schoolSubscriptions()
      .find((s) => s.id === firstSub.id);
    expect(updated?.status).toBe('Suspended');
  });

  it('should generate invoices and add subscription plans', () => {
    const initialInvoices = store.subscriptionInvoices().length;
    const inv = store.generateInvoice({
      invoiceNumber: 'INV-2025-9999',
      schoolName: 'Test School',
      schoolDomain: 'testschool.edu',
      plan: 'Professional',
      amount: 4500,
      amountFormatted: '$4,500.00',
      issueDate: 'May 20, 2025',
      dueDate: 'Jun 20, 2025',
      status: 'Pending',
    });

    expect(store.subscriptionInvoices().length).toBe(initialInvoices + 1);
    expect(inv.id).toBeDefined();

    const initialPlans = store.subscriptionPlans().length;
    store.createSubscriptionPlan({
      id: 'plan-custom',
      name: 'Trial',
      tagline: 'Custom test plan',
      priceAnnual: 1000,
      priceQuarterly: 300,
      priceMonthly: 100,
      maxLearners: 50,
      features: ['Feature 1'],
      activeSchoolsCount: 1,
    });
    expect(store.subscriptionPlans().length).toBe(initialPlans + 1);
  });

  it('should initialize with reports data', () => {
    expect(store.reportMetrics().length).toBe(6);
    expect(store.platformReports().length).toBe(7);
    expect(store.reportBottomMetrics().length).toBe(4);
    expect(store.reportHealthCategories().length).toBe(4);
    expect(store.scheduledReportQueue().length).toBe(4);
    expect(store.recentReportActivities().length).toBe(3);
    expect(store.quickReportTemplates().length).toBe(4);
    expect(store.totalPlatformReportsCount()).toBe(7);
  });

  it('should filter reports by search query, tab, and filters', () => {
    // Search filter
    store.setReportsSearch('Curriculum');
    expect(store.filteredPlatformReports().length).toBe(1);
    expect(store.filteredPlatformReports()[0].name).toContain('Curriculum');

    // Reset search
    store.setReportsSearch('');
    expect(store.filteredPlatformReports().length).toBe(7);

    // Tab filter
    store.setReportTab('School Performance');
    expect(
      store
        .filteredPlatformReports()
        .every((r) => r.category === 'School Performance'),
    ).toBe(true);

    // Status filter
    store.setReportTab('Academic Reports');
    store.setReportsStatusFilter('Ready');
    expect(
      store.filteredPlatformReports().every((r) => r.status === 'Ready'),
    ).toBe(true);
  });

  it('should create custom report and schedule reports', () => {
    store.setReportsStatusFilter('All Statuses');
    const initialReports = store.platformReports().length;
    const initialActivities = store.recentReportActivities().length;

    const rep = store.createCustomReport({
      reportName: 'New Test Custom Report',
      description: 'Test description',
      category: 'Custom Reports',
      scope: 'All Schools',
      frequency: 'Monthly',
      format: 'PDF',
      includeCharts: true,
      notifyRecipients: true,
    });

    expect(store.platformReports().length).toBe(initialReports + 1);
    expect(store.recentReportActivities().length).toBe(initialActivities + 1);
    expect(rep.name).toBe('New Test Custom Report');

    const initialQueue = store.scheduledReportQueue().length;
    store.scheduleReport({
      reportId: rep.id,
      scheduleTime: 'Jun 10, 2025 • 09:00 AM',
      frequency: 'Weekly',
      deliveryEmail: 'admin@school.edu',
      format: 'PDF',
    });

    expect(store.scheduledReportQueue().length).toBe(initialQueue + 1);
    const updatedRep = store.platformReports().find((r) => r.id === rep.id);
    expect(updatedRep?.status).toBe('Scheduled');
  });

  it('should trigger report generation and update periods', () => {
    const firstRep = store.platformReports()[0];
    const initialDownloads = firstRep.downloadCount ?? 0;

    store.triggerReportGeneration(firstRep.id);
    const updated = store.platformReports().find((r) => r.id === firstRep.id);
    expect(updated?.downloadCount).toBe(initialDownloads + 1);

    store.setReportsDateRange('Jun 1 – Jun 30, 2025');
    expect(store.selectedReportsDateRange()).toBe('Jun 1 – Jun 30, 2025');

    store.setReportHealthPeriod('This Quarter');
    expect(store.selectedReportHealthPeriod()).toBe('This Quarter');
  });

  it('should initialize safeguarding & compliance state properly', () => {
    expect(store.safeguardingMetrics().length).toBe(6);
    expect(store.safeguardingCases().length).toBeGreaterThanOrEqual(8);
    expect(store.safeguardingBottomMetrics().length).toBe(5);
    expect(store.complianceHealthCategories().length).toBe(3);
    expect(store.urgentEscalations().length).toBe(3);
    expect(store.consentQueueBreakdown().total).toBe(64);
    expect(store.recentSafeguardingActivities().length).toBe(3);
    expect(store.policyChecklist().length).toBe(5);
    expect(store.selectedSafeguardingTab()).toBe('Incident Queue');
  });

  it('should filter safeguarding cases by tab, school, severity, and search', () => {
    store.setSafeguardingTab('Flagged Communications');
    expect(store.selectedSafeguardingTab()).toBe('Flagged Communications');
    expect(
      store
        .filteredSafeguardingCases()
        .every((c) => c.category === 'Inappropriate Communication'),
    ).toBe(true);

    store.setSafeguardingTab('Incident Queue');
    store.setSafeguardingSeverityFilter('Critical');
    expect(
      store.filteredSafeguardingCases().every((c) => c.severity === 'Critical'),
    ).toBe(true);

    store.setSafeguardingSeverityFilter('All Severities');
    store.setSafeguardingSchoolFilter('Greenwood High School');
    expect(
      store
        .filteredSafeguardingCases()
        .every((c) => c.institution === 'Greenwood High School'),
    ).toBe(true);

    store.setSafeguardingSchoolFilter('All Schools');
    store.setSafeguardingSearch('CASE-2025-0871');
    expect(store.filteredSafeguardingCases().length).toBe(1);
    expect(store.filteredSafeguardingCases()[0].id).toBe('CASE-2025-0871');

    store.setSafeguardingSearch('');
    store.setSafeguardingStatusFilter('Under Review');
    expect(
      store
        .filteredSafeguardingCases()
        .every((c) => c.status === 'Under Review'),
    ).toBe(true);
    store.setSafeguardingStatusFilter('All Statuses');
  });

  it('should handle safeguarding pagination', () => {
    store.setSafeguardingPage(1);
    expect(store.safeguardingCurrentPage()).toBe(1);
    expect(store.paginatedSafeguardingCases().length).toBeLessThanOrEqual(8);
  });

  it('should create new safeguarding case and update activity', () => {
    const initialCases = store.safeguardingCases().length;
    const initialActivities = store.recentSafeguardingActivities().length;

    const newCase = store.createSafeguardingCase({
      title: 'Suspicious Messaging Activity in Study Group',
      institution: 'Greenwood High School',
      category: 'Inappropriate Communication',
      severity: 'High',
      incidentDateTime: 'May 30, 2025 02:15 PM',
      reportedBy: 'Staff Member',
      description: 'Reported unsolicited messages sent to grade 8 learner.',
      locationContext: 'Study Group Discussion',
      sensitiveEvidence: true,
      containsLearnerInfo: true,
      requiresRestrictedAccess: true,
      assignedReviewer: 'Rahul Mehta',
      escalationStatus: 'Escalated',
      responseDeadline: 'May 31, 2025 05:00 PM',
      notifySchoolAdmin: true,
      notifyComplianceOfficer: true,
      restrictUserAccess: false,
      parentConsentStatus: 'Pending',
      policyAcknowledged: 'Child Protection',
      dataPrivacyReviewRequired: 'Yes',
      externalReportingRequired: false,
    });

    expect(store.safeguardingCases().length).toBe(initialCases + 1);
    expect(store.recentSafeguardingActivities().length).toBe(
      Math.min(5, initialActivities + 1),
    );
    expect(newCase.institution).toBe('Greenwood High School');
    expect(newCase.severity).toBe('High');
  });

  it('should assign reviewer and update case status', () => {
    const targetCase = store.safeguardingCases()[0];
    store.assignSafeguardingReviewer(
      targetCase.id,
      'Anita Roy',
      'Compliance Officer',
    );
    const updated = store
      .safeguardingCases()
      .find((c) => c.id === targetCase.id);
    expect(updated?.assignedTo.name).toBe('Anita Roy');
    expect(updated?.assignedTo.role).toBe('Compliance Officer');

    store.updateSafeguardingCaseStatus(targetCase.id, 'Resolved');
    const resolved = store
      .safeguardingCases()
      .find((c) => c.id === targetCase.id);
    expect(resolved?.status).toBe('Resolved');

    store.setSafeguardingDateRange('Jun 1 – Jun 30, 2025');
    expect(store.selectedSafeguardingDateRange()).toBe('Jun 1 – Jun 30, 2025');

    store.setCompliancePeriod('This Quarter');
    expect(store.selectedCompliancePeriod()).toBe('This Quarter');
  });

  it('should initialize support centre state properly', () => {
    expect(store.supportMetrics().length).toBe(6);
    expect(store.allSupportTickets().length).toBeGreaterThanOrEqual(10);
    expect(store.supportBottomMetrics().length).toBe(5);
    expect(store.supportHealthCategories().length).toBe(5);
    expect(store.supportUrgentEscalations().length).toBe(3);
    expect(store.slaQueueBreakdown().overdue).toBe(12);
    expect(store.recentSupportActivities().length).toBe(3);
    expect(store.selectedSupportTab()).toBe('All Tickets');
  });

  it('should filter support tickets by tab, school, category, priority, and search', () => {
    store.setSupportTab('Billing Issues');
    expect(store.selectedSupportTab()).toBe('Billing Issues');
    expect(
      store
        .filteredSupportTickets()
        .every(
          (t) =>
            t.issueType === 'Billing Issue' ||
            t.issueType === 'Billing Invoice Error',
        ),
    ).toBe(true);

    store.setSupportTab('All Tickets');
    store.setSupportPriorityFilter('High');
    expect(
      store.filteredSupportTickets().every((t) => t.priority === 'High'),
    ).toBe(true);

    store.setSupportPriorityFilter('All Priorities');
    store.setSupportSchoolFilter('Sunrise International School');
    expect(
      store
        .filteredSupportTickets()
        .every((t) => t.school === 'Sunrise International School'),
    ).toBe(true);

    store.setSupportSchoolFilter('All Schools');
    store.setSupportSearch('TKT-2025-5128');
    expect(store.filteredSupportTickets().length).toBe(1);
    expect(store.filteredSupportTickets()[0].id).toBe('TKT-2025-5128');

    store.setSupportSearch('');
    store.setSupportStatusFilter('Open');
    expect(
      store.filteredSupportTickets().every((t) => t.status === 'Open'),
    ).toBe(true);
    store.setSupportStatusFilter('All Statuses');
  });

  it('should handle support pagination and page size', () => {
    store.setSupportPage(1);
    store.setSupportPageSize(5);
    expect(store.supportCurrentPage()).toBe(1);
    expect(store.supportPageSize()).toBe(5);
    expect(store.paginatedSupportTickets().length).toBeLessThanOrEqual(5);
  });

  it('should create new support ticket and update activity', () => {
    const initialTickets = store.allSupportTickets().length;
    const initialActivities = store.recentSupportActivities().length;

    const newTicket = store.createSupportTicket({
      title: 'Math quiz questions not rendering equations',
      school: 'Sunrise International School',
      issueType: 'Content Upload Error',
      priority: 'High',
      description: 'LaTeX math formulas failing to compile in student player.',
      affectedUsers: '80 Grade 10 learners',
      assignedAgent: 'Neha Verma',
      raisedBy: 'Rohan Sen',
    });

    expect(store.allSupportTickets().length).toBe(initialTickets + 1);
    expect(store.recentSupportActivities().length).toBe(
      Math.min(5, initialActivities + 1),
    );
    expect(newTicket.school).toBe('Sunrise International School');
    expect(newTicket.priority).toBe('High');
  });

  it('should update ticket status, assign agent, and add timeline entries', () => {
    const targetTicket = store.allSupportTickets()[0];
    store.assignTicketAgent(targetTicket.id, 'Amit Patel', 'Support Lead');
    const updated = store
      .allSupportTickets()
      .find((t) => t.id === targetTicket.id);
    expect(updated?.assignedTo.name).toBe('Amit Patel');
    expect(updated?.assignedTo.role).toBe('Support Lead');

    store.updateTicketStatus(targetTicket.id, 'Resolved');
    const resolved = store
      .allSupportTickets()
      .find((t) => t.id === targetTicket.id);
    expect(resolved?.status).toBe('Resolved');

    store.addTicketTimelineEntry(targetTicket.id, {
      type: 'internal_note',
      authorName: 'Super Admin',
      authorRole: 'Super Admin',
      authorAvatar: 'SA',
      content: 'Investigation concluded and root cause confirmed.',
      timestamp: 'Today 11:00 AM',
      isInternal: true,
    });
    const withNote = store
      .allSupportTickets()
      .find((t) => t.id === targetTicket.id);
    expect(
      withNote?.timeline?.some((tl) =>
        tl.content.includes('Investigation concluded'),
      ),
    ).toBe(true);

    if (withNote?.resolutionChecklist?.length) {
      const initialChecked = withNote.resolutionChecklist[0].completed;
      store.toggleResolutionChecklistItem(targetTicket.id, 0);
      const toggled = store
        .allSupportTickets()
        .find((t) => t.id === targetTicket.id);
      expect(toggled?.resolutionChecklist?.[0].completed).toBe(!initialChecked);
    }

    store.setSupportDateRange('Jun 1 – Jun 30, 2025');
    expect(store.selectedSupportDateRange()).toBe('Jun 1 – Jun 30, 2025');
  });

  it('should initialize Resources Library state with authentic metrics and datasets', () => {
    expect(store.resourceMetrics().length).toBe(6);
    expect(store.allResources().length).toBeGreaterThanOrEqual(10);
    expect(store.resourceBottomMetrics().length).toBe(4);
    expect(store.uploadBottomMetrics().length).toBe(4);
    expect(store.resourceHealthCategories().length).toBe(5);
    expect(store.approvalQueue().length).toBe(4);
    expect(store.mostUsedResourceTypes().length).toBe(6);
    expect(store.recentUploadActivities().length).toBe(3);
    expect(store.selectedResourceTab()).toBe('All Resources');
    expect(store.selectedResourceSchoolFilter()).toBe('All Schools');
  });

  it('should filter resources by search query, tab, subject, class, and status', () => {
    // Search query
    store.setResourceSearch('Photosynthesis');
    expect(store.filteredResources().length).toBe(1);
    expect(store.filteredResources()[0].title).toContain('Photosynthesis');

    // Reset search
    store.setResourceSearch('');
    expect(store.filteredResources().length).toBe(10);

    // Tab filter
    store.setResourceTab('Videos');
    expect(
      store.filteredResources().every((r) => r.category === 'Videos'),
    ).toBe(true);

    // Subject filter
    store.setResourceTab('All Resources');
    store.setResourceSubjectFilter('Mathematics');
    expect(
      store.filteredResources().every((r) => r.subject === 'Mathematics'),
    ).toBe(true);

    // Class level filter
    store.setResourceSubjectFilter('All Subjects');
    store.setResourceClassFilter('JSS1');
    expect(
      store.filteredResources().every((r) => r.classLevel === 'JSS1'),
    ).toBe(true);

    // Status filter
    store.setResourceClassFilter('All Class Levels');
    store.setResourceStatusFilter('Pending Review');
    expect(
      store.filteredResources().every((r) => r.status === 'Pending Review'),
    ).toBe(true);

    // Reset status filter
    store.setResourceStatusFilter('All Statuses');
    expect(store.filteredResources().length).toBe(10);
  });

  it('should paginate resources accurately', () => {
    store.setResourcePageSize(4);
    store.setResourcePage(1);
    expect(store.paginatedResources().length).toBe(4);
    expect(store.totalResourcePages()).toBe(3);

    store.setResourcePage(2);
    expect(store.paginatedResources().length).toBe(4);

    store.setResourcePage(3);
    expect(store.paginatedResources().length).toBe(2);

    store.setResourcePageSize(10);
    store.setResourcePage(1);
  });

  it('should create, update status, and delete resource items', () => {
    const initialCount = store.allResources().length;

    store.createResource({
      title: 'Advanced Organic Chemistry Guide',
      description: 'Comprehensive reactions guide for senior students',
      resourceType: 'Lesson Notes',
      linkedPack: 'SSS2 Chemistry Pack',
      linkedTopic: 'Hydrocarbons',
      linkedSubject: 'Chemistry',
      classLevel: 'SSS2',
      tags: ['chemistry', 'hydrocarbons', 'sss2'],
      fileFormat: 'PDF',
      fileSize: '3.4 MB',
      visibility: 'All Schools',
      audience: ['Learners', 'Teachers'],
      downloadPermission: 'Allow authenticated users to download',
      lowDataVersion: true,
      language: 'English',
      estimatedStudyTime: '60 minutes',
      version: '1.0',
      author: 'Dr. Jane Smith',
      license: 'All rights reserved',
      approvalStatus: 'Draft',
    });

    expect(store.allResources().length).toBe(initialCount + 1);
    const created = store.allResources()[0];
    expect(created.title).toBe('Advanced Organic Chemistry Guide');
    expect(created.status).toBe('Draft');

    store.updateResourceStatus(created.id, 'Approved');
    const updated = store.allResources().find((r) => r.id === created.id);
    expect(updated?.status).toBe('Approved');

    store.deleteResource(created.id);
    expect(store.allResources().length).toBe(initialCount);

    store.setResourceDateRange('Jun 1 – Jun 30, 2025');
    expect(store.selectedResourceDateRange()).toBe('Jun 1 – Jun 30, 2025');
  });

  it('should initialize and manage system settings state', () => {
    expect(store.settingsTopMetrics().length).toBe(6);
    expect(store.settingsTabs().length).toBe(10);
    expect(store.activeSettingsTab()).toBe('general');
    expect(store.systemHealthItems().length).toBe(5);
    expect(store.recentConfigChanges().length).toBe(5);
    expect(store.settingsBottomMetrics().length).toBe(4);
    expect(store.systemSettings().platformIdentity.platformName).toBe('Learno');

    // Test tab change
    store.setActiveSettingsTab('security');
    expect(store.activeSettingsTab()).toBe('security');

    // Test updating identity
    store.updatePlatformIdentity({ platformName: 'Learno Education Hub' });
    expect(store.systemSettings().platformIdentity.platformName).toBe(
      'Learno Education Hub',
    );

    // Test updating academic defaults
    store.updateAcademicDefaults({
      gradingScaleTemplate: 'GPA (4.0 Scale)',
    });
    expect(store.systemSettings().academicDefaults.gradingScaleTemplate).toBe(
      'GPA (4.0 Scale)',
    );

    // Test updating access & security
    store.updateAccessSecurity({ sessionTimeout: '15 minutes' });
    expect(store.systemSettings().accessSecurity.sessionTimeout).toBe(
      '15 minutes',
    );

    // Test updating notifications
    store.updateNotifications({ emailAlerts: false });
    expect(store.systemSettings().notifications.emailAlerts).toBe(false);

    // Test updating file & storage
    store.updateFileStorage({ maxUploadSize: '500 MB' });
    expect(store.systemSettings().fileStorage.maxUploadSize).toBe('500 MB');

    // Test updating integrations
    store.updateIntegrations({ videoPlatform: 'Google Meet' });
    expect(store.systemSettings().integrations.videoPlatform).toBe(
      'Google Meet',
    );

    // Test updating feature controls
    store.updateFeatureControls({ liveClasses: false });
    expect(store.systemSettings().featureControls.liveClasses).toBe(false);

    // Test updating backup maintenance
    store.updateBackupMaintenance({ backupCadence: 'Hourly' });
    expect(store.systemSettings().backupMaintenance.backupCadence).toBe(
      'Hourly',
    );

    // Test save system settings
    const initialChangesCount = store.recentConfigChanges().length;
    store.saveSystemSettings('Custom security audit update');
    expect(store.recentConfigChanges().length).toBe(
      Math.min(9, initialChangesCount + 1),
    );
    expect(store.recentConfigChanges()[0].action).toBe(
      'Custom security audit update',
    );
    expect(store.lastSavedTimestamp()).toBeTruthy();

    // Test restore defaults
    store.restoreDefaultSettings();
    expect(store.systemSettings().platformIdentity.platformName).toBe('Learno');
    expect(store.recentConfigChanges()[0].action).toBe(
      'Restored system default configuration',
    );

    // Test maintenance mode toggle
    expect(store.maintenanceModeEnabled()).toBe(false);
    store.toggleMaintenanceMode(true);
    expect(store.maintenanceModeEnabled()).toBe(true);
    const maintMetric = store
      .settingsTopMetrics()
      .find((m) => m.id === 'maintenance-mode');
    expect(maintMetric?.value).toBe('On');

    store.toggleMaintenanceMode();
    expect(store.maintenanceModeEnabled()).toBe(false);
  });
});
