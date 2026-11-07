import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  LIVE_CLASS_SESSION_DETAILS,
  LiveClassSessionDetails,
} from '../../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-session-tabs',
  templateUrl: './session-tabs.html',
  styleUrl: './session-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionTabsComponent {
  readonly sessionDetails = input<LiveClassSessionDetails>(
    LIVE_CLASS_SESSION_DETAILS,
  );
  readonly activeTab = signal<string>('Class Info');

  readonly tabs = [
    'Class Info',
    'Lesson Plan',
    'Materials',
    'Activities',
    'Polls',
    'Notes',
    'Recordings',
  ];

  selectTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
