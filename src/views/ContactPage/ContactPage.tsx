import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@sw/components/Badge';
import { Icon } from '@sw/components/Icon';
import { BriefCard } from '@/features/brief';
import { CONTACT_CHANNELS } from '@/shared/config/contacts';
import { JsonLd, buildBreadcrumbs, buildOrganization } from '@/shared/lib/jsonLd';
import { localizeHref } from '@/shared/ui/Link';
import { PageHero } from '@/shared/ui/PageHero';
import { Section } from '@/shared/ui/Section';
import s from './ContactPage.module.css';

/** Контакты: бриф прямо на странице и прямые каналы связи справа. */
export const ContactPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const href = (path: string) => localizeHref(path, locale);

  return (
    <>
      <JsonLd data={buildOrganization({ description: t('meta.description') })} />

      <JsonLd
        data={buildBreadcrumbs([
          { name: t('nav.home'), path: href('/') },
          { name: t('nav.contact'), path: href('/contact') },
        ])}
      />

      <PageHero
        breadcrumbs={[{ label: t('nav.home'), href: href('/') }, { label: t('nav.contact') }]}
        meta={<Badge tone="ok">{t('contact-page.status')}</Badge>}
        title={t('contact-page.title')}
        lead={t('contact-page.lead')}
      />

      <Section spacing="s" aria-label={t('contact-page.title')}>
        <div className={s.layout}>
          <BriefCard />

          <aside className={s.channels} aria-labelledby="channels-title">
            <h2 id="channels-title" className={s.channelsTitle}>
              {t('contact-page.channels-title')}
            </h2>

            <ul className={s.list}>
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    className={s.channel}
                    {...(channel.isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : undefined)}
                  >
                    <span className={s.tile} aria-hidden="true">
                      <Icon name={channel.icon} size={20} />
                    </span>

                    <span className={s.text}>
                      <span className={s.label}>{t(`contacts.${channel.id}`)}</span>
                      <span className={s.handle}>{channel.handle}</span>
                    </span>

                    <Icon name="arrow-up-right" size={16} className={s.arrow} />
                  </a>
                </li>
              ))}
            </ul>

            <p className={s.geo}>
              <Icon name="map-pin" size={16} />
              {t('contact-page.geo')}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
};
