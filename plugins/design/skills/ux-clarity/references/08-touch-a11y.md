# Touch and accessibility

Contrast, keyboard focus and grid reflow are checked in detail by an accessibility skill and a layout skill, if the project uses them. Here is what can be measured on the screen and decides whether a finger hits the target and the text can be read.

Examples use the fictional product Acme Orders (`00-audience.md`).

## TOUCH-1. A touch target is 44 px

**Rule.** Everything pressed with a finger is at least 44 × 44 px (profile: `touch-target`). The hard minimum, never to go below in any case, is 24 × 24 px. The exception is a link inside a sentence.

**Why.** Sources give different numbers: 24 px (WCAG-2.5.8, level AA), 44 px (WCAG-2.5.5, HIG-BUTTON), 48 dp (AND-TARGET), about 1 cm (NNG-TOUCH), 7 mm (BAY-HIT). 44 px is the common denominator for a phone; 24 px is the lower bound of the standard.

**How to measure.** `scripts/measure.mjs` (`SKILL.md` → Screenshots and measurements) counts the visible targets and writes to `metrics.json`: `targetsUnder44` (norm: 0 among the elements of the scenario, no more than 2 on the screen) and `targetsUnder24` (norm: 0; a small target with spacing such that its 24 × 24 px area does not touch its neighbours does not count under WCAG). Checkboxes and switches are measured together with their label.

**Bad → good.** The customer name in a list is a 188 × 20 px link; the calendar button is 32 × 32 → the whole row, 56 px high; the button 44 × 44.

Sources: WCAG-2.5.8, WCAG-2.5.5, HIG-BUTTON, AND-TARGET, NNG-TOUCH, BAY-HIT.

## TOUCH-2. There is a gap between targets

**Rule.** Between neighbouring touch targets: at least 8 px. A destructive action does not sit flush against a frequent one.

**Why.** Tightly packed targets cause misses; near the screen edges accuracy is lower still (AND-TARGET, NNG-TOUCH, HOOBER-TOUCH).

**How to measure.** Measure the distance between the borders of neighbouring buttons in a row and in a column: ≥ 8 px.

**Bad → good.** The "Shipped" and "On hold" buttons touch each other → an 8 px gap.

Sources: AND-TARGET, NNG-TOUCH, HOOBER-TOUCH.

## TOUCH-3. Text is readable without zooming

**Rule.** The smallest text on the screen is 12 px (profile: `min-font`), body text from 14 px, text in input fields from 16 px.

**Why.** Small text on a phone is read with mistakes, especially in a second language (NNG-LITERACY). In a field with text smaller than 16 px a phone browser zooms the page by itself on input, and the screen "jumps". The thresholds are this skill's defaults; the project profile may raise them.

**How to measure.** `metrics.json`: `textUnder12` equals 0. In the inspector the input fields have `font-size` ≥ 16 px at 390 px.

**Bad → good.** A hint under a field at 11 px in grey → 13–14 px.

Sources: NNG-LITERACY, WCAG-1.4.3.

## TOUCH-4. Pinned elements do not cover content

**Rule.** The bottom bar, a pinned button and the header do not overlap the last row of content, the focused field or messages. Under a pinned element there is padding equal to its height. Pinned elements take no more than a third of the screen height.

**Why.** A focused element must not be covered (WCAG-2.4.11); pinned elements that eat the screen leave little room for the task (NNG-SHEET).

**How to measure.** Scroll the screen to the end at 390 × 844: the last row and the button are fully visible above the bottom bar. Add up the heights of the header, the bottom bar and pinned blocks: ≤ 281 px (a third of 844).

**Bad → good.** The link "Change the date or add a note" goes under the bottom bar → bottom padding equals the height of the bar and the pinned button.

Sources: WCAG-2.4.11, NNG-SHEET.

## TOUCH-5. Meaning is not carried by colour alone or by an icon alone

**Rule.** A status, an error and a warning have text. An icon button without a label is allowed only for universally known signs (search, close, back, "⋯") and always has an `aria-label`.

**Why.** Colour is not the only carrier of meaning (WCAG-1.4.1); an icon without a label is understood in different ways (NNG-ICON).

**How to measure.** Find the icons on the screen that have no text next to them. Each one is from the universally known list. Coloured dots and badges without a word: 0.

**Bad → good.** A yellow dot in the header without a label; a button with a message icon in every list row → the label "Tips"; the action "Message" on the Customer card.

Sources: WCAG-1.4.1, NNG-ICON.

## TOUCH-6. Works at 320 px and with large text

**Rule.** At a width of 320 px the screen loses no actions and does not scroll sideways. With text enlarged to 200 % buttons and labels are not cut.

**Why.** Requirements of WCAG-1.4.10 and 1.4.4; part of the audience has small phones and large text switched on.

**How to measure.** Window width 320 px: `overflowX` equals 0, the primary button is visible. Browser zoom 200 %: button labels can be read in full.

**Bad → good.** At 320 px two buttons in a row stick out of the screen → they wrap one under the other.

Sources: WCAG-1.4.10.
