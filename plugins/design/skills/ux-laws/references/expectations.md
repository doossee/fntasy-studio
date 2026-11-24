# Expectations: what people bring with them

Eight rules on what users already know and expect before they open the screen: habits from other products, their idea of how things work, how little they read, how they type, and how they judge what they see.

## LAW-JAKOB. Work the way the products people already use work

**Rule.** Common tasks use the patterns users know from the products they use every day: where the navigation is, how search, the cart, sign-in, back and close work, what icons mean. Depart from a convention only for a clear gain, and then make the new way obvious.

**Why.** People spend most of their time in other products, and they bring those habits with them. A familiar pattern costs nothing to learn; an unfamiliar one costs every user time and errors.

**How to check.** List the patterns on the screen (navigation, search, forms, list actions, icons). For each, name two widely used products the users of this product know (from the profile, or assumed and marked so) and compare. Pass: each pattern works the same way, or the difference is deliberate, written down, and explained on the screen.

**Bad → Good.** A shopping app where the cart icon opens the wish list → the cart icon opens the cart; the wish list has a heart icon.

**Limits.** Copy the behaviour that users know, not the look or brand of another product.

**Evidence.** Heuristic: an observation by Jakob Nielsen from usability practice, not an experiment. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-JAKOB]; origin: Jakob Nielsen, Nielsen Norman Group [LUX-JAKOB].

## LAW-MENTAL-MODEL. Match how users think the thing works

**Rule.** Names, structure and behaviour follow the user's idea of the task, not the system's inner structure. Sections are named in the user's words, things are where users look for them, and an action does what its label leads people to expect.

**Why.** People carry a small inner model of how a system works and use it to predict what will happen. When the product matches that model, they predict right; when it follows the database or the org chart, they guess wrong.

**How to check.** For each main action, cover the screen below the button and ask a user (or write down your own prediction, marked "assumed"): what will happen when you press it? Pass: the prediction matches the result. For navigation, ask where a user would look for three common things; pass if they are there. Labels contain no internal terms (table names, team names, codes).

**Bad → Good.** Menu sections "Entities", "Transactions", "Config" → "Customers", "Payments", "Settings".

**Limits.** When the user's model is wrong in a way that leads to loss (for example, they think "delete" can be undone when it cannot), do not follow it silently: change the design or say so clearly at the point of action.

**Evidence.** Research: mental models are a long-standing concept in psychology and HCI. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-MENTAL-MODEL]; origin: Kenneth Craik, "The Nature of Explanation", 1943 [LUX-MENTAL-MODEL].

## LAW-ACTIVE-USER. Teach in place; people will not read the manual first

**Rule.** The product works without reading anything first. No required tour, no instruction pages before the first task. Help appears inside the task, at the moment it is needed: a short hint at the field, an example value, an empty state that shows the first step.

**Why.** People start using a product right away, to get their task done, and skip manuals and tours, even when reading them first would save time later.

**How to check.** Open the product as a new user and start the main task. Pass: the first task can be completed without opening help or reading a tour; any tour can be skipped in one tap and is not shown again; every empty screen says what will appear there and gives the first action.

**Bad → Good.** Five swipe screens explaining features before sign-up → straight to the first screen, with an empty state "No invoices yet — Create your first invoice".

**Limits.** Complex professional tools may need training; then the training is optional and the product still does not block the first task.

**Evidence.** Research: observed in studies of new users (Carroll and Rosson). Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-ACTIVE-USER]; origin: Mary Beth Rosson and John Carroll, 1987 [LUX-ACTIVE-USER].

## LAW-TESLER. Let the product carry the complexity, not the user

**Rule.** Every task has some complexity that cannot be removed. The product takes as much of it as it can: it computes, prefills, chooses defaults and checks for the user instead of asking them. What still needs a human decision is asked plainly, once.

**Why.** Complexity can be moved but not made to disappear. When the design hides it badly, it lands on the user as extra fields, rules to remember, and errors.

**How to check.** For each field and decision in the main task, ask: could the product know or work this out (from earlier data, the device, a lookup, a sensible default)? Pass: no field asks for what the product could fill in itself (city from postcode, card type from the number, today's date). Fail: the user has to follow a format rule the product could handle.

**Bad → Good.** "Select card type" before typing the card number → the type is detected from the number.

**Limits.** Automatic choices that matter (money, sending, deleting) are shown and can be changed; do not hide a decision the user is responsible for.

**Evidence.** Heuristic: a maxim of an interface designer, not a study. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-TESLER]; origin: Larry Tesler, Xerox PARC, mid-1980s [LUX-TESLER].

## LAW-POSTEL. Accept what people type; give back a clean, consistent format

**Rule.** Inputs accept the formats people naturally use (spaces, dashes and brackets in phone numbers; different date formats; amounts with a comma or a dot; a pasted value with extra spaces) and turn them into the product's format without complaint. What the product shows is always in one consistent format.

**Why.** Be liberal in what you accept and conservative in what you send. People type the same thing in many ways; rejecting reasonable input makes the product feel broken.

**How to check.** For each typed field (phone, date, amount, card, postcode, email), enter three reasonable variants: with spaces, with separators, pasted with a leading or trailing space. Pass: all are accepted and shown back in one format. An error appears only for input that truly cannot be understood, and it says the expected format with an example.

**Bad → Good.** "+1 (555) 010-0199" rejected with "Invalid phone" → accepted and shown as "+1 555 010 0199".

**Limits.** Being liberal must not guess on ambiguous input that changes meaning (03/04 as a date: March or April?). Then ask, or use a date picker. The principle is disputed in its home field: the IETF (RFC 9413, 2023) warns that silently accepting and reinterpreting bad input causes problems over time. Accept variants of a known format; do not guess intent.

**Evidence.** Analogy: a principle of network protocols, disputed in its own field (RFC 9413); applied here to form input. Checked against the research 24.11.2026 (RFC 9413).

**Sources.** [LUX-POSTEL]; origin: Jon Postel, robustness principle of Internet protocols [LUX-POSTEL]; critique: RFC 9413, "Maintaining Robust Protocols", 2023.

## LAW-OCCAM. Every element must do a job; remove the rest

**Rule.** Of two designs that let the user do the task equally well, choose the one with fewer elements, steps and concepts. Every element on the screen can be explained by the task it serves; if it cannot, it goes.

**Why.** Among explanations that work equally well, the one with fewest assumptions is best. In design, each extra element adds something to see, read and understand, and it must pay for that cost.

**How to check.** For each element on the screen, say in one line what the user does with it or learns from it. Then remove it in your head: does any task get harder? Pass: every element has an answer and removing it would hurt. Fail: decorative text, repeated information (the same number shown twice), controls nobody uses.

**Bad → Good.** A card that shows the customer's name in the title, in a subtitle and in a tag → the name once, in the title.

**Limits.** Fewer is not always simpler: removing labels, units or confirmations makes the task harder, not simpler.

**Evidence.** Analogy: a principle of reasoning from philosophy. Origin as given on lawsofux.com, not checked.

**Sources.** [LUX-OCCAM]; origin: William of Ockham, 14th century [LUX-OCCAM].

## LAW-AESTHETIC-USABILITY. Good looks hide problems; test what people do, not what they say

**Rule.** The product looks cared-for and consistent, because people judge a good-looking interface as easier to use. But a review or a test judges usability by what people manage to do (finish the task, time, errors), not by whether they like how it looks.

**Why.** In the original study people rated the ease of use of interfaces they had not used yet, and their ratings followed the look more than the actual usability; later studies repeated the result, including ratings after use. Opinions about ease of use are therefore coloured by the look, and anyone who only asks for opinions will miss real problems.

**How to check.** In any review or test, record for each task: done or not, time, errors, places where the person hesitated. Pass: the verdict rests on these, and comments like "looks nice" are kept apart from the findings. For the look itself: alignment, spacing and type follow one system on every screen (see LAW-SIMILARITY).

**Bad → Good.** "Users loved the new design" as the result of a test → "4 of 5 finished checkout; 3 hesitated at the delivery step; users also said they liked the look".

**Limits.** A beautiful screen with a broken task fails. A plain screen with a working task passes, and can be polished later.

**Evidence.** Research: Kurosu and Kashimura 1995, repeated by Tractinsky 1997; the effect is on judged ease of use, not on actual task success. Checked against the research 24.11.2026.

**Sources.** [LUX-AESTHETIC-USABILITY]; origin: Masaaki Kurosu and Kaori Kashimura, "Apparent Usability vs. Inherent Usability", CHI '95 [LUX-AESTHETIC-USABILITY]; replication: Noam Tractinsky, CHI '97.

## LAW-COGNITIVE-BIAS. Do not exploit biases; guard against them

**Rule.** The design does not use known thinking shortcuts against the user: no paid or unwanted options preselected, no false urgency or scarcity, no shaming wording on the "no" button, no hidden costs revealed at the last step. Where a bias could lead the user into a mistake (a default amount, an anchoring price, an "are you sure" they click through by habit), the design makes the honest choice easy.

**Why.** People make systematic errors in judgement (defaults, anchoring, loss aversion, framing). Designs can exploit them for short-term gain or protect users from them; the first destroys trust.

**How to check.** Go through every choice that involves money, data or consent. Pass: no option the user pays for or shares data with is preselected; the price shown first is the full price; the "decline" option is a plain, neutral label with the same visibility as "accept"; any countdown or "only 2 left" is true and verifiable.

**Bad → Good.** "Add insurance (+$12)" ticked by default and "No thanks, I like risk" as the decline → unticked, "Add insurance, $12" and "Skip".

**Limits.** Good defaults are not manipulation when they serve the user and are easy to change (for example, the most common delivery option preselected).

**Evidence.** Research: Tversky and Kahneman 1974 and later work; the list of dark patterns to avoid is ours. Checked against the research 24.11.2026 (year and paper).

**Sources.** [LUX-COGNITIVE-BIAS]; origin: Amos Tversky and Daniel Kahneman, "Judgment under Uncertainty: Heuristics and Biases", Science, 1974 [LUX-COGNITIVE-BIAS].
