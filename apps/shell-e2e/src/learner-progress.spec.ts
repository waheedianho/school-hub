import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });
const totals = 'Progress totals';

test('progress follows the design with record-based totals, subjects, history, and evidence', async ({
  page,
}, testInfo) => {
  await page.goto('/student/progress');
  await expect(
    page.getByRole('heading', { name: 'Progress', exact: true }),
  ).toBeVisible();
  const metrics = page.getByRole('region', { name: totals, exact: true });
  for (const [name, value] of [
    ['Overall Academic Progress', '84'],
    ['Average Quiz Score', '70'],
    ['Worksheet Completion', '80'],
    ['Portfolio Completion', '64'],
  ])
    await expect(
      metrics.getByRole('progressbar', { name, exact: true }),
    ).toHaveAttribute('aria-valuenow', value);
  await expect(
    page
      .getByRole('region', { name: 'Subject progress table', exact: true })
      .getByRole('row'),
  ).toHaveCount(4);
  await expect(
    page.getByRole('img', { name: /^Weekly quiz performance/ }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('table', { name: 'Topic mastery', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(5);
  await expect(
    page
      .getByRole('table', { name: 'Portfolio skills', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(5);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('progress-desktop.png'),
    fullPage: true,
  });
});

test('subject, term, activity focus, and performance period persist across refresh and history', async ({
  page,
}) => {
  await page.goto('/student/progress');
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('mathematics');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('first');
  await page
    .getByRole('combobox', { name: 'Performance period', exact: true })
    .selectOption('4');
  await page.getByRole('tab', { name: 'Quizzes', exact: true }).click();
  await expect(
    page.getByRole('region', { name: totals }).getByRole('progressbar', {
      name: 'Overall Academic Progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '69');
  await expect(
    page
      .getByRole('region', { name: 'Subject progress table', exact: true })
      .getByRole('row'),
  ).toHaveCount(2);
  await page.reload();
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('mathematics');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('first');
  await expect(
    page.getByRole('combobox', { name: 'Performance period', exact: true }),
  ).toHaveValue('4');
  await expect(
    page.getByRole('tab', { name: 'Quizzes', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'Worksheets', exact: true }).click();
  await page.goBack();
  await expect(
    page.getByRole('tab', { name: 'Quizzes', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('third');
  await expect(
    page.getByText('No learning records in this selection.'),
  ).toBeVisible();
  await expect(
    page.getByRole('list', { name: 'Recent achievements', exact: true }),
  ).toContainText('No completed activities');
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await expect(page).toHaveURL('/student/progress');
});

test('topic scores, skill evidence, achievement pagination, and next-step details work', async ({
  page,
}) => {
  await page.goto('/student/progress');
  await page.getByRole('button', { name: /View All Topics/ }).click();
  const topics = page.getByRole('dialog', {
    name: 'All Topic Scores',
    exact: true,
  });
  await expect(topics.locator('tbody tr')).toHaveCount(20);
  await expect(
    topics.locator('tbody tr').filter({ hasText: 'LCM' }),
  ).toContainText('No Score Yet');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /View Skill Evidence/ }).click();
  const skills = page.getByRole('dialog', {
    name: 'Portfolio Skill Evidence',
    exact: true,
  });
  await expect(skills.getByRole('listitem')).toHaveCount(7);
  await expect(
    skills.getByRole('link', { name: /Estimating a Shopping Budget/ }),
  ).toHaveAttribute('href', /rounding-numbers-portfolio/);
  await skills
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  await page.getByRole('button', { name: /View All Achievements/ }).click();
  const achievements = page.getByRole('dialog', {
    name: 'Your Achievements',
    exact: true,
  });
  await expect(
    achievements.getByText('Showing 1 to 10 of 59 achievements'),
  ).toBeVisible();
  await achievements
    .getByRole('button', { name: 'Next page', exact: true })
    .click();
  await expect(
    achievements.getByText('Showing 11 to 20 of 59 achievements'),
  ).toBeVisible();
  await page.reload();
  await expect(
    achievements.getByText('Showing 11 to 20 of 59 achievements'),
  ).toBeVisible();
  await achievements
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  await page.getByRole('button', { name: /View All Recommendations/ }).click();
  await expect(
    page.getByRole('dialog', { name: 'Recommended Next Steps', exact: true }),
  ).toContainText('An attempt is available.');
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', {
      name: 'How is my progress calculated?',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('dialog', {
      name: 'How Your Progress Is Calculated',
      exact: true,
    }),
  ).toContainText(
    'Completing practice does not automatically finish a lesson.',
  );
});

test('dashboard, lessons, subject tables, and feedback preserve learning context', async ({
  page,
}) => {
  await page.goto('/student/dashboard');
  await page
    .getByRole('link')
    .filter({
      has: page.getByRole('progressbar', {
        name: 'Worksheet Completion',
        exact: true,
      }),
    })
    .click();
  await expect(
    page.getByRole('tab', { name: 'Worksheets', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: 'Lessons', exact: true }).click();
  await page
    .getByRole('list', { name: 'Recommended next steps', exact: true })
    .getByRole('link', { name: /Review Whole Numbers/ })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Whole Numbers', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page.getByRole('tab', { name: 'Lessons', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('mathematics');
  await page
    .getByRole('table', { name: /Subject progress, quiz averages/ })
    .getByRole('link', { name: 'Mathematics', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Mathematics', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('mathematics');
  await page.getByRole('link', { name: /View Personalized Feedback/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Feedback', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('mathematics');
  await page.locator('.feedback-item').first().click();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page.getByRole('tab', { name: 'Lessons', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
});

test('worksheet submission updates progress, topic evidence, feedback count, and achievements', async ({
  page,
}) => {
  await page.goto('/student/progress?area=worksheets');
  await page
    .getByRole('list', { name: 'Recommended next steps', exact: true })
    .getByRole('link', { name: /Continue Operations on Whole Numbers/ })
    .click();
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit and Review', exact: true })
    .click();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page
      .getByRole('region', { name: totals })
      .getByRole('progressbar', { name: 'Worksheet Completion', exact: true }),
  ).toHaveAttribute('aria-valuenow', '85');
  await expect(
    page.getByRole('region', { name: totals }).getByRole('progressbar', {
      name: 'Overall Academic Progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '84');
  await expect(
    page
      .getByRole('list', { name: 'Recent achievements', exact: true })
      .getByRole('link')
      .first(),
  ).toContainText('Whole Numbers');
  await expect(
    page
      .getByRole('list', { name: 'Recommended next steps', exact: true })
      .getByRole('link', { name: /Continue Operations on Whole Numbers/ }),
  ).toHaveCount(0);
  await page.reload();
  await expect(
    page
      .getByRole('region', { name: totals })
      .getByRole('progressbar', { name: 'Worksheet Completion', exact: true }),
  ).toHaveAttribute('aria-valuenow', '85');
});

test('a follow-up quiz changes score evidence and respects the exhausted attempt limit', async ({
  page,
}) => {
  await page.goto('/student/progress?area=quizzes');
  await page
    .getByRole('list', { name: 'Recommended next steps', exact: true })
    .getByRole('link', { name: /Practise Whole Numbers/ })
    .click();
  await page
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit assessment', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit and view results', exact: true })
    .click();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page
      .getByRole('region', { name: totals })
      .getByRole('progressbar', { name: 'Average Quiz Score', exact: true }),
  ).toHaveAttribute('aria-valuenow', '66');
  await expect(
    page
      .getByRole('table', { name: 'Topic mastery', exact: true })
      .locator('tbody tr')
      .filter({ hasText: 'Whole Numbers' }),
  ).toContainText('0%');
  await expect(
    page
      .getByRole('list', { name: 'Recommended next steps', exact: true })
      .getByRole('link', { name: /Practise Whole Numbers/ }),
  ).toHaveCount(0);
  await expect(
    page
      .getByRole('list', { name: 'Recent achievements', exact: true })
      .getByRole('link')
      .first(),
  ).toContainText('0%');
});

test('a portfolio submission updates handed-in progress without inventing a tutor grade', async ({
  page,
}) => {
  await page.goto('/student/progress?area=portfolio');
  const before = await page
    .getByRole('progressbar', {
      name: 'Portfolio skills evidence',
      exact: true,
    })
    .getAttribute('aria-valuenow');
  await page
    .getByRole('list', { name: 'Recommended next steps', exact: true })
    .getByRole('link', { name: /Continue Market Price Comparison/ })
    .click();
  await page
    .getByRole('textbox', { name: 'My written work', exact: true })
    .fill(
      'I compared prices at two shops and checked the total cost of five fruits.',
    );
  await page
    .getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    })
    .fill(
      'I learned to compare unit prices and check my calculations before deciding where to shop.',
    );
  await page
    .getByRole('button', { name: 'Review Submission', exact: true })
    .click();
  await page.getByRole('button', { name: 'Submit Work', exact: true }).click();
  await page
    .getByRole('button', { name: 'Confirm Submission', exact: true })
    .click();
  await expect(
    page.getByRole('heading', {
      name: 'Practice Submission Saved',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Progress', exact: true })
    .click();
  await expect(
    page
      .getByRole('region', { name: totals })
      .getByRole('progressbar', { name: 'Portfolio Completion', exact: true }),
  ).toHaveAttribute('aria-valuenow', '71');
  await expect(
    page.getByRole('progressbar', {
      name: 'Portfolio skills evidence',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', before ?? '');
  await page.getByRole('button', { name: /View Skill Evidence/ }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Portfolio Skill Evidence', exact: true })
      .getByRole('listitem'),
  ).toHaveCount(7);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(
    page
      .getByRole('list', { name: 'Recent achievements', exact: true })
      .getByRole('link')
      .first(),
  ).toContainText('Market Price Comparison');
  await expect(
    page
      .getByRole('list', { name: 'Recommended next steps', exact: true })
      .getByRole('link', { name: /Continue Market Price Comparison/ }),
  ).toHaveCount(0);
});

test('mobile progress remains readable, scrolls its subject table, and opens usable dialogs', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/progress');
  await expect(
    page.getByRole('heading', { name: 'Progress', exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const chartScroll = page.locator(
    'school-hub-performance-chart .chart-scroll',
  );
  await expect
    .poll(() => chartScroll.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await page.screenshot({
    path: testInfo.outputPath('progress-mobile.png'),
    fullPage: true,
  });
  const layout = await page.evaluate(() => {
    const table = document.querySelector('.table-scroll');
    const copy = document.querySelector('school-hub-score-table tbody th');
    return {
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      tableScroll: table ? table.scrollWidth > table.clientWidth : false,
      font: copy ? parseFloat(getComputedStyle(copy).fontSize) : 0,
      masteryFits: Array.from(
        document.querySelectorAll(
          'school-hub-score-table:first-of-type school-hub-status-badge',
        ),
      ).every((badge) => badge.getBoundingClientRect().right <= innerWidth),
      latestPointVisible: Array.from(
        document.querySelectorAll('.point-value'),
      ).every(
        (label) =>
          label.getBoundingClientRect().left >= 0 &&
          label.getBoundingClientRect().right <= innerWidth,
      ),
    };
  });
  expect(layout.scroll).toBeLessThanOrEqual(layout.width);
  expect(layout.tableScroll).toBe(true);
  expect(layout.font).toBeGreaterThanOrEqual(14);
  expect(layout.masteryFits).toBe(true);
  expect(layout.latestPointVisible).toBe(true);
  await page.getByRole('button', { name: /View All Topics/ }).click();
  const dialog = page.getByRole('dialog', {
    name: 'All Topic Scores',
    exact: true,
  });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box?.width ?? 999).toBeLessThanOrEqual(390);
  await dialog
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  await expect(dialog).toBeHidden();
});

test('performance and topic mastery preserve the design structure and compact alignment', async ({
  page,
}, testInfo) => {
  await page.goto('/student/progress');
  await expect(
    page.getByText('Loading your saved learning progress…'),
  ).toBeHidden();
  const performance = page.locator('school-hub-dashboard-card').filter({
    has: page.getByRole('heading', {
      name: 'Performance Overview',
      exact: true,
    }),
  });
  await expect(performance.locator('.week-label')).toHaveCount(8);
  await expect(performance.locator('.point-value')).toHaveCount(2);
  await expect(performance.locator('.area-shade')).toHaveCount(1);
  await expect(performance.locator('figcaption strong')).toHaveCount(0);
  const labelsAbovePoints = await performance
    .locator('.graph')
    .evaluate((graph) => {
      const points = Array.from(graph.querySelectorAll('.point'));
      return Array.from(graph.querySelectorAll('.point-value')).every(
        (label, index) =>
          label.getBoundingClientRect().bottom <
          points[index].getBoundingClientRect().top,
      );
    });
  expect(labelsAbovePoints).toBe(true);
  await performance
    .getByRole('combobox', { name: 'Performance period', exact: true })
    .selectOption('4');
  await expect(performance.locator('.week-label')).toHaveCount(4);
  await performance
    .getByRole('combobox', { name: 'Performance period', exact: true })
    .selectOption('8');
  const table = page.getByRole('table', { name: 'Topic mastery', exact: true });
  await expect(table.getByRole('columnheader')).toHaveText([
    'Topic',
    'Progress',
    'Mastery',
  ]);
  await expect(table.locator('tbody tr')).toHaveCount(5);
  await expect(table.locator('tbody school-hub-status-badge i')).toHaveCount(5);
  const rowLayout = await table
    .locator('tbody tr')
    .first()
    .evaluate((row) => {
      const value = row.querySelector('.score strong');
      const bar = row.querySelector('school-hub-progress-bar');
      return {
        height: row.getBoundingClientRect().height,
        aligned:
          !!value &&
          !!bar &&
          Math.abs(
            value.getBoundingClientRect().top +
              value.getBoundingClientRect().height / 2 -
              (bar.getBoundingClientRect().top +
                bar.getBoundingClientRect().height / 2),
          ) < 2,
      };
    });
  expect(rowLayout.height).toBeLessThan(60);
  expect(rowLayout.aligned).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  await performance.screenshot({
    path: testInfo.outputPath('performance-overview-detail.png'),
  });
  await page
    .locator('.evidence-grid')
    .screenshot({ path: testInfo.outputPath('topic-mastery-detail.png') });
});
