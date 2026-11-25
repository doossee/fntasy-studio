# warehouse-picking — answer key

**Context.** Warehouse picker with a cart, tablet 820×1180 portrait mounted on the cart, dark theme, English UI. Task:
walk to each bin, scan items, confirm quantities, report shortages. Frequency: all shift, hundreds of scans per hour,
often with gloves, at arm's length, under mixed lighting. Errors become wrong customer shipments.

## Defects

1. **Scan counts the wrong line** — `#scan` (interaction bug). Type `SKU-30577` + Enter: line SKU-30577 stays `0 / 12`,
   while SKU-48213 goes `0 / 40` → `1 / 40`. The code only checks that the SKU exists, then increments the first open
   line. Harm: stock and order records go wrong silently; the item that was really picked still shows as missing and
   gets picked twice or the order ships short. **Severity 4.**
2. **"Mark short" deletes the whole line, no quantity, no confirm, no undo** — `.acts .shortb`. One tap runs
   `items.splice(i,1)`: 8 lines → 7, the customer's item is removed from the order. The only feedback is a banner
   "Line removed from order." at the very top (y = 0, 37 px tall) for 1.2 s, far from the scan field (y = 160) and the
   row. It sits 8 px from "Picked" in the same size (40 px tall). Harm: one mis-tap loses an order line; the picker
   cannot report "short 3 of 12". **Severity 4.**
3. **Bin location barely readable** — `.bin`: #4a5260 on #1b1e23 = **2.12:1**, 14 px. The bin code is what the picker
   walks to. Harm: misread bins, slow picking, wrong picks under warehouse light. **Severity 3.**
4. **Line status by colour stripe only** — `.stripe`, 8 px wide: done green #2e9e5b, open amber #d49a2a, short red
   #c94a3c. Green vs amber **1.37:1**, red vs green **1.36:1**; no text or icon. Harm: pickers with red-green colour
   vision deficiency (about 1 in 12 men) cannot tell done from short or open; everyone must scan rows. **Severity 3.**
5. **Quantity buttons too small for gloves** — `.qty button` **28×28 px**, 8 px from the number. Harm: gloved
   taps hit the wrong control; adjusting counts takes several attempts. **Severity 3.**
6. **Item names truncated where the difference is** — `.name`: 182 px visible of **453 px**. Rows 1 and 2 both read
   "Stainless steel hex…" — M8×30 vs M8×40 is hidden. Harm: wrong size picked; only the small grey SKU differs.
   **Severity 3.**
7. **Progress numbers disagree and never update** — `.prog-label`: "62%" is hard-coded; the same bar says "4 of 8 lines"
   (50 %), counts the short line as done, and after a short-mark shows "4 of 7 lines" with "62%" still. Harm: picker and
   supervisor misjudge how much of the wave is left. **Severity 2.**

## Style only (harm nobody)
- Column headings are 12 px uppercase with 0.12 em letter-spacing (contrast 7.23:1, readable).
- Progress fill is a blue-to-green gradient rather than a flat colour.

## Trap (looks like a defect, is fine)
- **"Picked" completes the line in one tap with no confirmation.** It is the most frequent action (dozens per hour),
  is fully reversible with "−", and the line stays visible. A confirmation dialog here would slow every pick and train
  pickers to tap through dialogs, which would make real confirmations useless. Correct as is.

## Notes
- "Picked" button white on #2563eb = 5.17:1 (passes). SKU text #9aa3ae on #1b1e23 = 6.54:1 (passes).
