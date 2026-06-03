import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/features/contact-form';
import { Button } from '@/shared/ui/Button';
import { SocialIcon } from './SocialIcon';
import { CONTACT_CHANNELS, PRIMARY_EMAIL } from './contacts';
import s from './ContactPage.module.css';

export const ContactPage = async () => {
  const t = await getTranslations();

  return (
    <main className={s.root}>
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
          </div>

          <div className={s.formPanel}>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};
