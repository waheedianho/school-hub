import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LIVE_CLASS_SESSION_DETAILS,
  LiveClassSessionDetails,
} from '../../data/teacher-live-classes.data';
import { SessionChatComponent } from './session-chat/session-chat';
import { SessionControlsBarComponent } from './session-controls-bar/session-controls-bar';
import { SessionParticipantsComponent } from './session-participants/session-participants';
import { SessionQuickActionsComponent } from './session-quick-actions/session-quick-actions';
import { SessionTabsComponent } from './session-tabs/session-tabs';
import { SessionWhiteboardComponent } from './session-whiteboard/session-whiteboard';

@Component({
  selector: 'school-hub-live-class-session',
  imports: [
    SessionWhiteboardComponent,
    SessionControlsBarComponent,
    SessionTabsComponent,
    SessionChatComponent,
    SessionParticipantsComponent,
    SessionQuickActionsComponent,
  ],
  templateUrl: './live-class-session.html',
  styleUrl: './live-class-session.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveClassSessionComponent {
  private readonly router = inject(Router);

  readonly sessionDetails = signal<LiveClassSessionDetails>(
    LIVE_CLASS_SESSION_DETAILS,
  );

  onBack(): void {
    void this.router.navigate(['/teacher/live-classes']);
  }

  onEndClass(): void {
    void this.router.navigate(['/teacher/live-classes']);
  }
}
