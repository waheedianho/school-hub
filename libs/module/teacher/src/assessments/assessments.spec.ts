import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TeacherAssessmentsComponent } from './assessments';

describe('TeacherAssessmentsComponent', () => {
  let component: TeacherAssessmentsComponent;
  let fixture: ComponentFixture<TeacherAssessmentsComponent>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TeacherAssessmentsComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter assessments by class', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'JSS 1A',
      subject: 'English Language',
      assessmentType: 'All Types',
      status: 'All Status',
      searchQuery: '',
    });

    const filtered = component.filteredAssessments();
    expect(filtered.every((item) => item.className === 'JSS 1A')).toBe(true);
    expect(filtered.length).toBe(2);
  });

  it('should filter assessments by search query', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'English Language',
      assessmentType: 'All Types',
      status: 'All Status',
      searchQuery: 'Comprehension',
    });

    const filtered = component.filteredAssessments();
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toContain('Comprehension');
  });

  it('should navigate to Question Bank', () => {
    component.navigateToQuestionBank();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/teacher/assessments/question-bank',
    ]);
  });

  it('should navigate to Question Bank on quick action', () => {
    component.onQuickAction('open-qb');
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/teacher/assessments/question-bank',
    ]);
  });

  it('should navigate to review when Review button clicked', () => {
    component.onReviewAssessment(component.allAssessments()[2]);
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/teacher/assignments/review',
    ]);
  });
});
