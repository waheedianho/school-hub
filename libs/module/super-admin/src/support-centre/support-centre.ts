import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  CreateTicketFormData,
  SupportTab,
  TicketStatus,
} from '../data/super-admin-support.models';
import { SupportMetricsComponent } from './support-metrics/support-metrics';
import { SupportTableComponent } from './support-table/support-table';
import { SupportBottomMetricsComponent } from './support-bottom-metrics/support-bottom-metrics';
import { SupportSidebarComponent } from './support-sidebar/support-sidebar';
import { CreateTicketModalComponent } from './create-ticket-modal/create-ticket-modal';
import { AssignAgentModalComponent } from './assign-agent-modal/assign-agent-modal';

interface SupportTabItem {
  id: SupportTab;
  label: string;
  badge?: number;
  badgeClass?: string;
}

@Component({
  selector: 'school-hub-support-centre',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SupportMetricsComponent,
    SupportTableComponent,
    SupportBottomMetricsComponent,
    SupportSidebarComponent,
    CreateTicketModalComponent,
    AssignAgentModalComponent,
  ],
  templateUrl: './support-centre.html',
  styleUrl: './support-centre.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportCentreComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly tabs: SupportTabItem[] = [
    { id: 'All Tickets', label: 'All Tickets' },
    {
      id: 'Escalations',
      label: 'Escalations',
      badge: 8,
      badgeClass: 'badge-danger',
    },
    {
      id: 'Onboarding',
      label: 'Onboarding',
      badge: 15,
      badgeClass: 'badge-danger',
    },
    {
      id: 'Billing Issues',
      label: 'Billing Issues',
      badge: 12,
      badgeClass: 'badge-danger',
    },
    {
      id: 'Bugs & Technical',
      label: 'Bugs & Technical',
      badge: 18,
      badgeClass: 'badge-danger',
    },
    {
      id: 'Feature Requests',
      label: 'Feature Requests',
      badge: 6,
      badgeClass: 'badge-danger',
    },
    { id: 'Resolved', label: 'Resolved' },
  ];

  readonly activeModal = signal<'create' | 'assign' | null>(null);
  readonly selectedTicketIdForAssign = signal<string | null>(null);

  onTabChange(tab: SupportTab): void {
    this.store.setSupportTab(tab);
  }

  openCreateModal(): void {
    this.activeModal.set('create');
  }

  openAssignModal(ticketId?: string): void {
    this.selectedTicketIdForAssign.set(ticketId || null);
    this.activeModal.set('assign');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.selectedTicketIdForAssign.set(null);
  }

  onTicketCreated(formData: CreateTicketFormData): void {
    this.store.createSupportTicket(formData);
  }

  onAgentAssigned(data: {
    ticketId: string;
    agentName: string;
    agentRole: string;
    notes?: string;
  }): void {
    this.store.assignTicketAgent(data.ticketId, data.agentName, data.agentRole);
  }

  onStatusUpdate(data: { ticketId: string; newStatus: TicketStatus }): void {
    this.store.updateTicketStatus(data.ticketId, data.newStatus);
  }

  navigateToTicket(ticketId: string): void {
    this.router.navigate(['/super-admin/support-centre', ticketId]);
  }

  exportData(): void {
    const tickets = this.store.filteredSupportTickets();
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Ticket ID,School,Issue Type,Priority,Raised By,Assigned To,Status,Last Updated,SLA',
        ...tickets.map(
          (t) =>
            `"${t.id}","${t.school}","${t.issueType}","${t.priority}","${t.raisedBy.name}","${t.assignedTo.name}","${t.status}","${t.lastUpdated}","${t.slaStatus}"`,
        ),
      ].join('\n');

    if (typeof window !== 'undefined') {
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'support-tickets-export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
