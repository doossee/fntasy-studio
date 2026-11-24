---
name: ui-create
description: "How to design interface screens that are strong, not just correct: a process from brief to intent, a visual system (type, colour, spacing, depth) from the brand profile, two or three variants on named axes, a craft pass, a self-check against ui-rules and a blind judgement. Includes a craft guide (typography, colour, composition, density, data, details, motion, imagery, voice), a list of generic 'template look' signs to avoid, and a rubric for judging strength. Use this skill whenever someone asks to design, redesign, mock up, prototype or make prettier a screen, page, dashboard, landing page, app flow or component, asks for design variants or a bolder/stronger version, or wants a screen to feel less generic — even if they do not say 'design'."
---
# ui-create

`ui-rules` says what must not go wrong. This skill is about the other half: making a screen that people understand at once and that has a character of its own. Correct is the floor here, not the goal.

## The process

Work in this order. Each step leaves something written, so the next step and the person who accepts the design can see why.

1. **Read the brief and the profile.** Who uses the screen, for which task, how often, on what device, in which languages; the brand (fixed: logo, hues, typefaces; free: everything else); decisions already taken. The profile format is the one in `ui-rules/profile.md`. No profile: write your assumptions down and mark them **assumed**.
2. **Write the intent** (`intent.md` or the top of your answer), five lines:
   - the screen's question — what the person comes to learn or do;
   - the content in three levels — what must be seen, what must be findable, what can be one step away;
   - the leading element — the one thing seen first;
   - the reading path — the order the eye should travel;
   - the screen's move — one decision that comes from this product and this task, not from a template (a number set large because the whole job is that number; a timeline instead of a table because order matters more than amounts).
3. **Set or adopt the visual system** (`references/system.md`): type scale, spacing scale, colour roles in every theme, radius, depth strategy, icon set, motion character. From the profile when it has them; otherwise derive a small system and write it down as tokens before drawing anything.
4. **Make two or three variants**, each on one named axis (`references/variants.md`): for example density, what leads, layout model, tone. One variant may be deliberately quiet. Variants must differ in a way a person sees in two seconds, not in a shade.
5. **Build them** where the project builds prototypes — a self-contained HTML file is the default. Use real-looking and worst-case data: long names, large numbers, empty and error states, the longest language.
6. **Craft pass** on each variant (`references/craft.md`): typography, colour, composition, data, details. Then check against `references/generic-look.md` and remove every template sign you find.
7. **Self-check against the floor.** Run `ui-rules`: its review questions and, for a built page, `ui-rules/tools/measure.mjs` at the profile's widths and themes. Then use it: press every control and check that the screen tells one consistent story afterwards — totals, counts, states and deadlines agree everywhere on the page, and every state an action leads to (cancelled, answered, failed) is designed. Fix every WCAG A/AA failure and every finding of severity 3–4 before anyone sees the design. Beauty never excuses a failed task or unreadable text.
8. **Blind judgement.** Have someone who did not build the variants score them with `rubric.md` without knowing which is which (the `design-judge` agent does this). Your own score is labelled "author's score".
9. **Hand over**: screenshots at every width and theme, the intent, the system, a table of variants (axis, what it gains, what it costs, rubric score), what moved compared to the current screen, and your recommendation. The person who owns the product chooses.

When asked for a single screen, still write the intent and the system, and say that variants were not made.

## Files

| File | What it is | When to read |
| --- | --- | --- |
| `references/system.md` | Building a small visual system: type, spacing, colour roles, depth, radius, icons, motion | Step 3 |
| `references/variants.md` | Axes for variants, how to make them really different, the hand-over table | Step 4 |
| `references/craft.md` | The craft pass: what separates a strong screen from a tidy one | Step 6 |
| `references/generic-look.md` | Signs of the template look, and what to do instead | Step 6 |
| `references/systems-learned.md` | What strong public design systems do, in our words | When choosing a direction |
| `rubric.md` | How to judge strength, with anchors; used blind | Step 8 |
| `examples/` | A screen before and after the craft pass, with the list of changes | Before the first design |

## Limits

- Accessibility and the `ui-rules` floor are not negotiable; the brand's fixed parts are not yours to change.
- Learn from other products' principles; never copy their look, brand, illustrations or screens.
- Taste claims in this skill are practice, not measured truth. When two directions are both defensible, show both and let the owner choose.
