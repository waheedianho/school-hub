import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolsQuickActionsComponent } from './schools-quick-actions';

describe('SchoolsQuickActionsComponent', () => {
  let component: SchoolsQuickActionsComponent;
  let fixture: ComponentFixture<SchoolsQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 action buttons', () => {
    const cards = fixture.nativeElement.querySelectorAll('.action-card');
    expect(cards.length).toBe(4);
  });

  it('should emit actionTriggered when an action is clicked', () => {
    let triggeredId = '';
    component.actionTriggered.subscribe((id) => {
      triggeredId = id;
    });

    const firstCard = fixture.nativeElement.querySelector('.action-card');
    firstCard.click();

    expect(triggeredId).toBe('assign-plan');
  });
});
