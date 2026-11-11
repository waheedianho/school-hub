import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { InterventionsTab } from '../data/school-admin.models';
import { InterventionsSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { InterventionsTableComponent } from './interventions-table/interventions-table';
import { InterventionsInsightsCardsComponent } from './insights-cards/insights-cards';
import { InterventionsSidebarComponent } from './interventions-sidebar/interventions-sidebar';
import { CreateInterventionModalComponent } from './create-intervention-modal/create-intervention-modal';
import { ScheduleMeetingModalComponent } from './schedule-meeting-modal/schedule-meeting-modal';
import { AssignFollowupModalComponent } from './assign-followup-modal/assign-followup-modal';
import { CaseDetailsModalComponent } from './case-details-modal/case-details-modal';

export interface InterventionTabOption {
  id: InterventionsTab;
  label: string;
}

@Component({
  selector: 'school-hub-interventions',
  standalone: true,
  imports: [
    CommonModule,
    InterventionsSummaryMetricsComponent,
    InterventionsTableComponent,
    InterventionsInsightsCardsComponent,
    InterventionsSidebarComponent,
    CreateInterventionModalComponent,
    ScheduleMeetingModalComponent,
    AssignFollowupModalComponent,
    CaseDetailsModalComponent,
  ],
  templateUrl: './interventions.html',
  styleUrls: ['./interventions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterventionsComponent {
  readonly store = inject(SchoolAdminStore);

  readonly tabs: InterventionTabOption[] = [
    { id: 'active', label: 'Active Interventions' },
    { id: 'schedule', label: 'Follow-up Schedule' },
    { id: 'support-plans', label: 'Support Plans' },
    { id: 'resolved', label: 'Resolved Cases' },
  ];

  readonly activeTab = this.store.activeInterventionsTab;

  setTab(tab: InterventionsTab): void {
    this.store.setActiveInterventionsTab(tab);
  }
}
