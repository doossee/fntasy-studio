# Colour

How colour is used: enough contrast for text and controls in every theme, never as the only signal, one job per colour, and a dark theme that is designed rather than inverted.

## Review questions

- Does every text and every control boundary meet its contrast ratio, in light and dark themes?
- If the screen were greyscale, could you still tell errors, statuses, links and the selected item apart?
- Does the accent colour mark only actions, and does only the main one stand out?
- Does each colour mean one thing across the product?
- In the dark theme, are levels, states and brand colours still clear, without glare or muddy grey?

## COLOR-1. Meet contrast for text and controls in every theme

**Lens.** UI.

**Rule.** Text meets the contrast ratio against its background; boundaries and states of controls (input borders, focus rings, selected tabs, icons that carry meaning) meet the non-text ratio against what is next to them. This holds in every theme the product offers and for text placed over images.

**Why.** Low contrast makes text unreadable for people with low vision, on cheap screens and outdoors, and makes controls invisible as controls. "Subtle grey" is the most common way an attractive screen excludes people.

**How to check.**
- Measure foreground/background pairs with a contrast checker or the browser's accessibility panel, in each theme.
- For text over images, measure against the lightest and the darkest area behind the text.
- Measure input borders, focus indicators and state markers against the adjacent colours.

**Thresholds.** Text ≥ 4.5:1; large text (at least 18 pt, or 14 pt bold) ≥ 3:1 [WCAG 1.4.3 AA]; UI components and meaningful graphics ≥ 3:1 [WCAG 1.4.11 AA].

**Bad → Good.** Acme's grey field labels at 2.9:1 and a light-grey input border at 1.6:1 → labels at 7:1, borders at 3.2:1.

**Limits.** A character used as an icon (×, ⊘, ✓) is text to a contrast checker; judge it as text (4.5:1) when in doubt, or replace it with a real icon with an accessible name and judge that at 3:1. Logos, purely decorative graphics and disabled controls are exempt, though a disabled label should still be legible. Brand colours may need a darker or lighter variant for text.

**Evidence.** Standard.

## COLOR-2. Never use colour as the only signal

**Lens.** UI.

**Rule.** Every meaning carried by colour is also carried by something else: a word, an icon, a shape, an underline, a position or a pattern. This applies to errors, statuses, links in text, selected items, required fields and chart series.

**Why.** A noticeable share of people, mostly men, do not tell some colours apart, and colour also fails on monochrome displays, in bright light and in print. A red amount that means "overdue" is just a number to them.

**How to check.** View the screen in greyscale or with a colour-vision simulator. You can still tell an error field from a normal one, a paid order from an overdue one, a link from plain text, the selected tab from the others, and chart series from each other.

**Thresholds.** Colour is not the only visual means of conveying information [WCAG 1.4.1 A].

**Bad → Good.** Acme's order list shows overdue orders with a red amount only → the amount stays red and gets an "Overdue" badge with an icon.

**Limits.** Colour may be the only signal for decoration, or when text next to it already says the same thing.

**Evidence.** Standard.

## COLOR-3. Give each colour one job

**Lens.** UI.

**Rule.** Each colour has one meaning across the product: the accent marks interactive and primary actions, semantic colours mark states (error, warning, success, information), neutrals carry structure and text. The brand colour is not used for non-interactive text. Colours are defined as tokens named by role, with a value for each theme.

**Why.** When the accent also decorates headings and illustrations, people can no longer tell what is clickable, and the primary action stops standing out (LAYOUT-3). When red means both "error" and "sale", people learn to ignore it.

**How to check.**
- List every colour used on three main screens and write the job of each: one job each.
- The accent appears only on interactive elements; error red is used only for errors.
- Each colour token is named by role (`text-secondary`, `action-primary`) and has a value in every theme.

**Thresholds.** One consistent meaning per colour; brand colours not used for non-interactive text [platform: Apple HIG].

**Bad → Good.** Acme uses its brand green for section titles, success messages and the "Pay" button → green only for "Pay" and other primary actions; success uses a distinct green with an icon; titles use the text colour.

**Limits.** Charts may need more hues than the interface; give them their own palette, still checked for contrast and for telling series apart. Proportion rules such as 60-30-10 come from interior design and have no evidence for interfaces (`disputed.md`).

**Conflicts.** S-7.

**Evidence.** Platform guideline and Practice.

## COLOR-4. Design the dark theme; don't invert the light one

**Lens.** UI.

**Rule.** A dark theme has its own palette: dark grey rather than pure black surfaces, off-white rather than pure white text, lighter surfaces for higher levels (where light themes use shadows), and accent and semantic colours adjusted so they stay readable without glowing. Every contrast check is repeated in the dark theme. Images, illustrations, charts and brand marks have dark-theme versions where the light ones fail. The product follows the system setting unless the person chooses otherwise.

**Why.** Inverted colours break hierarchy (shadows vanish on black), make saturated colours vibrate against dark backgrounds, and turn white-background images into glaring blocks. Pure white text on pure black blurs for many people with astigmatism; very dark grey text on dark grey disappears. A theme that is not checked separately is where contrast failures hide.

**How to check.**
- Switch the system to dark mode (or emulate `prefers-color-scheme: dark`) and walk the main task.
- Repeat every COLOR-1 measurement in the dark theme: text, borders, focus rings, icons, chart lines.
- Levels: a raised card or a sheet is distinguishable from the page without a shadow.
- Accent and semantic colours: readable as text on dark surfaces, not glowing; error and success still distinguishable.
- Images and logos with white or transparent backgrounds: no glaring rectangles, no black logo on black.
- Text inputs, scrollbars and native controls follow the theme (`color-scheme` on the web).
- The setting follows the system by default and the person's choice is remembered.

**Thresholds.** The same ratios as COLOR-1 in every theme [WCAG 1.4.3, 1.4.11 AA]; light, dark and increased-contrast variants of colours [platform: Apple HIG, Material 3].

**Bad → Good.** Acme's dark theme is a CSS inversion: the brand blue turns orange, product photos become negatives, cards lose their shadows and merge with the page, and the secondary text is #555 on #121212 (2.5:1) → a designed palette: page #121212, cards #1E1E1E, secondary text #A0A0A0 (7:1), brand blue lightened for text, photos untouched.

**Limits.** A product may ship without a dark theme; then the light theme must still respect the system's increased-contrast setting where the platform offers it. Whether a dark theme is offered at all is a product decision, not a defect.

**Conflicts.** C-17.

**Evidence.** Standard (contrast in every theme) and Platform guideline (dark-theme palettes and levels); the astigmatism remark is Practice, not a measurement.
