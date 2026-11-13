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
});
