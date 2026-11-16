// Each tool carries its own copy of the shared helpers so it can be lifted out of the repository alone.
// Edit tools/cards/profile.mjs and tools/cards/browser.mjs, then run: npm run sync-shared
import fs from 'node:fs';
const copies = { 'profile.mjs': ['reel', 'utm', 'plan', 'publish', 'metrics'], 'browser.mjs': ['reel'] };
for (const [file, tools] of Object.entries(copies)) for (const t of tools) { fs.copyFileSync(`tools/cards/${file}`, `tools/${t}/${file}`); console.log(`tools/${t}/${file}`); }
