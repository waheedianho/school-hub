import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlanModalComponent } from './create-plan-modal';

describe('CreatePlanModalComponent', () => {
  let component: CreatePlanModalComponent;
  let fixture: ComponentFixture<CreatePlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlanModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize with default plan values', () => {
    expect(component).toBeTruthy();
    expect(component.planName()).toBe('Professional');
    expect(component.priceAnnual()).toBe(5000);
  });

  it('should emit planCreated when form is submitted', () => {
    const emitSpy = vi.fn();
    component.planCreated.subscribe(emitSpy);

    component.tagline.set('Custom test tier');
    component.priceAnnual.set(6000);
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Professional',
        tagline: 'Custom test tier',
        priceAnnual: 6000,
      }),
    );
  });

  it('should emit closed when cancel button or close icon is clicked', () => {
    const closeSpy = vi.fn();
    component.closed.subscribe(closeSpy);

    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
