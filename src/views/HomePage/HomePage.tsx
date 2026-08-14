import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Button } from '@/shared/ui/Button';
import { Mono } from '@/shared/ui/Mono';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { Section } from '@/shared/ui/Section';
import { Tariffs } from '@/widgets/Tariffs';
import { ProcessSteps } from '@/widgets/ProcessSteps';
import { PostRow } from '@/entities/post/ui/PostRow';
import { getPosts } from '@/entities/post/api/posts';
import { JsonLd, buildPerson, buildWebSite } from '@/shared/lib/jsonLd';
import { cn } from '@/shared/lib/cn';
import type { HomeFact, HomeValueProp } from './HomePage.types';
import s from './HomePage.module.css';

export const HomePage = async () => {
  const locale = await getLocale();
  const [t, posts] = await Promise.all([getTranslations(), getPosts(locale)]);

  const facts = t.raw('home.facts') as HomeFact[];
  const valueProps = t.raw('home.value-props') as HomeValueProp[];
  const marquee = t.raw('home.marquee') as string[];
  const marqueeLoop = [...marquee, ...marquee];

  const personData = buildPerson({ name: t('home.name'), bio: t('home.bio') });
  const siteData = buildWebSite({ name: t('home.name') });

  return (
    <>
      <JsonLd data={personData} />

      <JsonLd data={siteData} />

      <main>
        {/* ── Герой ── */}
        <section className={s.hero}>
          <div className={s.heroGlow} aria-hidden />

          <div className={s.heroInner}>
            <div className={s.heroEyebrow}>
              <span className={s.pulseDot} aria-hidden />

              <Eyebrow tone="muted">{t('home.hero-eyebrow')}</Eyebrow>
            </div>

            <h1 className={s.heroTitle}>{t('home.hero-title')}</h1>

            <p className={s.heroLead}>{t('home.hero-lead')}</p>

            <div className={s.heroActions}>
              <Button href="/contact" variant="primary">
                {t('home.hero-order')}
                <Mono>→</Mono>
              </Button>

              <Button href="/websites#tariffs" variant="secondary">
                {t('home.hero-tariffs')}
              </Button>
            </div>

            <div className={s.facts}>
              {facts.map((fact, index) => (
                <div key={fact.label} className={cn(s.fact, index === 0 && s.factFirst)}>
                  <div className={s.factValue}>{fact.value}</div>

                  <div className={s.factLabel}>{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Бегущая строка ── */}
        <div className={s.marquee}>
          <div className={s.marqueeTrack}>
            {marqueeLoop.map((item, index) => (
              <span key={`${item}-${index}`} className={s.marqueeItem}>
                {item}
                <span className={s.marqueeStar}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Что входит в работу ── */}
        <Section>
          <h2 className={s.headingBordered}>{t('home.value-title')}</h2>

          <div className={s.valueGrid}>
            {valueProps.map((prop) => (
              <div key={prop.kicker} className={s.valueCell}>
                <Eyebrow tone="accent" className={s.valueKicker}>
                  {prop.kicker}
                </Eyebrow>

                <h3 className={s.valueTitle}>{prop.title}</h3>

                <p className={s.valueDesc}>{prop.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Тарифы ── */}
        <Section tone="subtle">
          <div className={s.headingRow}>
            <h2 className={s.heading}>{t('websites.pricing-title')}</h2>

            <p className={s.headingNote}>{t('home.tariffs-note')}</p>
          </div>

          <Tariffs />
        </Section>

        {/* ── Как мы будем работать ── */}
        <Section>
          <h2 className={s.processHeading}>{t('websites.process-title')}</h2>

          <ProcessSteps />
        </Section>

        {/* ── Из блога ── */}
        {posts.length > 0 && (
          <Section tone="subtle">
            <div className={s.headingRow}>
              <h2 className={s.heading}>{t('home.blog-title')}</h2>

              <Link href="/blog" className={s.blogAll}>
                {t('home.blog-all')}
              </Link>
            </div>

            <div className={s.blogList}>
              {posts.slice(0, 3).map((post) => (
                <PostRow key={post.slug} post={post} hasExcerpt />
              ))}
            </div>
          </Section>
        )}

        {/* ── CTA ── */}
        <section className={s.cta}>
          <div className={s.ctaGlow} aria-hidden />

          <div className={s.ctaInner}>
            <h2 className={s.ctaTitle}>{t('home.cta-title')}</h2>

            <p className={s.ctaLead}>{t('home.cta-lead')}</p>

            <div className={s.ctaActions}>
              <Button href="/contact" variant="primary">
                {t('home.cta-order')}
                <Mono>→</Mono>
              </Button>

              <a
                href="https://t.me/aovorobyov"
                target="_blank"
                rel="noopener noreferrer"
                className={s.ctaTelegram}
              >
                {t('home.cta-telegram')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
