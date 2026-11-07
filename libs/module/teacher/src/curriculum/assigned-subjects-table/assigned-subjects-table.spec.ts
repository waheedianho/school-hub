import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedSubjectsTableComponent } from './assigned-subjects-table';
import {
  TEACHER_ASSIGNED_SUBJECTS,
  TeacherAssignedSubject,
} from '../../data/teacher-curriculum.data';

describe('AssignedSubjectsTableComponent', () => {
  let component: AssignedSubjectsTableComponent;
  let fixture: ComponentFixture<AssignedSubjectsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedSubjectsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedSubjectsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subjects', TEACHER_ASSIGNED_SUBJECTS);
    fixture.detectChanges();
  });

  it('should create and render 3 subject rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should display subject names and current topics', () => {
    const subjectNames =
      fixture.nativeElement.querySelectorAll('.subject-name');
    expect(subjectNames[0].textContent).toContain('English Language');
    expect(subjectNames[1].textContent).toContain('Mathematics');
    expect(subjectNames[2].textContent).toContain('Basic Science');

    const topics = fixture.nativeElement.querySelectorAll('.topic-name');
    expect(topics[0].textContent).toContain('Parts of Speech');
    expect(topics[1].textContent).toContain('Linear Equations');
    expect(topics[2].textContent).toContain('Plant Cells');
  });

  it('should display performance percentages and status badges', () => {
    const performances =
      fixture.nativeElement.querySelectorAll('.performance-value');
    expect(performances[0].textContent).toContain('74%');
    expect(performances[1].textContent).toContain('61%');
    expect(performances[2].textContent).toContain('77%');
  });

  it('should emit selectSubject when action button is clicked', () => {
    let selected: TeacherAssignedSubject | undefined;
    component.selectSubject.subscribe((item) => (selected = item));

    const btn = fixture.nativeElement.querySelector('.btn-icon');
    btn.click();

    expect(selected).toEqual(TEACHER_ASSIGNED_SUBJECTS[0]);
  });
});
