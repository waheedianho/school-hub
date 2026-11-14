import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsComponent } from './reports';
import { SuperAdminStore } from '../data/super-admin.store';
import { INITIAL_QUICK_REPORT_TEMPLATES } from '../data/super-admin-reports.data';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent],
      providers: [SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create and render Reports page with header and subtitle', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Reports',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Generate and review platform-wide academic, operational, subscription, and compliance reports',
    );
  });

  it('should switch tabs and update store', () => {
    component.selectTab('School Performance');
    expect(store.selectedReportTab()).toBe('School Performance');

    component.selectTab('Safeguarding Reports');
    expect(store.selectedReportTab()).toBe('Safeguarding Reports');
  });

  it('should open and close modals', () => {
    expect(component.isCreateReportModalOpen()).toBe(false);
    component.openCreateReportModal();
    expect(component.isCreateReportModalOpen()).toBe(true);
    component.closeCreateReportModal();
    expect(component.isCreateReportModalOpen()).toBe(false);

    expect(component.isScheduleReportModalOpen()).toBe(false);
    component.openScheduleReportModal();
    expect(component.isScheduleReportModalOpen()).toBe(true);
    component.closeScheduleReportModal();
    expect(component.isScheduleReportModalOpen()).toBe(false);
  });

  it('should handle custom report creation and schedule dispatch', () => {
    const initialReports = store.platformReports().length;
    component.onReportCreated({
      reportName: 'New Executive Dashboard Report',
      description: 'Monthly summary for stakeholders',
      category: 'School Performance',
      scope: 'All Schools',
      frequency: 'Monthly',
      format: 'PDF, XLSX',
      includeCharts: true,
      notifyRecipients: true,
    });

    expect(store.platformReports().length).toBe(initialReports + 1);
    expect(component.toastMessage()).toContain(
      'New Executive Dashboard Report',
    );

    const firstRep = store.platformReports()[0];
    component.onReportScheduled({
      reportId: firstRep.id,
      scheduleTime: 'Jun 12, 2025 • 08:00 AM',
      frequency: 'Weekly',
      deliveryEmail: 'admin@school.edu',
      format: 'PDF',
    });

    expect(component.toastMessage()).toContain(
      'Automated report schedule created',
    );
  });

  it('should handle template selection and quick actions', () => {
    component.onQuickTemplateSelected(INITIAL_QUICK_REPORT_TEMPLATES[0]);
    expect(component.isCreateReportModalOpen()).toBe(true);
    expect(component.toastMessage()).toContain(
      'Monthly School Performance Pack',
    );
  });
});
