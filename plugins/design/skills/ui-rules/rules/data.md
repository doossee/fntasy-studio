# Data

Tables, lists of records and the numbers inside them: what people scan, compare, check and act on. A table is often the main screen of a business product; a wrong-looking number costs more than an ugly one.

## Review questions

- Can people find a row, compare values down a column and act on a row without losing their place?
- Do numbers line up, carry their units and show the precision people need, in the person's locale?
- What happens to the table at 390 px and at 200% zoom?
- Is any amount, date or identifier cut, rounded away or shown without its unit?

## DATA-1. Make tables people can scan, compare and act on, on every screen

**Rule.** Columns are ordered by importance, with the column that identifies the row first. Text is start-aligned, numbers are end-aligned with tabular figures and the same number of decimals, and column headers align with their content. Headers stay visible while scrolling long tables. Sortable columns show that they can be sorted and which way they are sorted. Row actions sit in a consistent place, and the whole row is not a hidden link next to visible buttons. On narrow windows the table keeps its key columns and lets the rest scroll inside the table, or turns rows into cards with the same fields in the same order.

**Why.** People use tables to look up one row and to compare values down a column. Numbers aligned by their last digit can be compared at a glance; misaligned ones must be read one by one. A table squeezed into a phone by hiding columns silently removes the data someone came for.

**How to check.**
- Order of columns: the identifier first, then what people check most.
- Alignment: numbers aligned so their last digits line up (the right edge of the numbers, in right-to-left tables too, because digits run left to right), with the same decimals; text start-aligned; headers aligned like their column.
- Tabular figures: digits of equal width (`font-variant-numeric: tabular-nums` or a font with tabular digits).
- Scroll a long table: headers stay; the first column stays when the table scrolls sideways.
- Sorting: the sorted column and direction are visible; sorting is available from the keyboard; the sort holds after going back.
- Row actions: in one place on every row, reachable by keyboard; destructive actions are not one click from the row (ACT-1, STATE-4).
- At 390 px and at 200% zoom: key columns visible; other columns reachable; nothing cut (TEXT-3).
- Data tables have real header cells, so a screen reader announces the header with each value.

**Thresholds.** Table structure is exposed to assistive technology [WCAG 1.3.1 A]; two-dimensional tables are exempt from reflow but not from zoom [WCAG 1.4.10 AA]; row density [profile: data.row-height = 40 px desktop, 48 px touch].

**Bad → Good.** Acme's payments table centres every column, shows amounts as "1200", "85.5" and "1,000.00", hides the "Status" column on phones and makes the whole row open the payment while a "Refund" button sits inside it → amounts end-aligned as "1,200.00", "85.50", "1,000.00" with tabular digits; on phones each payment is a card with customer, amount and status; the row opens with a visible "Open" link and "Refund" lives on the payment screen.

**Limits.** Dense tables for experts may use smaller text and tighter rows (C-11). Very small tables (two or three rows) need no sorting or sticky headers. Spreadsheet-like editors follow their own conventions.

**Conflicts.** C-11, C-18.

**Evidence.** Practice (data-table guidance of design systems) and Standard (table structure).

## DATA-2. Show numbers, units and dates people can check

**Rule.** Every number that people check or act on carries its unit and currency, uses the person's locale for separators, and shows the precision the task needs — no more, no less. Large numbers are grouped; abbreviated ones ("12.4k") show the exact value on demand. Amounts, identifiers and dates are never truncated. Relative dates ("2 days ago") show the absolute date on demand, and dates that matter (deadlines, delivery, billing) are shown absolute with the weekday when it helps. Time zones are stated when people in different zones see the same time. Negative values and changes show the sign and a word or icon, not only colour.

**Why.** A number without a unit is a guess; a total that is cut ("$1,2…") or rounded away is a number people cannot trust; a relative date cannot be written into a calendar. People compare numbers with what they have on paper, in a bank app or in a message, so the format has to match what they will compare it with.

**How to check.**
- List every number on the screen: each has a unit or currency, a locale-correct separator and a sensible precision.
- Money: the currency is clear (symbol or code) and the number of decimals fits the currency.
- Find every abbreviated or rounded number: the exact value is available (tooltip that also opens on tap and focus, a detail view).
- Make values huge, negative and zero (TEXT-3, STATE-2): nothing is cut; zero and "no data" are distinguishable.
- Dates: absolute where they matter; relative ones show the absolute date on demand; a time zone is stated when people in several zones share the data.
- Changes ("+12%") show a sign and an arrow or word, not only green and red (COLOR-2).

**Thresholds.** Not colour alone for gains and losses [WCAG 1.4.1 A]; locale formats come from the profile.

**Bad → Good.** Acme's dashboard shows "Revenue 12.4k" in green and "Refunds 1.2k" in red, with "Last payout: 3 days ago" → "Revenue 12,431.50 USD ▲ 8% vs last week", "Refunds 1,204.00 USD", "Last payout: Mon 9 March, 14:00 (UTC+5)".

**Limits.** Dashboards may round for overview when the exact value is one tap away. Scientific and financial tools follow their domain's notation.

**Conflicts.** C-16.

**Evidence.** Practice and Standard (colour).
