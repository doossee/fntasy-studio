# design — a plugin of the fntasy studio catalog

Designing and reviewing interface screens and flows: rules of what must not go wrong, a process for making screens
strong, a reviewer, a designer and a blind judge.

| Adds | Called as |
|---|---|
| skill `ui-rules` | 53 checkable UI/UX rules; `/design:ui-rules`, or loaded by the agents |
| skill `ui-create` | how to design: intent, visual system, variants, craft pass, self-check; `/design:ui-create` |
| agent `design-reviewer` | independent review of screens or a flow against `ui-rules`: verdict, findings, severity |
| agent `designer` | designs a screen from a brief: intent, system, 2–3 variants as HTML, self-checked |
| agent `design-judge` | blind scoring of variants with the `ui-create` rubric |

The skills rarely load by themselves on a plain question (see "Testing"): call them by name or use the agents.

Русская версия: [README.ru.md](README.ru.md). Catalog: [fntasy studio](../../README.md).

## Install

```
/plugin marketplace add doossee/fntasy-studio
/plugin install design@fntasy-studio
```

Without the plugin system: copy `plugins/design/skills/ui-rules` and `plugins/design/skills/ui-create` into `.claude/skills/` of a project or `~/.claude/skills/`, and the files of `plugins/design/agents/` into `.claude/agents/`.

## ui-rules

53 checkable rules in 12 groups:

| Group | Rules | Examples |
|---|---|---|
| Layout and grouping | 5 | a few simple blocks, grouping by distance, one focal point, alignment, the important first |
| Attention and memory | 4 | progressive disclosure, nothing carried between screens, chunks, messages where the eye is |
| Action and decision | 10 | targets (WCAG, HIG, Material), response within 0.1 s, few ordered options, short forms, keep unfinished work |
| Expectations and consistency | 8 | conventions, the user's words, consistent not uniform, don't change what people know, teach in place, visible navigation, icons, the least experienced person in the audience |
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

## ui-create

The other half of design: making a screen people understand at once and that looks like it belongs to this product.
Correct is the floor (that is `ui-rules`), not the goal.

- `SKILL.md` — the process: brief and profile → intent in five lines (the screen's question, three levels of content,
  the leading element, the reading path, the screen's move) → a small visual system as tokens → 2–3 variants on named
  axes → craft pass → self-check against `ui-rules` and its measuring script → blind judgement → hand-over.
- `references/system.md` — type scale, spacing, colour roles per theme, one depth strategy, radius, icons, motion.
- `references/variants.md` — axes (density, what leads, layout model, disclosure, tone, guidance) and how to tell that variants really differ.
- `references/craft.md` — the craft pass: hierarchy, composition, typography, colour, data, details.
- `references/generic-look.md` — signs of the template look and what to do instead.
- `references/systems-learned.md` — what strong public design systems do, in our words.
- `rubric.md` — six criteria of strength (hierarchy, composition, typography, data, character, craft) with the `ui-rules` floor as a gate; scored blind.
- `examples/` — one screen before and after the process, with every change and its reason.

## Agents

- `design-reviewer` — reviews screens (URL, HTML, screenshots) with fresh eyes: walks the tasks, measures, returns
  accept / revise / return with findings, severity and the smallest fix. It ignores the author's own assessment.
- `designer` — designs from a brief: intent, system, variants as self-contained HTML, craft pass, self-check, hand-over.
- `design-judge` — scores screenshots under neutral names with the rubric, without knowing who made which; run it two or three times for a mean.

The agents preload the skills they need (`skills:` in their frontmatter).

## Testing

- `skills/ui-rules/evals/` — four test cases in the format of `claude plugin eval` (run from the skill folder:
  `claude plugin eval . --allow-tools Write,Edit,Bash --scaffold`; these are real, billed model runs).
- Comparison with and without the skill: 98% against 85% of the checks passed in the first round (one run each), 97% against 84% in the second (two runs each, graded blind). The skill helped
  most in separating taste from harm and in finding problems that show only when controls are used; obvious defects on
  a screen the model finds without it. It costs about a minute and 30k tokens more per task.
- Automatic loading: in a test of 20 requests the skill never loaded where it should not, but loaded on only about
  one in ten requests where it should; the model answers design questions itself. Use the agents or call the skills by name.
- `evals/` — held-out screens with answer keys from the first evaluation of `ui-rules` 0.5.0 (`evals/results-2026-11-24.md`).
- End-to-end check (`evals/e2e-2026-11-24/`): on one brief, two blind `design-judge` runs ranked the three `designer` variants above the page the same model made without the plugin (means 19.75, 19 and 18 against 15.75 of 24, same order from both judges). `design-reviewer` returned "revise" for both pages with two severity-3 findings each; the designer's were about page logic after actions, which its self-check now covers. The judges use the rubric the designer works towards, so this shows the process is followed, not that people prefer the result.

## Sources

**WCAG 2.2 stands above all sources.** After it, by the kind of question: platform convention — Apple Human Interface
Guidelines and Material Design 3; human behaviour — Nielsen Norman Group, then Baymard Institute, Interaction Design
Foundation, Laws of UX, Figma Resource Library; e-commerce — Baymard first; how products usually do it — Mobbin and
Component Gallery. Design principles of public design systems and several articles are secondary sources.

Every rule is written in our own words. Sources are named, not linked: an agent does not follow links, and everything a
rule needs is in the skill. No source text, tables or images are copied or translated.

## What changed

**0.7.0**
- Taste: five axes (calm–expressive, dense–spacious, strict–playful, neutral–brand-led, conventional–novel) in the project profile, a default taste, "familiar first", and fourteen widely known products (Google, GOV.UK, YouTube, Uzum Market, Yandex Go, Apple, Airbnb, Duolingo, Headspace, Netflix, Spotify, Uber, Linear, Figma) observed on their public pages and grouped into six taste families (`ui-create/references/taste.md`, `taste-references.md`). The judge scores character against the product's taste.
- Profile: a section on the audience's experience — age range, how experienced, which products they use every day.
- `ui-rules` EXP-8: design for the least experienced person in the audience (research on age and experience). Conflict C-19. 53 rules.
- New held-out set `evals/holdout-2/`; second with/without comparison (two runs each, blind): 97% against 84%.

**0.6.0**
- New skill `ui-create`: the process of designing a strong screen, a visual-system guide, variants, a craft pass, the template look to avoid, what public design systems do, a blind rubric and a before/after example.
- New agents: `design-reviewer` (preloads `ui-rules`), `designer` (preloads `ui-create` and `ui-rules`), `design-judge` (blind, preloads `ui-create`).
- `ui-rules`: every rule marked UI, UX or both; description rewritten; four test cases in the `claude plugin eval` format; first comparison with and without the skill; `measure.mjs` now reports controls that look clickable but cannot take focus.

**0.5.0**
- Rules rewritten as material a reviewer (or a model) can learn from: no authors, years, study names or study figures in the rules (kept in `sources.md` for people); no "law" labels; thresholds tagged as WCAG, platform or team default; contested effects described as contested.
- Duplicates merged: 46 → 44 rules, then 8 new: icons, message channels, languages and right-to-left, dark theme, tables, numbers and dates, search, filters and sorting — 52 rules in 12 groups.
- New: project profile format, cases where a rule is wrong, labelled remarks, interface text in five languages, example screens with answer keys, a measuring script, and held-out screens for testing a reviewer.
- First evaluation (`evals/results-2026-11-24.md`): two independent reviewers found 26 and 22 of 26 planted defects, with no traps hit; where they disagreed, the rules were clarified.

**0.4.0**
- Everything of 0.3.0 was removed: skill `design-review`, command `audit`, agent `design-reviewer`, the review gate hook, the measurement scripts and checklists.
- New: skill `ui-rules`. It replaces the intermediate skill `ux-laws` (30 rules on Laws of UX) and adds rules from the other sources, evidence strength, conflicts, severity calibration and worked cases.

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
