import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedQuestionPreviewComponent } from './selected-question-preview';
import { SELECTED_QUESTION_PREVIEW } from '../../../data/teacher-assessments.data';

describe('SelectedQuestionPreviewComponent', () => {
  let component: SelectedQuestionPreviewComponent;
  let fixture: ComponentFixture<SelectedQuestionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedQuestionPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedQuestionPreviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('question', SELECTED_QUESTION_PREVIEW);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render question options and highlight correct one', () => {
    const options = fixture.nativeElement.querySelectorAll('.option-item');
    expect(options.length).toBe(4);

    const correct = fixture.nativeElement.querySelector('.option-correct');
    expect(correct).toBeTruthy();
    expect(correct.textContent).toContain('Adverb');
  });

  it('should emit duplicateQuestion when Duplicate button is clicked', () => {
    const emitSpy = vi.fn();
    component.duplicateQuestion.subscribe(emitSpy);

    const buttons = fixture.nativeElement.querySelectorAll(
      '.header-actions button',
    );
    buttons[0].click(); // Duplicate button

    expect(emitSpy).toHaveBeenCalledWith(SELECTED_QUESTION_PREVIEW.id);
  });

  it('should emit editQuestion when Edit Question button is clicked', () => {
    const emitSpy = vi.fn();
    component.editQuestion.subscribe(emitSpy);

    const buttons = fixture.nativeElement.querySelectorAll(
      '.header-actions button',
    );
    buttons[1].click(); // Edit button

    expect(emitSpy).toHaveBeenCalledWith(SELECTED_QUESTION_PREVIEW.id);
  });

  it('should emit addToAssessment when Add to Assessment button is clicked', () => {
    const emitSpy = vi.fn();
    component.addToAssessment.subscribe(emitSpy);

    const buttons = fixture.nativeElement.querySelectorAll(
      '.header-actions button',
    );
    buttons[2].click(); // Add to Assessment button

    expect(emitSpy).toHaveBeenCalledWith(SELECTED_QUESTION_PREVIEW.id);
  });
});
