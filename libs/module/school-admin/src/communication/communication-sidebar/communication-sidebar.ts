import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../../data/school-admin.store';
import { CommunicationAttentionItem } from '../../data/school-admin.models';

@Component({
  selector: 'school-hub-communication-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './communication-sidebar.html',
  styleUrls: ['./communication-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationSidebarComponent {
  readonly store = inject(SchoolAdminStore);

  readonly summary = this.store.communicationSidebarSummary;
  readonly attentionItems = this.store.communicationAttentionItems;
  readonly selectedAttention = this.store.selectedCommunicationAttentionItem;

  onSelectAttention(item: CommunicationAttentionItem): void {
    this.store.selectCommunicationAttentionItem(item);
  }

  onCreateAnnouncement(): void {
    this.store.openCreateAnnouncementModal();
  }

  onSendParentMessage(): void {
    this.store.openSendParentMessageModal();
  }

  onReviewLogs(): void {
    this.store.setActiveCommunicationTab('logs');
  }

  onExportReport(): void {
    this.store.openExportCommunicationModal();
  }
}
