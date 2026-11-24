# Worked cases

Eight reviews on the fictional products Acme (an app where small shops take orders and payments; roles: shop owner, sales clerk, courier) and Acme Shop (its customer web shop). Each case shows the trap a reviewer falls into at first glance and how the rules resolve it. Use them to calibrate severity (severity.md) and to tell taste from defects (taste-vs-defect.md).

## Case 1. A beautiful hero that half the people cannot read

**Screen and task.** Acme Shop home on a phone. A full-width photo of a bakery, the headline "Fresh every morning" and the line "Order by 9 pm, delivered by 8 am" in thin white text across the brightest part of the photo. Task: find out when an order will arrive.

**First glance.** "Stunning, very premium. Ship it."

**What is actually wrong.** The delivery promise — the one fact the person came for — sits on light flour and a window; measured against the pixels behind it, the thin white text is far below 4.5:1 (COLOR-1, WCAG 1.4.3). On a phone in daylight it disappears. The thin weight makes it worse (TEXT-1). The headline is decoration; the useful line is the small one (LAYOUT-3, LAYOUT-5).

**Severity.** 3 — the main message of the screen is unreadable for many people in common conditions; the task can still be done elsewhere (the checkout shows the time), so not 4. On a screen where that text were the only place the information lives, 4.

**Smallest fix.** A dark gradient or solid band behind the text, regular weight, and the delivery promise as the larger line; check contrast against the lightest pixels behind the text.

**Lesson.** Judge text over images by its worst background, not its average. A good look does not excuse a failed contrast check (HONEST-4).

## Case 2. A button lying on the words it should support

**Screen and task.** Acme Shop sign-up screen. A photo collage with large overlaid words "Your bakery, your rules"; the "Log in" outline button is placed on top of the words. Task: log in.

**First glance.** "Bold layered look, on trend."

**What is actually wrong.** The button's outline and label run across the large words, so both are hard to read; the outline button on a busy photo has no contrasting container (COLOR-1, WCAG 1.4.11 for the button boundary at 3:1; Material 3 warns about outlined buttons on images). Two things compete for the same spot (LAYOUT-2, LAYOUT-3).

**Severity.** 3 if returning users struggle to find "Log in" (a main task for them); 2 if "Log in" is also in the header.

**Smallest fix.** Move the button below the image or give it a solid fill; keep the overlaid words clear of any control.

**Lesson.** Nothing interactive sits on text or busy imagery. Check where things overlap at every width, not only at the width of the mock-up.

## Case 3. "Learn to sell": engagement or manipulation?

**Screen and task.** Acme's in-app course for shop owners. After each lesson a "mystery reward" box opens with a random number of coins; the next quiz shows "Next quiz in 15 h 43 min"; a banner offers "+50 coins for sharing with a friend". Task: learn how to price products.

**First glance.** "Great engagement, numbers will go up."

**What is actually right and wrong.** Showing lesson progress is right (ACT-5). The random reward, the artificial 15-hour lock and paid sharing are retention mechanics that serve the product's schedule, not the owner's goal (HONEST-2). The lock also blocks a motivated learner, which breaks flow (ACT-8). Second-order test: after a month the owner has learned to come back for coins, not how to price.

**Severity.** 3 — no money is lost directly, but the product works against its users' goal and trust; in a product handling payments or investments it would be 4.

**Smallest fix.** Remove the random reward and the paid-sharing bonus; unlock the next quiz now; show "3 of 8 lessons — next: pricing".

**Lesson.** Ask what a mechanic teaches after a month. The "58 rules" article presents variable rewards as good engagement; this skill does not (disputed.md).

## Case 4. A disabled "Pay" button that says nothing

**Screen and task.** Acme, taking a card payment in the shop. The "Pay 24.50" button is grey and does nothing. Task: take the payment while the customer waits.

**First glance.** "Fine, it's disabled until the form is valid."

**What is actually wrong.** The clerk cannot tell why: the card reader is not connected, but nothing says so (STATE-1: a disabled control explains why; STATE-2: every state has a next step). Low-contrast grey may also be unreadable — allowed for disabled controls by WCAG, but then the reason must be stated elsewhere in readable text. A queue forms; the clerk restarts the app.

**Severity.** 4 — the main task cannot be done, there is time pressure, and money is involved.

**Smallest fix.** Keep the button enabled and show the problem on press, or show next to it: "Card reader not connected — Connect reader".

**Lesson.** "Disabled until valid" is fine only when the person can see what is missing.

## Case 5. A hidden menu on a desktop app with four sections

**Screen and task.** Acme web app for shop owners on a laptop: Orders, Customers, Products, Reports, all behind a hamburger icon in the corner. Task: open the reports.

**First glance.** "Clean and minimal."

**What is actually wrong.** On desktop there is room for four labelled sections. Navigation behind a menu icon is used less than visible navigation, so sections are found less often and tasks take longer (EXP-6). The current section is not shown anywhere either.

**Severity.** 2 — people find the reports eventually, but slower, on a screen used every day; 3 if new owners regularly fail to find a section.

**Smallest fix.** Show the four sections as a visible bar or side navigation on wide windows, highlight the current one, and keep the hamburger only for narrow phone widths if needed.

**Lesson.** "Minimal" that hides a handful of top destinations costs more than it saves.

## Case 6. "Invalid value" on a phone number with spaces

**Screen and task.** Acme Shop checkout. The customer types "+1 555 010 0199" and sees a red "Invalid value" under the field after pressing "Place order". Task: finish the order.

**First glance.** "Validation works, the field is required anyway."

**What is actually wrong.** The field rejects a normal way of writing a phone number (ACT-7). The message does not say what is wrong or how to fix it (STATE-3, WCAG 3.3.1 requires the error to be identified and described in text). It appears only after submit. On mobile the field may also open the full keyboard instead of the phone keypad (ACT-7).

**Severity.** 3 — many people will fail at least once at the last step of buying; some will leave.

**Smallest fix.** Accept spaces, dashes and brackets and normalise them; set the phone input type; if the number is really too short, say "Phone number is too short — enter all digits, e.g. +1 555 010 0199".

**Lesson.** Most "user errors" in forms are format rules the product could have handled itself.

## Case 7. "Only two font sizes — use a golden-ratio scale"

**Screen and task.** Acme order list. Text uses two sizes (order name 16 px semibold, details 14 px regular) with clear weight and colour differences. A reviewer writes: "The type scale should follow the golden ratio for harmony."

**First glance.** Sounds like a sophisticated finding.

**What is actually right.** The hierarchy is clear: the eye goes to the order name, then the amount, then details (TEXT-1, LAYOUT-3). Nothing is harder to read or find. The golden ratio has no measured benefit for usability (disputed.md). This is taste.

**Severity.** No score. One line under "Taste".

**Smallest fix.** None needed.

**Lesson.** A finding needs harm on the screen for a person doing a task. "Doesn't follow principle X" is not harm (taste-vs-defect.md).

## Case 8. A decoy plan and a stock count that never changes

**Screen and task.** Acme pricing page. Three plans: Basic 9, Plus 29, Pro 30. Plus has fewer features than Pro for almost the same price; a red badge on Pro says "Only 2 left at this price!" and has said so for months. Task: choose a plan.

**First glance.** "Clear tiers, strong call to action, conversions are up."

**What is actually wrong.** Plus exists to make Pro look like a bargain — a decoy (HONEST-1). The "only 2 left" claim is not tied to any real limit — false scarcity (HONEST-1). Both push the owner into a decision they might not make with true information.

**Severity.** 4 — it misleads people about money; in many countries it is also a legal risk. The visual quality of the page does not lower the score.

**Smallest fix.** Remove the scarcity badge; either make Plus a real option at a fair price or remove it; mark as "recommended" only the plan that fits most shops.

**Lesson.** Persuasion is fine when it is true. Check every claim of scarcity and urgency against data before accepting the screen.
