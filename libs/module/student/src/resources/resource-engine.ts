import { ParamMap, Params } from '@angular/router';
import { feedbackReturn } from '../data/feedback-context';
import { progressReturn } from '../data/progress-context';
import {
  LearnerResource,
  ResourceRecord,
  ResourceState,
} from './resource.model';
import { resourceSubject } from './resources.data';

export function formatBytes(bytes: number): string {
  return bytes < 1024
    ? `${Math.max(0, Math.round(bytes))} B`
    : bytes < 1048576
      ? `${(bytes / 1024).toFixed(1)} KB`
      : bytes < 1073741824
        ? `${(bytes / 1048576).toFixed(1)} MB`
        : `${(bytes / 1073741824).toFixed(1)} GB`;
}
export function resourceTime(seconds: number): string {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}
export function resourceText(resource: LearnerResource): string {
  return [
    resource.title,
    resourceSubject(resource),
    'SchoolHub original sample learning material · JSS 1 (Basic 7)',
    '',
    resource.description,
    ...resource.sections.flatMap((section, index) => [
      '',
      `${resource.video ? resourceTime(resource.video.chapters[index]?.start ?? 0) + ' · ' : ''}${section.title.toUpperCase()}`,
      ...section.paragraphs,
    ]),
    '',
    'Keep your own working and review the related lesson.',
  ].join('\n');
}
export function resourceBytes(resource: LearnerResource): number {
  return (
    resource.video?.bytes ??
    (resource.kind === 'link'
      ? 0
      : new TextEncoder().encode(resourceText(resource)).length)
  );
}
export function resourceBackQuery(params: ParamMap): Params {
  const result: Params = {};
  for (const key of [
    'type',
    'q',
    'subjectId',
    'term',
    'sort',
    'collection',
    'topicId',
    'lessonId',
    'page',
    'expanded',
    'featuredPage',
  ]) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  const feedback = feedbackReturn(params),
    progress = progressReturn(params);
  if (feedback) result['feedbackReturn'] = feedback;
  if (progress) result['progressReturn'] = progress;
  return result;
}
export function emptyResourceRecord(resourceId: string): ResourceRecord {
  return {
    resourceId,
    saved: false,
    liked: false,
    completed: false,
    position: 0,
    notes: [],
  };
}
export function filterResources(
  resources: readonly LearnerResource[],
  params: ParamMap,
  state: ResourceState,
): LearnerResource[] {
  const text = (params.get('q') ?? '').trim().toLowerCase();
  const type = params.get('type'),
    subject = params.get('subjectId'),
    term = params.get('term'),
    topic = params.get('topicId'),
    lesson = params.get('lessonId'),
    collection = params.get('collection');
  const records = new Map(
    state.records.map((record) => [record.resourceId, record]),
  );
  const downloads = new Map(
    state.downloads.map((item) => [item.resourceId, item.at]),
  );
  return resources
    .filter((item) => {
      const record = records.get(item.id);
      return (
        (!type || type === 'all' || item.kind === type) &&
        (!subject || item.subjectId === subject) &&
        (!term ||
          term === 'all' ||
          item.term === 'all' ||
          item.term === term) &&
        (!topic || item.topicIds.includes(topic)) &&
        (!lesson || item.lessonId === lesson) &&
        (!text ||
          `${item.title} ${item.description} ${resourceSubject(item)} ${item.topicIds.join(' ')}`
            .toLowerCase()
            .includes(text)) &&
        (collection === 'saved'
          ? record?.saved
          : collection === 'bookmarks'
            ? record?.bookmark !== undefined
            : collection === 'recent'
              ? !!record?.viewedAt
              : collection === 'downloads'
                ? downloads.has(item.id)
                : true)
      );
    })
    .sort((a, b) => {
      if (collection === 'recent')
        return (
          (records.get(b.id)?.viewedAt ?? 0) -
          (records.get(a.id)?.viewedAt ?? 0)
        );
      if (collection === 'downloads')
        return (downloads.get(b.id) ?? 0) - (downloads.get(a.id) ?? 0);
      const sort = params.get('sort');
      return sort === 'title'
        ? a.title.localeCompare(b.title)
        : sort === 'oldest'
          ? Date.parse(a.addedAt) - Date.parse(b.addedAt)
          : Date.parse(b.addedAt) - Date.parse(a.addedAt);
    });
}
export function readResourceState(
  raw: string | null,
  resources: readonly LearnerResource[],
): ResourceState {
  const empty: ResourceState = { records: [], downloads: [] };
  try {
    const data = JSON.parse(raw ?? 'null');
    if (
      data?.version !== 1 ||
      !Array.isArray(data.records) ||
      data.records.length > 200 ||
      !Array.isArray(data.downloads) ||
      data.downloads.length > 200
    )
      return empty;
    const seen = new Set<string>();
    const finite = (value: unknown): value is number =>
      typeof value === 'number' && Number.isFinite(value) && value >= 0;
    const records: ResourceRecord[] = data.records.flatMap((item: unknown) => {
      if (!item || typeof item !== 'object') return [];
      const value = item as Record<string, unknown>,
        resource = resources.find(
          (resource) => resource.id === value['resourceId'],
        );
      if (!resource || seen.has(resource.id)) return [];
      seen.add(resource.id);
      const duration = resource.video?.duration ?? 0;
      const noteIds = new Set<string>();
      return [
        {
          ...emptyResourceRecord(resource.id),
          saved: value['saved'] === true,
          liked: value['liked'] === true,
          completed: resource.available && value['completed'] === true,
          viewedAt: finite(value['viewedAt']) ? value['viewedAt'] : undefined,
          position: finite(value['position'])
            ? Math.min(duration, value['position'])
            : 0,
          bookmark: finite(value['bookmark'])
            ? Math.min(duration, value['bookmark'])
            : undefined,
          notes: Array.isArray(value['notes'])
            ? value['notes'].slice(0, 50).flatMap((item: unknown) => {
                if (!item || typeof item !== 'object') return [];
                const note = item as Record<string, unknown>;
                if (
                  typeof note['id'] !== 'string' ||
                  !/^[\w-]{1,100}$/.test(note['id']) ||
                  noteIds.has(note['id']) ||
                  typeof note['text'] !== 'string' ||
                  !note['text'].trim() ||
                  !finite(note['at'])
                )
                  return [];
                noteIds.add(note['id']);
                return [
                  {
                    id: note['id'],
                    text: note['text'].slice(0, 5000),
                    at: note['at'],
                    position: finite(note['position'])
                      ? Math.min(duration, note['position'])
                      : undefined,
                  },
                ];
              })
            : [],
        },
      ];
    });
    const downloads = data.downloads.flatMap((item: unknown) => {
      if (!item || typeof item !== 'object') return [];
      const value = item as Record<string, unknown>;
      const resource = resources.find(
        (resource) => resource.id === value['resourceId'],
      );
      return resource?.available &&
        resource.kind !== 'link' &&
        typeof value['name'] === 'string' &&
        /^[\w.-]{1,150}$/.test(value['name']) &&
        finite(value['bytes']) &&
        value['bytes'] <= 100000000 &&
        finite(value['at'])
        ? [
            {
              resourceId: resource.id,
              name: value['name'],
              bytes: value['bytes'],
              at: value['at'],
            },
          ]
        : [];
    });
    return { records, downloads };
  } catch {
    return empty;
  }
}
