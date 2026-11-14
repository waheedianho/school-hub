import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CreateTicketFormData,
  TicketIssueType,
  TicketPriority,
} from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-create-ticket-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ticket-modal.html',
  styleUrl: './create-ticket-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTicketModalComponent {
  readonly closeModal = output<void>();
  readonly created = output<CreateTicketFormData>();

  readonly title = signal<string>('');
  readonly school = signal<string>('Sunrise International School');
  readonly issueType = signal<TicketIssueType>('Login Problem');
  readonly priority = signal<TicketPriority>('High');
  readonly description = signal<string>('');
  readonly affectedUsers = signal<string>('');
  readonly assignedAgent = signal<string>('Neha Verma');
  readonly raisedBy = signal<string>('School Admin');

  onSubmit(): void {
    if (!this.title() || !this.school() || !this.description()) {
      return;
    }

    this.created.emit({
      title: this.title(),
      school: this.school(),
      issueType: this.issueType(),
      priority: this.priority(),
      description: this.description(),
      affectedUsers: this.affectedUsers(),
      assignedAgent: this.assignedAgent(),
      raisedBy: this.raisedBy(),
    });
    this.closeModal.emit();
  }
}
