import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });
const quiz = '/student/assessments/whole-numbers-quiz/attempt';
const storageKey = 'school-hub:practice-assessments:v1';

test('assessment overview renders its design and filters results and schedules', async ({
  page,
}, testInfo) => {
  await page.goto('/student/assessments');
  await expect(
    page.getByRole('heading', { name: 'Quizzes & Assessments', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('progressbar', {
      name: 'Overall quiz average',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '70');
  await expect(
    page.getByRole('heading', { name: 'Upcoming (3)', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('table', { name: 'Assessment results' }).getByRole('row'),
  ).toHaveCount(6);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('assessments-desktop.png'),
    fullPage: true,
  });
  await page.getByRole('tab', { name: 'Quizzes', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Upcoming (1)', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('tab', { name: 'Diagnostic Tests', exact: true })
    .click();
  await expect(
    page.getByText('No upcoming assessments match these filters.'),
  ).toBeVisible();
  await page.getByRole('tab', { name: 'All', exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page
    .getByRole('searchbox', { name: 'Search assessments' })
    .fill('Parts');
  await page.reload();
  await expect(
    page.getByRole('searchbox', { name: 'Search assessments' }),
  ).toHaveValue('Parts');
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('english-language');
  await expect(
    page.getByRole('table', { name: 'Assessment results' }).getByRole('row'),
  ).toHaveCount(2);
});

test('calendar, result pagination, and unavailable assessments work', async ({
  page,
}) => {
  await page.goto('/student/assessments');
  await page
    .getByRole('button', { name: 'View Calendar', exact: true })
    .click();
  const calendar = page.getByRole('dialog', {
    name: 'Assessment Calendar',
    exact: true,
  });
  await expect(calendar.getByRole('link')).toHaveCount(3);
  await calendar.getByRole('link', { name: /Fractions/ }).click();
  const instructions = page.getByRole('dialog', {
    name: 'Fractions – Diagnostic Assessment',
    exact: true,
  });
  await expect(
    instructions.getByRole('button', {
      name: 'Not available yet',
      exact: true,
    }),
  ).toBeDisabled();
  await instructions
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('all');
  await page
    .getByRole('button', { name: 'View All Results', exact: true })
    .click();
  await expect(page.getByText('Showing 1 to 5 of 19 results')).toBeVisible();
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(page.getByText('Showing 6 to 10 of 19 results')).toBeVisible();
  await page
    .getByRole('table', { name: 'Assessment results' })
    .getByRole('row')
    .nth(1)
    .getByRole('link')
    .first()
    .click();
  await page
    .getByRole('link', { name: 'Back to Quizzes & Assessments', exact: true })
    .click();
  await expect(page.getByText('Showing 6 to 10 of 19 results')).toBeVisible();
  await page.getByRole('tab', { name: 'Topic Tests', exact: true }).click();
  await expect(page.getByText('Showing 1 to 1 of 1 results')).toBeVisible();
});

test('sample results support answer review and preserve the assessment menu', async ({
  page,
}) => {
  await page.goto(
    '/student/assessments?assessmentId=whole-numbers-quiz&tab=results',
  );
  const results = page.getByRole('dialog', {
    name: 'Quiz Results',
    exact: true,
  });
  await results
    .getByRole('link', { name: 'View answer review', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/assessments/whole-numbers-quiz/results/sample-whole-numbers-quiz?tab=results',
  );
  await expect(
    page.getByRole('heading', { name: 'Assessment Results', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('progressbar', { name: 'Assessment score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '70');
  await expect(
    page.getByRole('heading', { name: 'Answer Review', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'Six hundred thousand Correct answer',
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByRole('radio', {
      name: 'Six hundred thousand Correct answer',
      exact: true,
    }),
  ).toBeDisabled();
  await expect(
    page
      .getByRole('navigation', { name: 'Portal navigation' })
      .getByRole('link', { name: 'Quizzes & Assessments', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('practice answers, marks, pause, refresh, calculator, grading, and dashboard updates work', async ({
  page,
}, testInfo) => {
  await page.clock.install();
  await page.goto('/student/assessments?assessmentId=whole-numbers-quiz');
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  await expect(page).toHaveURL(quiz);
  await page
    .getByRole('radio', { name: 'Six hundred thousand', exact: true })
    .check();
  await page
    .getByRole('button', {
      name: 'Mark current question for review',
      exact: true,
    })
    .click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page
    .getByRole('radio', { name: '40,000 + 5,000 + 30 + 2', exact: true })
    .check();
  await page.getByRole('button', { name: 'Pause Quiz', exact: true }).click();
  const pausedTime = await page
    .getByRole('timer', { name: 'Time left', exact: true })
    .innerText();
  await page.clock.fastForward('00:05');
  await expect(
    page.getByRole('timer', { name: 'Time left', exact: true }),
  ).toHaveText(pausedTime);
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Quiz paused', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Resume Quiz', exact: true })
    .first()
    .click();
  await expect(
    page.getByRole('radio', { name: '40,000 + 5,000 + 30 + 2', exact: true }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Clear Answer', exact: true }).click();
  await expect(
    page.getByRole('radio', { name: '40,000 + 5,000 + 30 + 2', exact: true }),
  ).not.toBeChecked();
  await page
    .getByRole('button', { name: 'Show Calculator', exact: true })
    .click();
  const calculator = page.getByRole('dialog', {
    name: 'Practice Calculator',
    exact: true,
  });
  await calculator
    .getByRole('textbox', { name: 'Calculation', exact: true })
    .fill('345 + 278');
  await calculator
    .getByRole('button', { name: 'Calculate', exact: true })
    .click();
  await expect(calculator.locator('output')).toHaveText('623');
  await calculator
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  const answers = [0, 1, 0, 2, 1, 3, 2, 0, 2, 1];
  for (const [index, answer] of answers.entries()) {
    await page
      .getByRole('navigation', { name: 'Question navigation' })
      .getByRole('button', { name: new RegExp(`^Question ${index + 1},`) })
      .click();
    await page.getByRole('radio').nth(answer).check();
  }
  await page
    .getByRole('navigation', { name: 'Question navigation' })
    .getByRole('button', { name: /^Question 1,/ })
    .click();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('quiz-attempt-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Submit assessment', exact: true })
    .click();
  const submit = page.getByRole('dialog', {
    name: 'Submit assessment?',
    exact: true,
  });
  await expect(submit).toContainText('answered 10 of 10');
  await submit
    .getByRole('button', { name: 'Submit and view results', exact: true })
    .click();
  await expect(page).toHaveURL(
    /\/student\/assessments\/whole-numbers-quiz\/results\/practice-/,
  );
  await expect(
    page.getByRole('progressbar', { name: 'Assessment score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '100');
  await expect(
    page.getByText('No practice attempts remaining', { exact: true }),
  ).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.screenshot({
    path: testInfo.outputPath('quiz-result-desktop.png'),
  });
  await page
    .getByRole('navigation', { name: 'Portal navigation' })
    .getByRole('link', { name: 'Dashboard', exact: true })
    .click();
  await expect(
    page.getByRole('progressbar', { name: 'Latest quiz score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '100');
  await expect(
    page.getByRole('progressbar', { name: 'Quiz Average', exact: true }),
  ).toHaveAttribute('aria-valuenow', '72');
  await page.reload();
  await expect(
    page.getByRole('progressbar', { name: 'Latest quiz score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '100');
});

test('incomplete submission, attempt limits, expiry, and missing IDs are handled', async ({
  page,
}) => {
  await page.goto(quiz);
  await page
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  await page
    .getByRole('radio', { name: 'Six hundred thousand', exact: true })
    .check();
  await page
    .getByRole('button', { name: 'Submit assessment', exact: true })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Submit assessment?',
    exact: true,
  });
  await expect(dialog).toContainText('answered 1 of 10');
  await dialog
    .getByRole('button', { name: 'Keep reviewing', exact: true })
    .click();
  await page.evaluate((key) => {
    const saved = JSON.parse(sessionStorage.getItem(key) ?? '{}');
    saved.attempts[0].deadline = Date.now() - 1000;
    sessionStorage.setItem(key, JSON.stringify(saved));
  }, storageKey);
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Assessment Results', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toContainText(
    'submitted automatically',
  );
  await expect(
    page.getByRole('progressbar', { name: 'Assessment score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '10');
  await page.goto(quiz);
  await expect(
    page.getByText('No practice attempts remaining', { exact: true }),
  ).toBeVisible();
  await page.goto('/student/assessments?assessmentId=missing');
  await expect(page.getByRole('status')).toContainText('could not be found');
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page).toHaveURL('/student/assessments');
  await page.goto('/student/assessments/missing/attempt');
  await expect(
    page.getByRole('heading', { name: 'Assessment not found', exact: true }),
  ).toBeVisible();
  await page.goto('/student/assessments/whole-numbers-quiz/results/missing');
  await expect(
    page.getByRole('heading', { name: 'Result not found', exact: true }),
  ).toBeVisible();
});

test('assessment overview and quiz remain usable on mobile', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/assessments');
  await expect(
    page.getByRole('heading', { name: 'Quizzes & Assessments', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('assessments-mobile.png'),
    fullPage: true,
  });
  await page.goto(quiz);
  await page
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  await page
    .getByRole('radio', { name: 'Six hundred thousand', exact: true })
    .check();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('quiz-attempt-mobile.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Submit assessment', exact: true })
    .click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Submit and view results', exact: true })
    .click();
  await expect(
    page.getByRole('progressbar', { name: 'Assessment score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '10');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.screenshot({
    path: testInfo.outputPath('quiz-result-mobile.png'),
  });
});
