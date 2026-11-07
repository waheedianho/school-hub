import { ParamMap, Params } from '@angular/router';

export function worksheetBackQuery(
  params: ParamMap,
  worksheetId: string,
): Params {
  const result: Params = { worksheetId };
  for (const key of [
    'term',
    'subjectId',
    'topicId',
    'q',
    'status',
    'page',
    'printable',
  ]) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}
