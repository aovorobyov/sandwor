import type { ArticleDraft } from './articles.types';

/**
 * Коммерческая статья под запрос «Tilda или кастомная разработка».
 * MFU→BOFU: помогает выбрать подход и снимает возражение «а не переплачу ли».
 */
export const tildaVsCustom: ArticleDraft = {
  slug: 'tilda-ili-kastomnaya-razrabotka',
  date: '2026-06-27',
  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
  translations: {
    ru: {
      title: 'Tilda или кастомная разработка: что выбрать',
      tag: 'Выбор',
      excerpt:
        'Конструктор или код с нуля — вечный спор без победителя. Разбираем по-честному: где Tilda спасает бюджет, где превращается в клетку и как посчитать реальную стоимость на три года вперёд.',
      description:
        'Tilda или кастомная разработка сайта: честное сравнение по цене, срокам, гибкости и поддержке. Помогаем понять, какой подход подходит вашему бизнесу.',
      body: `
<p>В интернете этот спор идёт с религиозным жаром. Одни морщатся при слове «конструктор» — мол, несерьёзно, для тех, кто не умеет в код. Другие закатывают глаза на кастом — «переплата за воздух, тщеславие разработчиков». Оба лагеря по-своему правы и оба одинаково вводят в заблуждение.</p>

<p>Потому что Tilda и кастомная разработка — это не «хорошо» и «плохо». Это <strong>отвёртка и шуруповёрт</strong>. Оба закручивают шурупы. Но если вам надо повесить одну полку — тащить перфоратор глупо, а если вы строите дом — отвёрткой вы просто не справитесь. Весь вопрос в том, что за задача перед вами. Давайте разберёмся честно, без болельщицких шарфов.</p>

<h2>Сначала — о чём вообще речь</h2>

<p>Если совсем коротко и без жаргона: <strong>Tilda — это конструктор.</strong> Вы (или ваш разработчик) собираете сайт из готовых блоков, как из лего: сюда — заголовок, сюда — галерею, сюда — форму. Менять текст и картинки потом можно самому, мышкой, без единой строчки кода.</p>

<p><strong>Кастомная разработка — это когда сайт пишут с нуля</strong> под вашу конкретную задачу. Ограничений почти нет: можно сделать что угодно, как угодно и с какой угодно логикой. Но и порог входа выше — тут уже нужен разработчик и на старте, и потом.</p>

<blockquote>Хороший подрядчик подбирает инструмент под задачу клиента. Плохой — подгоняет задачу под инструмент, которым ему удобнее работать. Разница видна на первом же созвоне.</blockquote>

<h2>Когда Tilda — это правильный выбор</h2>

<p>Признаюсь честно: я сам предлагаю Tilda чаще, чем можно ожидать от человека, который умеет писать код с нуля. Потому что для целого класса задач это не компромисс, а лучшее решение. Вот когда я говорю клиенту «вам не нужен кастом»:</p>

<ul>
  <li><strong>Нужен лендинг или визитка, и запуск «на вчера».</strong> Tilda поднимает сайт за дни, а не за недели. Когда вы завтра открываетесь и вам нужна страница <em>сейчас</em>, это решает.</li>
  <li><strong>Вы хотите менять всё сами.</strong> Поменялись цены, добавилась акция, обновилось меню — вы заходите и правите мышкой за пять минут, не дёргая разработчика и не оплачивая его час.</li>
  <li><strong>Бюджет ограничен, а логика стандартная.</strong> Услуги, меню, контакты, форма заявки — Tilda всё это умеет из коробки. Платить за кастом ради стандартных вещей — как заказывать костюм на пошив, чтобы носить его дома вместо халата.</li>
</ul>

<h3>А когда без кастома не обойтись</h3>

<p>Но есть черта, за которой конструктор начинает мешать. Он ведь силён именно готовыми блоками — а всё, что за их пределами, приходится «допиливать костылями», и в какой-то момент это становится дороже и хуже, чем сделать по-человечески. Вот сигналы, что вам туда:</p>

<ol>
  <li><strong>Нестандартная логика.</strong> Калькулятор стоимости, личный кабинет, интеграция с вашей CRM или системой складского учёта. Всё, что сложнее «отправить форму на почту», конструктор тянет со скрипом.</li>
  <li><strong>Скорость и SEO на объёме.</strong> Если у вас сотни страниц и вы всерьёз бьётесь за верхние позиции в поиске, кастом даёт контроль над каждой миллисекундой загрузки. Tilda — нет.</li>
  <li><strong>Дизайн, который должен выделять.</strong> Если ваш бренд — это про уникальность, а сайт узнаётся как «сделано на конструкторе», вы теряете именно то, за что боретесь.</li>
</ol>

<figure>
  <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Рабочее место дизайнера с макетами интерфейса" />
  <figcaption>Индивидуальный дизайн заметен в мелочах — там, где шаблон вынуждает пойти на компромисс, а вы соглашаетесь, потому что «и так сойдёт».</figcaption>
</figure>

<h2>Сравнение по-честному</h2>

<p>Свёл ключевые различия в одну таблицу — чтобы держать перед глазами. Только не читайте её как «где больше плюсов, тот и победил»: у разных бизнесов вес у этих строк совершенно разный.</p>

<table>
  <thead>
    <tr>
      <th>Параметр</th>
      <th>Tilda</th>
      <th>Кастом</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Цена старта</td>
      <td>Ниже</td>
      <td>Выше</td>
    </tr>
    <tr>
      <td>Срок запуска</td>
      <td>1–2 недели</td>
      <td>3–6 недель и больше</td>
    </tr>
    <tr>
      <td>Правки без разработчика</td>
      <td>Да, самому</td>
      <td>Зависит от CMS</td>
    </tr>
    <tr>
      <td>Гибкость и уникальность</td>
      <td>Ограничена блоками</td>
      <td>Практически без границ</td>
    </tr>
    <tr>
      <td>Ежемесячная подписка</td>
      <td>Есть</td>
      <td>Нет (только хостинг)</td>
    </tr>
    <tr>
      <td>Потолок роста</td>
      <td>Упрётесь на сложном</td>
      <td>Растёт вместе с вами</td>
    </tr>
  </tbody>
</table>

<h2>Три мифа, которые мешают выбрать</h2>

<p>Вокруг этой темы налипло столько полуправды, что она мешает думать трезво. Разберу три самых живучих мифа — по одному из каждого лагеря.</p>

<p><strong>«На Tilda нельзя продвинуться в поиске».</strong> Можно. Небольшой сайт кофейни или услуги на Tilda прекрасно индексируется и выходит в топ по своим запросам. Кастом даёт преимущество не «вообще», а на объёме в сотни страниц и в жёсткой конкурентной нише — там, где счёт идёт на десятые доли секунды загрузки.</p>

<p><strong>«Кастом — это всегда дорого и долго».</strong> Не всегда. Простой кастомный лендинг у толкового разработчика делается быстрее, чем кажется. «Дорого и долго» начинается там, где реально сложная логика, — а её на конструкторе вы бы всё равно не собрали.</p>

<p><strong>«Конструктор — для тех, кто не умеет».</strong> Наоборот: умение выбрать конструктор там, где он уместен, — признак опыта. Писать с нуля лендинг-визитку, который Tilda собрала бы за два дня, — это не мастерство, а неуважение к бюджету клиента.</p>

<h2>Ловушка, в которую попадают почти все</h2>

<p>Самая частая ошибка при выборе — смотреть только на чек за запуск. А это лишь половина картины, причём меньшая. Настоящая цена сайта складывается за годы владения, и вот тут таблица любит переворачиваться с ног на голову.</p>

<p>У Tilda есть <em>ежемесячная подписка</em> — небольшая, но пожизненная. Перестанете платить — сайт погаснет. Зато правки бесплатны: вы вносите их сами. У кастома всё наоборот: подписки нет, платите только за хостинг (копейки), но за каждой доработкой идёте к разработчику — и это его время, то есть деньги.</p>

<p>Посчитайте на три года вперёд. Если вы правите сайт раз в полгода — кастом почти наверняка выйдет дешевле в сумме. Если вы меняете акции каждую неделю и любите всё делать сами — Tilda сэкономит вам и деньги, и нервы. Дело не в том, что дешевле «вообще», а в том, что дешевле <strong>для вашего ритма</strong>.</p>

<blockquote>Tilda дешевле на старте, кастом — предсказуемее в долгую. Правильный ответ прячется не в прайсе, а в ответе на вопрос: как часто и насколько глубоко вы планируете менять сайт?</blockquote>

<h2>Как это выглядит на практике</h2>

<p>Чтобы теория ожила, вот два коротких сюжета из работы — собирательных, но узнаваемых.</p>

<p><strong>Сюжет первый.</strong> Пекарня хотела «красивый сайт с индивидуальным дизайном» и была готова на кастом. Но когда мы разложили задачу, выяснилось: меняют витрину и цены они чуть ли не через день, а сам сайт — это по сути витрина с адресом и формой заказа. Кастом означал бы, что за каждой правкой они бегут ко мне. Собрали на Tilda — и теперь владелица правит всё сама за пять минут между замесами. Кастом тут был бы красивой, но золотой клеткой.</p>

<p><strong>Сюжет второй.</strong> Сервис по подбору туров пришёл «за лендингом на конструкторе, чтоб подешевле». Но в задаче сидел калькулятор стоимости с десятком параметров и личный кабинет клиента. На Tilda это превратилось бы в гору костылей, которые ломались бы от каждого чиха. Сделали кастом — и он спокойно растёт вместе с бизнесом. Тут экономия на старте обернулась бы вечной болью.</p>

<p>Мораль обоих сюжетов одна: правильный инструмент виден не из названия задачи, а из её внутренностей. Поэтому и важно сначала разобрать задачу, а уже потом спорить про инструмент.</p>

<h2>А можно ли передумать потом?</h2>

<p>Частый страх: «выберу Tilda, а через год перерасту её — и всё придётся выкидывать». Отвечу как есть: да, при переезде с конструктора на кастом сайт по сути делается заново. Дизайн можно взять за основу, тексты и фото — перенести, но саму сборку — с нуля.</p>

<p>Звучит грустно, но на практике это часто нормальный путь. Начать на Tilda, проверить гипотезу, поймать первый спрос — а уже потом, на понятных цифрах, вложиться в кастом. Это не «выброшенные деньги», а <em>дешёвый билет на первую проверку идеи</em>. Плохо — только когда за кастом платят сразу, ещё не зная, полетит ли вообще бизнес.</p>

<h2>Как выбрать за тридцать секунд</h2>

<p>Если после всего этого голова кругом — вот мой личный экспресс-тест. Честно ответьте себе на три вопроса.</p>

<ol>
  <li><strong>Как часто вы будете сами менять сайт?</strong> Каждую неделю — сильный аргумент за Tilda. Пару раз в год — перевешивает кастом.</li>
  <li><strong>Есть ли в задаче что-то нестандартное?</strong> Калькулятор, личный кабинет, интеграция — почти всегда кастом. Услуги-меню-контакты-форма — конструктор справится.</li>
  <li><strong>Насколько важна уникальность?</strong> Если сайт — часть бренда и должен выделять — кастом. Если главное «чтобы было, работало и нашли в поиске» — Tilda.</li>
</ol>

<p>Два ответа из трёх в одну сторону — и выбор, скорее всего, уже сделан. Ну а если ответы разбегаются — это как раз тот случай, когда стоит обсудить с человеком, а не гадать.</p>

<hr />

<h2>Что дальше</h2>

<p>Не уверены, что подходит вам? Это нормально — со стороны разницу оценить трудно. Я работаю и с Tilda, и с кастомом, и мне без разницы, что вы выберете, поэтому на созвоне скажу честно: где вы переплатите за кастом, а где сэкономите на Tilda и потом об этом пожалеете. Посмотрите <a href="/websites">форматы работы</a> или <a href="/contact">напишите мне</a> с парой слов о задаче.</p>
`,
    },
    en: {
      title: 'Website Builder or Custom Development: Which to Choose',
      tag: 'Choosing',
      excerpt:
        'A builder or code from scratch — an eternal argument with no winner. An honest breakdown: where a builder saves your budget, where it turns into a cage, and how to count the real cost three years out.',
      description:
        'Website builder or custom development: an honest comparison by price, timeline, flexibility and support. Helping you understand which approach fits your business.',
      body: `
<p>Online, this argument is waged with religious fervour. Some wince at the word "builder" — not serious, they say, for people who can't code. Others roll their eyes at custom — "overpaying for air, developer vanity". Both camps are right in their own way, and both mislead you equally.</p>

<p>Because a builder and custom development aren't "good" and "bad". They're <strong>a screwdriver and a power drill</strong>. Both drive screws. But if you just need to hang one shelf, hauling out the drill is silly — and if you're building a house, the screwdriver simply won't cut it. The whole question is what task is in front of you. Let's sort it out honestly, without the team scarves.</p>

<h2>First — what are we even talking about</h2>

<p>Short and jargon-free: <strong>a builder (like Tilda) is a construction kit.</strong> You (or your developer) assemble the site from ready blocks, like Lego: a heading here, a gallery there, a form over there. Text and images you can change yourself afterwards, with the mouse, without a single line of code.</p>

<p><strong>Custom development is when the site is written from scratch</strong> for your specific task. There are almost no limits: you can build anything, any way, with any logic. But the barrier to entry is higher — you need a developer both at the start and later on.</p>

<blockquote>A good contractor picks the tool to fit the client's task. A bad one bends the task to fit the tool they'd rather work with. The difference shows on the very first call.</blockquote>

<h2>When a builder is the right choice</h2>

<p>Honest confession: I recommend builders more often than you'd expect from someone who can write code from scratch. Because for a whole class of tasks it isn't a compromise — it's the best solution. Here's when I tell a client "you don't need custom":</p>

<ul>
  <li><strong>You need a landing page or business card, and a launch by yesterday.</strong> A builder gets a site up in days, not weeks. When you open tomorrow and need a page <em>now</em>, that settles it.</li>
  <li><strong>You want to change everything yourself.</strong> Prices moved, a promo appeared, the menu updated — you log in and edit it with the mouse in five minutes, without bothering a developer or paying for their hour.</li>
  <li><strong>Budget is tight and the logic is standard.</strong> Services, menu, contacts, an enquiry form — a builder does all of that out of the box. Paying for custom to get standard things is like ordering a bespoke suit to wear at home instead of a dressing gown.</li>
</ul>

<h3>And when there's no avoiding custom</h3>

<p>But there's a line past which a builder starts to get in the way. Its strength is precisely the ready blocks — and everything beyond them has to be "bolted on with workarounds", until at some point that becomes more expensive and worse than doing it properly. Here are the signs you're headed there:</p>

<ol>
  <li><strong>Non-standard logic.</strong> A pricing calculator, a customer account, an integration with your CRM or inventory system. Anything more complex than "email this form" a builder handles with a groan.</li>
  <li><strong>Speed and SEO at scale.</strong> If you have hundreds of pages and you're seriously fighting for top search positions, custom gives you control over every millisecond of load time. A builder doesn't.</li>
  <li><strong>A design that has to stand out.</strong> If your brand is about being distinctive, yet the site is recognisably "made on a builder", you lose the very thing you're fighting for.</li>
</ol>

<figure>
  <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Designer's desk with interface mockups" />
  <figcaption>A bespoke design shows in the small things — where a template forces a compromise and you accept it, because "it'll do".</figcaption>
</figure>

<h2>An honest comparison</h2>

<p>I've boiled the key differences into one table to keep in front of you. Just don't read it as "whoever has more pluses wins": for different businesses these rows carry completely different weight.</p>

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Builder</th>
      <th>Custom</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Starting price</td>
      <td>Lower</td>
      <td>Higher</td>
    </tr>
    <tr>
      <td>Time to launch</td>
      <td>1–2 weeks</td>
      <td>3–6 weeks and up</td>
    </tr>
    <tr>
      <td>Edits without a developer</td>
      <td>Yes, yourself</td>
      <td>Depends on the CMS</td>
    </tr>
    <tr>
      <td>Flexibility and uniqueness</td>
      <td>Limited to blocks</td>
      <td>Practically unbounded</td>
    </tr>
    <tr>
      <td>Monthly subscription</td>
      <td>Yes</td>
      <td>No (hosting only)</td>
    </tr>
    <tr>
      <td>Growth ceiling</td>
      <td>You'll hit it on the complex stuff</td>
      <td>Grows along with you</td>
    </tr>
  </tbody>
</table>

<h2>Three myths that get in the way of choosing</h2>

<p>So much half-truth has caked around this topic that it stops you thinking clearly. Let me take on the three most stubborn myths — one from each camp.</p>

<p><strong>"You can't rank in search on a builder."</strong> You can. A small café or services site on a builder indexes perfectly well and reaches the top for its own queries. Custom gives an edge not "in general" but at the scale of hundreds of pages and in a fiercely competitive niche — where the game is won in tenths of a second of load time.</p>

<p><strong>"Custom is always expensive and slow."</strong> Not always. A simple custom landing page from a capable developer comes together faster than you'd think. "Expensive and slow" begins where the logic is genuinely complex — and that's something you couldn't have assembled on a builder anyway.</p>

<p><strong>"A builder is for people who can't."</strong> The opposite: knowing to pick a builder where it fits is a sign of experience. Writing a business-card landing page from scratch when a builder would assemble it in two days isn't craftsmanship — it's disrespect for the client's budget.</p>

<h2>The trap almost everyone falls into</h2>

<p>The most common mistake when choosing is to look only at the launch invoice. And that's just half the picture — the smaller half. A site's real cost accrues over years of ownership, and this is exactly where the table loves to flip upside down.</p>

<p>A builder has a <em>monthly subscription</em> — small, but for life. Stop paying and the site goes dark. In exchange, edits are free: you make them yourself. With custom it's the other way around: no subscription, you pay only for hosting (pennies), but for every change you go to a developer — and that's their time, which is money.</p>

<p>Count it out three years ahead. If you edit the site once every six months, custom will almost certainly work out cheaper overall. If you swap promos every week and love doing everything yourself, a builder saves you both money and nerves. It's not about what's cheaper "in general" — it's about what's cheaper <strong>for your rhythm</strong>.</p>

<blockquote>A builder is cheaper at the start; custom is more predictable over the long haul. The right answer hides not in the price list but in your answer to one question: how often, and how deeply, do you plan to change the site?</blockquote>

<h2>What this looks like in practice</h2>

<p>To bring the theory to life, here are two short stories from my work — composites, but recognisable.</p>

<p><strong>Story one.</strong> A bakery wanted "a beautiful site with a bespoke design" and was ready for custom. But once we broke the task down, it turned out they change their display case and prices almost every other day, and the site itself is essentially a shop window with an address and an order form. Custom would have meant running to me for every edit. We built it on a builder — and now the owner edits everything herself in five minutes between batches. Custom here would have been a beautiful but gilded cage.</p>

<p><strong>Story two.</strong> A tour-matching service came in "for a cheap landing page on a builder". But the task hid a pricing calculator with a dozen parameters and a customer account. On a builder that would have become a mountain of workarounds breaking at every sneeze. We built custom — and it grows calmly along with the business. Here saving at the start would have turned into permanent pain.</p>

<p>The moral of both stories is the same: the right tool isn't visible from the name of the task, but from its insides. That's exactly why it's worth breaking the task down first, and arguing about the tool second.</p>

<h2>Can you change your mind later?</h2>

<p>A common fear: "I'll pick a builder, then outgrow it in a year — and it'll all have to be thrown away." I'll give it to you straight: yes, moving from a builder to custom essentially means building the site anew. The design can be a starting point, the text and photos can carry over, but the build itself starts from scratch.</p>

<p>Sounds grim, but in practice it's often a perfectly normal path. Start on a builder, test the hypothesis, catch the first demand — and only then, on clear numbers, invest in custom. That isn't "money thrown away" — it's a <em>cheap ticket to the first test of the idea</em>. The bad move is paying for custom right away, before you even know whether the business will fly.</p>

<h2>How to choose in thirty seconds</h2>

<p>If your head's spinning after all this, here's my personal quick test. Answer three questions honestly.</p>

<ol>
  <li><strong>How often will you change the site yourself?</strong> Every week — a strong argument for a builder. A couple of times a year — custom tips the scale.</li>
  <li><strong>Is there anything non-standard in the task?</strong> A calculator, a customer account, an integration — almost always custom. Services-menu-contacts-form — a builder will manage.</li>
  <li><strong>How much does uniqueness matter?</strong> If the site is part of the brand and has to stand out — custom. If the main thing is "it exists, it works, and people find it in search" — a builder.</li>
</ol>

<p>Two answers out of three pointing the same way, and the choice is probably already made. And if the answers scatter — that's exactly the case where it's worth talking it through with a person rather than guessing.</p>

<hr />

<h2>What's next</h2>

<p>Not sure which fits you? That's normal — the difference is hard to judge from the outside. I work with both builders and custom, and I genuinely don't mind which you pick, so on a call I'll tell you honestly: where you'd overpay for custom, and where you'd save on a builder and regret it later. Take a look at <a href="/en/websites">how I work</a> or <a href="/en/contact">drop me a line</a> with a couple of words about your task.</p>
`,
    },
  },
};
