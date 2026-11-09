import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearnerRecord, SchoolClass } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-learner-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learner-table.html',
  styleUrls: ['./learner-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnerTableComponent {
  readonly learners = input.required<LearnerRecord[]>();
  readonly selectedClass = input.required<SchoolClass>();
  readonly totalLearners = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly searchQuery = input<string>('');
  readonly classFilter = input<string>('All Classes');
  readonly statusFilter = input<string>('All Statuses');
  readonly allClasses = input<SchoolClass[]>([]);

  readonly searchChange = output<string>();
  readonly classFilterChange = output<string>();
  readonly statusFilterChange = output<string>();
  readonly pageChange = output<number>();
  readonly addLearnerClicked = output<void>();
  readonly bulkImportClicked = output<void>();
  readonly actionMenuClicked = output<{
    action: string;
    learner: LearnerRecord;
  }>();

  readonly statusOptions = ['All Statuses', 'Active', 'At Risk', 'Inactive'];

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchChange.emit(val);
  }

  onClassFilter(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.classFilterChange.emit(val);
  }

  onStatusFilter(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.statusFilterChange.emit(val);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  getPagesArray(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  getScoreColorClass(score: number): string {
    if (score >= 75) return 'score-green';
    if (score >= 60) return 'score-amber';
    return 'score-red';
  }
}
