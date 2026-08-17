import { getTranslations } from 'next-intl/server';
import { SocialIcon } from '@/shared/ui/SocialIcon';
import { CONTACT_CHANNELS, PRIMARY_EMAIL } from '@/shared/config/contacts';
import { V2_FONTS, V2_PALETTE } from './palette';
import type { SoonChange, SoonPageProps } from './SoonPage.types';
import './soon.css';
import s from './SoonPage.module.css';

/**
 * Тизер новой версии сайта: анонс редизайна, живые артефакты из ветки `sandwor_v2`
 * (типографика, палитра, бегущая строка) и прямые контакты.
 * Отдаётся вместо любой страницы, пока включён `IS_SITE_CLOSED`.
 */
export const SoonPage = async (props: SoonPageProps) => {
  const { locale } = props;

  const t = await getTranslations({ locale, namespace: 'soon' });

  const changes = t.raw('changes') as SoonChange[];
  const marquee = t.raw('marquee') as string[];
  // Трек уезжает на -50%, поэтому вторая копия подхватывает первую без стыка.
  const marqueeLoop = [...marquee, ...marquee];

  return (
    <main className={s.root}>
      <div className={s.glow} aria-hidden />

      <div className={s.hero}>
        <div className={s.inner}>
          <p className={s.logo}>
            sandwor
            <span className={s.logoDot} aria-hidden />
          </p>

          <p className={s.eyebrow}>{t('eyebrow')}</p>

          <h1 className={s.title}>{t('title')}</h1>

          <p className={s.lead}>{t('lead')}</p>

          <p className={s.contactsLabel}>{t('contacts')}</p>

          <div className={s.actions}>
            <a className={s.cta} href={PRIMARY_EMAIL}>
              <SocialIcon name="mail" />
              {t('cta')}
            </a>

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
        </div>
      </div>

      <div className={s.marquee}>
        <div className={s.marqueeTrack}>
          {marqueeLoop.map((item, index) => {
            return (
              <span key={`${item}-${index}`} className={s.marqueeItem}>
                {item}
                <span className={s.marqueeStar}>✦</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className={s.inner}>
        <section className={s.section}>
          <h2 className={s.sectionTitle}>{t('peek-title')}</h2>

          <ul className={s.changes}>
            {changes.map(({ kicker, title, desc }) => {
              return (
                <li key={kicker} className={s.change}>
                  <p className={s.changeKicker}>{kicker}</p>

                  <p className={s.changeTitle}>{title}</p>

                  <p className={s.changeDesc}>{desc}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.section}>
          <h2 className={s.sectionTitle}>{t('type-title')}</h2>

          <ul className={s.fonts}>
            {V2_FONTS.map(({ id, name, family }) => {
              return (
                <li key={id} className={s.font}>
                  <p className={s.fontSample} style={{ fontFamily: family }}>
                    {name}
                  </p>

                  <p className={s.fontRole}>{t(`type-${id}`)}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={s.section}>
          <h2 className={s.sectionTitle}>{t('palette-title')}</h2>

          <ul className={s.palette}>
            {V2_PALETTE.map(({ token, value }) => {
              return (
                <li key={token} className={s.swatch}>
                  <span className={s.swatchChip} style={{ background: value }} aria-hidden />

                  <span className={s.swatchToken}>{token}</span>

                  <span className={s.swatchValue}>{value}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};
