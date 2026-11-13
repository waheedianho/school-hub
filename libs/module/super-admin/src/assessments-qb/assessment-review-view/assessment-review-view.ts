import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentReviewQueueItem } from '../../data/super-admin-assessments.models';

@Component({
  selector: 'school-hub-assessment-review-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment-review-view.html',
  styleUrls: ['./assessment-review-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentReviewViewComponent {
  readonly items = input.required<AssessmentReviewQueueItem[]>();

  readonly approveItem = output<string>();
  readonly requestRevisionItem = output<string>();

  readonly selectedCategory = signal<string>('All');
  readonly selectedPriority = signal<string>('All');

  readonly categories = [
    'All',
    'Quality Check',
    'Revisions',
    'Approval',
    'Moderation',
  ];

  readonly priorities = ['All', 'High', 'Medium', 'Low'];

  readonly filteredItems = computed(() => {
    const list = this.items();
    const cat = this.selectedCategory();
    const pri = this.selectedPriority();

    return list.filter((item) => {
      if (cat !== 'All' && item.category !== cat) return false;
      if (pri !== 'All' && item.priority !== pri) return false;
      return true;
    });
  });

  onApprove(id: string): void {
    this.approveItem.emit(id);
  }

  onRequestRevision(id: string): void {
    this.requestRevisionItem.emit(id);
  }
}
