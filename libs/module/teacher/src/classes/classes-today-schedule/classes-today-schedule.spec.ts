import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassesTodayScheduleComponent } from './classes-today-schedule';
import { TEACHER_CLASS_SCHEDULE_DATA } from '../../data/teacher-classes.data';

describe('ClassesTodayScheduleComponent', () => {
  let component: ClassesTodayScheduleComponent;
  let fixture: ComponentFixture<ClassesTodayScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesTodayScheduleComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesTodayScheduleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_CLASS_SCHEDULE_DATA);
    fixture.detectChanges();
  });

  it('should create and render all schedule items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.schedule-item-card');
    expect(items.length).toBe(3);
  });

  it('should display class names, topics, and status pills', () => {
    const classNames = fixture.nativeElement.querySelectorAll(
      '.schedule-class-name',
    );
    expect(classNames[0].textContent).toContain('JSS 1A');
    expect(classNames[1].textContent).toContain('JSS 1C');
    expect(classNames[2].textContent).toContain('JSS 1B');

    const pills = fixture.nativeElement.querySelectorAll('.status-pill');
    expect(pills[0].textContent).toContain('LIVE NOW');
    expect(pills[1].textContent).toContain('UP NEXT');
    expect(pills[2].textContent).toContain('SCHEDULED');
  });

  it('should render header link to view all', () => {
    const link = fixture.nativeElement.querySelector('.card-header-link');
    expect(link.textContent).toContain('View all');
    expect(link.getAttribute('href')).toBe('/teacher/live-classes');
  });
});
