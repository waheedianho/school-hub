import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MARYAM_SUBMISSION_DETAIL } from '../../../data/teacher-assignments.data';
import { RubricMarkingGuideComponent } from './rubric-marking-guide';

describe('RubricMarkingGuideComponent', () => {
  let component: RubricMarkingGuideComponent;
  let fixture: ComponentFixture<RubricMarkingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubricMarkingGuideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RubricMarkingGuideComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'initialRubrics',
      MARYAM_SUBMISSION_DETAIL.rubrics,
    );
    fixture.componentRef.setInput(
      'teacherComments',
      MARYAM_SUBMISSION_DETAIL.teacherComments,
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total max marks and awarded score', () => {
    expect(component.totalMaxMarks()).toBe(20);
    expect(component.totalAwardedScore()).toBe(13);
  });

  it('should update score on onScoreChange', () => {
    const item = component.rubricsList()[0];
    component.onScoreChange(item, 9);
    expect(component.totalAwardedScore()).toBe(15);
  });

  it('should toggle visibility', () => {
    expect(component.visibleToLearner()).toBe(true);
    component.toggleVisible();
    expect(component.visibleToLearner()).toBe(false);
  });
});
