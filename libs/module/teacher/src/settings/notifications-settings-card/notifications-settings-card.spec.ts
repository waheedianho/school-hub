import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { NotificationsSettingsCardComponent } from './notifications-settings-card';
import {
  INITIAL_NOTIFICATION_PREFERENCES,
  NotificationPreferences,
} from '../../data/teacher-settings.data';

describe('NotificationsSettingsCardComponent', () => {
  let component: NotificationsSettingsCardComponent;
  let fixture: ComponentFixture<NotificationsSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsSettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'preferences',
      INITIAL_NOTIFICATION_PREFERENCES,
    );
    fixture.detectChanges();
  });

  it('should render all 6 notification options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Notification Preferences',
    );
    const items = compiled.querySelectorAll('.notification-item');
    expect(items.length).toBe(6);

    expect(compiled.textContent).toContain('Assignment Alerts');
    expect(compiled.textContent).toContain('Submission Reviews');
    expect(compiled.textContent).toContain('Live Class Reminders');
    expect(compiled.textContent).toContain('Message Notifications');
    expect(compiled.textContent).toContain('Report Generation Alerts');
    expect(compiled.textContent).toContain('Parent Communication');
  });

  it('should emit preferencesUpdated when a toggle is changed', () => {
    let emitted: NotificationPreferences | undefined;
    component.preferencesUpdated.subscribe((p) => (emitted = p));

    component.onToggle('liveClassReminders', false);
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.liveClassReminders).toBe(false);
    expect(emitted?.assignmentAlerts).toBe(true);
  });
});
