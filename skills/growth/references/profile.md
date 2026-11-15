# Profile

A profile is a folder with `profile.yaml` (or `.json`) and assets. It tells the skill and the tools
what the product is, for whom, where, in which languages and with which brand. It can live anywhere
on disk — typically in the product's own private repository — and is passed by path:
`--profile /path/to/profile`, or the environment variable `GROWTH_PROFILE`.

Never copy a private profile into a public repository. Read it in place.

## Fields

```yaml
name: short-id
product:
  name: Product name
  category: what it is, in words a buyer would search
  oneLiner: { ru: "…", uz-Latn: "…" }      # any text field: a string or a map by language
  offer:    { ru: "…" }                     # entry offer: free lesson, trial, demo
  price:    { ru: "…" }
audience:
  - who: who buys
    need: what they need it for
market:
  country: UZ            # ISO code
  city: Samarqand
  currency: UZS
  timezone: Asia/Samarkand
languages: [uz-Latn, ru]  # first one is the default; BCP 47 tags
channels:
  telegram:  { handle: "@…", url: https://t.me/…, perWeek: 3 }
  instagram: { handle: "@…", perWeek: 3 }
  offline:   { note: "…", perWeek: 1 }
brand:
  handle: "@…"
  logo: assets/logo.svg   # path relative to the profile folder
  colors: { bg, surface, text, muted, accent, accentText, dark }
  fonts:
    heading: { family: Inter, weight: 800 }
    body:    { family: Inter, weight: 450 }
    files:   [ { family: Inter, src: fonts/InterVariable.woff2, weight: "100 900" } ]
links:
  landing: https://…       # base URL for UTM links
  telegramBot: https://t.me/…_bot
utm:
  campaign: default_campaign
  medium: { telegram: social, instagram: social, offline: qr }
competitors: []            # filled by mode (b), with the user's consent
```

Only `product.name` and `languages` are needed to start. Everything else has a neutral default.

## Without a profile

Ask once, in one message, at most four questions:

1. What is the product and who buys it?
2. Country and city?
3. Languages of the content?
4. Main channel today: Telegram, Instagram, offline, other?

Then work. At the end offer to save the answers:
"Save this as a profile at `<path>/profile.yaml`?" — and write the file only after a yes.

## Fonts and assets

Use open fonts only (SIL OFL, Apache-2.0) and keep the licence file next to the font.
Screenshots of the product go to `assets/`; do not put real customers' names or data in them.
