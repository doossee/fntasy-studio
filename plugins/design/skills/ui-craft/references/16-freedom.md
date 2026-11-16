# 16. Freedom mode (FREE)

The usual mode of the skill is **refinement**: the screen stays the same, the numbers change. Freedom mode is a **new solution of the screen**: the maker does not patch the current layout but proposes 2–3 different ones and builds the best.

It is switched on by the words of the product owner or of the task: "make it stronger", "I expected more", "redesign", "propose variants", "take freedom". Without these words refinement applies.

Examples use the fictional product Acme Orders; replace them with the project's own (profile → Domain examples).

## FREE-1. What is free and what is fixed

| Free | Fixed |
| --- | --- |
| Layout of the main area: grid, columns, order, proportions | The shell: side menu, top bar, bottom bar, page addresses, section names |
| Composition of blocks: merge, remove, add from data the API already returns | The brand: colour tokens, fonts, radii, shadows (the project profile → Brand) |
| Form of presentation: cards → table, tiles → list, number → totals line, a new sparkline | Clarity: the `ux-clarity` score no lower than before; one primary action; touch targets |
| Density and size: row heights, main number 36–48 (profile: `hero-fonts`) | All measurement stop items: 0 at every width and in every language in the profile |
| A new variant of a component in the project's component library (profile → Components), if it is shared (list row, totals strip, sparkline) | Decisions recorded in the profile → Decisions and pinned by tests: what there is one of on a screen, what is absent |
| Texts of block headings (answer heading) in every language in the profile | Scenarios and paths of live customers: where a button leads, where an action lives |

The "lose nothing" rule: everything removed from the screen is available elsewhere, and that place is named in the "Where now" table. What is fixed changes only on the product owner's word: the maker may **propose** it as a separate line, but does not do it.

Freedom without this table turns into a repaint: another background, other radii, other buttons, and the screen gets no stronger. Freedom is spent on layout and data.

## FREE-2. Intent before code

Five lines in the report before the first line of markup:

1. **The screen's question** (COMP-1): who, what question, what they do after.
2. **The list** with levels 1–3; what leaves the screen and where it goes.
3. **The leading element** (COMP-2) in one phrase.
4. **The reading path**: "first…, then…, then…", three steps.
5. **The move of the screen**: one thing that a typical screen of this kind does not have and that follows from the business: "overdue invoices in the order of 'who to call first'", "deliveries as a strip of the month", "the day's money against the week". If the move is only colour or only "tidier cards", there is no move.

Each variant comes with a character scheme at 1440: columns with widths, what is in the first viewport, where the leading element is. An example of the form (a warehouse zone card, a screen the example product does not have; the skill deliberately gives no ready schemes for real screens):

```
┌ Warehouse / Zone B ───────────────────────────────── [Edit] [⋯] ┐
│ Zone B · 54 pallet places     31 of 54 in use ▬▬▬▬▬──  57 %     │
├──────────────────── 808 ─────────────────────┬────── 400 ───────┤
│ Week: grid by days and docks                 │ Now: receiving   │
│ (leading element: where it is free)          │ Free slots · 6   │
└──────────────────────────────────────────────┴──────────────────┘
```

Intent check: "would I get the same scheme for any summary screen of any product?" If yes, redo the part that matched.

## FREE-3. Variants differ by an axis, not by finish

There are 2–3 variants. Each has a name and an **axis** on which it differs from the others. Axes come from the list:

| Axis | Poles |
| --- | --- |
| What leads | total number ↔ work queue ↔ feed of the day's events |
| Form | control-desk table ↔ queue lists ↔ summary with details on press |
| Density | everything in the first viewport ↔ the main thing large, the rest below |
| Order | money → customers → orders ↔ "what is burning" → the rest |
| Place of details | on the page ↔ in a side panel ↔ in a tab |

Two variants that differ only in colour, radius, the order of two cards or a label count as one. All variants use the project's tokens and components, the same data, and each "could ship tomorrow": divergence does not lower the bar of craft; stop items are 0 for each.

One of the variants is made **deliberately quiet**: what remains if half is removed. It often wins.

If subagents make the variants, each gets its own axis and a ban on looking at the others' variants; one maker in a row produces three similar ones.

## FREE-4. Checking the difference with numbers

Variants are captured and measured (`11-measure.md`). The comparison table holds the composition metrics of each. Variants count as different if they diverge in at least two lines:

- `heroSize`: by a step or more;
- `topLevelFrames`: by 2 or more;
- number of records in the first viewport: by 1.5 times;
- column widths: a different proportion;
- the leading element: a different one.

## FREE-5. Handover: a choice table and a recommendation

The product owner is shown:

1. Screenshots of the variants at 1440 (one at a time, full size), then 1280, 1024, 390 (profile: `widths`); in every language in the profile.
2. A table:

   | Variant | Axis | When it is the right choice | What we pay |
   | --- | --- | --- | --- |
   | A "Money of the day" | a number leads | the owner looks at revenue first | orders and deals are in the background |
   | B "Work queue" | the "what is burning" list leads | the owner opens the screen to act | the day's total is smaller |

3. A "Where now" table for everything removed.
4. Rubric scores (`../rubric-best.md`) and `ux-clarity` scores for each variant from an independent reviewer.
5. A **recommendation**: which variant and why, in one phrase. An opinion, not a menu; the choice still belongs to the product owner.

After the choice, the losing variant and the switch are removed from the code in the same task.

## FREE-6. The owner's words → what changes

So that "make it stronger" gives a predictable result:

| Word | Changes | Does not change |
| --- | --- | --- |
| **Bolder** | The leading element one step larger (36 → 40 → 48); stronger column asymmetry; one frame out of every three removed; the move of the screen more noticeable | Colours, fonts, the number of coloured elements |
| **Quieter** | Minus badges and icons; coloured text → ink; backings → lines; the main number one step smaller | Composition and order |
| **Denser** | Rows 48 → 40; the second line of a cell moved to a tooltip; panel padding 24 → 16; more records in the first viewport | Text size no less than 12 (profile: `min-font`); touch targets 44 (profile: `touch-target`) |
| **Roomier** | Spacing between blocks one step larger; fewer records in a block, "All N" | Density of list tables |
| **Simpler** | Minus level 3 blocks; one action per block; details on press | The primary action and levels 1–2 |
| **More colour** | Colour gets one more job of the five (COLOR-1): selection, data series, the move | The neutral base; the dose of COLOR-2 |

One word, one row of the table. The rest of the screen stays as it was.

## FREE-7. What freedom mode does not allow

- Changing the shell, the menu, the bottom bar, addresses and section names.
- Introducing a colour, font, radius or shadow outside the tokens; changing the tokens themselves.
- Removing an action or a fact without a "Where now" line.
- Lowering the `ux-clarity` score or leaving a stop item "for later".
- Overriding a recorded decision of the product owner that is pinned by a test: the test is not edited so that a variant passes; the divergence is raised as a question to the product owner.
- Presenting a variant as ready without screenshots at 1280, 1024, 390 and in the longest language of the profile.
- Copying someone else's screen. The benchmarks (`../rubric-best.md`) are a measure of level, not a sample of looks.
