import { ParamMap, Params } from '@angular/router';
import { feedbackReturn } from '../data/feedback-context';
import { progressReturn } from '../data/progress-context';

/** Preserve list state without reopening the selected assessment's dialog. */
export function assessmentBackQuery(params: ParamMap): Params {
  const result: Params = {};
  for (const key of ['term', 'subjectId', 'type', 'q', 'tab', 'page']) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  const destination = feedbackReturn(params);
  if (destination) result['feedbackReturn'] = destination;
  const progress = progressReturn(params);
  if (progress) result['progressReturn'] = progress;
  return result;
}
