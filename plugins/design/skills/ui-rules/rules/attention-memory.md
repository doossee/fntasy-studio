# Attention and memory

A person on a screen notices little, holds little in mind, and forgets the middle of a list. These rules make the screen carry what the head cannot: less to decode, nothing to remember between steps, messages where the eye already is.

## Review questions

- Is everything on the first screen needed for the current task, with the rest one step away?
- Can every step be done without remembering something from an earlier screen?
- Are long numbers, texts and forms split into short, named pieces?
- Does every message appear next to the thing the user just touched, and does nothing important look like an ad?
- Are the most used items first or last in menus and bars?

## MEM-1. Spend attention only on the task; reveal the rest progressively

**Rule.** Everything on the screen that is not needed for the current task has to earn its place. Show the few most important options first and put advanced ones behind a clearly labelled control, no more than two levels deep. People must never work out how the interface works on top of doing their task.

**Why.** Understanding an interface takes mental effort, and the amount available is small; effort spent decoding labels, decoration and needless choices is taken from the task. Progressive disclosure helps when the split between first and later options matches real use; deeper levels make people lost.

**How to check.** Write the screen's task in one sentence. Mark each element: needed now, needed sometimes, not needed. Nothing "not needed" remains; "needed sometimes" is one step away (behind "More", a tab, a disclosure), not on the first screen. Count disclosure levels to reach any option: at most two.

**Bad → Good.** Acme's payment form showing the company mission, three promo banners and a newsletter box → amount, payer, method, one button; "Split payment" behind "More options".

**Limits.** Hiding information a person needs to decide is not lowering load; it moves the work into their memory (MEM-2). Frequent expert actions should not be hidden (ACT-4).

**Conflicts.** With MEM-2 and EXP-6 on what to hide (see conflicts.md).

**Evidence.** Research, extended: cognitive load theory (Sweller 1988) comes from learning and instruction; progressive disclosure is supported by NN/g research across 46 applications; applying both to screens is common practice.

**Sources.** NN/g (Minimize cognitive load, 2013; Progressive disclosure, 2006); Laws of UX (Cognitive Load); Figma Resource Library (Reducing design complexity; Simplicity in design); secondary: "58 rules" (progressive disclosure), GitLab Pajamas (start simple, reveal complexity gradually), Apple iOS principles (focus on the primary task). (former LAW-COGNITIVE-LOAD)

## MEM-2. Never make people carry facts between screens

**Rule.** What a person needs to decide is visible where they decide it. They do not retype or remember a number, a code, a name or an earlier choice from a previous step: it is shown, prefilled or selectable. A confirmation states exactly what is being confirmed.

**Why.** Working memory holds a few things briefly and loses them when attention moves; asking people to remember is asking them to make mistakes. Recognising an option on screen is easier than recalling it.

**How to check.** Walk the main task. At each step list what the user must know to act; every item is on the current screen. Information entered earlier in the same process is auto-filled or selectable when asked again (WCAG 2.2, 3.3.7). Confirmation steps show the object and key values. Comparisons do not require switching tabs.

**Bad → Good.** Acme: "Confirm transfer?" → "Send $120.00 to Anna Lee, card •• 4417?". Delivery address typed again on the payment step → "Same as delivery address" checked by default.

**Limits.** Re-entry is allowed when it is essential (a password confirmation) or required for security; codes sent to another device are an accepted exception, but the screen says where the code went and lets people paste it.

**Evidence.** Standard (WCAG 2.2, 3.3.7) and Research: the limits of working memory are well established.

**Sources.** WCAG 2.2 (3.3.7 Redundant Entry); NN/g (Memory recognition and recall, 2024); Laws of UX (Working Memory); secondary: IBM design principles (keep users informed), Nielsen's heuristic "recognition rather than recall". (former LAW-WORKING-MEMORY)

## MEM-3. Keep what must be held in mind to about four items

**Rule.** When people must hold items in mind that they cannot see (digits of a code, options read out one by one, instructions given before a task), keep the set to about four. Do not use "seven, plus or minus two" as a limit for menus, tabs or lists: items that are visible do not need remembering.

**Why.** Memory span is short. Miller's 1956 paper gave about seven items; Cowan's 2001 review places the limit nearer four chunks, where a chunk can be several items grouped into one. The exact figure is still debated; both are about memory, not about how many things a screen can show.

**How to check.** Find every place where the user must remember something not in view: a code to type, a voice menu, instructions before a step. No more than four unseen items at once (ours, after Cowan). A menu of twelve visible, well-labelled items does not fail this rule.

**Bad → Good.** Acme's phone support line reading out nine options before any can be chosen → four options and "other".

**Limits.** Long visible lists are a problem of choosing and finding (ACT-3), not of memory.

**Evidence.** Research: Miller 1956 and Cowan 2001; the exact limit is debated.

**Sources.** Laws of UX (Miller's Law; Working Memory); NN/g (Memory recognition and recall, 2024); secondary: Miller 1956; Cowan 2001. (former LAW-MILLER)

## MEM-4. Split long content into named chunks

**Rule.** Long strings, texts and forms are split into short groups with a visible break. Numbers people read or type are grouped (card numbers by four, phone numbers in the local format). Text comes in short paragraphs under headings that say what is inside. Long forms come in named sections.

**Why.** People take in information in chunks: a few meaningful pieces are easier to read, check and keep in mind than one long run.

**How to check.** Every string longer than eight characters (ours) that people read or copy is grouped. No paragraph is longer than five lines at the main width (ours); there is a heading every few paragraphs. Forms of more than six fields (ours) are split into named sections. Copying a grouped value gives a clean value, or the field accepts both forms (ACT-7).

**Bad → Good.** "4111111111111111" → "4111 1111 1111 1111". Acme's 14-field sign-up in one column → "Shop", "Contact", "Payout", each with its fields.

**Limits.** Grouping must not change what is copied or sent. Short forms (two or three fields) need no sections.

**Evidence.** Research: chunking is well established (Miller 1956); the thresholds are ours.

**Sources.** NN/g (Proximity principle, 2020: chunk long forms; Plain language, 2017); Laws of UX (Chunking); secondary: "58 rules" (break huge tasks into smaller steps). (former LAW-CHUNKING)

## MEM-5. Put messages where the eye already is; never style content like an ad

**Rule.** Messages and changes appear where attention is at that moment: next to the field, button or item just used. Errors are not shown only in toasts that disappear. Important content does not look like advertising and does not sit in places people learn to skip (a banner strip at the top, a right-hand column).

**Why.** People focus on what serves their goal and filter out the rest; they miss changes away from their focus and skip anything that looks promotional. In NN/g eyetracking (26 people per study) one participant gave the right-hand column 1 of 148 fixations.

**How to check.** For each message (error, saved, price changed, item added), find the element touched just before: the message is in or next to it, not only in a corner toast or a top banner. Error toasts that fade out are findings. No important information uses ad styling: bright banner, image with text, animated box, placement among ads.

**Bad → Good.** In Acme Shop, "Price updated" shown only in a top banner while the user is at the bottom of a long cart → the new price next to the item, with a short note.

**Limits.** A global status (offline, session expired) may stay global, but it also blocks or marks the next action the user tries.

**Evidence.** Research: attention research (Cherry 1953, Broadbent 1958, Treisman 1960) and NN/g eyetracking on banner blindness (2018).

**Sources.** NN/g (Banner blindness revisited, 2018; Indicators, validations and notifications, 2024); Apple HIG (Accessibility: avoid auto-dismissing views); Laws of UX (Selective Attention); secondary: Baymard (feedback placement), Figma Resource Library (UI design best practices: feedback). (former LAW-SELECTIVE-ATTENTION)

## MEM-6. Put the most used items first and last

**Rule.** In navigation bars, menus and short lists, the most used or most important items go at the start and the end; the middle holds what is used least. On a phone tab bar, the main section is first.

**Why.** People remember the first and last items of a sequence best and the middle least.

**How to check.** Rank the items of a menu or bar by use (analytics, the project profile, or the task list). The top-ranked item is first; the second is first or last; the lowest-ranked are in the middle.

**Bad → Good.** Acme's bottom bar "Settings, Search, Home, Orders, Profile" → "Home, Orders, Search, Customers, Profile".

**Limits.** Lists with a natural order (alphabet, date, steps) keep it. Do not reorder a menu people already know without a reason (EXP-4).

**Evidence.** Research, extended: found for remembering lists (Ebbinghaus); applying it to menus and navigation is an assumption, not a measured result.

**Sources.** Laws of UX (Serial Position Effect); Apple HIG (Tab bars); secondary: Ebbinghaus as named by Laws of UX. (former LAW-SERIAL-POSITION)
