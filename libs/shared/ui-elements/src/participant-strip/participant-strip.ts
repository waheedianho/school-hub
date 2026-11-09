import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LocalVideoComponent } from '../local-video/local-video';
import { UiTone, UI_TONES } from '../models/ui-tone.model';
export interface ParticipantTile {
  id: string;
  name: string;
  initials: string;
  tone: UiTone;
  self?: boolean;
}
@Component({
  selector: 'school-hub-participant-strip',
  imports: [LocalVideoComponent],
  templateUrl: './participant-strip.html',
  styleUrl: './participant-strip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantStripComponent {
  readonly people = input.required<readonly ParticipantTile[]>();
  readonly stream = input<MediaStream | null>(null);
  readonly micOn = input(false);
  readonly handRaised = input(false);
  readonly viewAll = output<void>();
  protected readonly colors = UI_TONES;
}
