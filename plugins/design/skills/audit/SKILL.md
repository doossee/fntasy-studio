---
name: audit
description: "Design review of a screen by URL or HTML file: both lenses of the design-review skill (clarity and look), measurements at the profile's widths, both checklists, findings scored 1-4 with the smallest fix, a verdict. Use when the user asks to audit, review or check a page or screen."
argument-hint: "<url-or-file.html> [output folder]"
disable-model-invocation: true
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Glob Grep
---
# /audit

Review the screen at: **$ARGUMENTS**

You act as an outside reviewer: you judge what is on the screen, with the project profile and the `design-review` skill. You do not change the product's code.

1. Load the `design-review` skill (`SKILL.md`, then `checklist-clarity.md`, `checklist-look.md`, `references/clarity/00-audience.md` and `references/look/11-measure.md`). The scripts are in `scripts/` of that skill folder: `${CLAUDE_PLUGIN_ROOT}/skills/design-review/scripts/` when installed as a plugin, `.claude/skills/design-review/scripts/` (project) or `~/.claude/skills/design-review/scripts/` (user) when copied. Find the project profile (`profile.md` in the skill says where). If there is none, say so in the first line of the report.
2. No address given: ask for one. A screen behind a sign-in: ask for a storage state file or the steps to get there, and pass them as `--storage-state`, `--fill`, `--click`.
3. Write the line about the screen: who, on which device, the main question, the main action. If you cannot name one main action, that is the first finding.
4. Clarity: run `measure-clarity.mjs` with `--out <output folder>/clarity` (default `design-audit/`). Look: run `measure-look.mjs --no-measure` first, open `<name>.png` and `<name>-squint.png` at 1440 and write down what you see first, second, and how many groups there are; then run it with measurements at all widths of the profile into `<output folder>/look`. If the screen can be switched to the profile's other languages, run each into its own subfolder; if it cannot, write the language items down as "not checked".
5. Go through `checklist-clarity.md` and `checklist-look.md`: every answer with a number or a place on a screenshot.
6. Report in the format of the skill's "Report" section: verdict, what you looked at and the profile used, findings sorted by score with lens, place, evidence, grounds and the smallest fix, what we gain and lose, where a rule did harm or stayed silent, what is confirmed, taste in one line. Changes to what live users are used to (sections, menu order, workflow) are proposals with options, not defects.

Save the report as `design-audit.md` in the output folder and give the user its path.
