# Mode (d): event — exhibition, forum, conference

Result: five files the user can print and rehearse. Work step by step as in every mode; each step
ends with "next / skip / stop".

Ask first (one message): event name and date · who is in the room and how many · the slot
(stage talk, booth, both) · the one action wanted from a visitor (scan a QR, book a demo, join the
channel) · languages. Take product facts from the profile; any number not in the profile or in a
**seen** finding is written as `[N]` with a note what to measure.

| # | Step | File | Rule |
|---|---|---|---|
| 1 | Audience and goal | `brief.md` | one sentence: "After the talk, [who] will [do what]". The event's public programme and exhibitor list are sources — mark what you saw |
| 2 | Talk, 5–7 minutes | `talk.md` | 650–900 words at speaking pace; structure below |
| 3 | One-page theses | `one-pager.md` | fits one A4 page: 5–7 theses, each a full sentence with a number |
| 4 | Handout with QR | scenario for `tools/cards` (`type: handout`) | one promise, three facts, one QR; the QR link has its own UTM (`utm_source=offline`, `utm_content=<event>`) |
| 5 | Questions and answers | `qa.md` | 8–10 questions the audience will really ask, including the unpleasant ones (price, "why not X", "what if it fails"); answers of 2–3 sentences |
| 6 | Booth pitch, 30 seconds | `pitch.md` | 60–75 words; ends with a question to the visitor |

## Talk structure (5–7 minutes)

| Time | Part | Content |
|---|---|---|
| 0:00–0:40 | Opening | a concrete situation the audience knows, with a number. No greeting paragraph, no company history |
| 0:40–2:00 | Problem | what it costs them today: money, hours, lost customers |
| 2:00–4:30 | What we do | three points, one example each; show, do not list features |
| 4:30–5:30 | Proof | one case with before/after numbers (with permission) or a live demonstration |
| 5:30–6:30 | Ask | one action, said twice, with the QR on screen |

Write the talk as spoken text: short sentences, no brackets, numbers rounded so they can be said
aloud. Mark pauses and the slide change. Write it in the language it will be spoken in; if two
languages are needed, write two texts, not a translation.

## Booth pitch (30 seconds)

1. Who it is for — one sentence.
2. What changes for them — one sentence with a number.
3. Proof — one fact.
4. A question that starts a conversation: "How do you handle … now?"

## Handout scenario

```yaml
type: handout
name: handout-<event>
title: { ru: "…", uz-Latn: "…" }
items:
  - { ru: "…", uz-Latn: "…" }      # three facts with numbers
button: { ru: "Сканируйте", uz-Latn: "Skanerlang" }
link: https://…?utm_source=offline&utm_medium=qr&utm_campaign=<event>
qr: true
contacts: { ru: "Telegram: @…\nТел.: …" }
```

Run: `node tools/cards/cards.mjs handout.yaml` → PNG and PDF, A4.

## After the event

Add a row to the weekly report: scans (visits with the event's UTM), leads, sales, cost of
participation → cost per lead. Decide on the next event from that number.
