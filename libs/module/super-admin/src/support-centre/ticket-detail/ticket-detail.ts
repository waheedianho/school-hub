import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminStore } from '../../data/super-admin.store';
import {
  SupportTicket,
  TicketStatus,
} from '../../data/super-admin-support.models';
import { AssignAgentModalComponent } from '../assign-agent-modal/assign-agent-modal';
import { InternalNoteModalComponent } from '../internal-note-modal/internal-note-modal';

@Component({
  selector: 'school-hub-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AssignAgentModalComponent,
    InternalNoteModalComponent,
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(SuperAdminStore);

  readonly ticketId = signal<string>('TKT-2025-5128');
  readonly newReplyText = signal<string>('');
  readonly activeModal = signal<'assign' | 'note' | null>(null);

  readonly ticket = computed<SupportTicket | undefined>(() => {
    const id = this.ticketId();
    return (
      this.store.allSupportTickets().find((t) => t.id === id) ||
      this.store.allSupportTickets()[0]
    );
  });

  readonly completedChecklistCount = computed<number>(() => {
    const list = this.ticket()?.resolutionChecklist;
    if (!list) return 0;
    return list.filter((item) => item.completed).length;
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.ticketId.set(id);
      }
    });
  }

  sendReply(): void {
    const text = this.newReplyText().trim();
    const currentTicket = this.ticket();
    if (!text || !currentTicket) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    this.store.addTicketTimelineEntry(currentTicket.id, {
      type: 'message',
      authorName: 'Neha Verma',
      authorRole: 'Support Agent',
      authorAvatar: 'NV',
      content: text,
      timestamp: `${dateStr} ${timeStr}`,
    });

    this.newReplyText.set('');
  }

  updateStatus(status: TicketStatus): void {
    const currentTicket = this.ticket();
    if (currentTicket) {
      this.store.updateTicketStatus(currentTicket.id, status);
    }
  }

  escalateTicket(): void {
    const currentTicket = this.ticket();
    if (currentTicket) {
      this.store.updateTicketStatus(currentTicket.id, 'Escalated');
    }
  }

  resolveTicket(): void {
    const currentTicket = this.ticket();
    if (currentTicket) {
      this.store.updateTicketStatus(currentTicket.id, 'Resolved');
    }
  }

  toggleChecklist(index: number): void {
    const currentTicket = this.ticket();
    if (currentTicket) {
      this.store.toggleResolutionChecklistItem(currentTicket.id, index);
    }
  }

  openAssignModal(): void {
    this.activeModal.set('assign');
  }

  openNoteModal(): void {
    this.activeModal.set('note');
  }

  closeModal(): void {
    this.activeModal.set(null);
  }

  onAgentAssigned(data: {
    ticketId: string;
    agentName: string;
    agentRole: string;
    notes?: string;
  }): void {
    this.store.assignTicketAgent(data.ticketId, data.agentName, data.agentRole);
  }

  onNoteAdded(data: { ticketId: string; note: string }): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateStr = now.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    this.store.addTicketTimelineEntry(data.ticketId, {
      type: 'internal_note',
      authorName: 'Super Admin',
      authorRole: 'Super Admin',
      authorAvatar: 'SA',
      content: data.note,
      timestamp: `${dateStr} ${timeStr}`,
      isInternal: true,
    });
  }

  copyTicketId(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.ticketId());
    }
  }
}
