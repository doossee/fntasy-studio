# Key: pickup/screen.html

Context: a customer of Acme Bakery on a phone (390×844, light theme) standing at or walking to the shop, showing the order code and confirming arrival; used once per order, a few times a week for regulars.

## Defects

1. `#cancel` (.btn-cancel) next to `#here` in the sticky bottom bar: "Cancel order" is the same size (half the bar, 52 px high), filled red and placed first (left), 10 px from "I'm here". One tap cancels at once: no confirmation, no undo; the status turns "Cancelled" and "I'm here" is disabled. A customer reaching for the main action loses the order and waits 5–10 days for the refund. Severity 4.
2. Tip (`.chip[aria-pressed="true"]`, `.notip`, `#total`): 20% is pre-selected, so the "Total charged" of $17.40 already holds a $2.90 tip the customer never chose. The opt-out is an 11 px "No tip" text link (31×15 px) under the chips instead of a chip of equal weight. Customers who skim pay a tip without consent, and the total is below the fold behind the bottom bar. Severity 3.
3. `.item-name` (first item): `white-space: nowrap; text-overflow: ellipsis; max-width: 230px` cuts "Sourdough loaf, sliced, no sesame seeds (allergy)" to "Sourdough loaf, sliced, no ses…" (230 of 353 px visible). The allergy note cannot be checked before collecting, and nothing lets the user expand it. A customer with an allergy cannot confirm the order is safe. Severity 3.
4. `.pickup-time`: "Today, 8:15–8:30 AM" in #b8a993 on the #ffffff card, 2.30:1 (needs 4.5:1; 20 px at weight 600 is not "large text", and it also fails 3:1). This is the main fact of the card besides the code. People with low vision, or anyone outdoors in sunlight, cannot read when to come. Severity 3.
5. `<meta name="viewport" ... maximum-scale=1, user-scalable=no>`: pinch-zoom is disabled. Low-vision users who zoom to read the 11–14 px text (and the faint pickup time) are blocked on browsers that honour the flag. Severity 3.
6. CSS `button:focus, a:focus { outline: none; }` with no replacement style: back, Change, the tip chips, No tip, Cancel and I'm here show no focus indicator. Keyboard and switch-access users cannot tell which control is active, which is dangerous next to the instant Cancel. Severity 3.
7. Small targets: `.change` "Change" is 11 px text in a 40×15 px tap area; `.notip` "No tip" is 31×15 px. Both are far below a 44×44 / 24×24 px target. People with tremor or large fingers miss them or hit the wrong thing. Severity 2.
8. `.price` column: "$4" next to "$7.50" and "$3.00" (inconsistent decimals, so the right-aligned figures do not line up on the decimal point), and for qty 2 it is not clear whether $4 is per croissant or the line total. Slight confusion when checking the bill. Severity 1.

## Style choices only (not defects)

- The lowercase wordmark "acme bakery" in the header, while body copy uses "Acme Bakery". This is brand treatment, and the text is 18 px bold at 16.3:1.
- The order code "B-4827" in a monospace font with 6 px letter-spacing. It is 44 px, #2b1d12 on #ffffff (16.31:1), with no confusable characters (no 0/O, 1/I), so the wide spacing only looks unusual.
