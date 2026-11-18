# 8. Long words and clipping (WRAP)

Translated interface text is often 20–40 % longer than the original, and long words do not shorten in a familiar way: "Rechnungsübersicht", "Zahlungserinnerung", "Lieferadresse ändern". This applies to any long-word language (German, Finnish, Uzbek, Russian). Check the screen in every language of the profile (`languages`); by default the primary language of the interface plus its longest one.

## WRAP-1. Text is not clipped

**Rule.** The label of a button, tab, status badge, menu item, a heading, an amount, a date, a field label are never clipped and never get an ellipsis. If it does not fit, change the layout: wrap the row, add a second line, pick a shorter word (WRAP-4).

An ellipsis is allowed only for a name or title in a list row, a table row or a panel header, where the row opens the full card, and only together with a `title` that holds the full text. Free text (a comment) may be limited to two or three lines with an expand control.

**How to measure.** The script (`references/look/11-measure.md`), rule `clipped`: an element with its own text has `scrollWidth > clientWidth` (or the same by height) with hidden overflow. Without an ellipsis it is always a violation. With an ellipsis it is a violation if there is no `title` or if it is the label of a button, tab or badge. Threshold: 0.

**Bad.** "Today" in a 40 px column: "Toda".

**Good.** The word is removed, today is marked by a background and a circle.

**Sources.** [VERCEL-GUIDE], [ATL-LOZENGE], [PRIMER-BUTTON].

## WRAP-2. Wrapping: `overflow-wrap`, not automatic hyphens

**Rule.** Do not rely on `hyphens: auto`: it works only where the browser has a hyphenation dictionary for the language, and for many languages it has none. A block with user-entered or long text gets `overflow-wrap: anywhere` (Tailwind `wrap-anywhere`): a word breaks only if it does not fit whole. `word-break: break-all` is not used. A flex child with text has `min-w-0`, otherwise it will not shrink and will push its neighbor out.

**How to measure.** At 390, in the longest language of the profile, there is no horizontal scroll and `clipped` = 0.

**Sources.** [MDN-WRAP], [MDN-HYPHENS], [CHROMIUM-HYPH].

## WRAP-3. A button is one line; if it does not fit, stack

**Rule.** A button label does not wrap (`whitespace-nowrap`). Two buttons that do not fit in a row at 390 become a full-width stack, the primary one on top. A button wider than the screen means the label is too long (WRAP-4).

**Sources.** [PRIMER-BUTTON].

## WRAP-4. Shorten the word, not the letters

**Rule.** If a label does not fit, pick a shorter word from the project's term glossary (its translation files), do not cut the word off. Abbreviations with a period are only the commonly accepted ones: weekdays (Mon, Tue, Wed), the currency unit, "min". A number is not separated from its unit: there is a non-breaking space between them.

**How to measure.** The glossary has no strings where a word ends in "." mid-word, apart from the list of commonly accepted ones.

**Sources.** [VERCEL-GUIDE], `references/clarity/07-copy.md` COPY-5.

## WRAP-5. A badge is up to 24 characters

**Rule.** The text of a status badge is no longer than 24 characters in any language and no wider than 200 px. Longer than that is no longer a status but a sentence: its place is in a line of text.

**Sources.** [ATL-LOZENGE].
