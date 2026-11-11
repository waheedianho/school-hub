import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRoleModalComponent } from './create-role-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('CreateRoleModalComponent', () => {
  let component: CreateRoleModalComponent;
  let fixture: ComponentFixture<CreateRoleModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoleModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    store = TestBed.inject(SchoolAdminStore);
    fixture = TestBed.createComponent(CreateRoleModalComponent);
    component = fixture.componentInstance;
    store.openCreateRoleModal();
    fixture.detectChanges();
  });

  it('should render dialog when open', () => {
    expect(component).toBeTruthy();
    const dialog = fixture.nativeElement.querySelector('.modal-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('Create Custom Role');
  });

  it('should close dialog when cancel button is clicked', () => {
    const closeSpy = vi.spyOn(store, 'closeCreateRoleModal');
    const cancelBtn = fixture.nativeElement.querySelector(
      '.modal-footer .btn-outline',
    ) as HTMLButtonElement;
    cancelBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should submit role and call store.createRole', () => {
    const createSpy = vi.spyOn(store, 'createRole');
    component.updateField('name', 'Curriculum Director');
    component.updateField(
      'description',
      'Oversees curriculum and academic alignment',
    );
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector(
      '[data-testid="submit-create-role-btn"]',
    ) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
    submitBtn.click();

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Curriculum Director',
        description: 'Oversees curriculum and academic alignment',
      }),
    );
  });
});
