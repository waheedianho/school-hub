import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationPreferences } from '../../data/teacher-settings.data';

export interface NotificationItemConfig {
  key: keyof NotificationPreferences;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'school-hub-notifications-settings-card',
  imports: [FormsModule],
  templateUrl: './notifications-settings-card.html',
  styleUrl: './notifications-settings-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsSettingsCardComponent {
  readonly preferences = input.required<NotificationPreferences>();
  readonly preferencesUpdated = output<NotificationPreferences>();

  readonly notificationItems: NotificationItemConfig[] = [
    {
      key: 'assignmentAlerts',
      title: 'Assignment Alerts',
      description: 'Receive alerts for new learner assignment submissions',
      icon: 'assignment',
    },
    {
      key: 'submissionReviews',
      title: 'Submission Reviews',
      description: 'Get reminded when pending reviews require your attention',
      icon: 'rate_review',
    },
    {
      key: 'liveClassReminders',
      title: 'Live Class Reminders',
      description:
        'Receive notifications 15 minutes prior to scheduled classes',
      icon: 'videocam',
    },
    {
      key: 'messageNotifications',
      title: 'Message Notifications',
      description: 'Get notified for direct chats and announcement comments',
      icon: 'chat',
    },
    {
      key: 'reportGenerationAlerts',
      title: 'Report Generation Alerts',
      description: 'Alerts when learner performance term reports are ready',
      icon: 'assessment',
    },
    {
      key: 'parentCommunication',
      title: 'Parent Communication',
      description: 'Notifications for inquiries and messages from parents',
      icon: 'family_restroom',
    },
  ];

  onToggle(key: keyof NotificationPreferences, checked: boolean): void {
    const updated: NotificationPreferences = {
      ...this.preferences(),
      [key]: checked,
    };
    this.preferencesUpdated.emit(updated);
  }
}
