import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentsQuickActionsComponent } from './assessments-quick-actions';
import { ASSESSMENTS_QUICK_ACTIONS } from '../../data/teacher-assessments.data';

describe('AssessmentsQuickActionsComponent', () => {
  let component: AssessmentsQuickActionsComponent;
  let fixture: ComponentFixture<AssessmentsQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentsQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', ASSESSMENTS_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    expect(buttons.length).toBe(ASSESSMENTS_QUICK_ACTIONS.length);
  });

  it('should emit actionTriggered when button is clicked', () => {
    const emitSpy = vi.fn();
    component.actionTriggered.subscribe(emitSpy);

    const firstBtn = fixture.nativeElement.querySelector('.action-item-btn');
    firstBtn?.click();

    expect(emitSpy).toHaveBeenCalledWith(ASSESSMENTS_QUICK_ACTIONS[0].id);
  });
});
