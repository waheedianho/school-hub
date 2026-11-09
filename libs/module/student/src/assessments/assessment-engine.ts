import { LearnerAssessment, PracticeAttempt } from './assessment.model';

export function gradeAssessment(
  assessment: LearnerAssessment,
  answers: readonly (number | null)[],
): { marks: number; percentage: number; correct: number; answered: number } {
  let correct = 0;
  let answered = 0;
  assessment.questions.forEach((question, index) => {
    const answer = answers[index];
    if (
      typeof answer !== 'number' ||
      !Number.isInteger(answer) ||
      answer < 0 ||
      answer >= question.options.length
    )
      return;
    answered++;
    if (answer === question.correctIndex) correct++;
  });
  const percentage = assessment.questions.length
    ? Math.round((correct / assessment.questions.length) * 100)
    : 0;
  const marks = assessment.questions.length
    ? Math.round(
        (correct / assessment.questions.length) * assessment.totalMarks * 100,
      ) / 100
    : 0;
  return { marks, percentage, correct, answered };
}

export function remainingAttemptSeconds(
  attempt: PracticeAttempt,
  now: number,
): number {
  return attempt.status === 'active' && attempt.deadline !== null
    ? Math.max(0, Math.ceil((attempt.deadline - now) / 1000))
    : attempt.remainingSeconds;
}

export function readSavedAttempts(
  raw: string | null,
  assessments: readonly LearnerAssessment[],
): PracticeAttempt[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (
      data?.version !== 1 ||
      !Array.isArray(data.attempts) ||
      data.attempts.length > 200
    )
      return [];
    const ids = new Set<string>();
    return data.attempts.flatMap((value: unknown): PracticeAttempt[] => {
      if (!value || typeof value !== 'object') return [];
      const item = value as Record<string, unknown>;
      const assessment = assessments.find(
        (assessment) => assessment.id === item['assessmentId'],
      );
      if (
        !assessment?.questions.length ||
        typeof item['id'] !== 'string' ||
        item['id'].length > 100 ||
        ids.has(item['id'])
      )
        return [];
      if (!['active', 'paused', 'submitted'].includes(String(item['status'])))
        return [];
      const answers = item['answers'];
      const marked = item['marked'];
      if (
        !Array.isArray(answers) ||
        answers.length !== assessment.questions.length ||
        answers.some(
          (answer, index) =>
            answer !== null &&
            (!Number.isInteger(answer) ||
              answer < 0 ||
              answer >= assessment.questions[index].options.length),
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
      const currentIndex = item['currentIndex'],
        remaining = item['remainingSeconds'],
        startedAt = item['startedAt'],
        deadline = item['deadline'];
      if (
        typeof currentIndex !== 'number' ||
        !Number.isInteger(currentIndex) ||
        currentIndex < 0 ||
        currentIndex >= answers.length
      )
        return [];
      if (
        typeof remaining !== 'number' ||
        !Number.isFinite(remaining) ||
        remaining < 0 ||
        remaining > assessment.durationMinutes * 60 ||
        typeof startedAt !== 'number' ||
        !Number.isFinite(startedAt)
      )
        return [];
      if (
        item['status'] === 'active'
          ? typeof deadline !== 'number' || !Number.isFinite(deadline)
          : deadline !== null
      )
        return [];
      if (
        item['status'] === 'submitted' &&
        (typeof item['submittedAt'] !== 'number' ||
          !Number.isFinite(item['submittedAt']))
      )
        return [];
      ids.add(item['id']);
      return [
        {
          id: item['id'],
          assessmentId: assessment.id,
          status: item['status'] as PracticeAttempt['status'],
          answers: [...answers],
          marked: [...new Set(marked)] as number[],
          currentIndex,
          remainingSeconds: remaining,
          deadline: deadline as number | null,
          startedAt,
          submittedAt: item['submittedAt'] as number | undefined,
          expired: item['expired'] === true,
        },
      ];
    });
  } catch {
    return [];
  }
}
