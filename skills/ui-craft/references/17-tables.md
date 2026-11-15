# 17. Table: cell types (TABLE)

A table is not "rows with data" but a set of **columns, each with its own type**. The type sets the alignment, the format, what is clickable, where an icon or a badge is allowed, what empty looks like. The question "does this need an icon" is decided not by taste but by type: an icon is present where the type provides for it, and then it stands in every row of the column.

Based on the table rules of mature design systems (Carbon, Polaris, Primer, Atlassian, GOV.UK, USWDS, PatternFly, Pajamas, Helios, Ant); the list is in `sources.md`, section "Tables". Where the systems disagree or are silent, that is said, and the choice of this skill is marked "chosen". A project may record another choice in the profile (`Decisions`).

## TABLE-1. One column, one type and one look

**Rule.** In every row of a column the value has one type, one format, one alignment and one composition (text; text and a caption; a badge; a link). Not allowed: a badge with an icon in one row and plain text in another; "41 days" in one row and "yesterday" in another; an icon on the left in some of the rows. If some rows need a special look (an exception), it changes the **colour or weight of the text**, not the composition of the cell: the text starts at the same vertical.

**Why.** A mix breaks comparison down the column, sorting and reading by a screen reader; the eye sees a "ragged" column before it sees the data.

**How to measure.** `composition.rowStartSpread` ≤ 2 (otherwise `ragged-rows`). Looking down the column: the composition of the cell is the same; the count of rows that differ is 0.

**Bad.** An "Overdue" column: "! 41 days" in a red badge in two rows, "5 days" as plain text in the others; the text starts at two different verticals.

**Good.** "Overdue, days", right-aligned numbers in every row; the rows over 30 days in the state colour and weight 600.

**Sources.** [PRIMER-TABLE], [HELIOS-TABLE], [PATTERNFLY-TABLE].

## TABLE-2. The types and their rules

| Type | Alignment (the header the same) | Look and format | Clickable | Icon, badge | Empty |
| --- | --- | --- | --- | --- | --- |
| **Primary cell** (a name, a title) | left, the first column | weight 500, ink; a caption on a second line, 12, muted (a number, a branch): in every row or in none; an avatar: in every row or in none | yes: the name is the only main link of the row (and the whole row leads to the same place) | an avatar; a type icon only in a mixed list | does not happen |
| **Text** | left | 14 / 400; wraps to two lines; truncation only with the full text in a tooltip | no | no | "—" muted |
| **Number, money** | right | tabular figures, digit groups with the locale's separator (non-breaking where it is a space); the unit and currency once in the header ("Balance, $"); the same number of decimals in the column; a real minus sign; a debt in a "Debt" column has no minus | no | no | "—"; zero is "0", not empty |
| **Date, term, age** | left (a date), right (a number of days in a column that is compared) | one format per column: either a date "11/10/2026" or an age "5 days"; today and yesterday in words only if the whole column is relative; the exact date in a tooltip | no | no | "—" |
| **Status** | left | the usual state is a word in ink or muted; an exception is the same word in the state colour, or a badge. A badge: in every row of the column or in none (DATA-4 decides which of the two) | no: a badge is not a button | a dot or a state icon only together with the word, in every row, before the word in a reserved place | does not happen: a row always has a state |
| **Link** to another object (an order, an owner) | left | ink, underline on hover; not the `primary` colour, so that it does not compete with the main link | yes | no | "—" |
| **Phone, contact** | left | a `tel:` link in the `primary` colour, regular weight, digits grouped as the locale writes them; tabular figures are acceptable so that numbers stand evenly in the column (the script counts "90 123" as a number with digit groups) | yes: a press calls | **no icon** in the cell; a "Call" action as a button only as the row action (the last column), if calling is the main job of this list | "no number" muted |
| **Yes / no** | left | "yes" is a word, or a check mark with hidden text in every "yes"; "no" is empty or "—" | no | a check mark is the only icon allowed without a visible word, with an `aria-label` | "—" |
| **Row action** | right, the last column, the header hidden (visually hidden text) | the single most frequent action as a button (outlined, 32–36); the rest under "⋯" | yes | an icon in the button; "⋯" is always visible (muted), not only on hover | the column is empty in rows without an action |
| **Selection** | the first column, 40–48 px | a checkbox | yes | none | none; the column exists only if there is an action on the selected rows |

**Phone: what is chosen and why.** None of the systems reviewed has a direct rule about a phone number in a cell. The nearest patterns: a "phone" column type is a `tel:` link written in the accepted format; phone numbers do not need monospaced digits; nobody writes about a handset icon. So here a phone is a link without an icon: the link colour already says "clickable", and an icon in every row is noise (CRAFT-4, the icon budget). A "Call" button appears only as the row action where calling is the work itself (a "Whom to call" list).

**Term: what is chosen.** In a column that is compared and sorted ("Overdue"), a right-aligned number with the unit in the header ("Overdue, days"); in a sentence-like row outside a table, in words ("5 days overdue").

**How to measure.** For every column of the tables of the screen, the protocol names its type from this table. Numbers: `tabularShare` = 1, right edges coincide (0 px). Icons in cells of the types "text", "number", "date", "phone", "link": 0.

**Sources.** [POLARIS-TABLE], [PRIMER-TABLE], [GOVUK-TABLE], [USWDS-TABLE], [PATTERNFLY-TABLE], [PAJAMAS-TABLE], [HELIOS-TABLE], [CARBON-STATUS], [GOVUK-TAG], [ADS-LOZENGE], [LIGHTNING-TYPES].

## TABLE-3. Column header

**Rule.** One or two words, only the first capitalised, 12 / 500 muted; aligned the same way as the content of the column. The unit is in the header after a comma ("Balance, $"). A header holds no buttons, links, counters or badges; the sort arrow is shown at the sorted column, at the others on hover. The number of records stands in the heading of the block that answers ("3 customers owe") or in the footer ("Showing 1–9 of 9"), but not in both: if there are as many rows on the screen as the heading says, a second counter is not shown.

**How to measure.** Counters, buttons and badges in column headers: 0. Headers aligned differently from their column: 0.

**Sources.** [CARBON-TABLE], [PRIMER-TABLE], [POLARIS-TABLE], [ADS-TABLE]. The ban on counters in column headers is a conclusion from these rules; there is no direct norm.

## TABLE-4. Empty and zero

**Rule.** A missing value is "—" muted, across the whole product; zero is "0". Do not write "N/A" or "no data" in every cell, do not put an icon. If it is empty for a reason worth knowing ("no number", "no owner"), write the reason in two words, muted, the same way in every such row. The systems disagree (an empty cell; "--"; a reason text); the dash is chosen because an empty cell reads as a loading failure.

**How to measure.** Empty cells without "—" or a reason: 0. Different spellings of "empty" on one screen: 1.

**Sources.** [PAJAMAS-TABLE], [HELIOS-TABLE], [PRIMER-TABLE], [ANT-FORMAT].

## TABLE-5. Row, lines, density

**Rule.** One row height per table (40–52 with one line of text, 56–64 with two; DESK-4); the header 40. Rows are divided by a horizontal `border` line; there are no vertical lines and no zebra (zebra only when a wide table scrolls sideways). Hover highlights the whole row (`surface-2`). Actions on several rows live in a bar above the table, not in the rows.

**How to measure.** Different row heights in one table: 1. Vertical lines: 0.

**Sources.** [CARBON-TABLE], [PATTERNFLY-TABLE], [PAJAMAS-TABLE], [USWDS-TABLE].

## TABLE-6. Narrow screen

**Rule.** If rows are compared with each other (money, counts per period), the table stays a table: less important columns are removed in the order of importance named in the rules of the screen; the first column and the action column always stay. If a row stands on its own (a customer, a deal), on a phone it becomes a list card "label: value". A column is not hidden silently at a width where it is used: the order of hiding is written down and agreed.

**How to measure.** For each width of the profile the protocol lists the columns shown; a column in use at that width is not missing.

**Sources.** [PAJAMAS-TABLE], [USWDS-TABLE], [PRIMER-TABLE], [ANT-TABLE].
