# design — a plugin of the fntasy studio catalog

Rules for designing and reviewing interface screens and flows. The plugin is being rebuilt from new
materials; the first part is the skill `ui-rules`.

| Adds | Called as |
|---|---|
| skill `ui-rules` | loads by itself when you design, build or review a screen or a flow; or `/design:ui-rules` |

Русская версия: [README.ru.md](README.ru.md). Catalog: [fntasy studio](../../README.md).

## Install

```
/plugin marketplace add doossee/fntasy-studio
/plugin install design@fntasy-studio
```

Without the plugin system: copy `plugins/design/skills/ui-rules` into `.claude/skills/` of a project or `~/.claude/skills/`.

## ui-rules

46 checkable rules in 10 groups:

| Group | Rules | Examples |
|---|---|---|
| Layout and grouping | 5 | a few simple blocks, grouping by distance, one focal point, alignment, the important first |
| Attention and memory | 6 | progressive disclosure, no facts carried between screens, chunks, messages where the eye is |
| Action and decision | 10 | targets (WCAG, HIG, Material), response within 0.1 s, few ordered options, short forms, keep unfinished work |
| Expectations and consistency | 6 | conventions, the user's words, consistent not uniform, don't change what people know, teach in place, visible navigation |
| States and feedback | 4 | every control state, every screen state, form errors, undo over confirmation |
| Text | 4 | type scale, readable body text, 200% zoom and 320 px, plain words |
| Colour | 3 | contrast, never colour alone, one job per colour |
| Phone, desktop and web | 3 | adapt to the window, touch is not hover, Core Web Vitals |
| Motion | 1 | animate only to explain, short, can be turned off |
| Honesty | 4 | full price and honest choices, engagement without manipulation, data and permissions, judge by what people do |

Each rule has: the rule, why, **how to check** (a number, a yes/no on a screenshot or a step in a task), bad → good on a
fictional product, limits, **evidence strength** (standard, platform guideline, research, extended research, disputed,
heuristic, analogy) and sources. Numbers that are the skill's own choice are marked "(ours)".

Around the rules:

- `method.md` — how a reviewer gets from what they see to a finding, and the report format;
- `severity.md` — scale 1–4, calibrated by frequency, cost of the error and who is affected;
- `taste-vs-defect.md` — the test for a defect, and remarks that are only taste;
- `conflicts.md` — rule against rule and source against source, and how to decide;
- `disputed.md` — ideas that were checked and rejected or narrowed: golden ratio, 60-30-10, F/Z layouts, colour psychology, "7 ± 2" menus, the three-click rule, onboarding carousels, urgency tactics, variable rewards;
- `cases.md` — eight worked cases;
- `sources.md`, `mapping.md` — sources, their order and terms, and where every input went.

Example:

```
Review the checkout at http://localhost:3000/cart with ui-rules: walk "pay for the cart" on a phone, then the review questions of every group.
```

## Sources

**WCAG 2.2 stands above all sources.** After it, by the kind of question: platform convention — Apple Human Interface
Guidelines and Material Design 3; human behaviour — Nielsen Norman Group, then Baymard Institute, Interaction Design
Foundation, Laws of UX, Figma Resource Library; e-commerce — Baymard first; how products usually do it — Mobbin and
Component Gallery. Design principles of public design systems and several articles are secondary sources.

Every rule is written in our own words. Sources are named, not linked: an agent does not follow links, and everything a
rule needs is in the skill. No source text, tables or images are copied or translated.

## What changed since 0.3.0

- Everything of 0.3.0 was removed: skill `design-review`, command `audit`, agent `design-reviewer`, the review gate hook, the measurement scripts and checklists.
- New: skill `ui-rules`. It replaces the intermediate skill `ux-laws` (30 rules on Laws of UX), keeps its corrections, and adds rules from the other sources, evidence strength, conflicts, severity calibration and worked cases.

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
