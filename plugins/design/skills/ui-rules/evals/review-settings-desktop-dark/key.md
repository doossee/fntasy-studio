# Key: settings/screen.html

Context: a bakery owner on a desktop browser (1280×800, dark theme) adjusting notification and billing settings; visited rarely, a few times a year, usually when something has gone wrong (missed alerts, a charge they did not expect).

## Defects

1. `#del` "Delete shop" (`.btn-danger`): it sits 10 px to the right of "Save changes" and has exactly the primary style (#4f46e5 fill, white text, 6.29:1; same size). It is not set apart in a danger zone, and one click replaces the page with "Shop deleted. All menu items, orders and customer records were removed": no confirmation, no typed name, no grace period. Clicking it by mistake while saving destroys the business's data. Severity 4.
2. `.switch` elements are bare `<div>`s with only a click handler: no `role="switch"`/checkbox, no `tabindex`, no `aria-checked`, no association with the row label. Keyboard users cannot reach or toggle any notification, and screen readers announce neither the control nor its state. Severity 4.
3. `.switch` state is shown only by colour: the knob (`::after`, `left: 3px`) stays on the left in both states. On #16a34a and off #4b5563 differ by 2.29:1 and look alike to people with red-green colour blindness. The off track against the #1f2937 card is 1.94:1 (below 3:1 for UI components). Owners cannot tell which alerts are on. Severity 3.
4. `.help` and `.fine` secondary text: #6b7280 on #1f2937 = 3.04:1 at 13 px (help) and 11 px (fine); it needs 4.5:1. Among it is the only disclosure that "$29 / month" is "Billed annually at $348. Renews Dec 1, 2026", so the real charge is the least readable thing on the card. Low-vision users cannot read it, and every owner is likely to miss the upfront $348 renewal. Severity 3.
5. SMS checkbox under Plan: "Keep my customers in the loop with SMS order updates" is checked by default, and its cost appears only as "Uses SMS credits", with no price per message and no estimate. It is a paid add-on accepted by default, and it also sends texts to customers whose consent is not mentioned. Owners are billed for something they did not choose. Severity 3.
6. Switch label "Don't disable order alerts on weekends" (switch off): this is a double negative. Off means "do disable", so weekend alerts are off, and it takes several readings to see that. Owners may silence Saturday orders without meaning to. Severity 2.
7. `.email span` chips: `max-width: 150px` with ellipsis truncates all addresses (150 px shown of 205–217 px). "orders@acmebakery.example" and the misspelled "orders@acmebakeries.example" both show as "orders@acmebaker…", there is no tooltip, and the chips do not expand. The owner cannot see that order alerts and receipts also go to a wrong domain. Severity 2.
8. `#save` "Save changes": nothing visible happens after clicking (no toast, no disabled state, no "Saved" text), there is no unsaved-changes indicator, and at 1280×800 the button ends at y = 819.5 px, below the fold. Owners click again, or leave unsure whether the changes were kept. Severity 2.

## Style choices only (not defects)

- The uppercase, letter-spaced eyebrow labels ("NOTIFICATIONS", "PLAN" …) above each card title: 12 px bold, #a5b4fc on #1f2937 = 7.36:1, and each is backed by a normal-case heading.
- The card on file is drawn as a generic gradient card with a chip (`.ccart`, `aria-hidden`) instead of a network logo. It is decorative; the card is identified by "•••• 4242" and the expiry date.
