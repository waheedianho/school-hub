import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QuickActionsCardComponent } from './quick-actions-card';
import { SUPER_ADMIN_QUICK_ACTIONS } from '../../data/super-admin-dashboard.data';

describe('QuickActionsCardComponent', () => {
  let component: QuickActionsCardComponent;
  let fixture: ComponentFixture<QuickActionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionsCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', SUPER_ADMIN_QUICK_ACTIONS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 action buttons', () => {
    const items = fixture.nativeElement.querySelectorAll('.action-item');
    expect(items.length).toBe(4);
  });

  it('should display titles and routes', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Onboard School');
    expect(text).toContain('Assign Plan');
    expect(text).toContain('Review Content');
    expect(text).toContain('View Alerts');
  });
});
