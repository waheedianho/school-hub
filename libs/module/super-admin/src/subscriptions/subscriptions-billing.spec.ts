import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsBillingComponent } from './subscriptions-billing';
import { SuperAdminStore } from '../data/super-admin.store';

describe('SubscriptionsBillingComponent', () => {
  let component: SubscriptionsBillingComponent;
  let fixture: ComponentFixture<SubscriptionsBillingComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsBillingComponent],
      providers: [SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsBillingComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    fixture.detectChanges();
  });

  it('should create and render Subscriptions & Billing page', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Subscriptions & Billing',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Manage subscription plans, billing status, renewals, invoices, and platform revenue across all institutions.',
    );
  });

  it('should switch tabs and update store state', () => {
    component.selectTab('Active Billing');
    expect(store.selectedSubscriptionTab()).toBe('Active Billing');

    component.selectTab('Renewals');
    expect(store.selectedSubscriptionTab()).toBe('Renewals');

    component.selectTab('Invoices');
    expect(store.selectedSubscriptionTab()).toBe('Invoices');
  });

  it('should open and close modals', () => {
    expect(component.isCreatePlanModalOpen()).toBe(false);
    component.openCreatePlanModal();
    expect(component.isCreatePlanModalOpen()).toBe(true);
    component.closeCreatePlanModal();
    expect(component.isCreatePlanModalOpen()).toBe(false);

    expect(component.isGenerateInvoiceModalOpen()).toBe(false);
    component.openGenerateInvoiceModal();
    expect(component.isGenerateInvoiceModalOpen()).toBe(true);
    component.closeGenerateInvoiceModal();
    expect(component.isGenerateInvoiceModalOpen()).toBe(false);
  });

  it('should handle plan creation and invoice generation', () => {
    const initialPlans = store.subscriptionPlans().length;
    component.onPlanCreated({
      id: 'test-plan',
      name: 'Starter',
      tagline: 'Test tagline',
      priceAnnual: 2000,
      priceQuarterly: 600,
      priceMonthly: 200,
      maxLearners: 100,
      features: ['Test Feature'],
      activeSchoolsCount: 0,
    });

    expect(store.subscriptionPlans().length).toBe(initialPlans + 1);
    expect(component.toastMessage()).toContain('Plan "Starter" created');

    const initialInvoices = store.subscriptionInvoices().length;
    component.onInvoiceGenerated({
      invoiceNumber: 'INV-2025-5555',
      schoolName: 'Greenfield International School',
      schoolDomain: 'greenfield.edu',
      plan: 'Enterprise',
      amount: 12000,
      amountFormatted: '$12,000.00',
      issueDate: 'May 18, 2025',
      dueDate: 'Jun 18, 2025',
      status: 'Pending',
    });

    expect(store.subscriptionInvoices().length).toBe(initialInvoices + 1);
    expect(component.toastMessage()).toContain('INV-2025-5555 generated');
  });

  it('should handle date picker selection', () => {
    component.toggleDatePicker();
    expect(component.isDatePickerOpen()).toBe(true);

    component.selectDateRange('Last 30 Days');
    expect(store.selectedSubscriptionsDateRange()).toBe('Last 30 Days');
    expect(component.isDatePickerOpen()).toBe(false);
  });
});
