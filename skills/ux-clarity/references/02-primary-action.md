# The primary action of a screen

Every screen has a question people bring to it and one action that most often follows the answer.

Examples use the fictional product Acme Orders (see `00-audience.md`).

## ACT-1. One primary button

**Rule.** On the first screen (what is visible without scrolling) there is exactly one button of the primary kind (filled with the accent color, profile: `primary`). Other actions are outlined, text-only, or in "More".

**Why.** Only the single differing element stands out (LAW-RESTORFF); two filled buttons force a choice (LAW-HICK). The guidelines agree: one primary button per page (GOV-BUTTON, ATL-BUTTON, HIG-BUTTON).

**How to measure.** At 390 × 844 and 1440 × 900 without scrolling count the buttons filled with the saturated accent, in the header and the content. There must be exactly 1. A round button in the center of the bottom bar is part of the navigation and does not count; but if the screen has no primary button of its own, that round button must be its primary action. Zero is a violation if there is something to do on the screen.

**Bad → Good.** On a deal card "Convert to order", "Note" and "Add to history" are all filled → only "Convert to order" is filled, the others are outlined.

Sources: GOV-BUTTON, ATL-BUTTON, HIG-BUTTON, LAW-RESTORFF, LAW-HICK, AND-NAV.

## ACT-2. The primary action is visible at once and within reach

**Rule.** The primary button is visible without scrolling and stands next to the answer after which it is pressed. On a phone it is not placed in the top strip of the screen (header and title, above 170 px) or in the top corners; in a long form it is pinned above the bottom bar.

**Why.** A far and small target takes longer to reach (LAW-FITTS); taps are most accurate in the central part of the screen, accuracy is lower at the top corners, and the phone is more often held in one hand (HOOBER-TOUCH, HOOBER-HOLD).

**How to measure.** At 390 × 844 without scrolling: the primary button is fully visible, its top edge is not higher than 170 px. Exception: an "Add ..." button above a list.

**Bad → Good.** "Save" below a form three screens long, at the bottom of the page → the button is pinned above the bottom bar and visible all the time.

Sources: LAW-FITTS, HOOBER-TOUCH, HOOBER-HOLD.

## ACT-3. The button label says what will happen

**Rule.** The label starts with a verb and names the object: "Record payment", "Create order". No more than three words. If the amount or count is known, it is in the label: "Record $1,250.00".

**Why.** A person reads the button, not the text around it; "OK" and "Done" require the eyes to go back to the title (NNG-COMMAND, ATL-BUTTON, SHOP-CONTENT).

**How to measure.** Read the label of the primary button apart from the screen. Is it clear what will happen? Forbidden as the only text: "OK", "Yes", "Done", "Submit", "Continue", "Confirm". "Save" is allowed only in a form that edits one object.

**Bad → Good.** "Confirm" → "Record $1,250.00".

Sources: NNG-COMMAND, ATL-BUTTON, SHOP-CONTENT, GOV-BUTTON.

## ACT-4. The answer to the main question is in the top half

**Rule.** What people came to the screen for (the customer's balance, money received today, which orders are not shipped) stands in the top half of the first screen and is larger than the rest of the text.

**Why.** People read the first lines and the left edge (NNG-F); a small screen forces a choice of what matters most (LUKEW-FIRST).

**How to measure.** Take the main question of the screen from the table in `checklist.md`. At 390 × 844 without scrolling find the answer: it is above 422 px and set larger than body text.

**Bad → Good.** On the Customer card the overdue balance is visible only after the buttons "Call", "Message", "New order", "More" → the balance and "Record payment" right under the name.

Sources: NNG-F, LUKEW-FIRST.

## ACT-5. Few options on the first screen

**Rule.** On the first screen of a phone there are no more than five actions (buttons and action links), not counting navigation and list rows. The rest goes into one "More" menu.

**Why.** Choice time grows with the number of options (LAW-HICK); show the few main things first (NNG-DISCLOSE). The number 5 is a norm of this skill.

**How to measure.** At 390 × 844 without scrolling count the buttons and action links in the content area (without the header, the bottom bar, breadcrumbs and list rows). No more than 5.

**Bad → Good.** Above the deals list: "Inbox messages", "Add deal", the "Board" tab, search, "Filters", a stage picker, a hint → "Add deal", search, the stage picker; the rest in "More".

Sources: LAW-HICK, NNG-DISCLOSE.

## ACT-6. A dangerous action does not look primary

**Rule.** Deleting, voiding a payment, cancelling an order are never styled as the primary button and never stand right against it.

**Why.** The primary look attracts a press out of habit (HIG-BUTTON, GOV-BUTTON).

**How to measure.** Find the destructive actions on the screen. None is filled with the accent; between it and the primary button there are at least 8 px, better: it is in the "More" menu.

**Bad → Good.** A filled "Save" and a red "Delete customer" side by side → "Save" alone; "Archive" in "More".

Sources: HIG-BUTTON, GOV-BUTTON.
