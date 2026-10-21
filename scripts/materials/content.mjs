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
      lead: 'Пункты, которые чаще всего упускают на сайтах малого бизнеса: персональные данные, cookie, реклама, продажи и контент. Сверено с законами на октябрь 2026 года. Пройдите по списку до открытия сайта — исправить заранее проще и дешевле, чем после письма Роскомнадзора или жалобы клиента.',
      sections: [
        {
          title: 'Персональные данные (152-ФЗ)',
          items: [
            [
              'Политика обработки данных опубликована',
              'Отдельная страница, ссылка на неё — в подвале и у каждой формы. В политике: кто оператор, какие данные, зачем и на каком основании, кому передаются, сколько хранятся и как защищены (ст. 18.1).',
            ],
            [
              'Согласие — отдельный документ для каждой цели',
              'Свой текст на заявку, на рассылку, на cookie; чекбокс не отмечен заранее и ведёт на текст именно этого согласия. С 1 сентября 2025 года согласие нельзя «вшивать» в политику или оферту, а фраза «отправляя форму, вы соглашаетесь» не подходит (ст. 9).',
            ],
            [
              'Согласие просят только там, где оно нужно',
              'Если человек сам просит договор или ответ, хватает этого основания (ст. 6). Лишние согласия Роскомнадзор называет типичным нарушением, а согласие, которое расходится с политикой по данным и целям, уже приводило к штрафам.',
            ],
            [
              'Форма собирает только нужное',
              'Для заявки обычно хватает имени и телефона. Каждое лишнее поле — и потеря заявок, и лишние данные, за которые вы отвечаете (ст. 5).',
            ],
            [
              'Данные россиян — только в российских базах',
              'С 1 июля 2025 года при сборе нельзя использовать зарубежные базы: Google Forms, Google Analytics, иностранные конструкторы форм и CRM (ст. 18 ч. 5). Проверьте хостинг, CRM, почту и сервис форм. Штраф для компании и ИП — от 1 до 6 млн ₽.',
            ],
            [
              'Уведомление в Роскомнадзор подано до начала обработки',
              'Онлайн через Госуслуги на pd.rkn.gov.ru, бесплатно (ст. 22). Обязательно почти всем, включая самозанятых и ИП. Сведения в уведомлении должны совпадать с политикой на сайте — Роскомнадзор их сверяет.',
            ],
            [
              'Cookie и аналитика — только после согласия',
              'Метрика и другие счётчики подключаются после уведомления и согласия посетителя, а в политике описано, что они собирают. Суды в 2025–2026 годах штрафовали за Метрику без согласия. Надёжнее всего — кнопки «Разрешить» и «Отклонить»; Вебвизор не записывает поля форм.',
            ],
            [
              'Переписка в мессенджерах продумана',
              'Роскомнадзор публично не считает переписку с клиентами в Telegram передачей данных за рубеж, но хранятся они там на зарубежных серверах. Переносите нужное в CRM и не просите присылать сканы документов в мессенджер.',
            ],
            [
              'Доступы защищены, внутренние документы есть',
              'Двухфакторная аутентификация в CRM, хостинге и почте; доступ только у тех, кому он нужен. Акт оценки вреда и решение об уровне защищённости — короткие документы, которые закон требует от всех операторов (ст. 18.1, 19).',
            ],
            [
              'Запросы людей и Роскомнадзора — в срок',
              'Человек может узнать, какие данные о нём есть, и потребовать их удалить: ответ — 10 рабочих дней, после отзыва согласия данные уничтожают за 30 дней и оформляют акт (ст. 14, 21). На письма Роскомнадзора — тоже 10 рабочих дней.',
            ],
            [
              'Есть план на случай утечки',
              'О взломе CRM или почты сообщают в Роскомнадзор за 24 часа, о результатах расследования — за 72 часа (ст. 21 ч. 3.1). Не сообщили — до 3 млн ₽ для компании и ИП.',
            ],
          ],
        },
        {
          title: 'Реклама и рассылки',
          items: [
            [
              'Реклама в интернете маркируется',
              'Посты у блогеров, в каналах, объявления в VK и Яндексе — с пометкой «Реклама», рекламодателем и токеном erid (38-ФЗ, ст. 18.1). Цены и акции на собственном сайте рекламой не считаются.',
            ],
            [
              'Без рекламы на запрещённых площадках и логотипов Instagram',
              'С 1 сентября 2025 года нельзя размещать рекламу в Instagram, Facebook и на других заблокированных ресурсах (38-ФЗ, ст. 5). За логотипы Instagram и Facebook на сайте наказывают по ст. 20.3 КоАП.',
            ],
            [
              'Рекламные письма и SMS — только с согласия на рекламу',
              'Согласие на обработку данных для заявки не даёт права слать рекламу. Нужна отдельная отметка со словом «реклама», отписка — сразу (38-ФЗ, ст. 18). Штраф для компании — до 1 млн ₽.',
            ],
          ],
        },
        {
          title: 'Продажи и контент',
          items: [
            [
              'На сайте есть сведения о владельце и продавце',
              'Любой сайт показывает имя или наименование владельца, адрес и почту (149-ФЗ, ст. 10). Интернет-магазин — ещё ОГРН или ОГРНИП, оферту, условия оплаты, доставки и возврата (ЗоЗПП, ст. 26.1; новые Правила продажи с 1 сентября 2026 года).',
            ],
            [
              'Тексты для покупателей — на русском',
              'С 1 марта 2026 года информация для потребителей на сайте — на русском; английская версия допустима как равнозначный дубль, товарные знаки не переводятся (ЗоЗПП, ст. 10.1).',
            ],
            [
              'Фото, тексты, шрифты и отзывы — с правами',
              'Картинка «из интернета» — компенсация от 10 тыс. до 10 млн ₽ (ГК, ст. 1301). Фото и имена клиентов в отзывах и кейсах — с их согласием, в том числе на распространение персональных данных (152-ФЗ, ст. 10.1).',
            ],
            [
              'Личный кабинет — вход по российскому номеру или Госуслугам',
              'Если на сайте есть регистрация, вход только по почте или через Google не подходит (149-ФЗ, ст. 8 ч. 10); штрафы за это действуют с июля 2026 года.',
            ],
          ],
        },
      ],
      note: 'С 30 мая 2025 года штрафы за нарушения с персональными данными выросли в разы, а ИП по большинству составов платит как компания. Чек-лист — не юридическая консультация: в спорных случаях покажите сайт юристу.',
      cta: 'Хотите, проверим ваш сайт по этому списку и всё поправим? Напишите на sandwor.ru — ответим в течение рабочего дня.',
    },
    en: {
      kicker: 'Checklist',
      title: 'Your website and the law: what to check before launch',
      lead: 'Points small-business websites in Russia most often miss: personal data, cookies, advertising, sales and content. Checked against the law as of October 2026. Go through the list before the site goes live — fixing things in advance is easier and cheaper than after a letter from Roskomnadzor or a customer complaint.',
      sections: [
        {
          title: 'Personal data (Federal Law 152-FZ)',
          items: [
            [
              'A data processing policy is published',
              'A separate page linked from the footer and from every form. It says who the operator is, what data is collected, why and on what legal basis, who receives it, how long it is kept and how it is protected (art. 18.1).',
            ],
            [
              'Consent is a separate document for each purpose',
              'A text of its own for requests, for mailings, for cookies; the checkbox is not pre-ticked and links to that specific consent. Since 1 September 2025 consent cannot be buried in a policy or terms of sale, and "by submitting the form you agree" no longer works (art. 9).',
            ],
            [
              'Consent is requested only where it is needed',
              'If a person asks for a contract or an answer, that is a legal basis in itself (art. 6). Roskomnadzor calls unnecessary consents a typical violation, and consent that contradicts the policy on data and purposes has already led to fines.',
            ],
            [
              'The form collects only what is needed',
              'A request usually needs just a name and a phone number. Every extra field costs you leads and adds data you are responsible for (art. 5).',
            ],
            [
              'Data of Russian citizens stays in Russian databases',
              'Since 1 July 2025 foreign databases may not be used when collecting data: Google Forms, Google Analytics, foreign form builders and CRMs (art. 18 part 5). Check your hosting, CRM, email and form service. The fine for a company or a sole proprietor is 1–6 million roubles.',
            ],
            [
              'The Roskomnadzor notification is filed before processing starts',
              'Online via Gosuslugi at pd.rkn.gov.ru, free of charge (art. 22). Required of almost everyone, including the self-employed and sole proprietors. The notification must match the policy on the site — Roskomnadzor compares them.',
            ],
            [
              'Cookies and analytics only after consent',
              'Metrica and other counters load after the notice and the visitor\'s consent, and the policy describes what they collect. In 2025–2026 courts fined site owners for Metrica without consent. The most reliable option is "Allow" and "Decline" buttons; Webvisor does not record form fields.',
            ],
            [
              'Messenger chats are thought through',
              'Roskomnadzor has said publicly that chatting with clients on Telegram is not a cross-border transfer, but the data is stored on foreign servers. Move what you need to your CRM and do not ask clients to send document scans via messengers.',
            ],
            [
              'Access is protected and internal documents exist',
              'Two-factor authentication in the CRM, hosting and email; access only for those who need it. A harm assessment record and a security level decision are short documents the law requires from every operator (art. 18.1, 19).',
            ],
            [
              'Requests from people and Roskomnadzor are answered on time',
              'People can ask what data you hold and demand deletion: reply within 10 working days; after consent is withdrawn, destroy the data within 30 days and record it (art. 14, 21). Letters from Roskomnadzor also need a reply within 10 working days.',
            ],
            [
              'There is a plan for a data breach',
              'If your CRM or email is hacked, notify Roskomnadzor within 24 hours and report the investigation results within 72 hours (art. 21 part 3.1). Failing to do so costs a company or a sole proprietor up to 3 million roubles.',
            ],
          ],
        },
        {
          title: 'Advertising and mailings',
          items: [
            [
              'Online ads are labelled',
              'Posts by bloggers, in channels, ads in VK and Yandex carry the label "Advertising", the advertiser and an erid token (Advertising Law 38-FZ, art. 18.1). Prices and offers on your own website are not advertising.',
            ],
            [
              'No ads on banned platforms and no Instagram logos',
              'Since 1 September 2025 ads may not be placed on Instagram, Facebook and other blocked resources (38-FZ, art. 5). Instagram and Facebook logos on a website are punished under art. 20.3 of the Administrative Code.',
            ],
            [
              'Promotional emails and SMS only with consent to advertising',
              'Consent to process data for a request does not allow sending ads. You need a separate tick with the word "advertising", and unsubscribing must work at once (38-FZ, art. 18). The fine for a company is up to 1 million roubles.',
            ],
          ],
        },
        {
          title: 'Sales and content',
          items: [
            [
              'The site shows owner and seller details',
              "Every website shows the owner's name, address and email (Information Law 149-FZ, art. 10). An online store also shows OGRN or OGRNIP, terms of sale, payment, delivery and returns (Consumer Protection Law, art. 26.1; new Rules of Sale since 1 September 2026).",
            ],
            [
              'Consumer information is in Russian',
              'Since 1 March 2026 consumer information on a website must be in Russian; an English version is allowed as an equivalent duplicate, and trademarks are not translated (Consumer Protection Law, art. 10.1).',
            ],
            [
              'Photos, texts, fonts and reviews are licensed',
              'An image "from the internet" can cost from 10 thousand to 10 million roubles in compensation (Civil Code, art. 1301). Client photos and names in reviews and case studies need their consent, including consent to the distribution of personal data (152-FZ, art. 10.1).',
            ],
            [
              'Account login by Russian phone number or Gosuslugi',
              'If your site has registration, login by email only or via Google is not enough (149-FZ, art. 8 part 10); fines for this apply since July 2026.',
            ],
          ],
        },
      ],
      note: 'Since 30 May 2025 fines for personal data violations have risen several times, and for most of them a sole proprietor pays as much as a company. This checklist is not legal advice: in doubtful cases, show your site to a lawyer.',
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
              'Политика обработки персональных данных, отдельное согласие для каждой формы и уведомление в Роскомнадзор; для продаж онлайн — оферта и условия возврата.',
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
              'A personal data policy, a separate consent for each form and a Roskomnadzor notification; for online sales — terms of sale and returns.',
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
              'Нет отдельного согласия на обработку данных',
              'С сентября 2025 года это отдельный чекбокс со своим текстом. Без него — и нарушение закона, и сигнал «несерьёзный сайт» для внимательного клиента.',
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
              'No separate consent to data processing',
              'Since September 2025 it is a separate checkbox with its own text. Without it the site breaks the law and signals "not a serious site" to an attentive client.',
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
