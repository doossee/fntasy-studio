# growth-studio

Open skills and tools for an AI agent (Claude Code) that let any product or small business research
its market and run its marketing from one folder:

- **a growth skill** — step-by-step research of competitors and markets from open data, every finding with a source and a mark: *seen* or *assumed*;
- **production tools** — posts, carousels, stories and vertical reels with sound, built from a text scenario with one command;
- **a content plan, UTM links and a weekly report**, so leads reach the CRM with their source.

Русская версия: [README.ru.md](README.ru.md).

![Carousel preview](examples/preview/carousel-first-lesson.ru.jpg)

The product in every example is fictional. Previews: [`examples/`](examples/).

## What is different

General growth tooling assumes English, large sites and Western platforms. This kit is built for the places they miss.

**Telegram**

- reads public channels through `t.me/s/<channel>` without login or keys: subscribers, rhythm, median views, best posts — [`skills/growth/scripts/tg-channel.mjs`](skills/growth/scripts/tg-channel.mjs);
- method for chats, channel catalogues and open statistics, ad posts, bots — [`references/telegram.md`](skills/growth/references/telegram.md);
- links for bots: the source travels in the `/start` payload where UTM tags cannot;
- publishing to a channel through a bot.

**Central Asia and the CIS**

- content in several languages from one scenario: Uzbek (Latin), Russian, Kazakh and others; correct Uzbek `oʻ`, `gʻ`; a font with full Cyrillic coverage;
- local maps and platforms in the research steps: Yandex Maps, 2GIS, classifieds, marketplaces, job boards;
- a method for small sites that paid analytics services know nothing about — [`references/central-asia.md`](skills/growth/references/central-asia.md).

## Quick start

Needs **Node.js 20+** and **ffmpeg** (for reels). Python is not required.

```bash
# macOS
brew install node ffmpeg

# Ubuntu / Debian (Node 20+ from NodeSource or nvm if your distribution ships an older one)
sudo apt update && sudo apt install -y nodejs npm ffmpeg
```

```bash
git clone https://github.com/doossee/growth-studio.git
cd growth-studio
npm install
npx playwright install chromium          # Linux: npx playwright install --with-deps chromium

npm run post     -- examples/scenarios/post-trial.yaml             # → out/post-trial/<lang>/post-trial.png
npm run carousel -- examples/scenarios/carousel-first-lesson.yaml  # → out/carousel-first-lesson/<lang>/01.png …
npm run story    -- examples/scenarios/story-reminder.yaml         # → 1080×1920 PNG
npm run reel     -- examples/scenarios/reel-open-day.yaml          # → out/reel-open-day/reel-open-day.<lang>.mp4
```

Everything is written to `out/`, which is not tracked by git. `npm run examples` rebuilds all examples and previews.

| Command | Does | Details |
|---|---|---|
| `npm run post -- <scenario>` | post 1080×1350 or 1080×1080 | [tools/cards](tools/cards/README.md) |
| `npm run carousel -- <scenario>` | carousel, 2–10 slides | [tools/cards](tools/cards/README.md) |
| `npm run story -- <scenario>` | story 1080×1920 | [tools/cards](tools/cards/README.md) |
| `npm run handout -- <scenario>` | A4 handout with QR, PNG + PDF | [tools/cards](tools/cards/README.md) |
| `npm run reel -- <scenario>` | reel 1080×1920 with music, optional voice | [tools/reel](tools/reel/README.md) |
| `npm run utm -- --source telegram --content post_1` | UTM link and Telegram bot link | [tools/utm](tools/utm/README.md) |
| `npm run plan -- init` / `render <plan.yaml>` | 4-week content plan → Markdown + CSV | [tools/plan](tools/plan/README.md) |
| `npm run report -- <week.csv>` | weekly report: reach, leads by UTM, cost per lead | [tools/metrics](tools/metrics/README.md) |
| `npm run tg:channel -- <channel>` | numbers of a public Telegram channel | [telegram.md](skills/growth/references/telegram.md) |
| `npm run tg:post -- --chat @channel …` | post to your channel through a bot (dry run unless `--send`) | [tools/publish](tools/publish/README.md) |

All commands accept `--profile <path>`.

## The growth skill

`skills/growth/` works in steps. After each step it shows the finding and its source, marks it
**seen** (there is a link or a screenshot) or **assumed** (an inference), says what to do with it,
and waits for *next / skip / stop*.

| Mode | Result |
|---|---|
| (a) competitor or example | what they do, where growth comes from, which moves work |
| (b) market: city or country + niche | who is there, where they are, what they post, what ads run |
| (c) what to copy | 10 moves with evidence and a 14-day plan by channel |
| (d) event | 5–7 minute talk, one-page theses, handout with QR, audience questions, 30-second booth pitch |

Sources are free and open: the website, Meta Ad Library, what Instagram and Facebook show without
login, public Telegram channels and open channel statistics, Google search, answers of AI
assistants, reviews and maps, vacancies and news. Paid sources are used only with your key, passed
through an environment variable.

Demo runs: [competitor teardown of a public company](examples/growth-demo/competitor-duolingo.md) (in Russian),
[one Telegram step on a large public channel](examples/growth-demo/tg-telegram.md).

### Connecting the skill to Claude Code

Three ways; pick one.

**1. Plugin** (the repository is a plugin and its own marketplace):

```
/plugin marketplace add doossee/growth-studio
/plugin install growth-studio@growth-studio
```

The skill is then available as `/growth-studio:growth`, and Claude also picks it up by itself when
you ask for research. For a local checkout without installing: `claude --plugin-dir /path/to/growth-studio`.

**2. Copy** the folder into your project or your home directory:

```bash
mkdir -p .claude/skills && cp -r /path/to/growth-studio/skills/growth .claude/skills/     # this project
mkdir -p ~/.claude/skills && cp -r /path/to/growth-studio/skills/growth ~/.claude/skills/ # all projects
```

**3. Symlink**, to keep it updated with `git pull`:

```bash
mkdir -p ~/.claude/skills && ln -s /path/to/growth-studio/skills/growth ~/.claude/skills/growth
```

Then run `/growth`, or just ask: "research how <competitor> gets customers, step by step".
The skill folder is self-contained (its Telegram script needs only Node 18+); the production tools
are used when the repository is available.

## Your own profile

A profile says what the product is, for whom, where, in which languages and with which brand.
The core has no product built in.

1. Copy `profiles/example/` anywhere — it does not have to be inside this repository, and for a real business it should not be: keep it in your private repository.
2. Edit `profile.yaml`: product, audience, country and city, languages (`uz-Latn`, `ru`, `kk`, …), channels, brand colours, fonts, logo, links and UTM defaults. Field reference: [`references/profile.md`](skills/growth/references/profile.md).
3. Pass the path: `--profile /path/to/profile`, or `export GROWTH_PROFILE=/path/to/profile`.

```bash
npm run post -- my-post.yaml --profile ~/work/my-product/growth-profile
```

Without a profile the tools use neutral defaults, and the skill asks four short questions and works.

## Repository layout

```
skills/growth/       the growth skill: SKILL.md, references/, templates/, scripts/
tools/cards/         posts, carousels, stories, handouts → PNG
tools/reel/          reels with sound → MP4; original music generator
tools/utm/           UTM and Telegram bot links
tools/plan/          content plan
tools/publish/       Telegram publishing through a bot
tools/metrics/       weekly report
profiles/example/    profile of a fictional language school in Samarkand
examples/            scenarios, small previews, demo runs of the skill
docs/                music licences, voice-over options, publishing, metrics, design notes
```

Each tool folder and the skill folder can be copied out and used alone.

## Honest limits

- **Publishing.** Telegram channels can be posted to through a bot. Instagram has an official API, but it needs a professional account, a Meta app and publicly hosted media; for most small businesses uploading by hand in Meta Business Suite is the practical way. Details: [docs/publishing.md](docs/publishing.md).
- **Music.** The default track is generated from code and needs no licence. Any other track must be recorded in a manifest with its source and licence, or the build stops. Which libraries are safe: [docs/music.md](docs/music.md).
- **Voice.** Optional. Options for Uzbek, Russian and Kazakh with licences and prices: [docs/voice.md](docs/voice.md). Without it, reels have music and large captions.
- **Research.** Some sources do not open for an agent (Meta Ad Library, Instagram counts). The skill says so and asks for a screenshot instead of guessing.
- **Motion.** Reels use Playwright and ffmpeg, not Remotion — so that a company of any size can run them without buying a licence. Reasoning: [docs/reels.md](docs/reels.md).

## Fonts and third-party material

`profiles/example/fonts/InterVariable.woff2` — Inter, SIL Open Font License 1.1 (`Inter-OFL.txt` next to it).
No other third-party text, images, music or code is included. Dependencies: Playwright (Apache-2.0), `yaml` (ISC), `qrcode` (MIT).

## Licence

Not chosen yet; the repository owner will add a `LICENSE` file.
