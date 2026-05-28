'use client';

import type { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import type { CourseLandingProps } from './CourseLanding.types';
import s from './CourseLanding.module.css';

export const CourseLanding: FC<CourseLandingProps> = ({ content, initialName = '', onStart }) => {
  const t = useTranslations('course.landing');
  const [name, setName] = useState(initialName);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className={s.inner}>
      <div className={s.grid}>
        <div className={s.left}>
          <div className={s.badges}>
            <Badge variant="accent">{content.durationBadge}</Badge>

            <Badge variant="neutral">{t('lessonsCount', { count: content.lessons.length })}</Badge>
          </div>

          <h1 className={s.title}>{content.title}</h1>

          <p className={s.tagline}>{content.tagline}</p>

          <ul className={s.benefits}>
            {content.benefits.map((benefit, i) => (
              <li key={i} className={s.benefit}>
                <span className={s.dot} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.right}>
          <div className={s.card}>
            <h2 className={s.cardTitle}>{t('startTitle')}</h2>

            <p className={s.cardSub}>{t('startSub')}</p>

            <form onSubmit={handleSubmit} className={s.form}>
              <Input
                label={t('nameLabel')}
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder={t('namePlaceholder')}
                required
                autoComplete="name"
              />

              <div className={s.submitWrap}>
                <Button type="submit" variant="primary" className={s.submitBtn}>
                  {t('startBtn')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
