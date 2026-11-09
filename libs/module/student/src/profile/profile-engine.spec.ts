import { LEARNER_LESSONS } from '../lessons/lessons.data';
import {
  LEARNER_ASSESSMENTS,
  SAMPLE_ASSESSMENT_RESULTS,
} from '../assessments/assessments.data';
import { LEARNER_WORKSHEETS } from '../worksheets/worksheets.data';
import { LEARNER_PORTFOLIO_TASKS } from '../portfolio/portfolio.data';
import {
  defaultLearnerProfile,
  learnerInitials,
  readLearnerProfile,
  resourceConnectionPolicy,
  shortLearnerName,
  validLearnerGoals,
  validateIdentity,
} from '../data/learner-profile-engine';
import { ProgressScope } from '../progress/progress.model';
import {
  learningDay,
  learningStreak,
  profileAchievements,
  profileEvidence,
  profileGoals,
  profileSubjectRows,
  profileTime,
  recordedPracticeSeconds,
} from './profile-engine';
const now = Date.parse('2026-11-05T14:15:00+01:00');
const source: ProgressScope = {
  lessons: LEARNER_LESSONS,
  assessments: LEARNER_ASSESSMENTS,
  results: SAMPLE_ASSESSMENT_RESULTS,
  worksheets: LEARNER_WORKSHEETS.map((item) => ({
    ...item,
    answers: item.initialAnswers,
    marked: [],
    currentIndex: 0,
    elapsedSeconds: item.initialSeconds,
    scratch: '',
    answered: 0,
    progress: 0,
  })),
  portfolios: LEARNER_PORTFOLIO_TASKS.map((item) => ({
    ...item,
    ...item.initialWork,
    files: [],
    note: '',
    progress: 0,
  })),
  feedback: [],
};
const empty: ProgressScope = {
  lessons: [],
  assessments: [],
  results: [],
  worksheets: [],
  portfolios: [],
  feedback: [],
};
describe('profile identity and preferences', () => {
  it('validates contact fields and formats learner identity consistently', () => {
    expect(validateIdentity(defaultLearnerProfile().identity)).toEqual({});
    expect(
      validateIdentity({
        fullName: ' ',
        email: 'bad',
        phone: 'phone!',
        location: 'x'.repeat(101),
      }),
    ).toEqual(
      expect.objectContaining({
        fullName: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        location: expect.any(String),
      }),
    );
    expect(learnerInitials(' Amina  Bello ')).toBe('AB');
    expect(shortLearnerName(' Amina Bello ')).toBe('Amina B.');
    expect(shortLearnerName('Sarah')).toBe('Sarah');
  });
  it('restores valid local fields, recovers corrupt data, and bounds goal targets', () => {
    const initial = defaultLearnerProfile();
    for (const raw of [null, '{', '{}', '{"version":2}'])
      expect(readLearnerProfile(raw)).toEqual(initial);
    const saved = readLearnerProfile(
      JSON.stringify({
        version: 1,
        identity: {
          fullName: ' Amina Bello ',
          email: 'invalid',
          phone: '+234 800 123 4567',
          location: 'Abuja',
        },
        goals: [{ id: 'bad', metric: 'unknown', subjectId: '', target: 0 }],
        preferences: { wifiOnly: true },
      }),
    );
    expect(saved.identity).toEqual({
      ...initial.identity,
      fullName: 'Amina Bello',
      phone: '+234 800 123 4567',
      location: 'Abuja',
    });
    expect(saved.goals).toEqual(initial.goals);
    expect(saved.preferences.wifiOnly).toBe(true);
    expect(validLearnerGoals(initial.goals)).toBe(true);
    expect(
      validLearnerGoals(
        initial.goals.map((goal, index) =>
          index === 0 ? { ...goal, target: 101 } : goal,
        ),
      ),
    ).toBe(false);
    expect(
      validLearnerGoals(
        initial.goals.map((goal) => ({ ...goal, id: 'duplicate' })),
      ),
    ).toBe(false);
  });
  it('enforces the download preference without assuming an unknown connection is Wi-Fi', () => {
    expect(resourceConnectionPolicy(false, 'cellular')).toBe('allow');
    expect(resourceConnectionPolicy(true, 'wifi')).toBe('allow');
    expect(resourceConnectionPolicy(true, 'ethernet')).toBe('allow');
    expect(resourceConnectionPolicy(true, 'cellular')).toBe('wifi-required');
    expect(resourceConnectionPolicy(true, undefined)).toBe('unavailable');
    expect(resourceConnectionPolicy(true, 'unknown')).toBe('unavailable');
  });
});
describe('profile learning evidence', () => {
  it('derives subjects, achievements, and goals from the existing learner records', () => {
    expect(profileSubjectRows(source).map((row) => row.value)).toEqual([
      73, 86, 100,
    ]);
    expect(profileSubjectRows(source)[0].queryParams).toEqual({
      lessonId: 'whole-numbers',
    });
    expect(
      profileAchievements(source, now).filter((badge) => badge.earned),
    ).toHaveLength(2);
    const goals = profileGoals(defaultLearnerProfile().goals, source);
    expect(goals.find((goal) => goal.id === 'complete-lessons')).toMatchObject({
      value: 80,
      valueLabel: '80%',
    });
    expect(goals.find((goal) => goal.id === 'portfolio-work')).toMatchObject({
      value: 90,
      valueLabel: '90%',
    });
    expect(
      profileGoals(defaultLearnerProfile().goals, empty)[0].value,
    ).toBeUndefined();
    expect(
      profileAchievements(empty, now).every((badge) => !badge.earned),
    ).toBe(true);
  });
  it('updates portfolio goals after submission without inventing a new quiz score', () => {
    const updated = {
      ...source,
      portfolios: source.portfolios.map((record) =>
        record.id === 'market-price-comparison'
          ? { ...record, status: 'submitted' as const }
          : record,
      ),
    };
    const before = profileGoals(defaultLearnerProfile().goals, source),
      after = profileGoals(defaultLearnerProfile().goals, updated);
    expect(after[2]).toMatchObject({ value: 100, valueLabel: '100%' });
    expect(after[2].description).toContain('Goal reached');
    expect(after[0].value).toBe(before[0].value);
  });
  it('uses recorded worksheet and portfolio seconds rather than lesson duration estimates', () => {
    const seconds =
      source.worksheets.reduce((sum, item) => sum + item.elapsedSeconds, 0) +
      source.portfolios.reduce((sum, item) => sum + item.secondsSpent, 0);
    expect(recordedPracticeSeconds(source)).toBe(seconds);
    expect(
      recordedPracticeSeconds({ ...empty, lessons: LEARNER_LESSONS }),
    ).toBe(0);
    expect(profileTime(3780)).toBe('1h 3m');
    expect(profileTime(0)).toBe('0m');
  });
  it('counts dated learner work once per Lagos day and ignores future records and tutor review dates', () => {
    const data = {
      ...empty,
      lessons: [
        {
          ...LEARNER_LESSONS[0],
          status: 'completed' as const,
          completedAt: '2026-11-04',
        },
      ],
      results: [
        {
          ...SAMPLE_ASSESSMENT_RESULTS[0],
          id: 'late',
          date: '2026-11-04T23:30:00Z',
        },
        {
          ...SAMPLE_ASSESSMENT_RESULTS[0],
          id: 'future',
          date: '2026-11-06T10:00:00+01:00',
        },
      ],
    };
    const evidence = profileEvidence(data, now);
    expect(evidence.map((item) => item.date)).toEqual([
      '2026-11-05',
      '2026-11-04',
    ]);
    expect(learningDay(Date.parse('2026-11-04T23:30:00Z'))).toBe('2026-11-05');
    const streak = learningStreak([...evidence, evidence[0]], now);
    expect(streak.current).toBe(2);
    expect(streak.week).toHaveLength(7);
    expect(streak.week[0].date).toBe('2026-11-02');
  });
  it('keeps a streak through yesterday, breaks it after a missed day, and earns the seven-day milestone once supported', () => {
    const evidence = Array.from({ length: 7 }, (_, index) => ({
      id: String(index),
      date: `2026-10-${25 + index}`,
      title: 'Lesson completed',
      route: '/student/lessons',
    }));
    const seven = learningStreak(
      evidence,
      Date.parse('2026-11-01T12:00:00+01:00'),
    );
    expect(seven.current).toBe(7);
    expect(seven.longest).toBe(7);
    expect(seven.earnedOn).toBe('2026-10-31');
    expect(
      learningStreak(evidence, Date.parse('2026-11-02T12:00:00+01:00')).current,
    ).toBe(0);
    expect(learningStreak([], now).current).toBe(0);
  });
});
