import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionReviewComponent } from './submission-review';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('SubmissionReviewComponent', () => {
  let component: SubmissionReviewComponent;
  let fixture: ComponentFixture<SubmissionReviewComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionReviewComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmissionReviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    // Set selected assessment for review
    store.openAssessmentReview(store.assessmentRecords()[1]); // JSS 1B Narrative Writing Test
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render assessment title and details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('JSS 1B');
    expect(compiled.textContent).toContain('Narrative Writing Test');
    expect(compiled.textContent).toContain('30 Marks');
  });

  it('should render learner submissions and score distribution', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Maryam Ibrahim');
    expect(compiled.textContent).toContain('David Okon');
    expect(compiled.textContent).toContain('Score Distribution');
    expect(compiled.textContent).toContain('Grade Summary');
  });

  it('should close review when back button is clicked', () => {
    const spy = vi.spyOn(store, 'closeAssessmentReview');
    component.onBackToAssessments();
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger moderation modal when moderate button is clicked', () => {
    const spy = vi.spyOn(store, 'openModerationModal');
    const firstSub = store.learnerSubmissions()[0];
    component.onModerateSubmission(firstSub);
    expect(spy).toHaveBeenCalledWith(firstSub);
  });

  it('should trigger approve gradebook on action button click', () => {
    const spy = vi.spyOn(store, 'approveAssessmentGradebook');
    component.onApproveGradebook();
    expect(spy).toHaveBeenCalled();
  });
});
