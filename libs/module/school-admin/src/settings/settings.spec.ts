import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    store = TestBed.inject(SchoolAdminStore);
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render header and metrics', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.page-title')?.textContent).toContain(
      'Settings & Permissions',
    );
    expect(
      compiled.querySelector('school-hub-settings-summary-metrics'),
    ).toBeTruthy();
  });

  it('should switch tabs when clicking navigation buttons', () => {
    const rolesTabBtn = fixture.nativeElement.querySelector(
      '[data-testid="tab-roles-permissions"]',
    ) as HTMLButtonElement;
    rolesTabBtn.click();
    fixture.detectChanges();

    expect(store.activeSettingsTab()).toBe('roles-permissions');
    expect(
      fixture.nativeElement.querySelector('school-hub-roles-permissions'),
    ).toBeTruthy();

    const policiesTabBtn = fixture.nativeElement.querySelector(
      '[data-testid="tab-academic-policies"]',
    ) as HTMLButtonElement;
    policiesTabBtn.click();
    fixture.detectChanges();

    expect(store.activeSettingsTab()).toBe('academic-policies');
    expect(
      fixture.nativeElement.querySelector('.auxiliary-panel-card'),
    ).toBeTruthy();
  });

  it('should trigger modals via header and sidebar buttons', () => {
    store.setActiveSettingsTab('roles-permissions');
    fixture.detectChanges();

    const createRoleBtn = fixture.nativeElement.querySelector(
      '[data-testid="header-create-role-btn"]',
    ) as HTMLButtonElement;
    createRoleBtn.click();
    fixture.detectChanges();

    expect(store.isCreateRoleModalOpen()).toBe(true);
    store.closeCreateRoleModal();
    fixture.detectChanges();
    expect(store.isCreateRoleModalOpen()).toBe(false);
  });

  it('should display and dismiss status notification banner', () => {
    store.setupSaveStatus.set('Settings saved successfully at 09:15 AM.');
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector(
      '[data-testid="settings-status-banner"]',
    );
    expect(banner?.textContent).toContain('Settings saved successfully');

    const dismissBtn = banner?.querySelector(
      '.dismiss-btn',
    ) as HTMLButtonElement;
    dismissBtn.click();
    fixture.detectChanges();

    expect(store.setupSaveStatus()).toBeNull();
  });

  it('should handle card trigger navigation', () => {
    component.onTriggerCard('grading-policy');
    expect(store.activeSettingsTab()).toBe('academic-policies');

    component.onTriggerCard('notification-rules');
    expect(store.activeSettingsTab()).toBe('notifications');

    component.onTriggerCard('privacy-settings');
    expect(store.activeSettingsTab()).toBe('privacy-security');

    component.onTriggerCard('audit-log');
    expect(store.activeSettingsTab()).toBe('audit-logs');
  });
});
