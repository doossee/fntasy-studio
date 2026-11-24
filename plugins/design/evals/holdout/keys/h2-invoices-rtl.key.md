# Key: h2 invoices (desktop, light, Arabic, right to left) — held out

Screen: `../h2-invoices-rtl.html`. Boxes: `h2-invoices-rtl.key.jpg`.

The Arabic strings were written by a model and not checked by a native speaker.

## Context (fictional profile)

- **Who:** a bookkeeper of a small shop.
- **Device:** desktop, 1280 × 800, Arabic interface.
- **Task:** review overdue invoices and delete a duplicate.
- **Frequency:** daily.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The bookkeeper looks for the section list. It sits on the left, where a right-to-left reader ends rather than starts.
2. The bookkeeper looks for overdue invoices. They are only tinted pink.
3. The bookkeeper compares amounts written in four formats. "2.450 د.إ" could be read as 2.45. *Assumed:* an amount is misread.
4. The bookkeeper clicks an unlabelled icon to duplicate an invoice and hits delete. A dialog asks "هل أنت متأكد؟" ("Are you sure?") with "نعم / لا" ("Yes / No"), and "Yes" is focused. *Assumed:* the bookkeeper presses Enter and deletes the invoice.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `.dlg` | "Are you sure?" with Yes/No. It does not name the invoice or the consequence. "Yes" is the filled primary button and has focus by default. | — | STATE-4 (also TEXT-4) | 4: an invoice deleted by habit with Yes as the default; data lost without noticing (raised from 3 after the evaluation of 24.11.2026, see below) | Name the invoice: "Delete invoice INV-3300? This cannot be undone." Use buttons "Delete invoice" and "Keep". Make Keep the default and give delete the destructive style. Prefer undo. |
| 2 | `tr.late` | Overdue invoices are marked only by a pink row tint. | — | COLOR-2 (WCAG 1.4.1) | 4: a Level A failure that hides what the bookkeeper came to check (raised from 3 after the evaluation) | Add an "متأخرة" ("overdue") status with an icon. |
| 3 | `td.ic` | Four icon-only buttons (✎ ⧉ ⇪ 🗑) without labels or accessible names. ⧉ and ⇪ are not universal, and delete sits next to duplicate. | — | EXP-7 (WCAG 4.1.2) | 3: A failure for screen reader users; guesswork for everyone | Add accessible names and visible labels or tooltips that also open on focus. Move delete into a menu. |
| 4 | `tbody td:nth-child(4)` | Amounts appear in four formats: "AED 1,200", "٣٥٠ درهم" (Eastern Arabic digits), "AED 89.5", "2.450 د.إ" (a dot as the thousands separator). | — | DATA-2 | 3: money can be misread | Use one currency format, one digit system and two decimals, aligned for comparison. |
| 5 | `aside` | Navigation sits on the left in a right-to-left layout. | — | TEXT-5 | 2 | Remove `row-reverse` and let `dir="rtl"` place the sidebar at the start (right). |

## Found in evaluation (not planted)

| # | Where | What is visible | Rule | Severity |
| --- | --- | --- | --- | --- |
| E1 | `.dlg` | With the dialog open, Tab moves to the sidebar and the row buttons behind the veil. | STATE-1 (WCAG 2.4.3, 2.4.11) | 3 |
| E2 | `.dlg` | The dialog is placed at fixed pixel coordinates; at 200% zoom its question and buttons leave the screen. | TEXT-3 (WCAG 1.4.4, 1.4.10) | 3 |

Severity of #1 and #2 was raised from 3 to 4 after both reviewers scored them 4 and `severity.md` supported them: the key had been inconsistent with the scale.

## Taste, not defects

- **Blue accent.** A brand choice.
- **Light grey page background.** A style choice.
- **Pale header row.** A style choice.

## Traps

- **TEXT-2 (body text size):** the table text is 12 px. Tables may be smaller than body text if they stay readable, so this is a weak finding at most. Do not score it above 1 without a reading problem shown.
- **Western digits in the dates:** they are acceptable. The defect is mixing digit systems within one column (4).
- **Seven columns:** this is not an ACT-3 problem.

## Not checked

- Whether deletion can be undone.
- Keyboard order in RTL.
- Zoom.
