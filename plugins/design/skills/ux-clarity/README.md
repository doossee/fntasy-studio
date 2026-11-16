# ux-clarity

A Claude Code skill for interface clarity: will a new user understand the screen the first time, on a phone, without an explanation. 69 countable rules and a 54-question audit with a score. Russian: [README.ru.md](README.ru.md).

## Install

Copy this folder to `.claude/skills/ux-clarity/` in a project or to `~/.claude/skills/ux-clarity/`, or install the `design` plugin from the `fntasy-studio` catalog that contains it. The skill loads by itself when you design, change or review a screen.

For the measurement script: Node 20+ and Playwright. If Playwright is not installed yet:

```bash
cd scripts && npm install && npx playwright install chromium
```

## Use

- Ask Claude to design or change a screen, a form, a list, navigation: it follows `SKILL.md`.
- Ask "is this screen clear?" or "can we show it to a customer?": it shoots the screen, walks `checklist.md` and reports the score, the stop items and the violations sorted by harm.
- Measure any page yourself:

```bash
node scripts/measure.mjs https://example.com
node scripts/measure.mjs examples/acme-payment-good.html examples/acme-payment-bad.html --profile examples/design-profile.md
node scripts/measure.mjs --help
```

Per width (390 and 1440 by default) you get the first screen, the full page, the first screen with findings in red and `metrics.json`: sideways scroll, touch targets under 44 px, crowded targets under 24 px, text under 12 px, primary buttons, labels cut or wrapped to three lines.

## Files

| File | What |
| --- | --- |
| `SKILL.md` | entry point: order of work, the script, what is not allowed |
| `profile.md` | the project profile `design-profile.md`: keys, sections, work without it |
| `references/00-audience.md` | who the user is and how to read that from the profile |
| `references/01…09` | navigation, primary action, forms, lists on a phone, states, feedback and undo, copy, touch, first run |
| `checklist.md` | 54 yes/no questions, score, threshold, protocol |
| `references/sources.md` | sources and numbers that were not confirmed |
| `examples/` | a clear form, the same form with violations, a sample profile |
| `scripts/` | `measure.mjs`, `lib/` |

## Examples

`examples/acme-payment-good.html` is a payment form that passes the countable checks. `examples/acme-payment-bad.html` is the same form with deliberate violations, each named in a CSS comment next to it.

Works best together with `ui-craft`, which owns how the screen looks.
