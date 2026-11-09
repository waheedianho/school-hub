import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  DashboardCardComponent,
  PreferenceListComponent,
  PreferenceListItem,
} from '@school-hub/ui-elements';

@Component({
  selector: 'school-hub-settings-notifications-card',
  imports: [DashboardCardComponent, PreferenceListComponent],
  templateUrl: './notifications-card.html',
  styleUrl: './notifications-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class NotificationsCardComponent {
  readonly pushNotifications = input<boolean>(true);
  readonly emailNotifications = input<boolean>(true);
  readonly smsNotifications = input<boolean>(false);
  readonly liveClassReminders = input<boolean>(true);
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly settingToggled = output<{
    key:
      | 'pushNotifications'
      | 'emailNotifications'
      | 'smsNotifications'
      | 'liveClassReminders';
    value: boolean;
  }>();

  readonly items = computed<readonly PreferenceListItem[]>(() => [
    {
      id: 'pushNotifications',
      label: 'Push Notifications',
      icon: 'ri-notification-3-line',
      checked: this.pushNotifications(),
    },
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      icon: 'ri-mail-line',
      checked: this.emailNotifications(),
    },
    {
      id: 'smsNotifications',
      label: 'SMS Notifications',
      icon: 'ri-message-2-line',
      checked: this.smsNotifications(),
    },
    {
      id: 'liveClassReminders',
      label: 'Live Class Reminders',
      icon: 'ri-live-line',
      checked: this.liveClassReminders(),
    },
  ]);

  onToggle(event: { id: string; checked: boolean }): void {
    const validKeys = [
      'pushNotifications',
      'emailNotifications',
      'smsNotifications',
      'liveClassReminders',
    ] as const;
    const key = validKeys.find((k) => k === event.id);
    if (key) {
      this.settingToggled.emit({ key, value: event.checked });
    }
  }
}
