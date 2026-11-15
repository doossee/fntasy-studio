---
name: design-variants
description: "Freedom mode of ui-craft as one command: 2-3 genuinely different solutions of one screen, each with a named axis, measured and scored blind. Use when the user asks for variants, a redesign, 'stronger' or 'bolder' for a screen."
argument-hint: "<screen: route, file or description> [2|3]"
disable-model-invocation: true
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Edit Glob Grep
---
# /design-variants

Make design variants of: **$ARGUMENTS**

1. Load the `ui-craft` skill and read `references/16-freedom.md`, `references/12-composition.md` and `rubric-best.md`. Read the project profile; `Brand` and `Decisions` are fixed, `Taste` steers the choice of axes.
2. Fix what does not change (FREE-1): the app shell and paths, brand and tokens, the set of capabilities, the clarity of the scenario, the stop items.
3. Write the intent (FREE-2): the screen's question, the content with levels 1-3, the leading element, the reading path, the screen's move.
4. Choose the axes (FREE-3). The default count is 3; one variant is deliberately quiet. Each variant gets one named axis. If you use subagents, give each its own axis and do not show it the other variants.
5. Build each variant where the project builds prototypes (a route parameter, a separate HTML file, a branch): with real and worst-case data, at every width of the profile.
6. Measure each variant with the `ui-craft` script (`scripts/measure.mjs` in the `ui-craft` skill folder) with `--strict`. All stop items are zero. Check that the variants really differ by the test of FREE-4 (`references/16-freedom.md`): at least two of its five lines. Three of those lines (records in the first viewport, column proportion, the leading element) are read from the screenshots, not from `metrics.json`.
7. Blind score. Prepare the material so that nothing names a variant: copy the variant files to neutral names in a shuffled order (`variant-a.html`, `variant-b.html`, …), measure those copies into one fresh folder (`--name a,b,c --out <folder>`), and write the brief of the screen (who, the screen's question, the primary action; no intent, no axes). Give the `design-judge` agent that folder, the brief, the path to the `ui-craft` skill folder and, if you have them, the `ux-clarity` scores per letter. Do not tell it which variant you prefer. The rubric asks for two or three judges: run the agent two or three times in separate contexts and report the mean; with one run, say "one judge" in the report.
8. Hand over (FREE-5): screenshots, the choice table, "where it is now" for every element that moved, composition figures, the rubric scores from the judge, your recommendation and what you would combine.

Do not merge a variant into the product until the person who accepts the design has chosen.
