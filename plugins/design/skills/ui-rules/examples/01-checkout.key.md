# Key: 01 checkout (phone, light, English)

Screens: `01-checkout.bad.html`, `01-checkout.good.html`. Boxes: `01-checkout.key.jpg` (numbers match the table).

## Context (fictional profile)

- **Who:** an Acme Shop customer paying for an order.
- **Device:** phone, 390 × 844, often outdoors, one hand.
- **Task:** pay for two items after a first attempt with a mistyped card number.
- **Frequency and cost:** a few times a month; money is at stake on every attempt.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The person opens the payment step and sees a red banner: "Only 2 left — your cart expires in 04:59". *Assumed:* they hurry and read the rest less carefully.
2. The card number field is empty and red. The line "Please fix the errors above" sits above the fields, and nothing above it is wrong. *Assumed:* they retype 16 digits without knowing what was wrong, and may repeat the mistake.
3. Expiry, security code and name show only values. Their labels were placeholders and disappeared. *Assumed:* the person cannot check which value is which without clearing a field.
4. "Package protection +$4.99" is already ticked. The way out is an 11 px grey link that mocks the person. *Assumed:* most people pay for it without choosing it.
5. The total is grey and hard to read in sunlight. The person taps "Submit". *Assumed:* they pay $56.39 instead of the $51.40 they expected.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `#protect`, `#decline` | A paid add-on is preselected. The decline is a mocking link. | Link 11 px, 2.04:1 | HONEST-1 | 4: every buyer, money taken without a clear choice | Untick the add-on. Label it "Add package protection, $4.99". Make the decline a neutral "Skip". |
| 2 | `#total` | The total is in light grey. | 24 px bold at 2.54:1. This is large text, so the requirement is 3:1, and it still fails. | COLOR-1 (WCAG 1.4.3) | 4: AA failure on the number people must check | Use the text colour (16.8:1). |
| 3 | `.field` (all four) | Placeholders are the only labels. Filled fields have no label. | — | STATE-3 | 3: card data, frequent errors | Add visible labels above the fields. Keep format hints. |
| 4 | `#err-top` and the empty card field | A generic message points "above". The typed number was erased. Nothing is written at the field. | — | STATE-3 (WCAG 3.3.1) | 3: people retry or leave, money at stake | Put a specific message under the field, for example "Card number is 2 digits short". Keep the typed number. |
| 5 | `#timer` | "Only 2 left" and a cart countdown with no data behind them. | — | HONEST-1 | 3: pressure on every buyer | Remove both, or show real stock and a real reservation time. |
| 6 | `#pay` | The button reads "Submit". | — | TEXT-4 | 2: the label does not say that money is taken, or how much | Change it to "Pay $51.40". |
| 7 | `#close` | The only way to close the sheet is a 20 × 20 px "×". | 20 × 20 px. It passes WCAG 2.5.8 through the spacing exception and fails the platform 44 pt guideline. | ACT-1 | 2: rare, but it is the only way out | Use a 44 px "Close" text button. Let the backdrop close the sheet as well. |

## Taste, not defects

- **Georgia serif page title.** A brand choice. No loss to the user.
- **Purple accent and 14 px corner radius.** Brand choices.
- **No illustration of the card.** A style choice either way.

## Traps

- **ACT-5 (show progress):** the payment step is one screen. It does not need "Step x of y".
- **COLOR-1 threshold:** a reviewer may demand 4.5:1 for the total. At 24 px bold it is large text, and the requirement is 3:1. The finding stands because 2.54:1 fails both.
- **LAYOUT-3 (one focal point):** the red timer competes with the button for attention. Report it once, under HONEST-1. Do not count it again as an emphasis problem.

## Not checked

- Whether the $1.50 service fee was shown in the cart before this step (HONEST-1).
- Whether a second tap on "Submit" sends a second payment (ACT-2).
- Keyboard focus and screen reader output.

## Severity calibration

| Defect | Where it appears | Severity |
| --- | --- | --- |
| Placeholder-only labels | Here, on card data | 3 |
| Placeholder-only labels | A two-field newsletter form | 2 |
| Preselected add-on | Here, a paid add-on | 4 |
| Preselected add-on | A free newsletter checkbox | 3 |
