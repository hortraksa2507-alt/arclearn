/**
 * Records a walkthrough demo of the Study Hub.
 * Run: node scripts/record-demo.mjs
 */
import { chromium } from "playwright";
import { mkdir, readdir, rename } from "fs/promises";
import path from "path";

const BASE_URL = process.env.DEMO_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "public", "demos");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 800 },
    },
  });

  const page = await context.newPage();

  try {
    // Register demo user
    await page.goto(`${BASE_URL}/login`);
    await sleep(1200);

    await page.getByRole("button", { name: "Register", exact: true }).first().click();
    await sleep(600);

    await page.getByPlaceholder("Enter your name").fill("Ginny");
    await page.getByPlaceholder("your@email.com").fill("demo@studyhub.test");
    await page.getByPlaceholder("Enter your password").fill("demo1234");
    await page.getByRole("button", { name: "Create Account" }).click();
    await sleep(2500);

    // Navigate to Study Hub via sidebar
    await page.getByRole("link", { name: "Study Hub" }).click();
    await sleep(2500);

    // Overview of integrations bar
    await page.evaluate(() => window.scrollBy(0, 180));
    await sleep(1800);

    // Add a todo — triggers AI duration suggestion
    const todoInput = page.getByPlaceholder(/Add task/i);
    await todoInput.fill("Write 3-page history essay draft");
    await sleep(1500);

    // Click plus button next to todo input
    await page.locator('input[placeholder*="Add task"]').locator("..").locator("button").click();
    await sleep(1500);

    // Mark first pending task as active (for timer)
    await page.locator('.glass-subtle.rounded-xl.p-3').first().click();
    await sleep(1000);

    // Start pomodoro timer
    await page.locator("button.glass-btn-primary.w-14").click();
    await sleep(3000);

    // Pause timer
    await page.locator("button.glass-btn-primary.w-14").click();
    await sleep(800);

    // Scroll to calendar section
    await page.evaluate(() => window.scrollBy(0, 350));
    await sleep(1500);

    // Brainstorm board — add note
    await page.getByRole("button", { name: "Add Note" }).click();
    await sleep(1000);

    // Edit new note
    const textareas = page.locator("textarea");
    const count = await textareas.count();
    await textareas.nth(count - 1).fill("Facade idea: curved glass panels");
    await sleep(1000);

    // Drag sticky note
    const noteArea = page.locator(".relative.flex-1.rounded-2xl").first();
    const box = await noteArea.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 80, box.y + 60);
      await page.mouse.down();
      await page.mouse.move(box.x + 220, box.y + 140, { steps: 20 });
      await page.mouse.up();
    }
    await sleep(1500);

    // Scroll back to top — toggle integration
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);
    await page.getByRole("button", { name: "Dropbox" }).click();
    await sleep(1000);

    // Full page tour
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(2000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(2000);
  } catch (err) {
    console.error("Demo recording error:", err);
  }

  await context.close();
  await browser.close();

  const files = await readdir(OUTPUT_DIR);
  const webm = files.find((f) => f.endsWith(".webm") && f !== "study-hub-demo.webm");
  if (webm) {
    const dest = path.join(OUTPUT_DIR, "study-hub-demo.webm");
    await rename(path.join(OUTPUT_DIR, webm), dest);
    console.log(`Demo saved to ${dest}`);
  } else {
    console.log("Video files:", files);
  }
}

main().catch(console.error);
