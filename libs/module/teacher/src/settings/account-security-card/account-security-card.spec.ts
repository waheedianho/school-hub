import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AccountSecurityCardComponent } from './account-security-card';
import {
  INITIAL_ACCOUNT_SECURITY,
  AccountSecurityInfo,
} from '../../data/teacher-settings.data';

describe('AccountSecurityCardComponent', () => {
  let component: AccountSecurityCardComponent;
  let fixture: ComponentFixture<AccountSecurityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSecurityCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSecurityCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('securityInfo', INITIAL_ACCOUNT_SECURITY);
    fixture.detectChanges();
  });

  it('should render security information correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Account Security',
    );
    expect(compiled.textContent).toContain('Password');
    expect(compiled.textContent).toContain('Two-Factor Authentication');
    expect(compiled.textContent).toContain(INITIAL_ACCOUNT_SECURITY.lastLogin);
    expect(compiled.textContent).toContain(
      INITIAL_ACCOUNT_SECURITY.activeSession,
    );
  });

  it('should emit updated security when 2FA is toggled', () => {
    let emitted: AccountSecurityInfo | undefined;
    component.securityUpdated.subscribe((s) => (emitted = s));

    component.onToggleTwoFactor(false);
    fixture.detectChanges();

    expect(emitted).toBeDefined();
    expect(emitted?.twoFactorEnabled).toBe(false);
  });

  it('should open and close password modal', () => {
    component.openPasswordModal();
    fixture.detectChanges();

    expect(component.showPasswordModal()).toBe(true);

    component.closePasswordModal();
    fixture.detectChanges();

    expect(component.showPasswordModal()).toBe(false);
  });

  it('should handle password validation and submission safely', () => {
    component.openPasswordModal();

    // Empty fields check
    component.submitPasswordChange();
    expect(component.passwordMessage()).toContain(
      'Please fill in all password fields.',
    );

    // Mismatched passwords
    component.currentPassword.set('old-pass');
    component.newPassword.set('new-pass-123');
    component.confirmPassword.set('different-pass');
    component.submitPasswordChange();
    expect(component.passwordMessage()).toContain(
      'New passwords do not match.',
    );

    // Matching passwords
    component.confirmPassword.set('new-pass-123');
    component.submitPasswordChange();
    expect(component.passwordMessage()).toContain(
      'Password update simulated locally',
    );
  });

  it('should open and close sessions modal', () => {
    component.openSessionsModal();
    fixture.detectChanges();

    expect(component.showSessionsModal()).toBe(true);

    component.closeSessionsModal();
    fixture.detectChanges();

    expect(component.showSessionsModal()).toBe(false);
  });
});
