import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesTableComponent } from './resources-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ResourcesTableComponent', () => {
  let component: ResourcesTableComponent;
  let fixture: ComponentFixture<ResourcesTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    // Reset store filters
    store.setActiveResourcesTab('library');
    store.setResourceSearchQuery('');
    store.setResourceClassFilter('All Classes');
    store.setResourceSubjectFilter('All Subjects');
    store.setResourceTypeFilter('All Types');
    store.setResourceStatusFilter('All Statuses');
    store.setResourcePage(1);

    fixture.detectChanges();
  });

  it('should render 11 table column headers', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const ths = compiled.querySelectorAll('thead th');

    expect(ths.length).toBe(12);
    expect(ths[0].textContent).toContain('Class');
    expect(ths[1].textContent).toContain('Subject');
    expect(ths[2].textContent).toContain('Week / Topic');
    expect(ths[3].textContent).toContain('Resource Title');
    expect(ths[4].textContent).toContain('Resource Type');
    expect(ths[5].textContent).toContain('Audience');
    expect(ths[6].textContent).toContain('Format');
    expect(ths[7].textContent).toContain('Approval Status');
    expect(ths[8].textContent).toContain('Linked Delivery Pack');
    expect(ths[9].textContent).toContain('Uploaded By');
    expect(ths[10].textContent).toContain('Last Updated');
    expect(ths[11].textContent).toContain('Actions');
  });

  it('should render table rows from mock data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');

    expect(rows.length).toBeGreaterThanOrEqual(10);
    expect(compiled.textContent).toContain('Whole Numbers Lesson Note');
    expect(compiled.textContent).toContain('Parts of Speech Video');
    expect(compiled.textContent).toContain('Living Things Worksheet');
    expect(compiled.textContent).toContain('Mr. Tunde A.');
    expect(compiled.textContent).toContain('JSS 1A - Math W1');
  });

  it('should filter table when search input is typed', () => {
    component.onSearch('Living Things');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Living Things Worksheet');
    expect(compiled.textContent).not.toContain('Whole Numbers Lesson Note');
  });

  it('should filter table when class filter changes', () => {
    component.onClassChange('JSS 1A');
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll(
      'tbody tr.table-row',
    ) as NodeListOf<HTMLElement>;
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((row) => {
      expect(row.textContent).toContain('JSS 1A');
      expect(row.textContent).not.toContain('JSS 1B');
    });
  });

  it('should open details modal when row is clicked', () => {
    const firstRow = fixture.nativeElement.querySelector(
      'tbody tr.table-row',
    ) as HTMLElement;
    firstRow.click();
    fixture.detectChanges();

    expect(store.selectedResourceItem()).toBeTruthy();
    expect(store.selectedResourceItem()?.title).toBe(
      'Whole Numbers Lesson Note',
    );
  });

  it('should toggle action menu and handle approval', () => {
    // Find pending item
    const pendingItem = store
      .resources()
      .find((r) => r.approvalStatus === 'Pending Review');
    expect(pendingItem).toBeTruthy();
    if (!pendingItem) return;

    const mockEvent = new MouseEvent('click');
    component.toggleActionMenu(pendingItem.id, mockEvent);
    expect(component.activeActionMenuId()).toBe(pendingItem.id);

    component.onApprove(pendingItem.id, mockEvent);
    expect(component.activeActionMenuId()).toBeNull();

    const updated = store.resources().find((r) => r.id === pendingItem.id);
    expect(updated?.approvalStatus).toBe('Approved');
  });

  it('should handle pagination controls', () => {
    component.onPageChange(2);
    fixture.detectChanges();

    expect(store.resourcePage()).toBe(2);
  });
});
