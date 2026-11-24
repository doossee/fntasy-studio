#!/usr/bin/env node
// Renders key images: a screen with numbered boxes over each defect listed in a *.boxes.json file.
// Usage: node render-keys.mjs <dir> [<dir> ...]
//   Every <name>.boxes.json in a dir is read:
//   { "screen": "relative/path.bad.html", "out": "name.key.jpg",
//     "viewport": { "width": 390, "height": 844 }, "fullPage": true, "dark": false,
//     "boxes": [ { "n": 1, "selector": "#total" } ] }
//   Paths in the JSON are relative to the JSON file. A selector may match several elements;
//   each gets a box with the same number.
// Chromium: the installed Playwright browser, else /opt/pw-browsers/chromium, else DESIGN_CHROMIUM.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch {
  console.error('Playwright not found: npm install playwright (or set NODE_PATH to a folder that has it).');
  process.exit(1);
}

async function launch() {
  const tries = [process.env.DESIGN_CHROMIUM, undefined, '/opt/pw-browsers/chromium'];
  let last;
  for (const executablePath of tries) {
    if (executablePath === '' ) continue;
    if (executablePath && !existsSync(executablePath)) continue;
    try { return await playwright.chromium.launch(executablePath ? { executablePath } : {}); }
    catch (e) { last = e; }
  }
  throw last;
}

const dirs = process.argv.slice(2);
if (!dirs.length) { console.error('Usage: node render-keys.mjs <dir> [<dir> ...]'); process.exit(1); }

const browser = await launch();
let count = 0;
for (const dir of dirs) {
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.boxes.json')).sort()) {
    const specPath = resolve(dir, f);
    const spec = JSON.parse(readFileSync(specPath, 'utf8'));
    const base = dirname(specPath);
    const page = await browser.newPage({
      viewport: spec.viewport || { width: 390, height: 844 },
      deviceScaleFactor: 1,
      colorScheme: spec.dark ? 'dark' : 'light',
    });
    await page.goto(pathToFileURL(join(base, spec.screen)).href);
    await page.waitForTimeout(150);
    const missing = await page.evaluate((boxes) => {
      const miss = [];
      const layer = document.createElement('div');
      layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none';
      document.body.appendChild(layer);
      for (const b of boxes) {
        const els = document.querySelectorAll(b.selector);
        if (!els.length) { miss.push(b.selector); continue; }
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          const x = r.left + window.scrollX, y = r.top + window.scrollY;
          const box = document.createElement('div');
          box.style.cssText = `position:absolute;left:${x - 3}px;top:${y - 3}px;width:${r.width + 6}px;height:${r.height + 6}px;` +
            'border:3px solid #e00000;border-radius:4px;box-sizing:border-box';
          const tag = document.createElement('div');
          tag.textContent = String(b.n);
          tag.style.cssText = `position:absolute;left:${Math.max(0, x - 12)}px;top:${Math.max(0, y - 14)}px;` +
            'min-width:22px;height:22px;padding:0 4px;border-radius:11px;background:#e00000;color:#fff;' +
            'font:bold 13px/22px system-ui,sans-serif;text-align:center;direction:ltr';
          layer.append(box, tag);
        });
      }
      return miss;
    }, spec.boxes || []);
    if (missing.length) console.warn(`${f}: no element for ${missing.join(', ')}`);
    const out = join(base, spec.out);
    await page.screenshot({ path: out, fullPage: spec.fullPage !== false, type: 'jpeg', quality: 72 });
    await page.close();
    console.log(`ok ${out}`);
    count++;
  }
}
await browser.close();
console.log(`${count} key image(s)`);
