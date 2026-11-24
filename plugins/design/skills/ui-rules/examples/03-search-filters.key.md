# Key: 03 search and filters (phone, light, Russian)

Screens: `03-search-filters.bad.html`, `03-search-filters.good.html`. Boxes: `03-search-filters.key.jpg`.

## Context (fictional profile)

- **Who:** an Acme Shop customer looking for children's sneakers.
- **Device:** phone, 390 × 844, Russian.
- **State:** three filters set in an earlier visit are still applied. The query has a typo ("кросовки" instead of "кроссовки"). Results are still loading.
- **Frequency:** several searches per visit.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The person types the query with a typo.
2. They see "Загрузка…" (loading) and "Ничего не найдено" (nothing found) at the same time. *Assumed:* they read "nothing found" and stop there.
3. Nothing shows that size 31, "under 1000 ₽" and a brand filter are still applied. *Assumed:* they conclude that the shop does not sell children's sneakers.
4. A subscription pop-up covers the lower third of the screen. *Assumed:* they close it with the small "×" or leave the shop.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `#filters` | Three filters are applied. The icon button shows no count, and no chips are shown. | — | SEARCH-2 | 3: people think the shop has nothing | Show "Фильтры 3" and one removable chip per filter, plus "Сбросить всё". |
| 2 | `#empty` | The empty result is a dead end: no typo correction, no suggestion to relax filters, no reset. | — | SEARCH-1 | 3: a lost sale on a frequent task | Correct the typo ("Показаны результаты для «кроссовки»"). Explain which filter empties the list. Offer the nearest result and a reset. |
| 3 | `#loading`, `#empty` | "Nothing found" is shown while results are still loading. | — | STATE-2 | 3: a wrong answer on every slow connection | Show a skeleton while loading. Show the empty state only after the answer comes. |
| 4 | `#promo` | A subscription pop-up opens during search and covers a third of the screen. | 366 × 160 px | ACT-8 | 2: an interruption on a frequent task; it can be closed | Do not show it during search. Offer the discount after the first order, once. |
| 5 | `#t-scan`, `#t-cmp` | Tab bar icons without labels; "⌗" (scanner) and "⇄" (comparison) are not universal. | — | EXP-7 | 2: people guess or never use these sections | Add a text label under every tab icon. |
| 6 | `#clear` | The clear button is 16 × 16 px inside the search field, with a light grey icon. | 16 × 16 px. Its 24 px circle overlaps the field, so it fails WCAG 2.5.8. Icon contrast 1.65:1 fails 1.4.11. | ACT-1 (also COLOR-1) | 3: an AA failure on the main path, though people can still delete text by hand | Make the hit area 44 × 44 px and the icon contrast at least 3:1. |

## Taste, not defects

- **Pale green pill chips for categories.** A style choice.
- **Category chips scroll sideways.** A common pattern. Wrapping would push the results down.
- **Rounded search field.** Fine either way.

## Traps

- **STATE-3 (placeholder is not a label):** a single search field with a search context and an accessible name is a common, recognised pattern. The rule targets forms. Not a defect here.
- **"Seven, plus or minus two" for twelve categories:** the chips are visible, so nothing has to be held in memory (MEM-2 covers unseen items only).
- **LAYOUT-3 (one focal point):** the green pop-up is the strongest element. Report it once, under ACT-8, where the harm is.

## Not checked

- The results state after loading ends.
- Whether the result count is announced to screen readers (WCAG 4.1.3).
- The desktop layout.

## Severity calibration

| Defect | Where it appears | Severity |
| --- | --- | --- |
| No filter count on the button | A desktop catalogue with a visible sidebar of applied filters | Not a defect |
| No filter count on the button | Here, on a phone, where filters hide behind an icon | 3 |
