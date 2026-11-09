import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupQuickActionsComponent } from './setup-quick-actions';
import { SETUP_QUICK_ACTIONS_DATA } from '../../data/school-admin-setup.data';

describe('SetupQuickActionsComponent', () => {
  let component: SetupQuickActionsComponent;
  let fixture: ComponentFixture<SetupQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('actions', SETUP_QUICK_ACTIONS_DATA);
    fixture.detectChanges();
  });

  it('should create and render 3 quick action cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.quick-action-card');
    expect(cards.length).toBe(3);
    expect(compiled.textContent).toContain('Import School Data');
    expect(compiled.textContent).toContain('Download Setup Template');
    expect(compiled.textContent).toContain('View Audit Trail');
  });

  it('should emit actionClick when card is clicked', () => {
    const spy = vi.spyOn(component.actionClick, 'emit');
    component.onActionClick('import-data');
    expect(spy).toHaveBeenCalledWith('import-data');
  });
});
