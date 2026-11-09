import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });

test('dashboard presents the learner overview and consistent progress', async ({
  page,
}, testInfo) => {
  await page.goto('/student/dashboard');
  await expect(
    page.getByRole('heading', { name: 'Learner Dashboard', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Welcome back, Sarah')).toBeVisible();
  for (const title of [
    'Continue Learning',
    'Today’s Lesson',
    'Due Tasks',
    'Weak Areas to Revise',
    'Portfolio Task Status',
    'Upcoming Live Class',
    'My Progress',
    'Recent Subjects',
    'Quiz Results',
    'Feedback from Tutor',
    'Common Mistake Detected',
    'Next Recommended Action',
  ]) {
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole('progressbar', { name: 'Current lesson completion' }),
  ).toHaveAttribute('aria-valuenow', '80');
  await expect(
    page.getByRole('progressbar', { name: 'Quiz Average', exact: true }),
  ).toHaveAttribute('aria-valuenow', '70');
  await expect(
    page.getByRole('progressbar', {
      name: 'Portfolio Completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '64');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('learner-dashboard-desktop.png'),
    fullPage: true,
  });
});

test('dashboard actions open the related learner pages with their record context', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date('2026-11-05T12:00:00+01:00'));
  await page.goto('/student/dashboard');
  const actions = [
    [
      'Continue Lesson',
      '/student/lessons?lessonId=whole-numbers',
      'Whole Numbers',
    ],
    [
      'Submit Work',
      '/student/portfolio-tasks/market-price-comparison?tab=submission',
      'Market Price Comparison',
    ],
    [
      'Join Class',
      '/student/live-classes?classId=whole-numbers-live',
      'Join Class',
    ],
    ['View all tasks', '/student/lessons?tab=tasks', 'Pending lesson tasks'],
    [
      'View latest quiz results',
      '/student/assessments?assessmentId=whole-numbers-quiz&tab=results',
      'Quiz Results',
    ],
    ['Place Value', '/student/resources?topicId=place-value', 'Resources'],
  ];
  for (const [label, url, heading] of actions) {
    await test.step(label, async () => {
      await page.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(url);
      await expect(
        page.getByRole('heading', { name: heading, exact: true }),
      ).toBeVisible();
      await page.goBack();
      await expect(
        page.getByRole('heading', { name: 'Learner Dashboard', exact: true }),
      ).toBeVisible();
    });
  }
  await page.getByRole('button', { name: 'Open profile menu' }).click();
  await page.getByRole('link', { name: /My Profile/ }).click();
  await expect(page).toHaveURL('/student/profile');
});

test('mobile dashboard fits the screen and its navigation drawer closes', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/dashboard');
  await expect(
    page.getByRole('heading', { name: 'Learner Dashboard', exact: true }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  const navigation = page.getByRole('navigation', {
    name: 'Portal navigation',
  });
  await expect(
    navigation.getByRole('link', { name: 'Dashboard', exact: true }),
  ).toBeInViewport();
  await page
    .getByRole('button', { name: 'Close navigation', exact: true })
    .click();
  await expect(
    navigation.getByRole('link', { name: 'Dashboard', exact: true }),
  ).not.toBeInViewport();

  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await navigation
    .getByRole('link', { name: 'My Lessons', exact: true })
    .click();
  await expect(page).toHaveURL('/student/lessons');
  await expect(
    navigation.getByRole('link', { name: 'My Lessons', exact: true }),
  ).not.toBeInViewport();
  await page.goBack();
  await expect(
    page.getByRole('heading', { name: 'Learner Dashboard', exact: true }),
  ).toBeVisible();

  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('learner-dashboard-mobile.png'),
    fullPage: true,
  });
});
