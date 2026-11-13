import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateInvoiceModalComponent } from './generate-invoice-modal';
import { INITIAL_SCHOOL_SUBSCRIPTIONS } from '../../data/super-admin-subscriptions.data';

describe('GenerateInvoiceModalComponent', () => {
  let component: GenerateInvoiceModalComponent;
  let fixture: ComponentFixture<GenerateInvoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateInvoiceModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('schools', INITIAL_SCHOOL_SUBSCRIPTIONS);
    fixture.detectChanges();
  });

  it('should create and load schools into the selector', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('select option');
    expect(options.length).toBeGreaterThan(1);
  });

  it('should update amount and plan when a school is selected', () => {
    const firstSub = INITIAL_SCHOOL_SUBSCRIPTIONS[0];
    component.onSchoolChange(firstSub.id);

    expect(component.selectedSchoolId()).toBe(firstSub.id);
    expect(component.invoiceAmount()).toBe(firstSub.amount);
    expect(component.selectedPlan()).toBe(firstSub.plan);
  });

  it('should emit invoiceGenerated when form submitted', () => {
    const emitSpy = vi.fn();
    component.invoiceGenerated.subscribe(emitSpy);

    const firstSub = INITIAL_SCHOOL_SUBSCRIPTIONS[0];
    component.onSchoolChange(firstSub.id);
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        schoolName: firstSub.schoolName,
        amount: firstSub.amount,
        status: 'Pending',
      }),
    );
  });
});
