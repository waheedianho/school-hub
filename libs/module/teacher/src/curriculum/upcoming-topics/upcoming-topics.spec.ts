import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UpcomingTopicsComponent } from './upcoming-topics';
import { TEACHER_UPCOMING_TOPICS } from '../../data/teacher-curriculum.data';

describe('UpcomingTopicsComponent', () => {
  let component: UpcomingTopicsComponent;
  let fixture: ComponentFixture<UpcomingTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingTopicsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingTopicsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('topics', TEACHER_UPCOMING_TOPICS);
    fixture.detectChanges();
  });

  it('should create and render 4 upcoming topic items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.topic-item');
    expect(items.length).toBe(4);
  });

  it('should display week numbers and topic titles', () => {
    const badges = fixture.nativeElement.querySelectorAll('.week-number-badge');
    expect(badges[0].textContent.trim()).toBe('5');
    expect(badges[1].textContent.trim()).toBe('6');
    expect(badges[2].textContent.trim()).toBe('7');
    expect(badges[3].textContent.trim()).toBe('8');

    const titles = fixture.nativeElement.querySelectorAll('.topic-title');
    expect(titles[0].textContent).toContain('Sentence Structure');
    expect(titles[1].textContent).toContain('Direct and Indirect Speech');
  });

  it('should render link to full scheme of work', () => {
    const link = fixture.nativeElement.querySelector('.footer-link');
    expect(link.textContent).toContain('View full scheme of work');
  });
});
