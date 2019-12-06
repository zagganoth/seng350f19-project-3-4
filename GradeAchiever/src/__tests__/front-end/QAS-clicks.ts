/*
 * Tests for QAS CI testing. User input simplicity and efficiency
 */
/*
jest.mock("../../models/CourseModel");
jest.mock("../../models/GradableItemModel");
jest.mock("../../models/AdminModel");
jest.mock("../../models/UserModel");
*/
const path = require("path");
import fs from "fs";

describe("Web App", () => {
    const InputClickMax: number = 5;
    beforeEach(async () => {
        try {
            await page.goto("http://localhost:3000", {waitUntil: "load"});
        } catch (error) {
            expect(true).toEqual(false);
        }
    });

    it("creates a new user in < 5 clicks", async () => {
        try {
            await page.goto("http://localhost:3000", {waitUntil: "load"});
            let clicks = 0;
            await page.type("input[type='text'][name='name']", "testuser");
            clicks += 1;
            await page.type("input[type='text'][name='email']", "testuser@email.com");
            clicks += 1;
            await page.click("input[type='submit'][value='Create User']");
            clicks += 1;
            await page.waitForSelector(".openBtn");
            expect(page.url()).toContain("newUser");
            expect(clicks).toBeLessThanOrEqual(InputClickMax);
        } catch (error) {
            expect(true).toEqual(false);
        }
        // await page.click(".logout");
    });

    it("logs in in < 5 clicks", async () => {
        try {
            let clicks = 0;
            await page.select("select[name='user']");
            clicks += 1;
            await page.waitForSelector("option");
            await page.select("select[name='user']", "1");
            clicks += 1;
            await page.click("input[type='submit'][value='Login']");
            clicks += 1;
            await page.waitForSelector(".openBtn");
            expect(page.url()).toContain("overview");
            expect(clicks).toBeLessThanOrEqual(InputClickMax);
        } catch (error) {
            expect(true).toEqual(false);
        }
    }, 15000);
    it("Create a course in < 5 clicks", async () => {
        try {
            await page.select("select[name='user']");
            await page.waitForSelector("option");
            await page.select("select[name='user']", "1");
            await page.click("input[type='submit'][value='Login']");
            await page.waitForSelector(".openBtn");
            let clicks = 0;
            await page.click(".openBtn");
            clicks++;
            const filePath = path.resolve(__dirname, "../../../sample_outlines/SENG350Outline.pdf");
            console.log(filePath);
            const input = await page.waitForSelector("input[name='file']");
            await input.uploadFile(filePath);
            console.log(page.url());
            await page.click("#filesubmit");
            clicks++;
            console.log(page.url());
            await page.waitForSelector("input[name='gradegoal']");
            await page.type("input[name='gradegoal']", "89");
            await page.type("input[name='perceivedDiff']", "3");
            await page.click("input[type='submit']");
            clicks++;
            expect(clicks).toBeLessThanOrEqual(InputClickMax);
        } catch (error) {
            expect(true).toEqual(false);
        }
    }, 15000);
    it("logs study time for gradable item in < 5 clicks", async () => {
        try {
            await page.select("select[name='user']");
            await page.waitForSelector("option");
            await page.select("select[name='user']", "1");
            await page.click("input[type='submit'][value='Login']");
            await page.waitForSelector(".openBtn");
            let clicks = 0;
            // console.log(page.url());
            const bodyHTML = await page.evaluate(() => document.body.innerHTML);
            // console.log(bodyHTML);
            // Select gradable item
            await page.click(".expanditem");
            clicks += 1;
            // wait for edits to
            await page.waitForSelector("button.edititem");
            await page.click("button.edititem");
            clicks += 1;
            await page.type("input[name='hours']", "2");
            clicks += 1;
            console.log(page.url());
            // await page.waitForSelector("input[type=")
            const um = await page.click(".itemeditsubmit");
            console.log(um);
            // await page.waitForNavigation();
            clicks += 1;
            expect(clicks).toBeLessThanOrEqual(InputClickMax);
        } catch (error) {
            console.log(error);
            expect(true).toEqual(false);
        }
    }, 15000);

    it("adds a new gradable item in < 5 clicks", async () => {
        try {
            await page.select("select[name='user']");
            await page.waitForSelector("option");
            await page.select("select[name='user']", "1");
            await page.click("input[type='submit'][value='Login']");
            await page.waitForSelector(".openBtn");
            let clicks = 0;
            console.log(page.url());
            // Select course home page
            await page.click("input[value='SENG 350']");
            await page.waitForSelector("#additembutton");
            // select plus button
            await page.click("#additembutton");
            clicks += 1;
            // wait for gradableitem overlay
            await page.waitForSelector("#newgradableitem");
            await page.type("input[name='GradableItems[0][name]']", "testitem");
            clicks += 1;
            await page.type("input[name='GradableItems[0][weight]']", "10");
            clicks += 1;
            await page.type("input[name='GradableItems[0][duedate]']", "10/09/2019");
            clicks += 1;
            await page.click("input[type='submit'][value='Submit']");
            clicks += 1;
            await page.waitForSelector(".course-details");
            // expect(page.url()).toContain("newGradableItem");
            expect(clicks).toBeLessThanOrEqual(InputClickMax);
        } catch (error) {
            expect(true).toEqual(false);
        }
    }, 15000);

  });
