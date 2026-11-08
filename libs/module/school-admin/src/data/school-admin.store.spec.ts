import { TestBed } from '@angular/core/testing';
import { SchoolAdminStore } from './school-admin.store';

describe('SchoolAdminStore', () => {
  let store: SchoolAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolAdminStore],
    });
    store = TestBed.inject(SchoolAdminStore);
  });

  it('should be created and have initial state matching designs', () => {
    expect(store).toBeTruthy();
    expect(store.currentSession()).toBe('2024/2025 Academic Session');
    expect(store.currentTerm()).toBe('Third Term');
    expect(store.metrics().length).toBe(6);
    expect(store.classes().length).toBe(12);
    expect(store.staff().length).toBe(8);
    expect(store.alerts().length).toBe(4);
    expect(store.academicStructure().classArms).toBe(2);
    expect(store.assessmentSettings().gradingScale).toContain('A - F');
    expect(store.rolePermissions().length).toBe(4);
    expect(store.communicationSafeguarding().safeguardingContact).toContain(
      'safeguarding@greenfield.edu.ng',
    );
    expect(store.setupChecklist().length).toBe(7);
    expect(store.setupQuickActions().length).toBe(3);
  });

  it('should correctly compute active session and term objects', () => {
    const session = store.activeSessionObj();
    expect(session.name).toBe('2024/2025 Academic Session');
    expect(session.isActive).toBe(true);

    const term = store.activeTermObj();
    expect(term.name).toBe('Third Term');
    expect(term.isCurrent).toBe(true);
  });

  it('should switch session and auto-select its active term', () => {
    store.switchSession('2023/2024 Academic Session');
    expect(store.currentSession()).toBe('2023/2024 Academic Session');
    expect(store.activeSessionObj().id).toBe('session-2023-2024');
  });

  it('should switch term independently', () => {
    store.switchTerm('First Term');
    expect(store.currentTerm()).toBe('First Term');
    expect(store.activeTermObj().name).toBe('First Term');
  });

  it('should dismiss an alert and reduce alert count', () => {
    const initialCount = store.alerts().length;
    const alertToDismiss = store.alerts()[0].id;

    store.dismissAlert(alertToDismiss);
    expect(store.alerts().length).toBe(initialCount - 1);
    expect(store.alerts().some((a) => a.id === alertToDismiss)).toBe(false);
  });

  it('should update timestamp when refreshMetrics is called', () => {
    store.refreshMetrics();
    expect(store.lastUpdated()).toContain('Today,');
  });

  it('should retrieve classes and staff by ID', () => {
    const cls = store.getClassById('class-jss-1a');
    expect(cls).toBeDefined();
    expect(cls?.name).toBe('JSS 1A');
    expect(cls?.classTeacher).toBe('Mrs. Fatima Yusuf');

    const staff = store.getStaffById('TCH-1001');
    expect(staff).toBeDefined();
    expect(staff?.name).toBe('Mrs. Fatima Yusuf');

    const nonExistent = store.getClassById('unknown-id');
    expect(nonExistent).toBeUndefined();
  });

  it('should retrieve learners by class ID', () => {
    const learners = store.getLearnersByClass('class-jss-1a');
    expect(learners.length).toBeGreaterThan(0);
    expect(learners.every((l) => l.classId === 'class-jss-1a')).toBe(true);
  });

  it('should compute summary counts correctly', () => {
    expect(store.totalClassesCount()).toBe(12);
    expect(store.totalStaffCount()).toBe(8);
    expect(store.criticalAlertsCount()).toBe(2);
    expect(store.totalLearnersCount()).toBeGreaterThan(200);
  });

  it('should update school profile fields', () => {
    store.updateSchoolProfile({
      name: 'Greenfield International College',
      phone: '+234 800 000 0000',
    });
    expect(store.profile().name).toBe('Greenfield International College');
    expect(store.profile().phone).toBe('+234 800 000 0000');
  });

  it('should update academic structure', () => {
    store.updateAcademicStructure({
      classArms: 3,
      namingConvention: 'Year 7 - Year 12',
    });
    expect(store.academicStructure().classArms).toBe(3);
    expect(store.academicStructure().namingConvention).toBe('Year 7 - Year 12');
  });

  it('should update assessment reporting settings', () => {
    store.updateAssessmentSettings({
      classworkWeight: 25,
      assessmentsWeight: 35,
      examsWeight: 40,
    });
    expect(store.assessmentSettings().classworkWeight).toBe(25);
    expect(store.assessmentSettings().assessmentsWeight).toBe(35);
    expect(store.assessmentSettings().examsWeight).toBe(40);
  });

  it('should toggle role permissions', () => {
    const teacherPerm = store
      .rolePermissions()
      .find((r) => r.role === 'Teacher');
    expect(teacherPerm?.auditLogs).toBe(false);

    store.toggleRolePermission('Teacher', 'auditLogs');
    const updated = store.rolePermissions().find((r) => r.role === 'Teacher');
    expect(updated?.auditLogs).toBe(true);
  });

  it('should update communication and safeguarding settings', () => {
    store.updateCommunicationSafeguarding({
      parentCommunicationPreference: 'SMS Only',
      safeguardingContact: 'lead@greenfield.edu.ng',
    });
    expect(
      store.communicationSafeguarding().parentCommunicationPreference,
    ).toBe('SMS Only');
    expect(store.communicationSafeguarding().safeguardingContact).toBe(
      'lead@greenfield.edu.ng',
    );
  });

  it('should toggle setup checklist item status', () => {
    const item = store.setupChecklist().find((i) => i.id === 'chk-7');
    expect(item?.status).toBe('In Progress');

    store.toggleChecklistItem('chk-7');
    const updated = store.setupChecklist().find((i) => i.id === 'chk-7');
    expect(updated?.status).toBe('Completed');
  });

  it('should record save setup changes and publish settings', () => {
    expect(store.setupSaveStatus()).toBeNull();
    store.saveSetupChanges();
    expect(store.setupSaveStatus()).toContain('All changes saved at');

    store.publishSettings();
    expect(store.lastPublished()).not.toBe('Never');
    expect(store.setupSaveStatus()).toContain(
      'Settings published successfully',
    );
  });
});
