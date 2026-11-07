import { ParamMap } from '@angular/router';

/** Only accept a return destination within the learner feedback screen. */
export function feedbackReturn(params: ParamMap): string | undefined {
  const value = params.get('feedbackReturn');
  return value &&
    value.length <= 4096 &&
    !/[\r\n]/.test(value) &&
    /^\/student\/feedback(?:\?[^#\r\n]*)?(?:#feedback-detail)?$/.test(value)
    ? value
    : undefined;
}
