# Text

How text is sized, set and worded on screens: the type scale, how easy body text is to read, whether text survives zoom and spacing changes, whether labels and messages say what they mean, and whether text is ready for other languages. Examples of interface wording in several languages are in `microcopy.md`.

## Review questions

- Can you name every text size on the screen, and are there only a handful of them?
- Is body text at least the platform's default size, set start-aligned, in lines that are not too long?
- At 200% zoom and at 320 px wide, is every piece of text still visible and readable?
- Does every button say what will happen, in a verb?
- Could a first-time user understand every message without knowing the product's internal terms?
- Does the screen hold in the longest supported language, in right-to-left scripts, and with local formats?

## TEXT-1. Use a short type scale with clear steps

**Rule.** Use a small set of text sizes and weights, each with one role (page title, section title, body, secondary, caption). Neighbouring steps differ enough to be told apart at a glance. Very thin weights are not used for small text.

**Why.** Hierarchy is read from differences in size and weight; many near-identical sizes read as noise rather than as levels. Thin strokes at small sizes lose legibility, especially on low-resolution screens and in dark themes.

**How to check.**
- List every distinct font size and weight on the screen (inspector or design file); each is used for one role.
- Check that neighbouring sizes are clearly different.
- No weight below regular for small text; a small number of typefaces.

**Thresholds.** Sizes on one screen [profile: text.max-sizes = 5]; smallest step between neighbouring sizes [profile: text.min-step = 2 px]; thin weights not used for small text [platform: Apple HIG].

**Bad → Good.** An Acme order screen uses 13, 14, 15 and 16 px for body and labels → 14 px for secondary text, 16 px for body, 20 px for section titles, 28 px for the page title.

**Limits.** Dense data screens may need an extra small size for table metadata; charts follow their own scale. Two sizes can be enough when headings and body are clearly different.

**Evidence.** Practice; Platform guideline for thin weights.

## TEXT-2. Make body text easy to read

**Rule.** Body text is at least the platform's default size, start-aligned (left in left-to-right languages, right in right-to-left ones), not justified, in lines of reasonable length, with comfortable line height. Long passages are not set in capitals.

**Why.** Small, tightly set, justified or very long lines slow reading and make the eye lose the start of the next line. Capitals remove word shapes and slow reading of anything longer than a short label.

**How to check.**
- Measure body font size and line height in the inspector.
- Count characters in a typical full line at the widest layout.
- No `text-align: justify` on body text; no capitalised passage longer than one short line.

**Thresholds.** Lines ≤ 80 characters (40 for CJK), not justified, line spacing ≥ 1.5 [WCAG 1.4.8 AAA]; iOS body default 17 pt, minimum 11 pt; macOS 13 pt, minimum 10 pt [platform: Apple HIG]; web body [profile: text.body-web = 16 px]; target line length [profile: text.measure = 45–75 characters]; body line height [profile: text.line-height = 1.4].

**Bad → Good.** Acme's help article runs across a 1440 px window at 14 px, justified, 140 characters a line → 16 px, a column of about 70 characters, left-aligned, line height 1.5.

**Limits.** Tables, labels and captions may be smaller than body text but stay at or above the platform minimum. Display headlines may be set tighter.

**Conflicts.** C-11, S-10.

**Evidence.** Standard (AAA limits), Platform guideline (default sizes), Practice (the web size and the target measure).

## TEXT-3. Text must survive 200% zoom, wider spacing and 320 px

**Rule.** When text is enlarged to 200%, when line, paragraph, letter and word spacing are increased, or when the window is 320 CSS px wide, no text is cut off, overlapped or hidden, and nothing needs sideways scrolling. Essential text (amounts, names, errors, button labels) is never truncated.

**Why.** People with low vision enlarge text and change spacing. Designs with fixed-height boxes and single-line labels break first, and what breaks is usually the button label or the amount.

**How to check.**
- Browser zoom to 200%.
- Apply the four text-spacing values with a bookmarklet or a user stylesheet.
- Set the viewport to 320 px.
- Pass in all three: every label and value fully visible, no overlap, no horizontal scroll except for data tables, maps and similar two-dimensional content.
- In apps: the largest accessibility text size; text wraps instead of truncating, side-by-side items stack.

**Thresholds.** 200% without loss [WCAG 1.4.4 AA]; line height 1.5 ×, paragraph spacing 2 ×, letter spacing 0.12 ×, word spacing 0.16 × the font size without loss [WCAG 1.4.12 AA]; 320 CSS px wide without two-dimensional scrolling [WCAG 1.4.10 AA].

**Bad → Good.** At 200% the Acme "Record payment" button label is clipped to "Record pa…" inside a fixed 40 px-high button → the button grows with its label and wraps to two lines.

**Limits.** Content that needs two dimensions (tables, maps, diagrams) is exempt from reflow but must still be readable when zoomed.

**Evidence.** Standard.

## TEXT-4. Write labels and messages in plain, specific words

**Rule.** Buttons start with a verb and name the result ("Record payment", "Send invoice"), not "OK", "Submit" or "Continue". Messages use the words users use, short sentences and one idea per sentence. The same thing has the same name everywhere, and the tone is consistent.

**Why.** People read the button, not the paragraph around it; a specific label tells them what will happen. Plain language helps everyone, and helps most the people who read slowly, read in a second language or are under stress — experts included.

**How to check.**
- Read each button label alone: can you say what happens after pressing it? Verb + object; no generic label (OK, Yes, Submit, Continue, Done) except in purely informational dialogs.
- Read each message: short sentences, no internal terms, codes or abbreviations users would not know.
- The same object has one name across screens.

**Thresholds.** Sentence length in messages [profile: text.max-sentence = 20 words]. Verb-led button titles [platform: Apple HIG].

**Bad → Good.** Acme's dialog "Proceed? [OK] [Cancel]" → "Delete invoice 1042? [Delete invoice] [Keep invoice]".

**Limits.** Expert tools may use the domain's own vocabulary when all users share it; define terms the first time they appear.

**Evidence.** Research (plain language raised task success in usability tests) and Platform guideline.

## TEXT-5. Make text ready for other languages, scripts and formats

**Rule.** Every string can grow, wrap and change direction without breaking the screen. Text is never built by gluing fragments together, never baked into images, and plurals use the language's own forms. Dates, times, numbers, currencies, names and addresses follow the person's locale. In right-to-left languages the layout mirrors, while numbers, Latin brand names and media controls keep their direction.

**Why.** Translations are often longer than English, and some languages have long compound words that cannot break anywhere. Glued fragments produce wrong grammar in languages with cases and genders; a fixed English plural ("1 items") is wrong in many languages, some of which have several plural forms. A date like 03/04 means different days in different countries, which turns a format problem into a wrong delivery.

**How to check.**
- Switch to the longest language in the profile (or a pseudo-locale that lengthens strings and adds accents): buttons, tabs, tables and headings wrap or grow; nothing is clipped or overlaps (TEXT-3).
- Find the longest single word in each language; it fits in the narrowest container that shows it, or the container allows hyphenation.
- Search the code or strings for concatenation (`"Hello " + name + "!"`, "You have " + n + " orders"): each is a finding.
- Check plurals with 0, 1, 2, 5, 21 and 101.
- Check dates, times, numbers and currencies in two locales: thousand and decimal separators, date order, 24-hour clock, currency position.
- Switch to a right-to-left language: navigation, back arrows and progress mirror; phone numbers, amounts and code stay left-to-right; text in input fields aligns to the start.
- Name and address fields accept the formats of the profile's countries (one "Full name" field, no required "State" for countries without states).

**Thresholds.** String lengthening without a translation [profile: state.text-expansion = 1.4 ×]; languages and locales come from the profile.

**Bad → Good.** Acme's tab "Orders" becomes "Bestellungen" in German and is clipped to "Bestellun…"; the success message reads "1 orders sent" and in Russian "Отправлено 5 заказа" → tabs wrap or shrink to icons with labels below; plurals come from the locale's rules ("1 order sent", "Отправлено 5 заказов").

**Limits.** A product released in one language still avoids concatenation and baked-in text, because translation is cheap only when the strings are ready. Machine-made translations and checks are not a substitute for native speakers.

**Conflicts.** C-16.

**Evidence.** Practice (internationalisation practice of platforms and design systems) and Standard (language of page and parts, WCAG 3.1.1 and 3.1.2, for screen readers).
