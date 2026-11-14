import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsBottomMetricsComponent } from './reports-bottom-metrics';
import { INITIAL_REPORT_BOTTOM_METRICS } from '../../data/super-admin-reports.data';

describe('ReportsBottomMetricsComponent', () => {
  let component: ReportsBottomMetricsComponent;
  let fixture: ComponentFixture<ReportsBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_REPORT_BOTTOM_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 4 bottom cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(4);
  });

  it('should display delivery rate and system status correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deliveryCard = compiled.querySelector(
      '[data-testid="report-bottom-delivery_success"]',
    );
    expect(deliveryCard?.textContent).toContain('Delivery Success Rate');
    expect(deliveryCard?.textContent).toContain('98.6%');

    const statusCard = compiled.querySelector(
      '[data-testid="report-bottom-system_status"]',
    );
    expect(statusCard?.textContent).toContain('All Systems Operational');
    expect(statusCard?.textContent).toContain('Healthy');
  });
});
