# Search

Finding one thing among many: the search field, suggestions, results, filters and sorting. When a list grows past a screen or two, search and filters become the navigation.

## Review questions

- Is search visible where people expect it, and does it understand typos, synonyms and partial words?
- Does every result list say what was searched and how many results there are, and does "no results" offer a way forward?
- Can people see which filters are applied and remove them one by one?
- Does any filter combination lead to an empty list without warning?
- Are the query, filters, sort and scroll position kept when people go back?

## SEARCH-1. Search finds what people mean and never dead-ends

**Lens.** UX.

**Rule.** Where people need to find one item among many, a search field is visible (not only an icon) on the screens where they look for things, wide enough for a typical query. Search tolerates typos, plurals, word order, letter case, accents and the alternative names people use (including the profile's other languages and scripts). Suggestions appear as people type, can be chosen with the keyboard, and do not hide the typed text. The results page repeats the query, shows the number of results, and highlights why each result matched. "No results" is never a dead end: it suggests corrections, related items or removing filters, and keeps the query editable.

**Why.** People who search have already decided what they want and expect the product to understand their words, not the catalogue's. A strict search that fails on a typo or a synonym tells them the item does not exist, and they leave or call support.

**How to check.**
- Search is visible on the screens where people look for items; on phones the field or a labelled button is in the header.
- Try queries: a misspelling, a plural, a synonym, a partial word, two words in the other order, another script or language from the profile. Each finds the item.
- Type slowly: suggestions appear, arrow keys move through them, Enter picks, Escape closes, the typed text stays visible.
- Results: the query is shown and editable; the count is shown; matched words are highlighted.
- Search for something that does not exist: the page offers a correction, related items or "clear filters", and a way to contact a person if the product has one.
- Results are announced to screen readers when they update.

**Thresholds.** Updated result counts announced as status messages [WCAG 4.1.3 AA]; suggestion lists operable by keyboard [WCAG 2.1.1 A]; the field has a visible label or a labelled button [WCAG 2.5.3 A for the accessible name containing the visible label].

**Bad → Good.** In Acme Shop "sneakers" finds nothing because the catalogue says "trainers", and "No results" stands alone on a white page → "sneakers" finds trainers; a misspelt "trainrs" shows "Showing results for trainers"; an empty search suggests "Running shoes" and "Clear filters".

**Limits.** Small, fully visible lists (under one screen) need no search. Exact-match search is right for identifiers (order numbers, codes), but it should then say so and accept common formats (ACT-7).

**Conflicts.** C-14.

**Evidence.** Research (search and site-search usability testing, much of it in e-commerce) and Practice.

## SEARCH-2. Filters and sorting show what is applied and never trap people

**Lens.** UX.

**Rule.** Filters match the attributes people actually choose by, use their words, and show how many results each option gives when that number is known. Applied filters are visible above the results as removable chips, with one "Clear all". Changing a filter keeps the others and the scroll position where possible; on phones, filters open in a sheet with a clear "Show N results". Combinations that give zero results are prevented or announced before people apply them. The current sort order is visible and named in plain words ("Price: low to high"). Query, filters and sort survive going back, a page reload and sharing a link.

**Why.** Filters that hide what is applied make people think the catalogue is small or the item missing. A filter that resets the others or jumps to the top punishes every adjustment. Losing all choices on Back turns a five-minute search into starting over.

**How to check.**
- Apply three filters: each shows as a removable chip; removing one keeps the other two; "Clear all" removes all.
- Option counts: shown when known, and options with zero results are disabled or marked.
- On a phone, the filter sheet shows how many results the current choice gives before applying.
- Sort: the current sort is visible and worded plainly.
- Go to an item and press Back: the same query, filters, sort and scroll position. Reload: the same. Copy the address into a new window: the same results.
- Every filter control works with the keyboard and announces its state.

**Thresholds.** Keyboard access [WCAG 2.1.1 A]; filter state not by colour alone [WCAG 1.4.1 A]; result-count changes announced [WCAG 4.1.3 AA].

**Bad → Good.** Acme's order list has filters in a side panel that collapses after each choice, shows no applied state, and Back from an order resets the list to "All orders" at the top → chips "Unpaid × · This week × · Courier: Ali ×" above the list with "Clear all"; Back returns to the same filtered list at the same row.

**Limits.** Products with few items need no filters. Faceted filters with counts may be too slow on huge catalogues; then show counts after applying.

**Conflicts.** C-14.

**Evidence.** Research (filtering and sorting usability testing, mostly e-commerce in the US and Europe) and Practice.
