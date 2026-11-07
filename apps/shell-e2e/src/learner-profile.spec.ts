import { expect, Page, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1000 } });
const storageKey = 'school-hub:learner-profile:v1';
async function openProfile(page: Page, query = '') {
  await page.goto('/student/profile' + query);
  await expect(
    page.getByRole('button', { name: 'Edit Profile', exact: true }),
  ).toBeEnabled();
}
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-05T12:00:00+01:00'));
});

test('profile follows the design with consistent learning records and linked subjects', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await openProfile(page);
  await expect(page).toHaveTitle('Profile | SchoolHub');
  const snapshot = page.getByRole('region', {
    name: 'Profile learning snapshot',
    exact: true,
  });
  await expect(snapshot.locator('school-hub-summary-stat')).toHaveCount(4);
  await expect(
    snapshot
      .locator('school-hub-summary-stat')
      .filter({ hasText: 'Lessons Completed' }),
  ).toContainText('16');
  await expect(
    snapshot
      .locator('school-hub-summary-stat')
      .filter({ hasText: 'Average Quiz Score' }),
  ).toContainText('70%');
  await expect(
    snapshot
      .locator('school-hub-summary-stat')
      .filter({ hasText: 'Badges Earned' }),
  ).toContainText('2');
  const subjects = page.getByRole('list', {
    name: 'Profile subject progress',
    exact: true,
  });
  await expect(subjects.locator(':scope > li')).toHaveCount(3);
  for (const value of ['73%', '86%', '100%'])
    await expect(subjects.getByText(value, { exact: true })).toBeVisible();
  await expect(
    subjects.getByRole('link', { name: 'Continue', exact: true }).first(),
  ).toHaveAttribute('href', '/student/lessons?lessonId=whole-numbers');
  await expect(
    subjects.getByRole('link', { name: 'Review', exact: true }),
  ).toHaveCount(1);
  await expect(page.locator('.streak-count strong')).toHaveText('4');
  await expect(
    page
      .getByRole('list', { name: 'This week’s recorded learning', exact: true })
      .getByRole('button'),
  ).toHaveCount(7);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('profile-desktop.png'),
    fullPage: true,
  });
  await page.getByRole('link', { name: 'View Progress', exact: true }).click();
  await expect(page).toHaveURL('/student/progress');
  await openProfile(page);
  await page
    .getByRole('link', { name: 'Manage Subjects', exact: true })
    .click();
  await expect(page).toHaveURL('/student/subjects');
  expect(errors).toEqual([]);
});

test('profile validates edits, saves locally, and updates the shared learner identity', async ({
  page,
  context,
}) => {
  await openProfile(page);
  await page
    .getByRole('button', { name: 'Open profile menu', exact: true })
    .click();
  await page.getByRole('link', { name: /My Profile$/ }).click();
  await page.getByRole('button', { name: 'Edit Profile', exact: true }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Edit Profile',
    exact: true,
  });
  await dialog.getByLabel('Full name', { exact: true }).fill(' ');
  await dialog.getByLabel('Contact email', { exact: true }).fill('invalid');
  await dialog
    .getByLabel('Phone number (optional)', { exact: true })
    .fill('invalid');
  await dialog
    .getByRole('button', { name: 'Save Profile', exact: true })
    .click();
  await expect(dialog.locator('[aria-invalid="true"]')).toHaveCount(3);
  await dialog.getByLabel('Full name', { exact: true }).fill(' Amina Bello ');
  await dialog
    .getByLabel('Contact email', { exact: true })
    .fill('amina@example.test');
  await dialog
    .getByLabel('Phone number (optional)', { exact: true })
    .fill('+234 800 123 4567');
  await dialog
    .getByLabel('Location (optional)', { exact: true })
    .fill('Abuja, Nigeria');
  await dialog
    .getByRole('button', { name: 'Save Profile', exact: true })
    .click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'Amina Bello',
  );
  await expect(
    page.getByRole('button', { name: 'Open profile menu', exact: true }),
  ).toContainText('Amina B.');
  await page.reload();
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'amina@example.test',
  );
  const second = await context.newPage();
  await openProfile(second, '?view=edit');
  await expect(second.getByLabel('Full name', { exact: true })).toHaveValue(
    'Amina Bello',
  );
  await second.getByLabel('Full name', { exact: true }).fill('Amina Yusuf');
  await second
    .getByRole('button', { name: 'Save Profile', exact: true })
    .click();
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'Amina Yusuf',
  );
  await second.close();
  await page.goto('/student/dashboard');
  await expect(page.locator('.dashboard-welcome')).toContainText('Amina');
});

test('cancel preserves saved profile and goals, and goal targets restore after refresh', async ({
  page,
}) => {
  await openProfile(page, '?view=edit');
  await page.getByLabel('Full name', { exact: true }).fill('Unsaved Name');
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'Sarah A.',
  );
  await page.getByRole('button', { name: 'Edit Goals', exact: true }).click();
  let dialog = page.getByRole('dialog', {
    name: 'Edit Learning Goals',
    exact: true,
  });
  await dialog.locator('#goal-target-0').fill('101');
  await dialog.getByRole('button', { name: 'Save Goals', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText('1–100%');
  await dialog.locator('#goal-target-0').fill('90');
  await dialog.locator('#goal-target-1').fill('16');
  await dialog.getByRole('button', { name: 'Save Goals', exact: true }).click();
  const goals = page.getByRole('list', {
    name: 'Personal learning goals',
    exact: true,
  });
  await expect(goals).toContainText('Complete 16 lessons');
  await expect(goals).toContainText('Goal reached');
  await page.reload();
  await page.getByRole('button', { name: 'Edit Goals', exact: true }).click();
  dialog = page.getByRole('dialog', {
    name: 'Edit Learning Goals',
    exact: true,
  });
  await expect(dialog.locator('#goal-target-1')).toHaveValue('16');
  await expect(dialog.locator('#goal-subject-0')).toHaveValue(
    'english-language',
  );
  await dialog.locator('#goal-target-1').fill('99');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(goals).toContainText('Complete 16 lessons');
});

test('achievements, snapshot explanation, and activity calendar expose actual supporting records', async ({
  page,
}) => {
  await openProfile(page);
  await page
    .getByRole('button', { name: 'View On Track achievement', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'On Track', exact: true }),
  ).toContainText('Keep practising');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'View All', exact: true }).click();
  await expect(
    page.getByRole('dialog', { name: 'My Achievements', exact: true }),
  ).toContainText('2 of 3 milestones earned');
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', {
      name: 'Based on recorded learning and practice',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('dialog', {
      name: 'About Your Learning Snapshot',
      exact: true,
    }),
  ).toContainText('recorded worksheet and portfolio time');
  await page.keyboard.press('Escape');
  await page.goto(
    '/student/profile?view=calendar&month=2026-10&date=2026-10-30',
  );
  const dialog = page.getByRole('dialog', {
    name: 'Learning Activity Calendar',
    exact: true,
  });
  await expect(
    dialog.getByRole('heading', { name: 'October 2026', exact: true }),
  ).toBeVisible();
  const marked = dialog
    .locator('.days button')
    .filter({ has: page.locator('.dot') })
    .first();
  await marked.click();
  await expect(dialog.locator('.calendar-evidence a').first()).toBeVisible();
  await expect(dialog.locator('.calendar-evidence a').first()).toHaveAttribute(
    'href',
    /^\/student\/(lessons|assessments|worksheets|portfolio-tasks)/,
  );
  await dialog.getByRole('button', { name: 'Next month', exact: true }).click();
  await expect(
    dialog.getByRole('heading', { name: 'November 2026', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    dialog.getByRole('heading', { name: 'November 2026', exact: true }),
  ).toBeVisible();
});

test('Wi-Fi preference blocks cellular downloads and explicitly confirms unknown connections', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: { type: 'cellular' },
    }),
  );
  await openProfile(page);
  const wifi = page.getByRole('switch', {
    name: 'Download Over Wi-Fi Only',
    exact: true,
  });
  await wifi.check();
  await page.reload();
  await expect(wifi).toBeChecked();
  await page.goto('/student/resources/place-value-notes');
  const downloadResource = page
    .getByRole('list', { name: 'Resource downloads', exact: true })
    .getByRole('button', { name: /^Place Value Made Clear/ });
  await downloadResource.click();
  const dialog = page.getByRole('dialog', {
    name: 'Resource Download Connection',
    exact: true,
  });
  await expect(dialog).toContainText('Connect to an allowed network');
  await expect(
    dialog.getByRole('button', { name: 'Download Once', exact: true }),
  ).toHaveCount(0);
  await dialog
    .getByRole('button', { name: 'Cancel Download', exact: true })
    .click();
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: {},
    }),
  );
  await downloadResource.click();
  await expect(dialog).toContainText(
    'cannot identify whether you are using Wi-Fi',
  );
  const pending = page.waitForEvent('download');
  await dialog
    .getByRole('button', { name: 'Download Once', exact: true })
    .click();
  const download = await pending;
  expect(
    (await readFile((await download.path()) as string)).toString(),
  ).toContain('4,268');
  await expect(dialog).toBeHidden();
  await page.goto('/student/resources?view=storage');
  await expect(
    page.getByRole('dialog', { name: 'Manage Resource Storage', exact: true }),
  ).toContainText('1 downloads started');
});

test('security and preference rows point to their registered settings categories', async ({
  page,
}) => {
  await openProfile(page);
  for (const [name, destination] of [
    ['Change Password', 'security'],
    ['Sign-in Email', 'account'],
    ['Notification Settings', 'notifications'],
    ['Preferred Language', 'learning'],
  ]) {
    await expect(
      page.getByRole('link', { name: new RegExp(name) }),
    ).toHaveAttribute('href', '/student/settings?section=' + destination);
  }
  await page.getByRole('link', { name: /Change Password/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Settings', exact: true }),
  ).toBeVisible();
});

test('damaged or unavailable local storage recovers without losing the current profile session', async ({
  page,
}) => {
  await page.addInitScript(
    (key) => localStorage.setItem(key, '{invalid'),
    storageKey,
  );
  await openProfile(page);
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'Sarah A.',
  );
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new Error('Storage blocked');
    };
  });
  await page.getByRole('button', { name: 'Edit Profile', exact: true }).click();
  await page.getByLabel('Full name', { exact: true }).fill('Amina Bello');
  await page.getByRole('button', { name: 'Save Profile', exact: true }).click();
  await expect(page.locator('school-hub-profile-card')).toContainText(
    'Amina Bello',
  );
  await expect(page.getByRole('status')).toContainText(
    'could not save them for later',
  );
});

test('mobile profile and editors keep readable text and fit long learner names', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openProfile(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await page
      .locator('.page-heading p')
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  await page.screenshot({
    path: testInfo.outputPath('profile-mobile.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Edit Profile', exact: true }).click();
  await page.getByLabel('Full name', { exact: true }).fill('A'.repeat(80));
  await page.getByRole('button', { name: 'Save Profile', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.getByRole('button', { name: 'Edit Goals', exact: true }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Edit Learning Goals',
    exact: true,
  });
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await dialog
      .locator('input')
      .first()
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page.screenshot({
    path: testInfo.outputPath('profile-goals-mobile.png'),
    fullPage: true,
  });
});
