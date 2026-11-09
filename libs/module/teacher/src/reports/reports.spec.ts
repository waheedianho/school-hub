import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TeacherReportsComponent } from './reports';

describe('TeacherReportsComponent', () => {
  let component: TeacherReportsComponent;
  let fixture: ComponentFixture<TeacherReportsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherReportsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherReportsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.page-title');
    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(title.textContent).toContain('Reports & Analytics');
    expect(subtitle.textContent).toContain('Track learner performance');
  });

  it('should navigate on onViewReport', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewReport();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/teacher/reports/learner-analysis',
    ]);
  });

  it('should navigate on onViewLearnerDetail', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewLearnerDetail();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/teacher/reports/learner-analysis',
    ]);
  });

  it('should navigate on onQuickReportSelected', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onQuickReportSelected('progress-report');
    expect(navigateSpy).toHaveBeenCalledWith([
      '/teacher/reports/learner-analysis',
    ]);

    component.onQuickReportSelected('assessment-analysis');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/assessments']);
  });

  it('should navigate on onViewAllAttention', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewAllAttention();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/learners']);
  });
});
