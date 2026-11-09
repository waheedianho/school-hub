import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });

test('subjects show lesson-derived progress and the enrolled catalog', async ({
  page,
}, testInfo) => {
  await page.goto('/student/subjects');
  await expect(
    page.getByRole('heading', { name: 'My Subjects', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveCount(3);
  await expect(page.getByText('16 / 20', { exact: true })).toBeVisible();
  await expect(page.getByText('84%', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('progressbar', {
      name: 'Mathematics progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '73');
  await expect(
    page.getByRole('progressbar', {
      name: 'English Language progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '86');
  await expect(
    page.getByRole('progressbar', {
      name: 'Basic Science progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '100');
  await expect(
    page
      .getByRole('navigation', { name: 'Portal navigation' })
      .getByRole('link', { name: 'My Subjects', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('my-subjects-desktop.png'),
    fullPage: true,
  });
});

test('subject search, term, status, and sort state combine and survive refresh', async ({
  page,
}) => {
  await page.goto('/student/subjects');
  await page
    .getByRole('searchbox', { name: 'Search subjects' })
    .fill('English');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('second');
  await page
    .getByRole('combobox', { name: 'Sort subjects', exact: true })
    .selectOption('progress-desc');
  await page.getByRole('tab', { name: /^Completed/ }).click();
  await expect(
    page
      .getByRole('tabpanel')
      .getByRole('heading', { name: 'English Language', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveCount(1);
  await expect(
    page.getByRole('progressbar', {
      name: 'English Language progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '100');
  await page.reload();
  await expect(
    page.getByRole('searchbox', { name: 'Search subjects' }),
  ).toHaveValue('English');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('second');
  await expect(
    page.getByRole('combobox', { name: 'Sort subjects', exact: true }),
  ).toHaveValue('progress-desc');
  await expect(page.getByRole('tab', { name: /^Completed/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page
    .getByRole('searchbox', { name: 'Search subjects' })
    .fill('not-a-subject');
  await expect(
    page.getByRole('heading', { name: 'No subjects found', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await expect(page).toHaveURL('/student/subjects');
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveCount(3);
});

test('sorting, status tabs, and keyboard navigation preserve subject state', async ({
  page,
}) => {
  await page.goto('/student/subjects');
  await page
    .getByRole('combobox', { name: 'Sort subjects', exact: true })
    .selectOption('progress-desc');
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText([
    'Basic Science',
    'English Language',
    'Mathematics',
  ]);
  await page
    .getByRole('combobox', { name: 'Sort subjects', exact: true })
    .selectOption('progress-asc');
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText([
    'Mathematics',
    'English Language',
    'Basic Science',
  ]);
  await page.getByRole('tab', { name: /^Completed/ }).click();
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText([
    'Basic Science',
  ]);
  await page.goBack();
  await expect(
    page.getByRole('tab', { name: /^All Subjects/ }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('tab', { name: /^All Subjects/ }).focus();
  await page.keyboard.press('End');
  await expect(
    page.getByRole('heading', { name: 'No subjects found', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveCount(3);
  await page.goto('/student/subjects?term=invalid&status=invalid&sort=invalid');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('');
  await expect(
    page.getByRole('combobox', { name: 'Sort subjects', exact: true }),
  ).toHaveValue('recommended');
  await expect(page.getByRole('tabpanel').getByRole('link')).toHaveCount(3);
});

test('dashboard subjects open an overview and continue into the correct lesson', async ({
  page,
}) => {
  await page.goto('/student/dashboard');
  await page.getByRole('link', { name: /^Mathematics/ }).click();
  await expect(page).toHaveURL('/student/subjects?subjectId=mathematics');
  const maths = page.getByRole('dialog', { name: 'Mathematics', exact: true });
  await expect(maths).toBeVisible();
  await expect(maths.getByRole('link', { name: /^Open lesson/ })).toHaveCount(
    8,
  );
  await expect(
    maths.getByRole('progressbar', {
      name: 'Mathematics overview progress',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '73');
  await maths
    .getByRole('link', { name: 'Continue learning', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/lessons?subject=mathematics&lessonId=whole-numbers',
  );
  await expect(
    page.getByRole('dialog', { name: 'Whole Numbers', exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(maths).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL('/student/subjects');
  await page
    .getByRole('tabpanel')
    .getByRole('link', { name: /^Basic Science/ })
    .click();
  await page
    .getByRole('dialog', { name: 'Basic Science', exact: true })
    .getByRole('link', { name: 'Review lessons', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/lessons?subject=basic-science&status=completed',
  );
  await expect(page.getByText('Showing 1 to 5 of 5 lessons')).toBeVisible();
});

test('subject overviews retain context for resources and handle missing records', async ({
  page,
}) => {
  await page.goto('/student/subjects?subjectId=english-language&term=second');
  const english = page.getByRole('dialog', {
    name: 'English Language',
    exact: true,
  });
  await expect(english.getByRole('link', { name: /^Open lesson/ })).toHaveCount(
    1,
  );
  await english.getByRole('link', { name: 'Resources', exact: true }).click();
  await expect(page).toHaveURL(
    '/student/resources?subjectId=english-language&term=second',
  );
  await page.goBack();
  await english.getByRole('link', { name: 'Ask a tutor', exact: true }).click();
  await expect(page).toHaveURL(
    '/student/ask-tutor?contextType=subject&contextId=english-language&subjectId=english-language',
  );
  await page.goto('/student/subjects?subjectId=missing-subject');
  await expect(page.getByRole('status')).toContainText(
    'That subject could not be found',
  );
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page).toHaveURL('/student/subjects');
  await page.goto('/student/subjects?subjectId=mathematics&term=third');
  const maths = page.getByRole('dialog', { name: 'Mathematics', exact: true });
  await expect(
    maths.getByText('There are no Mathematics lessons in Third Term.'),
  ).toBeVisible();
  await maths
    .getByRole('link', { name: 'View all terms for this subject', exact: true })
    .click();
  await expect(page).toHaveURL('/student/subjects?subjectId=mathematics');
  await expect(maths.getByRole('link', { name: /^Open lesson/ })).toHaveCount(
    8,
  );
});

test('mobile subjects and their overview fit the viewport', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/subjects');
  await expect(
    page.getByRole('heading', { name: 'My Subjects', exact: true }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await page
    .getByRole('tabpanel')
    .getByRole('link', { name: /^Mathematics/ })
    .click();
  const maths = page.getByRole('dialog', { name: 'Mathematics', exact: true });
  await expect(maths).toBeVisible();
  await expect(
    maths.getByRole('button', { name: 'Close dialog', exact: true }),
  ).toBeInViewport();
  await page.screenshot({
    path: testInfo.outputPath('my-subjects-mobile-dialog.png'),
  });
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('my-subjects-mobile.png'),
    fullPage: true,
  });
});
