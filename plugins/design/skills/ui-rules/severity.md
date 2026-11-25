# Severity

One scale for every finding. Severity is set by what the person loses, how often, and how bad the loss is — not by how unattractive something looks.

| Score | Meaning | Typical examples |
| --- | --- | --- |
| 4 | The task cannot be finished; money, data or consent is lost or taken without the person noticing; a group of people is excluded (a WCAG A or AA failure on a main path) | "Pay" unreachable with a keyboard; amount cut off at 390 px; a paid option preselected at checkout; text at 2.8:1 on the main screen |
| 3 | The task can be finished, but many people make mistakes, get stuck or need help | The main action cannot be found without a hint; an error message that does not say what is wrong; navigation hidden on desktop |
| 2 | Slows a frequent task or confuses people who then recover alone | Two extra taps on an action done 50 times a day; inconsistent labels for the same action |
| 1 | Polish: noticed by an attentive person, no effect on the task | An icon 2 px off; uneven spacing in a footer |

Taste is not a finding: no score, one line at the end of the report (see `taste-vs-defect.md`).

## Calibration: the same defect in different places

Severity moves with three factors. Write them down for every finding of score 3 or 4.

1. **Frequency** — how often the main user meets it (once ever, weekly, many times a day).
2. **Cost of the error** — nothing, time, money, data, safety, exclusion; for engagement mechanics also what the person earned, their own goal, and consent.
3. **Who is affected** — everyone, a group (keyboard users, people with low vision, a language), one role.

| Defect | Where | Score | Why |
| --- | --- | --- | --- |
| 32 × 32 px icon button with no spacing | "Edit profile photo" in settings | 1 | Rare, harmless, recoverable |
| The same button | "Mark delivered" used by a courier 60 times a day, on the move | 3 | Frequent task, done one-handed; misses cost time all day |
| The same button, next to "Cancel order" | Courier screen | 4 | A miss cancels a paid order |
| Generic "Invalid value" | Optional "Company name" field | 2 | Rare field, the person can skip it |
| The same message | Card number at checkout | 3 | People retry or leave; money at stake |
| Text contrast 4.1:1 | Footer legal text | 2 | AA failure on a secondary area; still a failure to fix |
| Text contrast 4.1:1 | Order total on the payment screen | 4 | AA failure on the main path, on the number people must check |
| Animation 600 ms on opening a menu | Settings menu opened once a week | 1 | Rare |
| The same animation | Order list opened 100 times a day | 2 | Waiting on every opening of a frequent screen |
| Preselected add-on | Free newsletter checkbox | 3 | Consent taken without a clear choice |
| Preselected add-on | Paid insurance at checkout | 4 | Money taken without a clear choice |
| Streak that "burns" earned progress after a missed day | Learning app the person opens a few minutes a day | 3 | Takes what the person earned and pushes them on the product's schedule |
| Lock on the next lesson for 15 hours with no reason | The same app | 3 | Blocks the person's own goal |
| Random coin reward, coins for reposting | The same app, coins with no use | 2 | Teaches the wrong habit; no money or data lost |
| The same random reward | An investing app, the reward is a share | 3 | Teaches that investing is a lottery; money involved |

## Rules for scoring

- A WCAG A or AA failure on a main path is at least 3; it is 4 when it blocks the task or hides a number people must check.
- A finding that rests only on a rule whose Evidence is *Contested* or *Practice*, or only on a `profile:` threshold, can be scored above 2 only if the harm is shown on the screen (a failed step, a wrong number, a measured contrast).
- A *Standard* threshold (WCAG A or AA) is a requirement whatever the profile says; AAA criteria are targets unless the profile adopts them.
- A defect in a shared component or a design token is scored by its worst place, and the report says it affects every screen that uses it.
- Several findings with one cause are one finding with a list of places (see `method.md`).
