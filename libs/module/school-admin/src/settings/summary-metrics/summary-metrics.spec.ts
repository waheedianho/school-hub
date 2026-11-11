import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsSummaryMetricsComponent } from './summary-metrics';
import { SETTINGS_SUMMARY_METRICS } from '../../data/school-admin-settings.data';

describe('SettingsSummaryMetricsComponent', () => {
  let component: SettingsSummaryMetricsComponent;
  let fixture: ComponentFixture<SettingsSummaryMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSummaryMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsSummaryMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', SETTINGS_SUMMARY_METRICS);
    fixture.detectChanges();
  });

  it('should create and render all 5 metric cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;

    const totalRolesCard = compiled.querySelector(
      '[data-testid="metric-total-roles"]',
    );
    expect(totalRolesCard?.textContent).toContain('12');
    expect(totalRolesCard?.textContent).toContain('Total Roles');
    expect(totalRolesCard?.textContent).toContain('+20% vs last term');

    const activePermissionsCard = compiled.querySelector(
      '[data-testid="metric-active-permissions"]',
    );
    expect(activePermissionsCard?.textContent).toContain('24');
    expect(activePermissionsCard?.textContent).toContain(
      'Active Permission Sets',
    );

    const pendingApprovalsCard = compiled.querySelector(
      '[data-testid="metric-pending-approvals"]',
    );
    expect(pendingApprovalsCard?.textContent).toContain('8');
    expect(pendingApprovalsCard?.textContent).toContain(
      'Pending Approval Changes',
    );

    const twoFactorCard = compiled.querySelector(
      '[data-testid="metric-two-factor"]',
    );
    expect(twoFactorCard?.textContent).toContain('87%');
    expect(twoFactorCard?.textContent).toContain('Two-Factor Enabled');

    const auditAlertsCard = compiled.querySelector(
      '[data-testid="metric-audit-alerts"]',
    );
    expect(auditAlertsCard?.textContent).toContain('3');
    expect(auditAlertsCard?.textContent).toContain('Audit Alerts');
  });
});
