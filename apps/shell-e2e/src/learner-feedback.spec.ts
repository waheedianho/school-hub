import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });
const current = 'whole-numbers-feedback';
const feedback = `/student/feedback?feedbackId=${current}`;

test('feedback overview derives counts and supports category, subject, term, search, sorting, and pagination', async ({
  page,
}, testInfo) => {
  await page.goto('/student/feedback');
  await expect(
    page.getByRole('heading', { name: 'Feedback', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'All Feedback 42', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Quiz Feedback 19', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Worksheet Feedback 16', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Portfolio Feedback 7', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Showing 1 to 5 of 42 feedback items'),
  ).toBeVisible();
  await expect(page.locator('#selected-feedback-title')).toHaveText(
    'Whole Numbers Quiz',
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('feedback-desktop.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(
    page.getByText('Showing 6 to 10 of 42 feedback items'),
  ).toBeVisible();
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('first');
  await expect(
    page.getByRole('tab', { name: 'All Feedback 34', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page
    .getByRole('searchbox', { name: 'Search feedback', exact: true })
    .fill('parts');
  await page
    .getByRole('combobox', { name: 'Sort feedback', exact: true })
    .selectOption('score');
  await page.getByRole('tab', { name: /Worksheet Feedback/ }).click();
  await expect(
    page.getByText('Showing 1 to 1 of 1 feedback items'),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('searchbox', { name: 'Search feedback', exact: true }),
  ).toHaveValue('parts');
  await expect(
    page.getByRole('combobox', { name: 'Sort feedback', exact: true }),
  ).toHaveValue('score');
  await expect(page.locator('.feedback-item')).toHaveCount(1);
  await page
    .getByRole('searchbox', { name: 'Search feedback', exact: true })
    .fill('unmatched-feedback');
  await expect(
    page.getByRole('heading', { name: 'No feedback found', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await expect(page).toHaveURL('/student/feedback');
});

test('review status persists and stays in sync with the dashboard feedback card', async ({
  page,
}) => {
  await page.goto(`${feedback}&tab=needs-action`);
  await page
    .getByRole('button', { name: 'Mark as Reviewed', exact: true })
    .click();
  await expect(page.locator('school-hub-feedback-detail')).toContainText(
    'Reviewed',
  );
  await expect(
    page.getByText(
      'This selected feedback is outside the current list page or filters.',
    ),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Mark as Needs Action', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Portal navigation', exact: true })
    .getByRole('link', { name: 'Dashboard', exact: true })
    .click();
  await expect(page.locator('.feedback-panel')).toContainText('Reviewed');
  await page.locator('.feedback-panel').click();
  await expect(page.locator('#selected-feedback-title')).toHaveText(
    'Whole Numbers Quiz',
  );
  await page
    .getByRole('button', { name: 'Mark as Needs Action', exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Mark as Reviewed', exact: true }),
  ).toBeVisible();
});

test('marked quiz, worksheet, and portfolio work return to the exact feedback selection', async ({
  page,
}) => {
  for (const [id, label, destination] of [
    [
      current,
      'View Answer Review',
      '/student/assessments/whole-numbers-quiz/results/sample-whole-numbers-quiz',
    ],
    [
      'worksheet-feedback-reading-whole-numbers-worksheet',
      'View Marked Work',
      '/student/worksheets/reading-whole-numbers-worksheet',
    ],
    [
      'portfolio-feedback-rounding-numbers-portfolio',
      'View Reviewed Submission',
      '/student/portfolio-tasks/rounding-numbers-portfolio',
    ],
  ]) {
    await page.goto(`/student/feedback?feedbackId=${id}&sort=score`);
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(destination);
    await page.reload();
    await page
      .getByRole('link', { name: 'Back to Feedback', exact: true })
      .click();
    await expect
      .poll(() => new URL(page.url()).searchParams.get('feedbackId'))
      .toBe(id);
    await expect(
      page.getByRole('combobox', { name: 'Sort feedback', exact: true }),
    ).toHaveValue('score');
    await expect(page.locator('#feedback-detail')).toBeInViewport();
  }
});

test('follow-up practice retains feedback context and a submission creates automatic feedback', async ({
  page,
}) => {
  await page.goto(feedback);
  await page.getByRole('link', { name: /Take Follow-up Quiz/ }).click();
  await page
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Quiz in Progress', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Back to Feedback', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Submit assessment', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit and view results', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Assessment Results', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Feedback', exact: true })
    .click();
  await expect(page.locator('#selected-feedback-title')).toHaveText(
    'Whole Numbers Quiz',
  );
  await expect(
    page.getByRole('link', { name: /View Quiz Details/ }),
  ).toBeVisible();
  await page
    .getByRole('tab', { name: 'Quiz Feedback 20', exact: true })
    .click();
  await expect(page.locator('school-hub-feedback-detail')).toContainText(
    'Automatic answer review',
  );
  await expect(page.locator('school-hub-feedback-detail')).toContainText(
    'Your practice attempt scored 0%.',
  );
  await page
    .getByRole('link', { name: 'View Answer Review', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Answer Review', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('No practice attempts remaining', { exact: true }),
  ).toBeVisible();
});

test('worksheet submission becomes feedback and tutor links retain the selected activity', async ({
  page,
}) => {
  await page.goto(feedback);
  await page.getByRole('link', { name: /Continue Practice/ }).click();
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit and Review', exact: true })
    .click();
  await page
    .getByRole('link', { name: 'Back to Feedback', exact: true })
    .click();
  await page
    .getByRole('tab', { name: 'Worksheet Feedback 17', exact: true })
    .click();
  await expect(page.locator('school-hub-feedback-detail')).toContainText(
    'Automatic answer review',
  );
  await expect(page.locator('school-hub-feedback-detail')).toContainText(
    'Your submitted practice worksheet scored',
  );
  await expect(
    page.getByRole('link', { name: /Review Practice/ }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Ask Tutor About This', exact: true })
    .click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get('contextId'))
    .toBe('worksheet-feedback-whole-numbers-worksheet');
  await expect
    .poll(() => new URL(page.url()).searchParams.get('activityId'))
    .toBe('whole-numbers-worksheet');
  await expect(
    page.getByRole('heading', { name: 'Ask Tutor', exact: true }),
  ).toBeVisible();
});

test('invalid selections and mobile feedback remain readable and navigable', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/feedback?feedbackId=missing');
  await expect(
    page.getByText('That feedback could not be found.'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.locator('.feedback-item').first().click();
  await expect(page.locator('#selected-feedback-title')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#selected-feedback-title')).toBeInViewport();
  await expect
    .poll(
      async () =>
        (await page.locator('#selected-feedback-title').boundingBox())?.y ?? -1,
    )
    .toBeGreaterThanOrEqual(75);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('feedback-mobile.png'),
    fullPage: true,
  });
  const layout = await page.evaluate(() => {
    const note = document.querySelector(
      'school-hub-feedback-note p, school-hub-feedback-note li',
    );
    return {
      width: window.innerWidth,
      scroll: document.documentElement.scrollWidth,
      noteSize: note ? parseFloat(getComputedStyle(note).fontSize) : 0,
    };
  });
  expect(layout.scroll).toBeLessThanOrEqual(layout.width);
  expect(layout.noteSize).toBeGreaterThanOrEqual(14);
  await page
    .getByRole('button', { name: 'Mark as Reviewed', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Mark as Needs Action', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'View Answer Review', exact: true })
    .click();
  await page
    .getByRole('link', { name: 'Back to Feedback', exact: true })
    .click();
  await expect(page.locator('#selected-feedback-title')).toBeInViewport();
});
