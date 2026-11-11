import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { CommunicationTab } from '../data/school-admin.models';
import { CommunicationSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { CommunicationMessagesTableComponent } from './messages-table/messages-table';
import { CommunicationBottomActionCardsComponent } from './bottom-action-cards/bottom-action-cards';
import { CommunicationSidebarComponent } from './communication-sidebar/communication-sidebar';
import { CreateAnnouncementModalComponent } from './create-announcement-modal/create-announcement-modal';
import { SendParentMessageModalComponent } from './send-parent-message-modal/send-parent-message-modal';
import { MessageDetailsModalComponent } from './message-details-modal/message-details-modal';
import { ScheduleBlastModalComponent } from './schedule-blast-modal/schedule-blast-modal';
import { ExportCommunicationModalComponent } from './export-communication-modal/export-communication-modal';

export interface CommunicationTabOption {
  id: CommunicationTab;
  label: string;
  icon: 'megaphone' | 'teacher' | 'parent' | 'logs';
}

@Component({
  selector: 'school-hub-communication',
  standalone: true,
  imports: [
    CommonModule,
    CommunicationSummaryMetricsComponent,
    CommunicationMessagesTableComponent,
    CommunicationBottomActionCardsComponent,
    CommunicationSidebarComponent,
    CreateAnnouncementModalComponent,
    SendParentMessageModalComponent,
    MessageDetailsModalComponent,
    ScheduleBlastModalComponent,
    ExportCommunicationModalComponent,
  ],
  templateUrl: './communication.html',
  styleUrls: ['./communication.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationComponent {
  readonly store = inject(SchoolAdminStore);

  readonly tabs: CommunicationTabOption[] = [
    { id: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { id: 'teacher-messages', label: 'Teacher Messages', icon: 'teacher' },
    { id: 'parent-messages', label: 'Parent Messages', icon: 'parent' },
    { id: 'logs', label: 'Communication Logs', icon: 'logs' },
  ];

  readonly activeTab = this.store.activeCommunicationTab;

  setTab(tab: CommunicationTab): void {
    this.store.setActiveCommunicationTab(tab);
  }
}
