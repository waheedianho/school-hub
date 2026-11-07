import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CurrentTopicsComponent } from './current-topics';
import { TEACHER_CLASS_TOPICS_DATA } from '../../data/teacher-dashboard.data';

describe('CurrentTopicsComponent', () => {
  let component: CurrentTopicsComponent;
  let fixture: ComponentFixture<CurrentTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTopicsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTopicsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('topics', TEACHER_CLASS_TOPICS_DATA);
    fixture.detectChanges();
  });

  it('should create and render class topics table rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should display class names, topics, and scores correctly', () => {
    const classNames = fixture.nativeElement.querySelectorAll('.class-name');
    expect(classNames[0].textContent).toContain('JSS 1A');
    expect(classNames[1].textContent).toContain('JSS 2B');

    const scores = fixture.nativeElement.querySelectorAll('.score-number');
    expect(scores[0].textContent).toContain('74%');
    expect(scores[1].textContent).toContain('68%');
  });

  it('should determine correct score tones', () => {
    expect(component.getScoreTone(74)).toBe('green');
    expect(component.getScoreTone(68)).toBe('blue');
    expect(component.getScoreTone(61)).toBe('orange');
  });
});
