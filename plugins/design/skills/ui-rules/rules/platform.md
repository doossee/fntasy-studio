# Phone, desktop and web

How screens adapt to window size and input type, and how fast they load and settle.

## Review questions

- At 320 px wide, does everything still work without sideways scrolling?
- Is every function available at every window size, not just rearranged?
- Can everything reachable by hover or gesture also be reached by tap, click and keyboard?
- Does the main content appear within about 2.5 seconds and stay still while the page loads?

## PLAT-1. Adapt to the window, not the device, and keep every function

**Rule.** Layout changes are driven by the available window width (and height where it matters), not by guessing the device. Every function and every piece of content available at one size is available at every other size; small windows rearrange or stack, they do not drop features.

**Why.** Windows change size with rotation, split screen, foldables and zoom, so "phone" and "desktop" are not fixed. WCAG 2.2 1.4.10 Reflow requires content to work at 320 CSS px wide without two-dimensional scrolling. Apple lays out by size class, not device type, and asks to keep functionality the same across size classes. Material defines window size classes by width: compact < 600 dp, medium 600-839, expanded 840-1199, large 1200-1599, extra-large ≥ 1600; height compact < 480 dp.

**How to check.** Resize the window through the breakpoints (in the web: 320, 390, 768, 1024, 1280, 1440 px; in apps: compact, medium, expanded). At each size, run the main task. Pass: the task completes at every size; no horizontal scroll at 320 px except for data tables, maps and similar; nothing present at 1440 px is missing at 390 px (it may be behind a menu or a disclosure).

**Bad → Good.** Acme hides the "Export" action on phones because it does not fit → it moves into the overflow menu on compact widths.

**Limits.** Content that needs two dimensions (tables, maps, editors) may scroll sideways inside its own container. Some features may legitimately depend on hardware (camera, keyboard shortcuts).

**Evidence.** Standard (WCAG 1.4.10) and Platform guideline (HIG, Material).

**Sources.** WCAG 2.2 (1.4.10); Apple HIG (Layout); Material 3 / Android developers (Window size classes); NN/g (Mobile tables, 2017); Figma Resource Library (Responsive website design; Mobile first); secondary: SAP Fiori (adaptive), Wroblewski (Mobile first, 2011).

## PLAT-2. Touch is not hover: no hover-only content, alternatives to gestures

**Rule.** Nothing is reachable only by hovering: tooltips, menus and previews also open on tap and on keyboard focus. Every gesture (swipe, long press, pinch, multi-finger) has a visible on-screen alternative. On phones, the main action of a long screen stays reachable without scrolling back up.

**Why.** Touch screens have no hover, and gestures are invisible until learned. Apple asks for an on-screen alternative to every gesture (for example a delete button as well as swipe) and the simplest gesture for frequent actions. NN/g notes that tooltips are a desktop and keyboard pattern; on touch, use tap-triggered tips.

**How to check.** On a touch device or emulator, try to reach every tooltip, menu and hidden action. With the keyboard only, Tab to every control that has a hover effect. Pass: all content and actions reachable by tap and by keyboard; every swipe action also exists as a button or menu item; on a phone, the primary action of a screen taller than the viewport is pinned or repeated (ours).

**Bad → Good.** In Acme's order list, "Archive" exists only as a swipe-left gesture → swipe stays, and the order's menu also has "Archive".

**Limits.** Pure enhancements (a hover highlight on a row) need no alternative if they carry no information. Thumb-reach maps are a heuristic; the placement of the primary action at the bottom of phone screens is a convention, not a measured law (see disputed.md for "corners are hard to reach").

**Evidence.** Platform guideline (HIG) and Heuristic (NN/g, thumb reach).

**Sources.** Apple HIG (Accessibility, gestures); WCAG 2.2 (1.4.13 content on hover or focus, 2.1.1 keyboard); NN/g (Tooltip guidelines, 2019); Figma Resource Library (Mobile website design; Pricing page best practices — tap tooltips); secondary: Baymard (hover menus need a delay of about 300-500 ms on desktop).

## PLAT-3. Load fast and keep the layout still

**Rule.** The main content appears quickly, the page answers input quickly, and nothing jumps while it loads. Images and embeds reserve their space before they arrive.

**Why.** Slow pages lose people before the first task starts, and layout shifts cause mis-taps. Google's Core Web Vitals set "good" thresholds at the 75th percentile of page loads: Largest Contentful Paint ≤ 2.5 s, Interaction to Next Paint ≤ 200 ms, Cumulative Layout Shift ≤ 0.1 (poor: > 4 s, > 500 ms, > 0.25).

**How to check.** Run a lab test (browser performance panel or a Lighthouse-type tool) with mobile throttling, and field data where available. Pass: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Check that every image, video and ad slot has width and height (or an aspect ratio) set, and that web fonts do not shift text when they load.

**Bad → Good.** Acme Shop's product list shifts down when the promo banner loads, and a shopper taps the wrong product → the banner's space is reserved; CLS drops from 0.3 to 0.02.

**Limits.** These thresholds are for web pages; native apps follow their platform's responsiveness guidance (see ACT-2 for response times).

**Evidence.** Platform guideline (Google, web.dev Core Web Vitals, thresholds derived from Google's research).

**Sources.** web.dev (Core Web Vitals thresholds); NN/g (Response times, 1993/2014); secondary: uxpilot (performance budgets, unsourced), Figma Resource Library (Responsive website design).
