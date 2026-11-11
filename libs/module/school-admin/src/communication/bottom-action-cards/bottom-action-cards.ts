import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';

@Component({
  selector: 'school-hub-communication-bottom-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-action-cards.html',
  styleUrls: ['./bottom-action-cards.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationBottomActionCardsComponent {
  readonly store = inject(SchoolAdminStore);

  onCreateAnnouncement(): void {
    this.store.openCreateAnnouncementModal();
  }

  onScheduleMessageBlast(): void {
    this.store.openScheduleBlastModal();
  }

  onReviewLogs(): void {
    this.store.setActiveCommunicationTab('logs');
  }

  onGenerateReport(): void {
    this.store.openExportCommunicationModal();
  }
}
