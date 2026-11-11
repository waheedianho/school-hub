import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleMeetingModalComponent } from './schedule-meeting-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ScheduleMeetingModalComponent', () => {
  let component: ScheduleMeetingModalComponent;
  let fixture: ComponentFixture<ScheduleMeetingModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleMeetingModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleMeetingModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    store.closeScheduleParentMeetingModal();
    fixture.detectChanges();
  });

  it('should not render dialog when closed', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should render dialog when opened', () => {
    store.openScheduleParentMeetingModal();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-backdrop')).toBeTruthy();
    expect(
      compiled.querySelector('#schedule-meeting-title')?.textContent,
    ).toContain('Schedule Parent Meeting');
  });

  it('should close when cancel or close button is clicked', () => {
    store.openScheduleParentMeetingModal();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.btn-close',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(store.isScheduleParentMeetingModalOpen()).toBe(false);

    store.openScheduleParentMeetingModal();
    fixture.detectChanges();

    const cancelBtn = fixture.nativeElement.querySelector(
      '.btn-cancel',
    ) as HTMLButtonElement;
    cancelBtn.click();
    fixture.detectChanges();

    expect(store.isScheduleParentMeetingModalOpen()).toBe(false);
  });

  it('should submit parent meeting and close modal', () => {
    store.openScheduleParentMeetingModal();
    fixture.detectChanges();

    component.updateField('learnerName', 'Bello, Chiamaka');
    component.updateField('parentName', 'Chief & Mrs. Bello');
    component.updateField('parentPhone', '+234 802 999 8888');
    component.updateField('meetingDate', '2025-05-25');
    component.updateField('meetingTime', '02:00 PM');
    component.updateField('meetingType', 'Virtual');
    component.updateField('agenda', 'Attendance remediation conference');

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    submitBtn.click();
    fixture.detectChanges();

    expect(store.isScheduleParentMeetingModalOpen()).toBe(false);
  });

  it('should disable submit when required fields are empty', () => {
    store.openScheduleParentMeetingModal();
    fixture.detectChanges();

    component.updateField('learnerName', '');
    component.updateField('parentName', '');
    component.updateField('meetingDate', '');
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '.btn-submit',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });
});
