# 3. Grouping by proximity (GROUP)

## GROUP-1. Inside a group is tighter than between groups, by at least a factor of two

**Rule.** The distance between elements of one group is at least 2 times smaller than the distance to the neighboring group. Working pairs from the scale: 4 and 8–12, 8 and 16–24, 12 and 24–32, 16 and 32–48.

**Why.** People read groups by distance before they read words. With equal intervals (12, 12, 12) the screen turns into one stack of lines and you have to read everything in order to understand what belongs to what.

**How to measure.** On the screenshot or in the browser dev tools: `gap` inside the group and `gap` between groups; ratio ≥ 2.

**Bad.** Header of the Order card: number, badge, customer, delivery date, tabs, all 8 px apart.

**Good.** Order number and status badge: 8; detail lines under the title: 4 between them; from the header to the tabs: 24; from the tabs to the content: 16.

**Sources.** [NNG-PROXIMITY], [NNG-FORM-SPACE], [CARBON-INPUT], [CARBON-FORM].

## GROUP-2. A heading is closer to its content than to the previous block

**Rule.** The space above a block heading is at least 2 times the space below it. Page title → subtitle: 4–8; block heading → content: 8–12; previous block → heading: 24–32.

**How to measure.** Two numbers on the screenshot: above the heading and below it.

**Bad.** "3 of 12 items shipped" at an equal distance from the banner above and the table below.

**Good.** 24 above, 8 below.

**Sources.** [NNG-PROXIMITY], [ATL-TYPE].

## GROUP-3. A label belongs to its field

**Rule.** Label → field: 8 px (4–8). Field → hint or error: 4 px. Between fields: 16 px (not less than 16). Between groups of fields: 24–32. Last field → form buttons: 24.

**How to measure.** Computed `gap` values in the form.

**Bad.** A label 8 px above its own field and 8 px below the previous one.

**Good.** 8 and 16.

**Sources.** [NNG-FORM-SPACE], [CARBON-INPUT], [CARBON-FORM].

## GROUP-4. Different facts are not glued into one line with spaces

**Rule.** Two different facts on one line (customer and shipping progress, date and amount) are separated in one of three ways: a dot separator " · " with spaces; a gap of at least 16 px plus an icon or label for each; separate lines. A plain 8–12 px gap between two texts of the same look is not allowed.

**Why.** "Northwind Traders   3 of 12 shipped" reads as one phrase with a hole in it.

**How to measure.** Two neighboring texts of the same size and color in one row: between them either a separator, or ≥ 16 px and an icon of their own.

**Bad.** `Northwind Traders   3 of 12 shipped`.

**Good.** A person icon + "Northwind Traders", below it a calendar icon + "Ships Mon, Nov 16", below it a box icon + "3 of 12 shipped"; on desktop in one row 24 px apart, each with its own icon.

**Sources.** [NNG-PROXIMITY], [NNG-REGION].

## GROUP-5. A frame is for when spacing is not enough; no more than one frame inside a frame

**Rule.** A group is first set apart by spacing. A border or background is added when there are several blocks and they differ in kind. Nesting: page → card → tile or row; a card inside a card is not made.

**How to measure.** The number of nested frames around any text ≤ 2 (not counting the border of a button or an input).

**Sources.** [NNG-REGION].
