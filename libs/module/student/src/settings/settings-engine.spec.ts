import {
  calculateStoragePercentage,
  defaultSettings,
  formatStorageSize,
  readSettings,
  resolveSettingsSection,
  SETTINGS_SECTIONS,
  validatePasswordChange,
  writeSettings,
} from './settings-engine';

describe('settings-engine', () => {
  describe('defaultSettings', () => {
    it('returns standard defaults matching Learno design', () => {
      const defaults = defaultSettings();
      expect(defaults.theme).toBe('light');
      expect(defaults.textSize).toBe('medium');
      expect(defaults.dailyStudyReminder).toBe(true);
      expect(defaults.dailyStudyReminderTime).toBe('7:00 PM every day');
      expect(defaults.weeklyProgressSummary).toBe(true);
      expect(defaults.pushNotifications).toBe(true);
      expect(defaults.emailNotifications).toBe(true);
      expect(defaults.smsNotifications).toBe(false);
      expect(defaults.liveClassReminders).toBe(true);
      expect(defaults.profileVisibility).toBe('tutors');
      expect(defaults.appLanguage).toBe('en');
      expect(defaults.contentLanguage).toBe('en');
      expect(defaults.twoFactorEnabled).toBe(false);
      expect(defaults.storageUsedBytes).toBeGreaterThan(0);
      expect(defaults.storageTotalBytes).toBeGreaterThan(
        defaults.storageUsedBytes,
      );
    });
  });

  describe('readSettings and writeSettings', () => {
    it('roundtrips valid settings correctly', () => {
      const initial = defaultSettings();
      initial.theme = 'dark';
      initial.smsNotifications = true;
      initial.profileVisibility = 'private';

      const serialized = writeSettings(initial);
      const parsed = readSettings(serialized);

      expect(parsed.theme).toBe('dark');
      expect(parsed.smsNotifications).toBe(true);
      expect(parsed.profileVisibility).toBe('private');
    });

    it('falls back to defaults on corrupted JSON or missing payload', () => {
      expect(readSettings(null)).toEqual(defaultSettings());
      expect(readSettings('{')).toEqual(defaultSettings());
      expect(readSettings(JSON.stringify({ version: 2 }))).toEqual(
        defaultSettings(),
      );
      expect(
        readSettings(JSON.stringify({ version: 1, theme: 'invalid' })),
      ).toEqual(defaultSettings());
    });

    it('sanitizes invalid field values while preserving valid ones', () => {
      const payload = JSON.stringify({
        version: 1,
        theme: 'dark',
        textSize: 'unsupported-size',
        pushNotifications: false,
        storageUsedBytes: -100,
      });

      const parsed = readSettings(payload);
      expect(parsed.theme).toBe('dark');
      expect(parsed.textSize).toBe('medium'); // default
      expect(parsed.pushNotifications).toBe(false);
      expect(parsed.storageUsedBytes).toBe(defaultSettings().storageUsedBytes); // sanitized
    });
  });

  describe('validatePasswordChange', () => {
    it('requires current password', () => {
      const res = validatePasswordChange(
        '',
        'newpassword123',
        'newpassword123',
      );
      expect(res.valid).toBe(false);
      expect(res.errors.current).toBe('Enter your current password.');
    });

    it('requires new password to be at least 8 characters', () => {
      const res = validatePasswordChange('currentPass1', 'short', 'short');
      expect(res.valid).toBe(false);
      expect(res.errors.newPassword).toBe(
        'Password must be at least 8 characters long.',
      );
    });

    it('requires confirm password to match new password', () => {
      const res = validatePasswordChange(
        'currentPass1',
        'validPass123',
        'differentPass123',
      );
      expect(res.valid).toBe(false);
      expect(res.errors.confirmPassword).toBe('Passwords do not match.');
    });

    it('passes for matching valid passwords', () => {
      const res = validatePasswordChange(
        'currentPass1',
        'superSecret99',
        'superSecret99',
      );
      expect(res.valid).toBe(true);
      expect(Object.keys(res.errors)).toHaveLength(0);
    });
  });

  describe('formatStorageSize and calculateStoragePercentage', () => {
    it('formats storage bytes to gigabytes string', () => {
      expect(formatStorageSize(1.4 * 1024 * 1024 * 1024)).toBe('1.4 GB');
      expect(formatStorageSize(5.0 * 1024 * 1024 * 1024)).toBe('5.0 GB');
    });

    it('calculates storage percentage accurately', () => {
      expect(
        calculateStoragePercentage(
          1.4 * 1024 * 1024 * 1024,
          5.0 * 1024 * 1024 * 1024,
        ),
      ).toBe(28);
      expect(calculateStoragePercentage(0, 100)).toBe(0);
      expect(calculateStoragePercentage(150, 100)).toBe(100);
      expect(calculateStoragePercentage(10, 0)).toBe(0);
    });
  });

  describe('resolveSettingsSection', () => {
    it('resolves valid query section', () => {
      expect(resolveSettingsSection('security')).toBe('security');
      expect(resolveSettingsSection('learning')).toBe('learning');
      expect(resolveSettingsSection('notifications')).toBe('notifications');
      expect(resolveSettingsSection('appearance')).toBe('appearance');
    });

    it('falls back to account for missing or unknown sections', () => {
      expect(resolveSettingsSection(null)).toBe('account');
      expect(resolveSettingsSection('non-existent')).toBe('account');
    });

    it('ensures all 9 sections exist in SETTINGS_SECTIONS', () => {
      expect(SETTINGS_SECTIONS).toHaveLength(9);
      const ids = SETTINGS_SECTIONS.map((s) => s.id);
      expect(ids).toEqual([
        'account',
        'learning',
        'notifications',
        'security',
        'appearance',
        'storage',
        'language',
        'support',
        'about',
      ]);
    });
  });
});
