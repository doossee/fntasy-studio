// Shared helper (identical copy in tools/cards and tools/reel).
// Canonical copy: tools/cards/browser.mjs — run `npm run sync-shared` after editing.
import fs from 'node:fs';
import { chromium } from 'playwright';

/**
 * Launch headless Chromium. Order:
 * 1. $GROWTH_CHROMIUM (path to any Chrome/Chromium binary);
 * 2. the browser bundled for this Playwright version (`npx playwright install chromium`);
 * 3. well-known system locations (managed cloud images, Linux packages, macOS Chrome).
 */
export async function launchBrowser() {
  const opts = { args: ['--font-render-hinting=none', '--disable-lcd-text'] };
  if (process.env.GROWTH_CHROMIUM) return chromium.launch({ ...opts, executablePath: process.env.GROWTH_CHROMIUM });
  try {
    return await chromium.launch(opts);
  } catch (err) {
    const known = [
      '/opt/pw-browsers/chromium',
      '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ].find((p) => fs.existsSync(p));
    if (!known) {
      throw new Error(`Chromium is not installed for Playwright. Run: npx playwright install chromium\n(or set GROWTH_CHROMIUM to a Chrome binary)\n\n${err.message.split('\n')[0]}`);
    }
    return chromium.launch({ ...opts, executablePath: known });
  }
}
