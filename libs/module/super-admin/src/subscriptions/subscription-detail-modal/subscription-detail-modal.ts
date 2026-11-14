import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolSubscription } from '../../data/super-admin-subscriptions.models';

@Component({
  selector: 'school-hub-subscription-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-detail-modal.html',
  styleUrls: ['./subscription-detail-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionDetailModalComponent {
  readonly subscription = input.required<SchoolSubscription>();
  readonly closed = output<void>();

  onClose(): void {
    this.closed.emit();
  }
}
