import { ParamMap, Params } from '@angular/router';

/** Preserve list state without reopening the selected assessment's dialog. */
export function assessmentBackQuery(params: ParamMap): Params {
  const result: Params = {};
  for (const key of ['term', 'subjectId', 'type', 'q', 'tab', 'page']) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}
