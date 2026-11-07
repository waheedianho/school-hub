import { ParamMap, Params } from '@angular/router';
export function portfolioBackQuery(params: ParamMap): Params {
  const query: Params = {};
  for (const key of ['term', 'subjectId', 'status', 'q', 'sort', 'page']) {
    const value = params.get(key);
    if (value) query[key] = value;
  }
  return query;
}
