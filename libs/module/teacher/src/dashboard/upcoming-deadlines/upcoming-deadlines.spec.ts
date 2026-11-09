import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UpcomingDeadlinesComponent } from './upcoming-deadlines';
import { TEACHER_UPCOMING_DEADLINES_DATA } from '../../data/teacher-dashboard.data';

describe('UpcomingDeadlinesComponent', () => {
  let component: UpcomingDeadlinesComponent;
  let fixture: ComponentFixture<UpcomingDeadlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingDeadlinesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingDeadlinesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('deadlines', TEACHER_UPCOMING_DEADLINES_DATA);
    fixture.detectChanges();
  });

  it('should create and render deadline items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.deadline-item');
    expect(items.length).toBe(3);
  });

  it('should display titles and days left correctly', () => {
    const titles = fixture.nativeElement.querySelectorAll('.deadline-title');
    expect(titles[0].textContent).toContain('Comprehension Quiz (JSS 2B)');
    const dates = fixture.nativeElement.querySelectorAll('.deadline-date');
    expect(dates[0].textContent).toContain('3 days left');
  });

  it('should render appropriate status pills', () => {
    const pills = fixture.nativeElement.querySelectorAll('.status-pill');
    expect(pills[0].textContent).toContain('Due Soon');
    expect(pills[1].textContent).toContain('Upcoming');
  });
});
