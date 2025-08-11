import test, { expect } from "@playwright/test";

const email1 = 'qagagasur@gmail.com';
const pw1 = '1234';
const email2 = 'devamara@g.com';
const pw2 = 'password';
const email3 = 'jasonsoenarko7@gmail.com';
const pw3 = 'Fullmoon2021';
const email4 = 'sambelbakar69@g.com';
const pw4 = '1234';
const email5 = 'nattapos@g.com';
const pw5 = '1234';

test.describe('Stress login test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://partner.ur-hub.com/login'); //login ke website)
    }
);
test('Stress Login with multiple accounts', async ({page}) => {
    // Log the API response for debugging
    page.on('response', async (response) => {
        if (response.url().includes('https://apis.ur-hub.com/qr/v3/auth/employeeLogin.php')) {
            try {
                const json = await response.json();
                console.log('API Response:', json);
            } catch {}
        }
    });

    const accounts = [
        { email: email1, password: pw1 },
        { email: email2, password: pw2 },
        { email: email3, password: pw3 },
        { email: email4, password: pw4 },
        { email: email5, password: pw5 }
    ];
    for (const account of accounts) {
        //fill email and password
        await page.getByPlaceholder('Email').fill(account.email);
        await page.getByPlaceholder('Password').fill(account.password);
        // Click login
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL(/.*\/dashboard/);
    }
})
});