import { test, expect, Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1100 } });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-05T14:15:00+01:00'));
});

async function enter(page: Page, query = '') {
  await page.goto('/student/live-classes/subject-predicate-live' + query);
  await page
    .getByRole('button', { name: 'Enter Practice Classroom', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Turn microphone on', exact: true }),
  ).toBeEnabled();
}
async function stubDevices(page: Page, denied = false) {
  await page.addInitScript((denied) => {
    const state = window as typeof window & { deviceEvents: string[] };
    state.deviceEvents = [];
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia: async (constraints: MediaStreamConstraints) => {
          const kind = constraints.video ? 'video' : 'audio';
          state.deviceEvents.push(kind + ':requested');
          if (denied) throw new DOMException('Denied', 'NotAllowedError');
          const stream = new MediaStream();
          Object.defineProperty(stream, 'getTracks', {
            value: () => [
              { stop: () => state.deviceEvents.push(kind + ':stopped') },
            ],
          });
          return stream;
        },
      },
    });
  }, denied);
}
async function deviceEvents(page: Page) {
  return page.evaluate(
    () => (window as typeof window & { deviceEvents: string[] }).deviceEvents,
  );
}

test('live schedule shows real fixture dates, filters, paging, and past recaps', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/student/live-classes');
  await expect(
    page.getByRole('button', { name: 'Join with Class Code', exact: true }),
  ).toBeEnabled();
  await expect(
    page.getByRole('tab', { name: 'Upcoming Classes 8', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('school-hub-next-class')).toContainText(
    'English Language: Subject & Predicate',
  );
  await expect(page.getByRole('timer')).toHaveAccessibleName(
    /0 hours, 45 minutes, 0 seconds/,
  );
  await expect(page.locator('.today-schedule li')).toHaveCount(3);
  await expect(page.locator('school-hub-session-card')).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('live-classes-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'View All Upcoming Classes', exact: true })
    .click();
  await page
    .getByRole('navigation', { name: 'Upcoming class pages', exact: true })
    .getByRole('button', { name: 'Next page', exact: true })
    .click();
  await expect(page.locator('school-hub-session-card')).toHaveCount(3);
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('basic-science');
  await expect(page.locator('school-hub-next-class')).toContainText(
    'Living and Non-living Things',
  );
  await expect(page.locator('school-hub-session-card')).toHaveCount(1);
  await page
    .getByRole('searchbox', { name: 'Search live classes', exact: true })
    .fill('unmatched topic');
  await expect(
    page.getByRole('heading', {
      name: 'No upcoming classes found',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await page.getByRole('tab', { name: 'Past Classes 4', exact: true }).click();
  await expect(page.locator('school-hub-class-recap-card')).toHaveCount(3);
  await page
    .getByRole('navigation', { name: 'Past class pages', exact: true })
    .getByRole('button', { name: 'Next page', exact: true })
    .click();
  await expect(page.locator('school-hub-class-recap-card')).toHaveCount(1);
  await page.locator('school-hub-class-recap-card').getByRole('button').click();
  await expect(
    page.getByRole('dialog', { name: 'Class Recap', exact: true }),
  ).toContainText('A video recording has not been provided');
  expect(errors).toEqual([]);
});

test('class codes, saved classes, availability, and missing IDs have usable outcomes', async ({
  page,
}) => {
  await page.goto('/student/live-classes');
  await page
    .getByRole('button', { name: 'Join with Class Code', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Class code', exact: true })
    .fill('invalid');
  await page.getByRole('button', { name: 'Find Class', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('could not be found');
  await page
    .getByRole('textbox', { name: 'Class code', exact: true })
    .fill(' sh-english-0511 ');
  await page.getByRole('button', { name: 'Find Class', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Join Class', exact: true });
  await expect(dialog).toContainText('English Language: Subject & Predicate');
  await dialog.getByRole('button', { name: 'Save Class', exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Remove Saved Class', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Enter Practice Classroom', exact: true })
    .click();
  await expect(page).toHaveURL('/student/live-classes/subject-predicate-live');
  await page.getByRole('button', { name: 'Leave Class', exact: true }).click();
  await page
    .getByRole('button', { name: 'Leave Practice Class', exact: true })
    .click();
  for (const [id, text] of [
    ['rounding-numbers-live', 'This class is full'],
    ['reading-whole-numbers-live', 'not included in your current enrolment'],
  ]) {
    await page.goto('/student/live-classes?classId=' + id);
    await expect(
      page.getByRole('dialog', { name: 'Class Details', exact: true }),
    ).toContainText(text);
    await expect(
      page.getByRole('button', {
        name: 'Enter Practice Classroom',
        exact: true,
      }),
    ).toHaveCount(0);
  }
  await page.goto('/student/live-classes?classId=unknown');
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'That class could not be found' }),
  ).toBeVisible();
  await page.goto('/student/live-classes/unknown');
  await expect(
    page.getByRole('heading', { name: 'Class not found', exact: true }),
  ).toBeVisible();
});

test('calendar selects scheduled days, changes months, and downloads valid events', async ({
  page,
}) => {
  await page.goto('/student/live-classes?view=calendar');
  const calendar = page.getByRole('dialog', {
    name: 'Class Calendar',
    exact: true,
  });
  await expect(
    calendar.getByRole('heading', { name: 'November 2026', exact: true }),
  ).toBeVisible();
  await calendar
    .getByRole('button', { name: /Thursday, 5 November 2026, 3 classes/ })
    .click();
  await expect(calendar.locator('.calendar-events > button')).toHaveCount(3);
  await calendar
    .getByRole('button', { name: 'Next month', exact: true })
    .click();
  await expect(
    calendar.getByRole('heading', { name: 'December 2026', exact: true }),
  ).toBeVisible();
  await expect(calendar).toContainText('No classes scheduled for this day.');
  const downloadPromise = page.waitForEvent('download');
  await calendar
    .getByRole('button', { name: 'Download Class Calendar', exact: true })
    .click();
  const download = await downloadPromise;
  const content = await readFile((await download.path()) as string, 'utf8');
  expect(download.suggestedFilename()).toBe('school-hub-class-calendar.ics');
  expect(content).toContain('DTSTART:20261105T140000Z');
  expect(content.match(/BEGIN:VEVENT/g)).toHaveLength(12);
});

test('connection checks request devices only on click and stop them on dismissal', async ({
  page,
}) => {
  await stubDevices(page);
  await page.goto('/student/live-classes');
  await page
    .getByRole('button', { name: 'Test My Connection', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Test My Connection', exact: true }),
  ).toContainText('Not measured');
  expect(await deviceEvents(page)).toEqual([]);
  await page.getByRole('button', { name: 'Test camera', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Stop camera test', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Test microphone', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Stop microphone test', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  expect(await deviceEvents(page)).toEqual([
    'video:requested',
    'audio:requested',
    'audio:stopped',
    'video:stopped',
  ]);
  await page
    .getByRole('button', { name: 'Test My Connection', exact: true })
    .click();
  await page.getByRole('button', { name: 'Test camera', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Stop camera test', exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('dialog')).toBeHidden();
  expect((await deviceEvents(page)).slice(-2)).toEqual([
    'video:requested',
    'video:stopped',
  ]);
});

test('classroom slides, reactions, sample chat, and saved personal notes work together', async ({
  page,
}, testInfo) => {
  await enter(page);
  const board = page.getByRole('region', {
    name: 'Lesson presentation',
    exact: true,
  });
  await expect(
    board.getByRole('heading', { name: 'Subject and Predicate', exact: true }),
  ).toBeVisible();
  await expect(board).toContainText('4 / 8');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('live-classroom-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Next lesson slide', exact: true })
    .click();
  await expect(
    board.getByRole('heading', { name: 'Identifying Subjects', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Zoom lesson in', exact: true })
    .click();
  await expect(board).toContainText('125%');
  await page.getByRole('button', { name: 'Raise hand', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Raise hand', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page
    .getByRole('button', { name: '5 Participants', exact: true })
    .click();
  await expect(
    page
      .getByRole('dialog', { name: 'Practice Participants', exact: true })
      .getByRole('listitem'),
  ).toHaveCount(5);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('button', { name: 'Reactions', exact: true }).click();
  await page.getByRole('button', { name: 'Applause', exact: true }).click();
  await expect(
    page.getByLabel('Your local reaction', { exact: true }),
  ).toHaveText('👏');
  await page
    .getByRole('button', {
      name: 'Heart reaction to message by Maryam B.',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('button', {
      name: 'Heart reaction to message by Maryam B.',
      exact: true,
    }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page
    .getByRole('textbox', { name: 'Class message', exact: true })
    .fill('I can identify the subject.');
  await page
    .getByRole('button', { name: 'Choose chat emoji', exact: true })
    .click();
  await page.getByRole('button', { name: 'Insert 👍', exact: true }).click();
  await page
    .getByRole('button', { name: 'Send local message', exact: true })
    .click();
  await expect(
    page
      .getByRole('region', { name: 'Class chat', exact: true })
      .locator('article'),
  ).toHaveCount(6);
  await page.getByRole('tab', { name: 'Lesson Notes', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'My lesson notes', exact: true })
    .fill('The subject tells who or what.');
  await page.reload();
  await expect(
    page.getByRole('textbox', { name: 'My lesson notes', exact: true }),
  ).toHaveValue('The subject tells who or what.');
  await expect(
    page.getByRole('button', { name: 'Turn camera on', exact: true }),
  ).toBeEnabled();
  const downloadPromise = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Download My Notes', exact: true })
    .click();
  const download = await downloadPromise;
  expect(await readFile((await download.path()) as string, 'utf8')).toBe(
    'The subject tells who or what.',
  );
  await page.getByRole('tab', { name: 'Class Chat', exact: true }).click();
  await expect(
    page
      .getByRole('region', { name: 'Class chat', exact: true })
      .getByText('I can identify the subject.👍', { exact: true }),
  ).toBeVisible();
});

test('in-class practice checks answers and resources contain actual lesson material', async ({
  page,
}) => {
  await enter(page);
  await page
    .getByRole('button', { name: 'Submit Answers', exact: true })
    .click();
  const activity = page.getByRole('dialog', {
    name: 'In-Class Activity',
    exact: true,
  });
  const answers = activity.getByRole('textbox');
  await answers.nth(0).fill('The cat');
  await answers.nth(1).fill('explains clearly');
  await answers.nth(2).fill('They');
  await page
    .getByRole('button', { name: 'Check Practice Answers', exact: true })
    .click();
  await expect(activity.locator('.activity-result')).toContainText(
    '3 / 3 correct',
  );
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Review Answers', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Learn More', exact: true }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Recording & Materials',
    exact: true,
  });
  await expect(dialog).toContainText('A video recording has not been uploaded');
  const downloadPromise = page.waitForEvent('download');
  await dialog.getByRole('button', { name: /Lesson Notes/ }).click();
  const download = await downloadPromise;
  expect(await readFile((await download.path()) as string, 'utf8')).toContain(
    'SUBJECT AND PREDICATE',
  );
  await expect(
    dialog.getByRole('link', { name: /Related Lesson/ }),
  ).toHaveAttribute('href', /lessonId=simple-sentences/);
  await expect(
    dialog.getByRole('link', { name: /Related Lesson/ }),
  ).toHaveAttribute('target', '_blank');
});

test('leaving can be cancelled, preserves list filters, and releases every local device', async ({
  page,
}) => {
  await stubDevices(page);
  await enter(page, '?subjectId=english-language&q=subject');
  expect(await deviceEvents(page)).toEqual([]);
  await page
    .getByRole('button', { name: 'Turn microphone on', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Turn camera on', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Turn camera off', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Live Classes', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Stay in Class', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Turn camera off', exact: true }),
  ).toBeVisible();
  expect(await deviceEvents(page)).toEqual([
    'audio:requested',
    'video:requested',
  ]);
  await page.getByRole('button', { name: 'Leave Class', exact: true }).click();
  await page
    .getByRole('button', { name: 'Leave Practice Class', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/live-classes?subjectId=english-language&q=subject',
  );
  expect(await deviceEvents(page)).toEqual([
    'audio:requested',
    'video:requested',
    'audio:stopped',
    'video:stopped',
  ]);
});

test('denied device permission remains recoverable and ended classes cannot be joined', async ({
  page,
}) => {
  await stubDevices(page, true);
  await enter(page);
  await page
    .getByRole('button', { name: 'Turn camera on', exact: true })
    .click();
  await expect(page.getByRole('alert')).toContainText(
    'Check your browser permission',
  );
  await expect(
    page.getByRole('button', { name: 'Turn camera on', exact: true }),
  ).toBeEnabled();
  await page.clock.setFixedTime(new Date('2026-11-05T16:01:00+01:00'));
  await expect(
    page.getByRole('button', { name: 'Turn microphone on', exact: true }),
  ).toBeDisabled();
  await expect(page.locator('.prejoin-panel')).toContainText(
    'This class has ended',
  );
});

test('mobile schedule and classroom fit the viewport with readable content and usable dialogs', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/live-classes');
  await expect(
    page.getByRole('button', { name: 'Join with Class Code', exact: true }),
  ).toBeEnabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('live-classes-mobile.png'),
    fullPage: true,
  });
  await page
    .locator('school-hub-next-class')
    .getByRole('button', { name: 'Join Class', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Enter Practice Classroom', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Turn microphone on', exact: true }),
  ).toBeEnabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await page
      .locator('.preview-notice')
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  await page.screenshot({
    path: testInfo.outputPath('live-classroom-mobile.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Submit Answers', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'In-Class Activity', exact: true }),
  ).toBeInViewport();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('button', { name: 'Leave Class', exact: true }).click();
  await expect(
    page.getByRole('dialog', {
      name: 'Leave this practice class?',
      exact: true,
    }),
  ).toBeInViewport();
});
