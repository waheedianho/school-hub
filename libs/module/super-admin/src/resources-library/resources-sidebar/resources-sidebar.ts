import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ApprovalQueueItem,
  MostUsedResourceType,
  RecentUploadActivity,
  ResourceHealthCategory,
} from '../../data/super-admin-resources.models';

@Component({
  selector: 'school-hub-resources-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resources-sidebar.html',
  styleUrl: './resources-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesSidebarComponent {
  readonly healthCategories = input.required<ResourceHealthCategory[]>();
  readonly approvalQueue = input.required<ApprovalQueueItem[]>();
  readonly mostUsedTypes = input.required<MostUsedResourceType[]>();
  readonly recentActivities = input.required<RecentUploadActivity[]>();

  readonly viewApprovalQueue = output<void>();
  readonly viewRecentActivities = output<void>();
  readonly uploadResourceAction = output<void>();
  readonly bulkImportAction = output<void>();
  readonly createFolderAction = output<void>();
  readonly downloadReportAction = output<void>();
  readonly selectQueueItem = output<string>();
}
