import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceRecordingsComponent } from './attendance-recordings';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AttendanceRecordingsComponent', () => {
  let component: AttendanceRecordingsComponent;
  let fixture: ComponentFixture<AttendanceRecordingsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceRecordingsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceRecordingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    expect(store).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display cohort attendance statistics and published recordings', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Live Class Attendance by Class Cohort');
    expect(el.textContent).toContain('Published Class Recordings Archive');
    expect(component.recordedClasses().length).toBeGreaterThan(0);
  });

  it('should open and close player modal', () => {
    const recording = component.recordedClasses()[0];
    component.onPlayRecording(recording);
    expect(component.selectedRecording()?.id).toBe(recording.id);

    component.closePlayer();
    expect(component.selectedRecording()).toBeNull();
  });
});
