import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  REVIEW_QUEUE_ITEMS,
  ReviewQueueItem,
} from '../../data/teacher-assignments.data';

@Component({
  selector: 'school-hub-review-queue',
  templateUrl: './review-queue.html',
  styleUrl: './review-queue.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewQueueComponent {
  readonly queueItems = input<ReviewQueueItem[]>(REVIEW_QUEUE_ITEMS);
}
