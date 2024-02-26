import { expect, test } from "@playwright/test";

// If you needed to do something before every test case...
test.beforeEach(() => {

  })

test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Login')).toBeVisible()
  await expect(page.getByLabel("Username")).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()

  await expect(page.getByLabel('Command input')).not.toBeVisible()

  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill("bro");
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  await expect(page.getByLabel('Command input')).toHaveValue("Awesome command")
});

test('on page login, i see a button', async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Command input')).toBeVisible();
  await expect(page.getByLabel('Sign out')).toBeVisible();
});

test('on page login with invalid name, i see error message', async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill("NOTbro");
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Command input')).not.toBeVisible();

  await expect(page.getByLabel("errormessage")).toHaveText("Invalid username or password");
});

test('after I click the response button, output displayed', async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();

  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("repl history")).toHaveText("output: Invalid command");
});

test('after I click the button, my command gets pushed', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("mode");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("output: Mode changed");
  await expect(page.getByText("output: Mode changed")).toBeVisible();});