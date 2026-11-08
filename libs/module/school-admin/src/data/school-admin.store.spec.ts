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
});
