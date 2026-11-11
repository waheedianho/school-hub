import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralSettingsComponent } from './general-settings';
import { GENERAL_SETTINGS_DATA } from '../../data/school-admin-settings.data';

describe('GeneralSettingsComponent', () => {
  let component: GeneralSettingsComponent;
  let fixture: ComponentFixture<GeneralSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('settings', GENERAL_SETTINGS_DATA);
    fixture.componentRef.setInput('isDirty', false);
    fixture.detectChanges();
  });

  it('should create and display form values', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    const schoolNameInput = compiled.querySelector(
      '#school-name-input',
    ) as HTMLInputElement;
    expect(schoolNameInput.value).toBe('Greenfield Academy');

    const emailInput = compiled.querySelector(
      '#school-email-input',
    ) as HTMLInputElement;
    expect(emailInput.value).toBe('info@greenfieldacademy.edu');

    const portalNameInput = compiled.querySelector(
      '#portal-name-input',
    ) as HTMLInputElement;
    expect(portalNameInput.value).toBe('Learno School Portal');

    // Save and Discard should be disabled when not dirty
    const saveBtn = compiled.querySelector(
      '[data-testid="save-settings-btn"]',
    ) as HTMLButtonElement;
    const discardBtn = compiled.querySelector(
      '[data-testid="discard-settings-btn"]',
    ) as HTMLButtonElement;
    expect(saveBtn.disabled).toBe(true);
    expect(discardBtn.disabled).toBe(true);
  });

  it('should emit update event when input value changes', () => {
    const updateSpy = vi.fn();
    component.update.subscribe(updateSpy);

    const schoolNameInput = fixture.nativeElement.querySelector(
      '#school-name-input',
    ) as HTMLInputElement;
    schoolNameInput.value = 'New School Name';
    schoolNameInput.dispatchEvent(new Event('input'));

    expect(updateSpy).toHaveBeenCalledWith({ schoolName: 'New School Name' });
  });

  it('should emit save and discard events when buttons are clicked', () => {
    fixture.componentRef.setInput('isDirty', true);
    fixture.detectChanges();

    const saveSpy = vi.fn();
    const discardSpy = vi.fn();
    component.save.subscribe(saveSpy);
    component.discard.subscribe(discardSpy);

    const saveBtn = fixture.nativeElement.querySelector(
      '[data-testid="save-settings-btn"]',
    ) as HTMLButtonElement;
    const discardBtn = fixture.nativeElement.querySelector(
      '[data-testid="discard-settings-btn"]',
    ) as HTMLButtonElement;

    expect(saveBtn.disabled).toBe(false);
    expect(discardBtn.disabled).toBe(false);

    saveBtn.click();
    expect(saveSpy).toHaveBeenCalledTimes(1);

    discardBtn.click();
    expect(discardSpy).toHaveBeenCalledTimes(1);
  });
});
