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

52 checkable rules in 12 groups:

| Group | Rules | Examples |
|---|---|---|
| Layout and grouping | 5 | a few simple blocks, grouping by distance, one focal point, alignment, the important first |
| Attention and memory | 4 | progressive disclosure, nothing carried between screens, chunks, messages where the eye is |
| Action and decision | 10 | targets (WCAG, HIG, Material), response within 0.1 s, few ordered options, short forms, keep unfinished work |
| Expectations and consistency | 7 | conventions, the user's words, consistent not uniform, don't change what people know, teach in place, visible navigation, icons |
| States and feedback | 5 | every control state, every screen state, form errors, undo over confirmation, the right channel for each message |
| Text | 5 | type scale, readable body text, 200% zoom and 320 px, plain words, other languages and right-to-left |
| Colour | 4 | contrast, never colour alone, one job per colour, a designed dark theme |
| Phone, desktop and web | 3 | adapt to the window, touch is not hover, Core Web Vitals |
| Motion | 1 | animate only to explain, short, can be turned off |
| Data | 2 | tables people can scan and use on a phone; numbers, units and dates people can check |
| Search | 2 | search that understands people and never dead-ends; filters and sorting that show what is applied |
| Honesty | 4 | full price and honest choices, engagement without manipulation, data and permissions, judge by what people do |

Each rule has: the rule, why (what happens to a person), **how to check** (a number, a yes/no on a screenshot or a step in
a task), thresholds tagged by kind — WCAG, platform guideline, or a team default that a project changes in its profile —
bad → good on a fictional product, limits, conflicts and **evidence strength** (standard, platform guideline, research,
research applied from another field, contested, practice). Rules contain no authors, years or study figures: a reviewer
cites the rule, the WCAG criterion and what was measured, not a name from memory.

Around the rules:

- `method.md` — how a reviewer gets from what they see to a finding, and the report format;
- `profile.md` — the format of a project profile and the default team thresholds, with a fictional example;
- `severity.md` — scale 1–4, calibrated by frequency, cost of the error and who is affected;
- `taste-vs-defect.md`, `labelled-remarks.md` — the test for a defect, and 50 remarks labelled defect, taste or "depends";
- `conflicts.md` — rule against rule, source against source, and ten cases where a rule is wrong;
- `disputed.md` — ideas that were checked and rejected or narrowed: golden ratio, 60-30-10, F/Z layouts, colour psychology, "7 ± 2" menus, the three-click rule, onboarding carousels, urgency tactics, variable rewards;
- `microcopy.md` — interface text, bad and good, in English, Russian, German, Uzbek and Arabic (written by a model; a project should have native speakers check its own strings);
- `examples/` — screen pairs, bad and good, with numbered boxes on the defects and answer keys;
- `tools/measure.mjs` — measures contrast, target sizes, type scale, truncation, reflow at 320 px, field labels, focus and the screen-reader view; needs Playwright; its output is a list of places to look, not findings;
- `cases.md` — worked cases;
- `sources.md`, `mapping.md` — sources, their order and terms, where each rule comes from, which thresholds were checked against the primary pages.

Held-out screens with answer keys for testing a reviewer are in `plugins/design/evals/`; they are not part of the skill.

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

## What changed

**0.5.0**
- Rules rewritten as material a reviewer (or a model) can learn from: no authors, years, study names or study figures in the rules (kept in `sources.md` for people); no "law" labels; thresholds tagged as WCAG, platform or team default; contested effects described as contested.
- Duplicates merged: 46 → 44 rules, then 8 new: icons, message channels, languages and right-to-left, dark theme, tables, numbers and dates, search, filters and sorting — 52 rules in 12 groups.
- New: project profile format, cases where a rule is wrong, labelled remarks, interface text in five languages, example screens with answer keys, a measuring script, and held-out screens for testing a reviewer.

**0.4.0**
- Everything of 0.3.0 was removed: skill `design-review`, command `audit`, agent `design-reviewer`, the review gate hook, the measurement scripts and checklists.
- New: skill `ui-rules`. It replaces the intermediate skill `ux-laws` (30 rules on Laws of UX) and adds rules from the other sources, evidence strength, conflicts, severity calibration and worked cases.

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
