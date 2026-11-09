import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { UiTone } from '../models/ui-tone.model';
import { IconBadgeComponent } from '../icon-badge/icon-badge';
import { StatusBadgeComponent } from '../status-badge/status-badge';

export interface SessionCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  host: string;
  icon: string;
  tone: UiTone;
  availability: string;
  action: string;
}
@Component({
  selector: 'school-hub-session-card',
  imports: [IconBadgeComponent, StatusBadgeComponent],
  templateUrl: './session-card.html',
  styleUrl: './session-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionCardComponent {
  readonly session = input.required<SessionCardData>();
  readonly disabled = input(false);
  readonly selected = output<string>();
  readonly more = output<string>();
}
