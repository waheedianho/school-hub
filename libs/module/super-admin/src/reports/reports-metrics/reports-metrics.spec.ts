import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsMetricsComponent } from './reports-metrics';
import { INITIAL_REPORT_METRICS } from '../../data/super-admin-reports.data';

describe('ReportsMetricsComponent', () => {
  let component: ReportsMetricsComponent;
  let fixture: ComponentFixture<ReportsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_REPORT_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 6 metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should display total reports generated correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector(
      '[data-testid="report-metric-total_reports"]',
    );
    expect(card).toBeTruthy();
    expect(card?.textContent).toContain('Total Reports Generated');
    expect(card?.textContent).toContain('1,248');
    expect(card?.textContent).toContain('8.3%');
  });
});
