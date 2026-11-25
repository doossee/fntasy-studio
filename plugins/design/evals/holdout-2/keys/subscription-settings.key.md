# subscription-settings — answer key

**Context.** Customer of a meal-kit subscription (Acme Kochbox), desktop 1280×800, light theme, German UI. Tasks: skip a
week, pause, change plan, update payment, cancel. Frequency: a few times a month for skipping, rarely for the rest.
Every action changes what is charged by direct debit. (screen.png is a full-page capture, 1280×933; the footer is
below the 800 px fold.)

## Defects

1. **Cancellation hidden** — `.cancel-link` "Abo beenden": 11 px, #b0b0b0 on #fff = **2.17:1**, among legal links in
   the footer, at y = 893 (below the 800 px fold), while "Abo pausieren" is a full button. Harm: customers who want to
   cancel cannot find it and keep paying; in Germany a contract concluded online must offer a clearly labelled
   cancellation button (§ 312k BGB) — **assumed** legal reading, not checked against current text. **Severity 4.**
2. **Plan form preselects a more expensive plan** — `input[name=plan]:checked` is "5 Rezepte für 4 Personen" although
   the current plan (lead line) is 3 Rezepte für 2 Personen. Only per-portion prices are shown: 5×4 = 20 portions ×
   5,99 € = **119,80 €/week** vs current 3×2×7,49 € = 44,94 €. "Plan speichern" just says "Gespeichert." Harm: a user
   who opens the card and saves anything is upgraded to 2.7× the weekly charge without seeing a weekly total.
   **Severity 4.**
3. **"Next charge" is wrong after skipping a week** — `#next` (interaction bug). Click "Lieferung überspringen" on
   KW 50: the box changes to "Nächste Abbuchung: 44,94 € am 14.12.2026 (KW 51)", although KW 49 is not skipped and will
   be charged on 30.11.2026 (the code always searches from the 2nd week, `weeks.slice(1)`). Harm: the user believes no
   money leaves the account until mid-December; a charge comes in 5 days. **Severity 4.**
4. **Skip buttons cut their German label** — `.skip-btn`: fixed 120 px, `nowrap`, `overflow:hidden`; "Lieferung
   überspringen" needs **186 px** and shows "Lieferung übers"; after a skip, "Lieferung wieder aufnehmen" needs
   **224 px**. Harm: the action is guessed rather than read; the undo label is unreadable. **Severity 2.**
5. **Toggles are not controls** — `.toggle` are `div`s: no `role`, `tabIndex = -1`, no accessible name or state, no key
   handler. Off track #c4c9cf vs white = **1.67:1** (SC 1.4.11 needs 3:1). Harm: keyboard and screen-reader users cannot
   change "Automatische Rezeptauswahl" or the reminder; low-vision users cannot tell off from absent. **Severity 3.**
6. **Pause happens immediately, with no duration and no way back** — `#pause`: one click turns the button into a
   disabled "Pausiert"; no "until when", no confirmation of which deliveries are affected, the upcoming list and next
   charge do not change, no resume button. Harm: user does not know whether KW 49 will still arrive and be charged and
   cannot undo. **Severity 3.**
7. **Payment fields have placeholder-only labels and appear without asking** — `.field input` ("Neue IBAN",
   "Kontoinhaber/in"): `labels.length = 0`, no `aria-label`; the label disappears on typing; the fields are always
   shown and "Ändern" does nothing. Harm: screen-reader users hear an unnamed field; others lose the hint while typing
   a 22-character IBAN. **Severity 2.**
8. **Mixed decimal separators in amounts** — `.history td.amount`: "44,94 €" in rows 1 and 3, "44.94 €" in rows 2
   and 4. Harm: in German "." is the thousands separator; customers comparing charges hesitate or suspect different
   amounts. **Severity 2.**

## Style only (harm nobody)
- The "Plan ändern" card has a heavier shadow (0 4px 14px / .08) than the other cards (0 1px 2px / .04).
- The beige "Beliebt" tag (#7a5200 on #fff3d6, 6.28:1) is the only warm colour on a green page.

## Trap (looks like a defect, is fine)
- **Currency after the number with a space: "44,94 €".** That is the German convention (comma decimal, sign after the
  amount); "€44.94" would be wrong here. Not a defect — only the stray dot in defect 8 is.
