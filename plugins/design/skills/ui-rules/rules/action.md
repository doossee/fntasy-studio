# Action and decision

How much a person has to do, decide and wait to get a task done: the size and place of targets, the speed of the answer, the number of options, the length of the task, the way input is accepted, interruptions, and what happens when a task is left half done or ends. The examples use Acme, a fictional app where small shops take orders and payments (shop owner, sales clerk, courier), and Acme Shop, its customer web shop.

## Review questions

1. Can every target be hit with a thumb on the first try, and is nothing dangerous right next to a frequent action?
2. Does every tap show a change within a tenth of a second, and can no request be sent twice?
3. At each decision point, are the options few, in a sensible order, comparable, with one recommended?
4. Do the most frequent tasks have the best places?
5. Does the form ask only for what the product cannot find out itself, and does it accept the way people naturally type?
6. If the person leaves halfway, is their work still there when they come back?
7. Does the task end on a screen that says plainly what happened and what comes next?

## ACT-1. Make targets big enough and keep dangerous ones apart

**Rule.** Every interactive element has a hit area big enough for a fingertip on touch screens and never below the WCAG minimum. A checkbox or radio button and its label form one hit area. The targets used most are large and close to where the thumb or pointer already is; destructive actions are not placed right next to frequent ones.

**Why.** The time to hit a target grows with its distance and shrinks with its size, and a fingertip covers far more than a mouse pointer. A small target costs repeated taps; a dangerous target next to a frequent one gets hit by accident.

**How to check.**
- At 390 px width, measure the hit area (not the icon) of every interactive element.
- A target below 24 × 24 CSS px passes the WCAG minimum only if a 24 px circle centred on it does not intersect another target or another small target's circle; links inside running text are exempt.
- Tap the label of each checkbox and radio button: it toggles the control.
- Measure the distance from destructive actions ("Delete", "Cancel order") to the primary action, or check that they sit in a menu.

**Thresholds.** 24 × 24 CSS px or the spacing exception [WCAG 2.5.8 AA]; 44 × 44 CSS px [WCAG 2.5.5 AAA]; 44 × 44 pt [platform: Apple HIG]; 48 × 48 dp, about 8 dp apart [platform: Material 3]; on the web, target size [profile: act.target-web = 44 px]; gap from a destructive action to the primary one [profile: act.danger-gap = 16 px].

**Bad → Good.** A 20 px "×" in the top corner is the only way to close the order sheet → the backdrop also closes it, plus a 44 px "Close" button. "Delete order" sits beside "Save" → "Save" is the primary button, "Delete order" is in the "More" menu.

**Limits.** With a mouse, screen edges and corners are easy to hit because the pointer stops there; on touch screens the top corners are hard for one hand. Dense expert tools on desktop may use smaller targets if they meet the WCAG minimum.

**Conflicts.** S-1 (target sizes across sources), S-6 (corners).

**Evidence.** Standard and Platform guideline; the movement-time relation behind it is among the best replicated results in human movement research.

## ACT-2. Respond within 0.1 s; show progress after 1 s; never allow a double submit

**Rule.** Every action gets a visible response at once: the pressed state, the item added, the screen changed. If the result takes longer than about a second, the screen shows that work has started; for long waits it shows progress and offers a way to stop. A button that sends a request cannot be pressed again while the request runs.

**Why.** A response that comes at once feels caused by the action; after about a second people's flow of thought breaks; after about ten seconds their attention leaves. When nothing visible happens, people doubt the action worked and repeat it, which can create a second order or payment.

**How to check.**
- Throttle the network to the slowest connection in the profile (or "Fast 4G") and run the main actions.
- Time from tap to the first visible change.
- Over about 1 s: a busy state appears (a spinner with a label, or a skeleton for a whole page). Over about 10 s: a percent-done or step count ("3 of 50") and a way to stop.
- Tap the submit button twice quickly: only one request is sent.
- No spinner or skeleton flashes for loads that finish in under a second; no static "Loading…" text alone.

**Thresholds.** About 0.1 s, 1 s and 10 s — the long-standing response-time limits of usability practice [Practice]; on the web, interaction to next paint ≤ 200 ms at the 75th percentile [platform: Core Web Vitals].

**Bad → Good.** "Record payment" shows nothing for three seconds and the clerk taps again → the button turns into "Recording…" at once, is disabled until the answer, and the payment is recorded once.

**Limits.** Showing a result before the server confirms it is fine only when it can be rolled back with a clear message; never for payments. A 400 ms figure that circulates as a "threshold" is a productivity target from one industry paper, not a replicated limit.

**Conflicts.** C-12 (motion vs speed).

**Evidence.** Practice built on research: the response-time limits come from HCI literature and are used across guidelines; the double-submit check is a direct test.

## ACT-3. Few, ordered, comparable options at each decision; recommend one

**Rule.** At each point where people decide what to do next, the options are few, in a sensible order (by frequency, alphabet or size), and the recommended one is visibly marked when the product can know it. Long sets are grouped or narrowed with search and filters. When people pick one of several comparable items (plans, slots, templates), the items show the same attributes in the same order so they can be compared line by line.

**Why.** Choosing among known, ordered options is fast and grows slowly with their number; an unordered list of unfamiliar items is scanned one by one, so every item adds time. Large sets sometimes make people put off the choice, but the effect is unstable: it appears when options are hard to compare and the person has no clear preference, and often does not appear at all. So the rule targets order and comparability, not a magic count.

**How to check.**
- Count the actions on the first phone screen (buttons and action links; not list rows, not navigation); one of them is primary.
- Every long list is ordered or grouped and has search.
- Every choice among comparable items shows a short first set, marks a recommendation when the product can know it, and aligns attributes row by row.

**Thresholds.** Actions on the first phone screen [profile: act.first-screen-actions = 5]; lists that need search [profile: act.list-search-from = 10 items]; comparable items shown first [profile: act.compare-first = 5].

**Bad → Good.** "New" opens a menu of 14 document types in random order → the 3 most used on top, "All types" with search below. Six subscription plans with different feature lists → three plans, "Most chosen" on one, one comparison table.

**Limits.** Experts who make the same choice every day may prefer everything at once (a toolbar, keyboard shortcuts). Catalogues with hundreds of items rely on search and filters (SEARCH-1, SEARCH-2). Decide by frequency and the person's task, not by the count alone. A recommendation must be the best fit for the person, not the most profitable option (HONEST-1).

**Conflicts.** C-4, C-14.

**Evidence.** Research (ordered choice; scanning of unordered lists) and Contested (choice overload: unstable, depends on conditions).

## ACT-4. Give the best places to the few most frequent tasks

**Rule.** Find the few tasks that make up most of the use of a screen. They get the best places: the first screen, the largest targets, one tap from the start, and the first positions in bars and menus. Everything else can be one level deeper. Frequent desktop actions also get keyboard shortcuts.

**Why.** Use is spread unevenly: a few features carry most of it. Designing every feature as equally important serves the rarely used ones at the cost of the few that matter. In short bars and menus, the start (and to a lesser degree the end) is found and remembered most easily; the middle is where the rarely used items belong.

**How to check.**
- List the most frequent tasks from analytics, the project profile, or by asking.
- Each starts from the main screen within one tap and is visible without scrolling at 390 px.
- No rarely used action takes space above them.
- In bars and menus, the most used item is first; the least used sit in the middle.
- On desktop, frequent actions have shortcuts that do not override system ones.

**Thresholds.** Number of frequent tasks to favour [profile: act.frequent-tasks = 3–5]; steps from the main screen [profile: act.frequent-depth = 1 tap].

**Bad → Good.** On the Acme home screen "Record payment" is in a menu while "Order branded receipts" is a large tile → "New order" and "Record payment" are the two main buttons, extras under "More". Acme's bottom bar "Settings, Search, Home, Orders, Profile" → "Home, Orders, Search, Customers, Profile".

**Limits.** Use real numbers when you have them; "most use comes from a few features" is a rough pattern, not a law. Lists with a natural order (alphabet, date, steps) keep it. Do not move a frequent action people already know without a reason (EXP-4).

**Evidence.** Practice (frequent tasks first, accelerators for experts); Research, applied for first and last positions (measured on memory for lists).

## ACT-5. Show progress honestly in multi-step tasks

**Rule.** A task with several steps shows where the person is and how much is left: "Step 2 of 4", a progress bar or a checklist. Steps already done, by the person or by the product, count from the start. The count never grows near the end.

**Why.** People speed up and persist as a goal comes closer, and a task that shows some progress already made is more often finished than one that starts from zero. A task with no visible end feels longer and is abandoned more.

**How to check.**
- For every task of several steps or screens: each step shows its number and the total, or a bar.
- Finished steps are marked as done; the current step is marked.
- Walk to the end: no hidden extra step appears.
- Setup checklists count what is already done ("Account created" ticked).

**Thresholds.** Show progress from [profile: act.progress-from = 3 steps].

**Bad → Good.** A five-screen shop setup with no indication of length → "Step 1 of 4" with a bar; "Account created" shown as done.

**Limits.** Progress must be real. A bar that jumps back, or a count that grows near the end, breaks trust. A short form on one screen needs no progress indicator.

**Conflicts.** HONEST-2 (a streak that punishes a missed day is not progress).

**Evidence.** Research, applied: goal effects were measured in behaviour outside interfaces (rewards, loyalty cards).

## ACT-6. Ask for as little as possible; let the product do the work

**Rule.** Every field and every decision in a task is needed for the result. What the product can know or work out (from earlier data, the device, a lookup or a sensible default) it fills in itself. Before a task longer than one screen, the screen says how long it is.

**Why.** Every task has some complexity that cannot be removed: it either sits with the product or lands on the person as extra fields and errors. Every field costs time and is one more chance to make a mistake; split name fields, for example, make people type their full name into the first one.

**How to check.**
- For each field, ask "what breaks if we remove it?" Remove or defer fields with no answer.
- No field asks for what the product could know: city from postcode, card type from the number, today's date, the shop's country.
- Names: one "Full name" field unless the task truly needs parts.
- Optional fields most people skip (second address line, company, coupon) are behind a link.
- A task longer than one screen states its length at the start ("3 steps, about 2 minutes").

**Bad → Good.** Shop sign-up asks for address, birthday and tax number before the owner can try anything → email and password; the rest is asked when the first invoice needs it. "Select card type" before the card number → the type is detected from the number.

**Limits.** Automatic choices that matter (money, sending, deleting) are shown and can be changed. Defaults are the typical value, not the most expensive one (HONEST-1). Gifts and business orders may truly need a separate billing address.

**Conflicts.** C-9.

**Evidence.** Research (form and checkout testing, mostly e-commerce in the US and Europe) and Practice.

## ACT-7. Accept the ways people type; show the right keyboard

**Rule.** Fields accept the formats people naturally use (spaces, dashes and brackets in phone numbers; spaces in card numbers; a comma or a dot in amounts; a pasted value with extra spaces) and turn them into one clean format. Ambiguous input is never guessed. On phones, each field opens the keyboard that fits it, and names, addresses and emails are not autocorrected.

**Why.** People type the same value in many ways; rejecting reasonable input makes the product feel broken and costs a retry. But silently reinterpreting input that could mean two things creates errors nobody sees until later. The right keyboard has larger keys and fewer wrong characters.

**How to check.**
- For each typed field (phone, date, amount, card, postcode, email), enter three reasonable variants: with spaces, with separators, pasted with a trailing space. All are accepted and shown back in one format.
- Card number: spaces accepted, formatted as typed, no length cap below 19 digits.
- Phone, card and postcode open a numeric keypad (`inputmode` or `type`); email opens the email keyboard; autocorrect is off on names, addresses and emails; capitalisation is off on emails.
- An error appears only for input that cannot be understood, and it shows the expected format with an example.
- Enter an ambiguous value (03/04 as a date): the product asks or uses a picker.

**Bad → Good.** "+1 (555) 010-0199" rejected as "Invalid phone" → accepted and shown as "+1 555 010 0199". The courier's phone field opens the letter keyboard → numeric keypad.

**Limits.** Sign-in fields may limit detail in error messages for security. Local formats differ (TEXT-5); accept the formats of the languages in the profile.

**Conflicts.** C-8.

**Evidence.** Research (form-field testing, e-commerce) and Practice.

## ACT-8. Don't interrupt a task in progress

**Rule.** While a person is doing the main task, nothing appears that they did not ask for: no pop-ups, rating requests, promotions, chat prompts or tours. Feedback comes at once and in place. Requests for ratings, upgrades or surveys come after a task is finished, and rarely.

**Why.** Focused work needs clear goals, immediate feedback and no breaks; every interruption costs the time to get back and sometimes the task itself. A pop-up in the middle of typing also takes keystrokes meant for the form.

**How to check.**
- Do the main task from start to finish.
- Count every element that appears without being asked for (modal, banner, tooltip tour, survey, chat bubble): zero during the task.
- Any request that remains appears after the result screen, is dismissed in one tap and is not repeated soon.

**Thresholds.** Repeat a dismissed request no sooner than [profile: act.repeat-request-after = 1 day]. Time limits can be turned off, adjusted or extended [WCAG 2.2.1 A].

**Bad → Good.** "Rate Acme" opens while the clerk types an order note → asked once, after the order is placed, with a plain "Not now".

**Limits.** Warnings that prevent a loss (unsaved changes, a failed payment, an expiring session) are not interruptions; they belong where they appear.

**Conflicts.** C-6, C-7.

**Evidence.** Research, applied (focused activity and the cost of interruptions, measured outside interfaces) and Platform guideline (ask for ratings after people have engaged).

## ACT-9. Keep unfinished work and show the way back

**Rule.** When a task is left half done (a draft order, a cart, an unfinished setup, a closed dialog with a form), the product keeps what was entered, shows that it is unfinished, and offers a direct way back to the exact step. Long multi-session processes have an explicit "save and return".

**Why.** People tend to go back to an interrupted task when they get the chance. A product that keeps the work makes the return easy; one that loses it turns the return into frustration and retyping. (A popular claim that unfinished tasks are also remembered better did not hold up; the rule does not rely on it.)

**How to check.**
- Start the main multi-step task, stop halfway, close the screen, come back: the data is still there, the way to continue is on the first screen seen, and it opens at the step left.
- Open a dialog with a form, type, dismiss it by backdrop or Escape, reopen: the text is still there, or the product asked before discarding it.
- Use the browser Back button inside a form: no data is lost without a warning.

**Bad → Good.** The new-shop form empties itself after ten minutes away → "Continue setting up your shop: step 3 of 5" on the home screen. A note typed in the order dialog vanishes when the backdrop is tapped → the note is kept as a draft.

**Limits.** One visible place to continue, no repeated reminders, and an easy way to discard the draft. Sensitive data (card numbers, passwords) is not kept.

**Evidence.** Research for resumption of interrupted tasks; Contested for the memory claim, which this rule does not use.

## ACT-10. Design the worst moment and the last moment

**Rule.** For each main task, find its worst moment (usually an error, a wait or a loss) and its last moment (the result). The error is clear, specific and recoverable, and keeps what was entered. The result screen says plainly what was done, with its key facts, and what comes next.

**Why.** People judge an experience afterwards mostly by its most intense point and its end, not by the average. An error that wipes the form or a task that ends with no confirmation is what they remember and retell.

**How to check.**
- Walk the main task to the end: the result screen names what was done with key facts ("Order 1042 placed, delivery on 12 March") and the next step.
- Walk it again with the most likely error (declined card, lost connection): the message says what went wrong in plain words and how to fix it; entered data is kept.

**Bad → Good.** After payment Acme Shop jumps back to the home page → a result screen with the amount, the receipt and "Track order". A declined card clears the whole form → the form is kept, the error sits next to the card number, "Try another card".

**Limits.** A good ending does not excuse a broken middle; every other rule still applies to every step.

**Evidence.** Research, applied: measured on how past episodes are judged; applying it to task screens is an inference.
