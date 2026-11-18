---
name: design-review
description: "Design review for product interfaces: finds defects in a finished screen, does not design it. Two lenses. Clarity: will a first-time user understand the screen on a phone without help (main action, navigation, forms, lists, states, copy, touch). Look: is it even and calm (spacing scale, distance to frames, alignment, typography, layout at 1440/1280/1024/390, long words and translations, colour within the brand, data and tables). Playwright measurement scripts for any URL or HTML file, two checklists with scores, one severity scale 1-4, a report format. Load when a changed screen needs checking: before handing over work that touched the UI (the plugin's optional Stop hook asks for it), when someone asks to review, audit or check a screen, in disputes 'rule versus clarity'. Not needed to draw a screen: draw it any way you like. Reads project specifics from design-profile.md."
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Glob Grep
---
# design-review

This skill **checks** an interface and reports defects. It does not tell anyone how to draw a screen and is not needed to draw one: screens are made in any way, with any skills or none. The skill comes after, to find what is broken, uneven or unclear, and to say what to fix.

The review is done by the `design-reviewer` agent in a fresh context: the author does not accept their own screen. The plugin's optional Stop hook (`hooks/design-review-gate.mjs`) can make a session ask for that review before it hands over work with a changed UI.

## Project profile first

Everything that belongs to one product (scales, brand, fonts, languages, audience, components, decisions already taken, domain examples) comes from the project profile, `design-profile.md`. Read `profile.md` for the format, then look for it in the project: `design-profile.md`, `.claude/design-profile.md`, `docs/design-profile.md`.

- **Profile found.** Its numbers replace the defaults of the rules; its `Brand` and `Decisions` are given facts, not defects: name their cost, do not overturn them.
- **No profile.** Work with the defaults, and start the report with: "No project profile: default scale and thresholds; audience and brand inferred from the screen". If the defaults clearly do not fit, say so instead of listing hundreds of off-scale values.

## Two lenses

| Lens | Question | Rules | Checklist |
| --- | --- | --- | --- |
| **Clarity** | Will a first-time user understand this screen at once, on a phone, without help; how many taps and decisions does a frequent task cost | `references/clarity/`: AUD, NAV, ACT, FORM, LIST, STATE, FB, COPY, TOUCH, START | `checklist-clarity.md` |
| **Look** | Is the screen even and does it stand calmly: spacing scale, frames, alignment, type, widths, long words, colour within the brand, data, details | `references/look/`: SPACE, INSET, GROUP, ALIGN, TYPE, DESK, PHONE, WRAP, ICON, STATE, COMP, DATA, COLOR, CRAFT, TABLE | `checklist-look.md` |

Clarity first (the user's task outweighs the look), then the look. A generic-AI-look filter or an accessibility skill, if the project uses one, is referenced, not repeated.

Every rule reads **Rule → Why → How to check (a number or a yes/no on a screenshot) → Bad → Good → Sources**. The rules are tools for finding defects, not law: "complies with the skill" is not an argument, and "breaks the skill" without harm on the screen is not one either. The only question about a rule is whether the screen got worse for a person.

## What counts as a defect

| Score | What it is | Example |
| --- | --- | --- |
| 4 | The task cannot be done; a money or data error the person will not notice; content broken, hidden, overlapped or unreadable on a main screen, in a supported theme or width; a WCAG AA failure (1.4.3, 1.4.10, 1.4.11) | An amount cut at 390 px in the longest language; a payment recorded for the wrong person without a visible sign; text at 2.8:1 contrast |
| 3 | The task can be done, but most people will err or get stuck; the hierarchy puts the wrong thing first; one component looks clearly different across main screens | The main action cannot be found without a hint; a secondary button looks primary |
| 2 | Slows a frequent task; uneven spacing, alignment, type or colour that an attentive person notices | Two extra taps on an action done 50 times a day; cards with different insets on one screen |
| 1 | Polish | An icon 2 px off |

Severity depends on how often the task happens and what an error costs, not on how unattractive something is. **Taste** ("could be either way, does not affect the task") is not a defect: one line at the end, no score.

## Review order

1. **What changed.** `git diff` against the base of the work: which screens and shared components (shared components and tokens touch every screen). Take the scenario from the task, not from the author's report; do not take the author's conclusions ("cleaner now", "0 violations") on trust.
2. **The user's tasks.** Write down 2–3 tasks the change touches before looking: who, what they want, where they start (`references/clarity/00-audience.md`).
3. **Look at the running app** when you can, on the profile's widths (default 1440, 1280, 1024, 390), in every language and theme of the profile, and in states: empty, loading, error, long names and large numbers, keyboard focus, hover. No running app: work from screenshots and say plainly what a screenshot cannot show (hover, focus, keyboard).
4. **Measure** with the scripts below. A script mark is a reason to look, not a finding: confirm it on a screenshot.
5. **Checklists.** `checklist-clarity.md` and `checklist-look.md` for the changed screens: stop items and score. A "yes" counts only with grounds (a place on a screenshot or a number).
6. **Try to refute yourself** before writing a finding: another width, theme, hover state, the same action elsewhere. Not confirmed: "not checked".
7. **Report** (format below). At most three rounds per change: after the third, the remaining disputes go to the owner, with the cost of each option.

### Scripts

The scripts are in `scripts/` inside this skill folder: `${CLAUDE_PLUGIN_ROOT}/skills/design-review/scripts/` when installed as a plugin, `.claude/skills/design-review/scripts/` (project) or `~/.claude/skills/design-review/scripts/` (user) when copied. They need Node 20+ and Playwright (`npm install` and `npm run browser` once in that folder).

```bash
# clarity: sideways scroll, touch targets, small text, primary buttons, cut labels — at 1440 and 390
node scripts/measure-clarity.mjs <url-or-file.html> [--profile file] [--out dir]
# look: stop items S1–S9, composition figures, marked and "squint" screenshots — at the profile's widths
node scripts/measure-look.mjs <url-or-file.html> [--widths 1440,1280,1024,390] [--profile file] [--out dir]
```

A screen behind a sign-in: `--storage-state`, `--fill`, `--click` (see `references/look/11-measure.md`). Screenshots only the reviewer looks at go to a temporary folder outside the repository.

## Report

Plain words, in the language of the person who asked.

1. **Verdict:** "accept", "revise" (findings 2–3, fixable without a redo) or "return" (a finding 4, or the change made the task or the look worse overall). One sentence why.
2. **What I looked at:** tasks, screens, widths, languages, themes, states; running app or screenshots; the profile used (or "defaults"); what was not checked.
3. **Findings**, highest score first. Each: number and a one-phrase title; score 1–4; lens (clarity / look); where (screen, element, width, theme, language, state); evidence (path to a marked screenshot, a script number or a task step); grounds (rule in `references/…` and/or a public source: a Nielsen heuristic, a WCAG criterion, a section of Apple HIG, Material 3, Fluent 2 or GOV.UK; not sure of the wording — "from memory, verify"); what the person sees; the smallest fix.
4. **What we gain / what we lose** with the change overall — two short columns.
5. **Where a rule of the skill did harm or stayed silent** — file and line, and what it cost on the screen. This is how the skill improves.
6. **What is confirmed** — checked and good, with evidence.
7. **Taste** — one line.

## After the review

The author fixes findings 3–4 (and 2 when the fix is small), then marks the review so the optional hook lets the session finish:

```bash
node "${CLAUDE_PLUGIN_ROOT}/hooks/design-review-gate.mjs" --mark
```

The mark is tied to the current UI diff: a new UI change after it asks for a new review. Fixes made for the findings of this review are marked without a new round if they do not change the layout; otherwise, another round (at most three).

## What the reviewer does not do

- **Does not edit** code, skills or documents and does not commit. It proposes the smallest fix in words.
- **Does not redraw the screen** or demand a redo to taste. Freedom of design stays with the author; the review catches defects.
- **Does not change the brand or the owner's decisions**, and does not propose removing a section or reordering a menu without options for the owner: changes to what live users are used to are the owner's call.
- **Does not silence the script** with an exception or a threshold "for this screen", and does not edit a test to make a screen pass.
- **Does not touch production** or real customers' data; a local or staging copy with test data only.
- **Does not copy other products' screens** and does not name competing products.

## When a rule and practice disagree

The person who accepts the design looks with their eyes, and their "unclear" or "ugly" outweighs a number; watching a real user outweighs any source. Record the case (screen, width, what is wrong), find the cause, and refine the rule, the threshold and the checklist item. A rule that does not catch what the owner sees at once is incomplete; a rule that can be won formally without making the screen clearer is superfluous.

Checking the skill itself: two independent reviewers score one screen from the same screenshots; a gap of more than 15 % in a checklist score means an item can be read two ways — clarify it in the checklist's "Definitions".
