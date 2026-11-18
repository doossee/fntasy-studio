// Test of design-review-gate.mjs: node --test plugins/design/hooks/design-review-gate.test.mjs
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const HOOK = join(dirname(fileURLToPath(import.meta.url)), 'design-review-gate.mjs');
const sh = (cwd, ...cmd) => execFileSync(cmd[0], cmd.slice(1), { cwd, stdio: 'ignore' });
const write = (root, path, text) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
};

/** A bare origin with main (one UI file) and a working copy on branch task/x. */
function repo() {
  const origin = mkdtempSync(join(tmpdir(), 'drg-origin-'));
  sh(origin, 'git', 'init', '-q', '--bare', '-b', 'main');
  const seed = mkdtempSync(join(tmpdir(), 'drg-seed-'));
  sh(seed, 'git', 'clone', '-q', origin, '.');
  sh(seed, 'git', 'config', 'user.email', 't@t');
  sh(seed, 'git', 'config', 'user.name', 't');
  sh(seed, 'git', 'checkout', '-q', '-b', 'main');
  write(seed, 'src/a.tsx', 'export const A = 1;\n');
  sh(seed, 'git', 'add', '.');
  sh(seed, 'git', 'commit', '-q', '-m', 'base');
  sh(seed, 'git', 'push', '-q', 'origin', 'main');
  const work = mkdtempSync(join(tmpdir(), 'drg-work-'));
  sh(work, 'git', 'clone', '-q', '-b', 'main', origin, '.');
  sh(work, 'git', 'config', 'user.email', 't@t');
  sh(work, 'git', 'config', 'user.name', 't');
  sh(work, 'git', 'checkout', '-q', '-b', 'task/x');
  return work;
}

function deliver(work) {
  sh(work, 'git', 'add', '-A');
  spawnSync('git', ['commit', '-q', '-m', 'work'], { cwd: work });
  sh(work, 'git', 'push', '-q', '-u', 'origin', 'task/x');
}

function run(cwd, env = {}, payload, args = []) {
  const clean = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('DESIGN_REVIEW_')));
  const res = spawnSync(process.execPath, [HOOK, ...args], {
    cwd,
    input: JSON.stringify(payload ?? { hook_event_name: 'Stop', cwd }),
    encoding: 'utf8',
    env: { ...clean, CLAUDE_PROJECT_DIR: cwd, ...env },
  });
  return res;
}
const blocked = (res) => res.stdout.includes('"decision":"block"');
const ON = { DESIGN_REVIEW_GATE: 'on' };

test('off by default: delivered UI change does not block without the switch', () => {
  const w = repo();
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  deliver(w);
  assert.equal(blocked(run(w)), false);
});

test('profile front matter review-gate: true turns it on; DESIGN_REVIEW_GATE=off wins', () => {
  const w = repo();
  write(w, 'design-profile.md', '---\nname: X\nreview-gate: true\n---\n# X\n');
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  deliver(w);
  assert.equal(blocked(run(w)), true);
  assert.equal(blocked(run(w, { DESIGN_REVIEW_GATE: 'off' })), false);
});

test('work in progress is not blocked: uncommitted, unpushed, no upstream', () => {
  const w = repo();
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  assert.equal(blocked(run(w, ON)), false, 'uncommitted');
  sh(w, 'git', 'commit', '-qam', 'ui');
  assert.equal(blocked(run(w, ON)), false, 'no upstream');
  sh(w, 'git', 'push', '-q', '-u', 'origin', 'task/x');
  assert.equal(blocked(run(w, ON)), true, 'delivered');
  write(w, 'src/a.tsx', 'export const A = 3;\n');
  sh(w, 'git', 'commit', '-qam', 'ui2');
  assert.equal(blocked(run(w, ON)), false, 'commit not pushed');
});

test('not UI: tests, stories, e2e, server code', () => {
  const w = repo();
  write(w, 'src/a.test.tsx', 't\n');
  write(w, 'src/a.stories.tsx', 's\n');
  write(w, 'e2e/b.tsx', 'e\n');
  write(w, 'server/c.ts', 'c\n');
  deliver(w);
  assert.equal(blocked(run(w, ON)), false);
});

test('the reason names the files and the agent; a second stop in the same turn is not blocked', () => {
  const w = repo();
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  deliver(w);
  const res = run(w, ON);
  assert.match(res.stdout, /src\/a\.tsx/);
  assert.match(res.stdout, /design-reviewer/);
  assert.equal(blocked(run(w, ON, { stop_hook_active: true, cwd: w })), false);
});

test('--mark clears the gate until the UI changes again; marks stay out of the working tree', () => {
  const w = repo();
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  deliver(w);
  assert.match(run(w, ON, {}, ['--mark']).stdout, /review marked/);
  assert.equal(blocked(run(w, ON)), false);
  assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: w, encoding: 'utf8' }).includes('design-review'), false);
  write(w, 'src/a.tsx', 'export const A = 3;\n');
  deliver(w);
  assert.equal(blocked(run(w, ON)), true);
});

test('DESIGN_REVIEW_PATHS narrows what counts as UI', () => {
  const w = repo();
  write(w, 'src/a.tsx', 'export const A = 2;\n');
  deliver(w);
  assert.equal(blocked(run(w, { ...ON, DESIGN_REVIEW_PATHS: '^app/.*\\.tsx$' })), false);
  assert.equal(blocked(run(w, { ...ON, DESIGN_REVIEW_PATHS: '^src/.*\\.tsx$' })), true);
});

test('--status, not a repository, empty input', () => {
  const w = repo();
  write(w, 'src/a.css', 'a{}\n');
  deliver(w);
  assert.match(run(w, ON, {}, ['--status']).stdout, /review needed/);
  const d = mkdtempSync(join(tmpdir(), 'drg-none-'));
  assert.equal(blocked(run(d, ON)), false);
  assert.equal(run(w, ON, {}).status, 0);
});
