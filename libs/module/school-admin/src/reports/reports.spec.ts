import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsComponent } from './reports';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render master reports layout with 7 tabs and overview components', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Reports & Report Cards');
    expect(compiled.textContent).toContain('Third Term (2024/2025)');
    expect(compiled.textContent).toContain('Overview');
    expect(compiled.textContent).toContain('Academic Performance');
    expect(compiled.textContent).toContain('Attendance & Engagement');
    expect(compiled.textContent).toContain('Subject Analysis');
    expect(compiled.textContent).toContain('Teacher Performance');
    expect(compiled.textContent).toContain('Interventions');
    expect(compiled.textContent).toContain('Export');

    // Child components in overview
    expect(
      compiled.querySelector('school-hub-reports-summary-metrics'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-reports-performance-charts'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-reports-subject-summary-table'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-reports-highlight-cards'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-reports-sidebar')).toBeTruthy();
  });

  it('should switch tabs and display class report cards when academic-performance is selected', () => {
    component.selectTab('academic-performance');
    fixture.detectChanges();

    expect(store.activeReportTab()).toBe('academic-performance');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('school-hub-reports-class-report-cards'),
    ).toBeTruthy();
  });

  it('should trigger export modal when selecting export tab or clicking export button', () => {
    vi.spyOn(store, 'openExportReportModal');

    component.selectTab('export');
    expect(store.openExportReportModal).toHaveBeenCalled();

    component.onExport();
    expect(store.openExportReportModal).toHaveBeenCalledTimes(2);
  });

  it('should trigger approve all reports when header button is clicked', () => {
    vi.spyOn(store, 'approveAllSchoolReports');

    component.onApproveAll();
    expect(store.approveAllSchoolReports).toHaveBeenCalled();
  });
});
