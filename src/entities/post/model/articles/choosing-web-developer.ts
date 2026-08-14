import type { ArticleDraft } from './articles.types';

/**
 * Коммерческая статья под запрос «как выбрать веб-разработчика / что подготовить заказчику».
 * BOFU: человек готов заказывать, выбирает исполнителя и хочет не ошибиться.
 */
export const choosingWebDeveloper: ArticleDraft = {
  slug: 'kak-vybrat-veb-razrabotchika',
  date: '2026-07-04',
  image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
  translations: {
    ru: {
      title: 'Как выбрать веб-разработчика и не переплатить',
      tag: 'Заказчику',
      excerpt:
        'Выбор разработчика похож на выбор врача: цена мало что говорит, а ошибка обходится дорого. Чек-лист, вопросы для созвона и красные флаги, по которым надёжного видно ещё до договора.',
      description:
        'Как выбрать веб-разработчика и не переплатить: на что смотреть в портфолио, какие вопросы задать на созвоне и что подготовить заказчику до старта проекта.',
      body: `
<p>Выбор разработчика жутко похож на выбор врача. Цена в прайсе почти ничего не говорит о результате. Красивый кабинет — тоже. А цена ошибки высокая: с плохим врачом вы теряете здоровье, с плохим разработчиком — деньги, время и нервы, причём часто всё сразу. И, как с врачом, беда в том, что оценить работу вы сможете, только когда уже поздно что-то менять.</p>

<p>Но есть и хорошая новость. Отличить надёжного исполнителя от случайного можно ещё <strong>до подписания договора</strong> — по вполне конкретным признакам, которые видно невооружённым глазом. Надо только знать, куда смотреть. Этому и посвящена статья: разберём портфолио, вопросы для созвона, красные флаги и то, что стоит подготовить самому, чтобы проект не встал на второй неделе.</p>

<h2>Фрилансер, студия или частный специалист</h2>

<p>Прежде чем смотреть портфолио, стоит понять, к кому вы вообще обращаетесь. У малого бизнеса обычно три варианта, и у каждого своя логика.</p>

<p><strong>Биржевой фрилансер.</strong> Дёшево, быстро, но лотерея: сегодня он с вами, завтра пропал с деньгами и доступами. Годится для мелкой разовой задачи, где не жалко рискнуть парой тысяч.</p>

<p><strong>Студия или агентство.</strong> Надёжно и с процессами, но дорого — вы оплачиваете менеджеров, офис и красивые презентации. И общаетесь чаще с аккаунт-менеджером, а не с тем, кто реально делает сайт. Оправдано, когда проект крупный и вам нужны гарантии юрлица.</p>

<p><strong>Частный специалист.</strong> Золотая середина для малого бизнеса: вы говорите напрямую с тем, кто пишет код, без наценки за офис и без риска анонимной биржи. Главное — убедиться, что человек на связи и никуда не денется. Как раз для этого и нужны признаки ниже.</p>

<h2>Как читать портфолио (а не просто листать)</h2>

<p>Первое, куда все смотрят, — портфолио. И первое, где почти все ошибаются: залипают на красивые картинки. А картинка врёт. Дизайн на слайде и живой работающий сайт — это две разные вещи, между которыми лежит вся сложность разработки.</p>

<p>Поэтому смотрите не так, как смотрят все. Вот что действительно важно:</p>

<ul>
  <li><strong>Открывайте живые сайты, а не скриншоты.</strong> Найдите в портфолио ссылки и зайдите на них с телефона. Грузится быстро? Не разъезжается? Кнопки нажимаются? Скриншот можно нарисовать за час, а рабочий сайт за час не подделаешь.</li>
  <li><strong>Ищите задачи, похожие на вашу.</strong> Опыт в вашей нише ценнее любого эффектного, но чужого по смыслу кейса. Человек, делавший сайты кофейням, уже знает про меню, доставку и фото еды — вам не придётся объяснять очевидное.</li>
  <li><strong>Читайте историю, а не любуйтесь картинкой.</strong> Хороший кейс рассказывает, какую задачу бизнеса решал сайт и что из этого вышло. Просто набор красивых экранов без единого слова «зачем» — это портфолио декоратора, а не разработчика.</li>
</ul>

<blockquote>Красивое портфолио показывает вкус. Понятный рассказ о том, зачем всё это делалось и что получилось, показывает мышление. Второе важнее в разы — вкус можно нанять, а мышление придётся терпеть весь проект.</blockquote>

<h2>Созвон: пять минут, которые всё решают</h2>

<p>Портфолио отсеивает случайных. Созвон отсеивает неподходящих. И тут работает простое правило: <strong>слушайте не что вам отвечают, а как.</strong> Путаный, обтекаемый ответ на прямой вопрос о деньгах — это будущий путаный, обтекаемый проект. Вот вопросы, которые стоит задать прямо:</p>

<ol>
  <li><strong>Что входит в стоимость, а что оплачивается отдельно?</strong> «Всё включено» — не ответ. Хороший разработчик тут же перечислит, что за рамками: тексты, фото, доработки после запуска, интеграции.</li>
  <li><strong>Кто пишет тексты и готовит фотографии — я или вы?</strong> Самый недооценённый вопрос. Половина сорванных сроков — это не про код, а про то, что заказчик не прислал контент, потому что не знал, что должен.</li>
  <li><strong>Что будет с сайтом после запуска?</strong> Кто вносит правки, как быстро, сколько это стоит. Сайт — не картина, его придётся менять. Узнайте условия до, а не после.</li>
  <li><strong>Как передаются доступы?</strong> Останется ли сайт <em>вашим</em>, если вы завтра захотите сменить подрядчика? Ответ на этот вопрос важнее, чем кажется, — поэтому он ниже отдельным разделом.</li>
</ol>

<figure>
  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" alt="Команда обсуждает проект за ноутбуками" />
  <figcaption>Хороший старт проекта — это разговор о вашей задаче, а не про технологии. Технологии подберутся под задачу; если начинают с них — что-то не так.</figcaption>
</figure>

<h2>Вопрос про доступы, из-за которого плачут</h2>

<p>Разберу отдельно, потому что на этом обжигаются чаще всего. Бывает так: сайт сделали, всё работает, вы довольны. А потом отношения с разработчиком портятся — он поднял цены, пропал или просто вам разонравился. Вы хотите уйти к другому — и узнаёте, что не можете. Домен оформлен на него. Хостинг — его. Исходники он не отдаёт. Ваш сайт по факту принадлежит не вам.</p>

<p>Это не редкость и не всегда злой умысел — иногда просто так удобнее исполнителю. Но результат для вас одинаково неприятный: вы в заложниках. Поэтому проговорите <strong>заранее и прямо</strong>: домен регистрируется на вас, доступы к хостингу — ваши, исходный код передаётся вам по завершении. Нормальный разработчик согласится без вопросов. Тот, кто начнёт юлить, — сам себе красный флаг.</p>

<h2>Что подготовить, чтобы не тормозить проект</h2>

<p>Теперь неожиданное: половина скорости и цены проекта зависит не от разработчика, а от вас. Проект летит, когда у исполнителя с первого дня есть материалы. И встаёт намертво, когда через неделю выясняется, что «фотки ещё не готовы, а тексты вы напишете на выходных». Соберите заранее вот это:</p>

<table>
  <thead>
    <tr>
      <th>Материал</th>
      <th>Зачем нужен</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Описание бизнеса и услуг</td>
      <td>Основа для текстов и структуры сайта</td>
    </tr>
    <tr>
      <td>Фотографии</td>
      <td>Живые фото продают лучше стоковых</td>
    </tr>
    <tr>
      <td>Примеры сайтов, которые нравятся</td>
      <td>Быстро задают тон и стиль, экономят раунды правок</td>
    </tr>
    <tr>
      <td>Контакты и реквизиты</td>
      <td>Формы, футер, юридические страницы</td>
    </tr>
  </tbody>
</table>

<p>Не обязательно готовить всё идеально — черновиков достаточно. Но чем больше вы принесёте на старте, тем меньше проект будет «висеть в ожидании материалов» — а именно это ожидание, а не сложность кода, чаще всего и растягивает сроки вдвое.</p>

<h2>Про оплату и этапы</h2>

<p>Ещё одно место, где ломаются отношения, — деньги. Здоровая схема выглядит так: работа делится на этапы, и каждый оплачивается по факту сдачи. Предоплата — это нормально: она подтверждает серьёзность намерений с обеих сторон. Но <strong>стопроцентная предоплата за весь проект вперёд</strong> — уже риск: у исполнителя пропадает стимул торопиться, а у вас — рычаг влияния.</p>

<p>Хорошая практика — разбить на понятные вехи: дизайн, вёрстка, запуск. Вы видите результат каждого этапа и платите за то, что уже можете потрогать. Если разработчик сам предлагает такую схему — отличный знак: он уверен в своей работе и не боится показывать её по частям.</p>

<blockquote>Договор пугает многих заказчиков, но именно он защищает в первую очередь вас. Пара страниц с описанием, что и к какому сроку, стоит спокойного сна больше, чем любые устные обещания «всё будет отлично».</blockquote>

<h2>Красные флаги: беги, если слышишь это</h2>

<p>Есть фразы и поступки, после которых стоит насторожиться независимо от того, насколько человек обаятелен. Проверено на чужих ошибках:</p>

<ul>
  <li><strong>Называет точную цену, не выслушав задачу.</strong> Это либо шаблон, который натянут на вас как есть, либо цифра с потолка, которая потом вырастет.</li>
  <li><strong>Обещает «сайт за один день под ключ».</strong> Либо это готовый шаблон под видом индивидуальной работы, либо будет сделано ровно на «один день» по качеству.</li>
  <li><strong>Не может объяснить, что вы получите на выходе.</strong> Если человек говорит размыто на старте, когда он максимально заинтересован вам понравиться, — представьте, как он будет говорить в середине проекта.</li>
  <li><strong>Давит и торопит с решением.</strong> «Цена только сегодня», «ещё двое ждут этот слот» — приёмы из другой профессии. Хорошему разработчику незачем на вас давить.</li>
</ul>

<blockquote>Не выбирайте по самой низкой цене — так вы почти гарантированно выберете того, кто заложил в неё меньше всего заботы. Выбирайте по тому, насколько понятно человек говорит о вашей задаче и о деньгах.</blockquote>

<hr />

<h2>Что дальше</h2>

<p>Соберите этот чек-лист в заметку и пройдитесь по нему на первом же созвоне с любым подрядчиком — включая меня, я не обижусь. А если хотите сразу обсудить проект с человеком, который сначала слушает и только потом называет цену, — посмотрите, <a href="/websites">как я работаю</a>, или <a href="/contact">напишите мне</a>. Расскажите про задачу, а я честно скажу, что реально сделать в вашем бюджете и с чего лучше начать.</p>
`,
    },
    en: {
      title: 'How to Choose a Web Developer and Not Overpay',
      tag: 'For Clients',
      excerpt:
        'Choosing a developer is like choosing a doctor: the price tag says little, and a mistake costs dearly. A checklist, questions for the call, and red flags that reveal a reliable one before you ever sign.',
      description:
        'How to choose a web developer and not overpay: what to look for in a portfolio, what to ask on the call, and what to prepare as a client before the project starts.',
      body: `
<p>Choosing a developer is eerily like choosing a doctor. The price on the list tells you almost nothing about the outcome. A pretty office tells you nothing either. And the cost of a mistake is high: with a bad doctor you lose your health, with a bad developer you lose money, time and nerves — often all at once. And, as with a doctor, the trouble is you can only judge the work once it's too late to change anything.</p>

<p>But there's good news too. You can tell a reliable contractor from a random one <strong>before you sign a thing</strong> — by quite concrete signs, visible to the naked eye. You just need to know where to look. That's what this article is about: portfolios, questions for the call, red flags, and what you should prepare yourself so the project doesn't stall in week two.</p>

<h2>Freelancer, studio, or independent specialist</h2>

<p>Before looking at a portfolio, it's worth understanding who you're even turning to. A small business usually has three options, each with its own logic.</p>

<p><strong>The marketplace freelancer.</strong> Cheap, fast, but a lottery: with you today, gone tomorrow with your money and your access. Fine for a small one-off task where you don't mind risking a little.</p>

<p><strong>The studio or agency.</strong> Reliable, with processes, but expensive — you're paying for managers, an office and slick presentations. And you'll mostly talk to an account manager, not the person actually building the site. Justified when the project is large and you need the guarantees of a legal entity.</p>

<p><strong>The independent specialist.</strong> The sweet spot for small business: you talk directly to the person writing the code, with no office markup and none of the anonymous-marketplace risk. The main thing is to make sure the person is reachable and won't vanish. The signs below are exactly for that.</p>

<h2>How to read a portfolio (not just scroll it)</h2>

<p>The first thing everyone looks at is the portfolio. And the first place almost everyone slips up: getting stuck on the pretty pictures. A picture lies. A design on a slide and a live, working site are two different things, and the whole difficulty of development lies between them.</p>

<p>So look differently from how everyone else looks. Here's what actually matters:</p>

<ul>
  <li><strong>Open the live sites, not the screenshots.</strong> Find the links in the portfolio and open them on your phone. Loads fast? Doesn't fall apart? Buttons actually tap? A screenshot can be drawn up in an hour; a working site can't be faked in one.</li>
  <li><strong>Look for tasks like yours.</strong> Experience in your niche is worth more than any flashy but unrelated case. Someone who has built café sites already knows about menus, delivery and food photos — you won't have to explain the obvious.</li>
  <li><strong>Read the story, don't admire the picture.</strong> A good case study tells you what business problem the site solved and how it turned out. A mere set of beautiful screens without a single word of "why" is a decorator's portfolio, not a developer's.</li>
</ul>

<blockquote>A beautiful portfolio shows taste. A clear account of why it was all done and how it turned out shows thinking. The second matters far more — taste you can hire, but the thinking you'll have to live with for the whole project.</blockquote>

<h2>The call: five minutes that decide everything</h2>

<p>The portfolio filters out the random ones. The call filters out the wrong-fit ones. And here a simple rule applies: <strong>listen not to what they answer, but how.</strong> A muddled, evasive answer to a direct question about money is a future muddled, evasive project. Here are the questions worth asking outright:</p>

<ol>
  <li><strong>What's included in the price, and what's charged separately?</strong> "All-inclusive" isn't an answer. A good developer will immediately list what's outside the scope: text, photos, post-launch tweaks, integrations.</li>
  <li><strong>Who writes the text and prepares the photos — me or you?</strong> The most underrated question. Half of all blown deadlines aren't about code — they're about the client not sending content, because nobody told them they had to.</li>
  <li><strong>What happens to the site after launch?</strong> Who makes edits, how fast, at what cost. A site isn't a painting; it will need changing. Learn the terms before, not after.</li>
  <li><strong>How is access handed over?</strong> Will the site stay <em>yours</em> if you decide to switch contractors tomorrow? The answer matters more than it seems — which is why it gets its own section below.</li>
</ol>

<figure>
  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" alt="A team discussing a project over laptops" />
  <figcaption>A good project start is a conversation about your task, not about technologies. The technology will follow the task; if they lead with it, something's off.</figcaption>
</figure>

<h2>The access question that makes people cry</h2>

<p>I'll cover this separately, because it's where people get burned most often. It goes like this: the site's done, everything works, you're happy. Then the relationship with the developer sours — they raised prices, disappeared, or you simply fell out. You want to move to someone else — and find out you can't. The domain is registered to them. The hosting is theirs. They won't hand over the source. Your site, in effect, doesn't belong to you.</p>

<p>This isn't rare, and it isn't always malice — sometimes it's just more convenient for the contractor. But the result for you is equally unpleasant: you're a hostage. So spell it out <strong>upfront and plainly</strong>: the domain is registered to you, the hosting access is yours, the source code is handed over to you on completion. A decent developer will agree without blinking. The one who starts hedging is a red flag all by themselves.</p>

<h2>What to prepare so you don't slow the project down</h2>

<p>Now the surprising part: half of a project's speed and cost depends not on the developer but on you. A project flies when the contractor has the materials from day one. And it grinds to a dead stop when, a week in, it turns out "the photos aren't ready yet and you'll write the text over the weekend". Gather this in advance:</p>

<table>
  <thead>
    <tr>
      <th>Material</th>
      <th>Why it's needed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A description of the business and services</td>
      <td>The basis for the text and the site structure</td>
    </tr>
    <tr>
      <td>Photos</td>
      <td>Real photos sell better than stock</td>
    </tr>
    <tr>
      <td>Examples of sites you like</td>
      <td>Quickly set the tone and style, save rounds of edits</td>
    </tr>
    <tr>
      <td>Contact and legal details</td>
      <td>Forms, footer, legal pages</td>
    </tr>
  </tbody>
</table>

<p>You don't have to prepare everything perfectly — drafts are enough. But the more you bring at the start, the less the project will "hang waiting for materials" — and it's that waiting, not the complexity of the code, that most often doubles the timeline.</p>

<h2>On payment and milestones</h2>

<p>Another place relationships break down is money. A healthy scheme looks like this: the work is split into stages, and each is paid on delivery. A deposit is normal — it confirms serious intent on both sides. But <strong>a hundred-percent prepayment for the whole project upfront</strong> is a risk: the contractor loses the incentive to hurry, and you lose your leverage.</p>

<p>Good practice is to break it into clear milestones: design, build, launch. You see the result of each stage and pay for what you can already touch. If the developer proposes this scheme themselves, that's an excellent sign: they're confident in their work and aren't afraid to show it in parts.</p>

<blockquote>A contract scares many clients, but it protects you first and foremost. A couple of pages describing what and by when are worth more peaceful sleep than any verbal promise that "it'll all be great".</blockquote>

<h2>Red flags: run if you hear these</h2>

<p>There are phrases and moves that should put you on guard no matter how charming the person is. Learned from other people's mistakes:</p>

<ul>
  <li><strong>Quotes an exact price without hearing the task.</strong> Either it's a template stretched over you as-is, or a number pulled from the air that will grow later.</li>
  <li><strong>Promises "a turnkey site in one day".</strong> Either it's a ready template dressed up as bespoke work, or it'll be made to exactly "one day" of quality.</li>
  <li><strong>Can't explain what you'll get in the end.</strong> If someone is vague at the start, when they're maximally motivated to win you over, imagine how they'll talk in the middle of the project.</li>
  <li><strong>Pushes and rushes you to decide.</strong> "This price only today", "two others are waiting for this slot" — those are tricks from a different profession. A good developer has no need to pressure you.</li>
</ul>

<blockquote>Don't choose by the lowest price — that way you'll all but guarantee the one who built the least care into it. Choose by how clearly the person talks about your task and about money.</blockquote>

<hr />

<h2>What's next</h2>

<p>Save this checklist to a note and run through it on the very first call with any contractor — me included, I won't be offended. And if you'd like to discuss a project straight away with someone who listens first and quotes second, take a look at <a href="/en/websites">how I work</a> or <a href="/en/contact">drop me a line</a>. Tell me about your task and I'll honestly say what's realistic within your budget and where it's best to start.</p>
`,
    },
  },
};
