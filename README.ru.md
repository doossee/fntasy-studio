<!-- Логотип: здесь будет логотип fntasy studio от владельца (файл ещё не передан). -->

# fntasy studio

Каталог из трёх независимых плагинов для Claude Code. Каждый ставится и работает отдельно; общего
кода у них нет.

| Плагин | Для чего | Что добавляет |
|---|---|---|
| [`growth`](plugins/growth/README.ru.md) | исследовать рынок и вести маркетинг | навык `growth`: исследование конкурентов и рынка по открытым данным шаг за шагом, Telegram и Центральная Азия в первую очередь; инструменты в клоне: посты, карусели, сторис, рилсы со звуком, контент-план, UTM-ссылки, отчёт за неделю |
| [`design`](plugins/design/README.ru.md) | проектирование и проверка интерфейсов | навык `ui-rules`: 52 проверяемых правила в 12 группах по WCAG 2.2, NN/g, Baymard, Apple HIG, Material 3, Laws of UX и другим, с порогами по видам, силой основания, конфликтами, калибровкой серьёзности, профилем проекта, примерами экранов с ключами и скриптом замеров |
| [`review`](plugins/review/README.ru.md) | правки, которые можно сливать, не веря автору на слово | агент `code-reviewer`: критерии приёмки → `файл:строка` и тесты, права, изоляция клиентов, деньги, миграции, секреты; запускает линтер, типы и тесты |

English: [README.md](README.md).

![Карусель, сделанная плагином growth](plugins/growth/examples/preview/carousel-first-lesson.ru.jpg)

Продукты во всех примерах вымышленные.

## Установка

```
/plugin marketplace add doossee/fntasy-studio
/plugin install growth@fntasy-studio
/plugin install design@fntasy-studio
/plugin install review@fntasy-studio
```

Ставьте любой из них. Из терминала:
`claude plugin marketplace add doossee/fntasy-studio && claude plugin install review@fntasy-studio`.

| Плагин | Как вызвать |
|---|---|
| `growth` | `/growth:growth`, или Claude подключает навык сам, когда вы просите исследование |
| `design` | навык `ui-rules` загружается сам, когда вы проектируете или проверяете экран; или `/design:ui-rules` |
| `review` | `@agent-review:code-reviewer` |

Попробовать локальную копию: `claude plugin marketplace add /путь/к/fntasy-studio` и установка как выше.

## design переписывается

Всё из `design` 0.3.0 удалено: навык `design-review`, команда `audit`, агент `design-reviewer`, хук-шлагбаум ревью, скрипты измерений и чек-листы. Новый плагин пишется по новым материалам; первая часть — навык `ui-rules` (0.5.0).

## Что изменилось в design 0.3.0

- `design` теперь только проверяет: дизайн рисуют как угодно, плагин его ревьюит. Навыки `ui-craft` и `ux-clarity` стали одним навыком `design-review` с двумя линзами; агенты `ux-reviewer`, `ui-reviewer` и `design-judge` — одним агентом `design-reviewer`; команды `ui-audit`, `ux-audit` и `design-variants` — одной командой `audit`. Режим свободы и рубрика «уровень лучших» удалены.
- Новое: необязательный хук Stop `design-review-gate` — просит ревью перед сдачей работы с изменённым интерфейсом.

## Что изменилось в design 0.2.1

- Новый агент `ui-reviewer` в `design`: независимое ревью внешнего вида правки, рядом с `ux-reviewer`.

## Что изменилось с 0.1

- Репозиторий и каталог называются `fntasy-studio` (были `growth-studio`). Старый адрес переадресует.
- Три плагина вместо двух, каждый в своей папке: `growth` (был `growth-studio`), `design` (был `design-skills`), `review` (новый).
- Новые агенты: `ux-reviewer` в `design`, `code-reviewer` в `review`.
- Инструменты роста переехали в `plugins/growth/`: `npm install` и `npm run …` запускаются там.
- Версия всех плагинов — 0.2.0.

## Что где лежит

```
.claude-plugin/marketplace.json   каталог: три плагина, у каждого свой source
plugins/growth/    навык growth, tools/, profiles/example, examples/, docs/, scripts/, package.json
plugins/design/    собирается заново; навык ui-rules
plugins/review/    агент code-reviewer; references/review-guide.md
docs/tasks/        файлы заданий этого репозитория
```

## Лицензия

Apache License 2.0 — см. [LICENSE](LICENSE) и [NOTICE](NOTICE). Шрифт Inter в
`plugins/growth/profiles/example/fonts/` остаётся под своей лицензией SIL Open Font License 1.1.
