import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModalComponent } from './schedule-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ScheduleModalComponent', () => {
  let component: ScheduleModalComponent;
  let fixture: ComponentFixture<ScheduleModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should schedule new live class when valid form submitted', () => {
    const initialCount = store.liveClassRecords().length;
    component.className.set('SSS 2A');
    component.subject.set('Physics');
    component.topic.set('Magnetic Fields');
    component.teacherName.set('Dr. Kelechi Nwosu');
    component.startTime.set('10:00 AM');

    component.onSubmit();

    expect(store.liveClassRecords().length).toBe(initialCount + 1);
    expect(store.liveClassRecords()[0].topic).toBe('Magnetic Fields');
    expect(store.isScheduleModalOpen()).toBe(false);
  });

  it('should close modal when cancel clicked', () => {
    store.openScheduleModal();
    expect(store.isScheduleModalOpen()).toBe(true);

    component.onClose();
    expect(store.isScheduleModalOpen()).toBe(false);
  });
});
