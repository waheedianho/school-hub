import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportTicket } from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-assign-agent-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-agent-modal.html',
  styleUrl: './assign-agent-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignAgentModalComponent implements OnInit {
  readonly tickets = input.required<SupportTicket[]>();
  readonly preselectedTicketId = input<string | null>(null);

  readonly closeModal = output<void>();
  readonly assigned = output<{
    ticketId: string;
    agentName: string;
    agentRole: string;
    notes?: string;
  }>();

  readonly selectedTicketId = signal<string>('');
  readonly selectedAgent = signal<string>('Neha Verma');
  readonly selectedRole = signal<string>('Support Agent');
  readonly assignmentNotes = signal<string>('');

  ngOnInit(): void {
    const preId = this.preselectedTicketId();
    if (preId) {
      this.selectedTicketId.set(preId);
    } else if (this.tickets().length > 0) {
      this.selectedTicketId.set(this.tickets()[0].id);
    }
  }

  onAgentChange(event: Event): void {
    const name = (event.target as HTMLSelectElement).value;
    this.selectedAgent.set(name);
    if (name === 'Neha Verma') {
      this.selectedRole.set('Support Agent');
    } else if (name === 'Rohit Singh') {
      this.selectedRole.set('Support Specialist');
    } else if (name === 'Ankit Patel') {
      this.selectedRole.set('Billing / Tech Lead');
    } else {
      this.selectedRole.set('Support Lead');
    }
  }

  onSubmit(): void {
    if (!this.selectedTicketId() || !this.selectedAgent()) return;

    this.assigned.emit({
      ticketId: this.selectedTicketId(),
      agentName: this.selectedAgent(),
      agentRole: this.selectedRole(),
      notes: this.assignmentNotes(),
    });
    this.closeModal.emit();
  }
}
