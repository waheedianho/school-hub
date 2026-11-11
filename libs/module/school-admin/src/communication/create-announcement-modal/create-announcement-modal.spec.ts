import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAnnouncementModalComponent } from './create-announcement-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CreateAnnouncementModalComponent', () => {
  let component: CreateAnnouncementModalComponent;
  let fixture: ComponentFixture<CreateAnnouncementModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouncementModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openCreateAnnouncementModal();
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('updates form fields and channels correctly', () => {
    component.updateField('title', 'Annual Cultural Day Celebration');
    component.updateField('category', 'Events');
    component.toggleChannel('SMS');

    expect(component.formData().title).toBe('Annual Cultural Day Celebration');
    expect(component.formData().category).toBe('Events');
    expect(component.formData().channels).toContain('SMS');
  });

  it('toggles scheduled mode', () => {
    expect(component.isScheduled()).toBe(false);
    component.toggleScheduled(true);
    expect(component.isScheduled()).toBe(true);
    expect(component.formData().scheduleDate).toBe('May 25, 2025');

    component.toggleScheduled(false);
    expect(component.isScheduled()).toBe(false);
    expect(component.formData().scheduleDate).toBeUndefined();
  });

  it('submits announcement form to store', () => {
    const createSpy = vi.spyOn(store, 'createAnnouncement');
    component.updateField('title', 'Library Reopening Notice');
    component.updateField(
      'body',
      'The school library has been fully renovated.',
    );
    component.onSubmit();

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Library Reopening Notice',
        body: 'The school library has been fully renovated.',
      }),
    );
  });

  it('closes modal on cancel', () => {
    const closeSpy = vi.spyOn(store, 'closeCreateAnnouncementModal');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
