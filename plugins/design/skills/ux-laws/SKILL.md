---
name: ux-laws
description: "30 rules for interfaces built on the principles collected on Laws of UX (lawsofux.com): perception and grouping (Prägnanz, proximity, similarity, common region, connectedness), attention and memory (cognitive load, working memory, Miller, chunking, selective attention, Von Restorff, serial position, Zeigarnik, peak-end), action and decision (Fitts, Doherty, Hick, choice overload, Pareto, goal-gradient, flow, Parkinson), expectations (Jakob, mental model, active user, Tesler, Postel, Occam, aesthetic-usability, cognitive bias). Each rule says what to check on a screen and how. Use when designing, building or reviewing a screen or a flow, when someone asks why a screen is hard to use, or names one of these laws."
---
# ux-laws

Thirty rules, one for each principle on Laws of UX. Each rule is written for screens: what to do, why, **how to check it** (a number or a yes/no on a screenshot or a walk through the task), bad → good, where the rule stops applying, and its sources. The wording is ours; the site is credited, not copied, and there are no links: everything a rule needs is in these files (see `references/sources.md`).

## How to use

- **Designing or building a screen:** read the group that fits the work. Grouping and layout: `perception.md`. Forms, lists, messages, multi-step tasks: `attention-memory.md` and `action-decision.md`. Navigation, labels, input formats, choices with money or consent: `expectations.md`.
- **Reviewing a screen:** walk the user's main task first, then go through all 30 rules. For each rule write: pass, fail (with the place on the screen and the number or step that shows it), or not applicable. A fail needs evidence; "feels cluttered" is not a finding.
- **A rule is a tool, not a law.** The question is always whether the screen got worse for a person doing their task. When following a rule would hurt the task, say so and do not follow it. When the rules conflict (for example LAW-OCCAM and LAW-WORKING-MEMORY: removing information vs keeping it in view), the user's task decides.
- **Thresholds.** Numbers marked "(ours)" are not from the sources; they make a rule checkable, and a project may change them. The list is at the end of `references/sources.md`.
- **Evidence.** Every rule says how strong its ground is, so a reviewer knows how hard to push it:
  - *Research* — the principle comes from repeated experiments, and the screen rule follows from it closely;
  - *Research, extended* or *limited* — the experiments were about something else (lists, learning) or hold only in some conditions; the screen rule is an inference;
  - *Disputed* — the classic effect did not replicate reliably; the rule rests on what did;
  - *Heuristic* — a rule of thumb from practitioners, not a study;
  - *Analogy* — an idea from another field (economics, philosophy, network protocols), used as a design principle.
  
  A finding based on a *Disputed*, *Heuristic* or *Analogy* rule needs the harm shown on the screen itself; the law's name alone is not an argument.
- **Accessibility** is checked against WCAG 2.2 where a rule touches it (colour, target size); this skill does not replace an accessibility review.

## Rules

**Perception** — `references/perception.md`

| Rule | In one line |
| --- | --- |
| LAW-PRAGNANZ | Make the screen readable as a few simple shapes |
| LAW-PROXIMITY | Distance shows what belongs together |
| LAW-SIMILARITY | Things that look alike are taken to work alike |
| LAW-COMMON-REGION | A shared background or border makes a group |
| LAW-CONNECTEDNESS | A line or a link between items is the strongest tie |

**Attention and memory** — `references/attention-memory.md`

| Rule | In one line |
| --- | --- |
| LAW-COGNITIVE-LOAD | Spend the user's thinking only on their task |
| LAW-WORKING-MEMORY | Do not make people carry facts between screens |
| LAW-MILLER | Keep what must be held in mind small; do not use "seven" as a menu limit |
| LAW-CHUNKING | Split long content into small, named pieces |
| LAW-SELECTIVE-ATTENTION | Put what matters where the user is already looking |
| LAW-VON-RESTORFF | Make one thing stand out, and only one |
| LAW-SERIAL-POSITION | Put the most important items first and last |
| LAW-ZEIGARNIK | Show what is unfinished and let people return to it |
| LAW-PEAK-END | Design the worst moment and the last moment of a task |

**Action and decision** — `references/action-decision.md`

| Rule | In one line |
| --- | --- |
| LAW-FITTS | Frequent targets are big and close; dangerous ones are not |
| LAW-DOHERTY | Answer within 400 ms; show progress when you cannot |
| LAW-HICK | Fewer options at each decision point |
| LAW-CHOICE-OVERLOAD | Help people choose among many similar options |
| LAW-PARETO | Give the best place to the few things used most |
| LAW-GOAL-GRADIENT | Show progress, and show it from the start |
| LAW-FLOW | Do not interrupt a task in progress |
| LAW-PARKINSON | Keep tasks short and say how long they take |

**Expectations** — `references/expectations.md`

| Rule | In one line |
| --- | --- |
| LAW-JAKOB | Work the way the products people already use work |
| LAW-MENTAL-MODEL | Match how users think the thing works |
| LAW-ACTIVE-USER | Teach in place; people will not read the manual first |
| LAW-TESLER | Let the product carry the complexity, not the user |
| LAW-POSTEL | Accept what people type; give back a clean, consistent format |
| LAW-OCCAM | Every element must do a job; remove the rest |
| LAW-AESTHETIC-USABILITY | Good looks hide problems; test what people do, not what they say |
| LAW-COGNITIVE-BIAS | Do not exploit biases; guard against them |

## Report format for a review

1. The task(s) walked and on which widths and devices.
2. Fails, worst first: rule ID, where (screen, element, width), evidence, what the user loses, the smallest fix.
3. Passes worth noting, with evidence.
4. Not checked and why.
