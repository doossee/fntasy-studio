---
name: ux-audit
description: "Audit the clarity of a screen, by URL or HTML file: run the ux-clarity measurements at 390 and 1440, go through the 54-question checklist, report the score, stop items and violations sorted by harm. Use when the user asks whether a screen is clear, understandable or ready to show to a customer."
argument-hint: "<url-or-file.html> [output folder]"
disable-model-invocation: true
allowed-tools: Bash(node *) Bash(npm *) Bash(npx *) Read Write Glob Grep
---
# /ux-audit

Audit the clarity of the screen at: **$ARGUMENTS**

You act as an outside reviewer: a new user who sees the screen for the first time, on a phone. You do not change the product's code.

1. Load the `ux-clarity` skill (its `SKILL.md`, then `checklist.md` and `references/00-audience.md`). The script is `scripts/measure.mjs` inside the `ux-clarity` skill folder: `${CLAUDE_PLUGIN_ROOT}/skills/ux-clarity/scripts/measure.mjs` when installed as a plugin, `.claude/skills/ux-clarity/scripts/measure.mjs` (project) or `~/.claude/skills/ux-clarity/scripts/measure.mjs` (user) when copied. Find the project profile (`profile.md` in the skill says where). If there is none, say so in the first line of the report and use the default audience.
2. No address given: ask for one. A screen behind a sign-in: ask for a storage state file or the steps to get there, and pass them as `--storage-state`, `--fill`, `--click`.
3. Write the line about the screen: who, on which device, the main question, the main action. If you cannot name one main action, that is the first finding.
4. Run the `ux-clarity` script with `--out <output folder>` (default `ux-audit/`); it measures at 1440 and 390. If the screen can be switched to the other languages of the profile, run each into its own subfolder (the longest language at 390 is required for G6); if it cannot, write G6 down as "not checked". Read `metrics.json`, `<name>.png`, `<name>-full.png`, `<name>-marks.png`.
5. Go through `checklist.md` and fill in the protocol: an answer and its grounds for every item. An answer without a number or a place on the screenshot does not count.
6. Report, in this order: the profile used (or "defaults"); the line about the screen; the score and the stop items; violations sorted by harm, each with the rule ID and a "bad → good" proposal on this very screen; "not checked"; "kept as the project's decision".

Changes to what live users are used to (sections, menu order, workflow) are written as proposals with variants, not as defects to fix.

Save the report as `ux-audit.md` in the output folder and give the user its path.
