#!/usr/bin/env node
// measure.mjs — measurements of a rendered screen for the ui-rules skill.
//
// Every number this script prints is a reason to look, not a finding. A measurement becomes a
// finding only after method.md step 2: confirm it on the screen, in the task, and try to refute it.
//
// Usage:
//   node measure.mjs <url-or-file> [--width 390,1280] [--theme light,dark] [--out dir] [--wait ms]
//
// 320 px is always measured as well (reflow, WCAG 2.2 1.4.10).
// Needs Playwright (npm i playwright, or a global install). Browser: Playwright's own Chromium,
// else /opt/pw-browsers/chromium, else the path in DESIGN_CHROMIUM (which wins when set).

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// ---------- arguments ----------

function parseArgs(argv) {
  const args = { target: null, widths: [390, 1280], themes: ['light', 'dark'], out: null, wait: 800 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--width') args.widths = argv[++i].split(',').map(Number).filter(Boolean);
    else if (a === '--theme') args.themes = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--wait') args.wait = Number(argv[++i]) || 0;
    else if (a === '-h' || a === '--help') args.help = true;
    else if (!args.target) args.target = a;
  }
  return args;
}

const HELP = `Usage: node measure.mjs <url-or-file> [--width 390,1280] [--theme light,dark] [--out dir] [--wait ms]
Writes <out>/report.md, <out>/<width>-<theme>.json and <out>/<width>-<theme>.aria.yaml.
Measurements are reasons to look, not findings (see ../method.md, step 2).`;

// ---------- Playwright and browser ----------

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    // Fall back to a global install.
    try {
      const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
      const req = createRequire(path.join(root, 'noop.js'));
      return req('playwright');
    } catch {
      console.error('Playwright not found. Install it: npm i playwright (or npm i -g playwright).');
      process.exit(2);
    }
  }
}

async function launch(pw) {
  const tries = [];
  if (process.env.DESIGN_CHROMIUM) tries.push({ executablePath: process.env.DESIGN_CHROMIUM });
  tries.push({});
  if (fs.existsSync('/opt/pw-browsers/chromium')) tries.push({ executablePath: '/opt/pw-browsers/chromium' });
  let last;
  for (const opts of tries) {
    try {
      return await pw.chromium.launch({ ...opts, args: ['--no-sandbox'] });
    } catch (e) {
      last = e;
    }
  }
  console.error('Could not start Chromium. Set DESIGN_CHROMIUM=/path/to/chrome.\n' + (last && last.message));
  process.exit(2);
}

// ---------- code that runs inside the page ----------

// Collects everything except focus and CLS. Runs in the browser; must be self-contained.
function measureInPage() {
  const out = {};
  const MAX = 400; // cap per list, to keep reports readable

  // --- helpers ---
  function parseColor(s) {
    if (!s) return null;
    let m = s.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/);
    if (m) {
      let a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
      return { r: +m[1], g: +m[2], b: +m[3], a };
    }
    m = s.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
    if (m) return { r: m[1] * 255, g: m[2] * 255, b: m[3] * 255, a: m[4] === undefined ? 1 : +m[4] };
    if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
    return null; // oklch(), lab() and friends: not parsed; reported as unknown
  }
  // Paint `top` over `bottom` (bottom is opaque).
  function over(top, bottom) {
    const a = top.a;
    return { r: top.r * a + bottom.r * (1 - a), g: top.g * a + bottom.g * (1 - a), b: top.b * a + bottom.b * (1 - a), a: 1 };
  }
  function lum(c) {
    const f = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  function sel(el) {
    // A short, readable path: up to 4 levels.
    const parts = [];
    let e = el;
    while (e && e.nodeType === 1 && parts.length < 4) {
      let p = e.tagName.toLowerCase();
      if (e.id) {
        parts.unshift(p + '#' + e.id);
        break;
      }
      const cls = [...e.classList].slice(0, 2).join('.');
      if (cls) p += '.' + cls;
      const sib = e.parentElement ? [...e.parentElement.children].filter((c) => c.tagName === e.tagName) : [];
      if (sib.length > 1) p += `:nth-of-type(${sib.indexOf(e) + 1})`;
      parts.unshift(p);
      e = e.parentElement;
    }
    return parts.join(' > ');
  }
  const snippet = (t) => (t || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  function visible(el) {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return false; // also skips visually-hidden helper text
    let e = el;
    while (e && e.nodeType === 1) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
      e = e.parentElement;
    }
    return true;
  }
  // Effective background behind an element: walk up and composite translucent layers.
  // Returns { color, uncertain: [...] }; color null when an image or gradient is in the way.
  function effectiveBg(el) {
    const layers = [];
    const uncertain = [];
    let e = el;
    while (e && e.nodeType === 1) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') {
        return { color: null, uncertain: ['background is an image or gradient — measure by eye'] };
      }
      if (parseFloat(cs.opacity) < 1) uncertain.push('an ancestor has opacity < 1');
      if (cs.backdropFilter && cs.backdropFilter !== 'none') uncertain.push('backdrop-filter');
      const c = parseColor(cs.backgroundColor);
      if (c === null) uncertain.push('colour format not parsed: ' + cs.backgroundColor);
      else if (c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
      e = e.parentElement;
    }
    // Content positioned over another element (absolute/fixed) may sit on something
    // that is not its ancestor; we cannot see that from the tree.
    let bg = { r: 255, g: 255, b: 255, a: 1 }; // canvas default
    if (!layers.length || layers[layers.length - 1].a < 1) {
      uncertain.push('no opaque background found; white canvas assumed');
    }
    for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
    return { color: bg, uncertain };
  }
  function hasPositionedAncestor(el) {
    let e = el;
    while (e && e.nodeType === 1) {
      const p = getComputedStyle(e).position;
      if (p === 'absolute' || p === 'fixed') return true;
      e = e.parentElement;
    }
    return false;
  }

  // --- text elements: elements with their own visible text ---
  const textEls = new Map(); // element -> own text
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.nodeValue.trim();
    if (!t) continue;
    const el = n.parentElement;
    if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'OPTION'].includes(el.tagName)) continue;
    textEls.set(el, (textEls.get(el) || '') + ' ' + t);
  }

  // --- 1. text contrast (COLOR-1, WCAG 1.4.3) ---
  const contrast = [];
  const byEye = [];
  for (const [el, text] of textEls) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    const fg0 = parseColor(cs.color);
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    // Large text: 18 pt (24 px) or 14 pt (18.66 px) bold.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const bg = effectiveBg(el);
    if (!bg.color || !fg0) {
      if (byEye.length < MAX) byEye.push({ rule: 'COLOR-1', selector: sel(el), text: snippet(text), note: bg.uncertain.join('; ') || 'text colour not parsed' });
      continue;
    }
    const fg = fg0.a < 1 ? over(fg0, bg.color) : fg0;
    const r = ratio(fg, bg.color);
    if (r < need && contrast.length < MAX) {
      const unc = [...bg.uncertain];
      if (hasPositionedAncestor(el)) unc.push('positioned content: the real background may be a sibling');
      if (cs.textShadow && cs.textShadow !== 'none') unc.push('text-shadow present');
      contrast.push({
        rule: 'COLOR-1', wcag: '1.4.3', selector: sel(el), text: snippet(text),
        ratio: +r.toFixed(2), required: need, large, fontSize: size, fontWeight: weight,
        fg: hex(fg), bg: hex(bg.color), uncertain: unc,
      });
    }
  }
  out.textContrast = contrast;
  out.textContrastByEye = byEye;

  // --- interactive elements ---
  const INTERACTIVE = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=checkbox], [role=radio], [role=switch], [role=tab], [role=menuitem], [tabindex]:not([tabindex="-1"])';
  const inter = [...document.querySelectorAll(INTERACTIVE)].filter(visible);
  // Drop nested duplicates (a [role=button] inside a button counts once: the outer one).
  const interSet = inter.filter((el) => !inter.some((o) => o !== el && o.contains(el)));

  // --- 2. non-text contrast of fields (COLOR-1, WCAG 1.4.11) — best effort ---
  const fieldContrast = [];
  for (const el of interSet) {
    if (!el.matches('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]):not([type=image]), select, textarea')) continue;
    const cs = getComputedStyle(el);
    const outside = effectiveBg(el.parentElement);
    const fill = parseColor(cs.backgroundColor);
    const bw = Math.max(parseFloat(cs.borderTopWidth), parseFloat(cs.borderBottomWidth), parseFloat(cs.borderLeftWidth));
    const bc = parseColor(cs.borderBottomColor);
    if (!outside.color) continue;
    // The field is identified either by its border or by its fill against the surroundings.
    const fillColor = fill && fill.a > 0 ? over(fill, outside.color) : outside.color;
    const borderRatio = bw > 0 && bc && bc.a > 0 ? ratio(over(bc, outside.color), outside.color) : 0;
    const fillRatio = ratio(fillColor, outside.color);
    const best = Math.max(borderRatio, fillRatio);
    if (best < 3 && fieldContrast.length < MAX) {
      fieldContrast.push({
        rule: 'COLOR-1', wcag: '1.4.11', selector: sel(el), border: bw ? `${bw}px ${bc ? hex(over(bc, outside.color)) : '?'}` : 'none',
        borderRatio: +borderRatio.toFixed(2), fillRatio: +fillRatio.toFixed(2),
        note: 'best effort: shadows, underlines drawn with background images and pseudo-elements are not seen',
      });
    }
  }
  out.fieldContrast = fieldContrast;

  // --- 3. targets (ACT-1, WCAG 2.5.8; 44 px platform guideline) ---
  function inlineInText(el) {
    // Links inside running text are exempt from 2.5.8.
    if (el.tagName !== 'A') return false;
    const p = el.parentElement;
    if (!p) return false;
    const d = getComputedStyle(el).display;
    if (d !== 'inline') return false;
    const own = [...p.childNodes].some((c) => c.nodeType === 3 && c.nodeValue.trim().length > 0);
    return own;
  }
  // A readable name for a target: its text, else its label, aria-label or placeholder.
  function targetName(el) {
    if (el.matches('input, select, textarea')) {
      const lab = el.labels && el.labels.length ? el.labels[0].innerText : '';
      return el.getAttribute('aria-label') || lab || el.getAttribute('placeholder') || el.type || el.tagName;
    }
    return el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '';
  }
  const rects = interSet.map((el) => ({ el, r: el.getBoundingClientRect() }));
  const small = rects.filter(({ r }) => r.width < 24 || r.height < 24);
  const center = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  const distToRect = (p, r) => {
    const dx = Math.max(r.left - p.x, 0, p.x - r.right);
    const dy = Math.max(r.top - p.y, 0, p.y - r.bottom);
    return Math.hypot(dx, dy);
  };
  const targets = [];
  for (const { el, r } of rects) {
    if (r.width >= 44 && r.height >= 44) continue;
    if (inlineInText(el)) continue;
    const isSmall = r.width < 24 || r.height < 24;
    let spacingOk = true;
    const touching = [];
    if (isSmall) {
      // 2.5.8 spacing exception: a 24 px circle centred on the target must not intersect
      // another target, nor the circle of another undersized target.
      const c = center(r);
      for (const o of rects) {
        if (o.el === el || o.el.contains(el) || el.contains(o.el)) continue;
        const oSmall = o.r.width < 24 || o.r.height < 24;
        const hit = distToRect(c, o.r) < 12 || (oSmall && Math.hypot(c.x - center(o.r).x, c.y - center(o.r).y) < 24);
        if (hit) {
          spacingOk = false;
          touching.push(sel(o.el));
        }
      }
    }
    // A checkbox or radio with a <label> gets the label as extra hit area.
    const hasLabel = el.matches('input[type=checkbox], input[type=radio]') && el.labels && el.labels.length > 0;
    const item = {
      rule: 'ACT-1', selector: sel(el), text: snippet(targetName(el)),
      width: Math.round(r.width), height: Math.round(r.height),
      wcag258: isSmall ? (spacingOk ? 'passes by spacing' : 'fails: under 24 px and too close') : 'passes (24 px or more)',
      platform44: 'under 44 × 44 (Apple HIG 44 pt; Material 48 dp)',
    };
    if (touching.length) item.tooClose = touching.slice(0, 3);
    if (hasLabel) item.note = 'has a label: check that tapping the label toggles it (the label is part of the target)';
    if (targets.length < MAX) targets.push(item);
  }
  out.targets = targets;
  out.targetsCounted = rects.length;

  // --- 4. type scale (TEXT-1), body size and line length (TEXT-2) ---
  const sizes = {}, weights = {}, families = {};
  const charsBySize = {};
  for (const [el, text] of textEls) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    const s = Math.round(parseFloat(cs.fontSize) * 10) / 10;
    const len = text.trim().length;
    sizes[s] = (sizes[s] || 0) + 1;
    charsBySize[s] = (charsBySize[s] || 0) + len;
    weights[cs.fontWeight] = (weights[cs.fontWeight] || 0) + 1;
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    families[fam] = (families[fam] || 0) + 1;
  }
  const bodySize = Object.entries(charsBySize).sort((a, b) => b[1] - a[1])[0];
  out.typeScale = {
    rule: 'TEXT-1',
    sizes: Object.entries(sizes).map(([px, count]) => ({ px: +px, elements: count, chars: charsBySize[px] })).sort((a, b) => b.px - a.px),
    weights, families,
    note: 'sizes closer than 2 px read as one level; a profile may set its own limit',
  };
  out.body = { rule: 'TEXT-2', mostCommonSizePx: bodySize ? +bodySize[0] : null, note: 'the size carrying most characters; compare with 16 px web / 17 pt iOS' };

  const lines = [];
  for (const el of document.querySelectorAll('p, li, dd, blockquote, article > div, section > div')) {
    if (!visible(el)) continue;
    const text = el.innerText || '';
    if (text.length < 120) continue;
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    const lh = cs.lineHeight === 'normal' ? fs * 1.2 : parseFloat(cs.lineHeight);
    const r = el.getBoundingClientRect();
    const n = Math.max(1, Math.round(r.height / lh));
    const perLine = Math.round(text.length / n);
    const item = { rule: 'TEXT-2', selector: sel(el), charsPerLine: perLine, lines: n, fontSize: fs, lineHeightRatio: +(lh / fs).toFixed(2), align: cs.textAlign };
    if ((perLine > 80 || cs.textAlign === 'justify' || lh / fs < 1.4) && lines.length < MAX) lines.push(item);
  }
  out.lineLength = lines;

  // --- 5. truncation (TEXT-3, DATA-2) ---
  const trunc = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || !textEls.has(el) && !(el.children.length === 0 && el.innerText)) continue;
    const cs = getComputedStyle(el);
    const clipsX = ['hidden', 'clip'].includes(cs.overflowX) || cs.textOverflow === 'ellipsis';
    const clipsY = ['hidden', 'clip'].includes(cs.overflowY) || (cs.webkitLineClamp && cs.webkitLineClamp !== 'none');
    const overX = el.scrollWidth > el.clientWidth + 1;
    const overY = el.scrollHeight > el.clientHeight + 1;
    if ((clipsX && overX) || (clipsY && overY)) {
      if (trunc.length < MAX) trunc.push({ rule: 'TEXT-3', also: 'DATA-2 if it is a number', selector: sel(el), text: snippet(el.innerText), direction: clipsX && overX ? 'horizontal' : 'vertical', ellipsis: cs.textOverflow === 'ellipsis' });
    }
  }
  out.truncation = trunc;

  // --- 6. reflow: horizontal page scroll (TEXT-3, PLAT-1, WCAG 1.4.10) ---
  const de = document.documentElement;
  const sw = Math.max(de.scrollWidth, document.body.scrollWidth);
  out.reflow = { rule: 'TEXT-3', also: 'PLAT-1', wcag: '1.4.10', viewport: de.clientWidth, scrollWidth: sw, horizontalScroll: sw > de.clientWidth + 1 };
  if (out.reflow.horizontalScroll) {
    // Name the widest offenders.
    const wide = [...document.querySelectorAll('body *')]
      .filter((e) => visible(e) && e.getBoundingClientRect().right > de.clientWidth + 1)
      .filter((e) => !e.closest('table, pre, [role=grid]') || e.matches('table, pre, [role=grid]'))
      .slice(0, 8)
      .map((e) => ({ selector: sel(e), right: Math.round(e.getBoundingClientRect().right), twoD: e.matches('table, pre, canvas, [role=grid]') }));
    out.reflow.overflowing = wide;
  }

  // --- 7. form fields without a name; placeholder as the only label (STATE-3) ---
  function accName(el) {
    const lb = el.getAttribute('aria-labelledby');
    if (lb) {
      const t = lb.split(/\s+/).map((id) => document.getElementById(id)?.innerText || '').join(' ').trim();
      if (t) return t;
    }
    const al = el.getAttribute('aria-label');
    if (al && al.trim()) return al.trim();
    if (el.labels && el.labels.length) {
      const t = [...el.labels].map((l) => l.innerText).join(' ').trim();
      if (t) return t;
    }
    if (el.title && el.title.trim()) return el.title.trim();
    return '';
  }
  const fields = [];
  for (const el of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]):not([type=image]), select, textarea')) {
    if (!visible(el)) continue;
    const name = accName(el);
    const ph = el.getAttribute('placeholder');
    const visibleLabel = el.labels && [...el.labels].some((l) => visible(l) && l.innerText.trim());
    if (!name && ph) fields.push({ rule: 'STATE-3', selector: sel(el), issue: 'placeholder is the only label', placeholder: ph });
    else if (!name) fields.push({ rule: 'STATE-3', selector: sel(el), issue: 'no accessible name' });
    else if (!visibleLabel && !el.getAttribute('aria-labelledby')) fields.push({ rule: 'STATE-3', selector: sel(el), issue: 'name only from aria-label or title: no visible label', name });
  }
  out.fields = fields.slice(0, MAX);

  // --- 8. images without alt; icon-only controls without a name (EXP-7) ---
  const images = [];
  for (const img of document.querySelectorAll('img')) {
    if (!visible(img)) continue;
    if (!img.hasAttribute('alt')) images.push({ rule: 'EXP-7', selector: sel(img), issue: 'img without alt (use alt="" if decorative)', src: (img.getAttribute('src') || '').slice(0, 60) });
  }
  for (const svg of document.querySelectorAll('svg[role=img]')) {
    if (visible(svg) && !svg.getAttribute('aria-label') && !svg.querySelector('title') && !svg.getAttribute('aria-labelledby')) images.push({ rule: 'EXP-7', selector: sel(svg), issue: 'svg role=img without a name' });
  }
  const iconOnly = [];
  for (const el of interSet) {
    if (el.matches('input, select, textarea')) continue;
    const text = (el.innerText || '').trim();
    const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
    const imgAlt = [...el.querySelectorAll('img[alt]')].map((i) => i.alt).join('').trim();
    const svgName = [...el.querySelectorAll('svg title')].map((t) => t.textContent).join('').trim();
    const glyphOnly = text.length > 0 && text.length <= 2 && !/[\p{L}\p{N}]/u.test(text); // "×", "☰", "…"
    if ((!text || glyphOnly) && !aria && !imgAlt && !svgName) {
      iconOnly.push({ rule: 'EXP-7', selector: sel(el), issue: glyphOnly ? `glyph only ("${text}") and no accessible name` : 'no text and no accessible name' });
    } else if ((!text || glyphOnly) && aria) {
      iconOnly.push({ rule: 'EXP-7', selector: sel(el), issue: 'icon without visible text (named for screen readers only) — is the icon universal?', name: aria });
    }
  }
  out.images = images.slice(0, MAX);
  out.iconOnly = iconOnly.slice(0, MAX);

  // --- 8b. things that look clickable but are not reachable (STATE-1, WCAG 2.1.1, 4.1.2) ---
  // A div or span with a pointer cursor or a click handler attribute, no interactive role and no tabindex:
  // the keyboard never reaches it and a screen reader does not announce it as a control.
  const fakeControls = [];
  const nativeSel = 'a[href], button, input, select, textarea, summary, label, [tabindex], [role]';
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el) || el.matches(nativeSel) || el.closest('a[href], button, label, [role="button"]')) continue;
    const pointer = getComputedStyle(el).cursor === 'pointer' && (!el.parentElement || getComputedStyle(el.parentElement).cursor !== 'pointer');
    if (pointer || el.hasAttribute('onclick')) {
      fakeControls.push({ rule: 'STATE-1', wcag: '2.1.1, 4.1.2', selector: sel(el), text: (el.innerText || '').trim().slice(0, 40), issue: 'looks clickable but has no role and no tabindex: not reachable by keyboard, not announced as a control' });
    }
  }
  out.fakeControls = fakeControls.slice(0, MAX);

  // --- 9. spacing off a 4 px grid (LAYOUT-4) — counts only, low confidence ---
  const spacing = {};
  let spacingTotal = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    for (const p of ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'rowGap', 'columnGap']) {
      const v = parseFloat(cs[p]);
      if (!v || isNaN(v)) continue;
      spacingTotal++;
      const rv = Math.round(v * 10) / 10;
      if (Math.abs(rv % 4) > 0.05 && Math.abs((rv % 4) - 4) > 0.05) spacing[rv] = (spacing[rv] || 0) + 1;
    }
  }
  out.spacing = {
    rule: 'LAYOUT-4', grid: 4, valuesChecked: spacingTotal,
    offGrid: Object.entries(spacing).map(([px, count]) => ({ px: +px, count })).sort((a, b) => b.count - a.count).slice(0, 15),
    note: 'low confidence: auto margins, em-based values and centring produce odd numbers; the scale is a profile choice',
  };

  // --- 10. page colours, to tell whether the dark theme is real (COLOR-4) ---
  const pageBg = effectiveBg(document.body);
  out.page = { bg: pageBg.color ? hex(pageBg.color) : null, text: (() => { const c = parseColor(getComputedStyle(document.body).color); return c ? hex(c) : null; })() };

  return out;
}

// Snapshot of each focusable element's look before focus, keyed by a data attribute.
function snapshotUnfocused() {
  const SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [tabindex]:not([tabindex="-1"]), [contenteditable=true]';
  const els = [...document.querySelectorAll(SEL)];
  els.forEach((el, i) => {
    el.setAttribute('data-measure-id', String(i));
    const cs = getComputedStyle(el);
    el.__measureBefore = { outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, shadow: cs.boxShadow, border: cs.borderColor + ' ' + cs.borderWidth, bg: cs.backgroundColor, color: cs.color, deco: cs.textDecorationLine };
  });
  if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
  return els.length;
}

// Called after each Tab: describes the focused element.
function inspectFocused() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const cs = getComputedStyle(el);
  const now = { outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, shadow: cs.boxShadow, border: cs.borderColor + ' ' + cs.borderWidth, bg: cs.backgroundColor, color: cs.color, deco: cs.textDecorationLine };
  const before = el.__measureBefore;
  const changed = [];
  const outlineShown = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
  // An outline counts only if it appeared (or changed) with focus.
  if (outlineShown && (!before || now.outline !== before.outline)) changed.push('outline');
  if (before) {
    if (now.shadow !== before.shadow) changed.push('box-shadow');
    if (now.border !== before.border) changed.push('border');
    if (now.bg !== before.bg) changed.push('background');
    if (now.color !== before.color) changed.push('text colour');
    if (now.deco !== before.deco) changed.push('underline');
  }
  // Is it covered? Sample five points; ignore points outside the viewport.
  const r = el.getBoundingClientRect();
  const pts = [
    [r.left + r.width / 2, r.top + r.height / 2], [r.left + 2, r.top + 2], [r.right - 2, r.top + 2], [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2],
  ].filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
  let covered = 0;
  let by = null;
  for (const [x, y] of pts) {
    const top = document.elementFromPoint(x, y);
    if (top && top !== el && !el.contains(top) && !top.contains(el)) {
      // Covered: is the cover fixed or sticky?
      let e = top, fixed = false;
      while (e && e.nodeType === 1) {
        const p = getComputedStyle(e).position;
        if (p === 'fixed' || p === 'sticky') { fixed = true; break; }
        e = e.parentElement;
      }
      covered++;
      if (!by) by = (top.tagName.toLowerCase() + (top.id ? '#' + top.id : '') + (top.className && typeof top.className === 'string' ? '.' + top.className.split(' ')[0] : '')) + (fixed ? ' (fixed/sticky)' : '');
    }
  }
  const label = (el.innerText || el.value || el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.tagName).replace(/\s+/g, ' ').trim().slice(0, 50);
  return {
    id: el.getAttribute('data-measure-id'), tag: el.tagName.toLowerCase(), label,
    visibleChange: changed, outsideViewport: pts.length === 0,
    covered: pts.length ? (covered === pts.length ? 'entirely' : covered ? 'partly' : 'no') : 'unknown', coveredBy: by,
  };
}

// ---------- one run: one width × one theme ----------

async function runOne(browser, url, width, theme, wait) {
  const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, colorScheme: theme, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  // CLS: record layout shifts from the start of the load.
  await context.addInitScript(() => {
    window.__cls = 0;
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {}
  });
  const page = await context.newPage();
  const result = { width, theme, url };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  } catch (e) {
    result.error = 'load failed: ' + e.message;
    await context.close();
    return { result, aria: '' };
  }
  await page.waitForTimeout(wait);
  result.cls = { rule: 'PLAT-3', value: +(await page.evaluate(() => window.__cls || 0)).toFixed(3), threshold: 0.1, note: 'lab value from one load; field data decides' };

  Object.assign(result, await page.evaluate(measureInPage));

  // ARIA snapshot: what a screen reader gets.
  let aria = '';
  try {
    aria = await page.locator('body').ariaSnapshot();
  } catch (e) {
    aria = '# ariaSnapshot not available: ' + e.message;
  }

  // Focus walk (STATE-1, WCAG 2.4.7, 2.4.11).
  const focus = [];
  const focusable = await page.evaluate(snapshotUnfocused);
  const seen = new Set();
  for (let i = 0; i < Math.min(60, focusable + 2); i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(30);
    const f = await page.evaluate(inspectFocused);
    if (!f) continue;
    if (seen.has(f.id)) break; // wrapped around
    seen.add(f.id);
    focus.push(f);
  }
  result.focus = {
    rule: 'STATE-1', wcag: '2.4.7, 2.4.11', focusableElements: focusable, stopsVisited: focus.length,
    noVisibleChange: focus.filter((f) => f.visibleChange.length === 0),
    covered: focus.filter((f) => f.covered === 'entirely' || f.covered === 'partly'),
    note: 'a change in colour only may not be visible enough; check the 3:1 contrast of the indicator by eye',
  };
  await context.close();
  return { result, aria };
}

// ---------- report ----------

function mdReport(target, runs) {
  const L = [];
  L.push(`# Measurements: ${target}`);
  L.push('');
  L.push('These are measurements, not findings: reasons to look. A measurement becomes a finding only after');
  L.push('`method.md` step 2 — confirm it on the screen and in the task, and try to refute it. Each line names');
  L.push('the rule it relates to.');
  L.push('');
  const show = (arr, n, f) => {
    arr.slice(0, n).forEach((x) => L.push('- ' + f(x)));
    if (arr.length > n) L.push(`- … ${arr.length - n} more in the JSON`);
  };
  // Dark theme real? Compare page colours across themes at the same width.
  const byWidth = {};
  for (const { result: r } of runs) (byWidth[r.width] ||= {})[r.theme] = r;
  for (const r of runs.map((x) => x.result)) {
    L.push(`## ${r.width} px, ${r.theme}`);
    L.push('');
    if (r.error) {
      L.push(r.error, '');
      continue;
    }
    const other = r.theme === 'dark' && byWidth[r.width].light;
    if (other && other.page && r.page && other.page.bg === r.page.bg && other.page.text === r.page.text) {
      L.push(`- COLOR-4: the page has the same colours in light and dark (${r.page.bg} / ${r.page.text}) — no dark theme, or it does not follow the system setting.`);
    }
    L.push(`- PLAT-3: CLS ${r.cls.value} (good ≤ 0.1; one lab load).`);
    L.push(`- TEXT-3 / PLAT-1: horizontal scroll ${r.reflow.horizontalScroll ? `YES (page ${r.reflow.scrollWidth} px in a ${r.reflow.viewport} px viewport)` : 'no'}.`);
    if (r.reflow.overflowing) show(r.reflow.overflowing, 5, (o) => `  wider than the viewport: \`${o.selector}\` (right edge ${o.right} px)${o.twoD ? ' — 2D content, may be exempt' : ''}`);
    L.push('');
    L.push(`### COLOR-1 text contrast below the minimum: ${r.textContrast.length}`);
    show(r.textContrast, 12, (c) => `${c.ratio}:1 (needs ${c.required}:1${c.large ? ', large text' : ''}) ${c.fg} on ${c.bg}, ${c.fontSize}px/${c.fontWeight} — "${c.text}" \`${c.selector}\`${c.uncertain.length ? ' — uncertain: ' + c.uncertain.join('; ') : ''}`);
    if (r.textContrastByEye.length) {
      L.push(`- Measure by eye (${r.textContrastByEye.length}):`);
      show(r.textContrastByEye, 5, (c) => `  "${c.text}" \`${c.selector}\` — ${c.note}`);
    }
    L.push('');
    L.push(`### COLOR-1 field boundaries below 3:1: ${r.fieldContrast.length}`);
    show(r.fieldContrast, 8, (c) => `border ${c.border}: ${c.borderRatio}:1, fill ${c.fillRatio}:1 \`${c.selector}\``);
    L.push('');
    const fails258 = r.targets.filter((t) => t.wcag258.startsWith('fails'));
    L.push(`### ACT-1 targets: ${fails258.length} fail WCAG 2.5.8 (24 px), ${r.targets.length} under 44 × 44 (of ${r.targetsCounted})`);
    show(fails258, 10, (t) => `${t.width}×${t.height} "${t.text}" \`${t.selector}\`${t.tooClose ? ' — too close to ' + t.tooClose.join(', ') : ''}${t.note ? ' — ' + t.note : ''}`);
    const under44 = r.targets.filter((t) => !t.wcag258.startsWith('fails'));
    if (under44.length) {
      L.push(`- Under 44 × 44 but passing 2.5.8 (${under44.length}; platform guideline for touch):`);
      show(under44, 6, (t) => `  ${t.width}×${t.height} "${t.text}" \`${t.selector}\`${t.note ? ' — ' + t.note : ''}`);
    }
    L.push('');
    L.push('### TEXT-1 / TEXT-2 type');
    L.push(`- Sizes (${r.typeScale.sizes.length}): ${r.typeScale.sizes.map((s) => s.px + 'px×' + s.elements).join(', ')}`);
    L.push(`- Weights: ${Object.entries(r.typeScale.weights).map(([w, c]) => w + '×' + c).join(', ')}; families: ${Object.keys(r.typeScale.families).join(', ')}`);
    L.push(`- Body (size with most characters): ${r.body.mostCommonSizePx} px`);
    if (r.lineLength.length) show(r.lineLength, 5, (l) => `paragraph ~${l.charsPerLine} chars/line, line height ${l.lineHeightRatio}, align ${l.align} \`${l.selector}\``);
    L.push('');
    L.push(`### TEXT-3 / DATA-2 truncated text: ${r.truncation.length}`);
    show(r.truncation, 10, (t) => `${t.direction}${t.ellipsis ? ' (ellipsis)' : ''}: "${t.text}" \`${t.selector}\``);
    L.push('');
    L.push(`### STATE-3 fields: ${r.fields.length}`);
    show(r.fields, 10, (f) => `${f.issue}${f.placeholder ? ` ("${f.placeholder}")` : ''}${f.name ? ` (name "${f.name}")` : ''} \`${f.selector}\``);
    L.push('');
    L.push(`### STATE-1 focus: ${r.focus.stopsVisited} stops of ${r.focus.focusableElements} focusable; no visible change ${r.focus.noVisibleChange.length}; covered ${r.focus.covered.length}`);
    show(r.focus.noVisibleChange, 8, (f) => `no visible focus: ${f.tag} "${f.label}"`);
    show(r.focus.covered, 8, (f) => `focus ${f.covered} covered by ${f.coveredBy}: ${f.tag} "${f.label}"`);
    L.push('');
    L.push(`### STATE-1 clickable but not reachable by keyboard: ${(r.fakeControls || []).length}`);
    show(r.fakeControls || [], 8, (f) => `${f.issue}: "${f.text}" \`${f.selector}\``);
    L.push('');
    L.push(`### EXP-7 images and icons: ${r.images.length + r.iconOnly.length}`);
    show(r.images, 6, (i) => `${i.issue} \`${i.selector}\``);
    show(r.iconOnly, 8, (i) => `${i.issue}${i.name ? ` (name "${i.name}")` : ''} \`${i.selector}\``);
    L.push('');
    L.push(`### LAYOUT-4 spacing off the 4 px grid (low confidence): ${r.spacing.offGrid.reduce((a, b) => a + b.count, 0)} of ${r.spacing.valuesChecked} values`);
    if (r.spacing.offGrid.length) L.push('- ' + r.spacing.offGrid.map((s) => `${s.px}px×${s.count}`).join(', '));
    L.push('');
  }
  L.push('## Not measured');
  L.push('');
  L.push('Text over images and gradients, shadows and pseudo-elements, canvas and video, hover-only content,');
  L.push('motion, response times, the order and meaning of content, and everything about the task. See README.md.');
  return L.join('\n') + '\n';
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.target) {
    console.log(HELP);
    process.exit(args.help ? 0 : 1);
  }
  const url = /^[a-z]+:\/\//i.test(args.target) ? args.target : pathToFileURL(path.resolve(args.target)).href;
  const name = path.basename(args.target).replace(/[^\w.-]+/g, '_').replace(/\.html?$/, '') || 'page';
  const outDir = path.resolve(args.out || path.join('measure-out', name));
  fs.mkdirSync(outDir, { recursive: true });

  const widths = [...new Set([320, ...args.widths])].sort((a, b) => a - b);
  const pw = await loadPlaywright();
  const browser = await launch(pw);
  const runs = [];
  for (const w of widths) {
    for (const t of args.themes) {
      const run = await runOne(browser, url, w, t, args.wait);
      fs.writeFileSync(path.join(outDir, `${w}-${t}.json`), JSON.stringify(run.result, null, 2));
      fs.writeFileSync(path.join(outDir, `${w}-${t}.aria.yaml`), run.aria + '\n');
      runs.push(run);
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'report.md'), mdReport(args.target, runs));
  console.log(`Wrote ${path.join(outDir, 'report.md')} and ${runs.length * 2} data files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
