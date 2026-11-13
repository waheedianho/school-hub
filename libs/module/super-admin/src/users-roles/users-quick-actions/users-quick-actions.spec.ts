import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersQuickActionsComponent } from './users-quick-actions';

describe('UsersQuickActionsComponent', () => {
  let component: UsersQuickActionsComponent;
  let fixture: ComponentFixture<UsersQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersQuickActionsComponent);
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

  it('should emit actionTriggered when clicked', () => {
    let clickedId = '';
    component.actionTriggered.subscribe((id) => {
      clickedId = id;
    });

    const firstCard = fixture.nativeElement.querySelector('.action-card');
    firstCard.click();
    expect(clickedId).toBe('add-user');
  });
});
