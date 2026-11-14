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
import { ResourceItem } from '../../data/super-admin-resources.models';

@Component({
  selector: 'school-hub-resources-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './resources-table.html',
  styleUrl: './resources-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesTableComponent {
  readonly resources = input.required<ResourceItem[]>();
  readonly totalCount = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly pageSize = input<number>(10);

  readonly searchQuery = input<string>('');
  readonly selectedSchool = input<string>('All Schools');
  readonly selectedSubject = input<string>('All Subjects');
  readonly selectedClass = input<string>('All Class Levels');
  readonly selectedType = input<string>('All Resource Types');
  readonly selectedStatus = input<string>('All Statuses');
  readonly dateRange = input<string>('May 1 – May 31, 2025');

  readonly searchChange = output<string>();
  readonly schoolChange = output<string>();
  readonly subjectChange = output<string>();
  readonly classChange = output<string>();
  readonly typeChange = output<string>();
  readonly statusChange = output<string>();
  readonly clearFilters = output<void>();

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly uploadResource = output<void>();
  readonly bulkImport = output<void>();
  readonly createFolder = output<void>();

  readonly viewResource = output<ResourceItem>();
  readonly approveResource = output<string>();
  readonly rejectResource = output<string>();
  readonly deleteResource = output<string>();
  readonly downloadResource = output<string>();

  readonly selectedResourceIds = signal<Set<string>>(new Set<string>());
  readonly openActionMenuId = signal<string | null>(null);

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      const allIds = new Set(this.resources().map((r) => r.id));
      this.selectedResourceIds.set(allIds);
    } else {
      this.selectedResourceIds.set(new Set<string>());
    }
  }

  toggleSelectResource(id: string): void {
    const current = new Set(this.selectedResourceIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedResourceIds.set(current);
  }

  isResourceSelected(id: string): boolean {
    return this.selectedResourceIds().has(id);
  }

  areAllSelected(): boolean {
    return (
      this.resources().length > 0 &&
      this.resources().every((r) => this.selectedResourceIds().has(r.id))
    );
  }

  toggleActionMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openActionMenuId() === id) {
      this.openActionMenuId.set(null);
    } else {
      this.openActionMenuId.set(id);
    }
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onViewResource(res: ResourceItem): void {
    this.closeActionMenu();
    this.viewResource.emit(res);
  }

  onApprove(id: string): void {
    this.closeActionMenu();
    this.approveResource.emit(id);
  }

  onReject(id: string): void {
    this.closeActionMenu();
    this.rejectResource.emit(id);
  }

  onDelete(id: string): void {
    this.closeActionMenu();
    this.deleteResource.emit(id);
  }

  onDownload(id: string): void {
    this.closeActionMenu();
    this.downloadResource.emit(id);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeSelect(size: number): void {
    this.pageSizeChange.emit(size);
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
