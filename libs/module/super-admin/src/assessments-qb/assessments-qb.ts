import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  AssessmentPack,
  AssessmentStatus,
  AssessmentTab,
  AssessmentTemplate,
} from '../data/super-admin-assessments.models';
import { AssessmentMetricsComponent } from './assessment-metrics/assessment-metrics';
import { AssessmentQuickActionsComponent } from './assessment-quick-actions/assessment-quick-actions';
import { AssessmentTableComponent } from './assessment-table/assessment-table';
import { AssessmentSidebarComponent } from './assessment-sidebar/assessment-sidebar';
import { AssessmentDetailModalComponent } from './assessment-detail-modal/assessment-detail-modal';
import { QuestionBankViewComponent } from './question-bank-view/question-bank-view';
import { AssessmentReviewViewComponent } from './assessment-review-view/assessment-review-view';
import { AssessmentTemplatesViewComponent } from './assessment-templates-view/assessment-templates-view';

@Component({
  selector: 'school-hub-assessments-qb',
  standalone: true,
  imports: [
    CommonModule,
    AssessmentMetricsComponent,
    AssessmentQuickActionsComponent,
    AssessmentTableComponent,
    AssessmentSidebarComponent,
    AssessmentDetailModalComponent,
    QuestionBankViewComponent,
    AssessmentReviewViewComponent,
    AssessmentTemplatesViewComponent,
  ],
  templateUrl: './assessments-qb.html',
  styleUrls: ['./assessments-qb.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentsQbComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly selectedPack = signal<AssessmentPack | null>(null);
  readonly toastMessage = signal<string | null>(null);

  readonly selectedTab = this.store.selectedAssessmentTab;

  setTab(tab: AssessmentTab): void {
    this.store.setAssessmentTab(tab);
  }

  navigateToCreateAssessment(): void {
    this.router.navigate(['/super-admin/assessments-qb/create']);
  }

  openPackDetail(pack: AssessmentPack): void {
    this.selectedPack.set(pack);
  }

  closePackDetail(): void {
    this.selectedPack.set(null);
  }

  handleStatusUpdate(event: { id: string; status: AssessmentStatus }): void {
    this.store.updateAssessmentStatus(event.id, event.status);
    if (this.selectedPack()?.id === event.id) {
      this.selectedPack.update((p) =>
        p ? { ...p, status: event.status } : null,
      );
    }
    this.showToast(`Assessment pack status updated to ${event.status}`);
  }

  handleDeletePack(id: string): void {
    this.store.deleteAssessmentPack(id);
    this.showToast('Assessment pack deleted');
  }

  handleFlagQuestion(id: string): void {
    this.store.flagQuestionBankItem(id);
    this.showToast('Question item flagged for academic review');
  }

  handleApproveQuestion(id: string): void {
    this.store.approveQuestionBankItem(id);
    this.showToast('Question item approved for test deployment');
  }

  handleApproveReviewItem(id: string): void {
    this.store.approveAssessmentReviewItem(id);
    this.showToast('Review item approved for publishing');
  }

  handleRequestRevisionItem(id: string): void {
    this.store.requestRevisionAssessmentReviewItem(id);
    this.showToast('Revisions requested from authoring team');
  }

  handleUseTemplate(template: AssessmentTemplate): void {
    this.showToast(`Blueprint '${template.title}' applied!`);
    this.navigateToCreateAssessment();
  }

  exportAssessments(): void {
    this.showToast('Exporting assessment registry report (CSV)...');
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }
}
