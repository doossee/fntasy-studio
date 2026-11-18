# 12. Composition (COMP)

Rules 1–11 make a screen even. These make it **strong**: the screen has one main thing, a reading order, and different weight for things of different importance. A screen can pass every stop item and fail this section: then it is tidy and says nothing.

The numbers of this section are computed by the measuring script (`11-measure.md`, block `composition` in `metrics.json`). They are not stop items: they feed section K of `checklist-look.md`.

Examples use the fictional product Acme Orders (an order-management admin panel for a small wholesale business); replace them with the project's own (profile → Domain examples).

## COMP-1. The screen's question first, blocks second

**Rule.** Before any markup, write one line: **who opens the screen, what question they ask, and what they do after the answer**. Then list what is on the screen in descending importance for that question: 1 is the main thing (exactly one), 2 needs action now, 3 is reference. A block that neither answers the question nor leads to an action does not go on the screen.

**Why.** A screen assembled from "what we have in the data" becomes a grid of equal cards. A screen assembled from a question gets its order for free: what comes first, what is large, what can go.

**How to measure.** The report has the question line and the list with three levels. Level 1 has exactly one item. No line: section K is not counted.

**Bad.** Today: six widgets, one per section of the product.

**Good.** "Owner, in the morning and between tasks: is the money all right and what needs me now? → calls the customer who owes, asks the warehouse to ship." 1: received today; 2: overdue invoices, orders to ship, deals without a reply; 3: month plan, payment methods.

**Sources.** [PP-DASH], [FD-SKILL], [SKILL-LAYOUT].

## COMP-2. One leading element

**Rule.** A screen has one main thing: a number, a table or an action. It is seen first:

- **overview screen** (Today, a summary): the main number is 36, 40 or 48 px (profile: `hero-fonts`), weight 600, tabular figures. It is at least twice the body text and clearly larger than the page title: with a 28 px title use 40 or 48 (36 next to a 28 px title gets lost; 36 is for narrow columns and 1024). There is one text of this size on the screen, two at most (profile: `hero-max`): a number and its pair, "received" and "owed" in the same unit. **The number stands directly on the page, with no frame and no tinted backing**: a frame makes it equal to the other blocks, and the eye goes to a button or a red figure first. The second most important figure (total owed) is one or two steps smaller (24–28), not the same size;
- **list** (Orders, Customers): the leading element is the table itself. It starts no lower than 200 px from the top of the main area, with only the page header and one toolbar above it;
- **object card** (Order, Customer): the leading element is the header with the name and the state the card was opened for (balance, shipping). The state stands in the header, not in a tab: a number of 24–30 px with words ("Overdue $650.00 for invoice 1042, 6 days late"), on the left, directly under the name. Its weight comes from position and a quiet state backing (COLOR-4), not from a 36–48 size: that size is reserved for the overview. **State, its reason and the action are one place**: the same strip holds "for what and since when", the last agreement ("Nov 13: their accountant promised to pay by Friday"), the person it is settled with (billing contact and phone), and **the primary button, which names the result with the amount** ("Record $650.00"). A button in the top right corner, a screen width away from the balance it settles, is a failure. The state strip is low, up to 140 px: it answers, it does not occupy the screen, and below it the first viewport at 1440 × 900 leaves room for all four questions of the card (who it is and how to reach them, do they owe, what they order, what happened recently; at least three rows for each). The phone of the person it is settled with is 16–18 px, weight 600, ink colour, tabular figures: it is an answer, not a link in a footnote; other contacts are visible in the first viewport, one line each. When the state is calm (nothing owed), the primary button returns to its usual place on the right of the header (CRAFT-10);
- **form**: the leading element is the first field and one primary button.

Boldness is spent here, in one place. Everything else is quieter.

**Why.** With no main thing, a person reads the screen line by line. Size is the cheapest way to say "start here"; with equal sizes the same has to be done with colour and frames, and the screen turns motley.

The leading element stands in the upper left part of the main area (profile: `main`): its centre is within the left 60 % of the width and the upper half of the first viewport. A large number on the right or at the bottom is not leading, however big.

**How to measure.** `composition.heroRatio` ≥ 2 and `heroCount` ≤ 2 on an overview screen (otherwise flag `no-hero`); `heroX` ≤ 0.6 and `heroY` ≤ 0.5 (otherwise `hero-off`). On a list: top of the table ≤ 200 px from the top of the main area at 1440. The "2 seconds" test: a reviewer, without reading labels, says where the eye landed; the answer must match level 1 from COMP-1.

**Bad.** Four numbers of 30 px in four cards: money, overdue, orders, deals. All equally important, so nothing is. Or: the day's total at 30 px inside a card, next to it a red overdue total at the same 30 px: red wins.

**Good.** "$8,450.00" at 40 px in the top left; the overdue total at 24 px in red beside it, as the second measure; orders to ship and deals are counters 14 / 600 in the headings of their lists.

**Sources.** [FD-SKILL], [KENNEDY-7], [PP-DASH], [DESIGN-CRITIQUE].

## COMP-3. Block weight follows importance, not the grid

**Rule.** First-level blocks are not equal. Column widths of the main area come from the pairs **2 : 1, 3 : 2, 7 : 5** (for example 808 + 400 with a 24 gap at 1440), not 1 : 1 : 1. The wide column goes to what is read and worked in (list, table); the narrow one to what is glanced at (total, reference). Four or more blocks of the same size in the first viewport are a sign of a grid without thought; the exception is same-kind objects (tiles of one kind, board columns).

**Why.** An equal grid says "everything is equally important". Asymmetry shows order without a single extra frame.

**How to measure.** `composition.sameSizeFrames` < 4 (otherwise `equal-cards`); `areaRatio` ≥ 1.5: the largest block is at least one and a half times the median. If there are fewer than three framed blocks (which is where COMP-4 leads), `areaRatio` is not computed (`null`): then measure column widths on the screenshot; the proportion must be from the list above.

**Bad.** Three columns of 389 px, two cards of equal height in each.

**Good.** Left 2/3: the day's money and under it the list of overdue invoices. Right 1/3: orders to ship and deals without a reply, as short lists.

**Sources.** [LINEAR-REDESIGN], [PP-DASH], [SKILL-CRAFT].

### Balance: a row without an empty centre, sides without overweight

Asymmetry of columns is not a tilt. In every row of the first viewport the content either runs from the left without a break or takes the whole row: "a number on the left, a block on the right and half a screen of emptiness between them" reads as a hole. The leading block is stretched to its column (the number, its comparison and the sparkline fill the 2/3 width), and the reference blocks on the right take the remaining third right up to the column gap. If there is nothing to fill it with, the block on the right moves under the leading one instead of hanging at the right edge. The page header (title on the left, buttons on the right) is the accepted exception.

A dense right column next to a sparse left one is overweight: the eye goes right, past the main thing. The densest part of the screen is where the leading element and the work are, that is on the left and at the top.

**How to measure.** `composition.rowVoidMax` ≤ 0.25 (otherwise `hollow-row`): in a row, between the left and the right content, no more than a quarter of the main area width is empty. `composition.rightShare` ≤ 0.58 (otherwise `right-heavy`). On the squint: the dark spots are not gathered at one edge.

### The canvas holds data without a card

Data (a table, a list, a number, a heading) stands directly on the canvas of the work area. A card (a panel with a frame or a fill) is only for a truly separate group: something that could be removed from the screen as a whole without touching the rest. If the screen "looks better with cards", that is a defect of the canvas or of the separation, not an argument for cards: check the ladder of COMP-4 and the system of surfaces (`14-color.md`, COLOR-5). The right column of an object card is built as one calm column with sections divided by spacing and a line, not as a stack of cards.

**How to measure.** `framesFirstViewport`: the fewer the better with the same data; on the screenshot every panel passes the question "is this a separate group or just a wrapper?".

## COMP-4. The separation ladder: spacing → line → background → frame

**Rule.** Separate with the weakest means that is enough:

1. **spacing** (GROUP-1: between groups twice as much as inside);
2. **line** of 1 px in `border` colour: between list rows, between a total and the list;
3. **background** `surface-2`: a totals strip, a selected row, a nested zone inside a card;
4. **frame and white panel**: a separate object on the page: a table, an object card, a form;
5. **shadow**: only for things that float (menu, dialog, overlay panel).

Several blocks of the same rank (three work queues: overdue invoices, orders to ship, deals without a reply) are **one panel divided by lines into columns**, not three cards with gaps: the screen reads as a whole and there is one frame.

One element gets one rung: a frame and a coloured background are not combined (exception: a state banner). A number without a list is not made a card: it stands on the page or in a totals strip. The first viewport holds no more than **eight** frame containers; nesting is no deeper than two.

**Why.** Every frame is a line the eye has to walk around. Structure is better felt through alignment and spacing than seen drawn.

**How to measure.** `composition.framesFirstViewport` ≤ 8 (otherwise `frame-heavy`); `nestedFramesMax` ≤ 2 (otherwise `nested-frames`). Ask of every frame: "what does it tell?" No answer: remove it.

**Bad.** A "Deals" card with three grey tiles of numbers inside and a framed button under them: a frame in a frame for three numbers.

**Good.** Heading "Deals awaiting a reply · 2", under it two rows separated by a line. "In progress 14" as text in the totals line.

**Sources.** [LINEAR-REFRESH], [HOBDAY], [STROM-TABLES], [LUKEW-FORMS], [FD-SKILL].

## COMP-5. Card, table, list or line: what when

**Rule.**

| Content | Form |
| --- | --- |
| Many same-kind objects with 3+ comparable properties | **Table** at full width (DESK-4) |
| 2–7 same-kind objects, each needs an action, nothing to compare them by | **List of rows** separated by lines: time or due date on the left, then what, action on the right; no column headers |
| Top of a long list ("5 of 23") with numbers that are compared (age, amount) | **Table** with column headers and an "All N" row in the footer: the same table as in the section, only short |
| One object with mixed kinds of facts | **Card** (framed panel), padding 24 |
| One number with a label | **Line or totals strip**, not a card |
| Stages that objects move through | **Board**; only if moving is the main action |
| "Label: value" pairs | Grid of 2–3 columns with no frame around each pair |

Tile cards in a grid are allowed only for objects that have no shared comparable columns (for example warehouse zones, saved reports). "Everything in cards" is not a layout.

A "heading + table" panel: padding 24 on all sides, the first column on the same vertical as the panel heading (E2 for a full-page table stays: 16 to the frame). Row lines run either from padding to padding or from edge to edge of the panel: one way per screen.

A frameless list row that highlights on hover: the highlight is 12 px wider than the text on each side (negative margins on the row and the same inner padding, radius 8), otherwise the background sits flush against the letters.

**How to measure.** For every first-level block the report has a line "what is inside → form by the table". A card block with a single number is a "no".

**Bad.** Five overdue customers as five cards with avatars.

**Good.** Five rows: customer and invoice, age, amount on the right, "Call" on hover.

**Sources.** [PP-TABLES], [QUB-TABLES], [SKILL-CRAFT].

## COMP-6. Reading order: main thing top left, action next to its data

**Rule.** The main thing is in the top left corner of the main area. Order from top to bottom: **needs action → overview → details**. What a person must know before a conversation or an action (a pinned note "no deliveries on Saturdays", a warning, an agreement) is level 2: it stands in the first viewport next to the name or the state, not in a "Details" block below the fold. An action stands in the same row or the same block as the data it belongs to: "Ship" in the order's row, not in a row of buttons at the top. The primary button of the page is in the leading block, next to the state it resolves; if there is no such state, on the right of the header (ALIGN-4). There is one in the first viewport. A contact action ("Call", "Message") stands by the phone of the person being called, not as an unaddressed button in the header. A frequent secondary action of the screen ("New deal") does not vanish in a redesign: it stands as an outline button in the heading of its block.

**How to measure.** `composition.primaryButtons` ≤ 1 (otherwise `multi-primary`). Every action except the primary one and navigation lies inside the block of its data: checked on the screenshot.

**Bad.** A row of four buttons at the top, "Payment", "Deal", "Ship", "Task"; below them the numbers they relate to.

**Good.** One filled "Record payment" in the header. "Ship" in the row of each order waiting to ship.

**Sources.** [PP-DASH], [VERCEL-GUIDE], [LUKEW-FORMS], [PRIMER-BUTTON].

## COMP-7. The first viewport answers the question

**Rule.** At 1440 × 900 the answer to the screen's question (COMP-1) is visible without scrolling: the leading element and everything from level 2. The first viewport is filled to at least 60 % of its height and does not end in an empty field while content continues below. An overview screen is no longer than two viewports; a list is as long as its rows.

On an overview screen the first viewport at 1440 × 900 is filled with content to 85–100 % of its height: if an empty band taller than 80 px remains after levels 1–2, it goes to level 3 of the same topic ("Shipping later today" under orders to ship, "Already answered" under deals), as quiet rows with no new frames. Emptiness in the top zone between the leading number and the reference on the right is also a hole: the reference is put right next to the number and the chart, or the chart is stretched.

Neighbouring columns of one panel or one row end at about the same height: emptiness at the bottom of a column of more than a quarter of its height is a hole. Close it with level 3 content of the same topic ("Shipping later today" under orders to ship), narrow the column, or give the space to the neighbour.

**How to measure.** `composition.firstViewportFill` ≥ 0.6 (otherwise `half-empty`); `scrollScreens` ≤ 2 on an overview. Check at 1280 × 800 and 1024 × 768: the leading element and at least the first level 2 block stay in the first viewport; no label breaks into one word per line; no chart is stretched wider than 480 px. Emptiness at the bottom of a column ≤ 25 % of its height.

**Bad.** A "Get started" card and the sales plan at the top; money and overdue invoices after scrolling.

**Good.** Service content (hints, setup) as a narrow strip under the main data or at the side; the main thing on top.

**Sources.** [PP-DASH], [LINEAR-REDESIGN].

## COMP-8. Rhythm: three spacing steps, not one

**Rule.** At least three steps of the scale work on the screen in three roles: **inside a group** (4–8), **between groups of a block** (12–16), **between blocks** (24–32). One value repeated everywhere gives an even mush. The largest spacing is around the leading element: air is spent on the main thing and between groups, not inside table rows.

**How to measure.** Three numbers from the screenshot for the three roles; the ratio "between blocks / inside a group" ≥ 3.

**Bad.** Everything at 16: heading, number, label, bar, list, button.

**Good.** Number and label: 4; label and the payment-methods bar: 16; the money block and the overdue block: 32.

**Sources.** [SKILL-LAYOUT], [NNG-PROXIMITY], [KENNEDY-7].

### Gaps between blocks of one level are equal

Blocks of one level in one column are separated by **one** value of the scale (24 or 32): between the leading block and a panel, between panels, between a panel and the bottom line. Count the **visible** gap, from the bottom edge of content or frame to the top edge of the next, not the `gap` in code: a frameless block with its own padding gives a larger gap to the eye than a framed block. Inside a panel, sections divided by a line have equal padding above and below the line, and section headings stand on one grid.

The top edges of neighbouring columns of the first viewport are on one line: if the left column starts with text and the right one with a frame, the top of the text and the top of the frame match within 4 px (the panel's padding goes inward, it does not push the column down).

**Why.** Uneven gaps, emptiness above the leading number and section headings at different heights are seen before any other merit of the screen. A person who accepts the design notices them first, even on a variant they like.

**How to measure.** `composition.groupGapSpread` ≤ 8 (otherwise `uneven-gaps`); `composition.columnTopSpread` ≤ 4 (otherwise `columns-top-off`). The metrics are a hint: gaps are still checked with a ruler on the screenshot, the script does not see every layout. Check these before handing over, on a par with the stop items.

## COMP-9. Squint and skeleton

**Rule.** The screen is checked with two views before reading any numbers:

- **squint**: `*-squint.png`, the same screen blurred and grey. It shows: one darkest or largest spot (the leading element), 2–4 separate groups, the edge of the sidebar. If an even grey grid shows, there is no hierarchy;
- **skeleton**: mentally remove all words: do the shapes alone tell that this is a list, this is a number, this is an action.

First the look and the note ("I see first…, then…"), then `metrics.json`. Not the other way round: numbers suggest the answer.

**How to measure.** The section K protocol has the squint note before the stop-item table; the leading element named there matches COMP-1.

**Sources.** [SKILL-LAYOUT], [SKILL-CRITIQUE], [DESIGN-CRITIQUE], [KENNEDY-7].

## COMP-10. Shared verticals

**Rule.** Every text stands on a line it shares with at least two others. The main area at 1440 has no more than **six** through verticals (left edge of the page, edge of the second column, 1–3 table columns, right edge of numbers). Numbers in the same unit in different blocks share a right edge. Inner paddings of neighbouring panels are equal, so their texts stand on one line with the headings.

**Rows of one column start on one vertical.** In a list and in a table column the first text of every row stands on one line. An icon, a dot or a state badge does not shift the text: the space for the icon exists in all rows (including rows without one), or the mark stands after the text. If some rows show state with a badge, the others show it as text starting on the same vertical as the text inside the badge, or nobody has a badge (DATA-4).

**How to measure.** `composition.alignedShare` ≥ 0.6 (otherwise `loose-alignment`); the target is 0.75. `composition.rowStartSpread` ≤ 2 (otherwise `ragged-rows`). With a ruler on the screenshot: list the verticals that carry a single text and remove them.

**Bad.** The overdue total at the right edge of the card, the amounts per customer in a column 40 px to the left.

**Good.** The overdue total and the amounts in rows share one right edge.

**Sources.** [HOBDAY], [STROM-TABLES], [LINEAR-REDESIGN].

## COMP-11. Density of a working screen

**Rule.** Dense inside lists, roomy between blocks. With a mouse a list row is 40–52 px (two lines of text: 56–64); the first viewport of a list at 1440 × 900 shows at least **10 rows**, of an overview screen at least 8 records that need action, if there are that many (level 3 reference rows do not count; with fewer records, all are shown). Overload is relieved by muting the secondary (`muted-foreground` colour, 12 px, no icons or badges), not by increasing spacing.

**How to measure.** Count data rows in the first viewport at 1440; row height (E1).

**Bad.** The Customers table with 72 px rows: six customers per screen.

**Good.** Row 48 px, name 14 / 500, second line 12 muted; 12 customers per screen.

**Sources.** [LINEAR-REFRESH], [PP-TABLES], [QUB-TABLES], [CARBON-TABLE].

## COMP-12. A block heading answers, it does not name

**Rule.** A block heading on an overview screen and in an object card is an answer with a number or a task: "2 orders not shipped", "Who to call: 23 customers owe", "2 deals await a reply". A section label ("Overdue", "Shipping", "Deals") makes the reader go through the rows to learn what would fit in the heading. The number in the heading has the same size and weight as the words; the total amount is on the right of the heading line. There is no small label line above the heading.

When there is nothing to answer (0), the heading says so: "All orders shipped", "No overdue invoices", and the block shrinks to a line (DATA-8).

In lists and section tables the page title stays the section name ("Customers"): the person came to a section, not for an answer. In an object card the headings of blocks with state answer ("Delivery today at 17:00", "2 tasks, one overdue"); reference blocks ("Details", "History") are named as they are.

**Why.** Answer headings are one of the clearest differences between the best variants and the rest in blind comparisons: the reader answers the screen's four questions in 3–4 seconds from the headings alone.

**How to measure.** The share of block headings in the first viewport of an overview screen that contain a number or a verb is ≥ 2/3; in an object card, every block with state.

**Bad.** "Overdue", below it "$18,750.00", below it "Customers with overdue invoices: 23".

**Good.** "23 customers owe" and on the right "$18,750.00".

**Sources.** [FD-SKILL], [PP-DASH].
