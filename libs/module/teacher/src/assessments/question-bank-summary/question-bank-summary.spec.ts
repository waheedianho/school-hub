import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionBankSummaryComponent } from './question-bank-summary';
import { QB_SUMMARY_ITEMS } from '../../data/teacher-assessments.data';

describe('QuestionBankSummaryComponent', () => {
  let component: QuestionBankSummaryComponent;
  let fixture: ComponentFixture<QuestionBankSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBankSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionBankSummaryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('summaryItems', QB_SUMMARY_ITEMS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all progress items', () => {
    const items = fixture.nativeElement.querySelectorAll('.progress-item');
    expect(items.length).toBe(QB_SUMMARY_ITEMS.length);
  });

  it('should emit openQuestionBank when view full button is clicked', () => {
    const emitSpy = vi.fn();
    component.openQuestionBank.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-full-btn');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
