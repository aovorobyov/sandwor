'use client';

import Image from 'next/image';
import { Link } from 'next-view-transitions';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Typewriter } from '@/shared/ui/Typewriter';
import { OrderModalContainer, OrderButton } from '@/features/order-form';
import s from './ServiceShowcase.module.css';

export const ServiceShowcase: FC = () => {
  const t = useTranslations();
  // Сообщения хранят массив строк — t.raw отдаёт его as-is
  const words = t.raw('home.slogan-words') as string[];

  return (
    <OrderModalContainer>
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.layout}>
            <div className={s.text}>
              <h1 className={s.slogan}>
                <span className={s.sloganPrefix}>{t('home.slogan-prefix')}</span>

                <Typewriter words={words} className={s.sloganWord} />
              </h1>

              <p className={s.lead}>{t('home.lead')}</p>

              <div className={s.cta}>
                <OrderButton>{t('home.order')}</OrderButton>

                <Link href="/websites" className={s.ctaSecondary}>
                  {t('home.more')}
                </Link>
              </div>
            </div>

            {/* Персонаж разрезан на два слоя: тело и ладонь — ладонь машет CSS-анимацией.
                PNG как источник: оптимизатор next/image сам отдаст webp/avif по Accept. */}
            <div className={s.imageWrap} aria-hidden>
              <Image
                src="/img/sandwor-body.png"
                alt=""
                width={853}
                height={1280}
                priority
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 230px, 255px"
                className={s.body}
              />

              <Image
                src="/img/sandwor-hand.png"
                alt=""
                width={853}
                height={1280}
                priority
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 230px, 255px"
                className={s.hand}
              />
            </div>
          </div>
        </div>
      </section>
    </OrderModalContainer>
  );
};
