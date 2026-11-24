# States and feedback

A screen is not one picture. Every control has states (pressed, focused, disabled, busy) and every screen has states (empty, loading, failed, done, full of long data, in another language). These rules cover how controls show their state, how each screen state is designed, how form errors are reported, and when to confirm or offer undo.

## Review questions

- Can you see, without guessing, whether each control is focused, pressed, disabled or busy — with a keyboard as well as a mouse or finger?
- Does every screen have a designed empty, loading, error and success state, each with a next step?
- Does the layout survive the longest real data and the longest supported language?
- Does each form error say what is wrong and how to fix it, next to the field, without erasing what was typed?
- Can a common action be undone, and are confirmations kept for actions that cannot be?

## STATE-1. Every control shows its state: default, hover, focus, pressed, disabled, busy

**Rule.** Each interactive control has a visible look for each state it can be in: default, hover (pointer devices), keyboard focus, pressed, selected where it applies, disabled, and busy/loading. Focus is always visible and never hidden by other content. A disabled control stays readable and the screen says why it is disabled and what enables it. A busy control shows that it is working and cannot be pressed again.

**Why.** People need to know that the product heard them and what they can do next; keyboard users cannot act at all without a visible focus. WCAG 2.2 requires a visible focus indicator (2.4.7) that is not fully hidden by other content (2.4.11), and 3:1 contrast for the visual information that identifies a control and its state (1.4.11). Baymard's 2021 accessibility benchmark found 48% of the e-commerce sites tested lacked a consistently visible focus indicator.

**How to check.** Tab through the screen with the keyboard only: every control gets a visible focus ring with at least 3:1 contrast against its surroundings, and no sticky header, footer or banner covers the focused control. Press each control: the pressed state appears at once (within about 0.1 s, see ACT-2). Find every disabled control: label text still readable, a nearby message or hint says why it is disabled. Trigger a slow action: the control shows a busy state (spinner or label like "Saving…") and ignores a second press. State changes are not shown by colour alone (outline, icon, weight or label as well).

**Bad → Good.** Acme's "Create order" button is pale grey with no explanation until all fields are filled, and the focus outline is removed in CSS → the button stays active and the form shows which fields are missing on press (or, if it must be disabled, a line under it says "Fill in the customer and at least one item"); a 2 px focus ring is visible on every control.

**Limits.** Disabled controls are exempt from the contrast minimums in WCAG, but they still must not look like plain text or vanish. Hover does not exist on touch screens; never put needed information only in hover (see PLAT-2). Keeping a button active and validating on press is often clearer than disabling it.

**Evidence.** Standard: WCAG 2.2 for focus and non-text contrast; the state set is platform guideline and NN/g guidance (state timings are heuristics).

**Sources.** WCAG 2.2 (2.4.7 Focus Visible, 2.4.11 Focus Not Obscured, 1.4.11 Non-text Contrast); Apple HIG (Buttons: press state, activity indicator in a button); Material 3 (disabled states); NN/g (Button states, 2025; Progress indicators, 2014); Baymard (accessibility benchmark, 2021); Figma Resource Library (Button states); secondary: Component Gallery (Button).

## STATE-2. Design every screen state: empty, loading, error, success, long data, other languages

**Rule.** Every screen and every container that shows data has a designed state for: still loading, nothing to show, failed to load, action succeeded, and full of the longest real data. Each of these states tells people what is going on and gives a next step. The layout holds with the longest supported language and with long names, large numbers and many items.

**Why.** Screens are usually designed with tidy, average sample data; real users meet the empty first day, the slow connection, the error and the 40-character name. A blank container reads as "broken"; "No records" shown while data is still loading is a wrong answer. NN/g recommends never leaving a container blank and giving a direct way forward from the empty state. Translations are often much longer than the source text.

**How to check.** For each screen, force each state: empty account, slow network (browser throttling), server error, success, and stress data — the longest names and numbers in the profile, 200 items in a list or dropdown (ours), a long pasted paragraph. Switch to the longest language in the profile, or lengthen every string by about a third (ours) if no translation exists. Pass: every state has a message in plain words and at least one action (create, retry, change filter, go back); loading never shows "no results"; nothing overlaps, clips mid-word or pushes a control off-screen; amounts and names are never cut (see TEXT-3).

**Bad → Good.** Acme's customer list shows an empty white panel to a new shop and "No customers" for two seconds while loading → a skeleton while loading, then "No customers yet — Add a customer or import from a spreadsheet".

**Limits.** A short-lived state (under about 1 s) does not need its own indicator (see ACT-2). Early prototypes may skip rare states, but the review lists them as "not checked".

**Evidence.** Heuristic: NN/g guidance and design-system principles; stress testing is common practice, not a measured rule.

**Sources.** NN/g (Empty states, 2021; Skeleton screens, 2023; Progress indicators, 2014); Apple HIG (Layout: test localizations and text sizes; Tab bars: explain empty sections); Figma Resource Library (UX validation); secondary: GitLab Pajamas ("clear next step for every state"), IBM (localisation without redesign), U.S. Web Design System ("is it always clear what to do next?").

## STATE-3. Make form errors specific, next to the field, and keep what was typed

**Rule.** Every field has a visible label outside the field (a placeholder is not a label). Required and optional fields are both marked at the field. A field is checked when the person leaves it or has typed the full expected length, not while they are still typing; an error clears as soon as the input becomes valid. Each error message sits next to its field, names what exactly is wrong and how to fix it, uses more than colour, and never erases what the person typed. A summary at the top may be added, never used alone.

**Why.** In the study NN/g cites (Seckler et al., CHI 2014), forms that followed such guidelines were submitted without errors at the first try 78% of the time, against 42% for forms that broke them. WCAG 2.2 requires the field in error to be identified and the error described in text (3.3.1). Baymard reports that most checkout forms use one generic message ("invalid value") where a specific one ("the email is missing the @") would let people fix the error at once, and that marking only one kind of field makes people miss required ones.

**How to check.** On each form: every field has a visible label above or beside it that stays while typing. Each field is marked required or optional (an asterisk with a legend, or the word "Optional"); a page-level "all fields required" alone fails. Type into a field and stop halfway: no error yet. Leave the field invalid: an error appears next to it within about 0.1 s of leaving. Make three different mistakes in an email or card field: each gets its own message. Submit with errors: nothing typed is lost, focus moves to the first error, and the error text is not only red (an icon or text marker as well). Errors are not shown only in a toast or a tooltip.

**Bad → Good.** Acme Shop's checkout shows "Please fix the errors above" in red at the top and clears the card number → the card field shows "Card number is 2 digits short" under it, the number stays, and the summary at the top links to the field.

**Limits.** A two-field sign-in form may skip required markers. For sign-in, do not say which of the email or password was wrong unless brute-force protection is in place. Format examples may sit in a placeholder only if a real label is also present.

**Conflicts.** With MEM-1 (fewer elements): labels and markers are not clutter (see conflicts.md).

**Evidence.** Standard (WCAG 3.3.1) plus Research: Seckler et al. 2014 as reported by NN/g; Baymard benchmark findings (e-commerce, US and Europe).

**Sources.** WCAG 2.2 (3.3.1 Error Identification, 1.4.1 Use of Color); Apple HIG (Text fields: label besides placeholder, validate on leaving the field); NN/g (Web form design, 2016; Form errors, 2019; Error messages, 2023; Placeholders, 2014; Required fields, 2019); Baymard (inline validation timing, adaptive error messages, required and optional fields, inline labels on mobile); Seckler et al. 2014; Figma Resource Library (UI design best practices).

## STATE-4. Prefer undo; confirm only what cannot be undone

**Rule.** Common actions, even destructive ones, can be undone (an Undo that stays visible long enough to reach, a trash that can be emptied later, an edit history). A confirmation dialog is used only for actions that are serious and cannot be undone; it names the object and the consequence, its buttons name the actions ("Delete 3 orders" / "Keep orders"), the destructive choice is never the default and is never styled as the primary action. The most dangerous actions may require a deliberate extra step.

**Why.** Confirmations shown for everything are clicked through by habit and stop protecting anyone; undo fixes the mistake after it happens without slowing every routine action. NN/g and Apple both say to confirm only uncommon, irreversible destructive actions and to keep alerts rare; vague "Are you sure?" with Yes/No buttons makes people reread the question.

**How to check.** List every destructive or costly action (delete, cancel order, refund, send to all customers). For each: undoable → no confirmation needed, and the undo control is visible and reachable (not a toast that vanishes in a few seconds, ours); not undoable → a confirmation that names the object and what will happen, with action-labelled buttons, Cancel (or Keep) as the default, the destructive button in the destructive style (red, not the accent colour). No confirmation appears on routine, undoable actions. No alert appears just to inform.

**Bad → Good.** Acme asks "Are you sure? Yes / No" before archiving any order, and nothing before "Refund $240 to Anna Lee" → archiving shows "Order archived — Undo"; the refund asks "Refund $240.00 to Anna Lee? This cannot be reversed" with "Refund $240.00" and "Keep payment".

**Limits.** Some actions cannot technically be undone (a sent message, a payment to a bank); they need the confirmation. Repeated confirmations for the same expert action may be switchable off by the user.

**Conflicts.** With ACT-8 (no interruptions): a confirmation is a justified interruption only for irreversible loss (see conflicts.md).

**Evidence.** Heuristic: NN/g and Apple HIG guidance (user control and freedom, error prevention); not a measured threshold.

**Sources.** Apple HIG (Alerts; Buttons: destructive role); Material 3 (Dialogs: at most two actions); NN/g (Confirmation dialogs, 2018; User control and freedom, 2020; Ten usability heuristics); secondary: IBM (undo and redo, warn before data loss), Atlassian (error prevention and recovery), U.S. Web Design System ("can users undo actions?"), NN/g via Shneiderman's golden rules.
