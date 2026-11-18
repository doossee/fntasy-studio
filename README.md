<!-- Logo: the owner's fntasy studio logo goes here (file pending). -->

# fntasy studio

A catalog of three independent Claude Code plugins. Each one installs and works alone; they share
no code.

| Plugin | For | Adds |
|---|---|---|
| [`growth`](plugins/growth/README.md) | research a market and run marketing | skill `growth`: step-by-step research of competitors and markets from open data, Telegram and Central Asia first; content tools in a clone: posts, carousels, stories, reels with sound, content plan, UTM links, weekly report |
| [`design`](plugins/design/README.md) | an independent design review of any interface | skill `design-review` (two lenses: clarity and look) with measurable rules, checklists and measurement scripts; command `audit`; agent `design-reviewer`; an optional Stop hook that asks for the review before work with a changed UI is handed over |
| [`review`](plugins/review/README.md) | changes that can be merged without trusting the author's word | agent `code-reviewer`: acceptance criteria to `file:line` and tests, access, tenant isolation, money, migrations, secrets; runs lint, types and tests |

Русская версия: [README.ru.md](README.ru.md).

![Carousel made with the growth plugin](plugins/growth/examples/preview/carousel-first-lesson.ru.jpg)

The products in all examples are fictional.

## Install

```
/plugin marketplace add doossee/fntasy-studio
/plugin install growth@fntasy-studio
/plugin install design@fntasy-studio
/plugin install review@fntasy-studio
```

Install any of them. From a shell:
`claude plugin marketplace add doossee/fntasy-studio && claude plugin install review@fntasy-studio`.

| Plugin | Called as |
|---|---|
| `growth` | `/growth:growth`, or Claude loads the skill when you ask for research |
| `design` | the skill loads by itself when you ask to review or check a screen; `/design:audit <url>`; `@agent-design:design-reviewer`; the review gate is off until `review-gate: true` in `design-profile.md` |
| `review` | `@agent-review:code-reviewer` |

To try a local checkout: `claude plugin marketplace add /path/to/fntasy-studio`, then install as above.

## The two reviewers

`design-reviewer` (plugin `design`) and `code-reviewer` (plugin `review`) work the same way: they are not
given the author's conclusions, they read and run but do not edit, every finding has evidence, and the
answer starts with a verdict. Both read the project's own profile, `.claude/review-profile.md`: who uses
the product and what for, risky actions, commands, deliberate decisions. The format is in the plugins'
READMEs. Nothing about a specific product is built into them.

## What changed in design 0.3.0

- `design` is now review only: designs are drawn any way you like, the plugin checks them. Skills `ui-craft` and `ux-clarity` became one skill, `design-review`, with two lenses; agents `ux-reviewer`, `ui-reviewer` and `design-judge` became one agent, `design-reviewer`; commands `ui-audit`, `ux-audit` and `design-variants` became one command, `audit`. Freedom mode and the "level of the best" rubric were removed.
- New: an optional Stop hook, `design-review-gate`, that asks for the review before work with a changed UI is handed over.

## What changed in design 0.2.1

- New agent `ui-reviewer` in `design`: an independent review of how a change looks, next to `ux-reviewer`.

## What changed since 0.1

- The repository and catalog are called `fntasy-studio` (were `growth-studio`). The old address redirects.
- Three plugins instead of two, each in its own folder: `growth` (was `growth-studio`), `design` (was `design-skills`), `review` (new).
- New agents: `ux-reviewer` in `design`, `code-reviewer` in `review`.
- The growth tools moved to `plugins/growth/`: run `npm install` and `npm run …` there.
- All plugins are version 0.2.0.

## Layout

```
.claude-plugin/marketplace.json   the catalog: three plugins, each with its own source
plugins/growth/    skill growth, tools/, profiles/example, examples/, docs/, scripts/, package.json
plugins/design/    skills design-review, audit; agent design-reviewer; hooks/ (optional review gate)
plugins/review/    agent code-reviewer; references/review-guide.md
docs/tasks/        task files of this repository
```

## Licence

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE). The Inter font in
`plugins/growth/profiles/example/fonts/` keeps its own licence, SIL Open Font License 1.1.
