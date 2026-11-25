# Evaluating the ui-rules skill

Held-out screens for checking whether a reviewer that uses `skills/ui-rules` finds real defects and avoids false ones. The training examples are in `../skills/ui-rules/examples/`. The held-out screens here are never used to teach or to write rules.

## Files

- **`holdout-2/` — the current held-out set** (made 25.11.2026 by an author who had not read the rules), four screens with 7–8 planted defects each, including one that shows only when a control is used, style-only items and one trap per screen:
  - `clinic-booking`: phone, light, Russian;
  - `warehouse-picking`: tablet, dark, English;
  - `subscription-settings`: desktop, light, German;
  - `school-grades`: desktop and phone, light, Uzbek (Latin).
  Keys in `holdout-2/keys/` (`*.key.md`, `*.boxes.json`, screenshots). First used 25.11.2026 (`results-2026-11-25.md`): 30 of 30 planted defects found in both runs.
- **`holdout/` — the first set, already used** to change the skill (see `results-2026-11-24.md`); keep it for regression checks only.
- **`holdout/*.html`:** four fictional screens with planted defects:
  - `h1-courier-route`: phone, dark, English;
  - `h2-invoices-rtl`: desktop, light, Arabic, right to left;
  - `h3-pricing`: desktop, light, English;
  - `h4-lessons`: phone, light, Russian.
- **`holdout/keys/`:**
  - answer keys (`*.key.md`, same format as the training keys);
  - box images (`*.key.jpg`);
  - selectors (`*.boxes.json`).
- **`render-keys.mjs`:** draws the numbered boxes for both the training and the held-out keys.

**The reviewer must never see `holdout/keys/` or `holdout-2/keys/`.** The screens carry no hints: class names are neutral, and the only comment gives the viewport, theme and language.

## How to run

1. Copy the screens alone to a temporary folder: `cp holdout/*.html "$(mktemp -d)"/`. Do not copy `keys/`.
2. Start a fresh agent with:
   - the `design` plugin installed (the `ui-rules` skill);
   - the temporary folder;
   - nothing else from this repository.

   Ask it to review each screen with a stated viewport, theme and user (take them from the screen's comment, plus one line of context per screen from the "Context" section of its key: who and how often). It writes findings in the skill's format: where, evidence, rule ID, severity, smallest fix.
3. Repeat step 2 with a second fresh agent. The two runs must not see each other.
4. Score each run against the keys by hand or with a helper agent that sees both:
   - **Matched:** same element and the same rule group (the prefix of the rule ID: `ACT`, `COLOR`, `HONEST` and so on). A finding that names the right element under a different group counts as matched only if the key lists that group under "also".
   - **Missed:** a key defect that no finding matches.
   - **False:** a finding that matches no key defect. Check it against the key's "Taste" and "Traps" sections. A finding that hits a trap is a false finding of the worst kind; count it separately. A real defect the key missed is added to the key, and the change is noted.
   - **Severity agreement:** for matched findings, the share with the same score, and the share within ±1.
   - **Run-to-run agreement:** findings that both runs report (same element, same group) divided by findings that either run reports.
5. Record per run: matched / key total, false, traps hit, exact severity share, ±1 severity share. Record run-to-run agreement per screen.
6. Where the two runs disagree, or both hit a trap, read the rule they used. If the rule can be read two ways, rewrite the rule, not the key.

## Results

The first evaluation and what it changed: `results-2026-11-24.md`. After it, this set is no longer held out.

## Limits

- Four screens with 5–8 defects each are a small set. A result is a signal, not a benchmark.
- The defects are planted. Real screens have subtler problems and more of them.
- The keys are one team's judgement. Outcomes for people are predicted (**assumed**), not measured.
- Arabic and Russian strings were written by a model.
- Once the keys have been used to change the skill, the set is no longer held out. Replace it with new screens before the next evaluation.

## Regenerate the box images

```bash
node evals/render-keys.mjs evals/holdout/keys
```

Run it from `plugins/design`. It needs Playwright. It falls back to `/opt/pw-browsers/chromium`, or `DESIGN_CHROMIUM=/path/to/chrome`.
