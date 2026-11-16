# metrics — weekly report

```bash
node tools/metrics/report.mjs week.csv [--prev last-week.csv] [--title "Week 49"] [--out report.md] [--currency UZS]
```

Input: `week.template.csv` — one row per `utm_source` with posts, reach, clicks, leads, sales, spend.
Output: reach, leads by UTM, cost per lead, a table by source and a place for three decisions.
What to look at and why: `docs/metrics.md`.
