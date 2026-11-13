import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionBankViewComponent } from './question-bank-view';
import { SAMPLE_QUESTION_BANK_ITEMS } from '../../data/super-admin-assessments.data';

describe('QuestionBankViewComponent', () => {
  let component: QuestionBankViewComponent;
  let fixture: ComponentFixture<QuestionBankViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBankViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionBankViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('questions', SAMPLE_QUESTION_BANK_ITEMS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render questions list', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(SAMPLE_QUESTION_BANK_ITEMS[0].code);
    expect(text).toContain(SAMPLE_QUESTION_BANK_ITEMS[0].topic);
  });

  it('should filter by question type', () => {
    component.selectedType.set('Multiple Choice (MCQ)');
    fixture.detectChanges();
    expect(
      component
        .filteredQuestions()
        .every((q) => q.type === 'Multiple Choice (MCQ)'),
    ).toBe(true);
  });

  it('should emit flagQuestion when clicking flag button', () => {
    const emitSpy = vi.spyOn(component.flagQuestion, 'emit');
    const firstUnflagged = SAMPLE_QUESTION_BANK_ITEMS.find(
      (q) => q.status !== 'Flagged',
    );
    if (firstUnflagged) {
      component.onFlag(firstUnflagged.id);
      expect(emitSpy).toHaveBeenCalledWith(firstUnflagged.id);
    }
  });

  it('should emit addQuestion when clicking add button', () => {
    const emitSpy = vi.spyOn(component.addQuestion, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="add-question-btn"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
