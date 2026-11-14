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
  SafeguardingCase,
  SafeguardingCaseStatus,
  SafeguardingSeverity,
} from '../../data/super-admin-safeguarding.models';

@Component({
  selector: 'school-hub-safeguarding-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './safeguarding-table.html',
  styleUrl: './safeguarding-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeguardingTableComponent {
  readonly cases = input.required<SafeguardingCase[]>();
  readonly totalCount = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly pageSize = input<number>(8);

  readonly searchQuery = input<string>('');
  readonly selectedSchool = input<string>('All Schools');
  readonly selectedSeverity = input<string>('All Severities');
  readonly selectedStatus = input<string>('All Statuses');
  readonly dateRange = input<string>('May 1 – May 31, 2025');

  readonly searchChange = output<string>();
  readonly schoolChange = output<string>();
  readonly severityChange = output<string>();
  readonly statusChange = output<string>();
  readonly pageChange = output<number>();
  readonly createCase = output<void>();
  readonly assignReview = output<void>();
  readonly exportData = output<void>();
  readonly viewCase = output<string>();
  readonly reassignCase = output<string>();
  readonly updateStatus = output<{
    caseId: string;
    newStatus: SafeguardingCaseStatus;
  }>();

  readonly openActionMenuId = signal<string | null>(null);

  toggleActionMenu(id: string, event: Event): void {
    event.stopPropagation();
    this.openActionMenuId.update((current) => (current === id ? null : id));
  }

  closeActionMenu(): void {
    this.openActionMenuId.set(null);
  }

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }

  onSchoolSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.schoolChange.emit(val);
  }

  onSeveritySelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.severityChange.emit(val);
  }

  onStatusSelect(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(val);
  }

  getSeverityDotClass(severity: SafeguardingSeverity): string {
    switch (severity) {
      case 'Low':
        return 'dot-low';
      case 'Medium':
        return 'dot-medium';
      case 'High':
        return 'dot-high';
      case 'Critical':
        return 'dot-critical';
      default:
        return 'dot-medium';
    }
  }

  getStatusPillClass(status: SafeguardingCaseStatus): string {
    switch (status) {
      case 'Under Review':
        return 'pill-under-review';
      case 'Pending Consent':
        return 'pill-pending-consent';
      case 'Investigating':
        return 'pill-investigating';
      case 'Pending Review':
        return 'pill-pending-review';
      case 'Escalated':
        return 'pill-escalated';
      case 'Resolved':
        return 'pill-resolved';
      default:
        return 'pill-default';
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
