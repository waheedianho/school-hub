import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAdminStore } from '../data/school-admin.store';
import { ResourcesTab } from '../data/school-admin.models';
import { ResourcesSummaryMetricsComponent } from './summary-metrics/summary-metrics';
import { ResourcesTableComponent } from './resources-table/resources-table';
import { ResourcesBottomActionCardsComponent } from './bottom-action-cards/bottom-action-cards';
import { ResourcesSidebarComponent } from './resources-sidebar/resources-sidebar';
import { UploadResourceModalComponent } from './upload-resource-modal/upload-resource-modal';
import { LinkDeliveryPackModalComponent } from './link-delivery-pack-modal/link-delivery-pack-modal';
import { ResourceDetailsModalComponent } from './resource-details-modal/resource-details-modal';

export interface ResourceTabOption {
  id: ResourcesTab;
  label: string;
  badge?: number;
}

@Component({
  selector: 'school-hub-resources',
  standalone: true,
  imports: [
    CommonModule,
    ResourcesSummaryMetricsComponent,
    ResourcesTableComponent,
    ResourcesBottomActionCardsComponent,
    ResourcesSidebarComponent,
    UploadResourceModalComponent,
    LinkDeliveryPackModalComponent,
    ResourceDetailsModalComponent,
  ],
  templateUrl: './resources.html',
  styleUrls: ['./resources.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent {
  readonly store = inject(SchoolAdminStore);

  readonly tabs: ResourceTabOption[] = [
    { id: 'library', label: 'Resource Library' },
    { id: 'queue', label: 'Approval Queue', badge: 186 },
    { id: 'delivery', label: 'Delivery Pack Resources' },
    { id: 'templates', label: 'Shared Templates' },
  ];

  readonly activeTab = this.store.activeResourcesTab;

  setTab(tab: ResourcesTab): void {
    this.store.setActiveResourcesTab(tab);
  }
}
