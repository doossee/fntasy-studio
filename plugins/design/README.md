# design — a plugin of the fntasy studio catalog

An independent design review for product interfaces. Draw screens any way you like — with any skill, any tool or none; this plugin
finds what is broken, uneven or unclear in the result and says what to fix, with evidence.

- **design-review** — a skill with two lenses: **clarity** (will a first-time user understand the screen on a phone, without help) and **look** (is it even and calm). Measurable rules, two checklists with a score, one severity scale 1–4 and a report format;
- **measurement scripts** for any URL or HTML file: stop items, touch targets, sideways scroll, cut labels, composition figures, marked and "squint" screenshots;
- **design-reviewer** — an agent that reviews a change with fresh eyes: walks real user tasks in the running product at four widths, marks evidence on screenshots, separates defects from taste, returns accept / revise / return;
- **/design:audit** — a command that reviews one screen by its address;
- **an optional Stop hook** that makes a session ask for the review before it hands over work that changed the UI.

Русская версия: [README.ru.md](README.ru.md). Catalog: [fntasy studio](../../README.md).

## What changed in 0.3.0

- **Review only.** The plugin no longer tells anyone how to draw a screen: designs are made freely, the plugin checks them. The skills `ui-craft` and `ux-clarity` became one skill, `design-review`, with two lenses; the rules, checklists and scripts moved with it. The design-generation parts were removed: freedom mode, design variants, the "level of the best" rubric.
- One agent, `design-reviewer`, instead of `ux-reviewer` and `ui-reviewer`; the `design-judge` agent and the `design-variants` command are gone.
- One command, `/design:audit`, instead of `/design:ui-audit` and `/design:ux-audit`.
- New: an optional Stop hook, `hooks/design-review-gate.mjs` — see [Review gate](#review-gate).

Moving from 0.2: rename your project's `.claude/skills/ui-craft` or `ux-clarity` copies to `design-review`; the design profile format did not change.

## Install

### As a plugin (recommended)

```bash
/plugin marketplace add doossee/fntasy-studio
/plugin install design@fntasy-studio
```

The skill loads by itself when you ask to review or check a screen. `/design:audit <url>` reviews one page; `@agent-design:design-reviewer` reviews a change.

### As a plain skill

Copy `skills/design-review/` into `.claude/skills/` of a project (or `~/.claude/skills/`), and `agents/design-reviewer.md` into `.claude/agents/`. The skill works from its own folder: the scripts are in `scripts/`.

### The measurement scripts

Node 20+ and Playwright. Once, in `skills/design-review/scripts/`: `npm install` and `npm run browser`.

## Review a change

Call the reviewer when the work is done, before it is handed over:

```
@agent-design:design-reviewer review branch feature/orders against main: screens Orders and Order card; the user is a shop assistant on a phone; a running copy is at http://localhost:3000
```

Give it the branch, the diff, 2–3 user tasks and the address of a running copy or a folder of screenshots. Do not pass your own conclusions ("cleaner now") — the review is useful because it is independent. Fix findings scored 3–4, then run another round if the layout changed (at most three rounds).

## Review gate

Off by default. Turn it on for a project with `review-gate: true` in the front matter of `design-profile.md`, or for a session with `DESIGN_REVIEW_GATE=on`; `DESIGN_REVIEW_GATE=off` turns it off.

When on, it blocks the end of a reply once if UI files differ from the base branch, the work is handed over (committed and pushed, nothing beyond the upstream) and this exact UI diff has not been reviewed. While the work is in progress it stays silent. After the review and the fixes:

```bash
node "${CLAUDE_PLUGIN_ROOT}/hooks/design-review-gate.mjs" --mark     # mark the current UI diff as reviewed
node "${CLAUDE_PLUGIN_ROOT}/hooks/design-review-gate.mjs" --status   # is a review needed now
```

What counts as UI: `*.tsx *.jsx *.vue *.svelte *.astro *.html *.css *.scss *.less` outside tests, stories, e2e and `node_modules`; `DESIGN_REVIEW_PATHS` (a regular expression over repository paths) replaces it. The base branch: `DESIGN_REVIEW_BASE`, else `origin/HEAD`, `origin/main`, `origin/master`, `origin/dev`. Marks live in the git directory and are never committed.

## Measure a page

Run from `plugins/design/` of a clone, or replace `skills/` with the path of the installed skill.

```bash
# look: stop items, composition figures, marked and squint screenshots
node skills/design-review/scripts/measure-look.mjs https://example.com
node skills/design-review/scripts/measure-look.mjs http://localhost:3000/orders --widths 1440,390 --out audit/orders

# clarity: touch targets, sideways scroll, small text, primary buttons, cut labels
node skills/design-review/scripts/measure-clarity.mjs http://localhost:3000/orders

# the bundled examples: a clean screen and the same screen with a violation for every stop item
node skills/design-review/scripts/measure-look.mjs skills/design-review/examples/acme-today-good.html skills/design-review/examples/acme-today-bad.html \
  --profile skills/design-review/examples/design-profile.md
```

```
 1440  acme-today-good: 0 stops
 1440  acme-today-bad: 22 stops (text-edge 3, box-edge 1, clipped 1, off-scale 6, row-align 1, font-scale 4, line-length 1, state-shift 5); composition: no-hero, equal-cards, multi-primary, numbers-not-tabular, uneven-gaps, ragged-rows
```

A screen behind a sign-in, a dialog or a tab: `--storage-state state.json`, `--cookie name=value`, and actions that run in order: `--fill 'selector=text'`, `--click 'selector'`, `--wait-for 'selector'`, `--press Escape`. `--strict` exits with code 1 on any stop item. `--help` lists every option; `skills/design-review/references/look/11-measure.md` explains every number.

## Design profile

Put `design-profile.md` in the project root (or `.claude/`, or `docs/`). The front matter holds numbers for the scripts and the gate switch, the body holds text for the reviewer:

```markdown
---
name: Acme Orders
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
fonts: [12, 14, 16, 18, 20, 24, 28, 30]
primary: "--primary"
main: "main"
languages: [en, de]
review-gate: true
---
## Product      who uses it, device, daily actions, familiar apps
## Brand        colour roles, fonts, radii, motion (or a link to your design document)
## Languages    which one is the longest; word lists
## Components   where the library is
## Taste        what the person who accepts the design has chosen and rejected
## Decisions    deliberate deviations that are not defects
## Domain examples   your screens by kind, worst-case data
```

Full format: `skills/design-review/profile.md`. A complete example: `skills/design-review/examples/design-profile.md`. No profile? The review uses the default scale and thresholds, infers the audience from the screen, and starts every report with that fact.

## Limits

- The scripts use Chromium only and measure what is in the DOM: not canvas, not text inside images, not iframes.
- Meaning is not measured: whether a button names its result is a checklist question answered from screenshots.
- The default numbers describe product screens (admin panels, dashboards, forms). For marketing pages set your own `fonts` and `hero-numbers-only: false` in a profile.

## Sources

Rules are written in our own words; each cites its sources (standards, platform guidelines, research, articles) in `references/look/sources.md` and `references/clarity/sources.md`, together with the claims that were checked and not confirmed.

## Layout

```
skills/design-review/   SKILL.md, profile.md, checklist-clarity.md, checklist-look.md,
                        references/clarity/ (11 files), references/look/ (18 files), scripts/, examples/
skills/audit/           the /design:audit command
agents/                 design-reviewer.md
hooks/                  hooks.json, design-review-gate.mjs (+ its test)
```

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
