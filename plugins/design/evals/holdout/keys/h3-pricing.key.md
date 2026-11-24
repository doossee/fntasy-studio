# Key: h3 pricing page (desktop, light, English) — held out

Screen: `../h3-pricing.html`. Boxes: `h3-pricing.key.jpg`.

## Context (fictional profile)

- **Who:** a shop owner choosing a plan.
- **Device:** desktop, 1280 × 900.
- **Task:** choose a plan once a year.
- **Cost:** money and a renewal at a higher price.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The owner sees "Offer ends in 00:14:59" in red capitals. *Assumed:* they feel rushed.
2. The owner compares $9, $19 and $20 a month. The yearly charge and the renewal price sit in 10 px light grey. *Assumed:* most owners expect to pay $9 a month and are charged $108 at once, then $15 a month later.
3. The feature lists differ in order and content. *Assumed:* the owner cannot compare the plans line by line, and picks Pro because Plus looks bad value next to it.
4. Card fees are only in hover tooltips on "?". *Assumed:* people on touch screens never see them.
5. Cancelling needs a phone call on weekdays, written in the 11 px footer.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `.fine` | The yearly charge and the renewal price are in fine print under the monthly figure. | 10 px at 2.60:1 | HONEST-1 (also COLOR-1) | 4: people pay more than they read | Show "$108 a year, renews at $180 a year" at the size of the price. |
| 2 | Plus card (`.p:nth-child(2)`) | Plus: $19 for 3 users. Pro: $20 for unlimited users. Plus exists to make Pro look cheap. | — | HONEST-1 | 3 | Price plans by real value, or remove the decoy tier. |
| 3 | `.timer` | "Offer ends in 00:14:59", with no stated offer and no source. | — | HONEST-1 | 3 | Remove it, or state a real end date for a real discount. |
| 4 | `footer` | Cancelling needs a phone call on weekdays, while sign-up is online. | 11 px at 2.51:1 | HONEST-1 | 3: cancelling is harder than signing up | Cancel online in the same number of steps as sign-up. |
| 5 | `.rib` | Three ribbons in three colours, three filled buttons, all bold capitals. | 3 prominent buttons | LAYOUT-3 | 2: nothing stands out | Use one recommended plan with one filled button. |
| 6 | `.b1`, `.b3` | White text on orange and on blue buttons. | 2.61:1 and 3.93:1 at 16 px bold. 16 px bold is not large text, so the requirement is 4.5:1. | COLOR-1 (WCAG 1.4.3) | 3: AA failure on the main action | Darken the button colours. |
| 7 | `.q` | Card fees are only in `title` tooltips on hover. | 18 × 18 px | PLAT-2 | 3: a price element unreachable on touch and keyboard | Write the fees in the feature list. |
| 8 | `.p ul` | Features differ in order and content between plans. | — | ACT-3 | 2: plans cannot be compared row by row | Use one comparison table with the same rows for every plan. |

## Taste, not defects

- **Serif headline.** A brand choice.
- **The colours do not follow 60-30-10.** No usability evidence for that rule.
- **Centred hero text.** Allowed for a short heading.

## Traps

- **Three plans:** that is a reasonable number. ACT-3 does not ask for fewer.
- **"Most popular":** fine if true. Whether it is true was not checked, so do not report it as a defect without data.
- **TEXT-2 (capitals):** short uppercase button labels are taste. Only the stacked emphasis (5) is a finding.

## Not checked

- Whether "Most popular" is true.
- The checkout after the plan is chosen.
- Narrow windows.
