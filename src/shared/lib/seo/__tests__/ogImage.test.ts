import { buildSocialMeta } from '../buildSocialMeta';
import { buildContentOgImage, buildOfferOgImage, buildPageOgImage } from '../ogImage';

describe('ogImage', () => {
  it('собирает продающую обложку с локалью', () => {
    const image = buildOfferOgImage('en');

    expect(image.url).toBe('/api/og?variant=offer&locale=en');
    expect(image.width).toBe(1200);
    expect(image.height).toBe(630);
  });

  it('экранирует параметры контентной обложки', () => {
    const image = buildContentOgImage({
      locale: 'ru',
      title: 'Сайт & цена',
      tag: 'Цены',
      meta: '7 мин чтения',
    });

    expect(image.url).toContain('variant=content');
    expect(image.url).toContain('title=%D0%A1%D0%B0%D0%B9%D1%82+%26+%D1%86%D0%B5%D0%BD%D0%B0');
    expect(image.url).not.toContain('Сайт & цена');
  });

  it('передаёт подводку раздела', () => {
    const image = buildPageOgImage({ locale: 'ru', title: 'Кейсы', lead: 'Проекты' });

    expect(image.url).toContain('variant=page');
    expect(image.url).toContain('lead=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B');
  });
});

describe('buildSocialMeta', () => {
  const image = buildOfferOgImage('ru');

  it('всегда проставляет крупную twitter-карточку: поверхностный мерж Next стирает её из лейаута', () => {
    const meta = buildSocialMeta({ title: 'Заголовок', description: 'Описание', image });

    expect(meta.twitter).toEqual({
      card: 'summary_large_image',
      title: 'Заголовок',
      description: 'Описание',
      images: [image.url],
    });
  });

  it('для материалов отдаёт type=article с датой публикации', () => {
    const meta = buildSocialMeta({
      title: 'Статья',
      description: 'Описание',
      image,
      type: 'article',
      publishedTime: '2026-08-18',
    });

    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-08-18' });
  });

  it('по умолчанию отдаёт type=website', () => {
    const meta = buildSocialMeta({ title: 'Раздел', description: 'Описание', image });

    expect(meta.openGraph).toMatchObject({ type: 'website' });
    expect(meta.openGraph).not.toHaveProperty('publishedTime');
  });
});
