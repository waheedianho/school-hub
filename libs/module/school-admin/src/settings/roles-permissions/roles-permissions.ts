import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SchoolRole } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-roles-permissions',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './roles-permissions.html',
  styleUrls: ['./roles-permissions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesPermissionsComponent {
  readonly roles = input.required<SchoolRole[]>();
  readonly totalRolesCount = input.required<number>();
  readonly searchQuery = input<string>('');
  readonly scopeFilter = input<string>('All Scopes');
  readonly levelFilter = input<string>('All Levels');
  readonly statusFilter = input<string>('All Statuses');
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(10);
  readonly totalPages = input<number>(1);

  readonly searchQueryChange = output<string>();
  readonly scopeFilterChange = output<string>();
  readonly levelFilterChange = output<string>();
  readonly statusFilterChange = output<string>();
  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly viewRole = output<SchoolRole>();
  readonly createRoleClick = output<void>();
  readonly cardClick = output<string>();

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQueryChange.emit(value);
  }

  onScopeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.scopeFilterChange.emit(value);
  }

  onLevelChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.levelFilterChange.emit(value);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilterChange.emit(value);
  }

  onPageSelect(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeSelect(event: Event): void {
    const size = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(size);
  }

  onSelectRole(role: SchoolRole): void {
    this.viewRole.emit(role);
  }

  onTriggerCard(cardType: string): void {
    this.cardClick.emit(cardType);
  }
}
