// Repository checks that need no browser: shared copies in sync, scenarios parse, no secrets or reserved folders, examples size.
//   npm run check
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const problems = [];
const copies = { 'profile.mjs': ['reel', 'utm', 'plan', 'publish', 'metrics'], 'browser.mjs': ['reel'] };
for (const [file, tools] of Object.entries(copies)) {
  const src = fs.readFileSync(`tools/cards/${file}`, 'utf8');
  for (const t of tools) if (fs.readFileSync(`tools/${t}/${file}`, 'utf8') !== src) problems.push(`tools/${t}/${file} differs from tools/cards/${file} — run: npm run sync-shared`);
}
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  if (['node_modules', '.git', 'out'].includes(e.name)) return [];
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});
const files = walk('.');
for (const f of files.filter((x) => /\.ya?ml$/.test(x))) { try { YAML.parse(fs.readFileSync(f, 'utf8')); } catch (e) { problems.push(`${f}: ${e.message.split('\n')[0]}`); } }
const secret = /(\b\d{8,10}:[A-Za-z0-9_-]{35}\b|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[bp]-[A-Za-z0-9-]{10,})/;
for (const f of files.filter((x) => /\.(mjs|js|md|ya?ml|json|html|css|txt|csv)$/.test(x) && !x.endsWith('package-lock.json'))) {
  if (secret.test(fs.readFileSync(f, 'utf8'))) problems.push(`${f}: looks like a secret`);
}
for (const d of ['skills/ui-craft', 'skills/ux-clarity']) if (fs.existsSync(d)) problems.push(`${d} is reserved for another task and must not exist here`);
for (const f of files.filter((x) => /\.(mp3|wav|m4a|mov|webm)$/.test(x))) problems.push(`${f}: audio/video sources do not belong in git`);
const exSize = files.filter((f) => f.startsWith('examples')).reduce((a, f) => a + fs.statSync(f).size, 0);
if (exSize > 5e6) problems.push(`examples/ is ${(exSize / 1e6).toFixed(1)} MB (limit 5 MB)`);
const uz = files.filter((f) => /\.(ya?ml|md|html)$/.test(f) && !f.includes('references') && !f.startsWith('docs') && !/README|CLAUDE/.test(f));
for (const f of uz) { const m = fs.readFileSync(f, 'utf8').match(/\b\w*[og]['’`][a-z]\w*/i); if (m && /uz|example|plan/.test(f)) problems.push(`${f}: "${m[0]}" — Uzbek oʻ/gʻ must use ʻ (U+02BB)`); }

if (problems.length) { console.error(problems.map((p) => `✗ ${p}`).join('\n')); process.exit(1); }
console.log(`ok: ${files.length} files checked, examples/ ${(exSize / 1e6).toFixed(2)} MB`);
