import { test, expect } from '@playwright/test';

test.describe('Learner Settings Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student/settings');
  });

  test('displays settings header, title and subtitle', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Settings', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(
        'Manage your account, learning preferences and app settings.',
      ),
    ).toBeVisible();
  });

  test('renders all 9 settings menu navigation items', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Settings categories' });
    const items = [
      'Account Settings',
      'Learning Preferences',
      'Notifications',
      'Privacy & Security',
      'Appearance',
      'Download & Storage',
      'Language',
      'Help & Support',
      'About Learno',
    ];

    for (const item of items) {
      await expect(
        nav.getByRole('button', { name: new RegExp(item) }),
      ).toBeVisible();
    }
  });

  test('selecting a menu item updates the URL query parameter and active state', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation', { name: 'Settings categories' });

    // Click Notifications
    await nav.getByRole('button', { name: /Notifications/ }).click();
    await expect(page).toHaveURL(/.*section=notifications/);
    await expect(
      nav.getByRole('button', { name: /Notifications/ }),
    ).toHaveClass(/active/);

    // Click Appearance
    await nav.getByRole('button', { name: /Appearance/ }).click();
    await expect(page).toHaveURL(/.*section=appearance/);
    await expect(nav.getByRole('button', { name: /Appearance/ })).toHaveClass(
      /active/,
    );
  });

  test('deep-linking with query parameter selects corresponding category', async ({
    page,
  }) => {
    await page.goto('/student/settings?section=security');
    const nav = page.getByRole('navigation', { name: 'Settings categories' });
    await expect(
      nav.getByRole('button', { name: /Privacy & Security/ }),
    ).toHaveClass(/active/);
  });

  test('displays profile information card with edit profile action', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Profile Information' }),
    ).toBeVisible();
    await expect(page.getByText('Full Name')).toBeVisible();
    await expect(page.getByText('Email Address')).toBeVisible();

    const editBtn = page.getByRole('link', { name: 'Edit Profile' });
    await expect(editBtn).toBeVisible();
    await expect(editBtn).toHaveAttribute('href', '/student/profile?view=edit');
  });

  test('validates change password inputs and shows error messages', async ({
    page,
  }) => {
    const submitBtn = page.getByRole('button', { name: 'Update Password' });

    // Submit empty form
    await submitBtn.click();
    await expect(page.getByText('Enter your current password.')).toBeVisible();

    // Fill current password but short new password
    await page.locator('#current-password').fill('oldpass123');
    await page.locator('#new-password').fill('short');
    await submitBtn.click();
    await expect(
      page.getByText('Password must be at least 8 characters long.'),
    ).toBeVisible();

    // Mismatched confirmation password
    await page.locator('#new-password').fill('validsecret123');
    await page.locator('#confirm-password').fill('differsecret456');
    await submitBtn.click();
    await expect(page.getByText('Passwords do not match.')).toBeVisible();

    // Valid matching passwords
    await page.locator('#confirm-password').fill('validsecret123');
    await submitBtn.click();
    await expect(
      page.getByText(/Password updated successfully for this session/i),
    ).toBeVisible();
  });

  test('allows toggling theme between light, dark, and system', async ({
    page,
  }) => {
    const themeGroup = page.getByRole('radiogroup', {
      name: 'Theme selection',
    });
    const darkBtn = themeGroup.getByRole('radio', { name: 'Dark' });
    const lightBtn = themeGroup.getByRole('radio', { name: 'Light' });

    await darkBtn.click();
    await expect(darkBtn).toHaveClass(/active/);

    await lightBtn.click();
    await expect(lightBtn).toHaveClass(/active/);
  });

  test('opens and closes storage management modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Manage Storage' }).click();
    await expect(
      page.getByRole('heading', { name: 'Manage Storage & Cache' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Done' }).click();
    await expect(
      page.getByRole('heading', { name: 'Manage Storage & Cache' }),
    ).not.toBeVisible();
  });

  test('highlights card border when submenu item is clicked and vice-versa when card is clicked or focused', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation', { name: 'Settings categories' });
    const learningCard = page.locator('#card-learning');
    const notificationsCard = page.locator('#card-notifications');

    // Clicking Notifications in submenu highlights notifications card border
    await nav.getByRole('button', { name: /Notifications/ }).click();
    await expect(notificationsCard).toHaveClass(/active-card/);

    // Clicking Learning card highlights learning card and switches active submenu item
    await learningCard.click();
    await expect(learningCard).toHaveClass(/active-card/);
    await expect(
      nav.getByRole('button', { name: /Learning Preferences/ }),
    ).toHaveClass(/active/);
  });

  test('displays privacy assurance footer banner', async ({ page }) => {
    await expect(
      page.getByText(
        'Your information is private and secure. We will never share your data.',
      ),
    ).toBeVisible();
  });
});
