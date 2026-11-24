# Action and decision: reaching, choosing, waiting, keeping going

Eight rules on the physical and mental cost of acting: how far a target is, how many options there are, how long the screen takes to answer, and what keeps a person moving to the end of a task.

## LAW-FITTS. Frequent targets are big and close; dangerous ones are not

**Rule.** The targets people use most are large and near where the hand or pointer already is. Every touch target is at least 44 × 44 px (CSS pixels, ours) on touch screens; under 24 × 24 px only with the spacing WCAG 2.2 requires. Destructive actions are not placed right next to frequent ones.

**Why.** The time to hit a target grows with its distance and shrinks with its size. Small, far targets are slow and get missed; a dangerous target next to a frequent one gets hit by accident.

**How to check.** Measure the hit area (not the icon) of every interactive element at 390 px width. Pass: at least 44 × 44 px (ours; the same size as WCAG 2.2 AAA, 2.5.5). A target under 24 × 24 px passes WCAG 2.2 AA (2.5.8 Target Size (Minimum)) only if a 24 px circle centred on it does not touch another target or another small target's circle; links inside running text are exempt. The primary action of a phone screen is in the lower two thirds of the screen or pinned to the bottom (ours). "Delete" or "Cancel order" is at least 16 px (ours) away from the primary action, or behind a menu.

**Bad → Good.** A 20 px "×" in the top corner as the only way to close a sheet → the whole backdrop closes it, plus a 44 px "Close" button. "Delete" and "Save" side by side → "Save" as the primary button, "Delete" in the menu.

**Limits.** On desktop, screen edges and corners are easy to hit with a mouse (the pointer stops there); on touch screens they are not.

**Evidence.** Research: Fitts's law is one of the best-replicated results in human movement and in HCI; target sizes come from WCAG 2.2, not from Fitts. Checked against the research 24.11.2026 (WCAG 2.5.8).

**Sources.** [LUX-FITTS]; origin: Paul Fitts, 1954 [LUX-FITTS]; [WCAG-TARGET-SIZE].

## LAW-DOHERTY. Answer within 400 ms; show progress when you cannot

**Rule.** Every action gets a visible response within 400 ms: the pressed state, the item added, the screen changed. When the real work takes longer, the screen shows at once that it started (optimistic update, a skeleton, a spinner), and after about 10 seconds (ours) it shows how much is left.

**Why.** When the system answers faster than about 400 ms, people keep their train of thought and work faster; slower answers make them wait, and they start doubting the action worked and repeat it.

**How to check.** Use the main actions with the browser's network throttled to "Fast 4G" (or the slowest connection in the profile). Measure the time from tap to the first visible change. Pass: under 400 ms for every action. For actions that take over 1 s (ours) to finish, an indicator appears; over 10 s (ours), the indicator shows progress or time left. Buttons that send a request cannot be pressed twice while it runs.

**Bad → Good.** "Pay" does nothing visible for three seconds, people press it again → the button turns into "Paying…" at once and is disabled until the answer.

**Limits.** Showing a result before the server confirms it is fine only when it can be rolled back with a clear message; never for payments.

**Evidence.** Heuristic: a 1982 industry paper on productivity; the 400 ms figure is a target, not a replicated limit. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-DOHERTY]; origin: Walter J. Doherty and Arvind J. Thadani, IBM Systems Journal, 1982 [LUX-DOHERTY].

## LAW-HICK. Fewer options at each decision point

**Rule.** At each point where the user decides what to do next, the options are few and the recommended one is obvious. Long sets are split into steps or categories, or narrowed with search.

**Why.** In choice-reaction experiments, the time to choose among known options grows with the logarithm of their number. On screens this holds when people know what they are looking for and the options are ordered or grouped; in an unordered list of unfamiliar items, people scan one by one, so the time grows with every item, which is worse.

**How to check.** Count the actions available on the first screen at 390 px (buttons and action links; not list rows, not navigation). Pass: no more than five (ours), with one primary. For every choice list (select, radio group, menu), more than ten items (ours) are ordered or grouped and get search.

**Bad → Good.** A "New" button that opens a menu of 14 document types → the 3 most used on top, "All types" with search below.

**Limits.** Experts who make the same choice every day may prefer everything at once (a toolbar, keyboard shortcuts). Decide by the user's task and frequency, not by the count alone. A long list that is ordered (alphabet, date) or grouped with headings is searched much faster than the same list unordered.

**Evidence.** Research, limited: holds for choosing among known, ordered options; in unordered lists of unfamiliar items search is linear. Checked against the research 24.11.2026.

**Sources.** [LUX-HICK]; origin: William Edmund Hick and Ray Hyman, 1950s [LUX-HICK]; on linear search in unordered menus: Sears and Shneiderman, Bailly and others.

## LAW-CHOICE-OVERLOAD. Help people choose among many similar options

**Rule.** When people must choose one item from many comparable ones (plans, products, slots, templates), the screen narrows the set (filters, a short list first), marks a sensible default or recommendation, and makes the differences between items easy to compare.

**Why.** The well-known studies found that a large set of comparable options can make people put off the choice or leave without choosing. Across many experiments, though, the average effect is close to zero and varies a lot: overload appears in some conditions (options hard to compare, no clear preference, a hard decision) and not in others. The rule targets those conditions rather than the number alone.

**How to check.** Find every screen where the user picks one of several comparable items. Pass: no more than about five (ours) shown at first, or filters and sorting at the top. One option is marked as recommended when the product can know it. The items show the same attributes in the same order, so they can be compared line by line.

**Bad → Good.** Twelve subscription plans in a grid with different feature lists → three plans, one marked "Most chosen", one table comparing them row by row, "All plans" below.

**Limits.** A store catalogue may show hundreds of products; then search and filters carry the choice, not the first screen.

**Evidence.** Disputed: a 2010 meta-analysis found a mean effect near zero with large variation between studies. Checked against the research 24.11.2026.

**Sources.** [LUX-CHOICE-OVERLOAD]; origin: the term from Alvin Toffler, "Future Shock", 1970 [LUX-CHOICE-OVERLOAD]; meta-analysis: Scheibehenne, Greifeneder and Todd, 2010.

## LAW-PARETO. Give the best place to the few things used most

**Rule.** Find the few actions and pieces of information that make up most of the use of a screen (often three to five). They get the best places: the first screen, the largest targets, one tap from the start. Everything else may be one level deeper.

**Why.** Effects are spread unevenly: a small share of features usually accounts for most of the use. Designing every feature as equally important serves the many rarely used ones at the cost of the few that matter.

**How to check.** List the three to five (ours) most frequent tasks (from analytics, the project profile, or by asking). Pass: each one starts from the main screen in no more than one tap (ours) and is visible without scrolling at 390 px. Rarely used actions do not take space above them.

**Bad → Good.** A banking home screen where "Transfer" is in a menu and "Order a branded card design" is a big tile → "Transfer" and "Pay" as the two main buttons, extras under "More".

**Limits.** The 80/20 split is a rough pattern, not a law of nature; use the real numbers when you have them.

**Evidence.** Analogy: an observation from economics; the 80/20 split is a rough pattern. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-PARETO]; origin: Vilfredo Pareto, economics [LUX-PARETO].

## LAW-GOAL-GRADIENT. Show progress, and show it from the start

**Rule.** Tasks with several steps show how far the person has got and how much is left (step 2 of 4, a progress bar, a checklist). Steps that are already done, by the user or by the product, count from the start, so the bar never starts at zero when it does not have to (the endowed progress effect, Nunes and Drèze, 2006).

**Why.** People speed up as they get closer to a goal. In a car-wash loyalty card study, a card that started with progress already given was completed more often and faster than an empty card that needed the same number of visits.

**How to check.** Find every task with three or more steps or screens (ours). Pass: each step shows its number and the total, or a progress bar; finished steps are marked as done; the count is honest (no hidden extra steps at the end). Setup checklists count what is already done (for example, "account created" is ticked).

**Bad → Good.** A five-screen onboarding with no indication of length → "Step 1 of 4" with a bar; the account creation step shown as already done.

**Limits.** Progress must be real. A bar that jumps backwards or a step count that grows near the end destroys trust.

**Evidence.** Research: goal-gradient (Hull, Kivetz and others) and the endowed progress effect (Nunes and Drèze). Checked against the research 24.11.2026 (Nunes and Drèze, from summaries).

**Sources.** [LUX-GOAL-GRADIENT]; origin: Clark Hull, goal-gradient hypothesis, 1932 [LUX-GOAL-GRADIENT]; Kivetz, Urminsky and Zheng on purchase acceleration [LUX-GOAL-GRADIENT]; Nunes and Drèze, "The Endowed Progress Effect", 2006.

## LAW-FLOW. Do not interrupt a task in progress

**Rule.** While a person is doing the main task, nothing interrupts them: no pop-ups, rating requests, promotions or tours. Feedback comes at once and in place. The task offers just enough challenge: no needless steps for experts, no dead ends for beginners.

**Why.** People do their best work in a state of focused flow, which needs clear goals, immediate feedback and a match between challenge and skill. Every interruption breaks it, and getting back takes time.

**How to check.** Do the main task from start to finish. Count every element that appears and was not asked for (a modal, a banner, a tooltip tour, a survey). Pass: zero during the task. Any interruption is moved to after the result, and only when it is needed.

**Bad → Good.** "Rate our app" opens in the middle of writing a message → asked once, after a task is finished, and easy to dismiss.

**Limits.** Warnings that prevent a loss (unsaved changes, a payment error) are not interruptions; they belong where they appear.

**Evidence.** Research, extended: flow theory describes focused activity in general; the rule about interruptions is an inference. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-FLOW]; origin: Mihály Csíkszentmihályi, 1975 [LUX-FLOW].

## LAW-PARKINSON. Keep tasks short and say how long they take

**Rule.** A task takes no more steps and fields than it needs. Before a long task starts, the screen says how long it is (number of steps or minutes). The product fills in what it can (autofill, saved details, sensible defaults) so the person finishes sooner than they expected.

**Why.** Work tends to fill the time it is given. A task with no visible end feels longer, and people spread effort over it or give up; a short, bounded task with a known length gets done.

**How to check.** For each main task, count the steps and the fields. Pass: every field is needed for the result (ask: what breaks if we remove it?). Tasks longer than one screen say their length at the start ("3 steps, about 2 minutes"). Fields the product already knows are prefilled.

**Bad → Good.** A sign-up asking for address, birthday and company before the user can try anything → email and password; the rest asked when it is needed.

**Limits.** Never invent time limits or countdowns to push people; false urgency is a dark pattern (see LAW-COGNITIVE-BIAS).

**Evidence.** Analogy: a humorous 1955 essay about bureaucracy, not a study; the rule stands on its own as a design practice. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-PARKINSON]; origin: Cyril Northcote Parkinson, essay in The Economist, 1955 [LUX-PARKINSON].
