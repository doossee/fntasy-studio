# Project profile

The rules are general. A project profile tells the reviewer who the people are, what they do, on what devices and in what languages, what the team has already decided, and which team thresholds replace the defaults. Without a profile, the reviewer uses the defaults below and writes "no profile: defaults used" in the report.

The profile lives in the reviewed project, not in this skill: `.claude/design-profile.md`, or a "Design" section of `.claude/review-profile.md`. A real product's profile is never added to this repository.

## Format

Plain Markdown with these sections. Leave out what does not apply; write "unknown" rather than guessing.

1. **Product** — one or two sentences: what it is for.
2. **People and tasks** — roles; for each role, the 3–5 most frequent tasks with frequency (per day, week, month) and the risky tasks (money, data, sending to others, deleting).
3. **Devices and conditions** — phones, desktop, tablets, kiosks; one hand or two; outdoors, in motion, slow networks; the slowest connection to test with.
4. **Languages and locales** — languages, scripts (including right-to-left), the longest language, date, number and currency formats, countries for names and addresses.
5. **Accessibility target** — WCAG 2.2 AA is the floor; any AAA criteria the team adopts; assistive technologies to test with.
6. **Platforms and design system** — iOS, Android, web; the design system and its tokens (colour roles, type scale, spacing scale); themes offered (light, dark, increased contrast).
7. **Brand** — what is fixed (logo, hues, typefaces) and what may adapt (lightness per theme, sizes).
8. **Team principles** — the team's own principles, in its words. When one disagrees with a rule here, the reviewer reports the disagreement and does not decide it.
9. **Decisions already taken** — each with its date, reason and known cost. A recorded decision is not a defect.
10. **Thresholds** — values that replace the defaults below, each with a reason.
11. **Out of scope** — screens, states or platforms the review should not cover, and why.

## Default thresholds

Numbers tagged `profile:` in the rules. They are team choices that make a rule checkable, not norms: crossing one is a reason to look, and becomes a finding only when the harm is shown (`severity.md`). Requirements from WCAG and platform guidelines are not in this table and cannot be changed by a profile.

| Key | Default | Rules |
| --- | --- | --- |
| `act.compare-first` | 5 | ACT-3 |
| `act.danger-gap` | 16 px | ACT-1 |
| `act.first-screen-actions` | 5 | ACT-3 |
| `act.frequent-depth` | 1 tap | ACT-4 |
| `act.frequent-tasks` | 3–5 | ACT-4 |
| `act.list-search-from` | 10 items | ACT-3 |
| `act.progress-from` | 3 steps | ACT-5 |
| `act.repeat-request-after` | 1 day | ACT-8 |
| `act.target-web` | 44 px | ACT-1 |
| `data.row-height` | 40 px desktop, 48 px touch | DATA-1 |
| `exp.breadcrumb-depth` | 3 levels | EXP-6 |
| `exp.compare-products` | 5 | EXP-1 |
| `honest.cancel-parity` | same channel, no more steps | HONEST-1 |
| `honest.delete-steps` | 3 | HONEST-3 |
| `honest.test-round` | 5 | HONEST-4 |
| `layout.answer-zone` | top 50 % | LAYOUT-5 |
| `layout.group-gap-ratio` | 2 | LAYOUT-2 |
| `layout.max-blocks` | 7 | LAYOUT-1 |
| `layout.spacing-scale` | 4, 8, 12, 16, 24, 32, 48, 64 px | LAYOUT-4 |
| `mem.chunk-string` | 8 characters | MEM-3 |
| `mem.disclosure-depth` | 2 | MEM-1 |
| `mem.form-section` | 6 fields | MEM-3 |
| `mem.paragraph-lines` | 5 lines | MEM-3 |
| `mem.unseen-items` | 4 | MEM-2 |
| `motion.frequent-max` | 300 ms | MOTION-1 |
| `state.stress-items` | 200 | STATE-2 |
| `state.text-expansion` | 1.4 × | STATE-2, TEXT-5 |
| `state.toast-min` | 5 s, and paused while focused | STATE-5 |
| `state.undo-visible` | 10 s, or until the next action | STATE-4 |
| `text.body-web` | 16 px | TEXT-2 |
| `text.line-height` | 1.4 | TEXT-2 |
| `text.max-sentence` | 20 words | TEXT-4 |
| `text.max-sizes` | 5 | TEXT-1 |
| `text.measure` | 45–75 characters | TEXT-2 |
| `text.min-step` | 2 px | TEXT-1 |

## Example (fictional)

```markdown
# Design profile: Acme

## Product
Orders and payments for small shops: a phone app for staff and couriers, a web dashboard for owners.

## People and tasks
- Sales clerk (phone, Android, in the shop): new order — 40 a day; record payment — 30 a day;
  find a customer — 20 a day. Risky: refund, cancel order.
- Courier (phone, one hand, outdoors, often 3G): mark delivered — 60 a day; open route — 10 a day.
  Risky: mark delivered on the wrong order.
- Owner (web, laptop 1280–1440 px): today's takings — daily; export payments — weekly;
  send a promotion to all customers — monthly. Risky: promotion to all customers, refunds.

## Devices and conditions
Android phones 360–412 px wide, many with large system text. Slowest connection: 3G.

## Languages and locales
Uzbek (Latin), Russian, English. Longest: Uzbek. Currency UZS without decimals;
dates DD.MM.YYYY; 24-hour clock. No right-to-left languages yet.

## Accessibility target
WCAG 2.2 AA. Adopted AAA: 2.5.5 target size on the courier screens.

## Platforms and design system
Android app and web. Tokens: colour by role, type scale 12/14/16/20/28, spacing 4/8/12/16/24/32.
Themes: light and dark, following the system.

## Brand
Hue fixed (green); lightness may change per theme. One typeface, system fallback.

## Team principles
"The courier never needs two hands."

## Decisions already taken
- 2026-03: no tablet layout this year (few tablets in use; cost: owners on tablets get the phone layout).

## Thresholds
- act.target-web = 48 px (couriers wear gloves in winter).
- act.first-screen-actions = 3 on the courier screens (one-handed use, in motion).
- state.text-expansion = 1.5 × (Uzbek strings are long).

## Out of scope
The printed receipt.
```
