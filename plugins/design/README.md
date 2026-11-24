# design — a plugin of the fntasy studio catalog

The plugin is being rewritten from scratch, from new materials. The first part is ready:

| Adds | Called as |
|---|---|
| skill `ux-laws` | loads by itself when you design, build or review a screen or a flow; or `/design:ux-laws` |

Русская версия: [README.ru.md](README.ru.md). Catalog: [fntasy studio](../../README.md).

## Install

```
/plugin marketplace add doossee/fntasy-studio
/plugin install design@fntasy-studio
```

Without the plugin system: copy `plugins/design/skills/ux-laws` into `.claude/skills/` of a project or `~/.claude/skills/`.

## ux-laws

30 rules for interfaces, one for each principle collected on [Laws of UX](https://lawsofux.com/) by Jon Yablonski:

- **Perception** — Prägnanz, proximity, similarity, common region, uniform connectedness;
- **Attention and memory** — cognitive load, working memory, Miller's law, chunking, selective attention, Von Restorff effect, serial position effect, Zeigarnik effect, peak-end rule;
- **Action and decision** — Fitts's law, Doherty threshold, Hick's law, choice overload, Pareto principle, goal-gradient effect, flow, Parkinson's law;
- **Expectations** — Jakob's law, mental model, paradox of the active user, Tesler's law, Postel's law, Occam's razor, aesthetic-usability effect, cognitive bias.

Each rule says what to do on a screen, why, how to check it (a number or a yes/no on a screenshot or a walk through the task), bad → good, where it stops applying, and its sources. Every rule also says how strong its ground is (research, research applied to screens by inference, disputed, heuristic, analogy). Thresholds that are the skill's own choice are marked "(ours)" and listed separately, so a project can change them. The most doubtful claims were checked against the research; the list of what was checked and what changed is in `skills/ux-laws/references/sources.md`.

Example:

```
Review the checkout at http://localhost:3000/cart against ux-laws: walk "pay for the cart" on a phone, then go through all 30 rules.
```

**Licence of the source.** The Laws of UX site is licensed CC BY-NC-ND 4.0. Its texts are not copied, translated or paraphrased here: the rules are our own wording; each one names the principle and the research it comes from (`skills/ux-laws/references/sources.md`). The skill has no links on purpose: an agent does not open them, and everything a rule needs is in its files.

## What changed since 0.3.0

- Everything of 0.3.0 was removed: skill `design-review`, command `audit`, agent `design-reviewer`, the review gate hook, the measurement scripts and checklists.
- New: skill `ux-laws`.

Licence: Apache-2.0, see [LICENSE](../../LICENSE).
