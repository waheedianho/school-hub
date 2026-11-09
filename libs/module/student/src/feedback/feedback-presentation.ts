import { UiTone } from '@school-hub/ui-elements';
import { FeedbackKind } from './feedback.model';

export const FEEDBACK_KINDS: Record<
  FeedbackKind,
  { label: string; icon: string; tone: UiTone }
> = {
  quiz: {
    label: 'Quiz Feedback',
    icon: 'ri-question-answer-line',
    tone: 'purple',
  },
  worksheet: {
    label: 'Worksheet Feedback',
    icon: 'ri-file-text-line',
    tone: 'blue',
  },
  portfolio: {
    label: 'Portfolio Feedback',
    icon: 'ri-briefcase-line',
    tone: 'orange',
  },
};
export function feedbackDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
