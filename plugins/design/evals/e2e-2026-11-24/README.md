# End-to-end check, 24.11.2026

One brief, two makers, blind judges and the reviewer. Everything ran through the plugin as installed (`claude -p --plugin-dir plugins/design`), with the same model.

**Brief.** Order tracking page of the fictional Acme Shop (grocery delivery): a customer opens it from an SMS link, mostly on a phone; needs to learn when the order arrives and answer an item substitution; can contact the courier, change the delivery note, cancel while free. Brand fixed: the name and a deep green.

**Makers.**
- `designer` agent of this plugin: three variants (quiet; action first; brand-led route), self-checked, and its recommendation (the brand-led one). About $2.20.
- The same model without the plugin, asked to "design the screen as well as you can": one file. About $0.50.

**Blind judgement.** Screenshots of all four at 390 and 1280 px, light and dark, under shuffled letters, with a three-line brief. Two `design-judge` runs in separate contexts, rubric of `ui-create` (out of 24):

| Screen | Judge 1 | Judge 2 | Mean |
| --- | --- | --- | --- |
| designer, brand-led (recommended) | 20 | 19.5 | 19.75 |
| designer, quiet | 19 | 19 | 19 |
| designer, action first | 18.5 | 17.5 | 18 |
| without the plugin | 15.5 | 16 | 15.75 |

Both judges ranked the four in the same order. Both put the page made without the plugin last for its template look (stacked shadowed cards, emoji item icons, pills) — and both said it had the best decision data: the price difference of the substitute and the new total if it is removed.

**Review.** `design-reviewer` on the recommended variant and on the page made without the plugin:

| | Verdict | Severity 3 | Severity 2 | Severity 1 |
| --- | --- | --- | --- | --- |
| designer, recommended | revise | 2 | 2 | 1 |
| without the plugin | revise | 2 | 2 | 4 |

The designer's two severity-3 findings were about the page's logic after actions: three different statements of whether the courier already has the bag (which decides whether cancelling is free), and totals that still counted an item after "Leave it out". Its self-check had measured and looked, but not pressed every control.

**What changed after this check.**
- `ui-create` step 7 and the `designer` agent now press every control and check that totals, counts, states and deadlines tell one story after each action, and that every resulting state is designed.
- `ui-create` `craft.md`: "show the consequence before the choice" and "one story everywhere".

**Limits.** One brief and one model; the judges use the rubric that the designer worked towards, so the scores favour work made with it — read them as a sign that the process is followed, not as proof of better design. The question "which do people prefer and succeed with" needs a test with people. Screenshots: `designer-390.jpg` and `no-plugin-390.jpg`.
