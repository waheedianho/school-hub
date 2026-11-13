import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportDetailModalComponent } from './report-detail-modal';
import { INITIAL_PLATFORM_REPORTS } from '../../data/super-admin-reports.data';

describe('ReportDetailModalComponent', () => {
  let component: ReportDetailModalComponent;
  let fixture: ComponentFixture<ReportDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('report', INITIAL_PLATFORM_REPORTS[0]);
    fixture.detectChanges();
  });

  it('should create and render report details', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('School Performance Summary');
    expect(compiled.textContent).toContain('Overview of school performance');
    expect(compiled.textContent).toContain('School Performance');
    expect(compiled.textContent).toContain('Ready');
    expect(compiled.textContent).toContain('Super Admin');
  });

  it('should emit download when download button clicked', () => {
    const downloadSpy = vi.fn();
    component.download.subscribe(downloadSpy);

    const compiled = fixture.nativeElement as HTMLElement;
    const downloadBtn = compiled.querySelector(
      '.btn-download',
    ) as HTMLButtonElement;
    downloadBtn.click();

    expect(downloadSpy).toHaveBeenCalledWith(INITIAL_PLATFORM_REPORTS[0]);
  });

  it('should emit closed when close button clicked', () => {
    const closeSpy = vi.fn();
    component.closed.subscribe(closeSpy);

    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
