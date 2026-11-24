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

**Why.** These tricks work because of predictable shortcuts in judgement: people keep defaults, anchor on the first price, and hurry under time pressure (Tversky & Kahneman 1974 and later work). They raise short-term numbers and destroy trust: costs revealed late are the most common design-related reason for abandoning checkout in Baymard's surveys of US shoppers (about 40% of those who abandoned). A 2019 Princeton/Chicago crawl found deceptive patterns on more than 10% of about 11,000 shopping sites; a 2019 Zurich study found them in 95% of 240 popular free Android apps. Many of these patterns are illegal under consumer and data protection laws.

**How to check.** Walk the purchase or sign-up as a cautious user and answer NN/g's deceptive-pattern questions, the core of which are:
- Does the person end up paying or sharing more than they chose to? Compare the first price seen with the final total.
- Is anything paid or data-sharing pre-ticked? (Must be no.)
- Is the decline worded neutrally ("Skip", "No thanks") and shown with the same size and contrast as accept? No shame or guilt wording.
- Is any option hidden, greyed out or harder to reach than the one the business prefers?
- Is any timer, stock count or "people viewing" figure tied to real data? Ask for the data source; if none, it fails.
- Does the person get time to decide, or is the decision rushed?
- Is a plan on the pricing page there only to make the neighbour look cheap (a decoy: worse value than the next plan for almost the same price)?
- Count the steps to cancel and compare them with the steps to subscribe; cancel must not need more steps or another channel (ours: same channel, no more steps).
Check with the most vulnerable persona in mind: a person in a hurry, on a phone, reading in a second language.

**Bad → Good.** At the last step of Acme Shop checkout a "service fee 1.50" appears and "Gift wrap + 2.00" is ticked; the decline link says "No, I don't care about my gift" → the total with all fees is shown in the cart, gift wrap is unticked, and the options read "Add gift wrap, 2.00" and "Skip".

**Limits.** Honest persuasion is fine: a real stock count, a real deadline, a genuinely popular plan marked as such, a sensible default that serves the person (the most common delivery option preselected) and is easy to change.

**Conflicts.** With ACT-3 (recommend one option): a recommendation must be the best fit for the person, not the most profitable plan dressed up as the best; see conflicts.md.

**Evidence.** Research (deceptive-pattern prevalence studies, abandonment surveys) for the harm; Heuristic for the walkthrough questions; the cancel-parity threshold is ours.

**Sources.** NN/g (Deceptive patterns, 2023: walkthrough questions; Princeton/Chicago 2019 and Zurich 2019 studies); Baymard (checkout abandonment reasons; deceptive patterns in e-commerce: costs up front, unselected add-ons, opt-in consent, real timers); Tversky & Kahneman 1974; Laws of UX (Cognitive Bias); Figma Resource Library (Design ethics); secondary: pricing-page and call-to-action articles (Figma) as examples of what not to do (urgency, decoy). (former LAW-COGNITIVE-BIAS)

## HONEST-2. Engage people without manipulating them

**Rule.** Rewards, streaks, badges, reminders and progress serve the person's own goal. Do not use random rewards to keep people pulling, artificial waiting times that make people return on the product's schedule, rewards for advertising the product to friends, or guilt over a broken streak. Before adding any engagement mechanic, ask what it teaches the person after a month, not only what it does to today's numbers.

**Why.** Random (variable) rewards and artificial waits are the mechanics of slot machines and free-to-play games; they raise return visits by building a habit, not by helping. In a product about money, health or learning they also teach the wrong lesson: a random gift of a share teaches that investing is a lottery. Paying people in points to share turns them into unpaid advertisers and floods their friends. These are short-term gains that cost trust (second-order thinking: "and then what?").

**How to check.**
- List every reward, streak, badge, timer and reminder on the screen. For each, write the person's goal it serves. None → it is a retention device; flag it.
- Is any reward random in size or in whether it comes at all? Flag random rewards tied to money, health, or learning.
- Is any feature locked behind a wait ("next quiz in 15 h") that has no reason other than bringing the person back? Flag.
- Does sharing earn the person anything? Flag paid sharing.
- Does breaking a streak cost the person something they earned, or show guilt wording? Flag.
- Apply the "a month later" test: write one sentence on what the person has learned or gained after a month of the mechanic.

**Bad → Good.** Acme's "Learn to sell" lessons give a random bonus after each lesson, lock the next quiz for 15 hours and give "+50 coins" for sharing → lessons show real progress ("3 of 8 lessons, next: pricing"), the next lesson is open as soon as the person wants it, and sharing is a plain "Share" with no reward.

**Limits.** Progress, achievements tied to real skill, and reminders the person set up themselves are fine. Games are games; this rule is for products whose purpose is not play.

**Conflicts.** With ACT-5 (show progress): progress is honest feedback on the person's goal; a streak that punishes a missed day is not progress.

**Evidence.** Heuristic, supported by research on variable-ratio reinforcement and deceptive patterns; the "a month later" test is ours.

**Sources.** NN/g (Deceptive patterns, 2023); untools (Second-order thinking); Figma Resource Library (Design ethics); secondary: "58 rules" (Bakusevych) recommends gamification and variable rewards — this skill rejects that part (see disputed.md).

## HONEST-3. Ask for data and permissions only when needed, and say why

**Rule.** Ask for each permission (location, camera, contacts, notifications) at the moment the person uses the feature that needs it, with one sentence on why, not at first launch. Collect only the personal data the task needs. Say before use what is collected and how it is used; sharing data with third parties for advertising needs explicit opt-in. Give a visible way to delete the account and its data.

**Why.** A permission asked at launch, without context, is refused more often and teaches people to tap "Allow" or "Deny" without reading. Data the product does not need is a risk to the person and a liability for the business. Apple asks apps to request permissions only when the app cannot work without the data, and at first use of the feature otherwise.

**How to check.**
- Install fresh and count the permission prompts before the person does anything: zero, unless the app cannot work at all without it.
- For each prompt, find the feature that triggered it and the sentence explaining why. No feature or no reason → fail.
- For each form field asking for personal data, name the task that needs it. No task → remove or make optional (see ACT-6).
- Find "delete account" from settings in a few steps (ours: no more than three) without contacting support.
- Marketing or third-party sharing consent is unticked by default (HONEST-1).

**Bad → Good.** Acme asks for contacts, location and notifications on the first screen → it asks for location only when the courier opens the route, with "Acme uses your location to show the route to the next delivery".

**Limits.** Data the law requires (invoices, age checks) is asked for with that reason stated. Enterprise products may set permissions by organisation policy.

**Evidence.** Platform guideline (Apple HIG Onboarding, Privacy); Heuristic for the rest; the three-step threshold is ours.

**Sources.** Apple HIG (Onboarding: permissions at first use; Accessibility); Figma Resource Library (Design ethics: disclose before use, delete my data, no third-party sharing without opt-in); Baymard (opt-in marketing consent); secondary: NHS and U.S. Web Design System principles (earn trust).

## HONEST-4. Judge a screen by what people do, not by how it looks

**Rule.** Make the product look cared-for and consistent, because people judge good-looking interfaces as easier to use. But decide whether a design works by what people manage to do: task success, time, errors, hesitation. Opinions about the look are recorded separately and never decide a verdict. An expert review, including this skill, finds only part of the real problems; it does not replace watching people use the product.

**Why.** In Kurosu & Kashimura's study (CHI '95, 26 ATM layouts) people's ratings of ease of use followed the look more than the measured usability; Tractinsky (1997) repeated the result. NN/g adds that attractive design is forgiven minor problems but not major ones (their statement, not a measurement). So asking people whether they like a design measures the look. Expert reviews also miss problems and report false ones: one comparison cited by IxDF found that many problems flagged by heuristic evaluation were not real problems and that evaluators found only a fraction of the real ones (Bailey, Allan & Raiello).

**How to check.**
- In any test, record per task: done or not, time, errors, places of hesitation, what the person said. The verdict rests on the first four.
- After each task, ask the Single Ease Question (one 1-7 rating) and compare it with success: "very easy" on a failed task is a finding.
- Use SUS only to compare versions or products, not to find problems; NPS is not a measure of a screen.
- In a review report, keep "looks nice / looks dated" in a separate "Taste" line (see taste-vs-defect.md).
- Test with about five people per round for qualitative findings and repeat after fixes (NN/g heuristic); use more for numbers.

**Bad → Good.** "Users loved the new Acme dashboard" as the test result → "4 of 5 found today's unpaid orders; 3 hesitated at the date filter; median 48 s; people also said they liked the look".

**Limits.** Look still matters for trust and brand; a sloppy screen is a real problem (see LAYOUT and TEXT rules). The rule only says the look cannot hide a broken task.

**Evidence.** Research (Kurosu & Kashimura 1995; Tractinsky 1997) for the bias in opinions; Heuristic (NN/g) for "forgives minor problems" and for five users per round.

**Sources.** NN/g (Aesthetic-usability effect, 2024; How many test users, 2012); Laws of UX (Aesthetic-Usability Effect); IxDF (pointer to Bailey, Allan & Raiello on heuristic evaluation vs testing; Sonderegger & Sauer 2010); Kurosu & Kashimura 1995; Tractinsky 1997; secondary: uxhints (SUS, Brooke 1986; SEQ; NPS; Google HEART). (former LAW-AESTHETIC-USABILITY)
