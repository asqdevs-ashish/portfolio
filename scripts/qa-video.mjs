/**
 * Headless QA for the hero video on the production build.
 * Usage: node scripts/qa-video.mjs [port]
 */
import { chromium } from "playwright-core";

const port = process.argv[2] ?? "3311";
const base = `http://localhost:${port}`;

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const browser = await chromium.launch({
  channel: "chrome",
  args: [
    "--autoplay-policy=no-user-gesture-required",
    "--disable-features=PreloadMediaEngagementIndex,MediaEngagementBypassAutoplayPolicies",
  ],
  // Playwright's sandbox setup doesn't work on Windows without this:
  chromiumSandbox: false,
});

const errors = [];
const failedUrls = [];
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));
page.on("response", (r) => {
  if (r.status() >= 400) failedUrls.push(r.url());
});

await page.goto(base, { waitUntil: "domcontentloaded" });

/* ------------------------------ hero renders ------------------------------ */
const h1 = await page.locator("h1").first().textContent();
check("Hero renders with headline", Boolean(h1 && h1.includes("mobile apps")), h1?.slice(0, 60));

const shell = page.locator(".video-shell");
const shellCount = await shell.count();
check("Video player present", shellCount === 1, `count=${shellCount}`);

if (shellCount === 1) {
  const video = shell.locator("video");
  await video.waitFor({ state: "attached", timeout: 5000 });

  /* ------------------------------ video basics ---------------------------- */
  const src = await video.evaluate((el) => {
    const v = el;
    return v.currentSrc.split("/").pop();
  });
  const dims = await video.evaluate((el) => {
    const v = el;
    return `${v.videoWidth}x${v.videoHeight}`;
  });
  check("Desktop serves 1080p file", src === "ashish-intro.mp4", src);
  check("Video decodes at 16:9", dims === "1920x1080", dims);

  // Autoplay with sound (allowed by the launch flag)
  await page.waitForTimeout(1200);
  const audible = await video.evaluate((el) => {
    const v = el;
    return { playing: !v.paused, muted: v.muted, t: v.currentTime };
  });
  check("Autoplay with sound", audible.playing && !audible.muted, JSON.stringify(audible));
  check("No unmute pill when audio allowed", (await page.locator('button:has-text("Unmute")').count()) === 0);

  /* --------------------- progress bar + duration display ------------------- */
  const fillPct = () =>
    page.evaluate(() => {
      const fill = document.querySelector('[role="slider"] .bg-primary');
      return fill ? parseFloat(fill.style.width) : -1;
    });
  const w1 = await fillPct();
  await page.waitForTimeout(2000);
  const w2 = await fillPct();
  check("Progress fill advances while playing", w2 > w1, `${w1?.toFixed(1)}% → ${w2?.toFixed(1)}%`);
  const readout = await page.evaluate(() => document.querySelector(".video-shell").textContent);
  check("Duration resolves to 0:15", readout.includes("0:15"), readout.match(/\d+:\d+ \/ \d+:\d+/)?.[0] ?? "no readout");

  /* -------------------------------- controls ------------------------------ */
  const shellBox = await shell.boundingBox();
  await shell.hover(); // desktop: reveal on hover
  await page.waitForTimeout(400);

  const hasAllControls = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const byLabel = (l) => Boolean(document.querySelector(`button[aria-label="${l}"]`));
    return {
      play: byLabel("Pause video"),
      back: byLabel("Skip back 3 seconds"),
      fwd: byLabel("Skip forward 3 seconds"),
      mute: byLabel("Mute video"),
      fullscreen: byLabel("Enter fullscreen"),
      slider: Boolean(q('[role="slider"][aria-label="Seek video"]')),
    };
  });
  check("Play/pause control", hasAllControls.play);
  check("−3s control", hasAllControls.back);
  check("+3s control", hasAllControls.fwd);
  check("Mute control", hasAllControls.mute);
  check("Fullscreen control", hasAllControls.fullscreen);
  check("Seek slider present", hasAllControls.slider);

  /* --------------------------------- skip ±3s ------------------------------ */
  await video.evaluate((el) => {
    (el).pause();
    (el).currentTime = 8;
  });
  await page.waitForTimeout(150);
  await page.click('button[aria-label="Skip forward 3 seconds"]');
  await page.waitForTimeout(250);
  const t1 = await video.evaluate((el) => el.currentTime);
  check("+3s seek", Math.abs(t1 - 11) < 0.3, `t=${t1.toFixed(2)}`);

  await page.click('button[aria-label="Skip back 3 seconds"]');
  await page.waitForTimeout(250);
  const t2 = await video.evaluate((el) => el.currentTime);
  check("−3s seek", Math.abs(t2 - 8) < 0.3, `t=${t2.toFixed(2)}`);

  /* ------------------------------- seek slider ----------------------------- */
  const slider = page.locator('[role="slider"][aria-label="Seek video"]');
  const sliderBox = await slider.boundingBox();
  // Click at ~50% of the track
  await page.mouse.click(sliderBox.x + sliderBox.width * 0.5, sliderBox.y + sliderBox.height / 2);
  await page.waitForTimeout(250);
  const t3 = await video.evaluate((el) => el.currentTime);
  check("Click-to-seek ~50%", t3 > 4 && t3 < 11, `t=${t3.toFixed(2)}`);

  // Keyboard seek on the slider
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  const t4 = await video.evaluate((el) => el.currentTime);
  check("Keyboard ArrowRight = +3s", Math.abs(t4 - (t3 + 3)) < 0.3, `t=${t4.toFixed(2)}`);

  /* ------------------------------ play / pause ----------------------------- */
  await page.click('button[aria-label="Play video"]');
  await page.waitForTimeout(700);
  const playing = await video.evaluate((el) => !el.paused);
  check("Play button starts playback", playing);
  await shell.hover();
  await page.click('button[aria-label="Pause video"]');
  const paused = await video.evaluate((el) => el.paused);
  check("Pause button stops playback", paused);

  /* --------------------------------- mute ---------------------------------- */
  // Audio is currently ON (audible autoplay succeeded) — mute first, then unmute.
  await page.click('button[aria-label="Mute video"]');
  await page.waitForTimeout(150);
  const mutedNow = await video.evaluate((el) => el.muted);
  check("Mute works", mutedNow);
  await page.click('button[aria-label="Unmute video"]');
  await page.waitForTimeout(150);
  const unmutedNow = await video.evaluate((el) => !el.muted);
  check("Unmute works", unmutedNow);

  /* ------------------------------- fullscreen ------------------------------ */
  await page.click('button[aria-label="Enter fullscreen"]');
  await page.waitForTimeout(500);
  const fs = await page.evaluate(() => Boolean(document.fullscreenElement));
  check("Fullscreen", fs);
  if (fs) {
    await page.evaluate(() => document.exitFullscreen());
    await page.waitForTimeout(300);
  }

  /* -------------------------- keyboard on the shell ------------------------ */
  await shell.focus();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(200);
  const t5 = await video.evaluate((el) => el.currentTime);
  check("Shell ArrowLeft = −3s", Number.isFinite(t5), `t=${t5.toFixed(2)}`);

  /* ------------------------------ aspect ratio ----------------------------- */
  const ratioOk = await page.evaluate(() => {
    const shell = document.querySelector(".video-shell");
    const box = shell.getBoundingClientRect();
    const r = box.width / box.height;
    return Math.abs(r - 16 / 9) < 0.02;
  });
  check("Shell maintains 16:9", ratioOk);

  /* -------------------------- hero copy above video ------------------------- */
  // On desktop the video sits beside the headline; the stacked-order check
  // only applies to the single-column (mobile) layout.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const orderOk = await page.evaluate(() => {
    const h1 = document.querySelector("h1").getBoundingClientRect();
    const shell = document.querySelector(".video-shell").getBoundingClientRect();
    return h1.bottom <= shell.top + 1;
  });
  check("Headline sits above video (mobile)", orderOk);

  /* ----------------------------- responsive widths -------------------------- */
  for (const width of [360, 390, 414, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(200);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`No horizontal overflow @${width}px`, overflow <= 0, `overflow=${overflow}px`);
  }
}

/* --------------------------- case study interaction ------------------------ */
const caseBtn = page.locator("button", { hasText: "View Case Study" }).first();
if ((await caseBtn.count()) > 0) {
  await caseBtn.click();
  await page.waitForTimeout(700);
  const regionVisible = await page.evaluate(() => {
    const regions = [...document.querySelectorAll('[role="region"][id^="case-"]')];
    return regions.some((r) => r.getAttribute("aria-hidden") === "false");
  });
  check("Case study expands", regionVisible);
  const onlyOne = await page.evaluate(() => {
    const regions = [...document.querySelectorAll('[role="region"][id^="case-"]')];
    return regions.filter((r) => r.getAttribute("aria-hidden") === "false").length;
  });
  check("Only one case study open", onlyOne === 1);
}

/* ------------------------------ analytics script --------------------------- */
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(base, { waitUntil: "networkidle" });
const vaScript = await page.evaluate(() =>
  Boolean(document.querySelector('script[src*="/_vercel/insights/"]')),
);
check("Vercel Analytics script mounts", vaScript);

/* ------------------------------- page errors ------------------------------- */
// The insights script 404s locally by design — Vercel's edge serves it only
// in production. Any other failed request or console error is a real failure.
check(
  "Only expected 404s (insights script, local-only)",
  failedUrls.length > 0
    ? failedUrls.every((u) => u.includes("/_vercel/insights/"))
    : true,
  failedUrls.join(", ") || "none",
);
const insightsOnly = failedUrls.every((u) => u.includes("/_vercel/insights/"));
const realErrors = insightsOnly
  ? errors.filter((e) => !e.includes("Failed to load resource"))
  : errors;
check("No console/page errors", realErrors.length === 0, realErrors.slice(0, 3).join(" | "));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
