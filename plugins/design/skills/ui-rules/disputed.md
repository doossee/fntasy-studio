# Disputed and rejected ideas

Ideas that appear in the sources but did not become rules, or became rules only in a narrower form. A reviewer who meets them in a brief, a design document or another skill should know their status.

| Idea | Where it comes from | Status | What we do instead |
| --- | --- | --- | --- |
| Golden ratio, rule of thirds for layout and type | "58 rules", Figma | No evidence it helps people use an interface; the claims about nature and art are themselves disputed | Any consistent scale and grid (LAYOUT-4, TEXT-1); taste |
| 60-30-10 colour split | Figma, "58 rules", uxpilot; borrowed from interior design | No usability evidence | Colour by role (COLOR-3) |
| Colour psychology (blue calms, red excites, maroon means luxury) | Figma colour articles, "58 rules" | Weak and cultural evidence | Colour for meaning people already know, plus contrast (COLOR-1..3); check cultural meanings in the profile |
| Design the layout along the F or Z pattern | uxpilot, Figma, "58 rules" | NN/g: the F-pattern is a failure mode when content gives no cues; Z is not supported by data | Front-load content, headings and grouping (LAYOUT-5) |
| "7 ± 2" as a limit for menu items | Popular reading of Miller 1956 | Miller wrote about memory span, not visible menus; Cowan 2001 puts working memory near four chunks | MEM-3 for things held in mind; ACT-3 for choices |
| Three-click rule | Popular | NN/g: false; no drop-off measured beyond three clicks | Interaction cost and information scent (ACT-4, EXP-6) |
| "A task should take 3–5 taps" | Figma simplicity article | Rule of thumb, no source | Count steps against what the task needs (ACT-6) |
| Onboarding carousels and tutorials | "58 rules" | NN/g: tutorials did not improve task performance; Apple HIG: make onboarding optional | Teach in place (EXP-5) |
| "Screen corners are hard to reach" | Figma Fitts article | Wrong for mouse (the pointer stops at the edge); true for top corners on phones held in one hand | ACT-1 by input type |
| Zeigarnik effect: unfinished tasks are remembered better | Laws of UX | The memory effect did not replicate (meta-analysis, Ghibellini & Meier 2025); resumption (Ovsiankina) did | ACT-9 rests on resumption |
| Choice overload as a general law | Laws of UX, "58 rules" | Meta-analysis (Scheibehenne, Greifeneder & Todd 2010): mean effect near zero, large variation | ACT-3 targets the conditions where it appears |
| Hick's law for every menu | Laws of UX, Figma | Holds for known, ordered options; unordered lists of unfamiliar items are scanned one by one | ACT-3 asks for ordered or grouped lists |
| Postel's law without limits | Laws of UX | RFC 9413 (IETF, 2023) warns against silently reinterpreting bad input | ACT-7: accept variants of a known format, never guess |
| Aesthetic-usability: "people forgive problems in beautiful interfaces" | Popular | Measured: beauty raises judged ease of use (Kurosu & Kashimura 1995; Tractinsky 1997). That it forgives minor but not major problems is NN/g's statement, not a measurement | HONEST-4: judge by task success |
| Urgency and scarcity ("only 2 left", countdowns) | Figma call-to-action article, "58 rules" | Manipulative unless true and verifiable (NN/g deceptive patterns) | HONEST-1 |
| Decoy pricing tier | Figma pricing article | A deceptive pattern when the tier exists only to steer | HONEST-1 |
| Variable rewards, streak guilt, paid sharing | "58 rules" (engagement) | Manipulation; NN/g deceptive-pattern questions | HONEST-2 |
| NPS to judge a screen | uxhints | Measures loyalty, not usability of a screen | HONEST-4: task success, SEQ; SUS to compare versions |
| "Users decide in 50 ms" / "17–50 ms" | IxDF pages | Cited without a usable source on the pages read | Not used |
| "Three columns is the UX sweet spot", "11 million bits per second", "80% of sensory data is visual" | Figma articles | Unsourced | Not used |
| Synthetic (AI) users for validation | Figma UX validation article | No evidence they find what real people find | Test with people (HONEST-4) |
