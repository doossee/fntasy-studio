// Shared helper (identical copy in every tool so each tool can be lifted out alone).
// Canonical copy: tools/cards/profile.mjs — run `npm run sync-shared` after editing.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import YAML from 'yaml';

const DEFAULTS = {
  name: 'Unnamed product',
  languages: ['en'],
  market: {},
  channels: {},
  links: {},
  utm: {},
  brand: {
    colors: {
      bg: '#FFFFFF', surface: '#F2F4F7', text: '#101828', muted: '#667085',
      accent: '#2563EB', accentText: '#FFFFFF', dark: '#101828',
    },
    fonts: { heading: { family: 'system-ui', weight: 800 }, body: { family: 'system-ui', weight: 400 }, files: [] },
  },
};

function merge(base, over) {
  if (Array.isArray(over) || over === null || typeof over !== 'object') return over === undefined ? base : over;
  const out = { ...(base && typeof base === 'object' && !Array.isArray(base) ? base : {}) };
  for (const [k, v] of Object.entries(over)) out[k] = merge(out[k], v);
  return out;
}

/** Simple CLI parser: --key value, --flag, positionals in `_`. */
export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq > 0) { args[a.slice(2, eq)] = a.slice(eq + 1); continue; }
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) args[a.slice(2)] = true;
      else { args[a.slice(2)] = next; i++; }
    } else args._.push(a);
  }
  return args;
}

export function readData(file) {
  const raw = fs.readFileSync(file, 'utf8');
  return file.endsWith('.json') ? JSON.parse(raw) : YAML.parse(raw);
}

/**
 * Profile lookup order: explicit path (--profile) → $GROWTH_PROFILE → ./profile.yaml →
 * ./profiles/example/profile.yaml → neutral built-in defaults.
 * The path may point to a profile directory or to the YAML/JSON file itself,
 * and may live anywhere on disk (for example in a private repository).
 */
export function loadProfile(explicit) {
  const candidates = [explicit, process.env.GROWTH_PROFILE, 'profile.yaml', 'profiles/example/profile.yaml']
    .filter((c) => typeof c === 'string' && c.length);
  for (const c of candidates) {
    let p = path.resolve(c);
    if (!fs.existsSync(p)) {
      if (c === explicit) throw new Error(`Profile not found: ${p}`);
      continue;
    }
    if (fs.statSync(p).isDirectory()) {
      const inner = ['profile.yaml', 'profile.yml', 'profile.json'].map((n) => path.join(p, n)).find((f) => fs.existsSync(f));
      if (!inner) throw new Error(`No profile.yaml in ${p}`);
      p = inner;
    }
    const profile = merge(DEFAULTS, readData(p) || {});
    profile._file = p;
    profile._dir = path.dirname(p);
    return profile;
  }
  const profile = merge(DEFAULTS, {});
  profile._file = null;
  profile._dir = process.cwd();
  console.warn('! No profile found, using neutral defaults. Pass --profile <path>.');
  return profile;
}

/** Text in a scenario is either a plain string or a map {lang: string}. */
export function t(value, lang, langs = []) {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'object') return String(value);
  if (value[lang] !== undefined) return String(value[lang]);
  for (const l of langs) if (value[l] !== undefined) return String(value[l]);
  const first = Object.values(value)[0];
  return first === undefined ? '' : String(first);
}

/** Asset paths: "profile:rel/path" → profile dir, otherwise relative to the scenario file. */
export function resolveAsset(ref, { scenarioDir, profileDir }) {
  if (!ref) return null;
  if (/^(https?|data|file):/.test(ref)) return ref;
  const p = ref.startsWith('profile:') ? path.resolve(profileDir, ref.slice(8)) : path.resolve(scenarioDir, ref);
  if (!fs.existsSync(p)) throw new Error(`Asset not found: ${p} (from "${ref}")`);
  return p;
}

export const fileUrl = (p) => (/^(https?|data|file):/.test(p) ? p : pathToFileURL(p).href);

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Minimal inline markup: *accent words*, newline → <br>. */
export function rich(s) {
  return esc(s).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
}

/** CSS variables and @font-face rules from the profile brand block. */
export function brandCss(profile) {
  const c = profile.brand.colors;
  const f = profile.brand.fonts;
  const faces = (f.files || []).map((ff) => {
    const src = fileUrl(path.resolve(profile._dir, ff.src));
    const fmt = /\.woff2$/.test(ff.src) ? 'woff2' : /\.woff$/.test(ff.src) ? 'woff' : /\.otf$/.test(ff.src) ? 'opentype' : 'truetype';
    return `@font-face{font-family:"${ff.family}";src:url("${src}") format("${fmt}");font-weight:${ff.weight || '400'};font-style:${ff.style || 'normal'};${ff.unicodeRange ? `unicode-range:${ff.unicodeRange};` : ''}}`;
  }).join('\n');
  const fallback = 'system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",sans-serif';
  return `${faces}
:root{--bg:${c.bg};--surface:${c.surface};--text:${c.text};--muted:${c.muted};--accent:${c.accent};--accent-text:${c.accentText};--dark:${c.dark};
--font-heading:"${f.heading.family}",${fallback};--weight-heading:${f.heading.weight || 800};
--font-body:"${f.body.family}",${fallback};--weight-body:${f.body.weight || 400};}`;
}

export function logoHtml(profile) {
  const logo = profile.brand.logo;
  if (!logo) return `<span class="logo-text">${esc(profile.product?.name || profile.name)}</span>`;
  const p = path.resolve(profile._dir, logo);
  if (p.endsWith('.svg')) return `<span class="logo">${fs.readFileSync(p, 'utf8')}</span>`;
  return `<span class="logo"><img src="${fileUrl(p)}" alt=""></span>`;
}
