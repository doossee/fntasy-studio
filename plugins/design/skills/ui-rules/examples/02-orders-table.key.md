# Key: 02 orders table (desktop, dark, German)

Screens: `02-orders-table.bad.html`, `02-orders-table.good.html`. Boxes: `02-orders-table.key.jpg`.

## Context (fictional profile)

- **Who:** a back-office clerk of a German shop.
- **Device:** desktop, 1280 × 800, dark theme. Some clerks work with the keyboard only.
- **Task:** find overdue orders and their amounts, then cancel a wrong order.
- **Frequency:** many times a day.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The clerk looks for the order list's sections. They are behind "☰". *Assumed:* the clerk opens the menu every time to switch to Payments or Customers.
2. The clerk looks for overdue orders. Status is a coloured dot only. *Assumed:* clerks with a red-green colour vision deficiency cannot tell overdue from paid. Everyone else must learn the colour code.
3. The clerk compares amounts. Amounts are left-aligned with mixed decimals, and one is cut to "12.340,0…". *Assumed:* the clerk misreads or opens each order.
4. A keyboard user tabs through the rows. Focus lands on "Stornieren" (cancel) with no visible ring. *Assumed:* pressing Enter cancels an order the clerk did not mean to cancel.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `#burger` | Top-level navigation is hidden behind a menu icon on a wide desktop. | 1280 px | EXP-6 | 3: every section switch, all day | Add a visible sidebar with the current section marked. |
| 2 | `td.st` | Status is only a 10 px coloured dot. | — | COLOR-2 (WCAG 1.4.1) | 3: A failure on the main task; overdue orders are what clerks act on | Add a word and an icon: "Überfällig", "Bezahlt", "Offen". |
| 3 | `#sub`, header row | Secondary text is grey on near-black. | 2.96:1 at 12–13 px | COLOR-1 (WCAG 1.4.3) | 3: AA failure on a main screen. The token is shared, so it affects every screen. | Lighten the `text-secondary` token to at least 4.5:1 (the good version reaches 7.2:1). |
| 4 | `#cut` | An amount is truncated to "12.340,0…". | scrollWidth 99 > 96 px | DATA-2 | 3: an amount people check is hidden. On the payment screen the same defect would be 4. | Never truncate amounts. Widen the column or let the table scroll inside its container. |
| 5 | `td.sum` | Amounts are start-aligned, decimals are mixed (1.234,5 € / 89 € / 17,2 €), and digits are proportional. | — | DATA-1 | 2: slows comparison | Align amounts to the end, use tabular figures and one format with two decimals. |
| 6 | `#h-long` (also the customer names) | The fixed-width column clips German compounds: "Lieferadressänderu…", "Gartenbedarf Müller-Lüd…". | scrollWidth 191 > 150 px | TEXT-5 | 2: the column cannot be understood; long names get confused | Allow hyphenation and wrapping. Use a shorter label in the source text. Do not fix column widths for translated text. |
| 7 | `#h-date` | The table is sorted by date, and headers look clickable, but no sort indicator is shown. | — | DATA-1 | 2: the clerk cannot tell the order of rows | Make the header a button with an arrow and `aria-sort`. |
| 8 | `#focused` | Keyboard focus on "Stornieren" is invisible (`outline: none`). | — | STATE-1 (WCAG 2.4.7) | 4: keyboard users cannot see that Enter cancels a paid order | Add a 2–3 px focus ring with at least 3:1 contrast. |

## Taste, not defects

- **Dense rows (about 36 px).** This is a desktop tool used with a mouse, and density is a choice.
- **Monospace order numbers.** Fine either way.
- **No zebra stripes.** The dividers are enough.

## Traps

- **TEXT-3 and PLAT-1 (reflow):** the good version lets the table scroll sideways inside its own container on narrow windows. Data tables are exempt from reflow, so this is not a defect.
- **ACT-1 (targets):** "Details" and "Stornieren" are 28 px high. That passes WCAG 2.5.8, and 44 px is a touch guideline. On this mouse-and-keyboard tool it is not a finding unless the profile says the tool is used on tablets.
- **ACT-3 (few options):** seven columns are not seven choices. Do not count columns as options.

## Not checked

- Whether "Stornieren" asks for confirmation or offers undo (STATE-4).
- The light theme.
- The phone layout.

## Severity calibration

| Defect | Where it appears | Severity |
| --- | --- | --- |
| Invisible focus | A footer link on a marketing page | 2–3 |
| Invisible focus | Here, on a cancel button | 4 |
| Truncated amount | Here, in a list where details are one click away | 3 |
| Truncated amount | A payment confirmation | 4 |
