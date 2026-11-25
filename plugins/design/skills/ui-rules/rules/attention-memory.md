# Attention and memory

A person on a screen notices little, holds little in mind, and forgets what is out of sight. These rules make the screen carry what the head cannot: less to decode, nothing to remember between steps, long content in named pieces, messages where the eye already is.

The four rules have clear borders. MEM-1 is about what is on the screen now. MEM-2 is about what the person must remember because it is not on the screen. MEM-3 is about the shape of long content. MEM-4 is about where messages appear. Choosing among options is ACT-3; putting frequent things first is ACT-4.

## Review questions

- Is everything on the first screen needed for the current task, with the rest one step away?
- Can every step be done without remembering something from an earlier screen?
- Are long numbers, texts and forms split into short, named pieces?
- Does every message appear next to the thing the user just touched, and does nothing important look like an ad?

## MEM-1. Spend attention only on the task; reveal the rest progressively

**Lens.** UX.

**Rule.** Everything on the screen that is not needed for the current task has to earn its place. Show the few most important options first and put advanced ones behind a clearly labelled control, at a shallow depth. People must never work out how the interface works on top of doing their task.

**Why.** Understanding an interface takes mental effort, and the amount available is small; effort spent decoding labels, decoration and needless choices is taken from the task. Hiding advanced options helps when the split between first and later options matches real use; deep layers make people lost.

**How to check.**
- Write the screen's task in one sentence.
- Mark each element: needed now, needed sometimes, not needed. Nothing "not needed" remains; "needed sometimes" is one step away (behind "More", a tab, a disclosure), not on the first screen.
- Count disclosure levels to reach any option.

**Thresholds.** Disclosure depth [profile: mem.disclosure-depth = 2].

**Bad → Good.** Acme's payment form showing the company mission, three promo banners and a newsletter box → amount, payer, method, one button; "Split payment" behind "More options".

**Limits.** Hiding information a person needs to decide is not lowering load; it moves the work into their memory (MEM-2). Frequent expert actions are not hidden (ACT-4). Top-level navigation is not hidden (EXP-6).

**Conflicts.** C-1, C-4.

**Evidence.** Research, applied: cognitive load was measured in learning tasks; progressive disclosure is supported by usability studies of applications.

## MEM-2. Never make people carry facts between screens

**Lens.** UX.

**Rule.** What a person needs to decide is visible where they decide it. They do not retype or remember a number, a code, a name or an earlier choice: it is shown, prefilled or selectable. A confirmation states exactly what is being confirmed. When something must be held in mind without being seen (digits of a code, options read out by voice, instructions given before a task), the set is kept to a few items.

**Why.** Working memory holds a few things for a short time and loses them when attention moves. Asking people to remember is asking them to make mistakes; recognising an option on screen is easier than recalling it. The exact capacity is debated, and it applies to things out of sight: a visible list of twelve labelled items does not need remembering.

**How to check.**
- Walk the main task. At each step list what the user must know to act; every item is on the current screen.
- Information entered earlier in the same process is filled in or selectable when asked again.
- Confirmation steps show the object and key values. Comparisons do not need switching tabs.
- Find every place where the user must remember something not in view (a code to type, a voice menu, instructions before a step) and count the items.

**Thresholds.** No re-entry of information given earlier in the same process [WCAG 3.3.7 A]. Items held in mind without being seen [profile: mem.unseen-items = 4].

**Bad → Good.** Acme: "Confirm transfer?" → "Send $120.00 to Anna Lee, card •• 4417?". The delivery address typed again on the payment step → "Same as delivery address", checked. Acme's phone line reads out nine options before any can be chosen → four options and "other".

**Limits.** Re-entry is allowed when it is essential (a new password typed twice) or required for security. Codes sent to another device are accepted, but the screen says where the code went and allows pasting. A long visible list is a problem of choosing and finding (ACT-3, SEARCH-1), not of memory; "seven plus or minus two" is not a limit for menus (`disputed.md`).

**Conflicts.** C-1.

**Evidence.** Standard (re-entry) and Research (the limits of working memory are well established; the exact number is contested).

## MEM-3. Split long content into named chunks

**Lens.** UI and UX.

**Rule.** Long strings, texts and forms are split into short groups with a visible break. Numbers people read or type are grouped (card numbers by four, phone numbers in the local format). Text comes in short paragraphs under headings that say what is inside. Long forms come in named sections.

**Why.** People take in information in meaningful pieces. A few named pieces are easier to read, check and keep in mind than one long run, and a heading lets people skip what they do not need.

**How to check.**
- Every string people read or copy that is longer than a short code is grouped.
- Paragraphs are short at the main width; there is a heading every few paragraphs.
- Long forms are split into named sections.
- Copying a grouped value gives a clean value, or the field accepts both forms (ACT-7).

**Thresholds.** Group strings longer than [profile: mem.chunk-string = 8 characters]; paragraph length [profile: mem.paragraph-lines = 5 lines]; split forms longer than [profile: mem.form-section = 6 fields].

**Bad → Good.** "4111111111111111" → "4111 1111 1111 1111". Acme's 14-field sign-up in one column → "Shop", "Contact", "Payout", each with its fields.

**Limits.** Grouping must not change what is copied or sent. Short forms of two or three fields need no sections.

**Evidence.** Research: chunking is well established; the thresholds are team choices.

## MEM-4. Put messages where the eye already is; never style content like an ad

**Lens.** UI and UX.

**Rule.** Messages and changes appear where attention is at that moment: next to the field, button or item just used. Errors are never shown only in toasts that disappear. Important content does not look like advertising and does not sit in places people learn to skip (a banner strip at the top, a right-hand column).

**Why.** People focus on what serves their goal and filter out the rest. They miss changes away from their focus and skip anything that looks promotional, even when it is the thing they need.

**How to check.**
- For each message (error, saved, price changed, item added), find the element touched just before: the message is in or next to it, not only in a corner toast or a top banner.
- Error toasts that fade out are findings.
- No important information uses ad styling: a bright banner, an image with text, an animated box, a place among ads.

**Bad → Good.** In Acme Shop, "Price updated" shown only in a top banner while the user is at the bottom of a long cart → the new price next to the item, with a short note.

**Limits.** A global status (offline, session expired) may stay global, but it also marks or blocks the next action the user tries. Which channel to use for which message is STATE-5.

**Conflicts.** C-13.

**Evidence.** Research: selective attention and banner blindness are measured, including with eyetracking on web pages.
