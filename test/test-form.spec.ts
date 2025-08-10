import { test, expect } from '@playwright/test';

test('isi form latihan di demoqa', async ({ page }) => {
  // Buka halaman
  await page.goto('https://partner.ur-hub.com/login');

  // // Isi nama depan & belakang
  // await page.getByPlaceholder('Email').fill('qagagasur@gmail.com');
  // await page.getByPlaceholder('Password').fill('1234');

  // Isi email
  await page.getByPlaceholder('Email').fill('qagagasur@gmail.com');

  // // Pilih gender Male (klik teks labelnya, bukan inputnya)
  // await page.getByText('Male', { exact: true }).click();

  // Isi nomor HP
  await page.getByPlaceholder('Password').fill('12345');

  // Klik Submit
  await page.getByRole('button', { name: 'Login' }).click();

  // // Verifikasi modal muncul
  await expect(page.getByText('Login Gagal Silahkan Periksa Data Anda')).toBeVisible();
});
