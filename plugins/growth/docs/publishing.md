# Publishing: what can be automated today

Nothing in this repository publishes by itself. Tools write files; a person (or an agent that the
person explicitly tells to) sends them.

## Telegram channel — can be automated

- Create a bot with @BotFather, add it to the channel as an administrator with the right to post.
- Put the token in the environment: `export TELEGRAM_BOT_TOKEN=…` (or your environment's secret store). Never in a file.
- `node tools/publish/telegram.mjs --chat @channel --photo a.png --text "…" --send`
  - text, one photo, an album of 2–10 photos (a carousel), one video (a reel), an optional URL button;
  - without `--send` it prints the request and sends nothing;
  - limits: caption 1024 characters, text 4096, upload 50 MB.
- Scheduling: run the command from cron or a scheduled agent task. The Bot API has no "post later" call.
- Not available to bots: stories, statistics of views by source. Views are visible on the post and at `t.me/s/<channel>`.

Status in this repository: the request building is tested in dry-run mode. A real send was **not**
tested here because no token was provided.

## Instagram — manual by default

The official route is the Instagram API content publishing
([documentation](https://developers.facebook.com/docs/instagram-platform/content-publishing), read 2026-11-15):

- needs an Instagram **professional** account and a Meta developer app with the
  `instagram_content_publish` (or `instagram_business_content_publish`) permission;
- media must be "hosted on a publicly accessible server at the time of the attempt" — a local file cannot be uploaded directly;
- images must be JPEG; reels, carousels and stories are supported; there is a daily cap on API posts;
- publishing for accounts other than your own requires the app to pass Meta's review. For your own
  account an app in development mode is usually enough — confirm in the Meta app dashboard, this was not tested here.

For a small business the setup costs more than it saves. Recommended: upload by hand in
**Meta Business Suite** (it schedules posts, reels and stories for Instagram and Facebook), using the
files from `out/` and the text from the plan.

Do not use unofficial libraries that log in with a password: they break the platform rules and put the account at risk.

## TikTok, YouTube Shorts

Upload by hand. Their publishing APIs require app review. The reel file is the same MP4.

## Checklist before any post

1. The link carries UTM tags (`tools/utm`), and a test click shows the source in the CRM.
2. A native speaker has read each language.
3. Music credit is in the caption if the licence requires it (`*.credits.txt`).
4. Names, photos and results of real people — only with their written consent.
5. Status in the plan is changed to `published`.
