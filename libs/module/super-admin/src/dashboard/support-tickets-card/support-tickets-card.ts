import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupportTicketSummary } from '../../data/super-admin.models';

@Component({
  selector: 'school-hub-support-tickets-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './support-tickets-card.html',
  styleUrl: './support-tickets-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportTicketsCardComponent {
  readonly tickets = input.required<SupportTicketSummary[]>();
  readonly resolve = output<string>();

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'badge-open';
      case 'In Progress':
        return 'badge-progress';
      case 'Resolved':
        return 'badge-resolved';
      default:
        return 'badge-neutral';
    }
  }

  onResolve(id: string, event: Event): void {
    event.stopPropagation();
    this.resolve.emit(id);
  }
}
