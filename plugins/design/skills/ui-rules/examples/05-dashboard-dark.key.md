# Key: 05 shop dashboard (desktop, dark, Uzbek Latin)

Screens: `05-dashboard-dark.bad.html`, `05-dashboard-dark.good.html`. Boxes: `05-dashboard-dark.key.jpg`.

The Uzbek strings were written by a model and not checked by a native speaker.

## Context (fictional profile)

- **Who:** a shop owner on the shop's first day: no orders yet, and a payout sync has just failed.
- **Device:** desktop, 1280 × 860, dark theme.
- **Frequency:** the dashboard is opened several times a day.
- **Main question:** "How much did I take today, and is anything wrong?"

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The owner opens the dashboard. Three bright blue buttons with red "Yangi!" (New!) tags pull the eye first. *Assumed:* the owner reads them before anything else.
2. The owner looks for today's takings. There are eleven cards of three heights in a masonry grid. Takings are the last card, bottom right. *Assumed:* the owner scans the whole page every time.
3. A grey "Xatolik yuz berdi" (An error occurred) appears at the bottom left and is meant to fade. *Assumed:* the owner misses it or cannot tell what failed. The failed payout stays unknown.
4. The "Oxirgi buyurtmalar" (recent orders) card is blank. *Assumed:* the owner wonders whether it is loading or broken, and gets no hint how to get a first order.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `#toast` | A payout sync failure is shown only as a vague, auto-hiding toast far from any payout information. | — | STATE-5 (also MEM-4) | 3: money at stake; the owner does not learn what failed | Show a persistent banner that says what failed, whether money is safe, and offers "Retry". |
| 2 | `#revenue` | Today's takings are the last card, the same size as everything else. | — | LAYOUT-5 | 2: a frequent search the owner recovers from alone | Put takings and unpaid orders first and larger. |
| 3 | `#grid` | Eleven cards of three heights in a masonry grid, with no clear blocks. | 11 blocks; the profile default limit is 7 | LAYOUT-1 | 2 | Use three key figures in one row and two rows below. Move news and promotions elsewhere. |
| 4 | `#actions` | Three filled accent buttons, each with a red "Yangi!" badge. | 3 prominent buttons | LAYOUT-3 | 2 | Use one primary ("Yangi buyurtma") and one secondary button. Drop the badges. |
| 5 | `#recent` | An empty card on the first day with no message and no next step. | — | STATE-2 | 2: first-day owners get no guidance | Explain that no orders exist yet. Offer "Yangi buyurtma" and "Havolani nusxalash" (copy shop link). |
| 6 | `.c a` | "Batafsil" (details) links in saturated blue on black. | 3.19:1 at 13 px | COLOR-1 (WCAG 1.4.3) | 3: AA failure on a main screen | Use a lighter, less saturated blue (the good version reaches 9.6:1). |
| 7 | `.c.t2` and other cards | Black cards on a black page with a black shadow. Cards have no visible edge, and groups merge. | Card and page are both #000 | COLOR-4 | 2 | Raise surfaces with lighter greys (page #141417, card #1E1E23) and a 1 px border. |
| 8 | `#actions button:nth-child(2)` | "Mahsulot qoʻshish" overflows its button and collides with the badge. | scrollWidth 149 > 143 px | TEXT-5 | 1: visible collision, task unaffected | Let buttons size to their label. Do not fix widths for translated text. |
| 9 | Code only, no box | Gaps of 10, 14, 18, 22 and 26 px; none on the 4/8 px scale of the profile. | — | LAYOUT-4 | 1 | Use 8, 16 and 24 px from the scale. |

## Taste, not defects

- **Short uppercase card titles at 11 px.** They are short labels with 11:1 contrast. Capitals are a defect only in passages (TEXT-2).
- **Very dark backgrounds.** A choice. Defect 7 is about the missing edges, not the darkness.
- **No charts on the dashboard.** A product choice.

## Traps

- **EXP-6 and the nine sidebar items:** the "four or five" limit is for phone tab bars. A labelled, visible desktop sidebar with nine items is fine.
- **Zeros on day one:** these are correct values. The defect is the blank card without guidance (5), not the zeros.
- **The Uzbek letter ʻ (U+02BB, as in "Toʻlovlar"):** it is correct. Replacing it with an apostrophe is not a fix.

## Not checked

- The light theme.
- Keyboard focus.
- Narrow windows.
- The screen reader announcement of the error.

## Severity calibration

| Defect | Where it appears | Severity |
| --- | --- | --- |
| A vague, auto-hiding error toast | Failure to save a theme colour | 2 |
| A vague, auto-hiding error toast | Here, a failed payout sync | 3 |
| A vague, auto-hiding error toast | A card charged twice | 4 |
