import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LinkInterceptor } from '../LinkInterceptor';

const push = jest.fn();

jest.mock('next-view-transitions', () => ({
  useTransitionRouter: () => ({ push }),
}));

const renderWithLinks = () => {
  return render(
    <>
      <LinkInterceptor />
      <a href="/services/crm">внутренняя</a>
      <a href="https://t.me/sandworbot">внешняя</a>
      <a href="/cases" target="_blank">
        в новой вкладке
      </a>
      <a href="#calculator">якорь</a>
      <a href="/feed.xml">файл</a>
      <a href="/en" hrefLang="en">
        другой язык
      </a>
    </>,
  );
};

/** jsdom не умеет переходы: гасим их на window — уже после перехватчика на document. */
const blockNavigation = (event: MouseEvent) => {
  event.preventDefault();
};

describe('LinkInterceptor', () => {
  beforeEach(() => {
    push.mockClear();
    window.addEventListener('click', blockNavigation);
  });

  afterEach(() => {
    window.removeEventListener('click', blockNavigation);
  });

  it('отдаёт внутренние ссылки клиентскому роутеру', async () => {
    renderWithLinks();

    await userEvent.click(screen.getByText('внутренняя'));

    expect(push).toHaveBeenCalledWith('/services/crm');
  });

  it('не трогает внешние ссылки, новые вкладки, якоря, файлы и смену языка', async () => {
    renderWithLinks();

    document.documentElement.lang = 'ru';

    for (const text of ['внешняя', 'в новой вкладке', 'якорь', 'файл', 'другой язык']) {
      await userEvent.click(screen.getByText(text));
    }

    expect(push).not.toHaveBeenCalled();
  });

  it('пропускает клик с модификатором — открыть в новой вкладке', async () => {
    renderWithLinks();
    const user = userEvent.setup();

    await user.keyboard('{Meta>}');
    await user.click(screen.getByText('внутренняя'));
    await user.keyboard('{/Meta}');

    expect(push).not.toHaveBeenCalled();
  });
});
