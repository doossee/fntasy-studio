#!/usr/bin/env node
// ui-craft measurements for any page: stop items, composition figures, marked and "squint" screenshots.
//   node measure.mjs <url-or-file.html> [more targets] [options]
// See references/11-measure.md for the meaning of every number.
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
  numberFlag,
  openScreen,
  parseArgs,
  mergeMetrics,
  parseWidths,
  readJson,
  profileStamp,
  publicUrl,
  resolveTarget,
  shot,
  validateSelectors,
  writeJson,
} from './lib/common.mjs';
import { CODES, RULES, measureComposition, measureStateShift, measureUi, pageConfig, squintShot } from './lib/ui-measure.mjs';

const HELP = `ui-craft measure: stop items and composition figures of a screen

Usage
  node measure.mjs <url-or-file.html> [more targets] [options]

Output, per width, in <out>/<width>/
  <name>.png          viewport
  <name>-full.png     whole page
  <name>-squint.png   viewport blurred and grey (computer widths)
  <name>-marks.png    whole page with red frames; the letter is the rule:
                      T text-edge, B box-edge, C clipped, S off-scale, R row-align,
                      F font-scale, L line-length, H state-shift, O page-overflow
  metrics.json        counts, stops, composition, violations
and <out>/summary.json
${COMMON_HELP}
ui-craft options
  --no-measure                  screenshots and squint only ("look first, numbers later")
  --no-state                    skip the hover and focus check (S8)
  --keep <n>                    violations kept per rule in metrics.json (default 40)
`;

async function main() {
  const args = parseArgs(process.argv.slice(2), {
    booleans: [...COMMON_BOOLEANS, 'no-measure', 'no-state'],
    values: [...COMMON_VALUES, 'keep'],
    actions: COMMON_ACTIONS,
  });
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
  const widths = parseWidths(args.flags.widths, profile.widths);
  const targets = applyNames(args.targets.map((arg) => resolveTarget(arg)), args.flags.name);
  checkCommonFlags(args.flags);
  const out = resolve(process.cwd(), args.flags.out ?? 'ui-measure');
  const keep = numberFlag(args.flags, 'keep', 40, { min: 1, integer: true });
  const measureOn = !args.flags['no-measure'];

  console.log(`profile: ${loaded.source === 'profile' ? loaded.file : 'defaults'}`);
  for (const note of loaded.notes) console.log(`  note: ${note}`);

  const playwright = loadPlaywright(import.meta.url);
  const browser = await launchBrowser(playwright, args.flags);
  const summary = {};
  const failures = [];
  let selectorsChecked = false;
  try {
    for (const width of widths) {
      const dir = ensureDir(join(out, String(width)));
      const metrics = {};
      summary[String(width)] = {};
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
          if (!args.flags['no-full']) await shot(page, join(dir, `${target.name}-full.png`), true);
          if (!phone) await squintShot(page, join(dir, `${target.name}-squint.png`));
          if (!measureOn) {
            console.log(`${String(width).padStart(5)}  ${target.name}: screenshots taken, not measured`);
            continue;
          }
          // the config is built after the selector check: an invalid profile selector is already replaced by the default
          const config = pageConfig(profile, keep);
          const result = await measureUi(page, { ...config, viewportWidth: width });
          // composition is a property of the page: with a dialog open it is measured on the page's own screen
          const composition = result.scope === 'dialog' ? null : await measureComposition(page, config);
          if (!args.flags['no-state'] && !phone) {
            const shifts = await measureStateShift(page, config);
            result.violations.push(...shifts);
            result.counts['state-shift'] = shifts.length;
            result.stops += shifts.length;
          }
          await drawOverlay(page, result.violations.map((item) => ({ rect: item.rect, code: CODES[item.rule] })));
          await shot(page, join(dir, `${target.name}-marks.png`), true);
          await clearOverlay(page);
          metrics[target.name] = { target: publicUrl(target.url), profileSource: loaded.source === 'profile' ? loaded.file : 'defaults', ...result, composition };
          summary[String(width)][target.name] = { stops: result.stops, counts: result.counts, flags: composition?.flags ?? null, scope: result.scope };
        } catch (error) {
          failures.push(`${width} ${target.name}: ${String(error?.message ?? error).split('\n')[0]}`);
        } finally {
          await opened?.context.close().catch(() => undefined);
        }
      }
      if (measureOn) {
        const stamp = profileStamp(loaded);
        writeJson(join(dir, 'metrics.json'), { profile: stamp, metrics: mergeMetrics(join(dir, 'metrics.json'), stamp, metrics), failures: failures.filter((line) => line.startsWith(`${width} `)) });
      }
    }
  } finally {
    await browser.close();
  }
  if (measureOn) {
    const earlier = readJson(join(out, 'summary.json'))?.summary ?? {};
    const merged = { ...earlier };
    for (const [width, screens] of Object.entries(summary)) merged[width] = { ...(earlier[width] ?? {}), ...screens };
    writeJson(join(out, 'summary.json'), { profile: profileStamp(loaded), summary: merged, failures });
  }

  let stops = 0;
  if (measureOn) {
    console.log('');
    for (const [width, screens] of Object.entries(summary)) {
      for (const [name, item] of Object.entries(screens)) {
        stops += item.stops;
        const parts = RULES.filter((rule) => item.counts[rule] > 0).map((rule) => `${rule} ${item.counts[rule]}`);
        console.log(`${String(width).padStart(5)}  ${name}: ${item.stops ? `${item.stops} stop${item.stops === 1 ? '' : 's'} (${parts.join(', ')})` : '0 stops'}${item.flags?.length ? `; composition: ${item.flags.join(', ')}` : ''}${item.scope === 'dialog' ? '; measured: the open dialog or menu only' : ''}`);
      }
    }
  }
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
