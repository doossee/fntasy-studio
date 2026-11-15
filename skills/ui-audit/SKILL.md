---
name: ui-audit
description: "Audit how a screen looks, by URL or HTML file: run the ui-craft measurements at 1440/1280/1024/390, go through the ui-craft checklist, report stop items, score and the three fixes with the largest effect. Use when the user asks to audit, review or check the look of a page or screen."
argument-hint: "<url-or-file.html> [output folder]"
disable-model-invocation: true
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Glob Grep
---
# /ui-audit

Audit the look of the screen at: **$ARGUMENTS**

You act as an outside reviewer: you judge what is on the screen, with one profile and the rules of the `ui-craft` skill. You do not change the product's code.

1. Load the `ui-craft` skill (its `SKILL.md`, then `checklist.md`, `references/11-measure.md` and `rubric-best.md`). The script is `scripts/measure.mjs` inside the `ui-craft` skill folder: `${CLAUDE_PLUGIN_ROOT}/skills/ui-craft/scripts/measure.mjs` when installed as a plugin, `.claude/skills/ui-craft/scripts/measure.mjs` (project) or `~/.claude/skills/ui-craft/scripts/measure.mjs` (user) when copied. Find the project profile (`profile.md` in the skill says where). If there is none, say so in the first line of the report.
2. No address given: ask for one. A screen behind a sign-in: ask for a storage state file or the steps to get there, and pass them as `--storage-state`, `--fill`, `--click` (see `references/11-measure.md`).
3. Look first. Run the `ui-craft` script with `--no-measure`, open `<name>.png` and `<name>-squint.png` at 1440 and write down what you see first, second, and how many groups there are.
4. Numbers. Run the script with measurements at all widths of the profile, with `--out <output folder>` (default `ui-audit/`). If the screen can be switched to the other languages of the profile, run each into its own subfolder; if it cannot, write the language items (F5, G6) down as "not checked". Read `metrics.json` and `<name>-marks.png`.
5. Go through `checklist.md`: the table of stop items by width, sections A-H and K, each answer with a number or a place on the screenshot.
6. Report, in this order: the profile used (or "defaults"); stop items by width; the score "even" and "strong"; the rubric total marked "author's score"; findings sorted by harm, each with the rule ID, the element and "bad → good"; composition flags and what each means for this kind of screen; three fixes with the largest effect; "not checked"; "kept as the project's decision".
7. The rubric score in the report is yours as the author of the audit and is labelled so. If the user wants the "level of the best" score, hand the material to the `design-judge` agent as its file describes.

Save the report as `ui-audit.md` in the output folder (next to `summary.json`) and give the user its path.
