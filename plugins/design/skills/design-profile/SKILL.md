---
name: design-profile
description: "Creates or updates a project's design profile (.claude/design-profile.md) that the design-reviewer, designer and design-judge agents and the ui-rules and ui-create skills read: who the users are, their tasks and experience, devices, languages, accessibility target, platforms and tokens, brand, taste, team principles, decisions taken and thresholds. Finds what it can in the codebase (design tokens, Tailwind or CSS variables, fonts, locales, breakpoints, themes, components, README) and asks the person only what code cannot tell. Use when someone sets up the design plugin in a project, asks for a design profile, or a design review or design task finds no profile."
---
# design-profile

Write the project's design profile: the file that tells the design agents who the product is for and what is already decided. A good profile turns generic advice into advice for this product; a wrong one is worse than none, so everything in it is either found in the project, said by the person, or marked **assumed**.

The format is `profile.md` of the `ui-rules` skill in this plugin; read it first and follow its sections and its example. If `ui-rules` is not available, use the section list below.

## Steps

### 1. Look for an existing profile

`.claude/design-profile.md`, a "Design" section of `.claude/review-profile.md`, `docs/design-profile.md`. If one exists, update it: keep what the team wrote, add what is missing, and show the changes instead of rewriting.

### 2. Find what the code can tell (and say where you found it)

Read, without changing anything:

- **Product:** `README*`, `package.json` (name, description), landing or marketing pages in the repo.
- **Platforms:** web framework (Next, Vite, Rails views…), mobile (React Native, Flutter, Swift, Kotlin), desktop.
- **Design tokens:** Tailwind config (`theme.extend` colours, font sizes, spacing, radius), CSS custom properties (`:root { --… }`), design-token files (`tokens.json`, Style Dictionary), theme files of a component library (MUI, Chakra, Ant, shadcn), SCSS variables.
- **Typefaces:** `@font-face`, font imports, `font-family` stacks; note whether licences are present.
- **Themes:** `prefers-color-scheme`, `dark:` classes, theme toggles.
- **Breakpoints and devices:** media queries, Tailwind screens, viewport meta, mobile-first or desktop-first CSS.
- **Languages and locales:** `locales/`, `i18n/`, `messages/*.json`, `lang` attributes, date and currency formatting code; the longest language by average string length.
- **Components:** the component library or the project's own `components/` folder — buttons, inputs, dialogs, toasts — to record what exists.
- **Accessibility:** lint rules (jsx-a11y), axe or Lighthouse in CI, statements in docs.
- **Decisions already taken:** ADRs, `docs/decisions`, comments that explain a design choice.

Write each found fact with its source path (`tailwind.config.ts: primary #1B3A8C`). Do not guess users or tasks from code.

### 3. Ask the person what code cannot tell

Ask in one short message, in their language, numbered so they can answer briefly. Offer a default for each so "default" is a valid answer:

1. Who uses the product: roles, and for each the 3–5 most frequent tasks and how often.
2. Which actions are risky (money, data, sending to others, deleting).
3. The audience's experience: age range, how confident with apps, which apps they use every day (messengers, banks, marketplaces, state services of their country).
4. Devices and conditions: phone or desktop first, one hand, outdoors, slow networks.
5. Languages that must work, including right-to-left.
6. Accessibility target (default: WCAG 2.2 AA).
7. Brand: what is fixed (logo, hues, typefaces) and what may change.
8. Taste on five axes, each 1–5 — calm ↔ expressive, dense ↔ spacious, strict ↔ playful, neutral ↔ brand-led, conventional ↔ novel — and 2–3 reference products whose principles they like (default: the default taste of `ui-create`).
9. Team principles in their own words, and decisions already taken that reviewers should not flag.
10. Thresholds they want to change from the defaults (target size, body size, number of actions on the first screen…).

If the person cannot answer now, write the profile with what is known and mark the rest **unknown** or **assumed**; never invent users, tasks or numbers.

### 4. Write the profile

Write `.claude/design-profile.md` (if writing there is not allowed, `docs/design-profile.md`; the agents read both) in the sections of `ui-rules/profile.md`:

Product · People and tasks · Audience experience · Devices and conditions · Languages and locales · Accessibility target · Platforms and design system · Brand · Taste · Team principles · Decisions already taken · Thresholds · Out of scope.

- Put the found tokens into "Platforms and design system" as a short table (role, light, dark, source).
- Mark every line as **found** (with the path), **told** (by the person) or **assumed**.
- Keep it short: a profile someone will read in two minutes beats a complete one nobody reads.

### 5. Check and hand over

- Check the tokens you recorded against WCAG contrast where pairs are known (text on background, button label on button); list failures as open issues, not as decisions.
- Show the person the profile and the list of **assumed** and **unknown** lines, and ask them to confirm or correct those.
- Remind them: the profile describes their product, so it belongs in their project. If their repository is public, it should contain nothing confidential (customer names, internal plans).

## Limits

- The profile does not replace research with users: tasks and audience come from the people who know them, and are worth checking with real users (`ui-rules/user-test.md`).
- Do not change the project's code or tokens while profiling; record what is there.
