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
  selector: 'school-hub-settings-learning-card',
  imports: [DashboardCardComponent, PreferenceListComponent],
  templateUrl: './learning-card.html',
  styleUrl: './learning-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'settings-card-item',
    '[class.active-card]': 'active()',
    '(pointerdown)': 'interacted.emit()',
    '(focusin)': 'interacted.emit()',
    tabindex: '-1',
  },
})
export class LearningCardComponent {
  readonly dailyStudyReminder = input<boolean>(true);
  readonly dailyStudyReminderTime = input<string>('7:00 PM every day');
  readonly weeklyProgressSummary = input<boolean>(true);
  readonly active = input<boolean>(false);

  readonly interacted = output<void>();
  readonly settingToggled = output<{
    key: 'dailyStudyReminder' | 'weeklyProgressSummary';
    value: boolean;
  }>();

  readonly items = computed<readonly PreferenceListItem[]>(() => [
    {
      id: 'subjects',
      label: 'Preferred Subjects',
      icon: 'ri-book-open-line',
      value: 'English, Mathematics, Science',
      route: '/student/subjects',
    },
    {
      id: 'goals',
      label: 'Learning Goals',
      icon: 'ri-focus-3-line',
      value: 'Improve score to 90%',
      route: '/student/profile',
      queryParams: { view: 'goals' },
    },
    {
      id: 'dailyStudyReminder',
      label: 'Daily Study Reminder',
      icon: 'ri-time-line',
      checked: this.dailyStudyReminder(),
    },
    {
      id: 'weeklyProgressSummary',
      label: 'Weekly Progress Summary',
      icon: 'ri-calendar-check-line',
      checked: this.weeklyProgressSummary(),
    },
  ]);

  onToggle(event: { id: string; checked: boolean }): void {
    if (
      event.id === 'dailyStudyReminder' ||
      event.id === 'weeklyProgressSummary'
    ) {
      this.settingToggled.emit({ key: event.id, value: event.checked });
    }
  }
}
