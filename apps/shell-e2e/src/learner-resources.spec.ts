import { test, expect, Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1000 } });
async function openVideo(page: Page, query = '') {
  await page.goto('/student/resources/parts-of-speech' + query);
  await expect(
    page.getByRole('button', { name: 'Mark as Completed', exact: true }),
  ).toBeEnabled();
  const video = page.locator('school-hub-media-player video');
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.readyState),
    )
    .toBeGreaterThanOrEqual(1);
  return video;
}
async function downloadText(page: Page, action: () => Promise<void>) {
  const pending = page.waitForEvent('download');
  await action();
  const download = await pending;
  return {
    name: download.suggestedFilename(),
    content: await readFile((await download.path()) as string),
  };
}

test('resource library follows the design and combines categories, subjects, search, sorting, and pages', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/student/resources');
  await expect(
    page.getByRole('searchbox', { name: 'Search resources', exact: true }),
  ).toBeEnabled();
  await expect(
    page
      .getByRole('region', { name: 'Resource totals', exact: true })
      .getByText('23', { exact: true }),
  ).toBeVisible();
  await expect(page.locator('school-hub-resource-card')).toHaveCount(4);
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(5);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('resources-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page.getByRole('tab', { name: 'Notes', exact: true }).click();
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(3);
  await page
    .getByRole('searchbox', { name: 'Search resources', exact: true })
    .fill('sentence');
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(1);
  await page
    .getByRole('combobox', { name: 'Sort resources', exact: true })
    .selectOption('title');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('second');
  await page.reload();
  await expect(
    page.getByRole('combobox', { name: 'Sort resources', exact: true }),
  ).toHaveValue('title');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('second');
  await page
    .getByRole('searchbox', { name: 'Search resources', exact: true })
    .fill('unmatched resource');
  await expect(
    page.getByRole('heading', { name: 'No resources found', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await page
    .locator('.recent > footer')
    .getByRole('button', { name: 'View All Resources', exact: true })
    .click();
  await page
    .getByRole('navigation', { name: 'Resource pages', exact: true })
    .getByRole('button', { name: 'Next page', exact: true })
    .click();
  await expect(page).toHaveURL(/page=2/);
  await expect(
    page.getByText('Showing 6 to 10 of 23 resources', { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('saved resources, likes, bookmarks, completion, and recently viewed stay distinct and persist', async ({
  page,
}) => {
  await openVideo(page, '?subjectId=english-language&type=video');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Like', exact: true }).click();
  await page
    .getByRole('button', { name: 'Mark as Completed', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Resource options', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Bookmark Current Time', exact: true })
    .click();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Saved', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('button', { name: 'Like', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('button', { name: 'Completed', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('button', { name: 'Go to Bookmark · 0:00', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Resources', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/resources?type=video&subjectId=english-language',
  );
  await page
    .getByRole('button', { name: 'Saved Resources', exact: true })
    .click();
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(1);
  await page.getByRole('button', { name: 'Bookmarks', exact: true }).click();
  await expect(
    page.getByRole('table', { name: 'Resource library', exact: true }),
  ).toContainText('Parts of Speech Explained');
  await page
    .getByRole('button', { name: 'Recently Viewed', exact: true })
    .click();
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(1);
  await page.getByRole('button', { name: 'My Downloads', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'No resources found', exact: true }),
  ).toBeVisible();
});

test('real video playback, chapter seeking, speed, captions, transcript, and resume work', async ({
  page,
}, testInfo) => {
  const video = await openVideo(page);
  await expect
    .poll(() => video.evaluate((element: HTMLVideoElement) => element.duration))
    .toBe(150);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('resource-video-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('list', { name: 'Video chapters', exact: true })
    .getByRole('button', { name: /0:45.*Verbs/ })
    .click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(45, 0);
  await page
    .getByRole('combobox', { name: 'Playback speed', exact: true })
    .selectOption('1.5');
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.playbackRate),
    )
    .toBe(1.5);
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(45.2);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await video.evaluate((element: HTMLVideoElement) => {
    element.textTracks[0].mode = 'hidden';
  });
  await expect
    .poll(() =>
      video.evaluate(
        (element: HTMLVideoElement) => element.textTracks[0].cues?.length ?? 0,
      ),
    )
    .toBe(10);
  await page.getByRole('tab', { name: 'Transcript', exact: true }).click();
  await page
    .locator('.transcript')
    .getByRole('button', { name: '2:00', exact: true })
    .click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(120, 0);
  await page.reload();
  await expect
    .poll(() =>
      page
        .locator('school-hub-media-player video')
        .evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(120, 0);
  await page.getByRole('button', { name: 'Hide', exact: true }).click();
  await expect(
    page.getByRole('list', { name: 'Video chapters', exact: true }),
  ).toBeHidden();
  await page.getByRole('button', { name: 'Show', exact: true }).click();
  await expect(
    page.getByRole('list', { name: 'Video chapters', exact: true }),
  ).toBeVisible();
});

test('personal notes support timestamps, editing, export, refresh, and confirmed deletion', async ({
  page,
}) => {
  await openVideo(page);
  await page
    .getByRole('list', { name: 'Video chapters', exact: true })
    .getByRole('button', { name: /0:45.*Verbs/ })
    .click();
  await page.getByRole('button', { name: 'Add Note', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Add a personal note', exact: true })
    .fill('A verb can express an action or a state.');
  await page.getByRole('button', { name: 'Save Note', exact: true }).click();
  await page.reload();
  await expect(page.locator('.notes-list')).toContainText(
    'A verb can express an action or a state.',
  );
  await expect(page.locator('.notes-list')).toContainText('0:45');
  await page.getByRole('button', { name: 'Edit note 1', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Edit personal note', exact: true })
    .fill('Examples: reads and is.');
  await page.getByRole('button', { name: 'Update Note', exact: true }).click();
  const download = await downloadText(page, () =>
    page
      .getByRole('button', { name: 'Download My Notes', exact: true })
      .click(),
  );
  expect(download.content.toString()).toContain('Examples: reads and is.');
  expect(download.content.toString()).toContain('0:45');
  await page
    .getByRole('button', { name: 'Delete note 1', exact: true })
    .click();
  await page.getByRole('button', { name: 'Keep Note', exact: true }).click();
  await expect(page.locator('.notes-list li')).toHaveCount(1);
  await page
    .getByRole('button', { name: 'Delete note 1', exact: true })
    .click();
  await page.getByRole('button', { name: 'Delete Note', exact: true }).click();
  await expect(page.locator('.notes-list')).toContainText(
    'You haven’t added a note yet.',
  );
});

test('text and video downloads contain real content and appear in download history', async ({
  page,
}) => {
  await page.goto('/student/resources/place-value-notes');
  const note = await downloadText(page, () =>
    page
      .getByRole('list', { name: 'Resource downloads', exact: true })
      .getByRole('button', { name: /Place Value Made Clear/ })
      .click(),
  );
  expect(note.name).toBe('place-value-notes.txt');
  expect(note.content.toString()).toContain('4,268 = 4,000 + 200 + 60 + 8');
  await openVideo(page);
  const transcript = await downloadText(page, () =>
    page
      .getByRole('list', { name: 'Resource downloads', exact: true })
      .getByRole('button', { name: /Video Transcript & Summary/ })
      .click(),
  );
  expect(transcript.content.toString()).toContain('INTERJECTIONS');
  await page
    .getByRole('button', { name: 'Resource options', exact: true })
    .click();
  await page.route('**/resources/videos/parts-of-speech.mp4', (route) =>
    route.fulfill({ status: 503, body: 'Temporarily unavailable' }),
  );
  await page
    .getByRole('button', { name: 'Download Video', exact: true })
    .click();
  await expect(page.getByRole('dialog').getByRole('alert')).toContainText(
    'could not be downloaded',
  );
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('school-hub:resources:v1') ?? '{}')
          .downloads.length,
    ),
  ).toBe(2);
  await page.unroute('**/resources/videos/parts-of-speech.mp4');
  const video = await downloadText(page, () =>
    page.getByRole('button', { name: 'Download Video', exact: true }).click(),
  );
  expect(video.name).toBe('parts-of-speech.mp4');
  expect(video.content.subarray(4, 8).toString()).toBe('ftyp');
  expect(video.content.length).toBeGreaterThan(100000);
  await page.goto('/student/resources?collection=downloads');
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(2);
  await expect(
    page.getByRole('table', { name: 'Resource library', exact: true }),
  ).toContainText('parts-of-speech.mp4');
});

test('missing, locked, legacy, and damaged-storage resource states remain usable', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('school-hub:resources:v1', '{invalid'),
  );
  await page.goto('/student/resources/lcm-preview');
  await expect(
    page.getByRole('button', { name: 'Mark as Completed', exact: true }),
  ).toBeDisabled();
  await expect(page.locator('.locked')).toContainText('will unlock');
  await expect(page.locator('school-hub-media-player')).toHaveCount(0);
  await page.goto('/student/resources/unknown');
  await expect(
    page.getByRole('heading', { name: 'Resource not found', exact: true }),
  ).toBeVisible();
  await page.goto(
    '/student/resources?resourceId=place-value-notes&subjectId=mathematics',
  );
  await expect(page).toHaveURL(
    '/student/resources/place-value-notes?subjectId=mathematics',
  );
  await expect(
    page
      .getByRole('heading', { name: 'Place Value Made Clear', exact: true })
      .first(),
  ).toBeVisible();
  await page.goto('/student/resources/place-value-notes?tab=transcript');
  await expect(
    page.getByRole('tab', { name: 'Overview', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.overview')).toContainText(
    '4,268 = 4,000 + 200 + 60 + 8',
  );
  await page.goto('/student/resources?resourceId=missing');
  await expect(page.getByRole('status')).toContainText(
    'That resource could not be found.',
  );
});

test('storage management keeps file history separate and resource requests create local drafts', async ({
  page,
}) => {
  await openVideo(page);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await downloadText(page, () =>
    page
      .getByRole('list', { name: 'Resource downloads', exact: true })
      .getByRole('button', { name: /Video Transcript & Summary/ })
      .click(),
  );
  await page.goto('/student/resources?view=storage');
  await expect(
    page.getByRole('dialog', { name: 'Manage Resource Storage', exact: true }),
  ).toContainText('1 downloads started');
  await page
    .getByRole('button', { name: 'Clear Download History', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Manage Resource Storage', exact: true }),
  ).toContainText('0 downloads started');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('button', { name: 'Saved Resources', exact: true })
    .click();
  await expect(
    page
      .getByRole('table', { name: 'Resource library', exact: true })
      .locator('tbody tr'),
  ).toHaveCount(1);
  await page
    .getByRole('button', { name: 'Manage Storage', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Clear All Resource Data', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm Clear Resource Data', exact: true })
    .click();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'No resources found', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Request Resource', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Resource request', exact: true })
    .fill('Please add more place value examples.');
  const draft = await downloadText(page, () =>
    page
      .getByRole('button', { name: 'Download Request Draft', exact: true })
      .click(),
  );
  expect(draft.content.toString()).toContain(
    'Please add more place value examples.',
  );
  expect(draft.content.toString()).toContain('has not been sent');
});

test('dashboard topics, lesson context, related resources, and external learning links resolve correctly', async ({
  page,
}) => {
  await page.goto('/student/dashboard');
  await page.getByRole('link', { name: 'Place Value', exact: true }).click();
  await expect(
    page.getByRole('table', { name: 'Resource library', exact: true }),
  ).toContainText('Place Value Made Clear');
  await page.goto(
    '/student/resources?lessonId=whole-numbers&subjectId=mathematics',
  );
  await expect(
    page.getByRole('link', { name: 'Back to Lesson', exact: true }),
  ).toHaveAttribute('href', '/student/lessons?lessonId=whole-numbers');
  await expect(
    page.getByRole('table', { name: 'Resource library', exact: true }),
  ).toContainText('Whole Numbers');
  await openVideo(page, '?subjectId=english-language&type=video');
  await page
    .getByRole('tab', { name: 'Related Resources', exact: true })
    .click();
  await page
    .locator('.related-grid')
    .getByRole('link', { name: /Parts of Speech Summary/ })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Parts of Speech Summary', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Resources', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/resources?type=video&subjectId=english-language',
  );
  await page.goto('/student/resources?type=link&subjectId=english-language');
  const link = page.getByRole('link', {
    name: /Visit Useful Link: British Council Grammar/,
  });
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute(
    'href',
    'https://learnenglish.britishcouncil.org/free-resources/grammar',
  );
});

test('mobile resources and detail panels keep readable text, contained tables, and usable notes', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/resources');
  await expect(
    page.getByRole('searchbox', { name: 'Search resources', exact: true }),
  ).toBeEnabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('resources-mobile.png'),
    fullPage: true,
  });
  await openVideo(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await page
      .locator('.overview > p')
      .first()
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page.screenshot({
    path: testInfo.outputPath('resource-video-mobile.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Add Note', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Add a personal note', exact: true })
    .fill('I can name eight parts of speech.');
  await page.getByRole('button', { name: 'Save Note', exact: true }).click();
  await expect(page.locator('.notes-list')).toContainText(
    'I can name eight parts of speech.',
  );
});
