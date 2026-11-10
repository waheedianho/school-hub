import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolAdminStore } from '../../data/school-admin.store';
import {
  AssessmentReviewSubTab,
  LearnerSubmissionReview,
} from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-submission-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submission-review.html',
  styleUrls: ['./submission-review.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionReviewComponent {
  readonly store = inject(SchoolAdminStore);

  readonly assessment = this.store.selectedAssessmentForReview;
  readonly activeSubTab = this.store.activeReviewSubTab;
  readonly submissions = this.store.learnerSubmissions;
  readonly gradeBuckets = this.store.gradeDistributionBuckets;
  readonly stats = this.store.reviewSummaryStats;

  // Local filters within review table
  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<string>('All Status');
  readonly flagFilter = signal<string>('All Flags');

  onBackToAssessments(): void {
    this.store.closeAssessmentReview();
  }

  onSubTabChange(tab: AssessmentReviewSubTab): void {
    this.store.setActiveReviewSubTab(tab);
  }

  onModerateSubmission(submission: LearnerSubmissionReview): void {
    this.store.openModerationModal(submission);
  }

  onApproveGradebook(): void {
    const current = this.assessment();
    if (current) {
      this.store.approveAssessmentGradebook(current.id);
    }
  }

  onReturnToTeacher(): void {
    const current = this.assessment();
    if (current) {
      this.store.returnGradebookToTeacher(current.id);
    }
  }

  onExportReport(): void {
    this.store.exportAssessmentReport();
  }

  filteredSubmissions(): LearnerSubmissionReview[] {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();
    const flag = this.flagFilter();

    return this.submissions().filter((s) => {
      const matchesQuery =
        !query ||
        s.learnerName.toLowerCase().includes(query) ||
        (s.rubricComment && s.rubricComment.toLowerCase().includes(query));

      const matchesStatus =
        status === 'All Status' || s.reviewStatus === status;

      const matchesFlag =
        flag === 'All Flags' ||
        (flag === 'Has Flags' && s.flag && s.flag !== '—') ||
        (s.flag && s.flag === flag);

      return matchesQuery && matchesStatus && matchesFlag;
    });
  }
}
