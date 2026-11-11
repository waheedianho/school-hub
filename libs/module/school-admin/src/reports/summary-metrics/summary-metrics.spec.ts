import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ReportsSummaryMetricsComponent', () => {
  let component: ReportsSummaryMetricsComponent;
  let fixture: ComponentFixture<ReportsSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render all 6 metric cards', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-testid="metric-school-average"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-learners-reported"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-classes-analysed"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-subjects-analysed"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-attendance-average"]'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-testid="metric-completion-rate"]'),
    ).toBeTruthy();

    expect(compiled.textContent).toContain('74.8%');
    expect(compiled.textContent).toContain('386');
    expect(compiled.textContent).toContain('12');
    expect(compiled.textContent).toContain('10');
    expect(compiled.textContent).toContain('91.6%');
    expect(compiled.textContent).toContain('89%');
  });

  it('should reflect store updates dynamically', () => {
    store.reportsSummaryMetrics.set({
      schoolAverage: 80,
      schoolAverageChange: 8,
      totalLearnersReported: 400,
      classesAnalysed: 14,
      subjectsAnalysed: 11,
      attendanceAverage: 95,
      attendanceAverageChange: 5,
      reportCompletionRate: 98,
      reportCompletionRateChange: 12,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('80%');
    expect(compiled.textContent).toContain('400');
    expect(compiled.textContent).toContain('14');
  });
});
