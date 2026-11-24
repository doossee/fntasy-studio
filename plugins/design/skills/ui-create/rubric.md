# Rubric: is the screen strong?

`ui-rules` answers whether a screen is correct. This rubric answers whether it is strong: would a lead designer of a good product team sign it. A screen can pass every rule and score low here — then it is tidy and says nothing.

## Who judges

Not the one who made it. The judge sees screenshots under neutral names (A, B, C, in shuffled order), a three-line brief (who, the screen's question, the main action) and this rubric — not the conversation, the code, the intent or which variant the author prefers. Two or three judges in separate contexts; report each score and the mean. When judges differ by more than one point on a criterion, re-score that criterion against the anchors instead of averaging silently. A score by the author is labelled "author's score".

## Gate: the floor

Before scoring, check the `ui-rules` floor on the screenshots and measurements, if given: any WCAG A/AA failure on the main path, or any finding of severity 4, caps the total at 10 of 24 and is named first. A beautiful screen people cannot use is not strong.

## Order: look first, then score

1. **Two seconds.** Look at the main screenshot and look away. Write what you saw first and second. It should be the answer to the screen's question.
2. **Squint** (or blur): how many masses, which is heaviest, do groups read.
3. **Answer the question** from the screenshot; count how many places you had to look.
4. Score the six criteria; each score names a place on the screenshot as its ground. A score without a ground does not count.

## Criteria (0–4 each, halves allowed; total 24)

### 1. Hierarchy
- 0 — everything weighs the same; the eye lands on the chrome or a random element.
- 2 — the main thing is found within two seconds; second and third levels blur together.
- 4 — one leading mass on the squint, clear groups, the eye's order matches importance, nothing unneeded shouts.

### 2. Composition
- 0 — a stack or grid of equal blocks; empty and crowded areas by accident.
- 2 — main and secondary differ in size; many frames; edges drift.
- 4 — every proportion has a reason; separation by space and few lines; the first screen answers; the screen reads as one whole with a move that comes from this product.

### 3. Typography
- 0 — random sizes and weights; lines collide or break badly.
- 2 — levels distinguishable; extra sizes or bold without reason.
- 4 — three clear levels per block through size, weight and colour together; tabular figures where numbers compare; careful large numbers, units and wraps.

### 4. Data and content
- 0 — almost nothing useful in the first screen, or data dumped without labels.
- 2 — aligned and labelled, but loose or without comparison.
- 4 — dense where the task is dense and calm; the main number has unit and comparison; exceptions stand out; empty, one and many are designed; real-looking content.

### 5. Character
- 0 — template look (`references/generic-look.md`): could be any product.
- 2 — tidy and consistent, but generic; the brand appears only as a logo and an accent.
- 4 — recognisably this product: the screen's move, the brand used with restraint and purpose, a consistent voice in text and imagery — without decoration that has no job.

### 6. Craft
- 0 — inconsistent spacing, radii, icons; missing states.
- 2 — consistent system with visible slips (off-scale gaps, mixed icon weights, misaligned edges).
- 4 — one system everywhere; optical alignment; states drawn for every control; nothing to fix at 200% zoom on the screenshot.

## What the judge returns

Per screen: the two-second note; a table "criterion, score, ground"; the floor check; the total; the weakest place and what would raise it by one point. For several variants: a ranking with one sentence per place, and what to take from the lower-ranked ones. End with what could not be judged from the material.

## Limits

Scores of "strength" are judgements, not measurements. Pairwise blind comparison (which of A and B is stronger, and why) is more reliable than absolute scores; use it when the decision matters, and test with people when the decision rests on behaviour.
