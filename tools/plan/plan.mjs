#!/usr/bin/env node
// Content plan: one YAML file is the source of truth; this tool creates a 4-week skeleton
// and renders it to a Markdown table and CSV with a UTM link per row.
//   node tools/plan/plan.mjs init --start 2026-12-01 --out plan.yaml
//   node tools/plan/plan.mjs render plan.yaml --md out/plan.md --csv out/plan.csv
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { loadProfile, parseArgs, readData, t } from './profile.mjs';

const USAGE = `Usage:
  node tools/plan/plan.mjs init [--start YYYY-MM-DD] [--weeks 4] [--out out/plan.yaml] [--profile <path>]
  node tools/plan/plan.mjs render <plan.yaml> [--md <file>] [--csv <file>] [--profile <path>]

Statuses: idea → draft → ready → published (or skipped).`;

const FORMATS = { telegram: ['post', 'carousel', 'reel'], instagram: ['carousel', 'reel', 'story'], offline: ['flyer'] };
const DAYS = { 1: [2], 2: [1, 4], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] };
const iso = (d) => d.toISOString().slice(0, 10);
const weekday = (s, lang) => new Date(`${s}T12:00:00Z`).toLocaleDateString(lang.startsWith('uz') ? 'uz' : lang, { weekday: 'short', timeZone: 'UTC' });

function init(args, profile) {
  let start;
  if (args.start) start = new Date(`${args.start}T12:00:00Z`);
  else { start = new Date(); start.setUTCHours(12, 0, 0, 0); start.setUTCDate(start.getUTCDate() + ((8 - start.getUTCDay()) % 7 || 7)); } // next Monday
  if (Number.isNaN(+start)) throw new Error('--start must be YYYY-MM-DD');
  const weeks = Number(args.weeks) || 4;
  const channels = Object.entries(profile.channels || {});
  if (!channels.length) channels.push(['telegram', { perWeek: 3 }], ['instagram', { perWeek: 3 }]);
  const rows = [];
  for (let w = 0; w < weeks; w++) {
    for (const [channel, cfg] of channels) {
      const per = Math.max(1, Math.min(7, cfg?.perWeek || 2));
      DAYS[per].forEach((offset, k) => {
        const d = new Date(start); d.setUTCDate(d.getUTCDate() + w * 7 + offset + (channel === 'instagram' && per < 6 ? 1 : 0));
        const formats = FORMATS[channel] || ['post'];
        rows.push({
          date: iso(d), channel, format: formats[(k + w) % formats.length], topic: '',
          text: Object.fromEntries(profile.languages.map((l) => [l, ''])), content: '', status: 'idea',
        });
      });
    }
  }
  rows.sort((a, b) => a.date.localeCompare(b.date) || a.channel.localeCompare(b.channel));
  const doc = `# Content plan. Edit this file; render with: node tools/plan/plan.mjs render <this file>\n# status: idea → draft → ready → published (or skipped). "content" becomes utm_content.\n` +
    YAML.stringify({ campaign: profile.utm?.campaign || '', rows }, { lineWidth: 0 });
  const out = path.resolve(typeof args.out === 'string' ? args.out : 'out/plan.yaml');
  if (fs.existsSync(out) && !args.force) throw new Error(`${out} exists; pass --force to overwrite.`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, doc);
  console.log(`plan skeleton: ${path.relative(process.cwd(), out)} — ${rows.length} rows, ${weeks} weeks from ${iso(start)}`);
}

async function render(args, profile) {
  const file = args._[1];
  if (!file) throw new Error('Pass the plan file: render <plan.yaml>');
  const plan = readData(path.resolve(file));
  const langs = plan.langs || profile.languages;
  let buildLink = null;
  try { ({ buildLink } = await import(new URL('../utm/utm.mjs', import.meta.url))); } catch { console.warn('! tools/utm not found next to tools/plan — link column left empty.'); }
  const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, '<br>');
  const rows = (plan.rows || []).map((r) => {
    let link = r.link || '';
    if (!link && buildLink && r.content && r.channel !== 'none') {
      try { link = buildLink({ source: r.source || r.channel, campaign: r.campaign || plan.campaign, content: r.content, medium: r.medium }, profile).url; } catch { /* no landing in profile */ }
    }
    return { ...r, link };
  });
  const head = ['Date', 'Day', 'Channel', 'Format', 'Topic', ...langs.map((l) => `Text (${l})`), 'Link', 'Status'];
  const md = [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`];
  let week = -1;
  const first = rows.length ? new Date(`${rows[0].date}T12:00:00Z`) : null;
  for (const r of rows) {
    const w = Math.floor((new Date(`${r.date}T12:00:00Z`) - first) / 6048e5);
    if (w !== week) { week = w; md.push(`| **Week ${w + 1}** |${head.slice(1).map(() => ' ').join('|')}|`); }
    md.push(`| ${[r.date, weekday(r.date, 'en'), r.channel, r.format, cell(t(r.topic, langs[0], langs)), ...langs.map((l) => cell(typeof r.text === 'object' && r.text ? r.text[l] ?? '' : r.text)), r.link ? `[utm](${r.link})` : '', r.status || 'idea'].join(' | ')} |`);
  }
  const counts = rows.reduce((a, r) => { a[r.status || 'idea'] = (a[r.status || 'idea'] || 0) + 1; return a; }, {});
  const summary = `${rows.length} items · ` + Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · ');
  const mdDoc = `# ${plan.title || 'Content plan'}\n\n${summary}\n\n${md.join('\n')}\n`;
  const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
  const csv = [['date', 'channel', 'format', 'topic', ...langs.map((l) => `text_${l}`), 'link', 'status'].join(','),
    ...rows.map((r) => [r.date, r.channel, r.format, t(r.topic, langs[0], langs), ...langs.map((l) => (typeof r.text === 'object' ? r.text?.[l] ?? '' : r.text)), r.link, r.status || 'idea'].map(q).join(','))].join('\n') + '\n';
  let wrote = false;
  for (const [flag, body] of [['md', mdDoc], ['csv', csv]]) {
    if (typeof args[flag] === 'string') { fs.mkdirSync(path.dirname(path.resolve(args[flag])), { recursive: true }); fs.writeFileSync(args[flag], body); console.log(`written ${args[flag]}`); wrote = true; }
  }
  if (!wrote) console.log(mdDoc);
  else console.log(summary);
}

const args = parseArgs();
const cmd = args._[0];
if (args.help || !['init', 'render'].includes(cmd)) { console.log(USAGE); process.exit(args.help ? 0 : 1); }
try {
  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : undefined);
  if (cmd === 'init') init(args, profile); else await render(args, profile);
} catch (e) { console.error('Error: ' + e.message); process.exit(1); }
