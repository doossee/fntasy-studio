# Expectations and consistency

What people bring with them before they open the screen: habits from the products they use every day, their own words for things, what they learned in this product last month, and how little they read before they start. These rules cover conventions, naming, consistency, change, teaching and navigation.

## Review questions

- Does every common pattern (navigation, search, back, close, cart, icons) work the way it works in the products these users already know?
- Are sections and labels named in the users' words, with no internal team, system or code names?
- Does the same kind of element look and behave the same on every screen?
- Did this change move or rename something that existing users already know, and is there a reason and a way to find it?
- Can a new user finish the main task without a tour, a manual or a tooltip?
- Are the main sections visible, and can people always tell where they are and how to go back?

## EXP-1. Work the way familiar products work; check the convention before calling something unusual

**Rule.** Common tasks use the patterns users know from the products they use every day: where navigation sits, how search, back, close, cart, sign-in and standard icons work. Use the platform's native controls where they exist. Depart from a convention only for a clear gain, and then make the new way obvious. Before a review calls a pattern "unusual", check how products in the same category actually do it.

**Why.** People spend most of their time in other products and bring those habits along; a familiar pattern costs nothing to learn, an unfamiliar one costs every user time and errors. Platform guidelines ask for native components and platform behaviour for the same reason.

**How to check.** List the patterns on the screen (navigation, search, forms, list actions, icons). For each, compare with how 5-10 products in the same category do it (ours), using a pattern library such as Mobbin or Component Gallery when one is available; without one, write the comparison as "assumed". Pass: each pattern behaves like the common version, or the difference is deliberate, written down in the project profile and explained on screen. Standard icons (search, home, share, delete) are used only for their usual meaning.

**Bad → Good.** In Acme Shop the cart icon opens the wish list → the cart icon opens the cart; the wish list gets a heart icon.

**Limits.** Copy behaviour that users know, not the look or brand of another product. A convention that harms users (a pre-ticked consent box) is not a reason to follow it (see HONEST-1).

**Conflicts.** With EXP-3 when the platform's native pattern differs from the product's own pattern on other platforms (see conflicts.md).

**Evidence.** Heuristic: Jakob Nielsen's observation from usability practice, backed by platform guidelines; not an experiment.

**Sources.** Apple HIG (native controls, standard icons); Material 3; NN/g (Consistency and standards, 2021); Laws of UX (Jakob's Law); Mobbin, Component Gallery (as evidence of what is common); secondary: Microsoft Fluent ("natural on every platform"), Apple iOS UX guidelines (standard icons for their documented meaning). (former LAW-JAKOB)

## EXP-2. Name and structure things in the user's words, not the company's

**Rule.** Section names, labels and the order of the menu follow how users think about their task, not the database, the code or the company's departments. An action does what its label leads people to expect.

**Why.** People carry a small model of how a system works and use it to predict results; when the product matches it, they predict right. Products tend to copy the structure of the organisation that builds them (Conway's law), which gives menus split by team rather than by task, and users cannot find things.

**How to check.** Cover everything below a main button and write a prediction of what it does (from a user, or your own marked "assumed"); pass if it matches the result. Ask where a user would look for three common things; pass if they are there. Scan all labels for internal terms (table names, team names, codes, product code names): none allowed. Check that the menu is not one item per department.

**Bad → Good.** Acme's menu "Entities, Transactions, Config, Fulfilment team" → "Customers, Payments, Deliveries, Settings".

**Limits.** When the user's model is wrong in a way that leads to loss (they think deleting can be undone when it cannot), do not follow it silently: change the design or say it at the point of action. Expert products may use the domain's own terms when every user shares them.

**Evidence.** Research: mental models are a long-standing concept in psychology and HCI (Craik 1943); Conway's law is an observation from software engineering (Analogy for menus).

**Sources.** NN/g (Ten usability heuristics: match between system and the real world); Laws of UX (Mental Model); Craik 1943; Conway 1967; secondary: uxhints (Conway's law), IBM design principles (domain concepts central), Apple iOS UX guidelines (user-centric terminology). (former LAW-MENTAL-MODEL)

## EXP-3. Same job, same look and behaviour — consistent, not uniform

**Rule.** Elements that do the same job look and behave the same on every screen: one style per kind of button, link, status and field, the same button order in every dialog, the same word for the same thing. Elements that do different jobs do not share a look; plain text never looks like a link. Consistency serves the user; it is not a reason to force one pattern onto tasks that need a different one.

**Why.** People treat things that look alike as one group and expect them to work alike; a shared look between different things is a false promise. Design systems and tokens named by role (text-secondary, action-primary) keep the look consistent across screens and themes.

**How to check.** Pick three screens. For each kind of element (primary button, secondary button, link, status badge, text field, dialog), compare colour, size, radius, weight and behaviour: pass if identical. Check button order in all dialogs: the same everywhere. List the clickable elements and the plain ones on one screen: every clickable one has a sign no plain one has (colour plus underline, a button shape). Check the same term is used for the same object on all screens.

**Bad → Good.** In Acme the "Save" button is filled blue on the order screen and outlined grey on the customer screen, and "Cancel" is left in one dialog and right in another → one primary style, one secondary style, the same order in every dialog.

**Limits.** Consistent is not uniform: a task with a different job may need a different pattern (a data table on desktop and cards on a phone). Colour alone does not separate groups (see COLOR-2).

**Conflicts.** With EXP-1 (platform-native controls vs one look across platforms) and with EXP-4 (fixing an inconsistency changes what users know); see conflicts.md.

**Evidence.** Research, extended: Gestalt similarity is measured perception; that look predicts behaviour is an inference for interfaces, backed by guidance from NN/g and design systems.

**Sources.** NN/g (Consistency and standards, 2021); Apple HIG (Buttons: same size for a set of options); Laws of UX (Law of Similarity); Figma Resource Library (Consistency in design, Design tokens); secondary: GOV.UK ("be consistent, not uniform"), Atlassian ("not consistency for its own sake"), Salesforce Lightning, SAP Fiori, IBM, "58 rules" (Bakusevych). (former LAW-SIMILARITY)

## EXP-4. Don't change what people already know without a reason

**Rule.** Do not move, rename or restyle something that existing users already know unless the change fixes a real problem for them. When a change is needed, make it in steps, keep the old way findable for a while, and tell people in place what moved and where.

**Why.** People judge a familiar interface more kindly than a new one and resist changes to what they learned ("baby duck syndrome"); a moved button costs every existing user a search, even when the new place is better for new users.

**How to check.** In the diff, list every element whose place, name, icon or behaviour changed on a screen that live users use. For each, write the problem the change fixes. Pass: every change has a stated reason; frequent actions that moved have a pointer from the old place, a short in-place note, or a transition period (ours); reorderings of menus and removing sections are listed for the owner's decision.

**Bad → Good.** A redesign moves Acme's "New order" from the bottom bar into a menu "because it looks cleaner" → it stays in the bottom bar; the clean-up is done elsewhere.

**Limits.** A change that removes a real harm (an unsafe default, an inaccessible control) does not wait for habit. New products with few users have little habit to protect.

**Conflicts.** With EXP-3 and EXP-1 when the old pattern is inconsistent or unconventional (see conflicts.md).

**Evidence.** Heuristic: imprinting is an observation from ethology (Lorenz) applied to software by analogy; practitioner guidance from design systems supports careful change.

**Sources.** NN/g (Ten usability heuristics); secondary: uxhints (Baby duck syndrome), Atlassian design principles ("follow convention and change carefully"), GOV.UK ("iterate"), "58 rules" (Bakusevych, novelty vs familiarity).

## EXP-5. Teach in place, never in a tour

**Rule.** The product works without reading anything first. No forced tour or swipe-through carousel before the first task. Help appears inside the task when it is needed: a visible hint at the field, an example value, an empty state that shows the first step, a short tip near the control. Icons that are not universal have a visible text label. Task-critical information (password rules, fees) is never only in a tooltip.

**Why.** People start using a product right away to get their task done and skip manuals and tours (the paradox of the active user). NN/g found that deck-of-cards tutorials did not improve task performance; Apple recommends learning by doing, optional onboarding and context-specific tips. Icons without labels are often not understood; only a few (home, print, search) are near-universal.

**How to check.** Open the product as a new user and start the main task. Pass: the first task can be finished without opening help or a tour; any tour can be skipped in one tap and, once skipped, is not shown again but stays findable in help. Every empty screen says what will appear and gives the first action. Every non-universal icon has a visible label (not only on hover). No task-critical rule lives only in a tooltip; tooltips also open on keyboard focus and have a touch alternative.

**Bad → Good.** Acme opens with five swipe screens about features → it opens on the orders list with an empty state "No orders yet — Create your first order"; the password rules sit under the password field, not in a tooltip.

**Limits.** Novel or complex workflows may need an interactive walkthrough; keep it optional, short and in the real interface. Permissions and setup are covered by HONEST-3 and ACT-6.

**Evidence.** Research: Carroll and Rosson 1987 (new users skip manuals); NN/g's tutorial findings; platform guidelines agree.

**Sources.** Apple HIG (Onboarding); NN/g (Mobile-app onboarding, 2020; Tooltip guidelines, 2019; Icon usability, 2014; Recognition and recall, 2024); Laws of UX (Paradox of the Active User); Carroll & Rosson 1987; secondary: IBM (contextual help), "58 rules" (Bakusevych) — its advice for engaging onboarding tours is not followed (see disputed.md). (former LAW-ACTIVE-USER)

## EXP-6. Keep navigation visible and show where people are

**Rule.** On desktop the top-level sections are visible, not hidden behind a menu icon. On phones, a small set of top-level sections (about four or five) sits in a visible bar; a menu icon holds the rest. The current section is highlighted. Tab bars are for moving between sections, not for actions. Deep content shows its path (breadcrumbs) and there is always a one-step way back.

**Why.** In NN/g's study with 179 people on six sites, hidden navigation on desktop was used in 27% of cases against 48% for visible navigation; on phones, 57% against 86% for a combined visible-and-menu design; discoverability fell by more than 20% and tasks took longer. Showing the current section and a way back answers "where am I" and "how do I get out".

**How to check.** Desktop (1280 px and wider): top-level sections visible without opening a menu. Phone (390 px): count top-level destinations in the bar; more than five (heuristic: NN/g, Apple HIG) go into a menu with in-page links to key content. On every screen, the current section is marked in the navigation. Tab bar items only switch sections; none starts an action. Pages three or more levels deep show a breadcrumb starting at the home level, with the current page last and not a link. Every screen has back or close; the browser Back button works.

**Bad → Good.** Acme's desktop dashboard hides Orders, Customers and Payments behind a menu icon → they sit in a left sidebar, the current one highlighted; on the phone they are four tabs, with Settings in "More".

**Limits.** Content sites with many sections may rely on a menu plus a strong homepage hub. Visible-only navigation on phones was not tested in that study; the "four or five" limit is a recommendation, not a measured cut-off. Flat sites (one or two levels) do not need breadcrumbs.

**Conflicts.** With MEM-1 (progressive disclosure hides things too): navigation to top-level sections is not something to hide (see conflicts.md).

**Evidence.** Research: NN/g hamburger study (179 participants, 6 sites, 2016); the tab count is a platform guideline and heuristic.

**Sources.** Apple HIG (Tab bars); Material 3 (Navigation bar); NN/g (Hamburger menus, 2016; Mobile navigation patterns, 2015; Breadcrumbs, 2018; User control and freedom, 2020); Baymard (highlight the current navigation scope); secondary: U.S. Web Design System (continuity), IxDF (pointer: Kalbach & Bosenick 2003), Figma Resource Library (Hamburger menus, Website structure).
