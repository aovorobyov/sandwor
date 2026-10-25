import type { ArticleDraft } from './articles.types';

/**
 * Информационная статья под запросы «яндекс метрика как пользоваться», «вебвизор что это»,
 * «google analytics 4 для сайта». TOFU→MOFU: объясняет, как устроены системы и какие вопросы
 * бизнеса закрывают, и подводит к мысли, что заявки нужно измерять с первого дня.
 * Факты — по справке Яндекс Метрики и Google Analytics (октябрь 2026), ссылки — в тексте.
 */
export const webAnalytics: ArticleDraft = {
  slug: 'yandeks-metrika-vebvizor-google-analytics',
  date: '2026-10-25',
  image: '/blog/analytics-cover.webp',
  translations: {
    ru: {
      title:
        'Яндекс Метрика, Вебвизор и Google Analytics: как работают и что по ним понять о сайте',
      tag: 'Аналитика',
      excerpt:
        'Сайт работает, реклама крутится, а откуда приходят заявки — непонятно. Разбираем, как устроены Метрика, Вебвизор и Google Analytics 4, какие отчёты смотреть небольшому бизнесу и можно ли ставить GA в России.',
      description:
        'Яндекс Метрика, Вебвизор и Google Analytics 4 простыми словами: как собираются данные, какие отчёты и цели настроить, что видно в записях визитов, чем GA4 отличается от Метрики и что с ним по закону в России.',
      body: `
<p>Сайт открыт, на рекламу уходят деньги, иногда приходят заявки. Но на простые вопросы ответа нет: откуда пришёл последний клиент, на какой странице люди передумывают, почему с телефона заявок в три раза меньше, чем с компьютера. Владелец действует по ощущениям: «кажется, Директ работает», «вроде бы форма нормальная».</p>

<p>Системы веб-аналитики отвечают на эти вопросы цифрами. В России их две, которые стоит знать: <strong>Яндекс Метрика</strong> со встроенным <strong>Вебвизором</strong> и <strong>Google Analytics 4</strong>. Разберём, как они устроены, что по ним можно понять и с чего начать небольшому бизнесу.</p>

<h2>Как аналитика вообще узнаёт о посетителях</h2>

<p>На каждую страницу сайта ставится небольшой код — счётчик. Когда человек открывает страницу, браузер загружает этот код, а он отправляет на серверы сервиса данные о визите: какая страница, откуда пришёл человек, с какого устройства, что он нажал. Чтобы отличать одного посетителя от другого, счётчик кладёт в браузер cookie — у Метрики это, например, <code>_ym_uid</code>, у Google Analytics — <code>_ga</code>. Оба хранятся до года-двух, поэтому повторный визит узнаётся.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/analytics-flow-ru-m.webp" width="800" height="1240" />
    <img src="/blog/analytics-flow-ru.webp" width="1200" height="800" loading="lazy" alt="Схема: посетитель открывает сайт, счётчик собирает данные, данные уходят на серверы Яндекса или Google, владелец смотрит отчёты" />
  </picture>
  <figcaption>Счётчик работает в браузере посетителя, а считают визиты и строят отчёты серверы сервиса. Поэтому без счётчика на странице её посещения не попадут ни в один отчёт.</figcaption>
</figure>

<p>Отсюда два следствия. Первое: если человек запретил cookie или стоит блокировщик, часть визитов вы не увидите — цифры в аналитике всегда немного меньше реальности. Второе: аналитика собирает данные о людях, поэтому по закону о персональных данных посетителя нужно предупредить. Об этом — в конце статьи.</p>

<h2>Яндекс Метрика: что в ней смотреть</h2>

<p>Метрика бесплатная и даёт десятки отчётов. Небольшому бизнесу хватает пяти групп — остальные пригодятся, когда сайт вырастет.</p>

<h3>Основные понятия</h3>

<ul>
  <li><strong>Визит</strong> — всё, что человек сделал на сайте за один заход. Визит заканчивается, если 30 минут ничего не происходит (в настройках можно увеличить до 360 минут).</li>
  <li><strong>Просмотр</strong> — загрузка одной страницы.</li>
  <li><strong>Посетитель</strong> — браузер с cookie Метрики. Один человек с телефона и с ноутбука — это два посетителя.</li>
  <li><strong>Отказ</strong> — визит, в котором был один просмотр и человек провёл на сайте меньше 15 секунд. Высокая доля отказов на рекламной странице — первый сигнал, что реклама и страница говорят о разном.</li>
</ul>

<h3>Отчёты, которые закрывают главные вопросы</h3>

<ul>
  <li><strong>Источники → Сводка.</strong> Откуда пришли люди: поиск, реклама, соцсети, переходы с других сайтов, прямые заходы. Если ведёте рекламу, размечайте ссылки UTM-метками — тогда в отчёте «Метки UTM» видно не просто «реклама», а конкретную кампанию и объявление.</li>
  <li><strong>Конверсии.</strong> Сколько визитов закончились нужным действием — заявкой, звонком, сообщением. Это главный отчёт: он показывает не посещаемость, а результат.</li>
  <li><strong>Содержание → Страницы входа.</strong> С каких страниц люди начинают знакомство с сайтом. Часто оказывается, что главная — вовсе не главная, а половина клиентов приходит через статью или страницу одной услуги.</li>
  <li><strong>Технологии → Устройства.</strong> Телефоны, планшеты, компьютеры. Сравните конверсию по устройствам: если с телефона она заметно ниже, проблема почти всегда в мобильной версии.</li>
  <li><strong>Мониторинг.</strong> Нагрузка на сайт и время загрузки страниц. Медленный сайт теряет посетителей ещё до первого экрана.</li>
</ul>

<h3>Цели — без них Метрика просто считает посещаемость</h3>

<p>Цель — это действие, которое для вас ценно: отправка формы, клик по телефону, переход в мессенджер. Пока целей нет, Метрика отвечает только на вопрос «сколько людей зашло», а не «сколько из них стали клиентами».</p>

<ul>
  <li><strong>Автоцели.</strong> Метрика сама ловит клики по email и телефону (если это ссылки <code>mailto:</code> и <code>tel:</code>), переходы в мессенджеры и соцсети, отправку форм, скачивание файлов. Автоцели не занимают лимит целей.</li>
  <li><strong>Целевые события.</strong> Для всего остального разработчик ставит в код отправку события — например, «открыли бриф» или «получили чек-лист». Целей на счётчике может быть до 200.</li>
  <li><strong>Составные цели.</strong> Несколько шагов подряд: открыл тарифы → открыл форму → отправил. Видно, на каком шаге отваливается больше всего людей.</li>
</ul>

<p>Хорошее правило: каждый призыв к действию на сайте — отдельная цель. Как сделать эти призывы рабочими, я подробно разбирал в статье <a href="/blog/chto-takoe-cta-na-sajte">про CTA</a>.</p>

<h3>Карты: куда смотрят и кликают</h3>

<ul>
  <li><strong>Карта кликов</strong> показывает клики по всем элементам страницы, не только по ссылкам. Частая находка — люди упорно жмут на картинку или заголовок, которые никуда не ведут.</li>
  <li><strong>Карта скроллинга</strong> — сколько времени люди смотрят каждую часть страницы. Если до блока с ценами доходит малая часть посетителей, его стоит поднять выше.</li>
  <li><strong>Аналитика форм</strong> — сколько людей начали заполнять форму, на каком поле задержались и после какого поля ушли. Это прямой ответ на вопрос «почему форму начинают и бросают».</li>
</ul>

<h2>Вебвизор: запись визита как видео</h2>

<p>Вебвизор — функция Метрики, которая записывает действия посетителя: движения курсора, клики, прокрутку, переходы между страницами. Потом визит можно посмотреть как ролик и увидеть сайт глазами клиента: где он запутался в меню, что пытался нажать, на каком месте закрыл вкладку.</p>

<p>Записи удобнее всего смотреть с фильтрами: только визиты с телефонов, только те, кто пришёл с рекламы, только те, кто дошёл до формы, но не отправил её. Из любого отчёта Метрики можно перейти к записям визитов этой строки.</p>

<p>Что важно знать:</p>

<ul>
  <li><strong>Записи хранятся 15 дней</strong> — включая текущий. Это инструмент для быстрых выводов, а не архив.</li>
  <li><strong>Записи — для понимания «почему», отчёты — для цифр.</strong> Десяток просмотренных визитов не скажет, какая доля людей ушла с формы, зато покажет, из-за чего.</li>
  <li><strong>Содержимое полей можно и нужно скрывать.</strong> В настройках Вебвизора есть переключатель «Записывать все поля» — если его выключить, всё, что люди вводят в формы, заменяется звёздочками. Отдельные блоки скрываются CSS-классом <code>ym-hide-content</code>. Условия Метрики прямо запрещают собирать через Вебвизор пароли, финансовые данные, ФИО и адреса без согласия посетителей. Пароли не записываются никогда.</li>
  <li>Если записи не открывать полгода, Вебвизор может отключиться сам.</li>
</ul>

<p>На этом сайте, например, запись полей выключена, а форма заявки целиком скрыта от Вебвизора: мне важно видеть, где люди останавливаются, а не что они пишут.</p>

<h2>Google Analytics 4: другая логика</h2>

<p>Google Analytics 4 — бесплатная система Google. Предыдущая версия, Universal Analytics, перестала собирать данные летом 2023 года, так что сейчас GA — это только GA4.</p>

<p>Главное отличие — модель данных. В GA4 всё является <strong>событием</strong>: просмотр страницы, прокрутка, клик, отправка формы. У каждого события есть параметры — на какой странице, по какой кнопке. Это гибко, но непривычно: многие привычные цифры приходится собирать самостоятельно.</p>

<ul>
  <li><strong>Расширенное измерение.</strong> Без дополнительной настройки GA4 собирает просмотры страниц, прокрутку до 90%, клики по внешним ссылкам, поиск по сайту, просмотр роликов YouTube, скачивание файлов и взаимодействие с формами (<code>form_start</code> и <code>form_submit</code>).</li>
  <li><strong>Ключевые события.</strong> Так с 2024 года называются бывшие «конверсии» — события, которые вы отметили как важные.</li>
  <li><strong>Вовлечённые сессии вместо отказов.</strong> Сессия считается вовлечённой, если длилась дольше 10 секунд, или в ней было ключевое событие, или два и больше просмотра. Показатель отказов в GA4 — просто доля невовлечённых сессий.</li>
  <li><strong>Исследования (Explorations).</strong> Воронки, пути пользователей, когорты. Мощно, но требует времени: это скорее инструмент аналитика, чем владельца бизнеса. Подробные данные для исследований хранятся 2 или 14 месяцев — по умолчанию 2, срок стоит увеличить сразу после установки.</li>
</ul>

<p>Записей визитов, как в Вебвизоре, в GA4 нет. В мире Google для этого ставят отдельный сервис, например Microsoft Clarity.</p>

<h2>Метрика или Google Analytics</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Яндекс Метрика</th>
      <th>Google Analytics 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Цена</td>
      <td>Бесплатно</td>
      <td>Бесплатно</td>
    </tr>
    <tr>
      <td>Записи визитов</td>
      <td>Вебвизор, 15 дней</td>
      <td>Нет, нужен отдельный сервис</td>
    </tr>
    <tr>
      <td>Где бросают форму</td>
      <td>Аналитика форм по полям</td>
      <td>Только начало и отправка формы</td>
    </tr>
    <tr>
      <td>Связь с рекламой</td>
      <td>Яндекс Директ</td>
      <td>Google Ads</td>
    </tr>
    <tr>
      <td>Связь с CRM</td>
      <td>Коннектор для amoCRM: какие источники приносят сделки</td>
      <td>Через выгрузки и интеграции</td>
    </tr>
    <tr>
      <td>Где обрабатываются данные</td>
      <td>ООО «ЯНДЕКС», по поручению владельца сайта</td>
      <td>Google, в любой стране, где у него есть мощности</td>
    </tr>
    <tr>
      <td>Порог входа</td>
      <td>Низкий: готовые отчёты на русском</td>
      <td>Выше: многое нужно настраивать</td>
    </tr>
  </tbody>
</table>

<p>Для небольшого бизнеса в России ответ почти всегда — Метрика. В ней есть Вебвизор и аналитика форм, отчёты понятны без аналитика, она связана с Директом и с amoCRM, и с ней проще по закону. GA4 имеет смысл, если вы продаёте за рубеж или ведёте рекламу в Google — и только после разговора с юристом.</p>

<h2>Можно ли ставить Google Analytics в России</h2>

<p>С 1 июля 2025 года закон о персональных данных запрещает при сборе данных граждан России записывать и хранить их в базах за пределами страны (ч. 5 ст. 18 152-ФЗ). Данные Google Analytics, по условиям самого Google, могут обрабатываться в любой стране, где есть его серверы. Штраф за нарушение локализации для граждан — 30–50 тысяч рублей, для ИП и компаний — от 1 до 6 миллионов (ч. 8 ст. 13.11 КоАП).</p>

<p>Официального разъяснения Роскомнадзора именно про Google Analytics нет. В 2025 году СМИ писали, что ведомство рассылает владельцам сайтов письма: использование GA — это трансграничная передача данных, о которой нужно заранее уведомлять. Юристы оценивают риск по-разному. Если без GA никак, решение стоит принимать вместе с юристом, а не по статье в блоге. Эта статья — не юридическая консультация.</p>

<p>С Метрикой тоже есть обязанности: по её условиям владелец сайта — оператор персональных данных, а Яндекс обрабатывает данные по его поручению. Значит, на сайте нужны политика обработки данных и уведомление о cookie, а сам счётчик Яндекс рекомендует загружать только после согласия посетителя.</p>

<h2>Что смотреть небольшому бизнесу</h2>

<p>Не нужно изучать все отчёты. Достаточно пяти вопросов — и знать, где ответ на каждый.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/analytics-questions-ru-m.webp" width="800" height="1140" />
    <img src="/blog/analytics-questions-ru.webp" width="1200" height="800" loading="lazy" alt="Схема: пять вопросов бизнеса и отчёты Метрики и GA4, где искать ответ" />
  </picture>
  <figcaption>Пять вопросов, на которые стоит смотреть раз в неделю. Остальные отчёты пригодятся, когда появится конкретная гипотеза.</figcaption>
</figure>

<ol>
  <li><strong>Откуда приходят клиенты?</strong> Источники → Сводка, с целью «заявка». Смотрите не на самый большой канал, а на тот, где выше конверсия.</li>
  <li><strong>Какие страницы ведут к заявке?</strong> Страницы входа с целями. Если статья приводит клиентов — пишите ещё на эту тему.</li>
  <li><strong>Где бросают форму?</strong> Аналитика форм и записи Вебвизора с фильтром «дошёл до формы, не отправил». Часто виновато одно лишнее обязательное поле.</li>
  <li><strong>Что мешает на телефоне?</strong> Устройства и записи визитов со смартфонов. Посмотрите десяток — проблема обычно видна сразу.</li>
  <li><strong>Окупается ли реклама?</strong> UTM-метки и цели. Сравните стоимость заявки по каналам — например, так, как я считал окупаемость в статье <a href="/blog/skolko-stoit-sajt-dlya-kofejni">про сайт для кофейни</a>.</li>
</ol>

<h2>Как настроить за час</h2>

<ol>
  <li><strong>Создайте счётчик</strong> в Метрике и поставьте код на все страницы. В Tilda для этого есть поле в настройках проекта, на своём сайте код ставит разработчик. Если выбираете, на чём делать сайт, — сравнение в статье <a href="/blog/tilda-ili-kastomnaya-razrabotka">Tilda или кастомная разработка</a>.</li>
  <li><strong>Настройте цели</strong> на все способы связи: форма, телефон, мессенджеры. Одну отметьте избранной — это ваша главная цель.</li>
  <li><strong>Включите Вебвизор</strong> и сразу выключите запись содержимого полей.</li>
  <li><strong>Исключите свои визиты</strong> фильтром — иначе ваши проверки сайта испортят статистику.</li>
  <li><strong>Добавьте уведомление о cookie</strong> и строку об аналитике в политику обработки данных.</li>
  <li><strong>Размечайте рекламу UTM-метками</strong> — тогда в отчётах будет видно каждую кампанию.</li>
</ol>

<p>Если сайт делает разработчик, всё это стоит обсудить до начала работ — пригодится <a href="/blog/kak-vybrat-veb-razrabotchika">чек-лист вопросов к веб-разработчику</a>.</p>

<h2>Итог</h2>

<p>Аналитика нужна не ради графиков, а чтобы перестать гадать: какая реклама приносит клиентов, где сайт теряет заявки и что исправить в первую очередь. Метрика с Вебвизором закрывает эти вопросы для большинства небольших сайтов в России, а цели превращают посещаемость в понятный результат.</p>

<p>На всех сайтах, которые я делаю, Метрика с целями на каждую кнопку и форму настроена с первого дня — вместе с уведомлением о cookie и политикой. Посмотрите, <a href="/services/sites">как я делаю сайты</a>, или <a href="/contact">напишите мне</a> — подскажу, что посмотреть в аналитике именно вашего сайта.</p>

<p><small>Источники: справка <a href="https://yandex.ru/support/metrica/ru/" target="_blank" rel="noopener noreferrer">Яндекс Метрики</a>, <a href="https://yandex.ru/legal/metrica_termsofuse/" target="_blank" rel="noopener noreferrer">условия использования Метрики</a>, справка <a href="https://support.google.com/analytics/" target="_blank" rel="noopener noreferrer">Google Analytics</a>, 152-ФЗ и КоАП РФ. Данные — на октябрь 2026 года.</small></p>
`,
    },
    en: {
      title:
        'Yandex Metrica, Session Replay and Google Analytics: how they work and what they tell you',
      tag: 'Analytics',
      excerpt:
        'The site is live, ads are running, but nobody knows where requests come from. Here is how Yandex Metrica, its Session Replay and Google Analytics 4 work, which reports a small business should watch, and what Russian law says about GA.',
      description:
        'Yandex Metrica, Session Replay (Webvisor) and Google Analytics 4 in plain words: how data is collected, which reports and goals to set up, what session recordings show, how GA4 differs from Metrica and its legal status in Russia.',
      body: `
<p>The site is live, money goes into ads, requests come in now and then. But simple questions have no answers: where did the last customer come from, on which page do people change their mind, why do phones bring three times fewer requests than desktops. The owner goes by gut feeling: "Yandex Direct seems to work", "the form looks fine".</p>

<p>Web analytics answers these questions with numbers. In Russia two systems are worth knowing: <strong>Yandex Metrica</strong> with its built-in <strong>Session Replay</strong> (Webvisor) and <strong>Google Analytics 4</strong>. Let's look at how they work, what they tell you and where a small business should start.</p>

<h2>How analytics learns about visitors</h2>

<p>A small piece of code — a counter, or tag — goes on every page. When someone opens a page, the browser loads that code, and it sends visit data to the service's servers: which page, where the person came from, what device, what they clicked. To tell one visitor from another, the counter stores a cookie in the browser — for Metrica it's, for example, <code>_ym_uid</code>, for Google Analytics — <code>_ga</code>. Both live for a year or two, so repeat visits are recognised.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/analytics-flow-en-m.webp" width="800" height="1240" />
    <img src="/blog/analytics-flow-en.webp" width="1200" height="800" loading="lazy" alt="Diagram: a visitor opens the site, the counter collects data, the data goes to Yandex or Google servers, the owner reads the reports" />
  </picture>
  <figcaption>The counter runs in the visitor's browser, while the service's servers count visits and build reports. So a page without the counter never shows up in any report.</figcaption>
</figure>

<p>Two things follow. First, if a person blocks cookies or uses an ad blocker, you won't see some visits — analytics always shows slightly less than reality. Second, analytics collects data about people, so under Russian personal data law visitors must be told about it. More on that at the end.</p>

<h2>Yandex Metrica: what to look at</h2>

<p>Metrica is free and has dozens of reports. A small business needs about five groups — the rest will come in handy as the site grows.</p>

<h3>Key terms</h3>

<ul>
  <li><strong>Visit</strong> — everything a person did on the site in one go. A visit ends after 30 minutes of inactivity (the setting goes up to 360 minutes).</li>
  <li><strong>Pageview</strong> — one page load.</li>
  <li><strong>Visitor</strong> — a browser with a Metrica cookie. One person on a phone and a laptop counts as two visitors.</li>
  <li><strong>Bounce</strong> — a visit with a single pageview that lasted under 15 seconds. A high bounce rate on an ad landing page is the first sign the ad and the page say different things.</li>
</ul>

<h3>Reports that answer the main questions</h3>

<ul>
  <li><strong>Sources → Summary.</strong> Where people came from: search, ads, social media, other sites, direct visits. If you run ads, tag links with UTM parameters — then the "UTM tags" report shows not just "ads" but the exact campaign and ad.</li>
  <li><strong>Conversions.</strong> How many visits ended with the action you want — a request, a call, a message. This is the main report: it shows results, not traffic.</li>
  <li><strong>Content → Landing pages.</strong> Which pages people start with. Often the home page isn't the main one at all, and half of the customers arrive via an article or a single service page.</li>
  <li><strong>Technology → Devices.</strong> Phones, tablets, desktops. Compare conversion by device: if mobile is noticeably lower, the mobile version is almost always the problem.</li>
  <li><strong>Monitoring.</strong> Site load and page load time. A slow site loses visitors before the first screen.</li>
</ul>

<h3>Goals — without them Metrica only counts traffic</h3>

<p>A goal is an action that matters to you: sending a form, clicking a phone number, opening a messenger. Without goals, Metrica only answers "how many people came", not "how many became customers".</p>

<ul>
  <li><strong>Auto-goals.</strong> Metrica catches clicks on email and phone links (<code>mailto:</code> and <code>tel:</code>), messenger and social links, form submissions and file downloads on its own. Auto-goals don't count towards the goal limit.</li>
  <li><strong>Target events.</strong> For everything else a developer adds an event to the code — for example "opened the brief" or "got the checklist". A counter can have up to 200 goals.</li>
  <li><strong>Composite goals.</strong> Several steps in a row: opened prices → opened the form → sent it. You see which step loses the most people.</li>
</ul>

<p>A good rule: every call to action on the site is a separate goal. I covered how to make those calls to action work in the article <a href="/en/blog/chto-takoe-cta-na-sajte">about CTAs</a>.</p>

<h3>Maps: where people look and click</h3>

<ul>
  <li><strong>Click map</strong> shows clicks on every element, not just links. A common finding: people keep clicking an image or heading that leads nowhere.</li>
  <li><strong>Scroll map</strong> shows how long people look at each part of the page. If few visitors reach the prices block, move it higher.</li>
  <li><strong>Form analytics</strong> shows how many people started a form, which field they lingered on and after which field they left. It's a direct answer to "why do people start the form and give up".</li>
</ul>

<h2>Session Replay: a visit as a video</h2>

<p>Session Replay (Webvisor) is a Metrica feature that records what a visitor does: cursor movement, clicks, scrolling, moving between pages. You can then watch the visit like a video and see the site through the customer's eyes: where they got lost in the menu, what they tried to click, where they closed the tab.</p>

<p>Recordings are easiest to watch with filters: only mobile visits, only people from ads, only those who reached the form but didn't send it. From any Metrica report you can jump to the recordings for that row.</p>

<p>Worth knowing:</p>

<ul>
  <li><strong>Recordings are kept for 15 days</strong>, including today. It's a tool for quick insight, not an archive.</li>
  <li><strong>Recordings explain "why", reports give the numbers.</strong> A dozen watched visits won't tell you what share of people left the form, but they will show you the reason.</li>
  <li><strong>Field contents can and should be hidden.</strong> Session Replay has a "Record all fields" switch — turn it off and everything people type into forms becomes asterisks. Individual blocks are hidden with the CSS class <code>ym-hide-content</code>. Metrica's terms explicitly forbid collecting passwords, financial data, full names and addresses through Session Replay without visitors' consent. Passwords are never recorded.</li>
  <li>If nobody opens the recordings for six months, Session Replay may switch itself off.</li>
</ul>

<p>On this site, for example, field recording is off and the request form is hidden from Session Replay entirely: I want to see where people stop, not what they type.</p>

<h2>Google Analytics 4: a different logic</h2>

<p>Google Analytics 4 is Google's free system. The previous version, Universal Analytics, stopped collecting data in summer 2023, so GA today means GA4.</p>

<p>The main difference is the data model. In GA4 everything is an <strong>event</strong>: a pageview, a scroll, a click, a form submission. Each event has parameters — which page, which button. It's flexible but unfamiliar: many familiar numbers have to be assembled by hand.</p>

<ul>
  <li><strong>Enhanced measurement.</strong> Out of the box GA4 collects pageviews, 90% scrolls, outbound clicks, site search, YouTube video views, file downloads and form interactions (<code>form_start</code> and <code>form_submit</code>).</li>
  <li><strong>Key events.</strong> That's what former "conversions" have been called since 2024 — events you've marked as important.</li>
  <li><strong>Engaged sessions instead of bounces.</strong> A session is engaged if it lasted over 10 seconds, had a key event, or had two or more pageviews. Bounce rate in GA4 is simply the share of non-engaged sessions.</li>
  <li><strong>Explorations.</strong> Funnels, user paths, cohorts. Powerful but time-consuming: more an analyst's tool than an owner's. Detailed data for explorations is kept for 2 or 14 months — 2 by default, so extend it right after setup.</li>
</ul>

<p>GA4 has no session recordings like Webvisor. In the Google world people add a separate service for that, such as Microsoft Clarity.</p>

<h2>Metrica or Google Analytics</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Yandex Metrica</th>
      <th>Google Analytics 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Price</td>
      <td>Free</td>
      <td>Free</td>
    </tr>
    <tr>
      <td>Session recordings</td>
      <td>Session Replay, 15 days</td>
      <td>No, needs a separate service</td>
    </tr>
    <tr>
      <td>Where people abandon a form</td>
      <td>Field-level form analytics</td>
      <td>Only form start and submit</td>
    </tr>
    <tr>
      <td>Ads link</td>
      <td>Yandex Direct</td>
      <td>Google Ads</td>
    </tr>
    <tr>
      <td>CRM link</td>
      <td>amoCRM connector: which sources bring deals</td>
      <td>Via exports and integrations</td>
    </tr>
    <tr>
      <td>Where data is processed</td>
      <td>YANDEX LLC, on the site owner's instructions</td>
      <td>Google, in any country where it has facilities</td>
    </tr>
    <tr>
      <td>Learning curve</td>
      <td>Low: ready-made reports</td>
      <td>Higher: a lot needs setting up</td>
    </tr>
  </tbody>
</table>

<p>For a small business in Russia the answer is almost always Metrica. It has Session Replay and form analytics, its reports make sense without an analyst, it links to Direct and amoCRM, and it's simpler legally. GA4 makes sense if you sell abroad or advertise on Google — and only after talking to a lawyer.</p>

<h2>Can you use Google Analytics in Russia</h2>

<p>Since 1 July 2025 the personal data law forbids recording and storing Russian citizens' data in databases outside Russia when it's collected (art. 18 part 5 of 152-FZ). Under Google's own terms, Google Analytics data may be processed in any country where it has servers. The fine for breaking the localisation rule is 30–50 thousand roubles for individuals and 1 to 6 million for sole proprietors and companies (art. 13.11 part 8 of the Code of Administrative Offences).</p>

<p>Roskomnadzor hasn't published an official position specifically on Google Analytics. In 2025 the media reported that the regulator was sending site owners letters saying GA means cross-border data transfer, which requires prior notification. Lawyers assess the risk differently. If you can't do without GA, decide together with a lawyer, not based on a blog post. This article isn't legal advice.</p>

<p>Metrica comes with obligations too: under its terms the site owner is the personal data operator and Yandex processes data on their instructions. So the site needs a privacy policy and a cookie notice, and Yandex itself recommends loading the counter only after the visitor agrees.</p>

<h2>What a small business should watch</h2>

<p>You don't need to study every report. Five questions are enough — and knowing where each answer lives.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/analytics-questions-en-m.webp" width="800" height="1140" />
    <img src="/blog/analytics-questions-en.webp" width="1200" height="800" loading="lazy" alt="Diagram: five business questions and the Metrica and GA4 reports that answer them" />
  </picture>
  <figcaption>Five questions worth checking weekly. Other reports come in handy once you have a specific hypothesis.</figcaption>
</figure>

<ol>
  <li><strong>Where do customers come from?</strong> Sources → Summary with the "request" goal. Look not at the biggest channel but at the one with the highest conversion.</li>
  <li><strong>Which pages lead to a request?</strong> Landing pages with goals. If an article brings customers, write more on that topic.</li>
  <li><strong>Where do people abandon the form?</strong> Form analytics and Session Replay filtered to "reached the form, didn't send". Often one unnecessary required field is to blame.</li>
  <li><strong>What gets in the way on mobile?</strong> Devices and recordings from smartphones. Watch a dozen — the problem is usually obvious.</li>
  <li><strong>Does advertising pay off?</strong> UTM tags and goals. Compare cost per request by channel — the way I worked out payback in the article <a href="/en/blog/skolko-stoit-sajt-dlya-kofejni">about a website for a coffee shop</a>.</li>
</ol>

<h2>Set it up in an hour</h2>

<ol>
  <li><strong>Create a counter</strong> in Metrica and put the code on every page. Tilda has a field for it in the project settings; on a custom site the developer adds it. If you're choosing a platform, see <a href="/en/blog/tilda-ili-kastomnaya-razrabotka">Tilda or custom development</a>.</li>
  <li><strong>Set up goals</strong> for every contact method: form, phone, messengers. Mark one as a favourite — that's your main goal.</li>
  <li><strong>Turn on Session Replay</strong> and immediately turn off recording of field contents.</li>
  <li><strong>Exclude your own visits</strong> with a filter — otherwise your own checks will skew the stats.</li>
  <li><strong>Add a cookie notice</strong> and a line about analytics to your privacy policy.</li>
  <li><strong>Tag ads with UTM parameters</strong> so every campaign shows up in the reports.</li>
</ol>

<p>If a developer builds your site, discuss all of this before work starts — <a href="/en/blog/kak-vybrat-veb-razrabotchika">a checklist of questions for a web developer</a> will help.</p>

<h2>Bottom line</h2>

<p>Analytics isn't about charts — it's about no longer guessing: which ads bring customers, where the site loses requests and what to fix first. Metrica with Session Replay covers these questions for most small sites in Russia, and goals turn traffic into a clear result.</p>

<p>Every site I build has Metrica with goals on every button and form from day one — along with a cookie notice and a privacy policy. See <a href="/en/services/sites">how I build websites</a> or <a href="/en/contact">drop me a line</a> — I'll suggest what to look at in your site's analytics.</p>

<p><small>Sources: <a href="https://yandex.ru/support/metrica/en/" target="_blank" rel="noopener noreferrer">Yandex Metrica help</a>, <a href="https://yandex.ru/legal/metrica_termsofuse/" target="_blank" rel="noopener noreferrer">Metrica terms of use</a>, <a href="https://support.google.com/analytics/" target="_blank" rel="noopener noreferrer">Google Analytics help</a>, 152-FZ and the Russian Code of Administrative Offences. Data as of October 2026.</small></p>
`,
    },
  },
};
