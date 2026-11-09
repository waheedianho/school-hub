import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AccountSecurityInfo,
  ClassCommunicationPreferences,
  GradingPreferences,
  INITIAL_ACCOUNT_SECURITY,
  INITIAL_CLASS_COMMUNICATION_PREFERENCES,
  INITIAL_GRADING_PREFERENCES,
  INITIAL_NOTIFICATION_PREFERENCES,
  INITIAL_TEACHER_PROFILE,
  NotificationPreferences,
  RecentSettingChange,
  RECENT_SETTINGS_CHANGES,
  SETTINGS_TIPS,
  SupportHelpItem,
  SUPPORT_HELP_ITEMS,
  TeacherProfileInfo,
} from '../data/teacher-settings.data';
import { AccountSecurityCardComponent } from './account-security-card/account-security-card';
import { ClassCommunicationCardComponent } from './class-communication-card/class-communication-card';
import { GradingPreferencesCardComponent } from './grading-preferences-card/grading-preferences-card';
import { NotificationsSettingsCardComponent } from './notifications-settings-card/notifications-settings-card';
import { ProfileSettingsCardComponent } from './profile-settings-card/profile-settings-card';
import { SettingsSidebarWidgetsComponent } from './settings-sidebar-widgets/settings-sidebar-widgets';
import { SupportHelpCardComponent } from './support-help-card/support-help-card';

@Component({
  selector: 'school-hub-teacher-settings',
  imports: [
    ProfileSettingsCardComponent,
    NotificationsSettingsCardComponent,
    GradingPreferencesCardComponent,
    AccountSecurityCardComponent,
    ClassCommunicationCardComponent,
    SupportHelpCardComponent,
    SettingsSidebarWidgetsComponent,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherSettingsComponent {
  readonly profile = signal<TeacherProfileInfo>({ ...INITIAL_TEACHER_PROFILE });
  readonly notifications = signal<NotificationPreferences>({
    ...INITIAL_NOTIFICATION_PREFERENCES,
  });
  readonly grading = signal<GradingPreferences>({
    ...INITIAL_GRADING_PREFERENCES,
  });
  readonly security = signal<AccountSecurityInfo>({
    ...INITIAL_ACCOUNT_SECURITY,
  });
  readonly classCommunication = signal<ClassCommunicationPreferences>({
    ...INITIAL_CLASS_COMMUNICATION_PREFERENCES,
  });
  readonly supportItems = signal<SupportHelpItem[]>([...SUPPORT_HELP_ITEMS]);
  readonly tips = signal<string[]>([...SETTINGS_TIPS]);
  readonly recentChanges = signal<RecentSettingChange[]>([
    ...RECENT_SETTINGS_CHANGES,
  ]);

  readonly toastMessage = signal<string | null>(null);

  onProfileUpdated(updated: TeacherProfileInfo): void {
    this.profile.set(updated);
    this.addRecentChange('Profile information updated');
    this.showToast('Profile updated successfully!');
  }

  onNotificationsUpdated(updated: NotificationPreferences): void {
    this.notifications.set(updated);
    this.addRecentChange('Notification preferences updated');
  }

  onGradingUpdated(updated: GradingPreferences): void {
    this.grading.set(updated);
    this.addRecentChange('Grading preferences modified');
  }

  onSecurityUpdated(updated: AccountSecurityInfo): void {
    this.security.set(updated);
    this.addRecentChange('Account security configuration updated');
  }

  onClassCommunicationUpdated(updated: ClassCommunicationPreferences): void {
    this.classCommunication.set(updated);
    this.addRecentChange('Class & communication preferences saved');
  }

  onSaveAllSettings(): void {
    this.showToast('All settings saved successfully!');
  }

  onResetDefaults(): void {
    this.profile.set({ ...INITIAL_TEACHER_PROFILE });
    this.notifications.set({ ...INITIAL_NOTIFICATION_PREFERENCES });
    this.grading.set({ ...INITIAL_GRADING_PREFERENCES });
    this.security.set({ ...INITIAL_ACCOUNT_SECURITY });
    this.classCommunication.set({
      ...INITIAL_CLASS_COMMUNICATION_PREFERENCES,
    });
    this.showToast('Settings restored to default values.');
  }

  onSupportItemSelected(item: SupportHelpItem): void {
    this.showToast(`Selected: ${item.title}`);
  }

  private addRecentChange(title: string): void {
    const newEntry: RecentSettingChange = {
      id: `ch-${Date.now()}`,
      title,
      timestamp: 'Just now',
    };
    this.recentChanges.update((changes) => [newEntry, ...changes.slice(0, 4)]);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 3200);
  }
}
