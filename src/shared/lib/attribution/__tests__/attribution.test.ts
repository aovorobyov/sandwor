import { readAttribution } from '../attribution';

describe('источник визита', () => {
  it('берёт метки UTM, путь первой страницы и только домен реферера', () => {
    const result = readAttribution(
      'https://sandwor.ru/services/sites?utm_source=yandex&utm_medium=cpc&utm_campaign=tilda&phone=79000000000',
      'https://www.google.com/search?q=sandwor',
    );

    expect(result).toEqual({
      landing: '/services/sites',
      utm_source: 'yandex',
      utm_medium: 'cpc',
      utm_campaign: 'tilda',
      referrer: 'www.google.com',
    });
  });

  it('не считает реферером свой же сайт', () => {
    expect(
      readAttribution('https://sandwor.ru/blog', 'https://sandwor.ru/').referrer,
    ).toBeUndefined();
  });
});
