import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/features/contact-form';
import { Button } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';
import { JsonLd, buildPerson } from '@/shared/lib/jsonLd';
import { SocialIcon } from '@/shared/ui/SocialIcon';
import { CONTACT_CHANNELS, PRIMARY_EMAIL } from '@/shared/config/contacts';
import { SECONDARY_LINKS } from './secondaryLinks';
import s from './ContactPage.module.css';

export const ContactPage = async () => {
  const t = await getTranslations();

  const personData = buildPerson({ name: t('home.name'), bio: t('home.bio') });

  return (
    <main className={s.root}>
      <JsonLd data={personData} />

      <div className={s.container}>
        <h1 className={s.title}>{t('contact.title')}</h1>

        <div className={s.layout}>
          <div className={s.intro}>
            <p className={s.subtitle}>{t('contact.subtitle')}</p>

            <Button href={PRIMARY_EMAIL} variant="primary" className={s.cta}>
              <SocialIcon name="mail" />
              {t('contact.cta')}
            </Button>

            <ul className={s.socials}>
              {CONTACT_CHANNELS.map(({ id, label, href }) => {
                return (
                  <li key={id}>
                    <a
                      href={href}
                      className={s.social}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon name={id} />
                    </a>
                  </li>
                );
              })}
            </ul>

            <section className={s.about}>
              <p className={s.aboutName}>{t('home.name')}</p>
              <p className={s.aboutBio}>{t('home.bio')}</p>
            </section>

            <nav className={s.more} aria-label={t('contact.more')}>
              <p className={s.moreTitle}>{t('contact.more')}</p>

              <ul className={s.moreList}>
                {SECONDARY_LINKS.map(({ href, labelKey }) => {
                  return (
                    <li key={href} className={s.moreItem}>
                      <Link href={href} className={s.moreLink}>
                        {t(labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className={s.formPanel}>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};
