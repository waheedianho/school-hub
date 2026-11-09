import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TeacherQuestionBankComponent } from './question-bank';

describe('TeacherQuestionBankComponent', () => {
  let component: TeacherQuestionBankComponent;
  let fixture: ComponentFixture<TeacherQuestionBankComponent>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TeacherQuestionBankComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter questions by difficulty', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'English Language',
      topic: 'All Topics',
      questionType: 'All Types',
      difficulty: 'Easy',
      searchQuery: '',
    });

    const filtered = component.filteredQuestions();
    expect(filtered.every((item) => item.difficulty === 'Easy')).toBe(true);
    expect(filtered.length).toBe(2);
  });

  it('should filter questions by search query', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'English Language',
      topic: 'All Topics',
      questionType: 'All Types',
      difficulty: 'All Difficulties',
      searchQuery: 'tenses',
    });

    const filtered = component.filteredQuestions();
    expect(filtered.length).toBe(1);
    expect(filtered[0].topic).toContain('Tenses');
  });

  it('should update selected question and id on selection', () => {
    const second = component.allQuestions()[1];
    component.onSelectQuestion(second);

    expect(component.selectedId()).toBe(second.id);
    expect(component.selectedQuestion().id).toBe(second.id);
  });

  it('should navigate back to assessments', () => {
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/teacher/assessments']);
  });
});
