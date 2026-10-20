'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Button } from '@sw/components/Button';
import { Icon } from '@sw/components/Icon';
import { getMaterialCover, getMaterialGoal, type MaterialPlacement } from '@/entities/material';
import { reachGoal } from '@/shared/lib/analytics';
import { useMaterialVariant } from '../lib/useMaterialVariant';
import s from './LeadMagnet.module.css';

// Форма грузится только по клику — на страницах с блоком это ничего не весит.
const MaterialModal = dynamic(() => import('./MaterialModal').then((mod) => mod.MaterialModal), {
  ssr: false,
});

interface LeadMagnetProps {
  /** Где стоит блок: сравниваем места так же, как сами материалы. */
  placement: MaterialPlacement;
  className?: string;
}

/**
 * Блок «бесплатный чек-лист»: каждому посетителю — один из трёх материалов
 * (случайно, закреплён за ним). Показ, открытие формы и получение уходят целями
 * в Метрику с вариантом и местом — по ним видно, какой материал и где работает лучше.
 */
export const LeadMagnet = ({ placement, className }: LeadMagnetProps) => {
  const t = useTranslations('materials');
  const locale = useLocale();
  const variant = useMaterialVariant();
  const rootRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);

  // Показ — когда блок реально увидели (половина в экране), один раз за просмотр страницы.
  useEffect(() => {
    if (!variant || !rootRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reachGoal(getMaterialGoal('view', variant), { material: variant, placement });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [variant, placement]);

  if (!variant) {
    // Место под блок держим заранее, чтобы контент ниже не прыгал после выбора варианта.
    return <div className={`${s.placeholder} ${className ?? ''}`} aria-hidden="true" />;
  }

  const open = () => {
    setIsOpen(true);
    setWasOpened(true);
    reachGoal(getMaterialGoal('open', variant), { material: variant, placement });
  };

  const points = t.raw(`items.${variant}.points`) as string[];

  return (
    <section
      ref={rootRef}
      className={`${s.root} ${className ?? ''}`}
      aria-labelledby={`magnet-${placement}`}
      data-material={variant}
    >
      <div className={s.body}>
        <span className={s.kicker}>
          <Icon name="file-text" size={14} />
          {t('kicker')}
        </span>

        <h2 id={`magnet-${placement}`} className={s.title}>
          {t(`items.${variant}.title`)}
        </h2>

        <p className={s.pitch}>{t(`items.${variant}.pitch`)}</p>

        <ul className={s.points}>
          {points.map((point) => (
            <li key={point}>
              <Icon name="check" size={16} />
              {point}
            </li>
          ))}
        </ul>

        <Button variant="secondary" size="l" iconEnd="download" onClick={open}>
          {t('cta')}
        </Button>
      </div>

      <div className={s.cover} aria-hidden="true">
        {/* Обложка — верх первой страницы PDF, собирается вместе с файлом. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getMaterialCover(variant, locale)}
          alt=""
          width={397}
          height={530}
          loading="lazy"
        />
      </div>

      {wasOpened && (
        <MaterialModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          materialId={variant}
          placement={placement}
        />
      )}
    </section>
  );
};
