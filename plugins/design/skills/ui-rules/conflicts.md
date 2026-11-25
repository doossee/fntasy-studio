# Conflicts

When two rules, or two sources, point in different directions, decide here. Do not pick one at random and do not apply both halfway.

## How to decide

1. **Accessibility first.** A WCAG 2.2 criterion is a requirement. If any rule or source contradicts it, WCAG wins.
2. **Then the user's task.** Ask which choice lets the main user finish the frequent task with fewer errors. Frequency of the task and the cost of an error decide (see `severity.md`).
3. **Then the source order for this kind of question** (see `sources.md`): platform convention → Apple HIG / Material 3; behaviour → NN/g, then Baymard, IxDF (as a pointer to research), Laws of UX, Figma; e-commerce → Baymard, then NN/g.
4. **Name the type of choice** (impact × how comparable the options are). Low impact and easy to compare: pick and move on. High impact and hard to compare: write both options with what each costs and hand the choice to the owner of the product; do not decide it in a review.
5. **Say what you chose and why** in the finding. A conflict is never solved silently.

## Rule against rule

| ID | Rules | Decide by |
| --- | --- | --- |
| C-1 | LAYOUT-1 / MEM-1 (remove what is not needed) vs MEM-2 (keep needed facts in view) | Remove decoration and repetition; keep anything the user needs to decide at this step. If removing it sends the user to another screen, it stays. |
| C-2 | EXP-3 (consistency) vs EXP-1 (platform conventions) | Inside one product family, use the platform's own controls where people spend their time on that platform (Microsoft Fluent "natural on every platform"); keep the product's words, icons and flows the same everywhere (SAP Fiori, GitLab "one product"). Behaviour follows the platform, meaning follows the product. |
| C-3 | EXP-3 (consistency) vs LAYOUT-3 (one thing must stand out) | Consistency is not uniformity (GOV.UK, Atlassian). A deliberate difference for the one most important element is allowed; a difference without a reason is a defect. |
| C-4 | Everything visible (IBM) vs progressive disclosure (MEM-1; Apple, GitLab) | Frequent and important: visible. Rare or advanced: one level deeper, behind a labelled control. Never more than two levels (NN/g). |
| C-5 | Customisation (IBM, GitLab) vs minimal settings (Apple) | Different roles with different tasks: offer settings, with good defaults. One role, one task: choose the default and do not ask. |
| C-6 | ACT-8 (do not interrupt) vs "nudge the next action" (Atlassian momentum) | A next-step suggestion is fine at the end of a task or in an empty state; a pop-up in the middle of a task is not. |
| C-7 | STATE-4 (prefer undo) vs confirmations | Undo for common actions, even destructive ones (Apple HIG). Confirm only rare, irreversible ones, and name the object in the confirmation (NN/g). |
| C-8 | ACT-7 (accept what people type) vs safe input | Accept variants of a known format (spaces, dashes, a pasted space). Never guess an ambiguous value (03/04: March or April?); ask or use a picker. Silent reinterpretation creates errors nobody sees. |
| C-9 | ACT-6 (ask for little) vs HONEST-3 (explain why you ask) | Fewer questions, but every question that stays says why it is asked when the reason is not obvious (phone number: "for the courier"). |
| C-10 | EXP-4 (do not change what people know) vs fixing a real problem | Fix it when the harm is shown (task fails, errors, accessibility); change step by step and tell people what moved. A change for taste waits. |
| C-11 | TEXT-2 (comfortable body text) vs dense data tables | Data tables may use smaller text and tighter rows for experts who scan; running text may not. WCAG contrast and 200% zoom apply to both. |
| C-12 | MOTION-1 (motion explains) vs PLAT-3 (fast) | Motion never delays the result. If an animation makes people wait, remove it or shorten it. |
| C-13 | MEM-4 (message where the eye is) vs STATE-5 (toast for a completed action) | A toast is acceptable only for a low-risk confirmation whose result is also visible in place (the item left the list). Anything that needs a fix, or that people must read later, goes inline or in a banner. |
| C-14 | ACT-3 (few options, recommend one) vs SEARCH-1/2 (large catalogues) and HONEST-1 (no steering) | Short lists and a recommendation when the set is small and the product knows what fits; search and filters when the set is large. A recommendation names why it fits the person; one that only serves revenue is HONEST-1. |
| C-15 | EXP-7 (label non-universal icons) vs LAYOUT-1 / space on a phone bar | Labels win on main paths and in navigation. Unlabelled icons only for universal ones or in dense expert toolbars with tooltips and shortcuts. |
| C-16 | TEXT-5 (the person's locale) vs DATA-2 (numbers people compare with others) | Show values in the viewer's locale; exports, links and messages to other people use an unambiguous format (ISO dates, currency code) and state the time zone. |
| C-17 | COLOR-4 (dark theme palette) vs brand colours | The brand owns the hue; contrast owns the lightness. Adjust the brand colour's lightness per theme; never fail COLOR-1 to keep an exact brand value. |
| C-18 | DATA-1 (keep the table's columns) vs PLAT-1 / TEXT-3 (fit narrow windows) | If people compare values across rows, keep a table that scrolls sideways inside its container with the first column fixed. If they look up one record at a time, turn rows into cards with the same fields in the same order. Never drop a column silently. |
| C-19 | EXP-8 (least experienced person) vs an expressive or novel taste in the profile | Expression goes into colour, imagery, type and copy; fields, buttons, navigation and gestures stay conventional for the least experienced audience. If the taste asks for novel controls, the owner decides with the cost stated: who in the audience will fail. |

## Source against source

| ID | Question | Sources say | Decision |
| --- | --- | --- | --- |
| S-1 | Touch target size | WCAG 2.2 AA 24 × 24 CSS px (or spacing); WCAG AAA and Apple HIG 44 × 44; Material 48 × 48 dp with 8 dp between; NN/g about 1 × 1 cm; one Figma article 24, another 44 | Pass/fail line: WCAG AA. Target for the product: the platform's number (44 pt iOS, 48 dp Android; on the web the profile's `act.target-web`, default 44 px). |
| S-2 | Number of items in a phone tab bar | NN/g: 4–5 fit; uxpilot: 5–7 top-level items | Up to 5 in a phone tab bar (NN/g, Apple HIG "few tabs"); more goes to a "More" section or a menu with in-page links. |
| S-3 | Hiding navigation | Figma recommends the hamburger on mobile; NN/g measured lower use of hidden navigation (179 people) | Desktop: never hide top-level navigation. Phone: show up to 4–5 destinations; hide the rest only with in-page links to key content. |
| S-4 | F- and Z-pattern | uxpilot, Figma, "58 rules": design layouts along F/Z | NN/g: the F-pattern is what people do when the page gives no cues — a failure mode. Use headings, front-loaded words and grouping instead; F/Z is not a layout rule (see `disputed.md`). |
| S-5 | Onboarding | "58 rules": build an engaging onboarding | NN/g (tutorials did not improve performance) and Apple HIG (learn by doing, optional, contextual tips) win: teach in place (EXP-5). |
| S-6 | Corners of the screen | Figma (Fitts article): corners are hard to reach | With a mouse, edges and corners are easy: the pointer stops there. On touch screens the top corners are hard for one hand. Decide per input type. |
| S-7 | 60-30-10, golden ratio, colour psychology | Figma, "58 rules", uxpilot | No usability evidence; treated as taste (see `disputed.md`). |
| S-8 | Gamification and variable rewards | "58 rules": add variable rewards and leaderboards | NN/g deceptive-patterns walkthrough and HONEST-2: rewards that work like a lottery, artificial waits and paid sharing are manipulation. Progress and real achievements are fine. |
| S-9 | Hover delay for menus | NN/g button states: 150–200 ms; Baymard menus: 300–500 ms; IxDF: 200–300 ms close delay | Both are guidance, not measurements. For hover-opened menus use a delay in the 300–500 ms range (Baymard, e-commerce menus); for hover styling of a button no delay is needed. |
| S-10 | Body font size | Web convention 16 px (several sources, unsourced); Apple HIG 17 pt default, 11 pt minimum; NN/g 14–16 px (heuristic) | Platform defaults in apps; on the web the profile's `text.body-web` (default 16 px), a team choice. The hard rule is WCAG: text survives 200% zoom. |

## When the rule itself is wrong

Every rule has a context where following it hurts. These are the known ones; a reviewer who meets one says so in the report under "Where a rule did harm or stayed silent".

| ID | Rule | Context | What to do instead |
| --- | --- | --- | --- |
| R-1 | LAYOUT-1, MEM-1 (few blocks, hide the rest) | A dispatcher's or trader's console used all day, where seeing everything at once is the job | Density is the task. Check grouping (LAYOUT-2), alignment and contrast instead of counting blocks. |
| R-2 | ACT-3 (few actions on the first screen) | A point-of-sale screen with 20 product buttons pressed hundreds of times a day | Many large, stable, well-grouped buttons beat a short list plus search. Check target size and stable positions. |
| R-3 | EXP-5 (no tours) | Safety-critical or regulated tools (medical, industrial) where training is required by law or by risk | Training is fine; it still does not replace clear labels and in-place help in the product. |
| R-4 | STATE-4 (undo instead of confirm) | An action with an outside effect: an SMS to 2,000 customers, a bank transfer, a published post | The product's own "undo" cannot recall the effect. Confirm with the object and the count, or delay sending with a visible cancel window. |
| R-5 | EXP-1 (follow the convention) | The convention harms people (a pre-ticked consent box), or the users' habits come from a different set of products than the reviewer's (another region, another age group) | HONEST rules win over convention; check the convention against the products these users actually use, from the profile. |
| R-6 | MEM-1 ("advanced" one level deeper) | The "advanced" option is used every day by the main role | Frequency decides, not the label "advanced" (ACT-4). |
| R-7 | TEXT-2 (platform body size) | A kiosk read from a metre away, a car screen, a watch | Size by viewing distance and the platform of that device; WCAG zoom still applies on the web. |
| R-8 | ACT-8 (do not interrupt) | A warning that prevents a loss in the middle of the task (insufficient balance before paying, a session about to expire) | Interrupt, once, with the facts and a way to act. |
| R-9 | EXP-4 (keep what people know) | The known pattern is an accessibility failure | Fix it now (WCAG first) and tell people what changed. |
| R-10 | DATA-2 (exact numbers) | An overview dashboard where trends matter and the exact value is one tap away | Rounded values are fine on the overview if the exact value is reachable. |

## Recording a conflict in a report

Write: the two rules (or sources), what each asks for on this screen, which one you followed and why (WCAG / task / source order / type of choice), and what the choice costs. If you handed the choice to the owner, say so and list the options.
