import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SettingsSidebarWidgetsComponent } from './settings-sidebar-widgets';
import {
  SETTINGS_TIPS,
  RECENT_SETTINGS_CHANGES,
} from '../../data/teacher-settings.data';

describe('SettingsSidebarWidgetsComponent', () => {
  let component: SettingsSidebarWidgetsComponent;
  let fixture: ComponentFixture<SettingsSidebarWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidebarWidgetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsSidebarWidgetsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tips', SETTINGS_TIPS);
    fixture.componentRef.setInput('recentChanges', RECENT_SETTINGS_CHANGES);
    fixture.detectChanges();
  });

  it('should render tips, recent changes, and quick actions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Settings Tips');
    expect(compiled.textContent).toContain('Recent Changes');
    expect(compiled.textContent).toContain('Quick Actions');

    const tipItems = compiled.querySelectorAll('.tip-item');
    expect(tipItems.length).toBe(SETTINGS_TIPS.length);

    const changeItems = compiled.querySelectorAll('.change-item');
    expect(changeItems.length).toBe(RECENT_SETTINGS_CHANGES.length);
  });

  it('should emit saveRequested when Save Changes button is clicked', () => {
    let saved = false;
    component.saveRequested.subscribe(() => (saved = true));

    component.onSave();
    expect(saved).toBe(true);
  });

  it('should emit resetRequested when Reset Defaults button is clicked', () => {
    let reset = false;
    component.resetRequested.subscribe(() => (reset = true));

    component.onReset();
    expect(reset).toBe(true);
  });

  it('should open and close audit logs modal and emit auditLogsRequested', () => {
    let requested = false;
    component.auditLogsRequested.subscribe(() => (requested = true));

    component.onOpenAuditLogs();
    fixture.detectChanges();

    expect(requested).toBe(true);
    expect(component.showAuditModal()).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-dialog')).toBeTruthy();

    component.onCloseAuditLogs();
    fixture.detectChanges();
    expect(component.showAuditModal()).toBe(false);
  });
});
