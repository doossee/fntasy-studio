#!/usr/bin/env node
// Post to a Telegram channel through a bot (official Bot API). Dry run by default.
//   TELEGRAM_BOT_TOKEN=… node tools/publish/telegram.mjs --chat @your_channel --text "…" [--photo a.png …] [--video reel.mp4] --send
// The bot must be an administrator of the channel with the right to post messages.
// The token is read from the environment only. Never put it in a file or a command saved to history.
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from './profile.mjs';

const USAGE = `Usage: node tools/publish/telegram.mjs --chat <@channel|chat id> [content] [--send]

  --text <text>          message text or caption (HTML: <b>, <i>, <a href="">)
  --text-file <file>     read the text from a file
  --photo <file>         one photo; repeat for an album of 2–10 (carousel)
  --video <file>         one video (a reel)
  --button "Label|URL"   inline URL button (single message only, not albums)
  --silent               no notification sound
  --send                 actually send. Without it the request is only printed.

Token: environment variable TELEGRAM_BOT_TOKEN (create the bot with @BotFather).
Limits: caption ≤ 1024 characters, text ≤ 4096, album 2–10 items, upload ≤ 50 MB.`;

function collect(argv, flag) {
  const out = [];
  argv.forEach((a, i) => { if (a === `--${flag}` && argv[i + 1]) out.push(argv[i + 1]); });
  return out;
}

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);
  if (args.help || !args.chat) { console.log(USAGE); process.exit(args.help ? 0 : 1); }
  const photos = collect(argv, 'photo');
  const text = args['text-file'] ? fs.readFileSync(args['text-file'], 'utf8').trim() : typeof args.text === 'string' ? args.text : '';
  const video = typeof args.video === 'string' ? args.video : null;
  for (const f of [...photos, ...(video ? [video] : [])]) {
    if (!fs.existsSync(f)) throw new Error(`File not found: ${f}`);
    if (fs.statSync(f).size > 50 * 1024 * 1024) throw new Error(`${f} is larger than 50 MB (Bot API upload limit).`);
  }
  if (photos.length > 10) throw new Error('An album holds at most 10 items.');
  const media = photos.length || video;
  if (!media && !text) throw new Error('Nothing to send: pass --text, --photo or --video.');
  if (media && text.length > 1024) throw new Error(`Caption is ${text.length} characters; the limit is 1024. Shorten it or send the text as a separate message.`);
  if (!media && text.length > 4096) throw new Error(`Text is ${text.length} characters; the limit is 4096.`);

  let method; const fields = { chat_id: String(args.chat) }; const files = {};
  if (args.silent) fields.disable_notification = 'true';
  if (photos.length > 1) {
    method = 'sendMediaGroup';
    fields.media = JSON.stringify(photos.map((p, i) => ({ type: 'photo', media: `attach://f${i}`, ...(i === 0 && text ? { caption: text, parse_mode: 'HTML' } : {}) })));
    photos.forEach((p, i) => { files[`f${i}`] = p; });
  } else if (photos.length === 1) { method = 'sendPhoto'; files.photo = photos[0]; }
  else if (video) { method = 'sendVideo'; files.video = video; fields.supports_streaming = 'true'; }
  else { method = 'sendMessage'; fields.text = text; fields.parse_mode = 'HTML'; }
  if (method === 'sendPhoto' || method === 'sendVideo') { if (text) { fields.caption = text; fields.parse_mode = 'HTML'; } }
  if (typeof args.button === 'string') {
    if (method === 'sendMediaGroup') throw new Error('Albums cannot carry buttons; put the link in the caption.');
    const [label, url] = args.button.split('|');
    if (!label || !/^https?:\/\//.test(url || '')) throw new Error('--button format: "Label|https://…"');
    fields.reply_markup = JSON.stringify({ inline_keyboard: [[{ text: label, url }]] });
  }

  if (!args.send) {
    console.log(`DRY RUN — nothing was sent. Add --send to post.\nmethod: ${method}`);
    console.log(JSON.stringify({ ...fields, ...Object.fromEntries(Object.entries(files).map(([k, v]) => [k, `<file ${v}>`])) }, null, 2));
    return;
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not set. Export it in your shell or use your environment\'s secret store.');
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  for (const [k, f] of Object.entries(files)) form.append(k, new Blob([fs.readFileSync(f)]), path.basename(f));
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', body: form });
  const json = await res.json().catch(() => ({}));
  if (!json.ok) throw new Error(`Telegram API: ${json.error_code || res.status} ${json.description || ''}`);
  const msgs = Array.isArray(json.result) ? json.result : [json.result];
  console.log(`sent: ${msgs.length} message(s), id ${msgs.map((m) => m.message_id).join(', ')}`);
}

main().catch((e) => { console.error('Error: ' + e.message); process.exit(1); });
