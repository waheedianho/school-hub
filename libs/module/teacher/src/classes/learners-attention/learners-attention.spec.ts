import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LearnersAttentionComponent } from './learners-attention';
import { TEACHER_LEARNERS_ATTENTION_DATA } from '../../data/teacher-classes.data';

describe('LearnersAttentionComponent', () => {
  let component: LearnersAttentionComponent;
  let fixture: ComponentFixture<LearnersAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersAttentionComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersAttentionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', TEACHER_LEARNERS_ATTENTION_DATA);
    fixture.detectChanges();
  });

  it('should create and render all attention items', () => {
    expect(component).toBeTruthy();
    const items = fixture.nativeElement.querySelectorAll('.attention-item');
    expect(items.length).toBe(3);
  });

  it('should render learner names and issues', () => {
    const names = fixture.nativeElement.querySelectorAll('.learner-name');
    expect(names[0].textContent).toContain('Chinedu Okafor');
    expect(names[1].textContent).toContain('Aisha Musa');
    expect(names[2].textContent).toContain('Ibrahim Bello');

    const issues = fixture.nativeElement.querySelectorAll('.learner-issue');
    expect(issues[0].textContent).toContain('Low performance in 3 topics');
  });

  it('should display status badges with appropriate labels', () => {
    const badges = fixture.nativeElement.querySelectorAll(
      'school-hub-status-badge',
    );
    expect(badges.length).toBe(3);
  });

  it('should render header link to view all', () => {
    const link = fixture.nativeElement.querySelector('.card-header-link');
    expect(link.textContent).toContain('View all');
  });
});
