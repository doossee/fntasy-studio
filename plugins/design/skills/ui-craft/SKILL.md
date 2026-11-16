---
name: ui-craft
description: "Screen design for product interfaces: measurable rules plus a freedom mode. Floor: spacing scale, distance from text to frames, alignment, typography, layout at 1440/1280/1024/390, long words and translations, states without layout shift; stop items checked by a Playwright script on any URL or HTML file. Ceiling: composition (leading element, block weight, separation ladder), data (numbers, tables, sparklines), colour within the brand, craft details, freedom mode (2-3 different solutions of one screen) and a 'level of the best' rubric with an independent judge. Load when you design, build, change or review how a screen looks, and when someone asks for 'stronger', 'bolder', 'a redesign', 'variants'. Reads project specifics from design-profile.md. Complements ux-clarity (scenario)."
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Edit Glob Grep
---
# ui-craft

The skill answers two questions.

1. **Is the screen even?** Spacing from the scale, text not stuck to frames, rows on one line, nothing cut. The measure is a number in pixels; a violation is a stop item. This is the **floor**.
2. **Is the screen strong?** Does it have a main thing, a reading order, different weight for different importance; do numbers and colour work; are the details kept. The measure is composition figures, a rubric of seven criteria and an independent judge. This is the **ceiling**.

A floor without a ceiling gives a tidy screen that is nothing in particular: zero stop items, and the person who accepts it says "not bad, I expected more". A ceiling without a floor gives a pretty picture with text touching a frame. Both are needed; the floor is not negotiable, the ceiling is the place for boldness.

## When to load

- You design a new screen or change the layout of an existing one.
- You build or change a screen, a shared component, a design token.
- You review a finished screen before showing it.
- Someone says "crooked", "cramped", "ugly": polishing. Someone says "stronger", "bolder", "I expected more", "redesign", "give me variants": freedom mode.
- Someone asks to audit a page by its address: run the script on the URL and go through the checklist.

Not needed for server code, calculations, permissions. For marketing pages only the floor, COMP-2 and the rubric apply (set `hero-numbers-only: false` in the profile).

## Project profile first

Everything that belongs to one product (scales, brand, fonts, languages, components, the owner's taste, deliberate deviations, domain examples) comes from the project profile, `design-profile.md`. Read `profile.md` for the format, then look for the profile in the project: `design-profile.md`, `.claude/design-profile.md`, `docs/design-profile.md`.

- **Profile found.** Its numbers replace the defaults of the rules; its `Brand` is what the skill may not change; its `Taste` steers freedom mode; its `Decisions` go into the "kept as our decision" list instead of the list of defects.
- **No profile.** Work with the defaults, and start every report with: "No project profile: default scale and thresholds; audience and brand inferred from the screen". If the defaults clearly do not fit (another grid, another body size), propose a profile before fixing anything.

## Place among skills

| Question | Skill |
| --- | --- |
| Will a person find the action, understand the state, how many taps does it cost | `ux-clarity` |
| **How the screen is built and how it stands: composition, data, colour within the brand, details, all in numbers** | **`ui-craft`** |

Order: `ux-clarity` (what is on the screen and why), then `ui-craft` (how it is built and stands). A generic-AI-look filter, a copy-style skill or an accessibility skill, if the project uses one, runs after these two. Brand, colours, fonts and radii are set by the profile; this skill does not change them in any mode.

## Two modes

| | Polishing | Freedom mode |
| --- | --- | --- |
| When | by default | when the owner or the task asks |
| What it does | the screen stays, the numbers change: spacing, sizes, alignment | 2-3 different solutions of the screen: layout, set of blocks, form of the data |
| What is fixed | everything except the numbers | the app shell and paths, brand and tokens, clarity, stop items (`references/16-freedom.md`, FREE-1) |
| How it ends | 0 stop items, the checklist score | screenshots of the variants, a choice table, rubric scores, a recommendation |

In both modes the screen is first assigned a kind; the leading element and the dose of boldness depend on it. The examples are from the fictional product Acme Orders (`examples/`); a project lists its own screens in the profile (`Domain examples`).

| Kind | Examples | Leading element | Boldness |
| --- | --- | --- | --- |
| Overview | Today, a report summary | the main number, 36-48 | high: asymmetry, a sparkline, headings that answer |
| List | orders, customers, payments | the table | in density, sorting and row states |
| Object card | an order, a customer, a deal | the header with the state | in the header and the layout of details |
| Form | record payment, new customer | the first field and one button | low: familiarity matters more |
| First run, sign-in, empty | sign-in, "get started" | one action | higher than on working screens |

**Default taste: strong means calm and clean.** Boldness is spent on the size of the leading element, the proportions of columns and the empty space around the main thing. Means of emphasis (tints, badges, icons, coloured text, charts) are counted and the extra ones removed. The first things a viewer notices on an otherwise good screen are uneven gaps and rows that start at different places: equal gaps between blocks of one level, a shared top of columns and a shared vertical of rows (COMP-8, COMP-10) are checked before handing over, on a par with the stop items. A project may record another taste in the profile (`Taste`).

## How it is organised

| File | What is inside |
| --- | --- |
| `profile.md` | The project profile: where it lives, keys, sections, work without a profile |
| `references/00-numbers.md` | Every number of the skill on one page |
| **Floor** | |
| `references/01-spacing-scale.md` | SPACE-1…4: the scale, roles of the steps, the parent sets the gap, phone |
| `references/02-component-insets.md` | INSET-1…4: minimum to the frame, padding of buttons, fields, badges, cards, tiles, cells, tabs |
| `references/03-proximity.md` | GROUP-1…5: twice as tight inside a group, heading and content, label and field |
| `references/04-alignment.md` | ALIGN-1…5: a row on one line, shared left and right edge, table, place of buttons |
| `references/05-typography.md` | TYPE-1…6: size scale, three levels, line height, line length, digits |
| `references/06-desktop.md` | DESK-1…7: width, columns, page header, table, toolbar, empty space, width steps |
| `references/07-phone.md` | PHONE-1…6: margins, one column, stacked header, tabs, tiles |
| `references/08-long-words.md` | WRAP-1…5: clipping, hyphenation of long-word languages, buttons, abbreviations, badges |
| `references/09-icon-text.md` | ICON-1…4: icon size, gap, centre of the line |
| `references/10-states.md` | STATE-1…4: hover, focus, selected, loading, all without shift |
| **Ceiling** | |
| `references/12-composition.md` | COMP-1…12: the screen's question, leading element, block weight, separation ladder, block shape, reading order, first viewport, rhythm, squint, verticals, density, heading that answers |
| `references/13-data.md` | DATA-1…10: a number and its companions, digits, table, row state, sparkline, bars, one number once, empty and many, time, urgency |
| `references/14-color.md` | COLOR-1…7: five jobs of colour, the 90 / 8 / 2 dose, red and green, state, surfaces, themes, charts |
| `references/15-details.md` | CRAFT-1…10: depth, borders, radii, icons, hover and focus, motion, small things in text, browser surfaces, worst data, places of actions |
| `references/16-freedom.md` | FREE-1…7: what is free and what is fixed, intent before code, axes of variants, checking the difference, handing over, the owner's words |
| `references/17-tables.md` | TABLE-1…6: cell types (primary, text, number, date, status, link, phone, yes/no, action, selection), one column one look, headers, empty, density, narrow screen |
| `rubric-best.md` | The "level of the best" rubric: seven criteria 0-4 with anchors, the independent judge, benchmarks |
| **Checking** | |
| `references/11-measure.md` | The script: stop items, composition figures, the squint shot |
| `checklist.md` | Audit of the look: 9 stop items, questions A-H (is it even) and K (is it strong), score, threshold |
| `references/sources.md` | Sources with links, and what was not confirmed |
| `examples/` | A clean screen, the same screen with a violation for every stop item and composition flag, a sample profile |

Every rule: **Rule → Why → How to measure → Bad → Good → Sources**. "How to measure" is a number or a yes/no question about a screenshot. If it cannot be checked, the rule is rewritten.

## Order of work

### 0. Intent, before code

1. The kind of the screen (table above) and the mode.
2. Five lines (FREE-2): the screen's question, the list of content with levels 1-3, the leading element, the reading path, the screen's move.
3. A scheme at 1440 in characters: columns, proportions, what is in the first viewport.
4. Self-check: "would I get the same scheme for any screen of this kind in any product?" If yes, redo what coincided.

In polishing, steps 2-4 are shorter (the screen exists), but the screen's question and the leading element are always named: without them it is unclear what the spacing serves.

### 1. Variants, in freedom mode only

2-3 variants with a named axis (FREE-3); one is deliberately quiet. If subagents build the variants, each gets its own axis and may not look at the others.

### 2. Assembly

1. Computer first: 1440, then 1280 and 1024. Then 390. Each in every language of the profile.
2. Grey first: layout, sizes and spacing are decided without colour; colour is added at the end, by jobs (COLOR-1).
3. The screen is assembled from the project's component library and the classes of the scale (profile: `Components`). Before a value like `10px`, `14px` of padding or a `13px` font, stop: it is not in the scale. A component's colour is not repainted at the place of use.
4. A new shared component only with the line "the closest existing one is X, it does not fit because Y".
5. Data: real and worst-case (CRAFT-9).

### 3. The look, before the numbers

The 1440 screenshot and `*-squint.png` (`--no-measure`). Write down: what is seen first, second, how many groups (COMP-9). If it does not match the intent, fix it now. Then "remove one accessory": find a frame, badge, icon or caption the screen would not miss, and remove it.

### 4. Numbers

`references/11-measure.md`: stop items (all zero), composition figures (`composition`, the `flags`). A red frame on `*-marks.png`: fix the cause in the component, not the symptom on one screen. A composition flag: either fix it or write down why it does not apply to this kind of screen.

```bash
node ${CLAUDE_SKILL_DIR}/scripts/measure.mjs <url-or-file.html> --out ui-measure
```

### 5. Checklist and rubric

`checklist.md`: the score for "even" (A-H) and "strong" (K). `rubric-best.md`: seven criteria. The author fills them in to find the weak spots; **the score that goes into the report is given by an independent judge** in a fresh context, from the screenshots, without the build history. If there was no independent judge, the report starts with the words "author's score".

### 6. Handing over

- Polishing: a table of stop items by width, the score, three fixes with the largest effect.
- Freedom mode: screenshots of the variants, the choice table and "where it is now", composition figures, rubric and `ux-clarity` scores, a recommendation (FREE-5).
- Always: "not checked" and "kept as our decision" (what looks like a violation but is fixed by the profile's `Decisions` or `Brand`).
- A change in a shared component or a token touches every screen: shoot the ones you did not mean to change too.

## Where rules conflict

- **Touch target 44 px (`ux-clarity` TOUCH-1) and density on a computer.** A height of 44 px is required with a touch pointer and for the main actions of a page; with a mouse, buttons and tabs inside panels are 32-36 px, a list row 40-48. The hit area is never under 24 px.
- **"Fewer words" and a clear label.** A label may get longer if the short one is unclear; if it does not fit, a counter and an explanation on the next line, not clipping.
- **A project scale of four steps and the scale of the skill.** A profile that names only layout steps (say 8 / 12 / 16 / 24) is extended, not contradicted: the skill adds 4, then 2 and 6 inside small elements, and 32-64 between sections.
- **The regular font scale and the leading number.** Sizes 36, 40 and 48 px are for the leading number of an overview screen only, no more than two texts per screen (TYPE-1, COMP-2). The script counts a third such text as a violation.
- **"One filled button" and "colour must work" (COLOR-1).** No conflict: there is one filled button, and colour does four more jobs: selection, state, a data series, progress.
- **"Colour only for exceptions" and a sparkline.** The last point of a sparkline in the primary colour is the screen's move, not a state; the other points are grey.
- **"No cards everywhere, no hero number, no sparklines" as anti-template advice.** Agreed in the main thing: a device without a reason is a template. Here each device has a reason and a measure: the hero number answers the screen's question (COMP-1), a sparkline stands next to its number and answers "is this a usual day" (DATA-5), a card is only for a heterogeneous object (COMP-5).
- **A calm brand and a strong screen.** The project's motion and energy settings (profile: `Brand`) do not change. Strength comes not from energy and motion but from hierarchy, proportions and data: a calm screen can be strong.
- **"The design changed too much" and freedom mode.** Freedom is in layout and data, not in the brand (FREE-1). The look of components, colours and radii stay.

## What you may not do in the name of beauty

- **Change the brand, colours, fonts, radii, the app shell and paths**, in any mode.
- **Break clarity.** `ux-clarity` scores are not lower than before; touch targets on a phone do not go below 44 px; an action is not hidden for the sake of cleanliness.
- **Silence the script** with an exception by class, an attribute or a threshold "for this screen", or edit the test so that a variant passes. Either fix it, or correct the rule and describe the case.
- **Cut text with an ellipsis** so that a row fits (WRAP-1).
- **Add decoration**: gradients, glow, coloured side stripes, icons in coloured circles, label-captions above blocks, a shadow under every card. Strength is in composition, not in finish.
- **Answer "yes" without grounds.** A checklist answer or a rubric score without a place on the screenshot or a number does not count.
- **Copy other products' screens and pictures.** Benchmarks are a measure of level, not a source of layouts.

## When a rule and practice disagree

The person who accepts the design looks with their eyes, and their "ugly" or "I expected more" is stronger than a number. Then: write the case down (screen, width, what exactly is wrong), find the cause (a distance, a weight, an order, a colour), add or refine the rule and the threshold, update `checklist.md`, `rubric-best.md` and, if possible, the script. A rule that does not catch what the viewer sees at once is incomplete. A preference of one product goes to its profile (`Taste`), not into the rules.

Checking the skill itself:

- **the checklist**: two independent reviewers score one screen from the same screenshots and the same `metrics.json`; a difference of more than 15 % means an item is ambiguous and its definition is refined;
- **the skill as a whole**: a blind comparison. One screen is built with this skill and with strong alternatives; the judges do not know which is which and score by the rubric. If our variant is not first, the cause goes into the skill, not an excuse.
