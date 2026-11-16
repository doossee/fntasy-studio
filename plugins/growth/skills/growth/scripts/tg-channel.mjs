#!/usr/bin/env node
// Reads the public web preview of a Telegram channel (https://t.me/s/<channel>) — no login, no API key.
// Works only for public channels that allow the preview. No dependencies, Node 18+.
//   node tg-channel.mjs <channel> [--posts 60] [--tz Asia/Tashkent] [--json] [--out file]
// Be polite: one channel at a time, a pause between pages is built in.

const BOOL = new Set(['json', 'help']);
const opts = {}; const positional = [];
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) { positional.push(a); continue; }
  const k = a.slice(2);
  if (BOOL.has(k)) opts[k] = true; else opts[k] = process.argv[++i];
}
const flag = (k, d) => (opts[k] === undefined ? d : opts[k]);
const channel = (positional[0] || '').replace(/^https?:\/\/t\.me\/(s\/)?/, '').replace(/^@/, '').replace(/[/?].*$/, '');
if (!channel || flag('help')) {
  console.log('Usage: node tg-channel.mjs <channel|@handle|t.me link> [--posts 60] [--tz Asia/Tashkent] [--json] [--out <file>]');
  process.exit(channel ? 0 : 1);
}
const WANT = Math.max(1, Math.min(400, Number(flag('posts', 60)) || 60));
const TZ = flag('tz', 'Asia/Tashkent');

const decode = (s) => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).trim();
const num = (s) => {
  if (!s) return null;
  const m = String(s).replace(/\s/g, '').match(/^([\d.]+)([KMB]?)$/i);
  return m ? Math.round(parseFloat(m[1]) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2].toUpperCase()] || 1)) : null;
};
const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2); };

async function page(before) {
  const url = `https://t.me/s/${channel}${before ? `?before=${before}` : ''}`;
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; fntasy-studio tg-channel)', 'accept-language': 'en' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return { url, html: await res.text() };
}

function parse(html) {
  const info = {};
  info.title = decode((html.match(/class="tgme_channel_info_header_title"[^>]*>([\s\S]*?)<\/div>/) || [])[1] || '');
  info.description = decode((html.match(/class="tgme_channel_info_description"[^>]*>([\s\S]*?)<\/div>/) || [])[1] || '');
  for (const m of html.matchAll(/class="counter_value">([^<]+)<\/span>\s*<span class="counter_type">([^<]+)</g)) info[m[2].trim()] = num(m[1]);
  const posts = html.split('<div class="tgme_widget_message_wrap').slice(1).map((chunk) => {
    const id = (chunk.match(/data-post="[^"/]+\/(\d+)"/) || [])[1];
    const times = [...chunk.matchAll(/<time datetime="([^"]+)"/g)];
    const textHtml = (chunk.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="tgme_widget_message_(?:footer|reactions|link_preview)|<a class="tgme_widget_message_link_preview)/) || [])[1] || '';
    const text = decode(textHtml);
    const reactions = [...chunk.matchAll(/class="tgme_reaction[^"]*"[^>]*>(?:<[^>]+>|[^<])*?<\/i>([\d.KM]+)/g)].reduce((a, m) => a + (num(m[1]) || 0), 0);
    // The web preview replaces some attachments with "not supported in your browser".
    const partial = /message_media_not_supported/.test(chunk);
    const kind = /tgme_widget_message_video_player|tgme_widget_message_roundvideo|tgme_widget_message_video_wrap/.test(chunk) ? 'video'
      : /tgme_widget_message_grouped_wrap/.test(chunk) ? 'album'
      : /tgme_widget_message_photo_wrap/.test(chunk) ? 'photo'
      : /tgme_widget_message_poll/.test(chunk) ? 'poll'
      : /tgme_widget_message_document/.test(chunk) ? 'file'
      : /tgme_widget_message_voice/.test(chunk) ? 'voice'
      : partial ? (text ? 'text + attachment not shown' : 'not shown') : 'text';
    return {
      id: id ? Number(id) : null,
      date: times.length ? times[times.length - 1][1] : null,
      views: num((chunk.match(/class="tgme_widget_message_views">([^<]+)</) || [])[1]),
      reactions: reactions || null,
      kind,
      attachmentNotShown: partial,
      forwarded: /tgme_widget_message_forwarded_from/.test(chunk),
      links: [...textHtml.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).slice(0, 5),
      hashtags: (text.match(/#[\p{L}\d_]+/gu) || []),
      text,
    };
  }).filter((p) => p.id && p.date);
  return { info, posts };
}

const first = await page();
if (!/tgme_channel_info/.test(first.html)) {
  console.error(`No public preview for "${channel}". The channel is private, does not exist, or has the preview disabled.\nOpen https://t.me/${channel} by hand and take a screenshot instead.`);
  process.exit(2);
}
let { info, posts } = parse(first.html);
while (posts.length < WANT) {
  const oldest = Math.min(...posts.map((p) => p.id));
  await new Promise((r) => setTimeout(r, 1200));
  const more = parse((await page(oldest)).html).posts.filter((p) => p.id < oldest);
  if (!more.length) break;
  posts = [...more, ...posts];
}
posts = posts.sort((a, b) => a.id - b.id).slice(-WANT);

// The newest posts are still collecting views: statistics use posts older than 24 h when there are enough of them.
const now = Date.now();
const settled = posts.filter((p) => now - Date.parse(p.date) > 864e5 && p.views !== null);
const base = settled.length >= 5 ? settled : posts.filter((p) => p.views !== null);
const days = posts.length > 1 ? (Date.parse(posts[posts.length - 1].date) - Date.parse(posts[0].date)) / 864e5 : 0;
const views = base.map((p) => p.views);
const hour = (d) => Number(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: TZ }).format(new Date(d))) % 24;
const hours = {};
for (const p of posts) hours[hour(p.date)] = (hours[hour(p.date)] || 0) + 1;
const kinds = {};
for (const p of posts) kinds[p.kind] = (kinds[p.kind] || 0) + 1;
const byKind = Object.fromEntries(Object.keys(kinds).map((k) => [k, median(base.filter((p) => p.kind === k).map((p) => p.views))]));
const tags = {};
for (const p of posts) for (const h of p.hashtags) tags[h] = (tags[h] || 0) + 1;
const stats = {
  postsAnalysed: posts.length,
  period: posts.length ? { from: posts[0].date, to: posts[posts.length - 1].date, days: Math.round(days * 10) / 10 } : null,
  postsPerDay: days >= 1 ? Math.round((posts.length / days) * 10) / 10 : null, // null: the sample spans less than a day
  attachmentsNotShown: posts.filter((p) => p.attachmentNotShown).length,
  medianViews: median(views),
  viewsToSubscribers: info.subscribers && views.length ? Math.round((median(views) / info.subscribers) * 1000) / 10 : null, // percent
  formats: kinds,
  medianViewsByFormat: byKind,
  forwardedShare: posts.length ? Math.round((posts.filter((p) => p.forwarded).length / posts.length) * 100) : null,
  busiestHours: Object.entries(hours).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([h, n]) => ({ hour: Number(h), posts: n })),
  topHashtags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag, n]) => ({ tag, n })),
  top: [...base].sort((a, b) => b.views - a.views).slice(0, 5).map((p) => ({ url: `https://t.me/${channel}/${p.id}`, views: p.views, kind: p.kind, date: p.date, text: p.text.slice(0, 140) })),
};
const result = { channel, source: first.url, fetchedAt: new Date().toISOString(), timezone: TZ, info, stats, posts };

let out;
if (flag('json')) out = JSON.stringify(result, null, 2);
else {
  const n = (x) => (x === null || x === undefined ? '—' : x.toLocaleString('en-US').replace(/,/g, ' '));
  const one = (s) => s.replace(/\s+/g, ' ').replace(/\|/g, '/');
  out = [
    `# @${channel} — ${info.title}`, '',
    `Source: ${first.url} · fetched ${result.fetchedAt.slice(0, 16).replace('T', ' ')} UTC · public preview, no login`, '',
    '| Metric | Value |', '|---|---|',
    `| Subscribers | ${n(info.subscribers)} |`,
    `| Posts analysed | ${stats.postsAnalysed} (${stats.period ? `${stats.period.from.slice(0, 10)} → ${stats.period.to.slice(0, 10)}` : '—'}) |`,
    `| Posts per day | ${n(stats.postsPerDay)} |`,
    `| Median views per post | ${n(stats.medianViews)} |`,
    `| Median views ÷ subscribers | ${stats.viewsToSubscribers === null ? '—' : `${stats.viewsToSubscribers}%`} |`,
    `| Formats | ${Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(', ')} |`,
    `| Median views by format | ${Object.entries(byKind).map(([k, v]) => `${k} ${n(v)}`).join(', ')} |`,
    stats.attachmentsNotShown ? `| Attachment not shown in the web preview | ${stats.attachmentsNotShown} of ${posts.length} posts: views and text are read; the attachment itself opens only in Telegram |` : null,
    `| Forwarded posts | ${n(stats.forwardedShare)}% |`,
    `| Busiest hours (${TZ}) | ${stats.busiestHours.map((h) => `${h.hour}:00 (${h.posts})`).join(', ')} |`,
    stats.topHashtags.length ? `| Hashtags | ${stats.topHashtags.map((h) => `${h.tag} ×${h.n}`).join(', ')} |` : null,
    '', '## Most viewed posts', '', '| Views | Format | Date | Post | Start of text |', '|---|---|---|---|---|',
    ...stats.top.map((p) => `| ${n(p.views)} | ${p.kind} | ${p.date.slice(0, 10)} | ${p.url} | ${one(p.text) || (p.attachmentNotShown ? '(not shown in the web preview — open in Telegram)' : '(no text)')} |`),
    '', `_Views on posts younger than 24 h are still growing; medians use ${base === settled ? 'older posts only' : 'all posts (too few older ones)'}._`,
  ].filter((l) => l !== null).join('\n');
}
const outFile = flag('out');
if (typeof outFile === 'string') { (await import('node:fs')).writeFileSync(outFile, out + '\n'); console.log(`written ${outFile}`); }
else console.log(out);
