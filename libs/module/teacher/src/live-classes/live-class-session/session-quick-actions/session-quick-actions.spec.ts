import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionQuickActionsComponent } from './session-quick-actions';

describe('SessionQuickActionsComponent', () => {
  let component: SessionQuickActionsComponent;
  let fixture: ComponentFixture<SessionQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit action on click', () => {
    let clickedAction = '';
    component.actionSelected.subscribe((act) => (clickedAction = act));

    const buttons = fixture.nativeElement.querySelectorAll('.grid-action-btn');
    expect(buttons.length).toBe(4);
    buttons[0].click();

    expect(clickedAction).toBe('add-poll');
  });
});
