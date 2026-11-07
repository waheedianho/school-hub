import {
  Injectable,
  afterNextRender,
  inject,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LearnerProfileStore } from '../data/learner-profile-store';
import { downloadBlob } from '@school-hub/ui-elements';
import { LEARNER_RESOURCES } from './resources.data';
import {
  emptyResourceRecord,
  readResourceState,
  resourceText,
} from './resource-engine';
import {
  LearnerResource,
  ResourceRecord,
  ResourceState,
} from './resource.model';

export const RESOURCE_STORAGE_KEY = 'school-hub:resources:v1';
@Injectable({ providedIn: 'root' })
export class ResourceStore {
  private readonly profile = inject(LearnerProfileStore);
  readonly connectionPrompt = signal<{
    resourceId: string;
    transcript: boolean;
    reason: 'wifi-required' | 'unavailable';
  } | null>(null);
  readonly resources = LEARNER_RESOURCES;
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly state = signal<ResourceState>({ records: [], downloads: [] });
  readonly downloading = signal('');
  readonly error = signal('');
  readonly estimate = signal<{ usage: number; quota: number } | null>(null);
  readonly ownBytes = computed(
    () =>
      new TextEncoder().encode(JSON.stringify({ version: 1, ...this.state() }))
        .length,
  );
  private readonly document = inject(DOCUMENT);
  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const restore = () => {
        try {
          this.state.set(
            readResourceState(
              localStorage.getItem(RESOURCE_STORAGE_KEY),
              this.resources,
            ),
          );
          this.persistent.set(true);
        } catch {
          this.persistent.set(false);
        }
      };
      restore();
      this.ready.set(true);
      void this.measure();
      const storage = (event: StorageEvent) => {
        if (event.key === RESOURCE_STORAGE_KEY || event.key === null) restore();
      };
      window.addEventListener('storage', storage);
      destroy.onDestroy(() => window.removeEventListener('storage', storage));
    });
  }
  resource(id: string) {
    return this.resources.find((resource) => resource.id === id);
  }
  record(id: string): ResourceRecord {
    return (
      this.state().records.find((record) => record.resourceId === id) ??
      emptyResourceRecord(id)
    );
  }
  view(id: string): void {
    this.update(id, (record) => ({ ...record, viewedAt: Date.now() }));
  }
  toggle(id: string, key: 'saved' | 'liked' | 'completed'): void {
    if (key === 'completed' && !this.resource(id)?.available) return;
    this.update(id, (record) => ({ ...record, [key]: !record[key] }));
  }
  position(id: string, position: number): void {
    const duration = this.resource(id)?.video?.duration ?? 0;
    if (!Number.isFinite(position) || position < 0 || !duration) return;
    if (
      Math.abs(this.record(id).position - position) < 2 &&
      position < duration - 1
    )
      return;
    this.update(id, (record) => ({
      ...record,
      position: Math.min(duration, position),
    }));
  }
  bookmark(id: string, position = 0): void {
    this.update(id, (record) => ({
      ...record,
      bookmark:
        record.bookmark !== undefined
          ? undefined
          : Math.max(
              0,
              Math.min(this.resource(id)?.video?.duration ?? 0, position),
            ),
    }));
  }
  note(id: string, text: string, position?: number, noteId?: string): boolean {
    if (
      !this.ready() ||
      !text.trim() ||
      text.length > 5000 ||
      !this.resource(id)?.available ||
      (!noteId && this.record(id).notes.length >= 50) ||
      (!!noteId && !this.record(id).notes.some((note) => note.id === noteId))
    )
      return false;
    this.update(id, (record) => ({
      ...record,
      notes: noteId
        ? record.notes.map((note) =>
            note.id === noteId ? { ...note, text: text.trim() } : note,
          )
        : [
            ...record.notes,
            {
              id: crypto.randomUUID(),
              text: text.trim(),
              at: Date.now(),
              position:
                position === undefined
                  ? undefined
                  : Math.min(
                      this.resource(id)?.video?.duration ?? 0,
                      Math.max(0, position),
                    ),
            },
          ],
    }));
    return true;
  }
  removeNote(id: string, noteId: string): void {
    this.update(id, (record) => ({
      ...record,
      notes: record.notes.filter((note) => note.id !== noteId),
    }));
  }
  clear(kind: 'downloads' | 'all'): void {
    if (!this.ready()) return;
    this.state.update((state) => ({
      records: kind === 'all' ? [] : state.records,
      downloads: [],
    }));
    this.save();
  }
  async download(
    resource: LearnerResource,
    transcript = false,
    connectionApproved = false,
  ): Promise<boolean> {
    if (
      !this.ready() ||
      !resource.available ||
      resource.kind === 'link' ||
      this.downloading()
    )
      return false;
    const policy = this.profile.downloadPolicy();
    if (!connectionApproved && policy !== 'allow') {
      this.error.set('');
      this.connectionPrompt.set({
        resourceId: resource.id,
        transcript,
        reason: policy,
      });
      return false;
    }
    this.downloading.set(resource.id);
    this.error.set('');
    try {
      const video = resource.video && !transcript;
      let blob: Blob;
      const name = `${resource.id}${transcript ? '-transcript' : ''}.${video ? 'mp4' : 'txt'}`;
      if (video) {
        const response = await fetch(resource.video?.src ?? '');
        if (!response.ok) throw new Error('Video download failed');
        blob = await response.blob();
        if (!blob.size || !blob.type.startsWith('video/'))
          throw new Error('Video unavailable');
      } else
        blob = new Blob([resourceText(resource)], {
          type: 'text/plain;charset=utf-8',
        });
      if (!downloadBlob(this.document, name, blob)) return false;
      this.state.update((state) => ({
        ...state,
        downloads: [
          ...state.downloads,
          { resourceId: resource.id, name, bytes: blob.size, at: Date.now() },
        ].slice(-200),
      }));
      this.save();
      return true;
    } catch {
      this.error.set(
        'The resource could not be downloaded. Check your connection and try again.',
      );
      return false;
    } finally {
      this.downloading.set('');
    }
  }
  async measure(): Promise<void> {
    try {
      const value = await navigator.storage?.estimate();
      if (value?.quota && value.usage !== undefined)
        this.estimate.set({ usage: value.usage, quota: value.quota });
    } catch {
      this.estimate.set(null);
    }
  }
  async approveConnectionOnce(): Promise<void> {
    const request = this.connectionPrompt();
    if (!request || request.reason !== 'unavailable') return;
    this.connectionPrompt.set(null);
    const resource = this.resource(request.resourceId);
    if (resource) await this.download(resource, request.transcript, true);
  }
  private update(
    id: string,
    change: (record: ResourceRecord) => ResourceRecord,
  ): void {
    if (!this.ready() || !this.resource(id)) return;
    const next = change(this.record(id));
    this.state.update((state) => ({
      ...state,
      records: [
        ...state.records.filter((record) => record.resourceId !== id),
        next,
      ],
    }));
    this.save();
  }
  private save(): void {
    try {
      localStorage.setItem(
        RESOURCE_STORAGE_KEY,
        JSON.stringify({ version: 1, ...this.state() }),
      );
      this.persistent.set(true);
    } catch {
      this.persistent.set(false);
    }
  }
}
