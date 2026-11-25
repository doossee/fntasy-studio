# Taste

Taste is the set of choices that are not right or wrong for usability but make a product feel like itself. It is decided per product, written in the profile, and followed by the designer and the judge. It never overrides the `ui-rules` floor.

## Five axes

Each axis is scored 1–5. The two ends are both legitimate; the middle is not "safe", it is a choice too.

| Axis | 1 | 5 | What moves it |
| --- | --- | --- | --- |
| Calm ↔ expressive | Neutral surfaces, colour only for meaning, almost no imagery | Large areas of colour, imagery, illustration, motion with character | Amount of colour and imagery, size of display type |
| Dense ↔ spacious | Many items per screen, compact rows, small gaps | Few items, generous space, one thing at a time | Row height, spacing steps, items in the first screen |
| Strict ↔ playful | Straight lines, small radii, plain copy | Round shapes, mascots or illustrations, warm or humorous copy | Shape language, illustration, tone of voice |
| Neutral ↔ brand-led | The brand appears as a logo and an accent | Brand colour and type drive whole areas of the page | Share of the screen in brand colour, use of brand type |
| Conventional ↔ novel | Standard controls and layouts people already know | Own layouts, gestures and controls | How many patterns differ from the products the audience uses |

## The default taste

When the profile has no taste section, design and judge with this one, and say so in the hand-over:

calm 2 · dense 3 · strict 3 · brand-led 2 · conventional 2.

In words: a neutral base with colour for meaning, one bold move per screen at most, size set by importance, space before boxes, three text levels, standard controls, the brand used with restraint. It is a sensible starting point for tools and services, not a universal truth; consumer products for leisure, games, children's products and luxury brands usually sit elsewhere.

## Familiar first

People understand a new screen through the products they already use. A design that reuses those conventions costs them nothing to learn; every new pattern costs every person time and errors, and costs most for people with the least experience (`ui-rules` EXP-1, EXP-8).

- **Take the reference products from the audience, not from designers' favourites.** The profile lists the products the audience uses every day (their messenger, their bank, their marketplace, their country's state services). Those set the conventions: where search sits, what a primary button looks like, how a form shows errors.
- **The less experienced the audience, the lower "conventional ↔ novel" must be.** For an audience that includes people unsure what a text field is or which text is a button, use visible input boxes with labels, filled buttons with verb labels for the main action, text labels on icons, visible navigation, and no gestures without buttons.
- **Expression lives in what does not need learning:** colour, imagery, type, copy, illustration. Controls, navigation and forms stay conventional unless the profile says otherwise.

## Reference families

Groups of widely used products that share a taste, with what was observed on their public pages. Use a family to describe a direction ("closer to the quiet utilities than to the playful learning apps"), then take principles, never the look, logo or screens. See `taste-references.md`.

## How the judge uses taste

The judge reads the profile's taste section (or the default above) before scoring. Criterion 5 of `rubric.md` ("character") is scored against that taste: a calm product is not marked down for being calm, and an expressive one is not marked down for colour. The other criteria do not change with taste.
