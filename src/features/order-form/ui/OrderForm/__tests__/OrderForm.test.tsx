import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const messages = require('messages/ru.json') as Record<string, string>;
import { OrderForm } from '../OrderForm';
import { YM_GOAL } from '@/shared/lib/analytics';

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="ru" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe('OrderForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all form fields', () => {
    render(<OrderForm goal={YM_GOAL.orderWebsites} />, { wrapper });
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telegram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Какой сайт нужен/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить заявку/i })).toBeInTheDocument();
  });

  it('shows success message after submit', async () => {
    render(<OrderForm goal={YM_GOAL.orderWebsites} />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Алиса');
    await userEvent.type(screen.getByLabelText(/Телефон/i), '+7 900 000-00-00');
    await userEvent.type(screen.getByLabelText(/Какой сайт нужен/i), 'Лендинг для кофейни');
    await userEvent.click(screen.getByRole('button', { name: /Отправить заявку/i }));

    await waitFor(() => {
      expect(screen.getByText(/Свяжемся с вами/i)).toBeInTheDocument();
    });
  });

  it('returns to the form when "send another" is clicked', async () => {
    render(<OrderForm goal={YM_GOAL.orderWebsites} />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Боб');
    await userEvent.type(screen.getByLabelText(/Телефон/i), '+7 900 111-11-11');
    await userEvent.type(screen.getByLabelText(/Какой сайт нужен/i), 'Магазин');
    await userEvent.click(screen.getByRole('button', { name: /Отправить заявку/i }));

    await waitFor(() => {
      expect(screen.getByText(/Свяжемся с вами/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Отправить ещё/i }));

    expect(screen.getByLabelText(/Имя/i)).toHaveValue('');
  });

  it('shows an error message when the request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false } as Response);
    render(<OrderForm goal={YM_GOAL.orderWebsites} />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Ева');
    await userEvent.type(screen.getByLabelText(/Телефон/i), '+7 900 222-22-22');
    await userEvent.type(screen.getByLabelText(/Какой сайт нужен/i), 'Сайт-визитка');
    await userEvent.click(screen.getByRole('button', { name: /Отправить заявку/i }));

    await waitFor(() => {
      expect(screen.getByText(/Не удалось отправить заявку/i)).toBeInTheDocument();
    });
  });
});
