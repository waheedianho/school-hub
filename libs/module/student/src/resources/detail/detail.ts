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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ChapterListComponent,
  DashboardCardComponent,
  DialogPanelComponent,
  FilterTabsComponent,
  MediaPlayerComponent,
  MediaSeek,
  ResourceArtworkComponent,
  ResourceCardComponent,
  ResourceListComponent,
  ResourceListItem,
  StatusBadgeComponent,
  WrittenAnswerComponent,
  downloadTextFile,
} from '@school-hub/ui-elements';
import { ResourceStore } from '../resource-store';
import { ResourceDownloadConnectionComponent } from '../download-connection/download-connection';
import {
  formatBytes,
  resourceBackQuery,
  resourceBytes,
  resourceText,
  resourceTime,
} from '../resource-engine';
import { resourceCard, resourceDate } from '../resource-presenter';
import { RESOURCE_KINDS, resourceSubject } from '../resources.data';
import { LEARNER_LESSONS } from '../../lessons/lessons.data';

@Component({
  selector: 'school-hub-resource-detail',
  imports: [
    ResourceDownloadConnectionComponent,
    RouterLink,
    ChapterListComponent,
    DashboardCardComponent,
    DialogPanelComponent,
    FilterTabsComponent,
    MediaPlayerComponent,
    ResourceArtworkComponent,
    ResourceCardComponent,
    ResourceListComponent,
    StatusBadgeComponent,
    WrittenAnswerComponent,
  ],
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss', './detail-content.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceDetailComponent {
  protected readonly store = inject(ResourceStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly params = toSignal(this.route.paramMap, {
    requireSync: true,
  });
  private readonly query = toSignal(this.route.queryParamMap, {
    requireSync: true,
  });
  protected readonly resource = computed(() =>
    this.store.resource(this.params().get('resourceId') ?? ''),
  );
  protected readonly record = computed(() =>
    this.store.record(this.params().get('resourceId') ?? ''),
  );
  protected readonly backQuery = computed(() =>
    resourceBackQuery(this.query()),
  );
  protected readonly subject = resourceSubject;
  protected readonly kind = RESOURCE_KINDS;
  protected readonly time = resourceTime;
  protected readonly date = resourceDate;
  protected readonly bytes = formatBytes;
  protected readonly fileSize = resourceBytes;
  protected readonly card = resourceCard;
  protected readonly position = signal(0);
  protected readonly seekRequest = signal<MediaSeek | null>(null);
  protected readonly outlineHidden = signal(false);
  protected readonly notice = signal('');
  protected readonly noteDraft = signal('');
  protected readonly editing = signal('');
  protected readonly linkNote = signal(true);
  protected readonly dialog = signal('');
  protected readonly deleteId = signal('');
  protected readonly tab = computed(() =>
    [
      'notes',
      'related',
      ...(this.resource()?.video ? ['transcript'] : []),
    ].includes(this.query().get('tab') ?? '')
      ? (this.query().get('tab') ?? 'overview')
      : 'overview',
  );
  protected readonly tabs = computed(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Notes' },
    ...(this.resource()?.video
      ? [{ id: 'transcript', label: 'Transcript' }]
      : []),
    { id: 'related', label: 'Related Resources' },
  ]);
  protected readonly chapters = computed(
    () =>
      this.resource()?.video?.chapters.map((chapter) => ({
        title: chapter.title,
        start: chapter.start,
        time: resourceTime(chapter.start),
      })) ?? [],
  );
  protected readonly activeChapter = computed(() =>
    Math.max(
      0,
      this.chapters().reduce(
        (active, chapter, index) =>
          this.position() >= chapter.start ? index : active,
        0,
      ),
    ),
  );
  protected readonly related = computed(() => {
    const resource = this.resource();
    if (!resource) return [];
    const selected = resource.relatedIds
      .flatMap((id) => this.store.resource(id) ?? [])
      .filter((item) => item.available);
    return selected.length
      ? selected
      : this.store.resources
          .filter(
            (item) =>
              item.id !== resource.id &&
              item.subjectId === resource.subjectId &&
              item.available,
          )
          .slice(0, 4);
  });
  protected readonly downloads = computed<readonly ResourceListItem[]>(() => {
    const resource = this.resource();
    if (!resource?.available || resource.kind === 'link') return [];
    return [
      {
        id: resource.video ? 'transcript' : resource.id,
        title: resource.video ? 'Video Transcript & Summary' : resource.title,
        meta: `TXT · ${formatBytes(new TextEncoder().encode(resourceText(resource)).length)}`,
        icon: 'ri-file-text-line',
      },
      ...this.related()
        .filter((item) => item.kind === 'download' || item.kind === 'note')
        .slice(0, 3)
        .map((item) => ({
          id: item.id,
          title: item.title,
          meta: `TXT · ${formatBytes(resourceBytes(item))}`,
          icon: RESOURCE_KINDS[item.kind].icon,
        })),
    ];
  });
  protected readonly lesson = computed(() =>
    LEARNER_LESSONS.find((lesson) => lesson.id === this.resource()?.lessonId),
  );
  private openedId = '';
  private seekToken = 0;
  constructor() {
    effect(() => {
      const resource = this.resource();
      if (this.store.ready() && resource && this.openedId !== resource.id) {
        this.openedId = resource.id;
        this.store.view(resource.id);
        this.position.set(this.store.record(resource.id).position);
        this.seekRequest.set(null);
        this.noteDraft.set('');
        this.editing.set('');
        this.notice.set('');
        this.dialog.set('');
      }
    });
  }
  protected setTab(tab: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab === 'overview' ? null : tab },
      queryParamsHandling: 'merge',
      fragment: tab === 'notes' ? 'resource-notes' : undefined,
    });
  }
  protected progress(position: number): void {
    const resource = this.resource();
    if (resource) {
      this.position.set(position);
      this.store.position(resource.id, position);
    }
  }
  protected seek(seconds: number): void {
    this.seekRequest.set({ seconds, token: ++this.seekToken });
  }
  protected toggle(key: 'saved' | 'liked' | 'completed'): void {
    const resource = this.resource();
    if (resource) this.store.toggle(resource.id, key);
  }
  protected bookmark(): void {
    const resource = this.resource();
    if (resource) {
      this.store.bookmark(resource.id, this.position());
      this.notice.set(
        this.record().bookmark === undefined
          ? 'Bookmark removed.'
          : 'Bookmark saved on this device.',
      );
    }
  }
  protected async download(id: string): Promise<void> {
    const resource =
      id === 'transcript' ? this.resource() : this.store.resource(id);
    if (resource && (await this.store.download(resource, id === 'transcript')))
      this.notice.set(
        'Download started. You can find its history in My Downloads.',
      );
  }
  protected saveNote(event: Event): void {
    event.preventDefault();
    const resource = this.resource();
    if (
      resource &&
      this.store.note(
        resource.id,
        this.noteDraft(),
        resource.video && this.linkNote() ? this.position() : undefined,
        this.editing() || undefined,
      )
    ) {
      this.noteDraft.set('');
      this.editing.set('');
      this.notice.set('Note saved on this device.');
    } else
      this.notice.set(
        'A note needs 1–5,000 characters. Each resource can hold up to 50 notes.',
      );
  }
  protected editNote(id: string): void {
    const note = this.record().notes.find((note) => note.id === id);
    if (note) {
      this.editing.set(id);
      this.noteDraft.set(note.text);
      this.setTab('notes');
    }
  }
  protected deleteNote(): void {
    const resource = this.resource();
    if (resource) this.store.removeNote(resource.id, this.deleteId());
    if (this.editing() === this.deleteId()) {
      this.editing.set('');
      this.noteDraft.set('');
    }
    this.dialog.set('');
  }
  protected exportNotes(): void {
    const resource = this.resource();
    if (resource)
      downloadTextFile(
        this.document,
        `${resource.id}-my-notes.txt`,
        [
          resource.title,
          'MY PERSONAL NOTES',
          ...this.record().notes.flatMap((note) => [
            '',
            `${resourceDate(note.at)}${note.position === undefined ? '' : ` · ${resourceTime(note.position)}`}`,
            note.text,
          ]),
        ].join('\n'),
      );
  }
}
