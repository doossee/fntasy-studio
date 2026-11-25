# Expectations and consistency

What people bring with them before they open the screen: habits from the products they use every day, their own words for things, what they learned in this product last month, and how little they read before they start. These rules cover conventions, naming, consistency, change, teaching, navigation, icons and the audience's experience.

## Review questions

- Does every common pattern (navigation, search, back, close, cart, icons) work the way it works in the products these users already know?
- Are sections and labels named in the users' words, with no internal team, system or code names?
- Does the same kind of element look and behave the same on every screen?
- Did this change move or rename something that existing users already know, and is there a reason and a way to find it?
- Can a new user finish the main task without a tour, a manual or a tooltip?
- Are the main sections visible, and can people always tell where they are and how to go back?
- Is every icon from one set, used for one meaning, and labelled unless it is universal?
- Could the least experienced person in the audience name every field, every button and the main action from the screenshot alone?

## EXP-1. Work the way familiar products work; check the convention before calling something unusual

**Lens.** UX.

**Rule.** Common tasks use the patterns users know from the products they use every day: where navigation sits, how search, back, close, cart and sign-in work. Use the platform's native controls where they exist. Depart from a convention only for a clear gain, and then make the new way obvious. Before a review calls a pattern "unusual", check how products in the same category actually do it.

**Why.** People spend most of their time in other products and bring those habits along. A familiar pattern costs nothing to learn; an unfamiliar one costs every user time and errors.

**How to check.**
- List the patterns on the screen (navigation, search, forms, list actions, icons).
- For each, compare with several products in the same category, using a pattern library when one is available; without one, write the comparison as **assumed**.
- Pass: each pattern behaves like the common version, or the difference is deliberate, recorded in the project profile and explained on screen.

**Thresholds.** Products to compare before calling a pattern unusual [profile: exp.compare-products = 5].

**Bad → Good.** In Acme Shop the cart icon opens the wish list → the cart icon opens the cart; the wish list gets a heart icon.

**Limits.** Copy behaviour that users know, not the look or brand of another product. A common pattern that harms users (a pre-ticked consent box) is not a reason to follow it (HONEST-1). One competitor is not a convention.

**Conflicts.** C-2.

**Evidence.** Practice: an observation from usability work, backed by platform guidelines; not an experiment.

## EXP-2. Name and structure things in the user's words, not the company's

**Lens.** UX.

**Rule.** Section names, labels and the order of the menu follow how users think about their task, not the database, the code or the company's departments. An action does what its label leads people to expect.

**Why.** People carry a small picture of how a system works and use it to predict results; when the product matches it, they predict right. Products tend to copy the structure of the organisation that builds them, which gives menus split by team rather than by task, and users cannot find things.

**How to check.**
- Cover everything below a main button and write a prediction of what it does (from a user, or your own marked **assumed**); pass if it matches the result.
- Ask where a user would look for three common things; pass if they are there.
- Scan all labels for internal terms (table names, team names, codes, project code names): none.
- Check that the menu is not one item per department.

**Bad → Good.** Acme's menu "Entities, Transactions, Config, Fulfilment team" → "Customers, Payments, Deliveries, Settings".

**Limits.** When the user's picture is wrong in a way that leads to loss (they think deleting can be undone when it cannot), do not follow it silently: change the design or say it at the point of action. Expert products may use the domain's own terms when every user shares them.

**Evidence.** Research (mental models in psychology and HCI) and Practice.

## EXP-3. Same job, same look and behaviour — consistent, not uniform

**Lens.** UI and UX.

**Rule.** Elements that do the same job look and behave the same on every screen: one style per kind of button, link, status and field, the same button order in every dialog, the same word for the same thing. Elements that do different jobs do not share a look; plain text never looks like a link. Consistency serves the user; it is not a reason to force one pattern onto tasks that need a different one.

**Why.** People treat things that look alike as one group and expect them to work alike. A shared look between different things is a false promise; a different look for the same thing makes people wonder whether it is the same.

**How to check.**
- Pick three screens. For each kind of element (primary button, secondary button, link, status badge, text field, dialog), compare colour, size, radius, weight and behaviour: identical.
- Check button order in all dialogs: the same everywhere.
- List the clickable and the plain elements on one screen: every clickable one has a sign no plain one has (colour plus underline, a button shape).
- Check that the same term is used for the same object on all screens.

**Bad → Good.** In Acme the "Save" button is filled blue on the order screen and outlined grey on the customer screen, and "Cancel" is on the left in one dialog and on the right in another → one primary style, one secondary style, the same order in every dialog.

**Limits.** A task with a different job may need a different pattern (a data table on desktop and cards on a phone). Colour alone does not separate groups (COLOR-2).

**Conflicts.** C-2, C-3, C-10.

**Evidence.** Research, applied (grouping by similarity is measured perception) and Practice (design systems).

## EXP-4. Don't change what people already know without a reason

**Lens.** UX.

**Rule.** Do not move, rename or restyle something existing users already know unless the change fixes a real problem for them. When a change is needed, make it in steps, keep the old way findable for a while, and tell people in place what moved and where.

**Why.** People judge a familiar interface more kindly than a new one and resist changes to what they learned. A moved button costs every existing user a search, even when the new place is better for new users.

**How to check.**
- In the diff, list every element whose place, name, icon or behaviour changed on a screen that live users use.
- For each, write the problem the change fixes.
- Pass: every change has a stated reason; frequent actions that moved have a pointer from the old place, a short note in place, or a transition period; reordered menus and removed sections are listed for the owner's decision.

**Bad → Good.** A redesign moves Acme's "New order" from the bottom bar into a menu "because it looks cleaner" → it stays in the bottom bar; the clean-up is done elsewhere.

**Limits.** A change that removes a real harm (an unsafe default, an inaccessible control) does not wait for habit. New products with few users have little habit to protect.

**Conflicts.** C-10.

**Evidence.** Practice.

## EXP-5. Teach in place, never in a tour

**Lens.** UX.

**Rule.** The product works without reading anything first. No forced tour or swipe-through carousel before the first task. Help appears inside the task when it is needed: a visible hint at the field, an example value, an empty state that shows the first step, a short tip near the control. Task-critical information (password rules, fees) is never only in a tooltip.

**Why.** People start using a product right away to get their task done and skip manuals and tours. What they read before the task is forgotten by the time they need it; help at the point of need is used.

**How to check.**
- Open the product as a new user and start the main task: it can be finished without opening help or a tour.
- Any tour can be skipped in one tap, is not shown again once skipped, and stays findable in help.
- Every empty screen says what will appear and gives the first action.
- No task-critical rule lives only in a tooltip; tooltips also open on keyboard focus and have a touch alternative (PLAT-2).

**Bad → Good.** Acme opens with five swipe screens about features → it opens on the orders list with an empty state "No orders yet — Create your first order"; the password rules sit under the password field, not in a tooltip.

**Limits.** Novel or complex workflows may need an interactive walkthrough; keep it optional, short and in the real interface. Permissions are HONEST-3; icon labels are EXP-7.

**Conflicts.** S-5.

**Evidence.** Research (new users skip manuals; tutorials did not improve task performance in usability testing) and Platform guideline (optional onboarding, learning by doing).

## EXP-6. Keep navigation visible and show where people are

**Lens.** UX.

**Rule.** On desktop the top-level sections are visible, not hidden behind a menu icon. On phones, a small set of top-level sections sits in a visible bar; a menu holds the rest. The current section is highlighted. Tab bars move between sections; they do not start actions. Deep content shows its path (breadcrumbs), and there is always a one-step way back.

**Why.** Navigation people cannot see is used less, so content behind it is found less often and tasks take longer. Showing the current section and a way back answers "where am I" and "how do I get out".

**How to check.**
- Desktop (1280 px and wider): top-level sections visible without opening a menu.
- Phone (390 px): count destinations in the bar; the rest go into a menu, with in-page links to key content.
- On every screen, the current section is marked in the navigation.
- Tab bar items only switch sections; none starts an action.
- Deep pages show a breadcrumb starting at the home level, with the current page last and not a link.
- Every screen has back or close; the browser Back button works.

**Thresholds.** Destinations in a phone bar: few (about four or five) [platform: Apple HIG, Material 3; practice]; breadcrumbs from [profile: exp.breadcrumb-depth = 3 levels].

**Bad → Good.** Acme's desktop dashboard hides Orders, Customers and Payments behind a menu icon → they sit in a left sidebar, the current one highlighted; on the phone they are four tabs, with Settings in "More".

**Limits.** Content sites with many sections may rely on a menu plus a strong home page. The "four or five" limit is a recommendation, not a measured cut-off. Flat sites need no breadcrumbs.

**Conflicts.** C-4, S-2, S-3.

**Evidence.** Research (hidden navigation measured as used less, desktop and phone) and Platform guideline.

## EXP-7. Icons: one set, one meaning, a label unless universal

**Lens.** UI and UX.

**Rule.** Icons come from one set with one style (stroke weight, corner shape, fill, optical size) and sit on the same grid. Each icon means one thing across the product, and a standard icon (search, home, share, delete, settings) is used only for its usual meaning. Icons that are not universally understood have a visible text label; icon-only buttons have an accessible name. An icon that carries meaning meets non-text contrast.

**Why.** Only a handful of icons are understood without words; the rest are guessed, and a wrong guess costs a tap and a return. Mixed styles read as different kinds of things, and one icon with two meanings teaches people not to trust either.

**How to check.**
- List the icons on three screens: same stroke weight, fill style and size per role.
- For each icon, write its meaning; any icon used for two meanings, or a standard icon used for something else, fails.
- Cover the labels: every icon left without a visible label is a universal one, or the button is not on a main path; every icon-only button has an accessible name (check with a screen reader or the accessibility tree).
- Measure contrast of meaningful icons against their background.
- In right-to-left languages, icons that show direction (back, forward, send) are mirrored; others (a clock, a checkmark, media play) are not.

**Thresholds.** Meaningful icons ≥ 3:1 against adjacent colours [WCAG 1.4.11 AA]; icon-only controls have a name [WCAG 4.1.2 A].

**Bad → Good.** Acme's order screen mixes outlined and filled icons, uses a bell both for "notifications" and for "remind customer", and the bottom bar shows four unlabelled icons → one outlined set; the reminder gets its own icon and the word "Remind"; the bar has labels under every icon.

**Limits.** A dense toolbar for experts may use unlabelled icons with tooltips and shortcuts if the same actions are reachable with labels elsewhere. Decorative icons next to a text label need no name of their own.

**Conflicts.** C-15.

**Evidence.** Research (icon recognition without labels is poor for most icons) and Standard (contrast and names).

## EXP-8. Design for the least experienced person in the audience

**Lens.** UX.

**Rule.** Find the least experienced people the product serves (from the profile: age range, how often they use apps, which products they use every day) and make every control work for them without learning: text fields that look like boxes with a label above, the main action as a filled button with a verb, secondary actions visibly weaker but still recognisable as buttons, text that is not clickable never styled like a link or a button, icons with text labels, navigation that is visible and says where the person is, tap and scroll as the only required gestures, a visible way back and an undo for anything that changes data. The more the audience includes people with little digital experience — often, but not only, older people — the closer the design stays to the products they already use.

**Why.** People read a screen through the conventions they have already learned. Someone who has used few apps does not yet know that a thin line is a field to type in, that an outlined box is a weaker button, or that a lone icon hides a menu; every unfamiliar pattern is a guess, and a wrong guess costs a lost task or a call for help. Age adds its own costs — slower pointing, weaker small-text vision, more effort to learn new layouts — that remain even when experience is the same. Younger users know more conventions but read less, click first and give up sooner, so clear labels and strong signals help them too.

**How to check.**
- Read the profile's audience experience. No profile: mark the audience as **assumed** and design for a mixed audience.
- Walk the main task as the least experienced person would: can you name, from the screenshot alone, every place to type, every button, and which button is the main one?
- Every input has a visible boundary (meeting 3:1) and a visible label outside it; no field is just a line or a placeholder.
- The main action is a filled button with a verb; secondary actions are recognisably buttons; no plain text, heading or status badge looks clickable, and nothing clickable looks like plain text.
- Every icon on a main path has a visible text label; the menu icon, if used, says "Menu".
- No task needs swipe, long-press, pinch or drag; each has a visible button (PLAT-2).
- Every action that changes data can be undone or is confirmed (STATE-4).
- Meanings carried by colour (red for error, green for done; red or green for rising prices) also have a word or icon, and follow the local convention in the profile (COLOR-2).
- Compare the main patterns with the products the audience uses every day (EXP-1): differences are deliberate and explained.

**Thresholds.** Labels or instructions for input [WCAG 3.3.2 A]; non-text contrast of field boundaries and controls ≥ 3:1 [WCAG 1.4.11 AA]; no colour-only meaning [WCAG 1.4.1 A]; single-pointer alternatives to gestures [WCAG 2.5.1 A]; target size from the profile, larger for an older audience [profile: act.target-web].

**Bad → Good.** Acme's owner dashboard (owners 30–60, several unsure with new apps) shows the order search as a grey line with "Search…" inside, the main action "New order" as an outlined pill identical to "Export", a hamburger icon for navigation and swipe-to-archive → a boxed search field with the label "Find an order", "New order" as a filled button and "Export" as a plain secondary button, a left sidebar with section names, and "Archive" in each order's menu.

**Limits.** Expert tools for trained staff may use denser and less explicit controls if the profile says the audience is experienced. Age is a proxy: ask about experience and the products people use, and do not assume that a person cannot learn because of age. "Conventional" means the conventions of this audience's products and region, not of the reviewer's favourite apps.

**Conflicts.** C-19.

**Evidence.** Research for icon labels, gestures, weak signifiers and the age effect beyond experience (studies with older and younger adults); Practice for visible field boundaries and filled versus outlined buttons (no study comparing age groups on these was found).
