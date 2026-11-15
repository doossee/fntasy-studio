# 1. Spacing scale (SPACE)

Spacing means `padding`, `margin` and `gap`. The height and width of an element do not follow the scale (they have their own minimums, see `02-component-insets.md`).

## SPACE-1. All spacing comes from one scale

**Rule.** Values of `padding`, `margin`, `gap` come only from the scale (profile: `spacing`):

| Step | px | Tailwind class | Where |
| --- | --- | --- | --- |
| micro | 2, 6 | `0.5`, `1.5` | only inside an element up to 32 px high: vertical padding of a badge, gap between icon and text in a small button |
| 1 | 4 | `1` | icon and text, badges in a row, a label and its hint |
| 2 | 8 | `2` | label and field, buttons in a group, lines inside one record |
| 3 | 12 | `3` | horizontal padding of a button and an input, elements inside a card |
| 4 | 16 | `4` | card padding on the phone, page margins on the phone, between form fields |
| 5 | 24 | `6` | card padding on desktop, between cards and blocks |
| 6 | 32 | `8` | page margins on desktop, between page sections |
| 7 | 48, 64 | `12`, `16` | empty state, top and bottom of a large section |

20 and 40 px (`5`, `10`) are tolerated where they already exist as an offset for an icon inside a field or to reach a height of 40; new places use the steps of the table. 1 px is only a border compensation (`-mt-px`). Values above 96 px do not follow the scale: that is not rhythm but a reserve for a pinned bar (bottom tabs, a button above the keyboard); it equals the bar height plus one scale step.

Forbidden: 3, 5, 7, 10, 14, 18, 28, 36 px and any `[13px]`. In Tailwind these are classes with `.5` above `1.5` (`2.5`, `3.5`, `4.5`), `7`, `9`, `11`, `14` and arbitrary values in brackets.

**Why.** When neighboring blocks sit at 10, 12 and 14 px, the eye does not see three decisions, it sees sloppiness: a 2 px difference does not read as meaning but is noticed as unevenness. A scale with a step of at least 4 px makes every step distinguishable.

**How to measure.** The script (`references/11-measure.md`) reads the declared `padding`, `margin`, `row-gap`, `column-gap` of every visible element. A value outside the set `1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96` is an `off-scale` violation. Threshold: 0.

**Bad.** A button with 10 px padding, a table cell with 10 and 14, a 10 px gap between tiles: three different "almost 12" on one Orders screen.

**Good.** Button 12, cell 12 horizontally and 8 vertically, tile gap 8.

**Sources.** [CARBON-SPACE], [ATL-SPACE], [POLARIS-TOKENS], [PRIMER-SIZE].

## SPACE-2. Pick the step by role, not by what happened to fit

**Rule.** Three ranges: 2–8 px inside an element (icon and text, badge padding, cell); 12–24 px inside a block (card padding, between elements of a card, between form fields); 24–64 px between blocks and page sections. The ranges do not mix: the gap between cards cannot be smaller than the padding of the card itself.

**Why.** This way distance itself says what belongs to what (`03-proximity.md`).

**How to measure.** For a block with a border: the outer gap to the neighboring block ≥ its inner padding. Take the number with a ruler on the screenshot or in the browser dev tools.

**Bad.** Cards with 24 px padding stand 12 px apart: the content of neighboring cards is closer to each other than to its own edges.

**Good.** Card padding 24, between cards 24; on the phone 16 and 16.

**Sources.** [ATL-SPACE], [CURTIS-SPACE].

## SPACE-3. The parent sets the spacing between siblings

**Rule.** The distance between items of a list or block is set by one `gap` (or `space-y`) on the container, not by a `margin` on every child. A `margin` on an element is only for a one-off correction.

**Why.** One source of the value: change the `gap` and the rhythm changes for all at once; with `mt-2` on one and `mb-3` on another the rhythm breaks at the first insertion.

**How to measure.** In a container with three or more children of one kind the distances between neighbors are equal (spread 0 px).

**Bad.** Order header: the customer line has `mt-1`, the delivery line `mt-2.5`, the badge `mb-1.5`.

**Good.** The header is `flex flex-col gap-2`, the lines have no `margin` of their own.

**Sources.** [EL-STACK].

## SPACE-4. On the phone spacing is one step smaller, from the same scale

**Rule.** Page margins: 16 px on the phone, 24 px from 768, 32 px from 1024. Card padding: 16 on the phone, 24 on desktop. Between blocks: 16 on the phone, 24 on desktop. Page margins and card padding never go below 16 px.

**How to measure.** Left edge of the content at 390 px: x = 16. At 1440 px the margins of the main area are 32.

**Sources.** [GOVUK-SPACE], [ATL-GRID], [PRIMER-LAYOUT], [CARBON-SPACE].
