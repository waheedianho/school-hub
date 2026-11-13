import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolOnboardComponent } from './school-onboard';
import { SuperAdminStore } from '../../data/super-admin.store';

describe('SchoolOnboardComponent', () => {
  let component: SchoolOnboardComponent;
  let fixture: ComponentFixture<SchoolOnboardComponent>;
  let store: SuperAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOnboardComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    store = TestBed.inject(SuperAdminStore);
    fixture = TestBed.createComponent(SchoolOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on step 1', () => {
    expect(component.currentStep()).toBe(1);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword()).toBe(true);
  });

  it('should fail validation if required fields are missing', () => {
    component.updateField('schoolName', '');
    const valid = component.validateStep1();
    expect(valid).toBe(false);
  });

  it('should proceed to step 2 when form is valid', () => {
    component.updateField('schoolName', 'Test Academy');
    component.updateField('schoolCode', 'SCH-999');
    component.updateField('adminFirstName', 'John');
    component.updateField('adminLastName', 'Doe');
    component.updateField('adminEmail', 'admin@test.edu');

    component.proceedToReview();
    expect(component.currentStep()).toBe(2);
  });

  it('should launch school and advance to step 3', () => {
    component.updateField('schoolName', 'St. Jude Academy');
    component.updateField('schoolCode', 'SJA-001');
    component.updateField('adminFirstName', 'Alice');
    component.updateField('adminLastName', 'Smith');
    component.updateField('adminEmail', 'alice@stjude.edu');

    const onboardSpy = vi.spyOn(store, 'onboardSchool');
    component.launchSchool();

    expect(onboardSpy).toHaveBeenCalled();
    expect(component.currentStep()).toBe(3);
    expect(component.createdSchool()).toBeTruthy();
    expect(component.createdSchool()?.name).toBe('St. Jude Academy');
  });

  it('should reset form when onboarding another school', () => {
    component.goToStep(3);
    component.onboardAnother();
    expect(component.currentStep()).toBe(1);
    expect(component.createdSchool()).toBeNull();
    expect(component.formData().schoolName).toBe('');
  });
});
