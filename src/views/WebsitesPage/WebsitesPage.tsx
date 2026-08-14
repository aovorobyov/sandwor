import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/ui/Button';
import { Mono } from '@/shared/ui/Mono';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { Section } from '@/shared/ui/Section';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Tariffs } from '@/widgets/Tariffs';
import { ProcessSteps } from '@/widgets/ProcessSteps';
import { OrderForm } from '@/features/order-form';
import { YM_GOAL } from '@/shared/lib/analytics';
import { JsonLd, buildBreadcrumbs } from '@/shared/lib/jsonLd';
import { ChannelIcon } from './ChannelIcon';
import { DIRECT_CHANNELS } from './directChannels';
import type { FaqItem, ToolItem } from './WebsitesPage.types';
import s from './WebsitesPage.module.css';

export const WebsitesPage = async () => {
  const t = await getTranslations();

  const approach = t.raw('websites.approach') as string[];
  const tools = t.raw('websites.tools') as ToolItem[];
  const toolKickers = t.raw('websites.tools-kickers') as string[];
  const includes = t.raw('websites.pricing-includes') as string[];
  const faq = t.raw('websites.faq') as FaqItem[];

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
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <JsonLd data={serviceData} />

      <JsonLd data={faqData} />

      <JsonLd data={breadcrumbs} />

      <main>
        {/* ── Герой ── */}
        <section className={s.hero}>
          <div className={s.heroGlow} aria-hidden />

          <div className={s.heroInner}>
            <Breadcrumbs
              className={s.breadcrumbs}
              items={[{ label: t('nav.home'), href: '/' }, { label: t('websites.breadcrumb') }]}
            />

            <h1 className={s.heroTitle}>{t('websites.hero-title')}</h1>

            <p className={s.heroLead}>{t('websites.hero-lead')}</p>

            <div className={s.heroActions}>
              <Button href="/contact" variant="primary">
                {t('websites.order')}
                <Mono>→</Mono>
              </Button>

              <a href="#tariffs" className={s.heroAnchor}>
                {t('websites.to-tariffs')}
              </a>
            </div>
          </div>
        </section>

        {/* ── Как я подхожу к работе ── */}
        <Section>
          <div className={s.split}>
            <h2 className={s.splitHeading}>{t('websites.approach-title')}</h2>

            <div className={s.splitBody}>
              {approach.map((paragraph) => (
                <p key={paragraph} className={s.approachText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Инструменты под задачу ── */}
        <Section tone="subtle">
          <h2 className={s.heading}>{t('websites.tools-title')}</h2>

          <p className={s.lead}>{t('websites.tools-lead')}</p>

          <div className={s.toolsGrid}>
            {tools.map((tool, index) => (
              <div key={tool.title} className={s.toolCell}>
                <Eyebrow tone="accent" className={s.toolKicker}>
                  {toolKickers[index]}
                </Eyebrow>

                <h3 className={s.toolTitle}>{tool.title}</h3>

                <p className={s.toolDesc}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Процесс ── */}
        <Section>
          <h2 className={s.processHeading}>{t('websites.process-title')}</h2>

          <ProcessSteps />
        </Section>

        {/* ── Тарифы ── */}
        <Section tone="subtle" id="tariffs">
          <h2 className={s.heading}>{t('websites.pricing-title')}</h2>

          <p className={s.lead}>{t('websites.pricing-lead')}</p>

          <div className={s.tariffsWrap}>
            <Tariffs />
          </div>

          <div className={s.includes}>
            <Eyebrow>{t('websites.pricing-note')}</Eyebrow>

            <ul className={s.includesGrid}>
              {includes.map((item) => (
                <li key={item} className={s.includesItem}>
                  <Mono className={s.marker}>·</Mono>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section>
          <div className={s.split}>
            <h2 className={s.splitHeading}>{t('websites.faq-title')}</h2>

            <div className={s.faqBody}>
              {faq.map(({ question, answer }) => (
                <details key={question} name="faq" className={s.faqItem}>
                  <summary className={s.faqQuestion}>
                    {question}
                    <Mono className={s.faqPlus}>+</Mono>
                  </summary>

                  <p className={s.faqAnswer}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Форма заявки ── */}
        <Section tone="subtle" className={s.orderGrid}>
          <div>
            <h2 className={s.heading}>{t('websites.order-title')}</h2>

            <p className={s.orderLead}>{t('websites.order-subtitle')}</p>

            <Eyebrow className={s.directTitle}>{t('websites.order-direct-title')}</Eyebrow>

            <div className={s.directButtons}>
              {DIRECT_CHANNELS.map(({ id, href }) => (
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
              ))}
            </div>

            <p className={s.directNote}>{t('websites.order-direct-note')}</p>
          </div>

          <div className={s.formCard}>
            <OrderForm goal={YM_GOAL.orderWebsites} />
          </div>
        </Section>
      </main>
    </>
  );
};
