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
import {
  ReviewQueueItem,
  ReviewQueueSummary,
} from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-review-queue-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-queue-view.html',
  styleUrls: ['./review-queue-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewQueueViewComponent {
  readonly queueItems = input.required<ReviewQueueItem[]>();
  readonly summary = input.required<ReviewQueueSummary>();

  readonly approve = output<string>();
  readonly requestChanges = output<string>();
  readonly viewItem = output<ReviewQueueItem>();

  readonly priorityFilter = signal<string>('All');
  readonly categoryFilter = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly filteredItems = computed(() => {
    const list = this.queueItems();
    const priority = this.priorityFilter();
    const category = this.categoryFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter((item) => {
      if (priority !== 'All' && item.priority !== priority) return false;
      if (category !== 'All' && item.category !== category) return false;
      if (query) {
        const matchesName = item.packName.toLowerCase().includes(query);
        const matchesSubmitter = item.submittedBy.toLowerCase().includes(query);
        const matchesSubject = item.subject.toLowerCase().includes(query);
        if (!matchesName && !matchesSubmitter && !matchesSubject) return false;
      }
      return true;
    });
  });
}
