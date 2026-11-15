# Reels: why Playwright + ffmpeg, not Remotion

`tools/reel` renders every frame as a web page in headless Chromium (Playwright) and encodes with ffmpeg.

| | Playwright + ffmpeg (chosen) | Remotion |
|---|---|---|
| Licence | Playwright: Apache-2.0. ffmpeg: LGPL/GPL, used as a command-line program — nothing to license for your videos | Free for individuals, companies of up to 3 employees and non-profits; other for-profit companies need a paid Company License ([LICENSE.md](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md), read 2026-11-15) |
| Who can use this repository without asking a lawyer | anyone | depends on the size of the company |
| Templates | the same HTML/CSS as posts and carousels, brand taken from the profile | React components |
| Dependencies | Node, Playwright, ffmpeg | Node, React, a bundler, Chromium, ffmpeg |
| Motion | simple: fades, slides, counters, scroll, pan — computed per frame from time, so output is identical on every run | richer: springs, sequences, a preview studio |
| Speed | about 25 s for a 23-second reel on 4 cores | comparable |

The toolkit is meant for any business, including companies with more than three people, and it
should not make them buy a licence to run an example. That decided it. If your team qualifies for
Remotion's free licence or already pays for it, and you need complex motion, Remotion is a good tool —
the scenario format here is plain YAML and would be easy to feed into it.

## How a reel is built

1. The scenario lists scenes: `title`, `stat`, `list`, `text`, `screenshot`, `screen`, `video`, `cta`.
2. `screen` scenes open a page (a local file or a URL) in a phone-sized viewport and capture it
   frame by frame while scrolling. `video` scenes take frames from any clip — a phone screen
   recording, or a Playwright recording (`recordVideo`) of a flow that needs clicks.
3. One HTML page holds all scenes. For each frame the tool sets the time, the page positions every
   element for that time, and a screenshot is piped to ffmpeg. Several browser pages render in parallel.
4. Audio: a generated or licensed music track, optional voice clips placed at the scene starts,
   music lowered under voice. Output: H.264 + AAC, 1080×1920, 30 fps, `+faststart`.
5. Next to the MP4: `*.phone-390.jpg` — one frame per scene scaled to a 390 px wide phone, to check
   that captions are readable — and `*.credits.txt` with the audio sources.

## Readability rules built into the tool

- Text stays out of the zones that apps cover: top 250 px, bottom 430 px, right 100 px.
- Text shrinks to fit, but the tool warns when any caption is under 44 px (about 16 px on a 390 px screen).
- 15–60 seconds; a warning outside that range.
