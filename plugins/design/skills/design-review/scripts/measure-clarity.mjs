#!/usr/bin/env node
// design-review, clarity lens: measurements for any page: sideways scroll, touch targets, small text, primary buttons, cut labels.
//   node measure.mjs <url-or-file.html> [more targets] [options]
// The numbers answer checklist items D1, H1–H3, G6 and give a hint for A2 (see SKILL.md, "Screenshots and measurements").
import { join, resolve } from 'node:path';
import {
  COMMON_ACTIONS,
  COMMON_BOOLEANS,
  COMMON_HELP,
  COMMON_VALUES,
  applyNames,
  clearOverlay,
  drawOverlay,
  checkCommonFlags,
  ensureDir,
  launchBrowser,
  loadPlaywright,
  loadProfile,
  openScreen,
  parseArgs,
  mergeMetrics,
  parseWidths,
  profileStamp,
  publicUrl,
  resolveTarget,
  shot,
  validateSelectors,
  writeJson,
} from './lib/common.mjs';
import { CODES, measureUx, pageConfig } from './lib/ux-measure.mjs';

const HELP = `design-review measure-clarity: the countable part of the clarity checklist

Usage
  node measure.mjs <url-or-file.html> [more targets] [options]

Output, per width, in <out>/<width>/
  <name>.png          viewport
  <name>-full.png     whole page
  <name>-marks.png    whole page with red frames; the letter is the finding:
                      T target under the touch size, X target under 24 px next to another target,
                      F text under the minimum size, C label cut, 3 label in three lines,
                      E label cut by a scroller edge, O the page scrolls sideways
  metrics.json        overflowX, targetsUnder44, targetsUnder24, targetsTotal, smallTargets,
                      textUnder12, primaryButtons, screens, clipped
${COMMON_HELP}
The widths of this script are 1440 and 390 unless --widths is given: the checklist is answered at these two.
Touch-target counts matter at phone widths; at computer widths they are printed for information.
On a phone width the full-page screenshot is taken after the measurements: touch emulation changes after it.
`;

async function main() {
  const args = parseArgs(process.argv.slice(2), { booleans: COMMON_BOOLEANS, values: COMMON_VALUES, actions: COMMON_ACTIONS });
  if (args.flags.help || (!args.targets.length && !args.errors.length)) {
    console.log(HELP);
    return args.flags.help ? 0 : 2;
  }
  if (args.errors.length) {
    console.error(`${args.errors.join('\n')}\nRun with --help for the list of options.`);
    return 2;
  }
  const loaded = loadProfile({ path: args.flags.profile ?? null, disabled: Boolean(args.flags['no-profile']) });
  const { profile } = loaded;
  // the clarity checklist is answered at two widths; the four widths of the profile are for the look (measure-look.mjs)
  const widths = parseWidths(args.flags.widths, [1440, 390]);
  const targets = applyNames(args.targets.map((arg) => resolveTarget(arg)), args.flags.name);
  checkCommonFlags(args.flags);
  const out = resolve(process.cwd(), args.flags.out ?? 'ux-measure');

  console.log(`profile: ${loaded.source === 'profile' ? loaded.file : 'defaults'}`);
  for (const note of loaded.notes) console.log(`  note: ${note}`);

  const playwright = loadPlaywright(import.meta.url);
  const browser = await launchBrowser(playwright, args.flags);
  const failures = [];
  let selectorsChecked = false;
  const lines = [];
  let stops = 0;
  try {
    for (const width of widths) {
      const dir = ensureDir(join(out, String(width)));
      const metrics = {};
      for (const target of targets) {
        let opened = null;
        try {
          opened = await openScreen(browser, target, width, profile, args.flags, args.actions);
          const { page, phone } = opened;
          if (!selectorsChecked) {
            selectorsChecked = true;
            await validateSelectors(page, loaded);
          }
          await shot(page, join(dir, `${target.name}.png`));
          // measurements go before the full-page shot: after it phone emulation stops treating the pointer as a finger
          const result = await measureUx(page, pageConfig(profile, width));
          const { marks, ...numbers } = result;
          await drawOverlay(page, marks.map((item) => ({ rect: item.rect, code: CODES[item.kind] })));
          // findings are searched on the whole page, so the marked shot is the whole page too
          await shot(page, join(dir, `${target.name}-marks.png`), true);
          await clearOverlay(page);
          if (!args.flags['no-full']) await shot(page, join(dir, `${target.name}-full.png`), true);
          metrics[target.name] = { target: publicUrl(target.url), profileSource: loaded.source === 'profile' ? loaded.file : 'defaults', phone, ...numbers };
          // stop items of the checklist that the script can see: D1 on any width, H2 on a phone
          const stop = (numbers.overflowX > 1 ? 1 : 0) + (phone ? numbers.targetsUnder24 : 0);
          stops += stop;
          lines.push(
            `${String(width).padStart(5)}  ${target.name}: overflowX ${numbers.overflowX}, targets under ${numbers.thresholds.touchTarget}${phone ? '' : ' (mouse width, for information)'}: ${numbers.targetsUnder44} of ${numbers.targetsTotal}, under 24 and crowded: ${numbers.targetsUnder24}, text under ${numbers.thresholds.minFont}: ${numbers.textUnder12}, primary buttons: ${numbers.primaryButtons.length}, cut labels: ${numbers.clipped.length}, screens: ${numbers.screens}`,
          );
        } catch (error) {
          failures.push(`${width} ${target.name}: ${String(error?.message ?? error).split('\n')[0]}`);
        } finally {
          await opened?.context.close().catch(() => undefined);
        }
      }
      const stamp = profileStamp(loaded);
      writeJson(join(dir, 'metrics.json'), { profile: stamp, metrics: mergeMetrics(join(dir, 'metrics.json'), stamp, metrics), failures: failures.filter((line) => line.startsWith(`${width} `)) });
    }
  } finally {
    await browser.close();
  }
  console.log('');
  for (const line of lines) console.log(line);
  for (const line of failures) console.error(`failed: ${line}`);
  console.log(`\noutput: ${out}`);
  if (failures.length) return 2;
  if (args.flags.strict && stops > 0) return 1;
  return 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error) => {
    console.error(String(error?.message ?? error));
    process.exitCode = 2;
  },
);
