# growth — плагин каталога fntasy studio

Исследовать рынок и вести маркетинг из одной папки.

- **навык роста** — исследование конкурентов и рынка по открытым данным, шаг за шагом; у каждой находки источник и пометка «видели» или «предполагаем»;
- **инструменты производства** — посты, карусели, сторис и вертикальные рилсы со звуком: из текстового сценария одной командой;
- **контент-план, UTM-ссылки и еженедельный отчёт**, чтобы заявки приходили в CRM с источником.

English: [README.md](README.md). Каталог: [fntasy studio](../../README.ru.md).

![Карусель](examples/preview/carousel-first-lesson.ru.jpg)

Продукты во всех примерах вымышленные. Превью — в [`examples/`](examples/).

## Установка

```
/plugin marketplace add doossee/fntasy-studio
/plugin install growth@fntasy-studio
```

Из терминала: `claude plugin marketplace add doossee/fntasy-studio && claude plugin install growth@fntasy-studio`.

| Что добавляет | Как вызвать |
|---|---|
| навык `growth` | `/growth:growth`, или Claude подключает его сам, когда вы просите исследование |

Плагин ставит навык. Инструменты производства запускаются из клона репозитория, из этой папки — см. [Быстрый старт](#быстрый-старт).

## Что изменилось с 0.1

- Плагин называется `growth` (был `growth-studio`) и лежит в `plugins/growth/` каталога `fntasy-studio` (был корень репозитория).
- Инструменты, пример профиля, примеры, документы и `package.json` переехали в `plugins/growth/`: `npm install` и все команды `npm run …` запускаются из этой папки.
- Пакеты рабочих областей называются `@fntasy-studio/*`. Поведение инструментов не изменилось.

## Чем отличается

Обычные инструменты роста рассчитаны на английский язык, крупные сайты и западные площадки. Этот набор сделан для того, что они пропускают.

**Telegram**

- читает публичные каналы через `t.me/s/<канал>` без входа и ключей: подписчики, ритм, медиана просмотров, лучшие посты — [`skills/growth/scripts/tg-channel.mjs`](skills/growth/scripts/tg-channel.mjs);
- методика для чатов, каталогов и открытой статистики каналов, рекламных постов, ботов — [`references/telegram.md`](skills/growth/references/telegram.md);
- ссылки для ботов: источник передаётся в параметре `/start`, куда UTM-метки не доходят;
- публикация в канал через бота.

**Центральная Азия и СНГ**

- тексты на нескольких языках из одного сценария: узбекский (латиница), русский, казахский и другие; правильные узбекские `oʻ`, `gʻ`; шрифт с полной кириллицей;
- местные карты и площадки в шагах исследования: Yandex Maps, 2GIS, доски объявлений, маркетплейсы, сайты вакансий;
- методика для маленьких сайтов, по которым у платных сервисов аналитики нет данных, — [`references/central-asia.md`](skills/growth/references/central-asia.md).

## Быстрый старт

Нужны **Node.js 20+** и **ffmpeg** (для рилсов). Python не нужен.

```bash
# macOS
brew install node ffmpeg

# Ubuntu / Debian (если в дистрибутиве Node старше 20 — поставьте из NodeSource или через nvm)
sudo apt update && sudo apt install -y nodejs npm ffmpeg
```

```bash
git clone https://github.com/doossee/fntasy-studio.git
cd fntasy-studio/plugins/growth
npm install
npx playwright install chromium          # Linux: npx playwright install --with-deps chromium

npm run post     -- examples/scenarios/post-trial.yaml             # → out/post-trial/<язык>/post-trial.png
npm run carousel -- examples/scenarios/carousel-first-lesson.yaml  # → out/carousel-first-lesson/<язык>/01.png …
npm run story    -- examples/scenarios/story-reminder.yaml         # → PNG 1080×1920
npm run reel     -- examples/scenarios/reel-open-day.yaml          # → out/reel-open-day/reel-open-day.<язык>.mp4
```

Всё пишется в `out/` — эта папка в git не попадает. `npm run examples` пересобирает все примеры и превью.

| Команда | Что делает | Подробнее |
|---|---|---|
| `npm run post -- <сценарий>` | пост 1080×1350 или 1080×1080 | [tools/cards](tools/cards/README.md) |
| `npm run carousel -- <сценарий>` | карусель, 2–10 слайдов | [tools/cards](tools/cards/README.md) |
| `npm run story -- <сценарий>` | сторис 1080×1920 | [tools/cards](tools/cards/README.md) |
| `npm run handout -- <сценарий>` | раздаточный листок A4 с QR, PNG + PDF | [tools/cards](tools/cards/README.md) |
| `npm run reel -- <сценарий>` | рилс 1080×1920 с музыкой, голос по желанию | [tools/reel](tools/reel/README.md) |
| `npm run utm -- --source telegram --content post_1` | UTM-ссылка и ссылка на Telegram-бота | [tools/utm](tools/utm/README.md) |
| `npm run plan -- init --out plan.yaml` / `render plan.yaml` | контент-план на 4 недели → Markdown + CSV | [tools/plan](tools/plan/README.md) |
| `npm run report -- <week.csv>` | отчёт за неделю: охват, заявки по UTM, стоимость заявки | [tools/metrics](tools/metrics/README.md) |
| `npm run tg:channel -- <канал>` | цифры публичного Telegram-канала | [telegram.md](skills/growth/references/telegram.md) |
| `npm run tg:post -- --chat @канал …` | пост в свой канал через бота (без `--send` ничего не отправляет) | [tools/publish](tools/publish/README.md) |

Все команды принимают `--profile <путь>`.

## Навык роста

`skills/growth/` работает по шагам. После каждого шага навык показывает находку и источник, ставит
пометку **«видели»** (есть ссылка или снимок), **«предполагаем»** (вывод) или **«не увидели»**
(источник не открылся — навык просит снимок экрана, а не додумывает), говорит, что с этим
делать, и ждёт «дальше / пропустить / стоп».

| Режим | Результат |
|---|---|
| (а) разбор конкурента или примера | что он делает, откуда растёт, какие приёмы работают |
| (б) разбор рынка: город или страна + ниша | кто есть, где они, что публикуют, какая реклама идёт |
| (в) «что повторить у нас» | 10 приёмов с доказательствами и план на 14 дней по каналам |
| (г) «событие» | выступление на 5–7 минут, тезисы на страницу, листок с QR, вопросы аудитории, питч у стенда на 30 секунд |

Источники бесплатные и открытые: сайт, Meta Ad Library, то, что видно без входа в Instagram и
Facebook, публичные Telegram-каналы и открытая статистика каналов, поиск Google, ответы
ИИ-ассистентов, отзывы и карты, вакансии и новости. Платные источники — только с вашим ключом,
переданным через переменную окружения.

Демо: [разбор публичной компании](examples/growth-demo/competitor-duolingo.md),
[шаг по Telegram на крупном публичном канале](examples/growth-demo/tg-telegram.md).

### Как подключить навык в Claude Code

Три способа, выберите один.

**1. Плагин** — см. [Установка](#установка):

```
/plugin marketplace add doossee/fntasy-studio
/plugin install growth@fntasy-studio
```

Навык будет доступен как `/growth:growth`; Claude также подключает его сам, когда вы просите
исследование.

**2. Копия** папки в проект или в домашний каталог:

```bash
mkdir -p .claude/skills && cp -r /путь/к/fntasy-studio/plugins/growth/skills/growth .claude/skills/     # этот проект
mkdir -p ~/.claude/skills && cp -r /путь/к/fntasy-studio/plugins/growth/skills/growth ~/.claude/skills/ # все проекты
```

**3. Ссылка**, чтобы навык обновлялся вместе с `git pull`:

```bash
mkdir -p ~/.claude/skills && ln -s /путь/к/fntasy-studio/plugins/growth/skills/growth ~/.claude/skills/growth
```

Дальше — команда `/growth` или просьба обычными словами: «разбери по шагам, откуда <конкурент> берёт клиентов».
Папка навыка самодостаточна (скрипту для Telegram нужен только Node 18+); инструменты производства
используются, если репозиторий под рукой.

## Свой профиль

Профиль задаёт продукт, аудиторию, рынок, языки и бренд. В ядре нет привязки к какому-либо продукту.

1. Скопируйте `profiles/example/` куда угодно. Профиль не обязан лежать в этом репозитории, а для настоящего бизнеса и не должен: держите его в своём приватном репозитории.
2. Отредактируйте `profile.yaml`: продукт, аудитория, страна и город, языки (`uz-Latn`, `ru`, `kk`…), каналы, цвета, шрифты, логотип, ссылки и UTM по умолчанию. Описание полей: [`references/profile.md`](skills/growth/references/profile.md).
3. Передайте путь: `--profile /путь/к/профилю` или `export GROWTH_PROFILE=/путь/к/профилю`.

```bash
npm run post -- my-post.yaml --profile ~/work/my-product/growth-profile
```

Из этой папки (`plugins/growth`) инструменты без указания профиля берут `profiles/example` и сообщают об этом; в другом месте — нейтральные настройки. Навык без профиля задаёт четыре коротких вопроса и работает.

## Честно об ограничениях

- **Публикация.** В Telegram-канал можно публиковать через бота. У Instagram есть официальный API, но для него нужны профессиональный аккаунт, приложение Meta и медиа по публичной ссылке; большинству небольших компаний проще загружать вручную через Meta Business Suite. Подробно: [docs/publishing.md](docs/publishing.md).
- **Музыка.** По умолчанию дорожка создаётся кодом и лицензии не требует. Любая другая дорожка должна быть записана в манифест с источником и лицензией — иначе сборка останавливается. Какие библиотеки подходят: [docs/music.md](docs/music.md).
- **Голос.** По желанию. Варианты для узбекского, русского и казахского с лицензиями и ценами: [docs/voice.md](docs/voice.md). Без голоса рилс собирается с музыкой и крупными подписями.
- **Исследование.** Часть источников агенту не открывается (Meta Ad Library, счётчики Instagram). Навык говорит об этом прямо и просит снимок экрана, а не додумывает.
- **Движение в рилсах.** Playwright и ffmpeg, не Remotion — чтобы компания любого размера могла запускать без покупки лицензии. Доводы: [docs/reels.md](docs/reels.md).
## Что где лежит

```
skills/growth/       навык роста: SKILL.md, references/, templates/, scripts/
tools/cards/         посты, карусели, сторис, листки → PNG
tools/reel/          рилсы со звуком → MP4; генератор собственной музыки
tools/utm/           UTM-ссылки и ссылки на Telegram-бота
tools/plan/          контент-план
tools/publish/       публикация в Telegram через бота
tools/metrics/       отчёт за неделю
profiles/example/    профиль вымышленной языковой школы в Самарканде
examples/            сценарии, небольшие превью, демо навыка роста
docs/                лицензии музыки, варианты озвучки, публикация, метрики, рилсы
scripts/             проверка, сборка примеров, синхронизация общих копий, снимки демо
```

Папку любого инструмента и папку навыка можно скопировать отдельно и использовать без остального.

## Шрифты и чужие материалы

`profiles/example/fonts/InterVariable.woff2` — Inter, лицензия SIL Open Font License 1.1 (рядом `Inter-OFL.txt`).
Зависимости: Playwright (Apache-2.0), `yaml` (ISC), `qrcode` (MIT).

Лицензия: Apache-2.0, см. [LICENSE](../../LICENSE).
