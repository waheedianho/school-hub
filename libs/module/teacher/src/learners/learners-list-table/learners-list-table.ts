import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { LearnerProfileItem } from '../../data/teacher-learners.data';

@Component({
  selector: 'school-hub-learners-list-table',
  imports: [],
  templateUrl: './learners-list-table.html',
  styleUrl: './learners-list-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnersListTableComponent {
  readonly learners = input.required<LearnerProfileItem[]>();
  readonly viewLearner = output<LearnerProfileItem>();
  readonly openMenu = output<LearnerProfileItem>();

  readonly selectedIds = signal<Set<string>>(new Set());

  toggleSelectAll(): void {
    const current = this.selectedIds();
    const list = this.learners();
    if (current.size === list.length) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(list.map((l) => l.id)));
    }
  }

  toggleSelect(id: string): void {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
  }

  isAllSelected(): boolean {
    const list = this.learners();
    return list.length > 0 && this.selectedIds().size === list.length;
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  getClassBadgeTone(className: string): string {
    switch (className) {
      case 'JSS 1A':
        return 'badge-purple';
      case 'JSS 1B':
        return 'badge-blue';
      case 'JSS 1C':
        return 'badge-orange';
      default:
        return 'badge-default';
    }
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'score-green';
    if (score >= 60) return 'score-orange';
    return 'score-red';
  }

  getAttendanceClass(rate: number): string {
    if (rate >= 85) return 'attendance-green';
    if (rate >= 75) return 'attendance-orange';
    return 'attendance-red';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'At Risk':
        return 'status-risk';
      case 'Needs Support':
        return 'status-support';
      default:
        return 'status-default';
    }
  }
}
