# Lists and tables on a phone

A list is the most frequent screen. It is scanned top to bottom, not read.

Examples use the fictional product Acme Orders (see `00-audience.md`).

## LIST-1. No horizontal page scroll

**Rule.** At 390 px (and at 320 px) the page does not scroll sideways. A wide table turns into a list of card rows; if the table stays a table, only the table scrolls and its first column is pinned.

**Why.** Double scrolling loses context: it is unclear whose row this is (NNG-TABLE). Working without horizontal scroll at 320 px is a requirement of WCAG-1.4.10.

**How to measure.** `document.documentElement.scrollWidth - window.innerWidth` equals 0 at 390 and at 320 px. The measuring script (SKILL.md → Screenshots and measurements) writes this number to `metrics.json` (`overflowX`); run it with `--widths 390,320`.

**Bad → Good.** A payments table of eight columns runs off the screen → a row: customer and amount on top, date and method below.

Sources: NNG-TABLE, WCAG-1.4.10.

## LIST-2. A row is one thing, the whole row is pressable

**Rule.** A list row opens the object by a press anywhere in it. A row has no more than one separate action (a button or "⋯"). Row height ≥ 56 px.

**Why.** A large target means a fast and accurate hit (LAW-FITTS). This is how the chat and transfer lists familiar to the audience work (LAW-JAKOB, AUD-2).

**How to measure.** Press the empty area of a row to the right of the name: the card opened. Count the buttons inside a row: ≤ 1. Row height at 390 px ≥ 56 px.

**Bad → Good.** Only the name is pressable (188 × 20 px), the rest of the row is dead → the whole row is a link.

Sources: LAW-FITTS, LAW-JAKOB.

## LIST-3. A row holds the name and no more than two details

**Rule.** The first line is what the eyes search by (customer name, order number), bolder than the rest. Below it: no more than two lines of details. Attributes stand in the same places in all rows.

**Why.** A list is compared vertically: when an attribute is always in the same place, the eye goes in a straight line (NNG-CARDS, NNG-F).

**How to measure.** In a list row at 390 px count the lines of text: 1 main + ≤ 2 secondary. Run the eye down the right edge: the same attribute (amount, status) is there in all rows.

**Bad → Good.** Customer, order number, phone, sales manager, warehouse, total, status, date in every row → customer name; order number; total on the right.

Sources: NNG-CARDS, NNG-F.

## LIST-4. Search above a long list, recent items before the search

**Rule.** If a list can have more than 20 rows, a search field by name and phone is visible above it. Where a person picks someone for an action (payment, new order), likely candidates are shown before any input: those who owe, recent ones.

**Why.** Recognizing in a list is easier than recalling and typing (NNG-RECALL). The threshold 20 is a norm of this skill: that many rows fit in about three phone screens.

**How to measure.** Above every long list (in Acme Orders: customers, orders, deals, payments) there is a search field visible without scrolling. In the customer picker for a payment a list of ≥ 1 candidate is shown before input. The search finds by part of a name and by the last digits of a phone.

**Bad → Good.** An empty field "Find a customer" → "Overdue" and "Recent" under the field; most often the needed person is already in the list.

Sources: NNG-RECALL, BAY-AUTOCOMPLETE.

## LIST-5. Status is a word and in its own place

**Rule.** A status (Paid, Overdue, Draft, Shipped, On hold) is written as a word; color only reinforces it. An amount owed is shown with a word ("Overdue", "Owes") and the amount, not only by red color or a minus sign.

**Why.** Color cannot be the only carrier of meaning (WCAG-1.4.1); a red number without a word is read both ways, "owes" or "overpaid" (NNG-ERROR).

**How to measure.** Take a greyscale screenshot (or read the screen without color): the status of every row is clear. Every owed amount has a word next to it.

**Bad → Good.** "−$1,250.00" in red → "Overdue $1,250.00".

Sources: WCAG-1.4.1, NNG-ERROR.

## LIST-6. Few filters in view

**Rule.** No more than three filters are visible at once (usually status tabs and search); the rest sit behind one "Filters" button. The selected filter is visible and resets in one tap.

**Why.** A filter is useful only if it is about an attribute people really search by; every extra one is a cost of choice (LAW-HICK, NNG-DISCLOSE).

**How to measure.** Above the list at 390 px count the filtering elements other than the search field: ≤ 3 plus "Filters". With a filter on, it is visible which one is on, and there is a "Reset".

**Bad → Good.** Status tabs, "Manager: all", "Filters", "Sort", "View" in two rows → status tabs and "Filters".

Sources: LAW-HICK, NNG-DISCLOSE.

## LIST-7. Money is read in one glance

**Rule.** Amounts have a digit-group separator and the currency sign or word, digits of equal width, and are right-aligned in a list. Minor units (cents) follow one app-wide rule: not shown where the currency's minor unit is not used in practice or every amount is whole; otherwise always shown with two digits.

**Why.** Numbers are compared by length and digit groups; aligned digits are compared without reading (NNG-NUMERAL, NNG-CARDS).

**How to measure.** In a list the amounts stand at the right edge of the row; `$12,480.00`, not `12480` or `12480.0`; one format in every row.

**Bad → Good.** "12480.00 USD" → "$12,480.00".

Sources: NNG-NUMERAL, NNG-CARDS.
