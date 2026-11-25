# Key: h1 courier route (phone, dark, English) — held out

Screen: `../h1-courier-route.html`. Boxes: `h1-courier-route.key.jpg`.

## Context (fictional profile)

- **Who:** an Acme courier.
- **Device:** phone, 390 × 844, dark theme at night, used one-handed while walking.
- **Task:** confirm a delivery at each stop.
- **Frequency:** about 60 stops a day.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The courier arrives and reads the address. It is dark grey on near-black. *Assumed:* the courier misreads the flat or the entrance outdoors.
2. The courier needs the door code. It is on another screen. *Assumed:* they open the order, memorise the code and come back.
3. The courier taps "✓" (done). The "⊘" (cancel order) button sits 4 px away, and both are 32 px. *Assumed:* some taps on the move hit cancel.
4. "Order marked as delivered" appears with no undo. *Assumed:* a wrong tap cannot be reversed by the courier.
5. A problem (no one home) can be reported only by swiping. *Assumed:* new couriers do not find it.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `.acts` | "Done" and "Cancel order" are 32 × 32 px with a 4 px gap. | 32 × 32 px passes WCAG 2.5.8 and fails the platform 44 pt guideline. The danger lies in the adjacency. | ACT-1 | 4: a miss cancels a paid order, 60 times a day | Use a full-width "Mark delivered" button. Move "Cancel order" into a menu, with confirmation. |
| 2 | `.addr` | The address is in dark grey. | 2.74:1 at 15 px | COLOR-1 (WCAG 1.4.3) | 4: AA failure on the information the courier must read | Use the primary text colour. |
| 3 | `.toast` | "Order marked as delivered" with no undo. | — | STATE-4 | 3: a wrong tap cannot be reversed | Add "Undo" for at least 10 seconds, or keep the order reopenable from the stop list. |
| 4 | `.hint` | Reporting a problem is a swipe only. | — | PLAT-2 | 3: a hidden action for a frequent situation | Add a visible "Report a problem" button. |
| 5 | `.note` | "Door code: see order details." | — | MEM-2 | 2: an extra screen and a code to remember at every door | Show the door code here. |
| 6 | `.a2` | The cancel icon "⊘" has no visible label. | — | EXP-7 | 2 (the larger risk is counted in 1) | Label destructive actions in words. |

## Taste, not defects

- **Striped placeholder map.** A style choice.
- **Monospace order number.** Fine either way.
- **Near-black background at night.** A choice.

## Traps

- **WCAG 2.5.8:** 32 px targets pass it. The finding rests on the adjacency of a destructive action and on the platform target, not on WCAG.
- **ACT-5 (progress):** "Stop 4 of 9" is honest progress. Not a defect.
- **COLOR-4 (dark theme):** #121212 is not pure black, and surfaces are distinguishable. Not a defect.

## Not checked

- Double taps on "done" (ACT-2).
- Large text.
- The screen reader. The buttons have `aria-label`, but it was not checked whether the labels are announced.
