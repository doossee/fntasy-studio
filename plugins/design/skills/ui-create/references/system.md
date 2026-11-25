# A small visual system

Decide the system before drawing screens. A screen built on a system looks deliberate even when it is plain; a screen of one-off values looks careless even when every value is pretty. Write the system as named tokens (`text-primary`, `space-4`, `radius-card`) so that screens refer to roles, not to numbers.

If the project already has a design system or a profile with tokens, adopt it and change nothing silently: propose a change with its reason instead.

## Type

- **One or two typefaces.** One family with several weights covers most products; a second one only for a clear role (display headings, code, numbers). System fonts are a valid choice and load instantly.
- **A short scale with visible steps.** Five or six sizes cover an app: caption, secondary, body, subtitle, title, display. Neighbouring steps differ enough to be told apart at a glance — roughly a ratio of 1.2 to 1.333 between steps for UI, larger for marketing pages. Round to whole pixels.
- **Line height by size.** About 1.4–1.6 for body text, tighter (1.1–1.25) for large headings. Keep line heights on the spacing grid where you can.
- **Weights with jobs.** Regular for reading, medium or semibold for labels and emphasis, bold for display. Three weights are usually enough. No thin weights at small sizes.
- **Numbers.** Tabular figures wherever numbers are compared or change (tables, prices, timers); proportional figures in running text.
- **Body size** is at least the platform default (`ui-rules` TEXT-2).

## Spacing

- **One base unit**, 4 or 8 px, and a scale built on it: 4, 8, 12, 16, 24, 32, 48, 64. Small steps for inside components, large steps between sections.
- **Spacing shows grouping.** Inside a group is tighter than between groups; the step between sections is clearly larger than inside them (`ui-rules` LAYOUT-2).
- **Density is a decision**, not an accident: name it (compact for tools used all day, comfortable for occasional use) and keep it across the product.

## Colour roles

Define colours by role, each with a value per theme (light, dark, and increased contrast where the platform offers it):

- **Surfaces**: page, raised (cards, sheets), sunken (inputs, wells), overlay.
- **Text**: primary, secondary, disabled, on-accent.
- **Lines**: divider (subtle), border (for controls, meets 3:1), focus ring.
- **Accent**: the one colour for primary actions and selected states, with hover and pressed variants.
- **Status**: error, warning, success, information — each with a strong value for text and icons and a soft value for backgrounds.
- **Data**: a separate palette for charts, checked for contrast and for colour-blind separation.

Rules of thumb: build neutrals as one ramp of greys (warm or cool, not both); keep the accent for actions; give each status colour one meaning; check every text pair for contrast in every theme (`ui-rules` COLOR-1). The brand hue is fixed by the brand; its lightness may change per theme.

## Depth

Choose **one** strategy for showing layers and keep it everywhere:
- **borders** — a thin line around raised things; calm, works in both themes;
- **shadows** — soft and few levels (resting, raised, overlay); in dark themes shadows barely show, so raise surfaces by lighter colour instead;
- **tonal surfaces** — layers differ by background tone; good for dense tools and dark themes.

Mixing strategies (a bordered card with a heavy shadow inside a tinted panel) reads as noise.

## Radius

One small set: for example 4 for inputs and chips, 8 for buttons and cards, 16 for sheets, full for pills and avatars. Nested shapes use a smaller inner radius than the outer one (outer radius − padding), or they look swollen.

## Icons

One set, one stroke weight, one optical size per context (for example 20 px in lists, 24 px in bars), aligned to the text they sit with. Universal icons only without labels (`ui-rules` EXP-7).

## Motion character

Decide in one sentence how things move — for example "quick and direct: 150–250 ms, ease-out, no bounce". Then use it everywhere and respect reduced motion (`ui-rules` MOTION-1).

## Write it down

A token table (name, light value, dark value, role) at the top of the prototype or in the hand-over is the system. Screens that use a value outside it are either wrong or a reason to change the system on purpose.
