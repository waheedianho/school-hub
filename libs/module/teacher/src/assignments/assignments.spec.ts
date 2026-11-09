import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherAssignmentsComponent } from './assignments';

describe('TeacherAssignmentsComponent', () => {
  let component: TeacherAssignmentsComponent;
  let fixture: ComponentFixture<TeacherAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAssignmentsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and render page header', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.page-title');
    expect(title.textContent).toContain('Assignments & Submissions');
  });

  it('should render all top metrics', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);
  });

  it('should filter submissions by search query', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'English Language',
      submissionType: 'All Types',
      status: 'All Status',
      searchQuery: 'Descriptive Writing',
    });
    fixture.detectChanges();

    const filtered = component.filteredSubmissions();
    expect(filtered.length).toBe(1);
    expect(filtered[0].topic).toBe('Descriptive Writing');
  });

  it('should filter submissions by status', () => {
    component.onFiltersChanged({
      term: 'Term 1 2025/2026',
      className: 'All Classes',
      subject: 'English Language',
      submissionType: 'All Types',
      status: 'Approved',
      searchQuery: '',
    });
    fixture.detectChanges();

    const filtered = component.filteredSubmissions();
    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe('Approved');
  });

  it('should render subgrid and right column components', () => {
    const breakdown = fixture.nativeElement.querySelector(
      'school-hub-submission-breakdown',
    );
    const feedback = fixture.nativeElement.querySelector(
      'school-hub-recent-feedback-activity',
    );
    const issues = fixture.nativeElement.querySelector(
      'school-hub-common-issues-observed',
    );
    const queue = fixture.nativeElement.querySelector(
      'school-hub-review-queue',
    );
    const actions = fixture.nativeElement.querySelector(
      'school-hub-assignments-quick-actions',
    );
    const workflow = fixture.nativeElement.querySelector(
      'school-hub-scoring-workflow',
    );

    expect(breakdown).toBeTruthy();
    expect(feedback).toBeTruthy();
    expect(issues).toBeTruthy();
    expect(queue).toBeTruthy();
    expect(actions).toBeTruthy();
    expect(workflow).toBeTruthy();
  });
});
