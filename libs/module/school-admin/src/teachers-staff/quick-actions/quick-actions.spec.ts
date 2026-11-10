import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffQuickActionsComponent } from './quick-actions';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('StaffQuickActionsComponent', () => {
  let component: StaffQuickActionsComponent;
  let fixture: ComponentFixture<StaffQuickActionsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffQuickActionsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffQuickActionsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render all 4 quick action cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.action-card');
    expect(cards.length).toBe(4);

    expect(compiled.textContent).toContain('Assign Subject');
    expect(compiled.textContent).toContain('View Full Staff Profile');
    expect(compiled.textContent).toContain('Manage Permissions');
    expect(compiled.textContent).toContain('Generate Staff Report');
  });

  it('should emit action on click and set store message', () => {
    const spy = vi.spyOn(component.actionClick, 'emit');
    component.triggerAction('assign-subject');

    expect(spy).toHaveBeenCalledWith('assign-subject');
    expect(store.setupSaveStatus()).toContain('Assign Subject wizard opened');
  });
});
