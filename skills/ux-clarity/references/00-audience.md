# Audience and its habits

The rules of this skill are written for specific people. When a screen is checked "for an abstract user", two auditors give different scores. Define the audience once, in the project profile (`design-profile.md`, section `Product`), and read it before every audit.

**Default when there is no profile:** a non-technical first-time user on a phone, used to mainstream messenger and banking apps.

The worked example below is the fictional product **Acme Orders**: an order-management admin panel for a small wholesale business.

## AUD-1. Who works in the product

Write down, per role, five facts. Each one changes a threshold somewhere in the rules.

| Fact | Question to answer | Acme Orders |
| --- | --- | --- |
| Role and place | Who is it, where do they sit, what interrupts them | **Sales manager**: on the phone with customers all day, takes orders and payments, interrupted every few minutes. **Warehouse clerk**: on the warehouse floor, picks and ships orders. **Owner**: checks in from a phone: money received today, who owes, orders to ship; sets the product up once and rarely returns to settings |
| Device | Phone, shared desktop, both; how old | Sales manager: an old shared office computer, half of the work from a phone. Warehouse clerk and owner: phone only |
| Experience | What did they use before | Most have no experience with accounting software: a notebook, a spreadsheet, or a program they learned with difficulty |
| Languages | Which languages, which one is read slower | From profile `languages`. Many users read their second language slower. The interface is checked in every language in the profile; default: the UI's primary language plus its longest one |
| Main question | What do they come to each screen to find out | Table of main screens in `checklist.md` |

**How to measure.** Before the audit write one line: who is on this screen (for Acme Orders: sales manager, warehouse clerk, owner), on which device, what main question they brought here. The questions for the main screens are in the table in `checklist.md`. No line, no audit.

## AUD-2. What these people already know

List the apps your users already use every day (profile → Product → familiar apps); by default a mainstream messenger, a banking app, a marketplace app. Their habits are training that is already paid for (LAW-JAKOB).

| Habit of the audience | What it means for the product (Acme Orders) |
| --- | --- |
| Bottom bar of 4–5 sections with labels, always in place | The bottom bar is the same on every screen (NAV-1, NAV-2) |
| One prominent main-action button in the center of the bar or at the bottom right | "Record payment" is one button, in one place (ACT-1, NAV-2) |
| Money transfer: to whom → how much → confirm → receipt | "Record payment": customer → amount → button with the amount → result (FORM-6, FB-4) |
| List of recent recipients above the search | Customers with overdue invoices and recent customers above the search (LIST-4) |
| Large amount field, numeric keyboard open at once | Amount is large, `inputmode="numeric"` (FORM-4) |
| Deleted a chat: "Undo" at the bottom for 5 seconds | Undo instead of the question "Are you sure?" (FB-2) |
| Pulled down: refreshed; tapped a row: it opened | The whole list row opens the object card (LIST-2) |
| Icon with a label, not a bare icon | Labels on all navigation icons (NAV-1) |

These habits are observed; there is no official description of those screens (see `sources.md`, mass-market apps). So every rule stands on research, and the habit only tells which of the allowed options to choose.

## AUD-3. Daily actions

Name the few actions (3–5, four by default) that the main user does dozens of times a day. The whole interface is measured against them. For Acme Orders:

1. Record a payment.
2. Find a customer.
3. Create an order.
4. See what is overdue.

Rare actions (setting up a price list, a payroll, a report) may be longer. Daily ones may not.

**How to measure.** The profile (section `Product`) lists the daily actions by name. If the list is missing, or has more than 5 items, fix the list before auditing: NAV-1, NAV-5 and FORM-6 count against it.

## AUD-4. Working conditions

State the conditions; without a profile assume these:

- Phone 360–390 px wide, often used with one hand (HOOBER-HOLD).
- Mobile internet can be slow: a wait of 2–5 seconds is normal (STATE-2).
- Work gets interrupted: the screen must be clear to a person who comes back to it a minute later (NNG-MOBILE).
- Name the costliest mistake. In most business tools it is a money error: the person who entered it answers for the shortfall (FB-4).

Sources: LAW-JAKOB, NNG-MOBILE, HOOBER-HOLD, NNG-LITERACY.
