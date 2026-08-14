import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Eyebrow } from '@/shared/ui/Eyebrow';
import { NAV_LINKS } from '../Header/config';
import s from './Footer.module.css';

const SITE_DOMAIN = 'sandwor.ru';

const MORE_LINKS = [
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/timeline', labelKey: 'nav.timeline' },
  { href: '/news', labelKey: 'nav.news' },
] as const;

const CONTACT_LINKS = [
  { href: 'https://t.me/aovorobyov', label: 'Telegram ↗' },
  { href: 'https://github.com/aovorobyov', label: 'GitHub ↗' },
  { href: 'mailto:aovorobyov@mail.ru', label: 'aovorobyov@mail.ru' },
] as const;

export const Footer = async () => {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className={s.root}>
      <div className={s.inner}>
        <div className={s.columns}>
          <div>
            <div className={s.logo}>
              sandwor
              <span className={s.dot} aria-hidden />
            </div>

            <p className={s.description}>{t('footer.description')}</p>
          </div>

          <div>
            <Eyebrow className={s.colTitle}>{t('footer.sections')}</Eyebrow>

            <div className={s.list}>
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link key={href} href={href} className={s.link}>
                  {t(labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow className={s.colTitle}>{t('footer.more')}</Eyebrow>

            <div className={s.list}>
              {MORE_LINKS.map(({ href, labelKey }) => (
                <Link key={href} href={href} className={s.link}>
                  {t(labelKey)}
                </Link>
              ))}

              <a href="/feed.xml" className={s.link}>
                {t('nav.rss')}
              </a>
            </div>
          </div>

          <div>
            <Eyebrow className={s.colTitle}>{t('footer.contacts')}</Eyebrow>

            <div className={s.list}>
              {CONTACT_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.link}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <span>{t('footer.rights', { year })}</span>

          <Link href="/privacy" className={s.bottomLink}>
            {t('footer.privacy')}
          </Link>

          <span>{SITE_DOMAIN}</span>
        </div>
      </div>
    </footer>
  );
};
