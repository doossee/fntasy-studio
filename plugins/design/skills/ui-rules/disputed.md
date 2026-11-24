# Disputed and rejected ideas

Ideas that appear in the sources but did not become rules, or became rules only in a narrower form. A reviewer who meets them in a brief, a design document or another skill should know their status and the shape of the dispute, not just a verdict. Many of them travel under the name of a "law" or an "effect"; a famous name is not evidence that the idea helps people on a screen.

| Idea | Where it comes from | Status | What we do instead |
| --- | --- | --- | --- |
| Golden ratio, rule of thirds for layout and type | Design articles | No evidence it helps people use an interface; the claims about nature and art are themselves disputed | Any consistent scale and grid (LAYOUT-4, TEXT-1); otherwise taste |
| 60-30-10 colour split | Design articles, borrowed from interior design | No usability evidence | Colour by role (COLOR-3) |
| Colour psychology (blue calms, red excites, maroon means luxury) | Design articles | Weak and culture-bound evidence | Colour for meanings people already know, plus contrast (COLOR-1..3); check cultural meanings in the profile |
| Design the layout along the F or Z pattern | Design articles | The F shape is what people do when a page gives no cues — a failure mode, not a template; the Z shape has no data behind it | Front-load content, headings and grouping (LAYOUT-5) |
| "7 ± 2" as a limit for menu items | Popular reading of an old memory study | The study was about how many items people can repeat from memory, not about visible menus; later work puts the limit nearer four chunks, and the exact figure is debated | MEM-2 for things held in mind; ACT-3 for choices among visible options |
| Three-click rule | Popular | No drop-off was measured at three clicks; people keep clicking while each step looks promising | Interaction cost and clear labels (ACT-4, EXP-6) |
| "A task should take 3–5 taps" | Design articles | Rule of thumb, no source | Count steps against what the task needs (ACT-6) |
| Onboarding carousels and tutorials | Design articles | Usability testing found that tutorials did not improve task performance; platform guidance makes onboarding optional | Teach in place (EXP-5) |
| "Screen corners are hard to reach" | Design articles | Wrong for a mouse (the pointer stops at the edge); true for the top corners of a phone held in one hand | ACT-1 by input type |
| Unfinished tasks are remembered better | A classic memory effect | A recent meta-analysis did not find the memory effect reliably; the tendency to go back to an interrupted task did hold | ACT-9 rests on resumption only |
| Choice overload as a general law | Popular | A meta-analysis found an average effect close to zero with large variation; overload shows when options are hard to compare and people have no clear preference | ACT-3 targets those conditions |
| Choice time always grows with the log of options | Choice-reaction experiments | Holds for known, ordered options; unordered lists of unfamiliar items are scanned one by one | ACT-3 asks for ordered or grouped lists |
| "Be liberal in what you accept" without limits | Network protocol design | Its own field now warns against silently reinterpreting bad input | ACT-7: accept variants of a known format, never guess |
| "People forgive problems in beautiful interfaces" | Popular | Measured: good looks raise judged ease of use. That looks make people forgive small but not large problems is a practitioner statement, not a measurement | HONEST-4: judge by task success |
| Urgency and scarcity ("only 2 left", countdowns) | Call-to-action and conversion articles | Manipulative unless true and checkable | HONEST-1 |
| Decoy pricing tier | Pricing-page articles | A deceptive pattern when the tier exists only to steer | HONEST-1 |
| Variable rewards, streak guilt, paid sharing | Engagement articles | Manipulation | HONEST-2 |
| A loyalty score (recommend-to-a-friend) to judge a screen | Metric guides | Measures loyalty, not whether a screen works | HONEST-4: task success, single ease rating; questionnaires only to compare versions |
| "Users decide in 50 ms" / "17–50 ms" | Popular | First impressions of look form fast; that this decides use is not shown, and the pages that state it give no usable source | Not used |
| "Three columns is the sweet spot", "11 million bits per second", "80% of sensory data is visual" | Design articles | Unsourced | Not used |
| A 400 ms "threshold" for response time | One industry productivity paper | A productivity target, not a replicated limit | ACT-2 uses 0.1 / 1 / 10 s |
| Synthetic (AI) users for validation | Design articles | No evidence they find what real people find | Test with people (HONEST-4) |
| Naming a principle after a person ("X's law") as a reason | Common in reviews | A name explains nothing on its own and is often misquoted | Findings state the harm, the measurement and the rule ID (`method.md`) |
