import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleReportModalComponent } from './schedule-report-modal';
import { INITIAL_PLATFORM_REPORTS } from '../../data/super-admin-reports.data';

describe('ScheduleReportModalComponent', () => {
  let component: ScheduleReportModalComponent;
  let fixture: ComponentFixture<ScheduleReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleReportModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleReportModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reports', INITIAL_PLATFORM_REPORTS);
    fixture.detectChanges();
  });

  it('should create and load reports into selector', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('select option');
    expect(options.length).toBeGreaterThan(1);
  });

  it('should emit reportScheduled when form is submitted', () => {
    const emitSpy = vi.fn();
    component.reportScheduled.subscribe(emitSpy);

    const firstRep = INITIAL_PLATFORM_REPORTS[0];
    component.selectedReportId.set(firstRep.id);
    component.scheduleTime.set('Jun 15, 2025 • 10:00 AM');
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        reportId: firstRep.id,
        scheduleTime: 'Jun 15, 2025 • 10:00 AM',
      }),
    );
  });

  it('should emit closed when cancel button is clicked', () => {
    const closeSpy = vi.fn();
    component.closed.subscribe(closeSpy);

    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
