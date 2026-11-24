# Layout and grouping

How the eye splits a screen into blocks before anyone reads a word: how many blocks there are, what belongs together, what is seen first, what lines up. On a real screen these cues work together, and the strongest wins: a connecting line or a shared box beats distance, and distance beats colour and shape.

## Review questions

- Blurred or seen from two metres away, does the screen fall into a few blocks with clear edges?
- Can you say in a few words what each box, card and group on the screen holds?
- Is there one thing that is clearly seen first, and is it the thing people came for?
- Do elements line up on shared edges, with gaps taken from one scale?
- Is the answer to the screen's main question in the top half on a phone?

## LAYOUT-1. Keep the screen to a few simple blocks; every element has a job

**Rule.** Blurred, the screen reads as a small number of simple blocks: a header, one main area, perhaps a side panel, and a few groups inside them. Every element on it can be explained by a task it serves; decoration that serves no task is removed.

**Why.** People see a busy picture as the simplest shape it can be, and when the layout is not simple, the eye makes its own grouping, which may not be the intended one. Every extra element adds something to see and judge, so it has to pay for itself.

**How to check.** Blur a screenshot (about 8 px Gaussian blur) or look at it from two metres. Count the top-level blocks: no more than seven (ours), each with a clear edge. Then go through the elements: for each, say in one line what the user does with it or learns from it. Remove it in your head; if no task gets harder, it fails. Look for repeated information (the same number shown twice) and decorative copy.

**Bad → Good.** An Acme dashboard with eleven cards of four heights in a masonry grid, the shop name shown in the title, a subtitle and a tag → three rows of cards, one height per row, the day's takings first, the shop name once.

**Limits.** Simple is not empty: a dense table that reads as one block with an obvious structure passes. Removing labels, units or confirmations makes a task harder, not simpler.

**Conflicts.** With MEM-2: removing information can push it into the user's memory (see conflicts.md).

**Evidence.** Research, extended: Gestalt perception studies; applying them to whole screens, and the threshold of seven, are design inferences.

**Sources.** NN/g (Visual hierarchy, 2021; Minimize cognitive load, 2013); Laws of UX (Law of Prägnanz; Occam's Razor); Figma Resource Library (Simplicity in design); secondary: Shopify Polaris ("polished, not ornamental"), IBM design principles (clarity and subtraction), Wertheimer and the Gestalt school. (former LAW-PRAGNANZ, LAW-OCCAM)

## LAYOUT-2. Group by distance first, then a shared box, then a connecting line

**Rule.** Things that belong together sit closer to each other than to anything else: the gap between groups is clearly larger than the gap inside one, and a label is closer to its own field than to any other. Use a box (background, border, card) only when a group needs a stronger edge than distance gives, and a connecting line only when order or a link between items matters (steps, parent and children). Long forms are split into named sections.

**Why.** People see nearby objects as one group before reading them. A shared bounded area and a visible connection are even stronger cues, so they override distance; overused, they stop meaning anything, and a wrong cue groups the wrong things.

**How to check.** Measure gaps on a screenshot or in the inspector. The gap between groups is at least twice the gap inside a group (ours). For every label, the distance to its own field is smaller than to any other field. For every box, name the group it holds in two or three words; no box holds a single element unless it is a deliberate call-out, and no box sits inside another box of the same style. For every line or connector, say which two related things it joins. Recheck grouping at each width: groups often break on a phone.

**Bad → Good.** An Acme form with 16 px everywhere, the label "Email" halfway between the name field above and the email field below → 4–8 px from label to its field, 24 px between field groups. A settings page with every switch in its own bordered card → one card per section, switches as rows inside it.

**Limits.** Nested boxes are fine when the levels look different (page background, card, lighter inset). Dividers between list rows separate, they do not group; keep them light.

**Evidence.** Research: Gestalt grouping, widely confirmed; the 2:1 ratio is ours.

**Sources.** NN/g (Proximity principle, 2020); Apple HIG (Layout: group with spacing, containers or separators); Laws of UX (Law of Proximity; Law of Common Region; Law of Uniform Connectedness); Figma Resource Library (Gestalt principles); secondary: Palmer 1992 (common region) and Palmer & Rock 1994 (uniform connectedness) as named by Laws of UX. (former LAW-PROXIMITY, LAW-COMMON-REGION, LAW-CONNECTEDNESS)

## LAYOUT-3. One focal point per screen; limit emphasis

**Rule.** The one thing that must be noticed first (the primary action, the key figure, a warning) is the only element with the strongest emphasis: the only filled accent button, the only very large number, the only alert-coloured block. A view has one or two prominent buttons at most. Emphasis is not stacked (bold plus colour plus italic plus capitals on one block) and does not rely on colour alone.

**Why.** Among similar items, the one that differs is noticed and remembered; when several items differ in the same way, none stands out, and the eye has no starting point.

**How to check.** Squint at the screen or blur it: write what you see first and second. Count elements per kind of strongest emphasis on the first screen (filled accent, largest size, alert colour): one each. Count prominent buttons in the view: no more than two. Check that the emphasised element also differs in size, weight, shape or position, not only in colour (WCAG 2.2, 1.4.1).

**Bad → Good.** Acme Shop's plan page with a "Most popular" ribbon on all three plans in three colours → one plan with the ribbon and a filled button, the other two with outlined buttons.

**Limits.** A list of form errors may have several red items; then the error summary is the one thing that stands out. Strong content (a bright photo) can override the intended hierarchy; check with the real content.

**Evidence.** Research, extended: the isolation effect (Von Restorff 1933) was found for memory of lists; applying it to emphasis on a screen is an inference. "One or two prominent buttons" is a platform guideline.

**Sources.** WCAG 2.2 (1.4.1); Apple HIG (Buttons: one or two prominent buttons per view); NN/g (Visual hierarchy, 2021); Laws of UX (Von Restorff Effect); Figma Resource Library (Visual hierarchy; Gestalt principles: focal point); secondary: Salesforce Lightning (clarity), "58 rules" (clear focal point). (former LAW-VON-RESTORFF)

## LAYOUT-4. Align to shared edges and a spacing scale

**Rule.** Every element lines up with something: a column edge, a shared left margin, the text of the element above. Paddings, margins and gaps come from one scale built on a base unit (4 or 8 px), and similar elements use the same step.

**Why.** When neighbouring blocks sit at 10, 12 and 14 px, people do not see three decisions, they see carelessness; a small difference does not read as meaning but is noticed as unevenness. Shared edges let the eye scan straight down a column.

**How to check.** In the inspector, read the padding, margin and gap of visible elements: values outside the project's scale (default 4, 8, 12, 16, 24, 32, 48, 64 px, ours) are findings. Draw vertical lines through the left edges of text on a screenshot: each block starts on one of a few lines. Compare the inner padding of cards of the same kind: identical.

**Bad → Good.** An Acme orders table with cell padding 10 and 14 px and a 10 px gap between tiles → cell padding 12 by 8, tile gap 8, headings aligned with the first column's text.

**Limits.** Optical corrections of 1–2 px (an icon next to text, a round shape next to a square one) are allowed and are not off-scale. Text inside a centred hero may be centred; running text is not.

**Evidence.** Heuristic: spacing scales and grids are a convention of public design systems; the default scale is ours.

**Sources.** Apple HIG (Layout: alignment and indentation show hierarchy); Material 3 (layout); Figma Resource Library (Grid layout; Consistency in design; Graphic design principles); secondary: uxpilot (grid and spacing scale), IBM Carbon, Atlassian and Polaris spacing tokens (as used in the former design-review skill).

## LAYOUT-5. Put what people came for at the top and leading edge

**Rule.** The answer to the screen's main question (the balance due, today's orders, what is not shipped) and the main action stand at the top and leading edge, larger than the rest of the text. Headings and the first words of list items carry the meaning, so a reader who only scans the start of lines still gets it.

**Why.** People read the first lines and the start of each line and skip the rest when there are no cues: that F-shaped scan is what happens to text without structure, not a layout to aim for. Platforms place the most important content at the top and leading side for the same reason.

**How to check.** Write the screen's main question. At 390 × 844 without scrolling, find the answer: it is in the top half (above 422 px, ours) and set larger than body text. Read only the first two words of each heading and list item: they say what the item is. In right-to-left languages, "leading" is the right edge.

**Bad → Good.** On Acme's customer card the overdue balance appears only below "Call", "Message", "New order" and "More" → the balance and "Record payment" right under the customer's name.

**Limits.** Screens with a natural order (a chat, a timeline, a document) keep that order. Do not treat the F or Z pattern as a template for placing elements (see disputed.md).

**Evidence.** Research: eyetracking studies by NN/g (45+ and 47 people) describe the F-shaped scan as the default without cues; the half-screen threshold is ours.

**Sources.** Apple HIG (Layout: most important content at the top and leading side); NN/g (F-shaped pattern, 2017); NN/g (Writing for lower-literacy users, 2005: main point at the top); secondary: GOV.UK design principles (start with user needs), Wroblewski (mobile first).
