import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentDesignWorkflowComponent } from './assessment-design-workflow';

describe('AssessmentDesignWorkflowComponent', () => {
  let component: AssessmentDesignWorkflowComponent;
  let fixture: ComponentFixture<AssessmentDesignWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentDesignWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentDesignWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 workflow steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step-item');
    expect(steps.length).toBe(4);
  });
});
