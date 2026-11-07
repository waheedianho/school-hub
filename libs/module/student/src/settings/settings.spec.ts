import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { StudentSettingsComponent } from './settings';
import { LearnerProfileStore } from '../data/learner-profile-store';
import { ThemeService } from '@school-hub/theming';

describe('StudentSettingsComponent', () => {
  let component: StudentSettingsComponent;
  let fixture: ComponentFixture<StudentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSettingsComponent],
      providers: [provideRouter([]), LearnerProfileStore, ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create and render heading', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1.settings-title');
    expect(heading?.textContent?.trim()).toBe('Settings');
  });

  it('renders all 9 settings menu items via SettingsNavComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuButtons = compiled.querySelectorAll(
      'school-hub-settings-nav .menu-item',
    );
    expect(menuButtons.length).toBe(9);
  });

  it('defaults to account section', () => {
    expect(component.activeSection()).toBe('account');
  });

  it('handles password change submission and updates status message', () => {
    component.onPasswordSubmit();

    expect(component.passwordStatusMessage()).toContain(
      'Password updated successfully on this browser session.',
    );
  });

  it('opens and closes modal dialogs with shared DialogPanelComponent', () => {
    component.openModal('sessions');
    expect(component.activeModal()).toBe('sessions');
    expect(component.dialogTitle()).toBe('Active Sessions');

    component.closeModal();
    expect(component.activeModal()).toBeNull();
  });

  it('updates theme setting and calls theme service', () => {
    component.setTheme('dark');
    expect(component.settings().theme).toBe('dark');
  });

  it('updates text size setting', () => {
    component.setTextSize('large');
    expect(component.settings().textSize).toBe('large');
  });

  it('toggles learning settings', () => {
    component.onLearningToggle({
      key: 'dailyStudyReminder',
      value: false,
    });
    expect(component.settings().dailyStudyReminder).toBe(false);
  });

  it('toggles notification settings', () => {
    component.onNotificationToggle({
      key: 'pushNotifications',
      value: false,
    });
    expect(component.settings().pushNotifications).toBe(false);
  });

  it('highlights corresponding card border when section is active', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const profileCard = compiled.querySelector('#card-account-profile');
    const passwordCard = compiled.querySelector('#card-account-password');
    const learningCard = compiled.querySelector('#card-learning');

    expect(profileCard?.classList.contains('active-card')).toBe(true);
    expect(passwordCard?.classList.contains('active-card')).toBe(true);
    expect(learningCard?.classList.contains('active-card')).toBe(false);
  });

  it('updates route query params and active section on card interaction', () => {
    const router = TestBed.inject(Router);
    let navigatedExtras:
      | { queryParams?: { section?: string }; replaceUrl?: boolean }
      | undefined;
    router.navigate = ((
      _commands: unknown[],
      extras?: { queryParams?: { section?: string }; replaceUrl?: boolean },
    ) => {
      navigatedExtras = extras;
      return Promise.resolve(true);
    }) as Router['navigate'];

    component.onCardInteract('notifications');
    expect(navigatedExtras?.queryParams?.section).toBe('notifications');
    expect(navigatedExtras?.replaceUrl).toBe(true);
  });

  it('updates route query params and scrolls on section selection', () => {
    const router = TestBed.inject(Router);
    let navigatedExtras:
      | { queryParams?: { section?: string }; replaceUrl?: boolean }
      | undefined;
    router.navigate = ((
      _commands: unknown[],
      extras?: { queryParams?: { section?: string }; replaceUrl?: boolean },
    ) => {
      navigatedExtras = extras;
      return Promise.resolve(true);
    }) as Router['navigate'];

    component.selectSection('security');
    expect(component.activeSection()).toBe('security');
    expect(navigatedExtras?.queryParams?.section).toBe('security');
  });
});
