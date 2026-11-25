---
name: ui-rules
description: "Checkable UI and UX rules for designing and reviewing app and web screens and flows: 53 rules in 12 groups (layout, attention, actions and forms, conventions and navigation, states and errors, text and other languages, colour and dark theme, phone/desktop/web, motion, tables and numbers, search and filters, honest pricing and consent), with WCAG 2.2 first, a severity scale, conflicts, taste-vs-defect labels, example screens and a measuring script. Use this skill whenever someone designs, builds, critiques or reviews an interface, a screenshot, a Figma frame, an HTML page or a mobile screen; asks why a screen is confusing or hard to use; asks about usability, accessibility, contrast, touch targets, forms, empty states, dark mode, onboarding, navigation, pricing pages or dark patterns; or quotes a UX law or design rule of thumb to check whether it holds — even if they do not say UX or UI."
---
# ui-rules

53 rules for screens and flows. Each says **what must be true, why (what happens to a person), how to check it**, its thresholds with their kind, a bad → good example, where it stops applying, which conflicts touch it, and how strong its evidence is. Everything a rule needs is in these files; nothing has to be opened elsewhere.

## How to use

- **Designing or building:** read the groups that fit the work, starting with each group's **Review questions**. Look at the example screens in `examples/` for what a defect and its fix look like.
- **Reviewing:** follow `method.md`. Read the project profile (`profile.md` describes it). Walk the people's main tasks first; then the review questions of every group; then the rules. Measure what can be measured (`tools/measure.mjs`) and confirm every measurement on the screen. Score with `severity.md`; test every remark with `taste-vs-defect.md` and `labelled-remarks.md`; decide clashes with `conflicts.md`, including the cases where a rule is wrong.
- **Lens.** Each rule is marked UI (how the screen looks and reads), UX (what people do, decide and understand) or both. For a UI-only or UX-only pass, use the rules with that lens and those marked both; a full review uses all of them.
- **WCAG 2.2 stands above every other source.** After it, the order depends on the question (`sources.md`).
- **Thresholds** carry their kind: `WCAG x.y.z` (a requirement), `platform:` (Apple HIG, Material 3, Core Web Vitals), or `profile: key = default` (a team choice that makes the rule checkable; a project changes it in its profile; crossing it is a reason to look, not a finding by itself).
- **Evidence** says how hard to push a rule: *Standard*, *Platform guideline*, *Research* (measured on interfaces), *Research, applied* (measured elsewhere and applied to screens), *Contested* (unstable effect; the rule says when it shows), *Practice* (shared practice, not measured). A finding that rests only on *Contested*, *Practice* or a profile threshold needs the harm shown on the screen.
- **Findings cite** the rule ID, the WCAG criterion or platform guideline if any, and what was seen and measured — never an author, a year or a study figure from memory.
- Ideas that did not become rules (golden ratio, 60-30-10, F/Z layouts, colour psychology, "7 ± 2" menus, the three-click rule, onboarding carousels, urgency tactics, "X's law" as a reason…) are in `disputed.md`.

## Rules

**Layout and grouping** — `rules/layout.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| LAYOUT-1 | UI and UX | Keep the screen to a few simple blocks; every element has a job |
| LAYOUT-2 | UI | Group by distance first, then a shared box, then a connecting line |
| LAYOUT-3 | UI | One focal point per screen; limit emphasis |
| LAYOUT-4 | UI | Align to shared edges and a spacing scale |
| LAYOUT-5 | UI and UX | Put what people came for at the top and leading edge |

**Attention and memory** — `rules/attention-memory.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| MEM-1 | UX | Spend attention only on the task; reveal the rest progressively |
| MEM-2 | UX | Never make people carry facts between screens |
| MEM-3 | UI and UX | Split long content into named chunks |
| MEM-4 | UI and UX | Put messages where the eye already is; never style content like an ad |

**Action and decision** — `rules/action.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| ACT-1 | UI and UX | Make targets big enough and keep dangerous ones apart |
| ACT-2 | UX | Respond within 0.1 s; show progress after 1 s; never allow a double submit |
| ACT-3 | UX | Few, ordered, comparable options at each decision; recommend one |
| ACT-4 | UX | Give the best places to the few most frequent tasks |
| ACT-5 | UX | Show progress honestly in multi-step tasks |
| ACT-6 | UX | Ask for as little as possible; let the product do the work |
| ACT-7 | UX | Accept the ways people type; show the right keyboard |
| ACT-8 | UX | Don't interrupt a task in progress |
| ACT-9 | UX | Keep unfinished work and show the way back |
| ACT-10 | UX | Design the worst moment and the last moment |

**Expectations and consistency** — `rules/expectations.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| EXP-1 | UX | Work the way familiar products work; check the convention before calling something unusual |
| EXP-2 | UX | Name and structure things in the user's words, not the company's |
| EXP-3 | UI and UX | Same job, same look and behaviour — consistent, not uniform |
| EXP-4 | UX | Don't change what people already know without a reason |
| EXP-5 | UX | Teach in place, never in a tour |
| EXP-6 | UX | Keep navigation visible and show where people are |
| EXP-7 | UI and UX | Icons: one set, one meaning, a label unless universal |
| EXP-8 | UX | Design for the least experienced person in the audience |

**States and feedback** — `rules/states.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| STATE-1 | UI | Every control shows its state: default, hover, focus, pressed, disabled, busy |
| STATE-2 | UI and UX | Design every screen state: empty, loading, error, success, long data, other languages |
| STATE-3 | UI and UX | Make form errors specific, next to the field, and keep what was typed |
| STATE-4 | UX | Prefer undo; confirm only what cannot be undone |
| STATE-5 | UX | Pick the message channel by urgency and lifetime |

**Text** — `rules/text.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| TEXT-1 | UI | Use a short type scale with clear steps |
| TEXT-2 | UI | Make body text easy to read |
| TEXT-3 | UI | Text must survive 200% zoom, wider spacing and 320 px |
| TEXT-4 | UX | Write labels and messages in plain, specific words |
| TEXT-5 | UI and UX | Make text ready for other languages, scripts and formats |

**Colour** — `rules/color.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| COLOR-1 | UI | Meet contrast for text and controls in every theme |
| COLOR-2 | UI | Never use colour as the only signal |
| COLOR-3 | UI | Give each colour one job |
| COLOR-4 | UI | Design the dark theme; don't invert the light one |

**Phone, desktop and web** — `rules/platform.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| PLAT-1 | UI and UX | Adapt to the window, not the device, and keep every function |
| PLAT-2 | UX | Touch is not hover: no hover-only content, alternatives to gestures |
| PLAT-3 | UI and UX | Load fast and keep the layout still |

**Motion** — `rules/motion.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| MOTION-1 | UI | Animate only to explain; keep it short; let people turn it off |

**Data** — `rules/data.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| DATA-1 | UI and UX | Make tables people can scan, compare and act on, on every screen |
| DATA-2 | UI and UX | Show numbers, units and dates people can check |

**Search** — `rules/search.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| SEARCH-1 | UX | Search finds what people mean and never dead-ends |
| SEARCH-2 | UX | Filters and sorting show what is applied and never trap people |

**Honesty** — `rules/honesty.md`

| Rule | Lens | In one line |
| --- | --- | --- |
| HONEST-1 | UX | Show the full price and give honest choices |
| HONEST-2 | UX | Engage people without manipulating them |
| HONEST-3 | UX | Ask for data and permissions only when needed, and say why |
| HONEST-4 | UX | Judge a screen by what people do, not by how it looks |

## Files

| File | What it is |
| --- | --- |
| `rules/*.md` | The rules in 12 groups, each group with review questions |
| `user-test.md` | A kit for testing with five people: question, recruiting, tasks, session script, what to record, how to read results | When a decision rests on behaviour |
| `method.md` | How a reviewer gets from what they see to a finding; report format |
| `profile.md` | Format of a project profile, default thresholds, a fictional example |
| `severity.md` | Scale 1–4 and calibration by frequency, cost and who is affected |
| `taste-vs-defect.md` | The test for a defect, and common remarks that are only taste |
| `labelled-remarks.md` | Review remarks labelled defect, taste or depends, including ones where experts disagree |
| `conflicts.md` | Rule against rule, source against source, and cases where a rule is wrong |
| `disputed.md` | Ideas that were checked and rejected or narrowed, and the shape of each dispute |
| `microcopy.md` | Interface text, bad and good, in English, Russian, German, Uzbek and Arabic |
| `cases.md` | Worked cases on a fictional product |
| `examples/` | Screen pairs (bad and good) with numbered boxes and answer keys |
| `tools/` | `measure.mjs`: contrast, targets, type scale, truncation, reflow, labels, focus, screen-reader view |
| `sources.md` | Sources, their order and terms, where each rule comes from, checked thresholds |
| `mapping.md` | Where each source and each former rule went |
