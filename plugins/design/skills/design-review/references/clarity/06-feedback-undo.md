# Feedback and undo

A clear interface forgives mistakes. People press more boldly when they know everything can be taken back.

Examples use the fictional product Acme Orders (`00-audience.md`).

## FB-1. Every press answers at once

**Rule.** Within 0.1 second of a press something changes: the button shows the press, switches to a "Saving..." state, the row is highlighted. While the request is running the button is disabled, and a second press does not create a duplicate.

**Why.** Up to 0.1 second a response feels instant; without it the person presses again (NNG-TIME, LAW-DOHERTY). For money a duplicate is a shortfall.

**How to measure.** Press the primary button twice in a row on a throttled network: one record is created. Between the press and the response the button looks different and cannot be pressed.

**Bad → good.** "Record payment" does not change for 2 seconds, the sales manager presses again, two payments → the button turns to "Recording..." at once and is disabled.

Sources: NNG-TIME, LAW-DOHERTY, NNG-SLIPS.

## FB-2. Undo instead of the question "Are you sure?"

**Rule.** A reversible action (marking an order as shipped, moving a deal, changing a stage, closing a task, deleting a note) is performed at once, and a message with an "Undo" button appears at the bottom for 5–10 seconds.

**Why.** A habitual confirmation is pressed without reading; it does not save from the mistake and slows everyone down (ALA-UNDO, NNG-CONFIRM, HIG-ALERT). Undo within a few seconds is familiar to the audience from mainstream messengers (APP-UNDO, AND-SNACKBAR). Not shorter than 5 seconds, so there is time to read it (WCAG-2.2.1).

**How to measure.** Perform a reversible action: there is no dialog, there is a message with "Undo" at the bottom, it stays for ≥ 5 seconds. Press "Undo": the state is back.

**Bad → good.** "Are you sure you want to mark this order as shipped?" → the order is marked, at the bottom "Marked as shipped. Undo".

Sources: ALA-UNDO, NNG-CONFIRM, HIG-ALERT, APP-UNDO, AND-SNACKBAR, WCAG-2.2.1.

## FB-3. Confirmation only for the irreversible, and specific

**Rule.** A confirmation dialog is kept for the irreversible and serious: cancelling a payment, closing a customer account, deletion, a mass mailing. It names the object and the consequence; the buttons are action words, not "Yes" and "No"; the primary button is not "Cancel".

**Why.** A confirmation works only when it is rare and specific (NNG-CONFIRM, HIG-ALERT, GOV-BUTTON).

**How to measure.** Open the dialog. The text has the name of the object and an amount or a number. Button labels: an action verb and "Back" (or "Keep payment"). There is no "Cancel / Cancel payment" pair.

**Bad → good.** "Cancel payment? [Cancel] [OK]" → "Cancel the $450.00 payment from Birch & Co.? The invoice becomes overdue again. [Back] [Cancel payment]".

Sources: NNG-CONFIRM, HIG-ALERT, GOV-BUTTON.

## FB-4. Money: what will happen is visible before the press and after

**Rule.** Before a money action is committed the screen shows at the same time: who, how much, by which method, and what the result will be ("Nothing left to pay", "$150.00 will remain due"). The amount is repeated on the button. After it: a confirmation with the same facts and a way to fix a mistake (cancel the payment).

**Why.** Money actions need a review before submission or a way to correct them (WCAG-3.3.4, GOV-CHECK). For the person who enters it, a money mistake is a personal liability (AUD-4).

**How to measure.** Before pressing the primary button, without scrolling, you can see the customer name, the amount, the payment method and the "After payment" line. The amount on the button equals the amount in the field. The confirmation has a link to the receipt or the payment, from which it can be cancelled.

**Bad → good.** A "Save" button under the form, the outcome unknown → "After payment: nothing left to pay" and a button "Record $450.00".

Sources: WCAG-3.3.4, GOV-CHECK, GOV-CONFIRM.

## FB-5. After the action it is clear what comes next

**Rule.** Having finished an action the person stays where they started it and sees the result in place (the overdue amount in the row is gone). If a next step is logical, it is offered as one button ("Another payment", "Print receipt").

**Why.** The end of a scenario is remembered most strongly (LAW-PEAK); after submission say what happened and what comes next (GOV-CONFIRM).

**How to measure.** Start an action from a list, finish it. You are in the same list at the same scroll position, and the row is updated. No more than two next steps are offered.

**Bad → good.** After a payment the payments log opens, while the sales manager was on the Customer card → the Customer card, the balance updated, at the bottom "Payment recorded. Receipt".

Sources: LAW-PEAK, GOV-CONFIRM, NNG-CONTROL.

## FB-6. Unsaved input is not lost silently

**Rule.** If the person leaves a form with entered data (back, closing the panel, an accidental press outside it), the data is either kept as a draft or a question appears: "Close without saving?".

**Why.** A phone session is short and often interrupted; state must be preserved (NNG-MOBILE, HIG-MODAL).

**How to measure.** Fill two fields of a form, press "Back" or outside the panel. Either the data is in place when you return, or a question was asked.

**Bad → good.** Pressed outside the new customer panel, everything entered is gone → "Close without saving? [Keep editing] [Close]".

Sources: NNG-MOBILE, HIG-MODAL, NNG-CONTROL.
