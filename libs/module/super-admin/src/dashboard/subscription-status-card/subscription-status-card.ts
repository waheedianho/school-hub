import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionStatusBreakdown } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-subscription-status-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-status-card.html',
  styleUrl: './subscription-status-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionStatusCardComponent {
  readonly data = input.required<SubscriptionStatusBreakdown>();
}
