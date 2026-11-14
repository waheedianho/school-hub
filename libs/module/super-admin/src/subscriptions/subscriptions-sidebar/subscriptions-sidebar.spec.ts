import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsSidebarComponent } from './subscriptions-sidebar';
import {
  INITIAL_BILLING_HEALTH,
  INITIAL_PLAN_DISTRIBUTION,
  INITIAL_RECENT_BILLING_ACTIVITY,
  INITIAL_RENEWAL_QUEUE,
  INITIAL_REVENUE_OVERVIEW,
} from '../../data/super-admin-subscriptions.data';

describe('SubscriptionsSidebarComponent', () => {
  let component: SubscriptionsSidebarComponent;
  let fixture: ComponentFixture<SubscriptionsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('revenueOverview', INITIAL_REVENUE_OVERVIEW);
    fixture.componentRef.setInput('renewalQueue', INITIAL_RENEWAL_QUEUE);
    fixture.componentRef.setInput(
      'recentActivity',
      INITIAL_RECENT_BILLING_ACTIVITY,
    );
    fixture.componentRef.setInput(
      'planDistribution',
      INITIAL_PLAN_DISTRIBUTION,
    );
    fixture.componentRef.setInput('billingHealth', INITIAL_BILLING_HEALTH);
    fixture.detectChanges();
  });

  it('should create and render all sidebar cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.sidebar-card');
    expect(cards.length).toBe(5); // Revenue, Renewal, Activity, and 2 half cards (Plan Distribution & Billing Health)
  });

  it('should display revenue overview and calculation values correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Revenue Overview (MTD)');
    expect(compiled.textContent).toContain('$129,359');
    expect(compiled.textContent).toContain('Subscriptions');
    expect(compiled.textContent).toContain('72.4%');
    expect(component.totalRevenueFormatted).toBe('$129,358'); // sum of categories
  });

  it('should display renewal queue items and badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Next 7 days');
    expect(compiled.textContent).toContain('Next 30 days');
    expect(compiled.textContent).toContain('Overdue');
  });

  it('should display billing health and plan distribution', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Plan Distribution');
    expect(compiled.textContent).toContain('Billing Health');
    expect(compiled.textContent).toContain('92%');
    expect(compiled.textContent).toContain('Healthy');
  });

  it('should emit view all events', () => {
    const viewRenewalsSpy = vi.fn();
    const viewActivitySpy = vi.fn();

    component.viewAllRenewals.subscribe(viewRenewalsSpy);
    component.viewAllActivity.subscribe(viewActivitySpy);

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.header-action-link');
    (links[0] as HTMLButtonElement).click();
    (links[1] as HTMLButtonElement).click();

    expect(viewRenewalsSpy).toHaveBeenCalled();
    expect(viewActivitySpy).toHaveBeenCalled();
  });
});
