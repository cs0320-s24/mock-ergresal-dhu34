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
  await expect(page.getByLabel("repl history")).toHaveText("Invalid command");
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
  await expect(page.getByLabel("repl history")).toHaveText("Mode changed");
  await expect(page.getByText("Mode changed")).toBeVisible();});

test('after I input load, my data gets loaded', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("load_file file1");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("Data loaded successfully");
  await expect(page.getByText("Data loaded successfully")).toBeVisible();
});

test('after I input view without having loaded, shows an error message', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("view");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("No data loaded");
  await expect(page.getByText("No data loaded")).toBeVisible();
});

test('after I input view after loading, I see my data', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("load_file file1");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("Data loaded successfully");
  await expect(page.getByText("Data loaded successfully")).toBeVisible();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("view");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText(/1,2,3,4,5/);
  await expect(page.getByLabel("repl history")).toHaveText(/The,song,remains,the,same\./);
  await expect(page.getByText("1,2,3,4,5")).toBeVisible();
  await expect(page.getByText("The,song,remains,the,same.")).toBeVisible();
});

test('after i search with incorrect params or without loading, i get an error message', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("search 1 1");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("No data loaded");
  await expect(page.getByText("No data loaded")).toBeVisible();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("search 1");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText(/Function needs 3 arguments: search {column} {object}/);
  await expect(page.getByText(/Function needs 3 arguments: search {column} {object}/)).toBeVisible();
});

test('after i search with correct params, i get the correct data', async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel('Username').fill("cool");
  await page.getByLabel('Password').fill("bro");
  await page.getByLabel('Login').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("load_file file3");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("Command input")).toBeEmpty();
  await expect(page.getByLabel("repl history")).toHaveText("Data loaded successfully");
  await expect(page.getByText("Data loaded successfully")).toBeVisible();
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("search 1 1");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("repl history")).toHaveText(/1 not found in column 1/);

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill("search a F");
  await page.getByLabel('Submit').click();
  await expect(page.getByLabel("repl history")).toHaveText(/f found in row 2: F,G,H,I/);
});

//test for behavior after mode change
//test search
