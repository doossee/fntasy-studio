# Key: 04 shop sign-up (phone, light, Arabic, right to left)

Screens: `04-signup-rtl.bad.html`, `04-signup-rtl.good.html`. Boxes: `04-signup-rtl.key.jpg`.

The Arabic strings were written by a model and not checked by a native speaker. Have them checked before treating the wording as an example of good Arabic copy.

## Context (fictional profile)

- **Who:** a new shop owner in an Arabic-speaking market.
- **Device:** phone, 390 × 844, Arabic interface.
- **Task:** step 2 of 3 of creating a shop, done once.
- **Cost:** an abandoned sign-up.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The step opens with a notification permission prompt before the owner has done anything. *Assumed:* the owner taps "Don't allow" and will not get order alerts later, or taps "Allow" without reading.
2. The form is laid out left to right. Labels, the step count and the back arrow sit where a right-to-left reader does not start. *Assumed:* reading is slower, and the arrow suggests "forward".
3. The owner types the phone number with spaces. It is rejected with "Invalid value". *Assumed:* the owner removes characters at random until it passes, or gives up.
4. The form asks for date of birth, tax number and gender to open a shop. *Assumed:* some owners stop here.
5. The button reads "Send". *Assumed:* the owner is unsure whether this creates the shop or leads to step 3.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `#perm` | A notification permission is asked during sign-up, with no feature in use and no reason given. | — | HONEST-3 | 2: a refusal is hard to undo later; trust | Ask when the owner turns on order alerts, with one sentence on why. |
| 2 | `.f label` | Only "shop name" has "*", there is no legend, and the optional email is not marked. | — | STATE-3 | 2: people fill in fields they could skip, or miss required ones | Mark optional fields "(اختياري)". If everything else is required, say nothing more. |
| 3 | `#back` | The back arrow points left and sits at the left. In a right-to-left screen, back points right. | — | TEXT-5 | 2: a direction cue that means the opposite | Mirror direction icons in RTL. Keep the arrow at the start (right). |
| 4 | `#f-phone` | "+971 50 123 4567" typed with spaces is rejected with a generic message and no example. | — | ACT-7 | 3: many people type spaces; they get stuck | Accept spaces and separators and normalise them. Keep the number left to right (`dir="ltr"`) inside the RTL form. |
| 5 | `#f-birth` | A date placeholder "03/04/1990" in a plain text field. It could be 3 April or 4 March. | — | DATA-2 | 2: ambiguous input; also not needed (see 6) | Remove the field. If a date is needed, use separate day, month and year fields with names. |
| 6 | `#f-tax`, `#f-gender` (and birth date) | Data not needed to open a shop. | — | ACT-6 | 2: slows sign-up; some people stop | Ask for the tax number when the first invoice needs it. Do not ask for gender or birth date. |
| 7 | `.step` and the whole `#form` | The form is set left to right in an Arabic screen (`direction: ltr; text-align: left`). | — | TEXT-5 | 3: every user of this language reads against the layout | Remove the LTR override and use logical properties (start/end). |
| 8 | `#go` | The button label "إرسال" ("Send") does not say what happens next. | — | TEXT-4 | 2 | Change it to "التالي: طريقة الاستلام" ("Next: pickup method"). |
| 9 | Code only, no box | Labels are not tied to their inputs (no `for` and `id`). | — | STATE-3 (WCAG 1.3.1, 4.1.2) | 3: screen reader users hear unnamed fields | Associate each label with its input. |

## Taste, not defects

- **No illustration on the sign-up screens.** A style choice.
- **Green primary button.** A brand choice.
- **System font instead of a branded Arabic typeface.** Fine either way, if the system font renders Arabic well.

## Traps

- **Western digits (0–9) in an Arabic interface:** these are common in many Arabic-speaking markets. They are a defect only if the profile's market expects Eastern Arabic digits, or if both systems are mixed on one screen.
- **The phone number shown left to right inside an RTL form:** this is correct. Phone numbers, emails and card numbers stay LTR.
- **ACT-5 (progress):** "الخطوة 2 من 3" ("step 2 of 3") is present. The defect is its position (7), not missing progress.

## Not checked

- Step 3 of the sign-up.
- Large text sizes.
- What the screen reader actually announces, beyond the missing label association.
