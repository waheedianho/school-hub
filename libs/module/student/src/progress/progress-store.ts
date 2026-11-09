import { Injectable, computed, inject } from '@angular/core';
import { AssessmentStore } from '../assessments/assessment-store';
import { LEARNER_ASSESSMENTS } from '../assessments/assessments.data';
import { FeedbackStore } from '../feedback/feedback-store';
import { LEARNER_LESSONS } from '../lessons/lessons.data';
import { PortfolioStore } from '../portfolio/portfolio-store';
import { WorksheetStore } from '../worksheets/worksheet-store';
import { ProgressScope } from './progress.model';
import { progressRecommendations } from './progress-recommendations';

@Injectable({ providedIn: 'root' })
export class ProgressStore {
  private readonly assessments = inject(AssessmentStore);
  private readonly worksheets = inject(WorksheetStore);
  private readonly portfolios = inject(PortfolioStore);
  private readonly feedback = inject(FeedbackStore);
  readonly ready = this.feedback.ready;
  readonly source = computed<ProgressScope>(() => ({
    lessons: LEARNER_LESSONS,
    assessments: LEARNER_ASSESSMENTS,
    results: this.assessments.results(),
    worksheets: this.worksheets.records(),
    portfolios: this.portfolios.records(),
    feedback: this.feedback.records(),
  }));
  recommendations(scope: ProgressScope) {
    return progressRecommendations(
      scope,
      (quiz) =>
        quiz.available &&
        !!quiz.questions.length &&
        (!!this.assessments.draft(quiz.id) ||
          this.assessments.usedAttempts(quiz.id) < quiz.maxAttempts),
    );
  }
}
