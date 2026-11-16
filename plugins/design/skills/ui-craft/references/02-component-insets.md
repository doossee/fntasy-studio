# 2. Inner spacing of elements (INSET)

"To the border" means to the inner side of the border or to the edge of the element's own background. Vertical distance is counted from the letters themselves (top of a capital or digit, bottom of a descender), not from the line box: the line box of 12 px text is 5–6 px taller than the letters.

## INSET-1. Text never gets closer to a border or background edge than the minimum

**Rule.**

| Container | Horizontally | Vertically (from the letters) |
| --- | --- | --- |
| Regular: button, input, card, tile, cell, tab, list row, banner | ≥ 8 px | ≥ 4 px |
| Badge or chip up to 24 px high | ≥ 6 px | ≥ 3 px |
| Counter up to 20 px high, a sign in a circle (initials, day number) | ≥ 4 px | ≥ 2 px |

These are minimums, not targets. The usual values are in INSET-2.

**Why.** A letter right at the border merges with it: the word is harder to read and the element looks cut off. This is the first thing a person who accepts the design calls out as "the text is stuck to the edge".

**How to measure.** The script (`references/11-measure.md`), rule `text-edge`: for every text, the distance to the nearest ancestor with a border, its own background or a shadow; only on the sides where the edge is visible. Violation threshold: 0. The report shows the smallest distance on the screen (`minTextEdgeX`, `minTextEdgeY`).

**Bad.** A "+3 more" badge in a day tile: height 14 px, padding 4 px, the letters touch the edge of the badge and the badge touches the border of the tile.

**Good.** Badge 20 px high, padding 8 px; 8 px to the border of the tile.

**Sources.** [CARBON-TAG], [PRIMER-SIZE], [HIG-A11Y].

## INSET-2. Usual padding of elements

**Rule.** Sizes are given for a mouse; with a touch pointer the height grows to 44 px (profile: `touch-target`), padding does not shrink.

| Element | Height | Horizontal padding | Vertical padding | Text |
| --- | --- | --- | --- | --- |
| Button | 32 (mouse), 36 (large), 44 (finger and primary page actions) | 12; 16 at height 44 | from the height | 14 / 500 |
| Button with an icon | same | 8 on the icon side | - | icon 16 |
| Small button | 24–28 | 8 | - | 12 / 500 |
| Input, select | 36 (mouse), 44 (finger) | 12 | - | 14; 16 on the phone |
| Status badge | 20–24 | 8 | 2 | 12 / 500 |
| Counter | 16–20, width not less than height | 4–6 | - | 12 / 600 |
| Card | - | 16 (phone), 24 (desktop) | same as horizontal | - |
| Tile (number, day, option to pick) | at least 44 | at least 8 | at least 8, top and bottom equal | - |
| Table cell | row 44–52 | 12; first and last cell 16 to the table border | 8–12 | 14 |
| List row on the phone | at least 56 | 16 | 12 | 14–16 |
| Tab | 36 (mouse), 44 (finger) | 12 | - | 14 / 500 |
| Banner, inline notice | - | 12–16 | 8–12 | 14 |

**Why.** The numbers match what working design systems chose independently: button padding 12–16, badge 8, cell 12–16, card 16–24.

**How to measure.** In the browser dev tools: computed `padding` and height of the element. A deviation from the table is a remark unless it is explained.

**Bad.** A 32 px button with 10 px padding; a badge 14 px high; a cell with padding 10 and 14.

**Good.** Values from the table.

**Sources.** [CARBON-BUTTON], [CARBON-INPUT], [CARBON-TAG], [CARBON-TABLE], [CARBON-TABS], [PRIMER-SIZE], [POLARIS-TOKENS], [M3-TOKENS], [PP-TABLES].

## INSET-3. Side padding is not smaller than top and bottom

**Rule.** For a button, badge, tab and input the side padding is 1.5–2 times the vertical padding (squished inset). For a card and a tile the padding is equal on all sides; top and bottom differ by at most 2 px.

**Why.** A line of text already has air of its own vertically (the line spacing) and none horizontally. Equal numbers in CSS give sides that look tight. And a tile with 10 px on top and 2 px at the bottom looks as if its content slid down.

**How to measure.** For a tile: the distance from the top element to the top border and from the bottom element to the bottom border; difference ≤ 2 px.

**Bad.** Day tile: the number 10 px from the top, the badge 2 px from the bottom.

**Good.** 8 on top, 8 at the bottom; with no badge the number sits in the center.

**Sources.** [CURTIS-SPACE], [PRIMER-SIZE].

## INSET-4. A nested element is either flush or at least 4 px away

**Rule.** A button, badge, input or icon inside a bordered container is either flush with the border (0 px: a full-width bar, a row fill) or at least 4 px away; the usual value is the container padding from INSET-2. A gap of 1–3 px is not allowed.

**Why.** 1–3 px reads as a mistake: "almost touching".

**How to measure.** The script (`references/11-measure.md`), rule `box-edge`: elements with a border or background, inputs and icons; a gap to the visible edge of the container above 0.75 and below 3.5 px is a violation. Threshold: 0.

**Bad.** A "List / Board" switch: the buttons sit 3 px from the border of its track.

**Good.** 4 px.

**Sources.** [CARBON-TABS], [VERCEL-GUIDE].
