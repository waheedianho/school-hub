import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentWeightsComponent } from './assessment-weights';
import { ASSESSMENT_WEIGHTS } from '../../data/teacher-gradebook.data';

describe('AssessmentWeightsComponent', () => {
  let component: AssessmentWeightsComponent;
  let fixture: ComponentFixture<AssessmentWeightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentWeightsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentWeightsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('weights', ASSESSMENT_WEIGHTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all weight rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.weight-row');
    expect(rows.length).toBe(ASSESSMENT_WEIGHTS.length);
  });

  it('should display total as 100%', () => {
    const total = fixture.nativeElement.querySelector('.total-percent');
    expect(total.textContent.trim()).toBe('100%');
  });
});
