# Sources

Every rule in this skill is written in our own words. Sources are named, not linked: the skill must work without opening anything, and links go stale. Facts, numbers and research results are reported with their source; no source text, tables, images or examples are copied, translated or closely paraphrased.

Read 24.11.2026 unless stated otherwise.

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

## Research named in the rules

Fitts 1954; Hick 1952 and Hyman; Seow 2005; Miller 1956; Cowan 2001 ("The magical number 4", Behavioral and Brain Sciences); Sweller 1988; Kurosu & Kashimura 1995 (CHI); Tractinsky 1997 (CHI); Moshagen & Thielsch 2010; Sonderegger & Sauer 2010; Doherty & Thadani 1982 (IBM Systems Journal); Csíkszentmihályi 1975; Hull 1932; Kivetz, Urminsky & Zheng 2006; Nunes & Drèze 2006 (Journal of Consumer Research); Craik 1943; Carroll & Rosson 1987; Kahneman, Fredrickson, Schreiber & Redelmeier 1993; Tversky & Kahneman 1974 (Science); von Restorff 1933; Zeigarnik 1927 and Ovsiankina 1928; Ghibellini & Meier 2025 (meta-analysis); Scheibehenne, Greifeneder & Todd 2010 (meta-analysis); Ebbinghaus; Wertheimer and the Gestalt school; Parhi, Karlson & Bederson 2006; Seckler and others 2014 (CHI, forms); Joachims and others 2005 (defaults in search results); Mathur and others 2019 (deceptive patterns on about 11,000 shopping sites); Di Geronimo and others 2020 (deceptive patterns in 240 apps); Brooke 1986 (SUS); Nielsen & Molich 1990 (heuristic evaluation); Conway 1967; Postel and RFC 9413 (2023).

Research details were checked through abstracts, the papers' own pages and reviews of them, not always the full papers. Where a rule depends on a contested result, its **Evidence** line says so.

## Numbers chosen by this skill

Numbers marked "(ours)" in the rules are not in the sources; they make a rule checkable. A project may change them in its profile. The full list is in the rule files; search for "(ours)".

## Former skill ux-laws

This skill replaces `ux-laws` (30 rules on the principles of Laws of UX). Where a rule replaces an old one, its Sources line says "(former LAW-…)"; the full map is in `mapping.md`.
