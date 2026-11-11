import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsExportModalComponent } from './export-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsExportModalComponent', () => {
  let component: ReportsExportModalComponent;
  let fixture: ComponentFixture<ReportsExportModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsExportModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsExportModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openExportReportModal();
    fixture.detectChanges();
  });

  it('should render export dialog with report scopes and format options', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Export School Performance Report');
    expect(compiled.textContent).toContain('PDF Document');
    expect(compiled.textContent).toContain('Excel Workbook');
    expect(compiled.textContent).toContain('CSV Archive');
  });

  it('should switch format and report type', () => {
    component.setFormat('Excel');
    expect(component.selectedFormat()).toBe('Excel');

    component.setReportType('Ministry Standard Terminal Report');
    expect(component.selectedReportType()).toBe(
      'Ministry Standard Terminal Report',
    );
  });

  it('should trigger store export on submit and close on cancel', () => {
    vi.spyOn(store, 'exportSchoolReport');
    vi.spyOn(store, 'closeExportReportModal');

    component.onSubmit();
    expect(store.exportSchoolReport).toHaveBeenCalledWith('PDF');

    component.onClose();
    expect(store.closeExportReportModal).toHaveBeenCalled();
  });
});
