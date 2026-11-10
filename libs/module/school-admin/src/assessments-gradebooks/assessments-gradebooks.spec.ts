import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsGradebooksComponent } from './assessments-gradebooks';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('AssessmentsGradebooksComponent', () => {
  let component: AssessmentsGradebooksComponent;
  let fixture: ComponentFixture<AssessmentsGradebooksComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsGradebooksComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsGradebooksComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Screen 1 header and components by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Assessments & Gradebooks');
    expect(
      compiled.querySelector('school-hub-assessments-summary-metrics'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-assessments-table')).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-assessments-sidebar'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-assessments-quick-actions'),
    ).toBeTruthy();
  });

  it('should switch to Screen 2 when an assessment is selected for review', () => {
    const sample = store.assessmentRecords()[1];
    store.openAssessmentReview(sample);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('school-hub-submission-review')).toBeTruthy();
    expect(compiled.querySelector('school-hub-assessments-table')).toBeFalsy();
  });
});
