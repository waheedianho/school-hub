import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  MOST_USED_RESOURCES_LIST,
  MostUsedResourceItem,
  RECENT_UPLOADS_LIST,
  RESOURCES_QUICK_ACTIONS,
  RecentUploadItem,
  ResourceFilterValues,
  ResourceItem,
  ResourceMetric,
  ResourceQuickAction,
  TEACHER_RESOURCES_LIST,
  TEACHER_RESOURCES_METRICS,
} from '../data/teacher-resources.data';
import { MostUsedResourcesPanelComponent } from './most-used-resources-panel/most-used-resources-panel';
import { RecentUploadsPanelComponent } from './recent-uploads-panel/recent-uploads-panel';
import { ResourcesFiltersComponent } from './resources-filters/resources-filters';
import { ResourcesMetricsComponent } from './resources-metrics/resources-metrics';
import { ResourcesQuickActionsComponent } from './resources-quick-actions/resources-quick-actions';
import { ResourcesTableComponent } from './resources-table/resources-table';

@Component({
  selector: 'school-hub-teacher-resources',
  imports: [
    RouterLink,
    ResourcesMetricsComponent,
    ResourcesFiltersComponent,
    ResourcesTableComponent,
    RecentUploadsPanelComponent,
    MostUsedResourcesPanelComponent,
    ResourcesQuickActionsComponent,
  ],
  templateUrl: './resources.html',
  styleUrl: './resources.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherResourcesComponent {
  private readonly router = inject(Router);

  readonly metrics = signal<ResourceMetric[]>(TEACHER_RESOURCES_METRICS);
  readonly allResources = signal<ResourceItem[]>(TEACHER_RESOURCES_LIST);
  readonly recentUploads = signal<RecentUploadItem[]>(RECENT_UPLOADS_LIST);
  readonly mostUsedResources = signal<MostUsedResourceItem[]>(
    MOST_USED_RESOURCES_LIST,
  );
  readonly quickActions = signal<ResourceQuickAction[]>(
    RESOURCES_QUICK_ACTIONS,
  );

  readonly filters = signal<ResourceFilterValues>({
    className: 'All Classes',
    subject: 'All Subjects',
    resourceType: 'All Types',
    topic: 'All Topics',
    searchQuery: '',
  });

  readonly filteredResources = computed(() => {
    const list = this.allResources();
    const currentFilters = this.filters();
    const query = currentFilters.searchQuery.toLowerCase().trim();

    return list.filter((item) => {
      if (
        currentFilters.className !== 'All Classes' &&
        item.className !== currentFilters.className
      ) {
        return false;
      }

      if (
        currentFilters.subject !== 'All Subjects' &&
        item.subject !== currentFilters.subject
      ) {
        return false;
      }

      if (
        currentFilters.resourceType !== 'All Types' &&
        item.typeLabel !== currentFilters.resourceType
      ) {
        return false;
      }

      if (
        currentFilters.topic !== 'All Topics' &&
        item.topic !== currentFilters.topic
      ) {
        return false;
      }

      if (query) {
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesTopic = item.topic.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTopic) {
          return false;
        }
      }

      return true;
    });
  });

  onFiltersChanged(newFilters: ResourceFilterValues): void {
    this.filters.set(newFilters);
  }

  onUploadResource(): void {
    this.router.navigate(['/teacher/resources/upload']);
  }

  onCreateFolder(): void {
    // Create folder modal / interaction
  }

  onViewResource(resource?: ResourceItem): void {
    if (resource) {
      this.router.navigate(['/teacher/resources/upload']);
    }
  }

  onDownloadResource(resource?: ResourceItem): void {
    if (resource) {
      // Download resource file
    }
  }

  onOpenMenu(resource?: ResourceItem): void {
    if (resource) {
      // Menu options
    }
  }

  onViewUploadDetail(item?: RecentUploadItem): void {
    if (item) {
      this.router.navigate(['/teacher/resources/upload']);
    }
  }

  onViewUsedResourceDetail(item?: MostUsedResourceItem): void {
    if (item) {
      this.router.navigate(['/teacher/resources/upload']);
    }
  }

  onViewAllUploads(): void {
    this.filters.update((f) => ({ ...f, resourceType: 'All Types' }));
  }

  onViewAllUsed(): void {
    this.filters.update((f) => ({ ...f, className: 'All Classes' }));
  }

  onQuickAction(actionId: string): void {
    switch (actionId) {
      case 'upload-worksheet':
      case 'add-video-lesson':
        this.router.navigate(['/teacher/resources/upload']);
        break;
      case 'share-with-class':
        this.router.navigate(['/teacher/live-classes']);
        break;
      case 'create-resource-folder':
        this.onCreateFolder();
        break;
      default:
        break;
    }
  }
}
