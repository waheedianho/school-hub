import { ParamMap } from '@angular/router';

/** Keep activity return navigation within the learner's progress screen. */
export function progressReturn(params: ParamMap): string | undefined {
  const value = params.get('progressReturn');
  return value &&
    value.length <= 4096 &&
    !/[\r\n]/.test(value) &&
    /^\/student\/progress(?:\?[^#\r\n]*)?$/.test(value)
    ? value
    : undefined;
}
