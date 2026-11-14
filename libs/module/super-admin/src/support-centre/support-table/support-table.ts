import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  SupportTicket,
  TicketPriority,
  TicketStatus,
} from '../../data/super-admin-support.models';

@Component({
  selector: 'school-hub-support-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './support-table.html',
  styleUrl: './support-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportTableComponent {
  readonly tickets = input.required<SupportTicket[]>();
  readonly totalCount = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly pageSize = input<number>(10);

  readonly searchQuery = input<string>('');
  readonly selectedSchool = input<string>('All Schools');
  readonly selectedCategory = input<string>('All Categories');
  readonly selectedPriority = input<string>('All Priorities');
  readonly selectedStatus = input<string>('All Statuses');
  readonly dateRange = input<string>('May 1 – May 31, 2025');

  readonly searchChange = output<string>();
  readonly schoolChange = output<string>();
  readonly categoryChange = output<string>();
  readonly priorityChange = output<string>();
  readonly statusChange = output<string>();
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly createTicket = output<void>();
  readonly assignAgent = output<void>();
  readonly exportData = output<void>();
  readonly viewTicket = output<string>();
  readonly reassignTicket = output<string>();
  readonly updateStatus = output<{
    ticketId: string;
    newStatus: TicketStatus;
  }>();

  readonly openActionMenuId = signal<string | null>(null);
  readonly selectedTicketIds = signal<string[]>([]);

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.openActionMenuId.update((curr) => (curr === id ? null : id));
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTicketIds.set(this.tickets().map((t) => t.id));
    } else {
      this.selectedTicketIds.set([]);
    }
  }

  toggleTicketSelect(id: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedTicketIds.update((ids) =>
      isChecked ? [...ids, id] : ids.filter((item) => item !== id),
    );
  }

  isTicketSelected(id: string): boolean {
    return this.selectedTicketIds().includes(id);
  }

  isAllSelected(): boolean {
    const list = this.tickets();
    return list.length > 0 && this.selectedTicketIds().length === list.length;
  }

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }

  onSchoolSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.schoolChange.emit(val);
  }

  onCategorySelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(val);
  }

  onPrioritySelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.priorityChange.emit(val);
  }

  onStatusSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(val);
  }

  onPageSizeSelect(event: Event): void {
    const val = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(val);
  }

  getPriorityClass(priority: TicketPriority): string {
    switch (priority) {
      case 'Critical':
        return 'priority-critical';
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  }

  getStatusClass(status: TicketStatus): string {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'In Progress':
        return 'status-in-progress';
      case 'Awaiting School':
        return 'status-awaiting';
      case 'Escalated':
        return 'status-escalated';
      case 'Resolved':
        return 'status-resolved';
      default:
        return 'status-open';
    }
  }

  getSlaClass(level: string): string {
    switch (level) {
      case 'breached':
        return 'sla-breached';
      case 'urgent':
        return 'sla-urgent';
      case 'on-track':
        return 'sla-on-track';
      default:
        return 'sla-na';
    }
  }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, '...', total];
    }
    if (current >= total - 2) {
      return [1, '...', total - 2, total - 1, total];
    }
    return [1, '...', current, '...', total];
  }
}
