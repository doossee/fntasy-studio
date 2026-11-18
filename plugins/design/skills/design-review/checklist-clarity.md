# Screen clarity checklist

An audit of one screen in 10–15 minutes. Every item is a question answered "yes" (1), "no" (0) or "not applicable" (n/a). There are no opinions: every item has a way to count. Two people with the same snapshots must get the same score with a difference of no more than 15 %.

## What you need before you start

1. **Snapshots of the screen** with demo data: 390 × 844 (first screen and full page), 1440 × 900, every language in the profile (profile: `languages`; default: the UI's primary language plus its longest one). They are taken by `scripts/measure-clarity.mjs` (see `SKILL.md` → Screenshots and measurements).
2. **`metrics.json`** next to the snapshots: `overflowX`, `targetsUnder44`, `targetsUnder24`, `targetsTotal`, `smallTargets`, `textUnder12`, `primaryButtons`, `screens`, `clipped`.
3. **The line about the screen** (AUD-1): who, on which device, the main question, the main action. The project keeps its own table of main screens in the profile (section `Product`); the table below is the worked example for the fictional product Acme Orders (`references/clarity/00-audience.md`). Write the line as the first line of the protocol: items A3–A5 depend on it.

| Screen | Who | Main question | Main action |
| --- | --- | --- | --- |
| Today | sales manager, owner | What should I do now: who owes, what to ship, what is new? | Record payment |
| Customers | sales manager | Where is this customer? | Find (search); add a customer |
| Customer | sales manager | Who is this, do they owe and how much? | Record payment (when something is due) |
| Record payment | sales manager | From whom, how much, what will the result be? | Record the amount |
| Orders | sales manager, warehouse clerk | Where is this order? | Open the order |
| Order | warehouse clerk, sales manager | What is not shipped yet? | Mark as shipped |
| Deals board | sales manager | Whom to call and who is new? | Add a deal |
| Turn a deal into an order | sales manager | What will be created? | Create order |
| Settings | owner | Where is the thing I need set up? | Open a section |
| Customer notifications | owner | Is it connected, and what do I do so that customers get messages? | Connect |

## Definitions

So that everyone counts the same way:

- **First screen**: what is visible at 390 × 844 without scrolling. "Upper half": above 422 px from the top of the window. "Top band": above 170 px (header and heading).
- **Primary button**: a button filled with the saturated accent colour (profile: `primary`) with contrasting text, in the header or in the content area. A disabled (pale) filled button counts. Not counted: lightly tinted chips, avatars, selected tabs, switches and selected-stage buttons, and also a round button in the centre of the bottom bar, if the product has one: it is part of navigation and the same on all screens. A hint: `primaryButtons` in `metrics.json`, but the eye on the snapshot decides.
- **Action**: a button in the content area, enabled or disabled: with a border or a fill ("Call", "Ship", "More", "Filters", "New task", preset amount buttons) or a text button next to the primary one ("Cancel", "Back", "Hide"). Not counted: the header, the bottom bar, breadcrumbs, tabs, the search field, text links ("All orders", "Details", "Another customer"), disclosure arrows, list rows and everything inside a list row (its "⋯" belongs to the row).
- **List**: three or more rows of the same kind holding objects (customers, orders, payments, deals), or a screen whose purpose is a list. A block of an object card with one or two rows, and a menu of sections with arrows, are not lists.
- **Field**: one place of input. A group of radio buttons or checkboxes with a common label is one field. What is hidden in a collapsed "More" does not count.
- **Tap**: one press, or input into one field (however many characters).
- **Explanatory text**: sentences and phrases that explain the screen. Not counted: data (names, amounts, dates), field labels, button and tab labels, headings, the second line inside a list row or a section card.
- **Daily actions**: the actions listed in AUD-3 (profile → Product). For Acme Orders: record a payment, find a customer, create an order, see what is overdue.
- **Optional block**: a strip, a banner, a pop-up hint or an invitation card in the content area that does not show the product's data: "New to Acme Orders?", "Get started", "Install the app", a plan warning. A permanent icon in the header is not a block (it is checked in H5).
- **Hint**: a pop-up or inline piece of advice on how to use the screen ("Drag the card...", "Tap a customer..."). A screen subheading and an explanation under a field are not hints.
- **A section is not applicable** as a whole when the screen has nothing it is about: C when there is no input field other than search; D when there is no list (see the definition), while D1 is always checked; I when the first screen has no optional block and no hint. A single item is "not applicable" only by the condition written in the item itself.
- **Not checked**: the answer for an item that cannot be established from the snapshots at hand (the content of a closed menu, behaviour after a press). It does not enter the score and is listed in the protocol. This answer is not used when the snapshot does show what is needed.
- **Which snapshots.** Numbers are counted on the 390 snapshot in the primary language and `metrics.json` for 390. The snapshot in the longest language is needed for G6, the 1440 snapshot for B3 and A2 (on a desktop there is also one primary button).
- **Doubt** about what is seen on a snapshot is read as "no". The protocol states what exactly was counted.

## Items

The ⛔ sign marks a stop item: with a "no" the screen cannot be shown to a client at any score.

### A. Main action and first glance

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| A1 | Does the screen heading match the word that led here? | H1 equals word for word the label of the menu item or the button on the previous screen (shortening to one word in the bottom bar is allowed), or it is the name of the object (a customer, an order). The first-level breadcrumb equals the menu item. | NAV-3 |
| A2 ⛔ | Is there exactly one primary button on the first screen? | Count at 390 × 844 and at 1440 × 900 without scrolling. 0 or ≥ 2 on either of them is "no". If the content has no primary button and the main action of the screen is what the round button of the bottom bar does (it is on the screen), "yes". If the main action by the table is to open a row or a section (a menu screen, a list without creation) and there are 0 filled buttons, items A2–A4 are "not applicable". | ACT-1 |
| A3 | Is the primary button the main action of this screen, and is it at hand? | It matches the "Main action" column; it is fully visible on the first screen at 390; its top is not higher than 170 px (not in the top band), or it is an "Add ..." button above a list. | ACT-2 |
| A4 | Does the primary button label name the action? | Starts with a verb, ≤ 3 words (the amount does not count). A reason label on a disabled button ("Enter the amount") is accepted. Not "OK", "Yes", "Done", "Submit", "Continue", "Confirm". No primary button: "no". | ACT-3 |
| A5 | Is the answer to the main question in the upper half of the first screen? | On the 390 snapshot find the answer to each part of the question from the table (in a form the answer is the field where it is entered): the top of each is above 422 px, and at least the main number or name is larger or bolder than body text. | ACT-4, STATE-6 |
| A6 | Are there no more than five actions on the first screen? | Count the actions (see the definition) at 390 × 844, including the primary button. | ACT-5 |
| A8 | Do disabled buttons explain the reason? | Every pale (disabled) button on the first screen has the reason written on it or right next to it. No disabled buttons: "yes". | FORM-10 |
| A7 | Does a destructive action not look like the main one? | No filled red or accent button for deletion, cancelling a payment or closing an account on the first screen. No such actions in sight: "yes". | ACT-6 |

### B. Navigation

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| B1 | Does the bottom bar have 3–5 items with labels? | The 390 snapshot; a round button in the centre is an item too. | NAV-1 |
| B2 | Is the bar the same as on the other screens of the scenario? | Compare the list and the order of items word for word with the reference: the bar of one fixed list screen of the scenario (for Acme Orders: "Customers"). Any difference is "no". | NAV-2 |
| B3 | Is the current section highlighted? | In the bar (390) and in the side menu (1440) the item the screen belongs to is marked. A screen outside the bar's sections (settings): look at the side menu at 1440. | NAV-3 |
| B4 | Is there a visible way back? | A screen of the second level or deeper: the first screen at 390 has a "Back" arrow or a breadcrumb link. A first-level screen: "not applicable". | NAV-4 |
| B5 | Do daily actions start no further than two taps from here? | For each daily action (four by default) count the taps from this screen to the screen that holds the field or the button of the action itself (for Acme Orders: the search field; the payment form; the new order form; the overdue list). A search icon in the header and bottom bar items are one tap each. All the numbers are ≤ 2. The path cannot be seen on the snapshots: "not checked". | NAV-5 |
| B6 | Is there no more than one disclosure? | From the screen to any of its actions: no more than one "More", "Advanced" or accordion in a row. A row with a "›" arrow is a transition, not a disclosure. The menu content was not captured: "not checked". | NAV-7 |

### C. Forms and input

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| C1 | Are there few fields? | Without disclosures: required ≤ 5, visible ≤ 8. | FORM-1 |
| C2 | Does every field have a label above it? | No fields whose name exists only inside the field. A search field with a magnifier icon is allowed. | FORM-2 |
| C3 | One column at 390? | No two independent fields in one line. | FORM-3 |
| C4 | Do numeric fields and the phone field open a numeric keyboard? | In the screen's code: `inputmode="numeric"`/`"decimal"` or `type="tel"`. No such fields: "not applicable". | FORM-4 |
| C5 | Is the known prefilled? | The typical case from rule FORM-5: fields that had to be touched ≤ 3; the date, the method, the customer or order, the branch were not entered by hand. | FORM-5 |
| C6 | Is a known amount two taps away? | Only for screens with an amount: there is a preset amount button; from the chosen customer to the result ≤ 2 taps. Otherwise "not applicable". | FORM-6 |
| C7 | Is the optional marked with a word, with no asterisks? | Every field that may be left empty has the word "optional" (its equivalent in every language in the profile). All visible fields are required: "yes". | FORM-8 |
| C8 | Can required and optional be told apart before submission? | Having opened the form you can say of every field whether it is required: by the word "optional" or because the optional ones are moved into "More details". | FORM-8, FORM-10 |
| C9 | Are there no dropdowns for 2–4 options? | Count the options in every dropdown. | FORM-11 |
| C10 | Do switches not require "Save"? | The screen does not have both a switch (on/off) and a "Save" button that belongs to it. No switches: "not applicable". | FORM-13 |

### D. Lists and tables

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| D1 ⛔ | Is there no horizontal page scroll at 390? | `overflowX` = 0. Applies to any screen, even when section D is skipped. | LIST-1 |
| D2 | Is the whole row pressable, with no more than one action in it? | All three conditions: row height ≥ 56 px; buttons inside a row ≤ 1; `smallTargets` has no object names from the rows (a name link instead of a row link). | LIST-2 |
| D3 | Does a row have the name and no more than two details? | Count the lines of text in one list row at 390. | LIST-3 |
| D4 | Is there a search above the list? | The search field is visible on the first screen. A list that is short by nature (up to 20 rows by meaning: payment methods, settings sections): "not applicable". | LIST-4 |
| D5 | Are the status and the amount due given in a word? | Every coloured badge and every amount due has a word. | LIST-5 |
| D6 | Are there no more than three filters in sight? | Count the filtering elements above the list, except the search and the "Filters" button. Status tabs are one element. | LIST-6 |

### E. States

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| E1 | Are empty blocks named by the object, and do they not take up the screen? | For every empty block on the full snapshot: a phrase about the object ("No payments yet"), not "No data"; the block with its heading is no higher than 72 px; a wholly empty screen has one action button. No empty blocks: "not applicable". | STATE-1, STATE-5 |
| E2 | Are blocks with nothing but zeros collapsed? | No block higher than 56 px in which all numbers are zero. No such blocks: "yes". | STATE-5 |
| E3 | Does the important state of the object come right after the name? | For an object card: the amount due, on hold, draft, archived are visible on the first screen, and between the name and that state there are no buttons and no other blocks. The screen is not a card: "not applicable". | STATE-6 |
| E4 | Are there no technical messages on the screen? | No codes, no service words in capital Latin letters (`PERMISSION_DENIED`), no "undefined", "null", "NaN", no blank spots in place of values. Well-known abbreviations (SMS, PDF) and product names of third-party services do not count. | STATE-3, COPY-1 |

### F. Response and undo

The section applies when the screen has an action that changes data. Items F1–F3 need a live screen: in an audit by snapshots they are "not checked".

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| F1 | Does a double press not create a duplicate? | Press the primary button twice in a row: one record; between the press and the response the button changes its look. | FB-1 |
| F2 | Is a reversible action done without a dialog and with "Undo"? | Perform the reversible action of the screen: no dialog, the message with "Undo" stays ≥ 5 s. No reversible actions: "not applicable". | FB-2 |
| F3 | Is success named specifically? | After the action: a message with the object and an amount or a number. | STATE-4 |
| F4 ⛔ | Is everything visible at once before a money action? | Only the screen on which the money operation is submitted (a payment, refund or expense form), in the state with the amount entered: who, how much, the method and "what the result will be" are visible together at 390 without scrolling, along with the primary button; the amount is repeated on the button. The screen only leads to the form: "not applicable". No snapshot with an amount entered: judge by the snapshot without it: the payment method and the primary button are visible together. | FB-4 |
| F5 | Are buttons in dialogs and forms named by the action, and do they not argue? | No "Yes / No" or "Cancel / Cancel ..." pairs. The snapshot has neither a dialog nor a form with two buttons: "not applicable". | FB-3, COPY-8 |

### G. Copy

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| G1 | Are there no words from the stop list? | Read every string of the full 390 snapshot in the primary language; check against the COPY-1 list for that language. | COPY-1 |
| G2 | One term, one thing? | Only for the main object and the main action from the line about the screen: write out their names in the menu, the breadcrumb, the heading, the primary button and the bottom bar. Each of the two lists has one word (shortening to one word in the bar, "Payment" for "Record payment", is allowed). | COPY-2 |
| G3 | Is explanatory text on the first screen ≤ 40 words, with no sentences longer than 20 words? | Count on the 390 snapshot in the primary language. | COPY-3 |
| G4 | Numbers in digits, money and dates in one form? | No quantities in words; amounts with a thousands separator and the currency sign or word (preset amount buttons under a field labelled with the currency may go without it); one and the same amount due is not written in two ways ("−$450.00 due" and "due $450.00"); one date format on the screen. | COPY-5, LIST-7 |
| G5 | Sentence case, no "!"? | No buttons or headings in capital letters. Menu group labels do not count. | COPY-6 |
| G6 | Is every language in the profile complete, and does it fit? | The 390 snapshot in the longest language (and in every other non-primary language of the profile): words of another language 0 (except names); cut strings 0; three-line buttons 0. An empty `clipped` in `metrics.json` for that language at 390 is the condition for "yes". | COPY-7 |

### H. Touch and reading

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| H1 | Are touch targets ≥ 44 px? | `targetsUnder44` ≤ 2 (390), and none of them is needed for the main action of the screen. | TOUCH-1 |
| H2 ⛔ | Are there no targets under 24 px? | `targetsUnder24` = 0 (390). The script counts a target as a violation only when its 24 × 24 px area touches a neighbouring target (the WCAG 2.5.8 exception for spaced targets). | TOUCH-1 |
| H3 | Is text no smaller than 12 px? | `textUnder12` = 0 (390). | TOUCH-3 |
| H4 | Do pinned elements not cover content? | On the first screen at 390 the sum of the heights of the header, the bottom bar and pinned blocks is ≤ 281 px, and no field or button is cut by a pinned block (a target counts as cut when a block pinned over the content, a strip with a button or a sticky total, hides part of its label or value; the ordinary page fold at the bottom bar does not count). On the full snapshot there is empty space under the last element of the page no smaller than the height of the bar. | TOUCH-4 |
| H5 | Is no meaning carried by colour alone or an icon alone? | On the first screen at 390, the header included: icon buttons without a label, other than search, close, "back", "⋯" and an avatar with initials: 0; coloured dots and circles without a word of their own: 0 (a colour tag next to a name counts too). | TOUCH-5 |

### I. First run and hints

| No. | Question | How to count | Rule |
| --- | --- | --- | --- |
| I1 | Is there no more than one optional block on top of the task? | On the first screen at 390 count the optional blocks (see the definition): ≤ 1. | START-2 |
| I2 | Do the blocks not push out the main answer? | Together the blocks take no more than 160 px of the first screen's height, and with them item A5 is "yes". No blocks: "yes". | START-2 |
| I3 | Does a block close with one tap? | Every optional block has a cross, "Not now" or "Hide". | START-3 |
| I4 | Do hints refer to what is visible and possible? | Every hint on the snapshot talks about an element that exists on this screen and on this device; ≤ 30 words. No hints: "not applicable". | START-4 |

## Scoring

1. Screen score = number of "yes" ÷ number of applicable items × 100, rounded to a whole number. "Not applicable" and "not checked" do not enter the denominator.
2. A section score is counted the same way: it shows where it hurts.
3. List separately the stop items answered "no".

| Score | Stop items | Decision |
| --- | --- | --- |
| ≥ 85 | 0 | Can be shown to a client |
| 70–84 | 0 | Can be shown; fix the noticeable problems before the showing if the screen is in the demo scenario |
| < 70 or any ⛔ | any | Do not show, redo |

The score of a scenario is the lowest of the scores of its screens: a person remembers the place where they got stuck.

## Protocol

Written as one table, so that two audits can be compared line by line:

```
Screen: Customer · 390 × 844, en and de · sales manager · "Who is this, do they owe and how much?" · Record payment
A1 1: H1 "Birch & Co.", breadcrumb "Customers"
A2 1: one filled button: "Record payment"
A3 1: main action, fully visible, top at 380 px (below 170)
…
Total: 31 "yes" out of 38 applicable = 82. Not checked: F1–F3, B6. Stop items: none. Decision: show with fixes.
Violations by harm: 1) … 2) …
```

Every answer states what was counted (a number, a word, a place). An answer without grounds is not accepted.

## Harm to a newcomer

The violations found are sorted by harm, not by count:

| Level | What it is | Examples |
| --- | --- | --- |
| 4: dead end | The person cannot finish the task or makes a money mistake | A button is grey for no stated reason; a double payment; an action cannot be found |
| 3: stop | Stops, rereads, calls for help | Two main actions; an unfamiliar word on a button; the amount due is not visible |
| 2: friction | Gets it done, but with extra taps or misses | Small targets; extra fields; long text |
| 1: noise | Notices it, but it does not get in the way | A zero in large type; mixed date formats |
