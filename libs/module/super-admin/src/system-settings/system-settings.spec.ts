import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SystemSettingsComponent } from './system-settings';
import { SuperAdminStore } from '../data/super-admin.store';

describe('SystemSettingsComponent', () => {
  let component: SystemSettingsComponent;
  let fixture: ComponentFixture<SystemSettingsComponent>;
  let store: SuperAdminStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemSettingsComponent],
      providers: [provideRouter([]), SuperAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemSettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SuperAdminStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create and render all main sections', () => {
    expect(component).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('school-hub-settings-metrics'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('school-hub-settings-tabs'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('school-hub-settings-grid'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('school-hub-settings-sidebar'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('school-hub-settings-bottom-metrics'),
    ).toBeTruthy();
  });

  it('should handle tab change', () => {
    component.onTabChange('security');
    expect(store.activeSettingsTab()).toBe('security');
  });

  it('should handle settings save and trigger toast notification', () => {
    expect(component.toastMessage()).toBeNull();
    component.onSaveSettings();
    expect(component.toastMessage()).toContain(
      'Platform settings saved and broadcast',
    );
  });

  it('should open and close export modal and handle export executed', () => {
    expect(component.isExportModalOpen()).toBe(false);
    component.onExportConfig();
    expect(component.isExportModalOpen()).toBe(true);

    component.onExportExecuted({
      format: 'json',
      maskSecrets: true,
      includeAuditHash: true,
      prettyPrint: true,
    });
    expect(component.toastMessage()).toContain('JSON format');

    component.onCloseExportModal();
    expect(component.isExportModalOpen()).toBe(false);
  });

  it('should open and close restore defaults modal and handle confirmation', () => {
    expect(component.isRestoreModalOpen()).toBe(false);
    component.onRestoreDefaults();
    expect(component.isRestoreModalOpen()).toBe(true);

    component.onRestoreConfirmed();
    expect(component.toastMessage()).toContain(
      'restored to initial factory defaults',
    );

    component.onCloseRestoreModal();
    expect(component.isRestoreModalOpen()).toBe(false);
  });

  it('should open and close health details modal', () => {
    expect(component.isHealthModalOpen()).toBe(false);
    component.onViewHealthDetails();
    expect(component.isHealthModalOpen()).toBe(true);

    component.onCloseHealthModal();
    expect(component.isHealthModalOpen()).toBe(false);
  });

  it('should navigate to audit logs on audit history request', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onViewAuditHistory();
    expect(navigateSpy).toHaveBeenCalledWith(['/super-admin/audit-logs']);
  });

  it('should toggle maintenance mode and display toast', () => {
    expect(store.maintenanceModeEnabled()).toBe(false);
    component.onToggleMaintenance();
    expect(store.maintenanceModeEnabled()).toBe(true);
    expect(component.toastMessage()).toContain('enabled');

    component.onToggleMaintenance();
    expect(store.maintenanceModeEnabled()).toBe(false);
    expect(component.toastMessage()).toContain('disabled');
  });
});
