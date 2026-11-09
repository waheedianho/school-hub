export type SettingsSection =
  | 'account'
  | 'learning'
  | 'notifications'
  | 'security'
  | 'appearance'
  | 'storage'
  | 'language'
  | 'support'
  | 'about';

export interface SettingsSectionItem {
  readonly id: SettingsSection;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
}

export const SETTINGS_SECTIONS: readonly SettingsSectionItem[] = [
  {
    id: 'account',
    label: 'Account Settings',
    description: 'Profile, personal info, password',
    icon: 'ri-user-3-line',
  },
  {
    id: 'learning',
    label: 'Learning Preferences',
    description: 'Subjects, goals, reminders',
    icon: 'ri-sound-module-line',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Email, push, SMS preferences',
    icon: 'ri-notification-3-line',
  },
  {
    id: 'security',
    label: 'Privacy & Security',
    description: 'Privacy controls, data usage',
    icon: 'ri-lock-2-line',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'Theme, text size, display',
    icon: 'ri-palette-line',
  },
  {
    id: 'storage',
    label: 'Download & Storage',
    description: 'Manage downloads and storage',
    icon: 'ri-download-2-line',
  },
  {
    id: 'language',
    label: 'Language',
    description: 'App language and content',
    icon: 'ri-global-line',
  },
  {
    id: 'support',
    label: 'Help & Support',
    description: 'FAQs, contact support',
    icon: 'ri-question-line',
  },
  {
    id: 'about',
    label: 'About Learno',
    description: 'App version and information',
    icon: 'ri-information-line',
  },
] as const;

export type ThemePreference = 'light' | 'dark' | 'system';
export type TextSizePreference = 'small' | 'medium' | 'large';
export type ProfileVisibility = 'tutors' | 'all' | 'private';

export interface LearnerSettingsState {
  theme: ThemePreference;
  textSize: TextSizePreference;
  dailyStudyReminder: boolean;
  dailyStudyReminderTime: string;
  weeklyProgressSummary: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  liveClassReminders: boolean;
  profileVisibility: ProfileVisibility;
  appLanguage: string;
  contentLanguage: string;
  twoFactorEnabled: boolean;
  storageUsedBytes: number;
  storageTotalBytes: number;
}

export const SETTINGS_STORAGE_KEY = 'school-hub:learner-settings:v1';

export function defaultSettings(): LearnerSettingsState {
  return {
    theme: 'light',
    textSize: 'medium',
    dailyStudyReminder: true,
    dailyStudyReminderTime: '7:00 PM every day',
    weeklyProgressSummary: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    liveClassReminders: true,
    profileVisibility: 'tutors',
    appLanguage: 'en',
    contentLanguage: 'en',
    twoFactorEnabled: false,
    storageUsedBytes: 1.4 * 1024 * 1024 * 1024, // 1.4 GB
    storageTotalBytes: 5.0 * 1024 * 1024 * 1024, // 5.0 GB
  };
}

export function readSettings(raw: string | null): LearnerSettingsState {
  const initial = defaultSettings();
  if (!raw) return initial;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      return initial;
    }
    return {
      theme: ['light', 'dark', 'system'].includes(parsed.theme)
        ? parsed.theme
        : initial.theme,
      textSize: ['small', 'medium', 'large'].includes(parsed.textSize)
        ? parsed.textSize
        : initial.textSize,
      dailyStudyReminder:
        typeof parsed.dailyStudyReminder === 'boolean'
          ? parsed.dailyStudyReminder
          : initial.dailyStudyReminder,
      dailyStudyReminderTime:
        typeof parsed.dailyStudyReminderTime === 'string'
          ? parsed.dailyStudyReminderTime
          : initial.dailyStudyReminderTime,
      weeklyProgressSummary:
        typeof parsed.weeklyProgressSummary === 'boolean'
          ? parsed.weeklyProgressSummary
          : initial.weeklyProgressSummary,
      pushNotifications:
        typeof parsed.pushNotifications === 'boolean'
          ? parsed.pushNotifications
          : initial.pushNotifications,
      emailNotifications:
        typeof parsed.emailNotifications === 'boolean'
          ? parsed.emailNotifications
          : initial.emailNotifications,
      smsNotifications:
        typeof parsed.smsNotifications === 'boolean'
          ? parsed.smsNotifications
          : initial.smsNotifications,
      liveClassReminders:
        typeof parsed.liveClassReminders === 'boolean'
          ? parsed.liveClassReminders
          : initial.liveClassReminders,
      profileVisibility: ['tutors', 'all', 'private'].includes(
        parsed.profileVisibility,
      )
        ? parsed.profileVisibility
        : initial.profileVisibility,
      appLanguage:
        typeof parsed.appLanguage === 'string'
          ? parsed.appLanguage
          : initial.appLanguage,
      contentLanguage:
        typeof parsed.contentLanguage === 'string'
          ? parsed.contentLanguage
          : initial.contentLanguage,
      twoFactorEnabled:
        typeof parsed.twoFactorEnabled === 'boolean'
          ? parsed.twoFactorEnabled
          : initial.twoFactorEnabled,
      storageUsedBytes:
        typeof parsed.storageUsedBytes === 'number' &&
        parsed.storageUsedBytes >= 0
          ? parsed.storageUsedBytes
          : initial.storageUsedBytes,
      storageTotalBytes:
        typeof parsed.storageTotalBytes === 'number' &&
        parsed.storageTotalBytes > 0
          ? parsed.storageTotalBytes
          : initial.storageTotalBytes,
    };
  } catch {
    return initial;
  }
}

export function writeSettings(settings: LearnerSettingsState): string {
  return JSON.stringify({ version: 1, ...settings });
}

export interface PasswordChangeResult {
  valid: boolean;
  errors: {
    current?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
}

export function validatePasswordChange(
  current: string,
  newPass: string,
  confirm: string,
): PasswordChangeResult {
  const errors: PasswordChangeResult['errors'] = {};

  if (!current || !current.trim()) {
    errors.current = 'Enter your current password.';
  }

  if (!newPass || newPass.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long.';
  }

  if (!confirm) {
    errors.confirmPassword = 'Confirm your new password.';
  } else if (newPass !== confirm) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatStorageSize(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  return `${gb.toFixed(1)} GB`;
}

export function calculateStoragePercentage(
  used: number,
  total: number,
): number {
  if (total <= 0) return 0;
  const pct = Math.round((used / total) * 100);
  return Math.max(0, Math.min(100, pct));
}

export function resolveSettingsSection(
  querySection: string | null,
): SettingsSection {
  const match = SETTINGS_SECTIONS.find((s) => s.id === querySection);
  return match ? match.id : 'account';
}
