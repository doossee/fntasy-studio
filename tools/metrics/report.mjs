#!/usr/bin/env node
// Weekly report: CSV with one row per source → Markdown with reach, leads by UTM and cost per lead.
//   node tools/metrics/report.mjs week.csv [--prev last-week.csv] [--out report.md] [--currency UZS]
// CSV columns: source,posts,reach,clicks,leads,sales,spend   (source = utm_source; leads come from the CRM)
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, loadProfile } from './profile.mjs';

const USAGE = `Usage: node tools/metrics/report.mjs <week.csv> [--prev <last-week.csv>] [--out <report.md>] [--title "Week 49"] [--currency UZS]
Template: tools/metrics/week.template.csv`;

const NUM = ['posts', 'reach', 'clicks', 'leads', 'sales', 'spend'];
function splitLine(line, d) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) { if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
    else if (ch === '"') q = true;
    else if (ch === d) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur);
  return out.map((c) => c.trim());
}
// Accepts comma, semicolon or tab (spreadsheets in ru/uz locales export semicolons), quoted cells, "4 200" and "600 000".
function readCsv(file) {
  const [head, ...lines] = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
  const d = [';', '\t', ','].find((x) => head.includes(x)) || ',';
  const cols = splitLine(head, d).map((c) => c.toLowerCase());
  if (!cols.includes('source')) throw new Error(`${file}: no "source" column. Expected header: source,${NUM.join(',')}`);
  return lines.map((l, i) => {
    const v = splitLine(l, d);
    const row = Object.fromEntries(cols.map((c, k) => [c, v[k] ?? '']));
    for (const k of NUM) {
      const raw = String(row[k] ?? '').replace(/[\s  ]/g, '');
      const n = raw === '' ? 0 : Number(d === ',' ? raw : raw.replace(',', '.'));
      if (!Number.isFinite(n)) throw new Error(`${file}, row ${i + 1} (${row.source}): "${row[k]}" in column "${k}" is not a number. Write numbers without thousands separators, or quote the cell.`);
      row[k] = n;
    }
    return row;
  });
}
const fmt = (n) => (Number.isFinite(n) ? Math.round(n).toLocaleString('en-US').replace(/,/g, ' ') : '—');
const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : '—');
const delta = (now, was) => (was === undefined ? '' : was === 0 ? (now ? ' (new)' : '') : ` (${now >= was ? '+' : ''}${(((now - was) / was) * 100).toFixed(0)}%)`);

function main() {
  const args = parseArgs();
  if (args.help || !args._[0]) { console.log(USAGE); process.exit(args.help ? 0 : 1); }
  const rows = readCsv(path.resolve(args._[0]));
  const prev = typeof args.prev === 'string' ? Object.fromEntries(readCsv(path.resolve(args.prev)).map((r) => [r.source, r])) : null;
  let cur = typeof args.currency === 'string' ? args.currency : '';
  if (!cur) { try { cur = loadProfile(typeof args.profile === 'string' ? args.profile : undefined).market?.currency || ''; } catch { /* no profile */ } }
  const sum = (k, list = rows) => list.reduce((a, r) => a + r[k], 0);
  const total = { reach: sum('reach'), clicks: sum('clicks'), leads: sum('leads'), sales: sum('sales'), spend: sum('spend'), posts: sum('posts') };
  const prevTotal = prev ? Object.fromEntries(['reach', 'leads', 'spend'].map((k) => [k, sum(k, Object.values(prev))])) : {};
  const cpl = (r) => (r.leads && r.spend ? r.spend / r.leads : NaN);
  const best = [...rows].filter((r) => r.leads).sort((a, b) => b.leads - a.leads)[0];
  const paid = rows.filter((r) => r.spend && r.leads).sort((a, b) => cpl(a) - cpl(b));
  const dead = rows.filter((r) => r.spend && !r.leads);
  const paidLeads = rows.filter((r) => r.spend).reduce((a, r) => a + r.leads, 0);
  const paidSpend = total.spend;
  const lines = [
    `# ${typeof args.title === 'string' ? args.title : 'Weekly report'}`, '',
    '## Three numbers', '',
    `- **Reach:** ${fmt(total.reach)}${delta(total.reach, prevTotal.reach)}`,
    `- **Leads with UTM:** ${fmt(total.leads)}${delta(total.leads, prevTotal.leads)}`,
    `- **Cost per lead, paid sources:** ${paidLeads ? `${fmt(paidSpend / paidLeads)} ${cur}` : '—'} (spend ${fmt(total.spend)} ${cur}, ${paidLeads} leads from sources with spend)`,
    `- Blended (all spend ÷ all leads, free sources included): ${total.leads && total.spend ? `${fmt(total.spend / total.leads)} ${cur}` : '—'}`, '',
    '## By source', '',
    `| Source | Posts | Reach | Clicks | Leads | Click → lead | Sales | Spend, ${cur || 'money'} | Cost per lead |`, '|---|---|---|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.source} | ${r.posts} | ${fmt(r.reach)}${delta(r.reach, prev?.[r.source]?.reach)} | ${fmt(r.clicks)} | ${r.leads}${delta(r.leads, prev?.[r.source]?.leads)} | ${pct(r.leads, r.clicks)} | ${r.sales} | ${fmt(r.spend)} | ${fmt(cpl(r))} |`),
    `| **Total** | ${total.posts} | ${fmt(total.reach)} | ${fmt(total.clicks)} | ${total.leads} | ${pct(total.leads, total.clicks)} | ${total.sales} | ${fmt(total.spend)} | ${fmt(paidLeads ? paidSpend / paidLeads : NaN)} |`, '',
    '## What the numbers say', '',
    best ? `- Most leads: **${best.source}** — ${best.leads} of ${total.leads}.` : '- No leads with UTM this week. Check that links in posts carry UTM tags and the form saves them.',
    paid.length ? `- Cheapest paid lead: **${paid[0].source}** — ${fmt(cpl(paid[0]))} ${cur}.` : '- No paid source produced a lead.',
    ...dead.map((r) => `- **${r.source}** spent ${fmt(r.spend)} ${cur} and brought 0 leads: stop or change the creative.`),
    '', '## Decisions for next week (fill in by hand)', '',
    '- Do more of: ', '- Stop: ', '- Test: ', '',
    '_Leads are counted in the CRM by utm_source. Reach comes from each platform\'s own statistics and is not comparable across platforms._', '',
  ];
  const md = lines.join('\n');
  if (typeof args.out === 'string') { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(args.out, md); console.log(`written ${args.out}`); }
  else console.log(md);
}
try { main(); } catch (e) { console.error('Error: ' + e.message); process.exit(1); }
