# Action and decision

How much a person has to do, decide and wait to get a task done: the size and place of targets, the speed of the answer, the number of options, the length of the task, the way input is accepted, interruptions, and what happens when a task is left half done or ends. The examples use Acme, a fictional app where small shops take orders and payments (shop owner, sales clerk, courier), and Acme Shop, its customer web shop.

## Review questions

1. Can every target be hit with a thumb on the first try, and is nothing dangerous right next to a frequent action?
2. Does every tap show a change within a tenth of a second, and can no request be sent twice?
3. At each decision point, are there few options, in a sensible order, with one recommended?
4. Does the form ask only for what the product cannot find out itself, and does it accept the way people naturally type?
5. If the person leaves halfway, is their work still there when they come back?
6. Does the task end on a screen that says plainly what happened and what comes next?

## ACT-1. Make targets big enough and keep dangerous ones apart

**Rule.** Every interactive element has a hit area of at least 44 × 44 CSS px on touch screens, and never less than WCAG's minimum. A checkbox or radio button and its label form one hit area. The targets used most are large and close to where the thumb or pointer already is; destructive actions are not placed right next to frequent ones.

**Why.** The time to hit a target grows with its distance and shrinks with its size (Fitts). Fingertips are about 1.6–2 cm wide, and NN/g, citing Parhi, Karlson & Bederson, recommends targets of at least 1 × 1 cm. A dangerous target next to a frequent one gets hit by accident.

**How to check.**
- At 390 px width, measure the hit area (not the icon) of every interactive element.
- WCAG 2.2 AA (2.5.8): a target smaller than 24 × 24 CSS px passes only if a 24 px circle centred on it does not touch another target or another small target's circle; links inside running text are exempt.
- Platform minimums: Apple HIG 44 × 44 pt (the same size as WCAG 2.2 AAA, 2.5.5); Material 48 × 48 dp with 8 dp between targets.
- Tap the label of each checkbox and radio button: it must toggle the control.
- "Delete" or "Cancel order" is at least 16 px (ours) from the primary action, or sits in a menu.

**Bad → Good.** A 20 px "×" in the top corner is the only way to close the order sheet → the backdrop also closes it, plus a 44 px "Close" button. "Delete order" sits beside "Save" → "Save" is the primary button, "Delete order" is in the "More" menu.

**Limits.** With a mouse, screen edges and corners are easy to hit because the pointer stops there; on touch screens they are not. Dense expert tools on desktop may use smaller targets if they meet WCAG 2.5.8.

**Evidence.** Standard (WCAG 2.5.8) and Platform guideline (HIG, Material); Fitts's law itself is one of the best-replicated results in human movement research.

**Sources.** WCAG 2.2 (2.5.8, 2.5.5); Apple HIG (Accessibility, Buttons); Material 3 (Accessibility: touch targets); NN/g (Touch targets on touchscreens, 2019); Laws of UX (Fitts's Law); Fitts 1954; Parhi, Karlson & Bederson 2006; secondary: Figma Resource Library (Fitts' law, Button states), uxhints (Fitts's law). (former LAW-FITTS)

## ACT-2. Respond within 0.1 s; show progress after 1 s; never allow a double submit

**Rule.** Every action gets a visible response within 0.1 s: the pressed state, the item added, the screen changed. If the result takes more than about 1 s, the screen shows that work has started; from about 10 s it shows progress and offers a way to stop. A button that sends a request cannot be pressed again while the request runs.

**Why.** NN/g's response-time limits: about 0.1 s feels instant, about 1 s keeps the flow of thought, about 10 s is the limit of attention. When nothing visible happens, people doubt the action worked and repeat it, which can create a second order or payment.

**How to check.**
- Throttle the network to "Fast 4G" (or the slowest connection in the profile) and run the main actions.
- Time from tap to first visible change: under 0.1 s.
- Over 1 s: a busy state appears (spinner with a label, or a skeleton for a whole page). Over 10 s: a percent-done or step count ("3 of 50") and a stop option.
- Tap the submit button twice quickly: only one request is sent.
- No spinner or skeleton for loads under 1 s (NN/g); no static "Loading…" text alone.

**Bad → Good.** "Record payment" shows nothing for three seconds and the clerk taps again → the button turns into "Recording…" at once, is disabled until the answer, and the payment is recorded once.

**Limits.** Showing a result before the server confirms it (an optimistic update) is fine only when it can be rolled back with a clear message; never for payments. The 400 ms "Doherty threshold" is a productivity target from a 1982 industry paper, not a replicated limit; the 0.1/1/10 s limits are the ones to check against.

**Evidence.** Research, extended: response-time limits come from HCI literature summarised by NN/g; the progress-indicator benefit comes from one cited study (people waited about 3 times longer with a looped indicator, sample size not given).

**Sources.** NN/g (Response times: the 3 important limits, 1993/2014; Progress indicators, 2014; Skeleton screens, 2023); Apple HIG (Buttons: activity indicator in the button); Laws of UX (Doherty Threshold); Doherty & Thadani 1982; secondary: GitLab Pajamas ("every interaction feels instant"), Figma Resource Library (Button states). (former LAW-DOHERTY)

## ACT-3. Few, ordered options at each decision; recommend one

**Rule.** At each point where people decide what to do next, the options are few, in a sensible order (by frequency, alphabet or size), and the recommended one is visibly marked. Long sets are grouped or narrowed with search and filters. When people pick one of several comparable items (plans, slots, templates), the items show the same attributes in the same order so they can be compared line by line.

**Why.** In choice-reaction experiments, the time to choose among known options grows with the logarithm of their number (Hick, Hyman). In an unordered list of unfamiliar items people scan one by one, so the time grows with every item. Large sets of comparable options can make people put off the choice, but a meta-analysis of 50 experiments (Scheibehenne, Greifeneder & Todd 2010) found a mean effect close to zero with large variation: overload appears when options are hard to compare and the person has no clear preference.

**How to check.**
- Count the actions on the first phone screen (buttons and action links; not list rows, not navigation): no more than five (ours), one of them primary.
- Every list of more than ten items (ours) is ordered or grouped and has search.
- Every choice among comparable items: about five shown first (ours), one marked as recommended when the product can know it, attributes aligned row by row.

**Bad → Good.** "New" opens a menu of 14 document types in random order → the 3 most used on top, "All types" with search below. Six subscription plans with different feature lists → three plans, "Most chosen" on one, one comparison table.

**Limits.** Experts who make the same choice every day may prefer everything at once (a toolbar, keyboard shortcuts). Catalogues with hundreds of items rely on search and filters, not on a short first screen. Decide by frequency and the person's task, not by the count alone.

**Conflicts.** With MEM-1 (show the rest progressively) and EXP-5: hiding options lowers load but costs discoverability; see conflicts.md.

**Evidence.** Research, limited (Hick holds for known, ordered options) and Disputed (choice overload: mean effect ≈ 0, depends on conditions). Thresholds are ours.

**Sources.** NN/g (Progressive disclosure, 2006; Mobile navigation patterns, 2015); Laws of UX (Hick's Law, Choice Overload); Hick 1952; Hyman 1953; Scheibehenne, Greifeneder & Todd 2010; Seow 2005 (via IxDF, Hick's law); secondary: "58 rules" (Bakusevych 2024), uxpilot (Web design principles). (former LAW-HICK, LAW-CHOICE-OVERLOAD)

## ACT-4. Give the best place to the few most frequent tasks

**Rule.** Find the three to five tasks that make up most of the use of a screen. They get the best places: the first screen, the largest targets, one tap from the start. Everything else can be one level deeper. Frequent desktop actions also get keyboard shortcuts.

**Why.** Use is spread unevenly: a few features usually carry most of it. Designing every feature as equally important serves the rarely used ones at the cost of the few that matter. NN/g and the old heuristic of "flexibility and efficiency of use" both point to accelerators for frequent actions.

**How to check.**
- List the three to five most frequent tasks (ours) from analytics, the project profile, or by asking.
- Each starts from the main screen within one tap (ours) and is visible without scrolling at 390 px.
- No rarely used action takes space above them.
- On desktop, frequent actions have shortcuts that do not override system ones.

**Bad → Good.** On the Acme home screen "Record payment" is in a menu while "Order branded receipts" is a large tile → "New order" and "Record payment" are the two main buttons, extras under "More".

**Limits.** The 80/20 split is a rough pattern, not a law; use real numbers when you have them. Do not move a frequent action people already know without a reason (EXP-4).

**Evidence.** Analogy (Pareto comes from economics); the practice of putting frequent tasks first is a Heuristic shared by NN/g, IBM and Apple's guidance.

**Sources.** NN/g (10 usability heuristics: flexibility and efficiency of use); Apple HIG (Layout: important content first); Laws of UX (Pareto Principle); secondary: IBM design principles ("optimise for the most frequent tasks"), Apple iOS UX guidelines (top-down, frequent options in the main UI). (former LAW-PARETO)

## ACT-5. Show progress honestly in multi-step tasks

**Rule.** A task with several steps shows where the person is and how much is left: "Step 2 of 4", a progress bar or a checklist. Steps already done, by the person or by the product, count from the start. The count never grows near the end.

**Why.** People speed up as they get closer to a goal (Hull's goal-gradient). In a loyalty-card study, a card that started with progress already given was completed more often and faster than an empty card needing the same number of visits (Nunes & Drèze 2006, the endowed-progress effect).

**How to check.**
- For every task of three or more steps or screens (ours): each step shows its number and the total, or a bar.
- Finished steps are marked as done; the current step is marked.
- Walk to the end: no hidden extra step appears.
- Setup checklists count what is already done ("Account created" ticked).

**Bad → Good.** A five-screen shop setup with no indication of length → "Step 1 of 4" with a bar; "Account created" shown as done.

**Limits.** Progress must be real. A bar that jumps back, or a count that grows near the end, breaks trust. A short form on one screen needs no progress indicator.

**Evidence.** Research (goal-gradient: Hull; Kivetz, Urminsky & Zheng; endowed progress: Nunes & Drèze 2006, checked through summaries).

**Sources.** NN/g (Progress indicators, 2014); Laws of UX (Goal-Gradient Effect); Hull 1932; Kivetz, Urminsky & Zheng 2006; Nunes & Drèze 2006; secondary: Figma Resource Library (UI design best practices: steps remaining), "58 rules" (break up huge tasks, visually display progress), U.S. Web Design System (progress indicator on multi-step flows). (former LAW-GOAL-GRADIENT)

## ACT-6. Ask for as little as possible; let the product do the work

**Rule.** Every field and every decision in a task must be needed for the result. What the product can know or work out (from earlier data, the device, a lookup or a sensible default) it fills in itself. Before a task longer than one screen, the screen says how long it is.

**Why.** Every task has some complexity that cannot be removed; it either sits with the product or lands on the person as extra fields and errors (Tesler). NN/g recommends prefilling the most common predictable value and removing fields that can be derived, deferred or dropped. Baymard's checkout benchmark found the average checkout asks for about 11 form fields while most need about 8, and that separate first- and last-name fields made 42% of test participants type their full name into the first field at least once.

**How to check.**
- For each field, ask "what breaks if we remove it?" Remove or defer fields with no answer.
- No field asks for what the product could know: city from postcode, card type from the number, today's date, the shop's country.
- Names: one "Full name" field unless the task truly needs parts.
- Optional fields that most people skip (second address line, company, coupon) are behind a link.
- A task longer than one screen states its length at the start ("3 steps, about 2 minutes").

**Bad → Good.** Shop sign-up asks for address, birthday and tax number before the owner can try anything → email and password; the rest is asked when the first invoice needs it. "Select card type" before the card number → the type is detected from the number.

**Limits.** Automatic choices that matter (money, sending, deleting) are shown and can be changed. Defaults must be the typical value, not the most expensive one (HONEST-1). Gifting and business orders may truly need a separate billing address.

**Evidence.** Research (NN/g on defaults; Baymard checkout benchmark and testing, e-commerce, US/EU) plus Heuristic (Tesler); Parkinson's law is an Analogy from a 1955 essay and adds only "state the length".

**Sources.** NN/g (Website forms usability, 2016; The power of defaults, 2005; Minimize cognitive load, 2013); Baymard (checkout form fields, 2024; automatic address lookup, 2023); Laws of UX (Tesler's Law, Parkinson's Law); secondary: "58 rules" (savings in time feel like simplicity), uxhints (Occam's razor: limit form fields), Atlassian design principles. (former LAW-TESLER, LAW-PARKINSON)

## ACT-7. Accept the ways people type; show the right keyboard

**Rule.** Fields accept the formats people naturally use (spaces, dashes and brackets in phone numbers; spaces in card numbers; a comma or a dot in amounts; a pasted value with extra spaces) and turn them into one clean format. On phones, each field opens the keyboard that fits it, and names, addresses and emails are not autocorrected.

**Why.** People type the same value in many ways; rejecting reasonable input makes the product feel broken. Baymard found that sites which reject or strip spaces in card numbers cause errors, and that the numeric keypad's keys are much larger than the full keyboard's. The robustness principle ("be liberal in what you accept") comes from network protocols; the IETF itself now warns (RFC 9413, 2023) against silently reinterpreting bad input.

**How to check.**
- For each typed field (phone, date, amount, card, postcode, email), enter three reasonable variants: with spaces, with separators, pasted with a trailing space. All are accepted and shown back in one format.
- Card number: spaces accepted, auto-formatted as typed, no length cap below 19 digits.
- Phone, card, postcode open a numeric keypad (`inputmode`/`type`); email opens the email keyboard; autocorrect off on names, addresses and emails; capitalisation off on emails.
- An error appears only for input that cannot be understood, and it shows the expected format with an example.

**Bad → Good.** "+1 (555) 010-0199" rejected as "Invalid phone" → accepted and shown as "+1 555 010 0199". The courier's phone field opens the letter keyboard → numeric keypad.

**Limits.** Do not guess on ambiguous input that changes meaning (03/04 as a date: March or April?): ask, or use a date picker. Accept variants of a known format; never guess intent. Sign-in fields may limit detail in error messages for security.

**Evidence.** Research (Baymard keyboard and card-field benchmarks, e-commerce; 2015 keyboard data is dated) plus Analogy (Postel's principle, disputed in its own field).

**Sources.** Apple HIG (Text fields: right keyboard, number formatter); NN/g (Consistency and standards: auto-formatted phone fields); Baymard (card number spaces, 2017/2025; mobile touch keyboards, 2015); Laws of UX (Postel's Law); RFC 9413 (2023); secondary: Figma Resource Library (UX validation: localisation and currency formats). (former LAW-POSTEL)

## ACT-8. Don't interrupt a task in progress

**Rule.** While a person is doing the main task, nothing appears that they did not ask for: no pop-ups, rating requests, promotions, chat prompts or tours. Feedback comes at once and in place. Requests for ratings, upgrades or surveys come after a task is finished, and only once.

**Why.** Focused work needs clear goals, immediate feedback and no breaks; every interruption costs the time to get back (flow, Csíkszentmihályi). Apple's guidance is to ask for ratings or purchases only after people have engaged with the app, and NN/g advises against slide-in pop-ups such as chat prompts.

**How to check.**
- Do the main task from start to finish.
- Count every element that appears without being asked for (modal, banner, tooltip tour, survey, chat bubble). Pass: zero during the task.
- Any request that remains appears after the result screen and can be dismissed in one tap, and is not shown again the same day (ours).

**Bad → Good.** "Rate Acme" opens while the clerk types an order note → asked once, after the order is placed, with a plain "Not now".

**Limits.** Warnings that prevent a loss (unsaved changes, a failed payment, an expiring session) are not interruptions; they belong where they appear. Time limits follow WCAG 2.2.1 (warn and allow extending).

**Evidence.** Research, extended: flow theory describes focused activity in general; the rule against interruptions is an inference supported by NN/g and Apple guidance.

**Sources.** WCAG 2.2 (2.2.1 Timing adjustable); Apple HIG (Onboarding: ratings after engagement); NN/g (Animation for attention, 2014: avoid peripheral slide-in pop-ups; Mobile-app onboarding, 2020); Laws of UX (Flow); Csíkszentmihályi 1975; secondary: Figma Resource Library (Mobile website design: avoid pop-ups). (former LAW-FLOW)

## ACT-9. Keep unfinished work and show the way back

**Rule.** When a task is left half done (a draft order, a cart, an unfinished setup, a closed dialog with a form), the product keeps what was entered, shows that it is unfinished, and offers a direct way back to the exact step. Long multi-session processes have explicit "save and return".

**Why.** Zeigarnik reported that interrupted tasks are remembered better; a 2025 meta-analysis (Ghibellini & Meier) did not find that memory effect reliably, but did find the tendency Ovsiankina described in 1928: given the chance, people go back to an interrupted task. A product that keeps the work makes the return easy; one that loses it turns the return into frustration.

**How to check.**
- Start the main multi-step task, stop halfway, close the screen, come back. The data is still there; the way to continue is on the first screen seen; it opens at the step left.
- Open a dialog with a form, type, dismiss it by backdrop or Escape, reopen: the text is still there, or the product asked before discarding it.
- Use the browser Back button inside a form: no data lost without a warning.

**Bad → Good.** The new-shop form empties itself after ten minutes away → "Continue setting up your shop: step 3 of 5" on the home screen. A note typed in the order dialog vanishes when the backdrop is tapped → the note is kept as a draft.

**Limits.** One visible place to continue, no repeated reminders, and an easy way to discard the draft. Sensitive data (card numbers, passwords) is not kept.

**Evidence.** Disputed (the Zeigarnik memory effect) and Research (the Ovsiankina resumption tendency, meta-analysis 2025). The rule rests on resumption.

**Sources.** NN/g (User control and freedom, 2020: warn before data loss); Laws of UX (Zeigarnik Effect); Ovsiankina 1928; Ghibellini & Meier 2025; secondary: NHS design principles (save and resume), U.S. Web Design System (save and return), Figma Resource Library (UX validation: dismiss a modal mid-form), Atlassian design principles (resumable drafts). (former LAW-ZEIGARNIK)

## ACT-10. Design the worst moment and the last moment

**Rule.** For each main task, find its most intense moment (usually an error, a wait or a loss) and its last moment (the result). The error is clear, specific and recoverable, and keeps what was entered. The result screen says plainly what was done, with its key facts, and what comes next.

**Why.** People judge an experience mostly by its most intense point and its end, not by the average (Kahneman, Fredrickson, Schreiber & Redelmeier 1993).

**How to check.**
- Walk the main task to the end: the result screen names what was done with key facts ("Order 1042 placed, delivery on 12 March") and the next step.
- Walk it again with the most likely error (declined card, lost connection): the message says what went wrong in plain words and how to fix it; entered data is kept.

**Bad → Good.** After payment Acme Shop jumps back to the home page → a result screen with the amount, the receipt and "Track order". A declined card clears the whole form → the form is kept, the error sits next to the card number, "Try another card".

**Limits.** A good ending does not excuse a broken middle; every other rule still applies to every step.

**Evidence.** Research, extended: the peak-end rule was measured on how past episodes are judged; applying it to task screens is an inference.

**Sources.** NN/g (Error-message guidelines, 2023; 10 usability heuristics: visibility of system status); Apple HIG (Alerts: say what happened and why); Laws of UX (Peak-End Rule); Kahneman, Fredrickson, Schreiber & Redelmeier 1993; secondary: Figma Resource Library (User flow: endpoint is a confirmation). (former LAW-PEAK-END)
