# utm — links that carry the source into the CRM

```bash
node tools/utm/utm.mjs --source telegram --content post_trial_0112            # one link
node tools/utm/utm.mjs --source telegram --content pinned --bot               # + Telegram bot deep link
node tools/utm/utm.mjs --batch links.yaml --md out/links.md --csv out/links.csv
```

- Base URL: `--url`, or `links.landing` in the profile. Campaign and medium default to `utm.campaign` and `utm.medium` in the profile.
- Values are normalised to lower-case latin with underscores (Cyrillic and Uzbek are transliterated), so one source never appears under two spellings.
- Telegram bots do not receive UTM tags. With `links.telegramBot` in the profile the tool also prints
  `t.me/<bot>?start=<source>-<campaign>-<content>` (64 characters at most); the bot reads the payload from `/start`.

Naming that keeps reports readable:

| Tag | Meaning | Examples |
|---|---|---|
| `utm_source` | where the link is placed | `telegram`, `instagram`, `offline`, `yandex_maps`, `2gis`, `telegram_ads` |
| `utm_medium` | type of traffic | `social`, `cpc`, `qr`, `maps`, `partner` |
| `utm_campaign` | why | `open_day_dec`, `january_groups` |
| `utm_content` | the exact piece | `post_trial_0112`, `story_0512`, `flyer_school_12` |

For leads to "arrive with the source", the site form must save the UTM tags from the page URL into
hidden fields and pass them to the CRM. Test with one click before publishing.
Batch file example: `examples/scenarios/utm-links.yaml`.
