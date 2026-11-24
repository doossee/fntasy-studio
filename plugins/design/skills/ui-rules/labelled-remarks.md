# Labelled review remarks

Remarks as a reviewer might write them, each with a label:

- **defect** — someone loses something on this screen; it has a rule and a severity (`severity.md`).
- **taste** — nobody loses anything; one line in the "Taste" part of the report, no score.
- **depends** — a defect only under the condition given; without it, taste.

**Experts disagree** marks remarks where experienced reviewers reach different conclusions. Do not settle them by argument: the last column says what would settle them. Until then, report them as an open question, not as a finding.

Use with `taste-vs-defect.md`, which has the three-question test. The examples use the fictional Acme (shop owner, clerk, courier) and Acme Shop (its web shop).

| # | Remark | Label | Who loses what | Rule | Condition, or what settles it |
| --- | --- | --- | --- | --- | --- |
| 1 | "The dark theme should use dark grey, not pure black." | depends; experts disagree | Pure black itself: nobody shown. Inverted light theme: shadows vanish, levels merge | COLOR-4 | A defect if layers cannot be told apart or contrast fails. Pure black versus dark grey: settle with a reading test in the dark theme and a contrast measurement, not with opinion |
| 2 | "Secondary text in the dark theme is #6B6B6B on #121212." | defect | Everyone reading dates and statuses at night; 3.5:1 measured, below 4.5:1 | COLOR-1, COLOR-4 | — |
| 3 | "Dark theme: the brand blue button glows and the label is hard to read." | defect if measured | People reading the label; saturated colours on dark backgrounds can fail contrast with their text | COLOR-4, COLOR-1 | Measure the label on the button; passes → taste |
| 4 | "Filled icons would look more modern than outlined ones." | taste | Nobody | — | — |
| 5 | "The app mixes outline icons from one set with filled icons from another." | depends | Nobody, if style alone differs; the user, if filled means "selected" in one place and is plain decoration in another | EXP-7 | A defect when the fill carries state inconsistently; otherwise polish (1) |
| 6 | "The trash icon in the toolbar archives the order." | defect | The clerk avoids archiving for fear of deleting, or expects a deleted order to be gone | EXP-7, EXP-1 | — |
| 7 | "Remove the labels from the bottom bar, the icons are enough." | defect | New users guessing what "Payouts" and "Catalogue" icons mean | EXP-7, EXP-5 | Not a defect only for near-universal icons (home, search) |
| 8 | "Zebra stripes would make the orders table nicer." | depends; experts disagree | On a wide table, the clerk reading across a row may jump lines; on a narrow one, nobody | DATA-1 | Settle with a task: read a value across a wide row; count wrong-row errors with and without stripes or hover highlight |
| 9 | "Amounts in the table are left-aligned with proportional digits." | defect | The owner comparing totals down a column misreads magnitudes | DATA-1 | — |
| 10 | "On the phone the table should become cards." | depends | Cards lose side-by-side comparison; a table that scrolls the whole page sideways hides columns | DATA-1, PLAT-1 | A defect only if the phone version hides a column people need or breaks the page width |
| 11 | "Column headers in capitals look more professional." | taste | Nobody, for one- or two-word headers | — | Long capitalised headers or body text in capitals → TEXT-2 |
| 12 | "Search should be a full field in the header, not a magnifier icon." | depends | In Acme Shop with 3,000 products, shoppers who search first; in the courier app, nobody | SEARCH-1 | A defect when search is a main task per the profile |
| 13 | "Searching 'tshirt' finds nothing, though 't-shirt' items exist." | defect | Shoppers who conclude the product is not sold | SEARCH-1 | — |
| 14 | "Autocomplete should show product photos." | taste | Nobody shown | — | Becomes a question for a test if shoppers pick wrong variants from text-only suggestions |
| 15 | "Applied filters are visible only inside the filter panel." | defect | Shoppers who think items are missing, not filtered out | SEARCH-2 | — |
| 16 | "Filter options show no result counts." | depends | Shoppers who keep hitting "nothing found" | SEARCH-2 | A defect when options often lead to zero results; small catalogues may not need counts |
| 17 | "The filters should be in a left column, not across the top." | depends; experts disagree | Unclear | SEARCH-2 | Depends on the number of filters and the catalogue. Settle by a findability test on the real catalogue |
| 18 | "The German button reads 'Bestellung stor…'." | defect | German users who cannot read the action | TEXT-5, TEXT-3 | — |
| 19 | "In Arabic, the back arrow still points left." | defect | Arabic readers who see "forward" where "back" is meant | TEXT-5 | — |
| 20 | "Dates show as 03/04/2026 for everyone." | defect | Users in day-first countries who read 4 March (month first) as 3 April | DATA-2, TEXT-5 | — |
| 21 | "The Uzbek copy uses the informal 'sen'." | depends | Nobody, if the profile chose it; users meeting both forms if mixed | TEXT-5 | A defect when forms are mixed or differ from the profile |
| 22 | "The Russian counter says '1 заказов'." | defect | Russian readers; the product looks broken | TEXT-5 | — |
| 23 | "Page transitions feel boring; add a bounce." | taste | Nobody; a bounce would add waiting | — | Adding motion that delays is the defect (MOTION-1) |
| 24 | "Orders fly in one by one each time the list opens." | defect | The courier who opens the list dozens of times a day and waits each time | MOTION-1 | Severity follows frequency (`severity.md`) |
| 25 | "The parallax header keeps moving with 'reduce motion' on." | defect | People who get unwell from large motion | MOTION-1 | WCAG 2.3.3 is level AAA; the harm stands even when the profile targets AA |
| 26 | "Too much white space; it looks empty." | taste | Nobody, as long as the main content fits | — | Main answer pushed below the first screen → LAYOUT-5 |
| 27 | "Too dense; it needs air." | depends | Nobody, if groups are still clear; everyone, if groups merge or targets shrink | LAYOUT-2, ACT-1 | Measure gaps and targets; a pass → taste |
| 28 | "Experts would rather see more rows per screen." | depends; experts disagree | Possibly the clerk who compares many orders a day | ACT-4 | Settle with time on the clerk's frequent task at both densities |
| 29 | "Body text is 14 px, weight 300, light grey." | defect if measured | Everyone reading order details, more so on cheap screens | TEXT-2, COLOR-1 | Measure size and contrast |
| 30 | "Headings should be in a serif for elegance." | taste | Nobody | — | — |
| 31 | "Only two font weights; the hierarchy feels flat." | depends | Nobody, if headings and body can be told apart | TEXT-1 | A defect only when levels cannot be distinguished |
| 32 | "Help articles run 140 characters a line on desktop." | defect | Readers losing the start of the next line | TEXT-2 | — |
| 33 | "Brand purple is on headings, links and the main button." | defect | People who cannot tell what is clickable; the main action stops standing out | COLOR-3 | — |
| 34 | "A warmer palette would feel friendlier." | taste | Nobody | — | — |
| 35 | "Paid and overdue orders differ only by green and red." | defect | People with colour vision deficiency, glare outdoors | COLOR-2 | — |
| 36 | "Red marks both sale prices and errors." | depends | Shoppers who read a sale price as a problem, if both appear together | COLOR-3 | A defect when both meanings appear on one screen |
| 37 | "The button says 'Submit'." | defect | People unsure what happens after pressing | TEXT-4 | Usually 1–2; higher on payment or sending |
| 38 | "The tone is too formal." | depends | Nobody, unless the profile set a tone and the screen breaks it | TEXT-4 | — |
| 39 | "The error just says 'Something went wrong'." | defect | People who do not know whether their data is saved or what to do | ACT-10, STATE-3 | — |
| 40 | "The empty state needs an illustration." | taste | Nobody | — | Missing next step in the empty state is the defect (STATE-2) |
| 41 | "The menu says 'Entities' for customers." | defect | Shop owners who do not find their customers | EXP-2 | — |
| 42 | "Archive asks 'Are you sure?' every time." | defect | Clerks who learn to click through, including on real dangers | STATE-4 | — |
| 43 | "A menu icon on desktop looks cleaner than the sidebar." | defect | Everyone who no longer sees the main sections | EXP-6 | — |
| 44 | "Cards should have 16 px corners instead of 8 for a softer feel." | taste | Nobody | — | — |
| 45 | "The frosted-glass panel puts white text over a blurred photo." | depends | People who cannot read the text over light parts of the photo | COLOR-1 | Measure against the lightest area behind the text |
| 46 | "Add a feature carousel at first launch." | depends | New users kept from their first task | EXP-5 | A defect when forced or not skippable; an optional, skippable tour is taste |
| 47 | "Skeletons look better than spinners." | depends | Nobody, for the look; everyone, if an indicator flashes on loads under a second | ACT-2 | — |
| 48 | "On phones the main button should sit at the bottom for the thumb." | depends; experts disagree | Possibly one-handed users on long screens | PLAT-2, ACT-1 | Settle with a one-handed task test on the real device sizes; the convention alone is not evidence |
| 49 | "The chart's eight colours cannot be told apart in greyscale." | defect | People with colour vision deficiency; anyone printing the report | COLOR-2 | — |
| 50 | "The theme switch should be in the header, not in settings." | taste | Nobody, unless the profile names switching themes as a frequent task | — | — |
