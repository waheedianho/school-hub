import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowReminderComponent } from './workflow-reminder';
import { TEACHER_WORKFLOW_STEPS } from '../../data/teacher-dashboard.data';

describe('WorkflowReminderComponent', () => {
  let component: WorkflowReminderComponent;
  let fixture: ComponentFixture<WorkflowReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowReminderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowReminderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', TEACHER_WORKFLOW_STEPS);
    fixture.detectChanges();
  });

  it('should create and render all 4 workflow steps', () => {
    expect(component).toBeTruthy();
    const steps = fixture.nativeElement.querySelectorAll('.step-card');
    expect(steps.length).toBe(4);
  });

  it('should render step titles correctly', () => {
    const titles = fixture.nativeElement.querySelectorAll('.step-title');
    expect(titles[0].textContent).toContain('Assessments & Submissions');
    expect(titles[1].textContent).toContain('Teacher Review');
    expect(titles[2].textContent).toContain('Gradebook');
    expect(titles[3].textContent).toContain('Reports & Report Cards');
  });

  it('should render 3 arrow connectors between 4 steps', () => {
    const connectors =
      fixture.nativeElement.querySelectorAll('.step-connector');
    expect(connectors.length).toBe(3);
  });
});
