import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityCardComponent } from './security-card';

describe('SecurityCardComponent', () => {
  let fixture: ComponentFixture<SecurityCardComponent>;
  let component: SecurityCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders security items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Profile Visibility');
    expect(text).toContain('Data Usage');
    expect(text).toContain('Active Sessions');
    expect(text).toContain('Two-Factor Authentication');
  });

  it('emits modalRequested when session button is clicked', () => {
    let requested: string | undefined;
    component.modalRequested.subscribe((m) => (requested = m));

    const buttons = fixture.nativeElement.querySelectorAll(
      '.setting-row-action',
    );
    buttons[1].click(); // active sessions
    expect(requested).toBe('sessions');
  });

  it('emits wifiToggled when wifi switch is toggled', () => {
    let result: boolean | undefined;
    component.wifiToggled.subscribe((v) => (result = v));

    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    input.dispatchEvent(new Event('change'));
    expect(result).toBe(false);
  });
});
