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
  CurriculumPack,
  CurriculumStatus,
  CurriculumTab,
} from '../data/super-admin-curriculum.models';
import { CurriculumMetricsComponent } from './curriculum-metrics/curriculum-metrics';
import { CurriculumQuickActionsComponent } from './curriculum-quick-actions/curriculum-quick-actions';
import { CurriculumTableComponent } from './curriculum-table/curriculum-table';
import { CurriculumSidebarComponent } from './curriculum-sidebar/curriculum-sidebar';
import { PackDetailModalComponent } from './pack-detail-modal/pack-detail-modal';
import { ReviewQueueViewComponent } from './review-queue-view/review-queue-view';
import { ContentLibraryViewComponent } from './content-library-view/content-library-view';
import { TemplatesStandardsViewComponent } from './templates-standards-view/templates-standards-view';

@Component({
  selector: 'school-hub-curriculum-content',
  standalone: true,
  imports: [
    CommonModule,
    CurriculumMetricsComponent,
    CurriculumQuickActionsComponent,
    CurriculumTableComponent,
    CurriculumSidebarComponent,
    PackDetailModalComponent,
    ReviewQueueViewComponent,
    ContentLibraryViewComponent,
    TemplatesStandardsViewComponent,
  ],
  templateUrl: './curriculum-content.html',
  styleUrls: ['./curriculum-content.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumContentComponent {
  private readonly router = inject(Router);
  readonly store = inject(SuperAdminStore);

  readonly selectedPack = signal<CurriculumPack | null>(null);
  readonly toastMessage = signal<string | null>(null);

  readonly selectedTab = this.store.selectedCurriculumTab;

  setTab(tab: CurriculumTab): void {
    this.store.setCurriculumTab(tab);
  }

  navigateToCreatePack(): void {
    this.router.navigate(['/super-admin/curriculum-content/create']);
  }

  openPackDetail(pack: CurriculumPack): void {
    this.selectedPack.set(pack);
  }

  closePackDetail(): void {
    this.selectedPack.set(null);
  }

  handleStatusUpdate(event: { id: string; status: CurriculumStatus }): void {
    this.store.updateCurriculumPackStatus(event.id, event.status);
    this.showToast(`Curriculum pack status updated to ${event.status}`);
  }

  handleDeletePack(id: string): void {
    this.store.deleteCurriculumPack(id);
    this.closePackDetail();
    this.showToast('Curriculum pack removed from repository');
  }

  handleApproveReviewItem(id: string): void {
    this.store.approveReviewQueueItem(id);
    this.showToast('Academic review item approved!');
  }

  handleRequestFixReviewItem(id: string): void {
    this.store.requestChangesReviewQueueItem(id);
    this.showToast('Revision request sent to authoring team');
  }

  exportCurriculumData(): void {
    const data = JSON.stringify(this.store.curriculumPacks(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learno-curriculum-packs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Curriculum dataset exported successfully');
  }

  triggerImport(): void {
    this.showToast(
      'Import Content wizard ready for curriculum ZIP/SCORM/QTI packs',
    );
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }
}
