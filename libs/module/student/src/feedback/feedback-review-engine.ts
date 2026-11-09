export function readFeedbackReviews(raw: string | null): Map<string, boolean> {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (
      value?.version !== 1 ||
      !Array.isArray(value.states) ||
      value.states.length > 5000
    )
      return new Map();
    const entries: [string, boolean][] = value.states.filter(
      (entry: unknown): entry is [string, boolean] =>
        Array.isArray(entry) &&
        entry.length === 2 &&
        typeof entry[0] === 'string' &&
        /^[\w-]{1,180}$/.test(entry[0]) &&
        typeof entry[1] === 'boolean',
    );
    return new Map(entries);
  } catch {
    return new Map();
  }
}
