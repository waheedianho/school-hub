import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsBottomMetricsComponent } from './subscriptions-bottom-metrics';
import { INITIAL_BOTTOM_METRICS } from '../../data/super-admin-subscriptions.data';

describe('SubscriptionsBottomMetricsComponent', () => {
  let component: SubscriptionsBottomMetricsComponent;
  let fixture: ComponentFixture<SubscriptionsBottomMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsBottomMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsBottomMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_BOTTOM_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 5 bottom metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.bottom-card');
    expect(cards.length).toBe(5);
  });

  it('should display invoices sent and system status correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const invCard = compiled.querySelector(
      '[data-testid="bottom-metric-invoices_sent"]',
    );
    expect(invCard?.textContent).toContain('Invoices Sent');
    expect(invCard?.textContent).toContain('176');

    const statusCard = compiled.querySelector(
      '[data-testid="bottom-metric-system_status"]',
    );
    expect(statusCard?.textContent).toContain('All Systems Operational');
    expect(statusCard?.textContent).toContain('Healthy');
  });
});
