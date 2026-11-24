# Text

How text is sized, set and worded on screens: the type scale, how easy body text is to read, whether text survives zoom and spacing changes, and whether labels and messages say what they mean.

## Review questions

- Can you name every text size on the screen, and are there no more than a handful of them?
- Is body text at least the platform's default size, set left-aligned, in lines that are not too long?
- At 200% zoom and at 320 px wide, is every piece of text still visible and readable?
- Does every button say what will happen, in a verb?
- Could a first-time user understand every message without knowing the product's internal terms?

## TEXT-1. Use a short type scale with clear steps

**Rule.** Use a small set of text sizes and weights, each with one role (page title, section title, body, secondary, caption). Neighbouring steps differ enough to be told apart at a glance. Avoid very thin weights for small text.

**Why.** Hierarchy is read from differences in size and weight; many near-identical sizes read as noise rather than as levels. Apple's guidance warns against ultralight, thin and light weights at small sizes because they lose legibility, and asks to limit the number of typefaces.

**How to check.** List every distinct font size and weight on the screen (browser inspector or a design file). Pass: no more than about 4-5 sizes on one screen (ours), each used for one role; two neighbouring sizes differ by at least 2 px (ours); no weight below Regular for text under 16 px; at most two typefaces. NN/g suggests at most three sizes and two large elements on a screen as a heuristic.

**Bad → Good.** An Acme order screen uses 13, 14, 15 and 16 px for body and labels → 14 px for secondary text, 16 px for body, 20 px for section titles, 28 px for the page title.

**Limits.** Dense data screens may need an extra small size for table metadata; data visualisations follow their own scale.

**Evidence.** Heuristic: sizes and counts are practitioner guidance; the advice on thin weights is a platform guideline.

**Sources.** Apple HIG (Typography); NN/g (Visual hierarchy, 2021, heuristic numbers); Figma Resource Library (Typography in design); secondary: IxDF (pointer: Boyarski et al. 1998), "58 rules" (Bakusevych), uxpilot.

## TEXT-2. Make body text easy to read

**Rule.** Body text is at least the platform default (16 px on the web is the common convention; 17 pt on iOS, 13 pt on macOS per Apple), left-aligned (start-aligned in right-to-left languages), not justified, in lines of reasonable length, with comfortable line height. Long passages are not set in capitals.

**Why.** Small, tightly set, justified or overly long lines slow reading and lose the line start. WCAG 1.4.8 (AAA) names lines of no more than 80 characters (40 for CJK), no justified text and line spacing of at least 1.5 for blocks of text. Apple gives 17 pt as the iOS default and 11 pt as the minimum.

**How to check.** Measure body font size and line height in the inspector; count characters in a typical full line at the widest layout. Pass: body ≥ 16 px web / 17 pt iOS default; line length ≤ 80 characters (WCAG AAA), aiming at about 45-75 (convention, ours as a target); line height ≥ 1.4 for body (ours; WCAG 1.4.8 asks 1.5 at AAA); no `text-align: justify` on body text; no capitalised passage longer than one short line.

**Bad → Good.** Acme's help article runs across a 1440 px window at 14 px, justified, 140 characters a line → 16 px, max-width ~70 characters, left-aligned, line height 1.5.

**Limits.** Tables, labels and captions can be smaller than body text but should stay at or above the platform minimum (11 pt on iOS). Display headlines can be set tighter.

**Evidence.** Standard for the AAA limits (WCAG 1.4.8); Platform guideline for default sizes (HIG); the 45-75 target is convention.

**Sources.** WCAG 2.2 (1.4.8); Apple HIG (Typography); NN/g (Visual hierarchy, 2021); Figma Resource Library (Typography in design); secondary: IxDF (pointer: Rello et al. 2012), uxpilot.

## TEXT-3. Text must survive 200% zoom, wider spacing and 320 px

**Rule.** When text is enlarged to 200%, when line, paragraph, letter and word spacing are increased, or when the window is 320 CSS px wide, no text is cut off, overlapped or hidden, and nothing needs sideways scrolling. Essential text (amounts, names, errors, button labels) is never truncated.

**Why.** People with low vision enlarge text and change spacing; designs with fixed-height boxes and single-line labels break first. WCAG 2.2 requires this: 1.4.4 Resize Text (200%), 1.4.12 Text Spacing (line height 1.5×, paragraph 2×, letter 0.12×, word 0.16× the font size), 1.4.10 Reflow (320 CSS px without two-dimensional scrolling). Apple's Dynamic Type and Android font scaling apply the same pressure in apps.

**How to check.** Browser zoom to 200%; apply a text-spacing bookmarklet or user stylesheet with the four 1.4.12 values; set the viewport to 320 px. Pass in all three: every label and value fully visible, no overlap, no horizontal scroll except for data tables, maps and similar 2D content. In apps: largest accessibility text size; text wraps instead of truncating, side-by-side items stack.

**Bad → Good.** At 200% the Acme "Record payment" button label is clipped to "Record pa…" inside a fixed 40 px-high button → the button grows with its label and wraps to two lines.

**Limits.** Content that needs two-dimensional layout (data tables, maps, diagrams) is exempt from reflow but must still be readable when zoomed.

**Evidence.** Standard (WCAG 2.2, AA).

**Sources.** WCAG 2.2 (1.4.4, 1.4.10, 1.4.12); Apple HIG (Typography, Layout, Accessibility); Material 3 (Accessibility); secondary: IBM design principles (room for longer translations).

## TEXT-4. Write labels and messages in plain, specific words

**Rule.** Buttons start with a verb and name the result ("Record payment", "Send invoice"), not "OK", "Submit" or "Continue". Messages use the words users use, short sentences and one idea per sentence. The same thing has the same name everywhere, and the tone is consistent.

**Why.** People read the button, not the paragraph around it; a specific label tells them what will happen. In an NN/g study of 50 people, rewriting a site in simpler language raised task success for lower-literacy users from 46% to 82% (and for higher-literacy users from 68% to 93%). Apple asks for verb-led button titles and allows "OK" only in purely informational alerts.

**How to check.** Read each button label alone: can you say what happens after pressing it? Pass: verb + object, no generic label (OK, Yes, Submit, Continue, Done) except in purely informational dialogs. Read each message: sentences of about 15-20 words or fewer (heuristic: NN/g); no internal terms, codes or abbreviations users would not know; the same object has one name across screens.

**Bad → Good.** Acme's dialog "Proceed? [OK] [Cancel]" → "Delete invoice 1042? [Delete invoice] [Keep invoice]".

**Limits.** Expert tools can use the domain's own vocabulary when all users share it; define terms the first time they appear.

**Evidence.** Research for plain language (NN/g, 50 people); Platform guideline for button titles; the sentence length is a heuristic.

**Sources.** Apple HIG (Alerts, Buttons); NN/g (Lower-literacy users, 2005; Plain language for experts, 2017; Button states, 2025); secondary: U.S. Web Design System, "58 rules" (Bakusevych), uxpilot.
