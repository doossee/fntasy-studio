# 6. Desktop: 1440, 1280, 1024 (DESK)

By default desktop is the main screen of the people who work in the product all day (profile → Product → devices). The screen is first built and checked at 1440, 1280 and 1024, then at 390 (`07-phone.md`). The widths come from the profile (`widths`).

## DESK-1. Width of the main area and margins

**Rule.** Sidebar 248 px (tolerance 240–256). The main area is everything else; page margins 32 px from 1024, 24 px at 768–1023. List content (table, board, schedule) takes the full width of the main area. Form content and text content are limited: a form 480–640 px, text up to 720 px, a details card 640–960 px, and they stand from the left edge, not in the center.

**Why.** A table needs width for its columns. A form and text do not: a 1100 px field and a 160-character line are worse than narrow ones.

**How to measure.** `metrics.json` → `layout`: `mainWidth`, `contentWidth`, `voidRightShare` (share of empty space to the right of the content). For a list and a board `voidRightShare` ≤ 0.05. For a form and settings up to 0.5 is acceptable if the block width is within the limits above.

**Bad.** The Orders table 720 px wide on a 1440 screen, with an empty 400 px strip on the right.

**Good.** The table takes the full width; the name column stretches, numeric columns fit their content.

**Sources.** [PRIMER-LAYOUT], [ATL-GRID], [GOVUK-LAYOUT], [EL-SIDEBAR], [CARBON-GRID].

## DESK-2. Columns: one thought per column, no more than three

**Rule.** From 1280: two or three columns of cards with a 24 px gap (16 px at 1024). A column is not narrower than 320 px. At 1024 there are at most two columns. Cards of one row are equal in height; the buttons inside them are pushed to the bottom and stand on one line. "Label: value" details go in a grid of 2–3 columns, not in one long full-width column.

**How to measure.** Column width ≥ 320; the bottom edges of the buttons of cards in one row match (2 px).

**Bad.** Four columns of widgets at 1024: 220 px each, labels wrap word by word.

**Good.** 3 columns at 1440 and 1280, 2 at 1024.

**Sources.** [CARBON-GRID], [PRIMER-LAYOUT], [M3-WINDOW].

## DESK-3. Page header: title on the left, actions on the right, one row

**Rule.** Line 1: the way back (12–14 px, muted). Line 2: the title 28 / 36 and, on the right, the action buttons, centered on the line. Line 3: details (14 px, muted), icon + text, 24 px apart. Between lines 4–8 px. From the header to the tabs or the content: 24 px. No more than three buttons in the header; the rest go into "⋯".

**How to measure.** Distances between the header lines; number of buttons ≤ 3; from the header to the next block 24.

**Sources.** [PRIMER-BUTTON], [NNG-PROXIMITY].

## DESK-4. Table

**Rule.**
- Row 40–52 px with one line of text (40–44 for a dense list with a mouse, 48–52 with an avatar or an action in the row), 56–64 with two. Column header: 12 / 500 muted, height 40.
- Cell padding 12 px horizontally; first and last cell 16 px to the table border.
- A 1 px line in the border color between rows; no zebra.
- The row action is on the right: one visible and "⋯".
- Numbers right (ALIGN-3). The first column is the name, which is also the link.
- Narrow identical columns (days of a per-day grid) have equal width, at least 40 px; the column label fits in full.
- A table wider than the main area scrolls by itself inside its frame, the page does not; the first column is pinned.

**How to measure.** Row height; cell `padding`; the text of column headers is not clipped (`clipped` = 0).

**Bad.** A "Today" column 40 px wide: the word "Today" is cut.

**Good.** Today's column is marked by a background and the day number in a circle, the word is not needed; or the column is 56 px.

**Sources.** [CARBON-TABLE], [PP-TABLES], [STROM-TABLES], [NNG-TABLES].

## DESK-5. Toolbar above the content

**Rule.** One row 36–44 px high: on the left what to show (search, filters, period), on the right what to do (create, export, "⋯"). Between elements 8 px, between the left and the right group free space. All elements have one height. To the content: 12–16 px; when the toolbar is a first-level block of its own (not inside the panel of its table), 16 or the block gap of the screen, so that the gaps between first-level blocks stay within 8 px of each other (COMP-8, checklist A2).

**How to measure.** Heights of the toolbar elements are equal (0 px); gaps are 8.

**Sources.** [NNG-TABLES], [PRIMER-BUTTON].

## DESK-6. Empty space

**Rule.** At 1440 the first screen must not contain an empty rectangle larger than 40 % of the main area if the page has content below. A page with little content (three line items in an order) does not stretch its rows and does not center the table: content goes on top, emptiness at the bottom.

**How to measure.** On the 1440 screenshot: the area of the largest empty rectangle in the main area.

**Sources.** [VERCEL-GUIDE].

## DESK-7. Width steps

**Rule.** 1440 and 1280 are one layout: the same columns and the same order. Inside a block a row may rearrange (second line under the first, button under the text) if otherwise a label breaks word by word. When the layout collapses into one column at 1024, the order of blocks follows the levels of COMP-1: the hero, then everything that needs action, then reference; level 2 blocks of the right column go above the reference blocks of the left one.

1024 is the same layout, but: one column fewer, card padding 16–24, the sidebar stays. The layout does not switch to the phone one before 768 px. At none of the three widths is there horizontal page scroll or clipped text.

**How to measure.** The script (`references/11-measure.md`) at 1440, 1280, 1024: `clipped` = 0; document width = window width.

**Sources.** [PRIMER-LAYOUT], [CARBON-GRID], [M3-WINDOW], [WCAG-REFLOW].
