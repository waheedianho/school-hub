import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1672, height: 1000 } });

test('lessons overview matches the learner design and uses real pagination counts', async ({
  page,
}, testInfo) => {
  await page.goto('/student/lessons');
  await expect(
    page.getByRole('heading', { name: 'My Lessons', exact: true }),
  ).toBeVisible();
  for (const title of [
    'Current Lesson',
    'Next Recommended Lesson',
    'Lesson Stats',
    'Lesson Flow',
    'Pending Lesson Tasks',
    'Common Mistake to Watch',
    'Tutor Note',
    'Recently Completed Lessons',
    'Learning Tips',
  ]) {
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole('progressbar', {
      name: 'Current lesson completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '80');
  await expect(
    page.getByRole('table', { name: 'Your lessons' }).getByRole('row'),
  ).toHaveCount(6);
  await expect(page.getByText('Showing 1 to 5 of 20 lessons')).toBeVisible();
  await expect(
    page
      .getByRole('navigation', { name: 'Portal navigation' })
      .getByRole('link', { name: 'My Lessons', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('my-lessons-desktop.png'),
    fullPage: true,
  });
});

test('search, subject, term, and status filters combine and survive refresh', async ({
  page,
}) => {
  await page.goto('/student/lessons');
  await page.getByRole('tab', { name: 'Upcoming', exact: true }).click();
  await expect(page.getByText('Showing 1 to 3 of 3 lessons')).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Status', exact: true }),
  ).toHaveValue('upcoming');
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('mathematics');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('first');
  await page.getByRole('searchbox', { name: 'Search lessons' }).fill('HCF');
  await expect(page.getByText('Showing 1 to 1 of 1 lessons')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Preview HCF', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('searchbox', { name: 'Search lessons' }),
  ).toHaveValue('HCF');
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('mathematics');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('first');
  await expect(
    page.getByRole('tab', { name: 'Upcoming', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page
    .getByRole('searchbox', { name: 'Search lessons' })
    .fill('not-a-lesson');
  await expect(
    page.getByText('No lessons found', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Showing 0 to 0 of 0 lessons')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next page', exact: true }),
  ).toBeDisabled();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await expect(page.getByText('Showing 1 to 5 of 20 lessons')).toBeVisible();
  await expect(page).toHaveURL('/student/lessons');
});

test('pagination, keyboard tabs, and browser history preserve the lesson list', async ({
  page,
}) => {
  await page.goto('/student/lessons?page=2');
  await expect(page.getByText('Showing 6 to 10 of 20 lessons')).toBeVisible();
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(page.getByText('Showing 11 to 15 of 20 lessons')).toBeVisible();
  await page.getByRole('tab', { name: 'Completed', exact: true }).click();
  await expect(page.getByText('Showing 1 to 5 of 16 lessons')).toBeVisible();
  await page.goBack();
  await expect(page.getByText('Showing 11 to 15 of 20 lessons')).toBeVisible();
  await page.getByRole('tab', { name: 'All Lessons', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(
    page.getByRole('tab', { name: 'Upcoming', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(
    page.getByRole('tab', { name: 'All Lessons', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.goto(
    '/student/lessons?page=999&status=invalid&subject=invalid&term=invalid',
  );
  await expect(page.getByText('Showing 16 to 20 of 20 lessons')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next page', exact: true }),
  ).toBeDisabled();
});

test('lesson overviews support continue, locked preview, review, and tutor actions', async ({
  page,
}) => {
  await page.goto('/student/lessons?lessonId=whole-numbers');
  const current = page.getByRole('dialog', {
    name: 'Whole Numbers',
    exact: true,
  });
  await expect(current).toBeVisible();
  await expect(
    current.getByText('Read, write, compare, and order whole numbers.'),
  ).toBeVisible();
  await expect(
    current.getByRole('link', { name: 'Open learning resources' }),
  ).toHaveAttribute(
    'href',
    '/student/resources?lessonId=whole-numbers&subjectId=mathematics',
  );
  await page.keyboard.press('Escape');
  await expect(current).toBeHidden();
  await expect(page).toHaveURL('/student/lessons');

  await page.getByRole('button', { name: 'Preview LCM', exact: true }).click();
  const preview = page.getByRole('dialog', { name: 'LCM', exact: true });
  await expect(preview.getByText(/activities will unlock/)).toBeVisible();
  await expect(
    preview.getByRole('link', { name: 'Open learning resources' }),
  ).toHaveCount(0);
  await preview.getByRole('button', { name: 'Close dialog' }).click();

  await page
    .getByRole('button', { name: 'Review Parts of Speech', exact: true })
    .click();
  const review = page.getByRole('dialog', {
    name: 'Parts of Speech',
    exact: true,
  });
  await expect(
    review.getByRole('link', { name: 'Review learning resources' }),
  ).toBeVisible();
  await review.getByRole('button', { name: 'Close dialog' }).click();
  await page
    .getByRole('button', {
      name: 'More actions for Whole Numbers',
      exact: true,
    })
    .click();
  await page
    .getByRole('dialog', { name: 'Whole Numbers actions', exact: true })
    .getByRole('link', { name: 'Ask your tutor', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/ask-tutor?contextType=lesson&contextId=whole-numbers&subjectId=mathematics',
  );
});

test('lesson activity links and task dialog carry the selected record', async ({
  page,
}) => {
  await page.goto('/student/lessons?status=in-progress');
  await page
    .getByRole('table', { name: 'Your lessons' })
    .getByRole('link', { name: 'Open quiz for Whole Numbers', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/assessments?assessmentId=whole-numbers-quiz&lessonId=whole-numbers',
  );
  await page.goBack();
  await page
    .getByRole('button', { name: 'View all tasks', exact: true })
    .click();
  const tasks = page.getByRole('dialog', {
    name: 'Pending lesson tasks',
    exact: true,
  });
  await expect(tasks.getByRole('link')).toHaveCount(3);
  await tasks.getByRole('link', { name: /Worksheet Submission/ }).click();
  await expect(page).toHaveURL(
    '/student/worksheets?worksheetId=whole-numbers-worksheet',
  );
  await page.goBack();
  await expect(tasks).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('tab', { name: 'In Progress', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.goto('/student/lessons?lessonId=missing-lesson');
  await expect(page.getByRole('status')).toContainText(
    'That lesson could not be found',
  );
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page).toHaveURL('/student/lessons');
});

test('mobile lessons stay within the viewport and the lesson dialog is usable', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/lessons');
  await expect(
    page.getByRole('heading', { name: 'My Lessons', exact: true }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await page
    .getByRole('button', { name: 'Continue Lesson', exact: true })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Whole Numbers',
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Close dialog' }),
  ).toBeInViewport();
  await page.screenshot({
    path: testInfo.outputPath('my-lessons-mobile-dialog.png'),
  });
  await page.keyboard.press('Escape');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('my-lessons-mobile.png'),
    fullPage: true,
  });
});
