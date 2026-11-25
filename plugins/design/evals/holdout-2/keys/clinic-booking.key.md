# clinic-booking — answer key

**Context.** Patient of a private clinic (Acme Клиника), phone 390×844, light theme, Russian UI. Task: pick a date and
time with a therapist, check the price, consent, pay. Frequency: a few times a year, so no learned habits; often older
users, often in a hurry or unwell. Money is charged on this screen.

## Defects

1. **Wrong time saved after choosing a slot** — `#summary-time` (interaction bug). Click `10:00`: the slot highlights,
   but the summary and the success message say `10:30` (`slots[i + 1]`). Measured: clicked "10:00" → summary "10:30",
   toast "Вы записаны на 10:30". Harm: patient arrives at the wrong time / misses the visit after paying.
   **Severity 4.**
2. **Price on the button is not the price charged** — `.pay` + `.fee-note`. Button and summary say "Оплатить 1 500 ₽";
   the 800 ₽ service fee and the real total 2 300 ₽ appear only in 10 px text, #a8adb4 on #fff = **2.26:1**, wrapped
   under the button. The success message then says "Списано 2 300 ₽". Harm: everyone pays 53 % more than shown;
   low-vision users cannot read the disclosure at all. **Severity 4.**
3. **Marketing consent pre-ticked and bundled with the required one** — `#consent-ads` is `checked` by default, placed
   right under the required personal-data consent, same style. Harm: patients "agree" to SMS/e-mail advertising without
   an active choice; consent is not freely given. **Severity 3.**
4. **Selected slot is almost invisible** — `.slot.sel`: background #f1f5fb vs unselected #f7f8fa = **1.03:1**, same
   border (#e3e7ee, 1.17:1 to slot bg), no checkmark, same text. Fails non-text contrast (SC 1.4.11 needs 3:1). Harm:
   users cannot tell which time is chosen (and cannot notice defect 1). **Severity 3.**
5. **Focus indicator removed** — `button:focus, input:focus { outline:none }`, no replacement. Measured: after 6 Tab
   presses focus is on the day "пн 30" with outline none, box-shadow none, unchanged background. Harm: keyboard,
   switch-access and screen-magnifier users on a phone cannot see where they are (SC 2.4.7). Box: `.days`.
   **Severity 3.**
6. **Back button target too small** — `.back` hit area **24×24 px** (icon only, no padding), at the screen corner.
   Harm: mis-taps, especially for older users and tremor; below the common 44×44 pt / 48 dp touch-target guidance.
   **Severity 2.**
7. **Doctor's name truncated with no way to read it** — `.doc-name`: visible 230 px of **397 px**, shows
   "Ковальчук-Ширинская Ан…", no tooltip (empty `title`), no expand. Harm: patient cannot confirm the full name of the
   doctor they are paying to see (clinics often have namesakes). **Severity 2.**

## Style only (harm nobody)
- Corner radii vary: card 12 px, date chips 10 px, pay button 10 px, slots 8 px.
- Page title weight 700 vs section headings 600; the price inside the doctor card is bold while other meta is regular.

## Trap (looks like a defect, is fine)
- **Busy slots `.slot[disabled]` are low contrast: #8a9099 on #f2f3f5 = 2.9:1.** They are disabled controls, which
  SC 1.4.3 exempts; they are also struck through and explained by the legend "Зачёркнутое время уже занято." at 5.98:1.
  Nobody needs to read a busy time precisely, and dimming makes the free slots stand out. Not a defect.

## Not planted, acceptable if found
- The date strip is 480 px wide inside 390 px; the 6th day (вт 1) starts at x = 396, fully off-screen, and the 5th chip
  ends at 388 px, so there is no visual cue that the strip scrolls. A reviewer flagging this is right (severity 1–2).
- Summary rows scroll under the sticky pay bar on 844 px height — normal sticky-footer behaviour.
