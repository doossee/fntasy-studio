# 9. Icon and text (ICON)

## ICON-1. Icon size follows the text

**Rule.** 12 px text: icon 12–14; 14 px text: icon 16; 16 px text and a 44 px button: icon 16–20; an icon button without text: 20 in a 44 box. One stroke width for the whole screen (the project's icon set, profile → Components; by default 2 px, and 1.5 px for icons from 20).

**How to measure.** Computed width of the `svg` next to the text.

**Sources.** [CARBON-BUTTON], [M3-TOKENS], [VERCEL-GUIDE].

## ICON-2. Gap between icon and text

**Rule.** 4 px with 12 px text and in elements up to 28 px high; 8 px (6 is acceptable) with 14–16 text. The same for all elements of one kind on the screen. An icon and its text are closer to each other than to the neighboring pair: between pairs at least 16 px.

**How to measure.** `gap` of the "icon + text" container: 4, 6 or 8; distance between pairs ≥ 16.

**Bad.** "[icon] Northwind Traders [8 px] [icon] Ships Mon…": the gap inside a pair and between pairs is the same.

**Good.** Inside a pair 6–8, between pairs 24.

**Sources.** [PRIMER-SIZE], [CARBON-BUTTON], [M3-TOKENS], [NNG-PROXIMITY].

## ICON-3. The icon sits on the center of the first line of text

**Rule.** The center of the icon matches the center of the text line (2 px). If the text has several lines, align to the first line, not to the middle of the block. The icon does not shrink (`shrink-0`).

**How to measure.** `row-align` = 0.

**Sources.** [VERCEL-GUIDE].

## ICON-4. Icons for all or for none

**Rule.** In a row of tabs, menu items or detail lines every element has an icon or none has. The "▾" arrow of "More" is not a section icon but a sign of a menu; it stands after the text, 16 px, gap 4.

**Sources.** [PRIMER-NAV].
