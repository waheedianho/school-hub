import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MARYAM_SUBMISSION_DETAIL } from '../../../data/teacher-assignments.data';
import { SubmissionWorksheetViewerComponent } from './submission-worksheet-viewer';

describe('SubmissionWorksheetViewerComponent', () => {
  let component: SubmissionWorksheetViewerComponent;
  let fixture: ComponentFixture<SubmissionWorksheetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionWorksheetViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmissionWorksheetViewerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'questions',
      MARYAM_SUBMISSION_DETAIL.worksheetQuestions,
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 10 questions', () => {
    const questionRows =
      fixture.nativeElement.querySelectorAll('.question-row');
    expect(questionRows.length).toBe(10);
  });
});
