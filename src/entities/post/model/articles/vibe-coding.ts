import type { ArticleDraft } from './articles.types';

/**
 * Статья под растущий запрос «вайбкодинг» и «сайт с помощью ИИ».
 * TOFU→BOFU: честно о том, что ИИ меняет в разработке, и почему результат решают видение и знание ниши.
 */
export const vibeCoding: ArticleDraft = {
  slug: 'vajbkoding-videnie-i-znanie-nishi',
  date: '2026-10-20',
  image: '/blog/vibecoding-cover.webp',
  translations: {
    ru: {
      title: 'Вайбкодинг, видение и знание ниши: формула успешного сайта',
      tag: 'Разработка',
      excerpt:
        'ИИ пишет код за минуты, и собрать сайт за вечер теперь может каждый. Но сайтов, которые приносят заявки, больше не стало. Разбираем, чего не хватает вайбкодингу и из чего на самом деле складывается результат.',
      description:
        'Что такое вайбкодинг и можно ли сделать сайт с помощью ИИ. Почему без видения и знания ниши сайт не приносит заявки и как сложить формулу успешного сайта.',
      body: `
<p>В начале 2025 года Андрей Карпаты, один из самых известных инженеров в области ИИ, придумал слово <strong>«вайбкодинг»</strong>. Так он назвал подход, при котором ты не пишешь код руками, а описываешь задачу обычными словами — и код за тебя пишет нейросеть. Слово прижилось мгновенно: за год оно ушло из твиттера разработчиков в разговоры владельцев бизнеса.</p>

<p>И правда: сегодня собрать работающий сайт за вечер может человек, который никогда не программировал. Казалось бы, хороших сайтов должно стать в разы больше. Но если открыть десяток свежих сайтов малого бизнеса, картина почти не изменилась: красиво, быстро, современно — и заявок нет.</p>

<p>Дело в том, что код никогда не был главным препятствием. Успешный сайт складывается из трёх частей, и вайбкодинг — только одна из них.</p>

<h2>Что такое вайбкодинг</h2>

<p>Если без жаргона: <strong>вайбкодинг — это разработка в диалоге с ИИ.</strong> Вы пишете «сделай страницу с ценами в три колонки, средняя — выделена», и через минуту она готова. Не нравится — просите переделать. Код при этом можно даже не читать: важен результат на экране.</p>

<p>Скажу честно: я сам пишу код вместе с ИИ-ассистентом каждый день. Этот сайт тоже сделан так. Поэтому я не из тех, кто называет вайбкодинг игрушкой, — но и не из тех, кто обещает, что ИИ сделает всё сам.</p>

<h2>Что вайбкодинг действительно меняет</h2>

<ul>
  <li><strong>Скорость.</strong> То, на что раньше уходил день, теперь занимает час. Прототип можно показать на первой же встрече, а не через неделю.</li>
  <li><strong>Цена ошибки.</strong> Переделать блок стало дёшево. Вместо споров «а как будет лучше» можно собрать три варианта первого экрана и посмотреть на них вживую.</li>
  <li><strong>Время на главное.</strong> Рутину — вёрстку, однотипные компоненты, правки отступов — берёт на себя ИИ. Освободившееся время уходит на то, что ИИ не умеет: думать о клиенте.</li>
</ul>

<p>Последний пункт — ключевой. Вайбкодинг не делает сайт лучше сам по себе. Он делает дешевле путь к хорошему сайту — если вы знаете, куда идёте.</p>

<h2>Чего ИИ не знает о вашем бизнесе</h2>

<p>Нейросеть видела миллионы сайтов и пишет код лучше многих людей. Но она понятия не имеет:</p>

<ul>
  <li>кто ваш клиент, чего он боится и о чём спрашивает в первом звонке;</li>
  <li>почему выбирают вас, а не соседа через дорогу;</li>
  <li>что у вас сезонность и в декабре звонят совсем с другими вопросами;</li>
  <li>какие обещания вы реально можете выполнить, а какие лучше не давать.</li>
</ul>

<p>Если вы этого не скажете, ИИ подставит среднее по интернету. И получится сайт «как у всех» — вроде бы правильный, но ни о чём.</p>

<blockquote>ИИ охотно сгенерирует форму заявки за десять секунд. Но не напомнит, что в России для неё нужен отдельный чекбокс согласия на обработку персональных данных, политика на сайте и уведомление в Роскомнадзор, — если вы сами не знаете, что об этом надо спросить.</blockquote>

<p>Это и есть знание предметной области: не только про вашу нишу, но и про то, как устроены сайты, заявки и законы вокруг них. ИИ отвечает на вопросы. Задавать правильные вопросы — всё ещё работа человека.</p>

<h2>Формула: три части успешного сайта</h2>

<p>Я бы записал её так:</p>

<p><strong>вайбкодинг (скорость) + видение (куда идём) + знание ниши (что важно клиенту) = сайт, который приносит заявки</strong></p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/vibecoding-formula-ru-m.webp" width="800" height="720" />
    <img src="/blog/vibecoding-formula-ru.webp" width="1200" height="800" loading="lazy" alt="Схема: три круга — вайбкодинг, видение и знание ниши; на их пересечении — сайт, который приносит заявки" />
  </picture>
  <figcaption>Каждая часть по отдельности даёт полезный, но неполный результат. Сайт, который продаёт, получается только там, где сходятся все три.</figcaption>
</figure>

<p>Проще всего понять формулу, если убрать из неё по одной части:</p>

<table>
  <thead>
    <tr>
      <th>Чего не хватает</th>
      <th>Что получается</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Знания ниши</td>
      <td>Красивый сайт, который говорит не о том. Отвечает на вопросы, которые клиент не задаёт, и молчит о тех, что задаёт.</td>
    </tr>
    <tr>
      <td>Видения</td>
      <td>Все правильные факты есть, но свалены в кучу. Непонятно, для кого сайт и куда нажать.</td>
    </tr>
    <tr>
      <td>Вайбкодинга</td>
      <td>Хороший план, который делается месяцами и стоит дорого. К запуску часть идей уже устарела.</td>
    </tr>
    <tr>
      <td>Ничего — есть все три</td>
      <td>Сайт запускается быстро и попадает в клиента с первого экрана.</td>
    </tr>
  </tbody>
</table>

<h2>Видение: зачем этот сайт существует</h2>

<p>Видение — это не «хочу красиво и современно». Это ответы на несколько скучных вопросов, которые задают направление всему остальному:</p>

<ol>
  <li><strong>Какое одно действие должен сделать посетитель?</strong> Позвонить, записаться, оставить заявку, купить. Одно главное — остальные второстепенные. Об этом подробно в статье <a href="/blog/chto-takoe-cta-na-sajte">про CTA</a>.</li>
  <li><strong>Для кого сайт в первую очередь?</strong> Не «для всех», а для конкретного человека: кто он, откуда пришёл, что уже знает о вас.</li>
  <li><strong>Какую работу сайт снимает с вас?</strong> Например, перестать по десять раз в день объяснять цены по телефону или отсеивать заявки, которые вам не подходят.</li>
  <li><strong>Как вы поймёте, что сайт работает?</strong> Не «нравится ли он», а сколько заявок в месяц и откуда.</li>
</ol>

<p>Без этих ответов ИИ будет быстро строить сайт — но в случайном направлении.</p>

<h2>Знание ниши: что на самом деле важно клиенту</h2>

<p>У каждой сферы свои вопросы, на которые сайт должен ответить, иначе человек уйдёт их задавать конкуренту. Несколько примеров:</p>

<ul>
  <li><strong>Кофейня:</strong> часы работы, адрес и меню с ценами важнее истории основания. Их ищут с телефона на ходу — значит, они должны быть на первом экране.</li>
  <li><strong>Зал для мероприятий:</strong> вместимость, варианты рассадки, фото зала вечером при том свете, который будет на празднике, и что входит в аренду.</li>
  <li><strong>B2B-услуги:</strong> кейсы с понятной задачей, порядок работы, цены «от» и сроки. Решение принимают несколько человек, и им нужно что-то переслать коллегам.</li>
</ul>

<p>Ни один из этих пунктов не про код. Но именно они решают, позвонят вам или нет.</p>

<h3>Где взять знание ниши, если вы не владелец бизнеса</h3>

<ul>
  <li>Поговорите с владельцем и с тем, кто принимает звонки, — это разные люди и разные знания.</li>
  <li>Попросите записать вопросы, которые клиенты задают до покупки. Этот список — готовая структура сайта и блок FAQ.</li>
  <li>Почитайте отзывы о конкурентах: чем недовольны их клиенты, то вам и стоит пообещать (и выполнить).</li>
  <li>Посмотрите, по каким запросам ищут такие услуги, — это язык, на котором клиент думает.</li>
</ul>

<h2>Как это выглядит в работе</h2>

<p>Вот как три части формулы складываются в моём процессе:</p>

<ol>
  <li><strong>Разговор и бриф — знание ниши.</strong> Сначала я слушаю: кто клиенты, о чём спрашивают, чем вы отличаетесь. Без этого не пишу ни строчки.</li>
  <li><strong>Структура и прототип — видение.</strong> Какие экраны, в каком порядке, какое главное действие на каждом. Это обсуждаем до дизайна.</li>
  <li><strong>Сборка с ИИ — вайбкодинг.</strong> Здесь и экономится время и бюджет. Но всё, что пишет ИИ, я проверяю руками: телефон, скорость загрузки, формы, доходят ли заявки в CRM, юридические тексты.</li>
  <li><strong>Запуск и аналитика.</strong> Цели в Метрике, первые записи визитов, правки по тому, как люди реально пользуются сайтом.</li>
</ol>

<h2>Если вы решили навайбкодить сайт сами</h2>

<p>Это вполне реально, особенно для простого лендинга. Чтобы результат приносил заявки, а не просто существовал, пройдитесь по списку:</p>

<ul>
  <li>Сформулируйте одно главное действие и сделайте его заметным на каждом экране.</li>
  <li>Выпишите вопросы клиентов и проверьте, что на каждый есть ответ на сайте.</li>
  <li>Откройте сайт на своём телефоне и на телефоне знакомого. Нет ли горизонтальной прокрутки, не перекрывает ли что-то кнопки.</li>
  <li>Отправьте тестовую заявку и убедитесь, что она дошла туда, где вы её точно увидите.</li>
  <li>Добавьте политику обработки персональных данных, отдельный чекбокс согласия в форме и подайте уведомление в Роскомнадзор.</li>
  <li>Подключите Яндекс Метрику с целями на заявку — иначе вы не узнаете, работает ли сайт.</li>
  <li>Проверьте скорость в PageSpeed Insights: медленный сайт теряет посетителей с мобильного интернета ещё до первого экрана.</li>
</ul>

<hr />

<h2>Что дальше</h2>

<p>Вайбкодинг сделал код дешёвым. Дорогими остались понимание клиента и умение превратить его в структуру сайта. Если хотите сайт, где все три части формулы сходятся, — посмотрите, <a href="/services/sites">как я работаю</a>, или <a href="/contact">расскажите о задаче</a>. А если выбираете исполнителя, пригодится <a href="/blog/kak-vybrat-veb-razrabotchika">чек-лист, как выбрать веб-разработчика</a>.</p>
`,
    },
    en: {
      title: 'Vibe Coding + Vision + Domain Knowledge = a Website That Works',
      tag: 'Development',
      excerpt:
        "AI writes code in minutes, and anyone can now build a website in an evening. Yet sites that actually bring in leads haven't become more common. What vibe coding is missing, and what the result really depends on.",
      description:
        'What vibe coding is and whether you can build a website with AI. Why a site without vision and domain knowledge brings no leads, and the formula that works.',
      body: `
<p>In early 2025 Andrej Karpathy, one of the best-known engineers in AI, coined the term <strong>"vibe coding"</strong>. He used it for an approach where you don't write code by hand but describe the task in plain words — and a neural network writes the code for you. The term caught on instantly: within a year it moved from developer Twitter into conversations among business owners.</p>

<p>And it's true: today someone who has never programmed can build a working website in an evening. You'd think good websites would have multiplied. But open a dozen fresh small-business sites and the picture has barely changed: pretty, fast, modern — and no leads.</p>

<p>The thing is, code was never the main obstacle. A successful website is made of three parts, and vibe coding is only one of them.</p>

<h2>What vibe coding is</h2>

<p>Without the jargon: <strong>vibe coding is development in a conversation with AI.</strong> You write "make a pricing page with three columns, highlight the middle one", and a minute later it's done. Don't like it — ask for a redo. You don't even have to read the code: what matters is the result on screen.</p>

<p>To be honest: I write code together with an AI assistant every day. This site was built that way too. So I'm not one of those who call vibe coding a toy — but I'm not one of those who promise AI will do everything on its own, either.</p>

<h2>What vibe coding really changes</h2>

<ul>
  <li><strong>Speed.</strong> What used to take a day now takes an hour. You can show a prototype at the very first meeting rather than a week later.</li>
  <li><strong>The cost of mistakes.</strong> Redoing a section has become cheap. Instead of debating "what would work better", you can build three versions of the first screen and look at them live.</li>
  <li><strong>Time for what matters.</strong> AI takes over the routine — layout, repetitive components, spacing fixes. The freed-up time goes to what AI can't do: thinking about the customer.</li>
</ul>

<p>That last point is the key one. Vibe coding doesn't make a site better by itself. It makes the road to a good site cheaper — if you know where you're going.</p>

<h2>What AI doesn't know about your business</h2>

<p>A neural network has seen millions of websites and writes code better than many people. But it has no idea:</p>

<ul>
  <li>who your customer is, what they fear and what they ask on the first call;</li>
  <li>why people choose you rather than the shop across the street;</li>
  <li>that your business is seasonal and in December people call with completely different questions;</li>
  <li>which promises you can actually keep and which you'd better not make.</li>
</ul>

<p>If you don't tell it, AI fills in the internet average. And you get a site "like everyone else's" — technically correct, but about nothing.</p>

<blockquote>AI will happily generate a request form in ten seconds. But it won't remind you that in Russia that form needs a separate consent checkbox for personal data processing, a privacy policy and a notification to the data protection regulator — unless you already know to ask.</blockquote>

<p>That's what domain knowledge is: not only about your niche, but about how websites, leads and the laws around them work. AI answers questions. Asking the right ones is still a human's job.</p>

<h2>The formula: three parts of a successful website</h2>

<p>I'd write it like this:</p>

<p><strong>vibe coding (speed) + vision (where we're going) + domain knowledge (what matters to the customer) = a website that brings in leads</strong></p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/vibecoding-formula-en-m.webp" width="800" height="720" />
    <img src="/blog/vibecoding-formula-en.webp" width="1200" height="800" loading="lazy" alt="Diagram: three circles — vibe coding, vision and domain knowledge; where they overlap, a website that brings in leads" />
  </picture>
  <figcaption>Each part on its own gives a useful but incomplete result. A site that sells only appears where all three meet.</figcaption>
</figure>

<p>The easiest way to understand the formula is to remove one part at a time:</p>

<table>
  <thead>
    <tr>
      <th>What's missing</th>
      <th>What you get</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Domain knowledge</td>
      <td>A beautiful site that talks about the wrong things. It answers questions the customer doesn't ask and stays silent on the ones they do.</td>
    </tr>
    <tr>
      <td>Vision</td>
      <td>All the right facts are there, but piled up. It's unclear who the site is for and where to click.</td>
    </tr>
    <tr>
      <td>Vibe coding</td>
      <td>A good plan that takes months and costs a lot. By launch, some of the ideas are already outdated.</td>
    </tr>
    <tr>
      <td>Nothing — all three are there</td>
      <td>The site launches quickly and hits the customer from the first screen.</td>
    </tr>
  </tbody>
</table>

<h2>Vision: why this site exists</h2>

<p>Vision isn't "I want it beautiful and modern". It's the answers to a few boring questions that set the direction for everything else:</p>

<ol>
  <li><strong>What one action should the visitor take?</strong> Call, book, send a request, buy. One main action — the rest are secondary. More on this in the article <a href="/en/blog/chto-takoe-cta-na-sajte">about CTAs</a>.</li>
  <li><strong>Who is the site for, first and foremost?</strong> Not "everyone", but a specific person: who they are, where they came from, what they already know about you.</li>
  <li><strong>What work does the site take off your plate?</strong> For example, no longer explaining prices on the phone ten times a day, or filtering out requests that don't suit you.</li>
  <li><strong>How will you know the site works?</strong> Not "do I like it", but how many leads a month and from where.</li>
</ol>

<p>Without these answers AI will build the site fast — but in a random direction.</p>

<h2>Domain knowledge: what really matters to the customer</h2>

<p>Every field has its own questions a site must answer, or people will go and ask a competitor. A few examples:</p>

<ul>
  <li><strong>A coffee shop:</strong> opening hours, address and a menu with prices matter more than the founding story. People look for them on their phone on the go — so they belong on the first screen.</li>
  <li><strong>An event venue:</strong> capacity, seating options, photos of the hall in the evening light it will have at the party, and what's included in the rental.</li>
  <li><strong>B2B services:</strong> case studies with a clear task, how the work is organised, "from" prices and timelines. Several people make the decision, and they need something to forward to colleagues.</li>
</ul>

<p>None of these points is about code. But they're what decides whether you get the call.</p>

<h3>Where to get domain knowledge if you're not the business owner</h3>

<ul>
  <li>Talk to the owner and to whoever answers the phone — they're different people with different knowledge.</li>
  <li>Ask them to write down the questions customers ask before buying. That list is a ready-made site structure and FAQ section.</li>
  <li>Read reviews of competitors: whatever their customers complain about is what you should promise (and deliver).</li>
  <li>Look at the search queries people use for such services — that's the language the customer thinks in.</li>
</ul>

<h2>How it looks in practice</h2>

<p>Here's how the three parts of the formula fit into my process:</p>

<ol>
  <li><strong>Conversation and brief — domain knowledge.</strong> First I listen: who the customers are, what they ask, how you're different. I don't write a single line before that.</li>
  <li><strong>Structure and prototype — vision.</strong> Which screens, in what order, what the main action is on each. We discuss this before design.</li>
  <li><strong>Building with AI — vibe coding.</strong> This is where time and budget are saved. But I check everything AI writes by hand: phones, load speed, forms, whether leads actually reach the CRM, legal texts.</li>
  <li><strong>Launch and analytics.</strong> Goals in analytics, the first session recordings, fixes based on how people really use the site.</li>
</ol>

<h2>If you've decided to vibe-code a site yourself</h2>

<p>That's quite doable, especially for a simple landing page. To make it bring leads rather than just exist, go through this list:</p>

<ul>
  <li>Define one main action and make it visible on every screen.</li>
  <li>Write down your customers' questions and check the site answers each one.</li>
  <li>Open the site on your phone and on a friend's. Check there's no horizontal scrolling and nothing covers the buttons.</li>
  <li>Send a test request and make sure it arrives somewhere you'll definitely see it.</li>
  <li>Add a privacy policy and a separate consent checkbox to the form, and check what your local data protection law requires.</li>
  <li>Connect analytics with a goal on the request — otherwise you'll never know whether the site works.</li>
  <li>Check speed in PageSpeed Insights: a slow site loses mobile visitors before the first screen even loads.</li>
</ul>

<hr />

<h2>What's next</h2>

<p>Vibe coding made code cheap. What stays expensive is understanding the customer and turning that understanding into a site structure. If you want a website where all three parts of the formula come together, see <a href="/en/services/sites">how I work</a> or <a href="/en/contact">tell me about your task</a>. And if you're choosing a contractor, my <a href="/en/blog/kak-vybrat-veb-razrabotchika">checklist for choosing a web developer</a> will come in handy.</p>
`,
    },
  },
};
