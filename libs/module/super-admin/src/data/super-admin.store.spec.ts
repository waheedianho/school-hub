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
});
