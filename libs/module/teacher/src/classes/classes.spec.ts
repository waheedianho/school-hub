import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TeacherClassesComponent } from './classes';
import { TEACHER_CLASSES_DATA } from '../data/teacher-classes.data';

describe('TeacherClassesComponent', () => {
  let component: TeacherClassesComponent;
  let fixture: ComponentFixture<TeacherClassesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherClassesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherClassesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('My Classes');

    const subtitle = fixture.nativeElement.querySelector('.page-subtitle');
    expect(subtitle.textContent).toContain('Manage your classes');
  });

  it('should render all top metrics', () => {
    const metricsComponent = fixture.nativeElement.querySelector(
      'school-hub-classes-metrics',
    );
    expect(metricsComponent).toBeTruthy();
    expect(component.metrics.length).toBe(5);
  });

  it('should filter classes by search query', () => {
    expect(component.filteredClasses().length).toBe(4);

    component.onFilterChange({
      term: 'Term 1 2025/2026',
      subject: 'All Subjects',
      status: 'All Status',
      search: '1A',
    });

    expect(component.filteredClasses().length).toBe(1);
    expect(component.filteredClasses()[0].name).toBe('JSS 1A');
  });

  it('should navigate when onViewClass is called', () => {
    let navigatedCommands: unknown[] | undefined;
    let navigatedExtras: { queryParams?: { classId?: string } } | undefined;
    router.navigate = ((commands: unknown[], extras?: unknown) => {
      navigatedCommands = commands;
      navigatedExtras = extras as { queryParams?: { classId?: string } };
      return Promise.resolve(true);
    }) as Router['navigate'];

    component.onViewClass(TEACHER_CLASSES_DATA[0]);

    expect(navigatedCommands).toEqual(['/teacher/classes']);
    expect(navigatedExtras?.queryParams?.classId).toBe('jss-1a');
  });

  it('should render all subgrid and right-column components', () => {
    const table = fixture.nativeElement.querySelector(
      'school-hub-classes-table',
    );
    const pending = fixture.nativeElement.querySelector(
      'school-hub-classes-pending-review',
    );
    const attention = fixture.nativeElement.querySelector(
      'school-hub-learners-attention',
    );
    const announcements = fixture.nativeElement.querySelector(
      'school-hub-recent-announcements',
    );
    const schedule = fixture.nativeElement.querySelector(
      'school-hub-classes-today-schedule',
    );
    const performance = fixture.nativeElement.querySelector(
      'school-hub-classes-performance-overview',
    );
    const quickActions = fixture.nativeElement.querySelector(
      'school-hub-classes-quick-actions',
    );

    expect(table).toBeTruthy();
    expect(pending).toBeTruthy();
    expect(attention).toBeTruthy();
    expect(announcements).toBeTruthy();
    expect(schedule).toBeTruthy();
    expect(performance).toBeTruthy();
    expect(quickActions).toBeTruthy();
  });
});
