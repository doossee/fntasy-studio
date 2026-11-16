# Voice-over: Uzbek, Russian, Kazakh

Voice is optional. Without it a reel is built with music and large captions.
Facts below were checked on **2026-11-15** against first-party pages; prices are list prices in USD.
No quality ranking is given: none was measured here — listen to a sample before you commit.

## How `tools/reel` takes voice

- `voice.files` — your own recordings, for example a teacher recorded on a phone.
- `voice.command` — any command that reads text on stdin and writes an audio file.
  This is how open models and paid APIs plug in; keys come from environment variables only.

See `tools/reel/README.md`.

## Open models

| Model | uz | ru | kk | Commercial use | Notes |
|---|---|---|---|---|---|
| [Silero](https://github.com/snakers4/silero-models) `v5_cis_base` | yes (`uzb_saida`, Latin and Cyrillic) | yes | yes (`kaz_zhadyra`, `kaz_zhazira`) | **yes — MIT** (`LICENSE_CIS`) | The only open Uzbek option with a commercial-friendly licence confirmed from a first-party source |
| Silero, all other models (`v5_cis_ext`, `v4_uz`, `v5_*_ru`…) | yes | yes | — | **no** — CC BY-NC-SA | Same repository, different licence: check the model name |
| [Piper](https://github.com/OHF-Voice/piper1-gpl) voices | no | `denis`, `dmitri` — CC0 datasets | `issai`, `iseke`, `raya` — CC BY 4.0, credit required | yes for the voices listed | `ru_RU-ruslan` is CC BY-NC-SA (no); `ru_RU-irina` — licence unknown (no). Engine is GPL-3.0; running it as a command-line tool does not affect your video |
| [Meta MMS-TTS](https://huggingface.co/facebook/mms-tts-uzb-script_cyrillic) | yes | yes | yes | **no** — CC BY-NC 4.0 | — |
| [Coqui XTTS-v2](https://huggingface.co/coqui/XTTS-v2) | no | yes | no | **no** — CPML, non-commercial | — |
| Community Uzbek models on Hugging Face | various | — | — | **unclear** | Licence tags are self-declared; training data not checked. Do not rely on a tag alone |

## Paid APIs (need a key)

| Service | uz | ru | kk | Price | Key (environment variable) |
|---|---|---|---|---|---|
| [Azure AI Speech](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) | `uz-UZ-MadinaNeural`, `uz-UZ-SardorNeural` | yes | `kk-KZ-AigulNeural`, `kk-KZ-DauletNeural` | $15 per 1M characters (neural); 0.5M characters free per month | `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` |
| [Yandex SpeechKit](https://aistudio.yandex.ru/docs/en/speechkit/pricing) | `nigora`, `zamira`, `yulduz` | many | `amira`, `madi`, `saule`, `zhanar` | API v3 ≈ $5.33 per 1M characters, excl. VAT; price depends on the contracting entity | `YANDEX_API_KEY` |
| [ElevenLabs](https://elevenlabs.io/pricing) | Eleven v3 only | all models | Eleven v3 only | from $6/month (Starter, 30k credits). **Free plan is non-commercial** | `ELEVENLABS_API_KEY` |
| [Google Cloud TTS](https://cloud.google.com/text-to-speech/pricing) | **no** | yes | **no** | $4–$30 per 1M characters by voice type, free monthly quota | `GOOGLE_APPLICATION_CREDENTIALS` |
| [OpenAI TTS](https://developers.openai.com/api/docs/guides/text-to-speech) | not in the supported list | yes | yes | $15 per 1M characters (`tts-1`); models are scheduled for shutdown on 2027-01-06 | `OPENAI_API_KEY` |

A 30-second reel is about 350–450 characters, so even paid voice costs under one cent per video.
The cost is in checking the result: have a native speaker listen before publishing, and pay
attention to loanwords, numbers and names.

Platforms may require a label on synthetic voice; check the current rules of the platform you post to.
