import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageDetailsModalComponent } from './message-details-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('MessageDetailsModalComponent', () => {
  let component: MessageDetailsModalComponent;
  let fixture: ComponentFixture<MessageDetailsModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDetailsModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageDetailsModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    const testMsg = store.communicationMessages()[0];
    store.openMessageDetails(testMsg);
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('renders message title, meta cards, and delivery breakdown', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      'School Assembly Notice - Friday, May 23, 2025',
    );
    expect(compiled.textContent).toContain('All Students & Parents');
    expect(compiled.textContent).toContain('General');
    expect(compiled.textContent).toContain('2,184');
    expect(compiled.textContent).toContain('2,180');
    expect(compiled.textContent).toContain('4');
  });

  it('triggers resend action on failed message', () => {
    const failedMsg = store
      .communicationMessages()
      .find((m) => m.deliveryStatus === 'Failed');
    if (failedMsg) {
      store.openMessageDetails(failedMsg);
      fixture.detectChanges();

      const resendSpy = vi.spyOn(store, 'resendFailedMessage');
      component.onResend(failedMsg.id);
      expect(resendSpy).toHaveBeenCalledWith(failedMsg.id);
    }
  });

  it('closes dialog on close button click', () => {
    const closeSpy = vi.spyOn(store, 'closeMessageDetails');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
