import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionBankCoverageComponent } from './question-bank-coverage';
import { QB_SUMMARY_ITEMS } from '../../data/teacher-assessments.data';

describe('QuestionBankCoverageComponent', () => {
  let component: QuestionBankCoverageComponent;
  let fixture: ComponentFixture<QuestionBankCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBankCoverageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionBankCoverageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('summaryItems', QB_SUMMARY_ITEMS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total items correctly', () => {
    expect(component.totalQuestions()).toBe(248);
  });

  it('should render all 5 legend rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.legend-row');
    expect(rows.length).toBe(5);
  });

  it('should emit viewAll when Open Question Bank is clicked', () => {
    const emitSpy = vi.fn();
    component.viewAll.subscribe(emitSpy);

    const btn = fixture.nativeElement.querySelector('.view-link-btn');
    btn?.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
