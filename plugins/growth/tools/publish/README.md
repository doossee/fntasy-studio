# publish — Telegram channel through a bot

```bash
export TELEGRAM_BOT_TOKEN=…        # from @BotFather; environment only, never a file
node tools/publish/telegram.mjs --chat @your_channel --text-file post.txt --photo out/post/ru/post.png          # dry run
node tools/publish/telegram.mjs --chat @your_channel --text-file post.txt --photo out/post/ru/post.png --send   # posts
```

- `--photo` once = a photo post; 2–10 times = an album (carousel); `--video` = a reel; `--button "Label|URL"`.
- Without `--send` nothing leaves the machine: the request is printed.
- The bot must be an administrator of the channel.

Instagram and other platforms: `docs/publishing.md` — honest list of what can and cannot be automated.
