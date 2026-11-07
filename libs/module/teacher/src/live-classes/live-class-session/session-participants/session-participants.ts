import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  SESSION_PARTICIPANTS,
  SessionParticipant,
} from '../../../data/teacher-live-classes.data';

@Component({
  selector: 'school-hub-session-participants',
  templateUrl: './session-participants.html',
  styleUrl: './session-participants.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionParticipantsComponent {
  readonly participants = input<SessionParticipant[]>(SESSION_PARTICIPANTS);
  readonly totalParticipantsCount = input<number>(25);
}
