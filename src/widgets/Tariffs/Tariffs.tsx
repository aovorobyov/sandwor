import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/ui/Link';
import { Mono } from '@/shared/ui/Mono';
import s from './Tariffs.module.css';

interface Tariff {
  title: string;
  price: string;
  desc: string;
  features: string[];
}

/** Сетка из трёх тарифных карточек. Данные — `websites.tariffs`, кнопка ведёт на контакты. */
export const Tariffs = async () => {
  const t = await getTranslations();
  const tariffs = t.raw('websites.tariffs') as Tariff[];
  const discussLabel = t('home.tariffs-discuss');

  return (
    <div className={s.grid}>
      {tariffs.map((tariff) => (
        <div key={tariff.title} className={s.card}>
          <h3 className={s.title}>{tariff.title}</h3>

          <div className={s.price}>{tariff.price}</div>

          <p className={s.desc}>{tariff.desc}</p>

          <ul className={s.features}>
            {tariff.features.map((feature) => (
              <li key={feature} className={s.feature}>
                <Mono className={s.marker}>·</Mono>
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/contact" className={s.button}>
            {discussLabel}
            <Mono>→</Mono>
          </Link>
        </div>
      ))}
    </div>
  );
};
