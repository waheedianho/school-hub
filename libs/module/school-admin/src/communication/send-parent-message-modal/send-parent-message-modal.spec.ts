import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendParentMessageModalComponent } from './send-parent-message-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('SendParentMessageModalComponent', () => {
  let component: SendParentMessageModalComponent;
  let fixture: ComponentFixture<SendParentMessageModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendParentMessageModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SendParentMessageModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openSendParentMessageModal();
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('updates form fields correctly', () => {
    component.updateField('className', 'SSS 1A');
    component.updateField('subject', 'Term 3 Examination Timetable');
    component.updateField('category', 'Academics');
    component.updateField('priority', 'High');

    expect(component.formData().className).toBe('SSS 1A');
    expect(component.formData().subject).toBe('Term 3 Examination Timetable');
    expect(component.formData().priority).toBe('High');
  });

  it('submits parent message form to store', () => {
    const sendSpy = vi.spyOn(store, 'sendParentMessage');
    component.updateField('subject', 'PTA Executive Meeting Follow-up');
    component.updateField(
      'body',
      'Minutes and action items from yesterday’s meeting.',
    );
    component.onSubmit();

    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'PTA Executive Meeting Follow-up',
        body: 'Minutes and action items from yesterday’s meeting.',
      }),
    );
  });

  it('closes modal on cancel', () => {
    const closeSpy = vi.spyOn(store, 'closeSendParentMessageModal');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
