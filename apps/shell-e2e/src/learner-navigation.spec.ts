import { test, expect } from '@playwright/test';

const learnerPages = [
  ['Dashboard', 'dashboard'],
  ['My Lessons', 'lessons'],
  ['My Subjects', 'subjects'],
  ['Quizzes & Assessments', 'assessments'],
  ['Worksheets', 'worksheets'],
  ['Portfolio Tasks', 'portfolio-tasks'],
  ['Feedback', 'feedback'],
  ['Progress', 'progress'],
  ['Live Classes', 'live-classes'],
  ['Resources', 'resources'],
  ['Ask Tutor', 'ask-tutor'],
  ['Profile', 'profile'],
  ['Settings', 'settings'],
] as const;

test('learner sidebar opens the matching page for every menu item', async ({
  page,
}) => {
  await page.goto('/student');
  const navigation = page.getByRole('navigation', {
    name: 'Portal navigation',
  });
  await expect(navigation.getByRole('link')).toHaveCount(13);

  for (const [label, path] of learnerPages) {
    await test.step(label, async () => {
      const link = navigation.getByRole('link', { name: label, exact: true });
      await expect(link).toHaveAttribute('href', `/student/${path}`);
      await link.click();

      await expect(page).toHaveURL(`/student/${path}`);
      await expect(
        page.getByRole('heading', {
          name:
            path === 'dashboard'
              ? 'Learner Dashboard'
              : path === 'profile'
                ? 'My Profile'
                : label,
          exact: true,
        }),
      ).toBeVisible();
      await expect(page).toHaveTitle(`${label} | SchoolHub`);
      await expect(navigation.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(link).toHaveAttribute('aria-current', 'page');
    });
  }
});

test('direct links, refresh, and browser history retain the page and active menu', async ({
  page,
}) => {
  await page.goto('/student/worksheets?status=in-progress');
  const navigation = page.getByRole('navigation', {
    name: 'Portal navigation',
  });
  const worksheets = navigation.getByRole('link', {
    name: 'Worksheets',
    exact: true,
  });

  await expect(
    page.getByRole('heading', { name: 'Worksheets', exact: true }),
  ).toBeVisible();
  await expect(worksheets).toHaveAttribute('aria-current', 'page');
  await navigation
    .getByRole('link', { name: 'Resources', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Resources', exact: true }),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL('/student/worksheets?status=in-progress');
  await expect(worksheets).toHaveAttribute('aria-current', 'page');
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Worksheets', exact: true }),
  ).toBeVisible();
  await expect(worksheets).toHaveAttribute('aria-current', 'page');
});

test('entry URLs and unknown student paths resolve to the dashboard', async ({
  page,
}) => {
  for (const path of ['/', '/student', '/student/unknown-page']) {
    await test.step(path, async () => {
      await page.goto(path);
      await expect(page).toHaveURL('/student/dashboard');
      await expect(
        page.getByRole('heading', { name: 'Learner Dashboard', exact: true }),
      ).toBeVisible();
    });
  }
});
