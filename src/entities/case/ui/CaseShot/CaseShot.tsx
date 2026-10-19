import type { FC } from 'react';
import { cx } from '@sw/utils';
import { getShotSources, type CaseShotSpec, type CaseSlug } from '../../model/cases';
import s from './CaseShot.module.css';

interface CaseShotProps {
  slug: CaseSlug;
  id: string;
  device: CaseShotSpec['device'];
  /** Что на экране — для скринридера и поиска по картинкам. */
  alt: string;
  /** Домен в адресной строке рамки браузера. */
  domain?: string;
  /**
   * frame — рамка целиком (галерея, герой кейса);
   * peek — окно выглядывает из-под нижнего края (обложка карточки).
   */
  variant?: 'frame' | 'peek';
  /** sizes для srcSet: какую ширину займёт картинка на экране. */
  sizes?: string;
  /** Первый экран страницы — грузим сразу, а не лениво. */
  isPriority?: boolean;
  className?: string;
}

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/**
 * Скриншот сайта клиента в рамке из узлов дизайн-системы: окно браузера
 * с адресной строкой (десктоп) или корпус телефона (мобильная версия).
 */
export const CaseShot: FC<CaseShotProps> = (props) => {
  const { slug, id, device, alt, domain, variant = 'frame', sizes, isPriority, className } = props;
  const { src, srcSet } = getShotSources(slug, id, device);
  const size = device === 'desktop' ? DESKTOP : MOBILE;
  const defaultSizes =
    device === 'desktop' ? '(max-width: 760px) 100vw, (max-width: 1100px) 90vw, 640px' : '240px';

  const image = (
    // Готовые WebP двух размеров из public/cases — next/image здесь ничего не добавит.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={s.image}
      src={src}
      srcSet={srcSet}
      sizes={sizes ?? defaultSizes}
      width={size.width}
      height={size.height}
      alt={alt}
      loading={isPriority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  if (device === 'mobile') {
    return (
      <div className={cx(s.phone, className)}>
        <div className={s.screen}>{image}</div>
      </div>
    );
  }

  return (
    <div className={cx(s.window, s[variant], className)}>
      <div className={s.bar} aria-hidden="true">
        <span className={s.dots}>
          <i />
          <i />
          <i />
        </span>

        {domain && <span className={s.url}>{domain}</span>}
      </div>

      <div className={s.viewport}>{image}</div>
    </div>
  );
};
