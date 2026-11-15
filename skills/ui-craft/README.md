# ui-craft

A Claude Code skill for the look of product screens: measurable rules (the floor) and a method for strong screens (the ceiling). Russian: [README.ru.md](README.ru.md).

## Install

Copy this folder to `.claude/skills/ui-craft/` in a project or to `~/.claude/skills/ui-craft/`, or install the `design-skills` plugin that contains it. The skill loads by itself when you design, build or review a screen.

For the measurement script: Node 20+ and Playwright. If Playwright is not installed yet:

```bash
cd scripts && npm install && npx playwright install chromium
```

## Use

- Ask Claude to build, polish or review a screen: it follows `SKILL.md`.
- Ask for "variants" or "a redesign": freedom mode, 2-3 different solutions (`references/16-freedom.md`).
- Measure any page yourself:

```bash
node scripts/measure.mjs https://example.com --widths 1440,390
node scripts/measure.mjs examples/acme-today-good.html examples/acme-today-bad.html --profile examples/design-profile.md
node scripts/measure.mjs --help
```

Per width you get the viewport, the full page, the page with red frames around violations, a blurred "squint" shot and `metrics.json` with nine stop-item counters and the composition figures. `references/11-measure.md` explains every number.

## Files

| File | What |
| --- | --- |
| `SKILL.md` | entry point: modes, screen kinds, order of work |
| `profile.md` | the project profile `design-profile.md`: keys, sections, work without it |
| `references/00-numbers.md` | every number on one page |
| `references/01…10` | floor: spacing, insets, proximity, alignment, typography, desktop, phone, long words, icons, states |
| `references/12…17` | ceiling: composition, data, colour, details, freedom mode, table cell types |
| `references/11-measure.md` | the script |
| `checklist.md` | audit: 9 stop items, questions A-H and K, score |
| `rubric-best.md` | seven criteria 0-4, the independent judge |
| `references/sources.md` | sources and what was not confirmed |
| `examples/` | a clean screen, the same screen with violations, a sample profile |
| `scripts/` | `measure.mjs`, `lib/` |

## Examples

`examples/acme-today-good.html` passes with 0 stop items at all four widths. `examples/acme-today-bad.html` is the same screen with a deliberate violation for every stop item and composition flag; each is named in a CSS comment next to it. Run both to see what the frames and numbers look like.

Works best together with `ux-clarity`, which owns the scenario.
