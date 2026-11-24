# Motion

How things move on the screen: transitions, feedback animations, loading effects. Motion helps when it shows cause and effect or where something went; it hurts when it delays people, distracts them, or makes some of them unwell.

## Review questions

- Does every animation answer "what just happened" or "where did it go"? If not, can it go?
- Does feedback start within 0.1 s of the action, and is a repeated animation short enough not to slow a frequent task?
- With the system "reduce motion" setting on, is there still a way to understand every change (a fade or an instant change instead of movement)?
- Does anything move, flash or play on its own without a control to stop it?
- Does the direction of movement match the direction of navigation (forward in, back out)?

## MOTION-1. Animate only to explain; keep it short; let people turn it off

**Rule.** Use motion only to show cause and effect, where something came from or went, or what changed. Start it within 0.1 s of the action that caused it, keep it brief, and never put it on an action people repeat many times a day. Respect the system "reduce motion" setting: replace movement with a fade or an instant change. Nothing moves, blinks or plays sound on its own without a visible way to stop it.

**Why.** A response that starts within about 0.1 s is felt as caused by the action; later, the link is lost (NN/g response-time limits, applied to animation by NN/g). Motion pulls attention whether people want it or not, so decorative or peripheral motion competes with the task. Vestibular disorders make large movement, zoom and parallax physically uncomfortable for some people; WCAG 2.2 (2.3.3) asks that interaction-triggered motion can be turned off unless it is essential. Long animations on frequent actions add waiting time to every repetition.

**How to check.**
- List every animation on the screen and write one line for each: what it explains. No line → remove it.
- Record the screen and step through frames: the first visible change after a tap or click appears within 0.1 s.
- For actions done many times a day (adding an item, switching tabs), the animation does not delay the next possible input; keep it at a few hundred milliseconds at most (ours).
- Turn on "reduce motion" (iOS, Android, macOS, Windows; or `prefers-reduced-motion` in the browser): sliding, zooming and parallax become fades or instant changes; nothing that carried meaning is lost.
- Look for content that moves, auto-scrolls or plays for more than 5 seconds without a pause or stop control (WCAG 2.2, 2.2.2), and for slow continuous swaying or oscillation (Apple HIG warns against motion near 0.2 Hz).
- Direction: going forward enters from the trailing side, going back leaves the same way; a sheet that came up goes down.

**Bad → Good.** In Acme every order card flies in from the side with a bounce when the list opens; the courier opening the list 60 times a day waits each time, and with "reduce motion" on the cards still fly → the list appears at once; only a newly added order fades in to show what is new, and with "reduce motion" on it simply appears.

**Limits.** Motion that is the content itself (a video, a game, a chart that shows change over time) is not covered by "keep it short", but still needs a pause control. Small state transitions of standard platform controls (a switch sliding) are fine as the platform draws them.

**Conflicts.** With ACT-2: an animation must not hide a slow response; it shows that work started, it does not replace progress information.

**Evidence.** Standard (WCAG 2.3.3, 2.2.2) for turning motion off and stopping it; Research for the 0.1 s cause-and-effect limit; Platform guideline for durations and direction; "a few hundred ms" is ours.

**Sources.** WCAG 2.2 (2.3.3 Animation from Interactions, 2.2.2 Pause, Stop, Hide); Apple HIG (Motion, Accessibility: Reduce Motion); Material 3 (Motion); NN/g (Response times, 1993/2014; Animation for attention and comprehension, 2014; Pratt et al. 2010 on motion capturing attention); Figma Resource Library (Motion design: one job per animation, direction carries meaning); secondary: "58 rules" (Bakusevych) on micro-interactions.
