import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DialogPanelComponent,
  StatusBadgeComponent,
} from '@school-hub/ui-elements';
import { ThemeService } from '@school-hub/theming';
import { LearnerProfileStore } from '../data/learner-profile-store';
import {
  LearnerSettingsState,
  SETTINGS_SECTIONS,
  SETTINGS_STORAGE_KEY,
  SettingsSection,
  TextSizePreference,
  ThemePreference,
  defaultSettings,
  readSettings,
  resolveSettingsSection,
  writeSettings,
} from './settings-engine';
import { SettingsNavComponent } from './settings-nav/settings-nav';
import { AccountProfileCardComponent } from './account-profile-card/account-profile-card';
import { AccountPasswordCardComponent } from './account-password-card/account-password-card';
import { LearningCardComponent } from './learning-card/learning-card';
import { NotificationsCardComponent } from './notifications-card/notifications-card';
import { SecurityCardComponent } from './security-card/security-card';
import { AppearanceCardComponent } from './appearance-card/appearance-card';
import { StorageCardComponent } from './storage-card/storage-card';
import { LanguageCardComponent } from './language-card/language-card';
import { SupportCardComponent } from './support-card/support-card';
import { AboutCardComponent } from './about-card/about-card';

export type SettingsModalType =
  | 'sessions'
  | 'twoFactor'
  | 'manageStorage'
  | 'help'
  | 'report'
  | 'about'
  | null;

@Component({
  selector: 'school-hub-student-settings',
  imports: [
    DialogPanelComponent,
    StatusBadgeComponent,
    SettingsNavComponent,
    AccountProfileCardComponent,
    AccountPasswordCardComponent,
    LearningCardComponent,
    NotificationsCardComponent,
    SecurityCardComponent,
    AppearanceCardComponent,
    StorageCardComponent,
    LanguageCardComponent,
    SupportCardComponent,
    AboutCardComponent,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentSettingsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  protected readonly themeService = inject(ThemeService);
  protected readonly profile = inject(LearnerProfileStore);

  readonly sections = SETTINGS_SECTIONS;

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });

  readonly activeSection = signal<SettingsSection>('account');

  readonly settings = signal<LearnerSettingsState>(defaultSettings());

  readonly passwordStatusMessage = signal<string>('');

  readonly activeModal = signal<SettingsModalType>(null);

  readonly dialogTitle = computed(() => {
    switch (this.activeModal()) {
      case 'sessions':
        return 'Active Sessions';
      case 'twoFactor':
        return 'Two-Factor Authentication';
      case 'manageStorage':
        return 'Manage Offline Storage';
      case 'help':
        return 'Help Centre';
      case 'report':
        return 'Report an Issue';
      case 'about':
        return 'About Learno Platform';
      default:
        return 'Settings Details';
    }
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
        this.settings.set(readSettings(stored));
      } catch {
        this.settings.set(defaultSettings());
      }
    }

    effect(() => {
      const q = this.queryParams();
      const rawSection = q.get('section');
      const resolved = resolveSettingsSection(rawSection);
      if (resolved !== this.activeSection()) {
        this.activeSection.set(resolved);
      }
    });

    effect(() => {
      const current = this.settings();
      if (isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem(SETTINGS_STORAGE_KEY, writeSettings(current));
        } catch {
          // ignore storage write errors
        }
      }
    });
  }

  selectSection(section: SettingsSection): void {
    this.activeSection.set(section);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.scrollToSection(section);
  }

  onCardInteract(section: SettingsSection): void {
    if (this.activeSection() !== section) {
      this.activeSection.set(section);
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { section },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
  }

  scrollToSection(section: SettingsSection): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target =
      this.document.getElementById('card-' + section) ||
      this.document.getElementById('section-' + section);
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onPasswordSubmit(): void {
    this.passwordStatusMessage.set(
      'Password updated successfully on this browser session.',
    );
  }

  onLearningToggle(event: {
    key: 'dailyStudyReminder' | 'weeklyProgressSummary';
    value: boolean;
  }): void {
    this.settings.update((s) => ({ ...s, [event.key]: event.value }));
  }

  onNotificationToggle(event: {
    key:
      | 'pushNotifications'
      | 'emailNotifications'
      | 'smsNotifications'
      | 'liveClassReminders';
    value: boolean;
  }): void {
    this.settings.update((s) => ({ ...s, [event.key]: event.value }));
  }

  onWifiToggle(value: boolean): void {
    this.profile.wifiOnly(value);
  }

  setTheme(theme: ThemePreference): void {
    this.settings.update((s) => ({ ...s, theme }));
    this.themeService.toggleDarkMode(theme === 'dark');
  }

  setTextSize(size: TextSizePreference): void {
    this.settings.update((s) => ({ ...s, textSize: size }));
  }

  onLanguageChange(event: {
    key: 'appLanguage' | 'contentLanguage';
    value: string;
  }): void {
    this.settings.update((s) => ({ ...s, [event.key]: event.value }));
  }

  openModal(type: SettingsModalType): void {
    this.activeModal.set(type);
  }

  closeModal(): void {
    this.activeModal.set(null);
  }

  clearCache(): void {
    this.settings.update((s) => ({
      ...s,
      storageUsedBytes: 0.1 * 1024 * 1024 * 1024,
    }));
    this.closeModal();
  }
}
