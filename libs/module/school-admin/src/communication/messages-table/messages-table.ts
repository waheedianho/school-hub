import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CommunicationMessage } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-communication-messages-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages-table.html',
  styleUrls: ['./messages-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationMessagesTableComponent {
  readonly store = inject(SchoolAdminStore);

  readonly messages = this.store.paginatedCommunicationMessages;
  readonly filteredTotal = this.store.filteredCommunicationMessages;
  readonly currentPage = this.store.communicationPage;
  readonly totalPages = this.store.communicationTotalPages;
  readonly pageSize = this.store.communicationPageSize;
  readonly activeTab = this.store.activeCommunicationTab;

  readonly searchQuery = this.store.communicationSearchQuery;
  readonly selectedAudience = this.store.communicationAudienceFilter;
  readonly selectedCategory = this.store.communicationCategoryFilter;
  readonly selectedStatus = this.store.communicationStatusFilter;
  readonly selectedDate = this.store.communicationDateFilter;

  readonly activeActionMenuId = signal<string | null>(null);

  readonly audienceOptions: string[] = [
    'All Audiences',
    'All Students & Parents',
    'All Parents',
    'All Teachers & Staff',
    'Selected Parents',
  ];

  readonly categoryOptions: string[] = [
    'All Categories',
    'General',
    'Academics',
    'Events',
    'Internal',
    'Attendance',
  ];

  readonly statusOptions: string[] = [
    'All Statuses',
    'Delivered',
    'Sent',
    'Scheduled',
    'Draft',
    'Failed',
  ];

  readonly dateOptions: string[] = [
    'All Dates',
    'May 20, 2025',
    'May 19, 2025',
    'May 18, 2025',
    'May 17, 2025',
    'May 16, 2025',
    'May 15, 2025',
    'May 14, 2025',
  ];

  onSearch(query: string): void {
    this.store.setCommunicationSearchQuery(query);
  }

  onAudienceChange(aud: string): void {
    this.store.setCommunicationAudienceFilter(aud);
  }

  onCategoryChange(cat: string): void {
    this.store.setCommunicationCategoryFilter(cat);
  }

  onStatusChange(status: string): void {
    this.store.setCommunicationStatusFilter(status);
  }

  onDateChange(date: string): void {
    this.store.setCommunicationDateFilter(date);
  }

  onPageChange(page: number): void {
    this.store.setCommunicationPage(page);
  }

  onPageSizeChange(size: number): void {
    this.store.setCommunicationPageSize(size);
  }

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.activeActionMenuId.update((current) => (current === id ? null : id));
  }

  closeActionMenu(): void {
    this.activeActionMenuId.set(null);
  }

  onRowClick(item: CommunicationMessage): void {
    this.closeActionMenu();
    this.store.openMessageDetails(item);
  }

  onResendMessage(id: string, event: Event): void {
    event.stopPropagation();
    this.closeActionMenu();
    this.store.resendFailedMessage(id);
  }

  getSearchPlaceholder(): string {
    const tab = this.activeTab();
    switch (tab) {
      case 'teacher-messages':
        return 'Search teacher messages...';
      case 'parent-messages':
        return 'Search parent communications...';
      case 'logs':
        return 'Search communication logs...';
      default:
        return 'Search announcements...';
    }
  }

  getStartIndex(): number {
    if (this.filteredTotal().length === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  getEndIndex(): number {
    return Math.min(
      this.currentPage() * this.pageSize(),
      this.filteredTotal().length,
    );
  }
}
