# design — a plugin of the fantasy-studio catalog

Turn "make it look good" and "make it clear" into rules you can count on a screenshot, and have a
change checked by a reviewer who did not build it.

- **ux-clarity** — will a new user understand this screen the first time, on a phone, without an explanation? 69 rules and a 54-question audit with a score;
- **ui-craft** — is the screen even, and is it strong? Measurable rules for spacing, alignment, typography and layout at four widths, plus composition, data, colour within the brand and a "level of the best" rubric;
- **a measurement script** for any URL or HTML file, audit commands and a read-only judge agent;
- **ux-reviewer** — an independent reviewer of an interface change: walks real user tasks in the running product and returns accept / rework / return with evidence.

Русская версия: [README.ru.md](README.ru.md). Catalog: [fantasy-studio](../../README.md).

## What changed since 0.1

- The plugin is called `design` (was `design-skills`) and lives in `plugins/design/` of the `fantasy-studio` catalog. Commands are now `/design:ui-audit`, `/design:ux-audit`, `/design:design-variants`; agents `@agent-design:design-judge`, `@agent-design:ux-reviewer`.
- New agent `ux-reviewer` and the project review profile it reads — see [UX reviewer](#ux-reviewer).
- Skills, rules and scripts did not change; the scripts run from the new folder.

Skill guides: [ui-craft](skills/ui-craft/README.md), [ux-clarity](skills/ux-clarity/README.md).

## What makes them different

- **Every rule has a number.** "How to measure" is a pixel count or a yes/no question about a screenshot. If a rule cannot be checked, it is rewritten.
- **A script measures any URL or HTML file.** Nine stop items for the look, the countable part of the clarity checklist, screenshots with red frames around violations, a blurred "squint" shot, composition figures.
- **Project specifics live in a profile.** Scales, brand, languages, components, the owner's taste and deliberate deviations are read from `design-profile.md`. Without a profile the skills work on stated defaults and say so.
- **The author does not grade their own work.** The rubric score that goes into a report comes from a judge in a fresh context who sees only screenshots.

## Install

### As a plugin (recommended)

```
/plugin marketplace add doossee/fantasy-studio
/plugin install design@fantasy-studio
```

The plugin adds:

| What | How to call | What it does |
| --- | --- | --- |
| skill `ui-craft` | loads by itself when you design, build or review a screen; or `/design:ui-craft` | rules, checklist, rubric, measurement script |
| skill `ux-clarity` | loads by itself; or `/design:ux-clarity` | rules, checklist, measurement script |
| command `/design:ui-audit <url>` | by hand | measures the page at 1440/1280/1024/390, walks the checklist, writes `ui-audit.md` |
| command `/design:ux-audit <url>` | by hand | measures at 1440 and 390, walks the 54 questions, writes `ux-audit.md` |
| command `/design:design-variants <screen>` | by hand | freedom mode: 2-3 variants with named axes, measured and scored blind |
| agent `design-judge` | used by the commands; or `@agent-design:design-judge` | read-only judge: scores screenshots by the rubric without the build history |
| agent `ux-reviewer` | `@agent-design:ux-reviewer`, after a screen or flow changed | read-and-run reviewer: walks user tasks in the running product, verdict with evidence |

### As plain skills

Copy the folders into the project (or into `~/.claude/skills/` for all projects):

```bash
git clone https://github.com/doossee/fantasy-studio
mkdir -p your-project/.claude/skills your-project/.claude/agents
cp -r fantasy-studio/plugins/design/skills/ui-craft fantasy-studio/plugins/design/skills/ux-clarity  your-project/.claude/skills/
# optional: the audit commands and the judge
cp -r fantasy-studio/plugins/design/skills/ui-audit fantasy-studio/plugins/design/skills/ux-audit fantasy-studio/plugins/design/skills/design-variants  your-project/.claude/skills/
cp fantasy-studio/plugins/design/agents/design-judge.md  your-project/.claude/agents/
cp fantasy-studio/plugins/design/agents/ux-reviewer.md  your-project/.claude/agents/
```

Each skill folder is self-contained: rules, checklist, script, examples.

### The measurement script

Node 20+ and Playwright. If Playwright is already installed in your project or globally, nothing else is needed. Otherwise, once per skill:

```bash
cd skills/ui-craft/scripts && npm install && npx playwright install chromium
```

## UX reviewer

`ux-reviewer` is an independent reviewer of an interface change. It is not given the author's
conclusions: it opens the running product, takes screenshots before and after with Playwright,
walks 2-3 tasks of real users and separates taste from harm.

- **Grounds:** the tasks of the project's users; public sources — Nielsen's 10 heuristics, Apple Human Interface Guidelines, Material 3, Fluent 2, GOV.UK Design System, WCAG 2.2. The `ui-craft` and `ux-clarity` rules are material under review, not law: the reviewer reports where a rule did harm or stayed silent.
- **Output:** verdict *accept*, *rework* or *return*; findings with severity 1-4 and evidence (screenshot, task step, source); *what we gain / what we lose*; *where a skill rule did harm or stayed silent*; what was not checked.
- **Tools:** read and run only (`Read`, `Glob`, `Grep`, `Bash`). It writes screenshots to its output folder and does not edit project files.

```
@agent-design:ux-reviewer Review the new checkout flow. Start: npm run dev, http://localhost:3000/cart.
Changed: /cart, /checkout, /checkout/done. Screenshots before: docs/screens/checkout-v1/.
```

### Project review profile

The reviewer reads `.claude/review-profile.md` in the project (or `REVIEW.md`, or `docs/review-profile.md`).
The same file serves the `code-reviewer` agent of the `review` plugin: keep both parts in it.
Without a profile the reviewer asks three questions or assumes general roles and says so.

```markdown
# Review profile

## Users
- Shop owner, 30-55, Android phone on mobile data; checks orders several times a day.
- Courier, phone in one hand, outdoors; marks orders delivered.
## Tasks
1. Find today's unpaid orders and remind the customer.
2. Mark an order delivered.
3. Refund part of an order.
## Languages
en, de (longest)
## Devices
phones 360-414 px (most traffic), laptops 1280-1440
## Accessibility
WCAG 2.2 AA; large text setting is common among owners
## Risky actions
refunds, deleting a product, sending a message to all customers
## Decisions
the order list stays a dense table on desktop: owners asked for it
```

The example product is invented. Do not put personal data of real users into the profile: describe roles.

## Measure a page

Run from `plugins/design/` of a clone, or replace `skills/` with the path of the installed skill.

```bash
# the look: stop items, composition figures, marked and squint screenshots
node skills/ui-craft/scripts/measure.mjs https://example.com
node skills/ui-craft/scripts/measure.mjs http://localhost:3000/orders --widths 1440,390 --out audit/orders

# clarity: touch targets, sideways scroll, small text, primary buttons, cut labels
node skills/ux-clarity/scripts/measure.mjs http://localhost:3000/orders

# the bundled examples: a clean screen and the same screen with a violation for every stop item and composition flag
node skills/ui-craft/scripts/measure.mjs skills/ui-craft/examples/acme-today-good.html skills/ui-craft/examples/acme-today-bad.html \
  --profile skills/ui-craft/examples/design-profile.md
```

Output of the first command, per width, in `ui-measure/<width>/`: `<name>.png`, `<name>-full.png`, `<name>-marks.png` (red frames; the letter is the rule), `<name>-squint.png`, `metrics.json`; and `ui-measure/summary.json`.

```
 1440  acme-today-good: 0 stops
 1440  acme-today-bad: 22 stops (text-edge 3, box-edge 1, clipped 1, off-scale 6, row-align 1, font-scale 4, line-length 1, state-shift 5); composition: no-hero, equal-cards, multi-primary, numbers-not-tabular, uneven-gaps, ragged-rows
```

A screen behind a sign-in, a dialog or a tab: `--storage-state state.json`, `--cookie name=value`, and actions that run in order: `--fill 'selector=text'`, `--click 'selector'`, `--wait-for 'selector'`, `--press Escape`. `--strict` makes the script exit with code 1 on any stop item. `--help` lists every option; `skills/ui-craft/references/11-measure.md` explains every number.

## Design profile

Put `design-profile.md` in the project root (or `.claude/`, or `docs/`). The front matter holds numbers for the script, the body holds text for the agent:

```markdown
---
name: Acme Orders
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
fonts: [12, 14, 16, 18, 20, 24, 28, 30]
hero-fonts: [36, 40, 48]
primary: "--primary"
main: "main"
languages: [en, de]
---
## Product      who uses it, device, daily actions, familiar apps
## Brand        colour roles, fonts, radii, motion (or a link to your design document)
## Languages    which one is the longest; word lists
## Components   where the library is
## Taste        what the person who accepts the design has chosen and rejected
## Decisions    deliberate deviations that must not be "fixed"
## Domain examples   your screens by kind, worst-case data
```

Full format: `skills/ui-craft/profile.md`. A complete example: `skills/ui-craft/examples/design-profile.md`.

No profile? The skills use the default scale and thresholds, infer the audience from the screen, and start every report with that fact.

The design profile is a separate file from the growth profile (`profile.yaml`): one describes screens, the other marketing.

## How the two skills work together

1. `ux-clarity`: what is on the screen and in what order. The line about the screen (who, device, main question, main action), then the rules, then the checklist.
2. `ui-craft`: how it is built and how it stands. Intent before code, assembly at 1440 → 1280 → 1024 → 390, the look before the numbers, the script, the checklist, the rubric.
3. Any filter for a generic-AI look, a copy-style skill or an accessibility skill you already use runs after these two.

Neither skill changes your brand: colours, fonts and radii come from the profile.

The skill texts are in English so that any project can use them. The examples use a fictional product, Acme Orders, with German as the language with long words.

## Limits

- The script uses Chromium only.
- It measures what is in the DOM: not canvas, not text inside images, not iframes.
- Meaning is not measured: whether a button names its result or a number has the right comparison next to it is a checklist question answered from screenshots.
- The default numbers describe product screens (admin panels, dashboards, forms). For marketing pages set `hero-numbers-only: false` and your own `fonts` in a profile.

## Sources

Rules are written in our own words; each cites its sources (standards, platform guidelines, research, articles) in `references/sources.md` of each skill, together with the claims that were checked and not confirmed.

## Layout

```
skills/ui-craft/     the look of screens: SKILL.md, profile.md, checklist.md, rubric-best.md, references/ (19 files), scripts/, examples/
skills/ux-clarity/   clarity of screens: SKILL.md, profile.md, checklist.md, references/ (11 files), scripts/, examples/
skills/ui-audit/  skills/ux-audit/  skills/design-variants/     commands
agents/              design-judge.md, ux-reviewer.md
```

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
