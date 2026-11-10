import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { InterventionCase } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-interventions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interventions-table.html',
  styleUrls: ['./interventions-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterventionsTableComponent {
  readonly store = inject(SchoolAdminStore);
  readonly interventions = this.store.paginatedInterventions;
  readonly allFiltered = this.store.filteredInterventions;
  readonly page = this.store.interventionPage;
  readonly totalPages = this.store.interventionTotalPages;
  readonly pageSize = this.store.interventionPageSize;

  readonly searchQuery = this.store.interventionSearchQuery;
  readonly classFilter = this.store.interventionClassFilter;
  readonly priorityFilter = this.store.interventionPriorityFilter;
  readonly statusFilter = this.store.interventionStatusFilter;

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.store.setInterventionSearchQuery(target.value);
  }

  onClassFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.setInterventionClassFilter(target.value);
  }

  onPriorityFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.setInterventionPriorityFilter(target.value);
  }

  onStatusFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.setInterventionStatusFilter(target.value);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.store.setInterventionPage(newPage);
    }
  }

  onSelectCase(item: InterventionCase): void {
    this.store.openInterventionDetails(item);
  }

  onAssignFollowUp(item: InterventionCase, event: Event): void {
    event.stopPropagation();
    this.store.openAssignFollowUpModal(item);
  }

  getAvatarColor(initials?: string): string {
    const colors = [
      'avatar-purple',
      'avatar-blue',
      'avatar-teal',
      'avatar-orange',
      'avatar-indigo',
      'avatar-green',
    ];
    if (!initials) return colors[0];
    const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return colors[charCode % colors.length];
  }

  getStatusClass(status: InterventionCase['status']): string {
    switch (status) {
      case 'In Progress':
        return 'status-progress';
      case 'Monitoring':
        return 'status-monitoring';
      case 'Under Review':
        return 'status-review';
      case 'Resolved':
        return 'status-resolved';
      default:
        return 'status-default';
    }
  }

  getPriorityClass(priority: InterventionCase['priority']): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }
}
