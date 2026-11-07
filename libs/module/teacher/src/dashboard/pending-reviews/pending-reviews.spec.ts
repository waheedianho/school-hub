import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PendingReviewsComponent } from './pending-reviews';
import { TEACHER_PENDING_SUBMISSIONS_DATA } from '../../data/teacher-dashboard.data';

describe('PendingReviewsComponent', () => {
  let component: PendingReviewsComponent;
  let fixture: ComponentFixture<PendingReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingReviewsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingReviewsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'submissions',
      TEACHER_PENDING_SUBMISSIONS_DATA,
    );
    fixture.detectChanges();
  });

  it('should create and render submission table rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should display learner names and action buttons', () => {
    const names = fixture.nativeElement.querySelectorAll('.learner-name');
    expect(names[0].textContent).toContain('Maryam Ibrahim');
    expect(names[2].textContent).toContain('Amaka Nwosu');

    const gradeBtn = fixture.nativeElement.querySelector('.btn-action-solid');
    expect(gradeBtn?.textContent).toContain('Grade Now');
  });
});
