import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradebookQuickActionsComponent } from './gradebook-quick-actions';
import { GRADEBOOK_QUICK_ACTIONS } from '../../data/teacher-gradebook.data';

describe('GradebookQuickActionsComponent', () => {
  let component: GradebookQuickActionsComponent;
  let fixture: ComponentFixture<GradebookQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradebookQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', GRADEBOOK_QUICK_ACTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 quick action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    expect(buttons.length).toBe(GRADEBOOK_QUICK_ACTIONS.length);
  });

  it('should emit actionTriggered when button is clicked', () => {
    const emitSpy = vi.fn();
    component.actionTriggered.subscribe(emitSpy);

    const firstBtn = fixture.nativeElement.querySelector('.action-item-btn');
    firstBtn?.click();

    expect(emitSpy).toHaveBeenCalledWith(GRADEBOOK_QUICK_ACTIONS[0].id);
  });
});
