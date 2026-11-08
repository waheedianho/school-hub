import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LearnerReportAnalysisComponent } from './learner-report-analysis';

describe('LearnerReportAnalysisComponent', () => {
  let component: LearnerReportAnalysisComponent;
  let fixture: ComponentFixture<LearnerReportAnalysisComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerReportAnalysisComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerReportAnalysisComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render learner details and title', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    const studentName = fixture.nativeElement.querySelector('.student-name');
    expect(title.textContent).toContain('Learner Report Analysis');
    expect(studentName.textContent).toContain('Maryam Ibrahim');
  });

  it('should handle onBackToReports navigation', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onBackToReports();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/reports']);
  });

  it('should handle onViewAllPortfolio navigation', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewAllPortfolio();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/assignments']);
  });

  it('should copy ID', () => {
    component.onCopyId();
    expect(component.copied()).toBe(true);
  });
});
