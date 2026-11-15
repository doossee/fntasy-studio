# Sources: how to read each one

For every source: what to open, what to write down, how it fails. A failed source is reported as
**not seen** with the link, and the user is asked for a screenshot. Record the date with every fact.

## Website

Open the home page, the pricing page and the sign-up path.

| Look at | Write down |
|---|---|
| First screen | headline, promise, main button text, where it leads |
| Prices | plans, price, currency, trial, what is hidden behind "contact us" |
| Sign-up | steps to the first result; phone or e-mail; Telegram bot instead of a form |
| Languages | which languages and scripts exist, which one is the default |
| Page source | trackers: Meta Pixel (`fbq`), Google tag (`gtag`, `GTM-`), Yandex Metrika (`mc.yandex`), TikTok pixel, Telegram widget; site builder or CMS (Tilda, WordPress, Bitrix, Webflow); chat widgets; payment providers |
| `robots.txt`, `sitemap.xml` | how many pages, which sections, blog or not, last modified dates |
| Web archive | `web.archive.org/web/*/<domain>` — when prices and the headline changed |

A tracker in the source means the company *can* run ads on that platform — mark **assumed**, not seen ads.
Sites built as JavaScript apps return an empty shell to simple fetches: say so, use a browser
(Playwright is available in this repository) or ask for a screenshot.

## Meta Ad Library

`https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=<CC>&q=<name>`

Write down: number of active ads, the oldest start dates (an ad that runs for months pays for itself),
formats, the first line of text, the offer, the landing URL, the languages. It usually needs a real
browser and often does not open for an agent — then it is **not seen**: give the user the link and the list above.
Outside the EU the library shows only active ads and no spend. No ad library exists for Telegram Ads.

## Instagram and Facebook without login

What is usually visible without an account: profile name, bio, link in bio, sometimes the number of
followers and posts, sometimes the last few posts. Counts are often hidden. Do not log in.
If it is not visible, ask the user for three screenshots: profile header, grid of the last 12 posts,
highlights. From them record: posting rhythm, formats (reel, carousel, photo), repeated rubrics,
where the link in bio leads (site, Telegram, WhatsApp, link hub).

## Telegram

See `telegram.md`.

## Google search

Run each query in every language and script of the market (see `central-asia.md`).

| Query | Finds |
|---|---|
| `site:<domain>` | size of the site, sections, forgotten landing pages |
| `"<brand>" -site:<domain>` | mentions, directories, press, complaints |
| `"<brand>" отзывы` / `sharhlar` / `reviews` | review pages |
| `<niche> <city>` (as a buyer would type) | who ranks, who buys ads above the results, map pack |
| `site:t.me "<brand>"` or `site:t.me <niche> <city>` | Telegram channels and posts |
| `site:instagram.com "<brand>"` | profiles and tagged posts |
| `"<brand>" вакансия` / `ish oʻrni` | hiring |

Search results differ by country and device. Record the query, the date and the position; mark
position claims **seen** only for the exact query you ran.

## AI assistants

Buyers ask assistants "which … in <city>". Ask 3–5 such questions the way a buyer would, in each
language. Record: date, assistant, exact question, who was named, which sources were cited.
You can honestly report only your own answer and what you can open; for other assistants ask the
user to run the same questions and paste the answers. Names that repeat across assistants get their
visibility from the cited sources — those sources (maps, directories, review sites) are the action.

## Reviews and maps

Google Maps, Yandex Maps, 2GIS — check all three; in Central Asia the leader differs by city.

Write down: rating, number of reviews, date of the latest, share of answered reviews, photos,
opening hours, the link the card leads to (does it carry UTM tags?), repeated words in praise and
in complaints. Twenty reviews are a sample, not statistics: say "7 of 20 mention …".
Do not copy reviewers' names.

## Vacancies and news

Vacancies show where money goes. A posting for an SMM or performance marketer, a sales manager,
a second branch administrator — each is a plan made public. Read the duties and the tools listed.
Sources: the company's careers page, hh (hh.uz, hh.kz, hh.ru), LinkedIn jobs, OLX jobs,
Telegram job channels. News: funding, new branches, partnerships, licences, awards — with dates.

## Public company extras

For listed companies: quarterly letters and filings (the regulator's site is often easier to open
than the investor site). Take user numbers, revenue, and — most useful — what the company itself
names as the reason for growth. Quote it; do not paraphrase into a stronger claim.

<a id="paid"></a>
## Paid sources — only with the user's key

Never store a key in a file. Read it from the environment; if it is missing, say which variable to
set and continue with the free route.

| Service | Unlocks | Environment variable |
|---|---|---|
| TGStat API | Telegram channel history: subscriber growth, reach, mentions, reposts, ad posts | `TGSTAT_TOKEN` |
| Telemetr API | similar Telegram analytics, channel search by keyword | `TELEMETR_TOKEN` |
| Search results API (any SERP provider) | repeatable search positions by country and language | provider's variable, e.g. `SERPAPI_KEY` |
| Traffic and keyword tools | traffic estimates and keywords — for sites large enough to be measured; for small Central Asian sites they return little or nothing | provider's variable |
| Meta Marketing API (Ad Library API) | ad library through an API; needs a verified developer account | `META_ACCESS_TOKEN` |
| Telegram Bot API | publishing to your own channel (not research) | `TELEGRAM_BOT_TOKEN` |

When a paid tool has no data for a small site, that is a finding too: "no third-party traffic
estimates exist; the numbers below come from public counters and channel views".
