import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherLiveClassesComponent } from './live-classes';

describe('TeacherLiveClassesComponent', () => {
  let component: TeacherLiveClassesComponent;
  let fixture: ComponentFixture<TeacherLiveClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLiveClassesComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherLiveClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Live Classes');
  });

  it('should render all top metrics', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should filter classes by search query', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'All Subjects',
      status: 'All Status',
      searchQuery: 'Sentence Structure',
    });
    fixture.detectChanges();

    const filtered = component.filteredScheduledClasses();
    expect(filtered.length).toBe(1);
    expect(filtered[0].topic).toBe('Sentence Structure');
  });

  it('should filter classes by status', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'All Subjects',
      status: 'Live Now',
      searchQuery: '',
    });
    fixture.detectChanges();

    const filtered = component.filteredScheduledClasses();
    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe('Live Now');
  });

  it('should render subgrid cards and right column schedule', () => {
    const attendanceCard = fixture.nativeElement.querySelector(
      'school-hub-live-attendance-snapshot',
    );
    const materialsCard = fixture.nativeElement.querySelector(
      'school-hub-class-materials-recordings',
    );
    const scheduleCard = fixture.nativeElement.querySelector(
      'school-hub-live-class-schedule',
    );
    const quickActionsCard = fixture.nativeElement.querySelector(
      'school-hub-live-classes-quick-actions',
    );

    expect(attendanceCard).toBeTruthy();
    expect(materialsCard).toBeTruthy();
    expect(scheduleCard).toBeTruthy();
    expect(quickActionsCard).toBeTruthy();
  });
});
