import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WeeklyCurriculumFocusComponent } from './weekly-curriculum-focus';
import { TEACHER_WEEKLY_FOCUS_ITEMS } from '../../data/teacher-curriculum.data';

describe('WeeklyCurriculumFocusComponent', () => {
  let component: WeeklyCurriculumFocusComponent;
  let fixture: ComponentFixture<WeeklyCurriculumFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyCurriculumFocusComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyCurriculumFocusComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_WEEKLY_FOCUS_ITEMS);
    fixture.detectChanges();
  });

  it('should create and render 3 focus cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.focus-item-card');
    expect(cards.length).toBe(3);
  });

  it('should display class badges and topics', () => {
    const badges = fixture.nativeElement.querySelectorAll('.class-badge');
    expect(badges[0].textContent).toContain('JSS 1A');
    expect(badges[1].textContent).toContain('JSS 1B');
    expect(badges[2].textContent).toContain('JSS 2A');

    const topics = fixture.nativeElement.querySelectorAll('.topic-subtitle');
    expect(topics[0].textContent).toContain('Parts of Speech');
    expect(topics[1].textContent).toContain('Types of Sentences');
    expect(topics[2].textContent).toContain('Comprehension Skills');
  });

  it('should render footer link to view all weekly focus', () => {
    const link = fixture.nativeElement.querySelector('.footer-link');
    expect(link.textContent).toContain('View all weekly focus');
  });
});
