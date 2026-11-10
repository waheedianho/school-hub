import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsSidebarComponent } from './reports-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsSidebarComponent', () => {
  let component: ReportsSidebarComponent;
  let fixture: ComponentFixture<ReportsSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should render sidebar summary, attention areas, and quick action buttons', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('[data-testid="sidebar-summary-card"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="sidebar-attention-card"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="sidebar-actions-card"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('School Report Summary');
    expect(compiled.textContent).toContain('386');
    expect(compiled.textContent).toContain('28');
    expect(compiled.textContent).toContain('Priority Attention Areas');
    expect(compiled.textContent).toContain('Low mathematics average in JSS 1');
    expect(compiled.textContent).toContain('Export School Report');
    expect(compiled.textContent).toContain('Approve All Reports');
  });

  it('should trigger store actions when quick action buttons are clicked', () => {
    vi.spyOn(store, 'openExportReportModal');
    vi.spyOn(store, 'approveAllSchoolReports');
    vi.spyOn(store, 'setActiveReportTab');
    vi.spyOn(store, 'openShareLeadershipModal');

    component.onExportReport();
    expect(store.openExportReportModal).toHaveBeenCalled();

    component.onApproveAll();
    expect(store.approveAllSchoolReports).toHaveBeenCalled();

    component.onViewClassBreakdown();
    expect(store.setActiveReportTab).toHaveBeenCalledWith(
      'academic-performance',
    );

    component.onShareLeadership();
    expect(store.openShareLeadershipModal).toHaveBeenCalled();
  });

  it('should toggle attention area selection', () => {
    const area = store.priorityAttentionAreas()[0];
    component.onSelectArea(area);
    expect(store.selectedReportAttentionArea()?.id).toBe(area.id);
  });

  it('should refresh metrics and update timestamp', () => {
    component.refreshData();
    expect(component.lastUpdated()).toBeTruthy();
    expect(store.setupSaveStatus()).toContain('Report metrics refreshed');
  });
});
