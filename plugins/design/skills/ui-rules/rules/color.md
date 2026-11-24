# Colour

How colour is used: enough contrast for text and controls in every theme, never as the only signal, and one job per colour.

## Review questions

- Does every text and every control boundary meet its contrast ratio, in light and dark themes?
- If the screen were greyscale, could you still tell errors, statuses, links and the selected item apart?
- Does the accent colour mark only actions, and only the main one stand out?
- Does each colour mean one thing across the product?

## COLOR-1. Meet contrast for text and controls in every theme

**Rule.** Text has a contrast ratio of at least 4.5:1 against its background, large text at least 3:1. Boundaries and states of controls (input borders, focus rings, selected tabs, icons that carry meaning) have at least 3:1 against what is next to them. This holds in every theme the product offers and for text placed over images.

**Why.** Low contrast makes text unreadable for people with low vision, on cheap screens and outdoors. WCAG 2.2 makes these ratios a requirement: 1.4.3 Contrast (Minimum) — 4.5:1 for text, 3:1 for large text (at least 18 pt, or 14 pt bold); 1.4.11 Non-text Contrast — 3:1 for UI components and meaningful graphics. Apple and Material use the same values, and Material asks 3:1 for navigation bar icons against their container.

**How to check.** Measure foreground/background pairs with a contrast checker or the browser's accessibility panel, in each theme. For text over images, measure against the lightest and darkest area behind the text. Pass: all text ≥ 4.5:1 (≥ 3:1 if large); input borders, focus indicators and state markers ≥ 3:1. Disabled controls are exempt, but their label should still be legible.

**Bad → Good.** Acme's grey placeholder-style field labels at 2.9:1 and a light-grey input border at 1.6:1 → labels at 7:1, borders at 3.2:1.

**Limits.** Logos and purely decorative graphics are exempt. Brand colours may need a darker or lighter variant for text use.

**Evidence.** Standard (WCAG 2.2, AA).

**Sources.** WCAG 2.2 (1.4.3, 1.4.11); Apple HIG (Accessibility, Color); Material 3 (Color contrast, Navigation bar); secondary: Figma Resource Library (Typography in design), uxpilot.

## COLOR-2. Never use colour as the only signal

**Rule.** Every meaning carried by colour is also carried by something else: a word, an icon, a shape, an underline, a position or a pattern. This applies to errors, statuses, links in text, selected items, required fields and chart series.

**Why.** About one in twelve men has some colour vision deficiency (a commonly cited figure; source varies), and colour also fails on monochrome displays, in bright light and in print. WCAG 2.2 1.4.1 (Level A) forbids colour as the only visual means of conveying information.

**How to check.** View the screen in greyscale or with a colour-vision simulator. Pass: you can still tell an error field from a normal one, a paid order from an overdue one, a link from plain text, the selected tab from the others and chart series from each other.

**Bad → Good.** Acme's order list shows overdue orders with a red amount only → the amount stays red and gets an "Overdue" badge with an icon.

**Limits.** Colour may be the only signal for decoration or when the text already says the same thing.

**Evidence.** Standard (WCAG 2.2, A).

**Sources.** WCAG 2.2 (1.4.1); Apple HIG (Color, Accessibility); NN/g (Error-message guidelines, 2023; Visual hierarchy, 2021); secondary: Figma Resource Library (Accessible & inclusive design), IxDF (colour topic, as pointer).

## COLOR-3. Give each colour one job

**Rule.** Each colour has one meaning across the product: the accent marks interactive and primary actions, semantic colours mark states (error, warning, success, information), neutrals carry structure and text. The brand colour is not used for non-interactive text. Every colour has light and dark (and, where offered, high-contrast) variants defined as tokens by role.

**Why.** When the accent also decorates headings and illustrations, people can no longer tell what is clickable, and the primary action stops standing out (see LAYOUT-3). Apple asks to use each colour for one consistent meaning, not to reuse brand colours for non-interactive text, and to provide light, dark and increased-contrast variants.

**How to check.** List every colour used on three main screens and write the job of each. Pass: every colour has one job; the accent appears only on interactive elements; error red is used only for errors; each colour token is named by role (e.g. `text-secondary`, `action-primary`) and has a dark-theme value. The number of hues is small enough that each role is distinct (ours: about 1 accent + semantic set + neutrals).

**Bad → Good.** Acme uses its brand green for section titles, success messages and the "Pay" button → green only for "Pay" and other primary actions; success uses a distinct green with an icon; titles use the text colour.

**Limits.** Charts may need more hues than the UI; give them their own palette, still checked for contrast and distinguishability. The "60-30-10" proportion rule comes from interior design and has no evidence for interfaces (see disputed.md).

**Evidence.** Platform guideline (Apple) and Heuristic (design-system practice).

**Sources.** Apple HIG (Color); Material 3 (Color system); NN/g (Visual hierarchy, 2021); Figma Resource Library (Design tokens; Types of color palettes); secondary: "58 rules" (Bakusevych), IBM design principles.
