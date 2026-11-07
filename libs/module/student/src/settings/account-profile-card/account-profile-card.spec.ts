import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccountProfileCardComponent } from './account-profile-card';

describe('AccountProfileCardComponent', () => {
  let fixture: ComponentFixture<AccountProfileCardComponent>;
  let component: AccountProfileCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountProfileCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('fullName', 'Adeola Johnson');
    fixture.componentRef.setInput('email', 'adeola@test.com');
    fixture.detectChanges();
  });

  it('renders student details correctly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Adeola Johnson');
    expect(text).toContain('adeola@test.com');
    expect(text).toContain('Active Student');
  });

  it('emits interacted on pointerdown and focusin', () => {
    let fired = false;
    component.interacted.subscribe(() => (fired = true));

    fixture.nativeElement.dispatchEvent(new Event('pointerdown'));
    expect(fired).toBe(true);

    fired = false;
    fixture.nativeElement.dispatchEvent(new Event('focusin'));
    expect(fired).toBe(true);
  });
});
