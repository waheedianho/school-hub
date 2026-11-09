import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ASSIGNMENTS_QUICK_ACTIONS } from '../../data/teacher-assignments.data';
import { AssignmentsQuickActionsComponent } from './assignments-quick-actions';

describe('AssignmentsQuickActionsComponent', () => {
  let component: AssignmentsQuickActionsComponent;
  let fixture: ComponentFixture<AssignmentsQuickActionsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsQuickActionsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all quick action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    expect(buttons.length).toBe(ASSIGNMENTS_QUICK_ACTIONS.length);
  });

  it('should navigate to review when Review Next Submission is clicked', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    const action = ASSIGNMENTS_QUICK_ACTIONS.find(
      (a) => a.id === 'review-next',
    );
    if (action) {
      component.onSelectAction(action);
    }

    expect(navigatedCommands).toEqual(['/teacher/assignments/review']);
  });
});
