# Key: h4 lessons (phone, light, Russian) — held out

Screen: `../h4-lessons.html`. Boxes: `h4-lessons.key.jpg`.

## Context (fictional profile)

- **Who:** a new shop owner taking short lessons on how to sell.
- **Device:** phone, 390 × 844, Russian.
- **Frequency:** a few minutes a day.
- **The person's goal:** learn to price and sell. It is not to collect coins.

## Walk-through

No real people were tested. Every predicted outcome is **assumed**.

1. The owner opens "Учёба" ("Learning"). A banner says that skipping today burns all progress. *Assumed:* the owner feels guilt, opens a lesson out of fear, or gives up after a missed day.
2. The progress bar is at 90% with "Ещё немного!" ("Almost there!"), but the owner cannot tell how many lessons are left.
3. The first card title is "KPI-2 module: LTV funnel and CAC payback", and its grey justified text is hard to read. *Assumed:* a beginner does not understand what the lesson teaches.
4. Lesson 4 is locked for 15 hours for no stated reason. A surprise chest offers 0–500 coins, and sharing earns 50 coins. *Assumed:* the owner learns to come back for coins, not for skills.

## Defects

| # | Where | What is visible | Measured | Rule | Severity | Smallest fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `.chest` | A random reward of 0 to 500 coins. | — | HONEST-2 | 3 | Remove it, or tie rewards to skill shown. |
| 2 | `.streak` | Guilt and a threat: "skip today and all progress burns". | — | HONEST-2 | 3 | Keep the progress the owner earned. Use a neutral reminder the owner sets up. |
| 3 | The locked card (`.card` with "Заблокировано", "Locked") | The next lesson is locked for 15 hours with no reason. | — | HONEST-2 | 3 | Open the next lesson when the owner wants it. |
| 4 | `.share` | "+50 coins for a repost". | — | HONEST-2 | 2 | Use a plain share with no reward. |
| 5 | `.progt` and the bar | A bar at 90% with "Almost there!" and no count. | — | ACT-5 | 2 | Show "3 of 8 lessons" with the next lesson named. |
| 6 | The first card's text | Grey, justified 13 px text. | 3.26:1 | COLOR-1 (WCAG 1.4.3), TEXT-2 | 3: AA failure on lesson content | Use the text colour, at least 16 px, start-aligned. |
| 7 | The first card's title (and "Урок 4", "Lesson 4") | Jargon for beginners: "KPI-2", "LTV-воронка", "CAC". A title that says nothing ("Lesson 4"). | — | TEXT-4 (also EXP-2) | 2 | Use plain titles: "How much a regular customer brings you", "Lesson 4: setting prices". |

## Taste, not defects

- **Purple accent.** A brand choice.
- **Diamond icon for the chest.** A style choice. The chest itself is defect 1.
- **Rounded cards.** A style choice.

## Traps

- **The progress bar:** the bar itself is fine. Only the missing count is a defect (5).
- **A streak counter:** a counter alone, with no penalty and no guilt wording, would be fine.
- **The disabled "Заблокировано" button at 2.92:1:** disabled controls are exempt from contrast. The defect is the reason for the lock (3), not its colour.

## Not checked

- What happens after the 15-hour lock ends.
- Large text.
- The screen reader.
