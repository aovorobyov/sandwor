import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const messages = require('messages/ru.json') as Record<string, string>;
import { ContactForm } from '../ContactForm';

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="ru" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />, { wrapper });
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Сообщение/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить/i })).toBeInTheDocument();
  });

  it('updates field values on input', async () => {
    render(<ContactForm />, { wrapper });
    const nameInput = screen.getByLabelText(/Имя/i);
    await userEvent.type(nameInput, 'Alice');
    expect(nameInput).toHaveValue('Alice');
  });

  it('shows success message after submit', async () => {
    render(<ContactForm />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Alice');
    await userEvent.type(screen.getByLabelText(/Email/i), 'alice@example.com');
    await userEvent.type(screen.getByLabelText(/Сообщение/i), 'Hello!');
    await userEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/Сообщение отправлено/i)).toBeInTheDocument();
    });
  });

  it('hides the form after successful submit', async () => {
    render(<ContactForm />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Bob');
    await userEvent.type(screen.getByLabelText(/Email/i), 'bob@example.com');
    await userEvent.type(screen.getByLabelText(/Сообщение/i), 'Hi!');
    await userEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    await waitFor(() => {
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
    });
  });

  it('returns to the form when "send another" is clicked', async () => {
    render(<ContactForm />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Ann');
    await userEvent.type(screen.getByLabelText(/Email/i), 'ann@example.com');
    await userEvent.type(screen.getByLabelText(/Сообщение/i), 'Hey!');
    await userEvent.click(screen.getByRole('button', { name: /^Отправить$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Сообщение отправлено/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Отправить ещё/i }));

    expect(screen.getByLabelText(/Сообщение/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Имя/i)).toHaveValue('');
  });

  it('shows an error message when the request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false } as Response);
    render(<ContactForm />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Eve');
    await userEvent.type(screen.getByLabelText(/Email/i), 'eve@example.com');
    await userEvent.type(screen.getByLabelText(/Сообщение/i), 'Oops');
    await userEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/Не удалось отправить/i)).toBeInTheDocument();
    });
  });
});
