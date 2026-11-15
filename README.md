# growth-studio

Open skills and tools for an AI agent (Claude Code), in two sets. Each set is a separate plugin, and
both install from this repository.

**Growth** (plugin `growth-studio`): research a market and run marketing from one folder.

- **a growth skill** — step-by-step research of competitors and markets from open data, every finding with a source and a mark: *seen* or *assumed*;
- **production tools** — posts, carousels, stories and vertical reels with sound, built from a text scenario with one command;
- **a content plan, UTM links and a weekly report**, so leads reach the CRM with their source.

**Design** (plugin `design-skills`): turn "make it look good" and "make it clear" into rules you can
count on a screenshot.

- **ux-clarity** — will a new user understand this screen the first time, on a phone, without an explanation? 69 rules and a 54-question audit with a score;
- **ui-craft** — is the screen even, and is it strong? Measurable rules for spacing, alignment, typography and layout at four widths, plus composition, data, colour within the brand and a "level of the best" rubric;
- **a measurement script** for any URL or HTML file, audit commands and a read-only judge agent.

Русская версия: [README.ru.md](README.ru.md).

![Carousel preview](examples/preview/carousel-first-lesson.ru.jpg)

The products in all examples are fictional. Previews: [`examples/`](examples/).

## Install the plugins in Claude Code

```
/plugin marketplace add doossee/growth-studio
/plugin install growth-studio@growth-studio
/plugin install design-skills@growth-studio
```

Install one or both. On Claude Code 2.1.275 or later each install is also one step:
`/plugin install design-skills --marketplace doossee/growth-studio`. From a shell:
`claude plugin marketplace add doossee/growth-studio && claude plugin install design-skills@growth-studio`.

| Plugin | Adds | Called as |
|---|---|---|
| `growth-studio` | skill `growth` | `/growth-studio:growth`, or Claude loads it when you ask for research |
| `design-skills` | skills `ui-craft`, `ux-clarity` | load by themselves when you design, build or review a screen; or `/design-skills:ui-craft`, `/design-skills:ux-clarity` |
| | commands `ui-audit`, `ux-audit`, `design-variants` | `/design-skills:ui-audit <url>`, `/design-skills:ux-audit <url>`, `/design-skills:design-variants <screen>` |
| | agent `design-judge` | used by the commands; or `@agent-design-skills:design-judge` |

Each plugin loads only its own folders. To try a local checkout without installing:
`claude --plugin-dir /path/to/growth-studio` loads both sets as one plugin named `growth-studio`.

Plain skills without the plugin system: copy the skill folders into `.claude/skills/` (see
[Connecting the growth skill](#connecting-the-skill-to-claude-code) and
[Design skills as plain skills](#as-plain-skills)).

# Growth

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
| `npm run plan -- init --out plan.yaml` / `render plan.yaml` | 4-week content plan → Markdown + CSV | [tools/plan](tools/plan/README.md) |
| `npm run report -- <week.csv>` | weekly report: reach, leads by UTM, cost per lead | [tools/metrics](tools/metrics/README.md) |
| `npm run tg:channel -- <channel>` | numbers of a public Telegram channel | [telegram.md](skills/growth/references/telegram.md) |
| `npm run tg:post -- --chat @channel …` | post to your channel through a bot (dry run unless `--send`) | [tools/publish](tools/publish/README.md) |

All commands accept `--profile <path>`.

## The growth skill

`skills/growth/` works in steps. After each step it shows the finding and its source, marks it
**seen** (there is a link or a screenshot), **assumed** (an inference) or **not seen** (the source
did not open — the skill asks for a screenshot instead of guessing), says what to do with it,
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

**1. Plugin** — see [Install the plugins](#install-the-plugins-in-claude-code):

```
/plugin marketplace add doossee/growth-studio
/plugin install growth-studio@growth-studio
```

The skill is then available as `/growth-studio:growth`, and Claude also picks it up by itself when
you ask for research.

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

Inside this repository the tools fall back to `profiles/example` and say so; anywhere else, without a profile, they use neutral defaults. The skill without a profile asks four short questions and works.

## Honest limits

- **Publishing.** Telegram channels can be posted to through a bot. Instagram has an official API, but it needs a professional account, a Meta app and publicly hosted media; for most small businesses uploading by hand in Meta Business Suite is the practical way. Details: [docs/publishing.md](docs/publishing.md).
- **Music.** The default track is generated from code and needs no licence. Any other track must be recorded in a manifest with its source and licence, or the build stops. Which libraries are safe: [docs/music.md](docs/music.md).
- **Voice.** Optional. Options for Uzbek, Russian and Kazakh with licences and prices: [docs/voice.md](docs/voice.md). Without it, reels have music and large captions.
- **Research.** Some sources do not open for an agent (Meta Ad Library, Instagram counts). The skill says so and asks for a screenshot instead of guessing.
- **Motion.** Reels use Playwright and ffmpeg, not Remotion — so that a company of any size can run them without buying a licence. Reasoning: [docs/reels.md](docs/reels.md).

# Design

Skill guides: [ui-craft](skills/ui-craft/README.md), [ux-clarity](skills/ux-clarity/README.md).

## What makes them different

- **Every rule has a number.** "How to measure" is a pixel count or a yes/no question about a screenshot. If a rule cannot be checked, it is rewritten.
- **A script measures any URL or HTML file.** Nine stop items for the look, the countable part of the clarity checklist, screenshots with red frames around violations, a blurred "squint" shot, composition figures.
- **Project specifics live in a profile.** Scales, brand, languages, components, the owner's taste and deliberate deviations are read from `design-profile.md`. Without a profile the skills work on stated defaults and say so.
- **The author does not grade their own work.** The rubric score that goes into a report comes from a judge in a fresh context who sees only screenshots.

## Install

### As a plugin (recommended)

```
/plugin marketplace add doossee/growth-studio
/plugin install design-skills@growth-studio
```

The plugin adds:

| What | How to call | What it does |
| --- | --- | --- |
| skill `ui-craft` | loads by itself when you design, build or review a screen; or `/design-skills:ui-craft` | rules, checklist, rubric, measurement script |
| skill `ux-clarity` | loads by itself; or `/design-skills:ux-clarity` | rules, checklist, measurement script |
| command `/design-skills:ui-audit <url>` | by hand | measures the page at 1440/1280/1024/390, walks the checklist, writes `ui-audit.md` |
| command `/design-skills:ux-audit <url>` | by hand | measures at 1440 and 390, walks the 54 questions, writes `ux-audit.md` |
| command `/design-skills:design-variants <screen>` | by hand | freedom mode: 2-3 variants with named axes, measured and scored blind |
| agent `design-judge` | used by the commands; or `@agent-design-skills:design-judge` | read-only judge: scores screenshots by the rubric without the build history |

### As plain skills

Copy the folders into the project (or into `~/.claude/skills/` for all projects):

```bash
git clone https://github.com/doossee/growth-studio
mkdir -p your-project/.claude/skills your-project/.claude/agents
cp -r growth-studio/skills/ui-craft growth-studio/skills/ux-clarity  your-project/.claude/skills/
# optional: the audit commands and the judge
cp -r growth-studio/skills/ui-audit growth-studio/skills/ux-audit growth-studio/skills/design-variants  your-project/.claude/skills/
cp growth-studio/agents/design-judge.md  your-project/.claude/agents/
```

Each skill folder is self-contained: rules, checklist, script, examples.

### The measurement script

Node 20+ and Playwright. If Playwright is already installed in your project or globally, nothing else is needed. Otherwise, once per skill:

```bash
cd skills/ui-craft/scripts && npm install && npx playwright install chromium
```

## Measure a page

```bash
# the look: stop items, composition figures, marked and squint screenshots
node skills/ui-craft/scripts/measure.mjs https://example.com
node skills/ui-craft/scripts/measure.mjs http://localhost:3000/orders --widths 1440,390 --out audit/orders

# clarity: touch targets, sideways scroll, small text, primary buttons, cut labels
node skills/ux-clarity/scripts/measure.mjs http://localhost:3000/orders

# the bundled examples: a clean screen and the same screen with a violation for every stop item and composition flag
node skills/ui-craft/scripts/measure.mjs skills/ui-craft/examples/acme-today-good.html skills/ui-craft/examples/acme-today-bad.html \
  --profile skills/ui-craft/examples/design-profile.md
```

Output of the first command, per width, in `ui-measure/<width>/`: `<name>.png`, `<name>-full.png`, `<name>-marks.png` (red frames; the letter is the rule), `<name>-squint.png`, `metrics.json`; and `ui-measure/summary.json`.

```
 1440  acme-today-good: 0 stops
 1440  acme-today-bad: 22 stops (text-edge 3, box-edge 1, clipped 1, off-scale 6, row-align 1, font-scale 4, line-length 1, state-shift 5); composition: no-hero, equal-cards, multi-primary, numbers-not-tabular, uneven-gaps, ragged-rows
```

A screen behind a sign-in, a dialog or a tab: `--storage-state state.json`, `--cookie name=value`, and actions that run in order: `--fill 'selector=text'`, `--click 'selector'`, `--wait-for 'selector'`, `--press Escape`. `--strict` makes the script exit with code 1 on any stop item. `--help` lists every option; `skills/ui-craft/references/11-measure.md` explains every number.

## Design profile

Put `design-profile.md` in the project root (or `.claude/`, or `docs/`). The front matter holds numbers for the script, the body holds text for the agent:

```markdown
---
name: Acme Orders
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
fonts: [12, 14, 16, 18, 20, 24, 28, 30]
hero-fonts: [36, 40, 48]
primary: "--primary"
main: "main"
languages: [en, de]
---
## Product      who uses it, device, daily actions, familiar apps
## Brand        colour roles, fonts, radii, motion (or a link to your design document)
## Languages    which one is the longest; word lists
## Components   where the library is
## Taste        what the person who accepts the design has chosen and rejected
## Decisions    deliberate deviations that must not be "fixed"
## Domain examples   your screens by kind, worst-case data
```

Full format: `skills/ui-craft/profile.md`. A complete example: `skills/ui-craft/examples/design-profile.md`.

No profile? The skills use the default scale and thresholds, infer the audience from the screen, and start every report with that fact.

The design profile is a separate file from the growth profile (`profile.yaml`): one describes screens, the other marketing.

## How the two skills work together

1. `ux-clarity`: what is on the screen and in what order. The line about the screen (who, device, main question, main action), then the rules, then the checklist.
2. `ui-craft`: how it is built and how it stands. Intent before code, assembly at 1440 → 1280 → 1024 → 390, the look before the numbers, the script, the checklist, the rubric.
3. Any filter for a generic-AI look, a copy-style skill or an accessibility skill you already use runs after these two.

Neither skill changes your brand: colours, fonts and radii come from the profile.

The skill texts are in English so that any project can use them. The examples use a fictional product, Acme Orders, with German as the language with long words.

## Limits

- The script uses Chromium only.
- It measures what is in the DOM: not canvas, not text inside images, not iframes.
- Meaning is not measured: whether a button names its result or a number has the right comparison next to it is a checklist question answered from screenshots.
- The default numbers describe product screens (admin panels, dashboards, forms). For marketing pages set `hero-numbers-only: false` and your own `fonts` in a profile.

## Sources

Rules are written in our own words; each cites its sources (standards, platform guidelines, research, articles) in `references/sources.md` of each skill, together with the claims that were checked and not confirmed.

# Repository

## Layout

```
.claude-plugin/      marketplace.json: the catalog of both plugins
skills/growth/       the growth skill: SKILL.md, references/, templates/, scripts/
skills/ui-craft/     the look of screens: SKILL.md, profile.md, checklist.md, rubric-best.md, references/ (19 files), scripts/, examples/
skills/ux-clarity/   clarity of screens: SKILL.md, profile.md, checklist.md, references/ (11 files), scripts/, examples/
skills/ui-audit/  skills/ux-audit/  skills/design-variants/     design commands
agents/              design-judge.md
tools/cards/         posts, carousels, stories, handouts → PNG
tools/reel/          reels with sound → MP4; original music generator
tools/utm/           UTM and Telegram bot links
tools/plan/          content plan
tools/publish/       Telegram publishing through a bot
tools/metrics/       weekly report
profiles/example/    profile of a fictional language school in Samarkand
examples/            scenarios, small previews, demo runs of the growth skill
docs/                music licences, voice-over options, publishing, metrics, design notes
```

Each tool folder and each skill folder can be copied out and used alone.

## Fonts and third-party material

`profiles/example/fonts/InterVariable.woff2` — Inter, SIL Open Font License 1.1 (`Inter-OFL.txt` next to it).
No other third-party text, images, music or code is included. Dependencies: Playwright (Apache-2.0), `yaml` (ISC), `qrcode` (MIT).

## Licence

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE). The Inter font keeps its own licence, SIL Open Font License 1.1.
