# Layout and grouping

How the eye splits a screen into blocks before anyone reads a word: how many blocks there are, what belongs together, what is seen first, what lines up. On a real screen these cues work together, and the strongest wins: a connecting line or a shared box beats distance, and distance beats colour and shape.

## Review questions

- Blurred or seen from two metres away, does the screen fall into a few blocks with clear edges?
- Can you say in a few words what each box, card and group on the screen holds?
- Is there one thing that is clearly seen first, and is it the thing people came for?
- Do elements line up on shared edges, with gaps taken from one scale?
- Is the answer to the screen's main question in the top half on a phone?

## LAYOUT-1. Keep the screen to a few simple blocks; every element has a job

**Rule.** Blurred, the screen reads as a small number of simple blocks: a header, one main area, perhaps a side panel, and a few groups inside them. Every element can be explained by a task it serves; decoration and repetition that serve no task are removed.

**Why.** People see a busy picture as the simplest shape it can be. When the layout is not simple, the eye makes its own grouping, which may not be the intended one. Every extra element is one more thing to see and judge, so it has to pay for itself.

**How to check.**
- Blur a screenshot (about 8 px Gaussian blur) or look at it from two metres. Count the top-level blocks; each has a clear edge.
- For each element, say in one line what the user does with it or learns from it. Remove it in your head: if no task gets harder, it fails.
- Look for the same information shown twice and for decorative copy.

**Thresholds.** Top-level blocks on one screen [profile: layout.max-blocks = 7].

**Bad → Good.** An Acme dashboard with eleven cards of four heights in a masonry grid, the shop name in the title, a subtitle and a tag → three rows of cards, one height per row, the day's takings first, the shop name once.

**Limits.** Simple is not empty: a dense table that reads as one block with an obvious structure passes. Removing labels, units or confirmations makes a task harder, not simpler.

**Conflicts.** C-1 (removing information can push it into the user's memory).

**Evidence.** Research, applied: grouping and figure–ground are measured perception; applying them to whole screens is an inference.

## LAYOUT-2. Group by distance first, then a shared box, then a connecting line

**Rule.** Things that belong together sit closer to each other than to anything else: the gap between groups is clearly larger than the gap inside one, and a label is closer to its own field than to any other. Use a box (background, border, card) only when a group needs a stronger edge than distance gives, and a connecting line only when order or a link between items matters (steps, parent and children).

**Why.** People see nearby objects as one group before they read them. A shared bounded area and a visible connection are stronger cues and override distance. Overused, they stop meaning anything; misplaced, they group the wrong things.

**How to check.**
- Measure gaps on a screenshot or in the inspector: the gap between groups is clearly larger than the gap inside a group.
- For every label, the distance to its own field is smaller than to any other field.
- For every box, name the group it holds in two or three words. No box holds a single element unless it is a deliberate call-out; no box sits inside another box of the same style.
- For every line or connector, say which two related things it joins.
- Recheck at each width: groups often break on a phone.

**Thresholds.** Gap between groups ÷ gap inside a group [profile: layout.group-gap-ratio = 2].

**Bad → Good.** An Acme form with 16 px everywhere, the label "Email" halfway between the name field above and the email field below → 4–8 px from label to field, 24 px between field groups. A settings page with every switch in its own bordered card → one card per section, switches as rows inside it.

**Limits.** Nested boxes are fine when the levels look different (page background, card, lighter inset). Dividers between list rows separate, they do not group; keep them light.

**Evidence.** Research, applied: perceptual grouping is well replicated; the ratio is a team choice.

## LAYOUT-3. One focal point per screen; limit emphasis

**Rule.** The one thing that must be noticed first (the primary action, the key figure, a warning) is the only element with the strongest emphasis: the only filled accent button, the only very large number, the only alert-coloured block. A view has one or two prominent buttons at most. Emphasis is not stacked (bold plus colour plus italic plus capitals on one block) and does not rely on colour alone.

**Why.** Among similar items, the one that differs is noticed first. When several items differ in the same way, none stands out and the eye has no starting point.

**How to check.**
- Squint at the screen or blur it; write what you see first and second.
- Count elements per kind of strongest emphasis on the first screen (filled accent, largest size, alert colour): one each.
- Count prominent buttons in the view.
- Check that the emphasised element also differs in size, weight, shape or position, not only in colour.

**Thresholds.** Prominent buttons per view: one or two [platform: Apple HIG]. Colour not the only cue [WCAG 1.4.1 A].

**Bad → Good.** Acme Shop's plan page with a "Most popular" ribbon on all three plans in three colours → one plan with the ribbon and a filled button, the other two with outlined buttons.

**Limits.** On pricing and plan pages, competing emphasis (several ribbons, several filled buttons) is LAYOUT-3; plans that cannot be compared line by line are ACT-3; a plan that exists only to steer is HONEST-1. A form with several errors may have several red items; then the error summary is the one thing that stands out. Strong content (a bright photo) can override the intended hierarchy; check with the real content.

**Conflicts.** C-3 (consistency vs one thing standing out).

**Evidence.** Research, applied (the isolation effect was measured on memory for lists) and Platform guideline (one or two prominent buttons).

## LAYOUT-4. Align to shared edges and a spacing scale

**Rule.** Every element lines up with something: a column edge, a shared left margin, the text of the element above. Paddings, margins and gaps come from one scale built on a base unit, and similar elements use the same step.

**Why.** When neighbouring blocks sit at 10, 12 and 14 px, people do not see three decisions, they see carelessness: a small difference does not read as meaning but is noticed as unevenness. Shared edges let the eye scan straight down a column.

**How to check.**
- In the inspector, read padding, margin and gap of visible elements: values outside the project's scale are findings for the design system, scored as polish unless they break grouping (LAYOUT-2).
- Draw vertical lines through the left edges of text on a screenshot: each block starts on one of a few lines.
- Compare the inner padding of cards of the same kind: identical.

**Thresholds.** Spacing scale [profile: layout.spacing-scale = 4, 8, 12, 16, 24, 32, 48, 64 px].

**Bad → Good.** An Acme orders table with cell padding of 10 and 14 px and a 10 px gap between tiles → cell padding 12 by 8, tile gap 8, headings aligned with the first column's text.

**Limits.** Optical corrections of 1–2 px (an icon next to text, a round shape next to a square one) are not off-scale. Text inside a centred hero may be centred; running text is not.

**Evidence.** Practice: spacing scales and grids are shared practice of public design systems.

## LAYOUT-5. Put what people came for at the top and leading edge

**Rule.** The answer to the screen's main question (the balance due, today's orders, what is not shipped) and the main action stand at the top and leading edge, larger than the rest of the text. Headings and the first words of list items carry the meaning, so a reader who only scans the start of lines still gets it.

**Why.** People read the first lines and the start of each line and skip the rest when the page gives no cues. That skimming is what happens to text without structure; it is not a layout to aim for. Placing the answer first and front-loading words works with it.

**How to check.**
- Write the screen's main question. At 390 × 844 without scrolling, find the answer: it is in the top part of the screen and set larger than body text.
- Read only the first two words of each heading and list item: they say what the item is.
- In right-to-left languages, "leading" is the right edge.

**Thresholds.** Answer within the top part of a phone screen [profile: layout.answer-zone = top 50 %].

**Bad → Good.** On Acme's customer card the overdue balance appears only below "Call", "Message", "New order" and "More" → the balance and "Record payment" right under the customer's name.

**Limits.** Screens with a natural order (a chat, a timeline, a document) keep that order. The F and Z shapes are not templates for placing elements (`disputed.md`).

**Conflicts.** S-4 (F/Z layouts).

**Evidence.** Research: eyetracking of reading on screens; the zone is a team choice.
