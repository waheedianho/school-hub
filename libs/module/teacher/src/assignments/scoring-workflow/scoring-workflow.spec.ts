import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoringWorkflowComponent } from './scoring-workflow';

describe('ScoringWorkflowComponent', () => {
  let component: ScoringWorkflowComponent;
  let fixture: ComponentFixture<ScoringWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoringWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 workflow steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step-item');
    expect(steps.length).toBe(4);
  });
});
