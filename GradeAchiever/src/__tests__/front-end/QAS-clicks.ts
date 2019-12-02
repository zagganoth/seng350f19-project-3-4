/*
 * Tests for QAS CI testing. User input simplicity and efficiency
 */

describe("Web App", () => {
    const InputClickMax:number = 5;
    beforeEach(async () => {
        await page.goto("http://localhost:3000", {waitUntil:'load'});
    });

    it('should login in < 5 clicks', async() => {
        let clicks = 0;
        await page.select("select[name='user']");
        clicks +=1;
        await page.waitForSelector("option");
        await page.select("select[name='user']", '5');
        clicks +=1;
        await page.click("input[type='submit'][value='Login']");
        clicks +=1;
        await page.waitForSelector(".openBtn");
        expect(page.url()).toContain("overview");
        console.log(clicks);
        expect(clicks).toBeLessThanOrEqual(InputClickMax);
    });

    it('should create a new user in < 5 clicks', async() => {
        let clicks = 0;
        await page.type("input[type='text'][name='name']", "testuser");
        clicks +=1;
        await page.type("input[type='text'][name='email']", "testuser@email.com");
        clicks +=1;
        await page.click("input[type='submit'][value='Create User']");
        clicks +=1;
        await page.waitForSelector(".openBtn");
        expect(page.url()).toContain("newUser");
        console.log(clicks);
        expect(clicks).toBeLessThanOrEqual(InputClickMax);
    });

  });
