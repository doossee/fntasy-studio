# Attention and memory: what people notice and keep in mind

Nine rules on the limits of attention and memory. A person on a screen notices little, holds little in mind, and forgets the middle. The screen has to carry what the head cannot.

## LAW-COGNITIVE-LOAD. Spend the user's thinking only on their task

**Rule.** Everything on the screen that is not needed for the current task has to earn its place. Remove or hide what the user does not need now; never make them work out how the interface works on top of doing their task.

**Why.** Understanding and using an interface takes mental effort, and the amount available is small. Effort spent on decoding the screen (unclear labels, decoration, needless choices) is taken from the task itself.

**How to check.** Write the main task of the screen in one sentence. Go through every element and mark it: needed for the task, needed sometimes, not needed. Pass: nothing marked "not needed" remains, and "needed sometimes" is one tap away (behind "More", a tab, a disclosure), not on the first screen.

**Bad → Good.** A payment form that shows the company's mission statement, three promo banners and a newsletter checkbox → the amount, the payer, the method, one button.

**Limits.** Removing information a person needs to decide is not lowering load; it moves the work into their memory (see LAW-WORKING-MEMORY).

**Evidence.** Research, extended: cognitive load theory comes from learning and instruction; applying it to interfaces is common practice, not a measured law of screens. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-COGNITIVE-LOAD]; origin: cognitive load theory, John Sweller, 1988 [LUX-COGNITIVE-LOAD].

## LAW-WORKING-MEMORY. Do not make people carry facts between screens

**Rule.** What a person needs to make a decision is visible on the screen where they make it. They do not have to remember a number, a code, a name or an earlier choice from a previous screen or step.

**Why.** Working memory holds a few things for a short time and loses them when attention moves. Asking someone to remember is asking them to make mistakes.

**How to check.** Walk the main task step by step. At each step, list what the user must know to act. Pass: every item on that list is on the current screen (shown, prefilled, or one glance away in a summary). Fail: "enter the code from the previous screen", a confirmation step that does not show what is being confirmed, a comparison that requires switching tabs.

**Bad → Good.** A transfer confirmation that says "Confirm transfer?" → "Send $120.00 to Anna Lee, card •• 4417?".

**Limits.** Security codes sent to another device are an accepted exception; then the screen says where the code was sent and lets the user paste it.

**Evidence.** Research: limits of working memory are well established. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-WORKING-MEMORY]; origin: the term from George A. Miller, Eugene Galanter and Karl H. Pribram, 1960s [LUX-WORKING-MEMORY].

## LAW-MILLER. Keep what must be held in mind small; do not use "seven" as a menu limit

**Rule.** When a person must hold items in mind at once (digits of a code, options to compare, steps they cannot see), keep the set to about four. Do not use "seven, plus or minus two" as the limit for menus, tabs or lists: items that are on the screen do not need to be remembered.

**Why.** Memory span is short. Miller's 1956 paper gave about seven items; Nelson Cowan's 2001 review places the limit nearer four chunks (a chunk can be several items grouped into one, see LAW-CHUNKING). The exact figure is still debated. Both are about memory, not about how many things can be shown.

**How to check.** Find every place where the user must remember something they cannot see: a code to type, options shown one at a time, instructions given before a task. Pass: no more than four unseen items at once (ours, after Cowan's estimate). For codes longer than four characters, they are split into groups (see LAW-CHUNKING). A menu with twelve visible, well-labelled items does not fail this rule.

**Bad → Good.** A phone menu that reads out nine options before you can press anything → four options, "more" as the fifth.

**Limits.** Long visible lists are a problem of finding and choosing (LAW-HICK, LAW-CHOICE-OVERLOAD), not of memory.

**Evidence.** Research: Miller 1956 and Cowan 2001; the exact limit is still debated. Checked against the research 24.11.2026 (Cowan).

**Sources.** [LUX-MILLER]; origin: George A. Miller, "The Magical Number Seven, Plus or Minus Two", 1956 [LUX-MILLER]; Nelson Cowan on a limit of about four [LUX-MILLER].

## LAW-CHUNKING. Split long content into small, named pieces

**Rule.** Long strings, long texts and long forms are split into short groups with a visible break. Numbers that people read or type are grouped (card numbers by four, phone numbers by the local format). Text is split into short paragraphs with headings that say what is inside. Forms are split into named sections.

**Why.** People take in information in chunks: a few meaningful pieces are easier to read, check and keep in mind than one long run.

**How to check.** Find every string longer than eight characters (ours) that a person reads or copies: grouped or not. Find every text block: no paragraph longer than five lines (ours) at the main width, headings every few paragraphs. Find every form with more than six fields (ours): split into named sections.

**Bad → Good.** "4111111111111111" → "4111 1111 1111 1111". A 14-field form in one column → "Contact", "Delivery", "Payment", each with its fields.

**Limits.** Grouping a value must not change what is copied: a grouped number copies without the spaces, or the field accepts both (see LAW-POSTEL).

**Evidence.** Research: chunking is well established; the thresholds are ours. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-CHUNKING]; origin: George A. Miller, 1956 [LUX-CHUNKING].

## LAW-SELECTIVE-ATTENTION. Put what matters where the user is already looking

**Rule.** Important messages and changes appear where the user's attention is at that moment: next to the field, the button or the item they just used. They do not look like ads, and they are not placed in the areas people learn to skip (banners on top, side columns, anything that looks promotional).

**Why.** People focus on what serves their goal and filter out the rest. They miss changes away from their focus, and they skip anything that looks like advertising, even when it is the one thing they need.

**How to check.** For each message or change on the screen (error, saved, price changed, item added), find the element the user touched just before. Pass: the message is within that element's area or right next to it, not only in a toast at the far corner or a banner at the top. No important information is styled like a promotion (bright banner, image with text, "ad" shape).

**Bad → Good.** "Price updated" shown only in a banner at the top while the user is at the bottom of a long cart → the new price shown next to the item, with a short note.

**Limits.** A global status (offline, session expired) may stay global, but it also blocks or marks the action the user tries next.

**Evidence.** Research: attention research and observed banner blindness on the web. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-SELECTIVE-ATTENTION]; origin: cognitive psychology of attention, 1950s onwards (Cherry 1953, Broadbent 1958, Treisman 1960) [LUX-SELECTIVE-ATTENTION].

## LAW-VON-RESTORFF. Make one thing stand out, and only one

**Rule.** The one thing that must be noticed on a screen (the primary action, the key figure, a warning) is the only element with its look: the only filled accent button, the only large figure, the only red block. Emphasis is not spread over several items.

**Why.** Among similar items, the one that differs is noticed and remembered. When several items differ in the same way, none of them stands out.

**How to check.** Count the elements with the strongest emphasis on the first screen (filled accent colour, largest size, alert colour). Pass: one per kind of emphasis. The emphasis does not rely on colour alone: the item also differs in size, weight, shape or position (WCAG 2.2, 1.4.1).

**Bad → Good.** A pricing table where all three plans have a "Most popular" ribbon in different colours → one plan with the ribbon and a filled button, the other two with outlined buttons.

**Limits.** A list of errors may have several red items; then the summary at the top is the one thing that stands out.

**Evidence.** Research: the isolation effect in memory for lists is well established; applying it to emphasis on a screen is an inference. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-VON-RESTORFF]; origin: Hedwig von Restorff, 1933 [LUX-VON-RESTORFF]; [WCAG-USE-OF-COLOR].

## LAW-SERIAL-POSITION. Put the most important items first and last

**Rule.** In navigation bars, menus and short lists, the most used or most important items go at the start and at the end. The middle holds what people use least.

**Why.** People remember the first and the last items of a sequence best and the middle least.

**How to check.** Take the list of items in a menu or bar and rank them by use (from the profile, analytics or the task list). Pass: the top-ranked item is first, the second is first or last, and the lowest-ranked items are in the middle. On a phone bottom bar, the home or main section is first.

**Bad → Good.** A bottom bar "Settings, Search, Home, Orders, Profile" → "Home, Orders, Search, Messages, Profile".

**Limits.** Lists with a natural order (alphabet, date, steps) keep that order. Do not reorder a menu people already know without a reason (see LAW-JAKOB). The effect was found for remembering lists; that it applies to menus and navigation is a reasonable assumption, not a measured result.

**Evidence.** Research, extended: found for remembering lists; applying it to menus is an assumption. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-SERIAL-POSITION]; origin: Hermann Ebbinghaus, memory research [LUX-SERIAL-POSITION].

## LAW-ZEIGARNIK. Show what is unfinished and let people return to it

**Rule.** When a task is left half done (a draft, a cart, an unfinished profile, a step not completed), the product keeps the work, shows that it is unfinished, and offers a direct way back to the exact point where the person stopped.

**Why.** Zeigarnik reported that people remember interrupted tasks better than finished ones; that memory effect has proved hard to replicate. What holds up is the related finding of her colleague Maria Ovsiankina: given the chance, people tend to go back to an interrupted task. A product that keeps the work and shows the way back makes that return easy; one that loses the work turns it into frustration.

**How to check.** Start the main multi-step task, stop halfway, close the screen, come back. Pass: the entered data is still there, the place to continue is shown on the first screen the person sees, and it opens at the step they left. Fail: the data is lost, or the way back is hidden.

**Bad → Good.** An application form that empties itself after the user leaves for ten minutes → "Continue your application: step 3 of 5" on the home screen.

**Limits.** Do not use open-task reminders to nag: one visible place, no repeated pop-ups, and an easy way to discard the draft.

**Evidence.** Disputed: the memory effect did not replicate reliably; the tendency to resume (Ovsiankina) did. The rule rests on resumption. Checked against the research 24.11.2026.

**Sources.** [LUX-ZEIGARNIK]; origin: Bluma Zeigarnik, 1920s [LUX-ZEIGARNIK]; resumption: Maria Ovsiankina, 1928; meta-analysis of both: Ghibellini and Meier, 2025.

## LAW-PEAK-END. Design the worst moment and the last moment of a task

**Rule.** For each main task, find its most intense moment (usually an error, a wait or a loss) and its last moment (the result). Both get extra care: the error is clear, specific and recoverable; the result screen says plainly what happened and what comes next.

**Why.** People judge an experience mostly by how it felt at its most intense point and at its end, not by the average of every moment.

**How to check.** Walk the main task to the end, then once more with the most likely error. Pass: the result screen names what was done with its key facts ("Order 1042 placed, delivery on 12 March") and the next step. The error screen says what went wrong in plain words and how to fix it, and keeps what the user entered.

**Bad → Good.** After payment the screen just returns to the home page → a result screen with the amount, the receipt and "Track order". A failed payment that clears the card form → the form kept, the error next to the card number, "Try another card".

**Limits.** A good ending does not excuse a broken middle: the other rules still apply to every step.

**Evidence.** Research: Kahneman and others, on how past episodes are judged. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-PEAK-END]; origin: Kahneman, Fredrickson, Schreiber and Redelmeier, "When More Pain Is Preferred to Less: Adding a Better End", 1993 [LUX-PEAK-END].
