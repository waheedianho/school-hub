import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotificationsCardComponent } from './notifications-card';

describe('NotificationsCardComponent', () => {
  let fixture: ComponentFixture<NotificationsCardComponent>;
  let component: NotificationsCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders preference list with notification items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Push Notifications');
    expect(text).toContain('Email Notifications');
    expect(text).toContain('SMS Notifications');
    expect(text).toContain('Live Class Reminders');
  });

  it('emits settingToggled when a notification switch changes', () => {
    let result: { key: string; value: boolean } | undefined;
    component.settingToggled.subscribe((r) => (result = r));

    component.onToggle({ id: 'pushNotifications', checked: false });
    expect(result).toEqual({ key: 'pushNotifications', value: false });
  });

  it('emits interacted on focusin and pointerdown', () => {
    let fired = false;
    component.interacted.subscribe(() => (fired = true));

    fixture.nativeElement.dispatchEvent(new Event('pointerdown'));
    expect(fired).toBe(true);

    fired = false;
    fixture.nativeElement.dispatchEvent(new Event('focusin'));
    expect(fired).toBe(true);
  });
});
