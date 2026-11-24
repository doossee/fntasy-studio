---
name: ui-rules
description: "Rules for designing and reviewing interface screens and flows: 46 checkable rules in 10 groups — layout and grouping, attention and memory, action and decision, expectations and consistency, states and feedback, text, colour, phone/desktop/web, motion, honesty (no deceptive patterns). Built on WCAG 2.2, Nielsen Norman Group, Baymard, Apple HIG, Material 3, Laws of UX and others, with evidence strength for every rule, a conflict guide, a severity scale with calibration, a taste-vs-defect test and worked cases. Use when designing, building or reviewing a screen or flow, when someone asks why something is hard to use, or names a UX law or guideline."
---
# ui-rules

Forty-six rules for screens and flows. Each says **what to do, why, how to check it** (a number, a yes/no on a screenshot, or a step in a task walk-through), a bad → good example, where it stops applying, how strong its evidence is, and its sources. The wording is ours; sources are named, not linked, and everything a rule needs is in these files.

## How to use

- **Designing or building:** read the groups that fit the work. Start each group with its **Review questions**.
- **Reviewing:** follow `method.md`. Walk the user's main tasks first; then use the review questions of every group; then the rules. Score findings with `severity.md`; test every remark against `taste-vs-defect.md`; decide clashes with `conflicts.md`.
- **WCAG 2.2 stands above every other source.** After it, the source order depends on the question (see `sources.md`): platform convention → Apple HIG / Material 3; behaviour → NN/g, Baymard, then the others; e-commerce → Baymard.
- **Evidence labels** tell you how hard to push a rule: *Standard*, *Platform guideline*, *Research*, *Research, extended* (measured on something else), *Disputed*, *Heuristic*, *Analogy*. A finding resting only on *Disputed*, *Heuristic* or *Analogy* needs the harm shown on the screen itself.
- **Numbers marked "(ours)"** are this skill's choice to make a rule checkable. A project may change them.
- **The project profile wins on facts about the product**: users, tasks, languages, devices, brand, decisions already taken. Look for `.claude/review-profile.md` or `design-profile.md` in the project.
- Ideas that did not become rules (golden ratio, 60-30-10, F/Z layouts, colour psychology, "7 ± 2" menus, the three-click rule, onboarding carousels, urgency tactics…) are in `disputed.md`.
- `cases.md` shows the method on eight worked cases.

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
| MEM-3 | Keep what must be held in mind to about four items |
| MEM-4 | Split long content into named chunks |
| MEM-5 | Put messages where the eye already is; never style content like an ad |
| MEM-6 | Put the most used items first and last |

**Action and decision** — `rules/action.md`

| Rule | In one line |
| --- | --- |
| ACT-1 | Make targets big enough and keep dangerous ones apart |
| ACT-2 | Respond within 0.1 s; show progress after 1 s; never allow a double submit |
| ACT-3 | Few, ordered options at each decision; recommend one |
| ACT-4 | Give the best place to the few most frequent tasks |
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

**States and feedback** — `rules/states.md`

| Rule | In one line |
| --- | --- |
| STATE-1 | Every control shows its state: default, hover, focus, pressed, disabled, busy |
| STATE-2 | Design every screen state: empty, loading, error, success, long data, other languages |
| STATE-3 | Make form errors specific, next to the field, and keep what was typed |
| STATE-4 | Prefer undo; confirm only what cannot be undone |

**Text** — `rules/text.md`

| Rule | In one line |
| --- | --- |
| TEXT-1 | Use a short type scale with clear steps |
| TEXT-2 | Make body text easy to read |
| TEXT-3 | Text must survive 200% zoom, wider spacing and 320 px |
| TEXT-4 | Write labels and messages in plain, specific words |

**Colour** — `rules/color.md`

| Rule | In one line |
| --- | --- |
| COLOR-1 | Meet contrast for text and controls in every theme |
| COLOR-2 | Never use colour as the only signal |
| COLOR-3 | Give each colour one job |

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
| `rules/*.md` | The 46 rules in 10 groups, each group with review questions |
| `method.md` | How a reviewer gets from what they see to a finding; report format |
| `severity.md` | Scale 1–4 and calibration by frequency, cost and who is affected |
| `taste-vs-defect.md` | The test for a defect, and common remarks that are only taste |
| `conflicts.md` | Rule against rule, source against source, and how to decide |
| `disputed.md` | Ideas that were checked and rejected or narrowed |
| `cases.md` | Eight worked cases on a fictional product |
| `sources.md` | Sources, their order, terms of use, research named in the rules |
| `mapping.md` | Where each source and each former `ux-laws` rule went |
