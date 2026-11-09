import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentBestPracticesComponent } from './assessment-best-practices';
import { ASSESSMENT_BEST_PRACTICES } from '../../data/teacher-assessments.data';

describe('AssessmentBestPracticesComponent', () => {
  let component: AssessmentBestPracticesComponent;
  let fixture: ComponentFixture<AssessmentBestPracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentBestPracticesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('practices', ASSESSMENT_BEST_PRACTICES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 best practice tips', () => {
    const items = fixture.nativeElement.querySelectorAll('.practice-item');
    expect(items.length).toBe(ASSESSMENT_BEST_PRACTICES.length);
  });
});
