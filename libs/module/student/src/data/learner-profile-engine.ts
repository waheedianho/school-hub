import { LEARNER_PROFILE } from './learning-context.data';
import { LEARNER_SUBJECTS } from './subject-catalog.data';
import {
  IdentityErrors,
  LearnerGoal,
  LearnerIdentity,
  LearnerProfileState,
} from './learner-profile.model';
export const LEARNER_GOAL_METRICS = [
  { id: 'quiz-average', label: 'Average quiz score' },
  { id: 'lessons', label: 'Lessons completed' },
  { id: 'worksheets', label: 'Worksheets completed' },
  { id: 'portfolio', label: 'Portfolio tasks handed in' },
] as const;
export function defaultLearnerProfile(): LearnerProfileState {
  return {
    identity: {
      fullName: LEARNER_PROFILE.fullName,
      email: LEARNER_PROFILE.email,
      phone: LEARNER_PROFILE.phone,
      location: LEARNER_PROFILE.location,
    },
    goals: [
      {
        id: 'english-score',
        metric: 'quiz-average',
        subjectId: 'english-language',
        target: 90,
      },
      { id: 'complete-lessons', metric: 'lessons', subjectId: '', target: 20 },
      { id: 'portfolio-work', metric: 'portfolio', subjectId: '', target: 10 },
    ],
    preferences: { wifiOnly: false },
  };
}
export function validateIdentity(identity: LearnerIdentity): IdentityErrors {
  const errors: IdentityErrors = {};
  if (
    identity.fullName.trim().length < 2 ||
    identity.fullName.trim().length > 80 ||
    hasControlCharacters(identity.fullName)
  )
    errors.fullName = 'Enter a name between 2 and 80 characters.';
  if (
    identity.email.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email.trim())
  )
    errors.email = 'Enter a valid contact email address.';
  if (identity.phone && !/^\+?[0-9 ()-]{6,24}$/.test(identity.phone.trim()))
    errors.phone =
      'Use 6–24 phone characters: digits, spaces, +, brackets, or hyphens.';
  if (identity.location.length > 100 || hasControlCharacters(identity.location))
    errors.location = 'Use a location of at most 100 characters.';
  return errors;
}
function hasControlCharacters(value: string): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
}
export function validLearnerGoals(value: unknown): value is LearnerGoal[] {
  if (!Array.isArray(value) || value.length !== 3) return false;
  const ids = new Set<string>();
  return value.every((item) => {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.id !== 'string' ||
      !/^[\w-]{1,60}$/.test(item.id) ||
      ids.has(item.id)
    )
      return false;
    ids.add(item.id);
    return (
      LEARNER_GOAL_METRICS.some((metric) => metric.id === item.metric) &&
      (item.subjectId === '' ||
        LEARNER_SUBJECTS.some((subject) => subject.id === item.subjectId)) &&
      Number.isInteger(item.target) &&
      item.target >= 1 &&
      item.target <= (item.metric === 'quiz-average' ? 100 : 500)
    );
  });
}
export function readLearnerProfile(raw: string | null): LearnerProfileState {
  const initial = defaultLearnerProfile();
  try {
    const data = JSON.parse(raw ?? 'null');
    if (
      data?.version !== 1 ||
      !data.identity ||
      typeof data.identity !== 'object'
    )
      return initial;
    const identity = { ...initial.identity };
    for (const key of ['fullName', 'email', 'phone', 'location'] as const) {
      if (
        typeof data.identity[key] === 'string' &&
        data.identity[key].length <= 200
      ) {
        const candidate = { ...identity, [key]: data.identity[key] };
        if (!validateIdentity(candidate)[key])
          identity[key] = data.identity[key].trim();
      }
    }
    return {
      identity,
      goals: validLearnerGoals(data.goals)
        ? data.goals.map((goal: LearnerGoal) => ({
            id: goal.id,
            metric: goal.metric,
            subjectId: goal.subjectId,
            target: goal.target,
          }))
        : initial.goals,
      preferences: { wifiOnly: data.preferences?.wifiOnly === true },
    };
  } catch {
    return initial;
  }
}
export function learnerInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  return [words[0], words.length > 1 ? words[words.length - 1] : '']
    .map((word) => Array.from(word ?? '')[0] ?? '')
    .join('')
    .toUpperCase();
}
export function shortLearnerName(name: string): string {
  const words = name.trim().split(/\s+/);
  return words.length > 1
    ? `${words[0]} ${Array.from(words[words.length - 1])[0]}.`
    : words[0];
}
export function resourceConnectionPolicy(
  wifiOnly: boolean,
  connection?: string,
): 'allow' | 'wifi-required' | 'unavailable' {
  return !wifiOnly || connection === 'wifi' || connection === 'ethernet'
    ? 'allow'
    : connection === 'cellular' ||
        connection === 'wimax' ||
        connection === 'bluetooth' ||
        connection === 'none'
      ? 'wifi-required'
      : 'unavailable';
}
