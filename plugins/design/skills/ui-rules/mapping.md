# Mapping

Where every input went, so that nothing is lost and nothing is counted twice.

## Former `ux-laws` rules

The skill `ux-laws` (30 rules, one per principle on Laws of UX) is replaced by this skill. Its research corrections are kept in the rules' wording and in `disputed.md`; the names of the principles are not used in the rules any more (version 0.5.0), because a famous name is not evidence and is easy to misquote.

| Former rule | Now in |
| --- | --- |
| LAW-ACTIVE-USER | EXP-5 |
| LAW-AESTHETIC-USABILITY | HONEST-4 |
| LAW-CHOICE-OVERLOAD | ACT-3 |
| LAW-CHUNKING | MEM-3 |
| LAW-COGNITIVE-BIAS | HONEST-1 |
| LAW-COGNITIVE-LOAD | MEM-1 |
| LAW-COMMON-REGION | LAYOUT-2 |
| LAW-CONNECTEDNESS | LAYOUT-2 |
| LAW-DOHERTY | ACT-2 |
| LAW-FITTS | ACT-1 |
| LAW-FLOW | ACT-8 |
| LAW-GOAL-GRADIENT | ACT-5 |
| LAW-HICK | ACT-3 |
| LAW-JAKOB | EXP-1 |
| LAW-MENTAL-MODEL | EXP-2 |
| LAW-MILLER | MEM-2 |
| LAW-OCCAM | LAYOUT-1 |
| LAW-PARETO | ACT-4 |
| LAW-PARKINSON | ACT-6 |
| LAW-PEAK-END | ACT-10 |
| LAW-POSTEL | ACT-7 |
| LAW-PRAGNANZ | LAYOUT-1 |
| LAW-PROXIMITY | LAYOUT-2 |
| LAW-SELECTIVE-ATTENTION | MEM-4 |
| LAW-SERIAL-POSITION | ACT-4 |
| LAW-SIMILARITY | EXP-3 |
| LAW-TESLER | ACT-6 |
| LAW-VON-RESTORFF | LAYOUT-3 |
| LAW-WORKING-MEMORY | MEM-2 |
| LAW-ZEIGARNIK | ACT-9 |

## Version 0.4.0 → 0.5.0

| 0.4.0 | 0.5.0 |
| --- | --- |
| MEM-3 (about four unseen items) | merged into MEM-2 |
| MEM-4 (chunks) | MEM-3 |
| MEM-5 (messages where the eye is) | MEM-4 |
| MEM-6 (first and last positions) | merged into ACT-4 |
| — | new: EXP-7 icons, STATE-5 message channels, TEXT-5 languages and formats, COLOR-4 dark theme, DATA-1 tables, DATA-2 numbers and dates, SEARCH-1 search, SEARCH-2 filters and sorting |

## Nielsen's 10 usability heuristics

| Heuristic | Covered by |
| --- | --- |
| 1. Visibility of system status | ACT-2, STATE-1, STATE-2, STATE-5, ACT-5, EXP-6, SEARCH-2 |
| 2. Match between the system and the real world | EXP-2, TEXT-4 |
| 3. User control and freedom | STATE-4, ACT-9, EXP-6 |
| 4. Consistency and standards | EXP-1, EXP-3, EXP-7 |
| 5. Error prevention | STATE-3, STATE-4, ACT-1, ACT-7, HONEST-1 |
| 6. Recognition rather than recall | MEM-2, EXP-5, EXP-7 |
| 7. Flexibility and efficiency of use | ACT-4, ACT-6, SEARCH-1, SEARCH-2 |
| 8. Aesthetic and minimalist design | LAYOUT-1, LAYOUT-3, MEM-1 |
| 9. Help users recognize, diagnose and recover from errors | STATE-3, ACT-10 |
| 10. Help and documentation | EXP-5 |

## Sources → groups

| Source | Main contribution |
| --- | --- |
| WCAG 2.2 | Contrast in every theme (COLOR-1, COLOR-4), not colour alone (COLOR-2, DATA-2), text resize, spacing and reflow (TEXT-3, PLAT-1), targets (ACT-1), focus (STATE-1), errors and redundant entry (STATE-3, MEM-2), status messages and timing (STATE-5, SEARCH-1/2), keyboard and gestures (PLAT-2), table structure (DATA-1), names of icon buttons (EXP-7), language of parts (TEXT-5), motion (MOTION-1) |
| Nielsen Norman Group | Most behaviour rules: icon usability (EXP-7), mobile tables (DATA-1), search (SEARCH-1), indicators and notifications (STATE-5), response times (ACT-2), forms and errors (STATE-3), confirmation and undo (STATE-4), navigation (EXP-6), onboarding and tooltips (EXP-5), empty states (STATE-2), banner blindness (MEM-4), progressive disclosure (MEM-1), deceptive patterns (HONEST-1), plain language (TEXT-4), aesthetic-usability (HONEST-4) |
| Baymard Institute | Search, autocomplete and filters (SEARCH-1, SEARCH-2), checkout fields and address lookup (ACT-6), input formats and keyboards (ACT-7), adaptive error messages and required/optional marking (STATE-3), current-location highlight and hover delay (EXP-6, conflicts S-9), extra costs and forced accounts (HONEST-1) |
| Interaction Design Foundation | Pointers to research named directly in the rules (Hick and Seow, aesthetics studies, heuristic-evaluation accuracy) |
| Laws of UX | The 30 principles behind LAYOUT, MEM, ACT, EXP and HONEST rules (see the table above) |
| Figma Resource Library | Button states (STATE-1), UX validation stress tests (STATE-2), motion purpose (MOTION-1), ethics (HONEST-3); several articles feed `disputed.md` |
| Mobbin, Component Gallery | Evidence of conventions (EXP-1) |
| Apple HIG | Dark mode and colour variants (COLOR-4), icons (EXP-7), right-to-left layout (TEXT-5), type sizes and Dynamic Type (TEXT-1..3), buttons and roles (STATE-1, LAYOUT-3), alerts (STATE-4), onboarding and permissions (EXP-5, HONEST-3), gestures (PLAT-2), motion (MOTION-1) |
| Material 3 | Snackbars and banners (STATE-5), dark theme (COLOR-4), touch targets and spacing (ACT-1), window size classes (PLAT-1), contrast of navigation icons (COLOR-1), dialogs with two actions (STATE-4) |
| Design-system principles (GOV.UK, NHS, USWDS, Atlassian, GitLab, IBM, Polaris, Fluent, SAP, Salesforce) | Review-question format; consistent-not-uniform (EXP-3); save and return (ACT-9); next step for every state and room for translation (STATE-2); conflicts C-2, C-4, C-5 |
| "58 rules" (Bakusevych) | Confirmations of existing rules; disputed items (golden ratio, 60-30-10, F/Z, onboarding, variable rewards); cases 1–3 |
| UX Pilot | Grid and spacing numbers checked against standards; F/Z and unsourced numbers in `disputed.md` |
| UX Hints | Baby duck syndrome (EXP-4), Conway's law (EXP-2), law of the hammer (`method.md`), SUS/SEQ (HONEST-4, `method.md`) |
| Untools | Ladder of inference, five whys, second-order thinking, pre-mortem, hard-choice model (`method.md`, `conflicts.md`) |
