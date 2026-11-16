// Regenerates product screenshots of the fictional demo site for the example profile.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchBrowser } from '../tools/cards/browser.mjs';

const site = pathToFileURL(path.resolve('profiles/example/demo-site/index.html')).href;
const browser = await launchBrowser();
for (const [lang, code] of [['ru', 'ru'], ['uz-Latn', 'uz']]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${site}?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 330));
  await page.screenshot({ path: `profiles/example/assets/screen-schedule.${code}.png` });
  await ctx.close();
}
await browser.close();
console.log('screenshots written to profiles/example/assets/');
