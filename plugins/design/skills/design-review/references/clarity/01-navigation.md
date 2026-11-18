# Navigation and structure

At any moment a person must know three things: where they are, where they can go, how to get back.

Examples use the fictional product Acme Orders (see `00-audience.md`).

## NAV-1. Sections are visible, not hidden

**Rule.** On a phone the main sections sit in a bottom bar: 3–5 items, each with an icon and a label. The "More" menu is only for rare things.

**Why.** Hidden navigation on a phone is used noticeably less than visible navigation, and sections inside it are found worse (NNG-HIDDEN-NAV). An icon without a label is not understood (NNG-ICON).

**How to measure.** At 390 px count the items of the bottom bar: from 3 to 5, each with a visible label. No daily action (AUD-3) lives only in "More".

**Bad → Good.** "Orders" only in "More", although orders are created every day → "Orders" in the bar, or "New order" reachable from "Today" in one tap.

Sources: NNG-HIDDEN-NAV, NNG-MOBILE-NAV, NNG-ICON, AND-NAV, HIG-TABBAR, LUKEW-OBVIOUS.

## NAV-2. The bar is the same on all screens

**Rule.** The set, order and look of navigation items do not change from screen to screen. An item cannot be removed "because this page does not need it".

**Why.** A person remembers the place, not the label: a button that disappeared reads as a breakage (NNG-10, consistency heuristic; WCAG-3.2.3; HIG-TABBAR).

**How to measure.** Open all screens of the scenario in a row and compare the bottom bar (at 1440: the side menu and the header). The list of items matches word for word and in order on each.

**Bad → Good.** On "Today" the bar has four items, on "Customers" five, with a "Payment" button in the center → the "Payment" button in the center of the bar on every screen.

Sources: NNG-10, WCAG-3.2.3, HIG-TABBAR.

## NAV-3. It is visible where I am

**Rule.** The current section is highlighted in the navigation. The screen title repeats word for word the menu item or the button that brought the person here.

**Why.** Matching words confirm the person got where they wanted; a mismatch makes them stop and reread (NNG-10, user's language and consistency).

**How to measure.** The active item has `aria-current` and a visible difference. Compare the menu item label, the H1 title and the first breadcrumb: one and the same word.

**Bad → Good.** Menu item "Money", breadcrumb "Finance", title "Payment journal" → "Money" everywhere, tab "Payments".

Sources: NNG-10, SHOP-CONTENT.

## NAV-4. There is always a way back

**Rule.** On any screen deeper than the first level there is a back link visible without scrolling (arrow or breadcrumb), and it goes to where the person came from. The system "Back" button does the same. A multi-step scenario has an explicit exit.

**Why.** The ability to leave freely is the condition for a person daring to press an unfamiliar button at all (NNG-CONTROL).

**How to measure.** On a screen of level 2+ find the back link on the first screen (390 × 844). Press it and the system "Back": both return to the previous screen, filters and list scroll position are kept.

**Bad → Good.** From the Customer card "Back" goes to the top of the list, the search is reset → return to the same row with the same search.

Sources: NNG-CONTROL, GOV-QUESTION.

## NAV-5. A daily action starts nearby

**Rule.** Every daily action (AUD-3) starts no further than two taps from any screen. This is a norm of this skill, not the "three clicks" rule (NNG-3CLICK): we count not the taps to the result but the path to the start of the action.

**Why.** The farther and smaller the target, the longer it takes to reach (LAW-FITTS); what is hidden behind two levels of disclosure stops being found (NNG-DISCLOSE).

**How to measure.** From the overview screen ("Today") and from the main object card ("Customer") count the taps until each daily action starts. For Acme Orders: the payment form, the customer search, the new order form, the overdue list. Each number ≤ 2.

**Bad → Good.** Record a payment: "Customers" → customer → "Invoices" tab → invoice → "Pay" (4 taps before the form) → on "Today" the "Record payment" button on an overdue invoice row opens the form with the customer and the invoice filled in (1 tap).

Sources: LAW-FITTS, NNG-DISCLOSE, NNG-3CLICK.

## NAV-6. One thing, one place

**Rule.** Every object and setting has one "home" place. Links to it from other screens are allowed; copies with their own logic are not.

**Why.** Two places for one job force a choice and a doubt about which one is "the real one" (LAW-HICK). If the product owner has already recorded this as a decision, it is in the profile section `Decisions`.

**How to measure.** For the main object of the screen, search the menu and the settings for other places where it can be changed. There is one place of change; the rest are links to it.

**Bad → Good.** The email channel is switched on in "Notification channels", the reminder module in "Modules", and the customer portal link and QR code sit in "Company" → one screen "Payment reminders" with the link, the QR code and the number of connected customers; the other places point to it.

Sources: LAW-HICK, NNG-10.

## NAV-7. No more than two levels of disclosure

**Rule.** Rare things go under "More" or "Advanced", but there is one disclosure. No disclosure inside a disclosure.

**Why.** With more than two levels of disclosure people get lost (NNG-DISCLOSE).

**How to measure.** From the screen to any field or action count the disclosures ("More", accordion, "Advanced"). Maximum 1.

**Bad → Good.** "More" → "Other actions" → "Message log" → one "More" menu with a flat list.

Sources: NNG-DISCLOSE.
