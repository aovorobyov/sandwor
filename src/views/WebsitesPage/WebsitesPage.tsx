import { getTranslations } from 'next-intl/server';
import { Typewriter } from '@/shared/ui/Typewriter';
import { DotIcon } from '@/shared/ui/DotIcon';
import { Button } from '@/shared/ui/Button';
import { OrderForm } from '@/features/order-form';
import { YM_GOAL } from '@/shared/lib/analytics';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { ChannelIcon } from './ChannelIcon';
import { DIRECT_CHANNELS } from './directChannels';
import type { FaqItem, ProcessStep, ReviewItem, TariffItem, ToolItem } from './WebsitesPage.types';
import s from './WebsitesPage.module.css';

export const WebsitesPage = async () => {
  const t = await getTranslations();

  // Сообщения хранят массивы — t.raw отдаёт их as-is
  const words = t.raw('home.slogan-words') as string[];
  const approach = t.raw('websites.approach') as string[];
  const tools = t.raw('websites.tools') as ToolItem[];
  const process = t.raw('websites.process') as ProcessStep[];
  const tariffs = t.raw('websites.tariffs') as TariffItem[];
  const includes = t.raw('websites.pricing-includes') as string[];
  const faq = t.raw('websites.faq') as FaqItem[];
  const reviews = t.raw('websites.reviews') as ReviewItem[];

  const hasReviews = reviews.length > 0;

  const breadcrumbs = buildBreadcrumbs([
    { name: t('nav.home'), path: '/' },
    { name: t('nav.websites'), path: '/websites' },
  ]);

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: t('websites.title'),
    name: t('websites.title'),
    description: t('websites.subtitle'),
    provider: { '@type': 'Person', name: t('home.name') },
    areaServed: 'RU',
    offers: { '@type': 'Offer', price: '50000', priceCurrency: 'RUB' },
    // Отзывы попадают в разметку только когда появятся реальные данные
    ...(hasReviews && {
      review: reviews.map(({ author, text }) => {
        return {
          '@type': 'Review',
          author: { '@type': 'Person', name: author },
          reviewBody: text,
        };
      }),
    }),
  };

  // FAQPage-разметка — блок вопросов может получить rich-сниппет в поиске
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => {
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      };
    }),
  };

  return (
    <>
      <JsonLd data={serviceData} />

      <JsonLd data={faqData} />

      <JsonLd data={breadcrumbs} />

      <main className={s.root}>
        <section className={s.hero}>
          <div className={s.heroContainer}>
            <div className={s.heroContent}>
              <h1 className={s.slogan}>
                <span className={s.sloganPrefix}>{t('home.slogan-prefix')}</span>

                <Typewriter words={words} className={s.sloganWord} />
              </h1>

              <p className={s.heroLead}>{t('websites.hero-lead')}</p>

              <div className={s.heroCta}>
                <Button href="#order" variant="primary">
                  {t('websites.order')}
                </Button>
              </div>
            </div>

            <a href="#approach" className={s.scrollHint} aria-label={t('websites.scroll-hint')}>
              <DotIcon name="chevronDown" size={30} className={s.scrollIcon} />
            </a>
          </div>
        </section>

        <section id="approach" className={s.section}>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>{t('websites.approach-title')}</h2>

            <div>
              {approach.map((paragraph) => {
                return (
                  <p key={paragraph} className={s.proseText}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>{t('websites.tools-title')}</h2>

            <p className={s.sectionLead}>{t('websites.tools-lead')}</p>

            <ul className={s.cards}>
              {tools.map(({ title, desc }) => {
                return (
                  <li key={title} className={s.card}>
                    <h3 className={s.cardTitle}>{title}</h3>

                    <p className={s.cardText}>{desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>{t('websites.process-title')}</h2>

            <ol className={s.steps}>
              {process.map(({ title, desc }, index) => {
                return (
                  <li key={title} className={s.step}>
                    <span className={s.stepNum}>{index + 1}</span>

                    <div className={s.stepBody}>
                      <h3 className={s.stepTitle}>{title}</h3>

                      <p className={s.stepText}>{desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>{t('websites.pricing-title')}</h2>

            <p className={s.sectionLead}>{t('websites.pricing-lead')}</p>

            <ul className={s.tariffs}>
              {tariffs.map(({ title, price, desc, features }) => {
                return (
                  <li key={title} className={s.tariff}>
                    <h3 className={s.tariffTitle}>{title}</h3>

                    <p className={s.tariffPrice}>{price}</p>

                    <p className={s.tariffDesc}>{desc}</p>

                    <ul className={s.tariffFeatures}>
                      {features.map((feature) => {
                        return (
                          <li key={feature} className={s.tariffFeature}>
                            {feature}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className={s.pricingNote}>
              <p className={s.pricingNoteTitle}>{t('websites.pricing-note')}</p>

              <ul className={s.includes}>
                {includes.map((item) => {
                  return (
                    <li key={item} className={s.includesItem}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>{t('websites.faq-title')}</h2>

            <div className={s.faq}>
              {faq.map(({ question, answer }) => {
                return (
                  <details key={question} className={s.faqItem}>
                    <summary className={s.faqQuestion}>{question}</summary>

                    <p className={s.faqAnswer}>{answer}</p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        {hasReviews && (
          <section className={s.section}>
            <div className={s.container}>
              <h2 className={s.sectionTitle}>{t('websites.reviews-title')}</h2>

              <p className={s.sectionLead}>{t('websites.reviews-lead')}</p>

              <ul className={s.reviews}>
                {reviews.map(({ author, role, text }) => {
                  return (
                    <li key={author} className={s.review}>
                      <p className={s.reviewText}>{text}</p>

                      <div className={s.reviewAuthor}>
                        <span className={s.reviewName}>{author}</span>

                        <span className={s.reviewRole}>{role}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        <section id="order" className={s.orderSection}>
          <div className={s.container}>
            <div className={s.orderLayout}>
              <div className={s.orderIntro}>
                <h2 className={s.sectionTitle}>{t('websites.order-title')}</h2>

                <p className={s.sectionLead}>{t('websites.order-subtitle')}</p>

                <div className={s.direct}>
                  <p className={s.directTitle}>{t('websites.order-direct-title')}</p>

                  <div className={s.directButtons}>
                    {DIRECT_CHANNELS.map(({ id, href }) => {
                      return (
                        <Button
                          key={id}
                          href={href}
                          variant="secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={s.directButton}
                        >
                          <ChannelIcon name={id} />

                          {t(`websites.order-direct.${id}`)}
                        </Button>
                      );
                    })}
                  </div>

                  <p className={s.directNote}>{t('websites.order-direct-note')}</p>
                </div>
              </div>

              <div className={s.orderPanel}>
                <OrderForm goal={YM_GOAL.orderWebsites} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
