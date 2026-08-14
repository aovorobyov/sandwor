import type { ArticleDraft } from './articles.types';

/**
 * Коммерческая статья под запрос «сколько стоит сайт для кофейни / малого бизнеса».
 * BOFU: горячий транзакционный интент, ведёт на страницу услуги и в контакты.
 */
export const priceCafeWebsite: ArticleDraft = {
  slug: 'skolko-stoit-sajt-dlya-kofejni',
  date: '2026-06-20',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80',
  translations: {
    ru: {
      title: 'Сколько стоит сайт для кофейни в 2026 году',
      tag: 'Цены',
      excerpt:
        'Честная вилка цен на сайт для кофейни — от 30 до 300 тысяч. Разбираем, из чего складывается смета, за что вы платите на самом деле и на чём экономить нельзя.',
      description:
        'Сколько стоит сайт для кофейни в 2026 году: реальная вилка цен, из чего складывается смета, разница между Tilda и кастомной разработкой и на чём не стоит экономить.',
      body: `
<p>Представьте: вы открыли кофейню, всё готово — зерно закуплено, бариста обучен, вывеска горит. Осталась «мелочь» — сайт. Вы пишете трём разработчикам одно и то же сообщение и получаете три ответа: <strong>35 000</strong>, <strong>120 000</strong> и <strong>280 000 ₽</strong>. За одну и ту же, казалось бы, задачу. И вот вы сидите, смотрите на эти цифры и не понимаете: вас разводят, экономят на вас или просто говорят на разных языках?</p>

<p>Разберёмся, почему разброс такой дикий, за что вы платите на самом деле и как понять, в какую часть вилки попадаете именно вы. Без маркетингового тумана — так, как я объясняю это своим клиентам на первом созвоне.</p>

<blockquote>Сайт — это не расход, а инструмент. Правильный вопрос не «сколько он стоит», а «сколько он вернёт». Кофейне с доставкой сайт окупается за месяц, а красивой визитке без задач — никогда.</blockquote>

<h2>Почему одна цифра невозможна</h2>

<p>Когда вам называют цену <em>до</em> разговора о задаче — это тревожный знак, а не удобство. «Сайт для кофейни» звучит как что-то одно, но под этими словами прячутся совершенно разные проекты.</p>

<p>Одному нужна страница-визитка: адрес, часы, пара красивых фото и телефон. Другому — сайт с меню, доставкой, оплатой картой и интеграцией с системой учёта. Третьему — сеть из пяти точек, у каждой своя страница, своя акция, свой Instagram. Это как спросить «сколько стоит машина»: и «Жигули», и внедорожник — машины, но говорить об одной цене бессмысленно.</p>

<p>Поэтому честный разработчик сначала задаёт вопросы, а уже потом называет вилку. И чем конкретнее вы опишете задачу, тем точнее будет ответ.</p>

<h3>Три кофейни — три разных сайта</h3>

<p>Чтобы это перестало быть абстракцией, посмотрим на три реальных типажа. Скорее всего, вы узнаете в одном из них себя.</p>

<p><strong>Кофейня «у дома».</strong> Живёт на потоке с улицы и постоянниках. Задача сайта — чтобы человек нашёл вас в карте, увидел часы и цены, убедился, что тут уютно. Этого хватает лендинга на конструкторе за <em>30–50 тысяч</em>. Всё, что дороже, — деньги в воздух.</p>

<p><strong>Кофейня с доставкой.</strong> Тут сайт уже работает как касса: меню, корзина, форма заказа, оплата. Каждая лишняя секунда загрузки и каждый неудобный шаг — это потерянный заказ. Бюджет — <em>80–150 тысяч</em>, и здесь экономить на удобстве нельзя, потому что оно прямо конвертируется в выручку.</p>

<p><strong>Сеть из нескольких точек.</strong> Разные адреса, разные акции, единый бренд, часто — программа лояльности. Это уже полноценная разработка от <em>150 тысяч</em> и выше, где вы платите не за страницу, а за систему, которая масштабируется вместе с вами.</p>

<h2>Из чего складывается смета</h2>

<p>Практически любой сайт — хоть за 30, хоть за 300 тысяч — состоит из четырёх слагаемых. Как только вы их понимаете, любое коммерческое предложение становится читаемым, а подрядчики — сравнимыми между собой.</p>

<ul>
  <li><strong>Дизайн.</strong> От готового шаблона, который слегка подкрашивают под ваш логотип, до индивидуальной отрисовки каждого экрана. Именно здесь чаще всего и прячется разница между «35» и «280».</li>
  <li><strong>Вёрстка и разработка.</strong> Превращение картинки-макета в работающий сайт, который одинаково хорошо открывается на iPhone бабушки и на огромном мониторе.</li>
  <li><strong>Контент.</strong> Тексты, фотографии, меню, описания. Многие забывают заложить это в бюджет — и потом две недели проект стоит, потому что «не готовы фотки».</li>
  <li><strong>Инфраструктура.</strong> Домен, хостинг, подключение аналитики, форм и оплаты. Небольшие, но обязательные расходы, о которых узнают в последний момент.</li>
</ul>

<p>Запомните эту четвёрку. Когда получите КП, разложите цену по этим полкам — и сразу увидите, где подрядчик сэкономил на вас, а где, наоборот, продаёт лишнее.</p>

<h3>Пример реальной сметы для кофейни</h3>

<p>Вот как выглядит один и тот же набор задач в двух подходах — на конструкторе Tilda и в кастомной разработке. Цифры — усреднённые по рынку на 2026 год, но порядок вы почувствуете.</p>

<table>
  <thead>
    <tr>
      <th>Что входит</th>
      <th>Tilda</th>
      <th>Кастом</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Лендинг (1 страница)</td>
      <td>от 30 000 ₽</td>
      <td>от 80 000 ₽</td>
    </tr>
    <tr>
      <td>Меню с фото и ценами</td>
      <td>включено</td>
      <td>от 25 000 ₽</td>
    </tr>
    <tr>
      <td>Форма брони / доставки</td>
      <td>от 10 000 ₽</td>
      <td>от 40 000 ₽</td>
    </tr>
    <tr>
      <td>Срок запуска</td>
      <td>1–2 недели</td>
      <td>3–6 недель</td>
    </tr>
  </tbody>
</table>

<p>Разница в цене — это не «наглость кастомщика». Это разница между «собрать из готовых блоков» и «сшить костюм по вашим меркам». Оба варианта могут быть правильными — зависит от того, что вам на самом деле нужно. Об этом у меня есть <a href="/blog/tilda-ili-kastomnaya-razrabotka">отдельный разбор Tilda против кастома</a>, если хотите копнуть глубже.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80" alt="Интерьер кофейни с посетителями" />
  <figcaption>Сайту кофейни важнее всего три вещи: меню, адрес и кнопка связи. Всё остальное — приятные дополнения, за которые часто переплачивают.</figcaption>
</figure>

<h2>За что вы платите на самом деле</h2>

<p>Секрет, который редко проговаривают вслух: в разработке вы платите не за строчки кода и не за красивые пиксели. Вы платите за <strong>снятую с себя головную боль</strong>.</p>

<p>Дешёвый исполнитель отдаёт вам сайт — и на этом всё. Дорогой берёт на себя вопросы, о которых вы даже не думали: а что будет, когда меню поменяется? А если хлынет поток заказов через форму — они точно все дойдут? А сайт быстро грузится по мобильному интернету в подвальной кофейне, где две палки сети? Именно эти «а что если» и отделяют цену в 35 тысяч от цены в 150.</p>

<blockquote>Дешёвый сайт часто оказывается самым дорогим. Вы платите дважды: сначала за то, что сделали кое-как, потом — тому, кто это переделывает с нуля.</blockquote>

<h2>На чём можно сэкономить смело</h2>

<p>Хорошая новость: экономить <em>можно</em> — и без потери качества. Просто делать это надо с умом, отрезая объём, а не суть.</p>

<ol>
  <li><strong>Начните с одной страницы.</strong> Хороший лендинг закрывает 90% задач кофейни: меню, адрес, часы работы, кнопка заказа. Десять страниц «чтобы было солиднее» никто не читает — люди приходят за адресом и ценой на капучино.</li>
  <li><strong>Снимайте на телефон.</strong> Современный смартфон при дневном свете у окна даёт фотографии, которые продают лучше любого стока. Живой круассан в вашей витрине честнее, чем идеальный чужой из фотобанка.</li>
  <li><strong>Не платите за будущее авансом.</strong> Личный кабинет, программа лояльности, онлайн-оплата — это следующий этап, когда пойдёт трафик. На старте они чаще всего простаивают и просто утяжеляют смету.</li>
</ol>

<h2>А на чём экономить нельзя</h2>

<p>И есть обратная сторона — вещи, попытка сэкономить на которых бьёт ровно по тому, ради чего вы вообще заказывали сайт. Их три.</p>

<p><strong>Скорость загрузки.</strong> Половина посетителей уходит, если страница думает дольше трёх секунд. Медленный сайт — это дырявое ведро: вы льёте в него рекламный бюджет, а он утекает.</p>

<p><strong>Мобильная версия.</strong> В кофейню люди ищут дорогу с телефона, стоя на улице под дождём. Если сайт на смартфоне разваливается — вы потеряли гостя ещё до того, как он дошёл до двери.</p>

<p><strong>Аналитика.</strong> Без неё вы работаете вслепую и не знаете, откуда приходят гости и что их отпугивает. Настройка счётчиков стоит копейки, а данные, которые они дают, экономят потом десятки тысяч на рекламе.</p>

<blockquote>Правило простое: экономьте на объёме, а не на качестве. Одна быстрая страница, которая работает, лучше десяти медленных, которые красиво умирают на телефоне.</blockquote>

<h2>Скрытые расходы, о которых молчат</h2>

<p>Ещё одна причина, по которой «сайт за 30 тысяч» превращается в «сайт за 60», — расходы, которые не попали в первое КП. Они не всегда от жадности: часто их просто забывают проговорить. Держите их в голове, когда сравниваете предложения:</p>

<ul>
  <li><strong>Домен и хостинг.</strong> Небольшие, но ежегодные. Уточните, кто платит и на кого всё оформлено — это важно не только для денег (см. заметку про доступы в статье о выборе разработчика).</li>
  <li><strong>Правки после запуска.</strong> Мир не замирает в день сдачи сайта: меняются цены, появляются акции. Спросите заранее, сколько стоит час доработок и входят ли мелкие правки в первый месяц.</li>
  <li><strong>Контент.</strong> Если тексты и фото готовите не вы, это отдельная строка. Хороший копирайтер и фотограф стоят денег — и часто окупаются лучше, чем лишний блок на сайте.</li>
</ul>

<blockquote>Просите смету, где видно каждую строку, а не одну итоговую цифру. Прозрачная смета — это не придирка, а первый признак того, что с подрядчиком можно иметь дело.</blockquote>

<h2>Считаем не чек, а окупаемость</h2>

<p>Давайте на пальцах. Средний чек в кофейне — скажем, 400 ₽. Если сайт с формой доставки приносит хотя бы пять заказов в день, это 60 тысяч в месяц выручки. Сайт за 120 тысяч окупается меньше чем за два месяца — а дальше работает бесплатно, годами, без зарплаты и выходных.</p>

<p>Вот почему я всегда прошу клиента думать не о цене, а о задаче. Сайт-визитка за 30 тысяч, который просто «есть», — это часто выброшенные деньги. А сайт за 120 тысяч, который каждый день собирает заказы, — это сотрудник, которому вы заплатили один раз.</p>

<hr />

<h2>Что дальше</h2>

<p>Если хотите понять, в какую сумму обойдётся именно ваш проект — не абстрактная вилка, а конкретная цифра под вашу задачу — посмотрите <a href="/websites">форматы и тарифы</a> или сразу <a href="/contact">напишите мне</a>. Расскажите про кофейню в двух словах, а я честно скажу, что реально сделать в вашем бюджете и на чём вам точно не стоит переплачивать.</p>
`,
    },
    en: {
      title: 'How Much a Café Website Costs in 2026',
      tag: 'Pricing',
      excerpt:
        'An honest price range for a café website — from a few hundred to several thousand dollars. What the estimate is really made of, what you actually pay for, and where cutting corners will cost you.',
      description:
        'How much a café website costs in 2026: the real price range, what makes up the estimate, the difference between a website builder and custom development, and where not to save.',
      body: `
<p>Picture this: you've opened a café, everything's ready — the beans are in, the barista is trained, the sign is lit. One "small" thing left — a website. You send the same message to three developers and get back three answers: <strong>$400</strong>, <strong>$1,500</strong> and <strong>$3,500</strong>. For what looks like the exact same job. And there you sit, staring at those numbers, unable to tell whether you're being ripped off, cared for, or simply spoken to in three different languages.</p>

<p>Let's work out why the spread is so wild, what you're actually paying for, and how to figure out which part of the range is yours. No marketing fog — just the way I explain it to my clients on the first call.</p>

<blockquote>A website isn't a cost, it's a tool. The right question isn't "how much does it cost" but "how much will it bring back". For a café with delivery it pays for itself in a month; a pretty business card with no job to do never will.</blockquote>

<h2>Why a single number is impossible</h2>

<p>When someone quotes a price <em>before</em> talking about the task, that's a warning sign, not convenience. "A café website" sounds like one thing, but those words hide completely different projects.</p>

<p>One person needs a business card: address, hours, a couple of nice photos, a phone number. Another needs a site with a menu, delivery, card payments and an integration with their POS. A third runs five locations, each with its own page, its own promo, its own Instagram. It's like asking "how much does a car cost": a compact hatchback and a full-size SUV are both cars, but talking about one price is meaningless.</p>

<p>That's why an honest developer asks questions first and quotes a range second. And the more concretely you describe the task, the sharper the answer.</p>

<h3>Three cafés — three different websites</h3>

<p>To make this less abstract, look at three real profiles. Chances are you'll recognise yourself in one of them.</p>

<p><strong>The neighbourhood café.</strong> Lives on foot traffic and regulars. The site's job is simple: help people find you on the map, see your hours and prices, and sense that it's cosy inside. A landing page on a builder covers that. Anything pricier is money into thin air.</p>

<p><strong>The café with delivery.</strong> Here the site works like a cash register: menu, cart, order form, payment. Every extra second of loading and every awkward step is a lost order. This is the mid tier — and it's exactly where you must not skimp on usability, because usability converts straight into revenue.</p>

<p><strong>The multi-location chain.</strong> Different addresses, different promos, one brand, often a loyalty programme. That's already full-blown development, where you pay not for a page but for a system that scales along with you.</p>

<h2>What the estimate is made of</h2>

<p>Almost any website — whether it's the cheap one or the expensive one — comes down to four parts. Once you understand them, any proposal becomes readable and any two contractors become comparable.</p>

<ul>
  <li><strong>Design.</strong> From a ready-made template lightly tinted to match your logo, all the way to every screen drawn from scratch. This is where the gap between the cheap quote and the expensive one usually hides.</li>
  <li><strong>Build and development.</strong> Turning a static mockup into a working site that opens just as well on your grandmother's iPhone as on a huge monitor.</li>
  <li><strong>Content.</strong> Text, photos, menu, descriptions. Plenty of people forget to budget for it — and then the project stalls for two weeks because "the photos aren't ready".</li>
  <li><strong>Infrastructure.</strong> Domain, hosting, hooking up analytics, forms and payments. Small but unavoidable costs that tend to surface at the very last moment.</li>
</ul>

<p>Memorise this quartet. When you get a proposal, sort the price onto these four shelves — and you'll immediately see where the contractor cut a corner on you and where, instead, they're selling you extras.</p>

<h3>A real café estimate</h3>

<p>Here's the same set of tasks in two approaches — on the Tilda website builder and in custom development. The figures are rough market averages for 2026, but you'll feel the proportions.</p>

<table>
  <thead>
    <tr>
      <th>What's included</th>
      <th>Builder</th>
      <th>Custom</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Landing page (1 page)</td>
      <td>from $400</td>
      <td>from $1,000</td>
    </tr>
    <tr>
      <td>Menu with photos and prices</td>
      <td>included</td>
      <td>from $300</td>
    </tr>
    <tr>
      <td>Booking / delivery form</td>
      <td>from $120</td>
      <td>from $500</td>
    </tr>
    <tr>
      <td>Time to launch</td>
      <td>1–2 weeks</td>
      <td>3–6 weeks</td>
    </tr>
  </tbody>
</table>

<p>The price gap isn't "the custom guy being greedy". It's the difference between "assembled from ready blocks" and "tailored to your measurements". Both can be the right call — it depends on what you actually need. I've written a <a href="/en/blog/tilda-ili-kastomnaya-razrabotka">separate breakdown of builder versus custom</a> if you want to dig deeper.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80" alt="Café interior with guests" />
  <figcaption>A café site cares about three things above all: the menu, the address, and a button to get in touch. Everything else is a nice extra people often overpay for.</figcaption>
</figure>

<h2>What you're really paying for</h2>

<p>Here's the secret rarely said out loud: in development you're not paying for lines of code or pretty pixels. You're paying for <strong>a headache lifted off your shoulders</strong>.</p>

<p>A cheap contractor hands you a site and that's it. An expensive one takes on the questions you never even thought of: what happens when the menu changes? If orders suddenly pour in through the form, will every one of them actually arrive? Does the site load fast on mobile data in a basement café with two bars of signal? Those "what ifs" are exactly what separate the cheap quote from the mid one.</p>

<blockquote>A cheap website often turns out the most expensive. You pay twice: first for the thing done sloppily, then for the person who rebuilds it from scratch.</blockquote>

<h2>Where you can safely save</h2>

<p>Good news: you <em>can</em> save — without losing quality. You just have to do it wisely, cutting scope rather than substance.</p>

<ol>
  <li><strong>Start with one page.</strong> A good landing page covers 90% of a café's needs: menu, address, hours, an order button. Nobody reads the ten pages added "to look more solid" — people come for the address and the price of a cappuccino.</li>
  <li><strong>Shoot on your phone.</strong> A modern smartphone in daylight by the window gives photos that sell better than any stock library. A real croissant in your own display case is more honest than a perfect stranger's from a photo bank.</li>
  <li><strong>Don't pre-pay for the future.</strong> Customer accounts, loyalty programmes, online payments — that's the next stage, once traffic starts flowing. Early on they mostly sit idle and just pad the estimate.</li>
</ol>

<h2>And where you must not save</h2>

<p>There's a flip side — things where trying to save hits exactly what you ordered the site for in the first place. There are three of them.</p>

<p><strong>Loading speed.</strong> Half your visitors leave if the page takes longer than three seconds to think. A slow site is a leaky bucket: you pour ad budget in and it drains right out.</p>

<p><strong>The mobile version.</strong> People look up directions to a café on their phone, standing in the street in the rain. If the site falls apart on a smartphone, you've lost the guest before they ever reached the door.</p>

<p><strong>Analytics.</strong> Without it you're working blind, with no idea where guests come from or what scares them off. Setting up tracking costs pennies, and the data it gives later saves you a fortune on advertising.</p>

<blockquote>The rule is simple: save on scope, not on quality. One fast page that works beats ten slow ones that die beautifully on a phone.</blockquote>

<h2>The hidden costs nobody mentions</h2>

<p>Another reason "the cheap website" turns into a not-so-cheap one is the costs that never made it into the first proposal. It's not always greed — often they simply forget to spell them out. Keep them in mind when comparing offers:</p>

<ul>
  <li><strong>Domain and hosting.</strong> Small, but annual. Ask who pays and in whose name everything is registered — this matters beyond money (see the note on access in the article about choosing a developer).</li>
  <li><strong>Edits after launch.</strong> The world doesn't freeze on delivery day: prices change, promos appear. Ask upfront what an hour of tweaks costs and whether small edits are included in the first month.</li>
  <li><strong>Content.</strong> If you're not writing the text and shooting the photos yourself, that's a separate line item. A good copywriter and photographer cost money — and often pay off better than one more block on the site.</li>
</ul>

<blockquote>Ask for an estimate where every line is visible, not a single bottom-line figure. A transparent estimate isn't nit-picking — it's the first sign the contractor is worth dealing with.</blockquote>

<h2>Count the payback, not the invoice</h2>

<p>Let's do the math. Say the average café order is $5. If a site with a delivery form brings in just five orders a day, that's about $750 a month in revenue. A $1,500 site pays for itself in two months — and after that it works for free, for years, with no salary and no days off.</p>

<p>That's why I always ask a client to think about the task, not the price. A business-card site that just "exists" is often money thrown away. A site that collects orders every single day is an employee you paid for exactly once.</p>

<hr />

<h2>What's next</h2>

<p>If you want to understand what your specific project would cost — not an abstract range but a concrete number for your task — take a look at <a href="/en/websites">the formats and pricing</a> or just <a href="/en/contact">drop me a line</a>. Tell me about your café in a couple of sentences and I'll honestly say what's realistic within your budget, and where you definitely shouldn't overpay.</p>
`,
    },
  },
};
