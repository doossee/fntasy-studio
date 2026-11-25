# Motion

How things move on the screen: transitions, feedback animations, loading effects. Motion helps when it shows cause and effect or where something went; it hurts when it delays people, distracts them, or makes some of them unwell.

## Review questions

- Does every animation answer "what just happened" or "where did it go"? If not, can it go?
- Does feedback start at once, and is a repeated animation short enough not to slow a frequent task?
- With the system "reduce motion" setting on, is every change still understandable (a fade or an instant change instead of movement)?
- Does anything move, flash or play on its own without a control to stop it?
- Does the direction of movement match the direction of navigation (forward in, back out)?

## MOTION-1. Animate only to explain; keep it short; let people turn it off

**Lens.** UI.

**Rule.** Use motion only to show cause and effect, where something came from or went, or what changed. Start it at once after the action that caused it, keep it brief, and never let it delay an action people repeat many times a day. Respect the system "reduce motion" setting: replace movement with a fade or an instant change. Nothing moves, blinks or plays sound on its own without a visible way to stop it.

**Why.** A change that starts at once is felt as caused by the action; a late one breaks the link. Motion pulls attention whether people want it or not, so decorative motion competes with the task. Large movement, zoom and parallax make some people physically unwell. A long animation on a frequent action adds waiting to every repetition.

**How to check.**
- List every animation on the screen and write one line for each: what it explains. No line → remove it.
- Record the screen and step through frames: the first visible change after a tap or click appears at once (ACT-2).
- For actions done many times a day (adding an item, switching tabs), the animation does not delay the next possible input.
- Turn on "reduce motion" (iOS, Android, macOS, Windows; `prefers-reduced-motion` in the browser): sliding, zooming and parallax become fades or instant changes; nothing that carried meaning is lost.
- Look for content that moves, scrolls or plays by itself without a pause or stop control, and for slow continuous swaying.
- Direction: going forward enters from the trailing side, going back leaves the same way; a sheet that came up goes down.

**Thresholds.** Moving, blinking or scrolling content that starts by itself and lasts more than 5 s can be paused, stopped or hidden [WCAG 2.2.2 A]; motion triggered by interaction can be turned off unless essential [WCAG 2.3.3 AAA]; nothing flashes more than three times a second [WCAG 2.3.1 A]; animation on frequent actions [profile: motion.frequent-max = 300 ms].

**Bad → Good.** In Acme every order card flies in from the side with a bounce when the list opens; the courier who opens the list 60 times a day waits each time, and with "reduce motion" on the cards still fly → the list appears at once; only a newly added order fades in to show what is new, and with "reduce motion" on it simply appears.

**Limits.** Motion that is the content itself (a video, a game, a chart that shows change over time) is not covered by "keep it short", but still needs a pause control. Small transitions of standard platform controls (a switch sliding) are fine as the platform draws them.

**Conflicts.** C-12 (motion never hides a slow response or delays the result).

**Evidence.** Standard (pause and turn off), Platform guideline (durations, direction, reduce motion), Research (motion captures attention); the duration limit is a team choice.
