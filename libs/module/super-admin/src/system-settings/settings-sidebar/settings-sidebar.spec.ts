import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SettingsSidebarComponent } from './settings-sidebar';
import {
  RECENT_CONFIG_CHANGES,
  SYSTEM_HEALTH_ITEMS,
} from '../../data/super-admin-settings.data';

describe('SettingsSidebarComponent', () => {
  let component: SettingsSidebarComponent;
  let fixture: ComponentFixture<SettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('healthItems', SYSTEM_HEALTH_ITEMS);
    fixture.componentRef.setInput('recentChanges', RECENT_CONFIG_CHANGES);
    fixture.componentRef.setInput('isSaving', false);
    fixture.detectChanges();
  });

  it('should create and render health items, changes, and action buttons', () => {
    expect(component).toBeTruthy();
    const healthRows = fixture.nativeElement.querySelectorAll('.health-row');
    expect(healthRows.length).toBe(5);

    const changeItems = fixture.nativeElement.querySelectorAll('.change-item');
    expect(changeItems.length).toBe(5);

    const actionButtons = fixture.nativeElement.querySelectorAll('.action-btn');
    expect(actionButtons.length).toBe(4);
  });

  it('should emit saveSettings when clicking Save Settings', () => {
    let saved = false;
    component.saveSettings.subscribe(() => (saved = true));
    component.onSave();
    expect(saved).toBe(true);
  });

  it('should emit exportConfig when clicking Export Config', () => {
    let exported = false;
    component.exportConfig.subscribe(() => (exported = true));
    component.onExport();
    expect(exported).toBe(true);
  });

  it('should emit restoreDefaults when clicking Restore Defaults', () => {
    let restored = false;
    component.restoreDefaults.subscribe(() => (restored = true));
    component.onRestore();
    expect(restored).toBe(true);
  });

  it('should emit viewHealthDetails when clicking View Health Details', () => {
    let healthDetails = false;
    component.viewHealthDetails.subscribe(() => (healthDetails = true));
    component.onHealthDetails();
    expect(healthDetails).toBe(true);
  });

  it('should emit viewAuditHistory when clicking View Audit History', () => {
    let auditHistory = false;
    component.viewAuditHistory.subscribe(() => (auditHistory = true));
    component.onAuditHistory();
    expect(auditHistory).toBe(true);
  });
});
