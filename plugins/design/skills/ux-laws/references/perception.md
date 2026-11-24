# Perception: how people group what they see

Five rules on how the eye splits a screen into groups before anyone reads a word. They come from Gestalt psychology. On a real screen they work together, and the strongest cue wins: a box (common region) or a line (connectedness) beats distance (proximity), and distance beats colour and shape (similarity).

## LAW-PRAGNANZ. Make the screen readable as a few simple shapes

**Rule.** Blurred or seen from a distance, the screen falls into a small number of simple blocks: a header, one main area, maybe a side panel, and a few groups inside them. Nothing on the screen needs effort to make out where one thing ends and the next begins.

**Why.** People see an ambiguous or busy picture as the simplest shape it can be. When the layout itself is not simple, the eye makes its own simplification, and it may not be the one the designer meant.

**How to check.** Blur a screenshot (about 8 px Gaussian blur, or look at it from two metres away). Count the blocks you can tell apart. Pass: no more than seven blocks at the top level, and each one has a clear edge (aligned with its neighbours, or with a background or border). The threshold of seven is ours. Fail: shapes that overlap, edges that almost line up but not quite, or blocks you cannot count.

**Bad → Good.** A dashboard where eleven cards of four different heights are packed in a masonry layout → three rows of cards, one height per row, the main figure in the first row.

**Limits.** Simple is not the same as empty. A dense table can be simple if it reads as one block with an obvious structure.

**Evidence.** Research, extended: Gestalt perception studies; applying it to whole screens is a design inference. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-PRAGNANZ]; origin: Max Wertheimer and the Gestalt school, early 20th century [LUX-PRAGNANZ].

## LAW-PROXIMITY. Distance shows what belongs together

**Rule.** Things that belong together sit closer to each other than to anything else. The gap inside a group is clearly smaller than the gap between groups. A label is closer to its own field than to the field above.

**Why.** People see nearby objects as one group without reading them. A wrong distance groups the wrong things, and no amount of text fixes it.

**How to check.** Measure gaps on a screenshot or in the browser's inspector. Pass: the gap between groups is at least twice the gap inside a group (ours). For every label, the distance to its own field is smaller than the distance to any other field.

**Bad → Good.** A form with 16 px everywhere: the label "Email" sits exactly halfway between the name field above and the email field below → 4–8 px from label to its field, 24 px between field groups.

**Limits.** A strong box or line (see LAW-COMMON-REGION, LAW-CONNECTEDNESS) overrides distance. Do not fix a grouping problem with distance when a box already says otherwise.

**Evidence.** Research: Gestalt grouping, widely confirmed; the 2:1 ratio is ours. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-PROXIMITY]; origin: Gestalt grouping principles [LUX-PROXIMITY].

## LAW-SIMILARITY. Things that look alike are taken to work alike

**Rule.** Elements that do the same job look the same: one style per kind of button, link, status, or tag across the whole product. Elements that do different jobs do not share a look. In particular, text that is not clickable does not look like a link, and a link does not look like plain text.

**Why.** People treat elements that share colour, shape, size or style as one group, and they expect them to behave the same way. A shared look between different things makes a false promise.

**How to check.** On each screen, list the clickable elements and the plain elements. Pass: every clickable element has at least one visual sign that no plain element has (colour plus underline, a button shape, an icon). Across three screens, the same kind of element (for example the primary button, a status badge) has the same colour, size, radius and weight.

**Bad → Good.** Blue bold headings and blue bold links on one page; people tap the headings → headings in the text colour, links blue and underlined.

**Limits.** Colour alone is not enough to separate groups: some people do not see the difference (WCAG 2.2, 1.4.1 Use of Color). Pair colour with a second sign.

**Evidence.** Research: Gestalt grouping; "alike looks mean alike behaviour" is an inference for interfaces. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-SIMILARITY]; origin: Gestalt grouping principles [LUX-SIMILARITY]; [WCAG-USE-OF-COLOR].

## LAW-COMMON-REGION. A shared background or border makes a group

**Rule.** Use a box (a background, a border, a card) to group things only when the group needs a stronger edge than distance gives: a set of controls that act on one object, a record in a list of records. Do not put a box around every element: when everything is boxed, the boxes say nothing.

**Why.** Things inside one clearly bounded area are seen as a group, even when they are far apart or look different. The box is one of the strongest grouping cues, so it is also the easiest to overuse.

**How to check.** For each box on the screen, name the group it holds in two or three words ("one order", "payment details"). Pass: every box has such a name, and no box sits directly inside another box of the same style (a card inside a card with the same border and background). Fail: a box that holds one element only, unless it is a deliberate call-out.

**Bad → Good.** A settings page where every single switch sits in its own bordered card → one card per section ("Notifications", "Privacy"), switches inside as rows.

**Limits.** Nested boxes are fine when the levels look different (a page background, a card, a lighter inset area inside it).

**Evidence.** Research: Gestalt grouping (common region was added to the classic list later). Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-COMMON-REGION]; origin: Gestalt grouping principles [LUX-COMMON-REGION].

## LAW-CONNECTEDNESS. A line or a link between items is the strongest tie

**Rule.** When the order or the link between items matters (steps of a process, a parent and its children, a timeline), connect them visibly: a line, a shared bar, an arrow. Do not draw lines between things that are not related, for example a divider that runs through two separate groups.

**Why.** Items joined by a visible connection are seen as more related than items that are only close or alike. A connecting line is read before distance, colour or shape.

**How to check.** For each line or connector on the screen, say what two things it joins and why. Pass: every connector joins related items. For each multi-step process on the screen, check that the steps are joined (a stepper line, a progress bar) and that the current step is marked.

**Bad → Good.** A three-step checkout shown as three separate circles with numbers → three circles on one line, done steps filled, the current one outlined.

**Limits.** Dividers between rows of a list connect nothing; they separate. Keep them light so they do not outweigh the grouping by distance.

**Evidence.** Research: Gestalt grouping (uniform connectedness was added to the classic list later). Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-CONNECTEDNESS]; origin: Gestalt grouping principles [LUX-CONNECTEDNESS].
