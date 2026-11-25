# The craft pass

A tidy screen and a strong screen can use the same components. The difference is in a few dozen decisions, each small, that together make the screen say one thing clearly and feel made for this product. Go through this list on every variant after it works and before anyone sees it.

## Hierarchy

- **One leader.** Squint or blur the screenshot: one area is heavier than the rest, and it is the answer to the screen's question. If two areas compete, demote one (smaller, lighter weight, secondary colour), do not enlarge the other.
- **Three levels, not five.** Main, needs-action, reference. Use size, weight and colour together for each level; one cue alone (only colour, only size) reads as accident.
- **Quiet the frame.** Navigation, headers and chrome are a level below the content. Content that the person came for is never smaller or greyer than the shell around it.

## Composition

- **Importance sets size.** Blocks of different importance have different sizes. A grid of equal cards says "everything is equal", which is rarely true.
- **Asymmetry with a reason.** A wide main column and a narrow side column read faster than two halves, when one side matters more.
- **Separate with space before lines, and lines before boxes.** Every card, border and background tint is a claim that this is a separate thing; most groups need only spacing.
- **Shared edges.** Few vertical lines that many elements start on; text inside cards aligns with text outside them.
- **The first screen answers.** At the main width, the answer to the screen's question and the main action are visible without scrolling.
- **The screen's move.** One decision that could only come from this product (see the intent in `SKILL.md`). Without it the screen is correct and forgettable.

## Typography

- **Size contrast where it means something.** The key number or title can be much larger than body text; everything else stays close to body.
- **Large numbers get care.** Tabular figures, slightly tighter letter spacing at display sizes, the unit smaller and lighter than the number, the comparison next to it ("▲ 8% vs last week").
- **Line length and wraps.** Running text at a readable measure; headings that do not leave one word alone on the last line; no lines that break inside a number or a name.
- **No chains.** "Order · Paid · Courier · 12:30 · Cash" is a sentence nobody reads; split facts into labelled places or drop the ones the task does not need.
- **Capitals rarely.** Short labels at most, with a little extra letter spacing.

## Colour

- **Neutral base, colour for meaning.** Most of the screen is neutral; the accent marks what can be done; status colours mark state. A screen that is colourful everywhere has no colour left for meaning.
- **One bold move at most** on a product screen: a brand-coloured header, a large tinted number, an illustration. Not three.
- **Tints over opacity.** Soft backgrounds for status and selection as solid tints, so text on them keeps its contrast.
- **Dark theme designed, not inverted** (`ui-rules` COLOR-4).

## Data

- **Every number has a job:** a label, a unit, and a comparison when the comparison is what the person needs.
- **Align for comparison:** numbers by their last digit, consistent decimals, tabular figures (`ui-rules` DATA-1, DATA-2).
- **Show the consequence before the choice.** When the person must decide, show what each answer changes: the new total, the price difference, the deadline, what happens if they do not answer.
- **One story everywhere.** The same fact (a status, a time, a total) is stated once or stated identically; after every action the numbers still add up.
- **Show the exception.** The row that needs action stands out by position (top), a status word and a quiet colour — not by making every row loud.
- **Charts answer a question.** One chart per question, labelled directly on the lines instead of a legend where possible, no 3D, no decoration.
- **Design empty, one and many**: the first day, a single item, and a thousand.

## Details

- Optical alignment: icons next to text are centred on the text's x-height, not the box; round shapes slightly larger than square ones next to them.
- Consistent radius family; inner radius smaller than outer.
- Hit areas bigger than what is drawn where needed, without changing the look.
- States everywhere: hover, focus, pressed, disabled, loading — drawn in the same system (`ui-rules` STATE-1).
- Real-looking content: plausible names, amounts and dates; the longest name in the data set; no lorem ipsum in a review.
- Never present invented facts as real. A comparison, a baseline or a status the brief did not give is either left out or marked on the prototype as an example, and listed as an assumption in the hand-over.
- Text in the product's voice: short, verbs on buttons, no exclamation marks in routine messages (`ui-rules` TEXT-4).

## Motion and imagery

- Motion follows the system's one-sentence character, explains a change, and stays short on frequent actions.
- Illustrations and photos are in one style, have a job (empty states, onboarding of a concept, brand moments), and never stand between the person and the task.

## Finish

After the pass, look at the screen at the smallest and the largest width, in each theme, with the longest language. Then read `generic-look.md`.
