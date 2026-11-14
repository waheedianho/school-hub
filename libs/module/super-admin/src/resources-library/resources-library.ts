import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperAdminStore } from '../data/super-admin.store';
import {
  ResourceCategoryTab,
  ResourceItem,
  ResourceStatus,
} from '../data/super-admin-resources.models';
import { ResourcesMetricsComponent } from './resources-metrics/resources-metrics';
import { ResourcesBottomMetricsComponent } from './resources-bottom-metrics/resources-bottom-metrics';
import { ResourcesSidebarComponent } from './resources-sidebar/resources-sidebar';
import { ResourcesTableComponent } from './resources-table/resources-table';
import { CreateFolderModalComponent } from './create-folder-modal/create-folder-modal';
import { BulkImportModalComponent } from './bulk-import-modal/bulk-import-modal';
import { ResourceDetailModalComponent } from './resource-detail-modal/resource-detail-modal';

@Component({
  selector: 'school-hub-resources-library',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ResourcesMetricsComponent,
    ResourcesBottomMetricsComponent,
    ResourcesSidebarComponent,
    ResourcesTableComponent,
    CreateFolderModalComponent,
    BulkImportModalComponent,
    ResourceDetailModalComponent,
  ],
  templateUrl: './resources-library.html',
  styleUrl: './resources-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesLibraryComponent {
  readonly store = inject(SuperAdminStore);

  readonly activeModal = signal<'folder' | 'import' | 'detail' | null>(null);
  readonly selectedResourceForDetail = signal<ResourceItem | null>(null);
  readonly actionToast = signal<string | null>(null);

  readonly tabs: {
    id: ResourceCategoryTab;
    label: string;
    badge?: string;
    badgeClass?: string;
  }[] = [
    { id: 'All Resources', label: 'All Resources' },
    {
      id: 'Lesson Notes',
      label: 'Lesson Notes',
      badge: '1,842',
      badgeClass: 'badge-blue',
    },
    {
      id: 'Videos',
      label: 'Videos',
      badge: '1,126',
      badgeClass: 'badge-purple',
    },
    {
      id: 'Worksheets',
      label: 'Worksheets',
      badge: '1,957',
      badgeClass: 'badge-cyan',
    },
    {
      id: 'Assessments',
      label: 'Assessments',
      badge: '1,204',
      badgeClass: 'badge-orange',
    },
    {
      id: 'Question Banks',
      label: 'Question Banks',
      badge: '832',
      badgeClass: 'badge-amber',
    },
    {
      id: 'Portfolio Tasks',
      label: 'Portfolio Tasks',
      badge: '643',
      badgeClass: 'badge-green',
    },
    {
      id: 'Templates',
      label: 'Templates',
      badge: '698',
      badgeClass: 'badge-slate',
    },
    {
      id: 'Policy Documents',
      label: 'Policy Documents',
      badge: '440',
      badgeClass: 'badge-red',
    },
  ];

  onTabChange(tab: ResourceCategoryTab): void {
    this.store.setResourceTab(tab);
  }

  openCreateFolder(): void {
    this.activeModal.set('folder');
  }

  openBulkImport(): void {
    this.activeModal.set('import');
  }

  openResourceDetail(res: ResourceItem): void {
    this.selectedResourceForDetail.set(res);
    this.activeModal.set('detail');
  }

  closeModal(): void {
    this.activeModal.set(null);
    this.selectedResourceForDetail.set(null);
  }

  showToast(message: string): void {
    this.actionToast.set(message);
    setTimeout(() => {
      this.actionToast.set(null);
    }, 4000);
  }

  onFolderCreated(data: {
    folderName: string;
    category: string;
    classLevel: string;
  }): void {
    this.showToast(
      `Resource folder "${data.folderName}" successfully created.`,
    );
  }

  onBulkImported(data: {
    packName: string;
    fileCount: number;
    autoApprove: boolean;
  }): void {
    this.showToast(
      `Imported ${data.fileCount} academic files into "${data.packName}".`,
    );
  }

  onStatusChanged(data: {
    resourceId: string;
    newStatus: ResourceStatus;
  }): void {
    this.store.updateResourceStatus(data.resourceId, data.newStatus);
    this.showToast(
      `Resource ${data.resourceId} status updated to ${data.newStatus}.`,
    );
  }

  onApproveResource(id: string): void {
    this.store.updateResourceStatus(id, 'Approved');
    this.showToast(`Resource ${id} approved and published.`);
  }

  onRejectResource(id: string): void {
    this.store.updateResourceStatus(id, 'Rejected');
    this.showToast(`Resource ${id} rejected.`);
  }

  onDeleteResource(id: string): void {
    this.store.deleteResource(id);
    this.showToast(`Resource ${id} deleted from library.`);
  }

  onDownloadResource(id: string): void {
    this.showToast(`Starting download for resource ${id}...`);
  }

  onQueueItemSelect(title: string): void {
    const item = this.store.allResources().find((r) => r.title.includes(title));
    if (item) {
      this.openResourceDetail(item);
    } else {
      this.store.setResourceSearch(title);
    }
  }

  clearFilters(): void {
    this.store.setResourceSearch('');
    this.store.setResourceSchoolFilter('All Schools');
    this.store.setResourceSubjectFilter('All Subjects');
    this.store.setResourceClassFilter('All Class Levels');
    this.store.setResourceTypeFilter('All Resource Types');
    this.store.setResourceStatusFilter('All Statuses');
    this.store.setResourceTab('All Resources');
  }
}
