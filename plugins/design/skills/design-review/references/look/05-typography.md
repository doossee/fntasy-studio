# 5. Typography (TYPE)

Typefaces and their roles come from the project profile (`design-profile.md` → Brand). This file holds the numbers.

## TYPE-1. Sizes only from the scale

**Rule.** Default scale (profile: `fonts`, `hero-fonts`, `hero-max`, `min-font`):

| Size / line height | Weight | Role |
| --- | --- | --- |
| 12 / 16 | 400, 500 | caption, second line of a cell, badge, column header. Always in the muted color or on a badge |
| 14 / 20 | 400; 500 for field labels, buttons, names in lists; 600 for an inline block heading | body text |
| 16 / 24 | 400; 600 in the heading typeface for a card title | input on the phone, long paragraph, card title |
| 18 / 28, 20 / 28 | 600 | section heading, amount in a row |
| 24 / 32 | 600 | page title on the phone, large number |
| 28 / 36, 30 / 36 | 600 | page title from 768 px, number of a block |
| 36 / 40, 40 / 44, 48 / 52 | 600 | **only the hero number of an overview screen** (COMP-2): at most two texts per screen, digits only; letter spacing −0.01…−0.02em |

There are no sizes of 11, 13, 15 px, 0.8rem or other in-between values. There is no text below 12 px.

**Why.** 14 and 15 px side by side give no hierarchy, only ripple. A distinguishable step is from 2 px at small sizes and from 4 px at large ones.

**How to measure.** The script (`references/look/11-measure.md`), rule `font-scale`: the size of every visible text. Outside the set `12, 14, 16, 18, 20, 24, 28, 30, 36, 40, 48` is a violation. A third text larger than 30 px on a screen, and a text larger than 30 px without digits, are violations too. Threshold: 0. The report has a table "size → number of texts".

**Bad.** Menu items 15 px, menu group headings 11 px, the customer name in the table 15 px, the rest 14.

**Good.** Menu 14 / 500, menu group headings 12 / 600, name 14 / 500.

**Sources.** [CARBON-TYPE], [ATL-TYPE], [M3-TOKENS], [NNG-HIERARCHY].

## TYPE-2. No more than three levels of text in one block

**Rule.** A level is a combination of size, weight and color. A card, a list row, a header has at most three: primary (for example 14 / 500, main color), regular (14 / 400), secondary (12 / 400, muted). Build hierarchy with color and weight first, size after.

**How to measure.** The number of distinct "size, weight, color" triples among the texts of the block ≤ 3 (text of buttons and badges does not count).

**Bad.** Deal card: name 15 / 600, phone 14 / 400, product 13 / 500, date 12 / 400, source 11 / 500.

**Good.** Name 14 / 500; phone and product 14 / 400; date and source 12 / 400 muted.

**Sources.** [NNG-HIERARCHY].

## TYPE-3. Line height: 1.3–1.45 for interface text, 1.5 for paragraphs

**Rule.** 12 px text has a 16 line; 14 has 20; 16 has 24; headings of 18–30 have a line of 1.2–1.35 of the size. A line height smaller than the font size (`leading-none`, `leading-3.5` on 12 px) is allowed only for a single line of digits or a heading and never for text that can wrap.

**How to measure.** Computed `line-height` / `font-size`: for 12–16 px within 1.3–1.5.

**Bad.** A "+3 more" badge: 12 px on a 14 line.

**Good.** 12 / 16.

**Sources.** [BUTTERICK-SPACING], [CARBON-TYPE], [ATL-TYPE], [WCAG-SPACING], [HIG-TYPE].

## TYPE-4. A paragraph line on desktop is 45–80 characters

**Rule.** Text of two or more lines (explanation, hint, description in settings, banner) is limited in width: `max-w-prose` or no wider than 640–720 px at 14 px. A line longer than 90 characters is not allowed (profile: `line-length`). There is no lower bound for short labels.

**Why.** On a long line the eye loses the start of the next one. On a 1440 screen a full-width paragraph is 150–180 characters.

**How to measure.** The script (`references/look/11-measure.md`), rule `line-length`: characters in the text / number of lines > 90 is a violation. Threshold: 0. The report shows `maxLineChars`.

**Bad.** A banner "Nov 1, Nov 2, … Nov 14: 42 invoices overdue" in one line 1128 px wide.

**Good.** "14 customers have 42 overdue invoices. The oldest is from Nov 1" and a "Review" button in the same row.

**Sources.** [BUTTERICK-LINE], [EL-AXIOMS], [GOVUK-LAYOUT], [PRIMER-TYPE].

## TYPE-5. Figures in columns are tabular; capitals are letter-spaced

**Rule.** Amounts, quantities, times, dates in tables and tiles use `tabular-nums`. Text in capitals (menu group headings) is no longer than two words, 12 px, letter spacing 0.05–0.08em.

**How to measure.** Cells with numbers have `font-variant-numeric` containing `tabular-nums`.

**Sources.** [BUTTERICK-FIGURES], [BUTTERICK-CAPS], [MDN-TNUM].

## TYPE-6. Text is left-aligned; a two-line heading is balanced

**Rule.** Body text is aligned left. Centered: only an empty state and a caption under an icon. A heading that can take two lines gets `text-wrap: balance`.

**Sources.** [PRIMER-TYPE], [MDN-TEXT-WRAP].
