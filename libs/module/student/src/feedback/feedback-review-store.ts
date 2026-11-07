import { Injectable, afterNextRender, signal } from '@angular/core';
import { readFeedbackReviews } from './feedback-review-engine';

export const FEEDBACK_REVIEW_KEY = 'school-hub:feedback-review:v1';
@Injectable({ providedIn: 'root' })
export class FeedbackReviewStore {
  private readonly states = signal<ReadonlyMap<string, boolean>>(new Map());
  readonly ready = signal(false);
  readonly persistent = signal(true);
  constructor() {
    afterNextRender(() => {
      try {
        this.states.set(
          readFeedbackReviews(localStorage.getItem(FEEDBACK_REVIEW_KEY)),
        );
      } catch {
        this.persistent.set(false);
      }
      this.ready.set(true);
    });
  }
  reviewed(id: string, initial = false): boolean {
    return this.states().get(id) ?? initial;
  }
  setReviewed(id: string, reviewed: boolean): void {
    if (!this.ready() || !/^[\w-]{1,180}$/.test(id)) return;
    const states = new Map(this.states());
    states.delete(id);
    states.set(id, reviewed);
    this.states.set(new Map([...states].slice(-5000)));
    try {
      localStorage.setItem(
        FEEDBACK_REVIEW_KEY,
        JSON.stringify({ version: 1, states: [...this.states()] }),
      );
      this.persistent.set(true);
    } catch {
      this.persistent.set(false);
    }
  }
}
