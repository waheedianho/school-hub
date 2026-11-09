import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.use({ viewport: { width: 1672, height: 1000 } });
const workspace = '/student/worksheets/whole-numbers-worksheet';
const answer = (index: number) => `Answer to question ${index}`;

test('worksheets overview has derived statistics, selection, and pagination', async ({
  page,
}, testInfo) => {
  await page.goto('/student/worksheets');
  await expect(
    page.getByRole('heading', { name: 'Worksheets', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'All Worksheets 17', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Completed 13', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('progressbar', {
      name: 'Selected worksheet completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '60');
  await expect(page.getByText('Showing 1 to 5 of 17 worksheets')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('worksheets-desktop.png'),
    fullPage: true,
  });
  await page
    .getByRole('button', { name: 'Select Place Value Worksheet', exact: true })
    .click();
  await expect(page).toHaveURL(
    '/student/worksheets?worksheetId=reading-whole-numbers-worksheet',
  );
  await expect(
    page.getByRole('progressbar', {
      name: 'Selected worksheet completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '100');
  await page
    .getByRole('link', { name: 'Review Worksheet', exact: true })
    .click();
  await expect(
    page.getByRole('region', { name: 'Worksheet result' }),
  ).toContainText('90%');
  await expect(
    page.getByRole('textbox', { name: answer(1), exact: true }),
  ).toHaveValue('600000');
  await page
    .getByRole('link', { name: 'Back to Worksheets', exact: true })
    .first()
    .click();
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(
    page.getByText('Showing 6 to 10 of 17 worksheets'),
  ).toBeVisible();
  await page
    .getByRole('tab', { name: 'Assigned to Me 4', exact: true })
    .click();
  await expect(page.getByText('Showing 1 to 4 of 4 worksheets')).toBeVisible();
});

test('worksheet search, subject, term, and status filters survive refresh and history', async ({
  page,
}) => {
  await page.goto('/student/worksheets');
  await page
    .getByRole('combobox', { name: 'Subject', exact: true })
    .selectOption('english-language');
  await page
    .getByRole('searchbox', { name: 'Search worksheets', exact: true })
    .fill('Parts');
  await expect(page.getByText('Showing 1 to 1 of 1 worksheets')).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('searchbox', { name: 'Search worksheets', exact: true }),
  ).toHaveValue('Parts');
  await expect(
    page.getByRole('combobox', { name: 'Subject', exact: true }),
  ).toHaveValue('english-language');
  await page
    .getByRole('combobox', { name: 'Term', exact: true })
    .selectOption('third');
  await expect(
    page.getByRole('heading', { name: 'No worksheets found', exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByText('Showing 1 to 1 of 1 worksheets')).toBeVisible();
  await page.goto(
    '/student/worksheets?subjectId=mathematics&topicId=whole-numbers',
  );
  await expect(page.getByText('Showing 1 to 1 of 1 worksheets')).toBeVisible();
});

test('answers, review marks, scratch notes, save and exit, and filter context persist', async ({
  page,
}, testInfo) => {
  await page.goto(
    `${workspace}?term=all&subjectId=mathematics&status=in-progress`,
  );
  await expect(
    page.getByRole('textbox', { name: answer(1), exact: true }),
  ).toHaveValue('623');
  await page
    .getByRole('textbox', { name: answer(13), exact: true })
    .fill('408');
  await page
    .getByRole('button', { name: 'Mark question 13 for review', exact: true })
    .click();
  await page.getByRole('textbox', { name: answer(2), exact: true }).fill('');
  await page.getByRole('button', { name: 'Scratch Pad', exact: true }).click();
  const scratch = page.getByRole('dialog', {
    name: 'Scratch Pad',
    exact: true,
  });
  await scratch
    .getByRole('textbox', { name: 'Your working notes', exact: true })
    .fill('34 × 12 = 340 + 68 = 408');
  await scratch
    .getByRole('button', { name: 'Close dialog', exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole('textbox', { name: answer(13), exact: true }),
  ).toHaveValue('408');
  await expect(
    page.getByRole('textbox', { name: answer(2), exact: true }),
  ).toHaveValue('');
  await expect(
    page.getByRole('button', {
      name: 'Mark question 13 for review',
      exact: true,
    }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Scratch Pad', exact: true }).click();
  await expect(
    page.getByRole('textbox', { name: 'Your working notes', exact: true }),
  ).toHaveValue('34 × 12 = 340 + 68 = 408');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath('worksheet-workspace-desktop.png'),
  });
  await page.getByRole('button', { name: 'Save & Exit', exact: true }).click();
  await expect(page).toHaveURL(
    '/student/worksheets?worksheetId=whole-numbers-worksheet&term=all&subjectId=mathematics&status=in-progress',
  );
  await expect(
    page.getByRole('progressbar', {
      name: 'Selected worksheet completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '60');
  await page
    .getByRole('link', { name: 'Continue Worksheet', exact: true })
    .click();
  await expect(
    page.getByRole('textbox', { name: answer(13), exact: true }),
  ).toHaveValue('408');
});

test('submitting a worksheet grades answers and updates the dashboard and lesson activity', async ({
  page,
}, testInfo) => {
  await page.goto(workspace);
  const answers = [
    '623',
    '9,134',
    '8578',
    '5725',
    '22000',
    '276',
    '3713',
    '5423',
    '6375',
    '11235',
    '92',
    '750',
    '408',
    '1200',
    '621',
    '12',
    '12',
    '40',
    '105',
    '120',
  ];
  for (const [index, value] of answers.entries())
    await page
      .getByRole('textbox', { name: answer(index + 1), exact: true })
      .fill(value);
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  const submit = page.getByRole('dialog', {
    name: 'Submit worksheet?',
    exact: true,
  });
  await expect(submit).toContainText('answered 20 of 20');
  await submit
    .getByRole('button', { name: 'Submit and Review', exact: true })
    .click();
  await expect(
    page.getByRole('region', { name: 'Worksheet result' }),
  ).toContainText('20 / 20 marks · 100%');
  await expect(
    page.getByRole('textbox', { name: answer(1), exact: true }),
  ).toHaveAttribute('readonly', '');
  await page.reload();
  await expect(
    page.getByRole('region', { name: 'Worksheet result' }),
  ).toContainText('100%');
  await page.screenshot({
    path: testInfo.outputPath('worksheet-review-desktop.png'),
  });
  await page
    .getByRole('navigation', { name: 'Portal navigation' })
    .getByRole('link', { name: 'Dashboard', exact: true })
    .click();
  await expect(
    page.getByRole('progressbar', {
      name: 'Worksheet Completion',
      exact: true,
    }),
  ).toHaveAttribute('aria-valuenow', '85');
  await expect(
    page.getByRole('link', { name: /Worksheet Submission/ }),
  ).toHaveCount(0);
  await page.goto('/student/lessons?lessonId=whole-numbers');
  const lesson = page.getByRole('dialog', {
    name: 'Whole Numbers',
    exact: true,
  });
  await expect(lesson.getByRole('link', { name: /Worksheet/ })).toContainText(
    'Done',
  );
});

test('incomplete submission, read-only review, locked records, summary records, and invalid IDs work', async ({
  page,
}) => {
  await page.goto(workspace);
  await expect(page.getByText('Answer: 408', { exact: true })).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  const submit = page.getByRole('dialog', {
    name: 'Submit worksheet?',
    exact: true,
  });
  await expect(submit).toContainText('answered 12 of 20');
  await submit
    .getByRole('button', { name: 'Keep Working', exact: true })
    .click();
  await expect(
    page.getByRole('textbox', { name: answer(13), exact: true }),
  ).not.toHaveAttribute('readonly', '');
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Submit and Review', exact: true })
    .click();
  await expect(
    page.getByRole('region', { name: 'Worksheet result' }),
  ).toContainText('12 / 20 marks · 60%');
  await expect(page.getByText('Answer: 408', { exact: true })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Question navigation' })
    .getByRole('button', { name: /^Question 20,/ })
    .click();
  await expect(
    page.getByRole('textbox', { name: answer(20), exact: true }),
  ).toBeInViewport();
  await expect(
    page
      .getByRole('navigation', { name: 'Question navigation' })
      .getByRole('button', { name: /^Question 20,/ }),
  ).toHaveAttribute('aria-current', 'step');
  await page.goto('/student/worksheets/lcm-worksheet');
  await expect(
    page.getByRole('heading', { name: 'Worksheet locked', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('textbox')).toHaveCount(0);
  await page.goto('/student/worksheets/rounding-numbers-worksheet');
  await expect(
    page.getByRole('heading', { name: 'Score summary available', exact: true }),
  ).toBeVisible();
  await page.goto('/student/worksheets?worksheetId=missing');
  await expect(page.getByRole('status')).toContainText('could not be found');
  await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await expect(page).toHaveURL('/student/worksheets');
  await page.goto('/student/worksheets/missing');
  await expect(
    page.getByRole('heading', { name: 'Worksheet not found', exact: true }),
  ).toBeVisible();
});

test('worksheet tools, printable filtering, download, and print preparation work', async ({
  page,
}) => {
  await page.goto('/student/worksheets');
  await page
    .getByRole('button', { name: /Browse Printable Worksheets/ })
    .click();
  await expect(page).toHaveURL('/student/worksheets?printable=1');
  await expect(page.getByText('Showing 1 to 5 of 6 worksheets')).toBeVisible();
  await page
    .getByRole('link', { name: 'Continue Worksheet', exact: true })
    .click();
  await page.getByRole('button', { name: 'Calculator', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Calculation', exact: true })
    .fill('345+278');
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.getByRole('dialog').locator('output')).toHaveText('623');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('button', { name: 'Unit Converter', exact: true })
    .click();
  await expect(page.getByRole('dialog').locator('output')).toHaveText(
    '1 m = 100 cm',
  );
  await page
    .getByRole('combobox', { name: 'Measurement', exact: true })
    .selectOption('mass');
  await expect(
    page.getByRole('combobox', { name: 'From', exact: true }),
  ).toHaveValue('kg');
  await expect(
    page.getByRole('combobox', { name: 'To', exact: true }),
  ).toHaveValue('g');
  await page.getByRole('spinbutton', { name: 'Value', exact: true }).fill('2');
  await expect(page.getByRole('dialog').locator('output')).toHaveText(
    '2 kg = 2000 g',
  );
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('button', { name: 'Formula Sheet', exact: true })
    .click();
  await expect(page.getByRole('dialog')).toContainText(
    '1 kilogram = 1,000 grams',
  );
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page
    .getByRole('button', { name: 'Download / Print', exact: true })
    .click();
  const downloading = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Download Worksheet (.txt)', exact: true })
    .click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe('whole-numbers-worksheet.txt');
  const downloadedPath = await download.path();
  expect(downloadedPath).toBeTruthy();
  const text = await readFile(downloadedPath ?? '', 'utf8');
  expect(text).toContain('Operations on Whole Numbers Worksheet');
  expect(text).toContain('Answer: ________________________');
  expect(text).not.toContain('Answer: 623');
  await page.evaluate(() => {
    window.print = () => {
      document.body.dataset['worksheetPrinted'] = 'true';
    };
  });
  await page
    .getByRole('button', { name: 'Print / Save as PDF', exact: true })
    .click();
  await expect(page.locator('body')).toHaveAttribute(
    'data-worksheet-printed',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  await expect(
    page.getByRole('navigation', { name: 'Portal navigation' }),
  ).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Submit Worksheet', exact: true }),
  ).not.toBeVisible();
  await page.emulateMedia({ media: 'screen' });
});

test('worksheet overview and workspace fit mobile and preserve readable text', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/student/worksheets');
  await expect(
    page.getByRole('heading', { name: 'Worksheets', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: testInfo.outputPath('worksheets-mobile.png'),
    fullPage: true,
  });
  await page
    .getByRole('link', { name: 'Continue Worksheet', exact: true })
    .click();
  await expect(
    page.getByRole('textbox', { name: answer(1), exact: true }),
  ).toHaveValue('623');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await expect(
    page.getByRole('textbox', { name: answer(1), exact: true }),
  ).toHaveCSS('font-size', '16px');
  await page.screenshot({
    path: testInfo.outputPath('worksheet-workspace-mobile.png'),
  });
  await page
    .getByRole('combobox', { name: 'Worksheet zoom', exact: true })
    .selectOption('125');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page
    .getByRole('combobox', { name: 'Worksheet zoom', exact: true })
    .selectOption('100');
  await page
    .getByRole('button', { name: 'Save & Continue', exact: true })
    .click();
  await expect(
    page.getByRole('textbox', { name: answer(14), exact: true }),
  ).toBeFocused();
  await page
    .getByRole('button', { name: 'Submit Worksheet', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Submit worksheet?', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Keep Working', exact: true }).click();
});
