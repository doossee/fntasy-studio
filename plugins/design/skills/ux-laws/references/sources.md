# Sources

Every rule in this skill is our own text. The rules are based on the 30 principles collected on **Laws of UX** (lawsofux.com) by Jon Yablonski. The site's content is licensed under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 (seen on the site's info page, 24.11.2026), so nothing from it is copied, translated or closely paraphrased here: no definitions, takeaways, examples, images or posters. We name each principle as the site names it and the research it comes from; links are left out on purpose, because the skill must work without opening anything. The principles themselves are published research and ideas, which this skill applies in its own words with its own checks and thresholds.

The "Origin" column restates facts from the "Origins" and "Further reading" sections of each page, as seen on 24.11.2026. They were not checked against the original papers; check before quoting.

## Laws of UX

| Key | Principle | Origin, as given on the page |
| --- | --- | --- |
| LUX-AESTHETIC-USABILITY | Aesthetic-Usability Effect | Masaaki Kurosu and Kaori Kashimura (Hitachi Design Center), 1995: 26 ATM interface variants rated by 252 people |
| LUX-CHOICE-OVERLOAD | Choice Overload | Term from Alvin Toffler, "Future Shock", 1970 |
| LUX-CHUNKING | Chunking | George A. Miller, "The Magical Number Seven, Plus or Minus Two", 1956 |
| LUX-COGNITIVE-BIAS | Cognitive Bias | Amos Tversky and Daniel Kahneman, 1972 (the classic paper is 1974, see below) |
| LUX-COGNITIVE-LOAD | Cognitive Load | John Sweller, cognitive load theory, late 1980s; "Cognitive Load Theory, Learning Difficulty, and Instructional Design", 1988 |
| LUX-DOHERTY | Doherty Threshold | Walter J. Doherty and Arvind J. Thadani, IBM Systems Journal, 1982: a 400 ms response requirement instead of 2 s |
| LUX-FITTS | Fitts's Law | Paul Fitts, "The information capacity of the human motor system in controlling the amplitude of movement", 1954 |
| LUX-FLOW | Flow | Mihály Csíkszentmihályi, 1975 |
| LUX-GOAL-GRADIENT | Goal-Gradient Effect | Clark Hull, goal-gradient hypothesis, 1932; Kivetz, Urminsky and Zheng, "The Goal-Gradient Hypothesis Resurrected" |
| LUX-HICK | Hick's Law | William Edmund Hick and Ray Hyman, 1950s (the page gives 1952) |
| LUX-JAKOB | Jakob's Law | Jakob Nielsen, Nielsen Norman Group |
| LUX-COMMON-REGION | Law of Common Region | Gestalt grouping principles |
| LUX-PROXIMITY | Law of Proximity | Gestalt grouping principles |
| LUX-PRAGNANZ | Law of Prägnanz | Max Wertheimer, Gestalt psychology (the page dates his observation to 1910) |
| LUX-SIMILARITY | Law of Similarity | Gestalt grouping principles |
| LUX-CONNECTEDNESS | Law of Uniform Connectedness | Gestalt grouping principles |
| LUX-MENTAL-MODEL | Mental Model | Kenneth Craik, "The Nature of Explanation", 1943 |
| LUX-MILLER | Miller's Law | George A. Miller, 1956; further reading: Nelson Cowan, "The Magical Mystery Four" |
| LUX-OCCAM | Occam's Razor | William of Ockham (c. 1287–1347) |
| LUX-ACTIVE-USER | Paradox of the Active User | Mary Beth Rosson and John Carroll, "Interfacing Thought", 1987 |
| LUX-PARETO | Pareto Principle | Vilfredo Pareto, economics |
| LUX-PARKINSON | Parkinson's Law | Cyril Northcote Parkinson, essay in The Economist, 1955 |
| LUX-PEAK-END | Peak-End Rule | Kahneman, Fredrickson, Schreiber and Redelmeier, "When More Pain Is Preferred to Less: Adding a Better End", 1993 |
| LUX-POSTEL | Postel's Law | Jon Postel, the robustness principle of Internet protocols (TCP) |
| LUX-SELECTIVE-ATTENTION | Selective Attention | Attention research from 1950: Cherry 1953, Broadbent 1958, Treisman 1960, Kahneman 1973 |
| LUX-SERIAL-POSITION | Serial Position Effect | Hermann Ebbinghaus, memory research |
| LUX-TESLER | Tesler's Law | Larry Tesler, Xerox PARC, mid-1980s |
| LUX-VON-RESTORFF | Von Restorff Effect | Hedwig von Restorff, 1933 |
| LUX-WORKING-MEMORY | Working Memory | George A. Miller, Eugene Galanter and Karl H. Pribram, 1960s; Atkinson and Shiffrin, 1968 |
| LUX-ZEIGARNIK | Zeigarnik Effect | Bluma Zeigarnik, 1920s |

## Standards

| Key | What it supports |
| --- | --- |
| WCAG-USE-OF-COLOR | WCAG 2.2, 1.4.1 Use of Color: colour is not the only way to convey information |
| WCAG-TARGET-SIZE | WCAG 2.2, 2.5.8 Target Size (Minimum): targets at least 24 × 24 CSS px; a smaller target passes if a 24 px circle centred on it does not touch another target or another small target's circle; inline links are exempt |

## Checked against the research (24.11.2026)

After the first version, the claims most likely to be wrong were checked against the research itself (abstracts, the papers' own pages and reviews of them). What changed:

- **Zeigarnik.** A 2025 meta-analysis of the Zeigarnik and Ovsiankina effects (Ghibellini and Meier) found no general memory advantage for unfinished tasks, but a general tendency to resume them (Ovsiankina, 1928). LAW-ZEIGARNIK now rests on resumption.
- **Choice overload.** A 2010 meta-analysis (Scheibehenne, Greifeneder and Todd; 50 experiments) found a mean effect close to zero with large variation between studies. LAW-CHOICE-OVERLOAD now targets the conditions in which overload appears.
- **Hick.** The law describes choice reaction among known options. In unordered menus of unfamiliar items, search time grows linearly with the number of items. LAW-HICK says so and asks for ordered or grouped lists.
- **Postel.** RFC 9413, "Maintaining Robust Protocols" (IETF, 2023), argues the robustness principle is applied too broadly and warns against silently reinterpreting bad input. LAW-POSTEL keeps "accept variants of a known format" and drops any guessing.
- **Aesthetic-usability.** Kurosu and Kashimura, "Apparent Usability vs. Inherent Usability", CHI '95, 26 ATM layouts: ratings of ease of use followed the look more than the actual usability; Tractinsky (CHI '97) repeated the result. The claim that people "forgive" problems in good-looking interfaces was removed: it is not in these studies.
- **WCAG 2.2, 2.5.8.** The spacing exception is a 24 px circle centred on the small target that must not touch another target or another small target's circle; inline links are exempt. LAW-FITTS was corrected.
- **Miller.** Nelson Cowan, "The magical number 4 in short-term memory", Behavioral and Brain Sciences, 2001: about four chunks; the figure is still debated.
- **Goal-gradient.** The "head start" part is the endowed progress effect: Nunes and Drèze, Journal of Consumer Research, 2006 (car-wash loyalty cards; checked through summaries, not the paper).
- **Cognitive bias.** The classic paper is Tversky and Kahneman, "Judgment under Uncertainty: Heuristics and Biases", Science, 1974. Laws of UX dates the notion to 1972.

The other origins in the table above are as given on Laws of UX and were not checked.

## Thresholds that are this skill's own choice

These numbers are not in the sources; they make a rule checkable. In the rules they are marked "(ours)". Change them in the project profile if they do not fit.

- LAW-PRAGNANZ: no more than seven top-level blocks on a blurred screenshot.
- LAW-PROXIMITY: the gap between groups is at least twice the gap inside a group.
- LAW-CHUNKING: strings over eight characters are grouped; paragraphs of at most five lines; forms of more than six fields are split into sections.
- LAW-MILLER: at most four unseen items at once (after Cowan's estimate).
- LAW-FITTS: 44 × 44 px touch targets (the same size as WCAG 2.2 AAA, 2.5.5; AA requires 24 × 24 px or spacing); the primary action in the lower two thirds of a phone screen; 16 px between a destructive and a frequent action.
- LAW-DOHERTY: 400 ms is from the source; 1 s for an indicator and 10 s for progress are ours.
- LAW-HICK: at most five actions on the first phone screen; lists of more than ten items are ordered or grouped and get search.
- LAW-CHOICE-OVERLOAD: about five comparable options before filters.
- LAW-PARETO: three to five most frequent tasks, each within one tap of the main screen.
- LAW-GOAL-GRADIENT: progress shown for tasks of three or more steps.
