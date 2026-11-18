# 4. Alignment (ALIGN)

## ALIGN-1. Elements of one row stand on one line

**Rule.** In a row (tabs, buttons, badges, label and value, icon and text) the centers or the text baselines match within 2 px. Elements of one kind in a row have the same height. The "More" item in a row of tabs is a tab like the others: same font size and weight, same height, same baseline.

**Why.** The eye sees a 3–4 px shift at once and reads it as breakage.

**How to measure.** The script (`references/look/11-measure.md`), rule `row-align`: for the children of every flex row, the spread of centers and of the baselines of the first line of text. A row is fine if centers or baselines agree within 2 px; a checkbox or icon next to multi-line text is fine if it sits on the first line (2 px); blocks taller than 56 px may share a top or a bottom instead. Violation threshold: 0.

**Bad.** Tabs "Line items" and "Shipments" at weight 500 and "More ▾" at weight 400, 2 px lower.

**Good.** All three are one tab component, one height of 44, one weight.

**Sources.** [VERCEL-GUIDE], [LINEAR-REDESIGN], [PRIMER-NAV].

## ALIGN-2. One left edge per block

**Rule.** The page title, the lines under it, the tabs, the filter bar, the left edge of the table or of the first card start on one vertical. Tolerance 0 px; the only exception is text inside a bordered element, which is shifted by that element's padding. A screen has at most three left verticals in the main area (page edge, text edge inside a card, edge of a nested list).

**Why.** The eye travels down the left edge. Every new vertical is a stop.

**How to measure.** The x coordinate of the left edge of: the title, the first tab (by its text, not by invisible padding), the filters, the first card. All equal.

**Bad.** The text of the first tab is shifted 16 px to the right of the title because of the tab padding.

**Good.** The tab row is pulled left by the tab padding so the text of the first tab stands under the title; or the tabs have a visible track, and then the edge of the track is what aligns.

**Sources.** [NNG-F], [PRIMER-TYPE], [VERCEL-GUIDE].

## ALIGN-3. In a table: text left, numbers and amounts right, header like its column

**Rule.** Names, titles, statuses: left. Amounts, quantities, percentages: right, in tabular figures (`tabular-nums`). Dates and phone numbers: left. A column header is aligned the same way as its data. Centered: only icons and check marks in narrow columns of equal width. Vertically, cells of up to three lines are centered.

**How to measure.** For a column of amounts: the right edges of all values and of the header match (0 px).

**Bad.** "Shipped" in the header aligned left, the values "0" aligned right.

**Good.** Header and values aligned right.

**Sources.** [STROM-TABLES], [PP-TABLES], [BUTTERICK-FIGURES], [MDN-TNUM].

## ALIGN-4. Page actions sit on the right of the title row, the primary one outermost

**Rule.** On desktop the page action buttons stand in one row with the title, pushed to the right edge, centered on the title line; the primary button is the rightmost. Controls of the content (period, filters, view) sit in a row above that content: on the left what chooses what to show; on the right what acts on what is shown. All elements of one toolbar have the same height.

**How to measure.** Heights of the toolbar elements are equal; right edge of the outermost button = right edge of the content.

**Bad.** A period switcher 44 high in one row with tabs 36 high, bottom edges do not match.

**Good.** The tabs get their own row; under it a toolbar: the period on the left, "⋯" on the right, both 36.

**Sources.** [PRIMER-BUTTON], [NNG-TABLES].

## ALIGN-5. The right edge is shared too

**Rule.** The right edges of the title row, the toolbar, the table and the cards match. A block that is narrower than the rest is either stretched to the shared edge or deliberately limited by the line measure (`05-typography.md`, TYPE-4), and then it stands from the left edge.

**How to measure.** The x coordinate of the right edge of first-level blocks: the same, or the block is a text column no wider than 720 px.

**Sources.** [VERCEL-GUIDE].
