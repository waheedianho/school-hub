import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestoreDefaultsModalComponent } from './restore-defaults-modal';

describe('RestoreDefaultsModalComponent', () => {
  let component: RestoreDefaultsModalComponent;
  let fixture: ComponentFixture<RestoreDefaultsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreDefaultsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestoreDefaultsModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('should create and render dialog when isOpen is true', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
  });

  it('should disable confirm button until "RESTORE" is typed', () => {
    expect(component.canConfirm).toBe(false);

    component.confirmationInput = 'restore';
    expect(component.canConfirm).toBe(true);

    component.confirmationInput = 'RESTORE';
    expect(component.canConfirm).toBe(true);

    component.confirmationInput = 'wrong';
    expect(component.canConfirm).toBe(false);
  });

  it('should emit confirmed when onConfirm is called with valid input', () => {
    let confirmed = false;
    component.confirmed.subscribe(() => (confirmed = true));

    component.confirmationInput = 'RESTORE';
    component.onConfirm();
    expect(confirmed).toBe(true);
  });

  it('should emit closeModal when cancel is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));
    component.onClose();
    expect(closed).toBe(true);
  });
});
