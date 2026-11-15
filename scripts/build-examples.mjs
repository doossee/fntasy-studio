// Builds every example at full size into out/ and writes small previews into examples/preview/.
//   npm run examples            (add --no-reel to skip the video)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const sh = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.status !== 0) { console.error(`failed: ${cmd} ${args.join(' ')}`); process.exit(1); }
};
const ff = (args) => sh('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
const S = 'examples/scenarios';
const P = 'examples/preview';
fs.rmSync(P, { recursive: true, force: true });
fs.mkdirSync(P, { recursive: true });

const cards = ['post-trial', 'post-group-size', 'carousel-first-lesson', 'story-reminder', 'handout-open-day'];
for (const name of cards) {
  sh('node', ['tools/cards/cards.mjs', `${S}/${name}.yaml`]);
  for (const lang of fs.readdirSync(`out/${name}`)) {
    const files = fs.readdirSync(`out/${name}/${lang}`).filter((f) => f.endsWith('.png')).sort().map((f) => `out/${name}/${lang}/${f}`);
    const out = `${P}/${name}.${lang}.jpg`;
    if (files.length === 1) ff(['-i', files[0], '-vf', 'scale=540:-2', '-q:v', '4', out]);
    else ff([...files.flatMap((f) => ['-i', f]), '-filter_complex', `${files.map((_, i) => `[${i}:v]scale=360:-2[s${i}]`).join(';')};${files.map((_, i) => `[s${i}]`).join('')}hstack=inputs=${files.length}`, '-q:v', '4', out]);
  }
}

if (!process.argv.includes('--no-reel')) {
  sh('node', ['tools/reel/reel.mjs', `${S}/reel-open-day.yaml`]);
  for (const lang of ['uz-Latn', 'ru']) {
    const base = `out/reel-open-day/reel-open-day.${lang}`;
    ff(['-i', `${base}.mp4`, '-vf', 'scale=540:960', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', `${P}/reel-open-day.${lang}.mp4`]);
    fs.copyFileSync(`${base}.phone-390.jpg`, `${P}/reel-open-day.${lang}.phone-390.jpg`);
    fs.copyFileSync(`${base}.credits.txt`, `${P}/reel-open-day.${lang}.credits.txt`);
  }
}

sh('node', ['tools/plan/plan.mjs', 'render', 'examples/plan/plan.yaml', '--md', 'examples/plan/plan.md', '--csv', 'examples/plan/plan.csv']);
sh('node', ['tools/utm/utm.mjs', '--batch', `${S}/utm-links.yaml`, '--md', 'examples/utm/links.md', '--csv', 'examples/utm/links.csv']);
sh('node', ['tools/metrics/report.mjs', 'examples/metrics/week-49.csv', '--title', 'Week 49 · 30 Nov – 6 Dec 2026 (invented numbers)', '--out', 'examples/metrics/week-49.md']);

const size = (dir) => fs.readdirSync(dir, { withFileTypes: true }).reduce((a, e) => a + (e.isDirectory() ? size(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size), 0);
console.log(`\nexamples/ is ${(size('examples') / 1e6).toFixed(2)} MB (keep it under 5 MB)`);
