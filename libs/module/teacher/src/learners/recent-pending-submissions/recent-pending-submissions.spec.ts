import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentPendingSubmissionsComponent } from './recent-pending-submissions';
import { RECENT_SUBMISSIONS_PENDING_REVIEW } from '../../data/teacher-learners.data';

describe('RecentPendingSubmissionsComponent', () => {
  let component: RecentPendingSubmissionsComponent;
  let fixture: ComponentFixture<RecentPendingSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPendingSubmissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentPendingSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'submissions',
      RECENT_SUBMISSIONS_PENDING_REVIEW,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 3 pending submissions', () => {
    const items = fixture.nativeElement.querySelectorAll('.submission-item');
    expect(items.length).toBe(RECENT_SUBMISSIONS_PENDING_REVIEW.length);
  });

  it('should emit viewAll when View all is clicked', () => {
    const emitSpy = vi.fn();
    component.viewAll.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-all-link');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
