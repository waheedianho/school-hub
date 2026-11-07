import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TeacherCurriculumComponent } from './curriculum';
import { TEACHER_ASSIGNED_SUBJECTS } from '../data/teacher-curriculum.data';

describe('TeacherCurriculumComponent', () => {
  let component: TeacherCurriculumComponent;
  let fixture: ComponentFixture<TeacherCurriculumComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCurriculumComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherCurriculumComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('My Subjects & Curriculum');

    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(subtitle.textContent).toContain('Track subject coverage');
  });

  it('should render all top metrics', () => {
    const metricsComponent = fixture.nativeElement.querySelector(
      'school-hub-curriculum-metrics',
    );
    expect(metricsComponent).toBeTruthy();
    expect(component.metrics.length).toBe(5);
  });

  it('should filter subjects by search query', () => {
    expect(component.filteredSubjects().length).toBe(3);

    component.onFilterChange({
      term: 'Term 1 2025/2026',
      classId: 'All Classes',
      subject: 'All Subjects',
      search: 'Mathematics',
    });

    expect(component.filteredSubjects().length).toBe(1);
    expect(component.filteredSubjects()[0].subject).toBe('Mathematics');
  });

  it('should navigate when onSelectSubject is called', () => {
    let navigatedCommands: unknown[] | undefined;
    let navigatedExtras: { queryParams?: { subject?: string } } | undefined;
    router.navigate = ((commands: unknown[], extras?: unknown) => {
      navigatedCommands = commands;
      navigatedExtras = extras as { queryParams?: { subject?: string } };
      return Promise.resolve(true);
    }) as Router['navigate'];

    component.onSelectSubject(TEACHER_ASSIGNED_SUBJECTS[0]);

    expect(navigatedCommands).toEqual(['/teacher/curriculum']);
    expect(navigatedExtras?.queryParams?.subject).toBe('eng-lang');
  });

  it('should render all middle and bottom grid components', () => {
    const table = fixture.nativeElement.querySelector(
      'school-hub-assigned-subjects-table',
    );
    const focus = fixture.nativeElement.querySelector(
      'school-hub-weekly-curriculum-focus',
    );
    const progress = fixture.nativeElement.querySelector(
      'school-hub-curriculum-progress',
    );
    const objectives = fixture.nativeElement.querySelector(
      'school-hub-current-topic-objectives',
    );
    const upcoming = fixture.nativeElement.querySelector(
      'school-hub-upcoming-topics',
    );
    const quickActions = fixture.nativeElement.querySelector(
      'school-hub-curriculum-quick-actions',
    );

    expect(table).toBeTruthy();
    expect(focus).toBeTruthy();
    expect(progress).toBeTruthy();
    expect(objectives).toBeTruthy();
    expect(upcoming).toBeTruthy();
    expect(quickActions).toBeTruthy();
  });
});
