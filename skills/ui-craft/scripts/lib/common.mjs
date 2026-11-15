// Shared helpers of the measurement CLIs: arguments, project profile, browser, page preparation, overlay.
// This file is kept identical in ui-craft/scripts/lib and ux-clarity/scripts/lib, so each skill works when copied alone.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Numbers the skills use when the project has no profile. Every key can be overridden in design-profile.md. */
export const DEFAULT_PROFILE = {
  name: null,
  widths: [1440, 1280, 1024, 390],
  /** Rule scale for padding, margin and gap (SPACE-1). */
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  /** Values the script tolerates besides the rule scale: 1 px border compensation, 2 and 6 inside small elements, larger steps. */
  'spacing-extra': [1, 2, 6, 20, 40, 80, 96],
  /** Font sizes of regular text (TYPE-1). */
  fonts: [12, 14, 16, 18, 20, 24, 28, 30],
  /** Sizes reserved for the leading number of an overview screen (COMP-2). */
  'hero-fonts': [36, 40, 48],
  'hero-max': 2,
  /** Sizes above the regular scale are allowed only for text with digits. Set false for marketing pages with large headings. */
  'hero-numbers-only': true,
  'line-length': 90,
  'touch-target': 44,
  'min-font': 12,
  /** Width below which the viewport is treated as a phone (touch, mobile emulation). */
  'phone-below': 640,
  /** Primary (action) colour: a CSS colour or a custom property name such as "--primary". null: detect. */
  primary: null,
  /** Selector of the main content area. null: `main, [role="main"]`, then `body`. */
  main: null,
  languages: [],
  selectors: {
    badge: '[data-slot="badge"], .badge, .chip, .pill, .tag, [class*="badge" i]',
    button: 'a[data-slot="button"], a.btn, a.button, a[class*="btn" i], a[class*="button" i]',
    avatar: '[data-slot="avatar"], .avatar, [class*="avatar" i]',
    card: '[data-slot="card"], .card',
    'primary-button': null,
  },
};

const PROFILE_FILES = ['design-profile.md', '.claude/design-profile.md', 'docs/design-profile.md'];

/** Minimal YAML reader for the profile front matter: scalars, inline lists, one level of nested maps or `- item` lists. */
export function parseFrontMatter(text) {
  const match = text.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  const stripComment = (line) => {
    let quote = null;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (quote) {
        if (ch === '\\' && quote === '"') i += 1;
        else if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") quote = ch;
      // a comment starts with "#" followed by a space; "#1f5fbf" after a colon is a colour, not a comment
      else if (ch === '#' && (i === 0 || /\s/.test(line[i - 1])) && (i + 1 >= line.length || /\s/.test(line[i + 1]))) return line.slice(0, i);
    }
    return line;
  };
  const scalar = (raw) => {
    const value = raw.trim();
    if (value === '' || value === '~' || value === 'null') return null;
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1).replace(/\\(["\\])/g, '$1');
    if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
    return value;
  };
  const splitList = (inner) => {
    const items = [];
    let current = '';
    let quote = null;
    for (const ch of inner) {
      if (quote) {
        current += ch;
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
        current += ch;
      } else if (ch === ',') {
        items.push(current);
        current = '';
      } else current += ch;
    }
    if (current.trim()) items.push(current);
    return items.map(scalar);
  };
  // keys whose value is always one string: a selector such as [role="main"] must not be read as a list
  const textKeys = new Set(['name', 'primary', 'main']);
  const mapKeys = new Set(['selectors']);
  const value = (raw, asText = false) => {
    const trimmed = raw.trim();
    if (!asText && trimmed.startsWith('[') && trimmed.endsWith(']')) return splitList(trimmed.slice(1, -1));
    return scalar(trimmed);
  };
  const out = {};
  let parentKey = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = stripComment(rawLine).replace(/\s+$/, '');
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    const body = line.trim();
    if (indent === 0) {
      const pair = body.match(/^([A-Za-z0-9_-]+):(.*)$/);
      if (!pair) continue;
      parentKey = null;
      if (pair[2].trim() === '') {
        parentKey = pair[1];
        out[parentKey] = null;
      } else out[pair[1]] = value(pair[2], textKeys.has(pair[1]));
    } else if (parentKey) {
      if (body.startsWith('- ')) {
        // a map key (selectors) never turns into a list: a stray "- item" under it is skipped
        if (mapKeys.has(parentKey)) continue;
        if (!Array.isArray(out[parentKey])) out[parentKey] = [];
        out[parentKey].push(value(body.slice(2)));
      } else {
        const pair = body.match(/^([A-Za-z0-9_-]+):(.*)$/);
        if (!pair) continue;
        if (!out[parentKey] || Array.isArray(out[parentKey]) || typeof out[parentKey] !== 'object') out[parentKey] = {};
        // deeper nesting is not part of the profile format: a nested key without a value is skipped
        if (pair[2].trim() !== '') out[parentKey][pair[1]] = value(pair[2], mapKeys.has(parentKey));
      }
    }
  }
  return out;
}

/** Viewport widths: whole numbers from 240 to 7680, no repeats. Returns null when any item is not one. */
export function cleanWidths(list) {
  if (!Array.isArray(list) || !list.length) return null;
  if (list.some((item) => typeof item !== 'number' || !Number.isInteger(item) || item < 240 || item > 7680)) return null;
  return [...new Set(list)];
}

const numberList = (value, key, notes) => {
  if (!Array.isArray(value) || !value.length || value.some((item) => typeof item !== 'number' || !Number.isFinite(item) || item < 0)) {
    notes.push(`profile key "${key}" must be a list of numbers, e.g. [4, 8, 12]; the default is used`);
    return null;
  }
  return value;
};

/**
 * Loads the project profile. Order: explicit path, then design-profile.md, .claude/design-profile.md, docs/design-profile.md in cwd.
 * Without a profile the defaults are returned and `source` is "defaults".
 */
export function loadProfile({ path = null, cwd = process.cwd(), disabled = false } = {}) {
  const notes = [];
  const profile = structuredClone(DEFAULT_PROFILE);
  let file = null;
  if (!disabled) {
    if (path) {
      file = resolve(cwd, path);
      if (!existsSync(file)) throw new Error(`profile not found: ${file}`);
    } else {
      file = PROFILE_FILES.map((name) => resolve(cwd, name)).find((candidate) => existsSync(candidate)) ?? null;
    }
  }
  if (!file) {
    notes.push('no project profile (design-profile.md): default scales and thresholds are used');
    return { profile, source: 'defaults', file: null, notes };
  }
  const data = parseFrontMatter(readFileSync(file, 'utf8'));
  if (!data) {
    notes.push(`${file} has no front matter: default scales and thresholds are used`);
    return { profile, source: 'defaults', file, notes };
  }
  const overridden = [];
  for (const key of ['widths', 'spacing', 'spacing-extra', 'fonts', 'hero-fonts']) {
    if (data[key] === undefined || data[key] === null) continue;
    // an empty list is meaningful only for the optional parts of a scale
    if ((key === 'spacing-extra' || key === 'hero-fonts') && Array.isArray(data[key]) && data[key].length === 0) {
      profile[key] = [];
      overridden.push(key);
      continue;
    }
    let list = numberList(data[key], key, notes);
    if (list && key === 'widths') {
      list = cleanWidths(list);
      if (!list) notes.push('profile key "widths" must be whole numbers from 240 to 7680; the default is used');
    }
    if (list) {
      profile[key] = list;
      overridden.push(key);
    }
  }
  // a project with its own scale states its own tolerated extras; only the border compensation and 2 px stay by default
  if (overridden.includes('spacing') && !overridden.includes('spacing-extra')) profile['spacing-extra'] = [1, 2];
  for (const key of ['hero-max', 'line-length', 'touch-target', 'min-font', 'phone-below']) {
    if (data[key] === undefined || data[key] === null) continue;
    if (typeof data[key] === 'number' && data[key] >= 0) {
      profile[key] = data[key];
      overridden.push(key);
    } else notes.push(`profile key "${key}" must be a number; the default is used`);
  }
  if (typeof data['hero-numbers-only'] === 'boolean') {
    profile['hero-numbers-only'] = data['hero-numbers-only'];
    overridden.push('hero-numbers-only');
  }
  for (const key of ['name', 'primary', 'main']) {
    if (data[key] === undefined || data[key] === null) continue;
    if (typeof data[key] === 'string' && data[key].trim()) {
      profile[key] = data[key].trim();
      overridden.push(key);
    } else notes.push(`profile key "${key}" must be a text value in quotes; the default is used`);
  }
  if (data['hero-numbers-only'] !== undefined && typeof data['hero-numbers-only'] !== 'boolean') notes.push('profile key "hero-numbers-only" must be true or false; the default is used');
  if (Array.isArray(data.languages)) {
    profile.languages = data.languages.map(String);
    overridden.push('languages');
  }
  if (data.selectors && typeof data.selectors === 'object' && !Array.isArray(data.selectors)) {
    for (const key of Object.keys(data.selectors)) {
      if (!(key in profile.selectors)) notes.push(`profile key "selectors.${key}" is not used by the script`);
      else if (typeof data.selectors[key] === 'string' && data.selectors[key].trim()) {
        profile.selectors[key] = data.selectors[key].trim();
        overridden.push(`selectors.${key}`);
      } else notes.push(`profile key "selectors.${key}" must be a selector in quotes; the default is used`);
    }
  } else if (data.selectors !== undefined && data.selectors !== null) notes.push('profile key "selectors" must be a map of name: "selector"; the defaults are used');
  const known = new Set([...Object.keys(DEFAULT_PROFILE)]);
  const unknown = Object.keys(data).filter((key) => !known.has(key));
  if (unknown.length) notes.push(`profile keys not used by the script (kept for the agent): ${unknown.join(', ')}`);
  return { profile, source: 'profile', file, overridden, notes };
}

/** Command line: positional targets, `--flag value`, `--flag=value`, boolean flags. Page actions keep their order. */
export function parseArgs(argv, { booleans = [], values = [], actions = [] }) {
  const out = { targets: [], flags: {}, actions: [], errors: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '-h') {
      out.flags.help = true;
      continue;
    }
    if (!arg.startsWith('--')) {
      out.targets.push(arg);
      continue;
    }
    const eq = arg.indexOf('=');
    const name = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
    if (booleans.includes(name)) {
      const given = eq === -1 ? 'true' : arg.slice(eq + 1).toLowerCase();
      if (['true', '1', 'yes'].includes(given)) out.flags[name] = true;
      else if (['false', '0', 'no'].includes(given)) out.flags[name] = false;
      else out.errors.push(`option --${name} takes no value (or true / false)`);
      continue;
    }
    if (!values.includes(name) && !actions.includes(name)) {
      out.errors.push(`unknown option --${name}`);
      continue;
    }
    let value = eq === -1 ? argv[i + 1] : arg.slice(eq + 1);
    if (eq === -1) i += 1;
    // a value that itself starts with "--" is written as --flag=value
    if (value === undefined || (eq === -1 && value.startsWith('--'))) {
      out.errors.push(`option --${name} needs a value`);
      if (eq === -1 && value !== undefined) i -= 1;
      continue;
    }
    if (actions.includes(name)) out.actions.push({ type: name, value });
    else if (name === 'cookie') (out.flags.cookie ??= []).push(value);
    else out.flags[name] = value;
  }
  return out;
}

export const COMMON_BOOLEANS = ['help', 'strict', 'no-profile', 'ignore-https-errors', 'no-full'];
export const COMMON_VALUES = ['widths', 'profile', 'out', 'name', 'wait', 'storage-state', 'cookie', 'locale', 'timezone', 'scale', 'height', 'phone-height', 'color-scheme', 'proxy', 'timeout', 'fixed-time'];
export const COMMON_ACTIONS = ['click', 'fill', 'press', 'hover', 'scroll-to', 'wait-for', 'wait-gone', 'hide'];

export const COMMON_HELP = `
Targets
  <url>                      http(s):// or file:// address
  <file.html>                local file

Options
  --widths 1440,1280,1024,390   viewport widths (default: profile "widths")
  --profile <file>              project profile (default: design-profile.md, .claude/design-profile.md, docs/design-profile.md)
  --no-profile                  ignore any profile, use defaults
  --out <dir>                   output folder
  --name <name>[,<name>…]       screen names for files, one per target (default: from the address)
  --strict                      exit with code 1 when a stop item is found
  --no-full                     skip the full-page screenshot

Getting to the screen
  --storage-state <file>        Playwright storage state (signed-in session)
  --cookie name=value           cookie for the target host (repeatable)
  --wait-for <selector>         wait until this element is visible (repeatable, in order with the actions below)
  --wait-gone <css selector>    wait until no such element is visible (a toast, a loader)
  --wait <ms>                   extra wait after the last action
  --click <selector>            click before measuring (repeatable, in order): open a dialog, a tab, a menu
                                (actions take the first visible match of the selector)
  --fill <selector>=<text>      type into a field
  --press <key>                 press a key (e.g. Escape)
  --hover <selector>            move the pointer over an element
  --scroll-to <selector>        scroll an element into view
  --hide <css selector>         hide elements that are not part of the screen (a cookie banner, a dev-tools badge)

Browser
  --locale <tag>  --timezone <id>  --color-scheme light|dark  --scale <n>
  --height <px> (default 900)  --phone-height <px> (default 844)
  --timeout <ms> (default 30000)  --proxy <url>  --ignore-https-errors
  PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=<file>   use this Chromium instead of the one installed by Playwright
  --fixed-time <iso>            freeze the page clock (e.g. 2026-03-03T10:00:00Z) for stable demo data
`;

/** Playwright is resolved from the script folder, the current folder, or the folders in NODE_PATH. */
export function loadPlaywright(scriptUrl) {
  const attempts = [scriptUrl, pathToFileURL(join(process.cwd(), 'noop.js')).href];
  for (const from of attempts) {
    const require = createRequire(from);
    for (const name of ['playwright', '@playwright/test', 'playwright-core']) {
      try {
        const mod = require(name);
        if (mod?.chromium) return mod;
      } catch {
        // try the next location
      }
    }
  }
  throw new Error('Playwright is not installed. Run in the scripts folder: npm install && npx playwright install chromium');
}

/**
 * Chromium starts with its sandbox when the system allows it. As root or in most containers the sandbox cannot start;
 * then the browser runs without it and says so. Open only pages you trust in that case.
 */
export async function launchBrowser(playwright, flags) {
  const options = {};
  const executable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (executable) options.executablePath = executable;
  if (flags.proxy) options.proxy = { server: flags.proxy };
  const hint = executable ? `check PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH (${executable})` : 'run: npx playwright install chromium';
  const root = typeof process.getuid === 'function' && process.getuid() === 0;
  if (!root) {
    try {
      return await playwright.chromium.launch({ ...options, chromiumSandbox: true });
    } catch {
      // falls through to a launch without the sandbox
    }
  }
  try {
    const browser = await playwright.chromium.launch(options);
    console.log('  note: Chromium runs without its sandbox (root user or a container): open only pages you trust');
    return browser;
  } catch (error) {
    const first = String(error?.message ?? error).split('\n')[0];
    throw new Error(`Chromium did not start (${first}); ${hint}`);
  }
}

export const slug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'page';

/** The address without its query string and fragment: those may carry tokens and do not belong in reports. */
export function publicUrl(href) {
  try {
    const url = new URL(href);
    return url.protocol === 'file:' ? basename(url.pathname) : `${url.origin}${url.pathname}`;
  } catch {
    return 'page';
  }
}

/** A target is an address or a local file. The name is used for output files; the query string is not part of it. */
export function resolveTarget(arg, cwd = process.cwd()) {
  if (/^(https?|file):\/\//i.test(arg)) {
    const url = new URL(arg);
    const tail = url.protocol === 'file:' ? basename(url.pathname, extname(url.pathname)) : `${url.hostname}${url.pathname}`;
    return { url: url.href, name: slug(tail) };
  }
  const file = resolve(cwd, arg);
  if (!existsSync(file)) throw new Error(`not an address and not a file: ${arg}`);
  return { url: pathToFileURL(file).href, name: slug(basename(file, extname(file))) };
}

export function uniqueNames(targets) {
  const used = new Set();
  return targets.map((target) => {
    let name = target.name;
    for (let n = 2; used.has(name); n += 1) name = `${target.name}-${n}`;
    used.add(name);
    return { ...target, name };
  });
}

export function parseWidths(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  const widths = cleanWidths(
    String(value)
      .split(',')
      .map((item) => Number(item.trim())),
  );
  if (!widths) throw new Error(`--widths: expected whole numbers from 240 to 7680 like 1440,390, got "${value}"`);
  return widths;
}

/** A numeric option: the default when absent, an error when it is not a number in range. */
export function numberFlag(flags, name, fallback, { min = 0, max = Infinity, integer = false } = {}) {
  if (flags[name] === undefined) return fallback;
  const value = Number(flags[name]);
  if (!Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
    throw new Error(`--${name}: expected a${integer ? ' whole' : ''} number from ${min}${max === Infinity ? '' : ` to ${max}`}, got "${flags[name]}"`);
  }
  return value;
}

/** Checks the numeric options once, before the browser starts. */
export function checkCommonFlags(flags) {
  numberFlag(flags, 'timeout', 30000, { min: 1 });
  numberFlag(flags, 'wait', 0);
  numberFlag(flags, 'scale', 1, { min: 0.5, max: 4 });
  numberFlag(flags, 'height', 900, { min: 240, max: 10000, integer: true });
  numberFlag(flags, 'phone-height', 844, { min: 240, max: 10000, integer: true });
  if (flags['fixed-time'] && Number.isNaN(new Date(flags['fixed-time']).getTime())) throw new Error(`--fixed-time: expected an ISO date, got "${flags['fixed-time']}"`);
  if (flags['color-scheme'] && !['light', 'dark', 'no-preference'].includes(flags['color-scheme'])) throw new Error('--color-scheme: expected light or dark');
}

/** "selector=text": split at the first "=" outside brackets and quotes, so both "input[name=q]=a" and a text with "=" work. */
export function splitFill(raw) {
  let depth = 0;
  let quote = null;
  // a Playwright engine prefix (text=, role=, css=, xpath=, id=, data-testid=) is part of the selector
  const engine = raw.match(/^(text|role|css|xpath|id|data-testid|data-test-id|data-test|internal:[a-z-]+)=/);
  for (let i = engine ? engine[0].length : 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '[' || ch === '(') depth += 1;
    else if (ch === ']' || ch === ')') depth = Math.max(0, depth - 1);
    else if (ch === '=' && depth === 0 && i > 0) return { selector: raw.slice(0, i), text: raw.slice(i + 1) };
  }
  return null;
}

export async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => undefined);
  await page.evaluate(() => (document.fonts?.ready ? document.fonts.ready.then(() => undefined) : undefined)).catch(() => undefined);
  await page.waitForTimeout(300);
}

/** Opens the target at one width and brings the page to the state to measure. The context is closed if anything on the way fails. */
export async function openScreen(browser, target, width, profile, flags, actions) {
  const phone = width < profile['phone-below'];
  const timeout = numberFlag(flags, 'timeout', 30000, { min: 1 });
  const contextOptions = {
    viewport: { width, height: phone ? numberFlag(flags, 'phone-height', 844) : numberFlag(flags, 'height', 900) },
    deviceScaleFactor: numberFlag(flags, 'scale', 1),
    isMobile: phone,
    hasTouch: phone,
    ignoreHTTPSErrors: Boolean(flags['ignore-https-errors']),
  };
  if (flags.locale) contextOptions.locale = flags.locale;
  if (flags.timezone) contextOptions.timezoneId = flags.timezone;
  if (flags['color-scheme']) contextOptions.colorScheme = flags['color-scheme'];
  if (flags['storage-state']) contextOptions.storageState = resolve(process.cwd(), flags['storage-state']);
  const context = await browser.newContext(contextOptions);
  try {
    context.setDefaultTimeout(timeout);
    if (flags.cookie?.length && /^https?:/.test(target.url)) {
      const cookies = flags.cookie.map((pair) => {
        const eq = pair.indexOf('=');
        // the value is not echoed: it is a credential
        if (eq < 1) throw new Error('--cookie: expected name=value');
        return { name: pair.slice(0, eq), value: pair.slice(eq + 1), url: new URL(target.url).origin };
      });
      await context.addCookies(cookies);
    }
    const page = await context.newPage();
    if (flags['fixed-time']) {
      if (!page.clock) throw new Error('--fixed-time needs Playwright 1.45 or newer');
      await page.clock.setFixedTime(new Date(flags['fixed-time']));
    }
    await page.goto(target.url, { waitUntil: 'load', timeout });
    await settle(page);
    // the first visible match: a hidden copy of the same link (a collapsed menu) must not be picked
    const seen = (selector) => page.locator(selector).locator('visible=true').first();
    let step = 0;
    for (const action of actions) {
      step += 1;
      if (action.type === 'fill') {
        const parts = splitFill(action.value);
        if (!parts) throw new Error(`step ${step} --fill: expected selector=text`);
        try {
          await seen(parts.selector).fill(parts.text);
        } catch (error) {
          // the typed text may be a password: the message names the selector only
          const first = String(error?.message ?? error).split('\n')[0];
          throw new Error(`step ${step} --fill ${parts.selector}: ${parts.text ? first.split(parts.text).join('***') : first}`);
        }
      } else {
        try {
          if (action.type === 'click') await seen(action.value).click();
          else if (action.type === 'hover') await seen(action.value).hover();
          else if (action.type === 'scroll-to') await page.locator(action.value).first().scrollIntoViewIfNeeded();
          else if (action.type === 'press') await page.keyboard.press(action.value);
          else if (action.type === 'hide') await page.addStyleTag({ content: `${action.value} { display: none !important; }` });
          else if (action.type === 'wait-for') await seen(action.value).waitFor({ state: 'visible', timeout });
          else if (action.type === 'wait-gone') await page.waitForFunction((selector) => ![...document.querySelectorAll(selector)].some((el) => el.checkVisibility?.() ?? el.getClientRects().length > 0), action.value, { timeout });
        } catch (error) {
          throw new Error(`step ${step} --${action.type} ${action.value}: ${String(error?.message ?? error).split('\n')[0]}`);
        }
      }
      await settle(page);
    }
    const extra = numberFlag(flags, 'wait', 0);
    if (extra) await page.waitForTimeout(extra);
    // pointer to the corner: hover effects are a separate check and must not get into the frame
    if (!phone && !actions.some((action) => action.type === 'hover')) await page.mouse.move(2, 2);
    await page.waitForTimeout(200);
    return { context, page, phone };
  } catch (error) {
    await context.close().catch(() => undefined);
    throw error;
  }
}

/**
 * Selectors from the profile are checked in the page once. An invalid one would otherwise switch a check off silently:
 * it is replaced by the default and a note is added.
 */
export async function validateSelectors(page, loaded) {
  const { profile } = loaded;
  const entries = [...Object.entries(profile.selectors).map(([key, value]) => [`selectors.${key}`, value]), ['main', profile.main]].filter(([, value]) => typeof value === 'string');
  const invalid = await page.evaluate((list) => {
    const bad = [];
    for (const [key, selector] of list) {
      try {
        document.querySelector(selector);
      } catch {
        bad.push(key);
      }
    }
    return bad;
  }, entries);
  for (const key of invalid) {
    const note = `profile key "${key}" is not a valid CSS selector; the default is used`;
    if (key === 'main') profile.main = DEFAULT_PROFILE.main;
    else profile.selectors[key.slice('selectors.'.length)] = DEFAULT_PROFILE.selectors[key.slice('selectors.'.length)];
    if (!loaded.notes.includes(note)) {
      loaded.notes.push(note);
      console.log(`  note: ${note}`);
    }
  }
  return invalid;
}

/** Red frames over the page; the letter on a frame is the rule code. */
export async function drawOverlay(page, items) {
  await page.evaluate((list) => {
    document.querySelector('[data-ui-overlay]')?.remove();
    const layer = document.createElement('div');
    layer.setAttribute('data-ui-overlay', '');
    layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none';
    for (const item of list) {
      const box = document.createElement('div');
      box.style.cssText = `position:absolute;left:${item.rect.x - 1}px;top:${item.rect.y - 1}px;width:${Math.max(item.rect.w, 4) + 2}px;height:${Math.max(item.rect.h, 4) + 2}px;outline:2px solid #e11d48;outline-offset:0;background:rgba(225,29,72,.10);box-sizing:border-box`;
      const tag = document.createElement('span');
      tag.textContent = item.code;
      tag.style.cssText = 'position:absolute;left:-2px;top:-13px;font:700 10px/12px monospace;color:#fff;background:#e11d48;padding:0 3px;white-space:nowrap';
      box.appendChild(tag);
      layer.appendChild(box);
    }
    document.body.appendChild(layer);
  }, items);
}

export async function clearOverlay(page) {
  await page.evaluate(() => document.querySelector('[data-ui-overlay]')?.remove());
}

export const shot = (page, path, fullPage = false) => page.screenshot({ path, animations: 'disabled', caret: 'hide', fullPage });

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
  return dir;
}

/** Earlier output of the same folder, or null. Several runs into one --out (one per screen) add up instead of replacing each other. */
export function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/** --name: one name, or a comma list with one name per target. */
export function applyNames(targets, raw) {
  if (!raw) return uniqueNames(targets);
  const names = String(raw)
    .split(',')
    .map((item) => slug(item.trim()));
  if (names.length !== targets.length) throw new Error(`--name: ${names.length} name(s) for ${targets.length} target(s); give one name per target, separated by commas`);
  return uniqueNames(targets.map((target, i) => ({ ...target, name: names[i] })));
}

/** Merges this run into the earlier metrics of the folder; says so when the earlier run used another profile. */
export function mergeMetrics(file, stamp, metrics) {
  const earlier = readJson(file);
  if (earlier?.profile && (earlier.profile.source !== stamp.source || earlier.profile.file !== stamp.file) && Object.keys(earlier.metrics ?? {}).some((name) => !(name in metrics))) {
    console.log(`  note: ${file} already holds screens measured with another profile; each screen keeps its own "profileSource"`);
  }
  return { ...(earlier?.metrics ?? {}), ...metrics };
}

export function writeJson(file, data) {
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

/** What the script actually used, for metrics.json: a reader must see whether numbers came from a profile or from defaults. */
export function profileStamp(loaded) {
  const { profile } = loaded;
  return {
    source: loaded.source,
    file: loaded.file,
    name: profile.name,
    spacing: [...new Set([...profile.spacing, ...profile['spacing-extra']])].sort((a, b) => a - b),
    fonts: profile.fonts,
    heroFonts: profile['hero-fonts'],
    heroMax: profile['hero-max'],
    lineLength: profile['line-length'],
    touchTarget: profile['touch-target'],
    minFont: profile['min-font'],
    widths: profile.widths,
    heroNumbersOnly: profile['hero-numbers-only'],
    phoneBelow: profile['phone-below'],
    primary: profile.primary,
    main: profile.main,
    selectors: profile.selectors,
    overridden: loaded.overridden ?? [],
    notes: loaded.notes,
  };
}
