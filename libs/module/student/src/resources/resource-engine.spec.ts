import { convertToParamMap } from '@angular/router';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { LEARNER_SUBJECTS } from '../data/subject-catalog.data';
import { LEARNER_RESOURCES } from './resources.data';
import {
  emptyResourceRecord,
  filterResources,
  formatBytes,
  readResourceState,
  resourceBackQuery,
  resourceBytes,
  resourceText,
  resourceTime,
} from './resource-engine';
import { ResourceState } from './resource.model';

const empty: ResourceState = { records: [], downloads: [] };
const video = LEARNER_RESOURCES.find(
  (resource) => resource.id === 'parts-of-speech',
);
if (!video?.video) throw new Error('Missing sample video');
const scope = (query: Record<string, string>, state = empty) =>
  filterResources(LEARNER_RESOURCES, convertToParamMap(query), state);

describe('resource catalog and filtering', () => {
  it('keeps every resource, curriculum link, and related destination valid', () => {
    expect(new Set(LEARNER_RESOURCES.map((resource) => resource.id)).size).toBe(
      LEARNER_RESOURCES.length,
    );
    for (const resource of LEARNER_RESOURCES) {
      expect(
        LEARNER_SUBJECTS.some((subject) => subject.id === resource.subjectId),
      ).toBe(true);
      if (resource.lessonId)
        expect(
          LEARNER_LESSONS.some((lesson) => lesson.id === resource.lessonId),
        ).toBe(true);
      for (const id of resource.relatedIds)
        expect(LEARNER_RESOURCES.some((item) => item.id === id)).toBe(true);
      if (resource.video) {
        expect(resource.video.chapters[0].start).toBe(0);
        expect(
          resource.video.chapters.every(
            (chapter, index) =>
              chapter.start === index * 15 &&
              chapter.start < (resource.video?.duration ?? 0),
          ),
        ).toBe(true);
        expect(resource.video.bytes).toBeGreaterThan(0);
      }
      if (resource.externalUrl)
        expect(new URL(resource.externalUrl).protocol).toBe('https:');
    }
  });
  it('combines subject, term, category, search, and existing dashboard topic links', () => {
    const matches = scope({
      subjectId: 'mathematics',
      type: 'note',
      topicId: 'place-value',
      q: 'value',
    });
    expect(matches.map((resource) => resource.id)).toEqual(
      expect.arrayContaining(['place-value-notes', 'whole-numbers-notes']),
    );
    expect(
      matches.every(
        (resource) =>
          resource.kind === 'note' && resource.subjectId === 'mathematics',
      ),
    ).toBe(true);
    expect(
      scope({ topicId: 'number-ordering' }).map((item) => item.id),
    ).toContain('number-ordering');
    expect(
      scope({ topicId: 'comparing-numbers' }).map((item) => item.id),
    ).toContain('comparing-numbers');
    expect(
      scope({ lessonId: 'whole-numbers' }).every(
        (item) => item.lessonId === 'whole-numbers',
      ),
    ).toBe(true);
    expect(
      scope({ term: 'third' }).some(
        (item) => item.id === 'letter-writing-format',
      ),
    ).toBe(false);
    expect(scope({ q: 'no matching topic' })).toEqual([]);
    expect(scope({ lessonId: 'unknown' })).toEqual([]);
  });
  it('sorts resources without mutating the source catalog', () => {
    const original = LEARNER_RESOURCES.map((item) => item.id);
    expect(scope({})[0].id).toBe('direct-indirect-speech');
    const alphabetical = scope({ sort: 'title' }).map((item) => item.title);
    expect(alphabetical).toEqual(
      [...alphabetical].sort((a, b) => a.localeCompare(b)),
    );
    expect(LEARNER_RESOURCES.map((item) => item.id)).toEqual(original);
  });
  it('keeps saved resources, zero-second bookmarks, viewed items, and downloads distinct', () => {
    const state: ResourceState = {
      records: [
        { ...emptyResourceRecord('parts-of-speech'), saved: true, bookmark: 0 },
        { ...emptyResourceRecord('place-value-notes'), viewedAt: 2 },
      ],
      downloads: [
        {
          resourceId: 'noun-worksheets',
          name: 'noun-worksheets.txt',
          bytes: 200,
          at: 3,
        },
      ],
    };
    expect(
      scope({ collection: 'saved' }, state).map((item) => item.id),
    ).toEqual(['parts-of-speech']);
    expect(
      scope({ collection: 'bookmarks' }, state).map((item) => item.id),
    ).toEqual(['parts-of-speech']);
    expect(
      scope({ collection: 'recent' }, state).map((item) => item.id),
    ).toEqual(['place-value-notes']);
    expect(
      scope({ collection: 'downloads' }, state).map((item) => item.id),
    ).toEqual(['noun-worksheets']);
    expect(
      scope({ collection: 'saved', subjectId: 'mathematics' }, state),
    ).toEqual([]);
  });
});
describe('resource work recovery and downloads', () => {
  it('exports real lesson text and derives file metadata without claiming invented pages', () => {
    const note = LEARNER_RESOURCES.find(
      (item) => item.id === 'place-value-notes',
    );
    if (!note) throw new Error('Missing note');
    const text = resourceText(note);
    expect(text).toContain('4,268 = 4,000 + 200 + 60 + 8');
    expect(resourceBytes(note)).toBe(new TextEncoder().encode(text).length);
    expect(resourceBytes(video)).toBe(video.video?.bytes);
    expect(resourceTime(150)).toBe('2:30');
    expect(resourceTime(NaN)).toBe('0:00');
    expect(formatBytes(1024)).toBe('1.0 KB');
  });
  it('bounds saved work and rejects malformed IDs, duplicate notes, and unsafe filenames', () => {
    const raw = JSON.stringify({
      version: 1,
      records: [
        {
          resourceId: video.id,
          saved: true,
          liked: true,
          completed: true,
          position: 99999,
          bookmark: 99999,
          notes: [
            { id: 'note-1', text: 'n'.repeat(5001), at: 1, position: 99999 },
            { id: 'note-1', text: 'duplicate', at: 1 },
            { id: '<bad>', text: 'invalid', at: 1 },
          ],
        },
        { resourceId: video.id },
        { resourceId: 'unknown' },
      ],
      downloads: [
        { resourceId: video.id, name: '../bad.mp4', bytes: 20, at: 2 },
        { resourceId: video.id, name: 'video.mp4', bytes: 200, at: 3 },
      ],
    });
    const state = readResourceState(raw, LEARNER_RESOURCES);
    expect(state.records).toHaveLength(1);
    expect(state.records[0]).toMatchObject({
      saved: true,
      liked: true,
      completed: true,
      position: 150,
      bookmark: 150,
    });
    expect(state.records[0].notes).toHaveLength(1);
    expect(state.records[0].notes[0].text).toHaveLength(5000);
    expect(state.records[0].notes[0].position).toBe(150);
    expect(state.downloads).toEqual([
      { resourceId: video.id, name: 'video.mp4', bytes: 200, at: 3 },
    ]);
  });
  it('recovers from corrupt or unsupported storage and refuses locked completion', () => {
    for (const raw of [
      null,
      '{',
      '{}',
      '{"version":2,"records":[],"downloads":[]}',
    ])
      expect(readResourceState(raw, LEARNER_RESOURCES)).toEqual(empty);
    const restored = readResourceState(
      JSON.stringify({
        version: 1,
        records: [{ resourceId: 'lcm-preview', completed: true }],
        downloads: [
          { resourceId: 'lcm-preview', name: 'lcm.txt', bytes: 10, at: 1 },
        ],
      }),
      LEARNER_RESOURCES,
    );
    expect(restored.records[0].completed).toBe(false);
    expect(restored.downloads).toEqual([]);
  });
  it('preserves library filters and only validated learner return context', () => {
    expect(
      resourceBackQuery(
        convertToParamMap({
          type: 'video',
          subjectId: 'english-language',
          collection: 'saved',
          page: '2',
          q: 'speech',
          tab: 'notes',
          menu: 'parts-of-speech',
          resourceId: 'parts-of-speech',
          feedbackReturn: '/student/feedback?subjectId=english-language',
          progressReturn: 'https://example.com/',
        }),
      ),
    ).toEqual({
      type: 'video',
      subjectId: 'english-language',
      collection: 'saved',
      page: '2',
      q: 'speech',
      feedbackReturn: '/student/feedback?subjectId=english-language',
    });
  });
});
