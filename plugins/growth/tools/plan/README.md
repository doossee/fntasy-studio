# plan — content plan for 4 weeks

One YAML file is the plan. It is easy to edit by hand or by an agent, and it renders to a Markdown
table and a CSV (opens in any spreadsheet).

```bash
node tools/plan/plan.mjs init --start 2026-12-01 --out plan.yaml     # empty skeleton from the profile's channels
node tools/plan/plan.mjs render plan.yaml --md plan.md --csv plan.csv
```

Each row: `date`, `channel`, `format`, `topic`, `text` per profile language, `content` (becomes
`utm_content`; the link is built with `tools/utm` if it sits next to this folder), `status`.
Statuses: `idea → draft → ready → published` (or `skipped`).

Rhythm comes from `channels.<name>.perWeek` in the profile. Example: `examples/plan/`.
