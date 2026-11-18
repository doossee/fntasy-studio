# 14. Colour within the brand (COLOR)

The palette is given: the project profile (→ Brand), values in the project's stylesheet. This skill introduces no new colours. It answers another question: **how much colour, where and for what**. Colour on a working screen is neither decoration nor "one accent on grey": it has jobs, and each is named.

Token names below (`primary`, `accent`, `danger`, `surface-2`, `chart-other`, …) are role names. Map them to the project's own tokens in the profile → Brand.

## COLOR-1. Five jobs of colour

**Rule.** Colour on a screen does only these jobs:

| Job | Tokens | Example |
| --- | --- | --- |
| **Action** | `primary` | the one filled button, links, focus |
| **Selection and place** | `accent` + `accent-foreground` | active menu item, selected row, selected chip, "today" in a grid |
| **Exception state** | `danger`, `warning`, `success`, `info` and their `*-foreground`; the project's money tokens, if it has them | overdue, late, "not shipped", prepayment |
| **Data series** | `chart-*` and the project's category tokens | payment methods, order statuses, categories |
| **Leading move of the screen** | `primary` or `accent` | last point of a sparkline, the plan bar |

Everything else is ink `foreground`, second level `muted-foreground` and neutral surfaces. Every coloured element of the screen can be assigned one of the five jobs in the report; if it cannot, the colour is removed.

**Why.** When colour occurs only where something needs attention or responds to a press, the eye finds it without reading. A grey screen with one button in the primary colour is unfinished: state and selection on it have to be read in words.

**How to measure.** A list of the coloured elements of the first viewport with a job for each. `composition.tintShare` and `coloredTextShare` (COLOR-2).

**Sources.** [SKILL-COLOR], [KENNEDY-COLOR], [PP-DASH], [PROFILE].

## COLOR-2. Dose: 90 / 8 / 2

**Rule.** By area of the first viewport of the main area: neutral surfaces and ink about 90 %, state and selection backings up to **12 %**, saturated `primary` fill (button, bar, last point of a chart) about 2 %. No more than a **quarter** of the texts are set in coloured text (state, link, money). There is **one** button filled with the primary colour in the first viewport. One is not zero: if the screen demands an action ("14 orders not shipped", an overdue balance), the button of that action is filled, even when the strip around it has been made quiet. A disabled filled button counts too; a secondary one ("Add note") is made outline. A typical failure: a "quieter" pass strips the fill from the action the screen demands, and the clarity review returns stop item ACT-1.

The state strip in the header of an object card (COMP-2) is the only large backing on the screen: with it the share of backings is up to **16 %**, and there are no other backings on the screen except badges. The billing contact and other contacts next to it stand on white.

**How to measure.** `composition.tintShare` ≤ 0.12 (with a state strip ≤ 0.16; above that `color-noise`); `coloredTextShare` ≤ 0.25; `primaryButtons` ≤ 1 (otherwise `multi-primary`).

**Bad.** Red amounts in every row, green badges on everyone, three buttons in the primary colour.

**Good.** Red for the overdue total and the age of the two oldest; the amount in a row in ink: the column is already called "Balance".

**Sources.** [INTERFACE-DESIGN], [BASELINE-UI], [PP-DASH].

## COLOR-3. Red and green only for what really is so

**Rule.** `danger` (and a negative-money token) is for an amount owed and a delay that must be acted on. `success` (and a positive-money token) is for money received, a prepayment. The rise and fall of an indicator that is neither "good" nor "bad" in itself (number of deals, warehouse occupancy) is not coloured: an arrow and words. Red in a list goes to the exception (DATA-4), not to every row. A warning (`warning`) is what becomes a problem if not done today: an order not shipped, a deal without a reply.

Colour is never the only carrier: a word, a sign or an icon stands beside it.

**How to measure.** Every red, yellow and green element on the screenshot has a word or an icon within 8 px. In a list no more than a third of the rows are marked red.

**Sources.** [TUFTE-SPARK], [PP-DASH], [VERCEL-GUIDE], [PROFILE].

## COLOR-4. State: quiet backing, text from its own pair

**Rule.** A state badge and a state banner are a token pair: background `warning`, text `warning-foreground`; the border, if needed, is the same `*-foreground` at 20–30 % opacity. Grey text is not put on a coloured backing: secondary text there is the same `*-foreground` at 75–80 % opacity. State in a list row is a coloured word or a badge in its own cell; the whole row is not filled. A full-width banner: one per screen and only for what blocks work.

**How to measure.** Every background/text pair comes from one token pair (the project's contrast test, if it has one, covers contrast). Full-width banners ≤ 1.

**Sources.** [SKILL-COLOR], [GEIST-COLORS], [STRIPE-COLOR], [PROFILE].

## COLOR-5. Surfaces: three tones and not one more

**Rule.** The light theme has three neutral tones: page `background`, panel `card`, layer `surface-2` (hover, totals strip, table header, nested zone). A fourth grey is not introduced. A nested zone inside a white panel is `surface-2` with no frame; a panel on the page is white with a `border` frame. Frame and divider use `border`; `border-strong` only on controls. Navigation is quieter than content: the text and icons of the sidebar are no more contrasting than the text of the main area.

**How to measure.** The count of distinct background colours of neutral surfaces in the first viewport ≤ 3 (badges and buttons excluded).

**Sources.** [LINEAR-REFRESH], [INTERFACE-DESIGN], [HOBDAY], [PROFILE].

## COLOR-6. Themes and a changeable primary

**Rule.** A screen is built only from token roles and checked in every theme the product ships (profile → Brand; for example light, warm and dark) and, if a tenant or a user can change the primary colour, with a different one (for example blue or green): `primary` can turn out to be anything, so the meanings "owed", "success", "warning" are not hung on it, and `info` and `success` are not placed flush against `primary`. In a dark theme height is carried by a lighter surface and a border; there is no shadow.

**How to measure.** Screenshots of the leading screen in every theme; the markup has no colour values other than tokens (search for `#`, `rgb(`, `oklch(` in the classes and styles of the screen: 0).

**Sources.** [PROFILE], [HOBDAY], [KREHEL].

## COLOR-7. Sparklines and series: grey is the ground, colour is the answer

**Rule.** In a chart colour marks what the question is about: today, the current month, an overrun. The rest is `chart-other` or `primary` at 25–30 % opacity. Categories (payment methods, order statuses) have their own constant tokens in a constant order; no more than four categories are shown in one bar, the rest is "other".

**How to measure.** Saturated colours in one chart ≤ 2 (for categories ≤ 4); the order of categories matches the order on other screens.

**Sources.** [TUFTE-SPARK], [CARBON-DASH], [DATAVIZ-SKILL].
