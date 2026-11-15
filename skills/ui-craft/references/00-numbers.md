# 0. Numbers at a glance

One page for everything the rules express as a number. On a mismatch the rule file wins (ID in the right column); a mismatch is a defect of the skill and goes into the report. Numbers marked with a profile key are defaults that the project profile (`design-profile.md`) may override.

## Floor: stop items (threshold 0)

| What | Number | Rule |
| --- | --- | --- |
| Padding, margins, gaps | only 4, 8, 12, 16, 24, 32, 48, 64 (2 and 6 inside small elements; 20, 40, 80, 96 are tolerated by the script) (profile: `spacing`) | SPACE-1 |
| Font sizes | only 12, 14, 16, 18, 20, 24, 28, 30 (profile: `fonts`); 36, 40, 48 for the hero number, at most two texts per screen (profile: `hero-fonts`, `hero-max`) | TYPE-1, COMP-2 |
| Text to border or background edge | ≥ 8 horizontally, ≥ 4 vertically; in a badge up to 24 px high: 6 and 3; in a counter or circle: 4 and 2 | INSET-1 |
| Element to container border | 0 or ≥ 4 | INSET-4 |
| Row | centers or baselines differ by ≤ 2 | ALIGN-1 |
| Line of text | ≤ 90 characters (profile: `line-length`); paragraph ≤ 80 and ≤ 720 px | TYPE-4 |
| Clipping, shift on hover and focus, sideways page scroll | 0 | WRAP-1, STATE-1, DESK-7 |

## Layout

| What | Number | Rule |
| --- | --- | --- |
| Sidebar; page margins | 248; 32 from 1024, 16 on the phone | DESK-1, PHONE-1 |
| Form; text; details card | 480–640; up to 720; 640–960 | DESK-1 |
| Columns of the main area | 2 : 1, 3 : 2, 7 : 5; gap 24 or 32, the same as between blocks vertically (16 at 1024); column ≥ 320 | COMP-3, COMP-8, DESK-2 |
| Page header | title 28 / 36; between lines 4–8; to content 24; buttons ≤ 3 | DESK-3 |
| Panel and card padding | 24 (16 on the phone); a "title + table" panel: 24 on all sides | INSET-2, COMP-5 |
| Between blocks; inside a block; inside a group | 24–32; 12–16; 4–8; ratio of the extremes ≥ 3 | COMP-8, GROUP-1 |
| Space above a block title to space below it | ≥ 2 : 1 | GROUP-2 |
| First screen 1440 × 900 | filled ≥ 60 %; an overview ≤ 2 screens; empty space at the bottom of a column ≤ 25 % | COMP-7 |
| Container frames in the first screen; nesting | ≤ 8; ≤ 2 | COMP-4 |
| Identical first-level blocks | < 4 | COMP-3 |
| Texts on shared verticals | ≥ 60 %, target 75 % | COMP-10 |
| List rows and columns: start of the first text | one vertical, spread ≤ 2 | COMP-10 |
| Visible gaps between blocks of one level; tops of neighboring columns | spread ≤ 8; difference ≤ 4 | COMP-8 |
| Emptiness inside a row of the first viewport; occupancy of the right half | ≤ 25 % of the width; ≤ 58 % | COMP-3 |
| Separate icons in the first viewport (outside buttons, tabs, fields) | ≤ 12; next to row values 0 | CRAFT-4 |

## Elements

| What | Number | Rule |
| --- | --- | --- |
| Button: height | 44 for the primary one and on touch (profile: `touch-target`); 32–36 with a mouse inside panels | `SKILL.md`, "Where rules conflict" |
| Button: padding; badge; input | 12 (16 at height 44); 8; 12 | INSET-2 |
| List and table row with a mouse | 40–52 with one line of text; 56–64 with two | DESK-4, COMP-11 |
| Column header | 12 / 500 muted, height 40 | DESK-4 |
| Cell | padding 12; first and last column: 16 to the table border | DESK-4 |
| Rows in the first screen of a list; "needs action" records on an overview | ≥ 10; ≥ 8 or all | COMP-11 |
| Icon | 16 next to 14 px text; 14 next to 12; 20 in a 44 button; stroke 1.75; gap to text 4–8 | ICON-1, ICON-2, CRAFT-4 |
| Nested radius | outer − gap (not below 4); with a gap > 16 the layers are independent | CRAFT-3 |

## Data and color

| What | Number | Rule |
| --- | --- | --- |
| Hero number | 36, 40 or 48; ≥ 2 × body text; in the left 60 % and the top half; no frame | COMP-2 |
| Second number of the screen | 24–28 | COMP-2 |
| Status in the header of an object card | number 24–30 with a word, a reason and the primary button in one band up to 140 high; the key contact (the phone to call) 16–18 / 600 | COMP-2 |
| Mark strip (one cell per day or event) | cell 24–32; a date under every exception | DATA-5 |
| Unit next to a number | 40–50 % smaller, from sizes already used on the screen | DATA-2 |
| Sparkline | height 24–48; width 3–8 times the height; bar ≥ 12; to the number 16–24; 2 colors | DATA-5 |
| Share and progress bar | 6–8 high; ≤ 4 parts | DATA-6 |
| Status badges in a list | ≤ 1/3 of rows; in a "what is burning" selection ≤ 1/2 of the rows shown | DATA-4 |
| Colored backgrounds; colored text; filled primary button | ≤ 12 % of the area; ≤ 25 % of texts; 1 | COLOR-2 |
| Neutral surface tones | 3 | COLOR-5 |
| Answer headings on an overview | ≥ 2/3 | COMP-12 |

## Motion

| What | Number | Rule |
| --- | --- | --- |
| Hover, focus, selection | color in 100–150 ms or instantly | CRAFT-6 |
| Menu, tooltip | 150 ms, from scale 0.96; closing 100 ms | CRAFT-6 |
| Dialog, side panel | 200 ms | CRAFT-6 |
| Loading skeleton | after 200 ms of waiting | CRAFT-6 |
| Focus ring | 3 px, the ring color at 50 % | CRAFT-5 |

## Scoring

| What | Number | Where |
| --- | --- | --- |
| Checklist "even" (A–H) and "strong" (K) | show the screen at ≥ 85 and ≥ 80 with 0 stop items | `checklist.md` |
| Rubric | 7 criteria, 0–4 each; "level of the best" is ≥ 23 with none below 3; with a stop item not above 18 | `rubric-best.md` |
| Judges | 2–3 independent; a gap > 1 on a criterion means a re-review | `rubric-best.md` |
| Freedom mode variants | 2–3, different on at least two metrics | FREE-3, FREE-4 |
