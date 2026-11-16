# 7. Phone 390 (PHONE)

The phone is built by its own rules, not by squeezing the desktop. The scenario and touch targets belong to `ux-clarity` (LIST, TOUCH); this file is about the look.

## PHONE-1. Page margins 16, card padding 16, between blocks 16

**Rule.** The left and right edges of the content are 16 px from the screen edge. A card has padding 16. Between cards 12–16. A bordered block never has padding below 12 px.

**How to measure.** x of the left edge of the content = 16; content width = 358 at 390.

**Sources.** [ATL-GRID], [PRIMER-LAYOUT], [GOVUK-SPACE].

## PHONE-2. One column; only short things go in a row

**Rule.** Blocks go in one column. A row holds at most three short elements (number tiles, two buttons). A "label left, value right" row is allowed if both fit without wrapping with the longest word of the longest language in the profile (`languages`); otherwise the value goes under the label.

**How to measure.** At 390, in the longest language of the profile: `clipped` = 0; no text in a row wraps word by word into three lines.

**Sources.** [WCAG-REFLOW], [VERCEL-GUIDE].

## PHONE-3. The screen header is a stack

**Rule.** The way back; the title 24 / 32 and, on the right, one "⋯" icon button; the status badge in the title line if it fits, otherwise on a separate line right under it; details each on a new line, icon + text, 4 px apart. From the header to the tabs 16, from the tabs to the content 16–24 (24 if the content starts with bordered elements).

**How to measure.** Distances on the screenshot; every detail is its own line.

**Bad.** "Northwind Traders   3 of 12 shipped" in one line, the ship date on the next.

**Good.** Three lines with icons: customer, ship date, progress.

**Sources.** [NNG-PROXIMITY], [M3-TOKENS].

## PHONE-4. Tabs

**Rule.** No more than three visible tabs and "More"; all of one height of 44 px (profile: `touch-target`), one font weight, one baseline; the row is not wider than the screen and does not scroll if there are up to four tabs. Under the tab row 16–24 px to the content: 24 if it starts with buttons, inputs or bordered tiles (a border right under the tab line with no air reads as stuck together).

**How to measure.** `row-align` = 0 in the tab row; distance from the bottom line of the tabs to the first element 16–24.

**Sources.** [PRIMER-NAV], [M3-TOKENS], [CARBON-TABS].

## PHONE-5. Tiles in a row

**Rule.** A tile is at least 56 px wide and at least 56 px high, padding at least 8. A tile has at most three lines; the status caption is in the flow, 4 px from the text above it and 8 px from the border, not pinned to the edge. The caption is clear without context ("3 unpaid", not "3 more"). If it does not fit, make the tile wider, not the caption shorter; remove the caption's background before shortening the word.

**How to measure.** `text-edge` and `box-edge` = 0; top and bottom spacing in the tile are equal (2 px).

**Sources.** [CARBON-TAG], [HIG-A11Y].

## PHONE-6. Text

**Rule.** Body text 14–16; input 16; nothing below 12 (profile: `min-font`). Page title 24 / 32.

**Sources.** [VERCEL-GUIDE], [HIG-TYPE].
