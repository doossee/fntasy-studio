# 11. Automatic measurements

Script: `scripts/measure.mjs`, library `scripts/lib/ui-measure.mjs` (in-page measurements) and `scripts/lib/common.mjs` (arguments, profile, browser). It works on any address or local HTML file and needs only Node 20+ and Playwright.

```bash
cd scripts && npm install && npx playwright install chromium     # once, and only if Playwright is not installed yet (see below)

node scripts/measure.mjs http://localhost:3000/orders                          # 1440, 1280, 1024, 390
node scripts/measure.mjs examples/acme-today-bad.html --profile examples/design-profile.md
node scripts/measure.mjs https://example.com --widths 1440,390 --out audit/home
node scripts/measure.mjs <url> --no-measure                                    # screenshots and squint only: look first
node scripts/measure.mjs <url> --strict                                        # exit code 1 on any stop item (CI, before handing over)
```

If Playwright is already installed in the project you run the script from (its `node_modules`), or in a folder listed in `NODE_PATH`, `npm install` is not needed: the script finds it. A plain `npm i -g playwright` is not found unless `NODE_PATH` points to the global folder.

The script opens the address in a real browser. Open pages you trust. Chromium runs with its sandbox where the system allows it; as root or in a container it runs without it and the script prints a note. What gets written: screenshots and JSON into `--out`, nothing else. Values typed with `--fill`, cookies and the query string of the address are not written to `metrics.json`.

## Getting to the screen

A screen behind a sign-in, a dialog, a tab:

```bash
# a saved session (Playwright storage state) or a cookie
node scripts/measure.mjs http://localhost:3000/orders --storage-state state.json
node scripts/measure.mjs http://localhost:3000/orders --cookie session=abc123

# actions run in the order given, before the measurement
node scripts/measure.mjs http://localhost:3000/login \
  --fill 'input[name=email]=demo@example.com' --fill 'input[name=password]=demo' --click 'button[type=submit]' \
  --click 'a[href="/orders"]' --wait-for 'table' --name orders

# measure an open dialog: only the dialog is measured, the page under it is measured on its own screen
node scripts/measure.mjs http://localhost:3000/orders --click 'text=Record payment' --wait-for '[role=dialog]' --name record-payment
```

Selectors are Playwright selectors (`text=…`, `role=button[name="…"]`, CSS). An action takes the first visible match, so a hidden copy of a link (a collapsed menu) is skipped. `--wait-gone 'css'` waits until a toast or a loader leaves the frame. Each width starts from the address again and repeats the actions; when a phone needs other steps than a computer, run the widths separately (`--widths 390`) into the same `--out`. Other options: `--locale`, `--timezone`, `--color-scheme dark`, `--scale 2`, `--height`, `--wait <ms>`, `--press <key>`, `--hover`, `--scroll-to`, `--proxy`, `--ignore-https-errors`; `--help` lists all.

For flows the flags cannot express, call the library from your own Playwright script: `measureUi(page, config)`, `measureStateShift`, `measureComposition`, `squintShot`, with `pageConfig(profile)` from the same file and `loadProfile()` from `common.mjs`.

## What comes out

In `<out>/<width>/` (default `ui-measure/`):

- `<name>.png`: the viewport; `<name>-full.png`: the whole page;
- `<name>-marks.png`: the whole page with red frames of violations. The letter on a frame is the rule: `T` text at a frame, `B` element at a frame, `C` cut, `S` spacing off the scale, `R` row, `F` font size, `L` line length, `H` state, `O` the page scrolls sideways;
- `<name>-squint.png`: "squint", the viewport blurred and grey (COMP-9), computer widths;
- `metrics.json`: the `profile` block (what scale and thresholds were used and where they came from) and, per screen: the `composition` block (below); rule counters `counts`, `stops` (their sum), `minTextEdgeX` and `minTextEdgeY`, `fontSizes`, `offScale`, `maxLineChars`, `pageOverflowX`, `layout`, `scope` (`page` or `dialog`), the list of violations (up to 40 per rule, `--keep` changes it) with a description of the element and its rectangle.

In `<out>/summary.json`: the counters for every width.

Run each language of the profile into its own folder (`--out ui-measure/de --locale de-DE`, or the address of that language).

## Rules of the script

All nine are stop items of the checklist. The threshold of each is 0.

| Code | Rule of the skill | What counts as a violation |
| --- | --- | --- |
| `text-edge` | INSET-1 | Letters closer than the minimum to the visible edge of the nearest ancestor with a border, its own background or a shadow: 8 and 4 px; in a badge up to 24 px high, 6 and 3; in a counter up to 20 px and in a circle, 4 and 2 |
| `box-edge` | INSET-4 | An element with a border or background, a field, an icon 0.75-3.5 px from the visible edge of its container |
| `clipped` | WRAP-1 | The element's own text does not fit under hidden overflow; with an ellipsis it is forgiven only with a `title` and never on the label of a button, tab or badge |
| `off-scale` | SPACE-1 | A specified `padding`, `margin`, `row-gap`, `column-gap` not from the scale (profile: `spacing`, `spacing-extra`); values above 96 px (room for a pinned panel) are not checked |
| `row-align` | ALIGN-1 | Children of a flex row share neither centres (2 px), nor baselines (2 px), nor the first line (2 px); a shared top or bottom is accepted only for blocks taller than 56 px |
| `font-scale` | TYPE-1, COMP-2 | A font size not from the scale (profile: `fonts`, `hero-fonts`; default `12…30, 36, 40, 48`); a third text larger than the regular scale on the screen (`hero-max`); a text larger than the regular scale without digits (`hero-numbers-only`) |
| `line-length` | TYPE-4 | More than 90 characters per line (profile: `line-length`) |
| `state-shift` | STATE-1 | Hover or focus changes the rectangle of the target, its parent or its neighbour by more than 0.5 px (computer only, up to 40 targets in the viewport; `--no-state` skips it) |
| `page-overflow` | DESK-7 | The page is wider than the requested viewport width: it scrolls sideways (S9) |

## Composition figures

`measureComposition` counts the first viewport of the main area (profile: `main`; default `main`, then `body`) and writes the `composition` block. These are **not stop items**: numbers for section K of the checklist and for the rubric. `--strict` does not fail because of them.

| Field | What it is | Guide | Flag in `flags` | Rule |
| --- | --- | --- | --- | --- |
| `heroSize`, `heroCount`, `bodySize`, `heroRatio` | The largest text size and how many texts have it; the body size; their ratio | overview: ratio ≥ 2, texts ≤ 2 | `no-hero` | COMP-2 |
| `heroX`, `heroY` | Where the centre of the largest text is: share of the width and height of the first viewport of the main area | overview: ≤ 0.6 and ≤ 0.5 | `hero-off` | COMP-2 |
| `sizeLevels` | How many different text sizes are in the first viewport | ≤ 6 | none | TYPE-1 |
| `framesFirstViewport` | Container frames (a border on three sides or an own background, from 120 × 40, not a control) | ≤ 8 | `frame-heavy` | COMP-4 |
| `topLevelFrames`, `sameSizeFrames`, `areaRatio` | First-level blocks; how many of them have one size (4 px); the area of the largest to the median | same-size < 4; ratio ≥ 1.5 (`null` with fewer than three blocks) | `equal-cards` | COMP-3 |
| `nestedFramesMax` | Depth of "a frame in a frame" | ≤ 2 | `nested-frames` | COMP-4 |
| `alignedShare` | Share of texts whose left or right edge is shared by two more texts (2 px) | ≥ 0.6; aim 0.75 | `loose-alignment` | COMP-10 |
| `primaryButtons`, `primarySource` | Buttons and links filled with the primary colour, and where that colour came from: the profile, a CSS custom property, or a guess from the buttons | ≤ 1; 0 on a state that demands an action is a defect (the script cannot know it, look with your eyes) | `multi-primary` | COMP-6 |
| `tintShare` | Share of the area under coloured tints (background chroma from 16) | ≤ 0.12; with a status strip ≤ 0.16 | `color-noise` (above 0.16) | COLOR-2 |
| `coloredTextShare` | Share of texts in a state or brand colour | ≤ 0.25 | `color-noise` | COLOR-2 |
| `firstViewportFill` | How far down the first viewport the content reaches | ≥ 0.6 | `half-empty` | COMP-7 |
| `scrollScreens` | Height of the page in viewports | overview ≤ 2 | none | COMP-7 |
| `tabularShare` | Share of numbers with digit groups ("650 000", "12,480") or from five digits, set in tabular figures; years and short ids do not count | 1 | `numbers-not-tabular` | DATA-2 |
| `columnTopSpread` | The largest difference between the top edges of the content of neighbouring columns of the first viewport, px | ≤ 4 | `columns-top-off` | COMP-8 |
| `groupGapSpread` | Spread of the visible gaps between blocks of one level in one column, px | ≤ 8 | `uneven-gaps` | COMP-8 |
| `rowStartSpread` | Spread of the left edge of the first text of rows in one list or table column, px (avatars and badges are not text) | ≤ 2 | `ragged-rows` | COMP-10 |
| `rowVoidMax` | The longest emptiness inside a row of the first viewport (content on the left and on the right, nothing between), share of the main area width; the rows of the page header do not count | ≤ 0.25 | `hollow-row` | COMP-3 |
| `rightShare` | Share of the occupied cells of the first viewport that lie in the right half of the main area | ≤ 0.58 | `right-heavy` | COMP-3 |
| `looseIcons` | Separate icons in the first viewport, not counting icons in buttons, tabs, fields and avatars | ≤ 12 | `icon-noise` | CRAFT-4 |
| `mainSource` | Which element was taken as the main area: `profile`, `main` or `body` | with `body` the app shell is inside the figures: set `main` in the profile | none | |

`rowVoidMax` is counted in bands 40 px high: a button that reaches 3 px into the next band, or a row cut by the fold, may give a false flag. Before moving blocks, look at the screenshot: the emptiness is visible to the eye, a defect; not visible, write "false flag, reason" in the protocol. `hollow-row` and `right-heavy` are not raised when the main area is narrower than 700 px (one column). A 2 × 2 grid without shared column containers is not recognised (`columnTopSpread`, `groupGapSpread` = `null`): then column tops and gaps are measured on the screenshot.

A flag is read with the kind of the screen in mind: `no-hero` on a list or an object card is not a defect (the leading element there is not a number), `equal-cards` on a grid of same-type tiles is not either. What a flag means for this screen is written in the protocol. The numbers are a hint for the eye, not a replacement: figures within the guides do not prove that the screen is strong.

**Look first, numbers second.** The script prints the numbers in the same run that takes the screenshots, so the order is: the first run with `--no-measure` (screenshots and squint; look at `<name>.png` and `-squint.png`), the note "I see first…", and only then the run with measurements.

## What the script does not see

- A dialog, sheet or menu is open: only it is measured (`scope: "dialog"`); the page under it is measured on its own screen, and composition is not counted.
- Text inside an `input` (value and placeholder) is not measured for distance to the frame; only clipping is checked.
- `margin: auto`, percentages and `calc` values with percentages are skipped.
- Text inside a scrolling area (a table wider than its frame at 1024) is not measured for distance to the frame along the scroll axis: it depends on the scroll position. Scrolling of a table inside its frame is acceptable (DESK-4); scrolling of the page is not (S9).
- A word broken in the middle by wrapping (a narrow column heading): no rule counts it; look at headings and buttons at 1024 and in the longest language.
- Text that is in the DOM but painted outside its clipped box counts for `line-length` and `clipped` at once: one defect may give two stop items.
- A cell with a bottom border only: the distance from its text to the frame of the whole table is not measured (the nearest frame is the cell). Look at the first and last column by eye (DESK-4).
- Hierarchy as a whole: does the most noticeable thing coincide with the most important one. This is the "two seconds" test and the squint (COMP-9); a person or an independent judge does them.
- Sorting of a list, a comparison next to a number, the meaning of a colour (DATA-1, DATA-3, COLOR-1): questions K9, K11, K13.
- Equal top and bottom padding in a tile (INSET-3), the ratio "inside a group / between groups" (GROUP-1), a shared left edge (ALIGN-2), empty space (DESK-6): these are checklist questions; their numbers are taken from the screenshot.
- The "selected" state (STATE-2) and loading (STATE-3) are not toggled. Tabs are checked by hover only: focus may select a tab and would change the screen.
- Canvas, images of text, content inside iframes and closed shadow roots.
- A project without a profile: the primary colour is guessed (`primarySource`), badges and link-buttons are found by common class names. Set `primary` and `selectors` in the profile when the guess is wrong.

## Frequent false trails

- The row "icon without text + text" is compared by centres; if the elements have different line heights, set `align-items: center` or build the row with a grid.
- An underline of the active tab drawn with a shadow (`box-shadow`) is taken as a frame, and the text is measured to it: draw it with a bottom border or a pseudo-element.
- The 6 px step is accepted by the script everywhere, by rule SPACE-1 only inside elements up to 32 px high: it is not used in the padding of rows and panels.
- A page without a style reset: the browser's own margins of `p`, `h1`, `ul` (for example 14 or 21.44 px) are reported as `off-scale`. They are real values on the screen; a reset or explicit margins remove them.
- A navigation list marked `role="menu"` inside the layout is part of the page. A menu or listbox counts as an open overlay only when it floats: it, or a wrapper between it and the nearest landmark (`nav`, `header`, `aside`, `main`, `footer`), is positioned `absolute` or `fixed`.
- On a page that is not an app screen (a landing page, an article) the default profile reports large headings as `font-scale`: set `hero-numbers-only: false` and the project's `fonts` in a profile.

## How to add a screen

Another target on the command line (`--name a,b` names several targets in order), or another run with its own `--name` and actions into the same `--out`: `metrics.json` and `summary.json` of one folder are merged by screen name, a screen measured again replaces its earlier entry; each entry records the profile it was measured with (`profileSource`). Thresholds and scales are the profile keys and the constants at the top of `scripts/lib/common.mjs` (`DEFAULT_PROFILE`) and in `scripts/lib/ui-measure.mjs`; when you change a rule in the skill, change them in the same commit.

## If the script is wrong

A false positive is not bypassed with an attribute or an exception by class. Options: (1) it is a real violation, just a habitual one: fix it; (2) the rule is inexact: correct the condition in `ui-measure.mjs` and the description here, and record the case in the report.
