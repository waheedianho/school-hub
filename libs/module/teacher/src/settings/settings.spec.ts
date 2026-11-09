import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TeacherSettingsComponent } from './settings';
import {
  INITIAL_GRADING_PREFERENCES,
  INITIAL_NOTIFICATION_PREFERENCES,
  INITIAL_TEACHER_PROFILE,
  SUPPORT_HELP_ITEMS,
} from '../data/teacher-settings.data';

describe('TeacherSettingsComponent', () => {
  let component: TeacherSettingsComponent;
  let fixture: ComponentFixture<TeacherSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the Settings page header and layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Settings',
    );
    expect(compiled.querySelector('.page-subtitle')?.textContent).toContain(
      'Manage your profile, notifications, grading preferences, and account security.',
    );

    expect(
      compiled.querySelector('school-hub-profile-settings-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-notifications-settings-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-grading-preferences-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-account-security-card'),
    ).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-class-communication-card'),
    ).toBeTruthy();
    expect(compiled.querySelector('school-hub-support-help-card')).toBeTruthy();
    expect(
      compiled.querySelector('school-hub-settings-sidebar-widgets'),
    ).toBeTruthy();
  });

  it('should update profile and add recent change when profile is edited', () => {
    const updated = {
      ...INITIAL_TEACHER_PROFILE,
      name: 'Dr. Tunde Alabi',
    };

    component.onProfileUpdated(updated);
    fixture.detectChanges();

    expect(component.profile().name).toBe('Dr. Tunde Alabi');
    expect(component.recentChanges()[0].title).toBe(
      'Profile information updated',
    );
    expect(component.toastMessage()).toBe('Profile updated successfully!');
  });

  it('should update notifications when toggled', () => {
    const updated = {
      ...INITIAL_NOTIFICATION_PREFERENCES,
      liveClassReminders: false,
    };

    component.onNotificationsUpdated(updated);
    fixture.detectChanges();

    expect(component.notifications().liveClassReminders).toBe(false);
    expect(component.recentChanges()[0].title).toBe(
      'Notification preferences updated',
    );
  });

  it('should update grading preferences', () => {
    const updated = {
      ...INITIAL_GRADING_PREFERENCES,
      gradingScale: 'Letter Grade (A-F)',
    };

    component.onGradingUpdated(updated);
    fixture.detectChanges();

    expect(component.grading().gradingScale).toBe('Letter Grade (A-F)');
    expect(component.recentChanges()[0].title).toBe(
      'Grading preferences modified',
    );
  });

  it('should trigger save all settings toast', () => {
    component.onSaveAllSettings();
    fixture.detectChanges();

    expect(component.toastMessage()).toBe('All settings saved successfully!');
  });

  it('should reset all settings to defaults', () => {
    component.profile.set({
      ...INITIAL_TEACHER_PROFILE,
      name: 'Temporary Name',
    });

    component.onResetDefaults();
    fixture.detectChanges();

    expect(component.profile().name).toBe(INITIAL_TEACHER_PROFILE.name);
    expect(component.toastMessage()).toBe(
      'Settings restored to default values.',
    );
  });

  it('should handle support item selection', () => {
    component.onSupportItemSelected(SUPPORT_HELP_ITEMS[0]);
    fixture.detectChanges();

    expect(component.toastMessage()).toContain(
      `Selected: ${SUPPORT_HELP_ITEMS[0].title}`,
    );
  });
});
