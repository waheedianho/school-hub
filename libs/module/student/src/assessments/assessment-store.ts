import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  AssessmentResult,
  LearnerAssessment,
  PracticeAttempt,
} from './assessment.model';
import {
  LEARNER_ASSESSMENTS,
  SAMPLE_ASSESSMENT_RESULTS,
} from './assessments.data';
import {
  gradeAssessment,
  readSavedAttempts,
  remainingAttemptSeconds,
} from './assessment-engine';

export const PRACTICE_STORAGE_KEY = 'school-hub:practice-assessments:v1';

@Injectable({ providedIn: 'root' })
export class AssessmentStore {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroy = inject(DestroyRef);
  private readonly attempts = signal<PracticeAttempt[]>([]);
  readonly ready = signal(false);
  readonly persistent = signal(true);
  readonly now = signal(Date.now());
  readonly results = computed<readonly AssessmentResult[]>(() =>
    [
      ...SAMPLE_ASSESSMENT_RESULTS,
      ...this.attempts().flatMap((attempt): AssessmentResult[] => {
        const assessment = this.assessment(attempt.assessmentId);
        if (
          attempt.status !== 'submitted' ||
          !attempt.submittedAt ||
          !assessment
        )
          return [];
        const score = gradeAssessment(assessment, attempt.answers);
        return [
          {
            id: attempt.id,
            assessmentId: assessment.id,
            marks: score.marks,
            totalMarks: assessment.totalMarks,
            percentage: score.percentage,
            correctCount: score.correct,
            answers: attempt.answers,
            date: new Date(attempt.submittedAt).toISOString(),
            source: 'practice',
            expired: attempt.expired,
          },
        ];
      }),
    ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
  );
  readonly quizAverage = computed(() => {
    const results = this.results().filter(
      (result) => this.assessment(result.assessmentId)?.kind === 'quiz',
    );
    return results.length
      ? Math.round(
          results.reduce((total, result) => total + result.percentage, 0) /
            results.length,
        )
      : 0;
  });

  constructor() {
    afterNextRender(() => {
      try {
        this.attempts.set(
          readSavedAttempts(
            sessionStorage.getItem(PRACTICE_STORAGE_KEY),
            LEARNER_ASSESSMENTS,
          ),
        );
      } catch {
        this.persistent.set(false);
      }
      this.now.set(Date.now());
      this.ready.set(true);
      this.expire();
      const timer = setInterval(() => {
        this.now.set(Date.now());
        this.expire();
      }, 1000);
      this.destroy.onDestroy(() => clearInterval(timer));
    });
  }

  assessment(id: string): LearnerAssessment | undefined {
    return LEARNER_ASSESSMENTS.find((assessment) => assessment.id === id);
  }
  draft(id: string): PracticeAttempt | undefined {
    return this.attempts().find(
      (attempt) =>
        attempt.assessmentId === id && attempt.status !== 'submitted',
    );
  }
  attempt(id: string): PracticeAttempt | undefined {
    return this.attempts().find((attempt) => attempt.id === id);
  }
  result(id: string): AssessmentResult | undefined {
    return this.results().find((result) => result.id === id);
  }
  latestResult(id: string): AssessmentResult | undefined {
    return this.results().find((result) => result.assessmentId === id);
  }
  usedAttempts(id: string): number {
    return (
      SAMPLE_ASSESSMENT_RESULTS.filter((result) => result.assessmentId === id)
        .length +
      this.attempts().filter((attempt) => attempt.assessmentId === id).length
    );
  }
  timeLeft(attempt: PracticeAttempt): number {
    return remainingAttemptSeconds(attempt, this.now());
  }

  start(assessment: LearnerAssessment): PracticeAttempt | undefined {
    if (
      !this.browser ||
      !this.ready() ||
      !assessment.available ||
      !assessment.questions.length
    )
      return undefined;
    const existing = this.draft(assessment.id);
    if (existing) {
      if (existing.status === 'paused') this.resume(existing.id);
      return this.attempt(existing.id);
    }
    if (this.usedAttempts(assessment.id) >= assessment.maxAttempts)
      return undefined;
    const now = Date.now();
    const attempt: PracticeAttempt = {
      id: `practice-${crypto.randomUUID()}`,
      assessmentId: assessment.id,
      status: 'active',
      answers: Array.from({ length: assessment.questions.length }, () => null),
      marked: [],
      currentIndex: 0,
      remainingSeconds: assessment.durationMinutes * 60,
      deadline: now + assessment.durationMinutes * 60000,
      startedAt: now,
    };
    this.now.set(now);
    this.attempts.update((items) => [...items, attempt]);
    this.save();
    return attempt;
  }

  choose(id: string, index: number, answer: number | null): void {
    this.updateActive(id, (attempt) => {
      const question = this.assessment(attempt.assessmentId)?.questions[index];
      if (
        !question ||
        (answer !== null &&
          (!Number.isInteger(answer) ||
            answer < 0 ||
            answer >= question.options.length))
      )
        return attempt;
      return {
        ...attempt,
        answers: attempt.answers.map((value, position) =>
          position === index ? answer : value,
        ),
      };
    });
  }
  navigate(id: string, index: number): void {
    this.updateActive(id, (attempt) =>
      Number.isInteger(index) && index >= 0 && index < attempt.answers.length
        ? { ...attempt, currentIndex: index }
        : attempt,
    );
  }
  mark(id: string, index: number): void {
    this.updateActive(id, (attempt) =>
      index >= 0 && index < attempt.answers.length
        ? {
            ...attempt,
            marked: attempt.marked.includes(index)
              ? attempt.marked.filter((item) => item !== index)
              : [...attempt.marked, index],
          }
        : attempt,
    );
  }
  pause(id: string): void {
    const attempt = this.attempt(id);
    if (!attempt || attempt.status !== 'active') return;
    const remaining = remainingAttemptSeconds(attempt, Date.now());
    if (!remaining) {
      this.submit(id, true);
      return;
    }
    this.replace({
      ...attempt,
      status: 'paused',
      deadline: null,
      remainingSeconds: remaining,
    });
  }
  resume(id: string): void {
    const attempt = this.attempt(id);
    if (attempt?.status === 'paused')
      this.replace({
        ...attempt,
        status: 'active',
        deadline: Date.now() + attempt.remainingSeconds * 1000,
      });
  }
  submit(id: string, expired = false): AssessmentResult | undefined {
    const attempt = this.attempt(id);
    if (!attempt) return undefined;
    if (attempt.status === 'submitted') return this.result(id);
    this.replace({
      ...attempt,
      status: 'submitted',
      deadline: null,
      remainingSeconds: 0,
      submittedAt: Date.now(),
      expired,
    });
    return this.result(id);
  }

  private updateActive(
    id: string,
    transform: (attempt: PracticeAttempt) => PracticeAttempt,
  ): void {
    const attempt = this.attempt(id);
    if (!attempt || attempt.status !== 'active') return;
    if (!remainingAttemptSeconds(attempt, Date.now())) {
      this.submit(id, true);
      return;
    }
    this.replace(transform(attempt));
  }
  private replace(attempt: PracticeAttempt): void {
    this.attempts.update((items) =>
      items.map((item) => (item.id === attempt.id ? attempt : item)),
    );
    this.now.set(Date.now());
    this.save();
  }
  private expire(): void {
    for (const attempt of this.attempts())
      if (
        attempt.status === 'active' &&
        !remainingAttemptSeconds(attempt, this.now())
      )
        this.submit(attempt.id, true);
  }
  private save(): void {
    if (this.browser)
      try {
        sessionStorage.setItem(
          PRACTICE_STORAGE_KEY,
          JSON.stringify({ version: 1, attempts: this.attempts() }),
        );
      } catch {
        this.persistent.set(false);
      }
  }
}
