# school-grades — answer key

**Context.** Parent of a 7th-grader (Acme Maktab school portal), desktop 1280×800 and phone 390 px (most parents open it
on a phone from a teacher's message link), light theme, Uzbek (Latin script). Tasks: check grades and averages, check
attendance, read and answer teachers. Frequency: weekly, more before parent meetings. Uzbek 5-point scale: 5 best,
2 failing. (screen.png = 1280×800; screen-390.png = full-page phone capture.)

## Defects

1. **Grades table clipped on the phone, cannot be scrolled** — `.tablebox` has `overflow:hidden`, table `min-width`
   820 px. At 390 px the box is 358 px wide and `scrollWidth` 820: "Oʻrtacha" (x = 525) and "Oxirgi baho" (x = 725)
   are off-screen with no scroll; grade chips are cut after the second. Harm: phone parents never see averages or the
   latest grade. **Severity 3.**
2. **Reply is thrown away while looking sent** — `#send` (interaction bug). Type "Rahmat, majlisga boraman." and press
   "Yuborish": the textarea clears, no message is added (2 messages before and after), no status, no error. Harm: the
   parent thinks the teacher got the answer (e.g. about tomorrow's meeting); the text is lost. **Severity 4.**
3. **Subject search fails on case and on the apostrophe** — `#q`: case-sensitive `indexOf`. "matematika" → 0 rows,
   "O'zbekiston" typed with the ASCII apostrophe → 0 rows, because data uses "Oʻ" (U+02BB), which most phone keyboards
   do not type; then "Hech narsa topilmadi." Only "Matematika" exactly → 1 row. Harm: parent concludes the subject is
   missing. **Severity 2.**
4. **Grade "3" unreadable** — `.g3`: white 13 px bold on #f5c542 = **1.62:1** (others: 5 = 5.14, 4 = 5.09,
   2 = 5.62). Harm: low-vision parents and anyone in sunlight read the digit by colour guess. **Severity 2.**
5. **Attendance figures contradict each other** — `.stat:nth-child(2)` "96%" vs the list "60 ta darsdan 7 tasida
   qatnashmagan" = 53/60 = **88.3 %**. 96 % only fits if excused absences are silently dropped (58/60 = 96.7 %), which
   is not stated. Harm: parent misjudges a real attendance problem. **Severity 2.**
6. **US date format in an Uzbek UI** — `.att li`, `.m .when`: "11/03", "11/12", "11/24", "11/25" (month/day), while the
   term pill uses "03.11–27.12.2026" (day.month). Uzbek parents read "11/03" as 11 March. Harm: wrong dates for absences
   and messages. **Severity 2.**
7. **Tab labels truncated, worse on the phone** — `.tab` fixed 140 px with ellipsis: "Oʻzlashtirish koʻrsatkichlari"
   needs **210 px**, shows "Oʻzlashtirish k…". At 390 px every tab shrinks to 72 px: "Baho…", "Davo…", "Xaba…" — the
   unread count "(2)" on Xabarlar is hidden. Harm: parents cannot tell sections apart or see new messages.
   **Severity 2.**
8. **Averages not rounded** — `td.avg`: "4,333333333333333", "4,666666666666667", "3,6666666666666665" next to
   "4,5" and "5". Harm: noisy, misaligned column; looks broken. **Severity 1.**

## Style only (harm nobody)
- Avatar circles use arbitrary background colours (purple, orange, teal) unrelated to the brand.
- Tab text is left-aligned in equal 140 px tabs, so short labels leave uneven gaps on the right.

## Trap (looks like a defect, is fine)
- **Grade colours: 5 green, 2 red.** A reviewer used to a 1-is-best scale (Germany) may call it inverted. In the Uzbek
  5-point scale 5 = "aʼlo" (excellent) and 2 = "qoniqarsiz" (failing), so green 5 and red 2 are right. The digit is
  printed in every chip, so meaning does not rely on colour alone (only the yellow "3" has a contrast problem, defect 4).


## Found in evaluation, 25.11.2026 (not planted)

Real defects both or one of two independent reviewer runs found, checked in the page:

- Between about 601 and 1000 px wide (including 1280 px at 200% zoom) the stat cards and term dates run under the side panel. Severity 3.
- The tabs do not tell screen readers which one is selected. Severity 2.
- One reply box sits under messages from two teachers, so the recipient is unclear. Severity 3.
- Search and reply field borders are 1.60:1. Severity 2.
- White avatar initials are 2.97:1 (the full name is printed next to each). Severity 1.

Severity note: defect 4 (grade "3" at 1.62:1) is raised from 2 to 4 — the grade is the number the parent came to check, and `severity.md` scores an AA failure that hides it as 4.
