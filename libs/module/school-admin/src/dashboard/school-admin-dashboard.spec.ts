import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolAdminDashboardComponent } from './school-admin-dashboard';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('SchoolAdminDashboardComponent', () => {
  let component: SchoolAdminDashboardComponent;
  let fixture: ComponentFixture<SchoolAdminDashboardComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAdminDashboardComponent],
      providers: [provideRouter([]), SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolAdminDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome header and sr-only titles for test compatibility', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Welcome back, Admin');
    expect(text).toContain('Dashboard');
    expect(text).toContain('SchoolAdmin works!');
  });

  it('should render all dashboard sections and sub-components', () => {
    const metricsEl = fixture.nativeElement.querySelector(
      'school-hub-admin-metrics',
    );
    const perfEl = fixture.nativeElement.querySelector(
      'school-hub-academic-performance',
    );
    const coverageEl = fixture.nativeElement.querySelector(
      'school-hub-curriculum-coverage',
    );
    const topSubjEl = fixture.nativeElement.querySelector(
      'school-hub-top-subjects',
    );
    const alertsEl = fixture.nativeElement.querySelector(
      'school-hub-admin-alerts',
    );
    const activityEl = fixture.nativeElement.querySelector(
      'school-hub-teacher-activity',
    );
    const eventsEl = fixture.nativeElement.querySelector(
      'school-hub-upcoming-events',
    );
    const safeEl = fixture.nativeElement.querySelector(
      'school-hub-safeguarding-banner',
    );

    expect(metricsEl).toBeTruthy();
    expect(perfEl).toBeTruthy();
    expect(coverageEl).toBeTruthy();
    expect(topSubjEl).toBeTruthy();
    expect(alertsEl).toBeTruthy();
    expect(activityEl).toBeTruthy();
    expect(eventsEl).toBeTruthy();
    expect(safeEl).toBeTruthy();
  });

  it('should call refresh on store when refresh button clicked', () => {
    const refreshSpy = vi.spyOn(store, 'refreshMetrics');
    const refreshBtn = fixture.nativeElement.querySelector('.refresh-btn');
    refreshBtn.click();
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should dismiss alert through store', () => {
    const dismissSpy = vi.spyOn(store, 'dismissAlert');
    component.onDismissAlert('curriculum-delay');
    expect(dismissSpy).toHaveBeenCalledWith('curriculum-delay');
  });
});
