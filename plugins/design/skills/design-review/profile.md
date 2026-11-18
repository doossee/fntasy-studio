# Project profile: `design-profile.md`

The skill holds general rules. Everything that belongs to one product lives in that product's profile: its scales, its brand, its languages, its examples, the taste of the person who accepts the design. The skill never changes the profile; it reads it.

One profile serves both lenses of the `design-review` skill: the look and the clarity.

## Where the profile lives

The first file found wins:

1. the path given to the script with `--profile <file>`;
2. `design-profile.md` in the project root;
3. `.claude/design-profile.md`;
4. `docs/design-profile.md`.

A project that already has a design document does not rewrite it: the profile body links to it ("Brand: see `docs/design.md`"), and the front matter carries only the numbers the script needs.

## Without a profile

The skill works. It uses the default numbers below, takes the product, audience and languages from what it can see in the code and on the screen, and **says so**: the first line of any report is "No project profile: default scale and thresholds; audience and brand inferred from the screen". The script prints the same note and writes `"source": "defaults"` into `metrics.json`. When a default clearly does not fit the project (its spacing is on a 5 px grid, its body text is 15 px), do not "fix" hundreds of violations: propose a profile first.

## Front matter: numbers for the script

Restricted YAML: `key: value`, inline lists `[a, b]`, one level of nesting (`selectors`). Put colours and selectors in quotes. Every key is optional. A value of the wrong type is not used: the script keeps the default and prints a note, and the note is also written to `metrics.json` (`profile.notes`). `spacing` and `fonts` may not be empty; `widths` are whole numbers from 240 to 7680.

| Key | Default | What it is | Rules |
| --- | --- | --- | --- |
| `name` | none | Product name, for reports | |
| `widths` | `[1440, 1280, 1024, 390]` | Viewport widths to build and check | DESK-7, PHONE-1 |
| `spacing` | `[4, 8, 12, 16, 24, 32, 48, 64]` | The spacing scale of the rules | SPACE-1 |
| `spacing-extra` | `[1, 2, 6, 20, 40, 80, 96]`; `[1, 2]` when `spacing` is set | Values the script tolerates besides the scale: border compensation, steps inside small elements | SPACE-1 |
| `fonts` | `[12, 14, 16, 18, 20, 24, 28, 30]` | Font sizes of regular text | TYPE-1 |
| `hero-fonts` | `[36, 40, 48]` | Sizes reserved for the leading number | COMP-2 |
| `hero-max` | `2` | How many texts above the regular scale a screen may have | COMP-2 |
| `hero-numbers-only` | `true` | Sizes above the regular scale only for text with digits. `false` for marketing pages with large headings | COMP-2 |
| `line-length` | `90` | Characters per line | TYPE-4 |
| `touch-target` | `44` | Minimum touch target, px | TOUCH-1 |
| `min-font` | `12` | Smallest text, px | TOUCH-3 |
| `phone-below` | `640` | Widths below this are emulated as a phone | |
| `primary` | detected | The action colour: a CSS colour or a custom property name (`"--primary"`). Detection order: common custom properties, then the most frequent fill of chromatic buttons | COMP-6, ACT-1 |
| `main` | `main, [role="main"]`, then `body` | Selector of the main content area (everything but the app shell) | COMP-*, DESK-1 |
| `languages` | `[]` | Interface languages; the longest one is used for long-word checks | WRAP-*, COPY-7 |
| `selectors.badge` | common badge classes | What counts as a badge | INSET-1, WRAP-5 |
| `selectors.button` | common link-button classes | Links that look like buttons | COMP-4 |
| `selectors.card` | `.card` and similar | Cards, for the hover check | STATE-1 |
| `selectors.avatar` | common avatar classes | Not counted as the first text of a row | COMP-10 |
| `selectors.primary-button` | none | If set, primary buttons are found by this selector instead of by colour | ACT-1 |

Unknown keys are ignored by the script and reported once, so a project may keep its own keys (colour tokens, typography roles) in the same front matter.

Changing a number here changes what the script counts. It does not change the rule: a project with a 5 px grid still needs one scale and no values outside it.

## Body: text for the agent

Markdown sections with fixed names. Each may be a few lines or a link to an existing document. Missing sections fall back to the defaults in the right column.

| Section | What to write | Used by | Default when missing |
| --- | --- | --- | --- |
| `## Product` | Who uses it, on which device, the 3–5 daily actions, familiar apps, the costliest mistake | clarity AUD-1…4; look screen kinds | a non-technical first-time user on a phone, used to mainstream messenger and banking apps |
| `## Brand` | Colour roles and tokens, typefaces, radii, shadows, motion; or a link to the design document | look COLOR-*, CRAFT-*; "what the skill may not change" | the colours, fonts and radii already in the code are the brand; do not introduce new ones |
| `## Languages` | Languages, which one is the longest, per-language word lists (stop words, the one term per thing) | WRAP-*, COPY-1, COPY-7, COPY-8 | the UI's primary language plus its longest one; with one language, test labels with long German words |
| `## Components` | Where the component library is, what may be added and how | assembly step, CRAFT-10 | reuse what the code already has; a new component needs a reason |
| `## Taste` | What the person who accepts the design has chosen and rejected, in their words, with dates | what a finding must respect: taste is not a defect | calm and clean beats expressive; noise is a minus |
| `## Decisions` | Deliberate deviations: things that look like a violation and are not to be "fixed" | the "kept as our decision" list in every report | none |
| `## Domain examples` | The product's screens by kind, the leading element of each, worst-case data to test with | screen kinds, CRAFT-9, examples in reports | the examples of the fictional Acme Orders product in `examples/` |

Write the profile in the language the team works in.

## Example

`examples/design-profile.md` is the profile of the fictional product used in every example of the skill.

## What does not belong in the profile

- General rules. If a correction would help any product, it goes into the skill (`references/`), not into one project's profile.
- Secrets, customer data, addresses of live systems.
- The history of how a decision was reached: the profile keeps the decision and its date, the discussion stays in the project's own documents.
