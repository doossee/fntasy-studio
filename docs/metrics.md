# Weekly metrics

Twenty minutes once a week, same day. Three numbers decide what to do next; the rest is detail.

| Number | Where it comes from | Why |
|---|---|---|
| **Reach** per channel | Telegram: views on posts (`t.me/s/<channel>` or channel statistics). Instagram: Insights → accounts reached. Offline: flyers handed out, QR scans | are we seen at all |
| **Leads by UTM** | CRM or the form's table, grouped by `utm_source` (and the bot's `start` payload) | which channel brings people who ask |
| **Cost per lead** | money spent on the channel this week ÷ its leads | where the next sum goes |

Useful detail: clicks (link statistics or site analytics), click → lead, sales per source, the three most viewed posts.

Rules:

- A lead without a source is a tracking bug. Fix the link before judging the channel.
- Reach is not comparable across platforms: a Telegram view and an Instagram "account reached" are counted differently. Compare each channel with itself last week.
- Fewer than about 30 leads a week: do not conclude from percentages; look at absolute numbers and at four weeks together.
- End every report with three decisions: do more of, stop, test.

## Report

Fill `tools/metrics/week.template.csv` (one row per `utm_source`) and run:

```bash
node tools/metrics/report.mjs week.csv --prev last-week.csv --title "Week 49" --out report.md
```

Example with invented numbers: `examples/metrics/week-49.md`.
