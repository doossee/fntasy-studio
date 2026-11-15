# cards — posts, carousels, stories, handouts → PNG

HTML/CSS templates rendered by headless Chromium (Playwright). Colours, fonts and logo come from the profile.

```bash
node tools/cards/cards.mjs <scenario.yaml> [--profile <path>] [--out <dir>] [--lang <code>] [--scale 0.5]
```

| `type` | Size | Output |
|---|---|---|
| `post` | `size: portrait` 1080×1350 (default) or `square` 1080×1080 | one PNG per language |
| `carousel` | same sizes, 2–10 slides (5–10 reads best) | `01.png`, `02.png`, … per language |
| `story` | 1080×1920, text kept out of the zones the app covers | one PNG per language |
| `handout` | A4 | PNG 1240×1754 + A4 PDF per language |

Output goes to `out/<name>/<lang>/`. With one language the `<lang>` folder is omitted.

## Scenario

A post or story is one slide written at the top level; a carousel has `slides:`.

```yaml
type: carousel
name: my-carousel
size: portrait
slides:
  - layout: cover            # cover | text | stat | list | screenshot | cta
    theme: dark              # light | dark | accent
    kicker: { ru: "Открытый урок", uz-Latn: "Ochiq dars" }
    title:  { ru: "Первое занятие — *бесплатно*", uz-Latn: "Birinchi dars — *bepul*" }   # *word* = accent colour
    text:   { ru: "60 минут", uz-Latn: "60 daqiqa" }
  - layout: stat
    value: "8"
    unit:  { ru: человек, uz-Latn: kishi }
    title: { ru: "…" }
  - layout: list
    title: { ru: "…" }
    items: [ { ru: "…" }, { ru: "…" } ]
  - layout: screenshot
    title: { ru: "…" }
    image: profile:assets/screen.png      # "profile:" = inside the profile folder; otherwise relative to the scenario
  - layout: cta
    title:  { ru: "…" }
    button: { ru: "Записаться" }
    link: https://example.org/?utm_source=…   # shown without the query string
    qr: true                               # QR code of the link
```

Any slide may combine the fields: `kicker`, `title`, `text`, `items`, `image`, `button`, `link`, `qr`,
`contacts`; `layout` only sets the emphasis. A post or story takes `layout` and `theme` at the top level.
A pair of asterisks marks accent words (`*free*`), so write a literal asterisk only once per text.

Any text is a string (same in every language) or a map by language. Languages default to
`languages` in the profile; `langs: [ru]` in the scenario or `--lang ru` narrows it.

Text shrinks to fit. If it still overflows, or becomes too small for a phone, the tool prints a
warning — shorten the text.

Standalone use: copy this folder, `npm install`, `npx playwright install chromium`.
