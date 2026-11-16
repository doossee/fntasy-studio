# fantasy-studio

A catalog of three independent Claude Code plugins. Each one installs and works alone; they share
no code.

| Plugin | For | Adds |
|---|---|---|
| [`growth`](plugins/growth/README.md) | research a market and run marketing | skill `growth`: step-by-step research of competitors and markets from open data, Telegram and Central Asia first; content tools in a clone: posts, carousels, stories, reels with sound, content plan, UTM links, weekly report |
| [`design`](plugins/design/README.md) | screens that are even, strong and clear | skills `ui-craft`, `ux-clarity` with measurable rules and a measurement script; commands `ui-audit`, `ux-audit`, `design-variants`; agents `design-judge` (blind rubric score) and `ux-reviewer` (independent review of an interface change) |
| [`review`](plugins/review/README.md) | changes that can be merged without trusting the author's word | agent `code-reviewer`: acceptance criteria to `file:line` and tests, access, tenant isolation, money, migrations, secrets; runs lint, types and tests |

Русская версия: [README.ru.md](README.ru.md).

![Carousel made with the growth plugin](plugins/growth/examples/preview/carousel-first-lesson.ru.jpg)

The products in all examples are fictional.

## Install

```
/plugin marketplace add doossee/fantasy-studio
/plugin install growth@fantasy-studio
/plugin install design@fantasy-studio
/plugin install review@fantasy-studio
```

Install any of them. From a shell:
`claude plugin marketplace add doossee/fantasy-studio && claude plugin install review@fantasy-studio`.

| Plugin | Called as |
|---|---|
| `growth` | `/growth:growth`, or Claude loads the skill when you ask for research |
| `design` | skills load by themselves when you design or review a screen; `/design:ui-audit <url>`, `/design:ux-audit <url>`, `/design:design-variants <screen>`; `@agent-design:design-judge`, `@agent-design:ux-reviewer` |
| `review` | `@agent-review:code-reviewer` |

To try a local checkout: `claude plugin marketplace add /path/to/fantasy-studio`, then install as above.

## The two reviewers

`ux-reviewer` (plugin `design`) and `code-reviewer` (plugin `review`) work the same way: they are not
given the author's conclusions, they read and run but do not edit, every finding has evidence, and the
answer starts with a verdict. Both read the project's own profile, `.claude/review-profile.md`: who uses
the product and what for, risky actions, commands, deliberate decisions. The format is in the plugins'
READMEs. Nothing about a specific product is built into them.

## What changed since 0.1

- The repository and catalog are called `fantasy-studio` (were `growth-studio`). The old address redirects.
- Three plugins instead of two, each in its own folder: `growth` (was `growth-studio`), `design` (was `design-skills`), `review` (new).
- New agents: `ux-reviewer` in `design`, `code-reviewer` in `review`.
- The growth tools moved to `plugins/growth/`: run `npm install` and `npm run …` there.
- All plugins are version 0.2.0.

## Layout

```
.claude-plugin/marketplace.json   the catalog: three plugins, each with its own source
plugins/growth/    skill growth, tools/, profiles/example, examples/, docs/, scripts/, package.json
plugins/design/    skills ui-craft, ux-clarity, ui-audit, ux-audit, design-variants; agents design-judge, ux-reviewer
plugins/review/    agent code-reviewer; references/review-guide.md
docs/tasks/        task files of this repository
```

## Licence

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE). The Inter font in
`plugins/growth/profiles/example/fonts/` keeps its own licence, SIL Open Font License 1.1.
