import type { ArticleDraft } from './articles.types';

/**
 * Информационная статья под запросы «что такое CTA», «призыв к действию на сайте».
 * TOFU→MOFU: объясняет термин и подводит к мысли, что заявки — это вопрос структуры сайта.
 */
export const whatIsCta: ArticleDraft = {
  slug: 'chto-takoe-cta-na-sajte',
  date: '2026-10-20',
  image: '/blog/cta-cover.webp',
  translations: {
    ru: {
      title: 'Что такое CTA и как он превращает посетителей сайта в заявки',
      tag: 'Конверсия',
      excerpt:
        'Посетитель дочитал, согласился со всем и закрыл вкладку. Обычно дело не в цене и не в дизайне, а в том, что сайт не сказал, что делать дальше. Разбираем, что такое CTA и как сделать его рабочим.',
      description:
        'CTA (призыв к действию) на сайте: что это такое, из чего состоит хорошая кнопка, где её ставить и какие ошибки съедают заявки. Примеры слабых и сильных CTA.',
      body: `
<p>Представьте: человек зашёл на ваш сайт, пролистал до конца, посмотрел цены, кивнул — всё подходит. И закрыл вкладку. Не потому что передумал, а потому что не понял, что делать дальше: позвонить? написать? куда? И пока он об этом думает, его отвлекает уведомление в телефоне. Заявки нет.</p>

<p>Такие потери почти не видны: в аналитике это просто «визит без цели». Но именно здесь сайт чаще всего недорабатывает. И лечится это не новым дизайном, а одной вещью с невзрачным названием — <strong>CTA</strong>.</p>

<h2>Что такое CTA простыми словами</h2>

<p><strong>CTA (call to action) — призыв к действию.</strong> Это элемент, который говорит посетителю, какой следующий шаг сделать, и даёт сделать его в один клик. Чаще всего это кнопка, но не только: ссылка в тексте, форма, номер телефона, по которому можно нажать, фраза «напишите мне в Telegram» — всё это CTA.</p>

<p>Примеры, которые вы точно видели: «Обсудить проект», «Рассчитать стоимость», «Записаться на пробное занятие», «Забронировать столик». В каждом — действие и понятный результат.</p>

<blockquote>Сайт без CTA похож на продавца, который отлично рассказал о товаре, а потом молча ушёл в подсобку. Клиент вроде бы готов, но спросить уже некого.</blockquote>

<h2>Как CTA помогает сайту</h2>

<ul>
  <li><strong>Превращает интерес в заявку.</strong> Решение купить возникает в конкретный момент: после убедительного кейса, после цены, которая оказалась ниже ожидаемой. Если в этот момент рядом есть кнопка, человек нажимает. Если её надо искать — момент уходит.</li>
  <li><strong>Снимает лишние раздумья.</strong> Посетителю не нужно изобретать, как с вами связаться и что написать. Вы уже продумали это за него — и сделали шаг лёгким.</li>
  <li><strong>Ведёт тех, кто ещё не готов.</strong> Не каждый приходит покупать. Кому-то рано звонить, но интересно посмотреть кейсы или прикинуть цену. Мягкие CTA — «Посмотреть работы», «Посчитать стоимость» — удерживают таких людей на сайте, пока они созревают.</li>
  <li><strong>Делает сайт измеримым.</strong> Каждый CTA — это цель в Яндекс Метрике. Вы видите не «сайт как-то работает», а сколько людей нажали «Обсудить проект» и с каких страниц. Без CTA мерить нечего.</li>
</ul>

<h2>Из чего состоит хороший CTA</h2>

<p>Кнопка «Отправить» тоже формально CTA. Но между ней и рабочим призывом к действию — большая разница. Хороший CTA собран из пяти частей.</p>

<ol>
  <li><strong>Глагол и результат.</strong> Не «Отправить», а «Получить расчёт». Человек нажимает не ради отправки формы, а ради того, что получит взамен.</li>
  <li><strong>Понятно, что будет после клика.</strong> «Ответим в течение рабочего дня», «Откроется короткая анкета на 2 минуты». Неизвестность пугает, конкретика успокаивает.</li>
  <li><strong>Снятый страх.</strong> «Без предоплаты», «Без обязательств», «Не звоним без спроса». Подумайте, чего опасается ваш клиент перед первым контактом, — и ответьте на это рядом с кнопкой.</li>
  <li><strong>Заметность.</strong> Главная кнопка должна выделяться цветом и размером. Если она сливается с остальным, её не увидят — даже если текст идеальный.</li>
  <li><strong>Место.</strong> CTA стоит там, где возникает решение, а не только в шапке и подвале. Об этом ниже.</li>
</ol>

<p>Вот как это выглядит на примерах:</p>

<table>
  <thead>
    <tr>
      <th>Слабый CTA</th>
      <th>Сильный CTA</th>
      <th>Что изменилось</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Отправить</td>
      <td>Получить расчёт стоимости</td>
      <td>Вместо действия — результат</td>
    </tr>
    <tr>
      <td>Подробнее</td>
      <td>Посмотреть примеры сайтов для кафе</td>
      <td>Понятно, что будет за ссылкой</td>
    </tr>
    <tr>
      <td>Связаться с нами</td>
      <td>Написать в Telegram — отвечаю в течение дня</td>
      <td>Канал и срок ответа</td>
    </tr>
    <tr>
      <td>Купить</td>
      <td>Забронировать столик на вечер</td>
      <td>Язык клиента, а не продавца</td>
    </tr>
    <tr>
      <td>Оставить заявку</td>
      <td>Обсудить проект — это бесплатно</td>
      <td>Снят страх «начнут продавать»</td>
    </tr>
  </tbody>
</table>

<h3>Один главный CTA на экран</h3>

<p>Самая частая ошибка — не слабый текст, а слишком много кнопок. Когда на одном экране пять ярких призывов, ни один из них не главный. Посетитель тратит силы на выбор, а уставший человек выбирает самый простой вариант — уйти.</p>

<p>На этом сайте правило зашито прямо в дизайн-систему: <strong>на экране только одна основная кнопка</strong> — для главного действия. Остальные действия есть, но они тише: обычные кнопки, ссылки «Подробнее →». Глаз сразу понимает, что здесь главное.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/cta-one-primary-ru-m.webp" width="800" height="1320" />
    <img src="/blog/cta-one-primary-ru.webp" width="1200" height="800" loading="lazy" alt="Схема: экран с пятью одинаково яркими кнопками и экран с одной главной кнопкой и двумя второстепенными" />
  </picture>
  <figcaption>Пять равных кнопок заставляют посетителя выбирать. Когда главная одна, выбор уже сделан за него, а запасные варианты не спорят с ней за внимание.</figcaption>
</figure>

<h2>Где ставить CTA</h2>

<p>Правило простое: призыв к действию должен быть рядом с моментом, когда у человека появляется причина его нажать.</p>

<ol>
  <li><strong>Первый экран.</strong> Тем, кто пришёл уже готовым — по рекомендации или по повторному визиту, — незачем листать весь сайт. Дайте им кнопку сразу.</li>
  <li><strong>После цен и тарифов.</strong> Цена — самый частый момент решения. Кнопка под тарифом должна вести в заявку сразу с выбранным тарифом, а не на пустую форму.</li>
  <li><strong>В конце кейса или статьи.</strong> Человек дочитал — значит, ему интересно. Предложите следующий шаг: обсудить похожую задачу. Ниже на этой странице, кстати, ровно такой блок.</li>
  <li><strong>В шапке и на мобильном.</strong> Кнопка в шапке выручает на длинных страницах. Но на телефоне она не должна перекрывать логотип и меню — проверяйте на реальном экране.</li>
  <li><strong>На странице 404.</strong> Даже потерявшегося посетителя можно вернуть: «Такой страницы нет, но вот наши услуги».</li>
</ol>

<h2>Ошибки, которые съедают заявки</h2>

<ul>
  <li><strong>CTA ведёт на форму из десятка полей.</strong> Каждое лишнее поле — повод бросить. Спросите минимум: имя и контакт. Подробности уточните в разговоре.</li>
  <li><strong>После отправки — тишина.</strong> Человек нажал кнопку и не понял, дошла ли заявка. Покажите, что всё получилось и что будет дальше: «Спасибо, Анна! Напишу вам в Telegram в течение дня».</li>
  <li><strong>«Подробнее» везде.</strong> Десять одинаковых ссылок «Подробнее» ничего не говорят. Каждая должна объяснять, куда ведёт.</li>
  <li><strong>CTA только в самом низу.</strong> До подвала доходят не все. Если кнопка одна и она в конце, вы теряете тех, кто был готов раньше.</li>
  <li><strong>Обещание, которое не выполняется.</strong> «Ответим за 5 минут», а отвечаете завтра — и клиент уже разочарован, хотя вы ещё даже не поговорили. Обещайте то, что точно сделаете.</li>
  <li><strong>Нет согласия на обработку данных.</strong> Форма заявки собирает персональные данные. Отдельный чекбокс согласия и ссылка на политику — не формальность, а требование закона. Без них заявки опасно принимать.</li>
</ul>

<h2>Как понять, что CTA работает</h2>

<p>Не нужно гадать. Достаточно трёх инструментов Яндекс Метрики:</p>

<ul>
  <li><strong>Цели.</strong> Настройте цель на каждый важный CTA: нажатие кнопки, отправку формы, клик по телефону. Через пару недель станет видно, какие страницы приводят заявки, а какие только собирают просмотры.</li>
  <li><strong>Карта кликов.</strong> Показывает, куда нажимают на самом деле. Часто выясняется, что люди кликают по картинке, которая не ссылка, — и это готовое место для CTA.</li>
  <li><strong>Вебвизор.</strong> Пять–десять записей визитов расскажут больше, чем любой отчёт: где человек остановился, что перечитывал, где ушёл.</li>
</ul>

<p>А вот A/B-тесты на небольшом сайте обычно не нужны. Чтобы разница между двумя кнопками стала статистически заметной, нужны тысячи визитов. Если их пока сотни, полезнее посмотреть записи и спросить пару клиентов, что их чуть не остановило.</p>

<hr />

<h2>Что дальше</h2>

<p>CTA — это не про кнопку, а про структуру: сайт ведёт человека от первого экрана к заявке, и на каждом шаге понятно, что делать дальше. Если на вашем сайте посетители есть, а заявок мало, скорее всего, проблема именно здесь. Посмотрите, <a href="/services/sites">как я делаю сайты</a>, или <a href="/contact">напишите мне</a> — разберу ваш сайт и скажу, где он теряет заявки.</p>
`,
    },
    en: {
      title: 'What Is a CTA and How It Turns Website Visitors into Leads',
      tag: 'Conversion',
      excerpt:
        "A visitor reads to the end, agrees with everything — and closes the tab. Usually it isn't the price or the design: the site simply never said what to do next. What a CTA is and how to make one work.",
      description:
        'A CTA (call to action) on a website: what it is, what makes a good button, where to place it and which mistakes eat your leads. Examples of weak and strong CTAs.',
      body: `
<p>Picture this: someone lands on your site, scrolls to the end, checks the prices, nods — it all fits. And closes the tab. Not because they changed their mind, but because they weren't sure what to do next: call? write? where? While they're thinking about it, a notification pops up on their phone. No lead.</p>

<p>These losses are almost invisible: in analytics it's just "a visit without a goal". Yet this is exactly where most sites underperform. And the cure isn't a redesign, but one thing with an unremarkable name — the <strong>CTA</strong>.</p>

<h2>What a CTA is, in plain words</h2>

<p><strong>A CTA (call to action) is a prompt to act.</strong> It's an element that tells the visitor what the next step is and lets them take it in one click. Most often it's a button, but not only: a link in the text, a form, a tappable phone number, the phrase "message me on Telegram" — all of these are CTAs.</p>

<p>Examples you've definitely seen: "Discuss a project", "Get a quote", "Book a trial class", "Reserve a table". Each has an action and a clear result.</p>

<blockquote>A site without a CTA is like a shop assistant who explains the product brilliantly and then silently walks off to the back room. The customer is ready — but there's no one left to ask.</blockquote>

<h2>How a CTA helps your site</h2>

<ul>
  <li><strong>It turns interest into a lead.</strong> The decision to buy happens at a specific moment: after a convincing case study, after a price that turned out lower than expected. If there's a button right there, people click. If they have to look for it, the moment passes.</li>
  <li><strong>It removes extra thinking.</strong> The visitor doesn't have to work out how to reach you or what to write. You've already thought it through for them — and made the step easy.</li>
  <li><strong>It guides those who aren't ready yet.</strong> Not everyone comes to buy. Some aren't ready to call but want to see your work or estimate the price. Soft CTAs — "See case studies", "Estimate the cost" — keep those people on the site while they make up their minds.</li>
  <li><strong>It makes the site measurable.</strong> Every CTA is a goal in your analytics. Instead of "the site sort of works", you see how many people clicked "Discuss a project" and from which pages. Without CTAs there's nothing to measure.</li>
</ul>

<h2>What makes a good CTA</h2>

<p>A "Submit" button is technically a CTA too. But there's a big gap between it and a call to action that works. A good CTA is built from five parts.</p>

<ol>
  <li><strong>A verb and a result.</strong> Not "Submit" but "Get my quote". People don't click to send a form — they click for what they'll get in return.</li>
  <li><strong>A clear "what happens next".</strong> "We'll reply within one working day", "A short 2-minute questionnaire will open". The unknown is scary; specifics are reassuring.</li>
  <li><strong>A fear removed.</strong> "No prepayment", "No obligation", "We won't call unless you ask". Think about what your client worries about before the first contact — and answer it right next to the button.</li>
  <li><strong>Visibility.</strong> The main button has to stand out in colour and size. If it blends in, nobody sees it — however perfect the text.</li>
  <li><strong>Placement.</strong> A CTA belongs where the decision happens, not only in the header and footer. More on that below.</li>
</ol>

<p>Here's how it looks in practice:</p>

<table>
  <thead>
    <tr>
      <th>Weak CTA</th>
      <th>Strong CTA</th>
      <th>What changed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Submit</td>
      <td>Get a cost estimate</td>
      <td>A result instead of an action</td>
    </tr>
    <tr>
      <td>Read more</td>
      <td>See examples of café websites</td>
      <td>It's clear what's behind the link</td>
    </tr>
    <tr>
      <td>Contact us</td>
      <td>Message me on Telegram — I reply within a day</td>
      <td>Channel and response time</td>
    </tr>
    <tr>
      <td>Buy</td>
      <td>Reserve a table for tonight</td>
      <td>The customer's language, not the seller's</td>
    </tr>
    <tr>
      <td>Leave a request</td>
      <td>Discuss your project — it's free</td>
      <td>The "they'll start selling" fear is gone</td>
    </tr>
  </tbody>
</table>

<h3>One main CTA per screen</h3>

<p>The most common mistake isn't weak copy — it's too many buttons. When one screen has five bright calls to action, none of them is the main one. The visitor spends energy choosing, and a tired person picks the easiest option: leaving.</p>

<p>On this site the rule is built right into the design system: <strong>only one primary button per screen</strong>, for the main action. Other actions are there, but quieter: regular buttons, "Read more →" links. The eye instantly sees what matters.</p>

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/blog/cta-one-primary-en-m.webp" width="800" height="1320" />
    <img src="/blog/cta-one-primary-en.webp" width="1200" height="800" loading="lazy" alt="Diagram: a screen with five equally bright buttons and a screen with one primary button and two secondary ones" />
  </picture>
  <figcaption>Five equal buttons make the visitor choose. With one main button the choice is already made for them, and the fallbacks don't compete for attention.</figcaption>
</figure>

<h2>Where to place CTAs</h2>

<p>The rule is simple: a call to action should sit next to the moment a person gets a reason to click it.</p>

<ol>
  <li><strong>The first screen.</strong> People who arrive ready — by recommendation or on a repeat visit — shouldn't have to scroll the whole site. Give them a button right away.</li>
  <li><strong>After prices and plans.</strong> Price is the most common decision point. The button under a plan should open the request with that plan already selected, not an empty form.</li>
  <li><strong>At the end of a case study or article.</strong> They read to the end, so they're interested. Offer the next step: discuss a similar task. There's exactly such a block further down this page.</li>
  <li><strong>In the header and on mobile.</strong> A header button helps on long pages. But on a phone it mustn't cover the logo or the menu — check on a real screen.</li>
  <li><strong>On the 404 page.</strong> Even a lost visitor can be brought back: "This page doesn't exist, but here are our services".</li>
</ol>

<h2>Mistakes that eat your leads</h2>

<ul>
  <li><strong>The CTA leads to a form with a dozen fields.</strong> Every extra field is a reason to quit. Ask for the minimum: a name and a contact. Clarify the details in conversation.</li>
  <li><strong>Silence after submitting.</strong> Someone clicked and couldn't tell whether the request went through. Show that it worked and what happens next: "Thanks, Anna! I'll message you on Telegram within a day."</li>
  <li><strong>"Read more" everywhere.</strong> Ten identical "Read more" links say nothing. Each should explain where it leads.</li>
  <li><strong>A CTA only at the very bottom.</strong> Not everyone reaches the footer. If your only button is at the end, you lose those who were ready earlier.</li>
  <li><strong>A promise you don't keep.</strong> "We reply in 5 minutes" — and you reply tomorrow. The client is disappointed before you've even talked. Promise only what you'll definitely do.</li>
  <li><strong>No consent to data processing.</strong> A request form collects personal data. A separate consent checkbox and a link to the privacy policy aren't a formality but a legal requirement in many countries, Russia included.</li>
</ul>

<h2>How to tell whether a CTA works</h2>

<p>No need to guess. Three analytics tools are enough (in Yandex Metrica or similar):</p>

<ul>
  <li><strong>Goals.</strong> Set a goal for each important CTA: a button click, a form submission, a tap on the phone number. In a couple of weeks you'll see which pages bring leads and which only collect views.</li>
  <li><strong>Click map.</strong> Shows where people actually click. Often it turns out they click an image that isn't a link — a ready-made spot for a CTA.</li>
  <li><strong>Session replay.</strong> Five to ten recorded visits tell you more than any report: where someone paused, what they re-read, where they left.</li>
</ul>

<p>A/B tests, on the other hand, are usually unnecessary for a small site. To make the difference between two buttons statistically visible you need thousands of visits. If you have hundreds, it's more useful to watch recordings and ask a couple of clients what almost stopped them.</p>

<hr />

<h2>What's next</h2>

<p>A CTA isn't about a button — it's about structure: the site leads a person from the first screen to a request, and at every step it's clear what to do next. If your site has visitors but few leads, the problem is most likely here. See <a href="/en/services/sites">how I build websites</a> or <a href="/en/contact">drop me a line</a> — I'll look at your site and tell you where it's losing leads.</p>
`,
    },
  },
};
