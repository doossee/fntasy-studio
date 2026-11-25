# Testing with people

Reviews, rules and model judges say whether a screen follows good practice. Only people show whether it works for them. Use this kit when a decision rests on behaviour: which variant people succeed with, whether the least experienced users can finish the task, whether a "taste" choice costs anything.

## What to decide before the first session

1. **The question.** One sentence: "Can owners aged 55+ record a payment without help in variant A and in variant B?" A test without a question produces opinions.
2. **People.** Five per round per group that matters, recruited from the profile's audience (`profile.md`, "people and tasks", "audience experience"). Include the least experienced people the product serves; a round of five confident users hides the problems that matter most (EXP-8). Not colleagues, not the design team.
3. **Tasks.** Two or three real tasks, written as a situation, not as instructions: "You were charged for something you did not buy last night. Find it and tell the bank" — not "Click 'Report a payment'". Do not use the words that appear on the buttons.
4. **What you show.** The running product, a clickable prototype or the HTML variants. With two variants, half the people see A first and half see B first.
5. **Consent and privacy.** Tell people what is recorded and why, get their agreement, let them stop at any time. Keep recordings and notes outside any public repository; do not write names into results.

## The session (about 30 minutes)

1. **Welcome (2 min).** "We are testing the design, not you. Nothing you do can be wrong. Please think aloud: say what you look at, what you expect and what surprises you."
2. **Background (3 min).** Which apps they use every day; how often they do this kind of task. This fills the profile's "audience experience" with facts instead of assumptions.
3. **Tasks (15–20 min).** Read one task, then stay quiet. Do not help, do not point, do not explain. If the person is stuck for two minutes or asks to stop, note it as a failure and move on. After each task ask the single ease question: "How easy or hard was that, from 1 (very hard) to 7 (very easy)?"
4. **After the tasks (5 min).** "What was the most confusing moment?" "Was there anything you were afraid to press?" With two variants: "Which one would you rather use, and why?" — and record the answer separately from the results; preference is not success (HONEST-4).

## What to record per task

| Person | Variant | Task | Done (yes / with help / no) | Time | Errors | Where they hesitated | Ease 1–7 | Quote |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1 (55+, messenger and bank app only) | A | Freeze the card | yes | 0:42 | 1 (tapped the card picture) | looked for the button at the top | 5 | "I thought the picture was a button" |

## Reading the results

- **Success first, then errors and hesitation, then time, then ease.** "Very easy" on a failed task is a finding in itself.
- **A problem seen in two of five people is real** for a qualitative round; one in five is a signal to watch.
- **Turn each problem into a finding** in the format of `method.md`: where, what people did, which rule it touches, severity by `severity.md` (frequency, cost, who). Problems no rule describes go to "where a rule stayed silent".
- **Fix, then test again** with new people. A round of five finds most of the large problems; the next round finds what the fixes changed.
- **Do not count votes for looks.** Report preferences in one line, next to the results, never instead of them.

## Limits

Five people show problems, not percentages: to compare success rates between variants with confidence, test many more people or measure in the live product. Lab tasks are not real life: people try harder when watched, so a task that fails in a test will fail more often outside it.
