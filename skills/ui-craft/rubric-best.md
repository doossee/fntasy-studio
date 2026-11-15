# Rubric "level of the best"

The checklist (`checklist.md`) answers whether the screen is made **evenly**. The rubric answers whether it is **strong**: would a lead designer of a strong product team sign it. A screen can pass the checklist at 100 and get 2 of 4 here: then it is tidy and says nothing.

The rubric scores: variants of freedom mode; a screen before it is shown to the product owner; a comparison with other skills or other makers (blind).

## Who scores

**Not the one who made it.** The assessor is a separate agent or person in a fresh context: they see the screenshots, the brief of the screen (who, question, primary action) and this rubric. They do not see the conversation, the code, the author's intent, and do not know whose variant is which. When variants are compared, screenshots are named by letters and the order is shuffled.

There are two or three assessors; the result is the mean. A divergence of more than 1 point on a criterion: the criterion is re-scored against the anchors, not silently averaged. If there was no independent assessor, the first line of the report says: "author's score, no independent one".

## Order: eyes first, numbers second

1. **Two seconds.** Open the 1440 screenshot, close it at once. Write down: what you saw first, what second. It must be the main thing of the screen.
2. **Squint.** `*-squint.png`: how many spots, which is the heaviest, does the grouping read.
3. **Reading.** Answer the screen's question from the screenshot; note how many places you had to look at.
4. **Scores for criteria 1–5** with grounds: what exactly on the screenshot.
5. **Only now** `metrics.json`: stop items (criterion 6) and composition metrics. A number can lower a score ("11 frames") and cannot raise it.
6. **Criterion 7** after comparison with the benchmarks.

## Criteria and anchors

Each is from 0 to 4. Halves are allowed. Grounds without a place on the screenshot do not count.

### 1. Hierarchy

| Score | What is seen |
| --- | --- |
| 0 | Everything has one weight; the eye first catches the shell or a random element |
| 1 | There is a main thing, but it competes with 2–3 elements of the same size or colour |
| 2 | The main thing is found within 2 seconds; the second level is mixed with the third |
| 3 | Three levels read: the main thing, "needs action", reference. One or two small disturbances |
| 4 | On the squint: one leading spot and clear groups; the order of the eye matches the order of importance; nothing unneeded shouts |

Numbers: `heroRatio`, `heroCount`, flag `no-hero`. Rules: COMP-1, COMP-2, COMP-9.

### 2. Composition

| Score | What is seen |
| --- | --- |
| 0 | A stack or grid of equal blocks; emptiness and tightness are accidental |
| 1 | The grid is tidy but indifferent: blocks are equal while importance differs |
| 2 | There is main and secondary by size; many frames; alignment drifts in places |
| 3 | Asymmetry by meaning, shared verticals, the first viewport answers the question; one block sticks out |
| 4 | Every proportion can be explained; separation rests on spacing and lines; the screen reads as one whole, not a set of widgets; there is a move that follows from the business |

Numbers: `sameSizeFrames`, `areaRatio`, `framesFirstViewport`, `nestedFramesMax`, `alignedShare`, `firstViewportFill`. Rules: COMP-3…8, COMP-10.

### 3. Typography

| Score | What is seen |
| --- | --- |
| 0 | Sizes and weights are random; lines stick together or break |
| 1 | The scale is kept, but everything is 14 / 400–500: the text is even and grey |
| 2 | Levels are distinguishable; there are extra sizes or bold without a reason |
| 3 | Three levels in a block through size, weight and colour together; tabular figures; headings answer |
| 4 | Small things in place: letter spacing on large numbers, unit smaller than the number, balanced wraps, not one chain "a · b · c · d", not one orphan word |

Numbers: `fontSizes`, `sizeLevels`, `tabularShare`, `font-scale`. Rules: TYPE-1…6, DATA-2, CRAFT-7.

### 4. Density and readability of data

| Score | What is seen |
| --- | --- |
| 0 | Almost no data in the first viewport, or it is dumped without columns |
| 1 | Numbers are there, but without a label, comparison or alignment; to compare two rows both must be read in full |
| 2 | Columns aligned, numbers right; few records in the first viewport or loose rows |
| 3 | Dense and calm: 8–10+ records, the secondary is muted, the exception state is seen at once |
| 4 | The main number has a unit and a comparison; sorting "what is burning on top"; the sparkline answers a question; empty and many are thought through; nothing is repeated twice |

Numbers: count of records in the first viewport, `tabularShare`. Rules: DATA-1…9, COMP-11.

### 5. Clarity

The score of `ux-clarity/checklist.md`, converted to the scale: < 60 → 0; 60–69 → 1; 70–84 → 2; 85–94 → 3; ≥ 95 → 4. If there is no full audit, score by questions: will a new user name the primary action; will they understand every number without an explanation; is it visible what can be pressed; are there words only a developer knows.

### 6. Measurement violations

From `metrics.json`, the sum of stop violations at 1440, 1280, 1024 (and 390 for an app screen; profile: `widths`): 0 → 4; 1–2 → 3; 3–5 → 2; 6–15 → 1; more than 15 or horizontal scrolling of the page → 0.

### 7. Level of the best products

Question: if this screenshot is put among screenshots of screens of the same kind from strong products, will it give itself away?

| Score | What is seen |
| --- | --- |
| 0 | Looks like a draft or an admin template |
| 1 | A typical set of cards: tidy, faceless; any generated dashboard looks like this |
| 2 | A solid working screen; nothing to remember, almost nothing to fault |
| 3 | A hand is visible: a considered move, consistent details, colour works; it holds up next to the benchmarks |
| 4 | Can be shown as an example; every detail is intentional; one wants to use it |

**Noise is a minus, even in an expressive variant.** Strong means calm and clean (a project may record a different preference in the profile → Taste): expressiveness comes from the size of the leading element, proportions and emptiness, not from the number of devices. A score of 4 on this criterion and on "Hierarchy" is not given to a screen whose first viewport runs more than three kinds of emphasis at once from the list: coloured backing, badge, state icon, coloured text, sparkline, progress bar, bold weight inside a row. Each extra kind takes off half a point.

**Uneven gaps and "ragged" rows** (different gaps between blocks of one level; tops of neighbouring columns not on one line; in one column the text of the rows starts at different places) take half a point each off "Composition": these are what a person accepting the design names first, even on variants they like (COMP-8, COMP-10).

**Overweight and a "bare" canvas.** An empty centre of a row, a right part heavier than the left, data that "does not hold" without a card: each takes half a point off "Composition". A screen that looks better only thanks to many cards does not get above 2 for "Composition".

**Noise** (each takes half a point off "Level of the best products"): an icon before every phone or date; "!" in a term badge; a counter at a heading that repeats the visible list; a shouting banner with an amount; a card for every group.

Signs of a template (each takes off up to half a point): a grid of identical cards; an icon in a coloured circle at every heading; three or four large numbers in a row; a small label line above every block; chains through " · "; a badge on every row; a shadow under every card; a chart for the sake of a chart.

## Benchmarks of level

A measure, not a sample: their looks, colours and names are not carried into the product. Look at how hierarchy, density and details are solved; state **why** it works. Benchmarks are taken from mature products outside the project's own category; products of the project's own category are not named.

| Kind of screen | What to look at | What to pay attention to |
| --- | --- | --- |
| Day overview and summary | The overview page of the Stripe payments dashboard (documentation: docs.stripe.com/dashboard/basics) | One large number with the day's chart beside it; comparison with the previous period; the rest in quiet rows |
| List of work objects | The issue list of Linear (linear.app, the features section; the linear.app/now articles on its redesign) | A dense frameless row; state as icon and word; a muted shell; actions on hover |
| Table with filters | Tables in the Primer guidelines (primer.style, DataTable) and Polaris (IndexTable) | Numbers right; filters as a strip above the table; bulk actions after selection |
| Object card | A project or deployment page in the Vercel dashboard (vercel.com/docs, the Dashboard section) | A header with state and one action; facts as a "label: value" grid; line tabs |

The comparison is three lines in the report: "the benchmark has … / we have …" for hierarchy, density and details. If a benchmark did not open, say so and score criterion 7 by the anchors.

## Result

The sum of seven criteria, maximum 28.

| Sum | Condition | Decision |
| --- | --- | --- |
| ≥ 23 | no criterion below 3, 0 stop items | Level of the best: show |
| 19–22 | none below 2, 0 stop items | A good working screen; name the three fixes with the largest effect |
| < 19, or a criterion below 2, or a stop item | n/a | Do not show as ready; redo the weakest criterion |

A capped score: with any stop item the result is no higher than 18, whatever the other scores.

## Protocol

```
Screen: Today, owner · 1440 en · variant C (author unknown)
2 seconds: first the day's total top left; second the red overdue total.
Squint: one dark spot (the number), three groups; the right column merges into one.
1 Hierarchy     3.5  one main thing; list counters compete with the headings
2 Composition   3    2 : 1, shared verticals; the plan block hangs apart
3 Typography    3    unit smaller than the number; deal rows have a chain of three " · "
4 Data          4    comparison with yesterday, overdue by age, 9 records
5 Clarity       3    ux-clarity 91
6 Measurements  4    0 stop items
7 Level         3    holds up next to the summary benchmark; the move is "who to call first"
Total 23.5. Three fixes: …
Not checked: dark theme, hover.
```
