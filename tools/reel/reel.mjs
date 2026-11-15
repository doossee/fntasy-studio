#!/usr/bin/env node
// Vertical reel with sound: scenario (YAML/JSON) → MP4 1080×1920.
// Frames are rendered deterministically in headless Chromium (Playwright) and encoded by ffmpeg.
//   node tools/reel/reel.mjs <scenario.yaml> [--profile <path>] [--out <dir>] [--lang <code>]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadProfile, parseArgs, readData, t, resolveAsset, fileUrl, esc, rich, brandCss, logoHtml } from './profile.mjs';
import { launchBrowser } from './browser.mjs';
import { generateMusic } from './music-gen.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const W = 1080, H = 1920;
const MIN_SCALE = 0.7;
const MIN_FONT = 44; // px on a 1080 canvas ≈ 16 px on a 390 px wide phone
const PHONE_INNER = 668;

const USAGE = `Usage: node tools/reel/reel.mjs <scenario.yaml|json> [options]

  --profile <path>   profile folder or file (default: $GROWTH_PROFILE, ./profile.yaml, profiles/example)
  --out <dir>        output folder (default: out/<scenario name>)
  --lang <code>      build one language only
  --workers <n>      parallel browser pages (default: CPU count − 1, max 4)
  --keep-frames      keep the temporary folder

Needs ffmpeg and ffprobe in PATH. See tools/reel/README.md.`;

function need(bin) {
  const r = spawnSync(bin, ['-version'], { encoding: 'utf8' });
  if (r.error) throw new Error(`${bin} not found. Install ffmpeg: macOS "brew install ffmpeg", Ubuntu "sudo apt install ffmpeg".`);
}
function probeDuration(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  const d = parseFloat(r.stdout);
  if (!Number.isFinite(d)) throw new Error(`Cannot read duration of ${file}`);
  return d;
}
function run(bin, args) {
  const r = spawnSync(bin, args, { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${bin} failed:\n${(r.stderr || '').split('\n').slice(-12).join('\n')}`);
}

const DEFAULT_DUR = (s) => ({ title: 3, text: 3.5, stat: 3.2, list: 1.4 + 0.9 * (s.items?.length || 3), screenshot: 4, screen: 5, video: null, cta: 3.6 }[s.type] ?? 3);

function sceneHtml(s, i, ctx) {
  const { lang, langs, fps } = ctx;
  const T = (v) => rich(t(v, lang, langs));
  const has = (k) => s[k] !== undefined && s[k] !== null && t(s[k], lang, langs) !== '';
  const theme = s.theme || { title: 'dark', cta: 'accent' }[s.type] || 'light';
  let at = 0.12;
  const next = (step = 0.16) => { const v = at; at += step; return v.toFixed(2); };
  const parts = [];
  if (has('kicker')) parts.push(`<div class="kicker" data-at="${next()}">${T(s.kicker)}</div>`);
  if (s.type === 'stat') {
    const raw = t(s.value, lang, langs);
    const m = raw.match(/^(\D*?)(\d[\d\s.,]*)(.*)$/);
    const num = m ? Number(m[2].replace(/[\s,]/g, '')) : NaN;
    const value = m && Number.isFinite(num) && Number.isInteger(num)
      ? `<span class="value" data-count="${num}" data-prefix="${esc(m[1])}" data-suffix="${esc(m[3])}" data-locale="${lang.startsWith('en') ? 'en' : 'ru'}">${esc(raw)}</span>`
      : `<span class="value">${esc(raw)}</span>`;
    parts.push(`<div class="stat" data-at="${next(0.5)}">${value}${has('unit') ? `<span class="unit">${T(s.unit)}</span>` : ''}</div>`);
    if (has('title')) parts.push(`<h2 data-at="${next()}">${T(s.title)}</h2>`);
  } else if (has('title')) {
    const tag = s.type === 'title' || s.type === 'cta' ? 'h1' : 'h2';
    parts.push(`<${tag} data-at="${next()}">${T(s.title)}</${tag}>`);
  }
  if (has('text')) parts.push(`<p class="text" data-at="${next()}">${T(s.text)}</p>`);
  if (s.items) {
    const gap = Math.max(0.5, (s.dur - 1.6) / s.items.length);
    at += 0.2;
    parts.push(`<ul class="list">${s.items.map((it, k) => `<li data-at="${(at + k * gap).toFixed(2)}"><span class="n">${k + 1}</span><span>${T(it)}</span></li>`).join('')}</ul>`);
  }
  if (has('button')) parts.push(`<div class="button" data-at="${next(0.3)}">${T(s.button)}</div>`);
  if (has('link')) parts.push(`<div class="link" data-at="${next()}">${esc(t(s.link, lang, langs).replace(/^https?:\/\//, '').replace(/\?.*$/, ''))}</div>`);

  let media = '';
  if (s._image) media = `<div class="phone" data-at="0.2"><img data-zoom="${s.pan ?? 1}" src="${fileUrl(s._image)}" alt=""></div>`;
  if (s._frames) media = `<div class="phone" data-at="0.2"><img data-frames="${s._frames.count}" data-fps="${fps}" data-pattern="${fileUrl(s._frames.dir)}/f%d.jpg" src="${fileUrl(s._frames.dir)}/f00001.jpg" alt=""></div>`;
  return `<section class="scene ${theme} type-${s.type}${media ? ' media' : ''}" data-start="${s.start}" data-dur="${s.dur}">
  <i class="blob b1"></i><i class="blob b2"></i>
  <div class="content${media || s.align === 'top' ? ' top' : ''}">${parts.join('\n')}</div>${media}
</section>`;
}

// Capture a live page while scrolling it: one screenshot per output frame.
async function captureScreen(browser, s, dir, fps, url) {
  const [vw, vh] = s.viewport || [390, 780];
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const max = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const from = Math.min(max, s.scrollFrom || 0);
  const to = s.scrollTo === undefined || s.scrollTo === 'end' ? max : Math.min(max, Number(s.scrollTo));
  const count = Math.ceil(s.dur * fps);
  const hold = Math.min(0.8, s.dur / 5);
  for (let f = 0; f < count; f++) {
    const p = Math.max(0, Math.min(1, (f / fps - hold) / Math.max(0.1, s.dur - 2 * hold)));
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(from + (to - from) * e));
    await page.screenshot({ path: path.join(dir, `f${String(f + 1).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 88 });
  }
  await ctx.close();
  return { dir, count };
}

function extractVideoFrames(src, s, dir, fps) {
  run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(s.from || 0), '-t', String(s.dur), '-i', src,
    '-vf', `fps=${fps},scale=${PHONE_INNER * 1.2 | 0}:-2`, '-q:v', '3', path.join(dir, 'f%05d.jpg')]);
  const count = fs.readdirSync(dir).filter((f) => f.endsWith('.jpg')).length;
  if (!count) throw new Error(`No frames extracted from ${src}`);
  return { dir, count };
}

function resolveMusic(music, scenarioDir, total, tmp, seed) {
  if (music === 'none' || music === false || music?.track === 'none') return null;
  const m = typeof music === 'object' && music ? music : {};
  if (!m.file) {
    const file = path.join(tmp, 'music.wav');
    fs.writeFileSync(file, generateMusic({ seconds: total, bpm: m.bpm || 100, mood: m.mood || 'bright', seed: m.seed || seed }));
    return { file, volume: m.volume ?? 0.7, credit: 'Music: generated by tools/reel/music-gen.mjs (original synthesis, no third-party material; no licence or credit needed).' };
  }
  const file = path.resolve(scenarioDir, m.file);
  if (!fs.existsSync(file)) throw new Error(`Music file not found: ${file}`);
  const manifests = [m.manifest && path.resolve(scenarioDir, m.manifest), path.join(path.dirname(file), 'manifest.yaml'), path.join(HERE, 'music', 'manifest.yaml')].filter(Boolean);
  const mf = manifests.find((p) => fs.existsSync(p));
  const entry = mf && (readData(mf).tracks || {})[path.basename(file)];
  const missing = ['source', 'license', 'url'].filter((k) => !entry?.[k]);
  if (!entry || missing.length || entry.commercialUse !== true) {
    throw new Error(`Music "${path.basename(file)}" has no valid licence record.\n` +
      `Add it to ${mf || path.join(path.dirname(file), 'manifest.yaml')} with source, license, url and commercialUse: true (see tools/reel/music/manifest.example.yaml).\n` +
      (entry ? `Missing: ${[...missing, entry.commercialUse !== true ? 'commercialUse: true' : ''].filter(Boolean).join(', ')}\n` : '') +
      'Not sure about the licence? Do not use the track. To build without it, remove music.file (a generated track is used).');
  }
  const credit = `Music: ${entry.title || path.basename(file)}${entry.author ? ` — ${entry.author}` : ''}. Source: ${entry.source}, ${entry.url}. Licence: ${entry.license}${entry.licenseUrl ? ` (${entry.licenseUrl})` : ''}.` +
    (entry.attribution ? `\nRequired credit for the post caption: ${entry.attribution}` : '');
  return { file, volume: m.volume ?? 0.6, credit, loop: true };
}

function prepareVoice(voice, scenes, lang, langs, scenarioDir, tmp) {
  if (!voice) return [];
  const clips = [];
  scenes.forEach((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    let file = null;
    if (voice.files) {
      const p = path.resolve(scenarioDir, voice.files.replace('{lang}', lang).replace('{scene}', n));
      if (fs.existsSync(p)) file = p;
    }
    const say = t(s.say, lang, langs);
    if (!file && voice.command && say) {
      const cmd = typeof voice.command === 'object' ? voice.command[lang] : voice.command;
      if (cmd) {
        file = path.join(tmp, `voice-${lang}-${n}.wav`);
        const r = spawnSync(cmd.replaceAll('{out}', `"${file}"`).replaceAll('{lang}', lang), {
          shell: true, input: say, encoding: 'utf8', env: { ...process.env, GROWTH_TTS_LANG: lang, GROWTH_TTS_OUT: file },
        });
        if (r.status !== 0 || !fs.existsSync(file)) throw new Error(`voice.command failed for scene ${i + 1} (${lang}):\n${r.stderr || r.stdout}`);
      }
    }
    if (file) clips.push({ scene: i, file, dur: probeDuration(file) });
  });
  return clips;
}

async function buildLang({ lang, scenario, scenarioDir, profile, outDir, name, args, browser }) {
  const fps = scenario.fps || 30;
  const langs = profile.languages;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `reel-${lang}-`));
  const scenes = (scenario.scenes || []).map((s) => ({ ...s }));
  if (!scenes.length) throw new Error('Scenario has no scenes.');

  // 1. durations (voice may stretch a scene)
  for (const s of scenes) {
    if (s.type === 'video') {
      s._src = resolveAsset(t(s.src, lang, langs), { scenarioDir, profileDir: profile._dir });
      const d = probeDuration(s._src) - (s.from || 0);
      s.dur = Math.min(s.duration || d, d);
    } else s.dur = s.duration || DEFAULT_DUR(s);
  }
  const clips = prepareVoice(scenario.voice, scenes, lang, langs, scenarioDir, tmp);
  for (const c of clips) scenes[c.scene].dur = Math.max(scenes[c.scene].dur, c.dur + 0.6);
  let acc = 0;
  for (const s of scenes) { s.dur = Math.round(s.dur * fps) / fps; s.start = Math.round(acc * fps) / fps; acc += s.dur; }
  const total = acc;
  if (total < 15 || total > 60) console.warn(`! ${lang}: reel is ${total.toFixed(1)} s; 15–60 s works on Instagram, Telegram and TikTok.`);

  // 2. media
  for (const [i, s] of scenes.entries()) {
    if (s.type === 'screenshot') s._image = resolveAsset(t(s.image, lang, langs), { scenarioDir, profileDir: profile._dir });
    if (s.type === 'screen' || s.type === 'video') {
      const dir = path.join(tmp, `scene-${i + 1}`);
      fs.mkdirSync(dir);
      if (s.type === 'video') s._frames = extractVideoFrames(s._src, s, dir, fps);
      else {
        const ref = t(s.url, lang, langs);
        const [base, query = ''] = ref.split(/(?=[?#])/, 2).length > 1 ? [ref.slice(0, ref.search(/[?#]/)), ref.slice(ref.search(/[?#]/))] : [ref];
        const url = fileUrl(resolveAsset(base, { scenarioDir, profileDir: profile._dir })) + query;
        s._frames = await captureScreen(browser, s, dir, fps, url);
      }
    }
  }

  // 3. page
  const css = fs.readFileSync(path.join(HERE, 'templates', 'reel.css'), 'utf8');
  const js = fs.readFileSync(path.join(HERE, 'templates', 'reel-page.js'), 'utf8');
  const html = `<!doctype html><html lang="${esc(lang)}"><head><meta charset="utf-8"><style>${brandCss(profile)}\n${css}</style></head><body><div id="stage">
${scenes.map((s, i) => sceneHtml(s, i, { lang, langs, fps })).join('\n')}
<div class="brandbar">${logoHtml(profile)}<span>${esc(profile.product?.name || profile.name)}</span></div>
${scenario.progress === false ? '' : '<div class="progress"><i></i></div>'}
</div><script>${js}</script></body></html>`;
  const htmlFile = path.join(tmp, 'reel.html');
  fs.writeFileSync(htmlFile, html);

  const workers = Math.max(1, Math.min(4, Number(args.workers) || os.cpus().length - 1));
  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const pages = [];
  for (let k = 0; k < workers; k++) {
    const page = await context.newPage();
    await page.goto(fileUrl(htmlFile));
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => Promise.all([...document.images].map((im) => im.decode().catch(() => {}))));
    const fit = await page.evaluate((m) => window.__fit(m), MIN_SCALE);
    if (k === 0) {
      for (const f of fit) {
        if (f.overflow) console.warn(`! ${lang} scene ${f.scene}: text does not fit the safe area even at ${f.scale}× — shorten it.`);
        else if (f.minFont !== null && f.minFont < MIN_FONT) console.warn(`! ${lang} scene ${f.scene}: smallest text is ${Math.round(f.minFont)} px (< ${MIN_FONT}) — too small for a phone.`);
      }
    }
    pages.push(page);
  }

  // 4. audio inputs
  const music = resolveMusic(scenario.music, scenarioDir, total, tmp, scenario.seed || 7);
  const out = path.join(outDir, `${name}.${lang}.mp4`);
  const ff = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', 'pipe:0'];
  const filters = [];
  let audioLabel = null;
  let idx = 1;
  if (music) {
    if (music.loop) ff.push('-stream_loop', '-1');
    ff.push('-i', music.file);
    filters.push(`[${idx}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:${total},volume=${music.volume},afade=t=in:d=0.4,afade=t=out:st=${Math.max(0, total - 1.5)}:d=1.5[m]`);
    audioLabel = 'm'; idx++;
  }
  if (clips.length) {
    const labels = clips.map((c, k) => {
      ff.push('-i', c.file);
      const delay = Math.round((scenes[c.scene].start + 0.25) * 1000);
      filters.push(`[${idx + k}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=${scenario.voice.volume ?? 1},adelay=${delay}:all=1[v${k}]`);
      return `[v${k}]`;
    });
    filters.push(`${labels.join('')}amix=inputs=${clips.length}:normalize=0:dropout_transition=0,apad=whole_dur=${total}[vo]`);
    if (music) {
      filters.push('[vo]asplit=2[vo1][vo2]', '[m][vo1]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=450[md]', '[md][vo2]amix=inputs=2:normalize=0[a]');
      audioLabel = 'a';
    } else audioLabel = 'vo';
  }
  if (!audioLabel) { ff.push('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo'); filters.push(`[${idx}:a]atrim=0:${total}[a]`); audioLabel = 'a'; }
  ff.push('-filter_complex', filters.join(';'), '-map', '0:v', '-map', `[${audioLabel}]`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', String(scenario.crf || 20), '-pix_fmt', 'yuv420p', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '44100', '-t', String(total), '-movflags', '+faststart', out);

  // 5. render frames in parallel, write to ffmpeg in order
  const totalFrames = Math.round(total * fps);
  const enc = spawn('ffmpeg', ff, { stdio: ['pipe', 'inherit', 'pipe'] });
  let encErr = '';
  enc.stderr.on('data', (d) => { encErr += d; });
  const done = new Promise((res, rej) => enc.on('close', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg failed:\n${encErr.split('\n').slice(-12).join('\n')}`)))));
  const checkAt = new Map(scenes.map((s, i) => [Math.min(totalFrames - 1, Math.round((s.start + s.dur * 0.8) * fps)), i]));
  const checkFiles = [];
  const ready = new Map();
  let nextFrame = 0, nextWrite = 0;
  const flush = async () => {
    while (ready.has(nextWrite)) {
      const buf = ready.get(nextWrite); ready.delete(nextWrite);
      if (checkAt.has(nextWrite)) { const f = path.join(tmp, `check-${String(checkAt.get(nextWrite) + 1).padStart(2, '0')}.jpg`); fs.writeFileSync(f, buf); checkFiles.push(f); }
      if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once('drain', r));
      nextWrite++;
    }
  };
  const t0 = Date.now();
  await Promise.all(pages.map(async (page) => {
    while (nextFrame < totalFrames) {
      const f = nextFrame++;
      while (f - nextWrite > 48) await new Promise((r) => setTimeout(r, 15));
      await page.evaluate((tt) => window.__seek(tt), f / fps);
      ready.set(f, await page.screenshot({ type: 'jpeg', quality: 93 }));
      await flush();
    }
  }));
  await flush();
  enc.stdin.end();
  await done;
  await context.close();

  // 6. phone legibility sheet: one frame per scene scaled to 390 px wide
  const sheet = path.join(outDir, `${name}.${lang}.phone-390.jpg`);
  const inputs = checkFiles.sort().flatMap((f) => ['-i', f]);
  run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex',
    `${checkFiles.map((_, k) => `[${k}:v]scale=390:-2[s${k}]`).join(';')};${checkFiles.map((_, k) => `[s${k}]`).join('')}hstack=inputs=${checkFiles.length}`.replace(/hstack=inputs=1$/, 'null'),
    '-frames:v', '1', '-q:v', '3', sheet]);

  const credits = [music?.credit, clips.length ? `Voice: ${scenario.voice.credit || (scenario.voice.command ? 'synthesised with voice.command — record the model and its licence here' : 'own recordings')}` : null].filter(Boolean).join('\n');
  fs.writeFileSync(path.join(outDir, `${name}.${lang}.credits.txt`), `${path.basename(out)}\n${credits || 'No audio.'}\n`);
  if (!args['keep-frames']) fs.rmSync(tmp, { recursive: true, force: true });
  const mb = (fs.statSync(out).size / 1e6).toFixed(1);
  console.log(`reel ${lang}: ${path.relative(process.cwd(), out)} — ${total.toFixed(1)} s, ${totalFrames} frames, ${mb} MB, rendered in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  console.log(`  phone check (390 px): ${path.relative(process.cwd(), sheet)}`);
}

async function main() {
  const args = parseArgs();
  const file = args._[0];
  if (!file || args.help) { console.log(USAGE); process.exit(file ? 0 : 1); }
  need('ffmpeg'); need('ffprobe');
  const scenarioPath = path.resolve(file);
  const scenario = readData(scenarioPath);
  const scenarioDir = path.dirname(scenarioPath);
  const profile = loadProfile(typeof args.profile === 'string' ? args.profile : scenario.profile && path.resolve(scenarioDir, scenario.profile));
  const name = scenario.name || path.basename(scenarioPath).replace(/\.(ya?ml|json)$/, '');
  const outDir = path.resolve(typeof args.out === 'string' ? args.out : path.join('out', name));
  fs.mkdirSync(outDir, { recursive: true });
  const langs = args.lang ? [String(args.lang)] : scenario.langs || profile.languages;
  const browser = await launchBrowser();
  try {
    for (const lang of langs) await buildLang({ lang, scenario, scenarioDir, profile, outDir, name, args, browser });
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error('Error: ' + e.message); process.exit(1); });
