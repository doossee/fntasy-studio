# States and feedback

A screen is not one picture. Every control has states (pressed, focused, disabled, busy) and every screen has states (empty, loading, failed, done, full of long data, in another language). These rules cover how controls show their state, how each screen state is designed, how form errors are reported, when to confirm or offer undo, and which channel carries which message.

## Review questions

- Can you see, without guessing, whether each control is focused, pressed, disabled or busy — with a keyboard as well as a mouse or finger?
- Does every screen have a designed empty, loading, error and success state, each with a next step?
- Does the layout survive the longest real data and the longest supported language?
- Does each form error say what is wrong and how to fix it, next to the field, without erasing what was typed?
- Can a common action be undone, and are confirmations kept for actions that cannot be?
- Is each message shown in a channel that matches how urgent it is and how long it must stay?

## STATE-1. Every control shows its state: default, hover, focus, pressed, disabled, busy

**Lens.** UI.

**Rule.** Each interactive control has a visible look for each state it can be in: default, hover (pointer devices), keyboard focus, pressed, selected where it applies, disabled, and busy. Focus is always visible and never hidden by other content. A disabled control stays readable and the screen says why it is disabled and what enables it. A busy control shows that it is working and cannot be pressed again.

**Why.** People need to know that the product heard them and what they can do next. Keyboard users cannot act at all without a visible focus, and a focus ring hidden under a sticky header is the same as none.

**How to check.**
- Tab through the screen with the keyboard only: every control gets a visible focus indicator, and no sticky header, footer or banner covers the focused control.
- Press each control: the pressed state appears at once (ACT-2).
- Find every disabled control: label text still readable, a nearby hint says why and what enables it.
- Trigger a slow action: the control shows a busy state ("Saving…" or a spinner in the button) and ignores a second press.
- State changes are not shown by colour alone (outline, icon, weight or label as well).

**Thresholds.** Focus visible [WCAG 2.4.7 AA]; focus not fully hidden [WCAG 2.4.11 AA]; indicators and state markers ≥ 3:1 against adjacent colours [WCAG 1.4.11 AA]; not colour alone [WCAG 1.4.1 A].

**Bad → Good.** Acme's "Create order" button is pale grey with no explanation until all fields are filled, and the focus outline is removed in CSS → the button stays active and on press the form shows which fields are missing (or, if it must be disabled, a line under it says "Fill in the customer and at least one item"); a 2 px focus ring is visible on every control.

**Limits.** Disabled controls are exempt from contrast minimums, but they must not look like plain text or vanish. Hover does not exist on touch screens; never put needed information only in hover (PLAT-2). Keeping a button active and validating on press is often clearer than disabling it.

**Evidence.** Standard (focus and non-text contrast) and Platform guideline (the set of states).

## STATE-2. Design every screen state: empty, loading, error, success, long data, other languages

**Lens.** UI and UX.

**Rule.** Every screen and every container that shows data has a designed state for: still loading, nothing to show, failed to load, action succeeded, and full of the longest real data. Each state tells people what is going on and gives a next step. The layout holds with the longest supported language and with long names, large numbers and many items.

**Why.** Screens are usually designed with tidy, average sample data; real users meet the empty first day, the slow connection, the error and the 40-character name. A blank container reads as "broken"; "No records" shown while data is still loading is a wrong answer that people act on.

**How to check.**
- For each screen, force each state: empty account, slow network (throttling), server error, success, and stress data — the longest names and numbers in the profile, a list or dropdown with very many items, a long pasted paragraph.
- Switch to the longest language in the profile, or lengthen every string if no translation exists.
- Pass: every state has a message in plain words and at least one action (create, retry, change filter, go back); loading never shows "no results"; nothing overlaps, clips mid-word or pushes a control off-screen; amounts and names are never cut (TEXT-3, DATA-2).

**Thresholds.** Stress list size [profile: state.stress-items = 200]; string lengthening without a translation [profile: state.text-expansion = 1.4 ×].

**Bad → Good.** Acme's customer list shows an empty white panel to a new shop and "No customers" for two seconds while loading → a skeleton while loading, then "No customers yet — Add a customer or import from a spreadsheet".

**Limits.** A state that lasts under about a second needs no indicator of its own (ACT-2). Early prototypes may skip rare states, but the review lists them as "not checked".

**Evidence.** Practice.

## STATE-3. Make form errors specific, next to the field, and keep what was typed

**Lens.** UI and UX.

**Rule.** Every field has a visible label outside the field (a placeholder is not a label). Required and optional fields are both marked at the field. A field is checked when the person leaves it or has typed the full expected length, not while they are still typing; an error clears as soon as the input becomes valid. Each error message sits next to its field, names exactly what is wrong and how to fix it, uses more than colour, and never erases what the person typed. A summary at the top may be added, never used alone.

**Why.** Forms built this way are submitted without errors far more often at the first try. A generic message ("invalid value") leaves people guessing; an error only at the top of the page sends them hunting; an error shown while they are still typing scolds them for something they have not finished; a cleared field makes them start again.

**How to check.**
- Every field has a visible label above or beside it that stays while typing.
- Each field is marked required or optional; a page-level "all fields required" alone fails.
- Type into a field and stop halfway: no error yet. Leave the field invalid: an error appears next to it at once.
- Make three different mistakes in an email or card field: each gets its own message.
- Submit with errors: nothing typed is lost, focus moves to the first error, the error is marked by more than red (an icon or a text marker).
- Errors are not shown only in a toast or a tooltip.

**Thresholds.** The field in error is identified and the error described in text [WCAG 3.3.1 A]; labels or instructions for input [WCAG 3.3.2 A]; not colour alone [WCAG 1.4.1 A].

**Bad → Good.** Acme Shop's checkout shows "Please fix the errors above" in red at the top and clears the card number → the card field shows "Card number is 2 digits short" under it, the number stays, and the summary at the top links to the field.

**Limits.** A two-field sign-in form may skip required markers. For sign-in, do not say which of email or password was wrong unless brute-force protection is in place. A format example may sit in a placeholder only if a real label is also present.

**Conflicts.** C-1 (labels and markers are not clutter).

**Evidence.** Standard and Research (form usability testing, including checkout benchmarks in the US and Europe).

## STATE-4. Prefer undo; confirm only what cannot be undone

**Lens.** UX.

**Rule.** Common actions, even destructive ones, can be undone (an Undo that stays long enough to reach, a trash emptied later, an edit history). A confirmation dialog is used only for serious actions that cannot be undone; it names the object and the consequence, its buttons name the actions ("Delete 3 orders" / "Keep orders"), and the destructive choice is never the default and never styled as the primary action. The most dangerous actions may need a deliberate extra step.

**Why.** Confirmations shown for everything are clicked through by habit and stop protecting anyone; undo fixes the mistake after it happens without slowing every routine action. A vague "Are you sure?" with Yes/No makes people reread the question and still guess.

**How to check.**
- List every destructive or costly action (delete, cancel order, refund, send to all customers).
- Undoable: no confirmation needed; the undo control is visible and reachable, not a toast that vanishes before a person can reach it.
- Not undoable: a confirmation that names the object and what will happen, action-labelled buttons, Cancel (or Keep) as the default, the destructive button in the destructive style.
- No confirmation on routine, undoable actions; no alert just to inform.

**Thresholds.** Undo stays visible at least [profile: state.undo-visible = 10 s, or until the next action]; dialogs with at most two actions [platform: Material 3].

**Bad → Good.** Acme asks "Are you sure? Yes / No" before archiving any order, and nothing before "Refund $240 to Anna Lee" → archiving shows "Order archived — Undo"; the refund asks "Refund $240.00 to Anna Lee? This cannot be reversed" with "Refund $240.00" and "Keep payment".

**Limits.** Some actions cannot technically be undone (a sent message, a bank payment); they need the confirmation. Repeated confirmations for the same expert action may be switched off by the user.

**Conflicts.** C-7.

**Evidence.** Platform guideline and Practice.

## STATE-5. Pick the message channel by urgency and lifetime

**Lens.** UX.

**Rule.** Each message goes to the channel that fits how urgent it is, whom it concerns and how long it must stay:
- **inline**, next to the element, for anything about a field, an item or an action just taken — errors always go here;
- **toast or snackbar** for a short confirmation of a completed, low-risk action, at most with one action such as Undo; never for errors that need a fix and never with information people must read later;
- **banner** at the top of the screen or section for a state that lasts (offline, trial ending, read-only mode), until the state ends or the person dismisses it;
- **dialog** only when the person must decide before going on (STATE-4);
- **notification outside the app** (push, email) only for things the person asked to hear about or that need them while they are away.

**Why.** Each channel promises something: a toast says "nothing to do here", a dialog says "stop and decide", a banner says "this is still true". A message in the wrong channel is either missed (an error in a toast that fades) or teaches people to dismiss without reading (a dialog for news). Toasts that vanish on a timer also fail people who read slowly or use a screen reader.

**How to check.**
- List every message the screen can show and its channel.
- Errors needing a fix: inline, not only in a toast.
- Toasts: no essential information, no more than one action, announced to screen readers (a live region), long enough to read and paused on hover or focus.
- Banners: one at a time per area, about a lasting state, dismissible unless the state blocks work.
- Dialogs: each one asks for a decision; none only informs.
- Push and email: each type is one the person turned on, or one that concerns money, safety or access.

**Thresholds.** Status messages are announced without moving focus [WCAG 4.1.3 AA]; time limits on reading can be extended or turned off [WCAG 2.2.1 A]; toast lifetime [profile: state.toast-min = 5 s, and paused while focused].

**Bad → Good.** Acme shows "Card declined" as a toast that disappears after three seconds, and a dialog "New feature: dark mode!" on opening → the decline appears under the payment form with "Try another card"; the feature news is a dismissible line in Settings.

**Limits.** Systems with their own notification rules (the phone's notification centre, email clients) also follow the platform's guidance. Very short-lived success states may need no message at all when the change is visible (an item appears in the list).

**Conflicts.** C-13.

**Evidence.** Platform guideline (snackbars, alerts, banners) and Standard (status messages, timing); the toast minimum is a team choice.
