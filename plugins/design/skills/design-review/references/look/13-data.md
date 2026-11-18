# 13. Data: numbers, tables, sparklines (DATA)

A working product is about money, people and statuses. Half of the "well made" impression is how the numbers stand.

Examples use the fictional product Acme Orders; replace them with the project's own (profile → Domain examples).

## DATA-1. A number does not live alone

**Rule.** The main number has three companions: a **label** (what it is), a **unit** (currency, orders; smaller and muted) and a **comparison** (with yesterday, with the plan, with last month: one, the most useful). The comparison is written in words and a sign: "$1,550.00 more than yesterday", "69 % of the November plan". A number without a comparison answers "how much" but not "is that good".

One kind of comparison on the whole screen: either the difference in money or in percent. Precision no higher than needed: whole percents.

**How to measure.** The leading number (COMP-2) on the screenshot has a label, a unit and one comparison. A number larger than 24 px with no label within 8 px is a "no".

**Bad.** "2,700.00" and under it "Payments: 6".

**Good.** "Received today · $8,450.00 · 14 payments, $1,550.00 more than yesterday".

**Sources.** [PP-DASH], [TUFTE-SPARK].

## DATA-2. Figures: tabular, grouped, unit apart

**Rule.**

- All numbers in columns, tiles, counters and wherever a value updates use `tabular-nums`.
- Digit groups follow the locale: `8,450,000`; where the locale groups with a space, the space is non-breaking (`8 450 000`). Minor units (cents) follow the profile: one fixed number of fraction digits per currency, never mixed in one column; a currency with no working minor unit shows none.
- The unit (currency sign or code, "orders", "kg") appears once per column, in the header; in a row only at a total and at a stand-alone number. At the main number the unit is 40–50 % smaller, in `muted-foreground`, on the baseline of the number; its size is the nearest step already present on the screen (no new size is introduced for the unit).
- A large number (from 24 px): letter spacing −0.01…−0.02em, line height 1.0–1.1.
- Sign: "−" (minus, U+2212), not a hyphen. An amount owed is shown by a word and colour; the minus only in a statement.
- Phone, date, contract or order number are not quantities: left-aligned, no digit grouping.

**How to measure.** `composition.tabularShare` = 1 for numbers of four digits or more (otherwise `numbers-not-tabular`). On the screenshot: right edges of the numbers in a column coincide (0 px).

**Bad.** "$450.00 USD" in each of 20 rows, digits of varying width.

**Good.** Header "Balance, $", rows "450.00" at the right edge.

**Sources.** [STROM-TABLES], [RSMS-INTER], [PP-TABLES], [KREHEL], [MDN-TNUM].

## DATA-3. Table: alignment does the work of lines

**Rule.** In addition to DESK-4 and ALIGN-3:

- quantities and amounts go right; text, dates, phones go left; nothing is centred except a state icon in a narrow column; the header is aligned like its column;
- lines are horizontal only, 1 px `border`; no vertical lines; no zebra (it fights hover and selection);
- the first column is what people search by (name), 14 / 500, a link; the second line of a cell is 12 muted and does not repeat the column header;
- column order left to right: who → state that needs action → money → reference → action;
- default sorting is "what needs action on top" (the oldest overdue invoice, the longest-waiting order), not alphabetical and not by creation date;
- the total of a section table is a row under the table on `surface-2`, total numbers under their columns. In a block of an overview screen the main total stands in the block heading on the right ("23 customers owe … $18,750.00"), and the footer holds the "All N" link and, if needed, a partial total. One number in one place (DATA-7);
- a whole row is never coloured; state lives in its own cell.

**How to measure.** On the screenshot: 0 vertical lines; right edges of numbers and of their header coincide; the first table row is the record with the highest urgency.

**Bad.** Overdue customers alphabetically; the amount centred; under every amount the caption "balance".

**Good.** Overdue customers by descending age; "41 days" in the first row; the amount on the right under the header "Balance, $".

**Sources.** [STROM-TABLES], [PP-TABLES], [QUB-TABLES], [CARBON-TABLE].

## DATA-4. Row state: ordinary as a word, exception as a badge

**Rule.** In a list only exception rows get a coloured badge (overdue more than 30 days, "On hold", "New"); the ordinary state is a grey word or no word at all. Badges in the first viewport of a list: on no more than a third of the rows; if more, the badge has become the ordinary state and is removed. For a "what is burning" selection (the first 5 of 23 by age) the share is counted over the whole list, and among the shown rows no more than half are highlighted: raise the exception threshold until that holds. The exception threshold is named as a number in the rules of the screen ("red from 31 days overdue").

In a money column not every amount is coloured, only the exception: in a list of overdue invoices the amounts are in ink (the column is already called "Balance"), red goes to the age of the oldest ones. A red column of five amounts with minus signs stops being a signal.

State is never carried by colour alone: a word, a sign or an icon stands beside it.

**How to measure.** Badges to rows in the first viewport ≤ 1/3.

**Bad.** All 12 customers have a green "Active" badge.

**Good.** "Active" as a grey word; two have the badge "On hold".

**Sources.** [PROFILE], [STROM-TABLES], [PP-DASH], [VERCEL-GUIDE].

## DATA-5. Sparkline: the size of a word, next to its number

**Rule.** A sparkline (7–30 points) stands next to the number whose shape it shows, not in a card of its own.

- Size: height 24–48 px (no lower than the main number beside it), width 3–8 times the height; a bar no narrower than 12 px. No axes, grid, frame or legend.
- One colour: bars or line in `chart-other` (grey), **the last point (today) in the profile's primary colour (`primary`)**. The value of the last point is the number beside it.
- Bars for totals per day (a day can have "nothing": Sunday); a line for the continuous (stock level, balance).
- Under the chart no more than two labels: the first and the last date, 12 px muted. If there are seven bars or fewer and the height is from 40 px, each bar carries its value above it (12 px, "7.1"), the highlighted one in weight 600: reviewers read a mute chart as decoration and a chart with numbers as a comparison.
- The chart has a text alternative for screen readers: "over 7 days from 3.1k to 9.8k, today 8.45k".

An event strip (deliveries to a customer over a month, on time or late) is the same sparkline for discrete events: cells of 24–32 px in one row in time order, "ok" is a quiet cell with a tick, colour and an **icon** (not a cipher letter) only for exceptions; the date is written under every exception, under the first cell and under "today", so a miss reads without a legend; beside it the count of exceptions in words and the share ("10 of 13 on time"). The strip stands in the row of what it belongs to (the customer, the supplier), not as a separate block.

A chart is placed only if it answers a question ("is today an ordinary day or not?"). "The data exists" is not a reason.

**How to measure.** Height ≤ 48; 2 colours in the chart; from the end of the number's unit to the chart 16–24 px, the bottom edge of the bars on the baseline of the number; `aria-label` present.

**Bad.** A "Trend" card with a line chart 300 px high, with axes and a legend, on Today.

**Good.** To the right of "$8,450.00" seven bars 32 px high, the last one in the primary colour; under them "Tue 10 … Mon 16".

**Sources.** [TUFTE-SPARK], [PP-DASH], [DATAVIZ-SKILL].

## DATA-6. Part of a whole and progress to a goal: a bar

**Rule.** Shares (payment methods) are one bar 8 px high with 2 px gaps between parts, and labels with amounts under it or beside it; no more than four parts, colours from the project's category tokens (profile → Brand). Progress to a goal (month plan, "9 of 12 picked") is a bar of 6–8 px on `muted`, filled with `primary`; beside it the number "96.4 of 140k · 69 %". No pie charts and no progress rings: differences are harder to see on them, and they take a square where a line is enough.

**How to measure.** Bar height 6–8; every part has a label and a number; parts ≤ 4.

**Sources.** [PP-DASH], [PROFILE], [SKILL-CRAFT].

## DATA-7. One number, once

**Rule.** One and the same quantity is shown on the screen once (the quantity, not the value: balance owed 650.00, price 650.00 per month and payment 650.00 are three different quantities, and each is labelled). If a number is needed in a total and in a list, the total is the sum of the list, not a copy of one of its rows. A counter in a list heading ("Not shipped · 2") is not repeated in words under the heading.

**How to measure.** Search the screenshot: every value of 4+ digits occurs once; the exception is a total and the single row it entirely consists of.

**Bad.** "3 of 12 shipped" in the order header and "3 items shipped out of 12" above the line items.

**Good.** In the header "3 of 12", above the line items only the heading "Line items".

**Sources.** [BROOM-PRINCIPLES], [QUB-TABLES].

## DATA-8. Empty, zero and many

**Rule.** Every block with data is checked in three states: **empty** (0 records), **usual**, **many** (5 times the usual, with the longest name in the longest language of the profile).

- Zero, good news or bad, is said in words: "No overdue invoices", "All orders shipped", in calm text and without red. An empty level 2 block shrinks to one line instead of holding the space of a card.
- Many: a list in a block shows up to 5–7 rows and a line "All 23 overdue invoices"; the block does not grow without limit and does not get its own scroll.
- The number "0" is never leading: if no money came today, the leading element becomes "what to do" (record a payment) or yesterday's total.

**How to measure.** The report has three screenshots or three lines of description for every block of level 1–2. If there is one data set (prototype, mocks), the "empty" and "many" states are described in words and marked "not captured".

**Sources.** [VERCEL-GUIDE], [LINEAR-REDESIGN], [PP-DASH], `references/clarity/05-states.md` STATE-1…6.

## DATA-9. Time and dates

**Rule.** Time is `14:00`, a range with an en dash and no spaces `14:00–15:30`, tabular figures, in its own column to the left of the event. Relative ("41 days", "yesterday") when age matters; a date when the day matters. One kind per list. Today's and overdue items are marked by weight or state colour, the rest is plain.

**How to measure.** One format per list; times stand on a shared vertical.

**Sources.** [PP-TABLES], [STROM-TABLES].

## DATA-10. Urgency is waiting time

**Rule.** A record that waits for an action shows **how long it has been waiting**: "waiting 30 min", "41 days", "was due at 15:30". This is one number instead of an "urgent" badge; the list is sorted by it (DATA-3). Age is written in words with a unit; colour only past the threshold (COLOR-3). The moment of creation ("16:10") suits reference, age suits work.

**How to measure.** In every "needs action" list each row has an age or a due time; rows are ordered by it, descending.

**Bad.** Deal "Bauer GmbH · web form · 16:10".

**Good.** "Bauer GmbH, waiting 30 min".

**Sources.** [PP-TABLES].
