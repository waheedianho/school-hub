import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LessonTimelineComponent } from './lesson-timeline';
import { TEACHER_LESSON_TIMELINE } from '../../data/teacher-lessons.data';

describe('LessonTimelineComponent', () => {
  let component: LessonTimelineComponent;
  let fixture: ComponentFixture<LessonTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonTimelineComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonTimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_LESSON_TIMELINE);
    fixture.detectChanges();
  });

  it('should create and render 3 timeline items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.timeline-item');
    expect(items.length).toBe(3);
  });

  it('should display class pills and times', () => {
    const pills = fixture.nativeElement.querySelectorAll('.class-pill');
    expect(pills[0].textContent).toContain('JSS 1A');
    expect(pills[1].textContent).toContain('JSS 1B');
    expect(pills[2].textContent).toContain('JSS 2A');

    const times = fixture.nativeElement.querySelectorAll('.time-range');
    expect(times[0].textContent).toContain('8:30 – 9:30 AM');
  });

  it('should render header link to View Calendar', () => {
    const link = fixture.nativeElement.querySelector('.card-header-link');
    expect(link.textContent).toContain('View Calendar');
  });
});
