import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsMetricsComponent } from './subscriptions-metrics';
import { INITIAL_SUBSCRIPTION_METRICS } from '../../data/super-admin-subscriptions.data';

describe('SubscriptionsMetricsComponent', () => {
  let component: SubscriptionsMetricsComponent;
  let fixture: ComponentFixture<SubscriptionsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', INITIAL_SUBSCRIPTION_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 6 metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.metric-card');
    expect(cards.length).toBe(6);
  });

  it('should display active subscriptions metric correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const activeSubCard = compiled.querySelector(
      '[data-testid="metric-active_subs"]',
    );
    expect(activeSubCard).toBeTruthy();
    expect(activeSubCard?.textContent).toContain('Active Subscriptions');
    expect(activeSubCard?.textContent).toContain('248');
    expect(activeSubCard?.textContent).toContain('8.7%');
  });
});
