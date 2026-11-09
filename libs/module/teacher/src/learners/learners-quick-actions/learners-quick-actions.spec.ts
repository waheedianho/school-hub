import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnersQuickActionsComponent } from './learners-quick-actions';
import { LEARNERS_QUICK_ACTIONS } from '../../data/teacher-learners.data';

describe('LearnersQuickActionsComponent', () => {
  let component: LearnersQuickActionsComponent;
  let fixture: ComponentFixture<LearnersQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnersQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', LEARNERS_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-btn');
    expect(buttons.length).toBe(4);
    expect(buttons[0].textContent).toContain('Message Parent');
    expect(buttons[1].textContent).toContain('Assign Remediation');
    expect(buttons[2].textContent).toContain('Schedule Intervention');
    expect(buttons[3].textContent).toContain('View Full Profile');
  });

  it('should emit actionTriggered when button is clicked', () => {
    const spy = vi.fn();
    component.actionTriggered.subscribe(spy);
    const buttons = fixture.nativeElement.querySelectorAll('.action-btn');
    buttons[0].click();
    expect(spy).toHaveBeenCalledWith('message-parent');
  });
});
