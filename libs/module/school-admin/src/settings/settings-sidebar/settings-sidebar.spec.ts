import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsSidebarComponent } from './settings-sidebar';
import {
  GENERAL_SETTINGS_ATTENTION_ITEMS,
  GENERAL_SETTINGS_SUMMARY_DATA,
  PERMISSION_ATTENTION_ITEMS,
  PERMISSION_SIDEBAR_SUMMARY_DATA,
} from '../../data/school-admin-settings.data';

describe('SettingsSidebarComponent', () => {
  let component: SettingsSidebarComponent;
  let fixture: ComponentFixture<SettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeTab', 'general');
    fixture.componentRef.setInput(
      'generalSummary',
      GENERAL_SETTINGS_SUMMARY_DATA,
    );
    fixture.componentRef.setInput(
      'generalAttentionItems',
      GENERAL_SETTINGS_ATTENTION_ITEMS,
    );
    fixture.componentRef.setInput(
      'permissionSummary',
      PERMISSION_SIDEBAR_SUMMARY_DATA,
    );
    fixture.componentRef.setInput(
      'permissionAttentionItems',
      PERMISSION_ATTENTION_ITEMS,
    );
    fixture.componentRef.setInput('selectedAttentionItem', null);
    fixture.detectChanges();
  });

  it('should render General Settings Sidebar when activeTab is general', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('General Settings Summary');
    expect(compiled.textContent).toContain('School Profile');
    expect(compiled.textContent).toContain('Academic Defaults');
    expect(compiled.textContent).toContain('Attention Needed');
    expect(compiled.textContent).toContain('Upload school logo');
    expect(compiled.textContent).toContain('Manage Roles');
  });

  it('should emit switchTab when Manage Roles is clicked in general view', () => {
    const switchSpy = vi.fn();
    component.switchTab.subscribe(switchSpy);

    const manageRolesBtn = fixture.nativeElement.querySelector(
      '[data-testid="qa-manage-roles"]',
    ) as HTMLButtonElement;
    manageRolesBtn.click();

    expect(switchSpy).toHaveBeenCalledWith('roles-permissions');
  });

  it('should render Permission Summary when activeTab is roles-permissions', () => {
    fixture.componentRef.setInput('activeTab', 'roles-permissions');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Permission Summary');
    expect(compiled.textContent).toContain('Active Roles');
    expect(compiled.textContent).toContain('9');
    expect(compiled.textContent).toContain('Custom Roles');
    expect(compiled.textContent).toContain('5');
    expect(compiled.textContent).toContain('Pending permission approvals');

    const createRoleBtn = compiled.querySelector(
      '[data-testid="qa-create-role-btn"]',
    ) as HTMLButtonElement;
    expect(createRoleBtn).toBeTruthy();
  });

  it('should emit createRole and exportReport in roles-permissions view', () => {
    fixture.componentRef.setInput('activeTab', 'roles-permissions');
    fixture.detectChanges();

    const createSpy = vi.fn();
    const exportSpy = vi.fn();
    component.createRole.subscribe(createSpy);
    component.exportReport.subscribe(exportSpy);

    const createBtn = fixture.nativeElement.querySelector(
      '[data-testid="qa-create-role-btn"]',
    ) as HTMLButtonElement;
    createBtn.click();
    expect(createSpy).toHaveBeenCalledTimes(1);

    const exportBtn = fixture.nativeElement.querySelector(
      '[data-testid="qa-export-report-btn"]',
    ) as HTMLButtonElement;
    exportBtn.click();
    expect(exportSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit attentionItemSelect when clicking a permission attention item', () => {
    fixture.componentRef.setInput('activeTab', 'roles-permissions');
    fixture.detectChanges();

    const selectSpy = vi.fn();
    component.attentionItemSelect.subscribe(selectSpy);

    const attentionItem = fixture.nativeElement.querySelector(
      '[data-testid="attention-att-perm-1"]',
    ) as HTMLElement;
    attentionItem.click();

    expect(selectSpy).toHaveBeenCalledWith(PERMISSION_ATTENTION_ITEMS[0]);
  });
});
