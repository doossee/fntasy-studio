# Sources: the look lens (formerly the ui-craft skill)

Every page was opened and checked when the skill was written. Numbers are restated in our own words; no text, images, code or token files were copied. In the rules a source is cited by its label in square brackets.

Rules that rest on a project's own brand or design decisions cite `[PROFILE]`: the project profile (`design-profile.md`), not this list.

## Licence and reuse

- What this skill takes from the sources is facts (sizes, scales, thresholds), named principles and ideas. Rule wording, examples, thresholds marked "ours" and the measurement script are original.
- Public design systems, standards and articles are referenced by link. Their names and trademarks belong to their owners; a reference is not an endorsement.
- For agent skills the licence is given as stated in the source repository at the time of reading. Check it again before reusing anything beyond the idea.

## Design systems

| Label | Source | What was taken | Link |
| --- | --- | --- | --- |
| [CARBON-SPACE] | Carbon Design System, IBM | Scale 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96; do not step off the scale | https://carbondesignsystem.com/elements/spacing/overview/ |
| [CARBON-GRID] | Carbon Design System, IBM | Mini unit 8 px; breakpoints 320 / 672 / 1056 / 1312 / 1584; margins 16-24 | https://carbondesignsystem.com/elements/2x-grid/overview/ |
| [CARBON-TABLE] | Carbon Design System, IBM | Table rows 24 / 32 / 40 / 48 / 64; 16 between columns; text 14, column header 14 / 600 | https://carbondesignsystem.com/components/data-table/style/ |
| [CARBON-TYPE] | Carbon Design System, IBM | Working set: 14/18, 14/20, 12/16; headings 20/28, 28/36 | https://carbondesignsystem.com/elements/typography/type-sets/ |
| [CARBON-FORM] | Carbon Design System, IBM | 32 between form fields, 48 from form to buttons | https://carbondesignsystem.com/components/form/style/ |
| [CARBON-BUTTON] | Carbon Design System, IBM | Heights 24-48; padding 16; icon 16 with 14 text; icon gap 8 | https://carbondesignsystem.com/components/button/style/ |
| [CARBON-TAG] | Carbon Design System, IBM | Tag 18 / 24 / 32 high; padding 8 (small, medium) and 12 (large); text 12 | https://carbondesignsystem.com/components/tag/style/ |
| [CARBON-INPUT] | Carbon Design System, IBM | Input 24-48 high; padding 16; label to field 8; field to helper text 4 | https://carbondesignsystem.com/components/text-input/style/ |
| [CARBON-TABS] | Carbon Design System, IBM | Tab 32 / 40; label padding 16 and 8; indicator 2 | https://carbondesignsystem.com/components/tabs/style/ |
| [ATL-SPACE] | Atlassian Design System | Scale 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80; 0-8 inside dense elements, 12-24 for larger components, 32-80 for page sections | https://atlassian.design/foundations/spacing |
| [ATL-TYPE] | Atlassian Design System | Body 16/24, 14/20, 12/16; headings 16/20, 20/24, 24/28, 28/32; paragraph spacing 16 / 12 / 8 | https://atlassian.design/foundations/typography |
| [ATL-GRID] | Atlassian Design System | Content width 1296 (wide) and 864 (narrow); page margins 16 → 32 | https://atlassian.design/foundations/grid |
| [ATL-LOZENGE] | Atlassian Design System | A status lozenge is at most 200 px wide and not in capitals | https://atlassian.design/components/lozenge/usage |
| [POLARIS-TOKENS] | Polaris, Shopify | Scale 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64; card padding 16, gap between cards 16, button group gap 8 | https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/space.ts and https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/size.ts |
| [PRIMER-SIZE] | Primer, GitHub | Buttons 24 / 28 / 32 / 40 / 48 high, vertical padding 2 / 4 / 6 / 10 / 14, horizontal 8-16; icon gap 4 (small) and 8 (from 32); touch target 44; stack sets 8 / 16 / 24 | https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5 |
| [PRIMER-LAYOUT] | Primer, GitHub | Breakpoints 544 / 768 / 1012 / 1280 / 1400; content width up to 1280; margins 16, from 1280: 24; sidebar 256-320 | https://primer.style/product/getting-started/foundations/layout/ and https://primer.style/product/components/page-layout/ |
| [PRIMER-TYPE] | Primer, GitHub | Text set left with a ragged right edge; a line of about 80 characters | https://primer.style/product/getting-started/foundations/typography/ |
| [PRIMER-BUTTON] | Primer, GitHub | One primary button, at the end of the group; a button label does not wrap | https://primer.style/product/components/button/guidelines/ |
| [PRIMER-NAV] | Primer, GitHub | In tabs, icons on all items or on none; counters must not shift the tabs | https://primer.style/product/components/underline-nav/ |
| [GOVUK-SPACE] | GOV.UK Design System | The scale shrinks on small screens: 20 → 15, 30 → 20, 40 → 25 | https://design-system.service.gov.uk/styles/spacing/ |
| [GOVUK-LAYOUT] | GOV.UK Design System | Page width 1020; body text in a two-thirds column; a line of up to 75 characters | https://design-system.service.gov.uk/styles/layout/ |
| [M3-TOKENS] | Material Design 3, Google | Text 16/24, 14/20, 12/16; button 40 high, padding 16, icon 18-20, gap 8; chip 32; list row 56 / 72 / 88; tab 48, indicator 3. The spec site cannot be read without a browser, so the numbers come from Google's official token sources | https://github.com/material-components/material-web/tree/main/tokens and https://github.com/androidx/androidx/tree/androidx-main/compose/material3 |
| [M3-WINDOW] | Android Developers, Google | Window size classes: below 600, 600-840, 840-1200, 1200-1600, from 1600 | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes |
| [HIG-A11Y] | Human Interface Guidelines, Apple | Target 44 pt; about 12 pt around elements with a bezel and about 24 pt around elements without one | https://developer.apple.com/design/human-interface-guidelines/accessibility |
| [HIG-TYPE] | Human Interface Guidelines, Apple | Default size 17 pt on phone and 13 pt on desktop, minimum 11 and 10; tight leading is not for three lines or more | https://developer.apple.com/design/human-interface-guidelines/typography |

## Openly available articles and books

| Label | Source | What was taken | Link |
| --- | --- | --- | --- |
| [CURTIS-SPACE] | Nathan Curtis, "Space in Design Systems" | Kinds of spacing: inset (all sides), squish inset (top and bottom half the sides), stack, inline | https://nathanacurtis.substack.com/p/space-in-design-systems-188bcbae0d62 |
| [BUTTERICK-LINE] | Matthew Butterick, Practical Typography | A line of 45-90 characters, spaces included | https://practicaltypography.com/line-length.html |
| [BUTTERICK-SPACING] | Matthew Butterick, Practical Typography | Line spacing 120-145 % | https://practicaltypography.com/line-spacing.html |
| [BUTTERICK-CAPS] | Matthew Butterick, Practical Typography | Letterspace capitals by 5-12 %, do not letterspace lowercase | https://practicaltypography.com/letterspacing.html |
| [BUTTERICK-FIGURES] | Matthew Butterick, Practical Typography | Tabular figures in columns | https://practicaltypography.com/alternate-figures.html |
| [NNG-PROXIMITY] | Nielsen Norman Group | What is close reads as a group; a heading sits closer to its own text than to the previous section | https://www.nngroup.com/articles/gestalt-proximity/ |
| [NNG-REGION] | Nielsen Norman Group | A shared frame or background beats proximity; extra frames are noise | https://www.nngroup.com/articles/common-region/ |
| [NNG-FORM-SPACE] | Nielsen Norman Group | A label sits closer to its own field than to the next one; equal intervals are a mistake | https://www.nngroup.com/articles/form-design-white-space/ |
| [NNG-HIERARCHY] | Nielsen Norman Group | At most three sizes and three grades of contrast | https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ |
| [NNG-F] | Nielsen Norman Group | The left edge and the first words get more attention | https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ |
| [NNG-TABLES] | Nielsen Norman Group | One or two actions in a row, the rest in a menu; bulk actions in a bar above the table | https://www.nngroup.com/articles/data-tables/ |
| [STROM-TABLES] | Matthew Strom, "Design Better Data Tables" | Numbers right, text left, the header aligned like its column's data, nothing centred | https://mattstromawn.com/writing/tables/ |
| [PP-TABLES] | Pencil & Paper | Rows 40 / 48 / 56; up to three lines in a cell centred vertically, taller cells top-aligned; dividers light and no thicker than 1 px | https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables |
| [EL-STACK] | Every Layout, Heydon Pickering and Andy Bell | Spacing belongs to a pair of neighbours and is set by the parent | https://every-layout.dev/layouts/stack/ |
| [EL-AXIOMS] | Every Layout, Heydon Pickering and Andy Bell | Line measure about 60 characters, 45-75 acceptable | https://every-layout.dev/rudiments/axioms/ |
| [EL-SIDEBAR] | Every Layout, Heydon Pickering and Andy Bell | The side part has a fixed width, the main part takes the rest and is never narrower than half | https://every-layout.dev/layouts/sidebar/ |
| [VERCEL-GUIDE] | Vercel, Web Interface Guidelines | Everything is aligned to a grid, a baseline, an edge or an optical centre; optical correction of ±1 px; an input on phone no smaller than 16; the layout holds short, medium and very long text; a skeleton matches the content's dimensions | https://vercel.com/design/guidelines |
| [LINEAR-REDESIGN] | Linear, "How we redesigned the Linear UI" | Aligning labels and icons in the sidebar and tabs as a goal of the redesign | https://linear.app/now/how-we-redesigned-the-linear-ui |

## Standards and references

| Label | Source | What was taken | Link |
| --- | --- | --- | --- |
| [WCAG-SPACING] | W3C, WCAG 2.2 | 1.4.12: the layout does not break at line spacing 1.5 and increased letter and word spacing | https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html |
| [WCAG-REFLOW] | W3C, WCAG 2.2 | 1.4.10: no two-way scrolling at 320 px | https://www.w3.org/WAI/WCAG22/Understanding/reflow.html |
| [WCAG-TARGET] | W3C, WCAG 2.2 | 2.5.8: a target of at least 24 × 24; 2.5.5: 44 × 44 | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| [WCAG-FOCUS] | W3C, WCAG 2.2 | 2.4.7: focus is visible; 2.4.13: the indicator is at least 2 px thick around the perimeter, contrast 3:1 | https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html |
| [MDN-WRAP] | MDN Web Docs, Mozilla | `overflow-wrap: anywhere` and `break-word` break only a word that does not fit; `word-break: break-all` breaks any word | https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap |
| [MDN-HYPHENS] | MDN Web Docs, Mozilla | `hyphens: auto` works only with a declared language and a dictionary in the browser | https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens |
| [CHROMIUM-HYPH] | Chromium project | Chromium ships hyphenation dictionaries for a limited list of languages; some long-word languages (Uzbek, for example) have none | https://chromium.googlesource.com/chromium/src/+/main/third_party/hyphenation-patterns/hyb/ |
| [MDN-TEXT-WRAP] | MDN Web Docs, Mozilla | `text-wrap: balance` is for headings of up to 6 lines | https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap |
| [MDN-TNUM] | MDN Web Docs, Mozilla | `font-variant-numeric: tabular-nums` | https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric |
| [WEBDEV-CLS] | web.dev, Google | Layout shift: good up to 0.1; reserve space for content | https://web.dev/articles/cls and https://web.dev/articles/optimize-cls |

## Ceiling: composition, data, colour, details, freedom mode

Opened and checked by three independent researchers. Some pages were read through a summary (marked "summary"): numbers from them appear in the rules as a guide, not as a citation. No text or images were copied; from other people's skills we took ideas, not wording.

### Agent skills

| Label | Source | Idea taken | Link, licence |
| --- | --- | --- | --- |
| [FD-SKILL] | `frontend-design` skill, Anthropic | Intent and a sketch before code; a habitual pick does not count as a decision; be daring in a single spot; structure has to state a fact; a last pass that takes one ornament away | https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md, Apache-2.0 |
| [SKILL-LAYOUT] | `impeccable` skill, Paul Bakaus | Look first, run the scan second; a spatial intent; rhythm as a contrast of tight and roomy; the squint check | https://raw.githubusercontent.com/pbakaus/impeccable/main/.claude/skills/impeccable/reference/layout.md, Apache-2.0 |
| [SKILL-CRAFT] | same repository | The screen kind sets the dose of daring; on a working screen layout and controls stay familiar; a quality floor; browser surfaces; template tells | same repository: `SKILL.md`, `reference/operate.md`, `reference/craft-floor.md` |
| [SKILL-COLOR] | same repository | On a working screen colour does named jobs; secondary text on a tinted background takes the tint's hue | same repository: `reference/colorize.md`, `reference/mode-operate.md` |
| [SKILL-CRITIQUE] | same repository | A reviewer in a fresh context with no build history; an answer without evidence does not count | same repository: `reference/critique.md`, `reference/polish.md` |
| [INTERFACE-DESIGN] | `interface-design` skill, Dammyjay93 | A single focal point; weight and colour carry hierarchy together with size; one depth strategy; neutrals carry the structure, colour carries the message | https://raw.githubusercontent.com/Dammyjay93/interface-design/HEAD/.claude/skills/interface-design/SKILL.md, MIT |
| [KOWALSKI] | Emil Kowalski, articles and `prototype` skill | The more frequent an action, the less motion; durations by element kind; `transform` and `opacity` only; three variants with a named axis and a "when it wins / what it costs" table | https://emilkowal.ski/ui/great-animations , https://emilkowal.ski/ui/7-practical-animation-tips , https://emilkowal.ski/ui/you-dont-need-animations ; https://raw.githubusercontent.com/emilkowalski/skills/HEAD/skills/prototype/SKILL.md, MIT |
| [KOWALSKI-BREAK] | Emil Kowalski, `break-ui` skill | The worst plausible data; a decision per field: wrap or truncate; amounts and dates are never truncated | https://raw.githubusercontent.com/emilkowalski/skills/HEAD/skills/break-ui/SKILL.md, MIT |
| [KREHEL], [KREHEL-ICONS] | Jakub Krehel, article and `make-interfaces-feel-better` skill | Concentric radii; tabular figures where a number changes; balanced wrapping; optical padding next to an icon; one icon set and one stroke weight | https://jakub.kr/writing/details-that-make-interfaces-feel-better ; https://raw.githubusercontent.com/jakubkrehel/make-interfaces-feel-better/HEAD/skills/make-interfaces-feel-better/SKILL.md, MIT |
| [BASELINE-UI] | `baseline-ui` skill, ibelick | One accent per screen; a finding counts only when it contradicts a recorded decision or a measurement | https://raw.githubusercontent.com/ibelick/ui-skills/HEAD/skills/baseline-ui/SKILL.md, MIT |
| [UUPM] | `ui-ux-pro-max` skill, nextlevelbuilder | One stroke weight within an icon layer; an order of priority for checks | https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/HEAD/.claude/skills/ui-ux-pro-max/SKILL.md, MIT |
| [TASTE-GATE] | `taste-skill`, Leonxlnx | A checklist item is tied to a script field; a check is not edited to make it pass; a "not checked" section | https://raw.githubusercontent.com/Leonxlnx/taste-skill/HEAD/skills/taste-skill/SKILL.md, MIT |
| [BROOM-PRINCIPLES] | `broom` skill, boburxd | A number appears on the screen once; one concept, one icon. Only these two thoughts were used, and other authors state them too | https://raw.githubusercontent.com/boburxd/broom/main/skills/broom/SKILL.md, Apache-2.0 |
| [DESIGN-CRITIQUE] | `design-critique` skill, Anthropic | Asking where the eye lands in the first two seconds and whether that is the right place; three highest-impact fixes instead of a list of everything | https://raw.githubusercontent.com/anthropics/knowledge-work-plugins/main/design/skills/design-critique/SKILL.md, Apache-2.0 |
| [DATAVIZ-SKILL] | `dataviz` skill, Anthropic | Sparkline: one series, the last point highlighted, a label next to it, a text alternative | bundled with Claude Code; no public page |

### Designers and teams

| Label | Source | What was taken | Link |
| --- | --- | --- | --- |
| [LINEAR-REDESIGN] | Linear, "How we redesigned the Linear UI" | The shell is quieter than the content; a decision is tested on every view and on the worst data; actions stay in the same places | https://linear.app/now/how-we-redesigned-the-linear-ui (summary) |
| [LINEAR-REFRESH] | Linear, "Behind the latest design refresh" | Keep the density, remove the clutter: fewer icons, dividers and tinted backgrounds; structure is sensed more than it is drawn | https://linear.app/now/behind-the-latest-design-refresh (summary) |
| [KENNEDY-7] | Erik D. Kennedy, Learn UI Design | A grey mock-up first; hierarchy through several levers at once; hover does not change size or weight | https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-1.html and https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-2.html |
| [KENNEDY-COLOR] | Erik D. Kennedy, Learn UI Design | One accent on a neutral base; shades in roles | https://www.learnui.design/blog/color-in-ui-design-a-practical-framework.html |
| [HOBDAY] | Anthony Hobday, "Safe rules" | Inner radius = outer radius minus the gap; one depth technique; do not put two hard borders side by side; every element is aligned to something | https://anthonyhobday.com/sideprojects/saferules/ |
| [TUFTE-SPARK] | Edward Tufte | A word-sized graphic next to its number; the last point highlighted; no axes or frames; no traffic-light colouring | https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ |
| [PP-DASH] | Pencil & Paper | Questions first, blocks second; the order "needs action → overview → details"; a number comes with a comparison; comparisons of one kind | https://www.pencilandpaper.io/articles/ux-pattern-analysis-data-dashboards |
| [QUB-TABLES] | Qubstudio | Important columns on the left; a long list goes below the row; do not repeat the same thing | https://qubstudio.com/blog/data-tables-design-basics/ |
| [RSMS-INTER] | Rasmus Andersson, Inter typeface | Tabular figures of one width across all weights; letter spacing depends on size | https://rsms.me/inter/ |
| [COMEAU-SHADOW] | Josh W. Comeau | One light source; shadow levels as tokens | https://www.joshwcomeau.com/css/designing-shadows/ |
| [LUKEW-FORMS] | Luke Wroblewski | Extra lines and backgrounds pull attention from the fields; the primary action is more visible than the secondary | https://www.lukew.com/ff/entry.asp?1502 |
| [FAMILY] | Benji Taylor, "Family Values" | Motion that clarifies nothing is removed; the more often something is seen, the less flourish it gets | https://benji.org/family-values |
| [GEIST-TABLE], [GEIST-COLORS] | Geist, Vercel | A border is drawn once; roles of the colour scale steps: background, border, text | https://vercel.com/geist/table , https://vercel.com/geist/colors (summary) |
| [STRIPE-COLOR] | Stripe, "Designing accessible color systems" | The contrast of a pair is set by the distance between steps of the scale | https://stripe.com/blog/accessible-color-systems (summary) |
| [CARBON-DASH] | Carbon Design System, IBM | The most important thing sits higher and larger; one data set keeps one colour everywhere | https://www.carbondesignsystem.com/data-visualization/dashboards/ (summary) |
| [POLARIS-INDEX] | Polaris, Shopify | A list page: title, primary action top right, filters above the list; the unit in the column header | https://raw.githubusercontent.com/Shopify/polaris/main/polaris.shopify.com/content/components/tables/index-table.mdx |

### What the ceiling derives on its own

- **Composition thresholds** (`heroRatio` ≥ 2, frames ≤ 8, identical blocks < 4, `alignedShare` ≥ 0.6, tinted backgrounds ≤ 12 %, coloured text ≤ 25 %, fill ≥ 60 %) are ours. The sources name principles in words (a single focal point, 60/30/10, fewer frames); no open skill or guideline gave numbers for a rendered working screen. The thresholds were tuned on a blind comparison of five variants of one screen and are refined as more screens accumulate.
- **Sizes 36, 40, 48 for the lead number** are ours; the sources only state that the main thing is noticeably larger.
- **Column pairs 2 : 1, 3 : 2, 7 : 5** are ours; Stripe names the shares 1/2, 1/3, 2/3 for charts.
- **The font size of a dense table** was not found in open sources: 14 px is taken from the design systems (TYPE-1).
- The article "7 Practical Tips for Cheating at Design" and the materials of Stephen Few did not open and were not used.

## Tables: cell types (`17-tables.md`)

The pages were read and retold in our own words; no text was copied.

| Label | Source | What was taken as an idea | Address |
| --- | --- | --- | --- |
| [CARBON-TABLE] | Carbon Design System, IBM | One row height, headers, row actions and an action bar above the table | https://carbondesignsystem.com/components/data-table/usage/ |
| [CARBON-STATUS] | Carbon Design System, IBM | A status is an icon or a shape with a word; an indicator only when the status needs attention | https://carbondesignsystem.com/patterns/status-indicator-pattern/ |
| [POLARIS-TABLE] | Polaris, Shopify | Numbers to the right, the header aligned as the content, the unit in the header, wrapping of long text | https://github.com/Shopify/polaris (content/components/tables) |
| [PRIMER-TABLE] | Primer, GitHub | One column one measure, the primary cell of a row, tabular figures, one action outside the menu | https://primer.style/product/components/data-table/guidelines/ |
| [ADS-TABLE] | Atlassian Design System | Column headers; a row background is not the carrier of a status | https://atlassian.design/components/dynamic-table/usage |
| [ADS-LOZENGE] | Atlassian Design System | A status badge is not interactive; its label is one or two words | https://atlassian.design/components/lozenge/usage |
| [GOVUK-TABLE] | GOV.UK Design System | Numbers to the right, headers | https://design-system.service.gov.uk/components/table/ |
| [GOVUK-TAG] | GOV.UK Design System | A tag only when it is needed; a minimal set of statuses | https://design-system.service.gov.uk/components/tag/ |
| [USWDS-TABLE] | U.S. Web Design System | Tabular figures for numbers, not for phone numbers; the narrow screen | https://designsystem.digital.gov/components/table/ |
| [PATTERNFLY-TABLE] | PatternFly, Red Hat | One format of rows, lines, actions | https://www.patternfly.org/components/table/design-guidelines |
| [PAJAMAS-TABLE] | Pajamas, GitLab | Actions always visible, empty values with a reason, the narrow screen | https://design.gitlab.com/components/table |
| [HELIOS-TABLE] | Helios, HashiCorp | One type per column, an icon is not the only content of a cell, one position of the icon in a column | https://helios.hashicorp.design/components/table |
| [ANT-TABLE], [ANT-FORMAT] | Ant Design | Format of numbers and dates, the empty value | https://ant.design/components/table , https://ant.design/docs/spec/data-format |
| [LIGHTNING-TYPES] | Salesforce Lightning | Column types "phone", "email", "address": a phone is a `tel:` link | developer.salesforce.com (the pages did not open; the facts come from search results: check before relying on them) |

Did not open: the table pages of Material 2 and 3, Fluent 2, the Spectrum guidelines. None of the systems has a direct rule about a phone number in a cell, about boolean values or about counters in column headers: in `17-tables.md` these are marked as the choice of this skill.

## What was not confirmed and did not enter the rules

- **Material Design 3 spec pages** (page margins, bars, density, chip padding, field height) cannot be read without a browser. M3 numbers come from the token sources only.
- **Apple HIG, the layout section:** it gives no numbers for page margins on phone or desktop.
- **The "8 × 16" example from the article on space:** it is not in the text; the article only says that a squish inset has top and bottom half the sides.
- **NN/g on tables** says nothing about right-aligning numbers. That rule comes from [STROM-TABLES] and [PP-TABLES].
- **GOV.UK page width** is now 1020 px, not 960 as is often written.
- **Refactoring UI:** the book is paid, the public articles did not open. Not used.
- **Polaris page widths and column proportions** were not found on open pages.
- **Hyphenation in Firefox and Safari** for languages without a Chromium dictionary (Uzbek was the case at hand) was not checked; rule WRAP-2 does not rely on automatic hyphenation in any browser.
- NN/g gives no numeric "inside a group / between groups" ratio. The 1 : 2 ratio in rule GROUP-1 is derived from Carbon numbers (label to field 8, between fields 32) and Atlassian (paragraph spacing equals the font size); the threshold is our choice.
