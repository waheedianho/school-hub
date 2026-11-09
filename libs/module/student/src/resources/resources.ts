import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  Router,
  RouterLink,
} from '@angular/router';
import {
  DashboardCardComponent,
  DialogPanelComponent,
  FilterTabsComponent,
  PaginationComponent,
  ProgressBarComponent,
  ResourceCardComponent,
  ResourceTableComponent,
  SummaryStatComponent,
  WrittenAnswerComponent,
  downloadTextFile,
} from '@school-hub/ui-elements';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { ResourceStore } from './resource-store';
import { ResourceDownloadConnectionComponent } from './download-connection/download-connection';
import {
  filterResources,
  formatBytes,
  resourceBackQuery,
  resourceBytes,
  resourceTime,
} from './resource-engine';
import { resourceCard, resourceDate } from './resource-presenter';
import { RESOURCE_KINDS, RESOURCE_TYPES } from './resources.data';

@Component({
  selector: 'school-hub-student-resources',
  imports: [
    ResourceDownloadConnectionComponent,
    RouterLink,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    PaginationComponent,
    ProgressBarComponent,
    ResourceCardComponent,
    ResourceTableComponent,
    SummaryStatComponent,
    WrittenAnswerComponent,
  ],
  templateUrl: './resources.html',
  styleUrls: ['./resources.scss', './resources-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentResourcesComponent {
  protected readonly store = inject(ResourceStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly params = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly subjects = LEARNER_SUBJECTS;
  protected readonly tabs = RESOURCE_TYPES;
  protected readonly kind = RESOURCE_KINDS;
  protected readonly bytes = formatBytes;
  protected readonly date = resourceDate;
  protected readonly time = resourceTime;
  protected readonly card = resourceCard;
  protected readonly query = computed(() => resourceBackQuery(this.params()));
  protected readonly type = computed(() =>
    RESOURCE_TYPES.some((type) => type.id === this.params().get('type'))
      ? (this.params().get('type') ?? 'all')
      : 'all',
  );
  protected readonly search = computed(() => this.params().get('q') ?? '');
  protected readonly subject = computed(
    () => this.params().get('subjectId') ?? '',
  );
  protected readonly term = computed(() => this.params().get('term') ?? 'all');
  protected readonly sort = computed(() =>
    ['title', 'oldest'].includes(this.params().get('sort') ?? '')
      ? (this.params().get('sort') ?? 'recent')
      : 'recent',
  );
  protected readonly collection = computed(() =>
    ['saved', 'bookmarks', 'recent', 'downloads'].includes(
      this.params().get('collection') ?? '',
    )
      ? (this.params().get('collection') ?? 'all')
      : 'all',
  );
  protected readonly collectionLabels: Record<string, string> = {
    all: 'Recent Resources',
    saved: 'Saved Resources',
    bookmarks: 'Bookmarks',
    recent: 'Recently Viewed',
    downloads: 'My Downloads',
  };
  protected readonly matches = computed(() =>
    filterResources(
      this.store.resources,
      convertToParamMap({ ...this.query(), type: this.type() }),
      this.store.state(),
    ),
  );
  protected readonly totals = computed(() => {
    const query = { ...this.query() };
    delete query['type'];
    delete query['collection'];
    delete query['q'];
    return filterResources(
      this.store.resources,
      convertToParamMap(query),
      this.store.state(),
    );
  });
  protected readonly stats = computed(() => [
    {
      title: 'All Resources',
      value: this.totals().length,
      description: 'Learning materials',
      icon: 'ri-file-list-3-line',
      tone: 'purple' as const,
    },
    {
      title: 'Notes',
      value: this.totals().filter((item) => item.kind === 'note').length,
      description: 'Study notes & summaries',
      icon: 'ri-book-open-line',
      tone: 'green' as const,
    },
    {
      title: 'Videos',
      value: this.totals().filter((item) => item.kind === 'video').length,
      description: 'Short revision videos',
      icon: 'ri-play-circle-line',
      tone: 'orange' as const,
    },
    {
      title: 'Past Questions',
      value: this.totals().filter((item) => item.kind === 'past-question')
        .length,
      description: 'Sample exam-style practice',
      icon: 'ri-question-line',
      tone: 'blue' as const,
    },
    {
      title: 'Downloads',
      value: this.totals().filter((item) => item.kind === 'download').length,
      description: 'Practice sheets & more',
      icon: 'ri-download-line',
      tone: 'red' as const,
    },
  ]);
  protected readonly featured = computed(() =>
    this.matches().filter((item) => item.featured),
  );
  protected readonly featuredIndex = computed(() =>
    Math.max(
      0,
      Math.min(
        Math.ceil(this.featured().length / 4) - 1,
        Number(this.params().get('featuredPage')) || 0,
      ),
    ),
  );
  protected readonly featuredVisible = computed(() =>
    this.featured().slice(
      Math.floor(this.featuredIndex()) * 4,
      this.featuredIndex() * 4 + 4,
    ),
  );
  protected readonly expanded = computed(
    () =>
      this.params().get('expanded') === '1' ||
      this.collection() !== 'all' ||
      this.params().has('page'),
  );
  protected readonly page = computed(() =>
    Math.max(
      1,
      Math.min(
        Math.max(1, Math.ceil(this.matches().length / 5)),
        Math.floor(Number(this.params().get('page'))) || 1,
      ),
    ),
  );
  protected readonly rows = computed(() =>
    this.matches()
      .slice((this.page() - 1) * 5, this.page() * 5)
      .map((item) => {
        const history = this.store
          .state()
          .downloads.filter((download) => download.resourceId === item.id);
        const download =
          this.collection() === 'downloads'
            ? history[history.length - 1]
            : undefined;
        return {
          ...resourceCard(item, this.query()),
          description: download
            ? `${download.name} · Download started ${resourceDate(download.at)}`
            : item.description,
          date: resourceDate(download?.at ?? item.addedAt),
          size:
            item.kind === 'link'
              ? '—'
              : formatBytes(download?.bytes ?? resourceBytes(item)),
          externalUrl: item.externalUrl,
        };
      }),
  );
  protected readonly linkedLesson = computed(() =>
    LEARNER_LESSONS.find(
      (lesson) => lesson.id === this.params().get('lessonId'),
    ),
  );
  protected readonly context = computed(() =>
    [
      this.params().get('topicId')
        ? `Topic: ${this.params().get('topicId')?.replace(/-/g, ' ')}`
        : '',
      this.params().get('lessonId')
        ? `Lesson: ${this.linkedLesson()?.title ?? this.params().get('lessonId')}`
        : '',
    ]
      .filter(Boolean)
      .join(' · '),
  );
  protected readonly selected = computed(() =>
    this.store.resource(this.params().get('menu') ?? ''),
  );
  protected readonly view = computed(() =>
    ['storage', 'request'].includes(this.params().get('view') ?? '')
      ? (this.params().get('view') ?? '')
      : '',
  );
  protected readonly legacyMissing = computed(
    () =>
      !!this.params().get('resourceId') &&
      !this.store.resource(this.params().get('resourceId') ?? ''),
  );
  protected readonly dialogOpen = computed(
    () => !!this.view() || !!this.selected(),
  );
  protected readonly dialogTitle = computed(() =>
    this.view() === 'storage'
      ? 'Manage Resource Storage'
      : this.view() === 'request'
        ? 'Request a Resource'
        : 'Resource Options',
  );
  protected readonly confirmClear = signal(false);
  protected readonly request = signal('');
  protected readonly notice = signal('');
  protected readonly quick = [
    { id: 'downloads', label: 'My Downloads', icon: 'ri-download-line' },
    { id: 'saved', label: 'Saved Resources', icon: 'ri-bookmark-line' },
    { id: 'recent', label: 'Recently Viewed', icon: 'ri-history-line' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'ri-bookmark-3-line' },
  ];
  constructor() {
    effect(() => {
      const id = this.params().get('resourceId');
      if (this.store.ready() && id && this.store.resource(id))
        void this.router.navigate(['/student/resources', id], {
          queryParams: this.query(),
          replaceUrl: true,
        });
    });
  }
  protected change(key: string, event: Event): void {
    this.set(
      {
        [key]: (event.target as HTMLInputElement).value || null,
        page: null,
        featuredPage: null,
      },
      key === 'q',
    );
  }
  protected subjectCount(id: string): number {
    return this.store.resources.filter((resource) => resource.subjectId === id)
      .length;
  }
  protected set(queryParams: Params, replaceUrl = false): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl,
    });
  }
  protected setType(type: string): void {
    this.set({
      type: type === 'all' ? null : type,
      page: null,
      featuredPage: null,
    });
  }
  protected setCollection(collection: string): void {
    this.set({
      collection: collection === 'all' ? null : collection,
      page: null,
      expanded: collection === 'all' ? null : '1',
    });
  }
  protected open(view: string): void {
    this.confirmClear.set(false);
    this.set({ view, menu: null });
    if (view === 'storage') void this.store.measure();
  }
  protected close(): void {
    this.set({ view: null, menu: null, resourceId: null }, true);
    this.confirmClear.set(false);
  }
  protected clear(): void {
    void this.router.navigate(['/student/resources']);
  }
  protected async download(id: string): Promise<void> {
    const resource = this.store.resource(id);
    if (resource && (await this.store.download(resource)))
      this.notice.set(
        'Download started. Open My Downloads to see your download history.',
      );
  }
  protected save(id: string): void {
    this.store.toggle(id, 'saved');
  }
  protected clearStorage(all = false): void {
    this.store.clear(all ? 'all' : 'downloads');
    this.confirmClear.set(false);
    this.notice.set(
      all
        ? 'Resource notes, bookmarks, saved items, and history were cleared on this device.'
        : 'Download history cleared. Files in your download folder are unchanged.',
    );
  }
  protected exportRequest(): void {
    if (this.request().trim()) {
      downloadTextFile(
        this.document,
        'resource-request.txt',
        `RESOURCE REQUEST DRAFT\n${this.request().trim()}\n\nPrepared locally in SchoolHub. This request has not been sent.`,
      );
      this.notice.set(
        'Request draft downloaded. Tutor delivery is not connected yet.',
      );
    }
  }
}
