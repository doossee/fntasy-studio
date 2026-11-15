# States: empty, loading, error, success

A screen is designed not only "with data". A new account sees empty screens, a slow connection shows loading, a failure shows an error.

Examples use the fictional product Acme Orders (see `00-audience.md`).

## STATE-1. An empty screen points to the first action

**Rule.** An empty list or section says in one phrase what will appear here and gives one button to create it. No empty tables with column headers and no zero tiles.

**Why.** An empty state must report the status, explain the section and give a direct path to the action (NNG-EMPTY, ATL-EMPTY).

**How to measure.** Open the section in an account without data. On the screen: a title about the situation, no more than two sentences, exactly one action button. The phrase is not "No data" but about the object: "No customers yet".

**Bad → Good.** A table with a header and a row "No data" → "No customers yet. Add the first one, it takes a minute." and the button "Add customer".

Sources: NNG-EMPTY, ATL-EMPTY.

## STATE-2. Loading is visible and does not jump

**Rule.** If the response takes longer than 1 second, a skeleton of the same shape is visible in place of the content. When the data arrives, what is already shown does not shift. Longer than 10 seconds: a text saying what is going on.

**Why.** Up to 1 second no indicator is needed, from 1 to 10 it is needed, longer it is needed with an explanation (NNG-TIME, NNG-PROGRESS, NNG-SKELETON, HIG-LOADING).

**How to measure.** Slow the network down (in browser tools "Slow 3G" or a response delay of 3 s). The screen shows a skeleton, not emptiness and not a single spinner in the center. After loading, the title and the buttons stayed in the same places.

**Bad → Good.** A white screen for 3 seconds, then everything at once → the header and row skeletons at once, rows fill in place.

Sources: NNG-TIME, NNG-PROGRESS, NNG-SKELETON, HIG-LOADING.

## STATE-3. Load error: what happened and "Retry"

**Rule.** If the data did not load, in its place there is a plain explanation and a "Retry" button. The rest of the screen keeps working. An error code is allowed only in small type, as a reference for support.

**Why.** A message must name the problem in plain words and offer a way out (NNG-ERROR, ATL-ERROR, NNG-10).

**How to measure.** Block the data request. On the screen: a phrase without the words "server error", "500", "undefined", a "Retry" button, the navigation works.

**Bad → Good.** "Error 500. INTERNAL_ERROR" → "Could not load payments. Check your connection and press Retry."

Sources: NNG-ERROR, ATL-ERROR, NNG-10.

## STATE-4. Success is called by name

**Rule.** After an action a confirmation appears that names the object and the main number: "Payment recorded: Northwind Traders, $1,250.00". It appears no later than 1 second after the response and requires no press to continue.

**Why.** The system status must be visible (NNG-10). The last moment of a scenario is remembered more strongly than the rest (LAW-PEAK). The result message is available without moving the focus (WCAG-4.1.3).

**How to measure.** Perform the action. The confirmation has the name or title of the object and an amount or a count. After 5 seconds work can continue without closing anything.

**Bad → Good.** "Success" → "Payment recorded: Northwind Traders, $1,250.00. Nothing overdue."

Sources: NNG-10, LAW-PEAK, WCAG-4.1.3, GOV-CONFIRM.

## STATE-5. Zero does not pretend to be data

**Rule.** A block in which all values are currently zero shrinks to one line or is hidden. Large digits are only for non-zero values.

**Why.** A large zero takes the place of the real answer and reads as an important number (NNG-EMPTY, LUKEW-FIRST). A norm of this skill.

**How to measure.** On an overview screen find the blocks where all numbers are zero. Each takes no more than one line (≤ 56 px) or is absent.

**Bad → Good.** A card "Reminders today": sent 0, skipped 0, failed 0, queued 0 and a button → no block until something is sent.

Sources: NNG-EMPTY, LUKEW-FIRST.

## STATE-6. An important object state is visible in the header

**Rule.** A state that changes what can be done next (Overdue, On hold, Draft, archived) is shown next to the object's name, not in a tab below.

**Why.** A person who came back to the screen a minute later must understand the situation from the first lines (NNG-MOBILE, NNG-F).

**How to measure.** On the card of an object in such a state (a Customer with an overdue balance), on the first screen at 390 × 844 the status word ("Overdue") and the amount are visible.

**Bad → Good.** The overdue balance is visible only in the "Invoices" tab → a line "Overdue $1,250.00" under the name.

Sources: NNG-MOBILE, NNG-F, NNG-10.
