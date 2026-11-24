# Honesty

Choices that involve money, data, consent and time: prices, add-ons, subscriptions, rewards, permissions. Also how a review itself stays honest: judging a screen by what people manage to do, not by how good it looks. A screen can be easy to use and still work against the person using it; these rules catch that.

## Review questions

- Is the full price, with every fee, visible before the person commits to pay?
- Is anything that costs money or shares data selected by default?
- Is "no" as easy to find and as neutrally worded as "yes"? Is cancelling as easy as signing up?
- Is every countdown, "only N left" and "N people are viewing" true and checkable?
- Do rewards, streaks or timers serve the person's goal, or only bring them back on the product's schedule?
- Is every permission and every piece of personal data asked for at the moment it is needed, with the reason stated?

## HONEST-1. Show the full price and give honest choices

**Rule.** Show the full cost (fees, delivery, taxes, renewal price) before the person commits, not on the last step. Nothing that costs money or shares data is selected by default. The decline option is a plain, neutral label as visible as the accept option. Scarcity, countdowns and social proof are shown only when they are true. Plans are not arranged with a fake option whose only job is to make another look better. Cancelling is no harder than signing up.

**Why.** These tricks work because people predictably keep defaults, anchor on the first price they see and hurry under time pressure. They raise short-term numbers and destroy trust: costs revealed late are one of the most common reasons people abandon a checkout. Many of these patterns are also illegal under consumer and data-protection law in a growing number of countries.

**How to check.** Walk the purchase or sign-up as a cautious user and answer:
- Does the person end up paying or sharing more than they chose to? Compare the first price seen with the final total.
- Is anything paid or data-sharing pre-ticked? (Must be no.)
- Is the decline worded neutrally ("Skip", "No thanks") and shown at the same size and contrast as accept? No shame or guilt wording.
- Is any option hidden, greyed out or harder to reach than the one the business prefers?
- Is any timer, stock count or "people viewing" figure tied to real data? Ask for the data source; if there is none, it fails.
- Does the person get time to decide?
- Is a plan there only to make its neighbour look cheap (worse value than the next plan for almost the same price)?
- Count the steps to cancel and compare them with the steps to subscribe.
Check with the most vulnerable person in mind: someone in a hurry, on a phone, reading in a second language.

**Thresholds.** Cancelling takes no more steps than subscribing, in the same channel [profile: honest.cancel-parity = same channel, no more steps].

**Bad → Good.** At the last step of Acme Shop checkout a "service fee 1.50" appears and "Gift wrap + 2.00" is ticked; the decline link says "No, I don't care about my gift" → the total with all fees is shown in the cart, gift wrap is unticked, and the options read "Add gift wrap, 2.00" and "Skip".

**Limits.** Honest persuasion is fine: a real stock count, a real deadline, a genuinely popular plan marked as such, a default that serves the person (the most common delivery option preselected) and is easy to change.

**Conflicts.** C-14 (recommend one option vs steer to the most profitable).

**Evidence.** Research (prevalence studies of deceptive patterns on shopping sites and in apps; checkout-abandonment surveys) and Practice (the walkthrough questions).

## HONEST-2. Engage people without manipulating them

**Rule.** Rewards, streaks, badges, reminders and progress serve the person's own goal. Do not use random rewards to keep people pulling, artificial waiting times that make people return on the product's schedule, rewards for advertising the product to friends, or guilt over a broken streak. Before adding any engagement mechanic, ask what it teaches the person after a month, not only what it does to today's numbers.

**Why.** Random rewards and artificial waits are the mechanics of slot machines and free-to-play games; they raise return visits by building a habit, not by helping. In a product about money, health or learning they also teach the wrong lesson: a random gift of a share teaches that investing is a lottery. Paying people in points to share turns them into unpaid advertisers and floods their friends.

**How to check.**
- List every reward, streak, badge, timer and reminder on the screen. For each, write the person's goal it serves. None → it is a retention device; flag it.
- Is any reward random in size or in whether it comes at all? Flag random rewards tied to money, health or learning.
- Is any feature locked behind a wait ("next quiz in 15 h") with no reason other than bringing the person back? Flag.
- Does sharing earn the person anything? Flag paid sharing.
- Does breaking a streak cost the person something they earned, or show guilt wording? Flag.
- The "a month later" test: write one sentence on what the person has learned or gained after a month of the mechanic.

**Bad → Good.** Acme's "Learn to sell" lessons give a random bonus after each lesson, lock the next quiz for 15 hours and give "+50 coins" for sharing → lessons show real progress ("3 of 8 lessons, next: pricing"), the next lesson is open as soon as the person wants it, and sharing is a plain "Share" with no reward.

**Limits.** Progress, achievements tied to real skill, and reminders the person set up themselves are fine. Games are games; this rule is for products whose purpose is not play.

**Conflicts.** S-8; ACT-5 (progress is honest feedback on the person's goal; a streak that punishes a missed day is not progress).

**Evidence.** Practice, supported by research on reinforcement schedules and on deceptive patterns.

## HONEST-3. Ask for data and permissions only when needed, and say why

**Rule.** Ask for each permission (location, camera, contacts, notifications) at the moment the person uses the feature that needs it, with one sentence on why, not at first launch. Collect only the personal data the task needs. Say before use what is collected and how it is used; sharing data with third parties for advertising needs explicit opt-in. Give a visible way to delete the account and its data.

**Why.** A permission asked at launch, without context, is refused more often and teaches people to tap "Allow" or "Deny" without reading. Data the product does not need is a risk to the person and a liability for the business.

**How to check.**
- Install fresh and count the permission prompts before the person does anything: zero, unless the app cannot work at all without it.
- For each prompt, find the feature that triggered it and the sentence explaining why. No feature or no reason → fail.
- For each field asking for personal data, name the task that needs it. No task → remove it or make it optional (ACT-6).
- Find "Delete account" from settings without contacting support.
- Marketing or third-party sharing consent is unticked by default (HONEST-1).

**Thresholds.** Permissions requested in context, at first use [platform: Apple HIG, Material 3]; steps to delete the account from settings [profile: honest.delete-steps = 3].

**Bad → Good.** Acme asks for contacts, location and notifications on the first screen → it asks for location only when the courier opens the route, with "Acme uses your location to show the route to the next delivery".

**Limits.** Data the law requires (invoices, age checks) is asked for with that reason stated. Enterprise products may set permissions by organisation policy.

**Conflicts.** C-9.

**Evidence.** Platform guideline and Practice.

## HONEST-4. Judge a screen by what people do, not by how it looks

**Rule.** Make the product look cared-for and consistent, because people judge good-looking interfaces as easier to use. But decide whether a design works by what people manage to do: task success, time, errors, hesitation. Opinions about the look are recorded separately and never decide a verdict. An expert review, including one made with this skill, finds only part of the real problems and reports some that are not; it does not replace watching people use the product.

**Why.** People's ratings of ease of use follow the look more than their actual success, so asking whether they like a design measures the look. That a good look makes people forgive small problems but not large ones is a common practitioner statement, not a measurement. Expert reviews both miss real problems and flag problems people never have.

**How to check.**
- In any test, record per task: done or not, time, errors, places of hesitation, what the person said. The verdict rests on the first four.
- After each task, ask a single ease rating (1–7) and compare it with success: "very easy" on a failed task is a finding.
- Use a standard questionnaire score only to compare versions or products, not to find problems; a loyalty score is not a measure of a screen.
- In a review report, keep "looks nice / looks dated" in a separate "Taste" line (`taste-vs-defect.md`).
- Test with a handful of people per round for qualitative findings and repeat after fixes; use more for numbers.

**Thresholds.** People per qualitative round [profile: honest.test-round = 5].

**Bad → Good.** "Users loved the new Acme dashboard" as the test result → "4 of 5 found today's unpaid orders; 3 hesitated at the date filter; median 48 s; people also said they liked the look".

**Limits.** The look still matters for trust and brand; a sloppy screen is a real problem (LAYOUT and TEXT rules). The rule only says the look cannot hide a broken task.

**Evidence.** Research (look and judged ease of use; limits of expert review) and Practice (round size).
