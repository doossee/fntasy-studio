# Phone, desktop and web

How screens adapt to window size and input type, and how fast they load and settle.

## Review questions

- At 320 px wide, does everything still work without sideways scrolling?
- Is every function available at every window size, not just rearranged?
- Can everything reachable by hover or gesture also be reached by tap, click and keyboard?
- Does the main content appear quickly and stay still while the page loads?

## PLAT-1. Adapt to the window, not the device, and keep every function

**Rule.** Layout changes are driven by the available window width (and height where it matters), not by guessing the device. Every function and every piece of content available at one size is available at every other size; small windows rearrange or stack, they do not drop features.

**Why.** Windows change size with rotation, split screen, foldable phones and zoom, so "phone" and "desktop" are not fixed. A feature that disappears at one width is a feature some people never get, often the ones on the cheapest devices.

**How to check.**
- Resize the window through the breakpoints (web: 320, 390, 768, 1024, 1280, 1440 px; apps: compact, medium, expanded).
- At each size, run the main task: it completes.
- No horizontal scroll at 320 px except for data tables, maps and similar.
- Nothing present at 1440 px is missing at 390 px (it may sit behind a menu or a disclosure).

**Thresholds.** 320 CSS px without two-dimensional scrolling [WCAG 1.4.10 AA]. Window width classes: compact < 600 dp, medium 600–839, expanded 840–1199, large 1200–1599, extra-large ≥ 1600; compact height < 480 dp [platform: Material 3 / Android]. Layout by size class, same functions across size classes [platform: Apple HIG].

**Bad → Good.** Acme hides the "Export" action on phones because it does not fit → it moves into the overflow menu at compact widths.

**Limits.** Content that needs two dimensions (tables, maps, editors) may scroll sideways inside its own container (DATA-1). Some features legitimately depend on hardware (camera, keyboard shortcuts).

**Evidence.** Standard and Platform guideline.

## PLAT-2. Touch is not hover: no hover-only content, alternatives to gestures

**Rule.** Nothing is reachable only by hovering: tooltips, menus and previews also open on tap and on keyboard focus. Every gesture (swipe, long press, pinch, multi-finger, drag) has a visible on-screen alternative. On phones, the main action of a long screen stays reachable without scrolling back up.

**Why.** Touch screens have no hover, and gestures are invisible until learned; some people cannot perform them at all. A function that exists only behind a gesture does not exist for them.

**How to check.**
- On a touch device or emulator, try to reach every tooltip, menu and hidden action.
- With the keyboard only, Tab to every control that has a hover effect.
- Every swipe or drag action also exists as a button or menu item.
- Content that appears on hover or focus can be dismissed without moving the pointer, can be hovered itself, and stays until dismissed.
- On a phone, the primary action of a screen taller than the viewport is pinned or repeated.

**Thresholds.** Keyboard access to all functions [WCAG 2.1.1 A]; content on hover or focus dismissible, hoverable, persistent [WCAG 1.4.13 AA]; single-pointer alternative to path-based and multi-point gestures [WCAG 2.5.1 A]; alternative to dragging [WCAG 2.5.7 AA]; on-screen alternative to every gesture [platform: Apple HIG].

**Bad → Good.** In Acme's order list, "Archive" exists only as a swipe-left gesture → swipe stays, and the order's menu also has "Archive".

**Limits.** Pure enhancements (a hover highlight on a row) need no alternative if they carry no information. Where the thumb reaches easily is a rough map, not a measured law.

**Conflicts.** S-6, S-9.

**Evidence.** Standard and Platform guideline.

## PLAT-3. Load fast and keep the layout still

**Rule.** The main content appears quickly, the page answers input quickly, and nothing jumps while it loads. Images and embeds reserve their space before they arrive.

**Why.** Slow pages lose people before the first task starts, and layout shifts cause mis-taps: a button moves just as the finger lands, and the wrong product is opened or the wrong order confirmed.

**How to check.**
- Run a lab test (the browser's performance panel or a similar tool) with mobile throttling, and use field data where available.
- Every image, video and ad slot has width and height or an aspect ratio set; web fonts do not shift text when they load.

**Thresholds.** At the 75th percentile of page loads: largest contentful paint ≤ 2.5 s (poor > 4 s), interaction to next paint ≤ 200 ms (poor > 500 ms), cumulative layout shift ≤ 0.1 (poor > 0.25) [platform: Core Web Vitals].

**Bad → Good.** Acme Shop's product list shifts down when the promo banner loads, and a shopper taps the wrong product → the banner's space is reserved; layout shift drops from 0.3 to 0.02.

**Limits.** These thresholds are for web pages; native apps follow their platform's responsiveness guidance (ACT-2 for response times).

**Conflicts.** C-12.

**Evidence.** Platform guideline.
