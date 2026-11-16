#!/usr/bin/env node
// UTM links (and Telegram bot deep links) so that every lead arrives in the CRM with its source.
//   node tools/utm/utm.mjs --source telegram --content post_trial_0612 [--campaign open_day_dec] [--url https://…]
//   node tools/utm/utm.mjs --batch links.yaml [--csv out/utm.csv]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProfile, parseArgs, readData } from './profile.mjs';

const USAGE = `Usage:
  node tools/utm/utm.mjs --source <source> [--medium <m>] [--campaign <c>] [--content <c>] [--term <t>] [--url <base>]
  node tools/utm/utm.mjs --batch <links.yaml|json> [--csv <file>] [--md <file>]

  --profile <path>   profile with links.landing, links.telegramBot and utm defaults
  --bot              also print a Telegram bot deep link (t.me/<bot>?start=<payload>)

Batch file: { campaign?, url?, links: [ {source, medium?, content?, campaign?, term?, url?, note?} ] }`;

const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h', ә: 'a', ң: 'n', ө: 'o', ұ: 'u', ү: 'u', һ: 'h', і: 'i' };

/** lower-case latin, digits and underscores only: one spelling per value keeps CRM reports clean */
export function slug(v) {
  return String(v ?? '').toLowerCase()
    .replace(/[ʻʼ’'`]/g, '').replace(/№/g, 'no')
    .replace(/[Ѐ-ӿ]/g, (ch) => CYR[ch] ?? '')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

export function buildLink(row, profile) {
  const base = row.url || profile.links?.landing;
  if (!base) throw new Error('No base URL: pass --url or set links.landing in the profile.');
  const source = slug(row.source);
  if (!source) throw new Error('utm_source is required (--source).');
  const mediumMap = profile.utm?.medium || {};
  const medium = slug(row.medium || mediumMap[source] || (typeof profile.utm?.medium === 'string' ? profile.utm.medium : '') || 'social');
  const campaign = slug(row.campaign || profile.utm?.campaign || '');
  if (!/^https?:\/\//.test(base)) throw new Error(`Base URL must start with https:// — got "${base}".`);
  const u = new URL(base);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  if (campaign) u.searchParams.set('utm_campaign', campaign);
  if (row.content) u.searchParams.set('utm_content', slug(row.content));
  if (row.term) u.searchParams.set('utm_term', slug(row.term));
  const out = { source, medium, campaign, content: slug(row.content || ''), url: u.toString(), note: row.note || '' };
  // Telegram bots do not see UTM tags; the source travels in the /start payload (≤ 64 chars of A-Z a-z 0-9 _ -)
  if (profile.links?.telegramBot) {
    const payload = [source, campaign, out.content].filter(Boolean).join('-');
    if (payload.length > 64) { console.warn(`! bot payload "${payload}" is ${payload.length} characters; Telegram allows 64. Shorten campaign or content — no bot link written.`); return out; }
    out.bot = `${profile.links.telegramBot.replace(/\/$/, '')}?start=${payload}`;
  }
  return out;
}

function main() {
  const args = parseArgs();
  if (args.help || (!args.source && !args.batch)) { console.log(USAGE); process.exit(args.help ? 0 : 1); }
  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : undefined);
  let rows;
  if (args.batch) {
    const data = readData(path.resolve(args.batch));
    rows = (data.links || []).map((r) => ({ campaign: data.campaign, url: data.url, ...r }));
  } else rows = [{ source: args.source, medium: args.medium, campaign: args.campaign, content: args.content, term: args.term, url: args.url }];
  const links = rows.map((r) => buildLink(r, profile));
  const seen = new Set();
  for (const l of links) { if (seen.has(l.url)) console.warn(`! duplicate link: ${l.url}`); seen.add(l.url); }

  if (!args.batch) {
    console.log(links[0].url);
    if (args.bot && links[0].bot) console.log(links[0].bot);
    return;
  }
  const md = ['| source | medium | campaign | content | link | Telegram bot link | note |', '|---|---|---|---|---|---|---|',
    ...links.map((l) => `| ${l.source} | ${l.medium} | ${l.campaign} | ${l.content} | ${l.url} | ${l.bot || ''} | ${l.note} |`)].join('\n');
  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const csv = ['source,medium,campaign,content,url,bot_url,note', ...links.map((l) => [l.source, l.medium, l.campaign, l.content, l.url, l.bot || '', l.note].map(q).join(','))].join('\n');
  for (const [flag, body] of [['md', md], ['csv', csv]]) {
    if (typeof args[flag] === 'string') { fs.mkdirSync(path.dirname(path.resolve(args[flag])), { recursive: true }); fs.writeFileSync(args[flag], body + '\n'); console.log(`written ${args[flag]}`); }
  }
  if (typeof args.md !== 'string' && typeof args.csv !== 'string') console.log(md);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (e) { console.error('Error: ' + e.message); process.exit(1); }
}
