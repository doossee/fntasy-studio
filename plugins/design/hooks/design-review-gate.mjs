#!/usr/bin/env node
// Optional Stop hook of the design plugin: work that changed the UI is handed over only after a design review.
//
// Off by default. Turn it on for a project with `review-gate: true` in the front matter of design-profile.md, or for a
// session with DESIGN_REVIEW_GATE=on. DESIGN_REVIEW_GATE=off turns it off even when the profile turns it on.
//
// When on, it blocks the end of a reply once if all of these hold:
//   - UI files differ from the base branch (DESIGN_REVIEW_BASE, else origin/HEAD, origin/main, origin/master, origin/dev);
//     UI files: DESIGN_REVIEW_PATHS (a regular expression over repository paths) or, by default, *.tsx *.jsx *.vue *.svelte
//     *.astro *.html *.css *.scss *.less outside tests, stories, e2e and node_modules;
//   - the work is handed over: those changes are committed and the branch has no commits beyond its upstream;
//   - this exact UI diff has not been marked as reviewed.
// A second stop in the same turn (stop_hook_active) is never blocked, so the hook cannot loop.
//
//   node design-review-gate.mjs --mark     mark the current UI diff as reviewed (after the review and the fixes)
//   node design-review-gate.mjs --status   whether a review is needed now, and which files
//
// Marks live in the repository's git directory (design-review/<fingerprint>) and are never committed. The fingerprint is
// computed from the content of the UI changes: a new UI change after a mark asks for a new review.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';

const DEFAULT_UI = /\.(?:tsx|jsx|vue|svelte|astro|html|css|scss|less)$/;
const NOT_UI = /(?:^|\/)(?:node_modules|e2e|__tests__|__mocks__|tests?)\/|\.(?:test|spec|stories)\.[a-z]+$/;

function git(root, ...args) {
  try {
    return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function repoRoot(start) {
  if (!start || !existsSync(start)) return null;
  const out = git(start, 'rev-parse', '--show-toplevel');
  return out ? out.trim() : null;
}

function mergeBase(root) {
  const candidates = [];
  if (process.env.DESIGN_REVIEW_BASE) candidates.push(process.env.DESIGN_REVIEW_BASE);
  const head = git(root, 'symbolic-ref', '--quiet', '--short', 'refs/remotes/origin/HEAD');
  if (head) candidates.push(head.trim());
  candidates.push('origin/main', 'origin/master', 'origin/dev');
  for (const base of candidates) {
    if (git(root, 'rev-parse', '--verify', '--quiet', base) === null) continue;
    const mb = git(root, 'merge-base', 'HEAD', base);
    if (mb) return mb.trim();
  }
  return null;
}

function uiPattern() {
  const custom = process.env.DESIGN_REVIEW_PATHS;
  if (!custom) return DEFAULT_UI;
  try {
    return new RegExp(custom);
  } catch {
    return DEFAULT_UI;
  }
}

function uiChanges(root) {
  const mb = mergeBase(root);
  if (!mb) return { files: [], fingerprint: null };
  const pattern = uiPattern();
  const tracked = (git(root, 'diff', '--name-only', mb) ?? '').split('\n');
  const untracked = (git(root, 'ls-files', '--others', '--exclude-standard') ?? '').split('\n');
  const isUi = (file) => file && pattern.test(file) && !NOT_UI.test(file);
  const files = [...new Set([...tracked, ...untracked].filter(isUi))].sort();
  if (files.length === 0) return { files: [], fingerprint: null };
  const hash = createHash('sha256');
  hash.update(git(root, 'diff', mb, '--', ...files) ?? '');
  const untrackedSet = new Set(untracked);
  for (const file of files) {
    if (!untrackedSet.has(file)) continue;
    const path = join(root, file);
    if (existsSync(path) && statSync(path).isFile()) hash.update(`${file}\0`).update(readFileSync(path));
  }
  return { files, fingerprint: hash.digest('hex') };
}

function delivered(root, files) {
  if ((git(root, 'status', '--porcelain', '--', ...files) ?? '').trim()) return false;
  if (git(root, 'rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}') === null) return false;
  const ahead = git(root, 'rev-list', '--count', '@{u}..HEAD');
  return ahead !== null && ahead.trim() === '0';
}

function markerDir(root) {
  let dir = (git(root, 'rev-parse', '--git-dir') ?? '.git').trim();
  if (!isAbsolute(dir)) dir = join(root, dir);
  return join(dir, 'design-review');
}

const reviewed = (root, fingerprint) => existsSync(join(markerDir(root), fingerprint));

/** On only by DESIGN_REVIEW_GATE=on or `review-gate: true` in the project profile's front matter; off wins. */
function enabled(root) {
  const env = (process.env.DESIGN_REVIEW_GATE ?? '').toLowerCase();
  if (env === 'off' || env === '0' || env === 'false') return false;
  if (env === 'on' || env === '1' || env === 'true') return true;
  for (const place of ['design-profile.md', '.claude/design-profile.md', 'docs/design-profile.md']) {
    const path = join(root, place);
    if (!existsSync(path)) continue;
    const text = readFileSync(path, 'utf8');
    const front = /^---\n([\s\S]*?)\n---/.exec(text);
    return Boolean(front && /^review-gate:\s*(?:true|yes|on)\s*$/m.test(front[1]));
  }
  return false;
}

function reason(files) {
  const shown = files.slice(0, 15).map((file) => `  - ${file}`).join('\n');
  const more = files.length > 15 ? `\n  … and ${files.length - 15} more` : '';
  return [
    `Work with a changed UI (${files.length} file(s)) is being handed over without an independent design review:`,
    `${shown}${more}`,
    '1. Run the `design-reviewer` agent (skill `design-review`): give it the branch, the diff, the user tasks and the address of a running copy or a screenshot folder; do not pass the author\'s conclusions.',
    '2. Fix findings scored 3–4 (and 2 when the fix is small); put the verdict and the findings into the work report.',
    `3. Mark the review: node "${process.argv[1]}" --mark`,
    'If the work is not being handed over yet (waiting for a background check, asking a question), just go on; the review comes before handing over. If the UI change is accidental or being reverted, revert the files; no review is needed.',
  ].join('\n');
}

function main() {
  const args = process.argv.slice(2);
  if (args[0] === '--mark' || args[0] === '--status') {
    const root = repoRoot(process.env.CLAUDE_PROJECT_DIR) ?? repoRoot(process.cwd());
    if (!root) {
      console.log('design-review-gate: not a git repository');
      return 1;
    }
    const { files, fingerprint } = uiChanges(root);
    if (files.length === 0) {
      console.log('design-review-gate: no UI changes against the base branch; no review needed');
      return 0;
    }
    if (args[0] === '--status') {
      console.log(`design-review-gate: ${reviewed(root, fingerprint) ? 'reviewed' : 'review needed'}; UI files: ${files.length}; gate ${enabled(root) ? 'on' : 'off'}`);
      console.log(files.join('\n'));
      return 0;
    }
    mkdirSync(markerDir(root), { recursive: true });
    writeFileSync(join(markerDir(root), fingerprint), `${files.join('\n')}\n`);
    console.log(`design-review-gate: review marked (${files.length} UI file(s))`);
    return 0;
  }

  let data = {};
  try {
    data = JSON.parse(readFileSync(0, 'utf8') || '{}');
  } catch {
    data = {};
  }
  if (data.stop_hook_active) return 0;
  const root = repoRoot(process.env.CLAUDE_PROJECT_DIR) ?? repoRoot(data.cwd);
  if (!root || !enabled(root)) return 0;
  const { files, fingerprint } = uiChanges(root);
  if (files.length === 0 || reviewed(root, fingerprint) || !delivered(root, files)) return 0;
  console.log(JSON.stringify({ decision: 'block', reason: reason(files) }));
  return 0;
}

try {
  process.exitCode = main();
} catch (error) {
  // the hook must never break a session: on any failure, skip
  console.error(`design-review-gate: skipped because of an error: ${error?.message ?? error}`);
  process.exitCode = 0;
}
