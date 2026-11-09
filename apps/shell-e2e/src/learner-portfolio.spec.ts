import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1000 } });
const task = '/student/portfolio-tasks/market-price-comparison';
const reflection =
  'I learned to compare unit prices and check a budget. Next time I will collect prices from more shops.';
const evidence = {
  name: 'prices.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('Bananas: Shop A 600; Shop B 650. Best value: Shop A.'),
};

test('portfolio overview follows the design and derives counts, filtering, and pagination', async ({
  page,
}, testInfo) => {
  await page.goto('/student/portfolio-tasks');
  await expect(
    page.getByRole('heading', { name: 'Portfolio Tasks', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'All Tasks 12', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Completed 4', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('progressbar', {
      name: 'Portfolio tasks handed in',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '58');
  await expect(page.getByText('Showing 1 to 5 of 12 tasks')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('portfolio-desktop.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(page.getByText('Showing 6 to 10 of 12 tasks')).toBeVisible();
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page
    .getByRole('searchbox', { name: 'Search portfolio tasks', exact: true })
    .fill('dictionary');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('all');
  await page
    .getByRole('combobox', { name: 'Sort portfolio tasks', exact: true })
    .selectOption('title');
  await expect(page.getByText('Showing 1 to 1 of 1 tasks')).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('english-language');
  await expect(
    page.getByRole('combobox', { name: 'Term', exact: true }),
  ).toHaveValue('all');
  await expect(
    page.getByRole('searchbox', {
      name: 'Search portfolio tasks',
      exact: true,
    }),
  ).toHaveValue('dictionary');
  await page
    .getByRole('searchbox', { name: 'Search portfolio tasks', exact: true })
    .fill('missing-task');
  await expect(
    page.getByRole('heading', {
      name: 'No portfolio tasks found',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  await expect(page).toHaveURL('/student/portfolio-tasks');
});

test('task guide, rubric, upload chooser, brief, and template downloads work', async ({
  page,
}, testInfo) => {
  await page.goto('/student/portfolio-tasks');
  await page.getByRole('button', { name: /View Task Guide/ }).click();
  await expect(
    page.getByRole('dialog', { name: 'Portfolio Task Guide', exact: true }),
  ).toContainText('Read and plan.');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('button', { name: /Portfolio Rubric/ }).click();
  await expect(
    page
      .getByRole('table', { name: 'Portfolio rubric', exact: true })
      .getByRole('row'),
  ).toHaveCount(7);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('button', { name: /Upload New Work/ }).click();
  const chooser = page.getByRole('dialog', {
    name: 'Choose a task for your work',
    exact: true,
  });
  await expect(chooser.getByRole('link')).toHaveCount(3);
  await chooser.getByRole('link', { name: /Market Price Comparison/ }).click();
  await expect(page).toHaveURL(`${task}?tab=submission`);
  await page.getByRole('tab', { name: 'Task Overview', exact: true }).click();
  await page.screenshot({
    path: testInfo.outputPath('portfolio-task-desktop.png'),
    fullPage: true,
  });
  const briefEvent = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Download Task Brief', exact: true })
    .click();
  const brief = await briefEvent;
  expect(brief.suggestedFilename()).toBe('market-price-comparison-brief.txt');
  expect(await readFile((await brief.path()) ?? '', 'utf8')).toContain(
    'Compare the prices of at least five fruits',
  );
  const templateEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: /Task Template/ }).click();
  const template = await templateEvent;
  expect(template.suggestedFilename()).toBe(
    'market-price-comparison-template.csv',
  );
  expect(await readFile((await template.path()) ?? '', 'utf8')).toContain(
    'Shop A price (NGN)',
  );
});

test('draft text and attachment contents survive refresh and support preview, download, and removal', async ({
  page,
}, testInfo) => {
  await page.goto(
    '/student/portfolio-tasks?taskId=market-price-comparison&tab=work&term=all&subjectId=mathematics',
  );
  await expect(page).toHaveURL(
    `${task}?term=all&subjectId=mathematics&tab=work`,
  );
  await page
    .getByRole('textbox', { name: 'Research and planning', exact: true })
    .fill('I compared prices at two local shops and recorded five fruits.');
  await page
    .getByRole('textbox', { name: 'My written work', exact: true })
    .fill(
      'I made a comparison table and calculated the cost, income, and profit for my fruit stall.',
    );
  await page
    .getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    })
    .fill(reflection);
  await page
    .getByRole('checkbox', {
      name: 'Check my work against the rubric',
      exact: true,
    })
    .check();
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(evidence);
  await page.getByRole('button', { name: 'Save Draft', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('saved on this device');
  await page.reload();
  await expect(
    page.getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    }),
  ).toHaveValue(reflection);
  await expect(
    page.getByRole('button', { name: 'Preview prices.txt', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Preview prices.txt', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'prices.txt', exact: true }),
  ).toContainText('Best value: Shop A.');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  const downloadEvent = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Download prices.txt', exact: true })
    .click();
  const download = await downloadEvent;
  expect(await readFile((await download.path()) ?? '', 'utf8')).toBe(
    evidence.buffer.toString(),
  );
  await page
    .getByRole('button', { name: 'Remove prices.txt', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Preview prices.txt', exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(evidence);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath('portfolio-work-desktop.png'),
  });
  await page.getByRole('button', { name: 'Save & Exit', exact: true }).click();
  await expect(page).toHaveURL(
    '/student/portfolio-tasks?term=all&subjectId=mathematics',
  );
  await page
    .getByRole('heading', { name: 'Market Price Comparison', exact: true })
    .getByRole('link')
    .click();
  await page.getByRole('tab', { name: 'My Work', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Preview prices.txt', exact: true }),
  ).toBeVisible();
});

test('submission saves a read-only receipt and updates dashboard and lesson status', async ({
  page,
}, testInfo) => {
  await page.goto(`${task}?tab=work`);
  await page
    .getByRole('textbox', { name: 'My written work', exact: true })
    .fill(
      'My table compares five fruits at two shops. I checked total costs, income, and profit.',
    );
  await page
    .getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    })
    .fill(reflection);
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(evidence);
  await page
    .getByRole('button', { name: 'Review Submission', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Submission note (optional)', exact: true })
    .fill('Please review my comparison and reflection.');
  await page.getByRole('button', { name: 'Submit Work', exact: true }).click();
  const confirm = page.getByRole('dialog', {
    name: 'Submit portfolio task?',
    exact: true,
  });
  await expect(confirm).toContainText('1 attached files');
  await confirm
    .getByRole('button', { name: 'Confirm Submission', exact: true })
    .click();
  await expect(
    page.getByRole('heading', {
      name: 'Practice Submission Saved',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Submit Work', exact: true }),
  ).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole('heading', {
      name: 'Practice Submission Saved',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Preview prices.txt', exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath('portfolio-submission-desktop.png'),
  });
  await page.getByRole('tab', { name: 'My Work', exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'My written work', exact: true }),
  ).toHaveAttribute('readonly', '');
  await page.getByRole('tab', { name: 'Feedback', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Awaiting Feedback', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Portal navigation' })
    .getByRole('link', { name: 'Dashboard', exact: true })
    .click();
  await expect(
    page.getByRole('progressbar', {
      name: 'Portfolio Completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '71');
  await expect(
    page.getByRole('link', { name: /^Portfolio Task:/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'View Submission', exact: true }),
  ).toBeVisible();
  await page.goto('/student/lessons?lessonId=whole-numbers');
  await expect(
    page
      .getByRole('dialog', { name: 'Whole Numbers', exact: true })
      .getByRole('link', { name: /Portfolio/ }),
  ).toContainText('Done');
});

test('revision feedback supports editing and resubmission without inventing a new tutor grade', async ({
  page,
}) => {
  await page.goto('/student/portfolio-tasks?status=needs-revision');
  await page.getByRole('link', { name: 'Revise Task', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Changes Requested', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Rated 55 out of 100', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Revise My Work', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'My written work', exact: true })
    .fill(
      'I corrected the rounded prices, showed the exact and estimated totals, and explained the difference.',
    );
  await page
    .getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    })
    .fill(reflection);
  await page
    .getByRole('button', { name: 'Review Submission', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Resubmit Work', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm Submission', exact: true })
    .click();
  await expect(page.getByText(/Version 2/)).toBeVisible();
  await page.getByRole('tab', { name: 'Feedback', exact: true }).click();
  await expect(
    page.getByRole('heading', {
      name: 'Feedback on Your Previous Submission',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      'This feedback refers to your previous submission. Your revision is awaiting review.',
    ),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'Back to Portfolio Tasks', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/portfolio-tasks?status=needs-revision',
  );
  await expect(
    page.getByRole('heading', {
      name: 'No portfolio tasks found',
      exact: true,
    }),
  ).toBeVisible();
});

test('validation, file limits, completed tasks, locked tasks, and invalid IDs have explicit states', async ({
  page,
}) => {
  await page.goto(`${task}?tab=submission`);
  await page.getByRole('button', { name: 'Submit Work', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText(
    'Add your written work or attach at least one file.',
  );
  await expect(page.getByRole('alert')).toContainText('Add a short reflection');
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles({
      name: 'work.html',
      mimeType: 'text/html',
      buffer: Buffer.from('<p>work</p>'),
    });
  await expect(
    page.getByRole('alert').filter({ hasText: 'work.html' }),
  ).toContainText('Use PDF');
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(evidence);
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(evidence);
  await expect(
    page.getByRole('alert').filter({ hasText: 'prices.txt' }),
  ).toContainText('already attached');
  const files = Array.from({ length: 6 }, (_, index) => ({
    name: `work-${index}.txt`,
    mimeType: 'text/plain',
    buffer: Buffer.from('My evidence'),
  }));
  await page
    .getByLabel('Attach portfolio files', { exact: true })
    .setInputFiles(files);
  await expect(page.getByRole('button', { name: /^Remove / })).toHaveCount(5);
  await expect(
    page.getByRole('alert').filter({ hasText: 'at most 5 files' }),
  ).toBeVisible();
  await page.goto('/student/portfolio-tasks/personal-dictionary?tab=feedback');
  await expect(
    page.getByRole('img', { name: 'Rated 82 out of 100', exact: true }),
  ).toBeVisible();
  await page.getByRole('tab', { name: 'My Work', exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'My written work', exact: true }),
  ).toHaveAttribute('readonly', '');
  await expect(
    page.getByLabel('Attach portfolio files', { exact: true }),
  ).toHaveCount(0);
  await page.goto('/student/portfolio-tasks/lcm-portfolio?tab=work');
  await expect(
    page.getByText(
      'This task is locked. You can read the brief and preview the related lesson.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveCount(0);
  await page.goto('/student/portfolio-tasks?taskId=missing');
  await expect(page.getByRole('status')).toContainText('could not be found');
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page).toHaveURL('/student/portfolio-tasks');
  await page.goto('/student/portfolio-tasks/missing');
  await expect(
    page.getByRole('heading', {
      name: 'Portfolio task not found',
      exact: true,
    }),
  ).toBeVisible();
});

test('portfolio pages stay readable and usable on mobile', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/portfolio-tasks');
  await expect(
    page.getByRole('heading', { name: 'Portfolio Tasks', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('portfolio-mobile.png'),
    fullPage: true,
  });
  await page
    .getByRole('heading', { name: 'Market Price Comparison', exact: true })
    .getByRole('link')
    .click();
  await expect(
    page.getByRole('heading', { name: 'Market Price Comparison', exact: true }),
  ).toBeInViewport();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('portfolio-task-mobile.png'),
  });
  await page.getByRole('tab', { name: 'My Work', exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'My written work', exact: true }),
  ).toHaveCSS('font-size', '16px');
  await page
    .getByRole('textbox', { name: 'My written work', exact: true })
    .fill('I compared the cost of five fruits and calculated a budget.');
  await page
    .getByRole('textbox', {
      name: 'Reflection (required before submission)',
      exact: true,
    })
    .fill(reflection);
  await page
    .getByRole('button', { name: 'Review Submission', exact: true })
    .click();
  await page.getByRole('button', { name: 'Submit Work', exact: true }).click();
  await expect(
    page.getByRole('dialog', { name: 'Submit portfolio task?', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Keep Working', exact: true }).click();
});
