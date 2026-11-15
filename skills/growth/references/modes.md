# Modes (a), (b), (c)

Each mode is a list of steps. Announce the list, then run one step per message in the loop from
`SKILL.md`. Drop steps that do not apply (no site → skip the site step) and say why.

<a id="a"></a>
## (a) Competitor or example teardown

Question: what do they do, where does growth come from, which moves work.

| # | Step | Source | Output |
|---|---|---|---|
| 1 | Promise and entry | website first screen, sign-up path | headline, main action, steps to first result |
| 2 | Price and offer | pricing page, posts with prices, map card | plans, trial, discounts, what is hidden |
| 3 | Channels | links from the site, search, Telegram, Instagram | list of channels with size and rhythm |
| 4 | Telegram | `tg-channel.mjs`, reading 15–20 posts | numbers, rubrics, best posts, where links lead |
| 5 | Content that works | most viewed posts and reels, repeated rubrics | 3–5 formats with links |
| 6 | Ads | Meta Ad Library, ad posts in Telegram channels | active ads, oldest ads, offers |
| 7 | Reviews and maps | Google Maps, Yandex Maps, 2GIS | rating, count, what is praised and what hurts |
| 8 | Money and people | vacancies, news, filings for public companies | where they invest; growth reasons in their own words |
| 9 | AI assistants | buyer questions | are they named, and from which sources |

End with **"Where growth comes from"**: 3–5 lines, each either seen (with step number) or assumed
(with the reasoning), and **"What works"**: moves ranked by evidence. Offer mode (c).

<a id="b"></a>
## (b) Market scan

Question: in this city or country and niche — who is there, where they are, what they post, what ads run.

| # | Step | Source | Output |
|---|---|---|---|
| 1 | Where buyers look | user's answer + search as a buyer in each language | 3–5 places to scan (maps, Telegram, Instagram, classifieds) |
| 2 | Long list | map search, Google, `site:t.me`, catalogues | 10–20 players: name, link, channel, size |
| 3 | Short list | sort by reach in the main channel | 5 players to compare; say how you chose |
| 4 | Table | one row per player | price, offer, channels with size, rhythm, languages, reviews |
| 5 | What they post | 10 latest posts of each of the 5 | formats and topics that repeat across players |
| 6 | Ads | Meta Ad Library per player, ad posts in city channels | who advertises, with what offer |
| 7 | Gaps | compare the table with the user's product | languages nobody serves, formats nobody makes, questions nobody answers |

The table is the deliverable. Empty cells are marked "not seen", not guessed.
If the user agrees, save the players to `competitors` in the profile.

<a id="c"></a>
## (c) "What to copy"

Needs findings from (a) or (b). If none exist, run a short (a) on 1–2 examples first.

**Part 1 — 10 moves with evidence**

| # | Move | Evidence (step, link) | Mark | How to do it here | Effort | First number to watch |
|---|---|---|---|---|---|---|

- A move is something that can be done this week ("pin a post with price and seats left"), not a strategy ("build a brand").
- Evidence must point to a step marked **seen**. A move resting only on **assumed** goes to the bottom and is labelled a test.
- Order by expected effect ÷ effort. Say which three to start with.
- Template: `../templates/moves.md`.

**Part 2 — 14-day plan by channel**

One table, a row per day, columns: Date · Telegram · Instagram · Offline · Owner · Done when.
Channels come from the profile; replace columns accordingly (WhatsApp, TikTok, maps).

- Every cell names a concrete piece: format + topic + the move number it implements.
- Days 1–2 are setup: UTM links, pinned post, map cards, profile bio. Nothing is published before leads can be traced to a source.
- No more pieces than the user can make: ask how many hours a week they have, default 5.
- Day 7 and day 14 hold a 20-minute review of numbers (see the weekly report in `tools/metrics`).
- Template: `../templates/plan-14-days.md`.

Then offer to produce the first three pieces with the tools (`tools/cards`, `tools/reel`) and the links with `tools/utm`.
