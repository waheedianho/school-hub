import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TeacherLearnersComponent } from './learners';
import { TEACHER_LEARNERS_LIST } from '../data/teacher-learners.data';

describe('TeacherLearnersComponent', () => {
  let component: TeacherLearnersComponent;
  let fixture: ComponentFixture<TeacherLearnersComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLearnersComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherLearnersComponent);
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
    expect(title.textContent).toContain('Learners');
    expect(subtitle.textContent).toContain(
      'Manage your learners, track progress',
    );
  });

  it('should filter learners by class', () => {
    expect(component.filteredLearners().length).toBe(
      TEACHER_LEARNERS_LIST.length,
    );

    component.onFiltersChanged({
      className: 'JSS 1A',
      subject: 'All Subjects',
      performanceBand: 'All Bands',
      attendance: 'All',
      searchQuery: '',
    });
    fixture.detectChanges();

    const filtered = component.filteredLearners();
    expect(filtered.length).toBe(3);
    expect(filtered.every((l) => l.className === 'JSS 1A')).toBe(true);
  });

  it('should filter learners by search query', () => {
    component.onFiltersChanged({
      className: 'All Classes',
      subject: 'All Subjects',
      performanceBand: 'All Bands',
      attendance: 'All',
      searchQuery: 'Maryam',
    });
    fixture.detectChanges();

    const filtered = component.filteredLearners();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Maryam Ibrahim');
  });

  it('should filter learners by attendance rate', () => {
    component.onFiltersChanged({
      className: 'All Classes',
      subject: 'All Subjects',
      performanceBand: 'All Bands',
      attendance: '<80%',
      searchQuery: '',
    });
    fixture.detectChanges();

    const filtered = component.filteredLearners();
    expect(filtered.every((l) => l.attendanceRate < 80)).toBe(true);
  });

  it('should navigate on onViewLearner', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onViewLearner(TEACHER_LEARNERS_LIST[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/classes'], {
      queryParams: { learnerId: 'lrn-1' },
    });
  });

  it('should handle header action buttons', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onMessageClass();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/live-classes']);

    component.onViewGroups();
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/classes']);
  });

  it('should handle quick actions routing', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onQuickAction('assign-remediation');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/assignments']);

    component.onQuickAction('view-full-profile');
    expect(navigateSpy).toHaveBeenCalledWith(['/teacher/classes']);
  });

  it('should handle onViewAllAttention and onViewAllPerformers', () => {
    component.onViewAllAttention();
    expect(component.filters().performanceBand).toBe('Below Average');

    component.onViewAllPerformers();
    expect(component.filters().performanceBand).toBe('Excellent');
  });
});
