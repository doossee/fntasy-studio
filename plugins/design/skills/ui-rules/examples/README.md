# Examples: screen pairs with keys

Five fictional screens of Acme (an app for small shops) and Acme Shop (its customer web shop).

## Files in each pair

- **`.bad.html`:** a screen with planted defects.
- **`.good.html`:** the same screen fixed.
- **`.key.md`:** the answer key.
- **`.key.jpg`:** the bad screen with a numbered red box over each defect.
- **`.boxes.json`:** the selectors used to draw the boxes.

Each HTML file is self-contained: system fonts, no images, no network. A comment at the top gives the viewport, theme and language.

No real people were tested on these screens. Every predicted outcome in the keys is marked **assumed**. Model-written Arabic and Uzbek strings are noted as not checked by native speakers.

## What each pair teaches

| Pair | Device, theme, language | Topic and states | Main lessons |
| --- | --- | --- | --- |
| 01 checkout | Phone 390, light, EN | Payment after an error | HONEST-1 (preselected add-on, fake urgency), COLOR-1 with the large-text threshold, STATE-3 (placeholder labels, erased input), TEXT-4. A WCAG pass by spacing versus the platform target. |
| 02 orders table | Desktop 1280, dark, DE | Data table, long data, keyboard focus | DATA-1 and DATA-2, COLOR-2 (status by colour only), STATE-1 (invisible focus on a destructive button), TEXT-5 (German compounds), EXP-6. When a table may scroll sideways. |
| 03 search and filters | Phone 390, light, RU | Search, filters, loading, empty | SEARCH-1 and SEARCH-2, STATE-2 ("nothing found" while loading), ACT-8 (pop-up during a task), EXP-7, ACT-1 with WCAG 2.5.8 spacing |
| 04 sign-up | Phone 390, light, AR (RTL) | Form, error, permission | TEXT-5 (RTL layout and mirrored icons), ACT-7 (phone formats), ACT-6, HONEST-3, DATA-2 (ambiguous dates). What does not need mirroring. |
| 05 dashboard | Desktop 1280, dark, UZ | Dashboard, empty first day, error | LAYOUT-1, -3 and -5, STATE-5 (error channel by urgency), STATE-2, COLOR-4 (dark theme surfaces), COLOR-1 |

Every key also lists:

- remarks that sound right but are **taste**;
- **traps**, where a rule seems to apply and does not;
- what was **not checked**;
- a **severity calibration**: the same defect in another place.

## How a key is written

1. **Context:** a fictional profile with who, device, task, frequency and cost.
2. **Walk-through:** the task step by step. Each predicted outcome is marked *assumed*.
3. **Defects table:**
   - number (matches the box);
   - where (selector);
   - what is visible;
   - measured number;
   - rule ID;
   - severity 1–4 with the reason;
   - smallest fix.
4. **Taste**, **Traps**, **Not checked** and **Severity calibration**.

Measured numbers come from the computed styles in Chromium:

- contrast by the WCAG formula against the nearest opaque background;
- sizes from the bounding box;
- truncation from `scrollWidth > clientWidth`.

## Regenerate the key images

From `plugins/design`:

```bash
node evals/render-keys.mjs skills/ui-rules/examples evals/holdout/keys
```

The script needs Playwright. It falls back to the Chromium at `/opt/pw-browsers/chromium`, or `DESIGN_CHROMIUM=/path/to/chrome`.

After rendering, open each JPEG and check that every box sits on its defect.

## Held-out screens

The held-out test set is in `../../../evals/holdout/`. Do not use it for teaching or for writing rules.
