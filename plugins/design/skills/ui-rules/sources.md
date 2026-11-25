# Sources

Every rule in this skill is written in our own words. Sources are named, not linked: the skill must work without opening anything, and links go stale. Facts, numbers and research results are reported with their source; no source text, tables, images or examples are copied, translated or closely paraphrased.

Read in November 2026 unless stated otherwise.

## Order of sources

0. **WCAG 2.2** (W3C Recommendation, December 2024) stands above all other sources. Accessibility is a requirement.

Then, by the kind of question:

| Question | First | Then |
| --- | --- | --- |
| Platform convention | Apple Human Interface Guidelines (iOS, iPadOS, macOS); Material Design 3 (Android) | NN/g |
| Human behaviour, usability | Nielsen Norman Group | Baymard Institute → Interaction Design Foundation (as a pointer to the research it names) → Laws of UX → Figma Resource Library |
| E-commerce (cart, checkout, filters, product pages) | Baymard Institute | NN/g |
| How products usually do it | Mobbin, Component Gallery | Apple HIG, Material 3 |

**Primary sources:** WCAG 2.2; Nielsen Norman Group; Baymard Institute; Interaction Design Foundation; Laws of UX; Figma Resource Library; Mobbin and Component Gallery; Apple Human Interface Guidelines; Material Design 3.

**Secondary sources:** design principles of public design systems and services (GOV.UK, NHS, U.S. Web Design System, Atlassian, GitLab Pajamas, IBM, Shopify Polaris, Microsoft Fluent, SAP Fiori, Salesforce Lightning; read through principles.design and their own pages); "58 Rules for Stunning and Effective User Interface Design" (Taras Bakusevych, UX Collective, 2024); UX Pilot, "Web design principles" (2025); UX Hints; Untools; Core Web Vitals (web.dev); IETF RFC 9413.

## Primary sources: what was used

| Source | What was read | Terms and how we use it |
| --- | --- | --- |
| WCAG 2.2 | Success criteria 1.4.1, 1.4.3, 1.4.4, 1.4.8, 1.4.10, 1.4.11, 1.4.12, 2.2.1, 2.3.3, 2.4.7, 2.4.11, 2.5.5, 2.5.8, 3.3.1, 3.3.7, 3.3.8 (through a summary of the Recommendation; the figures match the published text) | W3C standard; criteria are named and their thresholds restated |
| Nielsen Norman Group | About 40 articles: heuristics, visual hierarchy, proximity, F-pattern, banner blindness, aesthetic-usability, cognitive load, progressive disclosure, consistency, forms, placeholders, form errors, error messages, required fields, confirmation dialogs, user control, defaults, recognition and recall, plain language, hamburger menus, mobile navigation, touch targets, mobile tables, cards, icons, breadcrumbs, three-click rule, onboarding, tooltips, response times, progress indicators, skeleton screens, empty states, indicators and notifications, button states, animation, deceptive patterns, lower-literacy users, number of test users | Copyrighted; findings and numbers are cited with the article name and year, in our words. Each article's date is noted where it matters: some are from 1993–2006 |
| Baymard Institute | About 20 free research articles: checkout fields, inline validation, adaptive error messages, required and optional fields, guest checkout, address lookup, card fields, touch keyboards, cart abandonment, navigation, autocomplete, filters, product pages, thumbnails, hover menus, accessibility benchmark, deceptive patterns | Terms restrict reuse of their content. By the owner's decision, we write our own rules and cite Baymard's findings as facts with attribution; no text, tables or examples are carried over. E-commerce, US and European users |
| Interaction Design Foundation | 22 topic pages and articles | Terms forbid copying and derivative works. Used only to find the original research it cites, which we name directly (for example Hick 1952, Seow 2005, Moshagen & Thielsch 2010, Sonderegger & Sauer 2010) |
| Laws of UX (Jon Yablonski) | All 30 principles and their origins | CC BY-NC-ND 4.0: no text copied or translated; principles applied in our own words |
| Figma Resource Library | 36 articles: UI principles, button states, visual hierarchy, Gestalt, Fitts, consistency, simplicity, constraints, accessibility, ethics, interaction design, HCI, aesthetics, graphic design, motion, tokens, user-centred questions, golden ratio, user flow, wireframing, prototyping, UX validation, responsive and mobile design, structure, hamburger menu, grids, layouts, calls to action, pricing pages, typography, kerning, font pairing, colour theory, palettes, colour symbolism | Ideas only. Many numbers in these articles have no source and several articles contradict each other; such numbers are not used or are marked as disputed |
| Mobbin, Component Gallery | Product overviews; six Component Gallery pages (button, text input, tabs, modal, toast, empty state) | Used as evidence of conventions (what most products and design systems do). Screenshots and examples are not reproduced |
| Apple Human Interface Guidelines | Accessibility, layout, typography, colour, buttons, tab bars, alerts, text fields, onboarding, motion | Copyright Apple; guidance restated in our words with platform scope |
| Material Design 3 and Android Developers | Accessibility (touch targets, contrast), typography contrast, buttons, navigation bar, dialogs, snackbar, motion overview, window size classes | Guidance restated in our words |

## How sources appear in the rules

Since version 0.5.0 the rule files name only what a reviewer can cite in a finding: a WCAG criterion or a platform guideline, in the **Thresholds** line. Authors, years, study names and study figures were taken out of the rules: they are not needed to check a screen, and a reviewer (or a model) that learns to quote them tends to quote them wrongly. They are kept here, for people who want to check where a rule comes from.

## Where each rule comes from

| Rules | Built on |
| --- | --- |
| LAYOUT-1..5 | Gestalt perception research; NN/g (visual hierarchy, proximity, F-shaped reading, cognitive load); Apple HIG (layout, one or two prominent buttons); Laws of UX (Prägnanz, proximity, common region, uniform connectedness, Von Restorff, Occam's razor); Figma Resource Library (Gestalt, simplicity, grids); public design systems (spacing scales) |
| MEM-1..4 | Cognitive load theory; working-memory research (an early estimate of about seven items, later estimates near four chunks); chunking; selective attention and banner blindness (NN/g eyetracking); WCAG 3.3.7; Laws of UX (cognitive load, working memory, Miller's law, chunking, selective attention) |
| ACT-1..10 | Movement-time research (Fitts) and NN/g touch-target guidance; WCAG 2.5.5, 2.5.8; Apple HIG; Material 3; response-time limits (NN/g); choice-reaction research (Hick and Hyman) and a meta-analysis of choice overload; goal-gradient and endowed-progress studies; NN/g and Baymard on forms and defaults; Baymard on input formats and keyboards; IETF RFC 9413 on input robustness; flow research; research on resuming interrupted tasks (Ovsiankina) and a 2025 meta-analysis that did not confirm the Zeigarnik memory effect; the peak-end rule; Laws of UX (Fitts, Doherty, Hick, choice overload, Pareto, goal-gradient, Tesler, Parkinson, Postel, flow, Zeigarnik, peak-end, serial position) |
| EXP-1..8 | NN/g (consistency and standards, mental models, hamburger menus, breadcrumbs, onboarding, tooltips, icon usability); research on new users skipping manuals (Carroll and Rosson); Apple HIG (native controls, onboarding, tab bars, icons, right-to-left); Material 3 (navigation bar); Mobbin and Component Gallery as evidence of conventions; for EXP-8, studies of older and younger adults (icon interpretation with and without labels, gestures without touchscreen experience, older smartphone users' difficulties, age versus experience as predictors of technology use), NN/g articles on teenagers, young adults and weak clickability signifiers; Laws of UX (Jakob's law, mental model, similarity, paradox of the active user); Conway's law; WCAG 1.4.11, 4.1.2 |
| STATE-1..5 | WCAG 1.4.1, 1.4.11, 2.2.1, 2.4.7, 2.4.11, 3.3.1, 3.3.2, 4.1.3; NN/g (button states, empty states, skeleton screens, form errors, placeholders, required fields, confirmation dialogs, indicators and notifications); Baymard (inline validation, error messages, accessibility benchmark); Apple HIG (buttons, alerts); Material 3 (dialogs, snackbars, banners); Figma Resource Library (button states, UX validation) |
| TEXT-1..5 | WCAG 1.4.4, 1.4.8, 1.4.10, 1.4.12, 3.1.1, 3.1.2; Apple HIG (typography, right-to-left); NN/g (plain language, lower-literacy users); internationalisation practice of platforms and design systems |
| COLOR-1..4 | WCAG 1.4.1, 1.4.3, 1.4.11; Apple HIG (colour, dark mode, increased contrast); Material 3 (colour, dark theme); design-token practice |
| PLAT-1..3 | WCAG 1.4.10, 1.4.13, 2.1.1, 2.5.1, 2.5.7; Apple HIG (layout, gestures); Material 3 and Android (window size classes); Core Web Vitals (web.dev) |
| MOTION-1 | WCAG 2.2.2, 2.3.1, 2.3.3; Apple HIG (motion, reduce motion); Material 3 (motion); NN/g (animation, response times) |
| DATA-1..2 | NN/g (mobile tables, data tables); WCAG 1.3.1, 1.4.1, 1.4.10; data-table guidance of public design systems |
| SEARCH-1..2 | Baymard (search, autocomplete, filters, sorting); NN/g (search); WCAG 2.1.1, 2.5.3, 4.1.3 |
| HONEST-1..4 | NN/g (deceptive patterns, aesthetic-usability, number of test users); Baymard (checkout abandonment, deceptive patterns in e-commerce); research on judgement under uncertainty (Tversky and Kahneman); prevalence studies of deceptive patterns on about 11,000 shopping sites (2019) and in 240 apps (2020); Kurosu and Kashimura (1995) and Tractinsky (1997) on look and judged ease; Apple HIG (permissions); Figma Resource Library (design ethics); Untools (second-order thinking); UX Hints (questionnaires) |

The groups added in 0.5.0 (EXP-7, STATE-5, TEXT-5, COLOR-4, DATA, SEARCH) rest partly on general practice of platforms and design systems, written without a separate source read for every sentence; their Evidence lines say *Practice* where that is the case.

## Evidence notes for people

Figures that used to stand in the rules. They are recorded with their source for people checking the skill; a reviewer does not cite them in findings.

- Forms that followed form-design guidelines were submitted without errors at the first try 78% of the time against 42% for forms that broke them (Seckler and others, CHI 2014, as reported by NN/g) — STATE-3.
- Hidden navigation on desktop was used in 27% of cases against 48% for visible navigation; on phones 57% against 86% for a combined design (NN/g, 179 people, six sites, 2016) — EXP-6.
- In banner-blindness eyetracking, one participant gave the right-hand column 1 of 148 fixations (NN/g, 2018) — MEM-4.
- Rewriting a site in plain language raised task success for lower-literacy users from 46% to 82%, and for others from 68% to 93% (NN/g, 50 people) — TEXT-4.
- Separate first- and last-name fields made 42% of test participants type their full name into the first field at least once; the average checkout asks for about 11 fields where about 8 are needed (Baymard) — ACT-6.
- 48% of tested e-commerce sites lacked a consistently visible focus indicator (Baymard accessibility benchmark, 2021) — STATE-1.
- Extra costs revealed late were the most common design-related reason to abandon a checkout, about 40% of those who abandoned (Baymard surveys of US shoppers) — HONEST-1.
- Deceptive patterns on more than 10% of about 11,000 shopping sites (Mathur and others, 2019) and in 95% of 240 popular free Android apps (Di Geronimo and others, 2020) — HONEST-1.
- Fingertips are about 1.6–2 cm wide; targets of at least 1 × 1 cm recommended (NN/g, citing Parhi, Karlson and Bederson 2006) — ACT-1.

- Adults 65+ interpreted 38% of unlabelled mobile icons correctly against 52% at ages 20–39; with labels 71% against 86% (Leung, McGrenere and Graf, Behaviour & Information Technology, 2011) — EXP-7, EXP-8.
- In 1,204 adults aged 18–91, anxiety, self-efficacy, abilities and education explained only part of the age effect on technology use (Czaja and others, Psychology and Aging, 2006) — EXP-8.
- Older adults new to touchscreens would have solved about 70% of tap tasks, 52% of swipe, 20% of pinch and none of long-press (Leitão and Silva, about 2013) — EXP-8, PLAT-2.
- Weak clickability signifiers cost about 22% more time (NN/g eyetracking, 71 users, 2017) — EXP-8, STATE-1.
- Teenagers and young adults read less, click first and overrate their skill (NN/g studies of teens 2019 and young adults 2016) — EXP-8.
- Colour meanings shift with culture: on stock charts green means "up" in the US while red means "up" in South Korea (Choi and others, 2019) — COLOR-2, EXP-8.

These figures were read through the sources' own pages and summaries, not always the original papers.

## Thresholds checked against the primary pages

Checked 24.11.2026:
- WCAG 2.2 (W3C Recommendation page): 1.4.1, 1.4.3, 1.4.4, 1.4.8, 1.4.10, 1.4.11, 1.4.12, 1.4.13, 2.2.2, 2.3.3, 2.4.7, 2.4.11, 2.5.5, 2.5.8, 3.3.1, 3.3.7, 3.3.8 — values and levels as in the rules. The other criteria named in the rules (1.3.1, 2.1.1, 2.2.1, 2.3.1, 2.5.1, 2.5.3, 2.5.7, 3.1.1, 3.1.2, 3.3.2, 4.1.2, 4.1.3) are named by number and level only and were not checked separately in this pass.
- Core Web Vitals (web.dev): LCP ≤ 2.5 s (poor > 4 s), INP ≤ 200 ms (poor > 500 ms), CLS ≤ 0.1 (poor > 0.25), at the 75th percentile.
- Android developers: touch targets at least 48 × 48 dp; window size classes compact < 600, medium 600–839, expanded 840–1199, large 1200–1599, extra-large ≥ 1600 dp; compact height < 480 dp. Material 3 (structure page, rendered earlier): targets separated by 8 dp or more.
- Apple HIG: 44 × 44 pt hit target, iOS body 17 pt (minimum 11 pt), macOS 13 pt (minimum 10 pt) — from the pages rendered when the skill was first written; the pages could not be fetched again in this pass.

## Numbers chosen by this skill

Numbers tagged `profile:` in the rules are team choices that make a rule checkable. Their defaults are listed in `profile.md`; a project changes them in its profile.

## Former skill ux-laws

This skill replaces `ux-laws` (30 rules on the principles of Laws of UX). Where a rule replaces an old one, its Sources line says "(former LAW-…)"; the full map is in `mapping.md`.
