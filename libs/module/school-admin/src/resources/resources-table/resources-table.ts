import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { ResourceItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-resources-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resources-table.html',
  styleUrls: ['./resources-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesTableComponent {
  readonly store = inject(SchoolAdminStore);

  readonly resources = this.store.paginatedResources;
  readonly filteredTotal = this.store.filteredResources;
  readonly currentPage = this.store.resourcePage;
  readonly totalPages = this.store.resourceTotalPages;
  readonly pageSize = this.store.resourcePageSize;
  readonly metrics = this.store.resourcesSummaryMetrics;

  readonly searchQuery = this.store.resourceSearchQuery;
  readonly selectedClass = this.store.resourceClassFilter;
  readonly selectedSubject = this.store.resourceSubjectFilter;
  readonly selectedType = this.store.resourceTypeFilter;
  readonly selectedStatus = this.store.resourceStatusFilter;

  readonly activeActionMenuId = signal<string | null>(null);

  readonly classOptions: string[] = [
    'All Classes',
    'JSS 1A',
    'JSS 1B',
    'JSS 1C',
    'JSS 2A',
    'JSS 2B',
    'JSS 2C',
    'JSS 3A',
    'JSS 3B',
    'JSS 3C',
    'SSS 1A',
    'SSS 2B',
  ];

  readonly subjectOptions: string[] = [
    'All Subjects',
    'Mathematics',
    'English Language',
    'Basic Science',
    'Civic Education',
    'Business Studies',
    'Physics',
    'Chemistry',
    'Basic Technology',
    'General',
  ];

  readonly typeOptions: string[] = [
    'All Types',
    'Lesson Note',
    'Video',
    'Worksheet',
    'Marking Guide',
    'Presentation',
    'Infographic',
    'Revision Sheet',
    'Template',
    'Reference Guide',
  ];

  readonly statusOptions: string[] = [
    'All Statuses',
    'Approved',
    'Pending Review',
    'Draft',
    'Missing Link',
  ];

  onSearch(query: string): void {
    this.store.setResourceSearchQuery(query);
  }

  onClassChange(cls: string): void {
    this.store.setResourceClassFilter(cls);
  }

  onSubjectChange(subj: string): void {
    this.store.setResourceSubjectFilter(subj);
  }

  onTypeChange(type: string): void {
    this.store.setResourceTypeFilter(type);
  }

  onStatusChange(status: string): void {
    this.store.setResourceStatusFilter(status);
  }

  onPageChange(page: number): void {
    this.store.setResourcePage(page);
  }

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.activeActionMenuId.update((current) => (current === id ? null : id));
  }

  closeActionMenu(): void {
    this.activeActionMenuId.set(null);
  }

  onRowClick(item: ResourceItem): void {
    this.closeActionMenu();
    this.store.openResourceDetails(item);
  }

  onLinkDeliveryPack(item: ResourceItem, event: Event): void {
    event.stopPropagation();
    this.closeActionMenu();
    this.store.openLinkDeliveryPackModal(item);
  }

  onApprove(id: string, event: Event): void {
    event.stopPropagation();
    this.closeActionMenu();
    this.store.approveResource(id);
  }

  onReject(id: string, event: Event): void {
    event.stopPropagation();
    this.closeActionMenu();
    this.store.rejectResource(id);
  }
}
