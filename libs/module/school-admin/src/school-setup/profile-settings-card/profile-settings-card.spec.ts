import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSettingsCardComponent } from './profile-settings-card';
import { SCHOOL_PROFILE_DATA } from '../../data/school-admin-setup.data';

describe('ProfileSettingsCardComponent', () => {
  let component: ProfileSettingsCardComponent;
  let fixture: ComponentFixture<ProfileSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('profile', SCHOOL_PROFILE_DATA);
    fixture.detectChanges();
  });

  it('should create and render initial values', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '1. School Profile',
    );
    const nameInput = compiled.querySelector(
      '#school-name',
    ) as HTMLInputElement;
    expect(nameInput.value).toBe('Greenfield Secondary School');
  });

  it('should emit profileChange when field is modified', () => {
    const spy = vi.spyOn(component.profileChange, 'emit');
    component.onFieldChange('name', 'New School Name');
    expect(spy).toHaveBeenCalledWith({ name: 'New School Name' });
  });

  it('should emit profileChange when color swatch is selected', () => {
    const spy = vi.spyOn(component.profileChange, 'emit');
    component.selectColor('#10b981');
    expect(spy).toHaveBeenCalledWith({ primaryColor: '#10b981' });
  });
});
