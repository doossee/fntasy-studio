---
name: ux-clarity
description: "Interface clarity rules and a screen audit checklist with a score. Load when you design, change or review a screen: navigation, the main action, forms, lists on a phone, states, undo, copy, first run. Every rule is something you can count on a screenshot (buttons, fields, taps, pixels, words); a Playwright script measures touch targets, sideways scroll, small text and cut labels on any URL or HTML file. Reads the audience and languages from design-profile.md. Owns the scenario; complements ui-craft (how the screen looks)."
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Edit Glob Grep
---
# ux-clarity

The skill answers one question: **will a new user understand this screen the first time, on a phone, without an explanation**. The yardstick is the apps that user already uses every day (profile: `Product`, familiar apps; by default a mainstream messenger, a banking app, a marketplace app).

There is no advice here like "make it cleaner" or "improve the hierarchy". Every rule is a statement that can be counted on a screenshot: the number of buttons, fields, taps, pixels, words. Every rule has a source (`references/sources.md`) and an example.

## When to load

- Before you design or change a screen, a form, a list, navigation, a message.
- When a finished screen must be checked and you must say whether it can be shown to a customer.
- When someone says "unclear", "complicated", "I could not find it".
- When someone asks to audit a page by its address: run the script on the URL and go through the checklist.

Not needed for server changes, calculations, permissions, marketing copy.

## Project profile first

Who the user is, which device they hold, their few daily actions, the interface languages and their word lists come from the project profile, `design-profile.md` (format: `profile.md`). Look for it in the project: `design-profile.md`, `.claude/design-profile.md`, `docs/design-profile.md`.

- **Profile found.** `Product` fills the line about the screen (AUD-1); `Languages` gives the languages to check and the stop-word lists; `Decisions` lists deliberate deviations, which go into "kept as our decision" instead of the list of defects.
- **No profile.** Work with the default audience (a non-technical first-time user on a phone) and the default thresholds, and start every report with: "No project profile: default audience and thresholds". If the real audience is clearly different (a professional tool used all day on a large screen), say which rules that weakens and propose a profile.

## Place among skills

| Question | Skill |
| --- | --- |
| **Will a person find the action, understand the state, avoid a mistake, how many taps does it cost** | **`ux-clarity`** |
| How the screen is built and stands: spacing, alignment, composition, data, colour | `ui-craft` |

Order: `ux-clarity` first (what is on the screen and in what order), then `ui-craft` (how it looks). A generic-AI-look filter, a copy-style skill or an accessibility skill, if the project uses one, runs after these two. The look, the brand and the tokens are set by the profile; this skill does not change them. Where the topics touch (touch target, text size, contrast), this skill holds only the measurable threshold.

## How it is organised

| File | What is inside |
| --- | --- |
| `profile.md` | The project profile: where it lives, keys, sections, work without a profile |
| `references/00-audience.md` | AUD-1…4: who the user is, their familiar apps, the few daily actions; how to read them from the profile |
| `references/01-navigation.md` | NAV-1…7: visible sections, one bar everywhere, the way back, one place for a thing |
| `references/02-primary-action.md` | ACT-1…6: one primary button, within reach, with a clear label |
| `references/03-forms.md` | FORM-1…13: few fields, labels, keyboard, defaults, an amount in two taps, errors |
| `references/04-lists-mobile.md` | LIST-1…7: no sideways scroll, the row is the target, search, status in a word |
| `references/05-states.md` | STATE-1…6: empty, loading, error, success, zeros |
| `references/06-feedback-undo.md` | FB-1…6: instant response, undo instead of confirmation, money |
| `references/07-copy.md` | COPY-1…8: stop words, one term, length, every language |
| `references/08-touch-a11y.md` | TOUCH-1…6: 44 px, gaps, text size, pinned elements |
| `references/09-first-run.md` | START-1…6: first sign-in, hints, an empty account |
| `references/sources.md` | Sources with links, and numbers that did not make it into the rules |
| `checklist.md` | The screen audit: 54 yes/no questions, the score, the "can be shown to a customer" threshold |
| `examples/` | A clear form, the same form with violations, a sample profile |

Every rule is written the same way: **Rule → Why → How to check → Bad → good → Sources**. "How to check" is the main part: if the check cannot be run to get a number or a yes/no, the rule must be rewritten.

## Order of work

### You design or change a screen

1. Write the line about the screen: who, on which device, the main question, the main action (`references/00-audience.md`, the table in `checklist.md`). If you cannot name one main action, the screen does too much: split it.
2. Read the rule files for the topic of the screen (a form: `03-forms.md`; a list: `04-lists-mobile.md`). Navigation and the main action concern any screen.
3. Start at 390 px. What does not fit on the first screen of a phone is not the main thing.
4. Assemble the screen from the project's existing components and tokens (profile: `Components`, `Brand`). A new look of a component only if the rule cannot be met otherwise; say so in the report.
5. Go through `checklist.md` for your screen, before and after. The score and the stop items go into the report.
6. Then `ui-craft` for the look.

### You review a screen

1. Shoot the screen with demo data (below). An audit is not done on a live customer's account.
2. Go through `checklist.md` and fill in the protocol: an answer and its grounds for every item.
3. Sort the violations by harm (the table at the end of `checklist.md`).
4. For each violation: the rule number and a "bad → good" proposal on this very screen.

### Screenshots and measurements

`scripts/measure.mjs` works on any address or local HTML file; it needs Node 20+ and Playwright.

```bash
cd ${CLAUDE_SKILL_DIR}/scripts && npm install && npx playwright install chromium     # once; skip if Playwright is already installed

node ${CLAUDE_SKILL_DIR}/scripts/measure.mjs http://localhost:3000/orders                       # 1440 and 390, whatever the profile widths
node ${CLAUDE_SKILL_DIR}/scripts/measure.mjs examples/acme-payment-bad.html --widths 390,320
node ${CLAUDE_SKILL_DIR}/scripts/measure.mjs <url> --locale de-DE --out ux-measure/de           # another language
```

Getting to a screen behind a sign-in, a dialog or a tab: `--storage-state <file>`, `--cookie name=value`, and actions that run in order before the measurement: `--fill 'selector=text'`, `--click 'selector'`, `--press Escape`, `--wait-for 'selector'`, `--wait-gone 'selector'` (a toast that must leave the frame). An action takes the first visible match. Selectors are Playwright selectors (`text=…`, CSS). `--help` lists everything.

In `<out>/<width>/` (default `ux-measure/`): `<name>.png` (the first screen), `<name>-full.png` (the whole page), `<name>-marks.png` (the whole page with findings in red; the letter on a frame: `T` target under the touch size, `X` target under 24 px next to another target, `F` text under the minimum size, `C` label cut, `3` label in three lines, `E` label cut by a scroller edge, `O` the page scrolls sideways) and `metrics.json`. Runs into the same `--out` add up by screen name.

`metrics.json`:

| Field | What it is | Checklist |
| --- | --- | --- |
| `overflowX` | How many px the page is wider than the requested width: sideways scroll | D1 (stop) |
| `targetsUnder44`, `targetsTotal`, `smallTargets` | Touch targets smaller than 44 px on the smaller side (profile: `touch-target`), with names and sizes | H1 |
| `targetsUnder24`, `crowdedTargets` | Targets under 24 px whose 24 × 24 area touches a neighbour, with names and sizes | H2 (stop) |
| `textUnder12`, `smallTexts` | Visible texts smaller than 12 px (profile: `min-font`), with the text and its size | H3 |
| `primaryButtons`, `primarySource` | Buttons in the first screen filled with the primary colour (or matching the profile's `selectors.primary-button`), and how that colour was found | a hint for A2: count by eye too |
| `screens` | Height of the page in screens | B1, B2 |
| `clipped` | Interface labels cut with an ellipsis or hidden overflow (`clipped`), cut by the edge of a sideways scroller (`cut`), buttons and tabs wrapped to three lines (`three-lines`) | G6: an empty list in the longest language at 390 is the condition for "yes" |

On the full-page screenshot of a phone a pinned bottom bar lands in the middle of the frame: that is how the shot is taken, not how the screen looks. `--strict` exits with code 1 on the stop items the script can see (D1, and H2 on a phone).

What the script does not answer: everything about meaning. Whether the primary button names the result, whether the state is understandable, how many taps the scenario costs: those are checklist questions answered from the screenshots.

## What you may not do in the name of clarity

- **Remove a section, rearrange the menu, change a workflow live customers are used to**: only as a proposal to the product owner, with variants. The skill finds the problem; a decision to change what people are used to is the owner's.
- **Change the look of components and the brand.** Clarity is reached by composition and order, not by redrawing.
- **Hide a capability to raise the score.** An action goes under "More" if it is rare, not because it gets in the way of the count.
- **Add a guided tour instead of simplifying** (START-1).
- **Cite the "three clicks" rule, "7 ± 2", the coloured "thumb zone" map**: these numbers are not confirmed (`references/sources.md`).
- **Copy other products' screens, texts and pictures.** Habits of mass-market apps are taken as a pattern of behaviour, not as a layout.

## When a rule and practice disagree

A rule may turn out wrong for your audience. Then it is not bypassed silently but changed: write the case down (the screen, what a real user said or did), correct the rule and the threshold in `references/` and the item in `checklist.md`, and say so in the report. If the correction is true only for one product, it goes to that product's profile (`Decisions`), not into the rules. Watching a real user is stronger than any source in the list.

Checking the checklist itself: two independent reviewers score one screen from the same screenshots. A difference of more than 15 % in the score means some item can be read two ways: refine it in "Definitions" and repeat.
