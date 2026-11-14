import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionsTableComponent } from './subscriptions-table';
import { INITIAL_SCHOOL_SUBSCRIPTIONS } from '../../data/super-admin-subscriptions.data';

describe('SubscriptionsTableComponent', () => {
  let component: SubscriptionsTableComponent;
  let fixture: ComponentFixture<SubscriptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'subscriptions',
      INITIAL_SCHOOL_SUBSCRIPTIONS,
    );
    fixture.componentRef.setInput(
      'totalCount',
      INITIAL_SCHOOL_SUBSCRIPTIONS.length,
    );
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 1);
    fixture.componentRef.setInput('pageSize', 7);
    fixture.componentRef.setInput('searchQuery', '');
    fixture.componentRef.setInput('selectedPlan', 'All Plans');
    fixture.componentRef.setInput('selectedStatus', 'All Billing Statuses');
    fixture.componentRef.setInput('renewalSort', 'asc');
    fixture.detectChanges();
  });

  it('should create and render table rows for each subscription', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBe(7);
  });

  it('should display school details and status badges correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('tbody tr.table-row');
    expect(firstRow?.textContent).toContain('Greenfield International School');
    expect(firstRow?.textContent).toContain('greenfield.edu');
    expect(firstRow?.textContent).toContain('Enterprise');
    expect(firstRow?.textContent).toContain('Active');
    expect(firstRow?.textContent).toContain('$12,000.00');
  });

  it('should emit events on search, filter, and action button clicks', () => {
    const searchSpy = vi.fn();
    const createPlanSpy = vi.fn();
    const generateInvoiceSpy = vi.fn();
    const exportSpy = vi.fn();

    component.searchChange.subscribe(searchSpy);
    component.createPlanClicked.subscribe(createPlanSpy);
    component.generateInvoiceClicked.subscribe(generateInvoiceSpy);
    component.exportClicked.subscribe(exportSpy);

    component.onSearchInput('Sunrise');
    expect(searchSpy).toHaveBeenCalledWith('Sunrise');

    const compiled = fixture.nativeElement as HTMLElement;
    const primaryBtn = compiled.querySelector(
      '.btn-primary',
    ) as HTMLButtonElement;
    primaryBtn.click();
    expect(createPlanSpy).toHaveBeenCalled();
  });
});
