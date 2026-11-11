import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleDetailsModalComponent } from './role-details-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { SCHOOL_ROLES_DATA } from '../../data/school-admin-settings.data';

describe('RoleDetailsModalComponent', () => {
  let component: RoleDetailsModalComponent;
  let fixture: ComponentFixture<RoleDetailsModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDetailsModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    store = TestBed.inject(SchoolAdminStore);
    fixture = TestBed.createComponent(RoleDetailsModalComponent);
    component = fixture.componentInstance;
    store.openRoleDetails(SCHOOL_ROLES_DATA[0]);
    fixture.detectChanges();
  });

  it('should render role details modal when role is selected', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('School Admin');
    expect(dialog.textContent).toContain('Full system access');
    expect(dialog.textContent).toContain('All School');
    expect(dialog.textContent).toContain('Full Access');
  });

  it('should close dialog when close button is clicked', () => {
    const closeSpy = vi.spyOn(store, 'closeRoleDetails');
    const closeBtn = fixture.nativeElement.querySelector(
      '[data-testid="close-role-details-modal-btn"]',
    ) as HTMLButtonElement;
    closeBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });
});
