import { Injectable, computed, inject } from '@angular/core';
import { AssessmentStore } from '../assessments/assessment-store';
import { WorksheetStore } from '../worksheets/worksheet-store';
import { PortfolioStore } from '../portfolio/portfolio-store';
import {
  portfolioFeedback,
  quizFeedback,
  worksheetFeedback,
} from './feedback-engine';
import { FeedbackEntry, FeedbackLink, FeedbackRecord } from './feedback.model';
import { FeedbackReviewStore } from './feedback-review-store';

@Injectable({ providedIn: 'root' })
export class FeedbackStore {
  private readonly assessments = inject(AssessmentStore);
  private readonly worksheets = inject(WorksheetStore);
  private readonly portfolios = inject(PortfolioStore);
  readonly reviews = inject(FeedbackReviewStore);
  readonly ready = computed(
    () =>
      this.assessments.ready() &&
      this.worksheets.ready() &&
      this.portfolios.ready() &&
      this.reviews.ready(),
  );
  readonly records = computed<readonly FeedbackRecord[]>(() => {
    const entries: FeedbackEntry[] = [
      ...this.assessments.results().flatMap((result) => {
        const assessment = this.assessments.assessment(result.assessmentId);
        return assessment ? [quizFeedback(result, assessment)] : [];
      }),
      ...this.worksheets.records().flatMap((record) => {
        const entry = worksheetFeedback(record);
        return entry ? [entry] : [];
      }),
      ...this.portfolios.records().flatMap((record) => {
        const entry = portfolioFeedback(record);
        return entry ? [entry] : [];
      }),
    ];
    return entries
      .map((entry) => ({
        ...entry,
        reviewed: this.reviews.reviewed(entry.id, entry.initialReviewed),
      }))
      .sort(
        (a, b) =>
          Date.parse(b.date) - Date.parse(a.date) ||
          a.title.localeCompare(b.title),
      );
  });
  record(id: string): FeedbackRecord | undefined {
    return this.records().find((entry) => entry.id === id);
  }
  setReviewed(id: string, reviewed: boolean): void {
    if (this.record(id)) this.reviews.setReviewed(id, reviewed);
  }
  practice(entry: FeedbackEntry): FeedbackLink | undefined {
    if (entry.kind === 'portfolio') {
      const task = this.portfolios.record(entry.activityId);
      return task?.available
        ? {
            route: ['/student/portfolio-tasks', task.id],
            query: { tab: 'work' },
            label:
              task.status === 'needs-revision'
                ? 'Revise My Work'
                : 'Review Portfolio Work',
            description:
              task.status === 'needs-revision'
                ? 'Apply the tutor’s revision comments.'
                : 'Revisit your work and reflection.',
          }
        : undefined;
    }
    const worksheet = this.worksheets.record(`${entry.lessonId}-worksheet`);
    if (worksheet?.available)
      return {
        route: ['/student/worksheets', worksheet.id],
        label:
          worksheet.status === 'completed'
            ? 'Review Practice'
            : worksheet.status === 'in-progress'
              ? 'Continue Practice'
              : 'Start Practice',
        description:
          worksheet.status === 'completed'
            ? 'Review your completed answers and explanations.'
            : 'Practise the related worksheet questions.',
      };
    return entry.lessonId
      ? {
          route: '/student/lessons',
          query: { lessonId: entry.lessonId, subject: entry.subjectId },
          label: 'Review Lesson',
          description: 'Revisit the ideas from your lesson.',
        }
      : undefined;
  }
  followUp(entry: FeedbackEntry): FeedbackLink | undefined {
    const assessment = this.assessments.assessment(`${entry.lessonId}-quiz`);
    if (!assessment) return undefined;
    const available =
      assessment.available &&
      assessment.questions.length > 0 &&
      (!!this.assessments.draft(assessment.id) ||
        this.assessments.usedAttempts(assessment.id) < assessment.maxAttempts);
    return {
      route: '/student/assessments',
      query: {
        assessmentId: assessment.id,
        subjectId: assessment.subjectId,
        term: assessment.term,
      },
      label: available ? 'Take Follow-up Quiz' : 'View Quiz Details',
      description: available
        ? 'Check your understanding with an available attempt.'
        : 'See availability, attempt limits, and previous results.',
    };
  }
}
