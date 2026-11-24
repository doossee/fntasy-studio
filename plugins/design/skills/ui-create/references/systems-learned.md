# What strong design systems do

Principles drawn from what several product teams have published about their design systems and design decisions, restated in our words. They are here to steer direction, not to copy: never reproduce another product's look, brand, typeface, illustrations or screens. Read in November 2026 from the teams' own blogs and documentation and from interviews; where a team's pages could not be read, nothing is claimed about it.

Sources read: Uber (Base design system articles), Spotify (Encore and the company's own typeface), Netflix (Hawkins, for internal studio tools), Airbnb (the design language system case study and a 2025 interview on its redesign), Duolingo (articles on shape language, the core tabs redesign and the character cast), Google Material 3 (typography, colour roles, motion schemes, expressive design research), Apple Human Interface Guidelines (typography, colour, dark mode).

## Name colours by role, in pairs

Colours are tokens named by what they do — surface, primary action, error — and each role comes with a partner colour for the content placed on it. Contrast is then designed once, in the pair, instead of checked screen by screen. The same roles get separately tuned values in light, dark and increased-contrast schemes. → `system.md` "Colour roles".

## Few type styles, built on a scale

Systems publish a fixed set of text styles (a handful of roles, each in a few sizes) and expect most screens to use only some of them. Hierarchy comes from size, weight and colour together, and it must survive when people enlarge text. Platform defaults set the floor for body text. → `system.md` "Type".

## Two typeface slots

A common split is an expressive face for brand moments and headings and a plain, highly legible face for everything else — or one family that covers both. A product with a strong brand may commission its own typeface when licensed ones are neither distinctive nor flexible enough; most products should not, and do well with one good family.

## Scales for everything

Corners, spacing, elevation and motion each come from a short scale. One-off values are the exception that needs a reason. → `system.md`.

## Dark is its own scheme

Dark themes are tuned separately: dimmer backgrounds, brighter foregrounds, layers shown by lighter tone rather than shadow, and an increased-contrast option. Inverting the light theme is not a dark theme. → `ui-rules` COLOR-4.

## Cohesion, not sameness, across platforms

Teams share foundations (tokens, type, colour, iconography) and the logic of components across iOS, Android and web, but each platform keeps its own conventions for navigation, gestures and controls. Users should feel one product, not the same pixels. → `ui-rules` EXP-1, conflict C-2.

## Distinctive through a few owned signatures

What makes products recognisable is a small number of signatures used everywhere and with discipline: a typeface, a shape language (how round, how heavy), a character or illustration vocabulary, colour used for structure rather than decoration. Not ornaments added to each screen. → `craft.md` "Composition" (the screen's move), `rubric.md` criterion 5.

## Expressive, but still usable

Research published with one platform's expressive style reports that emphasising the key element with size, shape, colour and containment helped people find it faster — and that the same teams warn against removing labels or replacing familiar patterns for the sake of expression, and recommend established patterns in serious contexts such as banking. Expression serves the task or it does not belong. → `ui-rules` EXP-1, EXP-7.

## Silhouette before detail

Illustrations and icons are designed to read at small sizes first: a clear silhouette, little detail, generous space. Detail that disappears on a phone is noise.

## Consistency must earn its place

A redesign can remove decoration that was consistent but said nothing (uniform header art on every tab), and motion can have two registers: calm for routine interactions and more expressive for rare moments of achievement. Use the expressive register sparingly. → `system.md` "Motion character", `ui-rules` MOTION-1.

## Spread the system through tools

Teams that keep a system alive build it into the tools people use every day — component libraries in code and in the design tool, generated specs, shared tokens — so that the consistent choice is also the easiest one.
