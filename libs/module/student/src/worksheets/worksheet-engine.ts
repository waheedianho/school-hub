import {
  LearnerWorksheet,
  WorksheetDraft,
  WorksheetRecord,
  WrittenQuestion,
} from './worksheet.model';

export function worksheetSections(worksheet: WorksheetRecord) {
  const sections = new Map<
    string,
    {
      title: string;
      questions: { question: WrittenQuestion; index: number }[];
      answered: number;
    }
  >();
  worksheet.questions.forEach((question, index) => {
    const section = sections.get(question.section) ?? {
      title: question.section,
      questions: [],
      answered: 0,
    };
    section.questions.push({ question, index });
    if (worksheet.answers[index]?.trim()) section.answered++;
    sections.set(question.section, section);
  });
  return [...sections.values()];
}

export function isWrittenAnswerCorrect(
  question: WrittenQuestion,
  value: string,
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (question.kind === 'number' || question.kind === 'long') {
    const numeric = trimmed.replace(/,/g, '');
    return (
      /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(numeric) &&
      Number(numeric) === Number(question.answer)
    );
  }
  const normalise = (answer: string) =>
    answer
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.!?]+$/, '');
  return [question.answer, ...(question.alternatives ?? [])].some(
    (answer) => normalise(answer) === normalise(trimmed),
  );
}
export function gradeWorksheet(
  worksheet: LearnerWorksheet,
  answers: readonly string[],
) {
  const answered = worksheet.questions.filter(
    (_, index) => !!answers[index]?.trim(),
  ).length;
  const correct = worksheet.questions.filter((question, index) =>
    isWrittenAnswerCorrect(question, answers[index] ?? ''),
  ).length;
  return {
    answered,
    correct,
    percentage: worksheet.questions.length
      ? Math.round((correct / worksheet.questions.length) * 100)
      : 0,
    marks: worksheet.questions.length
      ? Math.round(
          (correct / worksheet.questions.length) * worksheet.totalMarks * 100,
        ) / 100
      : 0,
  };
}
export function readWorksheetDrafts(
  raw: string | null,
  worksheets: readonly LearnerWorksheet[],
): WorksheetDraft[] {
  try {
    const data = JSON.parse(raw ?? 'null');
    if (
      data?.version !== 1 ||
      !Array.isArray(data.drafts) ||
      data.drafts.length > worksheets.length
    )
      return [];
    const ids = new Set<string>();
    return data.drafts.flatMap((value: unknown): WorksheetDraft[] => {
      if (!value || typeof value !== 'object') return [];
      const item = value as Record<string, unknown>;
      const worksheet = worksheets.find(
        (worksheet) => worksheet.id === item['worksheetId'],
      );
      if (
        !worksheet?.available ||
        worksheet.status === 'completed' ||
        ids.has(worksheet.id)
      )
        return [];
      const answers = item['answers'],
        marked = item['marked'],
        current = item['currentIndex'],
        elapsed = item['elapsedSeconds'],
        scratch = item['scratch'],
        submitted = item['submittedAt'];
      if (
        !Array.isArray(answers) ||
        answers.length !== worksheet.questions.length ||
        answers.some(
          (answer) => typeof answer !== 'string' || answer.length > 500,
        )
      )
        return [];
      if (
        !Array.isArray(marked) ||
        marked.length > answers.length ||
        marked.some(
          (index) =>
            !Number.isInteger(index) || index < 0 || index >= answers.length,
        )
      )
        return [];
      if (
        typeof current !== 'number' ||
        !Number.isInteger(current) ||
        current < 0 ||
        current >= answers.length ||
        typeof elapsed !== 'number' ||
        !Number.isFinite(elapsed) ||
        elapsed < 0 ||
        elapsed > 31536000 ||
        typeof scratch !== 'string' ||
        scratch.length > 10000
      )
        return [];
      if (
        submitted !== undefined &&
        (typeof submitted !== 'string' ||
          !Number.isFinite(Date.parse(submitted)))
      )
        return [];
      ids.add(worksheet.id);
      return [
        {
          worksheetId: worksheet.id,
          answers: [...answers],
          marked: [...new Set(marked)] as number[],
          currentIndex: current,
          elapsedSeconds: elapsed,
          scratch,
          submittedAt: submitted as string | undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}
