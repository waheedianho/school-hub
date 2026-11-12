import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard';
import { SuperAdminStore } from '../data/super-admin.store';

describe('SuperAdminDashboardComponent', () => {
  let component: SuperAdminDashboardComponent;
  let fixture: ComponentFixture<SuperAdminDashboardComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminDashboardComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperAdminDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(title.textContent).toContain('Super Admin Dashboard');
    expect(subtitle.textContent).toContain('Platform-wide operations');
  });

  it('should toggle date picker dropdown and select date range', () => {
    expect(component.isDatePickerOpen()).toBe(false);
    component.toggleDatePicker();
    expect(component.isDatePickerOpen()).toBe(true);

    component.selectDateRange('Last 7 Days');
    expect(store.selectedDateRange()).toBe('Last 7 Days');
    expect(component.isDatePickerOpen()).toBe(false);
  });

  it('should render all dashboard sections', () => {
    const el = fixture.nativeElement;
    expect(el.querySelector('school-hub-top-metrics')).toBeTruthy();
    expect(el.querySelector('school-hub-usage-trend-chart')).toBeTruthy();
    expect(
      el.querySelector('school-hub-subscription-status-card'),
    ).toBeTruthy();
    expect(el.querySelector('school-hub-content-readiness-card')).toBeTruthy();
    expect(el.querySelector('school-hub-revenue-summary-card')).toBeTruthy();
    expect(el.querySelector('school-hub-schools-attention-table')).toBeTruthy();
    expect(el.querySelector('school-hub-support-tickets-card')).toBeTruthy();
    expect(
      el.querySelector('school-hub-safeguarding-alerts-card'),
    ).toBeTruthy();
    expect(el.querySelector('school-hub-quick-actions-card')).toBeTruthy();
    expect(el.querySelector('school-hub-platform-health-bar')).toBeTruthy();
  });

  it('should handle dismiss alert and resolve ticket actions', () => {
    const initialAlerts = store.safeguardingAlerts().length;
    component.onDismissAlert('alert-1');
    expect(store.safeguardingAlerts().length).toBe(initialAlerts - 1);

    component.onResolveTicket('ticket-1');
    const resolvedTicket = store
      .supportTickets()
      .find((t) => t.id === 'ticket-1');
    expect(resolvedTicket?.status).toBe('Resolved');
  });
});
