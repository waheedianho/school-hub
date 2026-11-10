import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AddStaffComponent } from './add-staff';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('AddStaffComponent', () => {
  let component: AddStaffComponent;
  let fixture: ComponentFixture<AddStaffComponent>;
  let router: Router;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStaffComponent],
      providers: [
        SchoolAdminStore,
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddStaffComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create and render all 6 form sections', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Add Staff',
    );
    expect(compiled.textContent).toContain('Staff Profile');
    expect(compiled.textContent).toContain('Professional Information');
    expect(compiled.textContent).toContain('Role & Assignment');
    expect(compiled.textContent).toContain('Login & Account Access');
    expect(compiled.textContent).toContain('Permissions & Visibility');
    expect(compiled.textContent).toContain('Safeguarding & Compliance');
  });

  it('should calculate onboarding completion and section checklist scores', () => {
    expect(component.profileScore()).toBeGreaterThanOrEqual(0);
    expect(component.overallCompletion()).toBeGreaterThanOrEqual(0);

    component.formData.firstName = 'Chinedu';
    component.formData.lastName = 'Eze';
    component.formData.email = 'chinedu.eze@schoolhub.org';
    component.onNameChange();
    fixture.detectChanges();

    expect(component.formData.username).toBe('chinedu.eze');
    expect(component.profileScore()).toBeGreaterThan(2);
  });

  it('should toggle class and subject chips', () => {
    component.toggleClass('JSS 1A');
    expect(component.formData.assignedClasses).toContain('JSS 1A');

    component.toggleClass('JSS 1A');
    expect(component.formData.assignedClasses).not.toContain('JSS 1A');

    component.toggleSubject('Mathematics');
    expect(component.formData.assignedSubjects).toContain('Mathematics');

    component.toggleSubject('Mathematics');
    expect(component.formData.assignedSubjects).not.toContain('Mathematics');
  });

  it('should refresh password and toggle visibility', () => {
    const oldPwd = component.formData.temporaryPassword;
    component.refreshPassword();
    expect(component.formData.temporaryPassword).not.toBe(oldPwd);

    expect(component.showPassword()).toBe(false);
    component.toggleShowPassword();
    expect(component.showPassword()).toBe(true);
  });

  it('should validate required fields before submission', () => {
    component.formData.firstName = '';
    component.formData.lastName = '';
    component.onCreateStaff();

    expect(component.formError()).toContain('first and last name');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should create staff and navigate to directory on valid submit', () => {
    component.formData.firstName = 'Ngozi';
    component.formData.lastName = 'Nwosu';
    component.formData.email = 'ngozi.nwosu@schoolhub.org';
    component.formData.role = 'Senior Teacher';
    component.formData.department = 'English Department';
    component.formData.assignedClasses = ['JSS 2A'];
    component.formData.assignedSubjects = ['English Language'];

    component.onCreateStaff();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/teachers-staff',
    ]);
  });

  it('should navigate back on cancel and save draft', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith([
      '/school-admin/teachers-staff',
    ]);

    component.onSaveDraft();
    expect(store.setupSaveStatus()).toContain('Draft saved');
  });
});
