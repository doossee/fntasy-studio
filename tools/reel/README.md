# reel — vertical video with sound → MP4

1080×1920, 15–60 s, for Instagram Reels, Telegram and TikTok. Frames are rendered in headless
Chromium (Playwright) and encoded with ffmpeg. Why not Remotion: `docs/reels.md`.

```bash
node tools/reel/reel.mjs <scenario.yaml> [--profile <path>] [--out <dir>] [--lang <code>]
```

Needs `ffmpeg` and `ffprobe` in PATH. Output per language in `out/<name>/`:

- `<name>.<lang>.mp4` — H.264 + AAC, 30 fps;
- `<name>.<lang>.phone-390.jpg` — one frame per scene at phone width: check that captions are readable;
- `<name>.<lang>.credits.txt` — audio sources; paste required credits into the post caption.

## Scenario

```yaml
type: reel
name: my-reel
music: { mood: bright, bpm: 100, volume: 0.7 }   # generated track; or { file: track.mp3 }; or "none"
scenes:
  - type: title            # big hook; theme dark by default
    duration: 3
    kicker: { ru: "…" }
    title:  { ru: "Английский в группе *до 8 человек*" }
  - type: stat             # a number that counts up
    value: "90"
    unit:  { ru: минут }
    title: { ru: "…" }
  - type: list             # items appear one by one
    title: { ru: "…" }
    items: [ { ru: "…" }, { ru: "…" }, { ru: "…" } ]
  - type: screenshot       # image in a phone frame, slow pan down
    title: { ru: "…" }
    image: profile:assets/screen.png
  - type: screen           # live capture of a page while it scrolls (local file or URL)
    title: { ru: "…" }
    url: { ru: "profile:demo-site/index.html?lang=ru" }
    scrollTo: end          # pixels or "end"
    duration: 6
  - type: video            # any clip: phone screen recording, Playwright recordVideo
    title: { ru: "…" }
    src: clips/demo.mp4
    from: 2                # seconds to skip
    duration: 5
  - type: cta
    title:  { ru: "…" }
    button: { ru: "Записаться" }
    link: https://example.org/…
```

Scene types: `title`, `text` (heading + paragraph), `stat`, `list`, `screenshot`, `screen`, `video`, `cta`.
Scene options: `duration` (seconds), `theme` (`light`, `dark`, `accent`), `say` (voice text).
Default durations when `duration` is omitted: title 3 s, text 3.5, stat 3.2, list 1.4 + 0.9 per item,
screenshot 4, screen 5, video — the clip length, cta 3.6. The whole reel should be 15–60 s.
`stat` values: whole numbers ("90", "12 500") count up; anything else ("1,5", "24/7") is shown as written.
Captions are the scene texts themselves: keep each under about 8 words.

## Music

- **Default — generated.** `music-gen.mjs` synthesises an original backing track from code:
  no samples, nothing to license or credit. `npm run music -- --seconds 30 --out out/music.wav` writes it alone.
- **Your track.** `music: { file: path/to/track.mp3 }`. The file must have a record in
  `manifest.yaml` (next to the track, or `music.manifest: <path>`) with `source`, `license`, `url`
  and `commercialUse: true` — see `music/manifest.example.yaml`. Without it the build stops.
  Which libraries are safe: `docs/music.md`. Audio files are not committed to git.

## Voice (optional)

```yaml
voice:
  files: "voice/{lang}/{scene}.wav"      # your recordings; {scene} = 01, 02, …
  # or any text-to-speech command: text arrives on stdin, audio goes to {out}
  command:
    ru: 'piper --model ru_RU-dmitri-medium.onnx --output_file {out}'
  credit: "Voice: Piper, ru_RU-dmitri (CC0 dataset)"   # the Piper line is an example, not tested in this repository
scenes:
  - { type: title, title: { ru: "…" }, say: { ru: "Текст, который произносится" } }
```

A scene is stretched to fit its voice clip; music is lowered under the voice. API keys for paid
services are read by your command from environment variables — never write them into the scenario.
Models, licences and prices for Uzbek, Russian and Kazakh: `docs/voice.md`.
Without `voice`, the reel is built with music and captions.

`voice.command` is run through the shell. Treat a scenario like a script: do not build scenarios you did not write or read.

Standalone use: copy this folder, `npm install`, `npx playwright install chromium`.
