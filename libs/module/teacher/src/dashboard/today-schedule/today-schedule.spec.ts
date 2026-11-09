import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TodayScheduleComponent } from './today-schedule';
import { TEACHER_SCHEDULE_DATA } from '../../data/teacher-dashboard.data';

describe('TodayScheduleComponent', () => {
  let component: TodayScheduleComponent;
  let fixture: ComponentFixture<TodayScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayScheduleComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayScheduleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_SCHEDULE_DATA);
    fixture.detectChanges();
  });

  it('should create and render schedule rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('.timeline-row');
    expect(rows.length).toBe(4);
    expect(rows[0].classList.contains('is-first')).toBe(true);
    expect(rows[3].classList.contains('is-last')).toBe(true);
  });

  it('should display class titles, times, and correct status pills', () => {
    const titles = fixture.nativeElement.querySelectorAll('.session-title');
    expect(titles[0].textContent).toContain('JSS 1A English Language');
    const times = fixture.nativeElement.querySelectorAll('.time-col');
    expect(times[0].textContent).toContain('8:00 AM');

    const pills = fixture.nativeElement.querySelectorAll('.status-pill');
    expect(pills[0].textContent).toContain('Upcoming');
    expect(pills[2].textContent).toContain('In Progress');
  });

  it('should render timeline dots and continuous vertical lines', () => {
    const dots = fixture.nativeElement.querySelectorAll('.timeline-dot');
    expect(dots.length).toBe(4);
    expect(dots[0].classList.contains('dot-blue')).toBe(true);
    expect(dots[2].classList.contains('dot-green')).toBe(true);

    const lines = fixture.nativeElement.querySelectorAll('.timeline-line');
    expect(lines.length).toBe(4);
  });
});
