# Screen appearance checklist

An audit of one screen in 20-30 minutes. Every item is a question answered "yes" (1), "no" (0) or "not applicable" (-). Every answer carries a number: from `metrics.json` or taken off the screenshot. Two people with the same screenshots must arrive at the same score within 15 %.

The checklist answers two questions: **is it even** (stop items and sections A-H) and **is it strong** (section K). A screen that scores 100 on A-H and fails K is tidy and bland: it is shown only with that caveat.

The scenario (one main button, number of taps, copy) is covered by `checklist-clarity.md`; a screen passes both.

Numbers below are the defaults. Where the project profile (`design-profile.md`) overrides a key (`widths`, `spacing`, `fonts`, `hero-fonts`, `hero-max`, `touch-target`, `min-font`, `line-length`), use the profile value.

## Before you start

1. **Screenshots and measurements** from `scripts/measure-look.mjs` (`references/look/11-measure.md`): widths 1440, 1280, 1024, 390 (profile: `widths`); every language in the profile (profile: `languages`; default: the primary language plus the longest one). Per width: `<name>.png` (viewport), `<name>-full.png` (whole page), `<name>-marks.png` (violations in red), `<name>-squint.png`, `metrics.json`.
2. **The main audit width is 1440.** Sections A-F and H are scored on the primary language at 1440; section G on the primary language at 390; long-word items (F5, G6) in the longest language of the profile. Stop items are checked at all four widths and in every language of the profile.
3. **Ruler.** Distances are measured on the screenshot (scale 1: one screenshot pixel is one px) or in the browser dev tools. Every answer rests on a number.

## Definitions

- **Main area**: everything to the right of the sidebar and below the app's top bar. On a phone: everything between the top bar and the bottom bar. **Questions A-H are asked of the main area only.** The sidebar, top bar, bottom bar and floating buttons are the app shell; it is audited once, as a separate screen. Stop items are counted over the whole viewport, shell included.
- **How to measure the distance between blocks**: from frame to frame (for text without a frame, from the edge of its line box, not from the letters). The distance to a frame inside an element is measured from the letters (see below).
- **First-level block**: whatever lies directly in the main area: page header, tab row, toolbar, banner, table, card, row of cards.
- **Page header**: the back path, the title with its buttons, the detail lines under the title. Tabs are not part of the header.
- **Group**: elements that belong to one thing: a name and its badge; an icon and its text; a label and its field; the detail lines of the header; the buttons of one toolbar.
- **Row**: elements on one horizontal that a person perceives together: tabs, toolbar buttons, badges, "label - value".
- **Frame**: a visible border or an element's own background. The shadow of a popover is a frame too. For A6 these are not frames: the background of a table column or row (today, selected), a circle mark (day number, initials), a badge.
- **Card**: a block with a frame and its own padding that holds mixed content. A table in a frame is not a card (its padding is section E).
- **Badge**: an element up to 24 px high with its own background and rounding (status, counter). Taller than 24 px, it is a banner or a button.
- **Block heading** belongs to its block: the gap between a heading and its table or card is B2, not A2.
- **Table row action**: a button that does something to the row's record ("⋯", "Record payment"). A grid cell that is itself the input (the user marks or fills it in place) is not an action.
- **Overlap** (F7): a shell element or a pinned page bar lying on top of content. A pinned table column under which other columns slide while scrolling inside the table frame is not an overlap, provided the table fits without scrolling at 1440 and 1280.
- **Tile**: a small separate framed block, several of which make a row or a grid: a day in a date strip on the phone, a number on Today, a payment method. A table cell and a column header are not tiles.
- **Distance to the frame**: from the letters (vertically: from the cap top to the descender bottom), not from the line box.
- **Text level**: a combination of size, weight and colour. Button and badge text does not count. A state colour (today, warning, future or inactive, overdue) is not a new level: an overdue row in orange and a regular row are one level. In a table a block is one row; the column header row is a separate block.
- **Paragraph**: text that takes or may take two lines or more: an explanation, a banner, a description.
- **Not applicable**: the screen lacks what the item is about (no table: section E; no tabs: C4). Section G is not applicable when the audit is desktop only.
- **Not checked**: cannot be established from the screenshots at hand. Excluded from the score, listed in the protocol.

## Stop items ⛔

From `metrics.json`. Checked at 1440, 1280, 1024, 390 and in every language of the profile. Any number above zero at any width means the screen is not ready.

| Item | What | `counts` field | Rule |
| --- | --- | --- | --- |
| ⛔ S1 | Text closer than the minimum to a frame or background edge | `text-edge` | INSET-1 |
| ⛔ S2 | An element almost touches its container's frame (1-3 px) | `box-edge` | INSET-4 |
| ⛔ S3 | Text is cut off | `clipped` | WRAP-1 |
| ⛔ S4 | Spacing off the scale | `off-scale` | SPACE-1 |
| ⛔ S5 | Elements of one row are not on one line | `row-align` | ALIGN-1 |
| ⛔ S6 | Font size off the scale; a third text larger than 30 px; a text larger than 30 px without digits | `font-scale` | TYPE-1, COMP-2 |
| ⛔ S7 | A line longer than 90 characters | `line-length` | TYPE-4 |
| ⛔ S8 | Hover or focus shifts the layout | `state-shift` | STATE-1 |
| ⛔ S9 | Horizontal page scroll | `page-overflow` (`pageOverflowX` px) | DESK-7, `checklist-clarity.md` D1 |

In the protocol stop items are written as an "item × width" table, one table per language.

## Questions

### A. Spacing and frames

- **A1.** Is the padding of every card on the screen the same: 24 px on desktop (16 on phone), tolerance 0? *(INSET-2)* Number: the padding of each card.
- **A2.** Is every gap between neighbouring first-level blocks 16, 24 or 32 px, one value per screen for blocks of one level (from a frame or the edge of content to the next, tolerance 4)? *(SPACE-2)* Numbers: all gaps, top to bottom.
- **A3.** In every tile, are the top and bottom insets of the content equal (difference ≤ 2 px), and the left and right ones too? No tiles: "not applicable". *(INSET-3)*
- **A4.** Do buttons have 12 px side padding (16 at height 44); badges 8; inputs 12? *(INSET-2)* Number: not in `-marks.png`; take it in the browser or off the screenshot.
- **A5.** In the main area, is the smallest distance from text to a frame at least 8 px, leaving out badges, counters and marks in a circle? *(INSET-1)* `minTextEdgeX` is computed over the whole viewport: if it is below 8, find the element on the screenshot; not found in the main area: "yes".
- **A6.** Are there at most two nested frames around any text (button and input frames do not count)? *(GROUP-5)*

### B. Grouping

- **B1.** In the page header, is the distance between the title line and the detail line (line box to line box) at most half the distance from the header's bottom line to the top of the next block? *(GROUP-1, DESK-3)* Numbers: both distances.
- **B2.** Above every block heading inside the main area, is the space at least 1.5 times the space below it (from the heading's line box to the neighbours' frames)? *(GROUP-2)* Numbers: above and below.
- **B3.** In a form: label to field 4-8 px, between fields at least 16? *(GROUP-3)*
- **B4.** Are different facts on one line separated by a " · " dot, or does each have its own icon with at least 16 px between them? *(GROUP-4)*
- **B5.** In a list of same-type elements (rows, cards, tiles), are the distances between neighbours equal (spread 0)? *(SPACE-3)*

### C. Alignment

- **C1.** Do the left edge of the page title, of the first tab's text (or of the tab strip background), of the toolbar and of the first content block sit on one vertical (tolerance 1 px)? *(ALIGN-2)* Numbers: x of each.
- **C2.** Do the right edges of the page header, the toolbar and the content coincide (tolerance 0), or is the narrow block a form or a text of set width? *(ALIGN-5)*
- **C3.** Do the page header buttons sit on the right of the title line, centred on its line box (2 px), with the main one rightmost? *(ALIGN-4)*
- **C4.** Are all tabs of the row, "More" included, the same height and the same font weight? *(ALIGN-1, PHONE-4)*
- **C5.** Are all elements of one toolbar the same height (tolerance 0)? *(DESK-5)*
- **C6.** Do the bottom edges of buttons in cards of one row coincide (2 px)? *(DESK-2)*

### D. Typography

- **D1.** Are there at most six different font sizes on the screen (`fontSizes`)? *(TYPE-1)*
- **D2.** Does every block (card, list row, header) have at most three text levels? *(TYPE-2)* Evidence: list the levels of the most varied block.
- **D3.** In the main area, is 12 px text always in the muted colour, a state colour, or on a badge? *(TYPE-1)*
- **D4.** Are paragraphs no wider than 720 px and no longer than 80 characters per line (`maxLineChars` ≤ 80)? *(TYPE-4)*
- **D5.** Are amounts and counts in columns and tiles set in tabular figures (right edges of the numbers in one column coincide, digits of equal width), with digit groups separated (`12,480`)? *(TYPE-5)* No numbers in columns: "not applicable".
- **D6.** Is the page title 28 px on desktop (24 on phone), and is the only thing larger on the screen the lead number (36, 40 or 48 px; at most two such texts)? *(TYPE-1, COMP-2)*

### E. Table and list (desktop)

- **E1.** Is the data row height 40-52 px with one line of text (56-64 with two), and the same for all data rows? A totals row under the table: at least 32 px. *(DESK-4)*
- **E2.** Does the first column's text sit 16 px from the table frame and on one vertical with its column header? *(DESK-4)*
- **E3.** Are numbers and amounts right-aligned together with their column header; text left-aligned? *(ALIGN-3)*
- **E4.** Do column headers fit in full and stay shorter than the column itself? *(DESK-4, WRAP-1)*
- **E5.** Does the list take the full width of the main area (`voidRightShare` ≤ 0.05)? *(DESK-1)*
- **E6.** Does a row hold at most one visible action plus "⋯"? *(DESK-4)*

### F. Desktop: layout

- **F1.** Is the main area padding 32 px left and right at 1440, 1280, 1024? *(DESK-1)*
- **F2.** Is a form no wider than 640 px, a text block no wider than 720, and do they start from the left edge? *(DESK-1)*
- **F3.** Are there at most three card columns at 1440 and at most two at 1024; none narrower than 320 px? *(DESK-2)*
- **F4.** In the first viewport at 1440, is there no empty rectangle larger than 40 % of the main area while content sits below the fold? *(DESK-6)*
- **F5.** At 1024, is the layout the same as at 1440 (sidebar in place, same blocks; a toolbar moving to its own line is allowed), and has no label wrapped one word per line onto three lines (check in the longest language of the profile)? *(DESK-7)*
- **F7.** At 1440, 1280 and 1024, does nothing overlap the content of the main area: floating buttons and pinned bars do not cover text, buttons or frames (check every language in the profile)? *(DESK-7)* Number: overlap area, 0.
- **F6.** Are there at most three buttons in the page header? *(DESK-3)*

### G. Phone 390

- **G1.** Are the left and right content edges 16 px from the screen edge? A strip that scrolls sideways (a strip of tiles) is measured by its left edge only. *(PHONE-1)*
- **G2.** Is the header stacked: every fact on its own line with an icon, or joined by " · "? *(PHONE-3)*
- **G3.** Header to tabs 16 px, tabs to content 16-24 px? *(PHONE-3, PHONE-4)*
- **G4.** Are there at most three tiles or two buttons in a row; nothing breaks mid-word? *(PHONE-2)*
- **G5.** Does a tile's status label sit in the flow: at least 4 px from the text above it and 8 px from the frame? *(PHONE-5)*
- **G6.** In the longest language of the profile, is every badge and status label clear without the neighbouring text and no longer than 24 characters? *(PHONE-5, WRAP-5)*

### H. Icons and states

- **H1.** In the main area, are icons next to 14 px text 16 px; the gap to the text 4-8 px (tolerance 1), the same for same-type elements? *(ICON-1, ICON-2)*
- **H2.** In a row of facts, tabs or menu items, does every item have an icon, or none? *(ICON-4)*
- **H3.** Are the selected tab and menu item no wider and no taller than unselected ones (0.5 px)? *(STATE-2)* Not visible on the screenshots: "not checked".

### K. Composition, data, colour: is it strong

Fill this section in this order: first a look at the 1440 screenshot and at `*-squint.png`, writing down "I see first..., then..."; then the answers; then the `composition` block from `metrics.json`. Before the section, the protocol carries the intent line: **screen kind, screen question, lead element** (COMP-1, COMP-2). No line: the section does not count.

- **K1.** Is there one lead element, and does the eye land on it within two seconds? Overview: `heroRatio` ≥ 2, `heroCount` ≤ 2, the number in the upper left part (no `no-hero`, `hero-off` flags). List: the top of the table no lower than 200 px from the top of the main area. Object card: the state the card is opened for sits in the header together with its reason and a main button that names the result; what must be known before talking to the person is in the first viewport. *(COMP-2)*
- **K2.** On the squint, do you see one lead spot and 2-4 groups, not an even grid? *(COMP-9)* Evidence: what is visible on `*-squint.png`.
- **K3.** Do first-level blocks differ in weight: no four identical ones (`sameSizeFrames` < 4), the largest at least 1.5 times the median (`areaRatio` ≥ 1.5; when `null`, the main area columns are in a 2 : 1, 3 : 2 or 7 : 5 ratio)? Same-type objects (customer tiles, board columns): "not applicable". *(COMP-3)* Is there no empty centre in the rows of the first viewport (`rowVoidMax` ≤ 0.25), and is the right half not heavier than the left (`rightShare` ≤ 0.58)?
- **K4.** Are there at most eight container frames in the first viewport (`framesFirstViewport`), nesting no deeper than two (`nestedFramesMax`), and no card block holding a single number? *(COMP-4, COMP-5)*
- **K5.** Does the 1440 × 900 first viewport answer the screen question without scrolling, and is it filled to at least 60 % (`firstViewportFill`)? *(COMP-7)*
- **K6.** Does every action except the main one sit in the block of its own data; is there one button filled with the primary colour in the first viewport (`primaryButtons` ≤ 1); and on a screen that demands an action, is it there (`primaryButtons` = 1, not 0)? *(COMP-6, COLOR-2)*
- **K7.** Do at least 60 % of texts sit on shared verticals (`alignedShare`), do numbers of one measure in neighbouring blocks share a right edge, and in every list and table column do rows start from one vertical (`rowStartSpread` ≤ 2; an icon or a badge does not shift the text)? *(COMP-10)*
- **K8.** Does the screen use three spacing steps in three roles, with "between blocks" at least three times "inside a group"? *(COMP-8)* Numbers: the three spacings. Are the visible gaps between blocks of one level equal (`groupGapSpread` ≤ 8), and the top edges of neighbouring columns on one line (`columnTopSpread` ≤ 4)?
- **K9.** Does the lead number have a label, a unit (smaller and muted) and one comparison? The lead element is not a number: "not applicable". *(DATA-1, DATA-2)*
- **K10.** Are all numbers of four digits and up in tabular figures (`tabularShare` = 1), is the unit stated once per column, and is every quantity shown on the screen once? *(DATA-2, DATA-7)*
- **K11.** Is the list sorted "what needs action on top", and do status badges sit on at most a third of the rows? No list: "not applicable". *(DATA-3, DATA-4)*
- **K12.** With a mouse, does the first viewport show at least 10 list rows (on an overview screen: 8 records that need action, or all of them if there are fewer)? *(COMP-11)*
- **K13.** Can each coloured element be assigned one of the five jobs of colour; do tinted backgrounds take at most 12 % of the area (`tintShare`), and coloured text at most a quarter (`coloredTextShare`)? *(COLOR-1, COLOR-2)*
- **K14.** Does every red, yellow and green element have a word, a sign or an icon next to it? *(COLOR-3)*
- **K15.** Are there no template tells: icons in coloured circles next to headings, tag-like labels above blocks, lines with two or more " · ", all-caps text, a shadow under every card? *(CRAFT-4, CRAFT-7, CRAFT-1)* Is there no noise: icons next to row values, "!" in ordinary rows, counters that repeat the list; and at most 12 separate icons in the first viewport (`looseIcons`)?
- **K16.** Are blocks of level 1-2 described or captured in the "empty" and "many" states, and are there 0 stop items on the worst data (CRAFT-9)? *(DATA-8, CRAFT-9)*
- **K17.** On an overview screen, are at least two thirds of block headings answers with a number or a task, not section labels; and do records awaiting action show their age? *(COMP-12, DATA-10)*
- **K18.** Does the lead number stand without a frame or a tinted background; is the second figure of the screen at least one step smaller; is the emptiness at the bottom of any column at most a quarter of its height; and at 1280 does no label break one word per line? *(COMP-2, COMP-7)*
- **K19.** Does every column of the tables of the screen have a named type from `17-tables.md`, and is the look of the cells in a column the same in all rows: an icon, a badge and a caption in every row or in none; no icons in cells of text, numbers, dates, phones and links; no counters in column headers? No tables: "not applicable". *(TABLE-1…3)*

The `flags` in `metrics.json` are hints for the answers, not the answers: a flag is either fixed, or the protocol states why it does not apply to this screen kind (for example, `no-hero` on a list).

## Score

1. Score = number of "yes" ÷ number of applicable items × 100, rounded to an integer. "Not applicable" and "not checked" stay out of the denominator. Stop items stay out of the score: they decide separately.
2. Two scores are computed: **"even"**: sections A-H; **"strong"**: section K. A section score is computed the same way.

| "Even" | "Strong" | Stop items | Decision |
| --- | --- | --- | --- |
| ≥ 85 | ≥ 80 | 0 | May be shown to the product owner and to customers |
| ≥ 85 | 60-79 | 0 | The screen is tidy but average: show it with that caveat and three fixes from section K |
| 70-84 | any | 0 | May be shown; fix the "no" answers in the next task |
| < 70, or any ⛔ | | - | Do not show, finish the work |

## Protocol

```
Screen: Customer card · 1440 en (G: 390 en; F5 and G6: de)
Stop items en:   1440  1280  1024  390        de: 1440 1280 1024 390
S1 text-edge       0     0     0    0               0    0    0   0
...
A1 1: table card: 24 on all sides
A2 0: header → tabs 24, tabs → banner 8, banner → table 12
...
Total: 34 "yes" of 39 applicable = 87. Not checked: H3. Stop items: 0. Decision: may be shown.
"No": A2 (SPACE-2): bring block gaps to 16; ...
```

An answer without a number or a place does not count.

## What matters more

Findings are sorted by how visible they are to the product owner and to customers:

| Level | What it is | Examples |
| --- | --- | --- |
| 4: broken | Text cut off, overlapping, sideways scroll | "Overdu"; a button wider than the screen |
| 3: crooked | Visible at first glance, no ruler needed | Text right at the frame; a tab lower than its neighbours; a button "hanging" under a banner |
| 2: uneven | Visible when neighbouring blocks are compared | Paddings of 10 and 12; the tabs' left edge 16 px to the right of the title |
| 1: imprecise | Visible only in measurements | Size 15 instead of 14; a gap of 6 where the neighbours have 8 |
