/**
 * Тексты PDF-материалов (чек-листов), которые сайт отдаёт в обмен на контакт.
 * Сборка: node scripts/materials/build.mjs → public/materials/<id>-<locale>.pdf и обложки.
 * Названия и подводки для блока на сайте — в messages/*.json (materials.*).
 *
 * Пункт: [заголовок, пояснение]. Пояснение — как проверить или что сделать.
 */

export const MATERIALS = {
  'site-law': {
    ru: {
      kicker: 'Чек-лист',
      title: 'Сайт и закон: что проверить перед запуском',
      lead: 'Тринадцать пунктов, которые чаще всего упускают на сайтах малого бизнеса: персональные данные, cookie, реклама и продажи онлайн. Пройдите по списку до открытия сайта — исправить заранее проще и дешевле, чем после жалобы или проверки.',
      sections: [
        {
          title: 'Персональные данные (152-ФЗ)',
          items: [
            [
              'Политика обработки персональных данных опубликована',
              'Отдельная страница, ссылка на неё — в подвале каждой страницы. В политике: кто оператор, какие данные, зачем, куда передаются и сколько хранятся (ст. 18.1).',
            ],
            [
              'В каждой форме — отдельный чекбокс согласия',
              'Не отмечен заранее, ведёт на текст согласия. С сентября 2025 года согласие оформляется отдельно от других документов — фраза «отправляя форму, вы соглашаетесь с политикой» больше не подходит (ст. 9).',
            ],
            [
              'Форма собирает только нужное',
              'Для заявки обычно хватает имени и телефона. Каждое лишнее поле — и потеря заявок, и лишние данные, за которые вы отвечаете (ст. 5).',
            ],
            [
              'Данные россиян записываются в базы в России',
              'Хостинг сайта, CRM и почта, куда приходят заявки, — с серверами в России (ст. 18 ч. 5). Проверьте и сервисы форм: многие зарубежные конструкторы хранят заявки за рубежом.',
            ],
            [
              'Уведомление в Роскомнадзор подано до начала сбора данных',
              'Подаётся онлайн через Госуслуги на pd.rkn.gov.ru, бесплатно (ст. 22). Проверьте себя в реестре операторов.',
            ],
            [
              'Переписка в зарубежных мессенджерах учтена',
              'Если клиенты пишут вам в WhatsApp или Telegram, это трансграничная передача: нужно отдельное уведомление в Роскомнадзор (ст. 12) — или переводите общение в российские сервисы.',
            ],
            [
              'Cookie и аналитика оформлены',
              'Уведомление о cookie и аналитике при первом визите; Вебвизор Метрики не записывает содержимое полей форм.',
            ],
            [
              'Понятно, кто видит заявки, и доступы защищены',
              'Пароли и двухфакторная аутентификация в CRM, хостинге и почте; доступ только у тех, кому он нужен для работы.',
            ],
            [
              'Есть адрес для запросов и отзыва согласия',
              'Человек может узнать, какие данные о нём есть, и попросить их удалить. Отвечать нужно в течение 10 рабочих дней (ст. 14, 20).',
            ],
          ],
        },
        {
          title: 'Реклама и рассылки',
          items: [
            [
              'Рекламные письма и SMS — только с отдельного согласия',
              'Согласие на обработку данных для заявки не даёт права слать рекламу. Для рассылок нужно своё согласие, и его наличие доказываете вы (38-ФЗ «О рекламе», ст. 18).',
            ],
            [
              'Реклама в интернете маркируется',
              'Посты у блогеров, объявления в соцсетях и пабликах — с токеном erid и пометкой «Реклама» (38-ФЗ, ст. 18.1).',
            ],
          ],
        },
        {
          title: 'Продажи и контент',
          items: [
            [
              'Если продаёте онлайн — на сайте есть данные продавца',
              'Наименование, адрес, ОГРН или ОГРНИП, условия оплаты, доставки и возврата (Закон о защите прав потребителей, ст. 26.1).',
            ],
            [
              'Фото, тексты и шрифты — свои или с лицензией',
              'Картинка «из интернета» на коммерческом сайте — частая причина претензий от правообладателей и фотобанков.',
            ],
          ],
        },
      ],
      note: 'Штрафы за нарушения при обработке персональных данных (КоАП, ст. 13.11) с 2025 года заметно выросли. Чек-лист — не юридическая консультация: в спорных случаях покажите сайт юристу.',
      cta: 'Хотите, проверим ваш сайт по этому списку и всё поправим? Напишите на sandwor.ru — ответим в течение рабочего дня.',
    },
    en: {
      kicker: 'Checklist',
      title: 'Your website and the law: what to check before launch',
      lead: 'Thirteen points small-business websites in Russia most often miss: personal data, cookies, advertising and online sales. Go through the list before the site goes live — fixing things in advance is easier and cheaper than after a complaint or an inspection.',
      sections: [
        {
          title: 'Personal data (Federal Law 152-FZ)',
          items: [
            [
              'A personal data policy is published',
              'A separate page linked from the footer of every page. It says who the operator is, what data is collected, why, where it goes and how long it is kept (art. 18.1).',
            ],
            [
              'Every form has a separate consent checkbox',
              'Not pre-ticked, linking to the consent text. Since September 2025 consent must be separate from other documents — "by submitting the form you accept the policy" no longer works (art. 9).',
            ],
            [
              'The form collects only what is needed',
              'A request usually needs just a name and a phone number. Every extra field costs you leads and adds data you are responsible for (art. 5).',
            ],
            [
              'Data of Russian citizens is recorded in databases in Russia',
              'Hosting, CRM and the mailbox that receives requests run on servers in Russia (art. 18 part 5). Check form services too: many foreign builders store submissions abroad.',
            ],
            [
              'The Roskomnadzor notification is filed before you start collecting data',
              'Filed online via Gosuslugi at pd.rkn.gov.ru, free of charge (art. 22). Check yourself in the register of operators.',
            ],
            [
              'Chats in foreign messengers are accounted for',
              'If clients message you on WhatsApp or Telegram, that is a cross-border transfer: it needs a separate notification (art. 12) — or move conversations to Russian services.',
            ],
            [
              'Cookies and analytics are disclosed',
              'A cookie and analytics notice on the first visit; Metrica Webvisor does not record the contents of form fields.',
            ],
            [
              'You know who sees requests, and access is protected',
              'Passwords and two-factor authentication in the CRM, hosting and email; access only for those who need it.',
            ],
            [
              'There is an address for requests and consent withdrawal',
              'People can ask what data you hold about them and request deletion. You must reply within 10 working days (art. 14, 20).',
            ],
          ],
        },
        {
          title: 'Advertising and mailings',
          items: [
            [
              'Promotional emails and SMS only with separate consent',
              'Consent to process data for a request does not allow sending ads. Mailings need their own consent, and the burden of proof is on you (Advertising Law 38-FZ, art. 18).',
            ],
            [
              'Online ads are labelled',
              'Posts by bloggers and ads in social networks carry an erid token and the label "Advertising" (38-FZ, art. 18.1).',
            ],
          ],
        },
        {
          title: 'Sales and content',
          items: [
            [
              'If you sell online, the site shows seller details',
              'Name, address, OGRN or OGRNIP, payment, delivery and return terms (Consumer Protection Law, art. 26.1).',
            ],
            [
              'Photos, texts and fonts are your own or licensed',
              'An image "from the internet" on a commercial site is a common reason for claims from rights holders and photo banks.',
            ],
          ],
        },
      ],
      note: 'Fines for personal data violations (Administrative Code, art. 13.11) increased noticeably in 2025. This checklist is not legal advice: in doubtful cases, show your site to a lawyer.',
      cta: 'Want us to check your site against this list and fix everything? Write to us at sandwor.ru — we reply within one business day.',
    },
  },

  'site-prep': {
    ru: {
      kicker: 'Чек-лист заказчика',
      title: 'Что подготовить к сайту',
      lead: 'Половина сроков и бюджета сайта зависит не от разработчика, а от того, что готово у заказчика на старте. Соберите это заранее — даже черновиков хватит — и проект пойдёт без пауз «ждём материалы».',
      sections: [
        {
          title: 'Задача',
          items: [
            [
              'Главное действие посетителя',
              'Позвонить, оставить заявку, записаться, купить. Одно главное — остальное второстепенно.',
            ],
            [
              'Кто ваш клиент и о чём он спрашивает',
              'Выпишите 5–10 вопросов, которые задают до покупки. Этот список — готовая структура сайта и блок «Вопросы».',
            ],
            [
              '3–5 сайтов-примеров',
              'Конкурентов и просто симпатичных: что нравится, что раздражает. Это экономит раунды правок дизайна.',
            ],
            [
              'Откуда придут посетители',
              'Реклама, поиск, соцсети, карты, рекомендации. От этого зависят структура страниц и аналитика.',
            ],
          ],
        },
        {
          title: 'Контент',
          items: [
            [
              'Тексты об услугах или товарах',
              'Что входит, для кого, сколько стоит хотя бы «от», сроки. Черновика своими словами достаточно — отредактируем.',
            ],
            [
              'Фотографии',
              'Свои живые фото продают лучше стоковых: команда, работа, место, продукт. Горизонтальные и вертикальные, при дневном свете.',
            ],
            [
              'Логотип и фирменный стиль',
              'Логотип в векторе (SVG, AI или PDF), фирменные цвета и шрифты — если есть.',
            ],
            [
              'Доказательства',
              'Работы, кейсы, отзывы клиентов (с их разрешения), сертификаты, цифры, которые можно подтвердить.',
            ],
            [
              'Контакты и реквизиты',
              'Телефон, мессенджеры, почта, адрес и часы работы, реквизиты для подвала и документов.',
            ],
          ],
        },
        {
          title: 'Доступы — на вас, а не на подрядчика',
          items: [
            ['Домен', 'Зарегистрирован на вас или вашу компанию; есть доступ к управлению DNS.'],
            [
              'Хостинг или аккаунт конструктора',
              'Tilda или хостинг — на вашем аккаунте, подрядчику даётся доступ. Иначе при смене подрядчика сайт может «уйти» вместе с ним.',
            ],
            ['Почта на домене', 'Например, hello@ваш-сайт.ru — для заявок и писем клиентам.'],
            [
              'Аналитика и поиск',
              'Яндекс Метрика, Вебмастер и Google Search Console — на вашем аккаунте.',
            ],
            [
              'Куда пойдут заявки',
              'CRM, почта или мессенджер. Лучше CRM: заявки не теряются и видно, откуда они пришли.',
            ],
          ],
        },
        {
          title: 'Организация',
          items: [
            [
              'Кто согласует',
              'Один человек со стороны заказчика, который принимает решения и отвечает в течение дня.',
            ],
            [
              'Бюджет и сроки',
              'Вилка бюджета и дата, к которой сайт нужен, — с запасом на согласования.',
            ],
            [
              'Кто будет обновлять сайт',
              'Вы сами, сотрудник или подрядчик. От этого зависит, на чём делать сайт.',
            ],
            [
              'Документы',
              'Политика обработки персональных данных, согласие для форм; для продаж онлайн — оферта и условия возврата.',
            ],
          ],
        },
      ],
      note: 'Не обязательно готовить всё идеально: черновики и голосовые заметки тоже подойдут. Главное — чтобы они были на старте, а не в конце проекта.',
      cta: 'Готовы обсудить сайт? Расскажите о задаче на sandwor.ru — ответим в течение рабочего дня и скажем, что из списка нужно именно вам.',
    },
    en: {
      kicker: 'Client checklist',
      title: 'What to prepare for your website',
      lead: 'Half of a website\'s timeline and budget depends not on the developer but on what the client has ready at the start. Gather this in advance — drafts are enough — and the project runs without "waiting for materials" pauses.',
      sections: [
        {
          title: 'The task',
          items: [
            [
              "The visitor's main action",
              'Call, send a request, book, buy. One main action — everything else is secondary.',
            ],
            [
              'Who your client is and what they ask',
              'Write down 5–10 questions people ask before buying. That list is a ready site structure and FAQ.',
            ],
            [
              '3–5 example websites',
              'Competitors and sites you simply like: what works for you, what annoys you. It saves rounds of design edits.',
            ],
            [
              'Where visitors will come from',
              'Ads, search, social networks, maps, referrals. This shapes the page structure and analytics.',
            ],
          ],
        },
        {
          title: 'Content',
          items: [
            [
              'Texts about services or products',
              'What is included, for whom, a price at least "from", timelines. A draft in your own words is enough — we will edit it.',
            ],
            [
              'Photos',
              'Your own real photos sell better than stock: the team, the work, the place, the product. Horizontal and vertical, in daylight.',
            ],
            [
              'Logo and brand style',
              'The logo in vector (SVG, AI or PDF), brand colours and fonts — if you have them.',
            ],
            [
              'Proof',
              'Work samples, case studies, client reviews (with permission), certificates, numbers you can back up.',
            ],
            [
              'Contacts and company details',
              'Phone, messengers, email, address and opening hours, details for the footer and documents.',
            ],
          ],
        },
        {
          title: "Access — in your name, not the contractor's",
          items: [
            ['Domain', 'Registered to you or your company, with access to DNS settings.'],
            [
              'Hosting or builder account',
              'Tilda or hosting on your account, with access granted to the contractor. Otherwise the site can "leave" with them.',
            ],
            [
              'Email on your domain',
              'For example, hello@your-site.com — for requests and client mail.',
            ],
            [
              'Analytics and search',
              'Yandex Metrica, Webmaster and Google Search Console on your account.',
            ],
            [
              'Where requests will go',
              'A CRM, email or a messenger. A CRM is best: requests are not lost and you see where they came from.',
            ],
          ],
        },
        {
          title: 'Organisation',
          items: [
            [
              'Who approves',
              'One person on the client side who makes decisions and replies within a day.',
            ],
            [
              'Budget and deadline',
              'A budget range and the date you need the site by — with a buffer for approvals.',
            ],
            [
              'Who will update the site',
              'You, a colleague or a contractor. This decides what the site should be built on.',
            ],
            [
              'Documents',
              'A personal data policy and consent for forms; for online sales — terms of sale and returns.',
            ],
          ],
        },
      ],
      note: 'You do not need everything to be perfect: drafts and voice notes work too. What matters is having them at the start, not at the end of the project.',
      cta: 'Ready to discuss your site? Tell us about the task at sandwor.ru — we reply within one business day and tell you which points matter for you.',
    },
  },

  'lead-leaks': {
    ru: {
      kicker: 'Самопроверка',
      title: '20 мест, где сайт теряет заявки',
      lead: 'Посетители есть, а заявок мало? Обычно дело не в дизайне, а в мелочах, которые по одной незаметны. Откройте свой сайт на телефоне и пройдитесь по списку — на каждый пункт хватит минуты.',
      sections: [
        {
          title: 'Первый экран',
          items: [
            [
              'За 5 секунд непонятно, что вы делаете и для кого',
              'Покажите первый экран знакомому на 5 секунд и спросите, чем вы занимаетесь.',
            ],
            [
              'На первом экране нет кнопки действия',
              'Тем, кто пришёл уже готовым, незачем листать весь сайт.',
            ],
            [
              'Заголовок о компании, а не о результате клиента',
              '«Мы — динамично развивающаяся компания» против «Сайт за 2 недели, который приносит заявки».',
            ],
            [
              'Тяжёлый слайдер или видео тормозит загрузку',
              'Первый экран должен появляться за 1–2 секунды даже на мобильном интернете.',
            ],
          ],
        },
        {
          title: 'Доверие',
          items: [
            [
              'Нет цен — даже «от»',
              'Без ориентира по цене многие уходят спрашивать к тем, у кого он есть.',
            ],
            [
              'Нет реальных работ',
              'Кейсы с задачей и результатом убеждают сильнее любых обещаний.',
            ],
            [
              'Отзывы безликие или их нет',
              'Имя, компания, фото или ссылка — и конкретика: что было до и что стало после.',
            ],
            [
              'Не видно, кто за сайтом стоит',
              'Люди, адрес, реквизиты. Анонимной компании доверяют меньше.',
            ],
          ],
        },
        {
          title: 'Кнопки и формы',
          items: [
            [
              'Несколько одинаково ярких кнопок',
              'Когда главных кнопок пять, ни одна не главная. Оставьте одну на экран.',
            ],
            [
              'На кнопке «Отправить» вместо результата',
              '«Получить расчёт», «Записаться на пробное» работают лучше.',
            ],
            [
              'В форме больше 3–4 полей',
              'Для первого контакта хватит имени и телефона. Остальное — в разговоре.',
            ],
            [
              'Нет согласия на обработку данных',
              'Это и нарушение закона, и сигнал «несерьёзный сайт» для внимательного клиента.',
            ],
            [
              'После отправки ничего не происходит',
              'Покажите, что заявка дошла и что будет дальше: кто и когда свяжется.',
            ],
            [
              'Заявки не доходят',
              'Отправьте тестовую заявку прямо сейчас — и проверьте, где она оказалась.',
            ],
          ],
        },
        {
          title: 'Телефон и скорость',
          items: [
            [
              'На телефоне кнопки мелкие или перекрываются',
              'Проверьте на реальном телефоне: всплывающий чат, баннер cookie, кнопка «наверх».',
            ],
            [
              'Страница грузится дольше 3 секунд',
              'Проверьте в PageSpeed Insights; медленный сайт теряет посетителей ещё до первого экрана.',
            ],
            [
              'Номер телефона не нажимается',
              'На телефоне номер должен открывать звонок, а мессенджеры — чат.',
            ],
          ],
        },
        {
          title: 'После заявки',
          items: [
            [
              'Ответ дольше часа в рабочее время',
              'Через час человек уже пишет конкурентам. Настройте уведомления о новых заявках.',
            ],
            [
              'Заявки живут в почте и мессенджерах',
              'Там они теряются. В CRM видно все заявки, их статус и источник.',
            ],
            [
              'Не настроены цели в аналитике',
              'Без целей в Метрике не узнать, какие страницы и каналы приносят заявки.',
            ],
          ],
        },
      ],
      note: 'Отметили больше пяти пунктов? Начните с форм и скорости — там заявки теряются чаще всего, а исправить их проще всего.',
      cta: 'Хотите разбор именно вашего сайта? Напишите на sandwor.ru — посмотрим и скажем, что исправить в первую очередь.',
    },
    en: {
      kicker: 'Self-check',
      title: '20 places where your website loses leads',
      lead: 'Visitors come, but requests are few? Usually it is not the design but small things that go unnoticed one by one. Open your site on a phone and go through the list — each point takes a minute.',
      sections: [
        {
          title: 'The first screen',
          items: [
            [
              'In 5 seconds it is unclear what you do and for whom',
              'Show the first screen to a friend for 5 seconds and ask what you do.',
            ],
            [
              'There is no action button on the first screen',
              'People who arrive ready should not have to scroll the whole site.',
            ],
            [
              "The headline is about the company, not the client's result",
              '"We are a dynamic company" versus "A site in 2 weeks that brings you leads".',
            ],
            [
              'A heavy slider or video slows down loading',
              'The first screen should appear within 1–2 seconds even on mobile internet.',
            ],
          ],
        },
        {
          title: 'Trust',
          items: [
            [
              'No prices — not even "from"',
              'Without a price guide many leave to ask those who have one.',
            ],
            [
              'No real work samples',
              'Case studies with a task and a result convince better than any promise.',
            ],
            [
              'Reviews are faceless or missing',
              'A name, a company, a photo or link — and specifics: what it was before and after.',
            ],
            [
              'It is unclear who is behind the site',
              'People, an address, company details. An anonymous company gets less trust.',
            ],
          ],
        },
        {
          title: 'Buttons and forms',
          items: [
            [
              'Several equally bright buttons',
              'When five buttons are main, none is. Keep one per screen.',
            ],
            [
              '"Submit" on the button instead of a result',
              '"Get a quote" or "Book a trial" work better.',
            ],
            [
              'More than 3–4 fields in the form',
              'A name and a phone are enough for a first contact. The rest — in conversation.',
            ],
            [
              'No consent to data processing',
              'It breaks the law and signals "not a serious site" to an attentive client.',
            ],
            [
              'Nothing happens after submitting',
              'Show that the request arrived and what happens next: who will get in touch and when.',
            ],
            [
              'Requests do not arrive',
              'Send a test request right now — and check where it ended up.',
            ],
          ],
        },
        {
          title: 'Phone and speed',
          items: [
            [
              'On a phone buttons are tiny or covered',
              'Check on a real phone: a pop-up chat, a cookie banner, a "back to top" button.',
            ],
            [
              'The page loads longer than 3 seconds',
              'Check in PageSpeed Insights; a slow site loses visitors before the first screen.',
            ],
            [
              'The phone number is not tappable',
              'On a phone the number should start a call, and messengers should open a chat.',
            ],
          ],
        },
        {
          title: 'After the request',
          items: [
            [
              'Replying takes more than an hour in business hours',
              'After an hour people are already writing to competitors. Set up notifications for new requests.',
            ],
            [
              'Requests live in email and messengers',
              'They get lost there. A CRM shows all requests, their status and source.',
            ],
            [
              'No analytics goals',
              'Without goals in Metrica you cannot tell which pages and channels bring leads.',
            ],
          ],
        },
      ],
      note: 'Ticked more than five points? Start with forms and speed — that is where leads are lost most often, and they are the easiest to fix.',
      cta: 'Want a review of your own site? Write to us at sandwor.ru — we will take a look and tell you what to fix first.',
    },
  },
};
