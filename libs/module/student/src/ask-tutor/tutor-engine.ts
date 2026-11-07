import { tutorSubject } from './tutor-context';
import { TUTOR_SAMPLES } from './tutor.data';
import {
  TutorContextRef,
  TutorDraft,
  TutorFile,
  TutorMessage,
  TutorQuestion,
  TutorState,
} from './tutor.model';
export const TUTOR_MAX_TEXT = 2000;
export const TUTOR_MAX_FILE = 2 * 1024 * 1024;
export const TUTOR_MAX_STORAGE = 20 * 1024 * 1024;
export function initialTutorState(): TutorState {
  return { questions: [], drafts: [], ratings: {} };
}
const validId = (value: unknown): value is string =>
  typeof value === 'string' && /^[\w:-]{1,240}$/.test(value);
const validReference = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length > 0 &&
  value.length <= 500 &&
  Array.from(value).every(
    (character) =>
      character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127,
  );
const validTime = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value > 0 &&
  value <= 8640000000000000;
export function validTutorFile(file: File | TutorFile): boolean {
  return (
    file.size > 0 &&
    file.size <= TUTOR_MAX_FILE &&
    ((/\.(png|jpe?g|webp)$/i.test(file.name) &&
      ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) ||
      (/\.pdf$/i.test(file.name) && file.type === 'application/pdf') ||
      (/\.txt$/i.test(file.name) && ['text/plain', ''].includes(file.type)))
  );
}
export function tutorUploadError(
  files: readonly TutorFile[],
  file: File,
  allBytes: number,
): string | undefined {
  return !validTutorFile(file)
    ? `${file.name}: use a non-empty PNG, JPEG, WebP, PDF, or TXT file of at most 2 MB.`
    : files.length >= 3
      ? 'Attach at most three files to a message.'
      : allBytes + file.size > TUTOR_MAX_STORAGE
        ? 'Local tutor attachments are limited to 20 MB. Remove an attachment or download and delete an old local question.'
        : files.some(
              (item) => item.name === file.name && item.size === file.size,
            )
          ? `${file.name} is already attached.`
          : undefined;
}
function readFiles(value: unknown): TutorFile[] {
  if (!Array.isArray(value)) return [];
  const ids = new Set<string>();
  return value.slice(0, 3).flatMap((file) => {
    if (
      !file ||
      !validId(file.id) ||
      ids.has(file.id) ||
      typeof file.name !== 'string' ||
      file.name.length > 200 ||
      typeof file.type !== 'string' ||
      !(file.blob instanceof Blob) ||
      file.blob.size !== file.size ||
      file.blob.type !== file.type ||
      !validTutorFile(file)
    )
      return [];
    ids.add(file.id);
    return [
      {
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        blob: file.blob,
      },
    ];
  });
}
function readContext(value: unknown): TutorContextRef | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const ref = value as TutorContextRef;
  if (
    ![
      'subject',
      'lesson',
      'worksheet',
      'portfolio',
      'assessment',
      'feedback',
      'resource-request',
      'live-class-support',
    ].includes(ref.type)
  )
    return undefined;
  return {
    type: ref.type,
    ...(validId(ref.id) ? { id: ref.id } : {}),
    ...(validReference(ref.questionId) ? { questionId: ref.questionId } : {}),
  };
}
export function readTutorState(raw: unknown): TutorState {
  const initial = initialTutorState();
  if (!raw || typeof raw !== 'object') return initial;
  const data = raw as {
    version?: number;
    questions?: unknown[];
    drafts?: unknown[];
    ratings?: Record<string, unknown>;
  };
  if (data.version !== 1) return initial;
  let bytes = 0;
  const boundedFiles = (value: unknown) =>
    readFiles(value).filter((file) => {
      bytes += file.size;
      return bytes <= TUTOR_MAX_STORAGE;
    });
  const ids = new Set<string>();
  const questions: TutorQuestion[] = [];
  for (const candidate of Array.isArray(data.questions)
    ? data.questions.slice(0, 20)
    : []) {
    if (!candidate || typeof candidate !== 'object') continue;
    const item = candidate as TutorQuestion;
    if (
      !validId(item.id) ||
      !item.id.startsWith('local-') ||
      ids.has(item.id) ||
      !tutorSubject(item.subjectId) ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 120 ||
      !validTime(item.createdAt) ||
      !Array.isArray(item.messages)
    )
      continue;
    ids.add(item.id);
    const messageIds = new Set<string>();
    const messages: TutorMessage[] = item.messages
      .slice(0, 40)
      .flatMap((message) => {
        if (
          !message ||
          !validId(message.id) ||
          messageIds.has(message.id) ||
          typeof message.text !== 'string' ||
          message.text.length > TUTOR_MAX_TEXT ||
          !validTime(message.at)
        )
          return [];
        const files = boundedFiles(message.files);
        if (!message.text.trim() && !files.length) return [];
        messageIds.add(message.id);
        return [{ id: message.id, text: message.text, at: message.at, files }];
      });
    const sample = TUTOR_SAMPLES.find(
      (sample) =>
        sample.id === item.sampleId && sample.subjectId === item.subjectId,
    );
    if (messages.length)
      questions.push({
        id: item.id,
        subjectId: item.subjectId,
        title: item.title,
        createdAt: item.createdAt,
        ...(sample ? { sampleId: sample.id } : {}),
        context: readContext(item.context),
        messages,
      });
  }
  const drafts: TutorDraft[] = [];
  const keys = new Set<string>();
  for (const candidate of Array.isArray(data.drafts)
    ? data.drafts.slice(0, 50)
    : []) {
    if (!candidate || typeof candidate !== 'object') continue;
    const draft = candidate as TutorDraft;
    if (
      !validReference(draft.key) ||
      !/^(new:(mathematics|english-language|basic-science):|reply:[\w-]+$)/.test(
        draft.key,
      ) ||
      keys.has(draft.key) ||
      typeof draft.text !== 'string'
    )
      continue;
    keys.add(draft.key);
    drafts.push({
      key: draft.key,
      text: draft.text.slice(0, TUTOR_MAX_TEXT),
      files: boundedFiles(draft.files),
    });
  }
  const ratings: Record<string, 'helpful' | 'unhelpful'> = {};
  for (const sample of TUTOR_SAMPLES) {
    const value = data.ratings?.[sample.id];
    if (value === 'helpful' || value === 'unhelpful')
      ratings[sample.id] = value;
  }
  return { questions, drafts, ratings };
}
export function tutorDate(at: number, timeOnly = false): string {
  return new Date(at).toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
    ...(timeOnly
      ? ({ hour: '2-digit', minute: '2-digit' } as const)
      : ({ day: 'numeric', month: 'short', year: 'numeric' } as const)),
  });
}
export function tutorBytes(state: TutorState): number {
  return [
    ...state.drafts.flatMap((item) => item.files),
    ...state.questions.flatMap((item) =>
      item.messages.flatMap((message) => message.files),
    ),
  ].reduce((sum, item) => sum + item.size, 0);
}
