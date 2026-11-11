import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleBlastModalComponent } from './schedule-blast-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ScheduleBlastModalComponent', () => {
  let component: ScheduleBlastModalComponent;
  let fixture: ComponentFixture<ScheduleBlastModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleBlastModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleBlastModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.openScheduleBlastModal();
    fixture.detectChanges();
  });

  it('creates successfully', () => {
    expect(component).toBeTruthy();
  });

  it('submits scheduled message blast', () => {
    const createSpy = vi.spyOn(store, 'createAnnouncement');
    component.blastTitle.set('Important Sports Day Timetable');
    component.messageContent.set('Check the schedule for all sports events.');
    component.onSubmit();

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Important Sports Day Timetable',
        body: 'Check the schedule for all sports events.',
        scheduleDate: 'May 28, 2025',
        scheduleTime: '09:00 AM',
      }),
    );
  });

  it('closes dialog on cancel', () => {
    const closeSpy = vi.spyOn(store, 'closeScheduleBlastModal');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
