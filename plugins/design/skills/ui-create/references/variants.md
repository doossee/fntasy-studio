# Variants

One design shows one guess. Two or three variants that differ on purpose show the choice, and let the person who owns the product choose with the costs in view.

## Fix what does not change

Before the first variant, write what every variant keeps: the app shell and navigation, the brand's fixed parts and tokens, the set of capabilities on the screen, the task path, and the `ui-rules` floor. Variants differ in how the screen answers its question, not in what the product can do.

## Pick axes

Each variant gets **one named axis**: the dimension on which it takes a stand. Useful axes:

| Axis | One end | Other end |
| --- | --- | --- |
| Density | Many records, compact rows, everything at once | Few items, large, one at a time |
| What leads | The number (a total, a status) | The list (the work to do) or the action |
| Layout model | Table / grid | Timeline, map, board, single card |
| Disclosure | Everything visible | Summary first, details on demand |
| Tone | Quiet and neutral, colour only for meaning | Expressive: brand colour, large type, imagery |
| Guidance | Expert: shortcuts, no hints | Guided: steps, examples, empty states that teach |

Make one variant deliberately quiet: the plain, well-made solution. It is the baseline the bolder ones must beat.

If several people or agents build variants, give each one its axis and do not show it the others, so they do not converge.

## Check that they differ

Two variants are really different when a person sees the difference in two seconds. Test at least two of these:

- a different element is seen first;
- a different number of records or items in the first screen;
- different proportions of the main columns or areas;
- a different layout model (table vs timeline vs cards);
- a different tone (neutral vs brand-led).

Variants that differ only in colour shade, corner radius or icon style are one variant.

## Hand over

A table, one row per variant:

| Variant | Axis | Gains | Costs | Rubric (blind) | Floor (`ui-rules`) |
| --- | --- | --- | --- | --- | --- |

Plus, for each variant: screenshots at every width and theme, and "where it is now" for every element that moved compared with the current screen. End with a recommendation and what you would combine from the others. Do not merge a variant into the product before the owner chooses.
