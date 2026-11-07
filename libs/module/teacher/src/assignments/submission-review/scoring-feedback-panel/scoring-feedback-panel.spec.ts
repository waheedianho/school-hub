import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MARYAM_SUBMISSION_DETAIL } from '../../../data/teacher-assignments.data';
import { ScoringFeedbackPanelComponent } from './scoring-feedback-panel';

describe('ScoringFeedbackPanelComponent', () => {
  let component: ScoringFeedbackPanelComponent;
  let fixture: ComponentFixture<ScoringFeedbackPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringFeedbackPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoringFeedbackPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'totalMarks',
      MARYAM_SUBMISSION_DETAIL.totalMarks,
    );
    fixture.componentRef.setInput(
      'initialScore',
      MARYAM_SUBMISSION_DETAIL.scoreAwarded,
    );
    fixture.componentRef.setInput(
      'initialGrade',
      MARYAM_SUBMISSION_DETAIL.grade,
    );
    fixture.componentRef.setInput(
      'initialFeedback',
      MARYAM_SUBMISSION_DETAIL.feedbackText,
    );
    fixture.componentRef.setInput('rubrics', MARYAM_SUBMISSION_DETAIL.rubrics);
    fixture.componentRef.setInput(
      'initialTags',
      MARYAM_SUBMISSION_DETAIL.misconceptionTags,
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate percentage correctly', () => {
    expect(component.percentage()).toBe(65);
  });

  it('should remove and add tags', () => {
    const initialCount = component.tags().length;
    component.removeTag(component.tags()[0]);
    expect(component.tags().length).toBe(initialCount - 1);

    component.addTag();
    expect(component.tags().length).toBe(initialCount);
  });

  it('should emit on Approve Score', () => {
    let emitted = false;
    component.scoreSubmitted.subscribe((data) => {
      emitted = true;
      expect(data.score).toBe(13);
      expect(data.grade).toBe('C');
    });

    component.onApproveScore();
    expect(emitted).toBe(true);
  });
});
