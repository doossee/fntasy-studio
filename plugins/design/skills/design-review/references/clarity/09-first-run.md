# First run and teaching

The best teaching is a screen that does not need it. Hints treat what could not be simplified.

Examples use the fictional product Acme Orders (`00-audience.md`).

## START-1. The first screen is the next step, not a tour

**Rule.** On the first sign-in the person sees their working screen and one suggested action. There are no teaching carousels and no chains of pop-up hints before work starts.

**Why.** Teaching carousels do not improve task performance, and chained hints are forgotten before they become useful (NNG-ONBOARD, NNG-OVERLAY, HIG-ONBOARD).

**How to measure.** Sign in as a new user. Before the first meaningful action: 0 mandatory teaching steps. The screen has exactly one suggestion of what to do first.

**Bad → good.** A seven-step tour before the screen is reachable → "Today" with one line "Add your first customer".

Sources: NNG-ONBOARD, NNG-OVERLAY, HIG-ONBOARD.

## START-2. No more than one offer on top of the work

**Rule.** At any moment the screen has no more than one optional block "on top of the task": a teaching offer, a hint, advice to install the app, a plan banner. It does not cover the main answer of the screen and does not push it below the first screen.

**Why.** Several hints at once overload, and people close them all without reading (NNG-OVERLAY, LAW-HICK).

**How to measure.** On the first sign-in at 390 × 844 count the blocks that are not the screen's data (strips, banners, pop-up hints, inviting badges). No more than 1. The main answer of the screen (ACT-4) is still in the upper half.

**Bad → good.** A "New to Acme Orders?" strip a third of the screen high, a hint about the web address and a blinking badge at the same time → one line "Show the essentials in a minute" under the heading.

Sources: NNG-OVERLAY, LAW-HICK, HIG-ONBOARD.

## START-3. Teaching can be skipped and brought back

**Rule.** Any teaching offer closes with one tap and does not come back by itself after a refusal. It can be brought back from one permanent place (the profile menu, "Help").

**Why.** An introduction must be optional; what was skipped is not pushed again but stays available (HIG-ONBOARD, NNG-CONTROL).

**How to measure.** Close the offer, reload the page, go to another section and return: it is not there. The profile menu or "Help" has an item that starts it again.

**Bad → good.** The strip returns on every sign-in → closed for good; "Show hints" in the profile menu.

Sources: HIG-ONBOARD, NNG-CONTROL.

## START-4. A hint is in place, single, short

**Rule.** A hint appears next to the element it talks about, at the moment the element is needed. No more than two sentences, one at a time.

**Why.** A hint is remembered only when it is tied to the action the person is doing right now (NNG-OVERLAY).

**How to measure.** Every hint on the screen has an element it refers to, and that element is visible. Words in a hint: ≤ 30.

**Bad → good.** At the bottom of the deals list: "Drag the card to another column or choose a stage in the '⋯' menu" (there is no dragging on a phone) → a hint next to the "⋯" menu on its first opening: "Change the stage here".

Sources: NNG-OVERLAY.

## START-5. An empty account shows the path, not zeros

**Rule.** In an account without data "Today" shows a short list of first steps with marks for what is done and one button for the next step. Blocks with zeros are hidden (STATE-5).

**Why.** Visible progress towards a goal pushes people to finish what they started (LAW-GOAL); an empty state must lead to an action (NNG-EMPTY).

**How to measure.** Sign in as the owner of a new account. On the first screen: how many steps are done out of how many, and one primary button for the next step. Blocks with zero figures: 0.

**Bad → good.** Six cards with "$0.00", "0 of 0" → "First steps: 1 of 4. Next: add a product" and a button "Add product".

Sources: LAW-GOAL, NNG-EMPTY, GOV-STRUCTURE.

## START-6. Help is in one and the same place

**Rule.** The entry to help sits in one place on all screens and is labelled with a word. A link from a screen leads to the article about that screen.

**Why.** Help that changes its place is not found at the moment of need (NNG-10, the help heuristic; a consistent position of help is a WCAG 2.2 requirement).

**How to measure.** On all screens of the scenario the entry to help is in one place and has one label.

**Bad → good.** A "?" icon now in the header, now at the bottom of a list, now missing → a "Help" item in the profile menu on every screen.

Sources: NNG-10.
