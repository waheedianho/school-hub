import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LIVE_CLASSES_QUICK_ACTIONS } from '../../data/teacher-live-classes.data';
import { LiveClassesQuickActionsComponent } from './live-classes-quick-actions';

describe('LiveClassesQuickActionsComponent', () => {
  let component: LiveClassesQuickActionsComponent;
  let fixture: ComponentFixture<LiveClassesQuickActionsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesQuickActionsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all quick actions', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.action-item-btn');
    expect(buttons.length).toBe(LIVE_CLASSES_QUICK_ACTIONS.length);
  });

  it('should navigate to session when Start Class is clicked', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    const startClassAction = LIVE_CLASSES_QUICK_ACTIONS.find(
      (a) => a.id === 'start-class',
    );
    if (startClassAction) {
      component.onSelectAction(startClassAction);
    }

    expect(navigatedCommands).toEqual(['/teacher/live-classes/session']);
  });
});
