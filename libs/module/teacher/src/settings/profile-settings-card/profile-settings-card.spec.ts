import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProfileSettingsCardComponent } from './profile-settings-card';
import { INITIAL_TEACHER_PROFILE } from '../../data/teacher-settings.data';

describe('ProfileSettingsCardComponent', () => {
  let component: ProfileSettingsCardComponent;
  let fixture: ComponentFixture<ProfileSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('profile', INITIAL_TEACHER_PROFILE);
    fixture.detectChanges();
  });

  it('should render profile details correctly in view mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Profile Settings',
    );
    expect(compiled.textContent).toContain(INITIAL_TEACHER_PROFILE.name);
    expect(compiled.textContent).toContain(INITIAL_TEACHER_PROFILE.email);
    expect(compiled.textContent).toContain(INITIAL_TEACHER_PROFILE.phone);
    expect(compiled.textContent).toContain(INITIAL_TEACHER_PROFILE.staffId);
    expect(compiled.textContent).toContain(INITIAL_TEACHER_PROFILE.specialty);
  });

  it('should toggle to edit mode when Edit Profile button is clicked', () => {
    component.onStartEdit();
    fixture.detectChanges();

    expect(component.isEditing()).toBe(true);
    expect(component.editName()).toBe(INITIAL_TEACHER_PROFILE.name);
    expect(component.editPhone()).toBe(INITIAL_TEACHER_PROFILE.phone);
    expect(component.editSpecialty()).toBe(INITIAL_TEACHER_PROFILE.specialty);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#editName')).toBeTruthy();
  });

  it('should emit profileUpdated when saving edits', () => {
    let emittedProfile: typeof INITIAL_TEACHER_PROFILE | undefined;
    component.profileUpdated.subscribe((p) => (emittedProfile = p));

    component.onStartEdit();
    component.editName.set('Dr. Tunde Alabi');
    component.editPhone.set('+234 809 999 8888');
    component.editSpecialty.set('Literature & Composition');
    component.onSaveEdit();
    fixture.detectChanges();

    expect(component.isEditing()).toBe(false);
    expect(emittedProfile).toBeDefined();
    expect(emittedProfile?.name).toBe('Dr. Tunde Alabi');
    expect(emittedProfile?.phone).toBe('+234 809 999 8888');
    expect(emittedProfile?.specialty).toBe('Literature & Composition');
  });

  it('should revert edits when Cancel is clicked', () => {
    component.onStartEdit();
    component.editName.set('Changed Name');
    component.onCancelEdit();
    fixture.detectChanges();

    expect(component.isEditing()).toBe(false);
  });
});
