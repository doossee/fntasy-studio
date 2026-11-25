# Taste references

How ten widely known products look, observed on their public web pages on 25.11.2026: the first screen of the home page (or the public landing page) at 1280 × 800 and 390 × 844, light theme. Many people already know these products, so they show the conventions people bring to a new design ("familiar first", `taste.md`). Use them to name a direction; take principles, never the look, logo, illustrations or screens. Screenshots are not kept in this repository.

What this is not: a view of the logged-in apps, of later screens or of the mobile apps, or a judgement of their quality. Ratings are one reviewer's reading of one screen on one day; pages change. The products a project's own audience uses (profile, "audience experience") take priority over this list.

## The products on the five axes

1 and 5 are the ends of each axis in `taste.md`: C calm ↔ expressive, D dense ↔ spacious, P strict ↔ playful, B neutral ↔ brand-led, N conventional ↔ novel.

| Product | Category | C | D | P | B | N | Filled primary | Bordered inputs | Icons labelled | Family |
|---|---|---|---|---|---|---|---|---|---|---|
| Google | Search | 1 | 5 | 2 | 2 | 1 | yes (Sign in) | yes | mostly no | Quiet utility |
| GOV.UK | Government | 1 | 3 | 1 | 2 | 1 | icon-only search | no (fill contrast) | yes | Quiet utility |
| Uzum Market | Marketplace UZ | 5 | 2 | 3 | 5 | 1 | grey/tinted fills | yes | yes | Loud promo marketplace |
| Yandex Go | Rides | 4 | 4 | 3 | 4 | 3 | no (outlined pill) | n/a | no | Big-type landing |
| Airbnb | Travel | 3 | 3 | 4 | 3 | 2 | icon-only coral circle | shadow, not border | categories yes, hearts no | Warm and playful |
| Duolingo | Education | 4 | 5 | 5 | 5 | 2 | yes (green, 3D edge) | n/a | yes | Warm and playful |
| Netflix | Video | 5 | 3 | 2 | 5 | 2 | yes (red) | yes (grey 1px) | yes | Dark immersive |
| Spotify | Music | 4 | 2 | 2 | 4 | 2 | white/green pills | no (dark fill) | desktop partly, mobile yes | Dark immersive |
| Uber | Rides | 3 | 3 | 2 | 3 | 2 | yes (black / white pills) | no (grey fill) | mobile yes | Dark immersive |
| Linear | Productivity | 2 | 5 | 1 | 3 | 2 | white pill | n/a | yes (in UI shot) | Dark immersive |

Yandex Music could not be rated: from this location its site shows only a page saying the service is unavailable in the region (yellow pill button, 3D logo, large black heading), not the product.

## Five families

**1. Quiet utility** — Google, GOV.UK. White canvas, colour limited to one link or action colour or one flat band; the search field or a list of tasks comes first; no decorative imagery; plain task copy; links obviously links. *Principle: the page is a doorway — one input, short labels, nothing competing with it.*

**2. Loud promo marketplace** — Uzum Market. One saturated brand colour in the header and banners; dense rows of product cards with price, old price and discount badges; sticker-like sale art. The frame stays very conventional: catalogue button, wide search, labelled sign-in, favourites and cart, a labelled bottom tab bar on phones. *Principle: the frame stays predictable so the content can be loud — the loudness comes from the goods and offers, not from the controls.*

**3. Dark immersive** — Netflix, Spotify, Linear, Uber. Near-black canvas; colour comes from the content (posters, album art, product screens, photos) or one accent; the main action is a single high-contrast pill; fields are filled surfaces, often without borders. *Principle: dark works when the content is visual and the action is one bright pill.*

**4. Big-type landing** — Yandex Go. One very large headline, a photo, few actions and a lot of space. *Principle: one message, one action.* Seen weakness: the main action was an outlined pill, not a filled button, and navigation was hidden on desktop.

**5. Warm and playful** — Duolingo, Airbnb. Illustration with character, large radii, soft shadows or raised buttons, brand colour used sparingly but memorably. *Principle: playfulness lives in illustration and shape, while labels and actions stay plain.*

## Conventions seen across the ten

- The main action as a filled button: Google, Duolingo, Netflix, Spotify, Uber, Linear. Exceptions: GOV.UK's icon-only search square, Uzum's tinted rather than strongly filled buttons, Yandex Go's outlined pill, Airbnb's icon-only search circle.
- Bottom tab bars on phone pages carry text labels (Uzum, Spotify, Airbnb).
- Header controls (search, account, menu) are often icon-only even on conventional pages — the place where less experienced people struggle most (`ui-rules` EXP-8).
- Fields: bordered (Google, Uzum, Netflix) or filled without a border (GOV.UK, Spotify, Uber); the bordered field is the safer choice for less experienced audiences.
- Phone pages often push people to the native app; cookie, promo and location dialogs on first load were common.

## How to use this

1. Find where the profile's taste sits on the five axes and which family is closest.
2. Check the conventions of the products the audience actually uses; where they differ from this list, the audience's products win.
3. Keep controls, navigation and forms as conventional as the least experienced person in the audience needs; let colour, imagery, type and copy carry the taste.
