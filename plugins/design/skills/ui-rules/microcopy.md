# Interface text: bad and good

Pairs of interface strings for the fictional Acme (an app for small shops: owner, clerk, courier) and Acme Shop (its customer web shop). Each pair has the reason in one line and the rule it serves. Every group then shows at least three pairs in English, Russian, German, Uzbek (Latin script) and Arabic, written for each language rather than translated word for word.

**About the translations.** A model wrote and checked them, not native speakers. Treat them as examples of the pattern, not as ready strings. A project should have native speakers review its own strings, in context, on the real screen.

Text in square brackets is a button: `[Create order]`.

## Buttons

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| B1 | OK | Record payment | A verb plus the object says what happens after the press | TEXT-4 |
| B2 | Submit | Send invoice | "Submit" names the form mechanics, not the result | TEXT-4 |
| B3 | Yes / No (under "Delete order 1042?") | Delete order / Keep order | People answer the buttons without rereading the question | STATE-4 |
| B4 | Click here | Download receipt (PDF) | The link says where it goes and what it opens; screen readers list links out of context | TEXT-4 |
| B5 | Continue (on the payment step) | Pay $24.00 | The amount is checked at the moment of commitment | MEM-2, HONEST-1 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| B1 | EN | OK | Record payment |
| B1 | RU | ОК | Записать оплату |
| B1 | DE | OK | Zahlung erfassen |
| B1 | UZ | OK | To‘lovni qayd etish |
| B1 | AR | موافق | تسجيل الدفعة |
| B2 | EN | Submit | Send invoice |
| B2 | RU | Отправить | Отправить счёт |
| B2 | DE | Absenden | Rechnung senden |
| B2 | UZ | Yuborish | Hisob-fakturani yuborish |
| B2 | AR | إرسال | إرسال الفاتورة |
| B3 | EN | Yes / No | Delete order / Keep order |
| B3 | RU | Да / Нет | Удалить заказ / Оставить заказ |
| B3 | DE | Ja / Nein | Bestellung löschen / Bestellung behalten |
| B3 | UZ | Ha / Yo‘q | Buyurtmani o‘chirish / Buyurtmani qoldirish |
| B3 | AR | نعم / لا | حذف الطلب / الإبقاء على الطلب |

## Form labels and hints

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| L1 | Placeholder "Phone" inside the field, no label | Label "Phone" above the field; hint "We text you when the courier is near" | The placeholder disappears on typing; the hint says why the data is asked for | STATE-3, HONEST-3 |
| L2 | Name* (no legend) | Full name; Company (optional) | Marking optional fields in words leaves no guess about the asterisk | STATE-3 |
| L3 | "Password must meet the requirements" (rules in a tooltip) | Under the field: "At least 8 characters, one of them a digit" | Task-critical rules are visible before the error, not hidden in a tooltip | EXP-5 |
| L4 | DOB | Date of birth, e.g. 31.12.1990 (in the user's local format) | No abbreviations; the example shows the expected order of day and month | TEXT-4, TEXT-5 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| L2 | EN | Name* | Full name · Company (optional) |
| L2 | RU | Имя* | Полное имя · Компания (необязательно) |
| L2 | DE | Name* | Vollständiger Name · Firma (optional) |
| L2 | UZ | Ism* | To‘liq ism · Kompaniya (ixtiyoriy) |
| L2 | AR | الاسم* | الاسم الكامل · الشركة (اختياري) |
| L3 | EN | Password must meet the requirements | At least 8 characters, one of them a digit |
| L3 | RU | Пароль должен соответствовать требованиям | Не короче 8 символов, хотя бы одна цифра |
| L3 | DE | Passwort muss den Anforderungen entsprechen | Mindestens 8 Zeichen, davon eine Ziffer |
| L3 | UZ | Parol talablarga mos bo‘lishi kerak | Kamida 8 ta belgi, ulardan biri raqam |
| L3 | AR | يجب أن تستوفي كلمة المرور المتطلبات | 8 أحرف على الأقل، منها رقم واحد |
| L4 | EN | DOB | Date of birth, e.g. 12/31/1990 |
| L4 | RU | ДР | Дата рождения, например 31.12.1990 |
| L4 | DE | Geb.-Dat. | Geburtsdatum, z. B. 31.12.1990 |
| L4 | UZ | Tug‘. sana | Tug‘ilgan sana, masalan 31.12.1990 |
| L4 | AR | ت.م | تاريخ الميلاد، مثل 31/12/1990 |

## Error messages

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| E1 | Invalid value | Card number is 2 digits short | Says what is wrong and how much to fix | STATE-3 |
| E2 | Error 500 | We couldn't save the order. What you entered is kept — try again. | Plain words, the fate of the data, the next step | ACT-10 |
| E3 | "Please fix the errors above" at the top, alone | "2 fields need attention: Email, Phone" with links to the fields, plus a message at each field | A summary alone makes people hunt for the field | STATE-3 |
| E4 | No account found for anna@example.com | Email or password is wrong. [Reset password] | On sign-in, the specific message tells an attacker which emails exist; here the less specific one is right | STATE-3 (limits) |
| E5 | You entered an invalid phone number! | Enter the number with the country code, e.g. +998 90 123 45 67 | No blame, no exclamation mark; shows the expected format | ACT-7 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| E1 | EN | Invalid value | Card number is 2 digits short |
| E1 | RU | Недопустимое значение | В номере карты не хватает 2 цифр |
| E1 | DE | Ungültiger Wert | In der Kartennummer fehlen 2 Ziffern |
| E1 | UZ | Noto‘g‘ri qiymat | Karta raqamida 2 ta raqam yetishmayapti |
| E1 | AR | قيمة غير صالحة | رقم البطاقة ينقصه رقمان |
| E2 | EN | Error 500 | We couldn't save the order. What you entered is kept — try again. |
| E2 | RU | Ошибка 500 | Не удалось сохранить заказ. Введённые данные на месте — попробуйте ещё раз. |
| E2 | DE | Fehler 500 | Die Bestellung wurde nicht gespeichert. Ihre Eingaben bleiben erhalten – versuchen Sie es erneut. |
| E2 | UZ | Xato 500 | Buyurtma saqlanmadi. Kiritgan ma’lumotlaringiz saqlanib qoldi — qayta urinib ko‘ring. |
| E2 | AR | خطأ 500 | تعذّر حفظ الطلب. بياناتك محفوظة، حاول مرة أخرى. |
| E5 | EN | You entered an invalid phone number! | Enter the number with the country code, e.g. +998 90 123 45 67 |
| E5 | RU | Вы ввели неверный номер! | Введите номер с кодом страны, например +998 90 123 45 67 |
| E5 | DE | Sie haben eine ungültige Nummer eingegeben! | Geben Sie die Nummer mit Ländervorwahl ein, z. B. +49 30 1234567 |
| E5 | UZ | Siz noto‘g‘ri raqam kiritdingiz! | Raqamni davlat kodi bilan kiriting, masalan +998 90 123 45 67 |
| E5 | AR | لقد أدخلت رقمًا غير صحيح! | أدخل الرقم مع رمز الدولة، مثل +998 90 123 45 67 |

## Empty states

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| M1 | No data | No orders yet. New orders appear here. [Create order] | Says what will appear and gives the first action | STATE-2 |
| M2 | No results | Nothing found for "blu shirt". Check the spelling or search all categories. [Clear filters] | Repeats the query, suggests a way out, never a dead end | SEARCH-1, SEARCH-2 |
| M3 | Empty (notifications list) | You're all caught up. New payments and orders appear here. | An empty inbox is good news; say so | STATE-2 |
| M4 | 0 · 0 · 0 (first-day dashboard of zeros) | Your first sales appear here. Share your shop link to get the first order. [Copy link] | Zeros on day one read as failure; the screen shows the first step | STATE-2 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| M1 | EN | No data | No orders yet. New orders appear here. [Create order] |
| M1 | RU | Нет данных | Заказов пока нет. Новые заказы появятся здесь. [Создать заказ] |
| M1 | DE | Keine Daten | Noch keine Bestellungen. Neue Bestellungen erscheinen hier. [Bestellung anlegen] |
| M1 | UZ | Ma’lumot yo‘q | Hozircha buyurtmalar yo‘q. Yangi buyurtmalar shu yerda chiqadi. [Buyurtma yaratish] |
| M1 | AR | لا توجد بيانات | لا توجد طلبات بعد. ستظهر الطلبات الجديدة هنا. [إنشاء طلب] |
| M2 | EN | No results | Nothing found for "blu shirt". Check the spelling or search all categories. [Clear filters] |
| M2 | RU | Ничего не найдено | По запросу «синия рубашка» ничего нет. Проверьте написание или ищите во всех категориях. [Сбросить фильтры] |
| M2 | DE | Keine Ergebnisse | Für „blaues Hemt“ nichts gefunden. Prüfen Sie die Schreibweise oder suchen Sie in allen Kategorien. [Filter zurücksetzen] |
| M2 | UZ | Natija yo‘q | “Ko‘k ko‘ylek” bo‘yicha hech narsa topilmadi. Imloni tekshiring yoki barcha toifalarda qidiring. [Filtrlarni tozalash] |
| M2 | AR | لا نتائج | لم نجد شيئًا عن «قميص ازرق». تحقّق من الإملاء أو ابحث في كل الفئات. [مسح عوامل التصفية] |
| M3 | EN | Empty | You're all caught up. New payments and orders appear here. |
| M3 | RU | Пусто | Всё прочитано. Новые оплаты и заказы появятся здесь. |
| M3 | DE | Leer | Alles gelesen. Neue Zahlungen und Bestellungen erscheinen hier. |
| M3 | UZ | Bo‘sh | Hammasi o‘qildi. Yangi to‘lovlar va buyurtmalar shu yerda chiqadi. |
| M3 | AR | فارغ | لا جديد. ستظهر المدفوعات والطلبات الجديدة هنا. |

The queries in M2 are misspelled on purpose: the good message shows the query as typed.

## Confirmations and destructive actions

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| C1 | Are you sure? [Yes] [No] (before a refund) | Refund $240.00 to Anna Lee? This cannot be reversed. [Refund $240.00] [Keep payment] | Names the object, the amount and the consequence; buttons name the actions | STATE-4 |
| C2 | Archive this order? [Yes] [No] (every time) | No dialog. "Order archived. [Undo]" | Routine, reversible actions get undo, not a question people click through | STATE-4 |
| C3 | Delete account? [OK] | Delete the Acme account and all 312 orders? Download them first if you need them. Type the shop name to confirm. | The most dangerous action names what is lost, offers a way to keep it, asks for a deliberate step | STATE-4 |
| C4 | Discard changes? [OK] [Cancel] | Leave without saving? Your note on order 1042 will be lost. [Leave] [Keep editing] | "Cancel" is ambiguous here: cancel the leaving or the changes? | ACT-9, STATE-4 |
| C5 | Confirm transfer? | Send $120.00 to Anna Lee, card •• 4417? | The confirmation shows what is being confirmed | MEM-2 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| C1 | EN | Are you sure? [Yes] [No] | Refund $240.00 to Anna Lee? This cannot be reversed. [Refund $240.00] [Keep payment] |
| C1 | RU | Вы уверены? [Да] [Нет] | Вернуть 240,00 $ Анне Ли? Отменить возврат будет нельзя. [Вернуть 240,00 $] [Не возвращать] |
| C1 | DE | Sind Sie sicher? [Ja] [Nein] | 240,00 $ an Anna Lee erstatten? Das lässt sich nicht rückgängig machen. [240,00 $ erstatten] [Zahlung behalten] |
| C1 | UZ | Ishonchingiz komilmi? [Ha] [Yo‘q] | Anna Liga 240,00 $ qaytarilsinmi? Buni bekor qilib bo‘lmaydi. [240,00 $ qaytarish] [To‘lovni qoldirish] |
| C1 | AR | هل أنت متأكد؟ [نعم] [لا] | هل تريد ردّ 240.00 $ إلى آنا لي؟ لا يمكن التراجع عن ذلك. [ردّ 240.00 $] [الإبقاء على الدفعة] |
| C2 | EN | Archive this order? [Yes] [No] | Order archived. [Undo] |
| C2 | RU | Архивировать заказ? [Да] [Нет] | Заказ в архиве. [Вернуть] |
| C2 | DE | Bestellung archivieren? [Ja] [Nein] | Bestellung archiviert. [Rückgängig] |
| C2 | UZ | Buyurtma arxivlansinmi? [Ha] [Yo‘q] | Buyurtma arxivlandi. [Bekor qilish] |
| C2 | AR | أرشفة الطلب؟ [نعم] [لا] | تمت أرشفة الطلب. [تراجع] |
| C4 | EN | Discard changes? [OK] [Cancel] | Leave without saving? Your note on order 1042 will be lost. [Leave] [Keep editing] |
| C4 | RU | Отменить изменения? [ОК] [Отмена] | Выйти без сохранения? Заметка к заказу 1042 пропадёт. [Выйти] [Продолжить правку] |
| C4 | DE | Änderungen verwerfen? [OK] [Abbrechen] | Ohne Speichern verlassen? Die Notiz zu Bestellung 1042 geht verloren. [Verlassen] [Weiter bearbeiten] |
| C4 | UZ | O‘zgarishlar bekor qilinsinmi? [OK] [Bekor qilish] | Saqlamasdan chiqasizmi? 1042-buyurtmadagi izoh o‘chib ketadi. [Chiqish] [Tahrirlashni davom ettirish] |
| C4 | AR | تجاهل التغييرات؟ [موافق] [إلغاء] | المغادرة دون حفظ؟ ستضيع ملاحظتك على الطلب 1042. [مغادرة] [متابعة التعديل] |

## Permission requests

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| P1 | At first launch: "Acme wants to access your location" | When the courier opens the route: "Acme uses your location to show the route to the next delivery." | Asked at the moment of use, with the reason | HONEST-3 |
| P2 | At first launch: "Allow notifications?" | After the first order: "Get a notification when a customer pays? [Turn on] [Not now]" | The person can judge the value once they have seen it | HONEST-3 |
| P3 | "Allow access to contacts to continue" (blocks the screen) | "Pick customers from your contacts, or type them in. [Choose from contacts] [Type in]" | The feature works without the permission; the permission is a shortcut | HONEST-3 |
| P4 | "Camera access required" | "Scan the parcel barcode with the camera. You can also type the code." | States the use and the alternative | HONEST-3, PLAT-2 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| P1 | EN | Acme wants to access your location | Acme uses your location to show the route to the next delivery. |
| P1 | RU | Acme запрашивает доступ к геопозиции | Acme использует геопозицию, чтобы построить маршрут до следующей доставки. |
| P1 | DE | Acme möchte auf Ihren Standort zugreifen | Acme nutzt Ihren Standort, um die Route zur nächsten Lieferung zu zeigen. |
| P1 | UZ | Acme joylashuvingizga ruxsat so‘ramoqda | Acme keyingi yetkazib berishgacha yo‘lni ko‘rsatish uchun joylashuvingizdan foydalanadi. |
| P1 | AR | يطلب Acme الوصول إلى موقعك | يستخدم Acme موقعك لعرض الطريق إلى التوصيلة التالية. |
| P2 | EN | Allow notifications? | Get a notification when a customer pays? [Turn on] [Not now] |
| P2 | RU | Разрешить уведомления? | Сообщать, когда покупатель оплатит заказ? [Включить] [Не сейчас] |
| P2 | DE | Mitteilungen erlauben? | Benachrichtigen, wenn ein Kunde bezahlt? [Einschalten] [Später] |
| P2 | UZ | Bildirishnomalarga ruxsat berilsinmi? | Xaridor to‘lov qilganda xabar beraylikmi? [Yoqish] [Hozir emas] |
| P2 | AR | السماح بالإشعارات؟ | هل نرسل لك إشعارًا عندما يدفع العميل؟ [تفعيل] [ليس الآن] |
| P3 | EN | Allow access to contacts to continue | Pick customers from your contacts, or type them in. [Choose from contacts] [Type in] |
| P3 | RU | Чтобы продолжить, разрешите доступ к контактам | Выберите покупателей из контактов или введите вручную. [Из контактов] [Ввести вручную] |
| P3 | DE | Zum Fortfahren Zugriff auf Kontakte erlauben | Wählen Sie Kunden aus Ihren Kontakten oder geben Sie sie ein. [Aus Kontakten] [Selbst eingeben] |
| P3 | UZ | Davom etish uchun kontaktlarga ruxsat bering | Xaridorlarni kontaktlardan tanlang yoki qo‘lda kiriting. [Kontaktlardan] [Qo‘lda kiritish] |
| P3 | AR | اسمح بالوصول إلى جهات الاتصال للمتابعة | اختر العملاء من جهات الاتصال أو أدخلهم يدويًا. [من جهات الاتصال] [إدخال يدوي] |

## Notifications and toasts

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| N1 | Toast "Error" that fades after 3 s when a save fails | A message at the form that stays: "Not saved: no connection. [Try again]" | A failure needs the person's action; a fading toast far from the form is missed | STATE-5, MEM-4 |
| N2 | Success! | Invoice 1042 sent to anna@example.com | Names what was done and where it went | ACT-10 |
| N3 | Push: "We miss you!! Come back" | Push: "3 orders are waiting to be shipped" | A reminder serves the person's task, not the product's return rate | HONEST-2 |
| N4 | Your session has expired (after the person typed a long note) | Signed out for safety after 30 minutes. Sign in to continue — your draft is kept. | Explains why, keeps the work, shows the way back | ACT-9 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| N1 | EN | Error | Not saved: no connection. [Try again] |
| N1 | RU | Ошибка | Не сохранено: нет связи. [Повторить] |
| N1 | DE | Fehler | Nicht gespeichert: keine Verbindung. [Erneut versuchen] |
| N1 | UZ | Xato | Saqlanmadi: aloqa yo‘q. [Qayta urinish] |
| N1 | AR | خطأ | لم يُحفظ: لا يوجد اتصال. [إعادة المحاولة] |
| N2 | EN | Success! | Invoice 1042 sent to anna@example.com |
| N2 | RU | Успешно! | Счёт 1042 отправлен на anna@example.com |
| N2 | DE | Erfolgreich! | Rechnung 1042 an anna@example.com gesendet |
| N2 | UZ | Muvaffaqiyatli! | 1042-hisob-faktura anna@example.com manziliga yuborildi |
| N2 | AR | تم بنجاح! | أُرسلت الفاتورة 1042 إلى anna@example.com |
| N4 | EN | Your session has expired | Signed out for safety after 30 minutes. Sign in to continue — your draft is kept. |
| N4 | RU | Сессия истекла | Для безопасности вы вышли через 30 минут. Войдите, чтобы продолжить, — черновик сохранён. |
| N4 | DE | Sitzung abgelaufen | Aus Sicherheitsgründen nach 30 Minuten abgemeldet. Melden Sie sich an, um weiterzumachen – Ihr Entwurf bleibt erhalten. |
| N4 | UZ | Seans tugadi | Xavfsizlik uchun 30 daqiqadan so‘ng tizimdan chiqdingiz. Davom etish uchun kiring — qoralama saqlangan. |
| N4 | AR | انتهت الجلسة | سُجّل خروجك بعد 30 دقيقة حفاظًا على الأمان. سجّل الدخول للمتابعة، فمسودتك محفوظة. |

## Loading and success

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| S1 | "Loading…" (static, for 15 s) | Importing customers: 120 of 450. [Stop] | A long wait shows how much is done and offers a way out | ACT-2 |
| S2 | "Please wait" text next to the Pay button, which stays active | The button itself turns into "Paying…" and cannot be pressed again | Feedback at the place of the action; no double payment | ACT-2 |
| S3 | Done | Order 1042 placed. Delivery on 12 March. [Track order] | The result names the key facts and the next step | ACT-10 |
| S4 | Processing your request | Checking the card with your bank, usually under 10 seconds | Says what is happening and how long to expect | ACT-2 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| S1 | EN | Loading… | Importing customers: 120 of 450. [Stop] |
| S1 | RU | Загрузка… | Импорт покупателей: 120 из 450. [Остановить] |
| S1 | DE | Wird geladen … | Kunden werden importiert: 120 von 450. [Stoppen] |
| S1 | UZ | Yuklanmoqda… | Xaridorlar import qilinmoqda: 450 tadan 120 tasi. [To‘xtatish] |
| S1 | AR | جارٍ التحميل… | استيراد العملاء: 120 من 450. [إيقاف] |
| S3 | EN | Done | Order 1042 placed. Delivery on 12 March. [Track order] |
| S3 | RU | Готово | Заказ 1042 оформлен. Доставка 12 марта. [Отследить заказ] |
| S3 | DE | Fertig | Bestellung 1042 aufgegeben. Lieferung am 12. März. [Sendung verfolgen] |
| S3 | UZ | Tayyor | 1042-buyurtma qabul qilindi. Yetkazib berish 12-mart kuni. [Buyurtmani kuzatish] |
| S3 | AR | تم | تم تقديم الطلب 1042. التوصيل في 12 مارس. [تتبّع الطلب] |
| S4 | EN | Processing your request | Checking the card with your bank, usually under 10 seconds |
| S4 | RU | Обработка запроса | Проверяем карту в банке, обычно до 10 секунд |
| S4 | DE | Anfrage wird bearbeitet | Wir prüfen die Karte bei Ihrer Bank, meist unter 10 Sekunden |
| S4 | UZ | So‘rov bajarilmoqda | Karta bankingizda tekshirilmoqda, odatda 10 soniyagacha |
| S4 | AR | جارٍ معالجة طلبك | نتحقق من البطاقة لدى مصرفك، عادةً خلال أقل من 10 ثوانٍ |

## Pricing and decline options

| # | Bad | Good | Why | Rule |
| --- | --- | --- | --- | --- |
| H1 | No thanks, I don't want to save money | Skip | The decline is neutral; no shame wording | HONEST-1 |
| H2 | $9.99/mo* (renewal price in a footnote) | $9.99 a month for 3 months, then $19.99 a month. Cancel any time in Settings. | The full price and the way out are stated before commitment | HONEST-1 |
| H3 | Only 2 left! 14 people are looking at this | "In stock", or "2 left in the Tashkent warehouse" only when the stock data says so | Scarcity shown only when it is true and checkable | HONEST-1 |
| H4 | Free trial | Free for 14 days, then $19.99 a month. We'll remind you 3 days before the first charge. | Says when money is taken and gives time to cancel | HONEST-1 |
| H5 | ☑ Add gift wrap $2.00 (ticked by default) | ☐ Add gift wrap, $2.00 | Nothing that costs money is preselected | HONEST-1 |

| Pair | Lang | Bad | Good |
| --- | --- | --- | --- |
| H1 | EN | No thanks, I don't want to save money | Skip |
| H1 | RU | Нет, я не хочу экономить | Пропустить |
| H1 | DE | Nein danke, ich will kein Geld sparen | Überspringen |
| H1 | UZ | Yo‘q, men pul tejashni xohlamayman | O‘tkazib yuborish |
| H1 | AR | لا شكرًا، لا أريد التوفير | تخطّي |
| H2 | EN | $9.99/mo* | $9.99 a month for 3 months, then $19.99 a month. Cancel any time in Settings. |
| H2 | RU | 9,99 $/мес.* | 9,99 $ в месяц первые 3 месяца, затем 19,99 $ в месяц. Отменить можно в любой момент в настройках. |
| H2 | DE | 9,99 $/Mon.* | 9,99 $ pro Monat für 3 Monate, danach 19,99 $ pro Monat. Jederzeit in den Einstellungen kündbar. |
| H2 | UZ | 9,99 $/oy* | Dastlabki 3 oy oyiga 9,99 $, keyin oyiga 19,99 $. Istalgan vaqt Sozlamalarda bekor qilish mumkin. |
| H2 | AR | 9.99 $ شهريًا* | 9.99 $ شهريًا لمدة 3 أشهر، ثم 19.99 $ شهريًا. يمكنك الإلغاء في أي وقت من الإعدادات. |
| H4 | EN | Free trial | Free for 14 days, then $19.99 a month. We'll remind you 3 days before the first charge. |
| H4 | RU | Бесплатный пробный период | Бесплатно 14 дней, затем 19,99 $ в месяц. Напомним за 3 дня до первого списания. |
| H4 | DE | Kostenlos testen | 14 Tage kostenlos, danach 19,99 $ pro Monat. Wir erinnern Sie 3 Tage vor der ersten Abbuchung. |
| H4 | UZ | Bepul sinov | 14 kun bepul, keyin oyiga 19,99 $. Birinchi to‘lovdan 3 kun oldin eslatamiz. |
| H4 | AR | تجربة مجانية | مجانًا لمدة 14 يومًا، ثم 19.99 $ شهريًا. سنذكّرك قبل أول خصم بـ 3 أيام. |

## Notes for every language

### Length

| Language | Total length of the 27 "good" strings vs English | Largest ratio for one string |
| --- | --- | --- |
| Russian | 1.07 × | 2.5 × ("Skip" → "Пропустить") |
| German | 1.24 × | 3.0 × ("Skip" → "Überspringen") |
| Uzbek | 1.24 × | 4.25 × ("Skip" → "O‘tkazib yuborish") |
| Arabic | 0.94 × | 1.25 × |

The shortest strings grow the most: a four-letter English button can become three or four times longer, while long sentences grow by a fifth or a quarter.

Measured on the "good" strings of this file only (characters, including spaces and button text). These are small samples of short strings; real ratios depend on the text, and single long words matter more than averages. German and Uzbek build long single words and suffix chains ("Rechnungsempfänger", "yuborilmaganlar"), which do not wrap; Uzbek adds suffixes where English adds words. Design every label with room to grow, let buttons wrap to two lines, and test with the longest language in the profile (TEXT-3, TEXT-5).

### Right-to-left (Arabic)

- The whole layout mirrors: navigation, the back arrow (points right), progress direction, the order of buttons in a row, icons with a direction (send, reply, undo). Icons without a direction (search, settings, a clock) and media controls (play) do not mirror.
- Numbers, phone numbers, card numbers, codes and email addresses stay left-to-right inside right-to-left text. Mark them as left-to-right runs in the markup so punctuation and the "+" of a phone number do not jump to the wrong end.
- Some regions use Eastern Arabic digits (٠١٢٣), others Western (0123); the profile decides, never mix them on one screen.
- Arabic uses its own comma (،) and question mark (؟). The currency symbol position follows the locale's format, not the English order.
- No letter-spacing and no all-caps logic: Arabic letters join, and spacing between them breaks the words.

### Plurals

Never build a plural by adding "s" or by choosing between two forms. Use the locale's plural rules (the CLDR categories in the i18n library):

- Russian has three forms for whole numbers: 1 заказ, 2 заказа, 5 заказов (and 21 заказ, 22 заказа, 25 заказов). "1 заказов" is a defect.
- Arabic has six categories: zero, one, two (a separate dual form, as in "رقمان" in E1), few, many, other.
- German and English have two forms; Uzbek uses the singular noun after a number ("3 ta buyurtma"), so a sentence built for English plurals reads wrong.

### Never concatenate strings

"Order " + number + " sent to " + email breaks in languages with another word order, case endings or a different place for the number ("1042-buyurtma" in Uzbek puts the number first and attaches a suffix). Use one message with named placeholders per language: `Order {number} sent to {email}`. The same applies to dates, amounts and units: format them with the locale's formatter, never by gluing parts.

### Formality and gender

- Russian ты/вы, German du/Sie, Uzbek sen/siz: choose once per product in the profile and keep it on every screen. The examples here use the polite form (вы, Sie, siz); mixing forms on one screen is a defect, the choice itself is not.
- Russian past-tense verbs agree with gender in the ты form ("ты вошёл / вошла"); the вы form avoids it ("вы вошли"). Arabic second-person verbs and pronouns are gendered in every form. Prefer constructions that need no gender, or let the person choose.
- Uzbek apostrophe letters are written here as o‘ and g‘ with the turned comma; the official alphabet uses the modifier letter ʻ. A project should pick one character and use it everywhere, because search and sorting treat them as different.
