import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountPasswordCardComponent } from './account-password-card';

describe('AccountPasswordCardComponent', () => {
  let fixture: ComponentFixture<AccountPasswordCardComponent>;
  let component: AccountPasswordCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPasswordCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPasswordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('validates password requirements before submitting', () => {
    let submitted = false;
    component.passwordSubmitted.subscribe(() => (submitted = true));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(submitted).toBe(false);
    expect(component.errors().current).toBe('Enter your current password.');
  });

  it('emits passwordSubmitted with valid inputs', () => {
    let payload:
      | { current: string; newPass: string; confirm: string }
      | undefined;
    component.passwordSubmitted.subscribe((p) => (payload = p));

    component.currentPassword.set('oldpass123');
    component.newPassword.set('newSecretPass99');
    component.confirmPassword.set('newSecretPass99');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(payload).toEqual({
      current: 'oldpass123',
      newPass: 'newSecretPass99',
      confirm: 'newSecretPass99',
    });
  });

  it('emits interacted on pointerdown', () => {
    let fired = false;
    component.interacted.subscribe(() => (fired = true));

    fixture.nativeElement.dispatchEvent(new Event('pointerdown'));
    expect(fired).toBe(true);
  });
});
