---
# Project profile of the fictional product used in the examples.
# The front matter is read by scripts/measure.mjs; the text below is read by the agent.
name: Acme Orders
widths: [1440, 1280, 1024, 390]
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
spacing-extra: [1, 2, 6]
fonts: [12, 14, 16, 18, 20, 24, 28, 30]
hero-fonts: [36, 40, 48]
hero-max: 2
line-length: 90
touch-target: 44
min-font: 12
primary: "--primary"
main: "main"
languages: [en, de]
selectors:
  badge: ".badge"
  button: "a.btn"
  card: ".card, .panel"
---

# Acme Orders: design profile

## Product

Order management for a small wholesale business: orders, customers, payments, deals.

- **Who uses it.** A sales manager and a warehouse clerk, all day; the owner, a few minutes in the morning. None of them is technical.
- **Devices.** A laptop at the desk (1280 to 1440 wide) is the main one; a phone in the warehouse.
- **Daily actions.** Record a payment. Find a customer. Create an order. See what is overdue.
- **Familiar apps.** A mainstream messenger, a banking app, a marketplace app.
- **The costliest mistake.** A payment recorded on the wrong customer.

## Brand

- Primary colour `--primary` (#1f5fbf): the filled main button, links, the focus ring, the selected item. Nothing else.
- Ink #1b2430, muted text #5b6675, lines #dfe3e8, page #f7f8fa, panels white.
- State colours: red for overdue and errors, always together with a word.
- One typeface, the system UI font. Weights 400, 500, 600.
- Radii: 8 controls, 12 panels. No shadows on panels; a shadow only on overlays.
- Motion: colour transitions only, 100 to 150 ms.

## Languages

English and German. German is the long one: check buttons, tabs and badges in German at 390 and 1024.

## Components

Plain HTML and one stylesheet. Buttons `.btn`, badges `.badge`, panels `.panel`. A new component needs a line "the closest existing one is X, it does not fit because Y".

## Taste

- Calm and clean wins over expressive. Strength comes from the size of the leading element and from empty space around it.
- The owner dislikes rows of identical metric cards.

## Decisions

- Money is always shown with two decimals in tables and without decimals in the leading number.
- The sidebar stays 248 px wide at every computer width.

## Domain examples

| Screen kind | Screen | Leading element |
| --- | --- | --- |
| Overview | Today | money received today |
| List | Orders, Customers | the table |
| Object card | Order, Customer | header with the state (balance, status) |
| Form | Record payment | the amount field and one button |

Worst-case data to test with: customer "Marlow & Sons Wholesale Provisions Ltd.", order total $1,204,880.00, German button "Zahlungserinnerung senden".
