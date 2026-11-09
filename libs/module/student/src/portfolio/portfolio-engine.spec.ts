import { LEARNER_PORTFOLIO_TASKS } from './portfolio.data';
import {
  PortfolioDraft,
  PortfolioFile,
  PortfolioRecord,
} from './portfolio.model';
import {
  PORTFOLIO_MAX_FILE_SIZE,
  portfolioProgress,
  portfolioScore,
  portfolioSubmissionErrors,
  readPortfolioDrafts,
  validatePortfolioUploads,
} from './portfolio-engine';

const source = LEARNER_PORTFOLIO_TASKS.find(
  (task) => task.id === 'market-price-comparison',
);
if (!source) throw new Error('Missing portfolio fixture');
const file = new File(['My price comparison'], 'prices.txt', {
  type: 'text/plain',
});
const attachment: PortfolioFile = {
  id: 'file-1',
  name: file.name,
  type: file.type,
  size: file.size,
  blob: file,
  addedAt: '2026-11-04T12:00:00Z',
};
const draft: PortfolioDraft = {
  taskId: source.id,
  ...source.initialWork,
  files: [attachment],
  note: '',
  updatedAt: '2026-11-04T12:00:00Z',
  startedAt: source.startedAt,
  secondsSpent: 120,
};

describe('portfolio progress and submission rules', () => {
  it('derives preparation progress from actual work and evidence', () => {
    expect(portfolioProgress(source.initialWork, [], false)).toBe(40);
    expect(portfolioProgress(source.initialWork, [attachment], false)).toBe(60);
    expect(
      portfolioProgress(
        { ...source.initialWork, reflection: 'I learned to compare prices.' },
        [attachment],
        false,
      ),
    ).toBe(80);
    expect(
      portfolioProgress(
        { ...source.initialWork, reflection: 'My reflection', reviewed: true },
        [attachment],
        false,
      ),
    ).toBe(100);
    expect(portfolioProgress(source.initialWork, [], true)).toBe(100);
  });
  it('requires work or evidence and a reflection before submission', () => {
    const record: PortfolioRecord = {
      ...source,
      ...source.initialWork,
      files: [],
      note: '',
      progress: 40,
    };
    expect(portfolioSubmissionErrors(record)).toHaveLength(2);
    expect(
      portfolioSubmissionErrors({
        ...record,
        files: [attachment],
        reflection: 'I learned to compare unit prices.',
      }),
    ).toEqual([]);
    expect(
      portfolioSubmissionErrors({
        ...record,
        work: 'My findings',
        reflection: 'My reflection',
      }),
    ).toEqual([]);
  });
  it('uses valid tutor scores without inventing a grade for unassessed work', () => {
    expect(portfolioScore([18, 21, 17, 13, 17])).toBe(86);
    expect(portfolioScore(undefined)).toBeUndefined();
    expect(portfolioScore([20, 25, 20, 15, 21])).toBeUndefined();
    expect(portfolioScore([20, 25])).toBeUndefined();
  });
});
describe('portfolio file validation', () => {
  it('accepts supported non-empty files and rejects duplicates', () => {
    expect(validatePortfolioUploads([], [file]).accepted).toEqual([file]);
    expect(validatePortfolioUploads([attachment], [file]).errors[0]).toContain(
      'already attached',
    );
  });
  it('rejects unsupported, empty, oversized, and excess files', () => {
    const incoming = [
      new File(['<script>test</script>'], 'work.html'),
      new File([], 'empty.txt'),
      new File([new Uint8Array(PORTFOLIO_MAX_FILE_SIZE + 1)], 'large.pdf'),
    ];
    expect(validatePortfolioUploads([], incoming).accepted).toEqual([]);
    expect(validatePortfolioUploads([], incoming).errors).toHaveLength(3);
    const many = Array.from(
      { length: 6 },
      (_, index) => new File(['work'], `work-${index}.txt`),
    );
    expect(validatePortfolioUploads([], many).accepted).toHaveLength(5);
  });
  it('enforces a combined 20 MB limit', () => {
    const existing = { ...attachment, size: 20 * 1024 * 1024 };
    expect(validatePortfolioUploads([existing], [file]).errors[0]).toContain(
      '20 MB',
    );
  });
});
describe('portfolio saved work validation', () => {
  it('restores draft text and the actual attachment blob', () => {
    const restored = readPortfolioDrafts([draft], LEARNER_PORTFOLIO_TASKS);
    expect(restored).toEqual([{ ...draft, submission: undefined }]);
    expect(restored[0].files[0].blob).toBe(file);
  });
  it('restores an immutable submission snapshot and drops duplicate task records', () => {
    const submitted = {
      ...draft,
      submission: {
        id: 'portfolio-test',
        submittedAt: '2026-11-04T13:00:00Z',
        version: 1,
        note: 'My evidence',
        snapshot: {
          planning: draft.planning,
          work: 'My findings',
          reflection: 'My learning',
          fileNames: ['prices.txt'],
        },
      },
    };
    expect(
      readPortfolioDrafts([submitted, submitted], LEARNER_PORTFOLIO_TASKS),
    ).toEqual([submitted]);
  });
  it('rejects malformed text, files, timestamps, and protected sample records', () => {
    for (const change of [
      { taskId: 'missing' },
      { taskId: 'lcm-portfolio' },
      { taskId: 'personal-dictionary' },
      { work: 42 },
      { reflection: 'x'.repeat(5001) },
      { secondsSpent: -1 },
      { updatedAt: 'invalid' },
      { files: [{ ...attachment, size: 0 }] },
      {
        submission: { id: 'bad', submittedAt: 'invalid', version: 1, note: '' },
      },
    ])
      expect(
        readPortfolioDrafts([{ ...draft, ...change }], LEARNER_PORTFOLIO_TASKS),
      ).toEqual([]);
    expect(readPortfolioDrafts('corrupt', LEARNER_PORTFOLIO_TASKS)).toEqual([]);
  });
});
