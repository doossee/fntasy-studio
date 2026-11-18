# design — плагин каталога fntasy studio

Независимое ревью дизайна интерфейсов. Рисуйте экраны как угодно — с любым навыком, любым инструментом или без них; плагин
находит в результате то, что сломано, неровно или непонятно, и говорит, что исправить, с уликами.

- **design-review** — навык с двумя линзами: **понятность** (поймёт ли новый пользователь экран с телефона без объяснений) и **вид** (ровно ли и спокойно ли). Измеримые правила, два чек-листа с баллом, одна шкала серьёзности 1–4 и формат отчёта;
- **скрипты измерений** для любого адреса или HTML-файла: стоп-пункты, цели касания, горизонтальная прокрутка, обрезанные подписи, показатели композиции, снимки с разметкой и «прищур»;
- **design-reviewer** — агент, который смотрит изменение свежими глазами: проходит задачи пользователя в работающем продукте на четырёх ширинах, размечает улики на снимках, отделяет ошибку от вкуса, возвращает «принять / доработать / вернуть»;
- **/design:audit** — команда ревью одного экрана по адресу;
- **необязательный хук Stop** — сессия просит ревью, прежде чем сдать работу с изменённым интерфейсом.

English version: [README.md](README.md). Каталог: [fntasy studio](../../README.ru.md).

## Что изменилось в 0.3.0

- **Только ревью.** Плагин больше не подсказывает, как рисовать экран: дизайн делают свободно, плагин его проверяет. Навыки `ui-craft` и `ux-clarity` стали одним навыком `design-review` с двумя линзами; правила, чек-листы и скрипты переехали с ним. Части для создания дизайна удалены: режим свободы, варианты, рубрика «уровень лучших».
- Один агент `design-reviewer` вместо `ux-reviewer` и `ui-reviewer`; агента `design-judge` и команды `design-variants` больше нет.
- Одна команда `/design:audit` вместо `/design:ui-audit` и `/design:ux-audit`.
- Новое: необязательный хук Stop `hooks/design-review-gate.mjs` — см. [Шлагбаум ревью](#шлагбаум-ревью).

Переход с 0.2: переименуйте копии `.claude/skills/ui-craft` или `ux-clarity` в проекте в `design-review`; формат профиля дизайна не изменился.

## Установка

### Плагином (рекомендуем)

```bash
/plugin marketplace add doossee/fntasy-studio
/plugin install design@fntasy-studio
```

Навык загружается сам, когда вы просите проверить экран. `/design:audit <адрес>` — ревью одной страницы; `@agent-design:design-reviewer` — ревью изменения.

### Отдельным навыком

Скопируйте `skills/design-review/` в `.claude/skills/` проекта (или в `~/.claude/skills/`), а `agents/design-reviewer.md` — в `.claude/agents/`. Навык работает из своей папки: скрипты лежат в `scripts/`.

### Скрипты измерений

Node 20+ и Playwright. Один раз в `skills/design-review/scripts/`: `npm install` и `npm run browser`.

## Ревью изменения

Вызывайте ревьюера, когда работа готова и ещё не сдана:

```
@agent-design:design-reviewer проверь ветку feature/orders против main: экраны «Заказы» и «Карточка заказа»; пользователь — продавец с телефона; работающая копия — http://localhost:3000
```

Дайте ему ветку, diff, 2–3 задачи пользователя и адрес работающей копии или папку снимков. Свои выводы («стало чище») не передавайте: ревью полезно тем, что независимо. Исправьте находки 3–4, и, если менялась раскладка, — ещё круг (не больше трёх).

## Шлагбаум ревью

По умолчанию выключен. Для проекта включается строкой `review-gate: true` в шапке `design-profile.md`, для сессии — `DESIGN_REVIEW_GATE=on`; `DESIGN_REVIEW_GATE=off` выключает.

Когда включён, он один раз не даёт закончить ответ, если файлы интерфейса отличаются от базовой ветки, работа сдаётся (закоммичено и запушено, коммитов сверх upstream нет) и именно этот diff интерфейса ещё не проверен. Пока работа идёт, он молчит. После ревью и исправлений:

```bash
node "${CLAUDE_PLUGIN_ROOT}/hooks/design-review-gate.mjs" --mark     # отметить текущий diff интерфейса как проверенный
node "${CLAUDE_PLUGIN_ROOT}/hooks/design-review-gate.mjs" --status   # нужно ли ревью сейчас
```

Что считается интерфейсом: `*.tsx *.jsx *.vue *.svelte *.astro *.html *.css *.scss *.less` вне тестов, stories, e2e и `node_modules`; `DESIGN_REVIEW_PATHS` (регулярное выражение по путям в репозитории) заменяет это правило. Базовая ветка: `DESIGN_REVIEW_BASE`, иначе `origin/HEAD`, `origin/main`, `origin/master`, `origin/dev`. Отметки лежат в каталоге git и не коммитятся.

## Измерить страницу

Из `plugins/design/` клона или с путём установленного навыка вместо `skills/`.

```bash
# вид: стоп-пункты, показатели композиции, снимки с разметкой и «прищур»
node skills/design-review/scripts/measure-look.mjs https://example.com
node skills/design-review/scripts/measure-look.mjs http://localhost:3000/orders --widths 1440,390 --out audit/orders

# понятность: цели касания, горизонтальная прокрутка, мелкий текст, главные кнопки, обрезанные подписи
node skills/design-review/scripts/measure-clarity.mjs http://localhost:3000/orders

# примеры в комплекте: чистый экран и тот же экран с нарушением на каждый стоп-пункт
node skills/design-review/scripts/measure-look.mjs skills/design-review/examples/acme-today-good.html skills/design-review/examples/acme-today-bad.html \
  --profile skills/design-review/examples/design-profile.md
```

Экран за входом, в окне или на вкладке: `--storage-state state.json`, `--cookie name=value` и действия по порядку: `--fill 'селектор=текст'`, `--click 'селектор'`, `--wait-for 'селектор'`, `--press Escape`. `--strict` завершает с кодом 1 при любом стоп-пункте. `--help` — все параметры; `skills/design-review/references/look/11-measure.md` объясняет каждое число.

## Профиль дизайна

Положите `design-profile.md` в корень проекта (или в `.claude/`, или в `docs/`). В шапке — числа для скриптов и включатель шлагбаума, в теле — текст для ревьюера:

```markdown
---
name: Acme Orders
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
fonts: [12, 14, 16, 18, 20, 24, 28, 30]
primary: "--primary"
main: "main"
languages: [en, de]
review-gate: true
---
## Product      кто пользуется, с какого устройства, ежедневные действия, привычные приложения
## Brand        роли цветов, шрифты, радиусы, движение (или ссылка на ваш дизайн-документ)
## Languages    какой язык самый длинный; списки слов
## Components   где библиотека компонентов
## Taste        что выбрал и что отклонил тот, кто принимает дизайн
## Decisions    намеренные отступления, которые не считаются ошибкой
## Domain examples   ваши экраны по родам, худшие данные
```

Полный формат — `skills/design-review/profile.md`, пример — `skills/design-review/examples/design-profile.md`. Нет профиля — ревью берёт шкалу и пороги по умолчанию, аудиторию выводит из экрана и пишет об этом первой строкой отчёта.

## Ограничения

- Скрипты работают только в Chromium и меряют то, что есть в DOM: не canvas, не текст на картинках, не iframe.
- Смысл не измеряется: называет ли кнопка свой результат — вопрос чек-листа по снимкам.
- Числа по умолчанию — для экранов продукта (админки, сводки, формы). Для маркетинговых страниц задайте свои `fonts` и `hero-numbers-only: false` в профиле.

## Источники

Правила написаны своими словами; у каждого — источники (стандарты, руководства платформ, исследования, статьи) в `references/look/sources.md` и `references/clarity/sources.md`, вместе с утверждениями, которые проверили и не подтвердили.

## Состав

```
skills/design-review/   SKILL.md, profile.md, checklist-clarity.md, checklist-look.md,
                        references/clarity/ (11 файлов), references/look/ (18 файлов), scripts/, examples/
skills/audit/           команда /design:audit
agents/                 design-reviewer.md
hooks/                  hooks.json, design-review-gate.mjs (и его тест)
```

Лицензия: Apache-2.0, см. [LICENSE](../../LICENSE).
