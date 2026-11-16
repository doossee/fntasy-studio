# 15. Craft details (CRAFT)

What separates "made" from "assembled". Each detail is small; together they are the feeling of quality. Radii, shadows and icons are set by the project profile (→ Brand); this file says how to use them.

## CRAFT-1. One depth system: a frame on the flat, a shadow on the floating

**Rule.** A panel on the page has a 1 px `border` frame and the card shadow `shadow-card` (almost invisible). Floating things (menu, dialog, side panel, tooltip) use `shadow-pop`. There are no other kinds of shadow. Hovering a card does not strengthen the shadow: the background or the frame changes. In a dark theme there is no shadow; height is a lighter surface.

**How to measure.** Distinct `box-shadow` values on the screen, focus rings excluded, ≤ 2.

**Sources.** [HOBDAY], [COMEAU-SHADOW], [INTERFACE-DESIGN], [PROFILE].

## CRAFT-2. A border is drawn once

**Rule.** Between two neighbouring elements there is one line, not two. List rows inside a panel are separated by a line between rows; the first row gets no line above and the last none below, if the panel edge is there. Two hard borders do not stand side by side (panel edge + a divider 8 px from it + a background change). Semi-transparent frames do not overlap each other.

**How to measure.** On the screenshot at 400 % zoom: lines 2 px thick made of two 1 px lines: 0.

**Sources.** [GEIST-TABLE], [HOBDAY], [LINEAR-REFRESH].

## CRAFT-3. Radii are concentric

**Rule.** Radius of a nested element = radius of the outer one − the gap between them (no less than 4). A panel of 16 with padding 8 → nested 8; a button of 12 inside a panel with padding 24 is independent (with a gap over 16 the layers are not linked). A badge in a row: 6–8 or fully round; an icon in a square: 8. An element pressed against the panel edge (table header, totals strip) repeats its radius only on the shared corners: `overflow: hidden` on the panel, no radii of its own on the strip. Take the actual panel and control radii from the profile → Brand.

**How to measure.** For every pair "outer / nested at a distance ≤ 16": nested radius ≤ outer − gap + 1.

**Bad.** A grey tile of 12 at 4 px from the edge of a card of 16: the corners "do not nest".

**Sources.** [KREHEL], [HOBDAY], [VERCEL-GUIDE].

## CRAFT-4. Icons: one set, one stroke, size by text

**Rule.** One icon set only (profile → Brand), one stroke width (for an outline set, 1.75 by default), outline. Size: 16 with 14 px text, 14 with 12 px text, 20 in a 44 px button and in navigation (ICON-1). An icon next to text is the same colour or quieter, never brighter. One concept, one icon across the whole product (money, overdue, order, deal). An icon without a label only if universally known (search, close, "⋯", arrow) and with `aria-label`. A coloured backing under an icon ("icon in a circle") is not decoration: only for an avatar and for state.

In a button with an icon on the left the padding on the icon side is 2–4 px less than on the text side: optically the paddings are equal.

**Icon budget.** An icon stands where the screen is understood worse or slower without it: an action without a label, the type of an object in a mixed list, a state that needs a second carrier besides colour. It does not stand: before every phone, date, name or amount in the rows of a list; before every block heading; as "!" and alarm signs in ordinary rows (a state is a word and a text colour). In a table an icon is allowed only where the cell type provides for it, and then it stands in every row of the column (`17-tables.md`). In the first viewport of the main area: no more than **12** separate icons, not counting icons inside buttons, tabs and fields.

**How to measure.** `composition.looseIcons` ≤ 12 (otherwise `icon-noise`). Distinct `stroke-width` values among the screen's icons: 1. Icons on a coloured backing that are neither an avatar nor a state: 0.

**Sources.** [KREHEL-ICONS], [LINEAR-REFRESH], [BROOM-PRINCIPLES], [UUPM].

## CRAFT-5. Hover, press, focus

**Rule.**

- Everything that can be pressed looks pressable at rest too: a phone in a list is a link in `primary` at regular weight, without an icon (`17-tables.md`, the "phone" type); a name that leads to a card has weight 500 and an underline on hover.
- Everything that can be pressed responds to hover with a background change (`surface-2` or `accent`) or an underline within 100–150 ms; the cursor is `pointer`. Weight and size do not change (STATE-1).
- A list row that leads to a card highlights as a whole; a row action may appear on hover with a mouse, but with keyboard focus and on a touch screen it is always visible.
- Press is one tone darker than hover; no shift.
- Focus is a `ring` of 3 px at 50 % opacity only on `:focus-visible`; it is not clipped by a container with `overflow: hidden` (then the ring is drawn inward) and not covered by a sticky header.
- A state is more contrasting than rest: hovered is darker than normal, not lighter.
- Disabled: 50 % opacity, `cursor: not-allowed`, with a hint why.

**How to measure.** `state-shift` = 0 (stop item S8). Tab through the first viewport: the ring is visible on every element; the count of "not visible" is 0.

**Sources.** [VERCEL-GUIDE], [KENNEDY-7], [CARBON-TABLE], [WCAG-FOCUS].

## CRAFT-6. Motion: the more frequent, the less

**Rule.** A working product runs at the lowest motion level unless the project's motion and energy settings (profile → Brand) say otherwise.

| What | Motion |
| --- | --- |
| Hover, focus, row selection, tab switch, ticking a row | colour within 100–150 ms or instant; nothing moves |
| Menu, tooltip, dropdown | opacity and scale from 0.96 out of the trigger point, 150 ms, `ease-out`; closing is faster: 100 ms |
| Dialog, side panel | 200 ms, `ease-out`; the panel slides in from its own side |
| Keyboard actions | no animation |
| Loading | a skeleton in the shape of the content; appears if the wait exceeds 200 ms; no flicker |
| Page blocks appearing on open | none |

Only `transform` and `opacity` are animated; `transition: all` is not written. With `prefers-reduced-motion` the last frame shows at once. The first tooltip has a delay of 300–500 ms, neighbouring ones are instant.

**How to measure.** Search the screen's code: `transition-all`: 0; durations over 300 ms: 0 (an onboarding layer excepted). A screenshot with `reducedMotion: 'reduce'` matches the normal one.

**Sources.** [KOWALSKI], [VERCEL-GUIDE], [FAMILY], [PROFILE].

## CRAFT-7. Text: small things that show

**Rule.**

- Headings and short labels on two lines: `text-wrap: balance`; paragraphs: `pretty`.
- Between a number and its unit, an initial and a surname, "No." and a number: a non-breaking space.
- Typographic quotes of the UI language, an en dash in ranges (`14:00–15:30`), a real minus, the ellipsis as one character. No em dashes in UI text unless the profile says otherwise.
- The fact separator " · " (GROUP-4): at most once per line and no more than two lines with it in one block. Three facts or more go in columns or separate lines, not a chain through dots. In the second line of a cell two facts are joined by a comma ("Anna Weber, warehouse 2").
- Capitals only for the section headings of the side menu. No "over-heading" labels (a small label line above every block): the block heading itself names the content and, where possible, answers ("2 orders not shipped").
- A block heading is 16 / 600 in the heading font (profile: `fonts`); a counter in the heading has the same size, muted, with no badge until it is an exception.

**How to measure.** Lines with two or more " · " in the first viewport: 0. Texts in capitals in the main area: 0.

**Sources.** [KREHEL], [VERCEL-GUIDE], [FD-SKILL], [SKILL-CRAFT].

### What a working screen does not have (anti-noise)

The default taste is calm and clean; each of these reads as noise:

- an icon before every value of a row (a phone, a date) and "!" in a term badge;
- a counter next to a heading when the number is visible from the list under it (two rows: it is plain that there are two) or already stands in the heading that answers;
- a large "shouting" banner with the amount owed: the debt is noticeable (a number of 24–30 with a word, the state colour) but does not take a full-width band and is not larger than the leading element of the screen;
- a card for every group of details: see "The canvas holds data without a card" in `12-composition.md`;
- more than three kinds of emphasis in the first viewport at once (a tint, a badge, a state icon, coloured text, a chart, a progress bar, bold inside a row).

**How to measure.** A list from the screenshot of the first viewport: icons next to row values, 0; counters that repeat the list, 0; kinds of emphasis ≤ 3.

## CRAFT-8. Browser surfaces

**Rule.** What the browser draws is also styled from the palette: text selection (`::selection` in `accent`), the caret (`caret-color: primary`), checkboxes and sliders (`accent-color`), scrollbars inside panels (thin, in `border-strong`), the offset of link underlines (`underline-offset: 4px`).

**How to measure.** Search the global stylesheet: `::selection`, `caret-color`, `accent-color`, `scrollbar-color` are set.

**Sources.** [SKILL-CRAFT], [VERCEL-GUIDE].

## CRAFT-9. Worst data

**Rule.** A screen is viewed not only on convenient data. The mandatory set: the longest name in the longest language of the profile (for example `Maximilian-Alexander von Hohenlohe-Waldenburg Großhandelsgesellschaft mbH`), an amount of nine digits, 0 records, 1 record, 50 records, an empty optional field. For every field it is decided in advance: wrap, truncate with a tooltip, or abbreviate (WRAP-1…5). Amounts, dates and phones are never truncated.

**How to measure.** `clipped` = 0 and S9 = 0 on the worst set; the avatar stays a circle; the action button does not leave the frame.

**Sources.** [KOWALSKI-BREAK], [VERCEL-GUIDE], [LINEAR-REDESIGN].

## CRAFT-10. Actions in their places

**Rule.** Action places are the same on all screens: the primary button on the right of the page header (exception: a state that demands this action; then the button stands in the state strip, COMP-2, COMP-6); "⋯" is the rightmost; "back" is a breadcrumb above the title; a row action is in the last column. Cancel is to the left of confirm. A person who found a button on one screen finds it in the same place on another.

**How to measure.** Compare the coordinates of the primary button and "⋯" on the screenshots of all screens of the task: the right edge coincides (0 px), the vertical position within 4 px.

**Sources.** [LINEAR-REDESIGN], [PRIMER-BUTTON], [POLARIS-INDEX].
