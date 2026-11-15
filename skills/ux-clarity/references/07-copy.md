# Interface copy

Style, rhythm and machine-sounding phrasing are checked by a copy-style skill, if the project uses one. Here is only what decides whether a person understands the screen the first time.

Examples use the fictional product Acme Orders (`00-audience.md`).

## COPY-1. The user's words, not the programmer's or the accountant's

**Rule.** The interface has no words from the stop list. Instead it uses the words the user says to their own customers.

The list below is the English default. Every language in the profile needs its own list (profile → Languages): system words and jargon do not translate one to one, so write the list in each language, not a translation of this one.

| Not allowed | Use instead |
| --- | --- |
| submit, execute, process | the action by name: record, save, send |
| transaction, posted, reversal, void | payment, recorded, cancel payment |
| net, gross, ledger balance | total, balance, amount due |
| pricing policy, billing model, rating | price, payment method |
| convert, conversion (of a deal) | create order, turn into a customer |
| entity, record, object, item, ID, identifier | customer, order, payment; "No." |
| validation, invalid, malformed | what exactly is wrong |
| integration, provider, webhook, token, sync failed | connection, SMS carrier, key; "Could not update. Try again" |
| dashboard, widget | Today, block |
| N/A, null, status codes, error codes (`Error 500`), words in capital letters with underscores (`PERMISSION_DENIED`) | the reason in words |

**Why.** The system speaks the user's words, not its own (NNG-10). Simplified text almost doubles success for people who read with difficulty, and specialists like it too (NNG-LITERACY, NNG-PLAIN).

**How to measure.** Read every visible string of the screen, including hints and errors. Words from the left column: 0.

**Bad → good.** "Void transaction" → "Cancel payment".

Sources: NNG-10, NNG-LITERACY, NNG-PLAIN, SHOP-CONTENT.

## COPY-2. One term, one thing

**Rule.** One thing is called by one word along the whole scenario: in the menu, the heading, the button, the message, in every language in the profile. Different things are not called by one word.

**Why.** A synonym reads as a different thing: the person looks for a difference that is not there (NNG-10, consistency; SHOP-CONTENT; ATL-LANG).

**How to measure.** Write out from the scenario's screens all words used for the main object and the main action. Each list has one word. Typical violating sets: "payment / transaction / remittance", "Money / Finance", "deal / lead / opportunity", "ship / dispatch / send out".

**Bad → good.** Button "Record payment", heading "New transaction", message "Remittance saved" → "Record payment", "Record payment", "Payment recorded".

Sources: NNG-10, SHOP-CONTENT, ATL-LANG.

## COPY-3. Short: one sentence, one thought

**Rule.** A sentence is no longer than 20 words. A hint under a field is one sentence. Explanatory text on the first phone screen (everything except data, field labels and buttons) is no more than 40 words.

**Why.** Long sentences get split (GOV-PLAIN, NNG-PLAIN); a hint is one short sentence (GOV-QUESTION). On a phone text pushes the action out (LUKEW-FIRST). The thresholds 20 and 40 are this skill's own norm, not a figure from a source.

**How to measure.** Count the words in the longest sentence of the screen (≤ 20) and in the explanatory text of the first screen at 390 × 844 (≤ 40).

**Bad → good.** "Enter a customer name, order number or phone: we show the balance and record payment in seconds." (17 words above a field that already has a label) → label "Customer", hint "Name, phone or order number".

Sources: GOV-PLAIN, NNG-PLAIN, GOV-QUESTION, LUKEW-FIRST.

## COPY-4. The key word comes first

**Rule.** A heading, a label and a list row start with the word people search them by. Identical beginnings of neighbouring items are removed.

**Why.** People read the first two words of a line and the left edge (NNG-F).

**How to measure.** Read only the first two words of every heading and menu item on the screen: the items can be told apart by them.

**Bad → good.** "Organisation settings", "Plan settings", "Module settings" → "Company", "Plan", "Add-ons".

Sources: NNG-F.

## COPY-5. Numbers in digits, dates and money in one form

**Rule.** Quantities are written in digits ("3 orders"). Money in one form with the currency: "$12,480.00". A date is "14 November" or "14.11.2026", the same within a screen. A step counter is "Step 1 of 3".

**Why.** Digits are found by the eye faster than words (NNG-NUMERAL, ATL-LANG); a numeric date without the month name is ambiguous (NNG-DATE).

**How to measure.** The screen has no quantities spelled in words and no two different date formats.

**Bad → good.** "Three orders to ship", "11/14/26" → "3 to ship", "14 November".

Sources: NNG-NUMERAL, ATL-LANG, NNG-DATE.

## COPY-6. Sentence case, no service punctuation

**Rule.** Headings, buttons and labels are in sentence case. No full stop at the end of headings, buttons and labels, no colon after a field label, no exclamation marks. Words in capital letters: only short menu group labels, if the project profile allows them (profile → Brand).

**Why.** Sentence case reads faster and is accepted by all the guides alike (GOV-WRITING, ATL-LANG, NNG-COMMAND).

**How to measure.** No buttons or headings in "Every Word Capitalised" or ALL CAPITALS. No "!" in the interface.

**Bad → good.** "RECORD PAYMENT!" → "Record payment".

Sources: GOV-WRITING, ATL-LANG, NNG-COMMAND.

## COPY-7. Every language is a full one

**Rule.** Every string exists in every language in the profile (profile: `languages`). Translated text is taken from the project's glossary of terms for that language, not translated anew. A string is not cut by an ellipsis, a button label fits in two lines, languages are not mixed on a screen.

**Why.** Part of the audience reads only one of the languages, or reads the other one slowly (AUD-1). Long-word languages (German, Finnish, Uzbek, Russian) take more room than English: a screen built for the short text breaks.

**How to measure.** Open the screen in the longest language of the profile at 390 px (default: the UI's primary language plus its longest one). Words of another language: 0 (except names and titles). Cut strings and three-line buttons: 0 (`clipped` in `metrics.json`, see `SKILL.md` → Screenshots and measurements). The project's translation completeness check, if it has one, is green.

**Bad → good.** German "Überfällig" next to English "All orders"; "Zahlungserinner…" → all strings in one language and in full ("Zahlungserinnerung").

Sources: NNG-10, SHOP-CONTENT.

## COPY-8. Dialog buttons do not argue with each other

**Rule.** One dialog has no two buttons with the same root word ("Cancel" and "Cancel payment"). The closing button next to a "Cancel ..." action is called "Back". The rule holds in every language in the profile: check for the same collision in each.

**Why.** The same word for leaving and for acting leads to pressing the wrong button (NNG-CONFIRM).

**How to measure.** In every dialog and form with a "Cancel ..." action the second button is "Back".

**Bad → good.** [Cancel] [Cancel payment] → [Back] [Cancel payment].

Sources: NNG-CONFIRM.
