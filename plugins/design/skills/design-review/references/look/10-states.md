# 10. States without shift (STATE)

Which states must exist and how they look is covered by the clarity lens (`references/clarity/05-states.md`, STATE) and by an accessibility skill, if the project uses one. This file has one requirement: a change of state does not move the neighbors.

## STATE-1. Hover and focus do not change size

**Rule.** On hover and focus the color, background, shadow or ring (`ring`, `outline`) change, but not `border-width`, `padding`, `font-weight` or size. A border that appears in a state already exists at rest, transparent.

**How to measure.** The script (`references/look/11-measure.md`), rule `state-shift`: up to 40 visible targets of the screen; the rectangles of the target, its parent and its sibling before and after hover and focus; a difference above 0.5 px is a violation. Threshold: 0.

**Sources.** [WEBDEV-CLS], [WCAG-FOCUS].

## STATE-2. The selected item is not wider than the unselected

**Rule.** A selected tab, menu item or chip differs by color, background, an indicator line. If the font weight changes, room for the wider text is reserved (the same weight for all, or an invisible copy of the bold text). The tab indicator is drawn over the bottom line of the row and adds no height.

**How to measure.** The width of a tab in the selected and the unselected state is the same (0.5 px).

**Sources.** [CARBON-TABS], [PRIMER-NAV].

## STATE-3. Loading takes as much room as the content

**Rule.** The skeleton repeats the height and the number of lines of the future content; a button that is waiting keeps its width and label; counters in tabs and badges that appear after loading have reserved room or appear all at once.

**How to measure.** The height of the block while loading and with data differs by no more than 8 px.

**Sources.** [WEBDEV-CLS], [VERCEL-GUIDE], [PRIMER-NAV].

## STATE-4. A field error does not push the form

**Rule.** The error text appears 4 px under the field; the form buttons may move down, but the fields next to it (in the same row) stay on one line: the row is aligned to the top.

**How to measure.** In a row of two fields the top edges of the fields match when one of them has an error.

**Sources.** [CARBON-INPUT].
