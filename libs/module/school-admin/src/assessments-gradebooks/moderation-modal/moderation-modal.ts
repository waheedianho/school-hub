import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-moderation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moderation-modal.html',
  styleUrls: ['./moderation-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModerationModalComponent {
  readonly store = inject(SchoolAdminStore);
  readonly isOpen = this.store.isModerationModalOpen;
  readonly submission = this.store.selectedSubmissionForModeration;

  readonly moderatedScore = signal<number>(24);
  readonly rubricComment = signal<string>('');

  constructor() {
    effect(() => {
      const sub = this.submission();
      if (sub) {
        this.moderatedScore.set(sub.moderatedScore ?? sub.teacherScore ?? 20);
        this.rubricComment.set(
          sub.rubricComment ?? 'Verified alignment with rubric standards.',
        );
      }
    });
  }

  onClose(): void {
    this.store.closeModerationModal();
  }

  onSave(): void {
    const sub = this.submission();
    if (!sub) return;

    this.store.saveModeratedScore(
      sub.id,
      this.moderatedScore(),
      this.rubricComment().trim(),
    );
  }
}
