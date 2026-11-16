<!-- Логотип: здесь будет логотип fntasy studio от владельца (файл ещё не передан). -->

# fntasy studio

Каталог из трёх независимых плагинов для Claude Code. Каждый ставится и работает отдельно; общего
кода у них нет.

| Плагин | Для чего | Что добавляет |
|---|---|---|
| [`growth`](plugins/growth/README.ru.md) | исследовать рынок и вести маркетинг | навык `growth`: исследование конкурентов и рынка по открытым данным шаг за шагом, Telegram и Центральная Азия в первую очередь; инструменты в клоне: посты, карусели, сторис, рилсы со звуком, контент-план, UTM-ссылки, отчёт за неделю |
| [`design`](plugins/design/README.ru.md) | ровные, сильные и понятные экраны | навыки `ui-craft`, `ux-clarity` с измеримыми правилами и скриптом измерений; команды `ui-audit`, `ux-audit`, `design-variants`; агенты `design-judge` (слепая оценка по рубрике), `ux-reviewer` (независимое ревью удобства) и `ui-reviewer` (независимое ревью внешнего вида) |
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
| `design` | навыки загружаются сами, когда вы проектируете или проверяете экран; `/design:ui-audit <адрес>`, `/design:ux-audit <адрес>`, `/design:design-variants <экран>`; `@agent-design:design-judge`, `@agent-design:ux-reviewer`, `@agent-design:ui-reviewer` |
| `review` | `@agent-review:code-reviewer` |

Попробовать локальную копию: `claude plugin marketplace add /путь/к/fntasy-studio` и установка как выше.

## Два ревьюера

`ux-reviewer`, `ui-reviewer` (плагин `design`) и `code-reviewer` (плагин `review`) устроены одинаково: выводы автора им
не передаются, они читают и запускают, но не правят, у каждой находки есть улика, ответ начинается с
вердикта. Оба читают профиль самого проекта, `.claude/review-profile.md`: кто пользуется продуктом и
зачем, рискованные действия, команды, сознательные решения. Формат — в README плагинов. Ничего о
конкретном продукте в них не зашито.

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
plugins/design/    навыки ui-craft, ux-clarity, ui-audit, ux-audit, design-variants; агенты design-judge, ux-reviewer, ui-reviewer
plugins/review/    агент code-reviewer; references/review-guide.md
docs/tasks/        файлы заданий этого репозитория
```

## Лицензия

Apache License 2.0 — см. [LICENSE](LICENSE) и [NOTICE](NOTICE). Шрифт Inter в
`plugins/growth/profiles/example/fonts/` остаётся под своей лицензией SIL Open Font License 1.1.
