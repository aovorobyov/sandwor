import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { Section } from '@/shared/ui/Section';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { ContactForm } from '@/features/contact-form';
import { JsonLd, buildPerson } from '@/shared/lib/jsonLd';
import {
  CONTACT_EMAIL,
  CONTACT_LINKS,
  CONTACT_PHONE_HREF,
  PRIMARY_EMAIL,
  SECONDARY_LINKS,
} from './contacts';
import s from './ContactPage.module.css';

export const ContactPage = async () => {
  const t = await getTranslations();

  const personData = buildPerson({ name: t('home.name'), bio: t('home.bio') });

  return (
    <main>
      <JsonLd data={personData} />

      {/* ── Герой ── */}
      <section className={s.hero}>
        <div className={s.heroGlow} aria-hidden />

        <div className={s.heroInner}>
          <Breadcrumbs
            className={s.breadcrumbs}
            items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.contact') }]}
          />

          <div className={s.heroCols}>
            <div className={s.heroMain}>
              <h1 className={s.heroTitle}>{t('contact.hero-title')}</h1>

              <p className={s.heroLead}>{t('contact.subtitle')}</p>
            </div>

            <div className={s.status}>
              <div className={s.statusRow}>
                <span className={s.pulseDot} aria-hidden />

                <span className={s.statusLabel}>{t('contact.status')}</span>
              </div>

              <a href={PRIMARY_EMAIL} className={s.statusBig}>
                {CONTACT_EMAIL}
              </a>

              <a href={CONTACT_PHONE_HREF} className={s.statusBig}>
                {t('contact.phone')}
              </a>

              <div className={s.geo}>{t('contact.geo')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Каналы + форма ── */}
      <Section className={s.grid}>
        <div>
          <Eyebrow className={s.colTitle}>{t('contact.channels-title')}</Eyebrow>

          <div className={s.channels}>
            {CONTACT_LINKS.map(({ label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.channel}
              >
                <span className={s.channelLabel}>{label}</span>

                <span className={s.channelHandle}>{handle} ↗</span>
              </a>
            ))}
          </div>

          <div className={s.about}>
            <Eyebrow className={s.aboutEyebrow}>{t('contact.who-title')}</Eyebrow>

            <div className={s.aboutName}>{t('home.name')}</div>

            <p className={s.aboutBio}>{t('home.bio')}</p>
          </div>

          <Eyebrow className={s.moreTitle}>{t('contact.more')}</Eyebrow>

          <div className={s.chips}>
            {SECONDARY_LINKS.map(({ href, labelKey }) => (
              <Link key={href} href={href} className={s.chip}>
                {t(labelKey)}
              </Link>
            ))}
          </div>
        </div>

        <div className={s.formCard}>
          <Eyebrow tone="accent" className={s.formTitle}>
            {t('contact.message-title')}
          </Eyebrow>

          <ContactForm />
        </div>
      </Section>
    </main>
  );
};
