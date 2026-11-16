# Instructions for agents working in this repository

fntasy-studio is a **public** repository: a catalog (`.claude-plugin/marketplace.json`) of three
independent Claude Code plugins, each in its own folder:

- `plugins/growth/` — plugin `growth`: the growth research skill (`skills/growth/`) and content production
  tools (`tools/`), with `profiles/example/`, `examples/`, `docs/`, `scripts/` and `package.json`;
- `plugins/design/` — plugin `design`: skills `ui-craft`, `ux-clarity`, commands `ui-audit`, `ux-audit`,
  `design-variants`, agents `design-judge` and `ux-reviewer`;
- `plugins/review/` — plugin `review`: agent `code-reviewer` and `references/review-guide.md`.

Every push is a publication. Licence: Apache-2.0 (`LICENSE`, `NOTICE`).

## Always

- Answer in the language the user writes in.
- Follow the writing rules in `plugins/growth/skills/growth/references/writing.md`: specifics, numbers, verbs; no
  empty words ("revolutionary", "innovative", «в современном мире»), no stacked exclamation marks or emoji.
- Mark research findings **seen** (link or screenshot) or **assumed** (inference). Never present memory as a finding.
- READMEs exist in English and Russian (`README.md`, `README.ru.md`) at the root and in each plugin: change both.

## Never commit

- Secrets, tokens, keys, `.env` files. Keys live only in environment variables or the environment's secret store.
- Personal data, data of real customers, internal plans of any business.
- A real product's profile — neither a growth profile, a design profile nor a review profile. Real profiles live outside
  this repository and are passed with `--profile <path>` or `GROWTH_PROFILE`, or sit in the reviewed project's own
  `.claude/review-profile.md`. `plugins/growth/profiles/example/` is fictional and must stay fictional.
- Anything specific to one product, company or customer in the reviewer agents: they are a general method.
- Other people's text, prompts, code, images, fonts or music without a licence that allows redistribution. Fonts must be open (OFL and similar) with the licence file next to them.
- Heavy files: video, audio, sources, renders. They go to `out/` (ignored). `plugins/growth/examples/` holds small previews, under about 5 MB in total.
- Names of commercial look-alike services in the README. If a comparison is unavoidable, keep it neutral and factual.

## Plugins

- Each catalog entry has its plugin folder as `source` (`./plugins/<name>`). Claude Code finds `skills/`, `agents/`
  and `commands/` inside it by itself; nothing outside the folder loads with the plugin.
- **No shared code between plugins.** What one plugin needs is copied into it, as `profile.mjs` and `browser.mjs` are
  copied between the growth tools.
- There is no `plugin.json`: the catalog entry is the manifest.
- After changing the catalog: `claude plugin validate .`. To check that a plugin installs alone:
  `claude plugin marketplace add /path/to/clone && claude plugin install <name>@fntasy-studio` (use a throwaway `HOME`).
- Keep `license` as `Apache-2.0` in every catalog entry and every `package.json`; keep versions in step with the README's
  "What changed" section.

## Do not act outside the repository

Do not publish to social networks, do not message anyone, do not spend money. `plugins/growth/tools/publish/telegram.mjs`
is a dry run unless `--send` is passed; pass it only when the user explicitly asks to post.

## Running the growth tools

All commands run from `plugins/growth/`:

```bash
cd plugins/growth
npm install                                  # once; then: npx playwright install chromium
npm run post     -- <scenario.yaml> [--profile <path>] [--lang ru]
npm run carousel -- <scenario.yaml>
npm run story    -- <scenario.yaml>
npm run handout  -- <scenario.yaml>
npm run reel     -- <scenario.yaml>          # needs ffmpeg
npm run utm      -- --source telegram --content post_1 [--bot]
npm run plan     -- init --start YYYY-MM-DD --out plan.yaml | render plan.yaml --md plan.md --csv plan.csv
npm run report   -- week.csv --out report.md
npm run tg:channel -- <channel> --posts 60
npm run examples                             # rebuild all examples and previews (about 2 minutes)
npm run check                                # shared copies in sync, YAML parses, no secrets, examples size
```

- Output goes to `plugins/growth/out/<name>/`. Scenario formats: `tools/cards/README.md`, `tools/reel/README.md`; working examples: `examples/scenarios/`.
- After rendering, look at the result: open a PNG, and for a reel the `*.phone-390.jpg` sheet. Fix warnings about text that does not fit or is too small by shortening the text.
- If Chromium for the installed Playwright is missing, the tools fall back to `/opt/pw-browsers/chromium` or a system Chrome; `GROWTH_CHROMIUM=/path/to/chrome` overrides.
- `npm run examples` re-encodes the preview MP4s with different bytes each time; if the reel did not change, restore them with `git checkout -- examples/preview/*.mp4`.

## Running the design measurements

From `plugins/design/`:

```bash
node skills/ui-craft/scripts/measure.mjs <url-or-file.html> [--widths 1440,1280,1024,390] [--profile file] [--out dir]
node skills/ux-clarity/scripts/measure.mjs <url-or-file.html>
```

## Changing the code

- Each tool and each skill must work when its folder is copied out alone. Shared helpers of the growth tools are
  duplicated on purpose: edit `plugins/growth/tools/cards/profile.mjs` / `browser.mjs`, then `npm run sync-shared`.
- Nothing product-specific in skills, agents or tools: product, market, languages, channels and brand come from the profile.
- Music: only the generated track or tracks recorded in a manifest with source and licence (`plugins/growth/docs/music.md`). Not sure about a licence — do not use the track.
- Before committing: `npm run check` in `plugins/growth`, `npm run examples` there if templates or scenarios changed,
  `claude plugin validate .` at the root if the catalog changed, and a search for secrets over the whole repository.
