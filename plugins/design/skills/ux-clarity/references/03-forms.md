# Forms and input

A form is where a person spends the most effort and makes the most mistakes. Every extra field has a price.

Examples use the fictional product Acme Orders (see `00-audience.md`).

## FORM-1. Ask only what is needed now

**Rule.** On the first step of a form there are no more than five required fields and no more than eight visible ones. Everything the record can be created without goes into one disclosure "More details" or into the object card after creation.

**Why.** A question stays only if you can explain why it is needed right now (GOV-STRUCTURE). Forms longer than about eight fields are abandoned more often (BAY-FIELDS). The numbers 5 and 8 are norms of this skill.

**How to measure.** Open the form without expanding anything. Count the fields that must be filled for the button to work (≤ 5) and all visible fields (≤ 8). A group of radio buttons is one field.

**Bad → Good.** "New customer": company name, contact person, phone, second phone, email, billing address, shipping address, tax ID, payment terms, credit limit, price list, source → company name, contact name, phone; the rest in "More details".

Sources: GOV-STRUCTURE, BAY-FIELDS, LAW-TESLER.

## FORM-2. Label above the field, always visible

**Rule.** Every field has a permanent label above it. Text inside an empty field does not replace the label and is not used for important instructions.

**Why.** A hint inside the field disappears on input: there is no way to check what was typed where (NNG-PLACEHOLDER, GOV-INPUT). A label above the field is read in one glance (LUKEW-LABEL, NNG-FORM). Having a label is a requirement of WCAG-3.3.2.

**How to measure.** Fill all fields with any text. For every field it is still visible what the field is. Labels stand above the fields, not to the left (at 390 px).

**Bad → Good.** A field with grey text "Name, phone or customer number" and no label → the label "Customer" above the field, nothing inside.

Sources: NNG-PLACEHOLDER, GOV-INPUT, LUKEW-LABEL, NNG-FORM, WCAG-3.3.2.

## FORM-3. One column

**Rule.** On a phone fields go in one column. Only parts of one value share a row (date: day, month, year; time: from, to).

**Why.** In multi-column forms fields get skipped and filled with the wrong thing (BAY-COLUMN, NNG-FORM).

**How to measure.** At 390 px no form row has two independent fields side by side.

**Bad → Good.** "Contact name" and "Role" in one row, 160 px each → one under the other at full width.

Sources: BAY-COLUMN, NNG-FORM.

## FORM-4. The right keyboard opens by itself

**Rule.** Amount, quantity, code: `inputmode="numeric"`; phone: `type="tel"`; search: `type="search"`. The amount field is large, with digit grouping and the currency next to it.

**Why.** The correct field type opens the needed keyboard and removes an extra switch (LUKEW-INPUT, BAY-KEYBOARD, GOV-INPUT, AND-INPUT).

**How to measure.** In the code or the inspector every numeric field has `inputmode="numeric"` or `"decimal"`, the phone has `type="tel"`. Typing 12480 into the amount field shows "12,480" (or the grouping of the UI locale).

**Bad → Good.** An "Amount" field with the regular keyboard, "12480" typed without grouping → numeric keyboard, "$12,480".

Sources: LUKEW-INPUT, BAY-KEYBOARD, GOV-INPUT, AND-INPUT.

## FORM-5. Defaults do the work for the person

**Rule.** Everything the system can know is prefilled: the date is today, the payment method is the last one used, the invoice is the customer's only open one, the branch is the current one. In the typical case the person changes no more than three fields.

**Why.** Defaults are almost never changed, so a good default saves input for the majority (NNG-DEFAULT, LUKEW-INPUT). The system takes the complexity on itself (LAW-TESLER). What was already entered is not asked again (WCAG-3.3.7).

**How to measure.** Walk through the typical case (a customer with one open invoice pays it in full by the usual method). Count the fields that had to be touched: ≤ 3. No value known to the system was entered by hand.

**Bad → Good.** To record a payment one must pick the invoice (there is one), the date (today), the method (same as yesterday) → all prefilled; the person picks the customer and the amount.

Sources: NNG-DEFAULT, LUKEW-INPUT, LAW-TESLER, WCAG-3.3.7.

## FORM-6. A known amount is entered in two taps

**Rule.** If the system knows the likely amount (the full balance due, the price of one period or one invoice), it offers it as a button. From the open form with the payer selected to a recorded payment of a known amount: no more than two taps, the amount and the button.

**Why.** Recognizing and pressing is faster and more reliable than recalling and typing (NNG-RECALL, NNG-SLIPS). This is how a transfer works in the payment apps the audience is used to (AUD-2, LAW-JAKOB).

**How to measure.** A customer with a balance due of $1,250.00 is selected. Count the taps until the message "Payment recorded": the "Full balance" button, then the primary button. Total ≤ 2, the keyboard never opened.

**Bad → Good.** The amount field is empty, the balance is written in small type above, the amount is typed by hand → buttons "Full balance $1,250.00" and "Oldest invoice $480.00" under the field; the button label is "Record $1,250.00".

Sources: NNG-RECALL, NNG-SLIPS, LAW-JAKOB.

## FORM-7. Phone and money are accepted in any form

**Rule.** A phone can be pasted with the country code and "+", with spaces, brackets and hyphens; an amount with spaces, commas or a decimal separator. The system normalizes to one form itself. The country code is prefilled.

**Why.** Most people enter a phone in a format other than the one shown in the example (BAY-MASK); accepting variety and normalizing it is the system's duty (LAW-POSTEL, NNG-SLIPS).

**How to measure.** Paste into the phone field the same number three ways: with "+", country code, brackets and hyphens (`+1 (415) 555-0132`); digits only without the country code (`4155550132`); digits only with the country code (`14155550132`). All three give one number without an error. Paste `12 480` and `12,480` into the amount: accepted.

**Bad → Good.** "Invalid phone format" for a number pasted from a messenger → the number is accepted and shown as +1 415 555 0132.

Sources: BAY-MASK, LAW-POSTEL, NNG-SLIPS.

## FORM-8. Optional is marked with a word

**Rule.** Optional fields are marked with the word "optional" next to the label. No asterisks. If fewer than half of the fields are required, the required ones are also named by a word in the error.

**Why.** Sources disagree: some advise marking required fields (NNG-REQUIRED), others optional ones (GOV-QUESTION), others both kinds (BAY-REQUIRED). This skill picks the word "optional": a non-technical audience does not read an asterisk as a sign of "required". A project that already marks fields another way records it in the profile section `Decisions`.

**How to measure.** Every field that may be left empty has the word "optional" next to its label, translated in every language in the profile (German: "optional"). There is no `*` character in labels.

**Bad → Good.** "Tax ID *" and an unmarked "Shipping address" → "Tax ID optional" moves into "More details"; the main form has no optional fields at all.

Sources: GOV-QUESTION, NNG-REQUIRED, BAY-REQUIRED.

## FORM-9. The error is at the field, in words, with a way out

**Rule.** The error message stands at the field, says what is wrong and how to fix it, and does not erase what was entered. Validation runs after leaving the field or on submit, not in the middle of typing. On submit the focus moves to the first field with an error.

**Why.** An error must be seen next to its cause and understood without codes (NNG-ERROR, GOV-ERROR, WCAG-3.3.1, WCAG-3.3.3). Validation before the input is finished irritates, after it speeds things up (ALA-INLINE, BAY-INLINE, NNG-FORM-ERR).

**How to measure.** Submit the form with an empty required field and with a wrong value. Every problem field has a text of two parts: what is wrong and what to do. The other values are in place. The text has no words "invalid", "incorrect", "validation error", and no codes.

**Bad → Good.** A red border and "Invalid value" → "Enter an amount greater than zero".

Sources: NNG-ERROR, GOV-ERROR, ALA-INLINE, BAY-INLINE, BAY-ERRORS, NNG-FORM-ERR, WCAG-3.3.1, WCAG-3.3.3.

## FORM-10. A disabled button explains what it waits for

**Rule.** If the primary button is disabled, what is missing is written next to it or on it. Better: leave the button enabled and show the errors on press.

**Why.** A grey button without an explanation is a dead end: the person does not know what the system sees as wrong (NNG-10, visibility of status; NNG-ERROR).

**How to measure.** Open an empty form. If the primary button is disabled, the reason is written on it or right above it ("Enter an amount"). The reason disappears when the condition is met.

**Bad → Good.** A grey "Save" with no explanation → "Enter an amount" on the button, after input "Record $1,250.00".

Sources: NNG-10, NNG-ERROR.

## FORM-11. Few options: show them all

**Rule.** For 2–4 options: visible radio buttons or segments. A dropdown starts at five options. A long list (customers, products): search.

**Why.** A dropdown hides the options and costs two taps instead of one (LUKEW-DROPDOWN, NNG-FORM).

**How to measure.** For every dropdown count the options. If there are 2–4, it is a violation.

**Bad → Good.** A dropdown "Payment method: cash / card / bank transfer" → three buttons in a row (or the field is removed from the first step).

Sources: LUKEW-DROPDOWN, NNG-FORM.

## FORM-12. A date: whatever is convenient for this date

**Rule.** A date near today (payment, shipping) gets a calendar with "today" prefilled and buttons "Today", "Yesterday". A distant date (date of birth, a contract signed years ago) gets numeric input. A date is displayed with the month name or in one numeric format of the locale (for example dd.mm.yyyy), the same across the whole app.

**Why.** A calendar is convenient only for near dates; a numeric date without a month name is ambiguous (NNG-DATE, GOV-DATE).

**How to measure.** The payment date field holds today's date. In a distant-date field `01.09.2012` can be typed from the keyboard without paging the calendar years back.

**Bad → Good.** A date of birth is chosen by paging the calendar 14 years back → numeric input with a dd.mm.yyyy mask.

Sources: NNG-DATE, GOV-DATE.

## FORM-13. A toggle acts at once

**Rule.** A toggle (on/off) applies at the moment it is pressed and confirms it. If a "Save" button is needed next to it, use a checkbox instead of the toggle.

**Why.** A toggle promises an immediate effect, like a light switch; a "Save" after it contradicts that (NNG-TOGGLE).

**How to measure.** On a screen with toggles there is no "Save" button that belongs to them; after a press a confirmation appears.

**Bad → Good.** Toggles "Email" and "SMS", and a grey "Save" below → the toggle saves itself and shows "Saved".

Sources: NNG-TOGGLE.
