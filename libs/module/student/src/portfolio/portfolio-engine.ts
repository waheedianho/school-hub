import {
  PortfolioDraft,
  PortfolioFile,
  PortfolioRecord,
  PortfolioTask,
  PortfolioWork,
} from './portfolio.model';
import { PORTFOLIO_RUBRIC } from './portfolio.data';

export const PORTFOLIO_ACCEPT = '.pdf,.docx,.xlsx,.png,.jpg,.jpeg,.txt,.csv';
export const PORTFOLIO_MAX_FILE_SIZE = 10 * 1024 * 1024;
export const PORTFOLIO_MAX_TOTAL_SIZE = 20 * 1024 * 1024;
export const PORTFOLIO_MAX_FILES = 5;
const EXTENSIONS = new Set(PORTFOLIO_ACCEPT.split(','));
export function portfolioExtension(name: string): string {
  return name.slice(name.lastIndexOf('.')).toLowerCase();
}
export function portfolioChecklist(
  work: PortfolioWork,
  files: readonly PortfolioFile[],
  submitted: boolean,
) {
  return [
    {
      id: 'readBrief',
      label: 'Read the task brief',
      checked: work.readBrief,
      automatic: false,
    },
    {
      id: 'planning',
      label: 'Do my research and planning',
      checked: !!work.planning.trim(),
      automatic: true,
    },
    {
      id: 'work',
      label: 'Create my work and evidence',
      checked: !!work.work.trim() || !!files.length,
      automatic: true,
    },
    {
      id: 'reflection',
      label: 'Reflect on what I learned',
      checked: !!work.reflection.trim(),
      automatic: true,
    },
    {
      id: 'reviewed',
      label: 'Check my work against the rubric',
      checked: work.reviewed,
      automatic: false,
    },
    {
      id: 'submitted',
      label: 'Submit my work',
      checked: submitted,
      automatic: true,
    },
  ];
}
export function portfolioProgress(
  work: PortfolioWork,
  files: readonly PortfolioFile[],
  submitted: boolean,
): number {
  return submitted
    ? 100
    : portfolioChecklist(work, files, false)
        .slice(0, 5)
        .filter((step) => step.checked).length * 20;
}
export function portfolioScore(
  scores: readonly number[] | undefined,
): number | undefined {
  if (!scores || scores.length !== PORTFOLIO_RUBRIC.length) return undefined;
  return scores.every(
    (score, index) =>
      Number.isFinite(score) &&
      score >= 0 &&
      score <= PORTFOLIO_RUBRIC[index].max,
  )
    ? scores.reduce((sum, score) => sum + score, 0)
    : undefined;
}
export function portfolioSubmissionErrors(record: PortfolioRecord): string[] {
  const errors: string[] = [];
  if (!record.work.trim() && !record.files.length)
    errors.push('Add your written work or attach at least one file.');
  if (!record.reflection.trim())
    errors.push('Add a short reflection about what you learned.');
  return errors;
}
export function validatePortfolioUploads(
  existing: readonly PortfolioFile[],
  incoming: readonly File[],
) {
  const accepted: File[] = [],
    errors: string[] = [];
  let total = existing.reduce((sum, file) => sum + file.size, 0);
  for (const file of incoming) {
    const reason = !EXTENSIONS.has(portfolioExtension(file.name))
      ? 'Use PDF, DOCX, XLSX, PNG, JPG, TXT, or CSV.'
      : file.name.length > 180
        ? 'Use a file name with at most 180 characters.'
        : !file.size
          ? 'Empty files cannot be attached.'
          : file.size > PORTFOLIO_MAX_FILE_SIZE
            ? 'Each file must be 10 MB or smaller.'
            : existing.length + accepted.length >= PORTFOLIO_MAX_FILES
              ? 'Attach at most 5 files.'
              : total + file.size > PORTFOLIO_MAX_TOTAL_SIZE
                ? 'Keep the combined file size within 20 MB.'
                : [...existing, ...accepted].some(
                      (item) =>
                        item.name === file.name && item.size === file.size,
                    )
                  ? 'This file is already attached.'
                  : '';
    if (reason) errors.push(`${file.name}: ${reason}`);
    else {
      accepted.push(file);
      total += file.size;
    }
  }
  return { accepted, errors };
}
export function readPortfolioDrafts(
  values: unknown,
  tasks: readonly PortfolioTask[],
): PortfolioDraft[] {
  if (!Array.isArray(values) || values.length > tasks.length) return [];
  const ids = new Set<string>();
  const text = (value: unknown, max: number): value is string =>
    typeof value === 'string' && value.length <= max;
  const date = (value: unknown): value is string =>
    typeof value === 'string' && Number.isFinite(Date.parse(value));
  return values.flatMap((value: unknown): PortfolioDraft[] => {
    if (!value || typeof value !== 'object') return [];
    const draft = value as PortfolioDraft;
    const task = tasks.find((task) => task.id === draft.taskId);
    if (
      !task?.available ||
      ['completed', 'submitted'].includes(task.status) ||
      ids.has(task.id)
    )
      return [];
    if (
      !text(draft.planning, 10000) ||
      !text(draft.work, 20000) ||
      !text(draft.reflection, 5000) ||
      !text(draft.note, 2000) ||
      typeof draft.readBrief !== 'boolean' ||
      typeof draft.reviewed !== 'boolean' ||
      !date(draft.startedAt) ||
      !date(draft.updatedAt) ||
      !Number.isFinite(draft.secondsSpent) ||
      draft.secondsSpent < 0 ||
      draft.secondsSpent > 31536000
    )
      return [];
    if (!Array.isArray(draft.files) || draft.files.length > PORTFOLIO_MAX_FILES)
      return [];
    const fileIds = new Set<string>();
    if (
      draft.files.some((file) => {
        if (
          !file ||
          !text(file.id, 100) ||
          !file.id ||
          fileIds.has(file.id) ||
          !text(file.name, 180) ||
          !EXTENSIONS.has(portfolioExtension(file.name)) ||
          !text(file.type, 150) ||
          !date(file.addedAt) ||
          !(file.blob instanceof Blob) ||
          file.size !== file.blob.size ||
          file.size <= 0 ||
          file.size > PORTFOLIO_MAX_FILE_SIZE
        )
          return true;
        fileIds.add(file.id);
        return false;
      }) ||
      draft.files.reduce((sum, file) => sum + file.size, 0) >
        PORTFOLIO_MAX_TOTAL_SIZE
    )
      return [];
    const submission = draft.submission;
    if (
      submission &&
      (!text(submission.id, 100) ||
        !submission.id ||
        !date(submission.submittedAt) ||
        !Number.isInteger(submission.version) ||
        submission.version < 1 ||
        !text(submission.note, 2000))
    )
      return [];
    if (
      submission?.snapshot &&
      (!text(submission.snapshot.work, 20000) ||
        !text(submission.snapshot.planning, 10000) ||
        !text(submission.snapshot.reflection, 5000) ||
        !Array.isArray(submission.snapshot.fileNames) ||
        submission.snapshot.fileNames.length > 5 ||
        submission.snapshot.fileNames.some((name) => !text(name, 180)))
    )
      return [];
    ids.add(task.id);
    return [
      {
        taskId: task.id,
        planning: draft.planning,
        work: draft.work,
        reflection: draft.reflection,
        readBrief: draft.readBrief,
        reviewed: draft.reviewed,
        note: draft.note,
        startedAt: draft.startedAt,
        updatedAt: draft.updatedAt,
        secondsSpent: draft.secondsSpent,
        files: draft.files.map((file) => ({
          id: file.id,
          name: file.name,
          size: file.size,
          type: file.type,
          addedAt: file.addedAt,
          blob: file.blob,
        })),
        submission: submission
          ? {
              id: submission.id,
              submittedAt: submission.submittedAt,
              version: submission.version,
              note: submission.note,
              snapshot: submission.snapshot,
            }
          : undefined,
      },
    ];
  });
}
