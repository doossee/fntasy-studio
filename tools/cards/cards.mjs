#!/usr/bin/env node
// Posts, carousels, stories and A4 handouts: scenario (YAML/JSON) → PNG via Playwright.
//   node tools/cards/cards.mjs <scenario.yaml> [--profile <path>] [--out <dir>] [--lang <code>] [--scale 1]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { loadProfile, parseArgs, readData, t, resolveAsset, fileUrl, esc, rich, brandCss, logoHtml } from './profile.mjs';
import { launchBrowser } from './browser.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIZES = {
  portrait: [1080, 1350], square: [1080, 1080], story: [1080, 1920], handout: [1240, 1754],
};
const MIN_SCALE = 0.62;

const USAGE = `Usage: node tools/cards/cards.mjs <scenario.yaml|json> [options]

  --profile <path>   profile folder or file (default: $GROWTH_PROFILE, ./profile.yaml, profiles/example)
  --out <dir>        output folder (default: out/<scenario name>)
  --lang <code>      render one language only (default: scenario "langs" or all profile languages)
  --scale <n>        device scale factor, e.g. 0.5 for small previews (default 1)

Scenario "type": post | carousel | story | handout. See tools/cards/README.md.`;

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';

async function slideHtml(slide, ctx) {
  const { lang, langs, profile, type, index, total, scenarioDir } = ctx;
  const T = (v) => rich(t(v, lang, langs));
  const has = (k) => slide[k] !== undefined && slide[k] !== null && t(slide[k], lang, langs) !== '';
  const layout = slide.layout || (index === 0 ? 'cover' : 'text');
  const theme = slide.theme || (layout === 'cover' && type === 'carousel' ? 'dark' : layout === 'cta' ? 'accent' : 'light');
  const parts = [];
  if (has('kicker')) parts.push(`<div class="kicker">${T(slide.kicker)}</div>`);

  if (layout === 'stat') {
    parts.push(`<div class="stat"><span class="value" style="--v:${Math.min(1, 4.6 / t(slide.value, lang, langs).length).toFixed(2)}">${T(slide.value).replace(/ /g, '&nbsp;')}</span>${has('unit') ? `<span class="unit">${T(slide.unit)}</span>` : ''}</div>`);
    if (has('title')) parts.push(`<h2>${T(slide.title)}</h2>`);
  } else if (has('title')) {
    parts.push(layout === 'cover' || layout === 'cta' ? `<h1>${T(slide.title)}</h1>` : `<h2>${T(slide.title)}</h2>`);
  }
  if (has('text')) parts.push(`<p class="text${layout === 'cover' ? ' dim' : ''}">${T(slide.text)}</p>`);

  if (slide.items) {
    const items = slide.items.map((it, i) => `<li><span class="n">${i + 1}</span><span>${T(it)}</span></li>`).join('');
    parts.push(`<ul class="list">${items}</ul>`);
  }

  let qr = '';
  const qrUrl = slide.qr === true ? t(slide.link, lang, langs) : slide.qr ? t(slide.qr, lang, langs) : '';
  if (qrUrl) {
    const svg = await QRCode.toString(qrUrl, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });
    qr = `<div class="qr">${svg}</div>`;
  }
  if (has('button') || has('link') || qr) {
    const linkText = has('linkLabel') ? T(slide.linkLabel) : has('link') ? esc(t(slide.link, lang, langs).replace(/^https?:\/\//, '').replace(/\?.*$/, '')) : '';
    parts.push(`<div class="cta-row"><div class="cta-col">${has('button') ? `<div class="button">${T(slide.button)} ${arrow.replace('<svg', '<svg width="44" height="44"')}</div>` : ''}${linkText ? `<div class="link">${linkText}</div>` : ''}</div>${qr}</div>`);
  }
  if (has('contacts')) parts.push(`<div class="contacts">${T(slide.contacts)}</div>`);

  let shot = '';
  if (slide.image) {
    const img = resolveAsset(t(slide.image, lang, langs), { scenarioDir, profileDir: profile._dir });
    shot = `<div class="shot"><img src="${fileUrl(img)}" alt=""></div>`;
  }

  const counter = type === 'carousel' ? `<span class="counter">${index + 1}/${total}</span>` : '';
  const swipe = type === 'carousel' && index < total - 1 && index === 0
    ? `<span class="swipe">${T(slide.swipe || { ru: 'Листайте', 'uz-Latn': 'Suring', kk: 'Парақтаңыз', en: 'Swipe' })} ${arrow}</span>` : '<span></span>';
  const handle = esc(profile.brand.handle || '');
  const cls = ['slide', theme, `layout-${layout}`, type === 'story' ? 'story' : '', type === 'handout' ? 'handout' : ''].filter(Boolean).join(' ');
  return `<section class="${cls}">
  <div class="top"><div class="brand">${logoHtml(profile)}<span>${esc(profile.product?.name || profile.name)}</span></div>${counter}</div>
  <div class="body${shot ? ' has-shot top-aligned' : ''}${slide.align === 'top' ? ' top-aligned' : ''}">${parts.join('\n')}${shot}</div>
  ${shot ? '' : `<div class="foot"><span>${handle}</span>${swipe}</div>`}
</section>`;
}

// Shrinks text until the body fits; returns the final scale and whether it still overflows.
const FIT_FN = `(min, start) => {
  const slide = document.querySelector('.slide'); const body = document.querySelector('.body');
  let s = start; slide.style.setProperty('--s', s);
  const over = () => body.scrollHeight > body.clientHeight + 1 || body.scrollWidth > body.clientWidth + 1;
  while (over() && s > min) { s = Math.round((s - 0.03) * 100) / 100; slide.style.setProperty('--s', s); }
  const sizes = [...body.querySelectorAll('h1,h2,p,li,.kicker,.link,.button')].map((e) => parseFloat(getComputedStyle(e).fontSize));
  return { scale: s, overflow: over(), minFont: Math.min(...sizes) };
}`;

async function main() {
  const args = parseArgs();
  const file = args._[0];
  if (!file || args.help) { console.log(USAGE); process.exit(file ? 0 : 1); }
  const scenarioPath = path.resolve(file);
  const scenario = readData(scenarioPath);
  const scenarioDir = path.dirname(scenarioPath);
  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : scenario.profile && path.resolve(scenarioDir, scenario.profile));
  const type = scenario.type || 'post';
  if (!['post', 'carousel', 'story', 'handout'].includes(type)) throw new Error(`Unknown type "${type}". Use post | carousel | story | handout.`);
  const sizeKey = type === 'story' ? 'story' : type === 'handout' ? 'handout' : scenario.size || 'portrait';
  if (!SIZES[sizeKey]) throw new Error(`Unknown size "${sizeKey}". Use portrait (1080×1350) or square (1080×1080).`);
  const [w, h] = SIZES[sizeKey];
  const slides = scenario.slides || [scenario.slide || scenario];
  if (type === 'carousel' && (slides.length < 2 || slides.length > 10)) {
    console.warn(`! Carousel has ${slides.length} slides; Instagram accepts 2–10, 5–10 reads best.`);
  }
  const langs = args.lang ? [String(args.lang)] : scenario.langs || profile.languages;
  for (const l of langs) if (!profile.languages.includes(l)) console.warn(`! language "${l}" is not in the profile (${profile.languages.join(', ')}): texts without a "${l}" version fall back to another language.`);
  const name = scenario.name || path.basename(scenarioPath).replace(/\.(ya?ml|json)$/, '');
  const outRoot = path.resolve(typeof args.out === 'string' ? args.out : path.join('out', name));
  const css = fs.readFileSync(path.join(HERE, 'templates', 'card.css'), 'utf8');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cards-'));

  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: Number(args.scale) || 1 });
  const page = await context.newPage();
  const written = [];
  try {
    for (const lang of langs) {
      const dir = langs.length > 1 ? path.join(outRoot, lang) : outRoot;
      fs.mkdirSync(dir, { recursive: true });
      for (let i = 0; i < slides.length; i++) {
        const body = await slideHtml(slides[i], { lang, langs: profile.languages, profile, type, index: i, total: slides.length, scenarioDir });
        const html = `<!doctype html><html lang="${esc(lang)}"><head><meta charset="utf-8"><style>${brandCss(profile)}\n:root{--w:${w}px;--h:${h}px}\n${css}</style></head><body>${body}</body></html>`;
        const htmlFile = path.join(tmp, `${lang}-${i}.html`);
        fs.writeFileSync(htmlFile, html);
        await page.goto(fileUrl(htmlFile));
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => Promise.all([...document.images].map((im) => im.decode().catch(() => {}))));
        const fit = await page.evaluate(`(${FIT_FN})(${MIN_SCALE}, ${type === 'story' ? 1.3 : type === 'handout' ? 1.15 : 1})`);
        const base = slides.length > 1 ? String(i + 1).padStart(2, '0') : name;
        const out = path.join(dir, `${base}.png`);
        await page.screenshot({ path: out, type: 'png' });
        if (type === 'handout') await page.pdf({ path: out.replace(/\.png$/, '.pdf'), format: 'A4', scale: 793.7 / w, printBackground: true, pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
        written.push(out);
        if (fit.overflow) console.warn(`! ${lang} slide ${i + 1}: text does not fit even at ${fit.scale}× — shorten it.`);
        else if (fit.minFont < 30) console.warn(`! ${lang} slide ${i + 1}: smallest text is ${Math.round(fit.minFont)}px — hard to read on a phone, shorten it.`);
      }
    }
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  console.log(`${type}: ${written.length} file(s), ${w}×${h}`);
  for (const f of written) console.log('  ' + path.relative(process.cwd(), f));
}

main().catch((e) => { console.error('Error: ' + e.message); process.exit(1); });
