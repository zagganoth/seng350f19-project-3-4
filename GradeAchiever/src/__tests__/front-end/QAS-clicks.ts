/*
 * Tests for QAS CI testing. User input simplicity and efficiency
 */

describe("Google", () => {
    beforeAll(async () => {
      await page.goto("https://google.com");
    });

    it('should display "google" text on page', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain("google");
    });

  });
