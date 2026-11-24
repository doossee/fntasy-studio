# How a reviewer thinks

The rules say what to look at. This file says how to get from what you see to a finding you can defend.

## 1. Start from people and a task, not from rules

Write down, before looking at the screen: who uses it (role from the project profile), on what device, and the 2–3 tasks the change touches. Walk each task step by step. Rules come after: they explain what you saw, they do not replace looking.

If the project has a profile (format in `profile.md`; usually `.claude/design-profile.md` or a section of `.claude/review-profile.md`), read the users, tasks, languages, devices, risky actions, the team's own principles and the decisions already taken. Its thresholds replace the defaults in the rules' `profile:` tags. A threshold from the profile is a team choice: crossing it is a reason to look, and becomes a finding only when you can show the harm. A decision recorded there is not a defect: name its cost if it has one and move on. When a team principle and a rule here disagree, say so and do not decide it yourself.

## 2. From fact to conclusion, one rung at a time

Climb the ladder slowly: what is on the screen (fact) → what it means for this person (interpretation) → what they lose (conclusion). A rule is a reason to look, not a finding.

A measurement from `tools/measure.mjs` or any script is a reason to look, not a finding: confirm it on the screen and in the task.

Before writing a finding, try to refute it: another width, the other theme, the hover or focus state, the same action on another screen, a long name, another language. If you cannot confirm it, write "not checked", not a finding.

## 3. Find the cause, not five symptoms

Ask "why" until you reach something a person can change. Five screens with low-contrast grey text are one finding: the "secondary text" token fails contrast. List every place under that one finding. Fixing the cause fixes all of them; fixing symptoms leaves the next screen broken.

## 4. Look one step further

For anything that rewards, nudges, reminds or defaults, ask "and then what?" — after a week, after a month. A random reward feels fun today and teaches the person to treat the product as a lottery; a preselected option saves a click today and takes money tomorrow. This is how HONEST-1 and HONEST-2 are checked.

For risky flows (payments, deletion, sending to others, permissions), run a short pre-mortem: imagine a person lost money or data here next month. What went wrong? Check that path first.

## 5. Watch your own favourite rule

A reviewer with a favourite rule sees its violations everywhere. If most findings come from one rule, look again at the task: are these the things people actually trip on? The same applies to the author's choices: what they emphasise is not automatically what matters.

## 6. Decide conflicts openly

Use `conflicts.md`. WCAG first, then the user's task, then the source order. High-impact choices with no clear winner go to the product owner with the cost of each option.

## 7. Write a finding people can act on

Situation → what is visible → what the person loses:

- **Where:** screen, element, width, theme, language, state.
- **Evidence:** the task step, the number (contrast 3.2:1, target 28 × 28 px, 2.4 s), the screenshot region.
- **Rule:** rule ID, plus the WCAG criterion or platform guideline when the rule's Thresholds line names one. Do not cite authors, years, study names or study figures: they are not needed to act on a finding, and quoted from memory they are often wrong. Evidence for a finding is what you saw and measured.
- **Severity** 1–4 with frequency, cost and who is affected (`severity.md`).
- **The smallest fix** in words.

## 8. Report

1. Verdict: accept / revise / return, with one sentence why.
2. What was looked at: tasks, screens, widths, languages, themes, states; running app or screenshots; profile used; what was not checked.
3. Findings, highest severity first.
4. What the change gains and what it loses.
5. Where a rule did harm or stayed silent (rule ID and what it cost) — this is how the skill improves.
6. What is confirmed good, with evidence.
7. Taste: one line.

Order the fixes by effect and effort: high effect and low effort first.

## Measuring with people

When a decision rests on people's behaviour, test with people. A handful of people per round (the profile's `honest.test-round`, default 5) finds most of the large problems in a qualitative test; use more for numbers. Measure task success, time and errors; ask a single ease rating after each task; use a standard questionnaire score only to compare versions, not to find problems. Do not count opinions about the look as results.
