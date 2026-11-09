import { expect, Page, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1050 } });
async function openTutor(page: Page, query = '') {
  await page.goto('/student/ask-tutor' + query);
  await expect(
    page.getByRole('textbox', { name: 'Your question', exact: true }),
  ).toBeEnabled();
}
async function saved(page: Page) {
  await expect(
    page.getByRole('status', { name: 'Question storage status', exact: true }),
  ).toContainText('Saved on this device');
}
async function downloadText(page: Page, action: () => Promise<void>) {
  const pending = page.waitForEvent('download');
  await action();
  const download = await pending;
  return readFile((await download.path()) as string, 'utf8');
}

test('Ask Tutor follows the design with sample replies, real subject choices, ratings, and tutor directory', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await openTutor(page);
  await expect(page).toHaveTitle('Ask Tutor | SchoolHub');
  await expect(
    page.getByRole('tab', { name: 'English Language', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.conversation-status')).toHaveText(
    'Sample conversation',
  );
  await expect(page.locator('school-hub-filter-tabs')).toHaveClass(/pill-tabs/);
  await expect
    .poll(() =>
      page
        .locator('school-hub-chat-panel .messages')
        .evaluate((element) => element.scrollTop),
    )
    .toBe(0);
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(3);
  await expect(
    page.locator('school-hub-chat-panel article.tutor'),
  ).toContainText('A noun is a naming word');
  await expect(
    page
      .getByRole('list', { name: 'Popular tutor topics', exact: true })
      .getByRole('link'),
  ).toHaveCount(6);
  await expect(
    page
      .getByRole('list', { name: 'Past tutor questions', exact: true })
      .getByRole('link'),
  ).toHaveCount(3);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('ask-tutor-desktop.png'),
    fullPage: true,
  });
  const helpful = page.getByRole('button', {
    name: 'Helpful sample answer',
    exact: true,
  });
  await helpful.click();
  await saved(page);
  await page.reload();
  await expect(helpful).toHaveAttribute('aria-pressed', 'true');
  await page
    .getByRole('button', { name: 'Unhelpful sample answer', exact: true })
    .click();
  await expect(helpful).toHaveAttribute('aria-pressed', 'false');
  await page
    .getByRole('button', { name: 'View Tutors (3)', exact: true })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Your Subject Tutors',
    exact: true,
  });
  await expect(dialog.locator('.tutor-directory li')).toHaveCount(3);
  await expect(dialog).toContainText(
    'Live availability and tutor delivery are not connected',
  );
  await dialog
    .getByRole('button', {
      name: 'Ask a Question about Mathematics',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('tab', { name: 'Mathematics', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('local questions, follow-ups, downloads, and confirmed deletion survive refresh without claiming delivery', async ({
  page,
}) => {
  await openTutor(page, '?subjectId=mathematics&new=1');
  const question = page.getByRole('textbox', {
    name: 'Your question',
    exact: true,
  });
  await expect(
    page.getByRole('button', { name: 'Save question locally', exact: true }),
  ).toBeDisabled();
  await question.fill('Why do we carry a ten when adding 28 and 17?');
  await saved(page);
  await page.reload();
  await expect(question).toHaveValue(
    'Why do we carry a ten when adding 28 and 17?',
  );
  await page
    .getByRole('button', { name: 'Save question locally', exact: true })
    .click();
  await expect(page).toHaveURL(/conversationId=local-/);
  await saved(page);
  const address = page.url();
  await expect(page.locator('.conversation-status')).toHaveText('Not sent');
  await expect(page.locator('school-hub-chat-panel article.tutor')).toHaveCount(
    0,
  );
  await question.fill('I tried 8 + 7 = 15. What happens next?');
  await question.press('Enter');
  await saved(page);
  await expect(page).toHaveURL(address);
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(2);
  const copy = await downloadText(page, () =>
    page
      .getByRole('button', { name: 'Download Conversation', exact: true })
      .click(),
  );
  expect(copy).toContain('have not been sent to a tutor');
  expect(copy).toContain('8 + 7 = 15');
  await page
    .getByRole('button', { name: 'Delete Local Question', exact: true })
    .click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(2);
  await page
    .getByRole('button', { name: 'Delete Local Question', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm Delete Local Question', exact: true })
    .click();
  await expect(page).toHaveURL(/subjectId=mathematics&new=1/);
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'Local question and its attachments deleted' }),
  ).toBeVisible();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(0);
  await saved(page);
  await page.goto(address);
  await expect(
    page.getByRole('status').filter({ hasText: 'could not be found' }),
  ).toBeVisible();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(0);
});

test('subject and activity drafts remain independent and resource requests prefill only the selected question', async ({
  page,
}) => {
  await openTutor(page, '?subjectId=mathematics&new=1');
  const field = page.getByRole('textbox', {
    name: 'Your question',
    exact: true,
  });
  await field.fill('My mathematics draft');
  await saved(page);
  await page
    .getByRole('tab', { name: 'English Language', exact: true })
    .click();
  await expect(field).toHaveValue('');
  await field.fill('My English draft');
  await page.getByRole('tab', { name: 'Mathematics', exact: true }).click();
  await expect(field).toHaveValue('My mathematics draft');
  await page.reload();
  await expect(field).toHaveValue('My mathematics draft');
  await openTutor(
    page,
    '?contextType=resource-request&subjectId=basic-science&message=Please%20add%20more%20plant%20diagrams.',
  );
  await expect(field).toHaveValue('Please add more plant diagrams.');
  await expect(page.locator('.question-context')).toContainText(
    'Resource request',
  );
  await field.fill('Please add labelled plant diagrams.');
  await saved(page);
  await page.reload();
  await expect(field).toHaveValue('Please add labelled plant diagrams.');
});

test('worksheet, feedback, lesson, portfolio, and assessment links attach validated work and preserve question context', async ({
  page,
}) => {
  await page.goto('/student/worksheets/whole-numbers-worksheet');
  await page.getByRole('button', { name: /^Question 1,/ }).click();
  await page
    .getByRole('complementary', { name: 'Worksheet tools and progress' })
    .getByRole('link', { name: 'Ask Tutor', exact: true })
    .click();
  await expect(page.locator('.question-context')).toContainText('345 + 278 =');
  await expect(page.locator('.question-context a')).toHaveAttribute(
    'href',
    '/student/worksheets/whole-numbers-worksheet',
  );
  await page
    .getByRole('textbox', { name: 'Your question', exact: true })
    .fill('Can you explain how to carry the tens in this question?');
  await page
    .getByRole('button', { name: 'Save question locally', exact: true })
    .click();
  await saved(page);
  await page.reload();
  await expect(page.locator('.question-context')).toContainText('345 + 278 =');
  for (const [type, id, route] of [
    ['lesson', 'nouns', '/student/lessons?lessonId=nouns'],
    [
      'assessment',
      'whole-numbers-quiz',
      '/student/assessments?assessmentId=whole-numbers-quiz',
    ],
    [
      'portfolio',
      'market-price-comparison',
      '/student/portfolio-tasks/market-price-comparison',
    ],
    [
      'feedback',
      'whole-numbers-feedback',
      '/student/feedback?feedbackId=whole-numbers-feedback',
    ],
  ]) {
    await openTutor(
      page,
      `?contextType=${type}&contextId=${id}&subjectId=basic-science`,
    );
    await expect(page.locator('.question-context a')).toHaveAttribute(
      'href',
      route,
    );
    await expect(
      page.getByRole('tab', {
        name: type === 'lesson' ? 'English Language' : 'Mathematics',
        exact: true,
      }),
    ).toHaveAttribute('aria-selected', 'true');
  }
});

test('attachments validate types, preserve actual bytes, preview locally, and survive saved questions', async ({
  page,
}) => {
  await openTutor(page, '?subjectId=mathematics&new=1');
  await page.getByRole('button', { name: 'Attach file', exact: true }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Attach Files to Your Question',
    exact: true,
  });
  const upload = dialog.getByLabel('Attach question files', { exact: true });
  await upload.setInputFiles({
    name: 'script.html',
    mimeType: 'text/html',
    buffer: Buffer.from('<script>alert(1)</script>'),
  });
  await expect(dialog.getByRole('alert')).toContainText('at most 2 MB');
  const text = 'My working: 28 + 17 = 45.\nI carried one ten.';
  await upload.setInputFiles({
    name: 'working.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from(text),
  });
  await expect(
    dialog.getByRole('list', { name: 'Attached files', exact: true }),
  ).toContainText('working.txt');
  await dialog
    .getByRole('button', { name: 'Preview working.txt', exact: true })
    .click();
  await expect(
    page
      .getByRole('dialog', { name: 'Question Attachment', exact: true })
      .locator('pre'),
  ).toContainText(text);
  await page.keyboard.press('Escape');
  await saved(page);
  await page.reload();
  await expect(
    page.getByRole('list', { name: 'Question draft attachments', exact: true }),
  ).toContainText('working.txt');
  await page
    .getByRole('button', { name: 'Save question locally', exact: true })
    .click();
  await saved(page);
  await page.reload();
  await page
    .getByRole('button', { name: 'Open attachment working.txt', exact: true })
    .click();
  const content = await downloadText(page, () =>
    page
      .getByRole('button', { name: 'Download Attachment', exact: true })
      .click(),
  );
  expect(content).toBe(text);
});

test('topics, searchable history, and sample follow-ups keep links and browser navigation usable', async ({
  page,
}) => {
  await openTutor(page);
  await page.getByRole('button', { name: 'New Question', exact: true }).click();
  await page
    .getByRole('list', { name: 'Popular tutor topics', exact: true })
    .getByRole('link', { name: /^Nouns / })
    .click();
  await expect(
    page.getByRole('textbox', { name: 'Your question', exact: true }),
  ).toHaveValue('Can you help me understand Nouns?');
  await page
    .getByRole('button', { name: 'View all', exact: true })
    .last()
    .click();
  const history = page.getByRole('dialog', {
    name: 'Your Past Questions',
    exact: true,
  });
  await history
    .getByRole('searchbox', { name: 'Search past questions', exact: true })
    .fill('pronoun');
  await expect(
    history
      .getByRole('list', { name: 'All past tutor questions', exact: true })
      .getByRole('link'),
  ).toHaveCount(1);
  await history.getByRole('link', { name: /What is a pronoun/ }).click();
  await expect(page).toHaveURL(/conversationId=pronoun-help/);
  await page
    .getByRole('textbox', { name: 'Your question', exact: true })
    .fill('Can “they” replace more than one name?');
  await page
    .getByRole('button', { name: 'Save question locally', exact: true })
    .click();
  await saved(page);
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(4);
  await expect(page.locator('school-hub-chat-panel article.tutor')).toHaveCount(
    1,
  );
  await page.reload();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(4);
  await page.goBack();
  await expect(page).toHaveURL(/conversationId=pronoun-help/);
});

test('invalid activity, conversation, and question IDs show explicit recovery states', async ({
  page,
}) => {
  await openTutor(page, '?conversationId=missing&subjectId=unknown');
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'conversation could not be found' }),
  ).toBeVisible();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(0);
  await openTutor(page, '?contextType=worksheet&contextId=missing');
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'linked activity could not be found' }),
  ).toBeVisible();
  await expect(page.locator('.question-context')).toHaveCount(0);
  await openTutor(
    page,
    '?contextType=worksheet&contextId=whole-numbers-worksheet&questionId=missing',
  );
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'that question is unavailable' }),
  ).toBeVisible();
  await expect(page.locator('.question-context p')).toHaveCount(0);
  await openTutor(page, '?contextType=live-class-support');
  await expect(page.locator('.question-context a')).toHaveAttribute(
    'href',
    '/student/live-classes',
  );
  await openTutor(page, '?contextType=portfolio&subjectId=mathematics');
  await expect(page.locator('.question-context')).toContainText(
    'Portfolio tasks',
  );
  await expect(page.locator('.question-context a')).toHaveAttribute(
    'href',
    '/student/portfolio-tasks?subjectId=mathematics',
  );
});

test('unavailable persistent storage keeps the current local session usable and reports the limitation', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'indexedDB', {
      configurable: true,
      get: () => {
        throw new Error('Storage unavailable');
      },
    }),
  );
  await openTutor(page, '?new=1');
  await expect(
    page.getByRole('status', { name: 'Question storage status', exact: true }),
  ).toContainText('could not save your questions');
  await page
    .getByRole('textbox', { name: 'Your question', exact: true })
    .fill('I need help with a noun.');
  await page
    .getByRole('button', { name: 'Save question locally', exact: true })
    .click();
  await expect(page.locator('school-hub-chat-panel article')).toHaveCount(1);
  const content = await downloadText(page, () =>
    page
      .getByRole('button', { name: 'Download Conversation', exact: true })
      .click(),
  );
  expect(content).toContain('I need help with a noun.');
});

test('mobile conversation and attachment panels retain readable text and fit the screen', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openTutor(page);
  await page.screenshot({
    path: testInfo.outputPath('ask-tutor-mobile.png'),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    await page
      .locator('school-hub-chat-panel article.tutor p')
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page.screenshot({
    path: testInfo.outputPath('ask-tutor-mobile.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'New Question', exact: true }).click();
  const question = page.getByRole('textbox', {
    name: 'Your question',
    exact: true,
  });
  await question.fill('What is a noun?');
  await question.press('Shift+Enter');
  await question.pressSequentially('Please give an example.');
  await expect(question).toHaveValue(
    'What is a noun?\nPlease give an example.',
  );
  await page.getByRole('button', { name: 'Attach file', exact: true }).click();
  const dialog = page.getByRole('dialog', {
    name: 'Attach Files to Your Question',
    exact: true,
  });
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('tutor-attachments-mobile.png'),
  });
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Attach file', exact: true }),
  ).toBeFocused();
  await page.setViewportSize({ width: 320, height: 740 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  const subjects = page.getByRole('tablist', { name: 'Question subject' });
  expect(
    await subjects.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.getByRole('tab', { name: 'Mathematics', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: 'Basic Science', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
});
