# Instructions for agents working in this repository

growth-studio is a **public** repository: a growth research skill (`skills/growth/`) and content
production tools (`tools/`). Every push is a publication.

## Always

- Answer in the language the user writes in.
- Follow the writing rules in `skills/growth/references/writing.md`: specifics, numbers, verbs; no
  empty words ("revolutionary", "innovative", «в современном мире»), no stacked exclamation marks or emoji.
- Mark research findings **seen** (link or screenshot) or **assumed** (inference). Never present memory as a finding.

## Never commit

- Secrets, tokens, keys, `.env` files. Keys live only in environment variables or the environment's secret store.
- Personal data, data of real customers, internal plans of any business.
- A real product's profile. Real profiles live outside this repository and are passed with `--profile <path>` or `GROWTH_PROFILE`. `profiles/example/` is fictional and must stay fictional.
- Other people's text, prompts, code, images, fonts or music without a licence that allows redistribution. Fonts must be open (OFL and similar) with the licence file next to them.
- Heavy files: video, audio, sources, renders. They go to `out/` (ignored). `examples/` holds small previews, under about 5 MB in total.
- Names of commercial look-alike services in the README. If a comparison is unavoidable, keep it neutral and factual.

## Do not touch

- `skills/ui-craft/` and `skills/ux-clarity/` are reserved for another task. Do not create or edit them.
- Do not add a `LICENSE` file; the owner decides.

## Do not act outside the repository

Do not publish to social networks, do not message anyone, do not spend money. `tools/publish/telegram.mjs`
is a dry run unless `--send` is passed; pass it only when the user explicitly asks to post.

## Running the tools

```bash
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

- Output goes to `out/<name>/`. Scenario formats: `tools/cards/README.md`, `tools/reel/README.md`; working examples: `examples/scenarios/`.
- After rendering, look at the result: open a PNG, and for a reel the `*.phone-390.jpg` sheet. Fix warnings about text that does not fit or is too small by shortening the text.
- If Chromium for the installed Playwright is missing, the tools fall back to `/opt/pw-browsers/chromium` or a system Chrome; `GROWTH_CHROMIUM=/path/to/chrome` overrides.

## Changing the code

- Each tool must work when its folder is copied out alone. Shared helpers are duplicated on purpose:
  edit `tools/cards/profile.mjs` / `tools/cards/browser.mjs`, then `npm run sync-shared`.
- Nothing product-specific in `skills/` or `tools/`: product, market, languages, channels and brand come from the profile.
- Music: only the generated track or tracks recorded in a manifest with source and licence (`docs/music.md`). Not sure about a licence — do not use the track.
- Before committing: `npm run check`, and `npm run examples` if templates or scenarios changed.
