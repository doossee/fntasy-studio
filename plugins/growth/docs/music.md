# Music for reels: what is safe to use

Checked against the primary licence pages on **2026-11-15**. Licences change: re-read the page
before you publish, and record every track in a manifest (see `tools/reel/README.md`).
`tools/reel` refuses to mix a music file that has no manifest entry.

**Rule:** if you are not sure about the licence, do not use the track.

## Default: generated track

`tools/reel/music-gen.mjs` synthesises a simple original backing track from code — no samples,
no third-party recordings. Nothing to license, nothing to credit, safe on any platform.
It is plain, on purpose. Replace it when you have a properly licensed track.

## Libraries

| Source | Commercial use in social video | Credit | Can the audio file be committed to a public repo | Notes | Checked |
|---|---|---|---|---|---|
| Generated (`music-gen.mjs`) | yes | no | the script is in the repo; output is yours | — | — |
| [Pixabay Music](https://pixabay.com/service/license-summary/) | yes — "commercial or non-commercial purposes" | not required | **no** — content may not be distributed "on a Standalone basis" | Some tracks are registered with Content ID; keep the download certificate to dispute a claim | verified |
| [Mixkit](https://mixkit.co/license/) (Stock Music Free License) | yes — "any web or social media platform", incl. ads | not required | **no** | Not for TV/radio, games, CDs; no remixing or "music-only" use | verified |
| [Incompetech](https://incompetech.com/music/royalty-free/licenses/) (Kevin MacLeod) | yes | **required**, CC BY 4.0: title, "Kevin MacLeod (incompetech.com)", licence line and URL | yes, with the credit (follows from CC BY 4.0) | Put the credit in the post caption | verified |
| [Free Music Archive](https://freemusicarchive.org/License_Guide) | per track: **CC BY, CC BY-SA, CC0 only** | required except CC0 | follows the track's licence | BY-NC* is not for business. BY-ND cannot be used in video at all (sync = derivative work). BY-SA obliges you to license the video BY-SA | verified |
| [YouTube Audio Library](https://support.google.com/youtube/answer/3376882?hl=en) | cleared **inside YouTube** only; the page says nothing about other platforms | CC tracks: yes | not addressed | Treat as not cleared for Instagram, TikTok, Telegram | partly verified |
| Meta Sound Collection | — | — | — | Terms are behind a login. Secondary sources say Meta products only. Do not use outside Meta until someone reads the terms | **not verified** |
| Uppbeat (free tier) | — | — | — | Licence pages did not open (HTTP 429) | **not verified** |
| FreePD | — | — | — | Site states it is permanently closed | verified |

Creative Commons in one line each ([source](https://creativecommons.org/share-your-work/cclicenses/)):

- **CC0** — any use, no credit.
- **CC BY** — commercial use allowed, credit required.
- **CC BY-SA** — commercial use allowed, credit required, your video must carry the same licence.
- **CC BY-NC** (and NC-SA, NC-ND) — non-commercial only. A business post is commercial.

## Manifest

Every external track needs an entry. Example: `tools/reel/music/manifest.example.yaml`.
Tracks themselves stay out of git (`*.mp3`, `*.wav` are ignored) unless the licence is CC0 or CC BY
and you add the credit.
