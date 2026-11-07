import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RECENT_FEEDBACK_ACTIVITY } from '../../data/teacher-assignments.data';
import { RecentFeedbackActivityComponent } from './recent-feedback-activity';

describe('RecentFeedbackActivityComponent', () => {
  let component: RecentFeedbackActivityComponent;
  let fixture: ComponentFixture<RecentFeedbackActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentFeedbackActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentFeedbackActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all feedback items', () => {
    const items = fixture.nativeElement.querySelectorAll('.feedback-item');
    expect(items.length).toBe(RECENT_FEEDBACK_ACTIVITY.length);
  });
});
