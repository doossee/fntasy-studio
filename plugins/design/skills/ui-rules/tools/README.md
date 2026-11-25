# measure.mjs

Measures a rendered screen and lists the numbers a reviewer would otherwise take by hand: contrast, target
sizes, type sizes, truncation, reflow, field labels, keyboard focus, icon names, spacing and layout shift.

**Every line it prints is a reason to look, not a finding.** A measurement becomes a finding only after
`../method.md` step 2: confirm it on the screen and in the task, try to refute it (another width, theme,
state, real content), and name who loses what. A script mark is never cited as a finding by itself.

## Run

```bash
node measure.mjs <url-or-file> [--width 390,1280] [--theme light,dark] [--out dir] [--wait ms]
```

- 320 px is always added to the widths (reflow, WCAG 2.2 1.4.10).
- `--theme` emulates the system colour scheme (`prefers-color-scheme`); motion is emulated as reduced.
- `--wait` is the pause after the page loads before measuring (default 800 ms).
- Output, by default in `measure-out/<name>/`: `report.md`, one `<width>-<theme>.json` with every
  measurement, and one `<width>-<theme>.aria.yaml` with what a screen reader is given (the ARIA snapshot).

Needs Node 18+ and Playwright (`npm i playwright`, or a global install, which the script also finds). The
browser is Playwright's Chromium; if it is missing, `/opt/pw-browsers/chromium` is tried; `DESIGN_CHROMIUM=/path/to/chrome`
overrides both. The page is loaded in a fresh context for every width and theme, so a page that needs a
sign-in must be served already signed in (or as a static file).

## What it measures

| Measurement | Rule | What it means | Blind spots |
| --- | --- | --- | --- |
| Text contrast | COLOR-1 (WCAG 1.4.3) | Ratio of each visible text's colour to the background found by walking up its ancestors and compositing translucent layers. Large text (24 px, or 18.66 px bold) needs 3:1, other text 4.5:1. | Text over an image or gradient is listed under "measure by eye", never guessed. Content positioned over a sibling (absolute, fixed) may sit on a background that is not its ancestor: marked uncertain. Opacity on ancestors, `text-shadow`, `backdrop-filter`, `mix-blend-mode` and colours in `oklch()`/`lab()` are not modelled. |
| Field boundaries | COLOR-1 (WCAG 1.4.11) | For text fields: the better of border-to-surroundings and fill-to-surroundings contrast; under 3:1 is listed. | Best effort. Shadows, bottom lines drawn with background images or pseudo-elements, and focus rings are not seen. Checkboxes and custom controls are skipped. |
| Targets | ACT-1 (WCAG 2.5.8; Apple 44 pt, Material 48 dp) | Bounding box of every interactive element. Under 24 × 24 CSS px is checked with the 2.5.8 spacing test (a 24 px circle on its centre must not touch another target or another small target's circle). Under 44 × 44 is listed as the platform guideline for touch. Links inside running text are skipped (exempt). | Uses the element's box: padding counts, a larger invisible hit area from a parent or pseudo-element does not. A checkbox with a label is flagged as small; check whether the label toggles it. |
| Type scale | TEXT-1 | Distinct font sizes (with element and character counts), weights and families. | Counts text in all states visible at load only. |
| Body size, line length | TEXT-2 | The size carrying most characters; for long paragraphs, characters per line (length ÷ lines), line-height ratio and alignment. Listed when over 80 characters a line, justified, or line height under 1.4. | Line count is estimated from height ÷ line height; floats and images inside a paragraph distort it. |
| Truncation | TEXT-3, DATA-2 | Elements whose text overflows a box that clips it (`overflow: hidden`, ellipsis, line clamp). | Text cut by a parent with fixed height, or hidden under another element, may be missed. |
| Reflow | TEXT-3, PLAT-1 (WCAG 1.4.10) | Whether the page scrolls sideways, and the widest elements. Tables, `pre` and grids are marked as possibly exempt 2D content. | Horizontal scrolling inside a container is not page scroll and is not reported. |
| Field labels | STATE-3 | Fields with no accessible name, with a placeholder as the only label, or named only by `aria-label`/`title` with no visible label. | A visible text next to the field that is not tied to it by `label`/`aria-labelledby` counts as missing; check by eye. |
| Focus | STATE-1 (WCAG 2.4.7, 2.4.11) | Presses Tab up to 60 times. For each stop: whether outline, shadow, border, background, text colour or underline changed against the unfocused look, and whether a point of the element is covered by another element (named, marked fixed/sticky). | A change only in colour may still be too faint: check its 3:1 contrast by eye. Focus traps, focus order and focus inside iframes are not judged. |
| Images and icons | EXP-7 | `img` without `alt`, `svg role=img` without a name, icon-only or glyph-only controls ("×", "☰") without a name, and icon controls named only for screen readers. | Cannot judge whether an icon is universal or whether `alt` text is useful. |
| Screen-reader view | STATE-1, EXP-7, STATE-3 | The ARIA snapshot: roles and names in reading order, as a screen reader receives them. Read it for unnamed buttons, wrong roles and reading order. | Not a real screen reader: live regions, announcements and gestures are not simulated. |
| Spacing | LAYOUT-4 | Margins, paddings and gaps that are not multiples of 4 px, with counts. | Low confidence: `auto` margins, `em` values and centring produce odd numbers; the scale is a profile choice, not a norm. |
| Layout shift | PLAT-3 (Core Web Vitals) | CLS summed during one lab load. | One load on a fast local machine; field data decides. Shifts after interaction are not measured. |
| Dark theme | COLOR-4 | Whether the page's background and text colour differ between light and dark. Same colours mean there is no dark theme, or it does not follow the system setting. | Apps with an in-app theme switch need it switched by hand. |

## Not measured

Text inside images, canvas and video; hover-only content; motion and timing; response times; content order and
meaning; whether a label is understandable; anything about the task. These need the walk-through in
`../method.md`.

## Use in a review

1. Run it at the widths and themes in the project profile.
2. Read `report.md`. For each line, open the screen at that width and theme and look.
3. Keep only what is confirmed and matters to the task; group lines with one cause (one token, one component) into
   one finding, as `../method.md` step 3 says.
4. In the finding, give the measured number ("text 2.2:1, needs 4.5:1, WCAG 1.4.3"), not the script's wording.

## Known false positive found in evaluation

An element that has focus when the page loads (`autofocus`, or focus moved by a dialog) can be reported as "no visible focus change", because the script compares the focused look with the look it saw first, which was already focused. Check such elements on a screenshot.

## Clickable but not reachable

Added after the first with/without-skill comparison: the focus walk only visits elements that can take focus, so controls built from `div` or `span` were never reached. The script now lists visible elements with a pointer cursor or an `onclick` attribute that have no interactive role and no `tabindex` (STATE-1, WCAG 2.1.1 and 4.1.2). It can miss controls whose click handler is attached in script without a pointer cursor; the screen-reader view and a manual Tab walk catch those.
