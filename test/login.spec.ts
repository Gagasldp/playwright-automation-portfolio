import { test, expect } from '@playwright/test';

const validEmail = 'qagagasur@gmail.com';
const validPassword = '1234';
const wrongEmail = 'qagagas@gmail.com';
const wrongPassword = '12345';
const invalidEmail = 'inimahsalahformat';

test.describe('Login Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://partner.ur-hub.com/login'); // ganti sesuai URL login
  });

  test('Login sukses dengan kredensial valid', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(validEmail);
    await page.getByPlaceholder('Password').fill(validPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    // await expect(page.getByText('Login sukses')).toBeVisible();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Login gagal - email salah', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(wrongEmail);
    await page.getByPlaceholder('Password').fill(validPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Login gagal silahkan periksa data anda')).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Login gagal - password salah', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(validEmail);
    await page.getByPlaceholder('Password').fill(wrongPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Login gagal silahkan periksa data anda')).toBeVisible();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Validasi - email kosong', async ({ page }) => {
    await page.getByPlaceholder('Password').fill(validPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Login gagal silahkan periksa data anda')).toBeVisible();
    // await expect(page.getByText('Email wajib diisi')).toBeVisible();
  });

  test('Validasi - password kosong', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(validEmail);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Login gagal silahkan periksa data anda')).toBeVisible();
  });

  test('Validasi - format email salah', async ({ page }) => {
    await page.getByPlaceholder('Email').fill(invalidEmail);
    await page.getByPlaceholder('Password').fill(validPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Login gagal silahkan periksa data anda')).toBeVisible();
  });

});

