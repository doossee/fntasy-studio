# End-to-end check, 25.11.2026

Second end-to-end check, after the designer gained "press every control", the default taste and EXP-8. Same model; everything ran through the plugin (`claude -p --plugin-dir plugins/design`).

**Brief.** "My card" in the mobile web app of the fictional Acme Bank: account holders 25–70, a third over 55 who use only a messenger and their bank's app, often opening the screen when something worries them. Tasks: balance and recent payments, freeze the card at once, report an unrecognised payment, change the daily online limit, show card details. Taste from the profile: calm 2 · dense 3 · strict 2 · brand-led 2 · conventional 1.

**Makers.** `designer` (three variants: quiet; safety first — recommended; card in hand), about $3.80. The same model without the plugin, about $0.70. The first designer run was stopped by `claude -p` before its hand-over because it ran in the background; the rerun in the foreground finished (see the README note).

**Blind judgement** (two `design-judge` runs, shuffled letters, the taste in the brief; out of 24):

| Screen | Judge 1 | Judge 2 |
| --- | --- | --- |
| designer, safety first (recommended) | 20.5 | 20 |
| designer, card in hand | 17.5 | 18 |
| designer, quiet | 16 | 16 |
| without the plugin | 14 | 12 |

Both judges ranked the four in the same order.

**Review** (`design-reviewer`):

| | Verdict | Severity 4 | 3 | 2 | 1 |
| --- | --- | --- | --- | --- | --- |
| designer, recommended | accept | 0 | 0 | 3 | 2 |
| without the plugin | return | 2 | 8 | 8 | 3 |

The page made without the plugin hid the balance under a pale overlay once the card was frozen — the state worried people stay in for days. The designer's highest finding was that on the phone the balance and payments fall below the first screen because the safety block comes first (severity 2).

**Compared with the first check (24.11).** Then both pages got "revise" with two severity-3 findings each; the designer's were about page logic after actions. This time the designer's recommended page had no finding above 2.

**Limits.** One brief, one model, judges using the rubric the designer works towards. Whether people find the safety-first layout easier needs a test with people (`ui-rules/user-test.md`).
