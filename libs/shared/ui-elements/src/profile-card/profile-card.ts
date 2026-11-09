import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge';
export interface ProfileCardData {
  name: string;
  avatar: string;
  badge: string;
  contacts: readonly { icon: string; text: string }[];
  memberSince: string;
  accountType: string;
  status: string;
}
@Component({
  selector: 'school-hub-profile-card',
  imports: [StatusBadgeComponent],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly profile = input.required<ProfileCardData>();
  readonly disabled = input(false);
  readonly edited = output<void>();
}
