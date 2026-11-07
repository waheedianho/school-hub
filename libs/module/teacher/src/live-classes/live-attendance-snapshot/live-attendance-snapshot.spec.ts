import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveAttendanceSnapshotComponent } from './live-attendance-snapshot';

describe('LiveAttendanceSnapshotComponent', () => {
  let component: LiveAttendanceSnapshotComponent;
  let fixture: ComponentFixture<LiveAttendanceSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveAttendanceSnapshotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveAttendanceSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the average rate and sessions count', () => {
    const rateEl = fixture.nativeElement.querySelector('.donut-percentage');
    const sessionsEl = fixture.nativeElement.querySelector('.sessions-count');

    expect(rateEl.textContent.trim()).toBe('87%');
    expect(sessionsEl.textContent.trim()).toBe('12');
  });
});
