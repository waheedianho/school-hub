import { TestBed } from '@angular/core/testing';
import { SuperAdminStore } from './super-admin.store';

describe('SuperAdminStore', () => {
  let store: SuperAdminStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminStore],
    });
    store = TestBed.inject(SuperAdminStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial dashboard metrics loaded', () => {
    expect(store.metrics().length).toBe(6);
    expect(store.metrics()[0].label).toBe('Total Schools');
    expect(store.metrics()[0].value).toBe('1,248');
  });

  it('should compute attention schools count correctly', () => {
    expect(store.attentionSchoolsCount()).toBe(5);
  });

  it('should compute open tickets count correctly', () => {
    expect(store.openTicketsCount()).toBe(2);
  });

  it('should dismiss safeguarding alerts', () => {
    const initialCount = store.safeguardingAlerts().length;
    store.dismissAlert('alert-1');
    expect(store.safeguardingAlerts().length).toBe(initialCount - 1);
  });

  it('should resolve support tickets', () => {
    store.resolveTicket('ticket-1');
    const ticket = store.supportTickets().find((t) => t.id === 'ticket-1');
    expect(ticket?.status).toBe('Resolved');
  });

  it('should update date range and period filters', () => {
    store.setDateRange('Last 7 Days');
    expect(store.selectedDateRange()).toBe('Last 7 Days');

    store.setUsagePeriod('Last 30 Days');
    expect(store.selectedUsagePeriod()).toBe('Last 30 Days');

    store.setRevenuePeriod('This Quarter');
    expect(store.selectedRevenuePeriod()).toBe('This Quarter');
  });
});
