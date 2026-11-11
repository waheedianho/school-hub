import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationMessagesTableComponent } from './messages-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CommunicationMessagesTableComponent', () => {
  let component: CommunicationMessagesTableComponent;
  let fixture: ComponentFixture<CommunicationMessagesTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationMessagesTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationMessagesTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders all design table rows and columns', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBeGreaterThanOrEqual(6);

    // Verify first row matches msg-001 from design
    const firstRow = rows[0];
    expect(firstRow.textContent).toContain('All Students & Parents');
    expect(firstRow.textContent).toContain(
      'School Assembly Notice - Friday, May 23, 2025',
    );
    expect(firstRow.textContent).toContain('General');
    expect(firstRow.textContent).toContain('School Admin');
    expect(firstRow.textContent).toContain('Delivered');
    expect(firstRow.textContent).toContain('May 20, 2025');
  });

  it('filters table rows when search query is entered', () => {
    component.onSearch('PTA');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('PTA Meeting Announcement');

    component.onSearch('');
    fixture.detectChanges();
  });

  it('filters table rows when audience dropdown changes', () => {
    component.onAudienceChange('All Parents');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((r) => {
      expect(r.textContent).toContain('All Parents');
    });

    component.onAudienceChange('All Audiences');
    fixture.detectChanges();
  });

  it('filters table rows when category dropdown changes', () => {
    component.onCategoryChange('Academics');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((r) => {
      expect(r.textContent).toContain('Academics');
    });

    component.onCategoryChange('All Categories');
    fixture.detectChanges();
  });

  it('filters table rows when status dropdown changes', () => {
    component.onStatusChange('Scheduled');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.table-row');
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((r) => {
      expect(r.textContent).toContain('Scheduled');
    });

    component.onStatusChange('All Statuses');
    fixture.detectChanges();
  });

  it('opens details modal when row is clicked', () => {
    const firstMsg = component.messages()[0];
    component.onRowClick(firstMsg);
    expect(store.selectedCommunicationMessage()?.id).toBe(firstMsg.id);
  });

  it('triggers resend when quick resend button is clicked on failed message', () => {
    component.onStatusChange('Failed');
    fixture.detectChanges();

    const failedMsg = component.messages()[0];
    expect(failedMsg.deliveryStatus).toBe('Failed');

    component.onResendMessage(failedMsg.id, new MouseEvent('click'));
    expect(
      store.communicationMessages().find((m) => m.id === failedMsg.id)
        ?.deliveryStatus,
    ).toBe('Delivered');

    component.onStatusChange('All Statuses');
    fixture.detectChanges();
  });
});
