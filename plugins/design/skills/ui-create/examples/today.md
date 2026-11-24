# Worked example: the "Today" dashboard

The same screen twice. `today.before.html` is correct: it passes the `ui-rules` floor (no contrast, target or reflow failures). But it has the template look. `today.after.html` is the same data and the same functions after the `ui-create` process. Screenshots: `today.before.png`, `today.after.png` (1280 px, light), `today.after-dark.png` (1280 px, dark), `today.after-390.png` (390 px, light, full page).

Everything here is fictional.

## Brief

- **Who:** the owner of a small Acme bakery shop.
- **Device and frequency:** a laptop at 1280–1440 px, opened several times a day. Sometimes a phone.
- **Task:** start the day, and come back between customers to see what needs action. The owner acts: collects unpaid orders, chases late deliveries, restocks.
- **Data on the screen:**
  - takings and comparison;
  - order count, average order, customers;
  - today's orders with payment and delivery state;
  - stock levels.
- **Functions:**
  - view all orders;
  - manage products;
  - the main navigation.
- **Brand:** the name "Acme" only. Hue, typeface and tone are free.

## Intent

1. **Question:** what needs me today?
2. **Content in three levels:**
   - must see: the things to act on, and how the day is going;
   - findable: today's orders;
   - one step away: all orders and products.
3. **Leading element:** the list "4 things need you today". It is numbered, each item has its action, and it sits at the top left at the largest text size after the takings.
4. **Reading path:**
   - the heading;
   - the first problem and its button;
   - the next problems;
   - the takings at the right;
   - the orders table below.
5. **The screen's move:** the dashboard is a to-do list, not a scoreboard. Every problem the data shows becomes one line with a reason and a button. Numbers that need no action move to a quiet side column.

## System (tokens)

| Token | Light | Dark | Role, contrast |
| --- | --- | --- | --- |
| `--surface-page` | #f6f5f2 | #151513 | Page; warm neutral ramp |
| `--surface-raised` | #ffffff | #1f1e1b | Secondary buttons |
| `--text-primary` | #1c1b19 | #ecebe7 | 15.8:1 / 15.3:1 on page |
| `--text-secondary-c` | #5c5a55 | #aeaba4 | 6.3:1 / 8.0:1 |
| `--line-divider` | #e3e0da | #33322e | Rows; decorative, no contrast requirement |
| `--line-border` | #8f8b84 | #7a776f | Button borders, 3.1:1 / 4.1:1 |
| `--accent` | #1d5c4b | #7fc7b0 | Primary action. White on it is 7.8:1; dark text on the dark-theme accent is 7.8:1 |
| `--error` | #a12b1f | #f2a196 | Unpaid, out of stock. 6.7:1 / 9.0:1 |
| `--warning` | #8a5300 | #f0c27a | Late, low stock. 5.8:1 / 11.1:1 |
| `--success` | #2f6b2a | #9fd39a | Positive comparison. 5.9:1 / 10.7:1 |
| Type | 13 / 14 / 16 / 20 / 28 / 40 px | — | caption, secondary, body, unit, heading, display |
| Space | 4 / 8 / 12 / 16 / 24 / 32 / 48 px | — | inside / between / sections |
| Radius | 6 (controls), 10 (cards) | — | — |
| Depth | borders and dividers only | — | the same in both themes |
| Motion | none needed | — | — |

Contrast values were computed with the WCAG formula.

## What changed and why

1. **The gradient header with a centred welcome is gone.** It took the top of the screen to say nothing about the day. In its place is a quiet bar and the date. References: `generic-look.md` (gradient, everything centred, placeholder copy); `craft.md` (quiet the frame).
2. **The leading element is now "4 things need you today".** The before screen spread the same facts over red and amber badges in a table and a stock card, so the owner had to find them. References: intent; `craft.md` (one leader); `ui-rules` LAYOUT-3, LAYOUT-5.
3. **Each problem is one line** with a kind label, a plain statement, a reason, and one button: "Send reminders", "Call courier", "Restock". Before, the screen showed states and gave no next step. References: `ui-rules` ACT-4, STATE-2; `craft.md` (show the exception).
4. **Unpaid orders are grouped into one line with the total** ($139.89, three orders), instead of three red pills. References: `ui-rules` MEM-3; `craft.md` (every number has a job).
5. **The four equal stat tiles became one large takings number plus a short list.** The number has a smaller unit and a comparison with last Tuesday; the other figures are a quiet definition list. The tiles had made four numbers equally loud and compared them with nothing. References: `generic-look.md` (stat tiles); `craft.md` (large numbers get care); `ui-rules` DATA-2.
6. **Composition is asymmetric: 2 : 1.** The action list is the wide column; the numbers are the narrow one, separated by one line and not by a card. Before, everything sat in equal shadowed cards. References: `craft.md` (importance sets size; space before lines, lines before boxes).
7. **Depth is borders and dividers only.** The before screen used shadows, rounded cards and a tinted page together. References: `system.md` (one depth strategy).
8. **Type went from 3 sizes to 6, each with a role.** Before, almost all text was 14 px grey with one 24 px heading. After: 40 display, 28 heading, 20 unit, 16 body, 14 secondary, 13 caption. References: `system.md` (type); `ui-rules` TEXT-1.
9. **Tabular figures and end-aligned totals in the table**, and a slot column added. Before, numbers were centred and proportional, and every column was centred. References: `ui-rules` DATA-1; `craft.md` (align for comparison).
10. **Status pills became a dot plus a word**, coloured only for states that need action ("Unpaid", "Late"). Neutral states stay grey. Before, every cell had a coloured pill. References: `generic-look.md` (badges on everything); `ui-rules` COLOR-2, COLOR-3.
11. **The colour system is a warm neutral ramp with one deep green accent**, used only for the primary action and the current tab. Before, purple sat on the header, buttons and icons, plus four badge colours. References: `system.md` (colour roles); `ui-rules` COLOR-3.
12. **The emoji and the circle-icon tiles were removed.** References: `generic-look.md`.
13. **The dark theme was designed, not darkened.** Surfaces are warm greys; the accent is lightened to a mint with dark text on it; error and warning are lightened. Before, the dark theme used near-black, heavy shadows, and badge colours left at their light values. References: `ui-rules` COLOR-4.
14. **The "View all orders" button became a link beside the table heading.** "Manage products" became the "Restock" actions where stock is the problem. References: `ui-rules` ACT-4.
15. **On the phone, problem buttons sit under their text.** The orders table scrolls inside its own container with the first column fixed, so no column is dropped. References: `ui-rules` DATA-1, PLAT-1, conflict C-18.
16. **All targets are at least 44 px high**, including tab links and "All orders". References: `ui-rules` ACT-1.
17. **Every focusable element has a visible focus ring in the accent colour.** References: `ui-rules` STATE-1.

## Floor check

Measured with `ui-rules/tools/measure.mjs` at 320 (always measured), 390 and 1280 px, in light and dark.

| | Before | After |
| --- | --- | --- |
| Text below its contrast minimum | 0 in all 6 runs | 0 in all 6 runs |
| Targets failing WCAG 2.5.8 | 0 | 0 |
| Targets under 44 × 44 | 7 of 7 (nav pills and buttons, 36–37 px high) | 0 of 11 |
| Horizontal page scroll at 320 px | no (after giving the grid items `min-width: 0` and the table its own scroll) | no |
| Truncated text | 0 | 0 |
| Focus stops without a visible change | 0 of 7 | 0 of 11 |
| Clickable but not reachable by keyboard | 0 | 0 |
| Distinct font sizes | 3 (24, 14, 12) at 1280 px | 6 (40, 28, 20, 16, 14, 13) |
| Spacing values off the 4 px grid (low confidence) | 148 of 294 | 21 of 217 |

Notes on the floor check:
- In the before screen, the script could not compute contrast for the nav links on the gradient; it marks them "measure by eye". By hand, white on the gradient darkened by the 22% black pill stays well above 4.5:1.
- In both screens most characters are 14 px, which is table and secondary text. Running text in the after screen is 16 px (TEXT-2, conflict C-11).

## Rubric (`rubric.md`)

These are author's scores, not independent ones. A blind judge with neutral names is the next step.

| Criterion | Before | After | Ground |
| --- | --- | --- | --- |
| Hierarchy | 1 | 3.5 | Before: the gradient and the four equal tiles lead, and the problems are scattered pills. After: on a squint, the heading and the first red line lead, and the takings are the second mass. |
| Composition | 1 | 3 | Before: equal cards, all centred. After: a 2 : 1 split, shared left edges, space and lines instead of boxes. Below the list, the table starts under the fold at 800 px. |
| Typography | 1 | 3 | Before: everything 14 px. After: six sizes with roles, tabular figures, the unit smaller than the takings. |
| Data and content | 1.5 | 3 | After: each problem has a total and a reason, and the takings have a comparison. Still no empty or "nothing needs you" state shown. |
| Character | 0.5 | 2.5 | Before: kit look, emoji, gradient. After: a calm warm palette and a to-do framing that fits a bakery owner's day. Little brand presence beyond that. |
| Craft | 2.5 | 3 | One system and states everywhere. The nav overflows at 390 px and scrolls sideways inside the bar. |
| **Total** | **7.5 / 24** | **18 / 24** | |

## Unsure or not done

- **The phone nav.** At 390 px, the five tab links overflow and scroll inside the bar ("Settings" is cut at the edge). A bottom tab bar or "More" would be better on a phone app. On the web the scroll is acceptable, but it was not designed further.
- **Missing states.** The "nothing needs you today" state and a loading state are not built. Both are needed before this goes to a product (`ui-rules` STATE-2).
- **The "Send reminders" action** assumes the product can send payment reminders. That is a capability question for the owner of the product, not a design given.
