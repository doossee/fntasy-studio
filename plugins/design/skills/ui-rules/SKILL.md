---
name: ui-rules
description: "Rules for designing and reviewing interface screens and flows: 52 checkable rules in 12 groups — layout, attention and memory, action and decision, expectations, states and messages, text and languages, colour and dark theme, phone/desktop/web, motion, data tables and numbers, search and filters, honesty (no deceptive patterns). WCAG 2.2 first; each rule says how to check it, with thresholds tagged as standard, platform guideline or team default. Includes a project-profile format, conflicts and cases where a rule is wrong, severity calibration, taste-vs-defect labels, interface text in five languages, example screens with answer keys, and a measuring script. Use when designing, building or reviewing a screen or flow, or when someone asks why something is hard to use."
---
# ui-rules

52 rules for screens and flows. Each says **what must be true, why (what happens to a person), how to check it**, its thresholds with their kind, a bad → good example, where it stops applying, which conflicts touch it, and how strong its evidence is. Everything a rule needs is in these files; nothing has to be opened elsewhere.

## How to use

- **Designing or building:** read the groups that fit the work, starting with each group's **Review questions**. Look at the example screens in `examples/` for what a defect and its fix look like.
- **Reviewing:** follow `method.md`. Read the project profile (`profile.md` describes it). Walk the people's main tasks first; then the review questions of every group; then the rules. Measure what can be measured (`tools/measure.mjs`) and confirm every measurement on the screen. Score with `severity.md`; test every remark with `taste-vs-defect.md` and `labelled-remarks.md`; decide clashes with `conflicts.md`, including the cases where a rule is wrong.
- **WCAG 2.2 stands above every other source.** After it, the order depends on the question (`sources.md`).
- **Thresholds** carry their kind: `WCAG x.y.z` (a requirement), `platform:` (Apple HIG, Material 3, Core Web Vitals), or `profile: key = default` (a team choice that makes the rule checkable; a project changes it in its profile; crossing it is a reason to look, not a finding by itself).
- **Evidence** says how hard to push a rule: *Standard*, *Platform guideline*, *Research* (measured on interfaces), *Research, applied* (measured elsewhere and applied to screens), *Contested* (unstable effect; the rule says when it shows), *Practice* (shared practice, not measured). A finding that rests only on *Contested*, *Practice* or a profile threshold needs the harm shown on the screen.
- **Findings cite** the rule ID, the WCAG criterion or platform guideline if any, and what was seen and measured — never an author, a year or a study figure from memory.
- Ideas that did not become rules (golden ratio, 60-30-10, F/Z layouts, colour psychology, "7 ± 2" menus, the three-click rule, onboarding carousels, urgency tactics, "X's law" as a reason…) are in `disputed.md`.

## Rules

**Layout and grouping** — `rules/layout.md`

| Rule | In one line |
| --- | --- |
| LAYOUT-1 | Keep the screen to a few simple blocks; every element has a job |
| LAYOUT-2 | Group by distance first, then a shared box, then a connecting line |
| LAYOUT-3 | One focal point per screen; limit emphasis |
| LAYOUT-4 | Align to shared edges and a spacing scale |
| LAYOUT-5 | Put what people came for at the top and leading edge |

**Attention and memory** — `rules/attention-memory.md`

| Rule | In one line |
| --- | --- |
| MEM-1 | Spend attention only on the task; reveal the rest progressively |
| MEM-2 | Never make people carry facts between screens |
| MEM-3 | Split long content into named chunks |
| MEM-4 | Put messages where the eye already is; never style content like an ad |

**Action and decision** — `rules/action.md`

| Rule | In one line |
| --- | --- |
| ACT-1 | Make targets big enough and keep dangerous ones apart |
| ACT-2 | Respond within 0.1 s; show progress after 1 s; never allow a double submit |
| ACT-3 | Few, ordered, comparable options at each decision; recommend one |
| ACT-4 | Give the best places to the few most frequent tasks |
| ACT-5 | Show progress honestly in multi-step tasks |
| ACT-6 | Ask for as little as possible; let the product do the work |
| ACT-7 | Accept the ways people type; show the right keyboard |
| ACT-8 | Don't interrupt a task in progress |
| ACT-9 | Keep unfinished work and show the way back |
| ACT-10 | Design the worst moment and the last moment |

**Expectations and consistency** — `rules/expectations.md`

| Rule | In one line |
| --- | --- |
| EXP-1 | Work the way familiar products work; check the convention before calling something unusual |
| EXP-2 | Name and structure things in the user's words, not the company's |
| EXP-3 | Same job, same look and behaviour — consistent, not uniform |
| EXP-4 | Don't change what people already know without a reason |
| EXP-5 | Teach in place, never in a tour |
| EXP-6 | Keep navigation visible and show where people are |
| EXP-7 | Icons: one set, one meaning, a label unless universal |

**States and feedback** — `rules/states.md`

| Rule | In one line |
| --- | --- |
| STATE-1 | Every control shows its state: default, hover, focus, pressed, disabled, busy |
| STATE-2 | Design every screen state: empty, loading, error, success, long data, other languages |
| STATE-3 | Make form errors specific, next to the field, and keep what was typed |
| STATE-4 | Prefer undo; confirm only what cannot be undone |
| STATE-5 | Pick the message channel by urgency and lifetime |

**Text** — `rules/text.md`

| Rule | In one line |
| --- | --- |
| TEXT-1 | Use a short type scale with clear steps |
| TEXT-2 | Make body text easy to read |
| TEXT-3 | Text must survive 200% zoom, wider spacing and 320 px |
| TEXT-4 | Write labels and messages in plain, specific words |
| TEXT-5 | Make text ready for other languages, scripts and formats |

**Colour** — `rules/color.md`

| Rule | In one line |
| --- | --- |
| COLOR-1 | Meet contrast for text and controls in every theme |
| COLOR-2 | Never use colour as the only signal |
| COLOR-3 | Give each colour one job |
| COLOR-4 | Design the dark theme; don't invert the light one |

**Phone, desktop and web** — `rules/platform.md`

| Rule | In one line |
| --- | --- |
| PLAT-1 | Adapt to the window, not the device, and keep every function |
| PLAT-2 | Touch is not hover: no hover-only content, alternatives to gestures |
| PLAT-3 | Load fast and keep the layout still |

**Motion** — `rules/motion.md`

| Rule | In one line |
| --- | --- |
| MOTION-1 | Animate only to explain; keep it short; let people turn it off |

**Data** — `rules/data.md`

| Rule | In one line |
| --- | --- |
| DATA-1 | Make tables people can scan, compare and act on, on every screen |
| DATA-2 | Show numbers, units and dates people can check |

**Search** — `rules/search.md`

| Rule | In one line |
| --- | --- |
| SEARCH-1 | Search finds what people mean and never dead-ends |
| SEARCH-2 | Filters and sorting show what is applied and never trap people |

**Honesty** — `rules/honesty.md`

| Rule | In one line |
| --- | --- |
| HONEST-1 | Show the full price and give honest choices |
| HONEST-2 | Engage people without manipulating them |
| HONEST-3 | Ask for data and permissions only when needed, and say why |
| HONEST-4 | Judge a screen by what people do, not by how it looks |

## Files

| File | What it is |
| --- | --- |
| `rules/*.md` | The rules in 12 groups, each group with review questions |
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
