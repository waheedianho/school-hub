import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicesTableComponent } from './invoices-table';
import { INITIAL_SUBSCRIPTION_INVOICES } from '../../data/super-admin-subscriptions.data';

describe('InvoicesTableComponent', () => {
  let component: InvoicesTableComponent;
  let fixture: ComponentFixture<InvoicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('invoices', INITIAL_SUBSCRIPTION_INVOICES);
    fixture.detectChanges();
  });

  it('should create and render invoice rows', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr.invoice-row');
    expect(rows.length).toBe(INITIAL_SUBSCRIPTION_INVOICES.length);
  });

  it('should display invoice numbers and amounts correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('INV-2025-1042');
    expect(compiled.textContent).toContain('Greenfield International School');
    expect(compiled.textContent).toContain('$12,000.00');
    expect(compiled.textContent).toContain('Paid');
  });

  it('should emit downloadInvoice when receipt button is clicked', () => {
    const downloadSpy = vi.fn();
    component.downloadInvoice.subscribe(downloadSpy);

    const compiled = fixture.nativeElement as HTMLElement;
    const downloadBtn = compiled.querySelector(
      '.btn-download',
    ) as HTMLButtonElement;
    downloadBtn.click();

    expect(downloadSpy).toHaveBeenCalledWith(INITIAL_SUBSCRIPTION_INVOICES[0]);
  });
});
