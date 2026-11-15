# Telegram as a research source

In Uzbekistan and much of the CIS, Telegram is where a small business has its "site", its news and
its support at once. Most growth tools do not read it. This is how to.

## 1. Public channel: `t.me/s/<channel>`

Any public channel has a web preview without login. Run the bundled script:

```bash
node "${CLAUDE_SKILL_DIR}/scripts/tg-channel.mjs" <channel> --posts 60 --tz Asia/Tashkent
# --json for raw posts, --out file to save
```

It returns: subscribers, posts per day, median views, views ÷ subscribers, formats, busiest hours,
most viewed posts with links. Everything it prints is **seen** — cite `https://t.me/s/<channel>` and the date.

How to read the numbers:

| Number | Meaning | Caution |
|---|---|---|
| Views ÷ subscribers | share of the audience a post reaches | there is no universal norm: compare the channel with 2–3 others of similar size in the same niche. A share far below theirs can mean inactive or bought subscribers — **assumed** until other signs agree |
| Posts per day | rhythm you would have to match | news channels post 20+, a business channel 3–7 a week |
| Most viewed | topics and formats that travel | a spike may come from a repost by a big channel or from ads, not from the post itself |
| Hours | when they post | not when the audience reads |
| Views on fresh posts | still growing | the script uses posts older than 24 h for medians |

Limits to state honestly:

- For some posts the preview shows "not supported in your browser" instead of the attachment:
  views, text and usually the attachment type are still read. The script reports how many posts
  are affected. To see the attachment, open the post in Telegram.
- Private channels, channels with the preview disabled, and groups do not open this way.
- Subscriber count is rounded (`11.3K`). Reactions and comments are partial.
- The preview shows no history of subscriber growth. That needs a catalogue (below) or a paid API.

Then read 15–20 posts by eye and record: rubrics that repeat, how prices and offers are shown,
where links lead (site, bot, direct message, phone), languages and scripts used, pinned post,
how often they sell versus teach.

## 2. Catalogues and open statistics

Catalogues such as TGStat (regional sections exist, e.g. `uz.tgstat.com`, `kaz.tgstat.com`) and
Telemetr show a channel card without payment: subscribers over time, average reach, citation index,
recent mentions. Use them for two things the preview cannot give:

- **growth curve** — steady growth, or steps (steps = ads or giveaways);
- **who mentions the channel** — the list of channels where it bought or exchanged posts.

These pages often require JavaScript or block automated requests. If the card does not open,
mark **not seen** and ask the user for a screenshot of the card. The API needs a paid key
(`TGSTAT_TOKEN`, `TELEMETR_TOKEN`) — see `sources.md#paid`.

Finding channels in a niche: catalogue search by keyword and country; Google `site:t.me <niche> <city>`;
the "similar channels" block in the Telegram app (ask the user for a screenshot).

## 3. Chats and groups

City and niche chats ("parents of school No. …", "IELTS Tashkent") show the real questions.

- A public group's page `t.me/<group>` shows the title, description, member count and how many are online. That is all without an account.
- Reading messages requires being a member. Do not join with fake accounts. Ask the user to
  export the chat they are a member of (Telegram Desktop → ⋮ → Export chat history → JSON, text only)
  or to paste a sample.
- From an export, count and group: the 10 most frequent questions, words used for the problem,
  competitors named, objections to price. Report counts ("23 of 180 messages ask about price").
  Do not output names, handles, phone numbers or personal messages.

## 4. Ads in Telegram

- **Telegram Ads** (sponsored messages) have no public ad library. A competitor's ads cannot be listed.
  What can be seen: a sponsored message under a channel's posts when you read it in the app — ask for a screenshot.
- **Direct ad posts** in other channels are the common format in the region. They are found through
  catalogue "mentions" (section 2) or by searching `site:t.me "<brand>"`. Record the channel,
  the date, the text and the link — the link's UTM tags or bot payload reveal how they track.
- **Giveaways and "folders"** (shared chat folders) give step-shaped growth with weak audience quality.
  Mark the conclusion **assumed**.

## 5. Bots and deep links

Many businesses take leads through a bot instead of a site form. Check: the bot's start message,
the steps to a lead, whether it asks for a phone number, how fast a human answers
(do not submit fake leads; read only the public first step).

For the user's own bot: UTM tags do not reach a bot. The source travels in the start payload:
`https://t.me/<bot>?start=<payload>` — up to 64 characters of `A–Z a–z 0–9 _ -`.
`tools/utm` in this repository prints both the UTM link and the bot link.

## 6. Publishing (for the user's own channel)

A bot that is an administrator of the channel can post text, photos, albums (2–10 items) and video
through the Bot API. It needs `TELEGRAM_BOT_TOKEN`. See `tools/publish` in this repository.
The skill prepares posts as files; it does not send anything unless the user runs the command.

## Step template

```
Step N — Telegram channel @<channel>
Finding:  <subscribers>; <posts/day>; median <views> views (<x>% of subscribers);
          best format <…>; top post about <…> (<views>, link)
Source:   https://t.me/s/<channel> — <date>, <n> posts from <from> to <to>
Mark:     seen (numbers) · assumed (why the top post travelled)
So what:  <one action: rhythm, rubric or format to copy, with a number>
```
